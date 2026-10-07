import React, { useState, useEffect } from "react";
import { IoChevronForward } from "react-icons/io5";
import type { CascaderPanelProps, CascaderOption } from "./types";
import styles from "./cascader.module.scss";

const CascaderPanel: React.FC<CascaderPanelProps> = ({
  label,
  options = [],
  activePath = [],
  expandTrigger = "click",
  maxLevel = 6,
  onLevelSelect,
  optionRender,
  optionStyle,
}) => {
  const [activeColumns, setActiveColumns] = useState<CascaderOption[][]>(() => {
    const columns: CascaderOption[][] = [options];

    for (let i = 0; i < activePath.length && i < maxLevel - 1; i++) {
      const activeOption = activePath[i];
      const currentColumn = columns[i];

      const matchedOption = currentColumn.find(
        (opt) => opt.value === activeOption.value,
      );

      if (matchedOption?.children?.length) {
        columns.push(matchedOption.children);
      }
    }

    return columns;
  });

  useEffect(() => {
    const columns: CascaderOption[][] = [options];

    for (let i = 0; i < activePath.length && i < maxLevel - 1; i++) {
      const activeOption = activePath[i];
      const currentColumn = columns[i];

      const matchedOption = currentColumn.find(
        (opt) => opt.value === activeOption.value,
      );

      if (matchedOption?.children?.length) {
        columns.push(matchedOption.children);
      }
    }

    setActiveColumns(columns);
  }, [activePath, options, maxLevel]);

  const [hoverOption, setHoverOption] = useState<{
    option: CascaderOption;
    level: number;
  } | null>(null);

  const handleOptionClick = (option: CascaderOption, level: number) => {
    if (option.disabled) return;
    onLevelSelect?.(option, level);

    if (option.children?.length && level < maxLevel - 1) {
      setActiveColumns((prev) => {
        const newColumns = [...prev.slice(0, level + 1)];
        newColumns.push(option.children!);
        return newColumns;
      });
    }
  };

  const handleOptionHover = (option: CascaderOption, level: number) => {
    if (option.disabled) return;
    setHoverOption({ option, level });

    if (
      expandTrigger === "hover" &&
      option.children?.length &&
      level < maxLevel - 1
    ) {
      const newColumns = [
        ...activeColumns.slice(0, level + 1),
        option.children,
      ];
      setActiveColumns(newColumns);
    }
  };

  // Keyboard: Enter / Space / ArrowRight select (or expand) the option,
  // ArrowUp / ArrowDown move between options of the same column.
  const handleOptionKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    option: CascaderOption,
    level: number,
  ) => {
    const item = e.currentTarget;
    const move = (next: Element | null) => {
      while (next && next.getAttribute("aria-disabled") === "true") {
        next =
          e.key === "ArrowDown"
            ? next.nextElementSibling
            : next.previousElementSibling;
      }
      (next as HTMLElement | null)?.focus();
    };
    switch (e.key) {
      case "Enter":
      case " ":
      case "ArrowRight":
        e.preventDefault();
        handleOptionClick(option, level);
        break;
      case "ArrowDown":
        e.preventDefault();
        move(item.nextElementSibling);
        break;
      case "ArrowUp":
        e.preventDefault();
        move(item.previousElementSibling);
        break;
    }
  };

  return (
    <div className={styles.panel}>
      {activeColumns.map((columnOptions, level) => (
        <ul
          key={level}
          className={styles.column}
          role="listbox"
          aria-label={`${label ?? "Options"} (${level + 1})`}
        >
          {columnOptions.map((option) => {
            const isActive = activePath[level]?.value === option.value;
            const isHovered =
              hoverOption?.option.value === option.value &&
              hoverOption.level === level;
            const hasChildren = option.children && option.children.length > 0;

            return (
              <li
                key={option.value}
                className={`
                  ${styles.option}
                  ${isActive ? styles.active : ""}
                  ${isHovered ? styles.hover : ""}
                  ${option.disabled ? styles.disabled : ""}
                  ${option.loading ? styles.loading : ""}
                `}
                style={optionStyle}
                role="option"
                aria-selected={isActive}
                aria-disabled={option.disabled || undefined}
                aria-expanded={
                  hasChildren && level < maxLevel - 1 ? isActive : undefined
                }
                tabIndex={option.disabled ? -1 : 0}
                onKeyDown={(e) => handleOptionKeyDown(e, option, level)}
                onClick={() => handleOptionClick(option, level)}
                onMouseEnter={() => handleOptionHover(option, level)}
                onMouseLeave={() => setHoverOption(null)}
              >
                {optionRender ? (
                  optionRender(option, level)
                ) : (
                  <>
                    <span className={styles.label}>{option.label}</span>
                    {hasChildren && level < maxLevel - 1 && (
                      <IoChevronForward className={styles.expandIcon} />
                    )}
                    {option.loading && (
                      <span className={styles.loading}>...</span>
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ul>
      ))}
    </div>
  );
};

export default CascaderPanel;
