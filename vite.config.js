// import path from "path"
// import { fileURLToPath } from "url"
// import tailwindcss from "@tailwindcss/vite"
// import react from "@vitejs/plugin-react"
// import { defineConfig } from "vite"

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss()
//   ],
//   server: {
//     open: true,
//     proxy: {
//       '/api': {
//         target: 'http://192.168.1.78:5000',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, '/api'),
//       },
//     },
//   },
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// })

















import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    open: true,
    proxy: {
      // Proxy API calls
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        // No need for rewrite if you want /api/... to stay /api/...
        // If you want to strip /api prefix → uncomment next line
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },

      // Proxy for images / static uploads folder
      "/uploads": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,           // useful for local http
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});