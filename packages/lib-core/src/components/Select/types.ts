import type { Ref } from "react";

/** Size of the Select trigger */
export type SelectSize = "small" | "medium" | "large";

/**
 * Props of the Select component (a single-choice dropdown built on Radix
 * Select: combobox trigger + listbox popup with full keyboard support)
 */
export interface SelectProps {
  /** Selected value (controlled; pair with onChange) */
  value?: string;
  /** Initially selected value (uncontrolled) */
  defaultValue?: string;
  /** Called with the value of the newly selected item */
  onChange?: (value: string) => void;
  /** Whether the popup is open (controlled; pair with onOpenChange) */
  open?: boolean;
  /**
   * Whether the popup is initially open (uncontrolled)
   * @default false
   */
  defaultOpen?: boolean;
  /** Called when the popup opens or closes */
  onOpenChange?: (open: boolean) => void;
  /** Text shown in the trigger while nothing is selected */
  placeholder?: React.ReactNode;
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
  /** Accessible label of the trigger, required when there is no visible label */
  ariaLabel?: string;
  /** Extra ids of elements describing the trigger (aria-describedby) */
  ariaDescribedBy?: string;
  /** Additional class name of the trigger */
  className?: string;
  /** Additional class name of the popup */
  contentClassName?: string;
  /** SelectItem / SelectGroup / SelectLabel / SelectSeparator elements */
  children: React.ReactNode;
  /** Ref to the trigger <button> */
  ref?: Ref<HTMLButtonElement>;
}

/** Props of an option of a Select */
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
  /** Additional class name */
  className?: string;
  /** Content of the option */
  children: React.ReactNode;
  /** Ref to the option element */
  ref?: Ref<HTMLDivElement>;
}

/** Props of a group of Select options */
export interface SelectGroupProps {
  /** Additional class name */
  className?: string;
  /** SelectLabel and SelectItem elements */
  children?: React.ReactNode;
  /** Ref to the group element */
  ref?: Ref<HTMLDivElement>;
}

/** Props of the label of a SelectGroup */
export interface SelectLabelProps {
  /** Additional class name */
  className?: string;
  /** Label content */
  children?: React.ReactNode;
  /** Ref to the label element */
  ref?: Ref<HTMLDivElement>;
}

/** Props of a separator between Select options */
export interface SelectSeparatorProps {
  /** Additional class name */
  className?: string;
  /** Ref to the separator element */
  ref?: Ref<HTMLDivElement>;
}
