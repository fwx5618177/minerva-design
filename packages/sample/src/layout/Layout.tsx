import React, { Suspense, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { getDocPage } from "@/docs/registry";
import TopNav from "@/site/TopNav";
import Footer from "@/site/Footer";
import Pager from "@/site/Pager";
import SearchPalette from "@/site/SearchPalette";
import TableOfContents from "@/site/TableOfContents";
import Sidebar from "./Sidebar";
import styles from "@/site/site.module.scss";

const PageFallback: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.loading} role="status" aria-live="polite">
      <span className={styles.loadingBar} aria-hidden />
      <span className="sr-only">{t("doc.loading")}</span>
    </div>
  );
};

/**
 * Site shell: skip link, sticky top navigation, and either the docs layout
 * (sidebar | content | "On this page") for documentation pages or a
 * full-width canvas (landing page, 404).
 */
const Layout: React.FC = () => {
  const { t } = useTranslation();
  const [searchOpen, setSearchOpen] = useState(false);
  const { pathname } = useLocation();
  const isDocPage = !!getDocPage(pathname.replace(/^\//, ""));

  // Start every page at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const content = (
    <Suspense fallback={<PageFallback />}>
      <Outlet />
    </Suspense>
  );

  return (
    <div className={styles.shell}>
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
      <TopNav onSearch={() => setSearchOpen(true)} />
      {isDocPage ? (
        <div className={styles.docsLayout}>
          <Sidebar />
          <main
            className={styles.main}
            id="main-content"
            tabIndex={-1}
            data-toc-root
          >
            {content}
            <Pager pathname={pathname} />
          </main>
          <aside className={styles.tocColumn}>
            <TableOfContents key={pathname} />
          </aside>
        </div>
      ) : (
        <main className={styles.plainMain} id="main-content" tabIndex={-1}>
          {content}
        </main>
      )}
      <Footer />
      <SearchPalette open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
};

export default Layout;
