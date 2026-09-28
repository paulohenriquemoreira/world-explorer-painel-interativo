import './Loading.css';

function Loading() {
  return (
    <div className="loading-state" role="status" aria-live="polite" aria-busy="true">
      {/* Comunica textualmente o carregamento e exibe cartões esqueleto apenas como apoio visual. */}
      <p>Carregando informações dos países…</p>
      <div className="loading-grid" aria-hidden="true">
        {Array.from({ length: 8 }, (_, index) => (
          <div className="loading-card" key={index}>
            <span className="skeleton skeleton--flag" />
            <span className="skeleton skeleton--title" />
            <span className="skeleton skeleton--line" />
            <span className="skeleton skeleton--line" />
            <span className="skeleton skeleton--button" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Loading;
