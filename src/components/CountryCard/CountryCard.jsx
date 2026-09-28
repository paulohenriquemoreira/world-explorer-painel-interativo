import CountryFlag from '../CountryFlag/CountryFlag.jsx';
import { formatPopulation } from '../../utils/countries.js';
import './CountryCard.css';

function CountryCard({ country, isFavorite, onToggleFavorite, onOpenDetails }) {
  const titleId = `country-${country.id}-title`;

  return (
    <article className="country-card" aria-labelledby={titleId}>
      {/* Mantém a bandeira real do país e o controle de favorito agrupados no topo do cartão. */}
      <div className="country-card__top">
        <CountryFlag country={country} variant="card" />

        {/* Permite alternar o favorito e comunica o estado atual por aria-pressed. */}
        <button
          type="button"
          className="icon-button"
          aria-pressed={isFavorite}
          aria-label={isFavorite ? `Remover ${country.name} dos favoritos` : `Adicionar ${country.name} aos favoritos`}
          title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          onClick={() => onToggleFavorite(country.id)}
        >
          <span aria-hidden="true">{isFavorite ? '♥' : '♡'}</span>
        </button>
      </div>

      {/* Exibe as informações principais em uma hierarquia consistente para leitura rápida. */}
      <div className="country-card__content">
        <p className="country-card__code">{country.code} · {country.id}</p>
        <h2 id={titleId}>{country.name}</h2>

        <dl className="country-card__facts">
          <div>
            <dt>Capital</dt>
            <dd>{country.capital}</dd>
          </div>
          <div>
            <dt>Região</dt>
            <dd>{country.region}</dd>
          </div>
          <div>
            <dt>População</dt>
            <dd>{formatPopulation(country.population)}</dd>
          </div>
        </dl>
      </div>

      {/* Abre a visualização detalhada com um rótulo específico para cada país. */}
      <button
        type="button"
        className="button button--secondary country-card__details"
        onClick={() => onOpenDetails(country)}
        aria-label={`Ver detalhes de ${country.name}`}
      >
        Ver detalhes
      </button>
    </article>
  );
}

export default CountryCard;
