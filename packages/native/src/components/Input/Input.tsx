import { useFormControlProps } from "../../internal/FormControlContext";
import { useState, type ReactNode, type Ref } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { bindFormControl } from "../../internal/formControl";
import {
  ClearButton,
  ariaStates,
  fieldTextStyle,
  frameStyle,
  useFocusState,
  type FieldVariant,
} from "../../internal/inputFrame";
import { part } from "../../internal/parts";
import {
  hitSlopFor,
  textStyle,
  weight,
  type NativeSize,
} from "../../internal/styles";
import { useControllable } from "../../internal/useControllable";

export type InputVariant = FieldVariant;
export type InputSize = NativeSize;
export type InputType = "text" | "password";

export interface InputProps extends Omit<
  TextInputProps,
  | "style"
  | "value"
  | "defaultValue"
  | "onChange"
  | "editable"
  | "readOnly"
  | "secureTextEntry"
  | "multiline"
> {
  /** Text of the field (controlled) */
  value?: string;
  /**
   * Initial text (uncontrolled)
   * @default ""
   */
  defaultValue?: string;
  /** Called with the new text on every edit and when the field is cleared */
  onChange?: (value: string) => void;
  /**
   * Visual style: `outline` (bordered), `filled` (tinted background) or
   * `unstyled` (no frame)
   * @default "outline"
   */
  variant?: InputVariant;
  /**
   * Height (`--control-height-*`) and font size
   * @default "medium"
   */
  size?: InputSize;
  /**
   * Error state: danger border (`aria-invalid` on the web)
   * @default false
   */
  invalid?: boolean;
  /**
   * Disables the field
   * @default false
   */
  disabled?: boolean;
  /**
   * Focusable and selectable, but the text cannot be edited
   * @default false
   */
  readOnly?: boolean;
  /** Content before the text, e.g. an icon or "@" */
  prefix?: ReactNode;
  /** Content after the text, e.g. a unit or a button */
  suffix?: ReactNode;
  /**
   * Shows a clear button while the field has a value (not when disabled or
   * read-only). Clearing calls `onChange("")` and `onClear`
   * @default false
   */
  clearable?: boolean;
  /** Accessible label of the clear button @default i18n "input.clear" */
  clearLabel?: string;
  /** Called after the clear button emptied the field */
  onClear?: () => void;
  /**
   * `password` hides the text and shows a visibility toggle
   * @default "text"
   */
  type?: InputType;
  /** Label of the visibility toggle while hidden @default i18n "input.showPassword" */
  showPasswordLabel?: string;
  /** Label of the visibility toggle while visible @default i18n "input.hidePassword" */
  hidePasswordLabel?: string;
  /**
   * Shows the number of characters (and `maxLength`, when set) after the text
   * @default false
   */
  showCharCount?: boolean;
  /**
   * Visible label above the field; a string label is also the field's
   * accessible name (unless `accessibilityLabel` is set)
   */
  label?: ReactNode;
  /** Style of the root view (label + frame) */
  style?: StyleProp<ViewStyle>;
  /** Style of the frame around the text */
  wrapperStyle?: StyleProp<ViewStyle>;
  /** Style of the TextInput */
  inputStyle?: StyleProp<TextStyle>;
  /** Ref of the TextInput (focus(), blur(), clear()) */
  ref?: Ref<TextInput>;
}

/** Eye glyph of the password toggle (slashed while the text is visible) */
function EyeGlyph({ color, open }: { color: string; open: boolean }) {
  return (
    <View
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      accessibilityElementsHidden
      style={{
        width: 20,
        height: 20,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: 18,
          height: 11,
          borderRadius: 9,
          borderWidth: 1.5,
          borderColor: color,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: 5,
            height: 5,
            borderRadius: 3,
            backgroundColor: color,
          }}
        />
      </View>
      {open ? (
        <View
          style={{
            position: "absolute",
            width: 20,
            height: 1.5,
            borderRadius: 1,
            backgroundColor: color,
            transform: [{ rotate: "-45deg" }],
          }}
        />
      ) : null}
    </View>
  );
}

/**
 * A single-line text field: outline / filled / unstyled variants, three
 * sizes from the control-height tokens, prefix / suffix content, clear
 * button, password visibility toggle, character count, error and disabled
 * states. The border takes the primary color while focused.
 */
