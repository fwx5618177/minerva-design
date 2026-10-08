import { cn } from "../../utils/cn";
import { resolveSpace } from "@minerva/core";
import { hooks } from "../../internal/stylingHooks";
import type { SkeletonTextProps } from "./types";
import styles from "./skeleton.module.scss";

/**
 * SkeletonText: a decorative block of text-line placeholders (the last line is
 * shortened to 70% by default). Hidden from assistive technologies; expose the
 * busy state on the surrounding container.
 */
export const SkeletonText = ({
  lines = 3,
  lineHeight = "1em",
  gap = 2,
  shrinkLast = true,
  animation = "pulse",
  className,
  style,
  ref,
  ...rest
}: SkeletonTextProps) => {
  const count = Number.isFinite(lines) ? Math.max(0, Math.floor(lines)) : 0;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      {...rest}
      className={cn(styles.skeletonText, className)}
      style={{ gap: resolveSpace(gap), ...style }}
      {...hooks("skeleton-text", "root")}
    >
      {/* The markup of decorative text Skeletons, as lines of this block */}
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          aria-hidden="true"
          className={cn(
            styles.skeleton,
            styles.decorative,
            styles.text,
            styles[`animation-${animation}`],
          )}
          style={{
            width: shrinkLast && index === count - 1 ? "70%" : "100%",
            height:
              typeof lineHeight === "number" ? `${lineHeight}px` : lineHeight,
          }}
          {...hooks("skeleton-text", "line")}
        />
      ))}
    </div>
  );
};

export default SkeletonText;
