import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { isHTMLTag, isMathMLTag, isSVGTag } from "@vue/shared";

// Real uni-app SFCs tested with native built-in adapters under happy-dom.
// Device builds and device E2E remain separate validation steps.
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
  "switch",
]);

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Public <Button>/<Input> must never be shadowed by global native
          // test adapters. Only lowercase platform tags get a private alias.
          nodeTransforms: [
            (node) => {
              if (node.type === 1 && UNI_BUILT_IN_TAGS.has(node.tag))
                node.tag = `uni-${node.tag}-host`;
            },
          ],
          isNativeTag: (tag) =>
            !UNI_BUILT_IN_TAGS.has(tag) &&
            (isHTMLTag(tag) || isSVGTag(tag) || isMathMLTag(tag)),
        },
      },
    }),
  ],
  test: {
    name: "uni",
    exclude: ["spike/device/**", "**/node_modules/**"],
    environment: "happy-dom",
    include: ["spike/**/*.test.ts", "src/**/*.test.ts"],
    setupFiles: ["./spike/support/setup.ts"],
  },
});
