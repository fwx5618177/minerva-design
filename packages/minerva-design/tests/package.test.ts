// The assembled package as a whole: every entry of the exports map exists
// and loads in Node (ESM, and CJS where provided), "use client" banners are
// exactly on the React client entries, the framework-agnostic core is
// shipped once (dist/core/) and shared by the React and web component entry
// graphs, the web components never reach React-only bundles and the React
// Native entry never reaches web bundles.
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { rolldown } from "rolldown";
import { describe, expect, it } from "vitest";
import {
  expectedExports,
  expectedTypesVersions,
} from "../scripts/sync-package.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
// Resolve "minerva-design" through its own exports map (self-reference)
const require = createRequire(join(root, "package.json"));

type Conditions = Record<string, unknown>;
const exportsMap = pkg.exports as Record<string, string | Conditions>;

const targets = (entry: unknown): string[] =>
  typeof entry === "string"
    ? [entry]
    : Object.values(entry as Conditions).flatMap(targets);

const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
  );

/** JS entries: subpath -> whether it is a React client entry */
const JS_ENTRIES = Object.keys(exportsMap).filter((key) => {
  const files = targets(exportsMap[key]);
  return files.some((f) => /\.c?js$/.test(f));
});
const CLIENT_ENTRIES = new Set([".", "./monaco"]);
/** Entries requiring native hosts or the mini/H5 framework compiler.
 * Optional H5 entries are browser-compiled in mini.test.ts. */
const NATIVE_ENTRIES = new Set([
  "./native",
  "./taro",
  "./uni",
  "./taro/monaco",
  "./uni/monaco",
]);
const specifier = (key: string) =>
  key === "." ? "minerva-design" : `minerva-design/${key.slice(2)}`;
const fileOf = (key: string, condition: "import" | "require") => {
  const entry = exportsMap[key];
  if (typeof entry === "string") return entry;
  const branch = (entry[condition] ?? entry) as Conditions;
  return branch.default as string | undefined;
};

describe("exports map", () => {
  it("is generated from the sources (scripts/sync-package.mjs)", () => {
    expect(pkg.exports).toEqual(expectedExports());
    expect(pkg.typesVersions).toEqual(expectedTypesVersions());
  });

  it("every target exists (wildcards included)", () => {
    const missing = Object.values(exportsMap)
      .flatMap(targets)
      .map((file) => file.replace("*", "button"))
      .filter((file) => !existsSync(join(root, file)));
    expect(missing).toEqual([]);
    for (const file of [pkg.main, pkg.module, pkg.types]) {
      expect(existsSync(join(root, file)), file).toBe(true);
    }
    expect(existsSync(join(root, pkg.customElements))).toBe(true);
  });

  it("has a declaration file for every JS condition", () => {
    for (const key of JS_ENTRIES) {
      const entry = exportsMap[key];
      if (typeof entry === "string") continue; // the CDN bundle
      for (const branch of "import" in entry
        ? [entry.import, entry.require]
        : [entry]) {
        const { types, default: file } = branch as Record<string, string>;
        expect(types, key).toBe(
          file
            .replace(/\.js$/, ".d.ts")
            .replace(/\.cjs$/, ".d.cts")
            .replace(
              // the styling-hooks declarations live in a folder
              /core\/styling-hooks\.d\.(c?)ts$/,
              "core/styling-hooks/index.d.$1ts",
            ),
        );
        expect(existsSync(join(root, types)), types).toBe(true);
      }
    }
  });
});

describe("every entry loads in Node", () => {
  // (the CDN bundle is a browser-only file, loaded by <script type="module">)
  it.each(
    JS_ENTRIES.filter(
      (key) => key !== "./web-components/cdn" && !NATIVE_ENTRIES.has(key),
    ),
  )("%s (ESM)", async (key) => {
    const mod = await import(specifier(key));
    // define entries export their element classes
    expect(Object.keys(mod).length, key).toBeGreaterThan(0);
  });

  it.each(
    JS_ENTRIES.filter(
      (key) =>
        fileOf(key, "require")?.endsWith(".cjs") && !NATIVE_ENTRIES.has(key),
    ),
  )("%s (CJS)", (key) => {
    const mod = require(specifier(key));
    expect(Object.keys(mod).length, key).toBeGreaterThan(0);
  });
});

