/**
 * Spacing values of the layout elements (lib-core's `resolveSpace`): numbers
 * and numeric strings select spacing tokens (`2` -> `var(--space-2)`,
 * `0.5` -> `var(--space-0-5)`); any other string is a CSS value used as-is
 * (`"12px"`, `"auto"`, `"var(--x)"`).
 */
export function resolveSpace(value: string | number): string {
  const text = String(value).trim();
  if (typeof value !== "number" && !/^\d+(\.\d+)?$/.test(text)) return text;
  return `var(--space-${text.replace(".", "-")})`;
}

/** Numbers and numeric strings are pixels, other strings CSS lengths. */
export function resolveSize(value: string | number): string {
  const text = String(value).trim();
  return typeof value === "number" || /^-?\d+(\.\d+)?$/.test(text)
    ? `${text}px`
    : text;
}

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
