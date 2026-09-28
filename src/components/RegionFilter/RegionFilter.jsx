import './RegionFilter.css';

function RegionFilter({ regions, value, onChange }) {
  return (
    <div className="field region-filter">
      {/* Oferece um rótulo explícito para que o propósito do seletor não dependa do valor selecionado. */}
      <label htmlFor="region-filter">Região</label>
      <select
        id="region-filter"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="all">Todas as regiões</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RegionFilter;
