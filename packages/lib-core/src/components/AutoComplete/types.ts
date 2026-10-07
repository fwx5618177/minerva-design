import type { Ref } from "react";
import type { EmptyProps } from "../Empty";
import type { InputProps } from "../Input";

/**
 * An option of the AutoComplete dropdown
 */
export interface AutoCompleteOption {
  /** Text displayed for the option and written to the input when selected */
  label: string;
  /** Unique value of the option */
  value: string | number;
  /** Prevents the option from being selected */
  disabled?: boolean;
  /** Highlights the option (e.g. as a recommendation) */
  highlight?: boolean;
  /** Icon displayed before the label (basic mode) */
  icon?: React.ReactNode;
  /** Secondary text displayed under the label (basic mode) */
  description?: string;
  /** Free-form group identifier, typically read by groupBy */
  group?: string;
  /** Inline styles of the option */
  style?: React.CSSProperties;
}

/**
 * Props of the AutoComplete component
 */
export interface AutoCompleteProps {
  /** Ref to the inner <input> element */
  ref?: Ref<HTMLInputElement>;
  /** Name of the input */
  name?: string;
  /**
   * Label of the input (without it, give the input an accessible name with
   * inputProps["aria-label"] or an enclosing FormControl label)
   */
  label?: string;
  /**
   * "basic" renders icon / label / description; "custom" uses renderOption
   * @default "basic"
   */
  mode?: "basic" | "custom";
  /** Input text (controlled; pair with onChange) */
  value?: string;
  /** Called when the input text changes (typing or selecting an option) */
  onChange?: (value: string) => void;
  /**
   * Options to suggest
   * @default []
   */
  options: AutoCompleteOption[];
  /**
   * Initial input value (uncontrolled)
   * @default ""
   */
  defaultValue?: string;
  /** Called when an option is picked (mouse or keyboard) */
  onSelect?: (option: AutoCompleteOption) => void;
  /** Returns the group name of an option; options are grouped under headings */
  groupBy?: (option: AutoCompleteOption) => string;
  /** Custom option renderer (used when mode is "custom") */
  renderOption?: (option: AutoCompleteOption) => React.ReactNode;
  /** Custom content shown when no option matches */
  renderEmpty?: () => React.ReactNode;
  /**
   * Shows a loading indicator in the dropdown
   * @default false
   */
  loading?: boolean;
  /**
   * Props forwarded to the underlying Input (native attributes, aria-label,
   * size, variant, prefix / suffix, clearable...)
   */
  inputProps?: Omit<
    InputProps,
    "value" | "defaultValue" | "onChange" | "name" | "ref"
  >;
  /** Props forwarded to the default Empty state */
  emptyProps?: Omit<EmptyProps, "children">;
  /**
   * Additional class name of the dropdown (portalled) element. It can set the
   * CSS custom properties `--autocomplete-dropdown-bg`,
   * `--autocomplete-option-hover-bg` and `--autocomplete-option-highlight-bg`
   * to recolor the dropdown, hovered options and highlighted options
   */
  dropdownClassName?: string;
  /**
   * Preferred dropdown side; the dropdown is aligned with the input's start
   * edge, is at least as wide as the input, and flips / shifts to stay in the
   * viewport
   * @default "bottom"
   */
  placement?: "top" | "bottom" | "left" | "right";
  /**
   * Dropdown offset in pixels. For top / bottom placements `y` is the gap to
   * the input and `x` shifts along it; for left / right placements `x` is
   * the gap and `y` shifts along it
   * @default { x: 0, y: 4 }
   */
  offset?: { x: number; y: number };
  /**
   * Animates the dropdown when it opens
   * @default true
   */
  animation?: boolean;
  /** Custom filter; by default options whose label contains the input (case-insensitive) are shown */
  filterOption?: (inputValue: string, option: AutoCompleteOption) => boolean;
  /** Compare function used to sort the filtered options */
  sortOption?: (a: AutoCompleteOption, b: AutoCompleteOption) => number;
  /** Called when an option is clicked with the mouse */
  onOptionClick?: (option: AutoCompleteOption) => void;
  /** Called when the dropdown opens or closes */
  onDropdownVisibleChange?: (visible: boolean) => void;
  /**
   * Called with the trimmed input text when Enter is pressed while no option
   * is active (e.g. to run a search); the dropdown closes
   */
  onSubmit?: (value: string) => void;
  /**
   * Makes the first enabled option active whenever the dropdown opens or the
   * options change, so Enter picks it right away
   * @default false
   */
  autoHighlight?: boolean;
  /**
   * Writes the label of the picked option into the input. Set
   * to false to keep the typed text, e.g. when picking navigates away
   * @default true
   */
  fillOnSelect?: boolean;
  /** Additional class name of the root element */
  className?: string;
  /**
   * How groupBy groups options: "first" collects each group at its first
   * appearance; "adjacent" groups runs of consecutive options (a group can
   * appear several times). Options whose group is "" get no heading
   * @default "first"
   */
  groupMode?: "first" | "adjacent";
}
