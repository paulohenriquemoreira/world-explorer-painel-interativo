import './SortSelect.css';

function SortSelect({ value, onChange }) {
  return (
    <div className="field sort-select">
      {/* Explica o critério de ordenação antes que o usuário escolha uma opção. */}
      <label htmlFor="sort-countries">Ordenar por</label>
      <select
        id="sort-countries"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="name-asc">Nome: A → Z</option>
        <option value="name-desc">Nome: Z → A</option>
        <option value="population-desc">Maior população</option>
        <option value="population-asc">Menor população</option>
      </select>
    </div>
  );
}

export default SortSelect;
