import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  MouseEvent,
  KeyboardEvent,
} from "react";
import {
  IoChevronBack,
  IoChevronForward,
  IoEllipsisHorizontal,
} from "react-icons/io5";
import classNames from "classnames";
import { PaginationProps } from "./types";
import styles from "./pagination.module.scss";
import useI18n from "../../hooks/useI18n";

type PaginationType = "page" | "prev" | "next" | "jump-prev" | "jump-next";

/**
 * Pagination 分页组件
 *
 * @description 用于数据分页展示的导航组件,支持多种样式和交互方式
 *
 * @param current - 当前页
 * @param total - 总数
 * @param pageSize - 每页显示数量
 * @param onChange - 页码改变回调
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
 */
const Pagination: React.FC<PaginationProps> = ({
  current = 1,
  total = 0,
  pageSize = 10,
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
  icons = {
    prev: <IoChevronBack />,
    next: <IoChevronForward />,
    jumpPrev: <IoEllipsisHorizontal />,
    jumpNext: <IoEllipsisHorizontal />,
  },
}) => {
  // 内部状态
  const { t } = useI18n();
  const [jumpValue, setJumpValue] = useState("");
  // Draft text of the simple-mode page input while the user is typing
  // (null when not editing, so the input mirrors `current`)
  const [simpleDraft, setSimpleDraft] = useState<string | null>(null);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);
  const [ripples, setRipples] = useState<
    { x: number; y: number; id: number; itemKey: string }[]
  >([]);
  const nextRippleId = useRef(0);

  // Follow `pageSize` prop changes; local state still tracks size-changer
  // selections when the parent does not update the prop.
  useEffect(() => {
    setCurrentPageSize(pageSize);
  }, [pageSize]);

  // 计算总页数
  const totalPages = Math.ceil(total / currentPageSize);

  // 计算显示的页码范围
  const getPageRange = useCallback(() => {
    const range: number[] = [];
    const showItems = 5; // 显示的页码数量
    let start = Math.max(1, current - Math.floor(showItems / 2));
    const end = Math.min(totalPages, start + showItems - 1);

    if (end - start + 1 < showItems) {
      start = Math.max(1, end - showItems + 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  }, [current, totalPages]);

  // 处理页码点击
  const handlePageClick = useCallback(
    (page: number, event?: MouseEvent<HTMLElement>, itemKey?: string) => {
      if (page === current || page < 1 || page > totalPages || disabled) {
        return;
      }

      if (event && itemKey) {
        const rect = event.currentTarget.getBoundingClientRect();
        const ripple = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
          id: nextRippleId.current++,
          itemKey,
        };
        setRipples((prev) => [...prev, ripple]);
      }

      onChange?.(page, currentPageSize);
    },
    [current, totalPages, disabled, onChange, currentPageSize],
  );

  // 处理快速跳转
  const handleJump = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const value = parseInt(jumpValue);
        if (!isNaN(value) && value >= 1 && value <= totalPages) {
          onChange?.(value, currentPageSize);
          setJumpValue("");
        }
      }
    },
    [jumpValue, totalPages, onChange, currentPageSize],
  );

  // 处理页码大小改变
  const handleSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newSize = parseInt(e.target.value);
      setCurrentPageSize(newSize);
      onChange?.(1, newSize);
    },
    [onChange],
  );

  // 提交简单模式输入框的页码: 有效值夹取到合法范围, 无效值还原
  const commitSimpleDraft = useCallback(() => {
    if (simpleDraft === null) return;
    setSimpleDraft(null);
    const value = parseInt(simpleDraft, 10);
    if (isNaN(value) || totalPages < 1) return;
    const page = Math.min(Math.max(value, 1), totalPages);
    if (page !== current) {
      onChange?.(page, currentPageSize);
    }
  }, [simpleDraft, totalPages, current, onChange, currentPageSize]);

  // 清理水波纹效果
  useEffect(() => {
    const timer = setTimeout(() => {
      if (ripples.length > 0) {
        setRipples([]);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [ripples]);

  // 渲染页码项
  const renderPageItem = useCallback(
    (page: number, type: PaginationType) => {
      const isDisabled =
        disabled ||
        (type === "prev"
          ? current <= 1
          : type === "next"
            ? current >= totalPages
            : false);
      const itemClassName = classNames(styles.item, {
        [styles.active]: type === "page" && page === current,
        [styles.disabled]: isDisabled,
        [styles.prev]: type === "prev",
        [styles.next]: type === "next",
        [styles.jump]: type === "jump-prev" || type === "jump-next",
      });

      let content: React.ReactNode;
      switch (type) {
        case "prev":
          content = icons.prev;
          break;
        case "next":
          content = icons.next;
          break;
        case "jump-prev":
          content = (
            <div className={styles.jumpWrapper}>
              {icons.jumpPrev}
              <div className={styles.jumpHint}>{t("pagination.jumpPrev")}</div>
            </div>
          );
          break;
        case "jump-next":
          content = (
            <div className={styles.jumpWrapper}>
              {icons.jumpNext}
              <div className={styles.jumpHint}>{t("pagination.jumpNext")}</div>
            </div>
          );
          break;
        default:
          content = page;
      }

      if (itemRender) {
        content = itemRender(page, type);
      }

      const itemKey = `${type}-${page}`;

      return (
        <div
          key={itemKey}
          className={itemClassName}
          onClick={(e) => !isDisabled && handlePageClick(page, e, itemKey)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (!isDisabled) handlePageClick(page);
            }
          }}
          role="button"
          tabIndex={isDisabled ? -1 : 0}
          aria-label={
            type === "prev"
              ? "Previous page"
              : type === "next"
                ? "Next page"
                : type === "jump-prev"
                  ? "Previous 5 pages"
                  : type === "jump-next"
                    ? "Next 5 pages"
                    : `Page ${page}`
          }
          aria-current={
            type === "page" && page === current ? "page" : undefined
          }
          aria-disabled={isDisabled}
        >
          {content}
          {ripples
            .filter((ripple) => ripple.itemKey === itemKey)
            .map((ripple) => (
              <span
                key={ripple.id}
                className={styles.ripple}
                style={{
                  left: ripple.x,
                  top: ripple.y,
                }}
              />
            ))}
        </div>
      );
    },
    [
      current,
      totalPages,
      itemRender,
      icons,
      handlePageClick,
      ripples,
      disabled,
      t,
    ],
  );

  // 渲染页码列表
  const renderPageList = useMemo(() => {
    if (simple) {
      return (
        <>
          {renderPageItem(current - 1, "prev")}
          <div className={styles.simpleInput}>
            <input
              value={simpleDraft ?? String(current)}
              disabled={disabled}
              aria-label="Current page"
              onChange={(e) => setSimpleDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  commitSimpleDraft();
                }
              }}
              onBlur={commitSimpleDraft}
            />
            <span className={styles.simpleDivider}>/</span>
            <span>{totalPages}</span>
          </div>
          {renderPageItem(current + 1, "next")}
        </>
      );
    }

    const range = getPageRange();
    const items: React.ReactNode[] = [];

    // 上一页
    items.push(renderPageItem(current - 1, "prev"));

    // 第一页
    if (range[0] > 1) {
      items.push(renderPageItem(1, "page"));
      if (range[0] > 2) {
        items.push(renderPageItem(Math.max(1, current - 5), "jump-prev"));
      }
    }

    // 页码列表
    range.forEach((page) => {
      items.push(renderPageItem(page, "page"));
    });

    // 最后一页
    if (range[range.length - 1] < totalPages) {
      if (range[range.length - 1] < totalPages - 1) {
        items.push(
          renderPageItem(Math.min(totalPages, current + 5), "jump-next"),
        );
      }
      items.push(renderPageItem(totalPages, "page"));
    }

    // 下一页
    items.push(renderPageItem(current + 1, "next"));

    return items;
  }, [
    current,
    totalPages,
    simple,
    getPageRange,
    renderPageItem,
    simpleDraft,
    commitSimpleDraft,
    disabled,
  ]);

  // 组件类名
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

  // 键盘导航支持
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (disabled) return;
      // Let text inputs / selects keep their own arrow/Home/End behaviour
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "SELECT") return;

      switch (e.key) {
        case "ArrowLeft":
          handlePageClick(current - 1);
          break;
        case "ArrowRight":
          handlePageClick(current + 1);
          break;
        case "Home":
          handlePageClick(1);
          break;
        case "End":
          handlePageClick(totalPages);
          break;
      }
    },
    [current, totalPages, disabled, handlePageClick],
  );

  return (
    <div
      className={componentClassName}
      style={style}
      role="navigation"
      aria-label="Pagination"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {showTotal && (
        <div className={styles.total}>
          {totalRender
            ? totalRender(total, [
                (current - 1) * currentPageSize + 1,
                Math.min(current * currentPageSize, total),
              ])
            : `Total ${total} items`}
        </div>
      )}

      {renderPageList}

      {showQuickJumper && (
        <div className={styles.jumper}>
          Go to
          <input
            value={jumpValue}
            onChange={(e) => setJumpValue(e.target.value)}
            onKeyDown={handleJump}
            aria-label="Jump to page"
          />
        </div>
      )}

      {showSizeChanger && (
        <div className={styles.sizeChanger}>
          <select
            value={currentPageSize}
            onChange={handleSizeChange}
            aria-label="Items per page"
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option} / page
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Pagination;
