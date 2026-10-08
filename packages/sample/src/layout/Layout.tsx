import React, { Suspense, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { getDocPage } from "@/docs/registry";
import TopNav from "@/site/TopNav";
import Footer from "@/site/Footer";
import Pager from "@/site/Pager";
import SearchPalette from "@/site/SearchPalette";
import TableOfContents from "@/site/TableOfContents";
import PageSkeleton from "@/site/PageSkeleton";
import { scrollToHeading } from "@/site/toc";
import Sidebar from "./Sidebar";
import styles from "@/site/site.module.scss";

/**
 * Site shell: skip link, sticky top navigation, and either the docs layout
 * (sidebar | content | "On this page") for documentation pages or a
 * full-width canvas (landing page, 404).
 */
const Layout: React.FC = () => {
  const { t } = useTranslation();
  const [searchOpen, setSearchOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const isDocPage = !!getDocPage(pathname.replace(/^\//, ""));

  // Start every page at the top, or at the `#section` of the link (once the
  // lazily-loaded page has rendered it)
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    let frame = 0;
    let attempts = 0;
    const scroll = () => {
      if (document.getElementById(id)) scrollToHeading(id);
      else if (attempts++ < 120) frame = requestAnimationFrame(scroll);
    };
    scroll();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  const content = (
    <Suspense fallback={<PageSkeleton variant={isDocPage ? "doc" : "home"} />}>
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
