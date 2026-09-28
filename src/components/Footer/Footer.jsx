import './Footer.css';

function Footer() {
  // Calcula o ano em tempo de execução para que o rodapé seja atualizado automaticamente nos próximos anos.
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" id="sobre">
      <div className="container site-footer__content">
        {/* Identifica a autoria e mantém o ano dinâmico sem exigir atualização manual do código. */}
        <p>Copyright © {currentYear} — Desenvolvido por Paulo Henrique Moreira</p>

        {/* Informa as fontes externas utilizadas e mantém os links acessíveis para consulta da documentação. */}
        <p className="site-footer__source">
          Dados: {' '}
          <a
            href="https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information"
            target="_blank"
            rel="noreferrer noopener"
          >
            Banco Mundial
          </a>
          {' '}·{' '}
          <a
            href="https://countriesnow.space/swagger-docs/"
            target="_blank"
            rel="noreferrer noopener"
          >
            CountriesNow
          </a>
          {' '}·{' '}
          <a
            href="https://restcountries.com/flags"
            target="_blank"
            rel="noreferrer noopener"
          >
            Bandeiras
          </a>
          {' '}via CDN público.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