describe('"use client"', () => {
  it.each(JS_ENTRIES)("%s", (key) => {
    const client = CLIENT_ENTRIES.has(key);
    for (const condition of ["import", "require"] as const) {
      const file = fileOf(key, condition);
      if (!file) continue;
      const code = readFileSync(join(root, file), "utf8");
      expect(code.startsWith('"use client";'), file).toBe(client);
      if (!client) expect(code, file).not.toContain('"use client"');
    }
  });

  it("only the React modules carry the banner (core and web components are server-safe)", () => {
    const js = (dir: string) =>
      walk(join(root, "dist", dir)).filter((f) => /\.c?js$/.test(f));
    for (const file of [...js("core"), ...js("web-components")]) {
      expect(readFileSync(file, "utf8"), file).not.toContain('"use client"');
    }
  });
});

describe("one copy of the core", () => {
  const coreDir = join(root, "dist/core");
  const domDir = join(root, "dist/dom");
  const nonCore = [
    "react",
    "web-components",
    "vue",
    "angular",
    "native",
    "taro",
    "uni",
  ].flatMap((dir) =>
    walk(join(root, "dist", dir)).filter(
      (f) => /\.(c?js|d\.c?ts)$/.test(f) && !f.includes("/cdn/"),
    ),
  );

  it("React and web component modules import dist/core and dist/dom, never @minerva/*", () => {
    let imports = 0;
    for (const file of nonCore) {
      const code = readFileSync(file, "utf8");
      expect(code, file).not.toMatch(/["']@minerva\//);
      for (const [, path] of code.matchAll(
        /["']((?:\.\.\/)+(?:core|dom)\/[^"']+)["']/g,
      )) {
        imports++;
        const target = join(dirname(file), path);
        expect(
          relative(coreDir, target).startsWith("..") &&
            relative(domDir, target).startsWith(".."),
          path,
        ).toBe(false);
        const declaration = /\.d\.c?ts$/.test(file);
        expect(
          existsSync(
            declaration
              ? target.replace(/\.js$/, ".d.ts").replace(/\.cjs$/, ".d.cts")
              : target,
          ),
          `${file} -> ${path}`,
        ).toBe(true);
      }
    }
    expect(imports).toBeGreaterThan(100);
  });

  it("no core code is inlined into the React or web component modules", () => {
    // strings that only exist in the core sources (built-in messages) and in
    // the dom sources (the floating-ui based positioning)
    const markers = ["Clear selection", "@floating-ui/dom"];
    const core = readFileSync(join(coreDir, "index.js"), "utf8");
    const dom = readFileSync(join(domDir, "index.js"), "utf8");
    expect(core).toContain("Clear selection");
    expect(dom).toContain("@floating-ui/dom");
    // the platform-neutral core never touches the DOM half
    expect(core).not.toContain("@floating-ui/dom");
    expect(core).not.toMatch(/["']\.\.\/dom\//);
    for (const file of nonCore.filter((f) => /\.c?js$/.test(f))) {
      const code = readFileSync(file, "utf8");
      for (const marker of markers) {
        expect(code.includes(marker), `${file}: ${marker}`).toBe(false);
      }
    }
  });

  it("an app using both React and web components bundles the core once", async () => {
    const bundle = await rolldown({
      input: "entry",
      cwd: root,
      platform: "browser",
      logLevel: "silent",
      external: (id) =>
        /^(react|react-dom|lit|@lit|lit-html|lit-element)(\/|$)/.test(id),
      plugins: [
        {
          name: "virtual-entry",
          resolveId: (id) => (id === "entry" ? "\0entry" : null),
          load: (id) =>
            id === "\0entry"
              ? `import { Button, useConfig } from "minerva-design";
import { createFocusScope } from "minerva-design/core";
import "minerva-design/web-components/button";
import "minerva-design/web-components/modal";
console.log(Button, useConfig, createFocusScope);`
              : null,
        },
      ],
    });
    const { output } = await bundle.generate({ format: "esm" });
    await bundle.close();
    const modules = output.flatMap((chunk) =>
      chunk.type === "chunk" ? Object.keys(chunk.modules) : [],
    );
    const coreModules = modules.filter((id) =>
      /[\\/]dist[\\/](core|dom)[\\/]/.test(id),
    );
    // minerva-design/core (dist/dom/core-web.js) is a re-export facade of
    // the same two modules
    expect(
      coreModules
        .map((id) => relative(root, id))
        .filter((id) => !id.endsWith("core-web.js"))
        .sort(),
    ).toEqual(["dist/core/index.js", "dist/dom/index.js"]);
    const code = output
      .map((chunk) => (chunk.type === "chunk" ? chunk.code : ""))
      .join("\n");
    expect(code.split("Clear selection").length - 1).toBeLessThanOrEqual(1);
  });

  it("React-only bundles never contain the web components (nor lit)", async () => {
    const bundle = await rolldown({
      input: "entry",
      cwd: root,
      platform: "browser",
      logLevel: "silent",
      external: (id) => /^(react|react-dom)(\/|$)/.test(id),
      plugins: [
        {
          name: "virtual-entry",
          resolveId: (id) => (id === "entry" ? "\0entry" : null),
          load: (id) =>
            id === "\0entry"
              ? 'import * as lib from "minerva-design"; console.log(lib);'
              : null,
        },
      ],
    });
    const { output } = await bundle.generate({ format: "esm" });
    await bundle.close();
    const modules = output.flatMap((chunk) =>
      chunk.type === "chunk" ? Object.keys(chunk.modules) : [],
    );
    expect(
      modules.filter((id) =>
        /web-components|[\\/]lit(-html|-element)?[\\/]/.test(id),
      ),
    ).toEqual([]);
  });
});

describe("React Native entry (minerva-design/native)", () => {
  const nativeDir = join(root, "dist/native");
  const modules = walk(nativeDir).filter(
    (f) => /\.c?js$/.test(f) && !f.includes(`${nativeDir}/source/`),
  );
  const specifiers = (code: string) =>
    Array.from(
      code.matchAll(
        /(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s+|\brequire\(\s*)["']([^"']+)["']/g,
      ),
      (m) => m[1],
    );

  it("resolves for Metro (react-native), TypeScript, ESM, CJS and source", () => {
    const entry = exportsMap["./native"] as Record<string, unknown>;
    // condition order matters: Metro picks the first matching key
    expect(Object.keys(entry)).toEqual([
      "source",
      "react-native",
      "import",
      "require",
    ]);
    for (const file of targets(entry)) {
      expect(existsSync(join(root, file)), file).toBe(true);
    }
    expect(pkg.typesVersions["*"].native).toEqual(["./dist/native/index.d.ts"]);
  });

  it("imports only native runtime dependencies and the shared core (one copy)", () => {
    const allowed =
      /^(react|react\/jsx-runtime|react-native|jsonc-parser\/lib\/esm\/main\.js)$/;
    expect(pkg.dependencies["jsonc-parser"]).toBeTruthy();
    expect(modules.length).toBeGreaterThan(20);
    for (const file of modules) {
      for (const spec of specifiers(readFileSync(file, "utf8"))) {
        if (spec.startsWith(".")) {
          const target = join(dirname(file), spec);
          const inNative = !relative(nativeDir, target).startsWith("..");
          const inCore = !relative(join(root, "dist/core"), target).startsWith(
            "..",
          );
          expect(inNative || inCore, `${file} -> ${spec}`).toBe(true);
          expect(existsSync(target), `${file} -> ${spec}`).toBe(true);
        } else {
          expect(spec, file).toMatch(allowed);
        }
      }
    }
  });

  it("the TypeScript sources point at the shared core build", () => {
    const sources = walk(join(nativeDir, "source"));
    expect(sources.some((f) => f.endsWith("index.ts"))).toBe(true);
    for (const file of sources) {
      const code = readFileSync(file, "utf8");
      expect(code, file).not.toMatch(/["']@minerva\//);
      expect(code, file).not.toMatch(/\.test\.tsx?["']/);
    }
  });

  it("React web bundles never contain React Native code", async () => {
    const bundle = await rolldown({
      input: "entry",
      cwd: root,
      platform: "browser",
      logLevel: "silent",
      external: (id) =>
        /^(react|react-dom|lit|@lit|lit-html|lit-element)(\/|$)/.test(id),
      plugins: [
        {
          name: "virtual-entry",
          resolveId: (id) => (id === "entry" ? "\0entry" : null),
          load: (id) =>
            id === "\0entry"
              ? `import * as lib from "minerva-design";
import * as core from "minerva-design/core";
import "minerva-design/web-components";
console.log(lib, core);`
              : null,
        },
      ],
    });
    const { output } = await bundle.generate({ format: "esm" });
    await bundle.close();
    const modules = output.flatMap((chunk) =>
      chunk.type === "chunk" ? Object.keys(chunk.modules) : [],
    );
    expect(
      modules.filter((id) => /[\\/]dist[\\/]native[\\/]/.test(id)),
    ).toEqual([]);
    const code = output
      .map((chunk) => (chunk.type === "chunk" ? chunk.code : ""))
      .join("\n");
    expect(code).not.toMatch(/["']react-native["']/);
  });
});
