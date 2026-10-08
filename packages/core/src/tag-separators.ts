// Separators of the tag inputs: typed or pasted text is split into tags.

/** Default separators of a tag input: a comma and the Enter key. */
export const DEFAULT_TAG_SEPARATORS: readonly string[] = [",", "Enter"];

/**
 * Splits `text` on any of the literal `separators` (longest first, so
 * `"::"` wins over `":"`). No separators returns `[text]`.
 */
export function splitBySeparators(
  text: string,
  separators: readonly string[],
): string[] {
  if (separators.length === 0) return [text];
  const pattern = [...separators]
    .sort((a, b) => b.length - a.length)
    .map((sep) => sep.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  return text.split(new RegExp(pattern));
}
