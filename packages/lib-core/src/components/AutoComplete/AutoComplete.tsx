import React, { useState, useRef, useMemo, useEffect, useId } from "react";
import { IoClose } from "react-icons/io5";
import { TextField } from "../TextField";
import { Popper } from "../Popper";
import { ProgressIndicator } from "../ProgressIndicator";
import { Empty } from "../Empty";
import type { AutoCompleteProps, AutoCompleteOption } from "./types";
import styles from "./autoComplete.module.scss";

/**
 * AutoComplete 组件
 * 提供自动完成输入功能，支持基础和自定义两种模式
 * @param name - 输入框的名称
 * @param label - 输入框的标签
 * @param mode - 模式，可选 "basic" 或 "custom"
 * @param value - 输入框的值
 * @param onChange - 输入框值变化时的回调
 * @param options - 选项列表
 * @param defaultValue - 默认值
 * @param onSelect - 选择选项时的回调
 * @param filterOption - 自定义过滤逻辑
 * @param groupBy - 分组逻辑
 * @param multiple - 是否允许多选
 * @param maxTagCount - 最大标签数
 * @param renderOption - 自定义选项渲染
 * @param renderEmpty - 自定义空状态渲染
 * @param loading - 是否显示加载中状态
 * @param textFieldProps - TextField 组件的属性
 * @param emptyProps - Empty 组件的属性
 * @param placement - 下拉框位置
 * @param offset - 下拉框偏移量
 * @param dropdownBgColor - 下拉框背景色
 * @param highlightBgColor - 选项高亮背景色
 * @param hoverBgColor - 选项hover背景色
 * @param animation - 是否显示动画
 * @param sortOption - 自定义排序逻辑
 * @param onOptionClick - 选项点击事件
 * @param onDropdownVisibleChange - 下拉框显示/隐藏事件
 * @param popperProps - Popper 组件的属性
 * @returns 自动完成组件
 */