export function Input(props: InputProps) {
  const {
    value: valueProp,
    defaultValue = "",
    onChange,
    onChangeText,
    variant = "outline",
    size = "medium",
    invalid = false,
    disabled = false,
    readOnly = false,
    prefix,
    suffix,
    clearable = false,
    clearLabel,
    onClear,
    type = "text",
    showPasswordLabel,
    hidePasswordLabel,
    showCharCount = false,
    maxLength,
    label,
    style,
    wrapperStyle,
    inputStyle,
    onFocus,
    onBlur,
    accessibilityLabel,
    accessibilityState,
    placeholderTextColor,
    ref,
    ...rest
  } = useFormControlProps(props);
  const { tokens: t, fonts } = useTheme();
  const { t: translate } = useI18n();
  const [value, setValue] = useControllable(valueProp, defaultValue, onChange);
  const [revealed, setRevealed] = useState(false);
  const focus = useFocusState(onFocus, onBlur);
  const text = value ?? "";
  const editable = !disabled && !readOnly;
  const name =
    accessibilityLabel ?? (typeof label === "string" ? label : undefined);
  const muted = t.colors["text-secondary-color"];

  const change = (next: string) => {
    setValue(next);
    onChangeText?.(next);
  };
  const states = {
    variant,
    size,
    focused: focus.focused,
    invalid,
    disabled,
    readOnly,
  };

  return (
    <View
      style={[{ gap: t.space["1-5"] }, style]}
      {...part("input", "root", {
        size,
        variant: `variant-${variant}`,
        invalid,
        disabled,
      })}
    >
      {label !== undefined && label !== null ? (
        <Text
          style={{
            ...textStyle(t, "sm", fonts.sans),
            color: t.colors["text-secondary-color"],
            fontWeight: weight(t, "medium"),
          }}
          {...part("input", "label")}
        >
          {label}
        </Text>
      ) : null}
      <View
        style={[frameStyle(t, states), wrapperStyle]}
        {...part("input", "wrapper", {
          focused: focus.focused,
          invalid,
          disabled,
        })}
      >
        {prefix !== undefined ? (
          <View {...part("input", "prefix")}>
            {typeof prefix === "string" ? (
              <Text style={{ color: muted, fontSize: t.fontSize.md }}>
                {prefix}
              </Text>
            ) : (
              prefix
            )}
          </View>
        ) : null}
        <TextInput
          ref={ref}
          value={text}
          onChangeText={change}
          editable={editable}
          readOnly={readOnly}
          secureTextEntry={type === "password" && !revealed}
          maxLength={maxLength}
          accessibilityLabel={name}
          accessibilityState={{ ...accessibilityState, disabled }}
          placeholderTextColor={
            placeholderTextColor ?? t.colors["text-muted-color"]
          }
          selectionColor={t.colors["primary-color"]}
          cursorColor={t.colors["primary-color"]}
          underlineColorAndroid="transparent"
          onFocus={focus.onFocus}
          onBlur={focus.onBlur}
          {...ariaStates({ invalid, disabled })}
          {...part("input", "input")}
          {...rest}
          style={[fieldTextStyle(t, size, disabled, fonts.sans), inputStyle]}
        />
        {clearable && editable && text !== "" ? (
          <ClearButton
            component="input"
            t={t}
            label={clearLabel ?? translate("input.clear")}
            onPress={() => {
              change("");
              onClear?.();
            }}
          />
        ) : null}
        {type === "password" ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              revealed
                ? (hidePasswordLabel ?? translate("input.hidePassword"))
                : (showPasswordLabel ?? translate("input.showPassword"))
            }
            accessibilityState={{ disabled }}
            disabled={disabled}
            onPress={() => setRevealed((open) => !open)}
            hitSlop={hitSlopFor(t, 20, 20)}
            style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
            {...part("input", "password-toggle", { revealed })}
          >
            <EyeGlyph color={muted} open={revealed} />
          </Pressable>
        ) : null}
        {showCharCount ? (
          <Text
            style={{
              color: t.colors["text-muted-color"],
              fontSize: t.fontSize.xs,
              fontVariant: ["tabular-nums"],
            }}
            {...part("input", "count")}
          >
            {maxLength !== undefined
              ? `${text.length}/${maxLength}`
              : String(text.length)}
          </Text>
        ) : null}
        {suffix !== undefined ? (
          <View {...part("input", "suffix")}>
            {typeof suffix === "string" ? (
              <Text style={{ color: muted, fontSize: t.fontSize.md }}>
                {suffix}
              </Text>
            ) : (
              suffix
            )}
          </View>
        ) : null}
      </View>
    </View>
  );
}

bindFormControl(Input, {});
