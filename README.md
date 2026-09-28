# 🌍 World Explorer — Painel Interativo de Países

O **World Explorer** é uma aplicação web desenvolvida com **React + Vite** para transformar dados públicos sobre países em uma experiência de consulta simples, visual, responsiva e acessível.

O projeto foi criado para o **Desafio 02 — Painel Interativo com API Pública**, demonstrando consumo de API, manipulação de dados, componentização, interações, tratamento de estados, acessibilidade, responsividade, testes e preocupação com SEO e performance.

---

## 📌 Problemática

Informações geográficas, demográficas e socioeconômicas sobre países estão disponíveis em fontes públicas, porém nem sempre são apresentadas de maneira simples para consulta e comparação.

O World Explorer organiza parte dessas informações em um painel único, permitindo que o usuário encontre países, aplique filtros, ordene resultados, salve favoritos e visualize informações detalhadas.

---

## 🎯 Objetivo

Desenvolver uma aplicação React funcional que consuma uma API pública e apresente seus dados de maneira organizada, permitindo interação sem exigir backend ou autenticação.

O projeto busca demonstrar:

- consumo de API pública com `fetch` e `async/await`;
- gerenciamento de estado com React;
- componentização com responsabilidades claras;
- busca, filtro, ordenação, favoritos e detalhes;
- persistência local com `localStorage`;
- tratamento de loading, erro e busca sem resultados;
- responsividade mobile first;
- acessibilidade com HTML semântico, ARIA e navegação por teclado;
- boas práticas de SEO, performance e Core Web Vitals;
- testes unitários para funções essenciais.

---

## 👤 Usuário da solução

A aplicação pode ser utilizada por estudantes, professores e pessoas interessadas em consultar informações básicas sobre países de forma rápida e organizada.

---

## 🔌 APIs e fontes públicas utilizadas

O projeto combina fontes públicas para evitar dependência de cadastro, token ou backend próprio.

### Banco Mundial — dados principais

A **World Bank Indicators API v2** fornece metadados dos países, região, nível de renda, coordenadas e população. As consultas utilizadas não exigem chave de autenticação.

Documentação oficial:

- https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information
- https://datahelpdesk.worldbank.org/knowledgebase/articles/898590-country-api-queries
- https://datahelpdesk.worldbank.org/knowledgebase/articles/898599-indicator-api-queries

**Dados dos países:**

```text
https://api.worldbank.org/v2/country?format=json&per_page=400
```

**População mais recente disponível:**

```text
https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?format=json&mrnev=1&per_page=400
```

O endpoint em inglês é utilizado porque a própria documentação do Banco Mundial informa que as traduções locais não estão disponíveis para todos os países. Os nomes são apresentados em português quando possível por `Intl.DisplayNames`.

### CountriesNow — complemento de capitais

A aplicação consulta também o endpoint público abaixo, sem autenticação, para complementar nomes e capitais:

```text
https://countriesnow.space/api/v0.1/countries/capital
```

Caso essa fonte complementar esteja indisponível, a aplicação continua funcionando e utiliza os dados do Banco Mundial como fallback.

### REST Countries Flag CDN — bandeiras

As bandeiras são carregadas diretamente pelo código ISO de duas letras usando o CDN público de bandeiras do REST Countries. O CDN não exige conta nem chave de API. Exemplo:

```text
https://flags.restcountries.com/v5/w160/br-4x3.png
```

Os cartões utilizam `loading="lazy"` e `decoding="async"` para reduzir o custo inicial de imagens fora da área visível.

---

## 📊 Dados utilizados

A aplicação trabalha com os seguintes dados:

- nome do país;
- código ISO de duas letras;
- código ISO de três letras;
- capital;
- região;
- nível de renda;
- população mais recente disponível;
- ano de referência da população;
- latitude;
- longitude.

A bandeira exibida nos cartões é uma imagem real obtida pelo código ISO de duas letras através do CDN público do REST Countries. Caso a imagem não seja carregada, o componente mantém o código ISO como fallback visual.

---

## ✨ Principais funcionalidades

### 🔎 Busca

Permite pesquisar por:

- nome do país;
- capital;
- código ISO de duas letras;
- código ISO de três letras.

A busca ignora diferenças entre maiúsculas, minúsculas e acentos.

### 🌎 Filtro por região

