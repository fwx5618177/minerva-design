import type { WcDemoEntry } from "./demos";

// Web Component demos of every page: pages/<id>/wc/<demo>.html (+ optional
// <demo>.ts exporting `setup(root)`). Loaded on demand, when the "Web
// Components" tab of a page is opened.
const html = import.meta.glob<string>("./pages/*/wc/*.html", {
  query: "?raw",
  import: "default",
});
const scripts = import.meta.glob<{ setup?: WcDemoEntry["setup"] }>(
  "./pages/*/wc/*.ts",
);
const scriptSources = import.meta.glob<string>("./pages/*/wc/*.ts", {
  query: "?raw",
  import: "default",
});

/** Demo id -> demo of a page */
export async function loadWcDemos(
  page: string,
): Promise<Record<string, WcDemoEntry>> {
  const prefix = `./pages/${page}/wc/`;
  const entries = await Promise.all(
    Object.keys(html)
      .filter((path) => path.startsWith(prefix))
      .map(async (path) => {
        const id = path.slice(prefix.length).replace(/\.html$/, "");
        const scriptPath = path.replace(/\.html$/, ".ts");
        const [markup, script, source] = await Promise.all([
          html[path](),
          scripts[scriptPath]?.(),
          scriptSources[scriptPath]?.(),
        ]);
        return [
          id,
          { html: markup, setup: script?.setup, script: source },
        ] as const;
      }),
  );
  return Object.fromEntries(entries);
}
