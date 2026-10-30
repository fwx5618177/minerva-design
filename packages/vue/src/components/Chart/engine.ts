import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  toRaw,
  watch,
  type CSSProperties,
  type Ref,
  type ShallowRef,
} from "vue";

/**
 * What a chart engine factory of `minerva-design/charts/core` returns
 * (`createChart`, `createShapeChart`, ...): options can be replaced, the
 * instance destroyed.
 */
export interface EngineInstance<O> {
  setOptions(options: O): void;
  destroy(): void;
}

/** The raw object behind a reactive proxy (the engine never reads through proxies) */
export const raw = <T>(value: T): T =>
  value !== null && typeof value === "object" ? toRaw(value) : value;

/**
 * Mounts a chart engine of `minerva-design/charts/core` into `container`
 * on mount (client only: nothing runs during SSR), passes new options when
 * a prop changes (`deep: true` also follows in-place mutations of nested
 * data), and destroys it before unmount. `build` returns the engine options
 * of the current props, `null` while there is nothing to draw.
 *
 * Any engine works: `useChartEngine(createTradingChart, props, build, bind)`.
 * `source` narrows what triggers `setOptions` (every prop by default), for
 * the props passed through engine methods instead (an order book's `book`).
 */
export function useChartEngine<O, I extends EngineInstance<O>>(
  factory: (container: HTMLElement, options: O) => I,
  props: object & { deep?: boolean },
  build: () => O | null,
  bind?: (engine: I) => Array<() => void>,
  source: () => unknown = () => ({ ...props }),
): {
  container: Ref<HTMLElement | null>;
  setContainer: (el: unknown) => void;
  instance: ShallowRef<I | null>;
} {
  const container = ref<HTMLElement | null>(null);
  const instance = shallowRef(null) as ShallowRef<I | null>;
  let offs: Array<() => void> = [];

  const mount = () => {
    if (instance.value || !container.value) return;
    const options = build();
    if (!options) return;
    const engine = factory(container.value, options);
    instance.value = engine;
    offs = bind?.(engine) ?? [];
  };

  onMounted(mount);
  watch(
    // every prop (by identity; nested values too with `deep`)
    source,
    () => {
      if (!instance.value) return mount();
      const options = build();
      if (options) instance.value.setOptions(options);
    },
    { deep: !!props.deep },
  );
  onBeforeUnmount(() => {
    for (const off of offs) off();
    offs = [];
    instance.value?.destroy();
    instance.value = null;
  });
  return {
    container,
    // template function ref: `<div :ref="setContainer">`
    setContainer: (el) => {
      container.value = (el as HTMLElement | null) ?? null;
    },
    instance,
  };
}

const cssSize = (value: number | string) =>
  typeof value === "number" ? `${value}px` : value;

/** Style of the sized root box of a chart */
export const useRootStyle = (
  props: { width?: number | string; height?: number | string },
  defaultHeight: number | (() => number),
) =>
  computed<CSSProperties>(() => ({
    position: "relative",
    width: cssSize(props.width ?? "100%"),
    height: cssSize(
      props.height ??
        (typeof defaultHeight === "number" ? defaultHeight : defaultHeight()),
    ),
  }));
