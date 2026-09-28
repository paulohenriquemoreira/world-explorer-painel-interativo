import CountryCard from '../CountryCard/CountryCard.jsx';
import './CountryGrid.css';

function CountryGrid({ countries, favorites, onToggleFavorite, onOpenDetails }) {
  const favoriteSet = new Set(favorites);

  return (
    <div className="country-grid" aria-label="Lista de países">
      {/* Renderiza um cartão reutilizável para cada país filtrado e mantém o estado de favorito sincronizado. */}
      {countries.map((country) => (
        <CountryCard
          key={country.id}
          country={country}
          isFavorite={favoriteSet.has(country.id)}
          onToggleFavorite={onToggleFavorite}
          onOpenDetails={onOpenDetails}
        />
      ))}
    </div>
  );
}

export default CountryGrid;
