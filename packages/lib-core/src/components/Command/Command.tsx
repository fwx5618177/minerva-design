import {
  useEffect,
  useId,
  useMemo,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { useDialogFocusReturn } from "../../hooks/useDialogFocusReturn";
import useI18n from "../../hooks/useI18n";
import { useControllableState } from "../../internal/useControllableState";
import { cn } from "../../utils/cn";
import { ModalContent, ModalHeader, ModalRoot } from "../Modal/Modal";
import type {
  CommandDialogProps,
  CommandItem,
  CommandShortcutEvent,
} from "./types";
import styles from "./command.module.scss";

const normalize = (value: string) => value.trim().toLowerCase();

const searchText = (item: CommandItem) =>
  `${item.group ?? ""} ${item.title} ${item.description ?? ""} ${item.keywords ?? ""}`;

/** Drops empty / non-string shortcut values (runtime safety for untyped callers). */
export function normalizeShortcuts(
  shortcut: string | readonly string[] | undefined,
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

interface CommandPanelProps {
  items: CommandItem[];
  maxResults: number;
  placeholder: string;
  emptyText: ReactNode;
  resultsLabel: string;
  enterLabel: ReactNode;
  getOptionId?: (item: CommandItem, index: number) => string;
  onSelect: (item: CommandItem) => void;
}

/**
 * Search input + results. Mounted only while the dialog is open, so every
 * opening starts with an empty query and the first result active.
 */
const CommandPanel = ({
  items,
  maxResults,
  placeholder,
  emptyText,
  resultsLabel,
  enterLabel,
  getOptionId,
  onSelect,
}: CommandPanelProps) => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const baseId = useId();
  const listId = `${baseId}-results`;

  const results = useMemo(() => {
    const q = normalize(query);
    return items
      .filter((item) => !item.disabled)
      .filter((item) => !q || normalize(searchText(item)).includes(q))
      .slice(0, maxResults);
  }, [items, maxResults, query]);

  const optionId = (index: number) =>
    getOptionId?.(results[index], index) ?? `${baseId}-option-${index}`;
  const activeId = results[activeIndex] ? optionId(activeIndex) : undefined;

  useEffect(() => {
    if (!activeId) return;
    document.getElementById(activeId)?.scrollIntoView?.({ block: "nearest" });
  }, [activeId]);

  const onKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    const last = Math.max(results.length - 1, 0);
    const moves: Record<string, (index: number) => number> = {
      ArrowDown: (index) => Math.min(index + 1, last),
      ArrowUp: (index) => Math.max(index - 1, 0),
      Home: () => 0,
      End: () => last,
    };
    const move = moves[event.key];
    if (move && (event.key.startsWith("Arrow") || !query)) {
      event.preventDefault();
      setActiveIndex(move);
      return;
    }
    if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      onSelect(results[activeIndex]);
    }
  };

  return (
    <>
      <div className={cn(styles.search, "ui-command-search")}>
        <span className={styles.searchIcon} aria-hidden="true">
          ⌕
        </span>
        <input
          className={cn(styles.input, "ui-command-input")}
          type="text"
          role="combobox"
          aria-label={placeholder}
          aria-autocomplete="list"
          aria-expanded
          aria-controls={listId}
          aria-activedescendant={activeId}
          autoComplete="off"
          spellCheck={false}
          value={query}
          placeholder={placeholder}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={onKeyDown}
        />
        <kbd className={styles.enterHint} aria-hidden="true">
          {enterLabel}
        </kbd>
      </div>
      <div
        id={listId}
        className={cn(styles.results, "ui-command-results")}
        role="listbox"
        aria-label={resultsLabel}
      >
        {results.length === 0 ? (
          <div className={cn(styles.empty, "ui-command-empty")}>
            {emptyText}
          </div>
        ) : (
          results.map((item, index) => {
            const active = index === activeIndex;
            return (
              <button
                id={optionId(index)}
                key={item.id}
                type="button"
                role="option"
                // Keyboard navigation happens in the combobox input.
                tabIndex={-1}
                aria-selected={active}
                data-active={active || undefined}
                data-command-id={item.id}
                className={cn(styles.item, "ui-command-item")}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => onSelect(item)}
              >
                <span className={cn(styles.copy, "ui-command-item-copy")}>
                  <strong>{item.title}</strong>
                  {item.description && <small>{item.description}</small>}
                </span>
                {item.group && (
                  <span className={cn(styles.group, "ui-command-item-group")}>
                    {item.group}
                  </span>
                )}
              </button>
            );
          })
        )}
      </div>
    </>
  );
};

/**
 * CommandDialog: a searchable command palette in a modal. Filter with the
 * input, move with ArrowUp / ArrowDown, choose with Enter or a click. An
 * optional global `shortcut` (e.g. "mod+k") opens it.
 */
export const CommandDialog = ({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  items,
  onSelect,
  title,
  description,
  placeholder,
  emptyText,
  shortcutLabel,
  shortcut,
  maxResults = 12,
  resultsLabel,
  enterLabel,
  getOptionId,
  className,
}: CommandDialogProps) => {
  const { t } = useI18n();
  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const {
    open: dialogOpen,
    contentRef,
    onCloseAutoFocus,
  } = useDialogFocusReturn(open);

  // Stable key so an inline array literal does not re-register the listener.
  const shortcutKey = normalizeShortcuts(shortcut).join("\n");
  useEffect(() => {
    if (!shortcutKey) return;
    const shortcuts = shortcutKey.split("\n");
    const onKeyDown = (event: KeyboardEvent) => {
      if (!shortcuts.some((value) => matchesShortcut(event, value))) return;
      event.preventDefault();
      event.stopPropagation();
      setOpen(true);
    };
    document.addEventListener("keydown", onKeyDown, { capture: true });
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [setOpen, shortcutKey]);

  const select = (item: CommandItem) => {
    onSelect(item);
    setOpen(false);
  };

  return (
    <ModalRoot open={dialogOpen} onOpenChange={setOpen}>
      <ModalContent
        ref={contentRef}
        onCloseAutoFocus={onCloseAutoFocus}
        className={cn(styles.dialog, "ui-command-dialog", className)}
        description={description ?? t("command.description")}
        hideCloseButton
        size="large"
      >
        <ModalHeader className={cn(styles.header, "ui-command-header")}>
          <span>{title ?? t("command.title")}</span>
          {shortcutLabel && <kbd className={styles.kbd}>{shortcutLabel}</kbd>}
        </ModalHeader>
        <CommandPanel
          items={items}
          maxResults={maxResults}
          placeholder={placeholder ?? t("command.placeholder")}
          emptyText={emptyText ?? t("command.empty")}
          resultsLabel={resultsLabel ?? t("command.results")}
          enterLabel={enterLabel ?? t("command.enter")}
          getOptionId={getOptionId}
          onSelect={select}
        />
      </ModalContent>
    </ModalRoot>
  );
};

export default CommandDialog;
