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

/** Default import snippet for a page's exports */
export const importSnippet = (
  exports: string[] = [],
  pkg: string = "@minerva/lib-core",
) => {
  if (pkg === "@minerva/lib-web-components") {
    return `// registers <minerva-button> and the other custom elements\nimport "@minerva/lib-web-components";`;
  }
  const names = exports.join(", ");
  return `import { ${names} } from "${pkg}";\nimport "${pkg}/style.css";`;
};
