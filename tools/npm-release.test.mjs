import { test } from "node:test";
import assert from "node:assert/strict";
import { releasePlan, readRegistry } from "./npm-release.mjs";

const registry = { versions: { "1.0.0": {}, "1.0.1": {} } };
const input = { version: "1.0.1", registry, releases: [], isCurrentMain: true };

test("first release must be published manually even if automatic publishing is enabled", () => {
  assert.throws(
    () => releasePlan({ ...input, version: "1.0.0", registry: null }),
    /manually/,
  );
});
test("main pushes without explicit changesets auto-bump patch by default or minor/major from commits", () => {
  assert.deepEqual(releasePlan(input), {
    mode: "version",
    version: "1.0.2",
    autoChangeset: {
      bump: "patch",
      summary: "Automated release from main.",
    },
  });
  assert.deepEqual(
    releasePlan({
      ...input,
      commits: [
        "docs: add DatePicker documentation",
        "feat(react): add DatePicker component",
      ],
    }),
    {
      mode: "version",
      version: "1.1.0",
      autoChangeset: {
        bump: "minor",
        summary:
          "docs: add DatePicker documentation\nfeat(react): add DatePicker component",
      },
    },
  );
  assert.deepEqual(
    releasePlan({
      ...input,
      commits: ["feat(react)!: remove legacy prop"],
    }),
    {
      mode: "version",
      version: "2.0.0",
      autoChangeset: {
        bump: "major",
        summary: "feat(react)!: remove legacy prop",
      },
    },
  );
});
test("a pending changeset versions the sole public package", () => {
  assert.deepEqual(
    releasePlan({
      ...input,
      releases: [{ name: "minerva-design", newVersion: "1.1.0" }],
    }),
    { mode: "version", version: "1.1.0" },
  );
});
test("an unpublished version commit resumes without another version bump", () => {
  assert.deepEqual(releasePlan({ ...input, version: "1.0.2" }), {
    mode: "publish",
    version: "1.0.2",
  });
});
test("unpublished versions cannot swallow a later changeset", () => {
  assert.throws(
    () =>
      releasePlan({
        ...input,
        version: "1.0.2",
        releases: [{ name: "minerva-design", newVersion: "1.0.3" }],
      }),
    /unpublished/,
  );
});
test("stale CI does not change main or publish", () => {
  assert.equal(releasePlan({ ...input, isCurrentMain: false }).mode, "skip");
});
test("older branches and invalid versions cannot replace latest", () => {
  for (const version of ["0.9.0", "1.0.0", "1.1.0-beta.0", "garbage"]) {
    assert.throws(() => releasePlan({ ...input, version }));
  }
  assert.throws(() =>
    releasePlan({
      ...input,
      releases: [{ name: "minerva-design", newVersion: "1.0.1" }],
    }),
  );
  assert.throws(() =>
    releasePlan({
      ...input,
      releases: [{ name: "other-package", newVersion: "2.0.0" }],
    }),
  );
});
test("registry errors fail closed instead of being treated as an unpublished package", async () => {
  assert.equal(
    await readRegistry(async () => new Response(null, { status: 404 })),
    null,
  );
  await assert.rejects(
    readRegistry(async () => new Response("failure", { status: 500 })),
    /500/,
  );
  await assert.rejects(
    readRegistry(
      async () => new Response('{"error":"invalid"}', { status: 200 }),
    ),
    /versions/,
  );
});

test("a publish that succeeded before a tag push failure only retries tagging", () => {
  assert.deepEqual(releasePlan({ ...input, isReleaseCommit: true }), {
    mode: "tag",
    version: "1.0.1",
  });
});

test("real Changesets upgrades 1.0.0 once and consumes the release note", async () => {
  const { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } =
    await import("node:fs");
  const { tmpdir } = await import("node:os");
  const { join, dirname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const { execFileSync } = await import("node:child_process");
  const cwd = mkdtempSync(join(tmpdir(), "minerva-release-test-"));
  const cliRoot = dirname(
    fileURLToPath(import.meta.resolve("@changesets/cli/package.json")),
  );
  const cliPackage = JSON.parse(
    readFileSync(join(cliRoot, "package.json"), "utf8"),
  );
  const cli = join(
    cliRoot,
    typeof cliPackage.bin === "string"
      ? cliPackage.bin
      : cliPackage.bin.changeset,
  );
  const run = (command, args) =>
    execFileSync(command, args, { cwd, stdio: "pipe" });
  const git = (...args) => run("git", args);
  const status = () => {
    run(process.execPath, [
      cli,
      "status",
      "--output",
      join(cwd, "status.json"),
    ]);
    return JSON.parse(readFileSync(join(cwd, "status.json"), "utf8"));
  };
  try {
    mkdirSync(join(cwd, ".changeset"));
    writeFileSync(
      join(cwd, "package.json"),
      JSON.stringify({ name: "minerva-design", version: "1.0.0" }),
    );
    writeFileSync(join(cwd, ".gitignore"), "status.json\n");
    writeFileSync(
      join(cwd, ".changeset/config.json"),
      JSON.stringify({
        baseBranch: "main",
        changelog: false,
        commit: false,
        access: "public",
      }),
    );
    git("init", "-b", "main");
    git("config", "user.name", "Release test");
    git("config", "user.email", "release-test@example.invalid");
    git("add", ".");
    git("commit", "-m", "initial");
    assert.deepEqual(status().releases, []);
    writeFileSync(
      join(cwd, ".changeset/fix.md"),
      '---\n"minerva-design": patch\n---\n\nFix a component.\n',
    );
    const releases = status().releases;
    assert.equal(releases[0].newVersion, "1.0.1");
    assert.equal(
      releasePlan({
        version: "1.0.0",
        registry: { versions: { "1.0.0": {} } },
        releases,
        isCurrentMain: true,
      }).mode,
      "version",
    );
    run(process.execPath, [cli, "version"]);
    assert.equal(
      JSON.parse(readFileSync(join(cwd, "package.json"), "utf8")).version,
      "1.0.1",
    );
    git("add", ".");
    git("commit", "-m", "release");
    assert.deepEqual(status().releases, []);
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});
