<script setup lang="ts">
import { inject, ref, computed, onMounted, onBeforeUnmount } from "vue";
import type { TabsContext } from "./tabs-context";
import { useI18n } from "./i18n";
const props = defineProps<{
  value: string;
  disabled?: boolean;
  closable?: boolean;
  color?: string;
}>();
const root = inject<TabsContext | undefined>("minerva:tabs", undefined),
  element = ref<any>();
const disabled = computed(() => props.disabled || root?.disabled.value),
  selected = computed(() => root?.value.value === props.value);
const emit = defineEmits<{ click: [value: string]; close: [value: string] }>();
let unregister: (() => void) | undefined;
const { t } = useI18n();
onMounted(
  () =>
    (unregister = root?.register(
      props.value,
      () => !!disabled.value,
      () => element.value?.$el ?? element.value,
    )),
);
onBeforeUnmount(() => unregister?.());
function click() {
  if (disabled.value) return;
  root?.select(props.value);
  emit("click", props.value);
}
function focus() {
  if (!root || disabled.value) return;
  root.focused.value = props.value;
  if (root.automatic.value) root.select(props.value);
}
</script>
<template>
  <view class="mn-tab" :class="{ 'mn-active': selected }"
    ><button
      ref="element"
      class="mn-option mn-uni-tab"
      :class="[
        color ? `mn-tab-color-${color}` : '',
        {
          'mn-tab-selected': selected,
          'mn-disabled': disabled,
          'mn-tab-colored': !!color,
        },
      ]"
      :style="
        color
          ? {
              '--mn-tabs-tone': `var(--${color === 'neutral' ? 'text' : color}-color)`,
              '--mn-tab-soft':
                color === 'neutral'
                  ? 'var(--surface-muted-color)'
                  : `var(--${color}-color-subtle)`,
              '--mn-tab-text':
                color === 'neutral'
                  ? 'var(--text-color)'
                  : `var(--${color}-color-text)`,
            }
          : undefined
      "
      :id="root?.tabId(value)"
      :aria-controls="selected ? root?.panelId(value) : undefined"
      role="tab"
      :aria-selected="selected"
      :disabled="disabled"
      :aria-disabled="disabled"
      :tabindex="disabled ? -1 : root?.focused.value === value ? 0 : -1"
      @tap="click"
      @focus="focus"
      @keydown.enter.prevent="click"
      @keydown.space.prevent="click"
    >
      <slot /></button
    ><button
      v-if="closable"
      class="mn-close"
      :aria-label="t('tag.close')"
      :disabled="disabled"
      @tap="emit('close', value)"
    >
      ×
    </button></view
  >
</template>
