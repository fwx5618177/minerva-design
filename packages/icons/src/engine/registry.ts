// The whole built-in set, for galleries, search and lookups by name.
// Importing anything from this module bundles every icon: import the icon
// constants themselves (e.g. `searchIcon`) to ship only the ones used.

import * as actions from "./icons/actions";
import * as arrows from "./icons/arrows";
import * as communication from "./icons/communication";
import * as data from "./icons/data";
import * as devices from "./icons/devices";
import * as files from "./icons/files";
import * as finance from "./icons/finance";
import * as interfaceIcons from "./icons/interface";
import * as media from "./icons/media";
import * as status from "./icons/status";
import type { IconCategory, IconDefinition } from "./types";

const collect = (
  ...groups: Record<string, IconDefinition>[]
): readonly IconDefinition[] =>
  Object.freeze(groups.flatMap((group) => Object.values(group)));

/** Every built-in icon, grouped by category (in `iconCategories` order) */
export const icons: readonly IconDefinition[] = /* @__PURE__ */ collect(
  arrows,
  actions,
  interfaceIcons,
  media,
  files,
  communication,
  data,
  finance,
  status,
  devices,
);

/** Categories of the built-in icons, in display order */
export const iconCategories: readonly IconCategory[] = [
  "arrows",
  "actions",
  "interface",
  "media",
  "files",
  "communication",
  "data",
  "finance",
  "status",
  "devices",
];

let byName: Map<string, IconDefinition> | null = null;

/** A built-in icon by name (e.g. `"arrow-up"`), undefined if there is none */
export const getIcon = (name: string): IconDefinition | undefined => {
  byName ??= new Map(icons.map((icon) => [icon.name, icon]));
  return byName.get(name);
};

/**
 * Built-in icons matching a query: every word of `query` must start a word
 * of the name, of a tag or of the category (case-insensitive). An empty
 * query returns every icon.
 */
export const searchIcons = (query: string): IconDefinition[] => {
  const words = query
    .toLowerCase()
    .split(/[\s,]+/)
    .filter(Boolean);
  if (!words.length) return [...icons];
  return icons.filter((icon) => {
    const haystack = [
      ...icon.name.split("-"),
      icon.name,
      ...(icon.tags ?? []).flatMap((tag) => [tag, ...tag.split(/[\s-]+/)]),
      icon.category ?? "",
    ];
    return words.every((word) =>
      haystack.some((candidate) => candidate.startsWith(word)),
    );
  });
};
