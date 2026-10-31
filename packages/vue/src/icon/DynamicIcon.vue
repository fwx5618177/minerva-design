<script setup lang="ts">
import { computed } from "vue";
import { getIcon, type IconRendererKind } from "minerva-design/icons/core";
import Icon from "./Icon.vue";
import { iconStyleProps } from "./props";

/**
 * A built-in icon chosen by name at runtime (from data, a CMS…). It bundles
 * the whole set: prefer `Icon` with an icon constant, or the named
 * components, when the icon is known when writing the code.
 */
defineOptions({ name: "DynamicIcon" });
const props = defineProps({
  /** Name of a built-in icon (e.g. `"arrow-up"`); unknown names render nothing */
  name: { type: String, required: true },
  ...iconStyleProps,
});
const emit = defineEmits<{
  /** Canvas renderers: the backend that drew the icon */
  rendererChange: [kind: IconRendererKind];
}>();
const icon = computed(() => getIcon(props.name));
</script>

<template>
  <Icon
    v-if="icon"
    :icon="icon"
    :size="size"
    :color="color"
    :stroke-width="strokeWidth"
    :absolute-stroke-width="absoluteStrokeWidth"
    :title="title"
    :renderer="renderer"
    @renderer-change="(kind: IconRendererKind) => emit('rendererChange', kind)"
  />
</template>
