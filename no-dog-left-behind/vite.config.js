import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactScan from '@react-scan/vite-plugin-react-scan';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    plugins: [
      react(),
      reactScan({
        enable: isDev,
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
      fs: { strict: false },
      historyApiFallback: true,
      proxy: {
        '/api': {
        target: 'https://api.trueguard.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
    },
  }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    },
    define: {
      'process.env': process.env,
    },
  };
});
