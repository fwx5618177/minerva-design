import { fileURLToPath } from "node:url";
import { defineConfig } from "@playwright/test";
const port = Number(process.env.MINERVA_TARO_BROWSER_PORT ?? 4193);
const baseURL = `http://127.0.0.1:${port}`;
export default defineConfig({
  testDir: ".",
  testMatch: "*.spec.ts",
  workers: 1,
  reporter: "list",
  use: {
    baseURL,
    browserName: "chromium",
    viewport: { width: 1200, height: 900 },
  },
  webServer: {
    cwd: fileURLToPath(new URL("../../../..", import.meta.url)),
    command:
      "pnpm exec vite --config packages/taro/spike/browser/vite.config.ts",
    url: baseURL,
    reuseExistingServer: false,
    timeout: 30000,
  },
});
