import { describe, expect, it } from "vitest";
import { createSSRApp, defineComponent, h } from "vue";
import { renderToString } from "vue/server-renderer";
import { useNativeId } from "./native-id";

describe("H5 stable IDs with the native runtime compatibility boundary", () => {
  it("keeps independent SSR requests stable while giving instances and multiple calls distinct IDs", async () => {
    const Child = defineComponent({
      setup() {
        const first = useNativeId();
        const second = useNativeId();
        return () =>
          h("div", [
            h("label", { for: first }, second),
            h("input", { id: first }),
          ]);
      },
    });
    const app = () =>
      createSSRApp({ render: () => h("main", [h(Child), h(Child)]) });
    const first = await renderToString(app());
    const second = await renderToString(app());
    expect(first).toBe(second);
    const ids = [...first.matchAll(/id="([^"]+)"/g)].map((match) => match[1]);
    expect(new Set(ids).size).toBe(2);
  });
});
