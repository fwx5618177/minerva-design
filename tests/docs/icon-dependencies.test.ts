import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { at } from "./utils";

const read = (file: string) => readFileSync(at(file), "utf8");
const files = (directory: string): string[] =>
  readdirSync(at(directory), { withFileTypes: true }).flatMap((entry) => {
    const file = join(directory, entry.name);
    return entry.isDirectory()
      ? files(file)
      : /\.[cm]?[jt]sx?$/.test(file)
        ? [file]
        : [];
  });
describe("Minerva owns its runtime and documentation icons", () => {
  it.each(["packages/minerva-design", "packages/media-player", "apps/docs"])(
    "%s does not install a foreign icon package",
    (directory) => {
      const pkg = JSON.parse(read(`${directory}/package.json`));
      for (const field of [
        "dependencies",
        "peerDependencies",
        "devDependencies",
      ])
        expect(pkg[field] ?? {}).not.toHaveProperty("react-icons");
    },
  );
  it("has no production or documentation imports from react-icons", () => {
    for (const file of [
      ...files("packages/media-player/src"),
      ...files("apps/docs/src"),
    ]) {
      expect(read(file), file).not.toMatch(
        /(?:from\s*|import\s*\(\s*)["']react-icons(?:\/|["'])/,
      );
    }
    expect(read("pnpm-lock.yaml")).not.toMatch(/react-icons(?:@|:)/);
  });
});
