import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    fs: { strict: false },
    mimeTypes: {
      webmanifest: "application/manifest+json",
    },
    historyApiFallback: {
      disableDotRule: true, // Ensures non-HTML files aren't caught in SPA routing
    },
    static: {
      directory: "public", // Explicitly serve public assets
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  base: "/",
});
