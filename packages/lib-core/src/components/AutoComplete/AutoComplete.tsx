import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { IoClose } from "react-icons/io5";
import { TextField } from "../TextField";
import { Popper } from "../Popper";
import { ProgressIndicator } from "../ProgressIndicator";
import { Empty } from "../Empty";
import type { AutoCompleteProps, AutoCompleteOption } from "./types";
import { useControllableState } from "../../internal/useControllableState";
import { useMergedRefs } from "../../internal/mergeRefs";
import { useFormControlProps } from "../FormControl/context";
import useI18n from "../../hooks/useI18n";
import styles from "./autoComplete.module.scss";

const DEFAULT_OFFSET = Object.freeze({ x: 0, y: 4 });
const EMPTY_OPTIONS: AutoCompleteOption[] = [];

const PLACEMENT = {
  top: "topStart",
  bottom: "bottomStart",
  left: "leftStart",
  right: "rightStart",
} as const;

/**
 * AutoComplete: a text input (combobox) that suggests options from a list.
 * Supports single and multiple selection, grouping, custom rendering and
 * async loading. Input text and multiple selection can be controlled or not.
 */
const AutoComplete = ({
  ref,
  name,
  label,
  mode = "basic",
  value,
  onChange,
  options = EMPTY_OPTIONS,
  defaultValue = "",
  onSelect,
  selectedOptions: selectedOptionsProp,
  defaultSelectedOptions = EMPTY_OPTIONS,
  onSelectedOptionsChange,
  filterOption,
  groupBy,
  multiple = false,
  maxTagCount,
  renderOption,
  renderEmpty,
  loading = false,
  textFieldProps,
  emptyProps,
  placement = "bottom",
  offset = DEFAULT_OFFSET,
  dropdownBgColor,
  highlightBgColor,
  hoverBgColor,
  animation = true,
  sortOption,
  onOptionClick,
  onDropdownVisibleChange,
  popperProps,
  onSubmit,
  autoHighlight = false,
  fillOnSelect = true,
  className,
  groupMode = "first",
}: AutoCompleteProps) => {
  const { t } = useI18n();
  const [inputValue, setInputValue] = useControllableState({
    value,
    defaultValue,
    onChange,
  });
  const [selectedTags, setSelectedTags] = useControllableState({
    value: selectedOptionsProp,
    defaultValue: defaultSelectedOptions,
    onChange: onSelectedOptionsChange,
  });
  const [visible, setVisible] = useControllableState({
    defaultValue: false,
    onChange: onDropdownVisibleChange,
  });
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [input, setInput] = useState<HTMLInputElement | null>(null);
  const setInputRef = useMergedRefs<HTMLInputElement>(setInput, ref);
  const [dropdown, setDropdown] = useState<HTMLDivElement | null>(null);

  const listboxId = `${useId()}-listbox`;
  // IME composition in progress: Enter / arrows belong to the IME.
  const composing = useRef(false);

  // FormControl wiring (id, disabled / read-only state, aria-*). The
  // TextField's own disabled / readOnly props still apply.
  const field = useFormControlProps({
    id: textFieldProps?.id,
    disabled: textFieldProps?.disabled,
    readOnly: textFieldProps?.readOnly,
  });
  const blocked = !!field.disabled || !!field.readOnly;
  // A disabled / read-only field never shows (or keeps) the dropdown.
  const shown = visible && !blocked;

  const open = () => {
    if (!blocked) setVisible(true);
  };
  const close = () => {
    setVisible(false);
    setFocusedIndex(-1);
  };

  const processedOptions = useMemo(() => {
    const search = inputValue.toLowerCase();
    const result = options.filter((option) =>
      filterOption
        ? filterOption(inputValue, option)
        : option.label.toLowerCase().includes(search),
    );
    return sortOption ? [...result].sort(sortOption) : result;
  }, [options, inputValue, filterOption, sortOption]);

  /** Groups in order of first appearance, or runs of adjacent options */
  const groupedOptions = useMemo(() => {
    if (!groupBy) return null;
    if (groupMode === "adjacent") {
      const runs: [string, AutoCompleteOption[]][] = [];
      processedOptions.forEach((option) => {
        const group = groupBy(option);
        const last = runs[runs.length - 1];
        if (last && last[0] === group) last[1].push(option);
        else runs.push([group, [option]]);
      });
      return runs;
    }
    const groups = new Map<string, AutoCompleteOption[]>();
    processedOptions.forEach((option) => {
      const group = groupBy(option);
      const list = groups.get(group);
      if (list) list.push(option);
      else groups.set(group, [option]);
    });
    return Array.from(groups.entries());
  }, [processedOptions, groupBy, groupMode]);

  /** Options in display order; keyboard / hover indexes refer to this list */
  const navigableOptions = useMemo(
    () =>
      groupedOptions
        ? groupedOptions.flatMap(([, list]) => list)
        : processedOptions,
    [groupedOptions, processedOptions],
  );

  // With autoHighlight the first enabled option is active until the user
  // moves the highlight.
  const activeIndex =
    focusedIndex >= 0
      ? focusedIndex
      : autoHighlight && shown
        ? navigableOptions.findIndex((option) => !option.disabled)
        : -1;

  const isSelected = (option: AutoCompleteOption) =>
    selectedTags.some((tag) => tag.value === option.value);

  const moveFocus = (step: 1 | -1) => {
    const count = navigableOptions.length;
    if (count === 0) return;
    // from "nothing focused", ArrowDown starts at the first option and
    // ArrowUp at the last one
    let index = activeIndex >= 0 ? activeIndex : step === 1 ? -1 : count;
    for (let i = 0; i < count; i += 1) {
      index = (index + step + count) % count;
      if (!navigableOptions[index].disabled) {
        setFocusedIndex(index);
        return;
      }
    }
  };

  const handleOptionSelect = (option: AutoCompleteOption) => {
    if (option.disabled) return;
    if (multiple) {
      setSelectedTags((prev) =>
        prev.some((tag) => tag.value === option.value)
          ? prev.filter((tag) => tag.value !== option.value)
          : [...prev, option],
      );
      setInputValue("");
      setFocusedIndex(-1);
      // stay open so several options can be picked in a row
    } else {
      if (fillOnSelect) setInputValue(option.label);
      close();
    }
    onSelect?.(option);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      blocked ||
      composing.current ||
      event.nativeEvent.isComposing ||
      event.keyCode === 229
    )
      return;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!visible) open();
        moveFocus(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!visible) open();
        moveFocus(-1);
        break;
      case "Enter": {
        const option = shown ? navigableOptions[activeIndex] : undefined;
        if (option) {
          event.preventDefault();
          handleOptionSelect(option);
        } else if (onSubmit && inputValue.trim()) {
          // No active option: submit the typed text (e.g. a search).
          event.preventDefault();
          onSubmit(inputValue.trim());
          close();
        }
        break;
      }
      case "Escape":
        if (visible) {
          event.preventDefault();
          close();
        }
        break;
      case "Backspace":
        if (multiple && inputValue === "" && selectedTags.length > 0) {
          handleOptionSelect(selectedTags[selectedTags.length - 1]);
        }
        break;
      default:
        break;
    }
  };

  const handleInputChange = (next: string) => {
    setInputValue(next);
    setFocusedIndex(-1);
    open();
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const next = event.relatedTarget as Node | null;
    if (next && (dropdown?.contains(next) || container?.contains(next))) return;
    close();
  };

  const handleOptionClick = (option: AutoCompleteOption) => {
    if (option.disabled || composing.current) return;
    handleOptionSelect(option);
    onOptionClick?.(option);
    input?.focus();
  };

  // Expose combobox semantics on the inner <input>
  const activeOptionId =
    shown && activeIndex >= 0
      ? `${listboxId}-option-${activeIndex}`
      : undefined;
  useEffect(() => {
    if (!input) return;
    input.setAttribute("role", "combobox");
    input.setAttribute("aria-autocomplete", "list");
    input.setAttribute("aria-expanded", String(shown));
    if (shown) input.setAttribute("aria-controls", listboxId);
    else input.removeAttribute("aria-controls");
    if (activeOptionId)
      input.setAttribute("aria-activedescendant", activeOptionId);
    else input.removeAttribute("aria-activedescendant");
  }, [input, shown, listboxId, activeOptionId]);

  // Clicking the still-focused input (after a pick or Escape) reopens the
  // dropdown; focus alone does not fire again.
  const reopenRef = useRef(() => {});
  useEffect(() => {
    reopenRef.current = () => {
      if (!visible) open();
    };
  });
  useEffect(() => {
    if (!input) return;
    const onClick = () => reopenRef.current();
    input.addEventListener("click", onClick);
    return () => input.removeEventListener("click", onClick);
  }, [input]);

  // Keep the keyboard-focused option scrolled into view
  useEffect(() => {
    if (!activeOptionId) return;
    document
      .getElementById(activeOptionId)
      ?.scrollIntoView?.({ block: "nearest" });
  }, [activeOptionId]);

  const renderBasicOption = (option: AutoCompleteOption) => (
    <div className={styles.basicOption}>
      {option.icon && <span className={styles.icon}>{option.icon}</span>}
      <div className={styles.content}>
        <div className={styles.label}>{option.label}</div>
        {option.description && (
          <div className={styles.description}>{option.description}</div>
        )}
      </div>
    </div>
  );

  const renderOptionItem = (option: AutoCompleteOption, index: number) => {
    const active = activeIndex === index;
    const selected = multiple ? isSelected(option) : active;
    return (
      <div
        key={option.value}
        className={classNames(styles.optionItem, {
          [styles.disabled]: option.disabled,
          [styles.highlight]: option.highlight,
          [styles.active]: hoveredIndex === index || active,
          [styles.selected]: multiple && selected,
        })}
        style={option.style}
        role="option"
        // Focus stays in the input (aria-activedescendant); -1 keeps the
        // option out of the tab order while making it programmatically
        // focusable.
        tabIndex={-1}
        id={`${listboxId}-option-${index}`}
        aria-selected={selected}
        aria-disabled={option.disabled || undefined}
        // keep focus (and the open dropdown) in the input while clicking
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => handleOptionClick(option)}
        onKeyDown={(e) => {
          if (e.key !== "Enter" && e.key !== " ") return;
          e.preventDefault();
          handleOptionClick(option);
        }}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(-1)}
      >
        {mode === "custom" && renderOption
          ? renderOption(option)
          : renderBasicOption(option)}
      </div>
    );
  };

  const renderTags = () => {
    if (!multiple || selectedTags.length === 0) return null;
    const hidden =
      maxTagCount !== undefined && selectedTags.length > maxTagCount
        ? selectedTags.length - maxTagCount
        : 0;
    const displayTags = hidden
      ? selectedTags.slice(0, maxTagCount)
      : selectedTags;
    return (
      <div className={styles.tags}>
        {displayTags.map((tag) => (
          <span key={tag.value} className={styles.tag}>
            {tag.label}
            <button
              type="button"
              className={styles.tagClose}
              aria-label={t("autoComplete.removeTag", { label: tag.label })}
              onClick={() => handleOptionSelect(tag)}
            >
              <IoClose aria-hidden focusable={false} />
            </button>
          </span>
        ))}
        {hidden > 0 && (
          <span
            className={styles.more}
            aria-label={t("autoComplete.moreTags", { count: hidden })}
          >
            +{hidden}
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      ref={setContainer}
      className={classNames(styles.autoComplete, className)}
      onCompositionStart={() => {
        composing.current = true;
      }}
      onCompositionEnd={() => {
        composing.current = false;
      }}
    >
      {renderTags()}
      <TextField
        {...textFieldProps}
        id={field.id}
        disabled={field.disabled}
        readOnly={field.readOnly}
        label={label ?? ""}
        // name / label are optional here (e.g. a search box labelled by
        // textFieldProps.ariaLabel); TextField tolerates them being absent.
        name={name as string}
        ref={setInputRef}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={(e) => {
          open();
          textFieldProps?.onFocus?.(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
          textFieldProps?.onBlur?.(e);
        }}
        onKeyDown={(e) => {
          handleKeyDown(e);
          textFieldProps?.onKeyDown?.(e);
        }}
      />

      <Popper
        type="select"
        role="presentation"
        tabIndex={-1}
        trigger="manual"
        matchAnchorWidth="min"
        closeOnEscape={false}
        onClickAway={close}
        {...popperProps}
        ref={setDropdown}
        anchorEl={container}
        visible={shown}
        placement={PLACEMENT[placement]}
        offset={offset}
      >
        <div
          className={classNames(styles.dropdown, animation && styles.animated)}
          style={
            {
              backgroundColor: dropdownBgColor,
              "--hover-bg-color": hoverBgColor,
              "--highlight-bg-color": highlightBgColor,
            } as React.CSSProperties
          }
        >
          {/* While open the listbox always exists (aria-controls target);
              loading / empty states are presentational rows inside it. */}
          <div
            className={styles.optionList}
            role="listbox"
            id={listboxId}
            aria-label={label}
            aria-multiselectable={multiple || undefined}
            aria-busy={loading || undefined}
          >
            {loading ? (
              <div role="presentation" className={styles.loading}>
                <ProgressIndicator />
              </div>
            ) : processedOptions.length > 0 ? (
              <>
                {groupedOptions
                  ? groupedOptions.map(([group, groupOptions], groupIndex) =>
                      group === "" ? (
                        // ungrouped options: no heading
                        <React.Fragment key={`${groupIndex}-`}>
                          {groupOptions.map((option) =>
                            renderOptionItem(
                              option,
                              navigableOptions.indexOf(option),
                            ),
                          )}
                        </React.Fragment>
                      ) : (
                        <div
                          key={`${groupIndex}-${group}`}
                          className={styles.optionGroup}
                          role="group"
                          aria-label={group}
                        >
                          <div className={styles.groupLabel} aria-hidden="true">
                            {group}
                          </div>
                          {groupOptions.map((option) =>
                            renderOptionItem(
                              option,
                              navigableOptions.indexOf(option),
                            ),
                          )}
                        </div>
                      ),
                    )
                  : processedOptions.map((option, index) =>
                      renderOptionItem(option, index),
                    )}
              </>
            ) : (
              <div role="presentation" className={styles.empty}>
                {renderEmpty?.() || <Empty {...emptyProps} />}
              </div>
            )}
          </div>
        </div>
      </Popper>
    </div>
  );
};

export default AutoComplete;
