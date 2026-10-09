import type { ComputedRef, Ref } from "vue";
export interface MiniPopoverContext {
  open: ComputedRef<boolean>;
  disabled: ComputedRef<boolean | undefined>;
  placement: ComputedRef<string>;
  modal: ComputedRef<boolean>;
  setOpen: (value: boolean) => void;
  trigger: Ref<unknown>;
  anchor: Ref<unknown>;
  anchorId: Ref<string>;
  triggerId: string;
  measureTrigger?: (
    callback: (rect: {
      left: number;
      right: number;
      top: number;
      bottom: number;
      width: number;
      height: number;
    }) => void,
  ) => void;
  measureAnchor?: (
    callback: (rect: {
      left: number;
      right: number;
      top: number;
      bottom: number;
      width: number;
      height: number;
    }) => void,
  ) => void;
}
