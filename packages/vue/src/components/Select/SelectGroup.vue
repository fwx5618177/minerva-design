<script setup lang="ts">
/** SelectGroup: groups options under a SelectLabel (`role="group"`). */
import { computed, provide, ref, useAttrs, useId } from "vue";
import { hooks } from "../../internal/hooks";
import { GROUP_KEY } from "./context";

defineOptions({ name: "SelectGroup", inheritAttrs: false });
defineSlots<{
  /** SelectLabel and SelectItem elements */
  default?: () => unknown;
}>();

const attrs = useAttrs();
const labelId = useId();
const hasLabel = ref(false);
provide(GROUP_KEY, { labelId, hasLabel });

const rootAttrs = computed(() => ({
  ...attrs,
  ...hooks("option-group", "root"),
}));
</script>

<template>
  <div
    role="group"
    :aria-labelledby="hasLabel ? labelId : undefined"
    v-bind="rootAttrs"
  >
    <slot />
  </div>
</template>
