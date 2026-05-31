import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.VITE_ODDS_API_KEY': JSON.stringify(env.VITE_ODDS_API_KEY || env.ODDS_API_KEY),
      'process.env.ODDS_API_KEY': JSON.stringify(env.VITE_ODDS_API_KEY || env.ODDS_API_KEY),
    },
    build: {
      rollupOptions: {
        input: {
          main: 'index.html',
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
    },
  };
});