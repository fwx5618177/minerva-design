import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  bumpVersion,
  highestBump,
  nextVersion,
  parseBlocks,
  parseChangelog,
  parseChangeset,
  parseInline,
  pendingChangesets,
  upcomingRelease,
} from "./changelog";
import { CURRENT_VERSION, LATEST_VERSION, UPCOMING_RELEASE } from "./releases";

const CHANGELOG = `# minerva-design

## 1.11.0

### Minor Changes

- b50696a: Icons: the set grows to \`499\` icons.

## 1.7.0

### Minor Changes

- test(docs): give the feed crossing test room
  feat(charts): order book heatmap legend

### Patch Changes

- 16a19a3: Fix the **delivery** checks.

## 1.0.0

### Major Changes

- First stable release.

  - Shared design tokens.
  - Typed public entrypoints.

  Supported APIs are documented.
`;

describe("parseChangelog", () => {
  const releases = parseChangelog(CHANGELOG);

  it("lists the versions in file order (newest first)", () => {
    expect(releases.map((release) => release.version)).toEqual([
      "1.11.0",
      "1.7.0",
      "1.0.0",
    ]);
  });

  it("groups the items by change type and splits the commit hash", () => {
    expect(releases[1].groups).toEqual([
      {
        type: "minor",
        title: "Minor Changes",
        items: [
          {
            text: "test(docs): give the feed crossing test room\nfeat(charts): order book heatmap legend",
          },
        ],
      },
      {
        type: "patch",
        title: "Patch Changes",
        items: [{ hash: "16a19a3", text: "Fix the **delivery** checks." }],
      },
    ]);
    expect(releases[0].groups[0].items).toEqual([
      { hash: "b50696a", text: "Icons: the set grows to `499` icons." },
    ]);
  });

  it("keeps multi-paragraph items with their nested lists", () => {
    const [item] = releases[2].groups[0].items;
    expect(releases[2].groups[0].type).toBe("major");
    expect(item.text).toBe(
      "First stable release.\n\n- Shared design tokens.\n- Typed public entrypoints.\n\nSupported APIs are documented.",
    );
    expect(parseBlocks(item.text)).toEqual([
      { type: "paragraph", lines: ["First stable release."] },
      {
        type: "list",
        items: ["Shared design tokens.", "Typed public entrypoints."],
      },
      { type: "paragraph", lines: ["Supported APIs are documented."] },
    ]);
  });

  it("keeps unknown group headings with a null type", () => {
    const [release] = parseChangelog(
      "## 2.0.0\r\n\r\n### Notes\r\n\r\n- Something\r\n",
    );
    expect(release.groups).toEqual([
      { type: null, title: "Notes", items: [{ text: "Something" }] },
    ]);
  });

  it("parses the real CHANGELOG of minerva-design", () => {
    const real = parseChangelog(
      readFileSync(
        new URL(
          "../../../../packages/minerva-design/CHANGELOG.md",
          import.meta.url,
        ),
        "utf8",
      ),
    );
    expect(real[0].version).toBe(CURRENT_VERSION);
    for (const release of real) {
      expect(release.version).toMatch(/^\d+\.\d+\.\d+/);
      expect(release.groups.length).toBeGreaterThan(0);
      for (const group of release.groups) {
        expect(group.type).not.toBeNull();
        expect(group.items.length).toBeGreaterThan(0);
      }
    }
  });
});

describe("parseChangeset", () => {
  it("reads the bump of minerva-design and the summary", () => {
    expect(
      parseChangeset(
        "icons",
        '---\n"minerva-design": minor\n---\n\nNew icons: `SearchIcon`.\n\nSecond paragraph.\n',
      ),
    ).toEqual({
      id: "icons",
      bump: "minor",
      summary: "New icons: `SearchIcon`.\n\nSecond paragraph.",
    });
  });

  it("accepts single quotes, unquoted names and CRLF", () => {
    expect(
      parseChangeset("a", "---\r\n'minerva-design': patch\r\n---\r\nFix\r\n"),
    ).toMatchObject({ bump: "patch", summary: "Fix" });
    expect(
      parseChangeset("b", "---\nminerva-design: major\n---\nBreak"),
    ).toMatchObject({ bump: "major", summary: "Break" });
  });

  it("ignores other packages, `none` and empty changesets", () => {
    expect(
      parseChangeset("c", '---\n"@minerva/core": minor\n---\nInternal'),
    ).toBeNull();
    expect(
      parseChangeset("d", '---\n"minerva-design": none\n---\nNothing'),
    ).toBeNull();
    expect(parseChangeset("e", "---\n---\n")).toBeNull();
    expect(parseChangeset("f", "No frontmatter")).toBeNull();
  });

  it("picks the package among several", () => {
    expect(
      parseChangeset(
        "g",
        '---\n"@minerva/react": major\n"minerva-design": patch\n---\nFix',
      ),
    ).toMatchObject({ bump: "patch" });
  });
});

