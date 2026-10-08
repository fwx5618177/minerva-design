import { type ReactNode, type Ref } from "react";
import {
  Platform,
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
import { Icon } from "../../internal/Icon";
import {
  ClearButton,
  fieldTextStyle,
  useFocusState,
} from "../../internal/inputFrame";
import { part } from "../../internal/parts";
import {
  controlHeight,
  hitSlopFor,
  weight,
  type NativeSize,
} from "../../internal/styles";
import { useControllable } from "../../internal/useControllable";

export type SearchBarShape = "round" | "square";
export type SearchBarSize = NativeSize;

export interface SearchBarProps extends Omit<
  TextInputProps,
  "style" | "value" | "defaultValue" | "onChange" | "editable" | "multiline"
> {
  /** Search text (controlled) */
  value?: string;
  /**
   * Initial search text (uncontrolled)
   * @default ""
   */
  defaultValue?: string;
  /** Called with the new text on every edit and when cleared */
  onChange?: (value: string) => void;
  /** Called with the text when the keyboard's search key is pressed */
  onSearch?: (value: string) => void;
  /** Placeholder @default i18n "searchBar.placeholder" */
  placeholder?: string;
  /**
   * Shows a clear button while the field has text
   * @default true
   */
  clearable?: boolean;
  /** Called after the clear button emptied the field */
  onClear?: () => void;
  /**
   * Shows a Cancel button after the field
   * @default false
   */
  showCancel?: boolean;
  /** Text of the Cancel button @default i18n "searchBar.cancel" */
  cancelText?: string;
  /** Called by the Cancel button (the text is cleared first) */
  onCancel?: () => void;
  /**
   * Field shape: `round` (pill) or `square` (theme radius)
   * @default "round"
   */
  shape?: SearchBarShape;
  /**
   * Field height and font size
   * @default "medium"
   */
  size?: SearchBarSize;
  /**
   * Disables the field
   * @default false
   */
  disabled?: boolean;
  /** Content before the field (e.g. a city picker) */
  prefix?: ReactNode;
  /** Content after the field, before Cancel (e.g. a filter button) */
  action?: ReactNode;
  /** Style of the root row */
  style?: StyleProp<ViewStyle>;
  /** Style of the rounded field */
  fieldStyle?: StyleProp<ViewStyle>;
  /** Style of the TextInput */
  inputStyle?: StyleProp<TextStyle>;
  /** Ref of the TextInput */
  ref?: Ref<TextInput>;
}

/**
 * Mobile search field: rounded tinted field with a search glyph, clear
 * button, search key submit (`onSearch`) and an optional Cancel button.
 * The TextInput has the search role (`searchbox` on the web).
 */
export function SearchBar({
  value: valueProp,
  defaultValue = "",
  onChange,
  onChangeText,
  onSearch,
  onSubmitEditing,
  placeholder,
  clearable = true,
  onClear,
  showCancel = false,
  cancelText,
  onCancel,
  shape = "round",
  size = "medium",
  disabled = false,
  prefix,
  action,
  style,
  fieldStyle,
  inputStyle,
  onFocus,
  onBlur,
  accessibilityLabel,
  accessibilityState,
  placeholderTextColor,
  ref,
  ...rest
}: SearchBarProps) {
  const { tokens: t, fonts } = useTheme();
  const { t: translate } = useI18n();
  const [value, setValue] = useControllable(valueProp, defaultValue, onChange);
  const focus = useFocusState(onFocus, onBlur);
  const text = value ?? "";
  const height = controlHeight(t, size) - t.space["2"];

  const change = (next: string) => {
    setValue(next);
    onChangeText?.(next);
  };

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          gap: t.space["2"],
          paddingHorizontal: t.space["3"],
          paddingVertical: t.space["1-5"],
        },
        style,
      ]}
      {...part("search-bar", "root", {
        shape,
        size,
        focused: focus.focused,
        disabled,
      })}
    >
      {prefix}
      <View
        style={[
          {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: t.space["2"],
            height,
            paddingHorizontal: t.space["3"],
            borderRadius: shape === "round" ? height / 2 : t.radius.md,
            backgroundColor: t.colors["surface-muted-color"],
            borderWidth: 1,
            borderColor: focus.focused
              ? t.colors["primary-color"]
              : "transparent",
            opacity: disabled ? 0.6 : 1,
          },
          fieldStyle,
        ]}
        {...part("search-bar", "field", { focused: focus.focused })}
      >
        <Icon
          name="search"
          size={Math.round(height * 0.45)}
          color={t.colors["text-muted-color"]}
        />
        <TextInput
          ref={ref}
          value={text}
          onChangeText={change}
          onSubmitEditing={(event) => {
            onSearch?.(text);
            onSubmitEditing?.(event);
          }}
          editable={!disabled}
          placeholder={placeholder ?? translate("searchBar.placeholder")}
          placeholderTextColor={
            placeholderTextColor ?? t.colors["text-muted-color"]
          }
          returnKeyType="search"
          enterKeyHint="search"
          inputMode="search"
          autoCorrect={false}
          clearButtonMode="never"
          accessibilityRole={Platform.OS === "web" ? undefined : "search"}
          role={Platform.OS === "web" ? "searchbox" : undefined}
          accessibilityLabel={
            accessibilityLabel ?? translate("searchBar.label")
          }
          accessibilityState={{ ...accessibilityState, disabled }}
          selectionColor={t.colors["primary-color"]}
          cursorColor={t.colors["primary-color"]}
          underlineColorAndroid="transparent"
          onFocus={focus.onFocus}
          onBlur={focus.onBlur}
          {...part("search-bar", "input")}
          {...rest}
          style={[
            fieldTextStyle(t, size, disabled, fonts.sans),
            { paddingVertical: 0, height },
            inputStyle,
          ]}
        />
        {clearable && !disabled && text !== "" ? (
          <ClearButton
            component="search-bar"
            t={t}
            size={16}
            label={translate("searchBar.clear")}
            onPress={() => {
              change("");
              onClear?.();
            }}
          />
        ) : null}
      </View>
      {action}
      {showCancel ? (
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            if (text !== "") change("");
            onCancel?.();
          }}
          hitSlop={hitSlopFor(t, height)}
          {...part("search-bar", "cancel")}
          style={({ pressed }) => ({
            height,
            justifyContent: "center",
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Text
            style={{
              color: t.colors["primary-color"],
              fontSize: t.fontSize.md,
              fontWeight: weight(t, "medium"),
              ...(fonts.sans ? { fontFamily: fonts.sans } : null),
            }}
          >
            {cancelText ?? translate("searchBar.cancel")}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

bindFormControl(SearchBar, {});
