import { cn } from "../../utils/cn";
import useI18n from "../../hooks/useI18n";
import { Spinner } from "../Spinner";
import type { LoadingStateProps } from "./types";
import styles from "./loadingState.module.scss";

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
      className={cn(styles.loadingState, styles[size], className)}
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
      <span className={styles.label}>{label ?? t("loadingState.label")}</span>
    </div>
  );
};

export default LoadingState;
