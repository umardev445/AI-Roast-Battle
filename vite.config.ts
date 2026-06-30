import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
<<<<<<< HEAD
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
=======
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    base: '/AI-Roast-Battle/',

    plugins: [react(), tailwindcss()],

>>>>>>> cbd8f8cbe4608cd22d8faf6c6021fa9ed9974a74
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
<<<<<<< HEAD
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
=======

    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
>>>>>>> cbd8f8cbe4608cd22d8faf6c6021fa9ed9974a74
