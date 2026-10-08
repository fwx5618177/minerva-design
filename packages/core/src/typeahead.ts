// Typeahead ("type to select") matching, shared by the DOM roving focus
// controller and every renderer. Pure: no DOM, timers read through Date.now().

export interface TypeaheadItem {
  /** Text matched against the typed characters. */
  text: string;
  /** Disabled items are never matched. */
  disabled?: boolean;
}

export interface TypeaheadOptions {
  /** Idle time (ms) after which the typed buffer resets. @default 500 */
  timeout?: number;
}

export interface Typeahead {
  /**
   * Feeds a key and returns the matching index, or `-1` (non-printable key,
   * or no match).
   */
  search(key: string, items: TypeaheadItem[], currentIndex: number): number;
  /** Clears the typed buffer. */
  reset(): void;
  /** Current typed buffer (lower case). */
  getBuffer(): string;
}

/**
 * Typeahead ("type to select") for menus, listboxes and selects.
 *
 * - Characters typed within `timeout` ms accumulate ("ap" -> "apple"),
 *   matched case-insensitively against the start of each item's text,
 *   starting from the current item.
 * - Repeating the same character ("a", "a", "a") cycles through the items
 *   starting with it, starting after the current item.
 * - Space only counts while a search is in progress (otherwise it is left
 *   for activation).
 */
export function createTypeahead(options: TypeaheadOptions = {}): Typeahead {
  const { timeout = 500 } = options;
  let buffer = "";
  let lastTime = 0;

  return {
    search(key, items, currentIndex) {
      if (key.length !== 1) return -1;
      const now = Date.now();
      if (now - lastTime > timeout) buffer = "";
      if (key === " " && buffer === "") return -1;
      lastTime = now;
      buffer += key.toLowerCase();

      const isRepeated =
        buffer.length > 1 && buffer.split("").every((c) => c === buffer[0]);
      const query = isRepeated ? buffer[0] : buffer;
      const count = items.length;
      // single character: start after the current item; otherwise include it
      const startOffset = query.length === 1 ? 1 : 0;
      const start = currentIndex < 0 ? 0 : currentIndex + startOffset;
      for (let n = 0; n < count; n++) {
        const i = (start + n) % count;
        const item = items[i];
        if (item.disabled) continue;
        if (query.length === 1 && i === currentIndex) continue;
        if (item.text.trim().toLowerCase().startsWith(query)) return i;
      }
      return -1;
    },
    reset() {
      buffer = "";
      lastTime = 0;
    },
    getBuffer() {
      return buffer;
    },
  };
}
