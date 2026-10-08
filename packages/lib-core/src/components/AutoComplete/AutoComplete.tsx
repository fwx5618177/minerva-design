import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "../../utils/cn";
import { Input } from "../Input";
import { ProgressIndicator } from "../ProgressIndicator";
import { Empty } from "../Empty";
import type { AutoCompleteProps, AutoCompleteOption } from "./types";
import { FloatingPanel } from "../../internal/FloatingPanel";
import { useControllableState } from "../../internal/useControllableState";
import { warnControlledProps } from "../../internal/devWarnings";
import { useMergedRefs } from "../../internal/mergeRefs";
import { useFormControlProps } from "../FormControl/context";
import { hooks } from "../../internal/stylingHooks";
import styles from "./autoComplete.module.scss";
import { ESCAPE_CONSUMER_ATTRIBUTE } from "@minerva/core";

const DEFAULT_OFFSET = Object.freeze({ x: 0, y: 4 });
const EMPTY_OPTIONS: AutoCompleteOption[] = [];

const PLACEMENT = {
  top: "top-start",
  bottom: "bottom-start",
  left: "left-start",
  right: "right-start",
} as const;

/**
 * AutoComplete: a text input (combobox) that suggests options from a list.
 * Supports grouping, custom rendering and async loading; the input text can
 * be controlled or not. Focus stays in the input (`aria-activedescendant`).
 * For picking several values use `TagInput`.
 */
