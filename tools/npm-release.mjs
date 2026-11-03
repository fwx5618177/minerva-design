// Plan only: publishing and Git mutations are explicit steps in ci.yml.
import { execFileSync } from "node:child_process";
import {
  appendFileSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { pathToFileURL } from "node:url";

const stable = (version) => {
  if (!/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(version)) {
    throw new Error(`Expected a stable version, received ${version}`);
  }
  return version.split(".").map(Number);
};
const compare = (a, b) => {
  const left = stable(a);
  const right = stable(b);
  return left[0] - right[0] || left[1] - right[1] || left[2] - right[2];
};

// Commits are full messages (subject + body) or `{ message, files }`.
const messageOf = (commit) =>
  typeof commit === "string" ? commit : (commit?.message ?? "");
const subjectOf = (message) => message.trim().split("\n")[0].trim();
// Conventional Commits footer tokens are uppercase and start a line.
const BREAKING_FOOTER = /^BREAKING[ -]CHANGE:.*$/gm;

export function inferBump(commits = []) {
  const messages = commits.map(messageOf);
  if (
    messages.some(
      (msg) =>
        /^[a-z]+(\([^)]*\))?!:/i.test(msg.trim()) ||
        /^BREAKING[ -]CHANGE:/m.test(msg),
    )
  ) {
    return "major";
  }
  if (messages.some((msg) => /^feat(\([^)]*\))?:/i.test(msg.trim()))) {
    return "minor";
  }
  return "patch";
}

// Types that never change the published package, whatever files they touch.
const NO_RELEASE_TYPES = new Set(["docs", "test", "ci"]);
// Repo-level build helpers imported by the packages/* builds that assemble
// packages/minerva-design/dist.
const BUILD_TOOLS = [
  "tools/paths.mjs",
  "tools/core-imports.mjs",
  "tools/css-layer.mjs",
  "tools/dual-declarations.mjs",
  "tools/generate-contracts.mjs",
];
const NON_SHIPPING_DIRS =
  /\/(tests?|__tests__|__snapshots__|__mocks__|spike|examples|type-tests|coverage|node_modules|dist)\//;
const NON_SHIPPING_FILES =
  /(\.(test|spec)\.[^/]+|\.md|\.log|\/vitest(\.[^/]+)?\.config\.[^/]+|\/vitest\.setup\.[^/]+)$/i;

/**
 * Whether a changed path can alter the published `minerva-design` tarball:
 * anything under packages/* (all of them build into
 * packages/minerva-design/dist) except tests, spikes, examples, test configs,
 * logs and Markdown, plus the shared build helpers in tools/.
 */
export function isReleaseRelevantPath(file) {
  const path = file.replace(/^"|"$/g, "").replace(/^\.\//, "");
  if (BUILD_TOOLS.includes(path) || path.startsWith("tools/styles/")) {
    return true;
  }
  if (!/^packages\/[^/]+\/./.test(path)) return false;
  return !NON_SHIPPING_DIRS.test(path) && !NON_SHIPPING_FILES.test(path);
}

function isReleasable(commit, changedFiles) {
  const type = /^(\w+)(?:\([^)]*\))?!?:/.exec(subjectOf(messageOf(commit)));
  if (type && NO_RELEASE_TYPES.has(type[1].toLowerCase())) return false;
  const files =
    typeof commit === "object" && Array.isArray(commit?.files)
      ? commit.files
      : changedFiles;
  // Without file data, fall back to the commit type alone.
  return files ? files.some(isReleaseRelevantPath) : true;
}

function summaryOf(commit) {
  const message = messageOf(commit);
  return [subjectOf(message), ...(message.match(BREAKING_FOOTER) ?? [])]
    .filter(Boolean)
    .join("\n");
}

const RECORD = "\x1e";
const FIELD = "\x1f";
const GIT_LOG_ARGS = [
  "-c",
  "core.quotePath=false",
  "log",
  "--no-renames",
  "--name-only",
  "--format=%x1e%B%x1f",
];

/** Parses `git log` output produced with {@link GIT_LOG_ARGS}. */
export function parseGitLog(output) {
  return output
    .split(RECORD)
    .filter((record) => record.trim())
    .map((record) => {
      const [message, files = ""] = record.split(FIELD);
      return {
        message: message.trim(),
        files: files
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean),
      };
    });
}

/** Full commit messages and changed files for `git log <args>`. */
export function readCommits(args, { cwd } = {}) {
  return parseGitLog(
    execFileSync("git", [...GIT_LOG_ARGS, ...args], {
      cwd,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    }),
  );
}

export function bumpVersion(version, bump = "patch") {
  const [major, minor, patch] = stable(version);
  if (bump === "major") return `${major + 1}.0.0`;
  if (bump === "minor") return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
}

