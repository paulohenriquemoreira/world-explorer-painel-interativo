import { useEffect, useRef } from 'react';
import CountryFlag from '../CountryFlag/CountryFlag.jsx';
import { formatPopulationFull } from '../../utils/countries.js';
import './CountryDetails.css';

function CountryDetails({ country, isFavorite, onToggleFavorite, onClose }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    // Move o foco para o modal e bloqueia a rolagem do conteúdo ao fundo enquanto os detalhes estão abertos.
    closeButtonRef.current?.focus();
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event) {
      // Fecha o modal com Escape para atender ao padrão esperado de navegação por teclado.
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      // Mantém o foco dentro do diálogo quando o usuário navega com a tecla Tab.
      if (event.key === 'Tab' && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      // Restaura o comportamento da página e devolve o foco ao elemento usado antes da abertura do modal.
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section
        ref={dialogRef}
        className="country-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="country-dialog-title"
        aria-describedby="country-dialog-description"
      >
        {/* Mantém o controle de fechamento como primeiro alvo de foco do diálogo. */}
        <button
          ref={closeButtonRef}
          type="button"
          className="icon-button country-modal__close"
          onClick={onClose}
          aria-label={`Fechar detalhes de ${country.name}`}
        >
          <span aria-hidden="true">×</span>
        </button>

        {/* Identifica visualmente o país com sua bandeira e mantém nome e códigos sempre visíveis. */}
        <div className="country-modal__heading">
          <CountryFlag country={country} variant="modal" />
          <div>
            <p className="country-modal__code">{country.code} · {country.id}</p>
            <h2 id="country-dialog-title">{country.name}</h2>
            <p id="country-dialog-description">
              Informações combinadas de fontes públicas sobre o país selecionado.
            </p>
          </div>
        </div>

        {/* Usa uma lista de descrição para relacionar semanticamente cada dado ao respectivo rótulo. */}
        <dl className="country-modal__facts">
          <div><dt>Capital</dt><dd>{country.capital}</dd></div>
          <div><dt>Região</dt><dd>{country.region}</dd></div>
          <div><dt>Nível de renda</dt><dd>{country.incomeLevel}</dd></div>
          <div><dt>População</dt><dd>{formatPopulationFull(country.population)}</dd></div>
          <div><dt>Ano da população</dt><dd>{country.populationYear || 'Não informado'}</dd></div>
          <div><dt>Latitude</dt><dd>{country.latitude || 'Não informada'}</dd></div>
          <div><dt>Longitude</dt><dd>{country.longitude || 'Não informada'}</dd></div>
        </dl>

        {/* Mantém a ação de favorito disponível também na visualização detalhada. */}
        <button
          type="button"
          className="button button--primary country-modal__favorite"
          aria-pressed={isFavorite}
          onClick={() => onToggleFavorite(country.id)}
        >
          <span aria-hidden="true">{isFavorite ? '♥' : '♡'}</span>
          {isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        </button>
      </section>
    </div>
  );
}

export default CountryDetails;
