// Entries of the ⌘K search palette (pure: unit tested in Node / happy-dom).
import type { TFunction } from "i18next";
import type { CommandItem } from "@minerva/lib-core";
import { docPages, type DocPageMeta } from "@/docs/registry";
import {
  FRAMEWORKS,
  getFramework,
  parseFramework,
  type FrameworkDef,
} from "@/docs/frameworks";

/** Id of the landing page entry */
export const HOME_ITEM_ID = "__home";

/** Id prefix of the "show the docs in <framework>" entries */
export const FRAMEWORK_ITEM_PREFIX = "__framework:";

/**
 * One entry per documentation page (translated title, description and
 * category), searchable by the component names it documents: React exports
 * (`CardHeader`), custom element tags (`minerva-card`) and the route id.
 */
export function buildSearchItems(
  t: TFunction,
  pages: readonly DocPageMeta[] = docPages,
  frameworks: readonly FrameworkDef[] = FRAMEWORKS,
): CommandItem[] {
  const home: CommandItem = {
    id: HOME_ITEM_ID,
    title: t("nav.home"),
    keywords: "home landing minerva",
  };
  return [
    home,
    ...pages.map((page) => ({
      id: page.id,
      title: t(`docs.${page.id}.title`),
      description: t(`docs.${page.id}.description`),
      group: t(`nav.${page.category}`),
      keywords: [
        page.id,
        page.id.replace(/-/g, " "),
        ...(page.exports ?? []),
        ...(page.wc?.tags ?? []),
      ].join(" "),
    })),
    // switch the site-wide framework (component pages follow it)
    ...frameworks.map((fw) => ({
      id: `${FRAMEWORK_ITEM_PREFIX}${fw.id}`,
      title: t("search.framework.title", { framework: fw.label }),
      description: t("search.framework.description", {
        framework: fw.label,
      }),
      group: t("doc.wc.framework"),
      keywords: `${fw.id} ${fw.label} framework`,
    })),
  ];
}

/** Lower-cased, accent-free text (so "theme" finds "Thème") */
export const foldSearchText = (value: string): string =>
  value
    .normalize("NFKD")
    .replace(/\p{M}+/gu, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");

/** Word boundaries of titles and descriptions (any script, any language) */
const WORD_SEPARATOR = /[\s\-_/.,:;()[\]{}<>"'`·・、，。：]+/u;

const words = (text: string) => text.split(WORD_SEPARATOR).filter(Boolean);

/**
 * Match quality of a search entry (lower is better), or `null` when it does
 * not match: exact title > title prefix > title word start > title
 * substring > component / tag name (keywords) > description > group.
 */
export function searchScore(item: CommandItem, query: string): number | null {
  const q = foldSearchText(query);
  if (!q) return 0;
  const title = foldSearchText(item.title);
  if (title === q) return 0;
  if (title.startsWith(q)) return 1;
  if (words(title).some((word) => word.startsWith(q))) return 2;
  if (title.includes(q)) return 3;
  // component / tag names: whole names ("minerva-tag", "CardHeader")
  const names = foldSearchText(item.keywords ?? "");
  const nameList = names.split(" ");
  if (nameList.includes(q)) return 4;
  if (nameList.some((name) => name.startsWith(q))) return 5;
  if (names.includes(q)) return 6;
  const description = foldSearchText(item.description ?? "");
  if (words(description).some((word) => word.startsWith(q))) return 7;
  if (description.includes(q)) return 8;
  if (foldSearchText(item.group ?? "").includes(q)) return 9;
  return null;
}

/**
 * CommandDialog `filter` of the ⌘K search: matching entries, best match
 * first (registry order between equal matches).
 */
export function rankSearchItems(
  items: CommandItem[],
  query: string,
): CommandItem[] {
  return items
    .map((item, index) => ({ item, index, score: searchScore(item, query) }))
    .filter(
      (entry): entry is { item: CommandItem; index: number; score: number } =>
        entry.score !== null,
    )
    .sort((a, b) => a.score - b.score || a.index - b.index)
    .map((entry) => entry.item);
}

/**
 * Route of a search entry; a framework entry opens its guide with
 * `?framework=<id>`, which makes it the site-wide choice.
 */
export const pathOfItem = (id: string) => {
  if (id === HOME_ITEM_ID) return "/";
  if (id.startsWith(FRAMEWORK_ITEM_PREFIX)) {
    const framework = parseFramework(id.slice(FRAMEWORK_ITEM_PREFIX.length));
    if (framework) {
      return `/${getFramework(framework).guide}?framework=${framework}`;
    }
  }
  return `/${id}`;
};

/** "⌘K" on Apple platforms, "Ctrl K" elsewhere */
export const modKeyLabel = (
  platform = typeof navigator !== "undefined"
    ? `${navigator.platform} ${navigator.userAgent}`
    : "",
) => (/Mac|iPhone|iPad|iPod/i.test(platform) ? "⌘K" : "Ctrl K");
