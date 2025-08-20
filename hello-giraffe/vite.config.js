import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/2025-HelloGiraffe/", // GitHub Pages를 위한 기본 경로 설정
});
