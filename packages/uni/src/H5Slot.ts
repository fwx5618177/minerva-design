import {
  defineComponent,
  cloneVNode,
  isVNode,
  Comment,
  Fragment,
  type VNode,
} from "vue";
function elements(nodes: VNode[]): VNode[] {
  return nodes.flatMap((node) =>
    node.type === Fragment && Array.isArray(node.children)
      ? elements(node.children as VNode[])
      : isVNode(node) && node.type !== Comment
        ? [node]
        : [],
  );
}
/** Browser-only child composition; native templates retain their built-in wrapper. */
export default defineComponent({
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => {
      const children = elements(slots.default?.() ?? []);
      if (children.length !== 1)
        throw new Error("asChild requires exactly one element");
      const child = children[0]!;
      const merged: Record<string, unknown> = {
        ...attrs,
        ...(child.props?.id ? { id: child.props.id } : {}),
      };
      for (const key of Object.keys(attrs)) {
        if (/^on[A-Z]/.test(key) && child.props?.[key]) {
          const authored = child.props[key],
            handler = attrs[key];
          merged[key] = (event: Event) => {
            for (const fn of [authored].flat())
              if (typeof fn === "function") fn(event);
            if (!event.defaultPrevented)
              for (const fn of [handler].flat())
                if (typeof fn === "function") fn(event);
          };
        }
      }
      const result = cloneVNode(child, merged, true);
      for (const key of Object.keys(merged))
        if (/^on[A-Z]/.test(key) && child.props?.[key])
          result.props![key] = merged[key];
      return result;
    };
  },
});
