import type { AriaAttributes } from "react";

/** Whether an `aria-invalid` value announces an error (`"false"` does not). */
export const isAriaInvalid = (value: AriaAttributes["aria-invalid"]): boolean =>
  value !== undefined && value !== false && value !== "false";
