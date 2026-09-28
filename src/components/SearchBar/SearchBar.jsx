import './SearchBar.css';

function SearchBar({ value, onChange }) {
  return (
    <div className="field search-field">
      {/* Associa um rótulo visível ao campo para beneficiar usuários de leitores de tela e navegação por voz. */}
      <label htmlFor="country-search">Buscar país</label>
      <div className="search-field__control">
        <span className="search-field__icon" aria-hidden="true">⌕</span>
        <input
          id="country-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Ex.: Brasil, Brasília ou BR"
          autoComplete="off"
          aria-describedby="country-search-help"
        />
      </div>
      <span id="country-search-help" className="sr-only">
        A busca considera nome do país, capital e códigos ISO.
      </span>
    </div>
  );
}

export default SearchBar;
