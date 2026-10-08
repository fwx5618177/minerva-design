// Attribute helpers of the layout elements. `resolveSpace` / `resolveSize`
// live in @minerva/core (shared with lib-core).
export { resolveSize, resolveSpace } from "@minerva/core";

/**
 * Drops the characters that could escape a declaration when a value is
 * written into a `<style>` text (`;`, braces, angle brackets).
 */
export function safeCssValue(value: string): string {
  return value.replace(/[;{}<>]/g, "");
}

/** Attribute converter accepting numbers and strings (`"4"` -> 4, `"12px"` stays). */
export const numberOrString = {
  fromAttribute: (value: string | null): string | number | undefined => {
    if (value === null) return undefined;
    const text = value.trim();
    return /^-?\d+(\.\d+)?$/.test(text) ? Number(text) : text;
  },
  toAttribute: (value: string | number | undefined) =>
    value === undefined ? null : String(value),
};
