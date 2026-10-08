<script setup lang="ts">
/**
 * TextLink: a styled native anchor. `asChild` slots the styling onto a
 * router link; the subtle variant appends a decorative chevron as a
 * non-color cue.
 */
import { computed, Fragment, h, useAttrs, type VNode } from "vue";
import { linkRel } from "@minerva/core";
import styles from "@react-styles/components/TextLink/textLink.module.scss";
import { hooks } from "../../internal/hooks";
import { safeHref } from "../../internal/safe-url";
import { firstElement, Slot } from "../../internal/Slot";
import { IconChevronRight } from "../../internal/icons";
import type { TextLinkProps } from "./types";

defineOptions({ name: "TextLink", inheritAttrs: false });

const props = withDefaults(defineProps<TextLinkProps>(), {
  asChild: false,
  variant: "default",
});

const slots = defineSlots<{
  /** Link content (with `asChild`: the single link element) */
  default?: () => unknown;
}>();

const attrs = useAttrs();

const rootAttrs = computed(() => {
  // Only the attributes the caller passed: with `asChild` the child's own
  // href / rel must not be overridden by `undefined`.
  const link: { href?: string; rel?: string } = {};
  if ("href" in attrs) link.href = safeHref("TextLink", attrs.href);
  if ("href" in attrs || "target" in attrs || "rel" in attrs) {
    link.rel = linkRel(
      attrs.target as string | undefined,
      attrs.rel as string | undefined,
    );
  }
  return {
    ...attrs,
    ...link,
    class: [styles.textLink, styles[props.variant], attrs.class],
    ...hooks("text-link", "root", { variant: props.variant }),
  };
});

const chevron = () => h(IconChevronRight, { "aria-hidden": "true" });

/**
 * With `asChild` + subtle: the slotted link with the chevron appended to
 * its content (React's Slottable).
 */
const withChevron = (): VNode => {
  const nodes = slots.default?.() as VNode[] | undefined;
  const child = firstElement(nodes);
  if (!child) return h(Fragment, nodes);
  const { children } = child;
  const content =
    children && typeof children === "object" && !Array.isArray(children)
      ? {
          ...(children as Record<string, unknown>),
          default: (...args: unknown[]) => [
            (children as { default?: (...a: unknown[]) => unknown }).default?.(
              ...args,
            ),
            chevron(),
          ],
        }
      : [children, chevron()];
  return h(
    child.type as never,
    { ...child.props, key: child.key ?? undefined, ref: child.ref as never },
    content as never,
  );
};
</script>

<template>
  <Slot v-if="asChild" v-bind="rootAttrs">
    <component :is="withChevron()" v-if="variant === 'subtle'" />
    <slot v-else />
  </Slot>
  <a v-else v-bind="rootAttrs">
    <slot />
    <IconChevronRight v-if="variant === 'subtle'" aria-hidden="true" />
  </a>
</template>
