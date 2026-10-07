import type { CSSProperties } from "react";
import { cn } from "../../utils/cn";
import { resolveSpace } from "../../internal/space";
import type { SplitLayoutProps } from "./types";
import styles from "./splitLayout.module.scss";

/**
 * SplitLayout: main content with an optional aside column that splits beside
 * it once the layout's own width reaches a breakpoint. Main always precedes the
 * aside in DOM / reading order, and toggling the aside never remounts main.
 */
const SplitLayout = ({
  aside,
  asideWidth = 320,
  collapseBelow = "md",
  gap = 6,
  children,
  className,
  style,
  ...rest
}: SplitLayoutProps) => {
  if (!Number.isFinite(asideWidth) || asideWidth <= 0) {
    throw new RangeError(
      "SplitLayout asideWidth must be a finite positive number",
    );
  }
  const hasAside = aside !== null && aside !== undefined && aside !== false;

  return (
    <div
      className={cn(styles.root, "ui-split-layout", className)}
      style={
        {
          "--ui-split-layout-aside-width": `${asideWidth}px`,
          "--ui-split-layout-gap": resolveSpace(gap),
          ...style,
        } as CSSProperties
      }
      {...rest}
    >
      <div
        className={cn(
          styles.grid,
          styles[collapseBelow],
          hasAside && styles.hasAside,
          "ui-split-layout-grid",
          `ui-split-layout-grid--${collapseBelow}`,
          hasAside && "ui-split-layout-grid--has-aside",
        )}
      >
        <div className={cn(styles.main, "ui-split-layout-main")}>
          {children}
        </div>
        {hasAside && (
          <div className={cn(styles.aside, "ui-split-layout-aside")}>
            {aside}
          </div>
        )}
      </div>
    </div>
  );
};

export default SplitLayout;
