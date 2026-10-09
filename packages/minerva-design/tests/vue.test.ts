// The native Vue 3 renderer of minerva-design (dist/vue/), checked the way a
// consumer sees it: the exports map, server rendering in Node
// (vue/server-renderer, no DOM), the class names shared with the React
// stylesheet, the shared core, and tree-shaking (one component stays small).
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { rolldown } from "rolldown";
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";
import { describe, expect, it } from "vitest";
import { PLANNED_RENDERERS, VUE_SUBPATHS } from "../scripts/sync-package.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const vueDist = join(root, "dist/vue");

const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
  );
const vueModules = () => walk(vueDist).filter((f) => f.endsWith(".js"));

/** Minified size of an app importing `code` (vue and the core external) */
async function bundle(code: string) {
  const dir = mkdtempSync(join(tmpdir(), "minerva-vue-"));
  const input = join(dir, "entry.js");
  // the published entry by path (the temp folder cannot resolve the package)
  writeFileSync(
    input,
    code.replace(
      '"minerva-design/vue"',
      JSON.stringify(join(vueDist, "index.js")),
    ),
  );
  const build = await rolldown({
    input,
    cwd: root,
    platform: "browser",
    logLevel: "silent",
    external: (id) =>
      /^(vue|@vue)(\/|$)/.test(id) ||
      /[\\/]dist[\\/](core|dom)[\\/]index\.js$/.test(id),
    transform: { define: { "process.env.NODE_ENV": '"production"' } },
  });
  const { output } = await build.generate({ format: "es", minify: true });
  await build.close();
  const js = output
    .map((chunk) => (chunk.type === "chunk" ? chunk.code : ""))
    .join("\n");
  const modules = output.flatMap((chunk) =>
    chunk.type === "chunk" ? Object.keys(chunk.modules) : [],
  );
  return { size: Buffer.byteLength(js), js, modules };
}

describe("exports map", () => {
  it("renders the optional Monaco component from its emitted entry without starting a browser engine", async () => {
    const { MonacoCodeEditor } = await import(
      new URL("../dist/vue/monaco.js", import.meta.url).href
    );
    expect(MonacoCodeEditor).toBeDefined();
    const html = await renderToString(
      createSSRApp({
        render: () =>
          h(MonacoCodeEditor, { modelValue: "source", label: "Source editor" }),
      }),
    );
    expect(html).toContain('data-minerva="code-editor"');
    expect(html).toContain('aria-label="Source editor"');
    expect(html).toContain('aria-busy="true"');
  });
  it("publishes minerva-design/vue (ESM only) and its optional entries", () => {
    expect(pkg.exports["./vue"]).toEqual({
      types: "./dist/vue/index.d.ts",
      default: "./dist/vue/index.js",
    });
    expect(pkg.exports["./vue/monaco"]).toEqual({
      types: "./dist/vue/monaco.d.ts",
      default: "./dist/vue/monaco.js",
    });
    expect(pkg.exports["./vue/global"]).toEqual({
      types: "./dist/vue/global.d.ts",
    });
    expect(VUE_SUBPATHS).toEqual(["./vue", "./vue/monaco"]);
    expect(Object.keys(PLANNED_RENDERERS)).not.toContain("vue");
    for (const file of ["index.js", "index.d.ts", "monaco.js", "global.d.ts"])
      expect(existsSync(join(vueDist, file)), file).toBe(true);
  });

  it("declares vue as an optional peer dependency", () => {
    expect(pkg.peerDependencies.vue).toMatch(/^\^3\./);
    expect(pkg.peerDependenciesMeta.vue).toEqual({ optional: true });
  });

  it("ships no Vue-only stylesheet (the React style.css styles both)", () => {
    expect(walk(vueDist).filter((f) => /\.s?css$/.test(f))).toEqual([]);
  });

  it("types the global components of the plugin (Volar)", () => {
    const global = readFileSync(join(vueDist, "global.d.ts"), "utf8");
    expect(global).toContain('declare module "vue"');
    expect(global).toContain("MnButton: typeof Minerva.Button;");
  });
});

