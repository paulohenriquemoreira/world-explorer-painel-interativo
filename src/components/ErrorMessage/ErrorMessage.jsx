import './ErrorMessage.css';

function ErrorMessage({ message, onRetry }) {
  return (
    <section className="feedback-state feedback-state--error" role="alert" aria-labelledby="error-title">
      {/* Explica o problema sem depender apenas do uso da cor vermelha. */}
      <span className="feedback-state__icon" aria-hidden="true">!</span>
      <h2 id="error-title">Não foi possível carregar os países</h2>
      <p>{message}</p>
      <button type="button" className="button button--primary" onClick={onRetry}>
        Tentar novamente
      </button>
    </section>
  );
}

export default ErrorMessage;
