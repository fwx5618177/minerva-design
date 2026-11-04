// Builds the self-contained CDN files of dist/web-components/cdn/ (see
// scripts/cdn-entries.mjs): one Vite build of vite.cdn.config.ts per file.
import { build } from "vite";
import { fileURLToPath } from "node:url";
import { CDN_FILES } from "./cdn-entries.mjs";

const configFile = fileURLToPath(
  new URL("../vite.cdn.config.ts", import.meta.url),
);

for (const name of CDN_FILES) {
  process.env.MINERVA_CDN_ENTRY = name;
  await build({ configFile, logLevel: "warn" });
  console.log(`cdn/${name}.js`);
}
delete process.env.MINERVA_CDN_ENTRY;
