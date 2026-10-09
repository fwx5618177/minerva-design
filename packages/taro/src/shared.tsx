import Taro from "@tarojs/taro";
import {
  useState,
  useEffect,
  useId,
  type ReactNode,
  type CSSProperties,
} from "react";
import { View } from "@tarojs/components";
import { cn } from "@minerva/core";
export interface NativeProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}
export function useValue<T>(
  value: T | undefined,
  initial: T,
  onChange?: (value: T) => void,
): [T, (value: T) => void] {
  const [local, setLocal] = useState(initial);
  const current = value === undefined ? local : value;
  return [
    current,
    (next) => {
      if (Object.is(current, next)) return;
      if (value === undefined) setLocal(next);
      onChange?.(next);
    },
  ];
}
export function Part({
  name,
  part = "root",
  role,
  className,
  children,
  ...props
}: NativeProps & {
  name: string;
  part?: string;
  role?: string;
  hoverClass?: string;
}) {
  return (
    <View
      {...props}
      {...{ role }}
      data-minerva={name}
      data-part={part}
      className={cn(
        `mn-${name}`,
        part !== "root" && `mn-${name}__${part}`,
        className,
      )}
    >
      {children}
    </View>
  );
}

/** Measure the native View itself; window width is only the pre-measure fallback. */
export function useNativeContainerWidth(explicitId?: string): [string, number] {
  const generated = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const id = explicitId ?? `mn-layout-${generated}`;
  const [width, setWidth] = useState(() => {
    try {
      return Taro.getSystemInfoSync().windowWidth || 375;
    } catch {
      return 375;
    }
  });
  useEffect(() => {
    const measure = (fallback?: number) => {
      let measured = false;
      const query = Taro.createSelectorQuery?.();
      query
        ?.select(`#${id}`)
        .boundingClientRect((rect) => {
          if (rect && "width" in rect && rect.width > 0) {
            measured = true;
            setWidth(rect.width);
          }
        })
        .exec();
      if (!query && !measured && fallback) setWidth(fallback);
    };
    measure();
    const resize = (event: unknown) => {
      const size =
        event && typeof event === "object" && "size" in event
          ? (event.size as { windowWidth?: number })
          : undefined;
      measure(size?.windowWidth);
    };
    Taro.onWindowResize?.(resize);
    return () => Taro.offWindowResize?.(resize);
  }, [id]);
  return [id, width];
}