As regiões são geradas dinamicamente a partir dos dados recebidos da API.

### ↕️ Ordenação

O usuário pode ordenar por:

- nome de A a Z;
- nome de Z a A;
- maior população;
- menor população.

### ❤️ Favoritos

Os países favoritos são armazenados no `localStorage` do navegador e permanecem disponíveis após atualizar ou reabrir a aplicação no mesmo navegador.

### 📋 Detalhes

Cada país possui uma visualização detalhada em modal acessível.

O modal:

- utiliza `role="dialog"`;
- utiliza `aria-modal="true"`;
- possui título e descrição associados por ARIA;
- recebe foco ao abrir;
- pode ser fechado com `Escape`;
- mantém o foco dentro do diálogo durante a navegação por `Tab`;
- devolve o foco ao elemento anterior quando fecha.

### ⚠️ Estados da aplicação

A interface trata:

- carregamento da API;
- falha de comunicação;
- tentativa de nova requisição;
- busca sem resultados;
- dados não informados pela API.

---

## 🧩 Arquitetura do projeto

```text
world-explorer/
│
├── public/
│   ├── robots.txt
│   └── world-explorer.svg
│
├── src/
│   ├── assets/
│   │   └── images/
│   │       └── neon-globe.webp
│   │
│   ├── components/
│   │   ├── CountryCard/
│   │   │   ├── CountryCard.jsx
│   │   │   └── CountryCard.css
│   │   ├── CountryDetails/
│   │   │   ├── CountryDetails.jsx
│   │   │   └── CountryDetails.css
│   │   ├── CountryGrid/
│   │   │   ├── CountryGrid.jsx
│   │   │   └── CountryGrid.css
│   │   ├── CountryFlag/
│   │   │   ├── CountryFlag.jsx
│   │   │   └── CountryFlag.css
│   │   ├── EmptyState/
│   │   │   ├── EmptyState.jsx
│   │   │   └── EmptyState.css
│   │   ├── ErrorMessage/
│   │   │   ├── ErrorMessage.jsx
│   │   │   └── ErrorMessage.css
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.css
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.css
│   │   ├── Hero/
│   │   │   ├── Hero.jsx
│   │   │   └── Hero.css
│   │   ├── Loading/
│   │   │   ├── Loading.jsx
│   │   │   └── Loading.css
│   │   ├── RegionFilter/
│   │   │   ├── RegionFilter.jsx
│   │   │   └── RegionFilter.css
│   │   ├── SearchBar/
│   │   │   ├── SearchBar.jsx
│   │   │   └── SearchBar.css
│   │   └── SortSelect/
│   │       ├── SortSelect.jsx
│   │       └── SortSelect.css
│   │
│   ├── services/
│   │   └── countriesApi.js
│   │
│   ├── styles/
│   │   ├── App.css
│   │   └── Global.css
│   │
│   ├── utils/
│   │   ├── countries.js
│   │   └── countries.test.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🧠 Organização de responsabilidades

### `App.jsx`

Atua como orquestrador da aplicação. Controla os estados principais, filtros, favoritos, modal, carregamento e erro.

### `services/countriesApi.js`

Centraliza as requisições HTTP, combina Banco Mundial e CountriesNow, aplica fallbacks e normaliza os dados recebidos.

### `utils/countries.js`

Centraliza funções puras utilizadas para:

- normalizar textos;
- formatar população;
- gerar a URL pública da bandeira pelo código ISO;
- filtrar países;
- ordenar países.

### `components/`

Mantém os elementos visuais divididos por responsabilidade. Cada componente possui sua própria pasta com arquivo JSX e CSS.

### `styles/Global.css`

Centraliza:

- reset básico;
- `box-sizing`;
- variáveis de cores;
- tipografia;
- bordas;
- sombras;
- botões;
- campos de formulário;
- foco visível;
- preferências de contraste;
- `prefers-reduced-motion`.

### `styles/App.css`

Controla os layouts principais da aplicação e a organização dos filtros.

---

## 📱 Responsividade — Mobile First

O projeto parte do layout para dispositivos pequenos e adiciona melhorias progressivas conforme o espaço disponível.

Principais faixas utilizadas:

| Faixa | Estratégia |
|---|---|
| Mobile | 1 coluna de cards e filtros empilhados |
| Tablet — `48rem` | 2 colunas de cards |
| Notebook — `64rem` | 3 colunas de cards e filtros em linha |
| Desktop — `80rem` | 4 colunas de cards |
| Telas largas — `100rem` | 5 colunas de cards |

O layout evita larguras fixas rígidas e utiliza `minmax()`, `clamp()`, Grid e unidades relativas.

---

## ♿ Acessibilidade

A aplicação foi estruturada para oferecer uma experiência melhor para usuários de teclado e tecnologias assistivas.

### Recursos implementados

- idioma da página definido como `pt-BR`;
- HTML semântico com `header`, `nav`, `main`, `section`, `article`, `footer`, `dl`, `dt` e `dd`;
- link **Pular para o conteúdo principal**;
- rótulos visíveis em campos de formulário;
- `aria-label` quando o texto visível não descreve suficientemente a ação;
- `aria-pressed` nos controles de favoritos;
- `aria-live` na contagem de resultados;
- `role="status"` no carregamento e estado vazio;
- `role="alert"` em erros;
- modal com `role="dialog"`, `aria-modal`, foco inicial, Escape e contenção de foco;
- foco de teclado com contorno amarelo de alto contraste;
- alvos de toque confortáveis;
- suporte a `prefers-reduced-motion`;
- suporte a `prefers-contrast: more`;
- estados que não dependem somente de cores.

### Contraste

A paleta foi criada com fundo escuro e textos claros. Textos secundários continuam claros para preservar legibilidade e o foco utiliza amarelo forte para diferenciação visual.

Mesmo com boa escolha inicial de cores, o contraste deve ser validado novamente com Lighthouse/PageSpeed e ferramentas específicas antes da entrega final.

---

## ⚡ Performance e PageSpeed Insights

O PageSpeed Insights utiliza dados de laboratório do Lighthouse para analisar **Performance, Accessibility, Best Practices e SEO**. Para uma aplicação recém-publicada, pode ainda não existir volume suficiente de dados reais do Chrome UX Report.

O projeto adota algumas decisões voltadas para essas auditorias:

- não utiliza biblioteca externa de ícones;
- não utiliza biblioteca externa de fontes;
- utiliza bandeiras em tamanho reduzido, com carregamento tardio fora da viewport;
- utiliza dimensões explícitas nas imagens para reduzir CLS;
- executa as requisições essenciais em paralelo;
- trata a API complementar como fallback para evitar indisponibilidade total do painel;
- utiliza uma imagem WebP otimizada no Hero;
- utiliza `useMemo` para filtrar e ordenar somente quando as dependências mudam;
- utiliza `useCallback` na alteração de favoritos;
- cancela requisições pendentes com `AbortController`;
- utiliza skeletons com dimensões estáveis para reduzir mudanças de layout;
- respeita `prefers-reduced-motion`;
- possui metadados de título, descrição, Open Graph e Twitter;
- possui dados estruturados `WebApplication` em JSON-LD;
- possui `robots.txt`;
- utiliza hierarquia semântica de headings;
- evita dependências desnecessárias no bundle.

### Metas sugeridas

Após publicar o projeto, utilize o PageSpeed Insights no endereço final e busque:

- Performance: **90+**;
- Accessibility: **90+**;
- Best Practices: **90+**;
- SEO: **90+**.

Também observe especialmente as Core Web Vitals:

- **LCP**: até 2,5 s;
- **CLS**: até 0,1;
- **INP**: até 200 ms.

> Os valores finais dependem de rede, dispositivo, hospedagem, disponibilidade da API e condições da auditoria.

---

## 🔍 Checklist manual antes de publicar

1. Executar `npm run lint`.
2. Executar `npm test`.
3. Executar `npm run build`.
4. Corrigir qualquer erro apresentado.
5. Executar `npm run preview`.
6. Testar teclado usando `Tab`, `Shift + Tab`, `Enter` e `Escape`.
7. Verificar o layout em aproximadamente 320 px, 768 px, 1024 px, 1440 px e 1920 px.
8. Testar busca com e sem acentos.
9. Testar filtro por região.
10. Testar todas as opções de ordenação.
11. Testar favoritos e atualizar a página para confirmar o `localStorage`.
12. Abrir e fechar o modal pelo teclado.
13. Simular falha de rede pelo DevTools para verificar o estado de erro.
14. Publicar na Vercel ou Netlify.
15. Executar o PageSpeed Insights na URL publicada.
16. Adicionar uma URL canônica ao `index.html` quando o domínio definitivo estiver definido.

---

## 🧪 Testes unitários

O projeto utiliza **Vitest** para testar funções essenciais de manipulação de dados.

São verificados:

- normalização de texto;
- formatação de população;
- conversão do código ISO em bandeira;
- busca sem acentos;
- filtro de favoritos;
- ordenação por população.

### Executar os testes

```bash
npm test
```

### Executar em modo de observação

```bash
npm run test:watch
```

---

## 🛠️ Tecnologias utilizadas

- React;
- Vite;
- JavaScript ES6+;
- CSS3;
- Fetch API;
- World Bank Indicators API;
- CountriesNow API;
- REST Countries Flag CDN;
- LocalStorage;
- Vitest;
- ESLint;
- HTML semântico;
- ARIA.

---

## ▶️ Como executar o projeto

### 1. Clone o repositório

```bash
git https://github.com/paulohenriquemoreira/world-explorer-painel-interativo
```

### 2. Entre na pasta

```bash
cd world-explorer-painel-interativo
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Inicie o ambiente de desenvolvimento

