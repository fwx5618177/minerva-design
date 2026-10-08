import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMenuOutline } from "react-icons/io5";
import { Drawer } from "minerva-design";
import { SidebarNav } from "@layout/Sidebar";
import styles from "./site.module.scss";

/**
 * Mobile navigation: a hamburger button opening the docs navigation in a
 * Minerva Drawer (focus trap, Escape / overlay to close, focus returns to the
 * button). Following a link closes it.
 */
const MobileNav: React.FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      side="left"
      size="small"
      title={<span className={styles.drawerTitle}>Minerva UI</span>}
      className={styles.drawer}
      trigger={
        <button
          type="button"
          className={`${styles.iconButton} ${styles.menuButton}`}
          aria-label={t("nav.openMenu")}
        >
          <IoMenuOutline aria-hidden />
        </button>
      }
    >
      <div className={styles.drawerBody}>
        <SidebarNav idPrefix="drawer-nav" onNavigate={() => setOpen(false)} />
      </div>
    </Drawer>
  );
};

export default MobileNav;
