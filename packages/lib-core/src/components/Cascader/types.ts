import { ReactNode } from "react";

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
  /** Selected path of values (controlled) */
  value?: (string | number)[];
  /** Initially selected path of values (uncontrolled) */
  defaultValue?: (string | number)[];
  /** Called when a leaf option is selected or the value is cleared */
  onChange?: (
    value: (string | number)[],
    selectedOptions: CascaderOption[],
  ) => void;
  /** Formats the text shown in the input; by default labels are joined with " / " */
  displayRender?: (
    labels: string[],
    selectedOptions: CascaderOption[],
  ) => string;
  /**
   * Disables the cascader
   * @default false
   */
  disabled?: boolean;
  /**
   * Placeholder of the input
   * @default "Please select"
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
  /** Additional class name */
  className?: string;
  /**
   * Allows typing to search all paths
   * @default false
   */
  showSearch?: boolean;
  /** Custom search predicate; by default paths whose labels contain the input match */
  filter?: (inputValue: string, path: CascaderOption[]) => boolean;
  /** Loads children lazily for options without children that are not isLeaf; update options yourself */
  loadData?: (selectedOptions: CascaderOption[]) => void;
  /** Additional class name of the dropdown */
  dropdownClassName?: string;
  /** Custom option renderer */
  optionRender?: (option: CascaderOption, level: number) => ReactNode;
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
  dropdownStyle?: React.CSSProperties;
  /** Inline styles of every option */
  optionStyle?: React.CSSProperties;
}

export interface CascaderPanelProps extends Omit<
  CascaderProps,
  "value" | "defaultValue"
> {
  /** 当前选中的路径 */
  activePath?: CascaderOption[];
  /** 面板展开的层级 */
  activeLevel?: number;
  /** 选择某一级时的回调 */
  onLevelSelect?: (option: CascaderOption, level: number) => void;
  maxLevel?: number;
  optionStyle?: React.CSSProperties;
}
