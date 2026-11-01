// Release notes of minerva-design (Changelog page, landing page version).
//
// Pure functions only (no Vite imports) so they are unit tested in Node:
// - parseChangelog: the released versions of packages/minerva-design/CHANGELOG.md
// - parseChangeset / pendingChangesets: the pending `.changeset/*.md` files
// - upcomingRelease: the next version and its notes, computed like
//   `changeset version` (the highest bump of the pending changesets)
// - parseBlocks / parseInline: the small Markdown subset of the notes

export type BumpType = "major" | "minor" | "patch";

/** Bump types from the highest to the lowest */
export const BUMP_TYPES: readonly BumpType[] = ["major", "minor", "patch"];

/** The published package (other packages of the monorepo are private) */
export const PACKAGE_NAME = "minerva-design";

/** Group headings written by Changesets (`### Minor Changes`) */
const GROUP_TITLES: Record<BumpType, string> = {
  major: "Major Changes",
  minor: "Minor Changes",
  patch: "Patch Changes",
};

export interface ChangelogItem {
  /** Short hash of the commit that added the changeset, if any */
  hash?: string;
  /** Markdown of the entry (continuation lines dedented) */
  text: string;
}

export interface ChangelogGroup {
  /** Bump type of the group; null for a heading Changesets does not write */
  type: BumpType | null;
  /** Heading as written in the changelog ("Minor Changes") */
  title: string;
  items: ChangelogItem[];
}

export interface ChangelogRelease {
  version: string;
  groups: ChangelogGroup[];
}

const lines = (source: string) => source.replace(/\r\n?/g, "\n").split("\n");

const groupType = (title: string): BumpType | null =>
  BUMP_TYPES.find(
    (type) => GROUP_TITLES[type].toLowerCase() === title.toLowerCase(),
  ) ?? null;

/** `- b50696a: Summary` → hash + summary (`- docs(site): x` has no hash) */
const HASH = /^([0-9a-f]{7,40}):\s+/;

/**
 * Released versions of a Changesets CHANGELOG.md, in file order (newest
 * first): `## <version>`, `### <Type> Changes`, `- <hash>: <summary>` items
 * whose following lines are indented by two spaces.
 */
export function parseChangelog(source: string): ChangelogRelease[] {
  const releases: ChangelogRelease[] = [];
  let release: ChangelogRelease | undefined;
  let group: ChangelogGroup | undefined;
  let item: { hash?: string; lines: string[] } | undefined;
  const items = new Map<ChangelogGroup, { hash?: string; lines: string[] }[]>();

  for (const line of lines(source)) {
    const heading = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (heading) {
      item = undefined;
      if (heading[1] === "##") {
        release = { version: heading[2], groups: [] };
        releases.push(release);
        group = undefined;
      } else if (release) {
        group = { type: groupType(heading[2]), title: heading[2], items: [] };
        release.groups.push(group);
        items.set(group, []);
      }
      continue;
    }
    if (!group) continue;
    const bullet = /^[-*]\s+(.*)$/.exec(line);
    if (bullet) {
      const hash = HASH.exec(bullet[1]);
      item = {
        hash: hash?.[1],
        lines: [hash ? bullet[1].slice(hash[0].length) : bullet[1]],
      };
      items.get(group)!.push(item);
    } else if (item) {
      item.lines.push(line.replace(/^ {1,2}/, ""));
    }
  }

  for (const [owner, entries] of items) {
    owner.items = entries
      .map(({ hash, lines: text }) => ({
        ...(hash ? { hash } : {}),
        text: text.join("\n").trim(),
      }))
      .filter((entry) => entry.text);
  }
  return releases;
}

export interface PendingChangeset {
  /** File name without `.md` */
  id: string;
  bump: BumpType;
  /** Markdown body of the changeset */
  summary: string;
}

/**
 * A `.changeset/<id>.md` file: YAML frontmatter mapping package names to a
 * bump type (`"minerva-design": minor`), then the summary. Null when the
 * changeset does not release `pkg` (other packages, `none`, empty changesets).
 */
