<script setup lang="ts">
/**
 * PageTab: one open page of `PageTabs`. The label button selects it
 * (`select`); the `action` slot (e.g. a close IconButton) is a sibling
 * control, never nested inside the label button. Attributes (e.g.
 * `@contextmenu`) go to the item wrapper.
 */
import { computed, useAttrs } from "vue";
import styles from "@react-styles/components/PageTabs/pageTabs.module.scss";
import { hooks } from "../../internal/hooks";
import { Tooltip } from "../Tooltip";
import type { PageTabProps } from "./types";

defineOptions({ name: "PageTab", inheritAttrs: false });

const props = withDefaults(defineProps<PageTabProps>(), {
  active: false,
  disabled: false,
});
const emit = defineEmits<{
  /** The label button was activated */
  select: [];
}>();
const slots = defineSlots<{
  /** Icon displayed before the label */
  icon?: () => unknown;
  /** Separate control rendered next to the label (e.g. a close IconButton) */
  action?: () => unknown;
}>();

const attrs = useAttrs();
const rootAttrs = computed(() => ({
  ...attrs,
  ...hooks("page-tab", "root", {
    current: props.active,
    disabled: props.disabled,
  }),
}));
</script>

<template>
  <div :class="styles.pageTab" :data-value="value" v-bind="rootAttrs">
    <Tooltip
      :content="label"
      placement="bottom-start"
      variant="glass"
      :disabled="disabled"
      as-child
    >
      <button
        type="button"
        :class="styles.trigger"
        v-bind="hooks('page-tab', 'trigger')"
        :aria-current="active ? 'page' : undefined"
        :disabled="disabled"
        @click="emit('select')"
      >
        <span
          v-if="slots.icon"
          :class="styles.icon"
          aria-hidden="true"
          v-bind="hooks('page-tab', 'icon')"
        >
          <slot name="icon" />
        </span>
        <span :class="styles.label" v-bind="hooks('page-tab', 'label')">{{
          label
        }}</span>
      </button>
    </Tooltip>
    <span
      v-if="slots.action"
      :class="styles.action"
      v-bind="hooks('page-tab', 'action')"
    >
      <slot name="action" />
    </span>
  </div>
</template>
