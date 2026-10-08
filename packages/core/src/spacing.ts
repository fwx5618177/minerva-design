// Spacing and size values of the layout components (Box, Stack, grids...).

/**
 * Resolves a spacing value to CSS. Numbers and numeric strings select the
 * spacing scale (`2` -> `var(--space-2)`, `"0.5"` -> `var(--space-0-5)`);
 * any other string is a CSS value used as is (`"12px"`, `"auto"`,
 * `"var(--x)"`). Strings are trimmed.
 */
export function resolveSpace(value: string | number): string {
  const text = String(value).trim();
  if (typeof value !== "number" && !/^\d+(\.\d+)?$/.test(text)) return text;
  return `var(--space-${text.replace(".", "-")})`;
}

/**
 * Resolves a size value to CSS: numbers and numeric strings are pixels
 * (`100` / `"100"` -> `"100px"`), other strings CSS lengths used as is.
 * Strings are trimmed.
 */
export function resolveSize(value: string | number): string {
  const text = String(value).trim();
  return typeof value === "number" || /^-?\d+(\.\d+)?$/.test(text)
    ? `${text}px`
    : text;
}