export function parseChangeset(
  id: string,
  source: string,
  pkg: string = PACKAGE_NAME,
): PendingChangeset | null {
  const all = lines(source);
  if (all[0]?.trim() !== "---") return null;
  const end = all.findIndex((line, i) => i > 0 && line.trim() === "---");
  if (end < 0) return null;
  let bump: BumpType | undefined;
  for (const line of all.slice(1, end)) {
    const entry = /^\s*(["']?)(.+?)\1\s*:\s*(["']?)(\w+)\3\s*$/.exec(line);
    if (entry?.[2] === pkg && (BUMP_TYPES as string[]).includes(entry[4])) {
      bump = entry[4] as BumpType;
    }
  }
  const summary = all
    .slice(end + 1)
    .join("\n")
    .trim();
  return bump ? { id, bump, summary } : null;
}

/**
 * The changesets of `files` (path → content, e.g. an `import.meta.glob` of
 * `.changeset/*.md`) releasing `pkg`, sorted by file name. The README of the
 * folder and non-Markdown files are ignored.
 */
export function pendingChangesets(
  files: Record<string, string>,
  pkg: string = PACKAGE_NAME,
): PendingChangeset[] {
  return Object.keys(files)
    .sort()
    .flatMap((path) => {
      const name = path.split(/[\\/]/).pop() ?? path;
      if (!name.endsWith(".md") || name.toLowerCase() === "readme.md") {
        return [];
      }
      const changeset = parseChangeset(
        name.slice(0, -".md".length),
        files[path],
        pkg,
      );
      return changeset ? [changeset] : [];
    });
}

/** The highest bump of a list (major > minor > patch); null when empty */
export function highestBump(bumps: Iterable<BumpType>): BumpType | null {
  const set = new Set(bumps);
  return BUMP_TYPES.find((type) => set.has(type)) ?? null;
}

/** `1.11.0` + minor → `1.12.0` (a prerelease suffix is dropped) */
export function bumpVersion(version: string, bump: BumpType): string {
  const match = /^v?(\d+)\.(\d+)\.(\d+)/.exec(version.trim());
  if (!match) throw new Error(`Not a semantic version: "${version}"`);
  const [major, minor, patch] = match.slice(1).map(Number);
  if (bump === "major") return `${major + 1}.0.0`;
  if (bump === "minor") return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
}

/** Next version after `current` for these changesets; null without any */
export function nextVersion(
  current: string,
  changesets: readonly Pick<PendingChangeset, "bump">[],
): string | null {
  const bump = highestBump(changesets.map((changeset) => changeset.bump));
  return bump ? bumpVersion(current, bump) : null;
}

/**
 * The release `changeset version` will make of the pending changesets, in
 * the CHANGELOG's shape (groups from major to patch); null without any.
 */
export function upcomingRelease(
  current: string,
  changesets: readonly PendingChangeset[],
): ChangelogRelease | null {
  const version = nextVersion(current, changesets);
  if (!version) return null;
  return {
    version,
    groups: BUMP_TYPES.flatMap((type) => {
      const items = changesets
        .filter((changeset) => changeset.bump === type && changeset.summary)
        .map((changeset) => ({ text: changeset.summary }));
      return items.length
        ? [{ type, title: GROUP_TITLES[type], items } satisfies ChangelogGroup]
        : [];
    }),
  };
}

// ---- Markdown subset of the notes ----

export type Block =
  /** Lines of a paragraph (kept apart: generated entries list one commit per line) */
  | { type: "paragraph"; lines: string[] }
  | { type: "list"; items: string[] }
  | { type: "code"; text: string };

/** Paragraphs, bullet lists and fenced code of a note */
export function parseBlocks(markdown: string): Block[] {
  const blocks: Block[] = [];
  let current: Block | undefined;
  let fence: { type: "code"; lines: string[] } | undefined;

  for (const line of lines(markdown)) {
    if (fence) {
      if (/^\s*```/.test(line)) {
        blocks.push({ type: "code", text: fence.lines.join("\n") });
        fence = undefined;
      } else {
        fence.lines.push(line);
      }
      continue;
    }
    if (/^\s*```/.test(line)) {
      current = undefined;
      fence = { type: "code", lines: [] };
      continue;
    }
    if (!line.trim()) {
      current = undefined;
      continue;
    }
    const bullet = /^\s*[-*+]\s+(.*)$/.exec(line);
    if (bullet) {
      if (current?.type !== "list") {
        current = { type: "list", items: [] };
        blocks.push(current);
      }
      current.items.push(bullet[1].trim());
    } else if (current?.type === "list" && /^\s/.test(line)) {
      const last = current.items.length - 1;
      current.items[last] = `${current.items[last]} ${line.trim()}`;
    } else {
      if (current?.type !== "paragraph") {
        current = { type: "paragraph", lines: [] };
        blocks.push(current);
      }
      current.lines.push(line.trim().replace(/^#{1,6}\s+/, ""));
    }
  }
  if (fence) blocks.push({ type: "code", text: fence.lines.join("\n") });
  return blocks;
}

export type Inline =
  | { type: "text"; text: string }
  | { type: "code"; text: string }
  | { type: "strong"; children: Inline[] }
  | { type: "em"; children: Inline[] }
  | { type: "link"; href: string; children: Inline[] };

const INLINE =
  /`([^`]+)`|\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)|(?<![\w*])\*(?![\s*])([^*]+?)(?<!\s)\*(?![\w*])/g;

/** Only absolute web links are rendered as links (no `javascript:`) */
const SAFE_HREF = /^(https?:\/\/|mailto:)/i;

/** Inline code, bold, italics and links of a line of Markdown */
export function parseInline(text: string): Inline[] {
  const out: Inline[] = [];
  const pushText = (value: string) => {
    if (!value) return;
    const last = out[out.length - 1];
    if (last?.type === "text") last.text += value;
    else out.push({ type: "text", text: value });
  };
  let index = 0;
  for (const match of text.matchAll(INLINE)) {
    pushText(text.slice(index, match.index));
    index = match.index + match[0].length;
    const [, code, strong, label, href, em] = match;
    if (code !== undefined) out.push({ type: "code", text: code });
    else if (strong !== undefined) {
      out.push({ type: "strong", children: parseInline(strong) });
    } else if (label !== undefined) {
      if (SAFE_HREF.test(href)) {
        out.push({ type: "link", href, children: parseInline(label) });
      } else {
        for (const child of parseInline(label)) {
          if (child.type === "text") pushText(child.text);
          else out.push(child);
        }
      }
    } else out.push({ type: "em", children: parseInline(em) });
  }
  pushText(text.slice(index));
  return out;
}
