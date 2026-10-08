// Entries of the ⌘K search palette (pure: unit tested in Node / happy-dom).
import type { TFunction } from "i18next";
import type { CommandItem } from "@minerva/lib-core";
import { docPages, type DocPageMeta } from "@/docs/registry";

/** Id of the landing page entry */
export const HOME_ITEM_ID = "__home";

/**
 * One entry per documentation page (translated title, description and
 * category), searchable by the component names it documents: React exports
 * (`CardHeader`), custom element tags (`minerva-card`) and the route id.
 */
export function buildSearchItems(
  t: TFunction,
  pages: readonly DocPageMeta[] = docPages,
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
  ];
}

/** Route of a search entry */
export const pathOfItem = (id: string) =>
  id === HOME_ITEM_ID ? "/" : `/${id}`;

/** "⌘K" on Apple platforms, "Ctrl K" elsewhere */
export const modKeyLabel = (
  platform = typeof navigator !== "undefined"
    ? `${navigator.platform} ${navigator.userAgent}`
    : "",
) => (/Mac|iPhone|iPad|iPod/i.test(platform) ? "⌘K" : "Ctrl K");
