import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // default, but good to be explicit
    assetsDir: 'assets', // where images/fonts will go
  },
  server: {
    port: 5173, // default dev port; safe to leave
  },
  base: '/', // change to '/your-subdir/' if deploying to a subfolder
});
