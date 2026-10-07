/**
 * Resolve a spacing prop to CSS.
 *
 * Numbers and numeric strings map to the spacing scale (`2` -> `var(--space-2)`,
 * `0.5` -> `var(--space-0-5)`); any other string is used as-is (`"12px"`,
 * `"1rem"`, `"var(--x)"`).
 */
export function resolveSpace(value: string | number): string {
  if (typeof value !== "number" && !/^\d+(\.\d+)?$/.test(value)) return value;
  return `var(--space-${String(value).replace(".", "-")})`;
}

/** Like {@link resolveSpace} but passes `undefined` through. */
export const resolveOptionalSpace = (
  value: string | number | undefined,
): string | undefined =>
  value === undefined ? undefined : resolveSpace(value);
