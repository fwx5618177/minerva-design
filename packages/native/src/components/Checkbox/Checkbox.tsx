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
import { createCheckboxMachine } from "@minerva/core";
import { useTheme } from "../../theme/MinervaProvider";
import { bindFormControl } from "../../internal/formControl";
import { Icon } from "../../internal/Icon";
import { part } from "../../internal/parts";
import {
  colorRole,
  hitSlopFor,
  textStyle,
  controlFontSize,
  type NativeSize,
  type SemanticColor,
} from "../../internal/styles";
import {
  TOGGLE_BOX,
  ToggleLabel,
  placementStyle,
  type LabelPlacement,
} from "../../internal/toggleControl";
import { useMachine } from "../../internal/useMachine";

export type CheckboxSize = NativeSize;
export type CheckboxShape = "square" | "rounded" | "circle";
export type CheckboxColor = SemanticColor;
export type CheckboxLabelPlacement = LabelPlacement;

/** What a CheckboxGroup shares with its checkboxes */
export interface CheckboxGroupContextValue {
  value: readonly string[];
  toggle: (value: string) => void;
  disabled: boolean;
  /** `max` reached: unchecked boxes are disabled */
  full: boolean;
  error: boolean;
  size?: CheckboxSize;
  color?: CheckboxColor;
  shape?: CheckboxShape;
}

export const CheckboxGroupContext =
  createContext<CheckboxGroupContextValue | null>(null);

export interface CheckboxProps extends Omit<
  PressableProps,
  "children" | "style" | "disabled" | "onPress"
> {
  /** Checked state (controlled). Ignored inside a CheckboxGroup */
  checked?: boolean;
  /**
   * Initial checked state (uncontrolled)
   * @default false
   */
  defaultChecked?: boolean;
  /** Called with the requested state and the checkbox `value` */
  onChange?: (checked: boolean, value?: string) => void;
  /**
   * Shows the indeterminate (partially checked) state; a press checks the
   * box (and reports `onChange(true)`) while the prop stays in charge
   * @default false
   */
  indeterminate?: boolean;
  /**
   * Disables the checkbox (also set by a disabled group)
   * @default false
   */
  disabled?: boolean;
  /** Label content (a string becomes Text and names the checkbox) */
  label?: ReactNode;
  /** Label content, when `label` is not set */
  children?: ReactNode;
  /**
   * Semantic color of the checked / indeterminate box (a CheckboxGroup
   * color overrides it)
   * @default "primary"
   */
  color?: CheckboxColor;
  /**
   * Box and label size (a CheckboxGroup size overrides it)
   * @default "medium"
   */
  size?: CheckboxSize;
  /**
   * Box shape (a CheckboxGroup shape overrides it)
   * @default "square"
   */
  shape?: CheckboxShape;
  /** Value of the checkbox: identifies it inside a CheckboxGroup */
  value?: string;
  /**
   * Error state: danger border (also set by an invalid group)
   * @default false
   */
  error?: boolean;
  /**
   * Position of the label relative to the box
   * @default "end"
   */
  labelPlacement?: CheckboxLabelPlacement;
  /** Custom glyph shown in the checked box */
  icon?: ReactNode;
  /** Style of the pressable root */
  style?: StyleProp<ViewStyle>;
  /** Style of the label text */
  labelStyle?: StyleProp<TextStyle>;
}

/**
 * A checkbox on the checkbox machine of @minerva/core: checked /
 * indeterminate (`accessibilityState.checked: "mixed"`), square / rounded /
 * circle box, label at any side, semantic colors, three sizes. Inside a
 * `CheckboxGroup` (with a `value`) it reads and toggles the group.
 */
export function Checkbox(props: CheckboxProps) {
  const {
    checked,
    defaultChecked = false,
    onChange,
    indeterminate = false,
    disabled = false,
    label,
    children,
    color: colorProp,
    size: sizeProp,
    shape: shapeProp,
    value,
    error: errorProp = false,
    labelPlacement = "end",
    icon,
    style,
    labelStyle,
    accessibilityState,
    hitSlop,
    ...rest
  } = useFormControlProps(props);
  const { tokens: t, fonts } = useTheme();
  const group = useContext(CheckboxGroupContext);
  const inGroup = group !== null && value !== undefined;
  const groupChecked = inGroup ? group.value.includes(value) : undefined;
  const size = group?.size ?? sizeProp ?? "medium";
  const color = group?.color ?? colorProp ?? "primary";
  const shape = group?.shape ?? shapeProp ?? "square";
  const error = errorProp || !!group?.error;
  const inactive =
    disabled || !!group?.disabled || (inGroup && !groupChecked && group.full);

  const [state, send] = useMachine(createCheckboxMachine, {
    checked: inGroup ? groupChecked : checked,
    defaultChecked,
    indeterminate,
    disabled: inactive,
    onCheckedChange: (next: boolean) => {
      if (inGroup) group.toggle(value);
      onChange?.(next, value);
    },
  });

  const role = colorRole(t, color);
  const box = TOGGLE_BOX[size];
  const on = state.checked || state.indeterminate;
  const radius =
    shape === "circle"
      ? box / 2
      : shape === "rounded"
        ? t.radius.sm
        : Math.max(2, Math.round(t.radius.sm / 2));
  const content = label ?? children;
  const lineHeight = textStyle(t, controlFontSize(t, size)).lineHeight ?? box;

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{
        ...accessibilityState,
        checked: state.indeterminate ? "mixed" : state.checked,
        disabled: inactive,
      }}
      aria-checked={state.indeterminate ? "mixed" : state.checked}
      aria-disabled={inactive}
      disabled={inactive}
      onPress={() => send({ type: "TOGGLE" })}
      hitSlop={hitSlop ?? hitSlopFor(t, Math.max(box, lineHeight))}
      {...part("checkbox", "root", {
        checked: state.checked,
        indeterminate: state.indeterminate,
        disabled: inactive,
        size,
        color,
        shape,
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
              borderRadius: radius,
              borderWidth: on ? 0 : 1.5,
              borderColor: error
                ? t.colors["danger-color"]
                : pressed
                  ? role.solid
                  : t.colors["border-strong-color"],
              backgroundColor: on
                ? pressed
                  ? role.pressed
                  : role.solid
                : pressed
                  ? role.subtle
                  : t.colors["surface-color"],
              alignItems: "center",
              justifyContent: "center",
            }}
            {...part("checkbox", "control", {
              checked: state.checked,
              indeterminate: state.indeterminate,
            })}
          >
            {state.indeterminate ? (
              <Icon name="minus" size={box * 0.9} color={role.onSolid} />
            ) : state.checked ? (
              (icon ?? (
                <Icon name="check" size={box * 0.8} color={role.onSolid} />
              ))
            ) : null}
          </View>
          <ToggleLabel
            t={t}
            component="checkbox"
            size={size}
            disabled={inactive}
            fontFamily={fonts.sans}
            style={labelStyle}
          >
            {content}
          </ToggleLabel>
        </>
      )}
    </Pressable>
  );
}

bindFormControl(Checkbox, {
  valuePropName: "checked",
  emptyValue: false,
  commitOnChange: true,
  invalidPropName: "error",
  requiredKey: "validation.checkMissing",
});
