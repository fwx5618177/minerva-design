<script setup lang="ts">
import { isVueComment } from "./host";
import { computed, useSlots, defineComponent, Fragment } from "vue";
import Avatar from "./Avatar.vue";
import { useI18n } from "./i18n";
const props = withDefaults(
  defineProps<{
    items?: { src?: string; name?: string }[];
    max?: number;
    count?: number;
    size?: number | string;
    ariaLabel?: string;
  }>(),
  { items: () => [], count: 0, size: "medium" },
);
const slots = useSlots();
const { t } = useI18n();
function flatten(nodes: any[]): any[] {
  return nodes.flatMap((n) =>
    isVueComment(n.type)
      ? []
      : n.type === Fragment
        ? flatten(n.children ?? [])
        : [n],
  );
}
const authored = computed(() => flatten(slots.default?.() ?? []));
const limit = computed(() =>
  props.max === undefined ? Infinity : Math.max(0, Math.floor(props.max)),
);
const visible = computed(() => authored.value.slice(0, limit.value));
const remaining = computed(
  () =>
    props.count +
    Math.max(0, (authored.value.length || props.items.length) - limit.value),
);
const SlotAvatars = defineComponent(() => () => visible.value);
</script>
<template>
  <view
    class="mn-avatar-group mn-uni-avatar-group"
    role="group"
    :aria-label="
      props.ariaLabel ??
      (remaining
        ? t('avatar.groupWithMore', { count: remaining })
        : t('avatar.group'))
    "
    ><SlotAvatars v-if="authored.length" /><Avatar
      v-for="(item, index) in authored.length ? [] : items.slice(0, limit)"
      :key="index"
      v-bind="item"
      :size="size"
      stacked /><Avatar
      v-if="remaining > 0"
      :size="size"
      :fallback="`+${remaining}`"
      stacked
  /></view>
</template>
