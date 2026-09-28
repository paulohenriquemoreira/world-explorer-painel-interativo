// Normaliza textos para permitir buscas sem diferença entre maiúsculas, minúsculas e acentos.
export function normalizeText(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .trim();
}

// Formata números grandes de população de forma compacta para os cartões da interface.
export function formatPopulation(value) {
  if (value === null || value === undefined || value === '' || !Number.isFinite(Number(value))) {
    return 'Não informada';
  }

  return new Intl.NumberFormat('pt-BR', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(Number(value));
}

// Formata a população completa para exibição detalhada sem perder precisão visual.
export function formatPopulationFull(value) {
  if (value === null || value === undefined || value === '' || !Number.isFinite(Number(value))) {
    return 'Não informada';
  }

  return new Intl.NumberFormat('pt-BR').format(Number(value));
}

// Constrói a URL pública da bandeira pelo código ISO2 sem exigir token, conta ou nova consulta de metadados.
export function getFlagUrl(code = '', size = 'w160') {
  const normalizedCode = String(code).trim().toLowerCase();

  if (!/^[a-z]{2}$/.test(normalizedCode)) {
    return '';
  }

  return `https://flags.restcountries.com/v5/${size}/${normalizedCode}-4x3.png`;
}

// Filtra os países conforme termo de busca, região selecionada e preferência de favoritos.
export function filterCountries(
  countries,
  { searchTerm = '', region = 'all', favoritesOnly = false, favorites = [] } = {},
) {
  const normalizedSearch = normalizeText(searchTerm);
  const favoriteSet = new Set(favorites);

  return countries.filter((country) => {
    const matchesSearch =
      !normalizedSearch ||
      [country.name, country.capital, country.code, country.id]
        .map(normalizeText)
        .some((value) => value.includes(normalizedSearch));

    const matchesRegion = region === 'all' || country.region === region;
    const matchesFavorite = !favoritesOnly || favoriteSet.has(country.id);

    return matchesSearch && matchesRegion && matchesFavorite;
  });
}

// Ordena uma cópia da lista para preservar o estado original recebido da API.
export function sortCountries(countries, sortOption = 'name-asc') {
  const sortedCountries = [...countries];

  const sorters = {
    'name-asc': (a, b) => a.name.localeCompare(b.name, 'pt-BR'),
    'name-desc': (a, b) => b.name.localeCompare(a.name, 'pt-BR'),
    'population-desc': (a, b) => (b.population ?? -1) - (a.population ?? -1),
    'population-asc': (a, b) => (a.population ?? Number.MAX_SAFE_INTEGER) - (b.population ?? Number.MAX_SAFE_INTEGER),
  };

  return sortedCountries.sort(sorters[sortOption] ?? sorters['name-asc']);
}
