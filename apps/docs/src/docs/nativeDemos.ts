import type React from "react";
import type { DemoEntry } from "./demos";

// React Native demos (`pages/<id>/native/<demo>.tsx`) and their sources:
// one lazy chunk each, loaded by the "React Native" tab of a page only.
const modules = import.meta.glob<React.ComponentType>(
  "./pages/*/native/*.tsx",
  { import: "default" },
);
const sources = import.meta.glob<string>("./pages/*/native/*.tsx", {
  query: "?raw",
  import: "default",
});

/** The native demos of a page (demo id -> component and exact source) */
export async function loadNativeDemos(
  page: string,
): Promise<Record<string, DemoEntry>> {
  const prefix = `./pages/${page}/native/`;
  const paths = Object.keys(modules).filter((path) => path.startsWith(prefix));
  const entries = await Promise.all(
    paths.map(async (path) => {
      const [Component, source] = await Promise.all([
        modules[path](),
        sources[path](),
      ]);
      const id = path.slice(prefix.length).replace(/\.tsx$/, "");
      return [id, { Component, source }] as const;
    }),
  );
  return Object.fromEntries(entries);
}

/** Paths of every native demo (tests) */
export const nativeDemoPaths = () => Object.keys(modules);
