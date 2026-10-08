// @vitest-environment node
// Every component renders on a server without a DOM (no `document` /
// `window` access during setup or render), with default props.
import { describe, expect, it } from "vitest";
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";
import { allComponents } from "../src/plugin";

/** Props a component cannot render without */
const REQUIRED: Record<string, Record<string, unknown>> = {
  DataTable: { columns: [{ key: "a", header: "A" }], data: [{ a: 1 }] },
  Table: { columns: [{ key: "a", header: "A" }], data: [{ a: 1 }] },
  Cascader: { options: [] },
  VirtualList: { items: [1, 2, 3], itemHeight: 20, height: 100 },
  Menu: { items: [] },
  ContextMenu: { items: [] },
  NavTree: { items: [] },
  Steps: { items: [] },
  DescriptionList: { items: [] },
  PageTabs: { items: [] },
  Tab: { value: "a" },
  TabPanel: { value: "a" },
  Radio: { value: "a" },
  SelectItem: { value: "a" },
  PageTab: { value: "a" },
  KeyValueEditor: {},
  RatingScale: { items: [] },
  Rating: { modelValue: 3 },
};

describe("server rendering without a DOM", () => {
  const components = Object.entries(allComponents());

  it("finds the components", () => {
    expect(components.length).toBeGreaterThan(80);
    expect(typeof document).toBe("undefined");
  });

  it.each(components)("%s", async (name, component) => {
    const errors: unknown[] = [];
    const app = createSSRApp({
      render: () => h(component, REQUIRED[name] ?? {}, () => "content"),
    });
    app.config.errorHandler = (error) => errors.push(error);
    app.config.warnHandler = () => {};
    const html = await renderToString(app).catch((error) => {
      errors.push(error);
      return "";
    });
    const domErrors = errors.filter((e) =>
      /\b(document|window|navigator|HTMLElement|matchMedia)\b.*(not defined|undefined)/.test(
        String(e),
      ),
    );
    expect(domErrors, name).toEqual([]);
    expect(typeof html).toBe("string");
  });
});
