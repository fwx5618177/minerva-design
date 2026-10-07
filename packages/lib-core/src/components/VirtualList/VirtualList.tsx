import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import type { VirtualListProps, VirtualItem } from "./types";
import styles from "./virtualList.module.scss";
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
 * @returns {React.ReactNode} 虚拟列表组件
 */
const VirtualList: React.FC<VirtualListProps> = ({
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
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const lastScrollTop = useRef(0);
  const isLoadingMore = useRef(false);
  const rafRef = useRef<number>();
  const idleCallbackRef = useRef<number>();

  // 测量得到的内容高度 (不含 padding), padding 在渲染时叠加,
  // 这样 itemPadding 变化后无需重新测量也能生效
  const [measuredContentHeight, setMeasuredContentHeight] = useState(0);
  const measureRef = useRef<HTMLDivElement>(null);
  const hasMeasured = useRef(false);

  // 计算单个项目的高度
  useEffect(() => {
    if (itemHeight || hasMeasured.current) return;

    const measure = () => {
      if (measureRef.current) {
        const height = measureRef.current.offsetHeight;
        if (height > 0) {
          setMeasuredContentHeight(height);
          hasMeasured.current = true;
        }
      }
    };

    // 初次测量
    measure();

    // 监听内容变化
    const resizeObserver = new ResizeObserver(() => {
      if (!hasMeasured.current) {
        measure();
      }
    });

    if (measureRef.current) {
      resizeObserver.observe(measureRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [itemHeight]);

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
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
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
        onLoadMore().finally(() => {
          isLoadingMore.current = false;
        });
      }
    });
  }, [onLoadMore, loading, loadMoreThreshold, scheduleUpdate]);

  // 监听容器大小变化
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(container);
    setContainerHeight(container.clientHeight);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // 卸载时清理所有待执行的 RAF / idle 回调
  useEffect(() => cancelScheduled, [cancelScheduled]);

  return (
    <div
      ref={containerRef}
      className={`${styles.virtualList} ${className}`}
      style={{
        ...style,
        maxHeight,
        overflow: "auto",
        position: "relative",
      }}
      onScroll={handleScroll}
    >
      {!itemHeight && !hasMeasured.current && items.length > 0 && (
        <div ref={measureRef} className={styles.measureItem} aria-hidden="true">
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