```bash
npm run dev
```

O Vite exibirá o endereço local no terminal, normalmente semelhante a:

```text
http://localhost:5173
```

---

## 📦 Build de produção

```bash
npm run build
```

O Vite criará a pasta `dist/` com os arquivos otimizados para publicação.

Para testar o build localmente:

```bash
npm run preview
```

---

## 🌐 Publicação

O projeto pode ser publicado na **Vercel** ou **Netlify**.

### Configurações gerais

- Framework: Vite;
- comando de build: `npm run build`;
- diretório de saída: `dist`.

### Link da aplicação

Após publicar, substitua o texto abaixo pela URL real:

```text
https://SEU-PROJETO.vercel.app
```

---

## 🔎 Teste com PageSpeed Insights

Depois da publicação:

1. acesse https://pagespeed.web.dev/;
2. cole a URL publicada;
3. execute a análise;
4. avalie Mobile e Desktop;
5. revise Performance, Accessibility, Best Practices e SEO;
6. priorize correções relacionadas a LCP, CLS, INP, contraste, nomes acessíveis e metadados.

Uma pontuação não deve ser tratada isoladamente como garantia de qualidade. O relatório deve ser usado junto com testes reais de teclado, responsividade e comportamento da aplicação.

---

## 🤖 Uso de Inteligência Artificial

