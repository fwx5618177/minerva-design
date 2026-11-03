import { test } from "node:test";
import assert from "node:assert/strict";
import {
  inferBump,
  isReleaseRelevantPath,
  parseGitLog,
  readCommits,
  releasePlan,
  readRegistry,
} from "./npm-release.mjs";

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
        summary: "feat(react): add DatePicker component",
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
test("issue #10 repro: docs commits skip and BREAKING CHANGE footers are major", () => {
  const base = {
    version: "1.19.0",
    registry: { versions: { "1.0.0": {}, "1.19.0": {} } },
    releases: [],
    isCurrentMain: true,
  };
  assert.equal(
    releasePlan({ ...base, commits: ["docs: clarify installation"] }).mode,
    "skip",
  );
  assert.equal(
    inferBump([
      "fix: normalize value\n\nBREAKING CHANGE: remove old signature",
    ]),
    "major",
  );
});

const src = "packages/react/src/components/Input/Input.tsx";
const plan = (commits, extra = {}) =>
  releasePlan({ ...input, commits, ...extra });

test("full commit messages: a BREAKING CHANGE body or footer is a major release", () => {
  for (const message of [
    "fix(react): normalize value\n\nBREAKING CHANGE: remove the old signature",
    "fix: normalize value\n\nExplain why.\n\nRefs: #10\nBREAKING-CHANGE: onChange receives a string",
    "refactor(core)!: drop legacy tokens\n\nSome body text.",
  ]) {
    assert.deepEqual(
      plan([{ message, files: [src] }]).autoChangeset.bump,
      "major",
    );
    assert.equal(plan([message]).autoChangeset.bump, "major");
  }
  assert.deepEqual(
    plan([
      {
        message:
          "fix(react): normalize value\n\nLonger explanation.\n\nBREAKING CHANGE: remove the old signature",
        files: [src],
      },
    ]),
    {
      mode: "version",
      version: "2.0.0",
      autoChangeset: {
        bump: "major",
        summary:
          "fix(react): normalize value\nBREAKING CHANGE: remove the old signature",
      },
    },
  );
  // Prose that merely mentions breaking changes is not a footer.
  assert.equal(
    inferBump([
      "fix: guard input\n\nThis is not a breaking change for callers.",
    ]),
    "patch",
  );
});

test("docs-only commits and docs-only files skip the release", () => {
  assert.equal(plan(["docs: clarify installation"]).mode, "skip");
  assert.equal(
    plan(["docs(react): document Input", "test: cover Input"]).mode,
    "skip",
  );
  assert.equal(
    plan([{ message: "docs: fix JSDoc typo", files: [src] }]).mode,
    "skip",
  );
  for (const files of [
    ["docs/releasing.md"],
    ["apps/docs/src/pages/input.mdx", "apps/docs/src/App.tsx"],
    [
      "README.md",
      "packages/react/README.md",
      "packages/minerva-design/README.md",
    ],
    ["packages/minerva-design/CHANGELOG.md"],
  ]) {
    assert.equal(
      plan([{ message: "feat: new docs page", files }]).mode,
      "skip",
      files.join(", "),
    );
    assert.equal(
      plan(["fix: typo"], { changedFiles: files }).mode,
      "skip",
      files.join(", "),
    );
  }
});

test("tests, tooling and CI-only changes skip the release", () => {
  for (const files of [
    [".github/workflows/ci.yml"],
    ["tools/npm-release.mjs", "tools/npm-release.test.mjs"],
    ["eslint.config.js", ".prettierrc", "vitest.config.ts", "package.json"],
    ["tests/e2e/input.test.ts", "packages/react/src/Input.keyboard.test.tsx"],
    ["packages/web-components/tests/manifest.test.ts"],
    ["packages/minerva-design/tests/tarball.test.ts"],
    ["packages/native/vitest.web.config.ts", "packages/react/vitest.setup.ts"],
    ["packages/taro/spike/device/app.tsx", "packages/angular/build-check.log"],
  ]) {
    assert.equal(
      plan([{ message: "chore: tidy", files }]).mode,
      "skip",
      files.join(", "),
    );
  }
  assert.equal(
    plan([{ message: "ci: cache pnpm", files: [src] }]).mode,
    "skip",
  );
  assert.equal(plan([{ message: "fix: nothing", files: [] }]).mode, "skip");
});

test("changes to the shipped package release with the inferred bump", () => {
  assert.deepEqual(
    plan([{ message: "fix(react): keep caret", files: [src] }]),
    {
      mode: "version",
      version: "1.0.2",
      autoChangeset: { bump: "patch", summary: "fix(react): keep caret" },
    },
  );
  assert.deepEqual(
    plan([
      { message: "docs: explain DatePicker", files: ["docs/date-picker.md"] },
      {
        message: "feat(react): add DatePicker\n\nWith keyboard support.",
        files: ["packages/react/src/DatePicker.tsx", "apps/docs/src/x.tsx"],
      },
      {
        message: "feat(docs): add a playground",
        files: ["apps/docs/src/p.tsx"],
      },
    ]),
    {
      mode: "version",
      version: "1.1.0",
      autoChangeset: { bump: "minor", summary: "feat(react): add DatePicker" },
    },
  );
  // A docs-site feat does not lift a library fix to minor.
  assert.equal(
    plan([
      {
        message: "feat(docs): add a playground",
        files: ["apps/docs/src/p.tsx"],
      },
      {
        message: "fix(vue): emit change",
        files: ["packages/vue/src/Input.vue"],
      },
    ]).autoChangeset.bump,
    "patch",
  );
  assert.equal(
    plan(["fix(react): keep caret"], { changedFiles: ["docs/a.md", src] })
      .autoChangeset.bump,
    "patch",
  );
  assert.equal(
    plan(["feat: add Slider"], { changedFiles: [src] }).autoChangeset.bump,
    "minor",
  );
});

