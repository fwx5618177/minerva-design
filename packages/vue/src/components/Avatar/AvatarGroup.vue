<script setup lang="ts">
/**
 * AvatarGroup: overlapping avatars with an optional "+N" indicator.
 *
 * `max` limits the visible avatars (the hidden ones are added to the
 * indicator); `count` adds a number of avatars that are not rendered at all.
 */
import { computed, useAttrs } from "vue";
import styles from "@react-styles/components/Avatar/avatarGroup.module.scss";
import { hooks } from "../../internal/hooks";
import { flattenChildren } from "../../internal/children";
import { useI18n } from "../../config/useI18n";
import type { AvatarGroupProps } from "./types";

defineOptions({ name: "AvatarGroup", inheritAttrs: false });

const props = withDefaults(defineProps<AvatarGroupProps>(), {
  count: undefined,
  max: undefined,
});

defineSlots<{
  /** Avatars (`v-if`-ed avatars are not counted) */
  default?: () => unknown;
}>();

const attrs = useAttrs();
const { t } = useI18n();

const layout = (children: unknown) => {
  const avatars = flattenChildren(children);
  const visible =
    props.max === undefined ? avatars : avatars.slice(0, props.max);
  const extra = (props.count ?? 0) + avatars.length - visible.length;
  return {
    visible,
    extra,
    label:
      (attrs["aria-label"] as string | undefined) ??
      (extra > 0
        ? t("avatar.groupWithMore", { count: extra })
        : t("avatar.group")),
  };
};
const rootAttrs = computed(() => {
  const { "aria-label": _label, ...rest } = attrs;
  return { ...rest, ...hooks("avatar-group", "root") };
});
</script>

<template>
  <div
    role="group"
    :class="styles.avatarGroup"
    :aria-label="layout($slots.default?.()).label"
    v-bind="rootAttrs"
  >
    <template
      v-for="group in [layout($slots.default?.())]"
      key="avatars"
    >
      <div
        v-for="(child, index) in group.visible"
        :key="child.key ?? index"
        :class="styles.avatarGroupItem"
        v-bind="hooks('avatar-group', 'item')"
      >
        <component :is="child" />
      </div>
      <div
        v-if="group.extra > 0"
        :class="styles.count"
        aria-hidden="true"
        v-bind="hooks('avatar-group', 'count')"
      >
        +{{ group.extra }}
      </div>
    </template>
  </div>
</template>
