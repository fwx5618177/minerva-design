import { useMemo, type ReactNode } from "react";
import type { StyleProp, ViewProps, ViewStyle } from "react-native";
import { createSelectionMachine } from "@minerva/core";
import { useTheme } from "../../theme/MinervaProvider";
import { bindFormControl } from "../../internal/formControl";
import { ToggleGroupFrame } from "../../internal/toggleControl";
import { useMachine } from "../../internal/useMachine";
import {
  Checkbox,
  CheckboxGroupContext,
  type CheckboxColor,
  type CheckboxShape,
  type CheckboxSize,
} from "./Checkbox";

/** An option of a CheckboxGroup built from `options` */
export interface CheckboxGroupOption {
  label: ReactNode;
  value: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps extends Omit<ViewProps, "style"> {
  /** Checked values (controlled) */
  value?: readonly string[];
  /**
   * Initially checked values (uncontrolled)
   * @default []
   */
  defaultValue?: readonly string[];
  /** Called with the requested checked values, in check order */
  onChange?: (value: string[]) => void;
  /** Most boxes checked at once (the others are disabled when reached) */
  max?: number;
  /**
   * Disables every checkbox
   * @default false
   */
  disabled?: boolean;
  /**
   * Layout of the checkboxes
   * @default "vertical"
   */
  direction?: "vertical" | "horizontal";
  /** Visible label of the group; a string is also its accessible name */
  label?: ReactNode;
  /** Checkboxes built from data (else pass `<Checkbox value>` children) */
  options?: readonly (string | CheckboxGroupOption)[];
  /** Size of every checkbox @default each checkbox's own */
  size?: CheckboxSize;
  /** Color of every checkbox @default each checkbox's own */
  color?: CheckboxColor;
  /** Shape of every checkbox @default each checkbox's own */
  shape?: CheckboxShape;
  /**
   * Error state of every checkbox
   * @default false
   */
  error?: boolean;
  /** `<Checkbox value>` children */
  children?: ReactNode;
  /** Style of the root view */
  style?: StyleProp<ViewStyle>;
}

/**
 * A group of checkboxes sharing one `string[]` value on the selection
 * machine of @minerva/core (multiple mode, optional `max`): `role="group"`
 * container named by its label, vertical or horizontal.
 */
export function CheckboxGroup({
  value,
  defaultValue = [],
  onChange,
  max,
  disabled = false,
  direction = "vertical",
  label,
  options,
  size,
  color,
  shape,
  error = false,
  children,
  style,
  accessibilityLabel,
  ...rest
}: CheckboxGroupProps) {
  const { tokens: t, fonts } = useTheme();
  const [state, send] = useMachine(createSelectionMachine<string>, {
    mode: "multiple",
    value,
    defaultValue,
    max,
    onValueChange: onChange,
  });
  const selected = state.value;
  const full = max !== undefined && selected.length >= max;
  const context = useMemo(
    () => ({
      value: selected,
      toggle: (v: string) => send({ type: "TOGGLE", value: v }),
      disabled,
      full,
      error,
      size,
      color,
      shape,
    }),
    [selected, send, disabled, full, error, size, color, shape],
  );

  return (
    <CheckboxGroupContext.Provider value={context}>
      <ToggleGroupFrame
        t={t}
        component="checkbox-group"
        role="group"
        label={label}
        accessibilityLabel={accessibilityLabel}
        direction={direction}
        disabled={disabled}
        fontFamily={fonts.sans}
        style={style}
        rest={rest}
      >
        {options?.map((option) => {
          const item =
            typeof option === "string"
              ? { label: option, value: option }
              : option;
          return (
            <Checkbox
              key={item.value}
              value={item.value}
              label={item.label}
              disabled={item.disabled}
            />
          );
        })}
        {children}
      </ToggleGroupFrame>
    </CheckboxGroupContext.Provider>
  );
}

bindFormControl(CheckboxGroup, {
  emptyValue: [],
  commitOnChange: true,
  invalidPropName: "error",
});
