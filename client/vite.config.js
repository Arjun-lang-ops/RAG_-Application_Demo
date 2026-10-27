import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,

    /**
     * Proxy: forwards /api/* requests from the Vite dev server
     * to the Express backend running on port 3000.
     *
     * This eliminates CORS issues during development — the browser
     * only ever talks to localhost:5173, and Vite forwards API
     * calls internally to localhost:3000.
     */
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        // No rewrite needed — the backend route already starts with /api
      },
    },
  },
});
