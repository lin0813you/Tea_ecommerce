import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  base: '/Tea_ecommerce/',  // GitHub 儲存庫名稱
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 把 @ 映射到 src 資料夾
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://2a80-2001-b011-e606-b668-8e1-1f4d-8f00-6f1f.ngrok-free.app", // Assuming your backend is on port 3000
        changeOrigin: true,
      },
    },
  },
});