const AutoComplete = ({
  ref,
  name,
  label,
  mode = "basic",
  value,
  onChange,
  options = EMPTY_OPTIONS,
  defaultValue: defaultValueProp,
  onSelect,
  filterOption,
  groupBy,
  renderOption,
  renderEmpty,
  loading = false,
  inputProps,
  emptyProps,
  placement = "bottom",
  offset = DEFAULT_OFFSET,
  animation = true,
  sortOption,
  onOptionClick,
  onDropdownVisibleChange,
  dropdownClassName,
  onSubmit,
  autoHighlight = false,
  fillOnSelect = true,
  className,
  groupMode = "first",
}: AutoCompleteProps) => {
  const [inputValue, setInputValue] = useControllableState({
    value,
    defaultValue: defaultValueProp ?? "",
    onChange,
    name: "AutoComplete",
  });
  const [visible, setVisible] = useControllableState({
    defaultValue: false,
    onChange: onDropdownVisibleChange,
    name: "AutoComplete",
    prop: "open",
  });
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [input, setInput] = useState<HTMLInputElement | null>(null);
  const setInputRef = useMergedRefs<HTMLInputElement>(setInput, ref);
  const [dropdown, setDropdown] = useState<HTMLDivElement | null>(null);
  const vertical = placement === "top" || placement === "bottom";

  const baseId = useId();
  const listboxId = `${baseId}-listbox`;
  // IME composition in progress: Enter / arrows belong to the IME.
  const composing = useRef(false);

  // FormControl wiring (id, disabled / read-only state, aria-*). The
  // input's own disabled / readOnly props still apply.
  const field = useFormControlProps({
    id: inputProps?.id,
    disabled: inputProps?.disabled,
    readOnly: inputProps?.readOnly,
  });
  const inputId = field.id ?? `${baseId}-input`;
  const blocked = !!field.disabled || !!field.readOnly;
  if (process.env.NODE_ENV !== "production") {
    warnControlledProps("AutoComplete", {
      prop: "value",
      value,
      defaultProp: "defaultValue",
      defaultValue: defaultValueProp,
      handlerProp: "onChange",
      handler: onChange,
      locked: blocked,
      lockHint: "set `inputProps.disabled` / `inputProps.readOnly`",
    });
  }
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
    if (fillOnSelect) setInputValue(option.label);
    close();
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
        // Open: the dropdown's dismissable layer closes it (topmost only).
        // Closed: clears the text (APG combobox), `onChange("")`.
        if (!shown && inputValue !== "") {
          event.preventDefault();
          setInputValue("");
          setFocusedIndex(-1);
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
    // Closed with text: Escape clears it instead of closing an enclosing
    // Modal / Drawer / Popover
    if (!shown && inputValue !== "") {
      input.setAttribute(ESCAPE_CONSUMER_ATTRIBUTE, "");
    } else input.removeAttribute(ESCAPE_CONSUMER_ATTRIBUTE);
    if (shown) input.setAttribute("aria-controls", listboxId);
    else input.removeAttribute("aria-controls");
    if (activeOptionId)
      input.setAttribute("aria-activedescendant", activeOptionId);
    else input.removeAttribute("aria-activedescendant");
  }, [input, shown, listboxId, activeOptionId, inputValue]);

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
    const highlighted = hoveredIndex === index || active;
    return (
      <div
        key={option.value}
        className={cn(styles.optionItem, {
          [styles.disabled]: option.disabled,
          [styles.highlight]: option.highlight,
          [styles.active]: highlighted,
        })}
        style={option.style}
        role="option"
        // Focus stays in the input (aria-activedescendant); -1 keeps the
        // option out of the tab order while making it programmatically
        // focusable.
        tabIndex={-1}
        id={`${listboxId}-option-${index}`}
        aria-selected={active}
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
        {...hooks("autocomplete", "item", {
          highlighted,
          disabled: option.disabled,
        })}
      >
        {mode === "custom" && renderOption
          ? renderOption(option)
          : renderBasicOption(option)}
      </div>
    );
  };

  return (
    <div
      ref={setContainer}
      className={cn(styles.autoComplete, className)}
      onCompositionStart={() => {
        composing.current = true;
      }}
      onCompositionEnd={() => {
        composing.current = false;
      }}
      {...hooks("autocomplete", "root", {
        state: shown ? "open" : "closed",
        disabled: !!field.disabled,
        readonly: !!field.readOnly,
        loading,
      })}
    >
      {label && (
        <label
          htmlFor={inputId}
          className={styles.label}
          {...hooks("autocomplete", "label")}
        >
          {label}
        </label>
      )}
      <Input
        {...inputProps}
        id={inputId}
        disabled={field.disabled}
        readOnly={field.readOnly}
        name={name}
        ref={setInputRef}
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={(e) => {
          open();
          inputProps?.onFocus?.(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
          inputProps?.onBlur?.(e);
        }}
        onKeyDown={(e) => {
          handleKeyDown(e);
          inputProps?.onKeyDown?.(e);
        }}
      />

      <FloatingPanel
        ref={setDropdown}
        open={shown}
        anchor={container}
        placement={PLACEMENT[placement]}
        offset={{
          mainAxis: vertical ? offset.y : offset.x,
          crossAxis: vertical ? offset.x : offset.y,
        }}
        matchAnchorWidth="min"
        // the field (label, input, suffix) is part of the dropdown layer
        branches={() => [container]}
        onEscapeKeyDown={(event) => {
          // Escape during IME composition cancels the composition only
          if (composing.current || event.isComposing) event.preventDefault();
        }}
        onDismiss={close}
        returnFocusOnEscape={() => input}
        className={cn(styles.popup, dropdownClassName)}
        {...hooks("autocomplete", "content", { state: "open" })}
      >
        <div className={cn(styles.dropdown, animation && styles.animated)}>
          {/* While open the listbox always exists (aria-controls target);
              loading / empty states are presentational rows inside it. */}
          <div
            className={styles.optionList}
            role="listbox"
            id={listboxId}
            aria-label={label}
            aria-busy={loading || undefined}
            {...hooks("autocomplete", "list")}
          >
            {loading ? (
              <div
                role="presentation"
                className={styles.loading}
                {...hooks("autocomplete", "loading")}
              >
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
                          <div
                            className={styles.groupLabel}
                            aria-hidden="true"
                            {...hooks("autocomplete", "group-label")}
                          >
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
              <div
                role="presentation"
                className={styles.empty}
                {...hooks("autocomplete", "empty")}
              >
                {renderEmpty?.() || <Empty {...emptyProps} />}
              </div>
            )}
          </div>
        </div>
      </FloatingPanel>
    </div>
  );
};

export default AutoComplete;
