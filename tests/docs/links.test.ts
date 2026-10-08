// Internal links: relative links and anchors of the markdown files, links to
// the docs site (hash routes `#/<page>`) and the router links of the docs
// pages all point at something that exists.
import { describe, expect, it } from "vitest";
import { dirname, join, normalize } from "node:path";
import { MARKDOWN, docPageIds, exists, read, walk } from "./utils";

const SITE = "https://fwx5618177.github.io/minerva/";
const pages = docPageIds();

/** GitHub's heading anchors: lowercase, punctuation / emoji dropped, spaces -> "-" */
const slug = (heading: string) =>
  heading
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]/gu, "")
    .replace(/\s/g, "-");

const anchorsOf = (file: string) => {
  const text = read(file).replace(/^```[\s\S]*?^```/gm, "");
  return new Set(
    Array.from(text.matchAll(/^#{1,6}\s+(.+)$/gm), (m) => slug(m[1])),
  );
};

/** Markdown links outside code blocks */
const linksOf = (file: string) => {
  const text = read(file).replace(/^```[\s\S]*?^```/gm, "");
  return Array.from(
    text.matchAll(/\[[^\]]*\]\(([^)\s]+)\)|href="([^"]+)"/g),
    (m) => m[1] ?? m[2],
  );
};

/** Problem with `link` found in markdown `file`, or null */
function checkLink(file: string, link: string): string | null {
  if (link.startsWith(SITE)) {
    const route = link.slice(SITE.length);
    if (route === "" || route === "#/") return null;
    const page = /^#\/([\w-]+)$/.exec(route)?.[1];
    return page && pages.has(page) ? null : `no docs page for ${link}`;
  }
  if (/^[a-z][\w+.-]*:/i.test(link)) return null; // external
  const [path, anchor] = link.split("#");
  const target = path ? normalize(join(dirname(file), path)) : file;
  if (!exists(target)) return `missing file ${target}`;
  if (anchor && target.endsWith(".md") && !anchorsOf(target).has(anchor)) {
    return `missing anchor #${anchor} in ${target}`;
  }
  return null;
}

describe("markdown links", () => {
  it.each(MARKDOWN.map((f) => [f]))(
    "%s: every internal link resolves",
    (file) => {
      const problems = linksOf(file)
        .map((link) => checkLink(file, link))
        .filter(Boolean);
      expect(problems).toEqual([]);
    },
  );

  it("the checker reports broken links", () => {
    expect(checkLink("README.md", "./NOPE.md")).toMatch(/missing file/);
    expect(checkLink("README.md", "./README.md#nope")).toMatch(/anchor/);
    expect(checkLink("README.md", `${SITE}#/nope`)).toMatch(/no docs page/);
    expect(checkLink("README.md", `${SITE}#/button`)).toBeNull();
    expect(checkLink("README.md", "./README.md#-browser-support")).toBeNull();
  });
});

describe("docs site router links", () => {
  const sources = walk(
    "apps/docs/src",
    (f) =>
      /\.tsx?$/.test(f) &&
      !/\.test\.tsx?$/.test(f) &&
      !/\/(demos|wc)\//.test(f),
  );

  it("every literal route of a page or layout is a docs page", () => {
    const problems: string[] = [];
    for (const file of sources) {
      const text = read(file);
      const routes = [
        ...text.matchAll(/\bto=["'{`]+\/([\w-]*)["'`}]/g),
        ...text.matchAll(/navigate\(\s*["'`]\/([\w-]*)["'`]/g),
      ].map((m) => m[1]);
      for (const route of routes) {
        if (route !== "" && !pages.has(route))
          problems.push(`${file}: /${route}`);
      }
    }
    expect(problems).toEqual([]);
  });

  it("every page id listed for templated links (`to={`/${id}`}`) exists", () => {
    const problems: string[] = [];
    for (const file of sources) {
      const text = read(file);
      if (!/to=\{`\/\$\{/.test(text)) continue;
      // string arrays of page ids feeding the templated links (GUIDES...)
      const lists = text.matchAll(
        /const [A-Z_]*(?:GUIDES|PAGES|ROUTES|LINKS)[A-Z_]* = \[([^\]]*)\]/g,
      );
      for (const [, list] of lists) {
        const ids = Array.from(list.matchAll(/"([\w-]+)"/g), (m) => m[1]);
        for (const id of ids) {
          if (!pages.has(id)) problems.push(`${file}: ${id}`);
        }
      }
    }
    expect(problems).toEqual([]);
  });
});
