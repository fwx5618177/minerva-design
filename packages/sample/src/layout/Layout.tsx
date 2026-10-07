import React, { Suspense, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { IoMenuOutline } from "react-icons/io5";
import Sidebar from "./Sidebar";
import LanguageSwitcher from "@components/LanguageSwitcher";
import ThemeSwitcher from "@components/ThemeSwitcher";
import styles from "@styles/layout/layout.module.scss";

const PageFallback: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.loading} role="status" aria-live="polite">
      {t("doc.loading")}
    </div>
  );
};

const Layout: React.FC = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Start every page at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={styles.layout}>
      <a
        className={styles.skipLink}
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        {t("nav.skipToContent")}
      </a>
      <button
        type="button"
        className={styles.menuButton}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label={t("nav.toggleMenu")}
        aria-expanded={isMobileMenuOpen}
        aria-controls="docs-sidebar"
      >
        <IoMenuOutline aria-hidden />
      </button>
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.headerControls}>
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>
        <div className={styles.content} id="main-content" tabIndex={-1}>
          <Suspense fallback={<PageFallback />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default Layout;
