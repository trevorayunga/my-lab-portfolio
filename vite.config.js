import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
 
  base: "/my-lab-portfolio/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.js",
  },
});
