// First-publish correctness of the three npm packages: complete metadata,
// README / LICENSE / CHANGELOG shipped, coherent versions (one `fixed`
// Changesets group) and internal dependencies that pnpm rewrites on publish.
import { describe, expect, it } from "vitest";
import { PUBLISHED, exists, read, readJson } from "./utils";

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
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
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
      url: "git+https://github.com/fwx5618177/minerva.git",
      directory: `packages/${dir}`,
    });
    expect(pkg.homepage).toBe("https://fwx5618177.github.io/minerva/");
    expect(pkg.bugs).toEqual({
      url: "https://github.com/fwx5618177/minerva/issues",
    });
    expect(pkg.type).toBe("module");
    expect(pkg.engines?.node).toBe(root.engines.node);
    expect(pkg.publishConfig).toEqual({
      access: "public",
      registry: "https://registry.npmjs.org/",
    });
  });

  it("declares its side effects (CSS only, plus element registration)", () => {
    expect(Array.isArray(pkg.sideEffects)).toBe(true);
    const effects = pkg.sideEffects as string[];
    expect(effects.some((p) => p.endsWith("*.css"))).toBe(true);
    if (dir !== "lib-web-components") {
      expect(effects.every((p) => /\*\.s?css$/.test(p))).toBe(true);
    }
  });

  it("ships dist, README, LICENSE and the CHANGELOG", () => {
    expect(pkg.files).toContain("dist");
    expect(pkg.files).toContain("CHANGELOG.md");
    // npm always packs README / LICENSE from the package folder
    expect(exists(`packages/${dir}/README.md`)).toBe(true);
    expect(read(`packages/${dir}/README.md`)).toMatch(
      new RegExp(`^# ${name.replace("/", "\\/")}\\n`),
    );
    expect(read(`packages/${dir}/README.md`)).toMatch(/## Browser support/);
    expect(read(`packages/${dir}/LICENSE`)).toBe(read("LICENSE"));
    expect(exports(pkg)).toContain("./package.json");
  });

  it("depends on the other Minerva packages through the workspace", () => {
    for (const [dep, range] of Object.entries(pkg.dependencies ?? {})) {
      if (dep.startsWith("@minerva/")) {
        expect(Object.values(PUBLISHED)).toContain(dep);
        // replaced by the exact released version by `pnpm publish`
        expect(range, dep).toBe("workspace:*");
      }
    }
    for (const dep of Object.keys(pkg.peerDependencies ?? {})) {
      expect(dep.startsWith("@minerva/"), dep).toBe(false);
    }
  });
});

const exports = (pkg: Pkg) => Object.keys(pkg.exports ?? {});

describe("versioning", () => {
  it("the three packages are released together (one fixed group)", () => {
    expect(changesets.fixed).toEqual([Object.values(PUBLISHED)]);
    expect(changesets.linked).toEqual([]);
    expect(changesets.access).toBe("public");
    expect(changesets.baseBranch).toBe("main");
  });

  it("share one version, still unreleased (0.x) or the same release", () => {
    const versions = new Set(packages.map(([, , pkg]) => pkg.version));
    expect(versions.size).toBe(1);
    const [version] = versions;
    expect(version).toMatch(/^\d+\.\d+\.\d+(-[\w.]+)?$/);
  });

  it("an unreleased tree has a pending changeset for every package", () => {
    const [, , first] = packages[0];
    if (first.version !== "0.0.0") return;
    const pending = read(".changeset/initial-release.md");
    for (const name of Object.values(PUBLISHED)) {
      expect(pending).toContain(`"${name}": minor`);
    }
  });
});