export async function readRegistry(request = fetch) {
  const response = await request("https://registry.npmjs.org/minerva-design", {
    signal: AbortSignal.timeout(30_000),
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`npm registry returned ${response.status}`);
  const data = await response.json();
  if (!data.versions || typeof data.versions !== "object") {
    throw new Error("npm registry response has no versions map");
  }
  return data;
}

export function releasePlan({
  version,
  registry,
  releases,
  isCurrentMain,
  isReleaseCommit = false,
  commits = [],
  changedFiles,
}) {
  if (!isCurrentMain)
    return {
      mode: "skip",
      reason: "main advanced; use the CI run for its newest commit",
    };
  stable(version);
  if (!registry?.versions?.["1.0.0"]) {
    throw new Error(
      "Publish minerva-design@1.0.0 manually before enabling automatic releases",
    );
  }
  const versions = Object.keys(registry.versions).filter((v) =>
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(v),
  );
  const latest = versions.sort(compare).at(-1);
  if (compare(version, latest) < 0)
    throw new Error(`Local ${version} is older than published ${latest}`);
  // Changesets also reports private dependents whose version does not change.
  releases = releases.filter((item) => item.type !== "none");
  if (releases.some((item) => item.name !== "minerva-design")) {
    throw new Error("Only minerva-design may be released");
  }
  if (!registry.versions[version]) {
    if (releases.length)
      throw new Error(
        `Recover unpublished ${version} before adding another changeset`,
      );
    return { mode: "publish", version };
  }
  if (!releases.length) {
    if (isReleaseCommit) return { mode: "tag", version };
    const releasable = commits.filter((commit) =>
      isReleasable(commit, changedFiles),
    );
    const hasChanges = commits.length
      ? releasable.length > 0
      : !changedFiles || changedFiles.some(isReleaseRelevantPath);
    if (!hasChanges) {
      return {
        mode: "skip",
        reason:
          "no changes to the published package since the last release (docs, tests, tooling or CI only)",
      };
    }
    const bump = inferBump(releasable);
    const nextVersion = bumpVersion(latest, bump);
    const summary =
      releasable.map(summaryOf).filter(Boolean).join("\n") ||
      "Automated release from main.";
    return {
      mode: "version",
      version: nextVersion,
      autoChangeset: { bump, summary },
    };
  }
  if (releases.length !== 1 || compare(releases[0].newVersion, latest) <= 0) {
    throw new Error("Changesets must advance the published stable version");
  }
  stable(releases[0].newVersion);
  return { mode: "version", version: releases[0].newVersion };
}

async function main() {
  if (
    process.env.GITHUB_ACTIONS !== "true" ||
    process.env.GITHUB_REF !== "refs/heads/main"
  ) {
    throw new Error("Release planning runs only in GitHub Actions on main");
  }
  const run = (...args) =>
    execFileSync(args[0], args.slice(1), { encoding: "utf8" }).trim();
  const head = run("git", "rev-parse", "HEAD");
  const remote = run("git", "ls-remote", "origin", "refs/heads/main").split(
    /\s/,
  )[0];
  let plan;
  if (head !== process.env.GITHUB_SHA || head !== remote) {
    plan = {
      mode: "skip",
      reason: "main advanced; use the CI run for its newest commit",
    };
  } else {
    mkdirSync(".artifacts", { recursive: true });
    run(
      "pnpm",
      "exec",
      "changeset",
      "status",
      "--output",
      ".artifacts/release-status.json",
    );
    const { releases } = JSON.parse(
      readFileSync(".artifacts/release-status.json", "utf8"),
    );
    const { version } = JSON.parse(
      readFileSync("packages/minerva-design/package.json", "utf8"),
    );
    const tag = `minerva-design@${version}`;
    let hasTag = false;
    try {
      run("git", "rev-parse", "--verify", "--quiet", `refs/tags/${tag}`);
      hasTag = true;
    } catch {
      // Tag does not exist yet
    }
    const commits = readCommits(hasTag ? [`${tag}..HEAD`] : ["-1", "HEAD"]);
    const headSubject = run("git", "log", "-1", "--format=%s");
    const isReleaseCommit =
      headSubject === `chore: release minerva-design ${version}` ||
      (hasTag && commits.length === 0);
    plan = releasePlan({
      version,
      releases,
      registry: await readRegistry(),
      isCurrentMain: true,
      isReleaseCommit,
      commits,
    });
    if (plan.autoChangeset) {
      writeFileSync(
        ".changeset/auto-release.md",
        `---\n"minerva-design": ${plan.autoChangeset.bump}\n---\n\n${plan.autoChangeset.summary}\n`,
      );
    }
  }
  console.log(JSON.stringify(plan));
  appendFileSync(
    process.env.GITHUB_OUTPUT,
    `mode=${plan.mode}\nversion=${plan.version ?? ""}\n`,
  );
  appendFileSync(
    process.env.GITHUB_STEP_SUMMARY,
    `### npm release\n\n${plan.reason ?? `${plan.mode}: minerva-design@${plan.version}`}\n`,
  );
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
