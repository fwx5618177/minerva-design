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

export function inferBump(commits = []) {
  if (
    commits.some(
      (msg) =>
        /^[a-z]+(\([^)]*\))?!:/i.test(msg) || /BREAKING CHANGE/i.test(msg),
    )
  ) {
    return "major";
  }
  if (commits.some((msg) => /^feat(\([^)]*\))?:/i.test(msg))) {
    return "minor";
  }
  return "patch";
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
    const bump = inferBump(commits);
    const nextVersion = bumpVersion(latest, bump);
    const summary =
      commits.filter(Boolean).join("\n") || "Automated release from main.";
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
    const logOutput = hasTag
      ? run("git", "log", `${tag}..HEAD`, "--format=%s")
      : run("git", "log", "-1", "--format=%s");
    const commits = logOutput ? logOutput.split("\n").filter(Boolean) : [];
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
