// Exercise emitted WeChat registrations and inspect framework compilation boundaries.
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
import { describe, expect, it, vi } from "vitest";
const file = (path: string) =>
  fileURLToPath(new URL(`../dist/${path}`, import.meta.url));

type Instance = {
  data: Record<string, unknown>;
  triggerEvent: ReturnType<typeof vi.fn>;
};
type Definition = {
  behaviors: string[];
  properties: Record<string, { value: unknown }>;
  methods: Record<string, (this: Instance, event?: unknown) => unknown>;
};
function definition(name: string): Definition {
  const path = file(`weapp/${name}/index.js`);
  let result: Definition | undefined;
  runInNewContext(readFileSync(path, "utf8"), {
    require: createRequire(path),
    Component: (value: Definition) => {
      result = value;
    },
  });
  if (!result) throw new Error(`${name}: no native Component registration`);
  return result;
}
function instance(def: Definition): Instance {
  return {
    data: Object.fromEntries(
      Object.entries(def.properties).map(([k, p]) => [k, p.value]),
    ),
    triggerEvent: vi.fn(),
  };
}

describe("native mini-program distribution", () => {
  it.each(["button", "input", "switch"])(
    "ships a registered %s with native assets",
    (name) => {
      expect(definition(name).methods).toBeDefined();
      expect(definition(name).behaviors).toContain(
        name === "button"
          ? "wx://form-field-button"
          : name === "switch"
            ? "wx://form-field-group"
            : "wx://form-field",
      );
      for (const extension of ["json", "wxml", "wxss"])
        expect(existsSync(file(`weapp/${name}/index.${extension}`))).toBe(true);
      expect(
        JSON.parse(readFileSync(file(`weapp/${name}/index.json`), "utf8")),
      ).toEqual({ component: true });
    },
  );
  it("built button suppresses taps while loading", () => {
    const def = definition("button");
    const self = instance(def);
    def.methods.onTap.call(self);
    expect(self.triggerEvent).toHaveBeenCalledWith("click", {});
    self.data.loading = true;
    def.methods.onTap.call(self);
    expect(self.triggerEvent).toHaveBeenCalledTimes(1);
  });
  it("built input emits a controlled change and returns the current value", () => {
    const def = definition("input");
    const self = instance(def);
    self.data.value = "current";
    expect(def.methods.onInput.call(self, { detail: { value: "next" } })).toBe(
      "current",
    );
    expect(self.triggerEvent).toHaveBeenCalledWith("change", { value: "next" });
  });
  it("uni-app preserves SFCs and native tags for the consumer compiler", () => {
    for (const [name, tag] of [
      ["Button", "button"],
      ["Input", "input"],
      ["Switch", "switch"],
    ]) {
      expect(readFileSync(file(`uni/${name}.vue`), "utf8")).toContain(
        `<${tag}`,
      );
      expect(existsSync(file(`uni/${name}.vue.d.ts`))).toBe(true);
    }
    expect(readFileSync(file("uni/index.js"), "utf8")).toContain(
      "../core/index.js",
    );
  });
  it("Taro retains native host imports and does not bundle a React runtime", () => {
    const code = readFileSync(file("taro/index.js"), "utf8");
    expect(code).toContain('"@tarojs/components"');
    expect(code).not.toMatch(
      /react-dom|@minerva\/|createRoot|react.production/,
    );
    expect(existsSync(file("taro/index.d.ts"))).toBe(true);
  });
});
