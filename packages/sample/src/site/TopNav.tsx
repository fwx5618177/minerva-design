import React from "react";
import { Link, NavLink, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { IoLogoGithub, IoSearchOutline } from "react-icons/io5";
import { docPages } from "@/docs/registry";
import LanguageMenu from "./LanguageMenu";
import ThemeMenu from "./ThemeMenu";
import MobileNav from "./MobileNav";
import Logo from "./Logo";
import Kbd from "./Kbd";
import { modKeyLabel } from "./searchItems";
import { GITHUB_URL } from "./constants";
import styles from "./site.module.scss";

const COMPONENT_CATEGORIES = new Set([
  "general",
  "layout",
  "dataEntry",
  "dataDisplay",
  "feedback",
  "overlays",
  "navigation",
  "editors",
]);

export interface TopNavProps {
  onSearch: () => void;
  /** Shows the mobile navigation drawer button */
  withMenu?: boolean;
}

/** Sticky, translucent top navigation */
const TopNav: React.FC<TopNavProps> = ({ onSearch, withMenu = true }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const current = docPages.find((page) => `/${page.id}` === pathname);

  const links = [
    {
      to: "/overview",
      label: t("nav.docs"),
      active:
        !!current &&
        (current.category === "gettingStarted" ||
          current.category === "theming" ||
          current.category === "configuration"),
    },
    {
      to: "/button",
      label: t("nav.components"),
      active: !!current && COMPONENT_CATEGORIES.has(current.category),
    },
    {
      to: "/web-components",
      label: t("nav.webComponents"),
      active: current?.category === "webComponents",
    },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        {withMenu && <MobileNav />}
        <Link to="/" className={styles.brand} aria-label="Minerva UI">
          <Logo />
          <span className={styles.brandName}>Minerva UI</span>
        </Link>
        <nav className={styles.primaryNav} aria-label={t("nav.main")}>
          <ul>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={styles.primaryLink}
                  data-active={link.active || undefined}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.searchButton}
            onClick={onSearch}
            aria-label={t("search.title")}
            aria-keyshortcuts="Meta+K Control+K"
          >
            <IoSearchOutline aria-hidden className={styles.searchIcon} />
            <span className={styles.searchLabel}>{t("search.button")}</span>
            <Kbd className={styles.searchKbd}>{modKeyLabel()}</Kbd>
          </button>
          <a
            href={GITHUB_URL}
            className={styles.iconButton}
            aria-label={t("nav.github")}
            title="GitHub"
            target="_blank"
            rel="noreferrer"
          >
            <IoLogoGithub aria-hidden />
          </a>
          <LanguageMenu />
          <ThemeMenu />
        </div>
      </div>
    </header>
  );
};

export default TopNav;
