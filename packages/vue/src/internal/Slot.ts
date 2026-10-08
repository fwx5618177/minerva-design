import {
  cloneVNode,
  Comment,
  defineComponent,
  Fragment,
  mergeProps,
  Text,
  type VNode,
} from "vue";

/** First rendered element vnode of a slot (fragments flattened) */
export function firstElement(nodes: VNode[] | undefined): VNode | null {
  for (const node of nodes ?? []) {
    if (node.type === Comment) continue;
    if (node.type === Fragment) {
      const inner = firstElement(node.children as VNode[]);
      if (inner) return inner;
      continue;
    }
    if (node.type === Text) {
      if (String(node.children).trim() === "") continue;
      return null;
    }
    return node;
  }
  return null;
}

/** The DOM element of a template ref value (element or component) */
export const unrefElement = (value: unknown): HTMLElement | null => {
  if (!value) return null;
  if (value instanceof HTMLElement) return value;
  const el = (value as { $el?: unknown }).$el;
  return el instanceof HTMLElement ? el : null;
};

/**
 * `asChild` of the Vue renderer: renders the single child of its default
 * slot with the Slot's attributes merged in (event listeners chained,
 * classes / styles merged, a function `ref` added), instead of a wrapper.
 * Used by triggers (`<template #trigger><Button>Open</Button></template>`).
 */
export const Slot = defineComponent({
  name: "MinervaSlot",
  inheritAttrs: false,
  setup(_props, { attrs, slots }) {
    return () => {
      const child = firstElement(slots.default?.());
      if (!child) return slots.default?.();
      const { ref: _ref, ...rest } = attrs as Record<string, unknown>;
      const merged = mergeProps(rest, (child.props ?? {}) as never);
      // the child's own listeners run first, then the Slot's (like React's
      // composeEventHandlers): keep both
      const chained: Record<string, unknown> = {};
      for (const key of Object.keys(rest)) {
        if (!/^on[A-Z]/.test(key)) continue;
        const own = child.props?.[key] as
          ((...a: unknown[]) => void) | undefined;
        const added = rest[key] as (...a: unknown[]) => void;
        if (own && own !== added) {
          chained[key] = merged[key] = (...args: unknown[]) => {
            own(...args);
            const event = args[0] as Event | undefined;
            if (!event?.defaultPrevented) added(...args);
          };
        }
      }
      const clone = cloneVNode(child, merged as never, true);
      // cloneVNode merges `merged` into the child's props again, which would
      // list the child's own listener twice ([own, chained]): keep the chain
      Object.assign(clone.props!, chained);
      if (typeof _ref === "function") {
        return cloneVNode(clone, { ref: _ref as never }, true);
      }
      return clone;
    };
  },
});
