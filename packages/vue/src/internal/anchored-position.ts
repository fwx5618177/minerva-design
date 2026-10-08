import {
  computed,
  shallowRef,
  toValue,
  watch,
  type CSSProperties,
  type ComputedRef,
  type MaybeRefOrGetter,
  type Ref,
} from "vue";
import {
  autoPosition,
  computeAnchoredPosition,
  fromCamelPlacement,
  getTransformOrigin,
  toCamelPlacement,
  VIEWPORT_PADDING,
  type AnchoredPositionResult,
  type Placement,
  type VirtualElement,
} from "@minerva/dom";

export type { Placement, VirtualElement };
export { VIEWPORT_PADDING, toCamelPlacement };

/** `"bottomStart"` / `"bottom-start"` -> `"bottom-start"` */
export const toPlacement = (value: string): Placement =>
  fromCamelPlacement(value);

export interface AnchoredPositionOptions {
  open: boolean;
  anchor: Element | VirtualElement | null | undefined;
  placement?: Placement;
  offset?: { mainAxis?: number; crossAxis?: number };
  flip?: boolean;
  shift?: boolean;
  matchAnchorWidth?: false | "min" | "exact";
  fitViewportHeight?: boolean;
  arrowElement?: HTMLElement | null;
  padding?: number;
}

export interface AnchoredPosition {
  /** The floating element (bind with `:ref="(el) => floating = el"`) */
  floating: Ref<HTMLElement | null>;
  floatingStyles: ComputedRef<CSSProperties>;
  placement: ComputedRef<Placement>;
  arrowStyles: ComputedRef<CSSProperties>;
  isPositioned: ComputedRef<boolean>;
  update: () => void;
}

interface PositionState {
  x: number;
  y: number;
  placement: Placement;
  arrow: { x?: number; y?: number };
  key: object | null;
}

/**
 * Anchored positioning (@floating-ui/dom through @minerva/dom): keeps the
 * floating element next to its anchor while open (scroll, resize, layout
 * shifts), with flip / shift / size / arrow.
 */
export function useAnchoredPosition(
  options: MaybeRefOrGetter<AnchoredPositionOptions>,
): AnchoredPosition {
  const floating = shallowRef<HTMLElement | null>(null);
  const opts = computed(() => toValue(options));
  const state = shallowRef<PositionState>({
    x: 0,
    y: 0,
    placement: opts.value.placement ?? "bottom",
    arrow: {},
    key: null,
  });
  const runKey = shallowRef<object | null>(null) as Ref<object | null>;

  const config = computed(() => {
    const o = opts.value;
    return {
      placement: o.placement ?? "bottom",
      offset: {
        mainAxis: o.offset?.mainAxis ?? 8,
        crossAxis: o.offset?.crossAxis ?? 0,
      },
      flip: o.flip ?? true,
      shift: o.shift ?? true,
      matchAnchorWidth: o.matchAnchorWidth ?? false,
      fitViewportHeight: o.fitViewportHeight ?? false,
      arrowElement: o.arrowElement,
      padding: o.padding ?? VIEWPORT_PADDING,
    };
  });

  const apply = (result: AnchoredPositionResult, key: object) => {
    const prev = state.value;
    if (
      prev.x === result.x &&
      prev.y === result.y &&
      prev.placement === result.placement &&
      prev.arrow.x === result.arrow.x &&
      prev.arrow.y === result.arrow.y &&
      prev.key === key
    ) {
      return;
    }
    state.value = {
      x: result.x,
      y: result.y,
      placement: result.placement,
      arrow: result.arrow,
      key,
    };
  };

  watch(
    [() => opts.value.open, () => opts.value.anchor, floating, config],
    ([open, anchor, el, cfg], _prev, onCleanup) => {
      if (!open || !anchor || !el) {
        runKey.value = null;
        return;
      }
      const key = {};
      runKey.value = key;
      const stop = autoPosition(anchor, el, cfg, (result) =>
        apply(result, key),
      );
      onCleanup(() => {
        stop();
        if (runKey.value === key) runKey.value = null;
      });
    },
    { immediate: true, flush: "post" },
  );

  const update = () => {
    const key = runKey.value;
    const anchor = opts.value.anchor;
    const el = floating.value;
    if (!key || !anchor || !el) return;
    void computeAnchoredPosition(anchor, el, config.value).then((result) => {
      if (runKey.value === key) apply(result, key);
    });
  };

  const isPositioned = computed(
    () =>
      opts.value.open &&
      !!opts.value.anchor &&
      !!floating.value &&
      runKey.value !== null &&
      state.value.key === runKey.value,
  );
  const placement = computed(() =>
    isPositioned.value ? state.value.placement : config.value.placement,
  );
  const floatingStyles = computed(
    () =>
      ({
        position: "fixed",
        left: `${isPositioned.value ? state.value.x : 0}px`,
        top: `${isPositioned.value ? state.value.y : 0}px`,
        "--minerva-transform-origin": getTransformOrigin(
          placement.value,
          isPositioned.value ? state.value.arrow : undefined,
        ),
      }) as CSSProperties,
  );
  const arrowStyles = computed<CSSProperties>(() =>
    isPositioned.value
      ? {
          left:
            state.value.arrow.x != null
              ? `${state.value.arrow.x}px`
              : undefined,
          top:
            state.value.arrow.y != null
              ? `${state.value.arrow.y}px`
              : undefined,
        }
      : {},
  );

  return {
    floating,
    floatingStyles,
    placement,
    arrowStyles,
    isPositioned,
    update,
  };
}
