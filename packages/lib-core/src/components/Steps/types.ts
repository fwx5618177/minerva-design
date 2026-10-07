import type { HTMLAttributes, ReactNode, Ref } from "react";

/** One step of a Steps component */
export interface StepsItem {
  /** Unique value of the step, matched against the Steps value */
  value: string;
  /** Visible label of the step */
  label: ReactNode;
  /**
   * Prevents navigating to this step (e.g. a terminal state that is not reached yet)
   * @default false
   */
  disabled?: boolean;
}

export interface StepsProps extends Omit<
  HTMLAttributes<HTMLOListElement>,
  "onChange" | "defaultValue" | "children"
> {
  /** Steps, in order */
  items: StepsItem[];
  /** Value of the current step (controlled; pair with onChange) */
  value?: string;
  /** Value of the initial current step (uncontrolled) */
  defaultValue?: string;
  /**
   * Called with the value of the step the user navigates to. Steps only
   * report navigation: validation and workflow transitions belong to the caller
   */
  onChange?: (value: string) => void;
  /**
   * Renders the steps as a read-only progress indicator: plain list items
   * without buttons, the current <li> marked aria-current="step"
   * @default true when onChange is not set, otherwise false
   */
  readOnly?: boolean;
  /**
   * Accessible label of the list
   * @default "Steps" (localized)
   */
  "aria-label"?: string;
  /** Additional class name */
  className?: string;
  /** Ref to the root <ol> element */
  ref?: Ref<HTMLOListElement>;
}
