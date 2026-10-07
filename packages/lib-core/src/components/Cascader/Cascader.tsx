import React, { useState, useRef, useCallback, useEffect } from "react";
import { TextField } from "../TextField";
import { IoClose } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";
import CascaderPanel from "./CascaderPanel";
import type { CascaderProps, CascaderOption } from "./types";
import styles from "./cascader.module.scss";
import ReactDOM from "react-dom";

/** Resolve the option chain for a list of values (one value per level) */
const findOptionsByValues = (
  opts: CascaderOption[],
  values: (string | number)[],
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

/** Find the full path (ancestors + target) of an option in the tree */
const findOptionPath = (
  opts: CascaderOption[],
  target: CascaderOption,
): CascaderOption[] | null => {
  for (const opt of opts) {
    if (opt === target) return [opt];
    if (opt.children) {
      const subPath = findOptionPath(opt.children, target);
      if (subPath) return [opt, ...subPath];
    }
  }
  return null;
};

/** Stable default so effects depending on `options` don't re-run each render */
const EMPTY_OPTIONS: CascaderOption[] = [];

/** A flattened option together with the chain of options leading to it */
type SearchResult = CascaderOption & { path: CascaderOption[] };

/** Make a non-button element activate (via a native click) on Enter / Space. */
const activateOnEnterOrSpace = (e: React.KeyboardEvent<HTMLElement>) => {
  if (e.target !== e.currentTarget) return;
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    e.currentTarget.click();
  }
};