export type NativeFloatingSide = "top" | "right" | "bottom" | "left";
export interface NativePositionOptions {
  side?: NativeFloatingSide;
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
  collisionPadding?: number;
  matchAnchorWidth?: false | "min" | "exact";
}
/** Native geometry only: no DOM element, portal, or floating-ui browser dependency. */
export function useNativeAnchoredPosition(
  anchorId: string,
  panelId: string,
  open: boolean,
  {
    side = "bottom",
    align = "center",
    sideOffset = 6,
    alignOffset = 0,
    collisionPadding = 8,
    matchAnchorWidth = false,
  }: NativePositionOptions,
) {
  const [position, setPosition] = useState<{
    style: CSSProperties;
    side: NativeFloatingSide;
    arrow: CSSProperties;
  }>();
  useEffect(() => {
    if (!open) {
      setPosition(undefined);
      return;
    }
    let disposed = false;
    const measure = () => {
      const query = Taro.createSelectorQuery?.();
      if (!query) return;
      type Rect = {
        left: number;
        top: number;
        width: number;
        height: number;
        right: number;
        bottom: number;
      };
      let anchor: Rect | undefined, panel: Rect | undefined;
      query
        .select(`#${anchorId}`)
        .boundingClientRect((rect) => {
          if (rect && "width" in rect) anchor = rect as Rect;
        })
        .select(`#${panelId}`)
        .boundingClientRect((rect) => {
          if (rect && "width" in rect) panel = rect as Rect;
        })
        .exec(() => {
          if (disposed || !anchor || !panel || panel.width <= 0) return;
          const viewport = Taro.getSystemInfoSync(),
            vw = viewport.windowWidth,
            vh = viewport.windowHeight,
            pad = Math.max(0, collisionPadding);
          if (!vw || !vh) return;
          const width = Math.min(
            Math.max(0, vw - 2 * pad),
            matchAnchorWidth === "exact"
              ? anchor.width
              : matchAnchorWidth === "min"
                ? Math.max(anchor.width, panel.width)
                : panel.width,
          );
          const height = Math.min(panel.height, Math.max(0, vh - 2 * pad));
          const spaces = {
            top: anchor.top - pad - sideOffset,
            bottom: vh - anchor.bottom - pad - sideOffset,
            left: anchor.left - pad - sideOffset,
            right: vw - anchor.right - pad - sideOffset,
          };
          const opposite = {
            top: "bottom",
            bottom: "top",
            left: "right",
            right: "left",
          } as const;
          let resolved = side;
          const mainSize = side === "top" || side === "bottom" ? height : width;
          if (spaces[side] < mainSize && spaces[opposite[side]] > spaces[side])
            resolved = opposite[side];
          const vertical = resolved === "top" || resolved === "bottom";
          let x = vertical
            ? (align === "start"
                ? anchor.left
                : align === "end"
                  ? anchor.right - width
                  : anchor.left + (anchor.width - width) / 2) + alignOffset
            : resolved === "left"
              ? anchor.left - width - sideOffset
              : anchor.right + sideOffset;
          let y = !vertical
            ? (align === "start"
                ? anchor.top
                : align === "end"
                  ? anchor.bottom - height
                  : anchor.top + (anchor.height - height) / 2) + alignOffset
            : resolved === "top"
              ? anchor.top - height - sideOffset
              : anchor.bottom + sideOffset;
          x = Math.max(pad, Math.min(vw - pad - width, x));
          y = Math.max(pad, Math.min(vh - pad - height, y));
          const arrow: CSSProperties = vertical
            ? {
                left: Math.max(
                  6,
                  Math.min(width - 16, anchor.left + anchor.width / 2 - x - 5),
                ),
                [resolved === "top" ? "bottom" : "top"]: -5,
              }
            : {
                top: Math.max(
                  6,
                  Math.min(height - 16, anchor.top + anchor.height / 2 - y - 5),
                ),
                [resolved === "left" ? "right" : "left"]: -5,
              };
          const next = {
            side: resolved,
            arrow,
            style: {
              position: "fixed",
              left: x,
              top: y,
              right: "auto",
              bottom: "auto",
              transform: "none",
              width: matchAnchorWidth === "exact" ? width : undefined,
              minWidth: matchAnchorWidth === "min" ? width : undefined,
              maxWidth: vw - 2 * pad,
              maxHeight: Math.max(
                0,
                vertical ? spaces[resolved] : vh - 2 * pad,
              ),
              overflow: "auto",
            } as CSSProperties,
          };
          setPosition((previous) =>
            JSON.stringify(previous) === JSON.stringify(next) ? previous : next,
          );
        });
    };
    measure();
    void Taro.nextTick(() => {
      if (!disposed) measure();
    });
    const timer = setInterval(measure, 100);
    Taro.onWindowResize?.(measure);
    return () => {
      disposed = true;
      clearInterval(timer);
      Taro.offWindowResize?.(measure);
    };
  }, [
    anchorId,
    panelId,
    open,
    side,
    align,
    sideOffset,
    alignOffset,
    collisionPadding,
    matchAnchorWidth,
  ]);
  const vertical = side === "top" || side === "bottom";
  const fallback: CSSProperties = {
    position: "absolute",
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto",
    [side === "top"
      ? "bottom"
      : side === "bottom"
        ? "top"
        : side === "left"
          ? "right"
          : "left"]: `calc(100% + ${sideOffset}px)`,
    ...(vertical
      ? align === "start"
        ? { left: alignOffset }
        : align === "end"
          ? { right: -alignOffset }
          : {
              left: `calc(50% + ${alignOffset}px)`,
              transform: "translateX(-50%)",
            }
      : align === "start"
        ? { top: alignOffset }
        : align === "end"
          ? { bottom: -alignOffset }
          : {
              top: `calc(50% + ${alignOffset}px)`,
              transform: "translateY(-50%)",
            }),
  };
  return (
    position ?? {
      style: fallback,
      side,
      arrow: vertical
        ? { left: 12, [side === "top" ? "bottom" : "top"]: -5 }
        : { top: 12, [side === "left" ? "right" : "left"]: -5 },
    }
  );
}
