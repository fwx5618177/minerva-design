import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import {
  IoChevronBack,
  IoChevronForward,
  IoEllipsisHorizontal,
} from "react-icons/io5";
import classNames from "classnames";
import type { PaginationProps } from "./types";
import styles from "./pagination.module.scss";
import useI18n from "../../hooks/useI18n";
import { useControllableState } from "../../internal/useControllableState";
import { useMergedRefs } from "../../internal/mergeRefs";

type PaginationItemType = "page" | "prev" | "next" | "jump-prev" | "jump-next";

/** Number of consecutive page buttons around the current page */
const WINDOW_SIZE = 5;
/** Pages skipped by the jump-prev / jump-next items */
const JUMP_SIZE = 5;

const DEFAULT_ICONS = {
  prev: <IoChevronBack aria-hidden="true" />,
  next: <IoChevronForward aria-hidden="true" />,
  jumpPrev: <IoEllipsisHorizontal aria-hidden="true" />,
  jumpNext: <IoEllipsisHorizontal aria-hidden="true" />,
};

interface Ripple {
  x: number;
  y: number;
  id: number;
  itemKey: string;
}

/** Window of page numbers centered on `current`, clamped to [1, totalPages] */
const getPageRange = (current: number, totalPages: number) => {
  let start = Math.max(1, current - Math.floor(WINDOW_SIZE / 2));
  const end = Math.min(totalPages, start + WINDOW_SIZE - 1);
  if (end - start + 1 < WINDOW_SIZE) {
    start = Math.max(1, end - WINDOW_SIZE + 1);
  }
  const range: number[] = [];
  for (let i = start; i <= end; i++) range.push(i);
  return range;
};

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
 * @param labels - 自定义文案（覆盖本地化的默认文案）
 * @param ref - 根 <nav> 元素的 ref
 */
const Pagination = ({
  current,
  defaultCurrent = 1,
  total = 0,
  pageSize,
  defaultPageSize = 10,
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
  variant = "filled",
  simple = false,
  responsive = false,
  icons,
  labels,
  ref,
}: PaginationProps) => {
  const { t } = useI18n();
  const navRef = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(navRef, ref);

  const [page, setPage] = useControllableState({
    value: current,
    defaultValue: defaultCurrent,
  });
  const [currentPageSize, setPageSize] = useControllableState({
    value: pageSize,
    defaultValue: defaultPageSize,
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
  const totalPages =
    currentPageSize > 0 ? Math.ceil(total / currentPageSize) : 0;

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
    const value = parseInt(jumpValue, 10);
    if (!isNaN(value) && value >= 1 && value <= totalPages) {
      changePage(value);
      setJumpValue("");
    }
  };

  // 页码大小改变: 回到第一页
  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value, 10);
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
        className={classNames(styles.item, {
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

  const renderPageList = () => {
    if (simple) {
      return (
        <>
          {renderItem(page - 1, "prev")}
          <div className={styles.simpleInput}>
            <input
              value={simpleDraft ?? String(page)}
              disabled={disabled}
              aria-label={labels?.currentPage ?? t("pagination.currentPage")}
              inputMode="numeric"
              onChange={(e) => setSimpleDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitSimpleDraft();
              }}
              onBlur={commitSimpleDraft}
            />
            <span className={styles.simpleDivider} aria-hidden="true">
              /
            </span>
            <span>{totalPages}</span>
          </div>
          {renderItem(page + 1, "next")}
        </>
      );
    }

    const range = getPageRange(page, totalPages);
    const items: React.ReactNode[] = [renderItem(page - 1, "prev")];

    if (range.length > 0 && range[0] > 1) {
      items.push(renderItem(1, "page"));
      if (range[0] > 2) {
        items.push(renderItem(Math.max(1, page - JUMP_SIZE), "jump-prev"));
      }
    }

    range.forEach((p) => items.push(renderItem(p, "page")));

    const last = range[range.length - 1];
    if (range.length > 0 && last < totalPages) {
      if (last < totalPages - 1) {
        items.push(
          renderItem(Math.min(totalPages, page + JUMP_SIZE), "jump-next"),
        );
      }
      items.push(renderItem(totalPages, "page"));
    }

    items.push(renderItem(page + 1, "next"));
    return items;
  };

  // 键盘导航: 方向键 / Home / End, 焦点随之移动到当前页
  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (disabled) return;
    // Let text inputs / selects keep their own arrow/Home/End behaviour
    const target = e.target as HTMLElement;
    if (target.tagName === "INPUT" || target.tagName === "SELECT") return;

    const destination =
      e.key === "ArrowLeft"
        ? page - 1
        : e.key === "ArrowRight"
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

  const sizeOptions = pageSizeOptions.includes(currentPageSize)
    ? pageSizeOptions
    : [...pageSizeOptions, currentPageSize].sort((a, b) => a - b);

  const componentClassName = classNames(
    styles.pagination,
    {
      [styles.disabled]: disabled,
      [styles.small]: size === "small",
      [styles.large]: size === "large",
      [styles.circle]: shape === "circle",
      [styles.square]: shape === "square",
      [styles.outlined]: variant === "outlined",
      [styles.text]: variant === "text",
      [styles.responsive]: responsive,
    },
    className,
  );

  return (
    <nav
      ref={mergedRef}
      className={componentClassName}
      style={style}
      aria-label={labels?.nav ?? t("pagination.nav")}
      onKeyDown={handleKeyDown}
    >
      {showTotal && (
        <div className={styles.total}>
          {totalRender
            ? totalRender(total, [
                total > 0 ? (page - 1) * currentPageSize + 1 : 0,
                Math.min(page * currentPageSize, total),
              ])
            : t("pagination.total", { total })}
        </div>
      )}

      {renderPageList()}

      {showQuickJumper && (
        <label className={styles.jumper}>
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
            value={currentPageSize}
            disabled={disabled}
            onChange={handleSizeChange}
            aria-label={labels?.pageSize ?? t("pagination.pageSize")}
          >
            {sizeOptions.map((option) => (
              <option key={option} value={option}>
                {labels?.pageSizeOption?.(option) ??
                  t("pagination.pageSizeOption", { size: option })}
              </option>
            ))}
          </select>
        </div>
      )}
    </nav>
  );
};

export default Pagination;
