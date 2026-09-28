import { useMemo, useState } from 'react';
import channelIslandsFlag from '../../assets/images/channel-islands-flag.webp';
import { getFlagUrl, normalizeText } from '../../utils/countries.js';
import './CountryFlag.css';

// Identifica casos especiais de bandeira local quando a CDN pública não oferece um arquivo apropriado.
function getSpecialFlagSource(country) {
  const normalizedName = normalizeText(country?.name);
  const normalizedId = String(country?.id || '').trim().toUpperCase();
  const normalizedCode = String(country?.code || '').trim().toUpperCase();

  const isChannelIslands =
    normalizedId === 'CHI' ||
    normalizedCode === 'JG' ||
    normalizedName.includes('channel islands') ||
    normalizedName.includes('ilhas do canal');

  if (isChannelIslands) {
    return channelIslandsFlag;
  }

  return '';
}

function CountryFlag({ country, variant = 'card' }) {
  const [hasError, setHasError] = useState(false);

  // Decide primeiro se deve usar uma bandeira local especial e recorre ao CDN público nos demais países.
  const { flagUrl, isSpecialFlag } = useMemo(() => {
    const specialFlagUrl = getSpecialFlagSource(country);

    if (specialFlagUrl) {
      return {
        flagUrl: specialFlagUrl,
        isSpecialFlag: true,
      };
    }

    return {
      flagUrl: getFlagUrl(country.code, variant === 'modal' ? 'w320' : 'w160'),
      isSpecialFlag: false,
    };
  }, [country, variant]);

  return (
    <span className={`country-flag country-flag--${variant}`}>
      {/* Mantém o código ISO visível como fallback caso nenhuma imagem de bandeira possa ser exibida. */}
      <span className="country-flag__fallback" aria-hidden="true">
        {country.code}
      </span>

      {/* Carrega a bandeira sobre toda a moldura e aplica uma origem local especial quando necessário. */}
      {!hasError && flagUrl && (
        <img
          className={`country-flag__image${isSpecialFlag ? ' country-flag__image--special' : ''}`}
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
