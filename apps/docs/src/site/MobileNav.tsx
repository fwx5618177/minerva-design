import { Button } from "minerva-design";
import React, { useState } from "react";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { IoMenuOutline } from "react-icons/io5";
import { Drawer } from "minerva-design";
import { sections, type DocSection } from "@/docs/registry";
import { SidebarNav } from "@layout/Sidebar";
import { SECTION_LABELS, sectionOfPath } from "@router/routes";
import styles from "./site.module.scss";

/**
 * Mobile navigation: a hamburger button opening the docs navigation in a
 * Minerva Drawer (focus trap, Escape / overlay to close, focus returns to the
 * button). The top navigation is hidden on small screens, so the drawer
 * switches between the sections itself. Following a link closes it.
 */
const MobileNav: React.FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<DocSection>("docs");

  const onOpenChange = (next: boolean) => {
    if (next) setSection(sectionOfPath(pathname) ?? "docs");
    setOpen(next);
  };

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      side="left"
      size="small"
      title={<span className={styles.drawerTitle}>Minerva UI</span>}
      className={styles.drawer}
      trigger={
        <Button
          variant="ghost"
          color="neutral"
          size="small"
          type="button"
          className={`${styles.iconButton} ${styles.menuButton}`}
          aria-label={t("nav.openMenu")}
        >
          <IoMenuOutline aria-hidden />
        </Button>
      }
    >
      <div className={styles.drawerBody}>
        <div
          className={styles.drawerSections}
          role="group"
          aria-label={t("nav.main")}
        >
          {sections.map((entry) => (
            <Button
              key={entry.id}
              type="button"
              size="small"
              color="neutral"
              variant={entry.id === section ? "outline" : "ghost"}
              aria-pressed={entry.id === section}
              onClick={() => setSection(entry.id)}
            >
              {t(SECTION_LABELS[entry.id])}
            </Button>
          ))}
        </div>
        <SidebarNav
          idPrefix="drawer-nav"
          section={section}
          onNavigate={() => setOpen(false)}
        />
      </div>
    </Drawer>
  );
};

export default MobileNav;
