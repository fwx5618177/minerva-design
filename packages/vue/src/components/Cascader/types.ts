import type { CSSProperties, HTMLAttributes } from "vue";

export interface CascaderOption {
  /** Value of the option, unique among its siblings */
  value: string | number;
  /** Text displayed for the option */
  label: string | number;
  /** Options of the next level */
  children?: CascaderOption[];
  /** Prevents the option from being selected */
  disabled?: boolean;
  /** Marks the option as a leaf (no children to load) when using loadData */
  isLeaf?: boolean;
  /** Shows a loading indicator while its children are being loaded */
  loading?: boolean;
}

/** A selected path of values (one per level) */
export type CascaderValue = (string | number)[];

/**
 * Props of `Cascader` (same names and defaults as the React `CascaderProps`;
 * the selected path is the `v-model`). `class`, `style` and `data-*`
 * attributes go to the root element.
 */
export interface CascaderProps {
  /** Label of the input */
  label: string;
  /** Name of the input */
  name: string;
  /**
   * Option tree
   * @default []
   */
  options: CascaderOption[];
  /** Selected path of values (controlled, `v-model`) */
  modelValue?: CascaderValue;
  /** Initially selected path of values (uncontrolled) */
  defaultValue?: CascaderValue;
  /** Formats the text shown in the input; by default labels are joined with " / " */
  displayRender?: (
    labels: string[],
    selectedOptions: CascaderOption[],
  ) => string;
  /**
   * Disables the cascader; defaults to the enclosing FormControl's state
   * @default false
   */
  disabled?: boolean;
  /**
   * Placeholder of the input
   * @default "Please select" (localized)
   */
  placeholder?: string;
  /**
   * Shows a clear button when a value is selected
   * @default true
   */
  allowClear?: boolean;
  /**
   * How sub-menus are expanded
   * @default "click"
   */
  expandTrigger?: "click" | "hover";
  /**
   * Accessible label of the input (`aria-label`); overrides `label` and the
   * label of an enclosing FormControl
   */
  ariaLabel?: string;
  /** Id(s) of the element(s) labelling the input (`aria-labelledby`) */
  ariaLabelledby?: string;
  /**
   * Id(s) of the element(s) describing the input (`aria-describedby`);
   * merged with the helper / error text of an enclosing FormControl
   */
  ariaDescribedby?: string;
  /** Id of the input; defaults to the id of an enclosing FormControl */
  id?: string;
  /**
   * Marks the input as required (aria-required); defaults to the enclosing
   * FormControl's state
   */
  required?: boolean;
  /**
   * Shows the value without allowing changes (the dropdown does not open);
   * defaults to the enclosing FormControl's state
   */
  readOnly?: boolean;
  /**
   * Marks the input as invalid (aria-invalid); defaults to the enclosing
   * FormControl's state
   */
  invalid?: boolean;
  /**
   * Allows typing to search all paths
   * @default false
   */
  showSearch?: boolean;
  /** Custom search predicate; by default paths whose labels contain the input match */
  filter?: (inputValue: string, path: CascaderOption[]) => boolean;
  /**
   * Loads children lazily: clicking an option that has no children and is
   * not isLeaf expands it and calls loadData with its path (instead of
   * selecting it). Add the children to `options` yourself; set `loading` on
   * the option meanwhile
   */
  loadData?: (selectedOptions: CascaderOption[]) => void;
  /** Additional class name of the dropdown */
  dropdownClassName?: HTMLAttributes["class"];
  /**
   * Width of the component
   * @default 240
   */
  width?: number | string;
  /**
   * Maximum number of levels shown
   * @default 6
   */
  maxLevel?: number;
  /** Inline styles of the dropdown */
  dropdownStyle?: CSSProperties;
  /** Inline styles of every option */
  optionStyle?: CSSProperties;
}

/**
 * Props of the internal column panel rendered in the Cascader dropdown
 * (events: `activate(path, level)`, `hoverExpand(path)`, `exit()`).
 */
export interface CascaderPanelProps {
  /** Label used to name the columns */
  label?: string;
  /** Option tree */
  options: CascaderOption[];
  /** Options of the expanded path (one per level) */
  expandedPath: CascaderOption[];
  /** Options of the selected path (one per level) */
  selectedPath: CascaderOption[];
  /**
   * How sub-menus are expanded
   * @default "click"
   */
  expandTrigger?: "click" | "hover";
  /**
   * Maximum number of levels shown
   * @default 6
   */
  maxLevel?: number;
  /** Inline styles of every option */
  optionStyle?: CSSProperties;
  /**
   * Focus an option when mounted (keyboard opening)
   * @default false
   */
  autoFocus?: boolean;
}
