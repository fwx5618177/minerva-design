// Pure keyboard-shortcut helpers of lib-core's CommandDialog (copied: the
// package cannot import lib-core at runtime). Keep in sync with
// packages/lib-core/src/components/Command/Command.tsx.

/** Keyboard event fields read by `matchesShortcut`. */
export type CommandShortcutEvent = Pick<
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
  event: CommandShortcutEvent,
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

/** Text inputs, textareas, selects and contenteditable hosts. */
export function isEditableTarget(target: EventTarget | null): boolean {
  if (typeof HTMLElement === "undefined" || !(target instanceof HTMLElement)) {
    return false;
  }
  if (target.isContentEditable) return true;
  if (target instanceof HTMLTextAreaElement) return true;
  if (target instanceof HTMLSelectElement) return true;
  if (target instanceof HTMLInputElement) {
    return ![
      "button",
      "checkbox",
      "color",
      "file",
      "image",
      "radio",
      "range",
      "reset",
      "submit",
    ].includes(target.type);
  }
  return false;
}
