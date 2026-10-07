import React, { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { categories, docPages, type DocCategory } from "@/docs/registry";

// Every page is its own lazily-loaded chunk (src/docs/pages/<id>/index.tsx)
const pageModules = import.meta.glob<{ default: React.ComponentType }>(
  "../docs/pages/*/index.tsx",
);

const pageFor = (id: string) => {
  const loader = pageModules[`../docs/pages/${id}/index.tsx`];
  return loader ? lazy(loader) : undefined;
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
    .filter((page) => page.category === category && pageFor(page.id))
    .map<MenuItem>((page) => ({
      path: page.id,
      translationKey: `docs.${page.id}.title`,
    })),
})) satisfies {
  category: DocCategory;
  translationKey: string;
  items: MenuItem[];
}[];
