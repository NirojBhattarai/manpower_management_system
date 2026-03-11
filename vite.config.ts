import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ["wx-react-gantt"],
  },
  plugins: [
    tailwindcss(),
    react(),
    // visualizer({ open: true })
  ],
  server: {
    port: 5173,
    host: '0.0.0.0'
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
