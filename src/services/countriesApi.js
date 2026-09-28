const WORLD_BANK_API_BASE_URL = 'https://api.worldbank.org/v2';
const WORLD_BANK_COUNTRIES_URL = `${WORLD_BANK_API_BASE_URL}/country?format=json&per_page=400`;
const WORLD_BANK_POPULATION_URL = `${WORLD_BANK_API_BASE_URL}/country/all/indicator/SP.POP.TOTL?format=json&mrnev=1&per_page=400`;
const COUNTRIES_NOW_CAPITALS_URL = 'https://countriesnow.space/api/v0.1/countries/capital';

// Mantém traduções curtas e consistentes para as regiões utilizadas pelo Banco Mundial.
const REGION_LABELS_PT_BR = {
  EAS: 'Leste da Ásia e Pacífico',
  ECS: 'Europa e Ásia Central',
  LCN: 'América Latina e Caribe',
  MEA: 'Oriente Médio e Norte da África',
  NAC: 'América do Norte',
  SAS: 'Sul da Ásia',
  SSF: 'África Subsaariana',
};

// Mantém os níveis de renda em português sem depender das traduções incompletas do endpoint localizado.
const INCOME_LABELS_PT_BR = {
  HIC: 'Países de renda alta',
  UMC: 'Países de renda média-alta',
  LMC: 'Países de renda média-baixa',
  LIC: 'Países de renda baixa',
  INX: 'Não classificado',
};

// Valida a resposta HTTP e interrompe o fluxo quando uma API devolve um status de erro.
async function parseHttpResponse(response) {
  if (!response.ok) {
    throw new Error(`A API respondeu com o status ${response.status}.`);
  }

  return response.json();
}

// Valida o formato específico do CountriesNow antes de utilizar seus dados complementares de capital.
async function parseCountriesNowResponse(response) {
  const payload = await parseHttpResponse(response);

  if (payload?.error || !Array.isArray(payload?.data)) {
    throw new Error(payload?.msg || 'A API de capitais retornou um formato inesperado.');
  }

  return payload;
}

// Traduz o nome do país pelo código ISO quando o navegador oferece Intl.DisplayNames e mantém um fallback seguro.
function getLocalizedCountryName(code, fallbackName) {
  if (!code || !/^[A-Z]{2}$/i.test(code)) {
    return fallbackName || code || 'País sem nome';
  }

  try {
    const displayNames = new Intl.DisplayNames(['pt-BR'], { type: 'region' });
    const localizedName = displayNames.of(code.toUpperCase());

    return localizedName && localizedName !== code.toUpperCase()
      ? localizedName
      : (fallbackName || code.toUpperCase());
  } catch {
    return fallbackName || code.toUpperCase();
  }
}

// Converte as respostas das APIs em uma estrutura única e consistente para os componentes da interface.
function normalizeCountries(countryPayload, populationPayload, capitalPayload) {
  const countries = Array.isArray(countryPayload?.[1]) ? countryPayload[1] : [];
  const populationEntries = Array.isArray(populationPayload?.[1]) ? populationPayload[1] : [];
  const capitalEntries = Array.isArray(capitalPayload?.data) ? capitalPayload.data : [];

  // Relaciona a população ao código ISO3 para evitar buscas repetitivas durante a normalização dos países.
  const populationByIso3 = new Map(
    populationEntries.map((entry) => [
      entry.countryiso3code,
      {
        value: entry.value,
        year: entry.date,
      },
    ]),
  );

  // Relaciona os metadados do CountriesNow pelos códigos ISO para completar nomes e capitais quando necessário.
  const capitalByIso3 = new Map(
    capitalEntries
      .filter((entry) => entry?.iso3)
      .map((entry) => [String(entry.iso3).toUpperCase(), entry]),
  );

  const capitalByIso2 = new Map(
    capitalEntries
      .filter((entry) => entry?.iso2)
      .map((entry) => [String(entry.iso2).toUpperCase(), entry]),
  );

  return countries
    .filter(
      (country) =>
        country.region?.value &&
        country.region.value !== 'Aggregates' &&
        /^[A-Z]{2}$/i.test(country.iso2Code ?? ''),
    )
    .map((country) => {
      const code = String(country.iso2Code).toUpperCase();
      const id = String(country.id).toUpperCase();
      const population = populationByIso3.get(id);
      const complementaryCountry = capitalByIso3.get(id) ?? capitalByIso2.get(code);
      const fallbackName = complementaryCountry?.name || country.name;
      const capital = complementaryCountry?.capital?.trim() || country.capitalCity?.trim();

      return {
        id,
        code,
        name: complementaryCountry
          ? getLocalizedCountryName(complementaryCountry.iso2 || code, fallbackName)
          : (country.name?.trim() || code),
        region: REGION_LABELS_PT_BR[country.region?.id] || country.region?.value || 'Não informada',
        incomeLevel: INCOME_LABELS_PT_BR[country.incomeLevel?.id] || country.incomeLevel?.value || 'Não informado',
        capital: capital || 'Não informada',
        longitude: country.longitude || null,
        latitude: country.latitude || null,
        population: population?.value ?? null,
        populationYear: population?.year ?? null,
      };
    });
}

// Busca os dados essenciais em paralelo e trata a API complementar como fallback para manter o painel resiliente.
export async function getCountries({ signal } = {}) {
  const capitalsRequest = fetch(COUNTRIES_NOW_CAPITALS_URL, { signal })
    .then(parseCountriesNowResponse)
    .catch((error) => {
      // Propaga cancelamentos do React, mas permite que o painel continue com os dados do Banco Mundial em outras falhas.
      if (error?.name === 'AbortError') {
        throw error;
      }

      return null;
    });

  const [countryResponse, populationResponse, capitalPayload] = await Promise.all([
    fetch(WORLD_BANK_COUNTRIES_URL, { signal }),
    fetch(WORLD_BANK_POPULATION_URL, { signal }),
    capitalsRequest,
  ]);

  const [countryPayload, populationPayload] = await Promise.all([
    parseHttpResponse(countryResponse),
    parseHttpResponse(populationResponse),
  ]);

  const countries = normalizeCountries(countryPayload, populationPayload, capitalPayload);

  if (!countries.length) {
    throw new Error('Nenhum país foi retornado pelas fontes públicas consultadas.');
  }

  return countries;
}
