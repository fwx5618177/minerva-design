import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconEllipsis,
} from "../../internal/icons";
import {
  getCompactPageItems,
  getPageRange,
  PAGINATION_JUMP_SIZE,
} from "@minerva/core";
import { cn } from "../../utils/cn";
import type { PaginationProps } from "./types";
import { logicalArrowKey } from "../../internal/direction";
import styles from "./pagination.module.scss";
import useI18n from "../../hooks/useI18n";
import { useControllableState } from "../../internal/useControllableState";
import { warnControlledProps, warnOnce } from "../../internal/devWarnings";
import { useMergedRefs } from "../../internal/mergeRefs";
import { hooks } from "../../internal/stylingHooks";

type PaginationItemType = "page" | "prev" | "next" | "jump-prev" | "jump-next";

const DEFAULT_ICONS = {
  prev: <IconChevronLeft aria-hidden="true" />,
  next: <IconChevronRight aria-hidden="true" />,
  jumpPrev: <IconEllipsis aria-hidden="true" />,
  jumpNext: <IconEllipsis aria-hidden="true" />,
};

interface Ripple {
  x: number;
  y: number;
  id: number;
  itemKey: string;
}

/**
 * Pagination 分页组件
 *
 * @description 用于数据分页展示的导航组件,支持多种样式和交互方式
 *
 * @param current - 当前页（受控）
 * @param defaultCurrent - 默认当前页（非受控）
 * @param total - 总数
 * @param pageSize - 每页显示数量（受控）
 * @param defaultPageSize - 默认每页显示数量（非受控）
 * @param onChange - 页码或每页数量改变回调
 * @param disabled - 是否禁用
 * @param showQuickJumper - 是否显示快速跳转
 * @param showSizeChanger - 是否显示页码大小改变
 * @param pageSizeOptions - 页码大小选项
 * @param itemRender - 页码渲染函数
 * @param className - 组件类名
 * @param style - 组件样式
 * @param showTotal - 是否显示总数
 * @param totalRender - 总数渲染函数
 * @param size - 组件尺寸
 * @param shape - 组件形状
 * @param variant - 组件样式
 * @param simple - 是否简单模式
 * @param responsive - 是否响应式
 * @param icons - 组件图标
 * @param siblingCount - 紧凑页码列表中当前页两侧的页数
 * @param boundaryCount - 紧凑页码列表首尾保留的页数
 * @param hideEdges - 隐藏上一页 / 下一页
 * @param hideNumbers - 用「当前 / 总数」计数代替页码按钮
 * @param labels - 自定义文案（覆盖本地化的默认文案）
 * @param ref - 根 <nav> 元素的 ref
 */
