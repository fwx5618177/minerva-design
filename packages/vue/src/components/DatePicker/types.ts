/** DatePicker uses YYYY-MM-DD strings; null and empty string are controlled empty values. */
export interface DatePickerProps {
  modelValue?: string | null;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  id?: string;
  required?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  name?: string;
  disabled?: boolean;
  clearable?: boolean;
  size?: "small" | "medium" | "large";
  minDate?: string;
  maxDate?: string;
  locale?: string;
}
export interface DatePickerEmits {
  "update:modelValue": [value: string];
  change: [value: string];
  openChange: [open: boolean];
}