const Cascader: React.FC<CascaderProps> = ({
  label,
  name,
  options = EMPTY_OPTIONS,
  value,
  defaultValue,
  onChange,
  displayRender,
  disabled = false,
  placeholder = "Please select",
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
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<(string | number)[]>(
    value || defaultValue || [],
  );
  const [selectedOptions, setSelectedOptions] = useState<CascaderOption[]>(() =>
    findOptionsByValues(options, value || defaultValue || []),
  );
  const anchorRef = useRef<HTMLDivElement>(null);

  // Follow controlled `value` changes (and re-resolve labels when `options`
  // change, e.g. after loadData). Compare by content so inline array
  // literals from the parent don't reset local state on every render.
  const syncedValueKeyRef = useRef(JSON.stringify(value ?? null));
  const syncedOptionsRef = useRef(options);
  useEffect(() => {
    if (value === undefined) return;
    const valueKey = JSON.stringify(value);
    if (
      valueKey === syncedValueKeyRef.current &&
      options === syncedOptionsRef.current
    ) {
      return;
    }
    syncedValueKeyRef.current = valueKey;
    syncedOptionsRef.current = options;
    setSelectedValue(value);
    setSelectedOptions(findOptionsByValues(options, value));
  }, [value, options]);

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Open state captured on mousedown (before the input's focus handler opens
  // the dropdown), so the following click toggles from the pre-click state
  const openAtMouseDownRef = useRef(false);

  const handleSelectorClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setIsOpen(!openAtMouseDownRef.current);
      }
    },
    [disabled],
  );

  // === 关键修改：去掉 setTimeout，直接在 isOpen 时添加/移除事件监听 ===
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        anchorRef.current &&
        !anchorRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
        setSearchValue("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = useCallback(
    (newValue: (string | number)[], options: CascaderOption[]) => {
      setSelectedValue(newValue);
      setSelectedOptions(options);
      setSearchValue("");
      setSearchResults([]);
      onChange?.(newValue, options);
      setIsOpen(false);
    },
    [onChange],
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedValue([]);
      setSelectedOptions([]);
      onChange?.([], []);
    },
    [onChange],
  );

  const handleSearch = useCallback(
    (value: string) => {
      setSearchValue(value);
      if (!value) {
        setSearchResults([]);
        return;
      }

      const flattenOptions = (
        opts: CascaderOption[],
        path: CascaderOption[] = [],
      ): SearchResult[] => {
        return opts.reduce((acc, opt) => {
          const currentPath = [...path, opt];
          const currentOpt = { ...opt, path: currentPath };

          if (!opt.disabled) {
            acc.push(currentOpt);
            if (opt.children) {
              acc.push(...flattenOptions(opt.children, currentPath));
            }
          }

          return acc;
        }, [] as SearchResult[]);
      };

      const allOptions = flattenOptions(options);
      const filtered = allOptions.filter((option) => {
        if (filter) {
          return filter(value, option.path);
        }
        return option.path.some((o) =>
          o.label?.toString().toLowerCase().includes(value.toLowerCase()),
        );
      });

      setSearchResults(filtered);
    },
    [options, filter],
  );

  const renderDisplayValue = () => {
    if (searchValue && showSearch) {
      return searchValue;
    }
    if (displayRender) {
      const customLabel = displayRender(
        selectedOptions.map((o) => String(o.label)),
        selectedOptions,
      );
      return typeof customLabel === "string" ? customLabel : "";
    }
    return selectedOptions.map((o) => String(o.label)).join(" / ") || "";
  };

  // 修改下拉框位置计算逻辑，确保首次渲染时就有正确位置
  const updateDropdownPosition = useCallback(() => {
    if (!dropdownRef.current || !anchorRef.current) return;

    const anchorRect = anchorRef.current.getBoundingClientRect();
    const dropdownEl = dropdownRef.current;
    const viewportHeight = window.innerHeight;

    const { bottom, left, height } = anchorRect;
    const dropdownHeight = dropdownEl.offsetHeight || 300;

    const spaceBelow = viewportHeight - bottom;
    const spaceAbove = bottom - height;
    const showBelow = spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove;

    dropdownEl.style.position = "fixed";
    dropdownEl.style.left = `${left}px`;
    dropdownEl.style.width = `${anchorRect.width}px`;
    dropdownEl.style.zIndex = "1000";

    if (showBelow) {
      dropdownEl.style.top = `${bottom}px`;
      dropdownEl.style.bottom = "auto";
      dropdownEl.style.maxHeight = `${spaceBelow - 8}px`;
    } else {
      dropdownEl.style.bottom = `${viewportHeight - (bottom - height)}px`;
      dropdownEl.style.top = "auto";
      dropdownEl.style.maxHeight = `${spaceAbove - 8}px`;
    }
  }, []);

  // 修改下拉框渲染逻辑，使用 Portal
  const renderDropdown = () => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
      <div
        ref={dropdownRef}
        className={`${styles.dropdown} ${dropdownClassName || ""}`}
        style={{
          position: "fixed",
          visibility: "hidden",
          ...dropdownStyle,
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {searchValue && showSearch ? (
          <div className={styles.searchResults} role="listbox">
            {searchResults.length > 0 ? (
              searchResults.map((option) => (
                <div
                  key={`${option.value}-${option.path.length}`}
                  className={styles.searchOption}
                  role="option"
                  aria-selected={false}
                  tabIndex={0}
                  onKeyDown={activateOnEnterOrSpace}
                  onClick={() => {
                    const values = option.path.map((o) => o.value);
                    handleSelect(values, option.path);
                  }}
                >
                  {option.path.map((o) => o.label).join(" / ")}
                </div>
              ))
            ) : (
              <div className={styles.empty}>No results found</div>
            )}
          </div>
        ) : (
          <CascaderPanel
            label={label}
            name={name}
            options={options}
            activePath={selectedOptions}
            expandTrigger={expandTrigger}
            maxLevel={maxLevel}
            optionStyle={optionStyle}
            onLevelSelect={(option) => {
              const newPath = findOptionPath(options, option) ?? [option];
              if (!option.children || option.isLeaf) {
                handleSelect(
                  newPath.map((o) => o.value),
                  newPath,
                );
              }
              if (loadData && !option.children && !option.isLeaf) {
                loadData(newPath);
              }
            }}
            optionRender={optionRender}
          />
        )}
      </div>,
      document.body,
    );
  };

  // 使用 RAF 确保位置计算在渲染后执行
  useEffect(() => {
    if (!isOpen || !dropdownRef.current) return;

    const raf = requestAnimationFrame(() => {
      if (dropdownRef.current) {
        dropdownRef.current.style.visibility = "visible";
        updateDropdownPosition();
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [isOpen, updateDropdownPosition]);

  return (
    <div
      className={`${styles.cascader} ${className || ""}`}
      ref={anchorRef}
      style={{ width }}
      onKeyDown={(e) => {
        // events from the portaled dropdown bubble here through React
        if (e.key === "Escape" && isOpen) {
          e.stopPropagation();
          setIsOpen(false);
          setSearchValue("");
        }
      }}
    >
      <div
        className={`${styles.selector} ${disabled ? styles.disabled : ""} ${
          isOpen ? styles.focused : ""
        }`}
        onMouseDown={() => {
          openAtMouseDownRef.current = isOpen;
        }}
        onClick={handleSelectorClick}
      >
        <TextField
          label={label}
          name={name}
          value={renderDisplayValue()}
          readOnly={!showSearch}
          disabled={disabled}
          placeholder={placeholder}
          className={styles.input}
          onChange={(value) => showSearch && handleSearch(value)}
          onFocus={() => !disabled && setIsOpen(true)}
        />
        {allowClear && selectedValue.length > 0 && !disabled && (
          <span
            className={styles.clearIcon}
            role="button"
            tabIndex={0}
            aria-label="Clear"
            onKeyDown={activateOnEnterOrSpace}
            onClick={(e) => {
              e.stopPropagation();
              handleClear(e);
              setSearchValue("");
              setSearchResults([]);
            }}
          >
            <IoClose className={styles.icon} aria-hidden focusable={false} />
          </span>
        )}
        <span className={`${styles.arrow} ${isOpen ? styles.open : ""}`}>
          <IoChevronDown className={styles.icon} />
        </span>
      </div>
      {renderDropdown()}
    </div>
  );
};

export default Cascader;
