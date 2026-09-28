import { useState } from 'react';
import { getFlagUrl } from '../../utils/countries.js';
import './CountryFlag.css';

function CountryFlag({ country, variant = 'card' }) {
  const [hasError, setHasError] = useState(false);
  const flagUrl = getFlagUrl(country.code, variant === 'modal' ? 'w320' : 'w160');

  return (
    <span className={`country-flag country-flag--${variant}`}>
      {/* Mantém o código ISO visível como fallback caso a imagem externa da bandeira não seja carregada. */}
      <span className="country-flag__fallback" aria-hidden="true">
        {country.code}
      </span>

      {/* Carrega a bandeira por CDN público e usa dimensões conhecidas para reduzir mudanças de layout. */}
      {!hasError && flagUrl && (
        <img
          className="country-flag__image"
          src={flagUrl}
          alt={`Bandeira de ${country.name}`}
          width={variant === 'modal' ? 160 : 112}
          height={variant === 'modal' ? 120 : 84}
          loading={variant === 'modal' ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setHasError(true)}
        />
      )}
    </span>
  );
}

export default CountryFlag;
