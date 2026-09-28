import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/Global.css';
import './styles/App.css';

// Inicializa a aplicação React em modo estrito para auxiliar a identificação de comportamentos inesperados durante o desenvolvimento.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
