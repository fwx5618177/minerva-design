import { cn } from "../../utils/cn";
import useI18n from "../../hooks/useI18n";
import { ProgressIndicator } from "../ProgressIndicator";
import type { LoadingStateProps } from "./types";
import { hooks } from "../../internal/stylingHooks";
import styles from "./loadingState.module.scss";

/**
 * LoadingState: page / route / section loading presentation. A decorative
 * ProgressIndicator spinner next to a visible label, inside a single polite status region.
 * It does not set aria-busy: mark the content container busy yourself.
 */
export const LoadingState = ({
  label,
  size = "medium",
  className,
  ref,
  ...rest
}: LoadingStateProps) => {
  const { t } = useI18n();
  return (
    <div
      ref={ref}
      className={cn(styles.loadingState, styles[size], className)}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      {...rest}
      {...hooks("loading-state", "root", { size })}
    >
      <span className={styles.indicator} {...hooks("loading-state", "spinner")}>
        <ProgressIndicator color="current" decorative />
      </span>
      <span className={styles.label} {...hooks("loading-state", "label")}>
        {label ?? t("loadingState.label")}
      </span>
    </div>
  );
};

export default LoadingState;
