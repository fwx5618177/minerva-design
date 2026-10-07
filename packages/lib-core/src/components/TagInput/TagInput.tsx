import { useId, useRef, useState, type KeyboardEvent } from "react";
import { LuPlus, LuX } from "react-icons/lu";
import { cn } from "../../utils/cn";
import useI18n from "../../hooks/useI18n";
import { useMergedRefs } from "../../internal/mergeRefs";
import { useControllableState } from "../../internal/useControllableState";
import { useFormControlContext } from "../FormControl/context";
import { IconButton } from "../IconButton";
import { Input } from "../Input/Input";
import { Tag } from "../Tag";
import type { TagInputProps } from "./types";
import styles from "./tagInput.module.scss";

const EMPTY: readonly string[] = [];

interface Suggestion {
  /** The tag added when selected */
  tag: string;
  label: string;
  /** Text matched against the draft */
  filterValue: string;
}

/**
 * TagInput: free-form tags with suggestions. Enter / the add button / blur
 * add the trimmed draft; arrow keys pick a suggestion; Escape discards the
 * draft. IME composition never commits. FormControl-aware; `ref` reaches the
 * text input.
 */
export const TagInput = ({
  value,
  defaultValue = EMPTY,
  onChange,
  options = EMPTY,
  commitOnBlur = true,
  id,
  name,
  placeholder,
  "aria-label": ariaLabel,
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
  ref,
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

  const [tags, setTags] = useControllableState<readonly string[]>({
    value,
    defaultValue,
    onChange: onChange as ((next: readonly string[]) => void) | undefined,
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

  const commit = (text: string) => {
    if (blocked || composing.current) return;
    const tag = text.trim();
    if (tag && !tags.includes(tag)) setTags([...tags, tag]);
    navigating.current = false;
    setDraft("");
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
        if (!navigating.current && (!trimmed || tags.includes(trimmed))) {
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
    }
  };

  const removeText = (tag: string) =>
    removeLabel ? removeLabel(tag) : t("tagInput.remove", { tag });
  const activeOption = open ? filtered[highlight] : undefined;
  const optionId = (index: number) => `${listId}-option-${index}`;

  return (
    <div className={cn(styles.root, className)}>
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
              setDraft(event.target.value);
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
          />
          {open && (
            <ul
              id={listId}
              role="listbox"
              aria-label={ariaLabel}
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
              icon={<LuPlus aria-hidden />}
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
              icon={<LuX aria-hidden />}
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
