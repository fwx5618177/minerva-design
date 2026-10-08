// Keyboard shortcut helpers shared by the command palettes (shortcut strings
// such as "mod+k") and the toast regions (hotkey key lists such as ["F8"]).

/** Keyboard event fields read by `matchesShortcut`. */
export type ShortcutEvent = Pick<
  KeyboardEvent,
  "key" | "metaKey" | "ctrlKey" | "shiftKey" | "altKey"
>;

/** Drops empty / non-string shortcut values (runtime safety for untyped callers). */
export function normalizeShortcuts(
  shortcut: string | readonly string[] | undefined | null,
): string[] {
  const values = Array.isArray(shortcut) ? shortcut : [shortcut];
  return values.filter(
    (value): value is string =>
      typeof value === "string" && value.trim() !== "",
  );
}

/**
 * Whether a keyboard event matches a shortcut such as "mod+k" or
 * "ctrl+shift+p". `mod` accepts Cmd (macOS) or Ctrl. Non-string shortcuts
 * never match.
 */
export function matchesShortcut(
  event: ShortcutEvent,
  shortcut: unknown,
): boolean {
  if (typeof shortcut !== "string") return false;
  const parts = shortcut
    .trim()
    .toLowerCase()
    .split("+")
    .map((part) => part.trim())
    .filter(Boolean);
  const key = parts[parts.length - 1];
  if (!key || String(event.key ?? "").toLowerCase() !== key) return false;
  const has = (...names: string[]) => names.some((n) => parts.includes(n));
  if (has("mod") && !event.metaKey && !event.ctrlKey) return false;
  if (has("ctrl") && !event.ctrlKey) return false;
  if (has("meta", "cmd") && !event.metaKey) return false;
  if (has("shift") && !event.shiftKey) return false;
  if (has("alt", "option") && !event.altKey) return false;
  return true;
}

const NON_TEXT_INPUT_TYPES = [
  "button",
  "checkbox",
  "color",
  "file",
  "image",
  "radio",
  "range",
  "reset",
  "submit",
];

/**
 * Whether `target` takes text input: text-like inputs, textareas, selects
 * and contenteditable hosts. Always `false` without a DOM (SSR).
 */
export function isEditableTarget(target: EventTarget | null): boolean {
  if (typeof HTMLElement === "undefined" || !(target instanceof HTMLElement)) {
    return false;
  }
  if (target.isContentEditable) return true;
  if (target instanceof HTMLTextAreaElement) return true;
  if (target instanceof HTMLSelectElement) return true;
  if (target instanceof HTMLInputElement) {
    return !NON_TEXT_INPUT_TYPES.includes(target.type);
  }
  return false;
}

/** Fields of a command item that the palette search matches. */
export interface CommandSearchFields {
  title: string;
  description?: string;
  group?: string;
  keywords?: string;
}

/** Lower-cases and trims a search query or haystack. */
export const normalizeSearchText = (value: string): string =>
  value.trim().toLowerCase();

/** The text a command palette search runs against (group, title, description, keywords). */
export const commandSearchText = (item: CommandSearchFields): string =>
  `${item.group ?? ""} ${item.title} ${item.description ?? ""} ${item.keywords ?? ""}`;

const MODIFIER_KEYS = ["altKey", "ctrlKey", "metaKey", "shiftKey"] as const;
type ModifierKey = (typeof MODIFIER_KEYS)[number];

/** Keyboard event fields read by `matchesHotkey`. */
export type HotkeyEvent = Pick<KeyboardEvent, "code" | "key" | ModifierKey>;

/**
 * Whether `event` matches every entry of `hotkey`: modifier names
 * ("altKey", "ctrlKey", "metaKey", "shiftKey") or a `code` / `key` value.
 * An empty hotkey never matches.
 */
export const matchesHotkey = (
  event: HotkeyEvent,
  hotkey: readonly string[],
): boolean =>
  hotkey.length > 0 &&
  hotkey.every((key) =>
    (MODIFIER_KEYS as readonly string[]).includes(key)
      ? event[key as ModifierKey]
      : event.code === key || event.key === key,
  );

/** Human readable hotkey, e.g. `["altKey", "KeyT"]` -> `"Alt+T"`. */
export const formatHotkey = (hotkey: readonly string[]): string =>
  hotkey
    .map((key) =>
      key
        .replace(/Key$/, "")
        .replace(/^Key(?=.)/, "")
        .replace(/^Digit/, "")
        .replace(/^./, (c) => c.toUpperCase()),
    )
    .join("+");
