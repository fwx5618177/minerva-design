import { cn } from "../../utils/cn";
import { resolveSpace } from "../../internal/space";
import Skeleton from "./Skeleton";
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
      className={cn(styles.skeletonText, "ui-skeleton-text", className)}
      style={{ gap: resolveSpace(gap), ...style }}
    >
      {Array.from({ length: count }, (_, index) => (
        <Skeleton
          key={index}
          decorative
          variant="text"
          animation={animation}
          height={lineHeight}
          width={shrinkLast && index === count - 1 ? "70%" : "100%"}
        />
      ))}
    </div>
  );
};

export default SkeletonText;
