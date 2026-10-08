import type { VNodeChild } from "vue";

/** One step of a Steps component */
export interface StepsItem {
  /** Unique value of the step, matched against the Steps value */
  value: string;
  /** Visible label of the step (or the `label` scoped slot) */
  label: VNodeChild;
  /**
   * Prevents navigating to this step (e.g. a terminal state that is not reached yet)
   * @default false
   */
  disabled?: boolean;
}

/**
 * Props of `Steps` (React `StepsProps`): the current step is `v-model`
 * (`modelValue`), `onChange` is the `change` event.
 */
export interface StepsProps {
  /** Steps, in order */
  items: StepsItem[];
  /** Value of the current step (controlled: `v-model`) */
  modelValue?: string;
  /** Value of the initial current step (uncontrolled) */
  defaultValue?: string;
  /**
   * Renders the steps as a read-only progress indicator: plain list items
   * without buttons, the current <li> marked aria-current="step"
   * @default true when there is no `change` / `update:modelValue` listener, otherwise false
   */
  readOnly?: boolean;
}
