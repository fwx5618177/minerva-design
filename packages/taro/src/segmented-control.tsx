import { useEffect, useId, type CSSProperties, type ReactNode } from "react";
import { View, Text } from "@tarojs/components";
import { cn } from "@minerva/core";
import { useH5List } from "./h5";
import { Part, useValue, type NativeProps } from "./shared";

/** A segment of a SegmentedControl */
export interface SegmentedControlOptionObject<T extends string = string> {
  /** Value of the segment */
  value: T;
  /** Visible label (default: the value, unless an icon is given) */
  label?: ReactNode;
  /** Icon shown before the label (alone for an icon-only segment) */
  icon?: ReactNode;
  /** Blocks this segment */
  disabled?: boolean;
  /** Accessible name; required for an icon-only segment */
  "aria-label"?: string;
}
/** A segment: a plain string (value and label) or an option object */
export type SegmentedControlOption<T extends string = string> =
  T | SegmentedControlOptionObject<T>;
export interface SegmentedControlProps<T extends string = string> extends Omit<
  NativeProps,
  "children"
> {
  /** The segments: strings or option objects */
  options: readonly SegmentedControlOption<NoInfer<T>>[];
  /** Selected value (controlled) */
  value?: NoInfer<T>;
  /** Initially selected value (uncontrolled) */
  defaultValue?: NoInfer<T>;
  /** Called with the selected value */
  onChange?: (value: T) => void;
  /** Segment density (default "medium") */
  size?: "small" | "medium" | "large";
  /** Thumb color (default "neutral") */
  color?: "neutral" | "primary";
  /** Fills the width of the container (default false) */
  fullWidth?: boolean;
  /** Blocks every segment (default false) */
  disabled?: boolean;
}
/**
 * A single-choice segmented switch (a radiogroup of equal-width segments
 * with a sliding thumb): tap a segment to select it. On H5 the arrow keys
 * move and select, skipping disabled segments, and Home / End jump to the
 * ends.
 */
export function SegmentedControl<T extends string = string>({
  options,
  value,
  defaultValue,
  onChange,
  size = "medium",
  color = "neutral",
  fullWidth = false,
  disabled = false,
  ...props
}: SegmentedControlProps<T>) {
  const [selected, set] = useValue<T | undefined>(
    value,
    defaultValue,
    (next) => {
      if (next !== undefined) onChange?.(next);
    },
  );
  const items = options.map((option) =>
    typeof option === "string" ? { value: option } : option,
  ) as SegmentedControlOptionObject<T>[];
  const index = items.findIndex((item) => item.value === selected);
  const isDisabled = (i: number) => disabled || Boolean(items[i]?.disabled);
  const tabStop =
    index >= 0 && !isDisabled(index)
      ? index
      : items.findIndex((_, i) => !isDisabled(i));
  const generatedId = useId();
  const rootId = props.id ?? generatedId;
  useH5List(rootId, {
    selector: '[role="radio"]',
    orientation: "horizontal",
    loop: true,
    automatic: true,
  });
  // The H5 list starts on the first segment: move the tab stop to the
  // selection (and keep it there).
  useEffect(() => {
    if (typeof document === "undefined") return;
    document
      .getElementById(rootId)
      ?.querySelectorAll<HTMLElement>('[role="radio"]')
      .forEach((el, i) => (el.tabIndex = !disabled && i === tabStop ? 0 : -1));
  }, [rootId, tabStop, disabled]);
  const count = Math.max(items.length, 1);
  const thumb: CSSProperties = {
    width: `calc((100% - 4px) / ${count})`,
    transform: `translateX(${Math.max(index, 0) * 100}%)`,
    ...(index < 0 && { display: "none" }),
  };
  return (
    <Part
      name="segmented-control"
      role="radiogroup"
      {...props}
      id={rootId}
      aria-disabled={disabled || undefined}
      data-size={size}
      data-color={color}
      data-disabled={disabled ? "" : undefined}
      className={cn(
        `mn-size-${size}`,
        `mn-color-${color}`,
        fullWidth && "mn-full-width",
        disabled && "mn-disabled",
        props.className,
      )}
    >
      <View
        className="mn-segmented-control__indicator"
        data-minerva="segmented-control"
        data-part="indicator"
        aria-hidden
        style={thumb}
      />
      {items.map((item, i) => {
        const checked = i === index,
          itemDisabled = isDisabled(i),
          label = item.label ?? (item.icon != null ? undefined : item.value);
        return (
          <View
            key={item.value}
            role="radio"
            aria-checked={checked}
            aria-disabled={itemDisabled || undefined}
            aria-label={item["aria-label"]}
            {...{ tabIndex: !disabled && i === tabStop ? 0 : -1 }}
            data-minerva="segmented-control"
            data-part="item"
            data-value={item.value}
            data-selected={checked ? "" : undefined}
            data-disabled={itemDisabled ? "" : undefined}
            className={cn(
              "mn-segmented-control__item",
              checked && "mn-selected",
              itemDisabled && "mn-disabled",
            )}
            onClick={() => {
              if (!itemDisabled && !checked) set(item.value);
            }}
          >
            {item.icon != null && (
              <View
                aria-hidden
                className="mn-segmented-control__icon"
                data-minerva="segmented-control"
                data-part="icon"
              >
                {item.icon}
              </View>
            )}
            {label != null && (
              <Text
                className="mn-segmented-control__label"
                data-minerva="segmented-control"
                data-part="label"
              >
                {label}
              </Text>
            )}
          </View>
        );
      })}
    </Part>
  );
}
