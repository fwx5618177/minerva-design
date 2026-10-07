import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../../utils/cn";
import { IconChevronDown, IconX } from "../../internal/icons";
import { Input } from "../Input";
import CascaderPanel from "./CascaderPanel";
import type { CascaderProps, CascaderOption } from "./types";
import { FloatingPanel } from "../../internal/FloatingPanel";
import { useControllableState } from "../../internal/useControllableState";
import { useMergedRefs } from "../../internal/mergeRefs";
import useI18n from "../../hooks/useI18n";
import { pickDataAttributes } from "../../internal/dataAttributes";
import {
  FormControlContext,
  useFormControlContext,
  useFormControlProps,
} from "../FormControl/context";
import styles from "./cascader.module.scss";

type CascaderValue = (string | number)[];

/** Resolve the option chain for a list of values (one value per level) */
const findOptionsByValues = (
  opts: CascaderOption[],
  values: CascaderValue,
): CascaderOption[] => {
  const result: CascaderOption[] = [];
  let level: CascaderOption[] | undefined = opts;
  for (const value of values) {
    const found: CascaderOption | undefined = level?.find(
      (o) => o.value === value,
    );
    if (!found) break;
    result.push(found);
    level = found.children;
  }
  return result;
};

/** Stable defaults so memos depending on them don't re-run each render */
const EMPTY_OPTIONS: CascaderOption[] = [];
const EMPTY_VALUE: CascaderValue = [];

/** A flattened option together with the chain of options leading to it */
type SearchResult = { option: CascaderOption; path: CascaderOption[] };

const flattenOptions = (
  opts: CascaderOption[],
  path: CascaderOption[] = [],
): SearchResult[] =>
  opts.flatMap((option) => {
    if (option.disabled) return [];
    const current = [...path, option];
    return [
      { option, path: current },
      ...(option.children ? flattenOptions(option.children, current) : []),
    ];
  });

/**
 * Cascader: pick a value from a tree of options, one column per level.
 * Supports search, lazy loading (loadData), hover expansion and full keyboard
 * navigation. The value can be controlled or uncontrolled. Inside a
 * FormControl the input picks up the field's id, label, description,
 * invalid, required, disabled and read-only state (explicit props win).
 */
