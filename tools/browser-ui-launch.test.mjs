import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, readdir, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

test("UI checks report Chrome startup stderr and clean up after an early exit", async () => {
  const directory = await mkdtemp(join(tmpdir(), "minerva-ui-launch-test-"));
  const chrome = join(directory, "chrome");
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const port = server.address().port;
  await new Promise((resolve) => server.close(resolve));
  try {
    await writeFile(
      chrome,
      `#!${process.execPath}\nconsole.error("fixture: Chrome sandbox initialization failed");process.exit(42);\n`,
      { mode: 0o755 },
    );
    const result = await new Promise((resolve) => {
      execFile(
        process.execPath,
        [new URL("./browser-ui-issues.mjs", import.meta.url).pathname],
        {
          env: {
            ...process.env,
            CHROME_PATH: chrome,
            UI_E2E_PORT: String(port),
            TMPDIR: directory,
          },
          timeout: 30000,
        },
        (error, stdout, stderr) => resolve({ error, stdout, stderr }),
      );
    });
    assert.equal(result.error?.code, 1, result.stderr);
    assert.match(result.stderr, /Chrome exited 42/);
    assert.match(
      result.stderr,
      /fixture: Chrome sandbox initialization failed/,
    );
    assert.deepEqual(
      (await readdir(directory)).filter((name) => name.startsWith("minerva-")),
      [],
      "temporary Chrome profiles must be removed on startup failure",
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
