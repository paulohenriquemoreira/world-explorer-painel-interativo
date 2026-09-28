import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configura o Vite para processar a aplicação React com atualização rápida durante o desenvolvimento.
export default defineConfig({
  plugins: [react()],
  build: {
    // Mantém o bundle compatível com navegadores modernos e favorece uma saída enxuta para produção.
    target: 'es2020',
  },
});
