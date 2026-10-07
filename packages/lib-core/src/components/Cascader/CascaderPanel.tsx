import React, { useEffect, useId, useRef } from "react";
import { cn } from "../../utils/cn";
import { IoChevronForward } from "react-icons/io5";
import type { CascaderPanelProps, CascaderOption } from "./types";
import useI18n from "../../hooks/useI18n";
import styles from "./cascader.module.scss";

const OPTION_SELECTOR = '[role="option"]:not([aria-disabled="true"])';

/** The columns of a Cascader: one listbox per expanded level. */
const CascaderPanel = ({
  label,
  options,
  expandedPath,
  selectedPath,
  expandTrigger = "click",
  maxLevel = 6,
  optionRender,
  optionStyle,
  autoFocus = false,
  onActivate,
  onHoverExpand,
  onExit,
}: CascaderPanelProps) => {
  const { t } = useI18n();
  const panelRef = useRef<HTMLDivElement>(null);
  const idPrefix = useId();
  const columnId = (level: number) => `${idPrefix}-column-${level}`;
  // Column that should receive focus once rendered (keyboard expansion; the
  // column of a lazily loaded option appears later). -1 = deepest column,
  // used when the panel is opened from the keyboard.
  const pendingFocusRef = useRef<number | null>(autoFocus ? -1 : null);

  // Columns: the root options, then the children of each expanded option
  const columns: CascaderOption[][] = [options];
  for (let i = 0; i < expandedPath.length && i < maxLevel - 1; i += 1) {
    const children = expandedPath[i].children;
    if (!children?.length) break;
    columns.push(children);
  }

  const columnEl = (level: number) =>
    panelRef.current?.querySelector<HTMLElement>(`[data-level="${level}"]`);

  /** Focus the expanded / selected option of a column, or its first one. */
  const focusColumn = (level: number) => {
    const column = columnEl(level);
    if (!column) return false;
    const target =
      column.querySelector<HTMLElement>('[data-expanded="true"]') ??
      column.querySelector<HTMLElement>(OPTION_SELECTOR);
    target?.focus();
    return Boolean(target);
  };

  useEffect(() => {
    const pending = pendingFocusRef.current;
    if (pending === null) return;
    const level = pending === -1 ? columns.length - 1 : pending;
    if (focusColumn(level)) pendingFocusRef.current = null;
  });

  const pathTo = (option: CascaderOption, level: number) => [
    ...expandedPath.slice(0, level),
    option,
  ];

  const canExpand = (option: CascaderOption, level: number) =>
    level < maxLevel - 1 &&
    (Boolean(option.children?.length) ||
      (!option.isLeaf && option.children === undefined));

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    option: CascaderOption,
    level: number,
  ) => {
    const items = Array.from(
      e.currentTarget.parentElement?.querySelectorAll<HTMLElement>(
        OPTION_SELECTOR,
      ) ?? [],
    );
    const index = items.indexOf(e.currentTarget);
    const focusAt = (i: number) =>
      items[(i + items.length) % items.length]?.focus();
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        focusAt(index + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        focusAt(index - 1);
        break;
      case "Home":
        e.preventDefault();
        focusAt(0);
        break;
      case "End":
        e.preventDefault();
        focusAt(items.length - 1);
        break;
      case "ArrowRight":
        e.preventDefault();
        if (option.disabled || !canExpand(option, level)) break;
        pendingFocusRef.current = level + 1;
        onActivate(pathTo(option, level), level);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (option.disabled) break;
        if (canExpand(option, level)) pendingFocusRef.current = level + 1;
        onActivate(pathTo(option, level), level);
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (level === 0) onExit?.();
        else focusColumn(level - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.panel} ref={panelRef}>
      {columns.map((columnOptions, level) => (
        <ul
          key={level}
          id={columnId(level)}
          data-level={level}
          className={styles.column}
          role="listbox"
          aria-label={t("cascader.level", {
            label: label ?? t("cascader.options"),
            level: level + 1,
          })}
        >
          {columnOptions.map((option) => {
            const isExpanded = expandedPath[level]?.value === option.value;
            const isSelected = selectedPath[level]?.value === option.value;
            const expandable = canExpand(option, level);
            const showExpandIcon =
              expandable && Boolean(option.children?.length || !option.isLeaf);
            return (
              <li
                key={option.value}
                data-expanded={isExpanded || undefined}
                className={cn(styles.option, {
                  [styles.active]: isExpanded || isSelected,
                  [styles.disabled]: option.disabled,
                  [styles.loading]: option.loading,
                })}
                style={optionStyle}
                role="option"
                aria-selected={isSelected}
                aria-disabled={option.disabled || undefined}
                aria-busy={option.loading || undefined}
                // `option` does not support aria-expanded: point the expanded
                // option at the column listing its children instead.
                aria-controls={
                  isExpanded && level + 1 < columns.length
                    ? columnId(level + 1)
                    : undefined
                }
                tabIndex={option.disabled ? -1 : 0}
                onKeyDown={(e) => handleKeyDown(e, option, level)}
                onClick={() => {
                  if (!option.disabled)
                    onActivate(pathTo(option, level), level);
                }}
                onMouseEnter={() => {
                  if (
                    expandTrigger === "hover" &&
                    !option.disabled &&
                    option.children?.length &&
                    level < maxLevel - 1
                  ) {
                    onHoverExpand?.(pathTo(option, level));
                  }
                }}
              >
                {optionRender ? (
                  optionRender(option, level)
                ) : (
                  <>
                    <span className={styles.label}>{option.label}</span>
                    {option.loading ? (
                      <span className={styles.loadingIndicator} aria-hidden>
                        ...
                      </span>
                    ) : (
                      showExpandIcon && (
                        <IoChevronForward
                          className={styles.expandIcon}
                          aria-hidden
                        />
                      )
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ul>
      ))}
    </div>
  );
};

export default CascaderPanel;
