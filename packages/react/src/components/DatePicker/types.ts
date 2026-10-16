import type { CSSProperties, Ref } from "react";
import type { DataAttributes } from "../../internal/dataAttributes";

/** Props of DatePicker; `data-*` attributes are forwarded to the root element */
export interface DatePickerProps extends DataAttributes {
  /** Ref to the <input> element */
  ref?: Ref<HTMLInputElement>;
  /**
   * Selected date as `"YYYY-MM-DD"` (controlled; pair with `onChange`).
   * `""` or `null` means "no date" while staying controlled; `undefined`
   * makes the picker uncontrolled.
   */
  value?: string | null;
  /** Initially selected date as `"YYYY-MM-DD"` (uncontrolled) */
  defaultValue?: string;
  /**
   * Called with the selected date (`"YYYY-MM-DD"`), or `""` when the value
   * is cleared
   */
  onChange?: (value: string) => void;
  /**
   * Placeholder of the input
   * @default "Select date" (localized)
   */
  placeholder?: string;
  /** Visible label of the input; without it the input is labelled "Date" (localized) */
  label?: string;
  /** Accessible label of the input when no visible label is shown */
  "aria-label"?: string;
  /**
   * Id(s) of the element(s) labelling the input; inside a FormControl it
   * defaults to the FormLabel (unless `label` / `aria-label` is set)
   */
  "aria-labelledby"?: string;
  /**
   * Id(s) of the element(s) describing the input; merged with the helper /
   * error text of an enclosing FormControl
   */
  "aria-describedby"?: string;
  /** Id of the input; defaults to the id of an enclosing FormControl */
  id?: string;
  /**
   * Marks the input as required; defaults to the enclosing FormControl's state
   */
  required?: boolean;
  /**
   * Shows the value without allowing changes (typing, panel, clearing);
   * defaults to the enclosing FormControl's state
   */
  readOnly?: boolean;
  /**
   * Marks the input as invalid (aria-invalid); defaults to the enclosing
   * FormControl's state
   */
  invalid?: boolean;
  /**
   * Name of the input
   * @default "date-picker"
   */
  name?: string;
  /** Called when the popup calendar opens or closes */
  onOpenChange?: (open: boolean) => void;
  /**
   * Disables the picker; defaults to the enclosing FormControl's state
   * @default false
   */
  disabled?: boolean;
  /**
   * Allows clearing the value with the suffix button
   * @default true
   */
  clearable?: boolean;
  /**
   * Size of the input
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
  /**
   * Earliest selectable date (`"YYYY-MM-DD"`); earlier days are disabled
   */
  minDate?: string;
  /**
   * Latest selectable date (`"YYYY-MM-DD"`); later days are disabled
   */
  maxDate?: string;
  /**
   * Locale of the month heading (`Intl.DateTimeFormat`)
   * @default the library language
   */
  locale?: string;
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /** Inline styles of the root element */
  style?: CSSProperties;
}
