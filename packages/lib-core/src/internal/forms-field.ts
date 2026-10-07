import type { AriaAttributes } from "react";

/** Whether an `aria-invalid` value announces an error (`"false"` does not). */
export const isAriaInvalid = (value: AriaAttributes["aria-invalid"]): boolean =>
  value !== undefined && value !== false && value !== "false";

export type FieldSize = "small" | "medium" | "large";

/** Size suffix of the legacy `ui-*` styling hooks (`small` -> `sm`). */
export const fieldSizeHook: Record<FieldSize, "sm" | "md" | "lg"> = {
  small: "sm",
  medium: "md",
  large: "lg",
};
