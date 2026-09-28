import { useCallback, useEffect, useMemo, useState } from 'react';
import Header from './components/Header/Header.jsx';
import Hero from './components/Hero/Hero.jsx';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import RegionFilter from './components/RegionFilter/RegionFilter.jsx';
import SortSelect from './components/SortSelect/SortSelect.jsx';
import CountryGrid from './components/CountryGrid/CountryGrid.jsx';
import CountryDetails from './components/CountryDetails/CountryDetails.jsx';
import Loading from './components/Loading/Loading.jsx';
import ErrorMessage from './components/ErrorMessage/ErrorMessage.jsx';
import EmptyState from './components/EmptyState/EmptyState.jsx';
import Footer from './components/Footer/Footer.jsx';
import { getCountries } from './services/countriesApi.js';
import { filterCountries, sortCountries } from './utils/countries.js';

const FAVORITES_STORAGE_KEY = 'world-explorer-favorites';

// Recupera os favoritos de forma segura e evita que um valor inválido do armazenamento interrompa a aplicação.
function getStoredFavorites() {
  try {
    const storedValue = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) ?? '[]');
    return Array.isArray(storedValue) ? storedValue : [];
  } catch {
    return [];
  }
}

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [requestKey, setRequestKey] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [sortOption, setSortOption] = useState('name-asc');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState(getStoredFavorites);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    // Busca os dados quando a aplicação inicia ou quando o usuário solicita uma nova tentativa após um erro.
    async function loadCountries() {
      setLoading(true);
      setError('');

      try {
        const data = await getCountries({ signal: controller.signal });
        setCountries(data);
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message || 'Ocorreu um erro inesperado durante a consulta.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadCountries();

    // Cancela requisições pendentes quando o componente deixa de existir para evitar atualizações desnecessárias de estado.
    return () => controller.abort();
  }, [requestKey]);

  useEffect(() => {
    // Persiste os favoritos no navegador e ignora falhas de armazenamento que poderiam interromper a interface.
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Mantém a aplicação funcional mesmo quando o navegador bloqueia o armazenamento local.
    }
  }, [favorites]);

  // Deriva as regiões diretamente dos dados da API e evita manter uma segunda fonte de verdade no estado.
  const regions = useMemo(
    () => [...new Set(countries.map((country) => country.region))].sort((a, b) => a.localeCompare(b, 'pt-BR')),
    [countries],
  );

  // Calcula somente os países que atendem aos filtros ativos e aplica a ordenação sem alterar a lista original.
  const visibleCountries = useMemo(() => {
    const filtered = filterCountries(countries, {
      searchTerm,
      region: selectedRegion,
      favoritesOnly,
      favorites,
    });

    return sortCountries(filtered, sortOption);
  }, [countries, searchTerm, selectedRegion, favoritesOnly, favorites, sortOption]);

  // Mantém a função estável para evitar recriações desnecessárias durante a renderização dos cartões.
  const handleToggleFavorite = useCallback((countryId) => {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(countryId)
        ? currentFavorites.filter((id) => id !== countryId)
        : [...currentFavorites, countryId],
    );
  }, []);

  // Restaura os filtros para o estado inicial quando uma combinação não produz resultados.
  function handleClearFilters() {
    setSearchTerm('');
    setSelectedRegion('all');
    setSortOption('name-asc');
    setFavoritesOnly(false);
  }

  return (
    <div className="app-shell" id="top">
      {/* Oferece um atalho de teclado que pula a navegação repetitiva e alcança diretamente o conteúdo principal. */}
      <a className="skip-link" href="#main-content">Pular para o conteúdo principal</a>

      <Header />

      <main id="main-content">
        <Hero />

        <section className="explorer-section" id="explorar" aria-labelledby="explorer-title">
          <div className="container">
            {/* Explica o propósito dos controles antes que o usuário inicie a consulta. */}
            <div className="explorer-heading">
              <p className="eyebrow">Painel interativo</p>
              <h2 id="explorer-title">Encontre o país que deseja conhecer</h2>
              <p>Use a busca e os filtros abaixo. Os resultados são atualizados automaticamente conforme sua seleção.</p>
            </div>

            {/* Agrupa controles relacionados em uma área semanticamente reconhecível por tecnologias assistivas. */}
            <div className="filters-panel" role="group" aria-label="Filtros dos países">
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
              <RegionFilter regions={regions} value={selectedRegion} onChange={setSelectedRegion} />
              <SortSelect value={sortOption} onChange={setSortOption} />
              <button
                type="button"
                className={`button ${favoritesOnly ? 'button--primary' : 'button--secondary'} favorite-filter`}
                aria-pressed={favoritesOnly}
                onClick={() => setFavoritesOnly((current) => !current)}
              >
                <span aria-hidden="true">♥</span>
                {favoritesOnly ? 'Exibindo favoritos' : `Favoritos (${favorites.length})`}
              </button>
            </div>

            {/* Comunica alterações na quantidade de resultados sem interromper a navegação do usuário. */}
            {!loading && !error && (
              <div className="results-summary" aria-live="polite" aria-atomic="true">
                <p><strong>{visibleCountries.length}</strong> {visibleCountries.length === 1 ? 'país encontrado' : 'países encontrados'}</p>
                <p>{favorites.length} {favorites.length === 1 ? 'favorito salvo' : 'favoritos salvos'}</p>
              </div>
            )}

            <div className="results-area">
              {/* Exibe feedback específico para carregamento, falha, ausência de resultados ou sucesso da consulta. */}
              {loading && <Loading />}

              {!loading && error && (
                <ErrorMessage
                  message={error}
                  onRetry={() => setRequestKey((currentKey) => currentKey + 1)}
                />
              )}

              {!loading && !error && visibleCountries.length === 0 && (
                <EmptyState onClear={handleClearFilters} />
              )}

              {!loading && !error && visibleCountries.length > 0 && (
                <CountryGrid
                  countries={visibleCountries}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  onOpenDetails={setSelectedCountry}
                />
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Renderiza o diálogo apenas quando um país foi selecionado e mantém o estado de favorito sincronizado. */}
      {selectedCountry && (
        <CountryDetails
          country={selectedCountry}
          isFavorite={favorites.includes(selectedCountry.id)}
          onToggleFavorite={handleToggleFavorite}
          onClose={() => setSelectedCountry(null)}
        />
      )}
    </div>
  );
}

export default App;
