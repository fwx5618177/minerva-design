import { useFormControlProps } from "../../internal/FormControlContext";
import { useState, type ReactNode, type Ref } from "react";
import {
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/MinervaProvider";
import { bindFormControl } from "../../internal/formControl";
import {
  ariaStates,
  fieldTextStyle,
  frameStyle,
  useFocusState,
  type FieldVariant,
} from "../../internal/inputFrame";
import { part } from "../../internal/parts";
import {
  controlFontSize,
  textStyle,
  weight,
  type NativeSize,
} from "../../internal/styles";
import { useControllable } from "../../internal/useControllable";

export type TextareaVariant = FieldVariant;
export type TextareaSize = NativeSize;

/** Row bounds of an auto-growing textarea */
export interface TextareaAutoSize {
  /** Fewest rows shown @default rows */
  minRows?: number;
  /** Most rows shown before the text scrolls @default unlimited */
  maxRows?: number;
}

export interface TextareaProps extends Omit<
  TextInputProps,
  | "style"
  | "value"
  | "defaultValue"
  | "onChange"
  | "editable"
  | "readOnly"
  | "multiline"
  | "numberOfLines"
> {
  /** Text of the field (controlled) */
  value?: string;
  /**
   * Initial text (uncontrolled)
   * @default ""
   */
  defaultValue?: string;
  /** Called with the new text on every edit */
  onChange?: (value: string) => void;
  /**
   * Visual style: `outline` (bordered), `filled` (tinted background) or
   * `unstyled` (no frame)
   * @default "outline"
   */
  variant?: TextareaVariant;
  /**
   * Font size and minimum height
   * @default "medium"
   */
  size?: TextareaSize;
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
  /**
   * Visible text rows (the height of the field)
   * @default 3
   */
  rows?: number;
  /**
   * Grows with the text: `true` (from `rows`, unbounded) or row bounds
   * @default false
   */
  autoSize?: boolean | TextareaAutoSize;
  /**
   * Shows the number of characters (and `maxLength`, when set) under the text
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
  /** Ref of the TextInput */
  ref?: Ref<TextInput>;
}

/**
 * A multi-line text field: fixed `rows` or auto-growing (`autoSize` with
 * min / max rows), character count, the Input variants, sizes, error,
 * read-only and disabled states.
 */
export function Textarea(props: TextareaProps) {
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
    rows = 3,
    autoSize = false,
    showCharCount = false,
    maxLength,
    label,
    style,
    wrapperStyle,
    inputStyle,
    onFocus,
    onBlur,
    onContentSizeChange,
    accessibilityLabel,
    accessibilityState,
    placeholderTextColor,
    ref,
    ...rest
  } = useFormControlProps(props);
  const { tokens: t, fonts } = useTheme();
  const [value, setValue] = useControllable(valueProp, defaultValue, onChange);
  const focus = useFocusState(onFocus, onBlur);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const text = value ?? "";
  const fontSize = controlFontSize(t, size);
  const lineHeight = Math.round(fontSize * (t.lineHeight.base ?? 1.5));
  const paddingY = t.space["2"];
  const bounds = typeof autoSize === "object" ? autoSize : {};
  const minRows = autoSize ? (bounds.minRows ?? rows) : rows;
  const maxRows = autoSize ? bounds.maxRows : rows;
  const rowsHeight = (n: number) => n * lineHeight + paddingY * 2;
  const minHeight = rowsHeight(minRows);
  const maxHeight = maxRows !== undefined ? rowsHeight(maxRows) : undefined;
  const height = autoSize
    ? Math.min(
        maxHeight ?? Infinity,
        Math.max(minHeight, (contentHeight ?? 0) + paddingY * 2),
      )
    : minHeight;
  const name =
    accessibilityLabel ?? (typeof label === "string" ? label : undefined);

  return (
    <View
      style={[{ gap: t.space["1-5"] }, style]}
      {...part("textarea", "root", {
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
          {...part("textarea", "label")}
        >
          {label}
        </Text>
      ) : null}
      <View
        style={[
          frameStyle(t, {
            variant,
            size,
            focused: focus.focused,
            invalid,
            disabled,
            readOnly,
            multiline: true,
          }),
          { flexDirection: "column", alignItems: "stretch", gap: 0 },
          wrapperStyle,
        ]}
        {...part("textarea", "wrapper", {
          focused: focus.focused,
          invalid,
          disabled,
        })}
      >
        <TextInput
          ref={ref}
          multiline
          numberOfLines={minRows}
          value={text}
          onChangeText={(next) => {
            setValue(next);
            onChangeText?.(next);
          }}
          editable={!disabled && !readOnly}
          readOnly={readOnly}
          maxLength={maxLength}
          accessibilityLabel={name}
          accessibilityState={{ ...accessibilityState, disabled }}
          placeholderTextColor={
            placeholderTextColor ?? t.colors["text-muted-color"]
          }
          selectionColor={t.colors["primary-color"]}
          cursorColor={t.colors["primary-color"]}
          underlineColorAndroid="transparent"
          textAlignVertical="top"
          scrollEnabled={!autoSize || maxHeight !== undefined}
          onFocus={focus.onFocus}
          onBlur={focus.onBlur}
          onContentSizeChange={(event) => {
            if (autoSize) {
              setContentHeight(event.nativeEvent.contentSize.height);
            }
            onContentSizeChange?.(event);
          }}
          {...ariaStates({ invalid, disabled })}
          {...part("textarea", "input")}
          {...rest}
          style={[
            fieldTextStyle(t, size, disabled, fonts.sans),
            {
              flex: undefined,
              lineHeight,
              paddingVertical: paddingY,
              height,
            },
            inputStyle,
          ]}
        />
        {showCharCount ? (
          <Text
            style={{
              alignSelf: "flex-end",
              paddingBottom: t.space["1-5"],
              color: t.colors["text-muted-color"],
              fontSize: t.fontSize.xs,
              fontVariant: ["tabular-nums"],
            }}
            {...part("textarea", "count")}
          >
            {maxLength !== undefined
              ? `${text.length}/${maxLength}`
              : String(text.length)}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

bindFormControl(Textarea, {});
