import type { ComputedRef } from "vue";
export interface RadioContext {
  value: ComputedRef<string | number | null | undefined>;
  disabled: ComputedRef<boolean | undefined>;
  readOnly: ComputedRef<boolean | undefined>;
  name: ComputedRef<string>;
  size: ComputedRef<string | undefined>;
  color: ComputedRef<string | undefined>;
  error: ComputedRef<boolean>;
  required: ComputedRef<boolean | undefined>;
  describedBy: ComputedRef<string | undefined>;
  tabStop: (id: string) => boolean;
  register: (
    id: string,
    value: ComputedRef<string | number | undefined>,
    disabled: ComputedRef<boolean | undefined>,
  ) => () => void;
  select: (value: string | number, event?: unknown) => void;
}
