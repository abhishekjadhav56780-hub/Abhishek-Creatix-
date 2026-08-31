import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three", "three-stdlib"],
          gsap: ["gsap"],
          reactVendor: ["react", "react-dom"],
        },
      },
    },
  },
});