describe("shared with the React renderer", () => {
  it("imports the class-name maps of the React build (same hashed classes as style.css)", () => {
    const css = readFileSync(join(root, "dist/react/style.css"), "utf8");
    let maps = 0;
    for (const file of vueModules()) {
      const code = readFileSync(file, "utf8");
      expect(code, file).not.toContain("@react-styles/");
      for (const [, path] of code.matchAll(
        /["']((?:\.\.\/)+react\/[^"']+\.module\.scss\.js)["']/g,
      )) {
        const target = join(dirname(file), path);
        expect(existsSync(target), `${file} -> ${path}`).toBe(true);
        expect(relative(join(root, "dist/react"), target)).not.toMatch(/^\.\./);
        const classes = readFileSync(target, "utf8").matchAll(
          /"(_[\w-]+_[\w-]+)"/g,
        );
        for (const [, className] of classes) {
          maps++;
          // a class (`.name`) or a keyframes name of the same module
          expect(css, `${className} (${path})`).toContain(className);
        }
      }
    }
    expect(maps).toBeGreaterThan(100);
  });

  it("imports dist/core and dist/dom, never @minerva/*", () => {
    for (const file of walk(vueDist).filter((f) => /\.(js|d\.ts)$/.test(f))) {
      const code = readFileSync(file, "utf8");
      expect(code, file).not.toMatch(/["']@minerva\//);
      for (const [, path] of code.matchAll(
        /["']((?:\.\.\/)+(?:core|dom)\/[^"']+)["']/g,
      )) {
        const target = join(dirname(file), path);
        const resolved = file.endsWith(".d.ts")
          ? target.replace(/\.js$/, ".d.ts")
          : target;
        expect(existsSync(resolved), `${file} -> ${path}`).toBe(true);
      }
    }
  });
});

describe("server rendering in Node (vue/server-renderer)", () => {
  it("renders components with their classes, hooks and translated texts", async () => {
    const vue = await import("minerva-design/vue");
    const app = createSSRApp({
      render: () =>
        h(vue.ConfigProvider, { locale: { language: "fr" } }, () => [
          h(vue.Button, { variant: "outline" }, () => "Enregistrer"),
          h(vue.Modal, { open: true, title: "Titre" }, () => "Corps"),
        ]),
    });
    const html = await renderToString(app);
    expect(html).toContain('data-minerva="button"');
    expect(html).toContain('data-variant="outline"');
    expect(html).toContain("Enregistrer");
    // React's hashed class names (the published style.css styles them)
    expect(html).toMatch(/class="_customButton_\w+/);
    // overlays render on the client only (teleport after mount)
    expect(html).not.toContain("Corps");
  });

  it("installs every component globally with the plugin", async () => {
    const vue = await import("minerva-design/vue");
    const app = createSSRApp({ template: "<div />" });
    app.use(vue.default);
    expect(app.component("MnButton")).toBe(vue.Button);
    expect(app.component("MnModal")).toBe(vue.Modal);
  });
});

describe("tree-shaking", () => {
  it("an app importing Button only stays small (no other component)", async () => {
    const { size, js, modules } = await bundle(
      'import { Button } from "minerva-design/vue"; console.log(Button);',
    );
    expect(size).toBeLessThan(6 * 1024);
    expect(js).toMatch(/["'`]button["'`]/);
    for (const id of modules)
      expect(id, "only the Button modules and their helpers").not.toMatch(
        /components[\\/](?!Button[\\/])\w+[\\/]/,
      );
    expect(js).not.toContain("modal");
  });

  it("the plugin brings every component", async () => {
    const { size } = await bundle(
      'import MinervaVue from "minerva-design/vue"; console.log(MinervaVue);',
    );
    const single = (
      await bundle(
        'import { Button } from "minerva-design/vue"; console.log(Button);',
      )
    ).size;
    expect(size).toBeGreaterThan(single * 5);
  });
});
