<script setup lang="ts">
import { ref, computed, provide } from "vue";
import { useNativeId as useId } from "./native-id";
import Tab from "./Tab.vue";
import TabList from "./TabList.vue";
import TabPanel from "./TabPanel.vue";
import type { TabsContext } from "./tabs-context";
import { useI18n } from "./i18n";
const props = withDefaults(
  defineProps<{
    value?: string;
    defaultValue?: string;
    items?: {
      value: string;
      label: string;
      disabled?: boolean;
      closable?: boolean;
      content?: string;
    }[];
    disabled?: boolean;
    orientation?: "horizontal" | "vertical";
    activationMode?: "automatic" | "manual";
    dir?: "ltr" | "rtl";
    variant?: "line" | "enclosed" | "soft" | "pills";
    color?: string;
  }>(),
  {
    items: () => [],
    orientation: "horizontal",
    activationMode: "automatic",
    variant: "line",
    color: "primary",
  },
);
const emit = defineEmits<{
  change: [value: string];
  "update:modelValue": [value: string];
  close: [value: string];
}>();
const local = ref(
    props.defaultValue ?? props.items.find((i) => !i.disabled)?.value,
  ),
  active = computed(() => props.value ?? local.value),
  focused = ref(active.value);
const id = `mn-tabs-${useId().replace(/[^a-z0-9]/gi, "")}`;
const entries = new Map<
  string,
  { disabled: () => boolean; element: () => unknown }
>();
const { dir } = useI18n();
function choose(value: string) {
  if (
    props.disabled ||
    entries.get(value)?.disabled() ||
    active.value === value
  )
    return;
  if (props.value === undefined) local.value = value;
  emit("change", value);
  emit("update:modelValue", value);
}
provide<TabsContext>("minerva:tabs", {
  value: active,
  focused,
  disabled: computed(() => props.disabled),
  orientation: computed(() => props.orientation),
  dir: computed(() => props.dir ?? dir.value),
  automatic: computed(() => props.activationMode === "automatic"),
  color: computed(() => props.color),
  select: choose,
  register(value, disabled, element) {
    if (/\s/.test(value))
      throw new Error("Tab value must not contain whitespace");
    entries.set(value, { disabled, element });
    if (
      active.value === undefined &&
      !disabled() &&
      props.value === undefined
    ) {
      local.value = value;
      focused.value = value;
    }
    return () => entries.delete(value);
  },
  tabId: (value) => `${id}-tab-${encodeURIComponent(value)}`,
  panelId: (value) => `${id}-panel-${encodeURIComponent(value)}`,
});
</script>
<template>
  <view
    class="mn-tabs mn-uni-tabs"
    :class="[
      `mn-tabs-${orientation}`,
      `mn-tabs-${variant}`,
      `mn-tabs-${color}`,
    ]"
    :dir="props.dir ?? dir"
    :style="{
      '--mn-tabs-tone': `var(--${color === 'neutral' ? 'text' : color}-color)`,
    }"
    ><slot name="tabs" /><template v-if="items.length"
      ><TabList
        ><Tab
          v-for="item in items"
          :key="item.value"
          :value="item.value"
          :disabled="item.disabled"
          :closable="item.closable"
          @close="emit('close', item.value)"
          >{{ item.label }}</Tab
        ></TabList
      ><TabPanel v-for="item in items" :key="item.value" :value="item.value"
        ><slot :value="active">{{ item.content }}</slot></TabPanel
      ></template
    ><slot v-else
  /></view>
</template>
