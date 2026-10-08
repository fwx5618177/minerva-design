// Keeps the documentation site honest:
// - every public export of the libraries has a documentation page
// - API tables are generated from the current types.ts files
// - every locale has exactly the same keys, and every key used exists
// - every page / demo listed in the registry exists, with its strings
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import {
  OUTPUT,
  OUTPUT_WC,
  generateApi,
  generateCssVars,
  generateElements,
  serialize,
  sortKeys,
} from "../../scripts/generate-api.mjs";
import { docPages } from "./registry";
import {
  WC_SECTIONS,
  wcDescriptionKeys,
  wcMembers,
  type ApiElement,
} from "./api";

type Json = { [key: string]: Json } | string;

const here = dirname(fileURLToPath(import.meta.url));
const SRC = join(here, "..");
const PACKAGES = join(SRC, "../../../packages");
const LOCALES = join(SRC, "i18n/locales");
const LANGUAGES = ["en", "zh", "ja", "fr"];

const readJson = (file: string) =>
  JSON.parse(readFileSync(file, "utf8")) as Json;

/** All locale messages of a language, as i18n sees them */
const messagesFor = (lng: string): Json => {
  const docsDir = join(LOCALES, lng, "docs");
  const docs: Record<string, Json> = {};
  if (existsSync(docsDir)) {
    for (const file of readdirSync(docsDir).filter((f) =>
      f.endsWith(".json"),
    )) {
      docs[file.replace(/\.json$/, "")] = readJson(join(docsDir, file));
    }
  }
  return { ...(readJson(join(LOCALES, lng, "common.json")) as object), docs };
};

const flatten = (value: Json, prefix = ""): Map<string, string> => {
  const out = new Map<string, string>();
  if (typeof value === "string") {
    out.set(prefix, value);
    return out;
  }
  for (const [key, child] of Object.entries(value)) {
    for (const [k, v] of flatten(child, prefix ? `${prefix}.${key}` : key)) {
      out.set(k, v);
    }
  }
  return out;
};

const locales = Object.fromEntries(
  LANGUAGES.map((lng) => [lng, flatten(messagesFor(lng))]),
);
const en = locales.en;

const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });

/** Names exported as values (not types) from a module, following re-exports */
const valueExports = (file: string, seen = new Set<string>()): string[] => {
  if (seen.has(file)) return [];
  seen.add(file);
  const source = ts.createSourceFile(
    file,
    readFileSync(file, "utf8"),
    ts.ScriptTarget.Latest,
    true,
  );
  const resolve = (specifier: string) => {
    const base = join(dirname(file), specifier);
    const candidates = [
      `${base}.ts`,
      `${base}.tsx`,
      join(base, "index.ts"),
      join(base, "index.tsx"),
    ];
    const found = candidates.find((c) => existsSync(c));
    if (!found) throw new Error(`Cannot resolve ${specifier} from ${file}`);
    return found;
  };
  const names: string[] = [];
  for (const statement of source.statements) {
    if (!ts.isExportDeclaration(statement) || statement.isTypeOnly) continue;
    const specifier = statement.moduleSpecifier;
    if (!statement.exportClause) {
      if (specifier && ts.isStringLiteral(specifier)) {
        names.push(...valueExports(resolve(specifier.text), seen));
      }
      continue;
    }
    if (ts.isNamedExports(statement.exportClause)) {
      for (const element of statement.exportClause.elements) {
        if (!element.isTypeOnly) names.push(element.name.text);
      }
    }
  }
  return names;
};

describe("docs: API tables", () => {
  it("api.generated.json matches the current types (run `pnpm --filter @minerva/docs gen:api`)", () => {
    expect(readFileSync(OUTPUT, "utf8")).toBe(serialize(generateApi()));
    expect(readFileSync(OUTPUT_WC, "utf8")).toBe(
      serialize(sortKeys(generateElements())),
    );
  });

  const api = generateApi() as Record<
    string,
    { kind: string; props?: { name: string }[] }
  >;

  it.each(docPages.filter((p) => p.api?.length).map((p) => [p.id, p] as const))(
    "%s: every API interface exists and every prop is described in all locales",
    (id, page) => {
      for (const name of page.api ?? []) {
        expect(
          api[name],
          `${name} not found in api.generated.json`,
        ).toBeDefined();
        expect(api[name].kind).toBe("interface");
        const key = name.replace(/:/g, "_");
        for (const prop of api[name].props ?? []) {
          const path = `docs.${id}.api.${key}.${prop.name}`;
          expect(en.has(path), `missing description key ${path}`).toBe(true);
        }
      }
    },
  );
});

