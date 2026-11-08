import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { assertCoverage } from "./assert-coverage.mjs";

// Forward every CLI argument to Vitest (including --maxWorkers and --project).
const args = process.argv.slice(2);
const result = spawnSync(
  process.execPath,
  [
    fileURLToPath(
      new URL("../node_modules/vitest/vitest.mjs", import.meta.url),
    ),
    "run",
    "--coverage",
    ...args,
  ],
  { stdio: "inherit" },
);
if (result.error) throw result.error;
if (result.status !== 0) process.exitCode = result.status ?? 1;
else {
  try {
    const option = "--coverage.reportsDirectory";
    const index = args.indexOf(option);
    const directory =
      args
        .find((arg) => arg.startsWith(option + "="))
        ?.slice(option.length + 1) ??
      (index >= 0 ? args[index + 1] : "coverage");
    const coverage = assertCoverage(
      await readFile(resolve(directory, "lcov.info"), "utf8"),
    );
    console.log(
      `Coverage report verified: ${coverage.files} source files, ${coverage.lines} measured lines.`,
    );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
