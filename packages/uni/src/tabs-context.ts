import type { ComputedRef, Ref } from "vue";
export interface TabsContext {
  value: ComputedRef<string | undefined>;
  focused: Ref<string | undefined>;
  disabled: ComputedRef<boolean | undefined>;
  orientation: ComputedRef<"horizontal" | "vertical">;
  dir: ComputedRef<"ltr" | "rtl">;
  automatic: ComputedRef<boolean>;
  color: ComputedRef<string>;
  select: (value: string) => void;
  register: (
    value: string,
    disabled: () => boolean,
    element: () => unknown,
  ) => () => void;
  tabId: (value: string) => string;
  panelId: (value: string) => string;
}
