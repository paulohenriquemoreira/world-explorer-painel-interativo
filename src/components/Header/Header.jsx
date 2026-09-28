import './Header.css';

function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__content">
        {/* Apresenta a identidade principal do projeto e mantém o título visível em todas as resoluções. */}
        <a className="brand" href="#top" aria-label="World Explorer, voltar ao início">
          <span className="brand__icon" aria-hidden="true">🌍</span>
          <span className="brand__text">World Explorer</span>
        </a>

        {/* Disponibiliza atalhos semânticos para as áreas mais importantes da página. */}
        <nav className="site-nav" aria-label="Navegação principal">
          <a href="#explorar">Explorar</a>
          <a href="#sobre">Sobre</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
