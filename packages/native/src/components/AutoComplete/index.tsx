import { useFormControlProps } from "../../internal/FormControlContext";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
  type ViewStyle,
  type StyleProp,
} from "react-native";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { textStyle } from "../../internal/styles";
import { useControllable } from "../../internal/useControllable";
import { Input, type InputProps } from "../Input";
export interface AutoCompleteOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  highlight?: boolean;
  icon?: ReactNode;
  description?: string;
  group?: string;
}
export interface AutoCompleteProps {
  label?: string;
  options: AutoCompleteOption[];
  value?: string;
  /** @default "" */
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSelect?: (option: AutoCompleteOption) => void;
  onOptionClick?: (option: AutoCompleteOption) => void;
  groupBy?: (option: AutoCompleteOption) => string;
  renderOption?: (option: AutoCompleteOption) => ReactNode;
  renderEmpty?: () => ReactNode;
  /** @default false */
  loading?: boolean;
  inputProps?: Omit<InputProps, "value" | "defaultValue" | "onChange">;
  filterOption?: (value: string, option: AutoCompleteOption) => boolean;
  sortOption?: (a: AutoCompleteOption, b: AutoCompleteOption) => number;
  onDropdownVisibleChange?: (visible: boolean) => void;
  onSubmit?: (value: string) => void;
  /** @default false */
  autoHighlight?: boolean;
  /** @default true */
  fillOnSelect?: boolean;
  style?: StyleProp<ViewStyle>;
}
export function AutoComplete({
  label,
  options,
  value,
  defaultValue = "",
  onChange,
  onSelect,
  onOptionClick,
  groupBy,
  renderOption,
  renderEmpty,
  loading = false,
  inputProps: inputPropsProp,
  filterOption,
  sortOption,
  onDropdownVisibleChange,
  onSubmit,
  autoHighlight = false,
  fillOnSelect = true,
  style,
}: AutoCompleteProps) {
  const inputProps = useFormControlProps<InputProps>(inputPropsProp ?? {});
  const { tokens: t } = useTheme();
  const { t: translate } = useI18n();
  const [text, setText] = useControllable(value, defaultValue, onChange);
  const [open, setOpen] = useState(false);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  useEffect(() => () => clearTimeout(blurTimer.current), []);
  const show = (next: boolean) => {
    if (open !== next) {
      setOpen(next);
      onDropdownVisibleChange?.(next);
    }
  };
  const disabled = inputProps?.disabled || inputProps?.readOnly;
  const visible = options.filter((option) =>
    filterOption
      ? filterOption(text, option)
      : option.label.toLowerCase().includes(text.toLowerCase()),
  );
  if (sortOption) visible.sort(sortOption);
  const pick = (option: AutoCompleteOption) => {
    if (disabled || option.disabled) return;
    clearTimeout(blurTimer.current);
    if (fillOnSelect) setText(option.label);
    onSelect?.(option);
    show(false);
  };
  return (
    <View style={style}>
      <Input
        {...inputProps}
        label={label ?? inputProps?.label}
        value={text}
        accessibilityState={{
          ...inputProps?.accessibilityState,
          expanded: open,
        }}
        onFocus={(event) => {
          inputProps?.onFocus?.(event);
          clearTimeout(blurTimer.current);
          if (!disabled) show(true);
        }}
        onBlur={(event) => {
          inputProps?.onBlur?.(event);
          // Allow the option press that caused this blur to finish first.
          blurTimer.current = setTimeout(() => show(false), 120);
        }}
        onChange={(next) => {
          if (!disabled) {
            setText(next);
            show(true);
          }
        }}
        onSubmitEditing={() => {
          const first = visible.find((o) => !o.disabled);
          if (autoHighlight && first) pick(first);
          else {
            onSubmit?.(text.trim());
            show(false);
          }
        }}
      />
      {open && !disabled && (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={{
            maxHeight: 260,
            borderWidth: 1,
            borderColor: t.colors["border-color"],
            borderRadius: t.radius.md,
            backgroundColor: t.colors["surface-color"],
          }}
        >
          {loading ? (
            <ActivityIndicator color={t.colors["primary-color"]} />
          ) : visible.length === 0 ? (
            (renderEmpty?.() ?? (
              <Text style={[textStyle(t), { padding: t.space["3"] }]}>
                {translate("empty.description")}
              </Text>
            ))
          ) : (
            visible.map((option, index) => {
              const group = groupBy?.(option);
              return (
                <View key={option.value}>
                  {Boolean(group) &&
                    group !== groupBy?.(visible[index - 1] ?? option) && (
                      <Text
                        accessibilityRole="header"
                        style={textStyle(t, "sm")}
                      >
                        {group}
                      </Text>
                    )}
                  {Boolean(group) && index === 0 && (
                    <Text accessibilityRole="header" style={textStyle(t, "sm")}>
                      {group}
                    </Text>
                  )}
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={option.label}
                    accessibilityState={{ disabled: option.disabled }}
                    disabled={option.disabled}
                    onPress={() => {
                      pick(option);
                      onOptionClick?.(option);
                    }}
                    style={({ pressed }) => ({
                      minHeight: t.touchTargetMin,
                      padding: t.space["3"],
                      opacity: option.disabled ? 0.5 : 1,
                      backgroundColor:
                        pressed || option.highlight
                          ? t.colors["primary-color-subtle"]
                          : undefined,
                    })}
                  >
                    {renderOption?.(option) ?? (
                      <>
                        {option.icon}
                        <Text style={textStyle(t)}>{option.label}</Text>
                        {Boolean(option.description) && (
                          <Text style={textStyle(t, "sm")}>
                            {option.description}
                          </Text>
                        )}
                      </>
                    )}
                  </Pressable>
                </View>
              );
            })
          )}
        </ScrollView>
      )}
    </View>
  );
}
