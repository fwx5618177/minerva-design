import type { ComputedRef } from "vue";
export interface MenuEntry {
  key?: string;
  value?: string;
  label?: string;
  type?: "checkbox" | "radio-group" | "group" | "separator";
  icon?: string;
  shortcut?: string;
  textValue?: string;
  disabled?: boolean;
  danger?: boolean;
  closeOnSelect?: boolean;
  children?: MenuEntry[];
  items?: MenuEntry[];
  checked?: boolean;
  defaultChecked?: boolean;
  defaultValue?: string;
  onCheckedChange?: (checked: boolean) => void;
  onValueChange?: (value: string) => void;
}
export interface MenuState {
  disabled: ComputedRef<boolean>;
  dir: ComputedRef<"ltr" | "rtl">;
  checked: (item: MenuEntry) => boolean;
  radio: (item: MenuEntry) => string | undefined;
  expanded: ComputedRef<string[]>;
  active: ComputedRef<string>;
  choose: (item: MenuEntry, radioGroup?: MenuEntry) => void;
  close: (key?: string) => void;
  focus: (key: string) => void;
}
