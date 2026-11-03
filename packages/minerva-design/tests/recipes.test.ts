import { expect, it } from "vitest";
// The verifier runs in a separate process: package resolution occurs inside
// the temporary consumer, not this workspace's Vitest aliases.
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

it("standalone React, Vue and chart recipes type-check and build against a real tarball; form interactions work", () => {
  const root = fileURLToPath(new URL("../../../", import.meta.url));
  const output = execFileSync(process.execPath, ["tools/verify-recipes.mjs"], {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });
  const results = JSON.parse(output);
  expect(results.map((r: { recipe: string }) => r.recipe)).toEqual([
    "react-form",
    "trading-chart",
    "vue-form",
  ]);
  expect(
    results.every(
      (r: { typecheck: boolean; build: boolean }) => r.typecheck && r.build,
    ),
  ).toBe(true);
}, 600_000);
