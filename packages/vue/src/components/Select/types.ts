/** Size of the Select trigger */
export type SelectSize = "small" | "medium" | "large";

/**
 * Props of `Select` (same names and defaults as the React `SelectProps`): a
 * single-choice dropdown (select-only combobox trigger + listbox popup
 * anchored below it, with full keyboard support and a hidden native select
 * for forms). The selected value is `v-model` (`modelValue`; uncontrolled:
 * `defaultValue`), the popup `v-model:open` (uncontrolled: `defaultOpen`).
 * `class`, `style` and other attributes go to the trigger `<button>`.
 */
export interface SelectProps {
  /** Selected value (controlled, `v-model`) */
  modelValue?: string;
  /** Initially selected value (uncontrolled) */
  defaultValue?: string;
  /** Whether the popup is open (controlled, `v-model:open`) */
  open?: boolean;
  /**
   * Whether the popup is initially open (uncontrolled)
   * @default false
   */
  defaultOpen?: boolean;
  /** Text shown in the trigger while nothing is selected (or the `placeholder` slot) */
  placeholder?: string;
  /**
   * Size of the trigger
   * @default "medium"
   */
  size?: SelectSize;
  /**
   * Shows the error state (also set by an invalid enclosing FormControl)
   * @default false
   */
  invalid?: boolean;
  /**
   * Disables the select. Inherited from an enclosing FormControl when not
   * set; an explicit `false` overrides the FormControl
   * @default false
   */
  disabled?: boolean;
  /**
   * Marks the select as required (inherited from an enclosing FormControl)
   * @default false
   */
  required?: boolean;
  /** Name of the hidden native select, used in forms */
  name?: string;
  /** id of the trigger (defaults to the enclosing FormControl's id) */
  id?: string;
  /**
   * Accessible label of the trigger (`aria-label`), required when there is
   * no visible label (also names the listbox)
   */
  ariaLabel?: string;
  /**
   * id(s) of the element(s) labelling the trigger (`aria-labelledby`; also
   * names the listbox)
   */
  ariaLabelledby?: string;
  /** Extra ids of elements describing the trigger (`aria-describedby`) */
  ariaDescribedby?: string;
  /** Additional class name of the popup */
  contentClassName?: string;
}

/** Props of an option of a Select (`SelectItem`) */
export interface SelectItemProps {
  /** Value of the option (must not be an empty string) */
  value: string;
  /**
   * Prevents selecting the option
   * @default false
   */
  disabled?: boolean;
  /** Text used for typeahead when the content is not plain text */
  textValue?: string;
}

/** Props of a group of Select options (`SelectGroup`) */
export type SelectGroupProps = Record<string, never>;

/** Props of the label of a SelectGroup (`SelectLabel`) */
export type SelectLabelProps = Record<string, never>;

/** Props of a separator between Select options (`SelectSeparator`) */
export type SelectSeparatorProps = Record<string, never>;
