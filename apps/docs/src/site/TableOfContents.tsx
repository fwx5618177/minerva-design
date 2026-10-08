import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoArrowUpOutline } from "react-icons/io5";
import {
  collectHeadings,
  getActiveId,
  prefersReducedMotion,
  sameItems,
  scrollToHeading,
  type TocItem,
} from "./toc";
import styles from "./site.module.scss";

/** Distance from the viewport top at which a heading becomes "current" */
const ACTIVE_OFFSET = 96;

export interface TableOfContentsProps {
  /** Element whose headings are listed */
  rootId?: string;
}

/**
 * "On this page": the h2 / h3 headings of the current page, kept up to date
 * while lazy content (demos, tab panels) renders, with the section being read
 * highlighted.
 */
const TableOfContents: React.FC<TableOfContentsProps> = ({
  rootId = "main-content",
}) => {
  const { t } = useTranslation();
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>();

  // Track the headings (content is lazy-loaded and changes with the tabs)
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    let frame = 0;
    const scan = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const next = collectHeadings(root);
        setItems((prev) => (sameItems(prev, next) ? prev : next));
      });
    };
    scan();
    const observer = new MutationObserver(scan);
    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["hidden", "id", "inert"],
    });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [rootId]);

  // Highlight the section being read
  useEffect(() => {
    if (items.length === 0) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const positions = items.flatMap((item) => {
          const el = document.getElementById(item.id);
          return el
            ? [{ id: item.id, top: el.getBoundingClientRect().top }]
            : [];
        });
        const doc = document.documentElement;
        const atBottom =
          doc.scrollHeight > window.innerHeight + 4 &&
          window.innerHeight + window.scrollY >= doc.scrollHeight - 2;
        setActiveId(getActiveId(positions, ACTIVE_OFFSET, atBottom));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className={styles.toc} aria-labelledby="toc-title">
      <p className={styles.tocTitle} id="toc-title">
        {t("toc.title")}
      </p>
      <ul className={styles.tocList}>
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id} data-level={item.level}>
              <a
                href={`#${item.id}`}
                className={styles.tocLink}
                data-active={active || undefined}
                aria-current={active ? "location" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  setActiveId(item.id);
                  scrollToHeading(item.id);
                }}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        className={styles.backToTop}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion() ? "auto" : "smooth",
          });
          document.getElementById(rootId)?.focus({ preventScroll: true });
        }}
      >
        <IoArrowUpOutline aria-hidden />
        {t("toc.backToTop")}
      </button>
    </nav>
  );
};

export default TableOfContents;