const AutoComplete: React.FC<AutoCompleteProps> = ({
  name,
  label,
  mode = "basic",
  value,
  onChange,
  options = [],
  defaultValue = "",
  onSelect,
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
  offset = {
    x: 0,
    y: 4,
  },
  dropdownBgColor,
  highlightBgColor,
  hoverBgColor,
  animation = true,
  sortOption,
  onOptionClick,
  onDropdownVisibleChange,
  popperProps,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [innerValue, setInnerValue] = useState(defaultValue);
  const [selectedTags, setSelectedTags] = useState<AutoCompleteOption[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = `${useId()}-listbox`;
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter options
  const filteredOptions = useMemo(() => {
    const searchValue = value !== undefined ? value : innerValue;
    return options.filter((option) =>
      filterOption
        ? filterOption(searchValue, option)
        : option.label.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [options, value, innerValue, filterOption]);

  /** 处理选项过滤和排序 */
  const processedOptions = useMemo(() => {
    // 使用 filteredOptions 替代直接过滤
    let result = filteredOptions;

    // 排序
    if (sortOption) {
      result = [...result].sort(sortOption);
    }

    return result;
  }, [filteredOptions, sortOption]);

  /** 分组后的选项 (按首次出现顺序) */
  const groupedOptions = useMemo(() => {
    if (!groupBy) return null;
    const groups = new Map<string, AutoCompleteOption[]>();
    processedOptions.forEach((option) => {
      const group = groupBy(option);
      const list = groups.get(group);
      if (list) {
        list.push(option);
      } else {
        groups.set(group, [option]);
      }
    });
    return Array.from(groups.entries());
  }, [processedOptions, groupBy]);

  /** 按显示顺序排列的选项, 键盘导航和 hover 索引都基于它 */
  const navigableOptions = useMemo(
    () =>
      groupedOptions
        ? groupedOptions.flatMap(([, groupOptions]) => groupOptions)
        : processedOptions,
    [groupedOptions, processedOptions],
  );

  /** 渲染基础模式的选项 */
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

  // 键盘事件映射
  const keyboardActions = {
    ArrowDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      setFocusedIndex((prev) =>
        prev < navigableOptions.length - 1 ? prev + 1 : 0,
      );
    },
    ArrowUp: (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      setFocusedIndex((prev) =>
        prev > 0 ? prev - 1 : navigableOptions.length - 1,
      );
    },
    Enter: () => {
      const option = navigableOptions[focusedIndex];
      if (option) {
        handleOptionSelect(option);
      }
    },
    Escape: () => setVisible(false),
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const action = keyboardActions[event.key as keyof typeof keyboardActions];
    action?.(event);
  };

  const handleInputChange = (value: string) => {
    setInnerValue(value);
    onChange?.(value);
    if (!visible) setVisible(true);
  };

  const handleOptionSelect = (option: AutoCompleteOption) => {
    if (option.disabled) return;

    if (multiple) {
      const newTags = selectedTags.some((tag) => tag.value === option.value)
        ? selectedTags.filter((tag) => tag.value !== option.value)
        : [...selectedTags, option];
      setSelectedTags(newTags);
      setInnerValue("");
      onChange?.("");
    } else {
      setInnerValue(option.label);
      onChange?.(option.label);
      setVisible(false);
    }
    onSelect?.(option);
  };

  const renderTags = () => {
    if (!multiple || selectedTags.length === 0) return null;

    const displayTags =
      maxTagCount && selectedTags.length > maxTagCount
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
              aria-label={`Remove ${tag.label}`}
              onClick={(e) => {
                e.stopPropagation();
                handleOptionSelect(tag);
              }}
            >
              <IoClose aria-hidden focusable={false} />
            </button>
          </span>
        ))}
        {maxTagCount && selectedTags.length > maxTagCount && (
          <span className={styles.more}>
            +{selectedTags.length - maxTagCount}
          </span>
        )}
      </div>
    );
  };

  // 处理选项点击
  const handleOptionClick = (option: AutoCompleteOption) => {
    if (option.disabled) return;
    handleOptionSelect(option);
    onOptionClick?.(option);
  };

  // 处理选项 hover
  const handleOptionHover = (index: number) => {
    setHoveredIndex(index);
  };

  /** 渲染单个选项; index 为其在 navigableOptions 中的位置 */
  const renderOptionItem = (option: AutoCompleteOption, index: number) => (
    <div
      key={option.value}
      className={`${styles.optionItem} ${
        option.disabled ? styles.disabled : ""
      } ${option.highlight ? styles.highlight : ""}`}
      style={{
        backgroundColor:
          hoveredIndex === index || focusedIndex === index
            ? hoverBgColor || "var(--surface-muted-color)"
            : option.highlight
              ? highlightBgColor || "var(--primary-color-subtle)"
              : "transparent",
      }}
      role="option"
      id={`${listboxId}-option-${index}`}
      aria-selected={focusedIndex === index}
      aria-disabled={option.disabled || undefined}
      onClick={() => handleOptionClick(option)}
      onMouseEnter={() => handleOptionHover(index)}
      onMouseLeave={() => handleOptionHover(-1)}
    >
      {mode === "basic"
        ? renderBasicOption(option)
        : renderOption
          ? renderOption(option)
          : renderBasicOption(option)}
    </div>
  );

  // 处理下拉框显示状态变化 (only when visibility changes, not when the
  // parent passes a new callback identity)
  const onDropdownVisibleChangeRef = useRef(onDropdownVisibleChange);
  useEffect(() => {
    onDropdownVisibleChangeRef.current = onDropdownVisibleChange;
  });
  useEffect(() => {
    onDropdownVisibleChangeRef.current?.(visible);
  }, [visible]);

  // Expose combobox semantics on the inner <input> (TextField does not
  // forward arbitrary ARIA props).
  const activeOptionId =
    visible && focusedIndex >= 0
      ? `${listboxId}-option-${focusedIndex}`
      : undefined;
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    input.setAttribute("role", "combobox");
    input.setAttribute("aria-autocomplete", "list");
    input.setAttribute("aria-expanded", String(visible));
    if (visible) input.setAttribute("aria-controls", listboxId);
    else input.removeAttribute("aria-controls");
    if (activeOptionId)
      input.setAttribute("aria-activedescendant", activeOptionId);
    else input.removeAttribute("aria-activedescendant");
  }, [visible, listboxId, activeOptionId]);

  return (
    <div ref={containerRef} className={styles.autoComplete}>
      {renderTags()}
      <TextField
        {...textFieldProps}
        label={label}
        name={name}
        ref={inputRef}
        value={value !== undefined ? value : innerValue}
        onChange={handleInputChange}
        onFocus={() => setVisible(true)}
        onBlur={() => setTimeout(() => setVisible(false), 200)}
        onKeyDown={handleKeyDown}
      />

      {visible && (
        <Popper
          anchorEl={containerRef.current}
          visible={visible}
          placement={placement}
          offset={offset}
          {...popperProps}
        >
          <div
            className={styles.dropdown}
            style={
              {
                backgroundColor: dropdownBgColor,
                animation: animation ? "slideIn 0.2s ease-out" : "none",
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
              <div className={styles.optionList} role="listbox" id={listboxId}>
                {groupedOptions
                  ? groupedOptions.map(([group, groupOptions]) => (
                      <div key={group} className={styles.optionGroup}>
                        <div className={styles.groupLabel}>{group}</div>
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
      )}
    </div>
  );
};

export default AutoComplete;
