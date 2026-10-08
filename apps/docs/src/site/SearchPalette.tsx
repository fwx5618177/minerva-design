import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { CommandDialog } from "minerva-design";
import {
  buildSearchItems,
  modKeyLabel,
  pathOfItem,
  rankSearchItems,
} from "./searchItems";
import styles from "./site.module.scss";

export interface SearchPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * ⌘K / Ctrl+K search over every documentation page and the component names
 * they document, built on Minerva's own CommandDialog (dogfooding), with
 * results ranked by match quality (`rankSearchItems`).
 */
const SearchPalette: React.FC<SearchPaletteProps> = ({
  open,
  onOpenChange,
}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const language = i18n.resolvedLanguage ?? i18n.language;
  // Rebuilt when the language changes
  const items = useMemo(
    () => buildSearchItems(t),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `t` identity is stable per language
    [t, language],
  );

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      items={items}
      filter={rankSearchItems}
      onSelect={(item) => navigate(pathOfItem(item.id))}
      title={t("search.title")}
      description={t("search.description")}
      placeholder={t("search.placeholder")}
      emptyText={t("search.empty")}
      resultsLabel={t("search.results")}
      shortcut="mod+k"
      shortcutLabel={modKeyLabel()}
      maxResults={10}
      className={styles.searchDialog}
    />
  );
};

export default SearchPalette;
