<script setup lang="ts">
import { inject, computed, type ComputedRef } from "vue";
import { useI18n } from "./i18n";
const props = withDefaults(
  defineProps<{
    value: string;
    label?: string;
    active?: boolean;
    disabled?: boolean;
    closable?: boolean;
    icon?: string;
  }>(),
  { active: undefined },
);
const emit = defineEmits<{
  click: [value: string];
  select: [];
  close: [value: string];
}>();
const root = inject<
  | {
      active: ComputedRef<string | undefined>;
      disabled: ComputedRef<boolean | undefined>;
      select: (value: string) => void;
      itemId: (value: string) => string;
    }
  | undefined
>("minerva:page-tabs", undefined);
const { t } = useI18n();
const current = computed(
  () => props.active ?? root?.active.value === props.value,
);
const blocked = computed(() => props.disabled || root?.disabled.value);
function choose() {
  if (blocked.value) return;
  root?.select(props.value);
  emit("select");
  emit("click", props.value);
}
</script>
<template>
  <view
    :id="root?.itemId(value)"
    class="mn-uni-page-tab"
    :class="{ 'mn-page-current': current }"
    :data-value="value"
    :data-current="current ? '' : undefined"
    ><button
      class="mn-option"
      :disabled="blocked"
      :aria-disabled="blocked"
      :aria-current="current ? 'page' : undefined"
      :title="label"
      @tap="choose"
    >
      <slot name="icon"
        ><text v-if="icon">{{ icon }}</text></slot
      ><text class="mn-uni-page-label"
        ><slot>{{ label }}</slot></text
      ></button
    ><slot name="action"
      ><button
        v-if="closable"
        class="mn-close"
        :aria-label="t('tag.close')"
        @tap.stop="emit('close', value)"
      >
        ×
      </button></slot
    ></view
  >
</template>