describe("pendingChangesets", () => {
  it("skips the README and non-Markdown files, sorted by file name", () => {
    const files = {
      "../../.changeset/zeta.md": '---\n"minerva-design": patch\n---\nZ',
      "../../.changeset/README.md": "# Changesets",
      "../../.changeset/config.json": "{}",
      "../../.changeset/alpha.md": '---\n"minerva-design": minor\n---\nA',
    };
    expect(pendingChangesets(files)).toEqual([
      { id: "alpha", bump: "minor", summary: "A" },
      { id: "zeta", bump: "patch", summary: "Z" },
    ]);
  });
});

describe("next version", () => {
  it("bumps major, minor and patch", () => {
    expect(bumpVersion("1.11.3", "major")).toBe("2.0.0");
    expect(bumpVersion("1.11.3", "minor")).toBe("1.12.0");
    expect(bumpVersion("1.11.3", "patch")).toBe("1.11.4");
    expect(() => bumpVersion("next", "patch")).toThrow();
  });

  it("uses the highest bump: major > minor > patch", () => {
    expect(highestBump(["patch", "minor", "patch"])).toBe("minor");
    expect(highestBump(["minor", "major", "patch"])).toBe("major");
    expect(highestBump(["patch"])).toBe("patch");
    expect(highestBump([])).toBeNull();
  });

  it("computes the version of several changesets", () => {
    expect(nextVersion("1.11.0", [{ bump: "patch" }, { bump: "patch" }])).toBe(
      "1.11.1",
    );
    expect(nextVersion("1.11.0", [{ bump: "patch" }, { bump: "minor" }])).toBe(
      "1.12.0",
    );
    expect(
      nextVersion("1.11.0", [
        { bump: "minor" },
        { bump: "major" },
        { bump: "patch" },
      ]),
    ).toBe("2.0.0");
    expect(nextVersion("1.11.0", [])).toBeNull();
  });

  it("builds the upcoming release, grouped from major to patch", () => {
    expect(
      upcomingRelease("1.11.0", [
        { id: "a", bump: "patch", summary: "Fix A" },
        { id: "b", bump: "minor", summary: "Feature B" },
        { id: "c", bump: "patch", summary: "Fix C" },
      ]),
    ).toEqual({
      version: "1.12.0",
      groups: [
        {
          type: "minor",
          title: "Minor Changes",
          items: [{ text: "Feature B" }],
        },
        {
          type: "patch",
          title: "Patch Changes",
          items: [{ text: "Fix A" }, { text: "Fix C" }],
        },
      ],
    });
    expect(upcomingRelease("1.11.0", [])).toBeNull();
  });

  it("reads the pending changesets of the repository at build time", () => {
    expect(CURRENT_VERSION).toMatch(/^\d+\.\d+\.\d+/);
    if (UPCOMING_RELEASE) {
      expect(LATEST_VERSION).toBe(UPCOMING_RELEASE.version);
      expect(UPCOMING_RELEASE.groups.length).toBeGreaterThan(0);
    } else {
      expect(LATEST_VERSION).toBe(CURRENT_VERSION);
    }
  });
});

describe("Markdown of the notes", () => {
  it("parses inline code, bold, italics and safe links", () => {
    expect(
      parseInline(
        "Use `Icon` with **bold `x`**, *italic* and [docs](https://example.com).",
      ),
    ).toEqual([
      { type: "text", text: "Use " },
      { type: "code", text: "Icon" },
      { type: "text", text: " with " },
      {
        type: "strong",
        children: [
          { type: "text", text: "bold " },
          { type: "code", text: "x" },
        ],
      },
      { type: "text", text: ", " },
      { type: "em", children: [{ type: "text", text: "italic" }] },
      { type: "text", text: " and " },
      {
        type: "link",
        href: "https://example.com",
        children: [{ type: "text", text: "docs" }],
      },
      { type: "text", text: "." },
    ]);
  });

  it("renders unsafe or relative links as text and leaves stray asterisks", () => {
    expect(parseInline("[x](javascript:void) and [y](./a.md)")).toEqual([
      { type: "text", text: "x and y" },
    ]);
    expect(parseInline("packages/* and 2 * 3")).toEqual([
      { type: "text", text: "packages/* and 2 * 3" },
    ]);
  });

  it("keeps the lines of a paragraph and fenced code", () => {
    expect(parseBlocks("a\nb\n\n```ts\nconst x = 1;\n```\n* c\n  d")).toEqual([
      { type: "paragraph", lines: ["a", "b"] },
      { type: "code", text: "const x = 1;" },
      { type: "list", items: ["c d"] },
    ]);
  });
});
