/** `null`, `undefined` and `""` are no content (`0` is rendered, like React). */
export const hasContent = (value: unknown, slot?: unknown): boolean =>
  !!slot || (value != null && value !== "" && typeof value !== "boolean");
