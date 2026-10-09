import type { ComputedRef, Ref } from "vue";
export interface MiniTooltipContext {
  enterDelay: ComputedRef<number>;
  leaveDelay: ComputedRef<number>;
  skipDelay: ComputedRef<number>;
  lastClosed: Ref<number>;
}
