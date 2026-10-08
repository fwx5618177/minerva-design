import { Comment, Fragment, Text, type VNode } from "vue";

/**
 * The rendered children of a slot, fragments (`v-for`, `<template>`)
 * flattened, without the comments of `v-if` nor whitespace-only text (like
 * React's `Children.toArray`).
 */
export function flattenChildren(nodes: unknown): VNode[] {
  const result: VNode[] = [];
  for (const node of (Array.isArray(nodes) ? nodes : []) as VNode[]) {
    if (node == null || typeof node !== "object") continue;
    if (node.type === Comment) continue;
    if (node.type === Fragment) {
      result.push(...flattenChildren(node.children));
      continue;
    }
    if (node.type === Text && String(node.children).trim() === "") continue;
    result.push(node);
  }
  return result;
}

/** True when the slot renders only text (no element / component). */
export const isTextOnly = (nodes: VNode[]): boolean =>
  nodes.length > 0 && nodes.every((node) => node.type === Text);

/**
 * Plain text of slot content (text nodes, also inside elements), whitespace
 * collapsed: the accessible label derived from children.
 */
export function textOf(nodes: unknown): string {
  const collect = (value: unknown): string => {
    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }
    if (Array.isArray(value)) return value.map(collect).join("");
    if (value && typeof value === "object" && "type" in value) {
      const node = value as VNode;
      if (node.type === Comment) return "";
      const children = node.children;
      if (typeof children === "string") return children;
      if (Array.isArray(children)) return collect(children);
      if (children && typeof children === "object" && "default" in children) {
        const slot = (children as { default?: () => unknown }).default;
        return typeof slot === "function" ? collect(slot()) : "";
      }
    }
    return "";
  };
  return collect(nodes).replace(/\s+/g, " ").trim();
}
