import type { Component } from "vue";

// Native Vue demos of every page: pages/<id>/vue/<demo>.vue, one per Web
// Component demo of the page (same demo ids, so they share the translated
// titles and descriptions `docs.<page>.wc.demos.<demo>`). Compiled by
// @vitejs/plugin-vue and loaded on demand, when the Vue tab is opened; the
// raw single-file component is the source shown under each demo.
const modules = import.meta.glob<Component>("./pages/*/vue/*.vue", {
  import: "default",
});
const sources = import.meta.glob<string>("./pages/*/vue/*.vue", {
  query: "?raw",
  import: "default",
});

/** A native Vue demo: its component (lazy) and its single-file source */
export interface VueDemoEntry {
  load: () => Promise<Component>;
  source: () => Promise<string>;
}

/** Demo id -> Vue demo of a page */
export function vueDemosOf(page: string): Record<string, VueDemoEntry> {
  const prefix = `./pages/${page}/vue/`;
  return Object.fromEntries(
    Object.keys(modules)
      .filter((path) => path.startsWith(prefix))
      .map((path) => [
        path.slice(prefix.length).replace(/\.vue$/, ""),
        { load: modules[path], source: sources[path] },
      ]),
  );
}

/** Pages with native Vue demos */
export const vuePages = (): string[] => [
  ...new Set(Object.keys(modules).map((path) => path.split("/")[2] as string)),
];
