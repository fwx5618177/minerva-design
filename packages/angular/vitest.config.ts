import { fileURLToPath } from "node:url";
import angular from "@analogjs/vite-plugin-angular";
import { defineConfig } from "vitest/config";

const here = (p: string) => fileURLToPath(new URL(p, import.meta.url));

// Native Angular renderer (minerva-design/angular): standalone components
// compiled AOT by Analog's Vite plugin, a zoneless TestBed under happy-dom
// (docs/adr/0007-spike-angular.md). The workspace packages resolve to their
// sources (no build needed).
export default defineConfig({
  plugins: [
    angular({
      tsconfig: here("./tsconfig.spec.json"),
      workspaceRoot: here("./"),
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^@minerva\/core\/styling-hooks$/,
        replacement: here("../core/src/styling-hooks/index.ts"),
      },
      {
        find: /^@minerva\/core$/,
        replacement: here("../core/src/index.ts"),
      },
      { find: /^@minerva\/dom$/, replacement: here("../dom/src/index.ts") },
    ],
  },
  test: {
    name: "angular",
    environment: "happy-dom",
    environmentOptions: {
      happyDOM: {
        settings: {
          enableJavaScriptEvaluation: false,
          disableJavaScriptFileLoading: true,
          disableCSSFileLoading: true,
          disableIframePageLoading: true,
          handleDisabledFileLoadingAsSuccess: true,
        },
      },
    },
    setupFiles: ["./src/test-setup.ts"],
    include: ["src/**/*.test.ts", "monaco/**/*.test.ts"],
  },
});