const Pagination = ({
  current,
  defaultCurrent,
  total = 0,
  pageSize,
  defaultPageSize,
  onChange,
  disabled = false,
  showQuickJumper = false,
  showSizeChanger = false,
  pageSizeOptions = [10, 20, 50, 100],
  itemRender,
  className,
  style,
  showTotal = false,
  totalRender,
  size = "medium",
  shape = "rounded",
  variant = "solid",
  simple = false,
  responsive = false,
  icons,
  labels,
  siblingCount,
  boundaryCount,
  hideEdges = false,
  hideNumbers = false,
  ref,
  ...rest
}: PaginationProps) => {
  const { t } = useI18n();
  const navRef = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(navRef, ref);

  if (process.env.NODE_ENV !== "production") {
    warnControlledProps("Pagination", {
      prop: "current",
      value: current,
      defaultProp: "defaultCurrent",
      defaultValue: defaultCurrent,
      handlerProp: "onChange",
      handler: onChange,
      locked: disabled,
      lockHint: "set `disabled`",
    });
  }
  const [page, setPage] = useControllableState({
    value: current,
    defaultValue: defaultCurrent ?? 1,
    name: "Pagination",
    prop: "current",
  });
  if (process.env.NODE_ENV !== "production") {
    warnControlledProps("Pagination", {
      prop: "pageSize",
      value: pageSize,
      defaultProp: "defaultPageSize",
      defaultValue: defaultPageSize,
      handlerProp: "onChange",
      handler: onChange,
      locked: disabled || !showSizeChanger,
    });
  }
  const [currentPageSize, setPageSize] = useControllableState({
    value: pageSize,
    defaultValue: defaultPageSize ?? 10,
    name: "Pagination",
    prop: "pageSize",
  });

  const [jumpValue, setJumpValue] = useState("");
  // Draft text of the simple-mode page input while the user is typing
  // (null when not editing, so the input mirrors the current page)
  const [simpleDraft, setSimpleDraft] = useState<string | null>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const nextRippleId = useRef(0);
  // Set when a page change should move focus to the active page button
  // (keyboard navigation, or the focused button became disabled / removed)
  const restoreFocus = useRef<{
    mode: "active" | "if-lost";
    page: number;
  } | null>(null);

  const mergedIcons = { ...DEFAULT_ICONS, ...icons };
  // There is always at least one (possibly empty) page
  const totalPages = Math.max(
    1,
    currentPageSize > 0 ? Math.ceil(total / currentPageSize) : 0,
  );

  if (process.env.NODE_ENV !== "production") {
    // `total = 0` usually means "not loaded yet": only out-of-range pages of
    // a known total are reported.
    if (
      !Number.isInteger(page) ||
      page < 1 ||
      (total > 0 && page > totalPages)
    ) {
      warnOnce(
        "Pagination:range",
        `[minerva] Pagination: the current page (${page}) is out of range 1..${totalPages} ` +
          `(total ${total}, page size ${currentPageSize}). Clamp \`current\` / \`defaultCurrent\` to a valid page.`,
      );
    }
  }

  const changePage = useCallback(
    (target: number, focus: "active" | "if-lost" = "if-lost") => {
      if (disabled || target === page || target < 1 || target > totalPages) {
        return;
      }
      restoreFocus.current = { mode: focus, page: target };
      setPage(target);
      onChange?.(target, currentPageSize);
    },
    [disabled, page, totalPages, setPage, onChange, currentPageSize],
  );

  // Focus management after a page change (runs after the DOM is updated)
  useEffect(() => {
    const request = restoreFocus.current;
    restoreFocus.current = null;
    const nav = navRef.current;
    // Skip when a controlled parent did not accept the change
    if (!request || !nav || request.page !== page) return;
    const active = nav.ownerDocument.activeElement as HTMLElement | null;
    const lost =
      !active ||
      !nav.contains(active) ||
      (active as HTMLButtonElement).disabled === true;
    if (request.mode === "active" || lost) {
      const target =
        nav.querySelector<HTMLElement>('[aria-current="page"]') ??
        nav.querySelector<HTMLElement>("button:not(:disabled), input");
      target?.focus();
    }
  });

  const handleItemClick = (
    target: number,
    itemKey: string,
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    if (disabled || target === page || target < 1 || target > totalPages) {
      return;
    }
    // Ripple only for pointer clicks (keyboard-triggered clicks have detail 0)
    if (event.detail > 0) {
      const rect = event.currentTarget.getBoundingClientRect();
      const ripple: Ripple = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        id: nextRippleId.current++,
        itemKey,
      };
      setRipples((prev) => [...prev, ripple]);
    }
    changePage(target);
  };

  // 清理水波纹效果
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => setRipples([]), 1000);
    return () => clearTimeout(timer);
  }, [ripples]);

  // 快速跳转
  const handleJump = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    // Enter in a text input would implicitly submit an enclosing form
    e.preventDefault();
    const value = parseInt(jumpValue, 10);
    if (!isNaN(value) && value >= 1 && value <= totalPages) {
      changePage(value);
      setJumpValue("");
    }
  };

  // 页码大小改变: 回到第一页
  const handleSizeChange = (value: string) => {
    const newSize = parseInt(value, 10);
    setPageSize(newSize);
    setPage(1);
    onChange?.(1, newSize);
  };

  // 提交简单模式输入框的页码: 有效值夹取到合法范围, 无效值还原
  const commitSimpleDraft = () => {
    if (simpleDraft === null) return;
    setSimpleDraft(null);
    const value = parseInt(simpleDraft, 10);
    if (isNaN(value) || totalPages < 1) return;
    changePage(Math.min(Math.max(value, 1), totalPages));
  };

  const itemLabel = (type: PaginationItemType, target: number) => {
    switch (type) {
      case "prev":
        return labels?.prev ?? t("pagination.prev");
      case "next":
        return labels?.next ?? t("pagination.next");
      case "jump-prev":
        return labels?.jumpPrev ?? t("pagination.jumpPrev");
      case "jump-next":
        return labels?.jumpNext ?? t("pagination.jumpNext");
      default:
        return labels?.page?.(target) ?? t("pagination.page", { page: target });
    }
  };

  const renderItem = (target: number, type: PaginationItemType) => {
    const isActive = type === "page" && target === page;
    const isDisabled =
      disabled ||
      (type === "prev"
        ? page <= 1
        : type === "next"
          ? page >= totalPages
          : false);
    // Stable keys: the focused button must survive page changes
    const itemKey = type === "page" ? `page-${target}` : type;

    let content: React.ReactNode;
    switch (type) {
      case "prev":
        content = mergedIcons.prev;
        break;
      case "next":
        content = mergedIcons.next;
        break;
      case "jump-prev":
      case "jump-next":
        content = (
          <span className={styles.jumpWrapper}>
            {type === "jump-prev" ? mergedIcons.jumpPrev : mergedIcons.jumpNext}
            <span className={styles.jumpHint} aria-hidden="true">
              {itemLabel(type, target)}
            </span>
          </span>
        );
        break;
      default:
        content = target;
    }
    if (itemRender) {
      content = itemRender(target, type);
    }

    return (
      <button
        key={itemKey}
        type="button"
        onKeyDown={handleKeyDown}
        className={cn(styles.item, {
          [styles.active]: isActive,
          [styles.disabled]: isDisabled,
          [styles.prev]: type === "prev",
          [styles.next]: type === "next",
          [styles.jump]: type === "jump-prev" || type === "jump-next",
        })}
        disabled={isDisabled}
        onClick={(e) => handleItemClick(target, itemKey, e)}
        aria-label={itemLabel(type, target)}
        aria-current={isActive ? "page" : undefined}
        {...hooks("pagination", "item")}
      >
        {content}
        {ripples
          .filter((ripple) => ripple.itemKey === itemKey)
          .map((ripple) => (
            <span
              key={ripple.id}
              className={styles.ripple}
              style={{ left: ripple.x, top: ripple.y }}
              aria-hidden="true"
            />
          ))}
      </button>
    );
  };

  const renderEdge = (type: "prev" | "next") =>
    hideEdges ? null : renderItem(type === "prev" ? page - 1 : page + 1, type);

  const renderPageList = () => {
    if (simple) {
      return (
        <>
          {renderEdge("prev")}
          <div className={styles.simpleInput}>
            <input
              {...hooks("pagination", "simple-input")}
              value={simpleDraft ?? String(page)}
              disabled={disabled}
              aria-label={labels?.currentPage ?? t("pagination.currentPage")}
              inputMode="numeric"
              onChange={(e) => setSimpleDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                // Do not implicitly submit an enclosing form
                e.preventDefault();
                commitSimpleDraft();
              }}
              onBlur={commitSimpleDraft}
            />
            <span className={styles.simpleDivider} aria-hidden="true">
              /
            </span>
            <span>{totalPages}</span>
          </div>
          {renderEdge("next")}
        </>
      );
    }

    if (hideNumbers) {
      return (
        <>
          {renderEdge("prev")}
          <span className={styles.counter} aria-live="polite">
            {page} / {totalPages}
          </span>
          {renderEdge("next")}
        </>
      );
    }

    if (siblingCount !== undefined || boundaryCount !== undefined) {
      const compact = getCompactPageItems(
        totalPages,
        page,
        Math.max(0, siblingCount ?? 1),
        Math.max(1, boundaryCount ?? 1),
      );
      return [
        renderEdge("prev"),
        ...compact.map((item) =>
          typeof item === "number" ? (
            renderItem(item, "page")
          ) : (
            <span key={item} className={styles.ellipsis} aria-hidden="true">
              …
            </span>
          ),
        ),
        renderEdge("next"),
      ];
    }

    const range = getPageRange(page, totalPages);
    const items: React.ReactNode[] = [renderEdge("prev")];

    if (range.length > 0 && range[0] > 1) {
      items.push(renderItem(1, "page"));
      if (range[0] > 2) {
        items.push(
          renderItem(Math.max(1, page - PAGINATION_JUMP_SIZE), "jump-prev"),
        );
      }
    }

    range.forEach((p) => items.push(renderItem(p, "page")));

    const last = range[range.length - 1];
    if (range.length > 0 && last < totalPages) {
      if (last < totalPages - 1) {
        items.push(
          renderItem(
            Math.min(totalPages, page + PAGINATION_JUMP_SIZE),
            "jump-next",
          ),
        );
      }
      items.push(renderItem(totalPages, "page"));
    }

    items.push(renderEdge("next"));
    return items;
  };

  // 键盘导航 (on the page buttons only, so inputs / selects keep their own
  // keys): 方向键 / Home / End, 焦点随之移动到当前页
  // (disabled pagination: the buttons are disabled and receive no keys)
  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    // RTL: the previous page is on the right, so ArrowRight goes back.
    const key = logicalArrowKey(e.key, e.currentTarget);
    const destination =
      key === "ArrowLeft"
        ? page - 1
        : key === "ArrowRight"
          ? page + 1
          : e.key === "Home"
            ? 1
            : e.key === "End"
              ? totalPages
              : null;
    if (destination === null) return;
    e.preventDefault();
    changePage(destination, "active");
  };

  const shownPage = Math.min(Math.max(1, page), totalPages);
  const visibleRange: [number, number] =
    total > 0
      ? [
          (shownPage - 1) * currentPageSize + 1,
          Math.min(shownPage * currentPageSize, total),
        ]
      : [0, 0];

  const sizeLabel = labels?.pageSize ?? t("pagination.pageSize");
  const sizeOptionLabel = (size: number) =>
    labels?.pageSizeOption?.(size) ?? t("pagination.pageSizeOption", { size });

  const sizeOptions = pageSizeOptions.includes(currentPageSize)
    ? pageSizeOptions
    : [...pageSizeOptions, currentPageSize].sort((a, b) => a - b);

  const componentClassName = cn(
    styles.pagination,
    disabled && styles.disabled,
    size === "small" && styles.small,
    size === "large" && styles.large,
    shape === "circle" && styles.circle,
    shape === "square" && styles.square,
    styles[variant],
    responsive && styles.responsive,
    className,
  );

  return (
    <nav
      aria-label={labels?.nav ?? t("pagination.nav")}
      {...rest}
      ref={mergedRef}
      className={componentClassName}
      style={style}
      {...hooks("pagination", "root", { disabled, size, shape, variant })}
    >
      {showTotal !== false && (
        <div
          className={styles.total}
          aria-live="polite"
          aria-atomic="true"
          {...hooks("pagination", "total")}
        >
          {typeof showTotal === "function"
            ? showTotal(total, visibleRange)
            : totalRender
              ? totalRender(total, visibleRange)
              : (labels?.total?.(total) ?? t("pagination.total", { total }))}
        </div>
      )}

      {renderPageList()}

      {showQuickJumper && (
        <label className={styles.jumper} {...hooks("pagination", "jumper")}>
          {labels?.jumpTo ?? t("pagination.jumpTo")}
          <input
            value={jumpValue}
            disabled={disabled}
            inputMode="numeric"
            onChange={(e) => setJumpValue(e.target.value)}
            onKeyDown={handleJump}
            aria-label={labels?.jumpToInput ?? t("pagination.jumpToInput")}
          />
        </label>
      )}

      {showSizeChanger && (
        <div className={styles.sizeChanger}>
          <select
            {...hooks("pagination", "size-changer")}
            value={currentPageSize}
            disabled={disabled}
            onChange={(e) => handleSizeChange(e.target.value)}
            aria-label={sizeLabel}
          >
            {sizeOptions.map((option) => (
              <option key={option} value={option}>
                {sizeOptionLabel(option)}
              </option>
            ))}
          </select>
        </div>
      )}
    </nav>
  );
};

export default Pagination;
