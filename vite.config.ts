import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');

  // Detect if we are in the Firebase Studio / IDX preview environment.
  const isFirebaseStudioPreview = process.env.DISABLE_HMR === 'true' || process.env.IDX === 'true';

  return {
    plugins: [
      react(),
      ...(!isFirebaseStudioPreview ? [tailwindcss()] : [])
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.VITE_ODDS_API_KEY': JSON.stringify(env.VITE_ODDS_API_KEY || env.ODDS_API_KEY),
      'process.env.ODDS_API_KEY': JSON.stringify(env.VITE_ODDS_API_KEY || env.ODDS_API_KEY),
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});