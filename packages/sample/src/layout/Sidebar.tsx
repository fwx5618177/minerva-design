import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoLayersOutline } from "react-icons/io5";
import styles from "@styles/layout/sidebar.module.scss";
import { menuConfig } from "@router/routes";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  return (
    <aside
      id="docs-sidebar"
      className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
    >
      <div className={styles.header}>
        <div className={styles.logo}>
          <IoLayersOutline className={styles.icon} aria-hidden />
          <span>Minerva UI</span>
        </div>
      </div>

      <nav className={styles.nav} aria-label={t("nav.label")}>
        {menuConfig
          .filter((group) => group.items.length > 0)
          .map((group) => (
            <div className={styles.section} key={group.category}>
              <h2 className={styles.title} id={`nav-${group.category}`}>
                {t(group.translationKey)}
              </h2>
              <ul
                className={styles.list}
                aria-labelledby={`nav-${group.category}`}
              >
                {group.items.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `${styles.item} ${isActive ? styles.active : ""}`
                      }
                      onClick={onClose}
                    >
                      <span className={styles.text}>
                        {t(item.translationKey)}
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
