import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactScan from '@react-scan/vite-plugin-react-scan';

export default defineConfig({
  plugins: [
    react(),
    reactScan({
      enable: process.env.NODE_ENV === 'development',
      autoDisplayNames: true, 
      scanOptions: {
        log: true,               
        trackUnnecessaryRenders: true,
        animationSpeed: 'fast',
      },
      debug: false,             
    }),
  ],
  server: {
    port: 5173,
    fs: { strict: false },
    mimeTypes: {
      webmanifest: 'application/manifest+json',
    },
    historyApiFallback: {
      disableDotRule: true, 
    },
    proxy: {
      '/api': {
        target: 'https://api.trueguard.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  
  build: {
    outDir: 'dist', 
    assetsDir: 'assets', 
  },
});
