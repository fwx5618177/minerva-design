import { fileURLToPath } from "node:url";
import angular from "@analogjs/vite-plugin-angular";
import { defineConfig } from "vitest/config";

const here = (p: string) => fileURLToPath(new URL(p, import.meta.url));

// Planned native Angular renderer. For now: the testing spike (standalone
// components with signal inputs / outputs, AOT through Analog's Vite plugin,
// zoneless TestBed under happy-dom), see docs/adr/0007-spike-angular.md.
export default defineConfig({
  plugins: [
    angular({
      tsconfig: here("./tsconfig.spec.json"),
      workspaceRoot: here("./"),
    }),
  ],
  test: {
    name: "angular",
    environment: "happy-dom",
    setupFiles: ["./spike/test-setup.ts"],
    include: ["spike/**/*.test.ts", "src/**/*.test.ts"],
  },
});
