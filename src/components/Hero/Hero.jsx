import neonGlobe from '../../assets/images/neon-globe-transparent.webp';
import './Hero.css';

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__content">
        {/* Identifica o propósito educacional e interativo da aplicação antes dos controles de consulta. */}
        <div className="hero__copy">
          <p className="eyebrow">Dados públicos • Consulta interativa</p>
          <h1 id="hero-title">Explore países de forma simples, visual e acessível.</h1>
          <p className="hero__description">
            Pesquise países, consulte capitais, filtre por região, organize por população e salve seus favoritos usando dados públicos.
          </p>
          <a className="button button--primary hero__cta" href="#explorar">
            Explorar países
          </a>
        </div>

        {/* Exibe somente o globo neon transparente e evita anunciar uma imagem puramente decorativa aos leitores de tela. */}
        <figure className="hero__visual" aria-hidden="true">
          <img
            className="hero__visual-image"
            src={neonGlobe}
            alt=""
            width="1593"
            height="987"
            decoding="async"
            fetchPriority="high"
          />
        </figure>
      </div>
    </section>
  );
}

export default Hero;
