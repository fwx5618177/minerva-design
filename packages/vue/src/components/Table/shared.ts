import type { FunctionalComponent, VNodeChild } from "vue";

/** A CSS length: numbers are pixels */
export const toLength = (
  value: number | string | undefined,
): string | undefined =>
  value === undefined
    ? undefined
    : typeof value === "number"
      ? `${value}px`
      : value;

/** Width of the selection column (px) */
export const SELECTION_WIDTH = 48;

/** Renders a `VNodeChild` (string, VNode, array...) from a template */
export const RenderNode: FunctionalComponent<{ content: VNodeChild }> = (
  props,
) => props.content as never;
RenderNode.props = ["content"];
RenderNode.displayName = "MinervaRenderNode";
