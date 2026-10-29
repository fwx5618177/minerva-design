import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import uni from "@dcloudio/vite-plugin-uni";
export default defineConfig({
  resolve: {
    alias: {
      "@minerva/core": fileURLToPath(
        new URL("./src/core/index.ts", import.meta.url),
      ),
      "@minerva/dom": fileURLToPath(
        new URL("./src/dom/index.ts", import.meta.url),
      ),
      // DOM-free chart engine entry (plain TS: compiled in place)
      "@minerva/charts/canvas": fileURLToPath(
        new URL("../../../charts/src/canvas.ts", import.meta.url),
      ),
    },
  },
  plugins: [(typeof uni === "function" ? uni : (uni as any).default)()],
});
