import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/farazos-portfolio/",
  plugins: [react(), tailwindcss()],
});
