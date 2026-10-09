import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, it } from "vitest";
import { taroComponentManifest } from "../../packages/taro/src/manifest";
import { uniComponentManifest } from "../../packages/uni/src/manifest";
import { weappComponentManifest } from "../../packages/weapp/src/manifest";
import { getContract } from "../../packages/core/src/contracts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const manifests = {
  taro: taroComponentManifest,
  uni: uniComponentManifest,
  weapp: weappComponentManifest,
};
it.each(Object.entries(manifests))(
  "%s support notes retain declared limitations and point to real tests",
  (platform, entries) => {
    expect(new Set(entries.map((entry) => entry.name)).size).toBe(
      entries.length,
    );
    for (const entry of entries) {
      expect(entry.scope.trim().length, entry.name).toBeGreaterThan(0);
      expect(entry.tests.length, entry.name).toBeGreaterThan(0);
      for (const test of entry.tests) {
        const path = test.split(":")[0];
        expect(
          existsSync(
            join(
              root,
              path.startsWith("packages/")
                ? path
                : `packages/${platform}/${path}`,
            ),
          ),
          `${entry.name}: ${path}`,
        ).toBe(true);
      }
      const contract = getContract(entry.name);
      if (!contract) continue; // Native-only APIs need not have a DOM contract.
      const support = contract.platforms[platform as keyof typeof manifests];
      const metadata = entry as { status?: string; equivalent?: string };
      expect(support.status, entry.name).toBe(
        metadata.status === "n/a" ? "n/a" : "beta",
      );
      if (metadata.equivalent) {
        expect(
          entries.some((candidate) => candidate.name === metadata.equivalent),
          `${entry.name}: missing equivalent parent`,
        ).toBe(true);
      }
      for (const limitation of entry.limitations)
        expect(support.notes, entry.name).toContain(limitation);
    }
  },
);
