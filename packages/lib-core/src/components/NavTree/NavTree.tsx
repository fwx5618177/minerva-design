import {
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { IconChevronDown } from "../../internal/icons";
import { cn } from "../../utils/cn";
import { safeHref } from "../../internal/safeUrl";
import { pickDataAttributes } from "../../internal/dataAttributes";
import useI18n from "../../hooks/useI18n";
import { useControllableState } from "../../internal/useControllableState";
import { warnControlledProps } from "../../internal/devWarnings";
import { useMergedRefs } from "../../internal/mergeRefs";
import type { NavTreeItem, NavTreeItemState, NavTreeProps } from "./types";
import { logicalArrowKey } from "../../internal/direction";
import styles from "./navTree.module.scss";

const ITEM_SELECTOR = `.${styles.item}`;
const CHILDREN_SELECTOR = `.${styles.children}`;

function collectActiveAncestors(
  items: NavTreeItem[],
  activeId: string | undefined,
  ids: Set<string>,
): boolean {
  for (const item of items) {
    if (item.id === activeId) return true;
    if (item.children && collectActiveAncestors(item.children, activeId, ids)) {
      ids.add(item.id);
      return true;
    }
  }
  return false;
}

/** Visible, enabled items of the tree in DOM (reading) order */
const focusableItems = (nav: HTMLElement) =>
  Array.from(nav.querySelectorAll<HTMLElement>(ITEM_SELECTOR)).filter(
    (el) =>
      !(el as HTMLButtonElement).disabled &&
      el.getAttribute("aria-disabled") !== "true",
  );

/**
 * Arrow-key navigation between the visible items. Registered natively on the
 * `<nav>` so it also covers links rendered through `renderLink`.
 */
function handleNavKeyDown(event: globalThis.KeyboardEvent) {
  const nav = event.currentTarget as HTMLElement;
  const current = (event.target as HTMLElement).closest<HTMLElement>(
    ITEM_SELECTOR,
  );
  if (!current) return;
  const items = focusableItems(nav);
  const index = items.indexOf(current);
  let next: HTMLElement | null | undefined;
  // RTL: ArrowRight moves to the parent, ArrowLeft expands.
  switch (logicalArrowKey(event.key, nav)) {
    case "ArrowDown":
      next = items[index + 1];
      break;
    case "ArrowUp":
      next = index > 0 ? items[index - 1] : undefined;
      break;
    case "Home":
      next = items[0];
      break;
    case "End":
      next = items[items.length - 1];
      break;
    case "ArrowLeft":
      // An expanded branch collapses itself (its own handler); any other
      // nested item moves to its parent branch.
      if (current.getAttribute("aria-expanded") === "true") return;
      next = current
        .closest(CHILDREN_SELECTOR)
        ?.parentElement?.querySelector<HTMLElement>(
          `:scope > ${ITEM_SELECTOR}`,
        );
      break;
    default:
      return;
  }
  if (next) {
    event.preventDefault();
    next.focus();
  }
}

/**
 * NavTree: sidebar navigation with sections, nested expandable branches, an
 * active item and a compact (icon-only) mode.
 *
 * Keyboard: Tab moves through the items; ArrowDown / ArrowUp / Home / End
 * move between visible items; ArrowRight expands a branch (or enters it when
 * expanded); ArrowLeft collapses a branch or moves to the parent branch.
 */
export const NavTree = ({
  sections,
  activeId,
  collapsed = false,
  wrapLabels = false,
  defaultExpandedIds,
  expandedIds,
  onExpandedChange,
  onItemSelect,
  renderLink,
  className,
  style,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  id,
  ref,
  ...rest
}: NavTreeProps) => {
  const { t } = useI18n();
  const navRef = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(navRef, ref);
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    nav.addEventListener("keydown", handleNavKeyDown);
    return () => nav.removeEventListener("keydown", handleNavKeyDown);
  }, []);
  if (process.env.NODE_ENV !== "production") {
    warnControlledProps("NavTree", {
      prop: "expandedIds",
      value: expandedIds,
      defaultProp: "defaultExpandedIds",
      defaultValue: defaultExpandedIds,
      handlerProp: "onExpandedChange",
      handler: onExpandedChange,
    });
  }
  const [expanded, setExpanded] = useControllableState<string[]>({
    value: expandedIds,
    defaultValue: () => defaultExpandedIds ?? [],
    onChange: onExpandedChange,
    name: "NavTree",
    prop: "expandedIds",
  });
  // Branches the user explicitly collapsed. An active descendant expands its
  // ancestors by default; once the user collapses such a branch, that intent
  // must win, otherwise the next render would reopen it (tri-state, like
  // VS Code / Storybook / Linear).
  const [explicitlyCollapsed, setExplicitlyCollapsed] = useState<Set<string>>(
    () => new Set(),
  );

  const activeAncestorIds = useMemo(() => {
    const ids = new Set<string>();
    for (const section of sections) {
      collectActiveAncestors(section.items, activeId, ids);
    }
    return ids;
  }, [activeId, sections]);

  const expandedSet = useMemo(() => new Set(expanded), [expanded]);

  const isExpanded = (id: string) =>
    expandedSet.has(id) ||
    (!explicitlyCollapsed.has(id) && activeAncestorIds.has(id));

  const setItemExpanded = (item: NavTreeItem, open: boolean) => {
    const nextExpanded = new Set(expandedSet);
    const nextCollapsed = new Set(explicitlyCollapsed);
    if (open) {
      nextExpanded.add(item.id);
      nextCollapsed.delete(item.id);
    } else {
      nextExpanded.delete(item.id);
      nextCollapsed.add(item.id);
    }
    setExpanded(Array.from(nextExpanded));
    setExplicitlyCollapsed(nextCollapsed);
  };

  const toggleItem = (item: NavTreeItem) => {
    setItemExpanded(item, !isExpanded(item.id));
    onItemSelect?.(item);
  };

  const renderItem = (item: NavTreeItem, depth: number): ReactNode => {
    const hasChildren = Boolean(item.children?.length);
    const active = item.id === activeId;
    const ancestorActive = activeAncestorIds.has(item.id);
    const open = hasChildren && isExpanded(item.id);
    const disabled = Boolean(item.disabled);
    const itemClassName = cn(
      styles.item,
      depth > 0 && styles.nested,
      active && styles.active,
      disabled && styles.disabled,
    );
    const state: NavTreeItemState = {
      active,
      ancestorActive,
      expanded: open,
      depth,
      collapsed,
      hasChildren,
      disabled,
      className: itemClassName,
    };
    const title = item.description
      ? `${item.label} / ${item.description}`
      : item.label;
    const content = (
      <>
        <span className={styles.icon} aria-hidden="true">
          {item.icon}
        </span>
        <span className={styles.copy}>
          <span className={styles.label}>{item.label}</span>
          {item.description && (
            <small className={styles.description}>{item.description}</small>
          )}
        </span>
        {!collapsed && (item.endContent || hasChildren) && (
          <span className={styles.trailing}>
            {item.endContent && (
              <span className={styles.end}>{item.endContent}</span>
            )}
            {hasChildren && (
              <span className={styles.chevron} aria-hidden="true">
                <IconChevronDown size={16} strokeWidth={2} />
              </span>
            )}
          </span>
        )}
      </>
    );

    if (hasChildren) {
      const handleBranchKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (collapsed) return;
        const key = logicalArrowKey(event.key, event.currentTarget);
        if (key === "ArrowRight") {
          event.preventDefault();
          if (!open) setItemExpanded(item, true);
          else
            event.currentTarget.parentElement
              ?.querySelector<HTMLElement>(
                `${CHILDREN_SELECTOR} ${ITEM_SELECTOR}`,
              )
              ?.focus();
        } else if (key === "ArrowLeft" && open) {
          event.preventDefault();
          setItemExpanded(item, false);
        }
      };
      return (
        <div className={styles.branch} key={item.id}>
          <button
            className={itemClassName}
            type="button"
            title={title}
            aria-expanded={open}
            data-active={active || undefined}
            data-ancestor-active={ancestorActive || undefined}
            data-expanded={open || undefined}
            disabled={disabled}
            onClick={() => toggleItem(item)}
            onKeyDown={handleBranchKeyDown}
          >
            {content}
          </button>
          {open && !collapsed && (
            <div className={styles.children}>
              {item.children?.map((child) => renderItem(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    // Keys are passed directly (React warns when `key` is spread in props);
    // custom links get theirs from a Fragment.
    if (renderLink) {
      return (
        <Fragment key={item.id}>{renderLink(item, content, state)}</Fragment>
      );
    }

    const common = {
      className: itemClassName,
      title,
      "data-active": active || undefined,
    };
    // A disabled entry is not a navigable link: no href, no handler.
    if (disabled) {
      return (
        <span key={item.id} {...common} role="link" aria-disabled="true">
          {content}
        </span>
      );
    }
    // Without href the entry is an action (onItemSelect), i.e. a button.
    if (item.href === undefined) {
      return (
        <button
          key={item.id}
          {...common}
          type="button"
          aria-current={active ? "page" : undefined}
          onClick={() => onItemSelect?.(item)}
        >
          {content}
        </button>
      );
    }
    return (
      <a
        key={item.id}
        {...common}
        href={safeHref("NavTree", item.href)}
        aria-current={active ? "page" : undefined}
        onClick={() => onItemSelect?.(item)}
      >
        {content}
      </a>
    );
  };

  return (
    <nav
      ref={mergedRef}
      className={cn(
        styles.navTree,
        collapsed && styles.collapsed,
        wrapLabels && !collapsed && styles.wrapLabels,
        className,
      )}
      {...pickDataAttributes(rest)}
      id={id}
      style={style}
      aria-label={
        ariaLabel ?? (ariaLabelledBy ? undefined : t("navTree.label"))
      }
      aria-labelledby={ariaLabelledBy}
    >
      {sections.map((section) => (
        <section className={styles.section} key={section.id}>
          {section.title && (
            <h2 className={styles.sectionTitle}>{section.title}</h2>
          )}
          <div className={styles.list}>
            {section.items.map((item) => renderItem(item, 0))}
          </div>
        </section>
      ))}
    </nav>
  );
};
