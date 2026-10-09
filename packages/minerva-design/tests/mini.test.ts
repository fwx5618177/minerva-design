// Exercise emitted WeChat registrations and inspect framework compilation boundaries.
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
import { describe, expect, it, vi } from "vitest";
import { build } from "vite";
import vue from "@vitejs/plugin-vue";
const file = (path: string) =>
  fileURLToPath(new URL(`../dist/${path}`, import.meta.url));

type Instance = {
  data: Record<string, unknown>;
  triggerEvent: ReturnType<typeof vi.fn>;
  setData: (patch: Record<string, unknown>) => void;
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
    setData(patch) {
      Object.assign(this.data, patch);
    },
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

describe("complete mini renderer distribution", () => {
  it("packages every uni SFC while exposing only public components", () => {
    const source = new URL("../../uni/src/", import.meta.url);
    const pkg = JSON.parse(
      readFileSync(new URL("../package.json", import.meta.url), "utf8"),
    );
    const components = readdirSync(source).filter((name) =>
      name.endsWith(".vue"),
    );
    expect(components.length).toBeGreaterThan(3);
    for (const name of components) {
      expect(existsSync(file(`uni/${name}`)), name).toBe(true);
      expect(existsSync(file(`uni/${name}.d.ts`)), name).toBe(true);
      if (
        [
          "DialogSurface.vue",
          "MenuEntries.vue",
          "MenuInline.vue",
          "MonacoCodeEditor.vue",
        ].includes(name)
      ) {
        expect(pkg.exports[`./uni/${name}`]).toBeUndefined();
      } else {
        expect(pkg.exports[`./uni/${name}`]).toEqual({
          types: `./dist/uni/${name}.d.ts`,
          default: `./dist/uni/${name}`,
        });
      }
    }
  });

  it("all emitted WeChat templates bind to real registered handlers", () => {
    const dirs = readdirSync(file("weapp"), { withFileTypes: true }).filter(
      (entry) => entry.isDirectory(),
    );
    expect(dirs.length).toBeGreaterThan(3);
    for (const { name } of dirs) {
      const def = definition(name);
      const template = readFileSync(file(`weapp/${name}/index.wxml`), "utf8");
      for (const [, handler] of template.matchAll(
        /(?:bind|catch)(?::?[a-z]+)="([A-Za-z_$][\w$]*)"/g,
      )) {
        expect(typeof def.methods[handler], `${name}: ${handler}`).toBe(
          "function",
        );
      }
      expect(readFileSync(file(`weapp/${name}/index.wxss`), "utf8")).toContain(
        "../controls.wxss",
      );
      expect(
        JSON.parse(readFileSync(file(`weapp/${name}/index.json`), "utf8"))
          .component,
      ).toBe(true);
    }
  });
});

it.each(["config-provider", "theme-provider"])(
  "WeChat %s owns theme tokens inside its isolated style scope",
  (name) => {
    const css = readFileSync(file(`weapp/${name}/index.wxss`), "utf8");
    expect(css).toContain("../tokens.component.wxss");
    const tokens = readFileSync(file("weapp/tokens.component.wxss"), "utf8");
    for (const selector of [
      ".mn-root",
      ".mn-theme-dark",
      ".mn-palette-tech-dark",
      ".mn-density-compact",
    ]) {
      expect(tokens).toContain(selector);
    }
  },
);

describe("optional H5 Monaco distribution", () => {
  it.each(["taro", "uni"])(
    "browser-compiles the published %s entry without bundling Monaco",
    async (renderer) => {
      const pkg = JSON.parse(
        readFileSync(new URL("../package.json", import.meta.url), "utf8"),
      );
      expect(pkg.exports[`./${renderer}/monaco`]).toEqual({
        types: `./dist/${renderer}/monaco.d.ts`,
        default: `./dist/${renderer}/monaco.js`,
      });
      const declaration = readFileSync(file(`${renderer}/monaco.d.ts`), "utf8");
      expect(declaration).toContain("MonacoCodeEditor");
      expect(declaration).toContain("MonacoCodeEditorProps");
      const props =
        renderer === "uni"
          ? readFileSync(file("uni/monaco-types.d.ts"), "utf8")
          : declaration;
      expect(props).toMatch(/monaco\?\s*:/);
      expect(props).toContain("monaco-editor");
      expect(readFileSync(file(`${renderer}/index.js`), "utf8")).not.toMatch(
        /MonacoCodeEditor|monaco-editor|\.\/monaco/,
      );
      const result = await build({
        configFile: false,
        logLevel: "silent",
        plugins: renderer === "uni" ? [vue()] : [],
        build: {
          write: false,
          minify: false,
          lib: { entry: file(`${renderer}/monaco.js`), formats: ["es"] },
          rollupOptions: {
            // Host frameworks are supplied by the H5 application, as in the SDK fixtures.
            external: (id) => !id.startsWith(".") && !id.startsWith("/"),
          },
        },
      });
      const outputs = (Array.isArray(result) ? result : [result]).flatMap(
        (bundle) => ("output" in bundle ? bundle.output : []),
      );
      const chunks = outputs.filter((chunk) => chunk.type === "chunk");
      expect(
        chunks.some((chunk) => chunk.exports.includes("MonacoCodeEditor")),
      ).toBe(true);
      expect(chunks.flatMap((chunk) => chunk.imports)).not.toContain(
        "monaco-editor",
      );
      expect(chunks.map((chunk) => chunk.code).join("\n")).not.toMatch(
        /(?:import|from)\s*\(?["']monaco-editor/,
      );
      if (renderer === "uni") {
        expect(
          chunks.some((chunk) =>
            Object.keys(chunk.modules).some((id) =>
              id.includes("MonacoCodeEditor.vue"),
            ),
          ),
        ).toBe(true);
      }
    },
  );
});

it("provider WXSS imports only component-safe class token selectors", () => {
  for (const name of ["config-provider", "theme-provider"]) {
    const root = readFileSync(file(`weapp/${name}/index.wxss`), "utf8");
    const imports = [...root.matchAll(/@import ["']\.\.\/([^"']+)["']/g)];
    const css = imports
      .map((match) => readFileSync(file(`weapp/${match[1]}`), "utf8"))
      .join("\n");
    const selectors = [
      ...css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{/g),
    ].map((match) => match[1].trim());
    expect(
      selectors.filter((selector) =>
        /(^|[,\s>+~])(?:page|view|button|text)(?=[\s,.#:{>+~]|$)|\[[^\]]+\]/.test(
          selector,
        ),
      ),
    ).toEqual([]);
    expect(css).toContain(".mn-root");
    expect(css).toContain("--primary-color:");
  }
  expect(readFileSync(file("weapp/tokens.wxss"), "utf8")).toContain(
    "page, .mn-root",
  );
});
