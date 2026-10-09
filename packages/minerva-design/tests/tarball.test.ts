// End-to-end check of the published artifact: `pnpm pack` of minerva-design
// is installed into a fresh consumer project (tests/fixtures/consumer, copied
// to a temp folder, outside the workspace), which then
// - type-checks (moduleResolution bundler + the web component JSX typings,
//   and NodeNext for every typed entry),
// - builds with Vite (client bundle and SSR bundle),
// - server-renders the React app and imports the web components in Node.
import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

/**
 * `catalog:<name>` specs of the workspace (pnpm-workspace.yaml `catalogs`)
 * replaced by their version ranges: the consumer project is not part of the
 * workspace.
 */
function resolveCatalogs(specs: Record<string, string>) {
  const yaml = readFileSync(
    join(
      dirname(fileURLToPath(import.meta.url)),
      "../../../pnpm-workspace.yaml",
    ),
    "utf8",
  );
  const versionIn = (catalog: string, name: string) => {
    const block = yaml.split(/^ {2}(\S+):\n/m);
    const index = block.indexOf(catalog);
    if (index === -1) throw new Error(`Unknown catalog ${catalog}`);
    const line = block[index + 1]
      .split("\n")
      .find((l) => l.trim().replace(/"/g, "").startsWith(`${name}:`));
    if (!line) throw new Error(`No ${name} in catalog ${catalog}`);
    return line.split(": ")[1].trim();
  };
  return Object.fromEntries(
    Object.entries(specs).map(([name, spec]) => [
      name,
      spec.startsWith("catalog:")
        ? versionIn(spec.slice("catalog:".length) || "default", name)
        : spec,
    ]),
  );
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const workspace = JSON.parse(
  readFileSync(join(root, "../../package.json"), "utf8"),
);

let dir = "";
let app = "";
let tarball = "";
/** Runs a command, failing with its output */
const run = (cmd: string, args: string[], cwd = app) => {
  try {
    return execFileSync(cmd, args, {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, NODE_ENV: "production" },
    });
  } catch (error) {
    const { stdout, stderr } = error as { stdout?: string; stderr?: string };
    throw new Error(
      `${cmd} ${args.join(" ")} failed:\n${stdout ?? ""}\n${stderr ?? ""}`,
      { cause: error },
    );
  }
};

beforeAll(() => {
  dir = mkdtempSync(join(tmpdir(), "minerva-design-consumer-"));
  run("pnpm", ["pack", "--pack-destination", dir], root);
  tarball = join(
    dir,
    readdirSync(dir).find((f) => f.endsWith(".tgz")) as string,
  );
  app = join(dir, "app");
  cpSync(join(root, "tests/fixtures/consumer"), app, { recursive: true });
  const dev = resolveCatalogs(
    workspace.devDependencies as Record<string, string>,
  );
  writeFileSync(
    join(app, "package.json"),
    `${JSON.stringify(
      {
        name: "minerva-design-consumer",
        private: true,
        type: "module",
        dependencies: {
          "minerva-design": `file:${tarball}`,
          react: dev.react,
          "react-dom": dev["react-dom"],
        },
        devDependencies: {
          "@types/react": dev["@types/react"],
          "@types/react-dom": dev["@types/react-dom"],
          typescript: dev.typescript,
          vite: dev.vite,
        },
      },
      null,
      2,
    )}\n`,
  );
  // a standalone project (not part of the workspace), from the local store
  // when possible
  run("pnpm", ["install", "--ignore-workspace", "--prefer-offline"]);
});

afterAll(() => {
  if (dir) rmSync(dir, { recursive: true, force: true });
});

describe("packed tarball installed in a consumer project", () => {
  it("contains the published files only", () => {
    const listing = run("tar", ["-tzf", tarball], dir)
      .split("\n")
      .filter(Boolean)
      .map((f) => f.replace(/^package\//, ""));
    for (const file of [
      "package.json",
      "README.md",
      "LICENSE",
      "custom-elements.json",
      "dist/react/index.js",
      "dist/react/index.cjs",
      "dist/react/style.css",
      "dist/core/index.js",
      "dist/core/tokens.css",
      "dist/dom/index.js",
      "dist/dom/core-web.js",
      "dist/web-components/index.js",
      "dist/web-components/cdn/minerva.js",
      "dist/web-components/types/react.d.ts",
      "dist/angular/fesm2022/minerva-angular.mjs",
      "dist/angular/types/minerva-angular.d.ts",
      "dist/taro/index.js",
      "dist/uni/index.js",
      "dist/uni/Button.vue",
      "dist/uni/Button.vue.d.ts",
      "dist/weapp/button/index.js",
      "dist/weapp/button/index.wxml",
      "dist/weapp/input/index.json",
      "dist/weapp/switch/index.wxss",
      "dist/native/index.js",
      "dist/native/index.cjs",
      "dist/native/index.d.ts",
      "dist/native/source/index.ts",
    ]) {
      expect(listing, file).toContain(file);
    }
    // no sources, tests, build scripts or nested node_modules (the native
    // TypeScript sources of the `source` condition are build output)
    expect(
      listing.filter((f) => /^(src|tests|scripts|node_modules)\//.test(f)),
    ).toEqual([]);
    expect(listing.filter((f) => /\.test\.tsx?$/.test(f))).toEqual([]);
    const installed = JSON.parse(
      readFileSync(
        join(app, "node_modules/minerva-design/package.json"),
        "utf8",
      ),
    );
    expect(installed.version).toBe(pkg.version);
    // `lit` is a regular dependency, installed with the package
    expect(
      existsSync(join(app, "node_modules/minerva-design/node_modules/lit")) ||
        existsSync(join(app, "node_modules/.pnpm/node_modules/lit")),
    ).toBe(true);
  });

  it("type-checks (bundler + web component JSX typings, and NodeNext)", () => {
    run("pnpm", ["exec", "tsc", "-p", "tsconfig.json"]);
    run("pnpm", ["exec", "tsc", "-p", "tsconfig.node.json"]);
  });

  it("builds with Vite (client and SSR)", () => {
    run("pnpm", ["exec", "vite", "build", "--logLevel", "error"]);
    run("pnpm", [
      "exec",
      "vite",
      "build",
      "--ssr",
      "src/entry-server.tsx",
      "--outDir",
      "dist-ssr",
      "--logLevel",
      "error",
    ]);
    const assets = readdirSync(join(app, "dist/assets"));
    const js = assets
      .filter((f) => f.endsWith(".js"))
      .map((f) => readFileSync(join(app, "dist/assets", f), "utf8"))
      .join("\n");
    const css = assets
      .filter((f) => f.endsWith(".css"))
      .map((f) => readFileSync(join(app, "dist/assets", f), "utf8"))
      .join("\n");
    expect(js).toContain("minerva-button");
    expect(js).not.toContain("minerva-data-table");
    expect(css).toContain("@layer minerva");
    expect(css).toContain("--primary-color");
  });

  it("server-renders the React app and imports the web components in Node", () => {
    const result = JSON.parse(run("node", ["node-check.mjs"]));
    expect(result.html).toContain("Save the draft");
    expect(result.html).toContain('data-minerva="button"');
    expect(result.html).toContain("<minerva-button");
    expect(result).toMatchObject({
      themeScript: "string",
      esmButton: "function",
      cjsButton: "function",
      utils: "function",
      core: "function",
      coreCjs: "function",
      wcButton: "function",
    });
    expect(result.wcExports).toBeGreaterThan(50);
  });
});
