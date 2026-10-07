import {
  useId,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import { IconPlus, IconX } from "../../internal/icons";
import { cn } from "../../utils/cn";
import { pickDataAttributes } from "../../internal/dataAttributes";
import useI18n from "../../hooks/useI18n";
import { useMergedRefs } from "../../internal/mergeRefs";
import { useControllableState } from "../../internal/useControllableState";
import { warnControlledProps } from "../../internal/devWarnings";
import { useFormControlContext } from "../FormControl/context";
import { IconButton } from "../IconButton";
import { Input } from "../Input/Input";
import { Tag } from "../Tag";
import type { TagInputProps } from "./types";
import styles from "./tagInput.module.scss";

const EMPTY: readonly string[] = [];
const DEFAULT_SEPARATORS: readonly string[] = [",", "Enter"];
const ENTER = "Enter";
const LINE_BREAKS = ["\r\n", "\n", "\r"];

/** Splits `text` on any of the literal `separators` (longest first). */
function splitText(text: string, separators: readonly string[]): string[] {
  if (separators.length === 0) return [text];
  const pattern = [...separators]
    .sort((a, b) => b.length - a.length)
    .map((sep) => sep.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  return text.split(new RegExp(pattern));
}

interface Suggestion {
  /** The tag added when selected */
  tag: string;
  label: string;
  /** Text matched against the draft */
  filterValue: string;
}

/**
 * TagInput: free-form tags with suggestions. Enter / the add button / blur
 * add the trimmed draft; typed or pasted `separators` split text into tags; arrow keys pick a suggestion; Escape discards the
 * draft; Backspace in an empty draft removes the last tag. IME composition
 * never commits. FormControl-aware; `ref` reaches the
 * text input.
 */
export const TagInput = ({
  value,
  defaultValue: defaultValueProp,
  onChange,
  options = EMPTY,
  commitOnBlur = true,
  separators = DEFAULT_SEPARATORS,
  id,
  name,
  placeholder,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  disabled: disabledProp,
  readOnly: readOnlyProp,
  invalid,
  size = "medium",
  emptyText,
  addLabel,
  clearLabel,
  removeLabel,
  createLabel,
  className,
  style,
  ref,
  ...rest
}: TagInputProps) => {
  const { t } = useI18n();
  const field = useFormControlContext();
  const disabled = Boolean(disabledProp || field?.disabled);
  const readOnly = Boolean(readOnlyProp || field?.readOnly);
  const blocked = disabled || readOnly;
  const inputRef = useRef<HTMLInputElement>(null);
  const mergedRef = useMergedRefs(inputRef, ref);
  const composing = useRef(false);
  // An explicit arrow-key choice wins over "Enter adds the draft".
  const navigating = useRef(false);
  const listId = useId();

  if (process.env.NODE_ENV !== "production") {
    warnControlledProps("TagInput", {
      prop: "value",
      value,
      defaultProp: "defaultValue",
      defaultValue: defaultValueProp,
      handlerProp: "onChange",
      handler: onChange,
      locked: blocked,
      lockHint: "set `disabled` / `readOnly`",
    });
  }
  const [tags, setTags] = useControllableState<readonly string[]>({
    value,
    defaultValue: defaultValueProp ?? EMPTY,
    onChange: onChange as ((next: readonly string[]) => void) | undefined,
    name: "TagInput",
  });
  const [draft, setDraft] = useState("");
  const [requestedOpen, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const open = requestedOpen && !blocked;
  const trimmed = draft.trim();

  const candidates = [
    ...new Set(options.map((option) => option.trim()).filter(Boolean)),
  ].filter((option) => !tags.includes(option));
  const suggestions: Suggestion[] = candidates.map((tag) => ({
    tag,
    label: tag,
    filterValue: tag,
  }));
  if (trimmed && !tags.includes(trimmed) && !candidates.includes(trimmed)) {
    suggestions.unshift({
      tag: trimmed,
      label: createLabel
        ? createLabel(trimmed)
        : t("tagInput.create", { tag: trimmed }),
      filterValue: trimmed,
    });
  }
  const query = trimmed.toLowerCase();
  const filtered = query
    ? suggestions.filter((s) => s.filterValue.toLowerCase().includes(query))
    : suggestions;

  // Reset the highlight when the list changes (derived during render).
  const highlightKey = `${filtered.length}\u0000${draft}`;
  const [prevHighlightKey, setPrevHighlightKey] = useState(highlightKey);
  if (prevHighlightKey !== highlightKey) {
    setPrevHighlightKey(highlightKey);
    setHighlight(0);
  }

  const enterCommits = separators.includes(ENTER);
  // Literal separators: typing one commits the text before it.
  const splitters = separators.filter((sep) => sep !== ENTER && sep !== "");
  // Pasted text also splits on line breaks when Enter commits.
  const pasteSplitters = enterCommits
    ? [...splitters, ...LINE_BREAKS]
    : splitters;

  /** Adds every (trimmed, non-empty, new) text as a tag in one update. */
  const commitAll = (texts: readonly string[], nextDraft = "") => {
    if (blocked || composing.current) return;
    const next = [...tags];
    for (const text of texts) {
      const tag = text.trim();
      if (tag && !next.includes(tag)) next.push(tag);
    }
    if (next.length !== tags.length) setTags(next);
    navigating.current = false;
    setDraft(nextDraft);
  };

  const commit = (text: string) => commitAll([text]);

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    if (blocked || composing.current) return;
    const pasted = event.clipboardData.getData("text");
    if (!pasteSplitters.some((sep) => pasted.includes(sep))) return;
    event.preventDefault();
    const el = event.currentTarget;
    const start = el.selectionStart ?? draft.length;
    const end = el.selectionEnd ?? draft.length;
    const text = draft.slice(0, start) + pasted + draft.slice(end);
    commitAll(splitText(text, pasteSplitters));
    setOpen(false);
  };

  const select = (suggestion: Suggestion) => {
    commit(suggestion.tag);
    setOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (
      blocked ||
      composing.current ||
      event.nativeEvent.isComposing ||
      event.keyCode === 229
    ) {
      return;
    }
    const count = filtered.length;
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp":
        event.preventDefault();
        navigating.current = true;
        setOpen(true);
        if (count > 0) {
          const delta = event.key === "ArrowDown" ? 1 : -1;
          setHighlight((h) => (h + delta + count) % count);
        }
        break;
      case "Enter":
        // Never submit the enclosing form from the tag field.
        event.preventDefault();
        if (!enterCommits) {
          // Enter only picks an explicitly highlighted suggestion.
          if (navigating.current && open && filtered[highlight]) {
            select(filtered[highlight]);
          }
        } else if (
          !navigating.current &&
          (!trimmed || tags.includes(trimmed))
        ) {
          commit(draft);
        } else if (open && filtered[highlight]) {
          select(filtered[highlight]);
        } else {
          commit(draft);
          setOpen(false);
        }
        break;
      case "Escape":
        navigating.current = false;
        setDraft("");
        if (open) {
          event.preventDefault();
          setOpen(false);
        }
        break;
      case "Backspace":
        // Keyboard removal of the last tag (common tag-field convention):
        // only from an empty draft, so normal text editing is unaffected.
        if (draft === "" && tags.length > 0) {
          event.preventDefault();
          setTags(tags.slice(0, -1));
        }
        break;
    }
  };

  const removeText = (tag: string) =>
    removeLabel ? removeLabel(tag) : t("tagInput.remove", { tag });
  const activeOption = open ? filtered[highlight] : undefined;
  const optionId = (index: number) => `${listId}-option-${index}`;

  return (
    <div
      {...pickDataAttributes(rest)}
      className={cn(styles.root, className)}
      style={style}
    >
      {tags.length > 0 && (
        <div className={styles.values}>
          {tags.map((tag, index) => (
            <Tag
              key={`${index}-${tag}`}
              className={styles.tag}
              size="large"
              disabled={disabled}
              closable={!readOnly}
              closeLabel={removeText(tag)}
              onClose={() => {
                if (blocked) return;
                setTags(tags.filter((_, position) => position !== index));
                inputRef.current?.focus();
              }}
            >
              <span className={styles.label}>{tag}</span>
            </Tag>
          ))}
        </div>
      )}
      <div className={styles.entry}>
        <div className={styles.combobox}>
          <Input
            ref={mergedRef}
            id={id}
            size={size}
            invalid={invalid}
            type="text"
            role="combobox"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
            aria-expanded={open}
            aria-controls={open ? listId : undefined}
            aria-autocomplete="list"
            aria-activedescendant={
              activeOption ? optionId(highlight) : undefined
            }
            autoComplete="off"
            spellCheck={false}
            placeholder={placeholder}
            value={draft}
            disabled={disabled}
            readOnly={readOnly}
            onChange={(event) => {
              if (blocked) return;
              navigating.current = false;
              const text = event.target.value;
              const parts =
                composing.current || splitters.length === 0
                  ? [text]
                  : splitText(text, splitters);
              if (parts.length > 1) {
                // Typed a separator: commit what precedes it, keep the rest.
                commitAll(parts.slice(0, -1), parts[parts.length - 1]);
              } else {
                setDraft(text);
              }
              setOpen(true);
            }}
            onFocus={() => {
              if (!blocked) setOpen(true);
            }}
            // After a selection / Escape focus stays here: a click reopens.
            onClick={() => {
              if (!blocked) setOpen(true);
            }}
            onBlur={() => {
              setOpen(false);
              if (commitOnBlur) commit(draft);
            }}
            onCompositionStart={() => {
              composing.current = true;
            }}
            onCompositionEnd={() => {
              composing.current = false;
            }}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
          />
          {open && (
            <ul
              id={listId}
              role="listbox"
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledBy}
              className={styles.list}
            >
              {filtered.length === 0 && (
                <li className={styles.empty} role="presentation">
                  {emptyText ?? t("tagInput.empty")}
                </li>
              )}
              {filtered.map((suggestion, index) => (
                <li
                  key={`${suggestion.label}-${suggestion.tag}`}
                  id={optionId(index)}
                  role="option"
                  aria-selected={index === highlight}
                  tabIndex={-1}
                  className={styles.option}
                  data-active={index === highlight || undefined}
                  // mousedown runs before the input blurs: keep focus in the input.
                  onMouseDown={(event) => {
                    event.preventDefault();
                    select(suggestion);
                  }}
                  onMouseEnter={() => setHighlight(index)}
                >
                  {suggestion.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        {!readOnly && (
          <>
            <IconButton
              type="button"
              label={addLabel ?? t("tagInput.add")}
              shape="square"
              icon={<IconPlus aria-hidden />}
              disabled={disabled || !trimmed || tags.includes(trimmed)}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                commit(draft);
                inputRef.current?.focus();
              }}
            />
            <IconButton
              type="button"
              label={clearLabel ?? t("tagInput.clear")}
              shape="square"
              icon={<IconX aria-hidden />}
              disabled={disabled || tags.length === 0}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                setDraft("");
                setTags([]);
                inputRef.current?.focus();
              }}
            />
          </>
        )}
      </div>
      {name &&
        tags.map((tag, index) => (
          <input
            key={`${index}-${tag}`}
            type="hidden"
            name={name}
            value={tag}
            disabled={disabled}
          />
        ))}
    </div>
  );
};

export default TagInput;
