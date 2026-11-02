import type React from "react";
import { useRef, type CSSProperties } from "react";
import { getNextIndex } from "@minerva/core";
import { cn } from "../../utils/cn";
import { useControllableState } from "../../internal/useControllableState";
import { warnControlledProps } from "../../internal/devWarnings";
import { getDirection } from "../../internal/direction";
import { hooks } from "../../internal/stylingHooks";
import styles from "./segmentedControl.module.scss";
import type {
  SegmentedControlOption,
  SegmentedControlOptionObject,
  SegmentedControlProps,
} from "./types";

const normalize = <T extends string>(
  option: SegmentedControlOption<T>,
): SegmentedControlOptionObject<T> =>
  typeof option === "string" ? { value: option } : option;

/**
 * SegmentedControl: a single-choice segmented switch for modes and filters
 * (a `radiogroup` of `radio` segments sharing the width equally, with a
 * thumb sliding under the selected segment). Use Tabs when each choice has
 * its own content panel.
 * Keyboard: a roving tab stop (the selected segment, else the first enabled
 * one); the arrow keys move and select, skipping disabled segments and
 * wrapping around; Home / End select the first / last enabled segment.
 */
const SegmentedControl = <T extends string = string>({
  options,
  value: valueProp,
  defaultValue,
  onChange,
  size = "medium",
  color = "neutral",
  fullWidth = false,
  disabled = false,
  name,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  id,
  className,
  ref,
}: SegmentedControlProps<T>) => {
  if (process.env.NODE_ENV !== "production") {
    warnControlledProps("SegmentedControl", {
      prop: "value",
      value: valueProp,
      defaultProp: "defaultValue",
      defaultValue,
      handlerProp: "onChange",
      handler: onChange,
      locked: disabled,
      lockHint: "set `disabled`",
    });
  }
  const [value, setValue] = useControllableState<T | undefined>({
    value: valueProp,
    defaultValue,
    onChange: (next) => {
      if (next !== undefined) onChange?.(next);
    },
    name: "SegmentedControl",
  });
  const items = options.map(normalize);
  const segments = useRef<(HTMLDivElement | null)[]>([]);
  const isDisabled = (index: number) =>
    disabled || Boolean(items[index]?.disabled);
  const selectedIndex = items.findIndex((item) => item.value === value);
  // Roving tab stop: the selection, else the first enabled segment.
  const tabStop =
    selectedIndex >= 0 && !isDisabled(selectedIndex)
      ? selectedIndex
      : items.findIndex((_, index) => !isDisabled(index));

  const select = (index: number) => {
    if (isDisabled(index)) return;
    const next = items[index].value;
    if (next !== value) setValue(next);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    index: number,
  ) => {
    if (disabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!event.repeat) select(index);
      return;
    }
    const next = getNextIndex({
      currentIndex: index,
      count: items.length,
      key: event.key,
      orientation: "both",
      dir: getDirection(event.currentTarget),
      isDisabled,
    });
    if (next === null) return;
    event.preventDefault();
    select(next);
    segments.current[next]?.focus();
  };

  return (
    <div
      ref={ref}
      id={id}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-disabled={disabled || undefined}
      className={cn(
        styles.segmentedControl,
        styles[size],
        styles[color],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        className,
      )}
      style={
        {
          "--_segmented-control-count": Math.max(items.length, 1),
          "--_segmented-control-index": Math.max(selectedIndex, 0),
        } as CSSProperties
      }
      {...hooks("segmented-control", "root", { disabled, size, color })}
    >
      <span
        className={styles.indicator}
        hidden={selectedIndex < 0}
        aria-hidden
        {...hooks("segmented-control", "indicator")}
      />
      {items.map((item, index) => {
        const selected = index === selectedIndex;
        const itemDisabled = isDisabled(index);
        const label =
          item.label ?? (item.icon !== undefined ? undefined : item.value);
        return (
          <div
            key={item.value}
            ref={(element) => {
              segments.current[index] = element;
            }}
            role="radio"
            aria-checked={selected}
            aria-disabled={itemDisabled || undefined}
            aria-label={item["aria-label"]}
            tabIndex={!disabled && index === tabStop ? 0 : -1}
            className={styles.item}
            data-value={item.value}
            {...hooks("segmented-control", "item", {
              selected,
              disabled: itemDisabled,
            })}
            onClick={() => select(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {item.icon !== undefined && item.icon !== null ? (
              <span
                className={styles.icon}
                aria-hidden
                {...hooks("segmented-control", "icon")}
              >
                {item.icon}
              </span>
            ) : null}
            {label !== undefined && label !== null ? (
              <span
                className={styles.label}
                {...hooks("segmented-control", "label")}
              >
                {label}
              </span>
            ) : null}
          </div>
        );
      })}
      {name ? (
        <input
          type="hidden"
          name={name}
          value={value ?? ""}
          disabled={disabled}
        />
      ) : null}
    </div>
  );
};

export { SegmentedControl };
export default SegmentedControl;