test("release-relevant paths cover everything that builds into the tarball", () => {
  for (const path of [
    src,
    "packages/core/src/tokens.css",
    "packages/vue/vite.config.ts",
    "packages/web-components/scripts/generate-typings.mjs",
    "packages/uni/tsconfig.build.json",
    "packages/angular/monaco/index.ts",
    "packages/native/types/charts-engine-dom.d.ts",
    "packages/minerva-design/package.json",
    "packages/minerva-design/custom-elements.json",
    "packages/react/package.json",
    "tools/dual-declarations.mjs",
    "tools/styles/uni-components.css",
  ]) {
    assert.equal(isReleaseRelevantPath(path), true, path);
  }
  for (const path of [
    "docs/releasing.md",
    "apps/docs/src/App.tsx",
    "apps/expo-example/App.tsx",
    "tests/contracts/button.test.ts",
    ".github/workflows/ci.yml",
    ".changeset/brave-cats.md",
    "pnpm-lock.yaml",
    "tools/npm-release.mjs",
    "packages/react/src/Input.test.tsx",
    "packages/angular/monaco/monaco.test.ts",
    "packages/vue/tests/global.test.ts",
    "packages/native/test/setup.ts",
    "packages/weapp/type-tests/index.ts",
    "packages/taro/examples/app.tsx",
    "packages/core/README.md",
  ]) {
    assert.equal(isReleaseRelevantPath(path), false, path);
  }
});

test("an explicit changeset always releases with its own bump", () => {
  for (const commits of [
    ["docs: clarify installation"],
    [{ message: "ci: cache pnpm", files: [".github/workflows/ci.yml"] }],
    [{ message: "feat!: drop IE", files: [src] }],
  ]) {
    assert.deepEqual(
      plan(commits, {
        releases: [
          { name: "minerva-design", type: "minor", newVersion: "1.1.0" },
        ],
        changedFiles: ["docs/releasing.md"],
      }),
      { mode: "version", version: "1.1.0" },
    );
  }
});

test("git log output keeps commit boundaries, bodies and files", () => {
  const output =
    "\x1efix: normalize value\n\nLine one\n\nBREAKING CHANGE: remove old signature\n\x1f\n\npackages/react/src/a.ts\npackages/react/src/b.ts\n" +
    "\x1edocs: clarify\n\x1f\n\ndocs/releasing.md\n" +
    "\x1eMerge pull request #1\n\x1f\n";
  assert.deepEqual(parseGitLog(output), [
    {
      message:
        "fix: normalize value\n\nLine one\n\nBREAKING CHANGE: remove old signature",
      files: ["packages/react/src/a.ts", "packages/react/src/b.ts"],
    },
    { message: "docs: clarify", files: ["docs/releasing.md"] },
    { message: "Merge pull request #1", files: [] },
  ]);
  assert.deepEqual(parseGitLog(""), []);
});

test("readCommits reads full messages and files from a real repository", async () => {
  const { mkdtempSync, mkdirSync, writeFileSync, rmSync } =
    await import("node:fs");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const { execFileSync } = await import("node:child_process");
  const cwd = mkdtempSync(join(tmpdir(), "minerva-release-log-"));
  const git = (...args) => execFileSync("git", args, { cwd, stdio: "pipe" });
  const commit = (file, ...messages) => {
    mkdirSync(join(cwd, file, ".."), { recursive: true });
    writeFileSync(join(cwd, file), `${messages[0]}\n`);
    git("add", ".");
    git("commit", ...messages.flatMap((m) => ["-m", m]));
  };
  try {
    git("init", "-b", "main");
    git("config", "user.name", "Release test");
    git("config", "user.email", "release-test@example.invalid");
    git("config", "commit.gpgsign", "false");
    commit("README.md", "chore: release minerva-design 1.0.0");
    git("tag", "minerva-design@1.0.0");
    commit(
      "packages/react/src/Input.tsx",
      "fix(react): normalize value",
      "Callers passing numbers now get strings.",
      "BREAKING CHANGE: onChange receives a string",
    );
    commit("docs/guide.md", "docs: clarify installation", "With a body line.");
    const commits = readCommits(["minerva-design@1.0.0..HEAD"], { cwd });
    assert.deepEqual(commits, [
      {
        message: "docs: clarify installation\n\nWith a body line.",
        files: ["docs/guide.md"],
      },
      {
        message:
          "fix(react): normalize value\n\nCallers passing numbers now get strings.\n\nBREAKING CHANGE: onChange receives a string",
        files: ["packages/react/src/Input.tsx"],
      },
    ]);
    assert.equal(plan(commits).autoChangeset.bump, "major");
    assert.equal(plan(commits.slice(0, 1)).mode, "skip");
    assert.equal(readCommits(["-1", "HEAD"], { cwd }).length, 1);
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
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
test("non-publishing dependent records do not block an explicit patch release", () => {
  assert.deepEqual(
    releasePlan({
      ...input,
      version: "1.0.0",
      registry: { versions: { "1.0.0": {} } },
      commits: ["feat(react): add DatePicker"],
      releases: [
        { name: "minerva-design", type: "patch", newVersion: "1.0.1" },
        { name: "@minerva/docs", type: "none", newVersion: "0.1.0" },
        { name: "@minerva/expo-example", type: "none", newVersion: "0.0.0" },
      ],
    }),
    { mode: "version", version: "1.0.1" },
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
