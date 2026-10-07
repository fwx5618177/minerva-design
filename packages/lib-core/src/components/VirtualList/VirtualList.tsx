import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import type { VirtualListProps, VirtualItem } from "./types";
import styles from "./virtualList.module.scss";
import { useMergedRefs } from "../../internal/mergeRefs";
import { ProgressIndicator } from "../ProgressIndicator";

/**
 * 虚拟列表组件
 * @param items 列表数据项
 * @param itemHeight 列表项高度(可选,不传则自动计算)
 * @param maxHeight 最大高度
 * @param overscan 可视区域外预加载的项目数
 * @param renderItem 渲染列表项的函数
 * @param className 自定义类名
 * @param style 自定义样式
 * @param onLoadMore 加载更多的回调函数
 * @param loadMoreThreshold 触发加载更多的阈值(px)
 * @param highPerformance 是否启用高性能模式
 * @param loading 是否显示加载中状态
 * @param ariaLabel 列表的无障碍名称
 * @param ref 滚动容器根元素的 ref
 * @returns {React.ReactNode} 虚拟列表组件
 */
const VirtualList = ({
  items,
  itemHeight,
  maxHeight,
  overscan = 5,
  renderItem,
  className = "",
  style,
  onLoadMore,
  loadMoreThreshold = 100,
  highPerformance = false,
  loading = false,
  itemPadding = 8,
  ariaLabel,
  ref,
}: VirtualListProps) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const lastScrollTop = useRef(0);
  const isLoadingMore = useRef(false);
  const rafRef = useRef<number | undefined>(undefined);
  const idleCallbackRef = useRef<number | undefined>(undefined);

  // 测量得到的内容高度 (不含 padding), padding 在渲染时叠加,
  // 这样 itemPadding 变化后无需重新测量也能生效. 0 = 尚未测量
  const [measuredContentHeight, setMeasuredContentHeight] = useState(0);
  const needsMeasure =
    !itemHeight && measuredContentHeight === 0 && items.length > 0;

  // 容器高度: 挂载时读取并持续监听尺寸变化 (callback ref, 卸载时自动断开)
  const observeContainer = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    setContainerHeight(node.clientHeight);
    if (typeof ResizeObserver === "undefined") return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerHeight(entry.contentRect.height);
      }
    });
    resizeObserver.observe(node);
    return () => resizeObserver.disconnect();
  }, []);
  const containerRef = useMergedRefs(observeContainer, ref);

  // 测量首个项目的高度. 测量元素只在需要时挂载 (包括 items 稍后才加载的情况),
  // 测得高度后即被移除, observer 随之断开
  const measureItem = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const measure = () => {
      const height = node.offsetHeight;
      if (height > 0) setMeasuredContentHeight(height);
    };
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(node);
    return () => resizeObserver.disconnect();
  }, []);

  // 使用固定高度或计算出的高度
  const finalItemHeight =
    itemHeight ||
    (measuredContentHeight > 0 ? measuredContentHeight + itemPadding * 2 : 0);

  // 计算可见范围
  const visibleRange = useMemo(() => {
    if (!finalItemHeight) return { start: 0, end: 1, visibleCount: 1 };

    const start = Math.max(
      0,
      Math.floor(scrollTop / finalItemHeight) - overscan,
    );
    const visibleCount =
      Math.ceil(containerHeight / finalItemHeight) + 2 * overscan;
    const end = Math.min(items.length, start + visibleCount);

    return {
      start,
      end,
      visibleCount,
    };
  }, [scrollTop, containerHeight, finalItemHeight, overscan, items.length]);

  // 取消尚未执行的 RAF / idle 回调
  const cancelScheduled = useCallback(() => {
    if (rafRef.current !== undefined) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = undefined;
    }
    if (idleCallbackRef.current !== undefined) {
      if ("cancelIdleCallback" in window) {
        cancelIdleCallback(idleCallbackRef.current);
      }
      idleCallbackRef.current = undefined;
    }
  }, []);

  // 高性能模式下的渲染优化
  const scheduleUpdate = useCallback(
    (callback: () => void) => {
      if (highPerformance) {
        // Only the latest scroll position matters: drop pending work
        cancelScheduled();

        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = undefined;
          if ("requestIdleCallback" in window) {
            idleCallbackRef.current = requestIdleCallback(
              () => {
                idleCallbackRef.current = undefined;
                callback();
              },
              { timeout: 100 },
            );
          } else {
            callback();
          }
        });
      } else {
        callback();
      }
    },
    [highPerformance, cancelScheduled],
  );

  // 生成虚拟列表项
  const virtualItems = useMemo(() => {
    const result: VirtualItem[] = [];
    for (let i = visibleRange.start; i < visibleRange.end; i++) {
      result.push({
        index: i,
        start: i * finalItemHeight,
        height: finalItemHeight,
      });
    }
    return result;
  }, [visibleRange, finalItemHeight]);

  // 处理滚动
  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
      const isScrollingDown = scrollTop > lastScrollTop.current;
      lastScrollTop.current = scrollTop;

      scheduleUpdate(() => {
        setScrollTop(scrollTop);

        // 优化无限滚动触发逻辑
        if (
          isScrollingDown &&
          onLoadMore &&
          !isLoadingMore.current &&
          !loading &&
          scrollHeight - scrollTop - clientHeight < loadMoreThreshold &&
          // 添加额外检查，防止重复触发
          scrollHeight > clientHeight
        ) {
          isLoadingMore.current = true;
          // Tolerate callbacks that do not return a promise
          Promise.resolve(onLoadMore()).finally(() => {
            isLoadingMore.current = false;
          });
        }
      });
    },
    [onLoadMore, loading, loadMoreThreshold, scheduleUpdate],
  );

  // 卸载时清理所有待执行的 RAF / idle 回调
  useEffect(() => cancelScheduled, [cancelScheduled]);

  return (
    <div
      ref={containerRef}
      // Scrollable region: focusable so keyboard users can scroll it
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      aria-busy={loading || undefined}
      className={`${styles.virtualList} ${className}`}
      style={{
        ...style,
        maxHeight,
        overflow: "auto",
        position: "relative",
      }}
      onScroll={handleScroll}
    >
      {needsMeasure && (
        <div
          ref={measureItem}
          className={styles.measureItem}
          aria-hidden="true"
        >
          {renderItem(items[0], 0)}
        </div>
      )}
      <div
        style={{
          height: finalItemHeight ? items.length * finalItemHeight : "auto",
          position: "relative",
          willChange: "transform",
        }}
        className={styles.virtualListContent}
        role="list"
        aria-label={ariaLabel}
      >
        {finalItemHeight > 0 &&
          virtualItems.map((virtualItem) => (
            <div
              key={items[virtualItem.index].id}
              style={{
                position: "absolute",
                top: 0,
                transform: `translateY(${virtualItem.start}px)`,
                width: "100%",
                height: finalItemHeight,
                willChange: "transform",
                padding: itemPadding,
                cursor: "pointer",
              }}
              className={styles.virtualListItem}
              role="listitem"
              // Only a window of items is in the DOM: expose the real position
              aria-setsize={items.length}
              aria-posinset={virtualItem.index + 1}
            >
              {renderItem(items[virtualItem.index], virtualItem.index)}
            </div>
          ))}
      </div>
      {loading && (
        <div className={styles.loadingWrapper}>
          <ProgressIndicator type="wave" size="small" />
        </div>
      )}
    </div>
  );
};

export default React.memo(VirtualList);
