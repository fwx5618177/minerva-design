import type { EmptyProps } from "../Empty";
import type { TextFieldProps } from "../TextField";
import type { PopperProps } from "../Popper";

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
  /** Name of the input */
  name: string;
  /** Label of the input */
  label: string;
  /**
   * "basic" renders icon / label / description; "custom" uses renderOption
   * @default "basic"
   */
  mode?: "basic" | "custom";
  /** Input value (controlled) */
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
  /** Called when an option is selected (mouse or keyboard) */
  onSelect?: (option: AutoCompleteOption) => void;
  /** Returns the group name of an option; options are grouped under headings */
  groupBy?: (option: AutoCompleteOption) => string;
  /**
   * Allows selecting several options, shown as removable tags
   * @default false
   */
  multiple?: boolean;
  /** Maximum number of tags shown in multiple mode; the rest are summarized as "+N" */
  maxTagCount?: number;
  /** Custom option renderer (used when mode is "custom") */
  renderOption?: (option: AutoCompleteOption) => React.ReactNode;
  /** Custom content shown when no option matches */
  renderEmpty?: () => React.ReactNode;
  /**
   * Shows a loading indicator in the dropdown
   * @default false
   */
  loading?: boolean;
  /** Props forwarded to the underlying TextField */
  textFieldProps?: Omit<
    TextFieldProps,
    "value" | "onChange" | "name" | "label"
  >;
  /** Props forwarded to the default Empty state */
  emptyProps?: Omit<EmptyProps, "children">;
  /** Props forwarded to the dropdown Popper */
  popperProps?: Omit<PopperProps, "anchorEl" | "visible" | "children">;
  /**
   * Dropdown placement
   * @default "bottom"
   */
  placement?: "top" | "bottom" | "left" | "right";
  /**
   * Dropdown offset
   * @default { x: 0, y: 4 }
   */
  offset?: PopperProps["offset"];
  /** Background color of the dropdown */
  dropdownBgColor?: string;
  /** Background color of highlighted options */
  highlightBgColor?: string;
  /** Background color of hovered / keyboard-focused options */
  hoverBgColor?: string;
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
}

/**
 * AutoComplete 输入框属性接口
 */
export interface AutoCompleteInputProps extends TextFieldProps {
  ref?: React.Ref<HTMLInputElement>;
  value: string;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: React.FocusEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
}
