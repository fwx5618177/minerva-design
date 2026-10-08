import React, { lazy } from "react";
import type { RouteObject } from "react-router";
import { categories, docPages, type DocCategory } from "@/docs/registry";
import { loadPageStrings } from "@i18n/config";

// Every page is its own lazily-loaded chunk (src/docs/pages/<id>/index.tsx),
// fetched together with its strings in the current language
const pageModules = import.meta.glob<{ default: React.ComponentType }>(
  "../docs/pages/*/index.tsx",
);

const pageFor = (id: string) => {
  const loader = pageModules[`../docs/pages/${id}/index.tsx`];
  return loader
    ? lazy(() =>
        Promise.all([loader(), loadPageStrings(id)]).then(([module]) => module),
      )
    : undefined;
};

export const routes: RouteObject[] = docPages.flatMap((page) => {
  const Page = pageFor(page.id);
  return Page ? [{ path: page.id, element: <Page /> }] : [];
});

export interface MenuItem {
  path: string;
  translationKey: string;
}

/** Sidebar entries grouped by category, in registry order */
export const menuConfig = categories.map((category) => ({
  category,
  translationKey: `nav.${category}`,
  items: docPages
    .filter(
      (page) =>
        page.category === category &&
        `../docs/pages/${page.id}/index.tsx` in pageModules,
    )
    .map<MenuItem>((page) => ({
      path: page.id,
      translationKey: `docs.${page.id}.title`,
    })),
})) satisfies {
  category: DocCategory;
  translationKey: string;
  items: MenuItem[];
}[];
