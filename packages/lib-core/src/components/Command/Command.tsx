import {
  useEffect,
  useId,
  useMemo,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import {
  commandSearchText,
  isEditableTarget,
  matchesShortcut,
  normalizeSearchText,
  normalizeShortcuts,
} from "@minerva/core";
import useI18n from "../../hooks/useI18n";
import { useControllableState } from "../../internal/useControllableState";
import { warnControlledProps } from "../../internal/devWarnings";
import { cn } from "../../utils/cn";
import { ModalContent, ModalHeader, ModalRoot } from "../Modal/Modal";
import type { CommandDialogProps, CommandItem } from "./types";
import styles from "./command.module.scss";

export { matchesShortcut, normalizeShortcuts };

interface CommandPanelProps {
  items: CommandItem[];
  maxResults: number;
  placeholder: string;
  emptyText: ReactNode;
  resultsLabel: string;
  enterLabel: ReactNode;
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
  onSelect,
}: CommandPanelProps) => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const baseId = useId();
  const listId = `${baseId}-results`;

  const results = useMemo(() => {
    const q = normalizeSearchText(query);
    return items
      .filter((item) => !item.disabled)
      .filter(
        (item) =>
          !q || normalizeSearchText(commandSearchText(item)).includes(q),
      )
      .slice(0, maxResults);
  }, [items, maxResults, query]);

  const optionId = (index: number) => `${baseId}-option-${index}`;
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
      <div className={styles.search}>
        <span className={styles.searchIcon} aria-hidden="true">
          ⌕
        </span>
        <input
          className={styles.input}
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
        className={styles.results}
        role="listbox"
        aria-label={resultsLabel}
      >
        {results.length === 0 ? (
          <div className={styles.empty}>{emptyText}</div>
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
                className={styles.item}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => onSelect(item)}
              >
                <span className={styles.copy}>
                  <strong>{item.title}</strong>
                  {item.description && <small>{item.description}</small>}
                </span>
                {item.group && (
                  <span className={styles.group}>{item.group}</span>
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
  defaultOpen,
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
  className,
}: CommandDialogProps) => {
  const { t } = useI18n();
  if (process.env.NODE_ENV !== "production") {
    warnControlledProps("CommandDialog", {
      prop: "open",
      value: openProp,
      defaultProp: "defaultOpen",
      defaultValue: defaultOpen,
      handlerProp: "onOpenChange",
      handler: onOpenChange,
    });
  }
  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen ?? false,
    onChange: onOpenChange,
    name: "CommandDialog",
    prop: "open",
  });

  // Stable key so an inline array literal does not re-register the listener.
  const shortcutKey = normalizeShortcuts(shortcut).join("\n");
  useEffect(() => {
    if (!shortcutKey) return;
    const shortcuts = shortcutKey.split("\n");
    const onKeyDown = (event: KeyboardEvent) => {
      // A shortcut without Ctrl / Meta / Alt (e.g. "/") is a printable key:
      // while typing in a text field (including the palette's own search)
      // it must reach the field instead of being swallowed.
      const editable =
        isEditableTarget(event.target) &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey;
      if (editable || event.isComposing) return;
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
    <ModalRoot open={open} onOpenChange={setOpen}>
      <ModalContent
        className={cn(styles.dialog, className)}
        description={description ?? t("command.description")}
        hideCloseButton
        size="large"
      >
        <ModalHeader className={styles.header}>
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
          onSelect={select}
        />
      </ModalContent>
    </ModalRoot>
  );
};

export default CommandDialog;
