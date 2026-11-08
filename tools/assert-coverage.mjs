import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

/** Reject empty LCOV output: percentage thresholds alone accept a 0/0 map. */
export function assertCoverage(lcov) {
  const records = lcov.split("end_of_record");
  let files = 0;
  let lines = 0;
  for (const record of records) {
    if (!/^SF:.+$/m.test(record)) continue;
    const found = Number(record.match(/^LF:(\d+)$/m)?.[1] ?? 0);
    const measured = [...record.matchAll(/^DA:\d+,\d+(?:,.*)?$/gm)].length;
    if (found > 0 && measured > 0) {
      files++;
      lines += found;
    }
  }
  if (!files || !lines)
    throw Error(
      "Coverage report contains no measured source lines; refusing a false-green 0/0 coverage result.",
    );
  return { files, lines };
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  try {
    const report = process.argv[2] ?? "coverage/lcov.info";
    const result = assertCoverage(await readFile(report, "utf8"));
    console.log(
      `Coverage report verified: ${result.files} source files, ${result.lines} measured lines.`,
    );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