const Cascader = ({
  ref,
  label,
  name,
  options = EMPTY_OPTIONS,
  value,
  defaultValue,
  onChange,
  displayRender,
  disabled: disabledProp,
  readOnly: readOnlyProp,
  required: requiredProp,
  invalid: invalidProp,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  style,
  placeholder,
  allowClear = true,
  expandTrigger = "click",
  className,
  showSearch = false,
  filter,
  loadData,
  dropdownClassName,
  optionRender,
  width = 240,
  maxLevel = 6,
  dropdownStyle,
  optionStyle,
  ...rest
}: CascaderProps) => {
  const { t } = useI18n();
  const fc = useFormControlContext();
  const field = useFormControlProps({
    id,
    "aria-describedby": ariaDescribedBy,
  });
  const disabled = disabledProp ?? fc?.disabled ?? false;
  const readOnly = readOnlyProp ?? fc?.readOnly ?? false;
  const required = requiredProp ?? fc?.required ?? false;
  const invalid = invalidProp ?? fc?.invalid ?? false;
  // A FormLabel names the input unless an explicit aria-label is given;
  // `label` stays as aria-label fallback (aria-labelledby wins when its
  // target exists, and is ignored when it does not).
  const labelledBy =
    ariaLabelledBy ?? (fc && !ariaLabel ? fc.labelId : undefined);
  const [selectedValue, setSelectedValue] = useControllableState<CascaderValue>(
    { value, defaultValue: defaultValue ?? EMPTY_VALUE },
  );
  const selectedOptions = useMemo(
    () => findOptionsByValues(options, selectedValue),
    [options, selectedValue],
  );

  const [isOpen, setIsOpen] = useState(false);
  // Opened from the keyboard: move focus into the panel
  const [focusPanel, setFocusPanel] = useState(false);
  const [expandedValues, setExpandedValues] = useState<CascaderValue>([]);
  const expandedPath = useMemo(
    () => findOptionsByValues(options, expandedValues),
    [options, expandedValues],
  );
  const [searchValue, setSearchValue] = useState("");

  const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);
  const [input, setInput] = useState<HTMLInputElement | null>(null);
  const setInputRef = useMergedRefs<HTMLInputElement>(setInput, ref);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const searching = showSearch && searchValue !== "";
  const searchResults = useMemo(() => {
    if (!searching) return [];
    const needle = searchValue.toLowerCase();
    return flattenOptions(options).filter(({ path }) =>
      filter
        ? filter(searchValue, path)
        : path.some((o) => String(o.label).toLowerCase().includes(needle)),
    );
  }, [searching, searchValue, options, filter]);

  const openDropdown = (fromKeyboard = false) => {
    if (disabled || readOnly) return;
    setExpandedValues(selectedValue);
    setFocusPanel(fromKeyboard);
    setIsOpen(true);
  };

  const closeDropdown = (returnFocus = false) => {
    setIsOpen(false);
    setSearchValue("");
    if (returnFocus) input?.focus();
  };

  const select = (path: CascaderOption[]) => {
    const next = path.map((o) => o.value);
    setSelectedValue(next);
    onChange?.(next, path);
    closeDropdown(true);
  };

  const handleActivate = (path: CascaderOption[], level: number) => {
    const option = path[path.length - 1];
    if (option.disabled) return;
    const atMaxLevel = level >= maxLevel - 1;
    const hasChildren = Boolean(option.children?.length);
    const lazy = Boolean(loadData) && !option.isLeaf && !option.children;
    if (!atMaxLevel && (hasChildren || lazy)) {
      setExpandedValues(path.map((o) => o.value));
      if (lazy && !option.loading) loadData?.(path);
      return;
    }
    select(path);
  };

  const handleClear = () => {
    setSelectedValue(EMPTY_VALUE);
    onChange?.([], []);
    setSearchValue("");
    input?.focus();
  };

  // Combobox semantics on the inner <input>
  useEffect(() => {
    if (!input) return;
    input.setAttribute("role", "combobox");
    input.setAttribute("aria-haspopup", "listbox");
    input.setAttribute("aria-expanded", String(isOpen));
    if (showSearch) input.setAttribute("aria-autocomplete", "list");
  }, [input, isOpen, showSearch]);

  /** Focus leaving both the field and the dropdown closes it */
  const handleBlur = (event: React.FocusEvent) => {
    const next = event.relatedTarget as Node | null;
    if (!isOpen || !next) return;
    if (anchor?.contains(next) || dropdownRef.current?.contains(next)) return;
    closeDropdown();
  };

  const focusFirstSearchResult = () =>
    dropdownRef.current?.querySelector<HTMLElement>('[role="option"]')?.focus();

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) openDropdown(true);
        else if (searching) focusFirstSearchResult();
        else setFocusPanel(true);
        break;
      case "Enter":
        e.preventDefault();
        if (!isOpen) openDropdown(true);
        break;
      case " ":
        if (showSearch) break;
        e.preventDefault();
        if (!isOpen) openDropdown(true);
        break;
      default:
        break;
    }
  };

  const labels = selectedOptions.map((o) => String(o.label));
  const displayValue = searching
    ? searchValue
    : displayRender
      ? displayRender(labels, selectedOptions)
      : labels.join(" / ");

  const renderSearchResults = () => (
    <div
      className={styles.searchResults}
      role="listbox"
      aria-label={label}
      // Focus lives on the options; the listbox itself is only a programmatic
      // focus target so the composite widget is reachable as a whole.
      tabIndex={-1}
      onKeyDown={(e) => {
        const items = Array.from(
          e.currentTarget.querySelectorAll<HTMLElement>('[role="option"]'),
        );
        const index = items.indexOf(e.target as HTMLElement);
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          const step = e.key === "ArrowDown" ? 1 : -1;
          items[(index + step + items.length) % items.length]?.focus();
        }
      }}
    >
      {searchResults.length > 0 ? (
        searchResults.map(({ path }) => (
          <div
            key={path.map((o) => o.value).join("/")}
            className={styles.searchOption}
            role="option"
            aria-selected={false}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                select(path);
              }
            }}
            onClick={() => select(path)}
          >
            {path.map((o) => o.label).join(" / ")}
          </div>
        ))
      ) : (
        <div className={styles.empty} role="status">
          {t("cascader.noResults")}
        </div>
      )}
    </div>
  );

  const dropdown = (
    // The popup only delegates events bubbling up from the focusable listbox
    // options inside it (Tab handling, and preventing focus loss on
    // mousedown); it is not itself a control. Escape / outside pointer down
    // are handled by its dismissable layer.
    <FloatingPanel
      ref={dropdownRef}
      open={isOpen}
      anchor={anchor}
      placement="bottom-start"
      offset={{ mainAxis: 4 }}
      matchAnchorWidth="min"
      branches={() => [anchor]}
      onDismiss={() => closeDropdown()}
      returnFocusOnEscape={() => input}
      focusable
      className={cn(styles.dropdown, dropdownClassName)}
      style={dropdownStyle}
      // keep focus where it is when clicking non-focusable areas
      onMouseDown={(e) => {
        if (!(e.target as HTMLElement).closest('[role="option"]')) {
          e.preventDefault();
        }
      }}
      onBlur={handleBlur}
      onKeyDown={(e) => {
        if (e.key === "Tab") closeDropdown();
      }}
    >
      {searching ? (
        renderSearchResults()
      ) : (
        <CascaderPanel
          key={focusPanel ? "keyboard" : "pointer"}
          label={label}
          options={options}
          expandedPath={expandedPath}
          selectedPath={selectedOptions}
          expandTrigger={expandTrigger}
          maxLevel={maxLevel}
          optionStyle={optionStyle}
          optionRender={optionRender}
          // Not the DOM autoFocus attribute: the panel only moves focus
          // into the listbox when the user opened it from the keyboard
          // (combobox pattern), never on page load.
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={focusPanel}
          onActivate={handleActivate}
          onHoverExpand={(path) => setExpandedValues(path.map((o) => o.value))}
          onExit={() => closeDropdown(true)}
        />
      )}
    </FloatingPanel>
  );

  return (
    <div
      {...pickDataAttributes(rest)}
      className={cn(styles.cascader, className)}
      ref={setAnchor}
      style={{ width, ...style }}
      onBlur={handleBlur}
    >
      {/* Pointer convenience: clicking anywhere on the selector toggles the
          dropdown. Keyboard users get the same via the inner combobox input
          (Enter / Space / ArrowDown / Escape in handleInputKeyDown). */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        className={cn(styles.selector, {
          [styles.disabled]: disabled,
          [styles.focused]: isOpen,
        })}
        onClick={() => {
          if (disabled || readOnly) return;
          if (!isOpen) openDropdown();
          else if (!showSearch) closeDropdown();
        }}
      >
        {/* The field state is resolved here (explicit props win over the
            FormControl), so the inner Input must not merge it again. */}
        <FormControlContext.Provider value={null}>
          <Input
            ref={setInputRef}
            variant="unstyled"
            id={field.id}
            aria-label={ariaLabel ?? label}
            aria-labelledby={labelledBy}
            aria-describedby={field["aria-describedby"]}
            aria-invalid={invalid || undefined}
            aria-required={required || undefined}
            aria-readonly={(showSearch && readOnly) || undefined}
            required={required}
            name={name}
            value={displayValue}
            readOnly={!showSearch || readOnly}
            disabled={disabled}
            placeholder={placeholder ?? t("cascader.placeholder")}
            className={styles.input}
            onChange={(e) => {
              if (!showSearch || readOnly) return;
              setSearchValue(e.target.value);
              if (!isOpen) openDropdown();
            }}
            onKeyDown={handleInputKeyDown}
          />
        </FormControlContext.Provider>
        {allowClear && selectedValue.length > 0 && !disabled && !readOnly && (
          <button
            type="button"
            className={styles.clearIcon}
            aria-label={t("cascader.clear")}
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
          >
            <IconX className={styles.icon} aria-hidden focusable={false} />
          </button>
        )}
        <span
          className={cn(styles.arrow, isOpen && styles.open)}
          aria-hidden="true"
        >
          <IconChevronDown className={styles.icon} />
        </span>
      </div>
      {dropdown}
    </div>
  );
};

export default Cascader;
