import './EmptyState.css';

function EmptyState({ onClear }) {
  return (
    <section className="feedback-state" role="status" aria-labelledby="empty-title">
      {/* Informa que a consulta terminou sem resultados e oferece uma ação clara de recuperação. */}
      <span className="feedback-state__icon" aria-hidden="true">⌕</span>
      <h2 id="empty-title">Nenhum país encontrado</h2>
      <p>Tente alterar o termo pesquisado, a região ou o filtro de favoritos.</p>
      <button type="button" className="button button--secondary" onClick={onClear}>
        Limpar filtros
      </button>
    </section>
  );
}

export default EmptyState;
