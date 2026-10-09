// @vitest-environment happy-dom
// The native Vue demos: one single-file component per Web Component demo of
// every page (pages/<id>/vue/<demo>.vue, same ids, so they share the
// translated titles), written with minerva-design/vue (never custom
// elements), and each one mounts as a Vue island without errors or warnings.
import { describe, expect, it, vi } from "vitest";
import { createApp, h, nextTick, reactive, type Component } from "vue";
import { ConfigProvider, provideEmbeddedScope } from "minerva-design/vue";
import { docPages } from "./registry";
import { vueDemosOf } from "./vueDemos";

const baseline = Object.keys(
  import.meta.glob("./pages/*/wc/*.html", { query: "?raw" }),
);

describe("native Vue demos", () => {
  it.each(
    baseline.map((path) => {
      const [, , page, , name] = path.split("/");
      return [page!, name!.replace(/\.html$/, "")] as const;
    }),
  )("%s/%s has a native Vue counterpart", (page, demo) => {
    // Button publishes the finer-grained React scenes instead of two combined WC scenes.
    const scenes =
      page === "button" && demo === "colors-variants"
        ? ["colors", "variants"]
        : page === "button" && demo === "sizes-shapes"
          ? ["sizes", "shapes"]
          : [demo];
    for (const scene of scenes) expect(vueDemosOf(page)[scene]).toBeDefined();
  });

  const all = docPages.flatMap((page) =>
    Object.entries(vueDemosOf(page.id)).map(
      ([demo, entry]) => [`${page.id}/${demo}`, entry] as const,
    ),
  );

  it.each(all)("%s mounts as a Vue island", async (_name, entry) => {
    const component = (await entry.load()) as Component;
    const warnings: string[] = [];
    const errors: unknown[] = [];
    const root = document.createElement("div");
    document.body.appendChild(root);
    const settings = reactive({ theme: "light" as "light" | "dark" });
    const app = createApp({
      render: () =>
        h(ConfigProvider, { theme: settings.theme }, () => h(component)),
    });
    provideEmbeddedScope(app, { language: "en" });
    app.config.warnHandler = (message) => warnings.push(message);
    app.config.errorHandler = (error) => errors.push(error);
    const consoleError = vi.spyOn(console, "error");
    app.mount(root);
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(root.querySelector("[data-minerva]")).not.toBeNull();
    settings.theme = "dark";
    await nextTick();
    expect(root.querySelector('[data-theme="dark"]')).not.toBeNull();
    app.unmount();
    root.remove();
    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect(errors).toEqual([]);
    expect(warnings).toEqual([]);
    // the demo never wrote <html> (embedded island)
    expect(document.documentElement.hasAttribute("data-theme")).toBe(false);
  });
});
