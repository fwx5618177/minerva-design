const NUMERIC = /^\d+(\.\d+)?$/;

/** CSS length of a size input: numbers (and numeric strings) are pixels */
export const cssSize = (value: number | string) =>
  typeof value === "number" || NUMERIC.test(value) ? `${value}px` : value;

/** Size input transform: a static `size="32"` becomes the number 32 */
export const numericSize = (value: number | string): number | string =>
  typeof value === "string" && NUMERIC.test(value.trim())
    ? Number(value)
    : value;
