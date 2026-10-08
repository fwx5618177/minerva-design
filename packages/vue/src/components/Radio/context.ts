import type { ComputedRef, InjectionKey } from "vue";
import type { RadioColor } from "./types";

/** State a RadioGroup shares with its radios */
export interface RadioGroupContext {
  value: ComputedRef<string | number | null | undefined>;
  disabled: ComputedRef<boolean>;
  name: ComputedRef<string>;
  size: ComputedRef<"small" | "medium" | "large" | undefined>;
  color: ComputedRef<RadioColor | undefined>;
  onChange: (value: string | number, event: Event) => void;
  /** Registers the DOM sync of a radio (`checked` follows the group value) */
  register: (sync: () => void) => () => void;
}

export const RADIO_GROUP_KEY: InjectionKey<RadioGroupContext> = Symbol(
  "minerva-radio-group",
);
