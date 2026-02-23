// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//      open: true,
//     port: 5180,
//     strictPort: true,
//     hmr: {
//       overlay: false,
//     },
//   },
// });



import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist", // default, ensure this exists
  },
  server: {
    open: true,
    port: 5180,
    strictPort: true,
    hmr: {
      overlay: false,
    },
  },
});