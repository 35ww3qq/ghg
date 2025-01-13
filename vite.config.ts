import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tempo } from "tempo-devtools/dist/vite";

// Add conditional plugins for Tempo
const conditionalPlugins = [];
if (process.env.TEMPO) {
  conditionalPlugins.push(["tempo-devtools/swc", {}]);
}

export default defineConfig({
  plugins: [
    react({
      plugins: [...conditionalPlugins],
    }),
    tempo(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
  define: {
    "process.env.TEMPO": JSON.stringify(process.env.TEMPO),
  },
});
