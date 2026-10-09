import type { ComputedRef } from "vue";
export interface MiniSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
export interface MiniSelectContext {
  value: ComputedRef<string>;
  query: ComputedRef<string>;
  disabled: ComputedRef<boolean | undefined>;
  active: ComputedRef<string | undefined>;
  register: (option: MiniSelectOption) => void;
  unregister: (value: string) => void;
  choose: (option: MiniSelectOption) => void;
  keydown: (event: KeyboardEvent) => void;
}
