import React from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { menuConfig } from "@router/routes";
import styles from "./site.module.scss";

/** Previous / next page links, in sidebar order */
const Pager: React.FC<{ pathname: string }> = ({ pathname }) => {
  const { t } = useTranslation();
  const flat = menuConfig.flatMap((group) => group.items);
  const index = flat.findIndex((item) => `/${item.path}` === pathname);
  if (index === -1) return null;
  const prev = flat[index - 1];
  const next = flat[index + 1];

  return (
    <nav className={styles.pager} aria-label={t("pager.label")}>
      {prev ? (
        <Link to={`/${prev.path}`} className={styles.pagerLink} rel="prev">
          <span className={styles.pagerHint}>
            <IoChevronBack aria-hidden />
            {t("pager.previous")}
          </span>
          <span className={styles.pagerTitle}>{t(prev.translationKey)}</span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          to={`/${next.path}`}
          className={`${styles.pagerLink} ${styles.pagerNext}`}
          rel="next"
        >
          <span className={styles.pagerHint}>
            {t("pager.next")}
            <IoChevronForward aria-hidden />
          </span>
          <span className={styles.pagerTitle}>{t(next.translationKey)}</span>
        </Link>
      )}
    </nav>
  );
};

export default Pager;