describe("docs: CSS variables", () => {
  const cssVars = generateCssVars();
  const componentsDir = join(PACKAGES, "react/src/components");
  const styledFolders = readdirSync(componentsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) =>
      readdirSync(join(componentsDir, name)).some((f) =>
        f.endsWith(".module.scss"),
      ),
    )
    .sort();

  it("every styled component declares its CSS variables and has them documented", () => {
    const listed = docPages.flatMap((p) => p.cssVars ?? []);
    expect(
      styledFolders.filter((name) => !cssVars[`css:${name}`]),
      "folders without `// @css-var` declarations",
    ).toEqual([]);
    expect(
      styledFolders.filter((name) => !listed.includes(name)),
      "folders not listed in a page's `cssVars`",
    ).toEqual([]);
  });

  it.each(
    docPages.filter((p) => p.cssVars?.length).map((p) => [p.id, p] as const),
  )("%s: every CSS variable is described in all locales", (id, page) => {
    for (const folder of page.cssVars ?? []) {
      const entry = cssVars[`css:${folder}`];
      expect(entry, `${folder} declares no CSS variables`).toBeDefined();
      for (const { name } of entry.vars) {
        expect(name).toMatch(/^--[a-z][a-z0-9-]*$/);
        const path = `docs.${id}.cssVars.${name}`;
        expect(en.has(path), `missing description key ${path}`).toBe(true);
      }
    }
  });
});

describe("docs: Web Components", () => {
  const elements = generateElements() as Record<string, ApiElement>;
  const tags = Object.keys(elements).map((key) => key.replace(/^wc:/, ""));
  const wcPages = docPages.filter((p) => p.wc);

  it("documents every custom element on exactly one page", () => {
    const listed = wcPages.flatMap((p) => p.wc!.tags);
    expect(
      tags.filter((tag) => !listed.includes(tag)),
      "undocumented",
    ).toEqual([]);
    expect(
      listed.filter((tag) => !tags.includes(tag)),
      "unknown",
    ).toEqual([]);
    expect(
      listed.filter((tag, i) => listed.indexOf(tag) !== i),
      "listed twice",
    ).toEqual([]);
  });

  it.each(wcPages.map((p) => [p.id, p] as const))(
    "%s: define entry, demos and translated API descriptions",
    (id, page) => {
      const wc = page.wc!;
      expect(
        existsSync(
          join(PACKAGES, `web-components/src/elements/${wc.entry}.ts`),
        ),
        `entry ${wc.entry}`,
      ).toBe(true);
      expect(wc.demos.length, "at least one demo").toBeGreaterThan(0);
      const demoDir = join(SRC, "docs/pages", id, "wc");
      const files = existsSync(demoDir)
        ? readdirSync(demoDir)
            .filter((f) => f.endsWith(".html"))
            .map((f) => f.replace(/\.html$/, ""))
            .sort()
        : [];
      expect(files, "wc/*.html must match registry `wc.demos`").toEqual(
        [...wc.demos].sort(),
      );
      for (const demo of wc.demos) {
        for (const field of ["title", "description"]) {
          const key = `docs.${id}.wc.demos.${demo}.${field}`;
          expect(en.has(key), key).toBe(true);
        }
      }
      const missing: string[] = [];
      for (const tag of wc.tags) {
        const api = elements[`wc:${tag}`];
        for (const section of WC_SECTIONS) {
          for (const member of wcMembers(api, section)) {
            const keys = wcDescriptionKeys(
              id,
              tag,
              section,
              member.name,
              page.api,
            );
            if (!keys.some((k) => en.has(k))) missing.push(keys[0]);
          }
        }
      }
      expect(missing, "missing descriptions").toEqual([]);
    },
  );
});

describe("Web Components defaults match the React components", () => {
  const api = { ...generateApi(), ...generateElements() } as Record<
    string,
    {
      kind: string;
      props?: { name: string; default?: string }[];
      properties?: { name: string; default?: string }[];
    }
  >;
  /** Literal defaults only (`"medium"`, `3`, `true`); numbers may be quoted */
  const literal = (value?: string) => {
    const text = value?.trim();
    if (!text || !/^("[^"]*"|-?\d+(\.\d+)?|true|false|null)$/.test(text)) {
      return undefined;
    }
    return text.replace(/^"(-?\d+(\.\d+)?)"$/, "$1");
  };
  const pascal = (tag: string) =>
    tag
      .replace(/^minerva-/, "")
      .replace(/(^|-)(\w)/g, (_, __, c: string) => c.toUpperCase());
  /**
   * Same behaviour, different representation (documented in the element):
   * the default is resolved at runtime instead of declared.
   */
  const RESOLVED_AT_RUNTIME = new Set([
    "minerva-app-shell.skipLink", // text of the always-rendered skip link (React: boolean | text)
    "minerva-skeleton.size", // circular placeholder falls back to 32px
    "minerva-tooltip.enterDelay", // provider, then 200ms
    "minerva-tooltip.leaveDelay", // provider, then 0ms
  ]);

  it("every same-named property has the same literal default", () => {
    const mismatches: string[] = [];
    for (const [key, element] of Object.entries(api)) {
      if (element.kind !== "element") continue;
      const tag = key.slice(3);
      const react = api[`${pascal(tag)}Props`];
      if (!react?.props) continue;
      for (const property of element.properties ?? []) {
        const prop = react.props.find((p) => p.name === property.name);
        const expected = literal(prop?.default);
        if (!prop || expected === undefined) continue;
        if (RESOLVED_AT_RUNTIME.has(`${tag}.${property.name}`)) continue;
        const actual =
          literal(property.default) ??
          (expected === "false" && property.default === undefined
            ? "false"
            : property.default);
        if (actual !== expected) {
          mismatches.push(
            `${tag}.${property.name}: ${property.default} (React ${prop.default})`,
          );
        }
      }
    }
    expect(mismatches).toEqual([]);
  });
});

