import { useState } from "react";
import {
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { dayKey, monthStart, parseDayKey } from "@minerva/core";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { useControllable } from "../../internal/useControllable";
import { useFormControlProps } from "../../internal/FormControlContext";
import { bindFormControl } from "../../internal/formControl";
import { textStyle } from "../../internal/styles";
import { part } from "../../internal/parts";
import { Button } from "../Button";
import { Calendar } from "../Calendar";
import { Dialog } from "../Dialog";

export interface DatePickerProps {
  /** Selected local date, YYYY-MM-DD. null and "" remain controlled empty values. */
  value?: string | null;
  /** Initial local date while uncontrolled. */
  defaultValue?: string;
  /** Selected YYYY-MM-DD day, or "" when cleared. */
  onChange?: (value: string) => void;
  /** Called when the calendar opens or closes. */
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  /** Visible label and accessible name. */
  label?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  nativeID?: string;
  /** @default false */
  disabled?: boolean;
  /** Prevents opening, selection and clearing. */
  readOnly?: boolean;
  invalid?: boolean;
  /** @default true */
  clearable?: boolean;
  /** @default "medium" */
  size?: "small" | "medium" | "large";
  /** Earliest selectable local day, YYYY-MM-DD, inclusive. */
  minDate?: string;
  /** Latest selectable local day, YYYY-MM-DD, inclusive. */
  maxDate?: string;
  /** Locale for calendar month and date names; defaults to provider language. */
  locale?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * Native touch date field with an accessible calendar dialog. Selection commits
 * immediately; clearing emits "". Dates use local YYYY-MM-DD strings, matching
 * the web DatePicker value contract; native input uses day buttons, not typing.
 */
export function DatePicker(props: DatePickerProps) {
  const {
    value,
    defaultValue,
    onChange,
    onOpenChange,
    placeholder,
    label,
    accessibilityLabel,
    accessibilityHint,
    nativeID,
    disabled = false,
    readOnly = false,
    invalid = false,
    clearable = true,
    size = "medium",
    minDate,
    maxDate,
    locale,
    style,
    testID,
  } = useFormControlProps(props);
  const { tokens: t } = useTheme();
  const { t: translate, language } = useI18n();
  const [current, setCurrent] = useControllable<string>(
    value === null ? "" : value,
    defaultValue ?? "",
    onChange,
  );
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(() =>
    monthStart(parseDayKey(current) ?? new Date()),
  );
  const locked = disabled || readOnly;
  const accessibleName =
    label ?? accessibilityLabel ?? translate("datePicker.label");
  const displayValue =
    current || placeholder || translate("datePicker.placeholder");
  const outsideRange = (key: string) =>
    !!((minDate && key < minDate) || (maxDate && key > maxDate));
  const show = (next: boolean) => {
    if (next && locked) return;
    if (next === open) return;
    if (next) {
      let date = parseDayKey(current) ?? new Date();
      if (minDate && dayKey(date) < minDate)
        date = parseDayKey(minDate) ?? date;
      if (maxDate && dayKey(date) > maxDate)
        date = parseDayKey(maxDate) ?? date;
      setMonth(monthStart(date));
    }
    setOpen(next);
    onOpenChange?.(next);
  };
  const select = (date: Date) => {
    const key = dayKey(date);
    if (locked || outsideRange(key)) return;
    setCurrent(key);
    show(false);
  };
  const today = new Date();
  return (
    <View
      {...part("date-picker", "root", { disabled, readOnly, size })}
      style={style}
      testID={testID}
    >
      {label && (
        <Text style={[textStyle(t), { marginBottom: t.space["1"] }]}>
          {label}
        </Text>
      )}
      <Pressable
        accessibilityRole="combobox"
        accessibilityLabel={accessibleName}
        accessibilityHint={accessibilityHint}
        nativeID={nativeID}
        accessibilityValue={{ text: displayValue }}
        accessibilityState={{ expanded: open && !locked, disabled: locked }}
        aria-invalid={invalid || undefined}
        disabled={locked}
        onPress={() => show(true)}
        style={{
          minHeight: t.touchTargetMin,
          justifyContent: "center",
          padding:
            t.space[size === "small" ? "2" : size === "large" ? "4" : "3"],
          borderWidth: 1,
          borderColor: t.colors[invalid ? "danger-color" : "border-color"],
          borderRadius: t.radius.md,
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <Text
          style={[
            textStyle(t),
            { color: t.colors[current ? "text-color" : "text-muted-color"] },
          ]}
        >
          {displayValue}
        </Text>
      </Pressable>
      {clearable && current && !locked && (
        <Button
          variant="link"
          accessibilityLabel={translate("datePicker.clear")}
          onPress={() => setCurrent("")}
        >
          {translate("datePicker.clear")}
        </Button>
      )}
      <Dialog
        open={open && !locked}
        onOpenChange={show}
        title={accessibleName}
        footer={
          <Button
            variant="ghost"
            disabled={locked || outsideRange(dayKey(today))}
            onPress={() => select(today)}
          >
            {translate("datePicker.today")}
          </Button>
        }
      >
        <Calendar
          value={parseDayKey(current) ?? null}
          month={month}
          onMonthChange={setMonth}
          onSelect={select}
          minDate={minDate ? (parseDayKey(minDate) ?? undefined) : undefined}
          maxDate={maxDate ? (parseDayKey(maxDate) ?? undefined) : undefined}
          firstDayOfWeek={1}
          disabled={locked}
          size={size}
          locale={locale ?? language}
        />
      </Dialog>
    </View>
  );
}

bindFormControl(DatePicker, { emptyValue: "", commitOnChange: true });
