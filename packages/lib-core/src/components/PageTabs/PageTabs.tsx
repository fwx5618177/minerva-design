import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";
import { IconChevronLeft, IconChevronRight } from "../../internal/icons";
import IconButton from "../IconButton/IconButton";
import Tooltip from "../Tooltip/Tooltip";
import useI18n from "../../hooks/useI18n";
import type { PageTabProps, PageTabsProps } from "./types";
import { getDirection } from "../../internal/direction";
import styles from "./pageTabs.module.scss";

const TAB_SELECTOR = `.${styles.pageTab}`;

interface ScrollState {
  overflow: boolean;
  left: boolean;
  right: boolean;
  /** Right-to-left layout: the start (first) scroll button is on the right. */
  rtl: boolean;
}

/**
 * PageTabs: a strip of open application pages (route navigation, not an
 * ARIA tablist). The application owns routes, closing and leave guards.
 * Overflowing items scroll horizontally with optional scroll buttons and the
 * current item is kept in view.
 */
export const PageTabs = ({
  "aria-label": ariaLabel,
  activeValue,
  children,
  actions,
  scrollLeftLabel,
  scrollRightLabel,
  className,
  onFocusCapture,
  onContextMenuCapture,
  ...rest
}: PageTabsProps) => {
  const { t } = useI18n();
  const viewport = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const focused = useRef<HTMLElement | null>(null);
  const previousItems = useRef<string | null>(null);
  const leftButton = useRef<HTMLButtonElement>(null);
  const rightButton = useRef<HTMLButtonElement>(null);
  /** Scroll button last used: it may get disabled while it has focus */
  const movedWith = useRef<HTMLButtonElement | null>(null);
  const [scroll, setScroll] = useState<ScrollState>({
    overflow: false,
    left: false,
    right: false,
    rtl: false,
  });

  const measure = useCallback(() => {
    const el = viewport.current;
    if (!el) return;
    // In RTL, scrollLeft runs from 0 (start, right edge) to -(max).
    const rtl = getDirection(el) === "rtl";
    const max = el.scrollWidth - el.clientWidth;
    const next = {
      overflow: el.scrollWidth > el.clientWidth + 1,
      left: rtl ? el.scrollLeft > -max + 1 : el.scrollLeft > 1,
      right: rtl ? el.scrollLeft < -1 : el.scrollLeft < max - 1,
      rtl,
    };
    setScroll((prev) =>
      prev.overflow === next.overflow &&
      prev.left === next.left &&
      prev.right === next.right &&
      prev.rtl === next.rtl
        ? prev
        : next,
    );
  }, []);

  const revealActive = useCallback(() => {
    const el = viewport.current;
    if (!el) return;
    const active = list.current?.querySelector<HTMLElement>(
      `${TAB_SELECTOR}[data-active]`,
    );
    if (active) {
      const view = el.getBoundingClientRect();
      const item = active.getBoundingClientRect();
      // Oversized items always align their start edge
      if (item.width > view.width) el.scrollLeft += item.left - view.left;
      else if (item.left < view.left) el.scrollLeft -= view.left - item.left;
      else if (item.right > view.right)
        el.scrollLeft += item.right - view.right;
    }
    measure();
  }, [measure]);

  // After every render: reveal the active item when the items changed (not on
  // unrelated re-renders, to keep manual scrolling), and give focus back to
  // the current page when the focused item was removed.
  useEffect(() => {
    const items = JSON.stringify([
      activeValue,
      ...Array.from(
        list.current?.querySelectorAll<HTMLElement>(TAB_SELECTOR) ?? [],
        (item) => [item.dataset.value, item.dataset.active],
      ),
    ]);
    if (items !== previousItems.current) {
      previousItems.current = items;
      revealActive();
    }
    if (
      focused.current &&
      !focused.current.isConnected &&
      document.activeElement === document.body
    ) {
      list.current
        ?.querySelector<HTMLButtonElement>('[aria-current="page"]')
        ?.focus({ preventScroll: true });
    }
    // A scroll button activated from the keyboard is disabled once its end
    // is reached, which would drop focus to <body>: hand focus to the
    // opposite scroll button instead.
    const from = movedWith.current;
    if (from?.disabled) {
      movedWith.current = null;
      if (
        document.activeElement === from ||
        document.activeElement === document.body
      ) {
        (from === leftButton.current ? rightButton : leftButton).current?.focus(
          { preventScroll: true },
        );
      }
    }
  });

  useEffect(() => {
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => revealActive());
    if (viewport.current) observer.observe(viewport.current);
    if (list.current) observer.observe(list.current);
    return () => observer.disconnect();
  }, [revealActive]);

  const move = (direction: number) => {
    const el = viewport.current;
    /* v8 ignore next */
    if (!el) return;
    movedWith.current =
      direction < 0 ? leftButton.current : rightButton.current;
    el.scrollLeft += direction * Math.max(1, el.clientWidth * 0.8);
    measure();
  };

  // Physical buttons: the left one always sits on the left edge (it comes
  // last in the DOM in RTL, where the flex row is reversed).
  const scrollLeft = (
    <IconButton
      ref={leftButton}
      className={styles.scroll}
      aria-label={scrollLeftLabel ?? t("pageTabs.scrollLeft")}
      size="small"
      shape="square"
      disabled={!scroll.left}
      onClick={() => move(-1)}
      icon={<IconChevronLeft size={18} aria-hidden="true" />}
    />
  );
  const scrollRight = (
    <IconButton
      ref={rightButton}
      className={styles.scroll}
      aria-label={scrollRightLabel ?? t("pageTabs.scrollRight")}
      size="small"
      shape="square"
      disabled={!scroll.right}
      onClick={() => move(1)}
      icon={<IconChevronRight size={18} aria-hidden="true" />}
    />
  );

  return (
    <nav
      {...rest}
      aria-label={ariaLabel}
      className={cn(styles.pageTabs, className)}
      onFocusCapture={(event) => {
        // Portal events (e.g. a context menu) bubble through the nav: only
        // remember focus that is really inside it.
        if (event.currentTarget.contains(event.target)) {
          focused.current = event.target.closest(TAB_SELECTOR)
            ? event.target
            : null;
        }
        onFocusCapture?.(event);
      }}
      onContextMenuCapture={(event) => {
        const item = (event.target as Element).closest(TAB_SELECTOR);
        if (item) {
          focused.current = item.querySelector<HTMLButtonElement>(
            `.${styles.trigger}`,
          );
        }
        onContextMenuCapture?.(event);
      }}
    >
      {scroll.overflow && (scroll.rtl ? scrollRight : scrollLeft)}
      <div ref={viewport} className={styles.viewport} onScroll={measure}>
        <div ref={list} className={styles.list}>
          {children}
        </div>
      </div>
      {scroll.overflow && (scroll.rtl ? scrollLeft : scrollRight)}
      {actions && <div className={styles.actions}>{actions}</div>}
    </nav>
  );
};

/**
 * PageTab: one open page. The label button selects it; `action` (e.g. a
 * close button) is a sibling control, never nested inside the label button.
 * Ref and extra props (e.g. onContextMenu) reach the item wrapper.
 */
export const PageTab = ({
  ref,
  value,
  label,
  active = false,
  disabled = false,
  icon,
  action,
  onSelect,
  className,
  ...rest
}: PageTabProps) => (
  <div
    {...rest}
    ref={ref}
    className={cn(styles.pageTab, className)}
    data-value={value}
    data-active={active || undefined}
    data-disabled={disabled || undefined}
  >
    <Tooltip
      content={label}
      placement="bottom-start"
      variant="glass"
      disabled={disabled}
      asChild
    >
      <button
        type="button"
        className={styles.trigger}
        aria-current={active ? "page" : undefined}
        disabled={disabled}
        onClick={onSelect}
      >
        {icon && (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        )}
        <span className={styles.label}>{label}</span>
      </button>
    </Tooltip>
    {action && <span className={styles.action}>{action}</span>}
  </div>
);

export default PageTabs;
