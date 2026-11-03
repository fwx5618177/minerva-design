// The navigation is useful only while its links and runnable commands resolve.
// Validate those interfaces, not editorial wording or an exact table layout.
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const read = (path: string) => readFileSync(join(root, path), "utf8");
const workspaceDirs = [
  ".",
  "apps/docs",
  ...readdirSync(join(root, "packages")).map((name) => `packages/${name}`),
];
const packages = new Map(
  workspaceDirs
    .filter((dir) => existsSync(join(root, dir, "package.json")))
    .map((dir) => {
      const pkg = JSON.parse(read(`${dir}/package.json`)) as {
        name: string;
        scripts?: Record<string, string>;
        devDependencies?: Record<string, string>;
        exports?: Record<string, unknown>;
      };
      return [pkg.name, { ...pkg, dir }];
    }),
);
const rootPackage = packages.get("minerva-design-workspace")!;
const projects = new Set<string>();
for (const base of ["packages", "tests", "apps"]) {
  for (const name of readdirSync(join(root, base))) {
    const dir = `${base}/${name}`;
    for (const filename of [
      "vite.config.ts",
      "vitest.config.ts",
      "vitest.native.config.ts",
      "vitest.web.config.ts",
    ]) {
      if (!existsSync(join(root, dir, filename))) continue;
      const source = read(`${dir}/${filename}`);
      for (const match of source.matchAll(
        /\btest:\s*\{[\s\S]*?\bname:\s*["']([^"']+)["']/g,
      ))
        projects.add(match[1]);
    }
  }
}

function commands(text: string): string[] {
  return [...text.matchAll(/`(pnpm [^`\n]+)`/g)].map((match) => match[1]);
}

function problems(text: string): string[] {
  const errors: string[] = [];
  for (const match of text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const target = match[1].split("#")[0];
    if (/^[a-z]+:/i.test(target) || !target) continue;
    if (!existsSync(resolve(root, target)))
      errors.push(`missing path: ${target}`);
  }
  for (const match of text.matchAll(/`(minerva-design(?:\/[^`\s]+)?)`/g)) {
    const entry =
      match[1] === "minerva-design"
        ? "."
        : `.${match[1].slice("minerva-design".length)}`;
    if (!(entry in (packages.get("minerva-design")?.exports ?? {})))
      errors.push(`unknown public entry: ${match[1]}`);
  }
  for (const command of commands(text)) {
    const args = command.split(/\s+/).slice(1);
    let pkg = rootPackage;
    if (args[0] === "--filter") {
      const name = args[1];
      const selected = packages.get(name);
      if (!selected) {
        errors.push(`unknown workspace: ${name}`);
        continue;
      }
      pkg = selected;
      args.splice(0, 2);
    }
    if (args[0] === "exec") {
      if (!rootPackage.devDependencies?.[args[1]])
        errors.push(`unknown executable: ${args[1]}`);
      for (let i = 0; i < args.length; i++) {
        if (args[i] === "--project" && !projects.has(args[i + 1]))
          errors.push(`unknown project: ${args[i + 1]}`);
      }
      continue;
    }
    const script = pkg.scripts?.[args[0]];
    if (!script) {
      errors.push(`unknown script: ${pkg.name} ${args[0]}`);
      continue;
    }
    // A registered script can itself become stale when its source is moved.
    for (const match of script.matchAll(
      /\bnode\s+([\w./-]+\.(?:mjs|js|ts))/g,
    )) {
      if (!existsSync(resolve(root, pkg.dir, match[1])))
        errors.push(`missing script target: ${pkg.name} ${match[1]}`);
    }
  }
  return errors;
}

describe("agent maintenance navigation", () => {
  it("links to real sources and executable workspace commands", () => {
    expect(problems(read("AGENTS.md"))).toEqual([]);
  });

  it("covers the pnpm checks actually required by the CI verify job", () => {
    const workflow = read(".github/workflows/ci.yml").split("  min-node:")[0];
    const required = [...workflow.matchAll(/^\s+run: (pnpm .+)$/gm)]
      .map((match) => match[1])
      .filter((command) => !command.startsWith("pnpm install"));
    expect(required.length).toBeGreaterThan(0);
    const documented = new Set(commands(read("AGENTS.md")));
    expect(required.filter((command) => !documented.has(command))).toEqual([]);
  });

  it("reports broken destinations, public entries, commands and test projects", () => {
    expect(
      problems(
        "[source](packages/absent/Input.tsx) `minerva-design/absent` `pnpm --filter @minerva/absent build` `pnpm removed-script` `pnpm exec absent run` `pnpm exec vitest run --project absent`",
      ),
    ).toEqual([
      "missing path: packages/absent/Input.tsx",
      "unknown public entry: minerva-design/absent",
      "unknown workspace: @minerva/absent",
      "unknown script: minerva-design-workspace removed-script",
      "unknown executable: absent",
      "unknown project: absent",
    ]);
  });
});
