import React, { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import type { DocSection } from "@/docs/registry";
import { menuConfig, sectionOfPath } from "@router/routes";
import styles from "@/site/site.module.scss";

export interface SidebarNavProps {
  /** Called after a link is followed (closes the mobile drawer) */
  onNavigate?: () => void;
  /** Prefix of the group heading ids (unique per instance) */
  idPrefix?: string;
  /** Section to list; the section of the current page by default */
  section?: DocSection;
}

/**
 * Documentation navigation of one section (docs, components or charts),
 * grouped by category: the desktop sidebar and the mobile drawer.
 */
export const SidebarNav: React.FC<SidebarNavProps> = ({
  onNavigate,
  idPrefix = "nav",
  section,
}) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const current = section ?? sectionOfPath(pathname) ?? "docs";
  return (
    <nav
      className={styles.sidebarNav}
      aria-label={t("nav.label")}
      data-section={current}
    >
      {menuConfig
        .filter((group) => group.section === current && group.items.length > 0)
        .map((group) => {
          const headingId = `${idPrefix}-${group.category}`;
          return (
            <div className={styles.navGroup} key={group.category}>
              <h2 className={styles.navGroupTitle} id={headingId}>
                {t(group.translationKey)}
              </h2>
              <ul className={styles.navList} aria-labelledby={headingId}>
                {group.items.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={`/${item.path}`}
                      className={styles.navLink}
                      onClick={onNavigate}
                    >
                      {t(item.translationKey)}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
    </nav>
  );
};

/** Sticky, independently scrolling desktop sidebar */
const Sidebar: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  // bring the current page into view (deep links into long sections); the
  // sidebar may not be laid out on the first frame, so retry for a while
  useEffect(() => {
    let frame = 0;
    let attempts = 0;
    const reveal = () => {
      const aside = ref.current;
      const link = aside?.querySelector<HTMLElement>('[aria-current="page"]');
      if (!aside || !link || aside.scrollHeight <= aside.clientHeight) {
        if (attempts++ < 60) frame = requestAnimationFrame(reveal);
        return;
      }
      const box = aside.getBoundingClientRect();
      const item = link.getBoundingClientRect();
      if (item.top < box.top || item.bottom > box.bottom)
        aside.scrollTop += item.top - box.top - box.height / 3;
    };
    reveal();
    return () => cancelAnimationFrame(frame);
  }, [pathname]);
  return (
    <aside className={styles.sidebar} id="docs-sidebar" ref={ref}>
      <SidebarNav />
    </aside>
  );
};

export default Sidebar;
