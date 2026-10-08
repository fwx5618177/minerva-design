// Copies the built docs site (apps/docs/dist) to packages/sample/dist, the
// folder deployed by .github/workflows/deploy.yml (written before the
// packages/sample -> apps/docs rename and kept unchanged). packages/sample/
// is gitignored: it only ever holds this build output.
import { cpSync, existsSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";

const from = fileURLToPath(new URL("../../../apps/docs/dist", import.meta.url));
const to = fileURLToPath(
  new URL("../../../packages/sample/dist", import.meta.url),
);

if (!existsSync(from)) {
  console.error(`${from} does not exist: build @minerva/docs first`);
  process.exit(1);
}
rmSync(to, { recursive: true, force: true });
cpSync(from, to, { recursive: true });
console.log(`Copied apps/docs/dist to packages/sample/dist`);
