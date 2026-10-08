import React from "react";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import { menuConfig } from "@router/routes";
import styles from "@/site/site.module.scss";

export interface SidebarNavProps {
  /** Called after a link is followed (closes the mobile drawer) */
  onNavigate?: () => void;
  /** Prefix of the group heading ids (unique per instance) */
  idPrefix?: string;
}

/** Documentation navigation, grouped by category (desktop sidebar + mobile drawer). */
export const SidebarNav: React.FC<SidebarNavProps> = ({
  onNavigate,
  idPrefix = "nav",
}) => {
  const { t } = useTranslation();
  return (
    <nav className={styles.sidebarNav} aria-label={t("nav.label")}>
      {menuConfig
        .filter((group) => group.items.length > 0)
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
const Sidebar: React.FC = () => (
  <aside className={styles.sidebar} id="docs-sidebar">
    <SidebarNav />
  </aside>
);

export default Sidebar;
