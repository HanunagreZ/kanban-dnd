import { defineConfig } from "vite";
 
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [
    react() 
  ],
  resolve: {
    alias: {
      "@": path.resolve(".", "./src"),
      "@types": path.resolve(".", "./src/types"),
      "@utils": path.resolve(".", "./src/utils"),
      "@components": path.resolve(".", "./src/components"),
      "@board": path.resolve(".", "./src/components/Board"),
      "@column": path.resolve(".", "./src/components/Column"),
      "@task": path.resolve(".", "./src/components/Task"),
      "@fonts": path.resolve(".", "./src/fonts"), 
    },
  },
});
