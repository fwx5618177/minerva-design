import React, { useEffect, useId, useMemo, useState } from "react";
import classNames from "classnames";
import { IoClose } from "react-icons/io5";
import { TextField } from "../TextField";
import { Popper } from "../Popper";
import { ProgressIndicator } from "../ProgressIndicator";
import { Empty } from "../Empty";
import type { AutoCompleteProps, AutoCompleteOption } from "./types";
import { useControllableState } from "../../internal/useControllableState";
import { useMergedRefs } from "../../internal/mergeRefs";
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

  const open = () => setVisible(true);
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

  /** Groups in order of first appearance */
  const groupedOptions = useMemo(() => {
    if (!groupBy) return null;
    const groups = new Map<string, AutoCompleteOption[]>();
    processedOptions.forEach((option) => {
      const group = groupBy(option);
      const list = groups.get(group);
      if (list) list.push(option);
      else groups.set(group, [option]);
    });
    return Array.from(groups.entries());
  }, [processedOptions, groupBy]);

  /** Options in display order; keyboard / hover indexes refer to this list */
  const navigableOptions = useMemo(
    () =>
      groupedOptions
        ? groupedOptions.flatMap(([, list]) => list)
        : processedOptions,
    [groupedOptions, processedOptions],
  );

  const isSelected = (option: AutoCompleteOption) =>
    selectedTags.some((tag) => tag.value === option.value);

  const moveFocus = (step: 1 | -1) => {
    const count = navigableOptions.length;
    if (count === 0) return;
    // from "nothing focused", ArrowDown starts at the first option and
    // ArrowUp at the last one
    let index = focusedIndex >= 0 ? focusedIndex : step === 1 ? -1 : count;
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
      setInputValue(option.label);
      close();
    }
    onSelect?.(option);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
        const option = visible ? navigableOptions[focusedIndex] : undefined;
        if (option) {
          event.preventDefault();
          handleOptionSelect(option);
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
    if (option.disabled) return;
    handleOptionSelect(option);
    onOptionClick?.(option);
    input?.focus();
  };

  // Expose combobox semantics on the inner <input>
  const activeOptionId =
    visible && focusedIndex >= 0
      ? `${listboxId}-option-${focusedIndex}`
      : undefined;
  useEffect(() => {
    if (!input) return;
    input.setAttribute("role", "combobox");
    input.setAttribute("aria-autocomplete", "list");
    input.setAttribute("aria-expanded", String(visible));
    if (visible) input.setAttribute("aria-controls", listboxId);
    else input.removeAttribute("aria-controls");
    if (activeOptionId)
      input.setAttribute("aria-activedescendant", activeOptionId);
    else input.removeAttribute("aria-activedescendant");
  }, [input, visible, listboxId, activeOptionId]);

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
    const selected = multiple ? isSelected(option) : focusedIndex === index;
    return (
      <div
        key={option.value}
        className={classNames(styles.optionItem, {
          [styles.disabled]: option.disabled,
          [styles.highlight]: option.highlight,
          [styles.active]: hoveredIndex === index || focusedIndex === index,
          [styles.selected]: multiple && selected,
        })}
        style={option.style}
        role="option"
        id={`${listboxId}-option-${index}`}
        aria-selected={selected}
        aria-disabled={option.disabled || undefined}
        // keep focus (and the open dropdown) in the input while clicking
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => handleOptionClick(option)}
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
    <div ref={setContainer} className={styles.autoComplete}>
      {renderTags()}
      <TextField
        {...textFieldProps}
        label={label}
        name={name}
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
        visible={visible}
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
          {loading ? (
            <div className={styles.loading}>
              <ProgressIndicator />
            </div>
          ) : processedOptions.length > 0 ? (
            <div
              className={styles.optionList}
              role="listbox"
              id={listboxId}
              aria-label={label}
              aria-multiselectable={multiple || undefined}
            >
              {groupedOptions
                ? groupedOptions.map(([group, groupOptions]) => (
                    <div
                      key={group}
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
                  ))
                : processedOptions.map((option, index) =>
                    renderOptionItem(option, index),
                  )}
            </div>
          ) : (
            <div className={styles.empty}>
              {renderEmpty?.() || <Empty {...emptyProps} />}
            </div>
          )}
        </div>
      </Popper>
    </div>
  );
};

export default AutoComplete;
