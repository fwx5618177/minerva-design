import type { CSSProperties, VNodeChild } from "vue";
import type { EmptyProps } from "../Empty";

/** An option of the AutoComplete dropdown */
export interface AutoCompleteOption {
  /** Text displayed for the option and written to the input when selected */
  label: string;
  /** Unique value of the option */
  value: string | number;
  /** Prevents the option from being selected */
  disabled?: boolean;
  /** Highlights the option (e.g. as a recommendation) */
  highlight?: boolean;
  /**
   * Icon displayed before the label (basic mode): a vnode, or a function
   * rendering it
   */
  icon?: VNodeChild | (() => VNodeChild);
  /** Secondary text displayed under the label (basic mode) */
  description?: string;
  /** Free-form group identifier, typically read by groupBy */
  group?: string;
  /** Inline styles of the option */
  style?: CSSProperties;
}

/**
 * Props of `AutoComplete` (same names and defaults as the React
 * `AutoCompleteProps`). The input text is `v-model` (`modelValue`;
 * uncontrolled: `defaultValue`). Render props are slots: `option`
 * (`renderOption`, scoped with `{ option }`) and `empty` (`renderEmpty`).
 */
export interface AutoCompleteProps {
  /** Name of the input */
  name?: string;
  /**
   * Label of the input (without it, give the input an accessible name with
   * inputProps["aria-label"] or an enclosing FormControl label)
   */
  label?: string;
  /**
   * "basic" renders icon / label / description; "custom" uses the `option`
   * slot
   * @default "basic"
   */
  mode?: "basic" | "custom";
  /** Input text (controlled, `v-model`) */
  modelValue?: string;
  /**
   * Options to suggest
   * @default []
   */
  options?: AutoCompleteOption[];
  /**
   * Initial input value (uncontrolled)
   * @default ""
   */
  defaultValue?: string;
  /** Returns the group name of an option; options are grouped under headings */
  groupBy?: (option: AutoCompleteOption) => string;
  /**
   * Shows a loading indicator in the dropdown
   * @default false
   */
  loading?: boolean;
  /**
   * Props / attributes forwarded to the underlying Input (native
   * attributes, aria-label, size, variant, prefix / suffix, clearable,
   * disabled, readOnly, listeners...)
   */
  inputProps?: Record<string, unknown>;
  /** Props forwarded to the default Empty state */
  emptyProps?: Partial<EmptyProps>;
  /**
   * Additional class name of the dropdown (teleported) element. It can set
   * the CSS custom properties `--auto-complete-dropdown-background`,
   * `--auto-complete-option-hover-background` and
   * `--auto-complete-option-highlight-background`
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
  /**
   * Makes the first enabled option active whenever the dropdown opens or the
   * options change, so Enter picks it right away
   * @default false
   */
  autoHighlight?: boolean;
  /**
   * Writes the label of the picked option into the input. Set to false to
   * keep the typed text, e.g. when picking navigates away
   * @default true
   */
  fillOnSelect?: boolean;
  /**
   * How groupBy groups options: "first" collects each group at its first
   * appearance; "adjacent" groups runs of consecutive options (a group can
   * appear several times). Options whose group is "" get no heading
   * @default "first"
   */
  groupMode?: "first" | "adjacent";
}
