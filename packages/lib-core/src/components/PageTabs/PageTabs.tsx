import { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import IconButton from "../IconButton/IconButton";
import Tooltip from "../Tooltip/Tooltip";
import useI18n from "../../hooks/useI18n";
import type { PageTabProps, PageTabsProps } from "./types";
import styles from "./pageTabs.module.scss";

interface ScrollState {
  overflow: boolean;
  left: boolean;
  right: boolean;
}

/**
 * PageTabs: a strip of open application pages (route navigation, not an
 * ARIA tablist). The application owns routes, closing and leave guards.
 * Overflowing items scroll horizontally with optional scroll buttons and the
 * current item is kept in view.
 */
export const PageTabs = ({
  ariaLabel,
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
  const [scroll, setScroll] = useState<ScrollState>({
    overflow: false,
    left: false,
    right: false,
  });

  const measure = useCallback(() => {
    const el = viewport.current;
    if (!el) return;
    const next = {
      overflow: el.scrollWidth > el.clientWidth + 1,
      left: el.scrollLeft > 1,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 1,
    };
    setScroll((prev) =>
      prev.overflow === next.overflow &&
      prev.left === next.left &&
      prev.right === next.right
        ? prev
        : next,
    );
  }, []);

  const revealActive = useCallback(() => {
    const el = viewport.current;
    if (!el) return;
    const active = list.current?.querySelector<HTMLElement>(
      ".ui-page-tab[data-active]",
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
        list.current?.querySelectorAll<HTMLElement>(".ui-page-tab") ?? [],
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
    el.scrollLeft += direction * Math.max(1, el.clientWidth * 0.8);
    measure();
  };

  return (
    <nav
      {...rest}
      aria-label={ariaLabel}
      className={classNames("ui-page-tabs", styles.pageTabs, className)}
      onFocusCapture={(event) => {
        // Portal events (e.g. a context menu) bubble through the nav: only
        // remember focus that is really inside it.
        if (event.currentTarget.contains(event.target)) {
          focused.current = event.target.closest(".ui-page-tab")
            ? event.target
            : null;
        }
        onFocusCapture?.(event);
      }}
      onContextMenuCapture={(event) => {
        const item = (event.target as Element).closest(".ui-page-tab");
        if (item) {
          focused.current = item.querySelector<HTMLButtonElement>(
            ".ui-page-tab-trigger",
          );
        }
        onContextMenuCapture?.(event);
      }}
    >
      {scroll.overflow && (
        <IconButton
          className={classNames("ui-page-tabs-scroll", styles.scroll)}
          ariaLabel={scrollLeftLabel ?? t("pageTabs.scrollLeft")}
          size="small"
          shape="square"
          disabled={!scroll.left}
          onClick={() => move(-1)}
          icon={<LuChevronLeft size={18} aria-hidden="true" />}
        />
      )}
      <div
        ref={viewport}
        className={classNames("ui-page-tabs-viewport", styles.viewport)}
        onScroll={measure}
      >
        <div
          ref={list}
          className={classNames("ui-page-tabs-list", styles.list)}
        >
          {children}
        </div>
      </div>
      {scroll.overflow && (
        <IconButton
          className={classNames("ui-page-tabs-scroll", styles.scroll)}
          ariaLabel={scrollRightLabel ?? t("pageTabs.scrollRight")}
          size="small"
          shape="square"
          disabled={!scroll.right}
          onClick={() => move(1)}
          icon={<LuChevronRight size={18} aria-hidden="true" />}
        />
      )}
      {actions && (
        <div className={classNames("ui-page-tabs-actions", styles.actions)}>
          {actions}
        </div>
      )}
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
    className={classNames("ui-page-tab", styles.pageTab, className)}
    data-value={value}
    data-active={active || undefined}
    data-disabled={disabled || undefined}
  >
    <Tooltip
      content={label}
      placement="bottom-start"
      variant="auto"
      disabled={disabled}
      asChild
    >
      <button
        type="button"
        className={classNames("ui-page-tab-trigger", styles.trigger)}
        aria-current={active ? "page" : undefined}
        disabled={disabled}
        onClick={onSelect}
      >
        {icon && (
          <span
            className={classNames("ui-page-tab-icon", styles.icon)}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        <span className={classNames("ui-page-tab-label", styles.label)}>
          {label}
        </span>
      </button>
    </Tooltip>
    {action && (
      <span className={classNames("ui-page-tab-action", styles.action)}>
        {action}
      </span>
    )}
  </div>
);

export default PageTabs;
