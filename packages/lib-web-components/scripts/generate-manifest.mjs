import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { MANIFEST, generateManifest, serializeManifest } from "./manifest.mjs";

const next = serializeManifest(generateManifest());
if (process.argv.includes("--check")) {
  const current = existsSync(MANIFEST) ? readFileSync(MANIFEST, "utf8") : "";
  if (current !== next) {
    console.error(
      "custom-elements.json is stale: run `pnpm --filter @minerva/lib-web-components manifest`",
    );
    process.exit(1);
  }
} else {
  writeFileSync(MANIFEST, next);
  console.log("Wrote custom-elements.json");
}