describe("docs: coverage of public exports", () => {
  const documented = (pkg: string) =>
    new Set(
      docPages
        .filter((p) => (p.package ?? "minerva-design") === pkg)
        .flatMap((p) => p.exports ?? []),
    );

  it("documents every runtime export of minerva-design", () => {
    const exportsOf = valueExports(join(PACKAGES, "react/src/index.ts"));
    const missing = exportsOf.filter(
      (name) => !documented("minerva-design").has(name),
    );
    expect(missing).toEqual([]);
  });

  it("documents every runtime export of minerva-design/web-components", () => {
    const exportsOf = valueExports(
      join(PACKAGES, "web-components/src/index.ts"),
    );
    const missing = exportsOf.filter(
      (name) => !documented("minerva-design/web-components").has(name),
    );
    expect(missing).toEqual([]);
  });

  it("every component page has demos and an API table", () => {
    const incomplete = docPages
      .filter((p) => p.exports?.length)
      .filter((p) => !p.demos?.length)
      .map((p) => p.id);
    expect(incomplete).toEqual([]);
  });
});

describe("docs: pages and demos", () => {
  it.each(docPages.map((p) => [p.id, p] as const))(
    "%s: page, demos and strings exist",
    (id, page) => {
      const dir = join(SRC, "docs/pages", id);
      expect(existsSync(join(dir, "index.tsx")), `${id}/index.tsx`).toBe(true);
      expect(en.get(`docs.${id}.title`)).toBeTruthy();
      expect(en.get(`docs.${id}.description`)).toBeTruthy();

      const demoDir = join(dir, "demos");
      const files = existsSync(demoDir)
        ? readdirSync(demoDir)
            .filter((f) => f.endsWith(".tsx"))
            .map((f) => f.replace(/\.tsx$/, ""))
            .sort()
        : [];
      expect(files, "demo files must match registry `demos`").toEqual(
        [...(page.demos ?? [])].sort(),
      );
      for (const demo of page.demos ?? []) {
        expect(en.has(`docs.${id}.demos.${demo}.title`), `${demo} title`).toBe(
          true,
        );
        expect(
          en.has(`docs.${id}.demos.${demo}.description`),
          `${demo} description`,
        ).toBe(true);
      }
    },
  );

  it("has no page folders missing from the registry", () => {
    const folders = readdirSync(join(SRC, "docs/pages"), {
      withFileTypes: true,
    })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .sort();
    expect(folders).toEqual(docPages.map((p) => p.id).sort());
  });
});

describe("i18n", () => {
  it.each(LANGUAGES.filter((l) => l !== "en"))(
    "%s has exactly the same keys as en",
    (lng) => {
      const keys = [...locales[lng].keys()].sort();
      const enKeys = [...en.keys()].sort();
      expect(
        enKeys.filter((k) => !locales[lng].has(k)),
        "missing",
      ).toEqual([]);
      expect(
        keys.filter((k) => !en.has(k)),
        "extra",
      ).toEqual([]);
    },
  );

  it("has no empty translations", () => {
    for (const lng of LANGUAGES) {
      const empty = [...locales[lng]]
        .filter(([, v]) => !v.trim())
        .map(([k]) => k);
      expect(empty, lng).toEqual([]);
    }
  });

  it('every literal t("…") key used in src exists', () => {
    const missing: string[] = [];
    const pattern = /\bt\(\s*(["'`])([^"'`$]+?)\1/g;
    for (const file of walk(SRC).filter((f) => /\.tsx?$/.test(f))) {
      if (file.endsWith(".test.ts")) continue;
      const text = readFileSync(file, "utf8");
      for (const match of text.matchAll(pattern)) {
        if (!en.has(match[2])) {
          missing.push(`${relative(SRC, file)}: ${match[2]}`);
        }
      }
    }
    expect(missing).toEqual([]);
  });
});