### Prompt 1 — Definição do projeto

#### Prompt utilizado

"Tenho que desenvolver um painel interativo utilizando React + Vite
e uma API pública. O projeto precisa possuir busca ou filtro,
componentização, responsividade e tratamento dos dados.

Sugira uma ideia de projeto que permita demonstrar esses conceitos
sem exigir backend e explique quais funcionalidades e componentes
poderiam ser utilizados."

#### Objetivo

Utilizei esse prompt para auxiliar na definição do tema do projeto,
na escolha das funcionalidades e na organização inicial da
arquitetura de componentes antes de iniciar o desenvolvimento.

### Prompt 2 — Performance, acessibilidade e SEO

#### Prompt utilizado

"Estou desenvolvendo uma aplicação React + Vite que consome uma API pública. Analise as decisões de HTML semântico, acessibilidade, carregamento de recursos, tamanho do bundle e renderização, e indique melhorias que possam elevar as pontuações de Performance, Accessibility, Best Practices e SEO no Lighthouse/PageSpeed Insights. Priorize Core Web Vitals como LCP, CLS e INP, contraste de cores, navegação por teclado, metadados, estabilidade visual e otimização de requisições, sem adicionar bibliotecas desnecessárias."

#### Objetivo

Utilizei esse prompt para revisar decisões técnicas relacionadas à performance, acessibilidade e SEO, identificando boas práticas que poderiam melhorar a experiência do usuário e os resultados das auditorias do PageSpeed Insights/Lighthouse.

---

## 👨‍💻 Autor

**Paulo Henrique Moreira**

Projeto acadêmico desenvolvido como prática de React, consumo de API pública, responsividade, acessibilidade e organização de componentes.
