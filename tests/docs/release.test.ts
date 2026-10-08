// First-publish correctness of the npm package `minerva-design` (the only
// published package): complete metadata, README / LICENSE / CHANGELOG
// shipped, no dependency on the private workspace packages (bundled into its
// dist), and a Changesets setup that only ever releases it.
import { describe, expect, it } from "vitest";
import { readdirSync } from "node:fs";
import { PRIVATE, PUBLISHED, at, exists, read, readJson } from "./utils";

interface Pkg {
  name: string;
  version: string;
  private?: boolean;
  description?: string;
  keywords?: string[];
  license?: string;
  author?: string;
  repository?: { type: string; url: string; directory: string };
  homepage?: string;
  bugs?: { url: string };
  type?: string;
  files?: string[];
  sideEffects?: boolean | string[];
  engines?: { node?: string };
  publishConfig?: { access?: string; registry?: string };
  exports?: Record<string, unknown>;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  peerDependenciesMeta?: Record<string, { optional?: boolean }>;
}

const root = readJson<Pkg & { engines: { node: string } }>("package.json");
const packages = Object.entries(PUBLISHED).map(
  ([dir, name]) =>
    [dir, name, readJson<Pkg>(`packages/${dir}/package.json`)] as const,
);
const changesets = readJson<{
  fixed: string[][];
  linked: string[][];
  access: string;
  baseBranch: string;
  ignore: string[];
  privatePackages: { version: boolean; tag: boolean };
}>(".changeset/config.json");

describe.each(packages)("%s (%s)", (dir, name, pkg) => {
  it("has the npm metadata of a public package", () => {
    expect(pkg.name).toBe(name);
    expect(pkg.private).toBeUndefined();
    expect(pkg.description?.length).toBeGreaterThan(40);
    expect(pkg.keywords?.length).toBeGreaterThanOrEqual(5);
    expect(pkg.keywords).toContain("minerva");
    expect(pkg.license).toBe("MIT");
    expect(pkg.author).toMatch(/\S+ <\S+@\S+>/);
    expect(pkg.repository).toEqual({
      type: "git",
      url: "git+https://github.com/fwx5618177/minerva-design.git",
      directory: `packages/${dir}`,
    });
    expect(pkg.homepage).toBe("https://fwx5618177.github.io/minerva-design/");
    expect(pkg.bugs).toEqual({
      url: "https://github.com/fwx5618177/minerva-design/issues",
    });
    expect(pkg.type).toBe("module");
    expect(pkg.engines?.node).toBe(root.engines.node);
    expect(pkg.publishConfig).toEqual({
      access: "public",
      registry: "https://registry.npmjs.org/",
    });
  });

  it("declares its side effects (stylesheets and element registration only)", () => {
    expect(Array.isArray(pkg.sideEffects)).toBe(true);
    const effects = pkg.sideEffects as string[];
    expect(effects).toContain("**/*.css");
    expect(effects).toContain("**/*.scss");
    // besides the stylesheets, only the web component define modules
    expect(effects.filter((p) => !/\*\.s?css$/.test(p)).sort()).toEqual([
      "dist/web-components/cdn/*.js",
      "dist/web-components/elements/*.js",
      "dist/web-components/index.js",
    ]);
  });

  it("ships dist, the manifest, README, LICENSE and the CHANGELOG", () => {
    expect(pkg.files).toEqual(["dist", "custom-elements.json", "CHANGELOG.md"]);
    // npm always packs README / LICENSE from the package folder
    expect(exists(`packages/${dir}/README.md`)).toBe(true);
    expect(read(`packages/${dir}/README.md`)).toMatch(
      new RegExp(`^# ${name}\\n`),
    );
    expect(read(`packages/${dir}/README.md`)).toMatch(/## Browser support/);
    expect(read(`packages/${dir}/LICENSE`)).toBe(read("LICENSE"));
    expect(Object.keys(pkg.exports ?? {})).toContain("./package.json");
  });

  it("bundles the private workspace packages: no @minerva/* dependency", () => {
    for (const field of [pkg.dependencies, pkg.peerDependencies]) {
      for (const dep of Object.keys(field ?? {})) {
        expect(dep.startsWith("@minerva/"), dep).toBe(false);
      }
    }
    expect(Object.keys(pkg.dependencies ?? {}).sort()).toEqual([
      "@floating-ui/dom",
      "dompurify",
      "jsonc-parser",
      "lit",
    ]);
  });

  it("react / react-dom and Monaco are optional peers", () => {
    expect(Object.keys(pkg.peerDependencies ?? {}).sort()).toEqual([
      "@monaco-editor/react",
      "monaco-editor",
      "react",
      "react-dom",
    ]);
    for (const peer of Object.keys(pkg.peerDependencies ?? {})) {
      expect(pkg.peerDependenciesMeta?.[peer]?.optional, peer).toBe(true);
    }
    expect(pkg.peerDependencies?.react).toBe("^19.0.0");
  });
});

describe("private workspace packages", () => {
  it.each(Object.entries(PRIVATE))("%s (%s) is private", (dir, name) => {
    const pkg = readJson<Pkg>(`${dir}/package.json`);
    expect(pkg.name).toBe(name);
    expect(pkg.private).toBe(true);
  });
});

describe("versioning", () => {
  it("only minerva-design is released (private packages ignored)", () => {
    expect(changesets.fixed).toEqual([]);
    expect(changesets.linked).toEqual([]);
    expect(changesets.access).toBe("public");
    expect(changesets.baseBranch).toBe("main");
    // one glob for every private workspace package
    expect(changesets.ignore).toEqual(["@minerva/*"]);
    // every workspace package except the published one is listed as private
    const workspace = ["apps", "packages"].flatMap((group) =>
      readdirSync(at(group), { withFileTypes: true })
        .filter((d) => d.isDirectory() && exists(group, d.name, "package.json"))
        .map((d) => `${group}/${d.name}`),
    );
    expect(
      workspace.filter((dir) => !(dir.replace("packages/", "") in PUBLISHED)),
    ).toEqual(expect.arrayContaining(Object.keys(PRIVATE)));
    expect(Object.keys(PRIVATE)).toHaveLength(workspace.length - 1);
    for (const name of Object.values(PRIVATE)) {
      expect(name).toMatch(/^@minerva\/[\w-]+$/);
    }
    expect(changesets.privatePackages).toEqual({ version: false, tag: false });
  });

  it("`pnpm release` builds and publishes minerva-design only", () => {
    expect(root.scripts?.release).toBe(
      "pnpm --filter minerva-design build && changeset publish",
    );
  });

  it("a valid version, still unreleased (0.0.0) or released", () => {
    const [, , pkg] = packages[0];
    expect(pkg.version).toMatch(/^\d+\.\d+\.\d+(-[\w.]+)?$/);
  });

  it("an unreleased tree has one initial-release changeset (0.0.0 -> 0.1.0)", () => {
    const [, , pkg] = packages[0];
    if (pkg.version !== "0.0.0") return;
    const pending = read(".changeset/initial-release.md");
    expect(pending).toMatch(/^---\n"minerva-design": minor\n---\n/);
    // no pending changeset names another package
    expect(pending).not.toMatch(/^"@minerva\//m);
  });
});
