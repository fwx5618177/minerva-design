import { cn } from "../../utils/cn";
import useI18n from "../../hooks/useI18n";
import type { SpinnerColor, SpinnerProps, SpinnerSize } from "./types";
import styles from "./spinner.module.scss";

/** Stable `ui-spinner-*` hook names (shared with @novel-isr/ui) */
const HOOK_SIZE: Record<SpinnerSize, string> = {
  xsmall: "xs",
  small: "sm",
  medium: "md",
  large: "lg",
  xlarge: "xl",
};
const HOOK_COLOR: Record<SpinnerColor, string> = {
  primary: "brand",
  neutral: "gray",
  current: "current",
};

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
      className={cn(
        styles.spinner,
        styles[size],
        styles[color],
        "ui-spinner",
        `ui-spinner-size-${HOOK_SIZE[size]}`,
        `ui-spinner-color-${HOOK_COLOR[color]}`,
        className,
      )}
      {...rest}
    >
      <span className={cn(styles.label, "ui-spinner-label")}>
        {label ?? t("spinner.label")}
      </span>
    </span>
  );
};

export default Spinner;
