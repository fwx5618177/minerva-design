import { cn } from "../../utils/cn";
import useI18n from "../../hooks/useI18n";
import { Spinner } from "../Spinner";
import type { LoadingStateProps, LoadingStateSize } from "./types";
import styles from "./loadingState.module.scss";

/** Stable `ui-loading-state-size-*` hook names (shared with @novel-isr/ui) */
const HOOK_SIZE: Record<LoadingStateSize, string> = {
  small: "compact",
  medium: "default",
  large: "lg",
};

/**
 * LoadingState: page / route / section loading presentation. A decorative
 * Spinner next to a visible label, inside a single polite status region.
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
      className={cn(
        styles.loadingState,
        styles[size],
        "ui-loading-state",
        `ui-loading-state-size-${HOOK_SIZE[size]}`,
        className,
      )}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      {...rest}
    >
      <Spinner
        className={styles.spinner}
        color="current"
        label=""
        aria-hidden="true"
        role="presentation"
        aria-live="off"
      />
      <span className={cn(styles.label, "ui-loading-state-label")}>
        {label ?? t("loadingState.label")}
      </span>
    </div>
  );
};

export default LoadingState;
