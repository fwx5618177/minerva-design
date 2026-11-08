import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { assertCoverage } from "./assert-coverage.mjs";

const valid =
  "TN:\nSF:/source/example.ts\nDA:1,1\nDA:2,0\nLF:2\nLH:1\nend_of_record\n";
test("LCOV guard rejects empty maps and source records without measured lines", () => {
  for (const report of [
    "",
    "TN:\n",
    "SF:/source/empty.ts\nLF:0\nend_of_record\n",
    "SF:/source/broken.ts\nLF:2\nend_of_record\n",
  ])
    assert.throws(() => assertCoverage(report), /no measured source lines/);
  assert.deepEqual(assertCoverage(valid), { files: 1, lines: 2 });
  // Uncovered lines are real measurements; configured percentage thresholds decide success.
  assert.deepEqual(assertCoverage(valid.replace("DA:1,1", "DA:1,0")), {
    files: 1,
    lines: 2,
  });
});
test("coverage CLI fails for empty or missing reports and accepts actual line records", async () => {
  const directory = await mkdtemp(join(tmpdir(), "minerva-lcov-guard-"));
  const report = join(directory, "lcov.info");
  const run = () =>
    spawnSync(
      process.execPath,
      [new URL("./assert-coverage.mjs", import.meta.url).pathname, report],
      { encoding: "utf8" },
    );
  try {
    assert.equal(run().status, 1);
    await writeFile(report, "");
    assert.equal(run().status, 1);
    await writeFile(report, valid);
    const result = run();
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /1 source files, 2 measured lines/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
