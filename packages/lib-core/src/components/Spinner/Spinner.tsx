import { cn } from "../../utils/cn";
import useI18n from "../../hooks/useI18n";
import type { SpinnerProps } from "./types";
import styles from "./spinner.module.scss";

/**
 * Spinner: a lightweight inline loading ring. It is a polite `status` live
 * region whose visually hidden label is announced; role / aria attributes can
 * be overridden (e.g. `role="presentation" aria-hidden` when decorative).
 */
export const Spinner = ({
  size = "medium",
  color = "primary",
  label,
  className,
  ref,
  ...rest
}: SpinnerProps) => {
  const { t } = useI18n();
  return (
    <span
      ref={ref}
      role="status"
      aria-live="polite"
      className={cn(styles.spinner, styles[size], styles[color], className)}
      {...rest}
    >
      <span className={styles.label}>{label ?? t("spinner.label")}</span>
    </span>
  );
};

export default Spinner;
