import { useFormControlProps } from "../../internal/FormControlContext";
import { createContext, useContext, type ReactNode } from "react";
import {
  Pressable,
  View,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { createSwitchMachine } from "@minerva/core";
import { useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";
import {
  colorRole,
  controlFontSize,
  hitSlopFor,
  textStyle,
  type NativeSize,
} from "../../internal/styles";
import {
  TOGGLE_BOX,
  ToggleLabel,
  placementStyle,
  type LabelPlacement,
} from "../../internal/toggleControl";
import { useMachine } from "../../internal/useMachine";

export type RadioSize = NativeSize;
export type RadioColor = "primary" | "success" | "warning" | "danger";
export type RadioLabelPlacement = LabelPlacement;

/** What a RadioGroup shares with its radios */
export interface RadioGroupContextValue {
  value: string | null;
  select: (value: string) => void;
  disabled: boolean;
  readOnly: boolean;
  error: boolean;
  size?: RadioSize;
  color?: RadioColor;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(
  null,
);

export interface RadioProps extends Omit<
  PressableProps,
  "children" | "style" | "disabled" | "onPress"
> {
  /** Whether the radio is checked (controlled). Ignored inside a RadioGroup */
  checked?: boolean;
  /**
   * Initial checked state (uncontrolled). Ignored inside a RadioGroup
   * @default false
   */
  defaultChecked?: boolean;
  /** Called when a press checks the radio, with its `value` */
  onChange?: (checked: boolean, value?: string) => void;
  /**
   * Disables the radio (also set by a disabled group)
   * @default false
   */
  disabled?: boolean;
  /** Value of the radio; identifies it within a RadioGroup */
  value?: string;
  /**
   * Radio size (the RadioGroup size overrides it)
   * @default "medium"
   */
  size?: RadioSize;
  /**
   * Semantic color of the checked radio (the RadioGroup color overrides it)
   * @default "primary"
   */
  color?: RadioColor;
  /** Label displayed next to the radio (a string also names it) */
  label?: ReactNode;
  /** Label content, when `label` is not set */
  children?: ReactNode;
  /**
   * Error state: danger border (also set by an invalid group)
   * @default false
   */
  error?: boolean;
  /**
   * Position of the label relative to the circle
   * @default "end"
   */
  labelPlacement?: RadioLabelPlacement;
  /** Style of the pressable root */
  style?: StyleProp<ViewStyle>;
  /** Style of the label text */
  labelStyle?: StyleProp<TextStyle>;
}

/**
 * A radio button. Inside a `RadioGroup` it is checked when its `value` is
 * the group's and a press selects it; standalone it is a checked /
 * defaultChecked toggle that a press can only turn on.
 */
export function Radio(props: RadioProps) {
  const {
    checked,
    defaultChecked = false,
    onChange,
    disabled = false,
    value,
    size: sizeProp,
    color: colorProp,
    label,
    children,
    error: errorProp = false,
    labelPlacement = "end",
    style,
    labelStyle,
    accessibilityState,
    hitSlop,
    ...rest
  } = useFormControlProps(props);
  const { tokens: t, fonts } = useTheme();
  const group = useContext(RadioGroupContext);
  const inGroup = group !== null && value !== undefined;
  const size = group?.size ?? sizeProp ?? "medium";
  const color = group?.color ?? colorProp ?? "primary";
  const error = errorProp || !!group?.error;
  const inactive = disabled || !!group?.disabled;
  const readOnly = !!group?.readOnly;

  const [state, send] = useMachine(createSwitchMachine, {
    checked: inGroup ? group.value === value : checked,
    defaultChecked,
    disabled: inactive,
    readOnly,
    onCheckedChange: (next: boolean) => {
      if (!next) return;
      if (inGroup) group.select(value);
      onChange?.(true, value);
    },
  });

  const role = colorRole(t, color);
  const box = TOGGLE_BOX[size];
  const on = state.checked;
  const lineHeight = textStyle(t, controlFontSize(t, size)).lineHeight ?? box;

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{
        ...accessibilityState,
        checked: on,
        disabled: inactive,
      }}
      aria-checked={on}
      aria-disabled={inactive}
      disabled={inactive}
      onPress={() => send({ type: "SET", checked: true })}
      hitSlop={hitSlop ?? hitSlopFor(t, Math.max(box, lineHeight))}
      {...part("radio", "root", {
        checked: on,
        disabled: inactive,
        size,
        color,
        invalid: error,
      })}
      {...rest}
      style={[
        placementStyle(labelPlacement),
        { gap: t.space["2"], opacity: inactive ? 0.5 : 1 },
        style,
      ]}
    >
      {({ pressed }) => (
        <>
          <View
            style={{
              width: box,
              height: box,
              borderRadius: box / 2,
              borderWidth: on ? box * 0.3 : 1.5,
              borderColor: on
                ? pressed
                  ? role.pressed
                  : role.solid
                : error
                  ? t.colors["danger-color"]
                  : pressed
                    ? role.solid
                    : t.colors["border-strong-color"],
              backgroundColor:
                pressed && !on ? role.subtle : t.colors["surface-color"],
            }}
            {...part("radio", "control", { checked: on })}
          />
          <ToggleLabel
            t={t}
            component="radio"
            size={size}
            disabled={inactive}
            fontFamily={fonts.sans}
            style={labelStyle}
          >
            {label ?? children}
          </ToggleLabel>
        </>
      )}
    </Pressable>
  );
}
