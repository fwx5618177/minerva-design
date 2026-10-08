import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { isHTMLTag, isMathMLTag, isSVGTag } from "@vue/shared";

// Planned uni-app renderer. For now: the testing spike (Vue Test Utils with
// uni built-in stubs under happy-dom), see docs/adr/0005-spike-uni-app.md.
//
// uni-app built-ins that collide with HTML / SVG tag names (`view`, `text`
// are SVG; `button`, `input`, `image` are HTML). Excluding them from
// isNativeTag makes the compiler emit resolveComponent("view") etc., like
// uni-app's own compiler, so tests provide them as components.
const UNI_BUILT_IN_TAGS = new Set([
  "view",
  "text",
  "button",
  "image",
  "scroll-view",
  "input",
]);

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isNativeTag: (tag) =>
            !UNI_BUILT_IN_TAGS.has(tag) &&
            (isHTMLTag(tag) || isSVGTag(tag) || isMathMLTag(tag)),
        },
      },
    }),
  ],
  test: {
    name: "uni",
    environment: "happy-dom",
    include: ["spike/**/*.test.ts", "src/**/*.test.ts"],
    setupFiles: ["./spike/support/setup.ts"],
  },
});
