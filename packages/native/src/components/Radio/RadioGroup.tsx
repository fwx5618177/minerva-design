import { useMemo, type ReactNode } from "react";
import type { StyleProp, ViewProps, ViewStyle } from "react-native";
import { createRadioGroupMachine } from "@minerva/core";
import { useTheme } from "../../theme/MinervaProvider";
import { bindFormControl } from "../../internal/formControl";
import { ToggleGroupFrame } from "../../internal/toggleControl";
import { useMachine } from "../../internal/useMachine";
import {
  Radio,
  RadioGroupContext,
  type RadioColor,
  type RadioSize,
} from "./Radio";

/** An option of a RadioGroup built from `options` */
export interface RadioGroupOption {
  label: ReactNode;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<ViewProps, "style"> {
  /** Value of the selected radio (controlled; `null`: none selected) */
  value?: string | null;
  /**
   * Initially selected value (uncontrolled)
   * @default null
   */
  defaultValue?: string | null;
  /** Called with the value of the radio the user selected */
  onChange?: (value: string) => void;
  /**
   * Layout direction of the radios
   * @default "vertical"
   */
  direction?: "vertical" | "horizontal";
  /**
   * Disables every radio in the group
   * @default false
   */
  disabled?: boolean;
  /**
   * Radios show the value but presses do not change it
   * @default false
   */
  readOnly?: boolean;
  /** Size of every radio @default each radio's own */
  size?: RadioSize;
  /** Color of every checked radio @default each radio's own */
  color?: RadioColor;
  /** Visible label of the group; a string is also its accessible name */
  label?: ReactNode;
  /**
   * Error state of every radio
   * @default false
   */
  error?: boolean;
  /** Radios built from data (else pass `<Radio value>` children) */
  options?: readonly (string | RadioGroupOption)[];
  /** `<Radio value>` children */
  children?: ReactNode;
  /** Style of the root view */
  style?: StyleProp<ViewStyle>;
}

const toOption = (option: string | RadioGroupOption): RadioGroupOption =>
  typeof option === "string" ? { label: option, value: option } : option;

/**
 * A single-choice group on the radio-group machine of @minerva/core:
 * `role="radiogroup"` container named by its label (not an accessibility
 * element itself), radios from `options` or `<Radio value>` children.
 */
export function RadioGroup({
  value,
  defaultValue = null,
  onChange,
  direction = "vertical",
  disabled = false,
  readOnly = false,
  size,
  color,
  label,
  error = false,
  options,
  children,
  style,
  accessibilityLabel,
  ...rest
}: RadioGroupProps) {
  const { tokens: t, fonts } = useTheme();
  const items = useMemo(
    () =>
      (options ?? []).map(toOption).map((o) => ({
        value: o.value,
        disabled: o.disabled,
      })),
    [options],
  );
  const [state, send] = useMachine(createRadioGroupMachine, {
    value,
    defaultValue,
    items,
    disabled,
    readOnly,
    orientation: direction,
    onValueChange: onChange,
  });
  const selected = state.value;
  const context = useMemo(
    () => ({
      value: selected,
      select: (v: string) => send({ type: "SELECT", value: v }),
      disabled,
      readOnly,
      error,
      size,
      color,
    }),
    [selected, send, disabled, readOnly, error, size, color],
  );

  return (
    <RadioGroupContext.Provider value={context}>
      <ToggleGroupFrame
        t={t}
        component="radio-group"
        role="radiogroup"
        label={label}
        accessibilityLabel={accessibilityLabel}
        direction={direction}
        disabled={disabled}
        fontFamily={fonts.sans}
        style={style}
        rest={rest}
      >
        {options?.map((option) => {
          const item = toOption(option);
          return (
            <Radio
              key={item.value}
              value={item.value}
              label={item.label}
              disabled={item.disabled}
            />
          );
        })}
        {children}
      </ToggleGroupFrame>
    </RadioGroupContext.Provider>
  );
}

bindFormControl(RadioGroup, {
  emptyValue: null,
  commitOnChange: true,
  invalidPropName: "error",
  requiredKey: "validation.radioMissing",
});
