// Read-only trial migration. Checks an existing consumer against its current
// dependency, then against Minerva's source types. Never edits that consumer.
import ts from "typescript";
import { resolve, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
const library = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const projects = process.argv.slice(2);
if (!projects.length) {
  console.error(
    "Usage: pnpm check:novel-migration /path/to/consumer [...projects]",
  );
  process.exit(2);
}
const message = (diagnostic) =>
  ts.flattenDiagnosticMessageText(diagnostic.messageText, " ");
const key = (diagnostic) =>
  [
    diagnostic.file?.fileName,
    diagnostic.start,
    diagnostic.code,
    message(diagnostic),
  ].join(":");
let failed = false;
for (const project of projects) {
  const dir = resolve(project);
  const config = ts.readConfigFile(
    resolve(dir, "tsconfig.json"),
    ts.sys.readFile,
  );
  if (config.error) throw new Error(message(config.error));
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, dir);
  if (parsed.errors.length)
    throw new Error(parsed.errors.map(message).join("\n"));
  const options = { ...parsed.options, noEmit: true, skipLibCheck: true };
  const baseline = ts.getPreEmitDiagnostics(
    ts.createProgram(parsed.fileNames, options),
  );
  const known = new Set(baseline.map(key));
  const paths = {
    ...options.paths,
    "@novel-isr/ui": [resolve(library, "packages/react/src/index.ts")],
    "@novel-isr/ui/theme-utils": [
      resolve(library, "packages/react/src/theme-utils.ts"),
    ],
    "@novel-isr/ui/monaco": [resolve(library, "packages/react/src/monaco.ts")],
    "@minerva/core": [resolve(library, "packages/core/src/index.ts")],
    "@minerva/dom": [resolve(library, "packages/dom/src/index.ts")],
  };
  const diagnostics = ts.getPreEmitDiagnostics(
    ts.createProgram(parsed.fileNames, { ...options, paths }),
  );
  const added = diagnostics.filter(
    (d) => d.file?.fileName.startsWith(`${dir}/`) && !known.has(key(d)),
  );
  console.log(
    `${dir}: ${baseline.length} existing diagnostics; ${added.length} added by the trial migration.`,
  );
  for (const d of added) {
    const pos = d.file.getLineAndCharacterOfPosition(d.start ?? 0);
    console.log(
      `${relative(dir, d.file.fileName)}:${pos.line + 1}:${pos.character + 1} TS${d.code} ${message(d)}`,
    );
  }
  if (added.length) failed = true;
}
console.log(
  "Type compatibility only: stylesheet variables, DOM hooks and runtime behavior also require migration tests.",
);
process.exitCode = failed ? 1 : 0;
