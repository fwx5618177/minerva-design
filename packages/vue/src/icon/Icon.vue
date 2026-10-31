<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  useAttrs,
  watch,
  watchEffect,
  type PropType,
} from "vue";
import type {
  IconDefinition,
  IconRendererKind,
  IconSurface,
} from "minerva-design/icons/core";
import { cssSize, iconStyleProps } from "./props";

type SurfaceFactory =
  typeof import("minerva-design/icons/surface").createIconSurface;

/**
 * An icon of minerva-design/icons: inline SVG by default (crisp, styled by
 * CSS, server-rendered), or a canvas drawn with WebGPU, WebGL2, WebGL or
 * Canvas2D (`renderer`). The color follows the text color unless set.
 */
defineOptions({ name: "Icon" });
const props = defineProps({
  /** The icon to draw: a built-in one (e.g. `searchIcon`) or a `defineIcon` result */
  icon: { type: Object as PropType<IconDefinition>, required: true },
  ...iconStyleProps,
});
const emit = defineEmits<{
  /** Canvas renderers: the backend that drew the icon */
  rendererChange: [kind: IconRendererKind];
}>();
const attrs = useAttrs();

const labelled = computed(
  () => !!props.title || !!attrs["aria-label"] || !!attrs["aria-labelledby"],
);
const a11y = computed(() =>
  labelled.value
    ? {
        role: (attrs.role as string | undefined) ?? "img",
        ...(props.title && props.renderer !== "svg"
          ? { "aria-label": props.title }
          : {}),
      }
    : {
        "aria-hidden":
          (attrs["aria-hidden"] as boolean | "true" | "false" | undefined) ??
          ("true" as const),
      },
);

const canvas = ref<HTMLCanvasElement | null>(null);
// CSS sizes ("1em", "100%") are measured
const measured = ref<number | null>(null);
// the canvas renderers load with the first canvas icon: SVG icons never
// download them
const factory = shallowRef<SurfaceFactory | null>(null);
let surface: IconSurface | null = null;
let surfaceCanvas: HTMLCanvasElement | null = null;
let disposed = false;

const release = () => {
  surface?.destroy();
  surface = null;
  surfaceCanvas = null;
};

onMounted(() => {
  watch(
    () => props.renderer !== "svg",
    (onCanvas) => {
      if (!onCanvas || factory.value) return;
      void import("minerva-design/icons/surface").then(
        ({ createIconSurface }) => {
          if (!disposed) factory.value = createIconSurface;
        },
      );
    },
    { immediate: true },
  );

  watch(
    [canvas, () => props.size],
    ([element, size], _, onCleanup) => {
      measured.value = null;
      if (!element || typeof size === "number") return;
      const measure = () =>
        (measured.value = element.getBoundingClientRect().width);
      measure();
      if (typeof ResizeObserver !== "function") return;
      const observer = new ResizeObserver(measure);
      observer.observe(element);
      onCleanup(() => observer.disconnect());
    },
    { immediate: true, flush: "post" },
  );

  watchEffect(
    () => {
      const element = canvas.value;
      const create = factory.value;
      const pixels =
        typeof props.size === "number" ? props.size : measured.value;
      if (props.renderer === "svg" || !element || !create) {
        release();
        return;
      }
      if (!pixels || pixels <= 0) return;
      const options = {
        icon: props.icon,
        size: pixels,
        color: props.color,
        strokeWidth: props.absoluteStrokeWidth
          ? (props.strokeWidth * 24) / pixels
          : props.strokeWidth,
        renderer: props.renderer,
        onRendererChange: (kind: IconRendererKind) =>
          emit("rendererChange", kind),
      };
      if (surface && surfaceCanvas === element) {
        surface.update(options);
      } else {
        release();
        surface = create(element, options);
        surfaceCanvas = element;
      }
    },
    { flush: "post" },
  );
});

onBeforeUnmount(() => {
  disposed = true;
  release();
});
</script>

<template>
  <svg
    v-if="renderer === 'svg'"
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    :stroke="color"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    :data-icon="icon.name"
    class="minerva-icon"
    v-bind="a11y"
  >
    <title v-if="title">{{ title }}</title>
    <path
      v-for="(d, index) in icon.paths"
      :key="index"
      :d="d"
      :vector-effect="absoluteStrokeWidth ? 'non-scaling-stroke' : undefined"
    />
  </svg>
  <canvas
    v-else
    ref="canvas"
    :data-icon="icon.name"
    class="minerva-icon"
    v-bind="a11y"
    :style="{
      display: 'inline-block',
      verticalAlign: 'middle',
      width: cssSize(size),
      height: cssSize(size),
    }"
  />
</template>
