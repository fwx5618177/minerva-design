import {
  computed,
  defineComponent,
  inject,
  provide,
  type InjectionKey,
  type PropType,
} from "vue";
import { LAYER_KEY } from "../../internal/scope";

/** Shared configuration of the Tooltips inside a `TooltipProvider`. */
export interface TooltipConfig {
  readonly enterDelay: number | undefined;
  readonly leaveDelay: number | undefined;
  /** Records that a tooltip of the provider just closed */
  markClosed: () => void;
  /** Whether a tooltip closed recently enough to open the next instantly */
  shouldSkipDelay: () => boolean;
}

export const TOOLTIP_CONFIG_KEY: InjectionKey<TooltipConfig> = Symbol(
  "minerva-tooltip-config",
);

/** Configuration of the closest `TooltipProvider`, if any. */
export const useTooltipConfig = (): TooltipConfig | null =>
  inject(TOOLTIP_CONFIG_KEY, null);

/**
 * Makes `element` the parent dismissable layer of its slot only (the
 * tooltip content), not of the trigger rendered next to it.
 */
export const LayerScope = defineComponent({
  name: "MinervaLayerScope",
  props: {
    element: { type: Object as PropType<Element | null>, default: null },
  },
  setup(props, { slots }) {
    provide(
      LAYER_KEY,
      computed(() => props.element),
    );
    return () => slots.default?.();
  },
});
