import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { isHTMLTag, isSVGTag, isMathMLTag } from "@vue/shared";
import { fileURLToPath } from "node:url";
const native = new Set([
  "view",
  "text",
  "button",
  "image",
  "scroll-view",
  "input",
  "switch",
]);
export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === "picker",
          nodeTransforms: [
            (node) => {
              if (node.type === 1 && native.has(node.tag))
                node.tag = `uni-${node.tag}-host`;
            },
          ],
          isNativeTag: (tag) =>
            !native.has(tag) &&
            (isHTMLTag(tag) || isSVGTag(tag) || isMathMLTag(tag)),
        },
      },
    }),
  ],
  server: {
    host: "127.0.0.1",
    port: Number(process.env.MINERVA_UNI_BROWSER_PORT ?? 4195),
    strictPort: true,
    fs: { allow: [fileURLToPath(new URL("../../../..", import.meta.url))] },
  },
});
