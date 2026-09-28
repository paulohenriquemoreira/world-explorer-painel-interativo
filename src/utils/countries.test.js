import { describe, expect, it } from 'vitest';
import {
  filterCountries,
  formatPopulation,
  getFlagUrl,
  normalizeText,
  sortCountries,
} from './countries.js';

const sampleCountries = [
  {
    id: 'BRA',
    code: 'BR',
    name: 'Brasil',
    capital: 'Brasília',
    region: 'América Latina e Caribe',
    population: 203000000,
  },
  {
    id: 'JPN',
    code: 'JP',
    name: 'Japão',
    capital: 'Tóquio',
    region: 'Leste da Ásia e Pacífico',
    population: 124000000,
  },
];

// Verifica se a normalização remove diferenças que poderiam prejudicar a experiência de busca.
describe('normalizeText', () => {
  it('remove acentos e converte o texto para minúsculas', () => {
    expect(normalizeText('Brasília')).toBe('brasilia');
  });
});

// Verifica se a formatação compacta mantém números de população legíveis nos cartões.
describe('formatPopulation', () => {
  it('formata números de população em português', () => {
    expect(formatPopulation(203000000)).toContain('203');
  });
});

// Verifica se a URL da bandeira usa o código ISO2 esperado e não exige dados adicionais no componente.
describe('getFlagUrl', () => {
  it('gera uma URL pública de bandeira para o Brasil', () => {
    expect(getFlagUrl('BR')).toContain('/br-4x3.png');
  });
});

// Verifica se busca, região e favoritos podem restringir corretamente o conjunto exibido.
describe('filterCountries', () => {
  it('encontra um país pelo nome sem exigir acentos', () => {
    const result = filterCountries(sampleCountries, { searchTerm: 'japao' });
    expect(result.map((country) => country.id)).toEqual(['JPN']);
  });

  it('mostra somente países favoritos quando solicitado', () => {
    const result = filterCountries(sampleCountries, {
      favoritesOnly: true,
      favorites: ['BRA'],
    });
    expect(result.map((country) => country.id)).toEqual(['BRA']);
  });
});

// Verifica se a ordenação por população respeita a opção selecionada pelo usuário.
describe('sortCountries', () => {
  it('ordena do maior para o menor valor de população', () => {
    const result = sortCountries(sampleCountries, 'population-desc');
    expect(result[0].id).toBe('BRA');
  });
});
