import type React from "react";

export interface DemoEntry {
  Component: React.ComponentType;
  source: string;
}

/**
 * Pair the demo modules of a page with their raw source. Call it with two
 * `import.meta.glob("./demos/*.tsx", …)` results (one eager default import,
 * one `?raw`); keys become the demo ids (file names without extension).
 */
export const collectDemos = (
  modules: Record<string, React.ComponentType>,
  sources: Record<string, string>,
): Record<string, DemoEntry> => {
  const demos: Record<string, DemoEntry> = {};
  for (const [path, Component] of Object.entries(modules)) {
    const id = path.replace(/^.*\/([^/]+)\.tsx$/, "$1");
    demos[id] = { Component, source: sources[path] ?? "" };
  }
  return demos;
};

/**
 * Default import snippet for a page's exports: the component import only
 * (the global stylesheet is imported once, in the app entry — see the
 * Installation page; DocPage adds a note linking there).
 */
export const importSnippet = (
  exports: string[] = [],
  pkg: string = "minerva-design",
) => {
  if (pkg === "minerva-design/web-components") {
    return `// registers <minerva-button> and the other custom elements\nimport "minerva-design/web-components";`;
  }
  return `import { ${exports.join(", ")} } from "${pkg}";`;
};

/** A Web Component demo: plain HTML + an optional setup script */
export interface WcDemoEntry {
  /** HTML rendered as is (real custom elements) */
  html: string;
  /** Wires behaviour; returns an optional cleanup */
  setup?: (root: HTMLElement) => void | (() => void);
  /** Source of the setup script (shown under the HTML) */
  script?: string;
}

/**
 * Pair the Web Component demos of a page: `wc/<demo>.html` (raw) with the
 * optional `wc/<demo>.ts` (its `setup` export and raw source).
 */
export const collectWcDemos = (
  html: Record<string, string>,
  scripts: Record<string, { setup?: WcDemoEntry["setup"] }>,
  scriptSources: Record<string, string>,
): Record<string, WcDemoEntry> => {
  const demos: Record<string, WcDemoEntry> = {};
  for (const [path, markup] of Object.entries(html)) {
    const id = path.replace(/^.*\/([^/]+)\.html$/, "$1");
    const scriptPath = path.replace(/\.html$/, ".ts");
    demos[id] = {
      html: markup,
      setup: scripts[scriptPath]?.setup,
      script: scriptSources[scriptPath],
    };
  }
  return demos;
};
