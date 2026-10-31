<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  toRaw,
  useAttrs,
  watch,
  type PropType,
} from "vue";
import {
  createIconCanvas,
  type IconCanvasController,
  type IconCanvasItem,
  type IconRendererKind,
  type IconRendererPreference,
} from "minerva-design/icons/core";
import { cssSize } from "./props";

/**
 * Many icons on one canvas: one instanced GPU draw per run of identical
 * icons (WebGPU, WebGL2, WebGL) or Canvas2D. For dense pictures, maps,
 * particles, animations of thousands of icons; for icons in the UI, use
 * `Icon`. With `renderer` unset or `auto`, it follows the global default
 * (`setDefaultIconRenderer`) live.
 */
defineOptions({ name: "IconCanvas" });
const props = defineProps({
  /** Icons to draw, in painting order (later ones on top), positions in CSS pixels */
  items: { type: Array as PropType<readonly IconCanvasItem[]>, required: true },
  /** Backend preference; `auto` follows the global default */
  renderer: {
    type: String as PropType<IconRendererPreference>,
    default: "auto",
  },
  /** Width (a number is in pixels) */
  width: {
    type: [Number, String] as PropType<number | string>,
    default: "100%",
  },
  /** Height (a number is in pixels) */
  height: { type: [Number, String] as PropType<number | string>, default: 240 },
  /** Device pixel ratio (`window.devicePixelRatio` by default) */
  pixelRatio: Number,
  /** Accessible name of the whole picture (`role="img"`); without it the canvas is hidden from assistive technologies */
  title: String,
});
const emit = defineEmits<{
  /** The backend started, and again after a fallback */
  rendererChange: [kind: IconRendererKind];
}>();
const attrs = useAttrs();
const container = ref<HTMLDivElement | null>(null);
let controller: IconCanvasController | null = null;

const a11y = computed(() =>
  props.title || attrs["aria-label"] || attrs["aria-labelledby"]
    ? {
        role: (attrs.role as string | undefined) ?? "img",
        ...(props.title ? { "aria-label": props.title } : {}),
      }
    : {
        "aria-hidden":
          (attrs["aria-hidden"] as boolean | "true" | "false" | undefined) ??
          ("true" as const),
      },
);

onMounted(() => {
  if (!container.value) return;
  controller = createIconCanvas(container.value, {
    items: toRaw(props.items),
    renderer: props.renderer,
    pixelRatio: props.pixelRatio,
    onRendererChange: (kind) => emit("rendererChange", kind),
  });
  watch(
    () => props.items,
    (items) => controller?.setItems(toRaw(items)),
  );
  watch([() => props.renderer, () => props.pixelRatio], ([renderer, ratio]) =>
    controller?.setOptions({ renderer, pixelRatio: ratio }),
  );
});

onBeforeUnmount(() => {
  controller?.destroy();
  controller = null;
});

defineExpose({
  /** The backend drawing (null until it started) */
  getRenderer: (): IconRendererKind | null => controller?.renderer ?? null,
  /** The `<canvas>` element (null before mount) */
  getCanvas: (): HTMLCanvasElement | null => controller?.canvas ?? null,
  /** Resolves once the backend started and the current items are drawn */
  ready: (): Promise<IconRendererKind> =>
    controller?.ready() ??
    Promise.reject(new Error("IconCanvas is not mounted")),
});
</script>

<template>
  <div
    ref="container"
    class="minerva-icon-canvas"
    v-bind="a11y"
    :style="{
      position: 'relative',
      width: cssSize(width),
      height: cssSize(height),
    }"
  />
</template>
