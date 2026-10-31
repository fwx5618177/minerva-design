import { Button } from "minerva-design";
import React from "react";
import { Link, NavLink, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { IoLogoGithub, IoSearchOutline } from "react-icons/io5";
import { sections } from "@/docs/registry";
import { SECTION_LABELS, sectionOfPath } from "@router/routes";
import LanguageMenu from "./LanguageMenu";
import ThemeMenu from "./ThemeMenu";
import MobileNav from "./MobileNav";
import Logo from "./Logo";
import Kbd from "./Kbd";
import { modKeyLabel } from "./searchItems";
import { GITHUB_URL } from "./constants";
import styles from "./site.module.scss";

export interface TopNavProps {
  onSearch: () => void;
  /** Shows the mobile navigation drawer button */
  withMenu?: boolean;
}

/** Sticky, translucent top navigation */
const TopNav: React.FC<TopNavProps> = ({ onSearch, withMenu = true }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const current = sectionOfPath(pathname);

  // one link per section: each section has its own sidebar
  const links = sections.map((section) => ({
    to: `/${section.home}`,
    label: t(SECTION_LABELS[section.id]),
    active: current === section.id,
  }));

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
          <Button
            variant="ghost"
            color="neutral"
            size="small"
            type="button"
            className={styles.searchButton}
            onClick={onSearch}
            aria-label={t("search.title")}
            aria-keyshortcuts="Meta+K Control+K"
            startIcon={
              <IoSearchOutline aria-hidden className={styles.searchIcon} />
            }
            endIcon={<Kbd className={styles.searchKbd}>{modKeyLabel()}</Kbd>}
          >
            <span className={styles.searchLabel}>{t("search.button")}</span>
          </Button>
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
