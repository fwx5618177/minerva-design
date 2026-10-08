import type { HTMLAttributes } from "vue";

/** One entry of the command palette. */
export interface CommandItem {
  /** Unique id, passed back through the `select` event. */
  id: string;
  /** Main label. */
  title: string;
  /** Secondary line below the title. */
  description?: string;
  /** Group name, shown as a badge and matched by the search. */
  group?: string;
  /** Extra search terms (not displayed). */
  keywords?: string;
  /**
   * Hides the item from the results
   * @default false
   */
  disabled?: boolean;
}

/** Keyboard event fields read by `matchesShortcut`. */
export type CommandShortcutEvent = Pick<
  KeyboardEvent,
  "key" | "metaKey" | "ctrlKey" | "shiftKey" | "altKey"
>;

/**
 * Props of `CommandDialog` (same names and defaults as React; `onSelect` is
 * the `select` event, `v-model:open`). `title` / `description` /
 * `empty-text` / `shortcut-label` / `enter-label` can also be slots.
 */
export interface CommandDialogProps {
  /** Controlled open state (`v-model:open`); leave `undefined` for uncontrolled. */
  open?: boolean;
  /**
   * Initial open state while uncontrolled
   * @default false
   */
  defaultOpen?: boolean;
  /** Commands to search. Disabled items are never shown. */
  items: CommandItem[];
  /** Title of the dialog; defaults to the localized "Command palette". */
  title?: string;
  /** Accessible description of the palette; defaults to a localized hint. */
  description?: string;
  /** Placeholder of the search input; defaults to a localized hint. */
  placeholder?: string;
  /** Shown when nothing matches; defaults to the localized "No matching results". */
  emptyText?: string;
  /** Shortcut hint rendered as `<kbd>` next to the title, e.g. "⌘K". */
  shortcutLabel?: string;
  /**
   * Global keyboard shortcut(s) that open the palette, e.g. "mod+k" (Cmd+K on
   * macOS, Ctrl+K elsewhere). Modifiers: mod, ctrl, meta/cmd, shift, alt/option.
   */
  shortcut?: string | string[];
  /**
   * Maximum number of results shown
   * @default 12
   */
  maxResults?: number;
  /**
   * Custom search, e.g. to rank results by match quality. Receives the
   * enabled items and the trimmed query (never empty) and returns the
   * matching items in display order (then capped at `maxResults`). By
   * default, items whose group, title, description or keywords contain the
   * query (case-insensitive) are kept in `items` order.
   */
  filter?: (items: CommandItem[], query: string) => CommandItem[];
  /** Accessible label of the results list; defaults to the localized "Command results". */
  resultsLabel?: string;
  /** Key hint shown at the end of the search input; defaults to the localized "Enter". */
  enterLabel?: string;
  /** Additional class of the dialog panel (a `class` attribute works too). */
  className?: HTMLAttributes["class"];
}
