import { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import {
  formatTime,
  resolveTimeFormat,
  formatHasSeconds,
  secondsOfDay,
} from "@minerva/core";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { textStyle } from "../../internal/styles";
import { useControllable } from "../../internal/useControllable";
import { bindFormControl } from "../../internal/formControl";
import { useFormControlProps } from "../../internal/FormControlContext";
import { Button } from "../Button";
import { Dialog } from "../Dialog";
export interface TimePickerProps {
  value?: Date | null;
  defaultValue?: Date;
  onChange?: (date: Date | undefined) => void;
  /** @default "HH:mm:ss" */
  format?: string;
  /** @default false */
  use12Hours?: boolean;
  placeholder?: string;
  label?: string;
  accessibilityLabel?: string;
  /** @default false */
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  /** @default true */
  clearable?: boolean;
  /** @default true */
  showSecond?: boolean;
  /** @default 1 */
  hourStep?: number;
  /** @default 1 */
  minuteStep?: number;
  /** @default 1 */
  secondStep?: number;
  minTime?: Date;
  maxTime?: Date;
  onOpenChange?: (open: boolean) => void;
  style?: StyleProp<ViewStyle>;
}
export function TimePicker(props: TimePickerProps) {
  const {
    value,
    defaultValue,
    onChange,
    format,
    use12Hours = false,
    placeholder,
    label,
    accessibilityLabel,
    disabled,
    readOnly,
    invalid,
    clearable = true,
    showSecond = true,
    hourStep = 1,
    minuteStep = 1,
    secondStep = 1,
    minTime,
    maxTime,
    onOpenChange,
    style,
  } = useFormControlProps(props);
  const { tokens: t } = useTheme();
  const { t: translate, language } = useI18n();
  const [selected, setSelected] = useControllable<Date | null>(
    value,
    defaultValue ?? null,
    (next) => onChange?.(next ?? undefined),
  );
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(
    () => new Date(defaultValue ?? new Date()),
  );
  const pattern = resolveTimeFormat(
    format ?? (use12Hours ? "hh:mm:ss a" : "HH:mm:ss"),
    showSecond,
  );
  const seconds = formatHasSeconds(pattern);
  const show = (next: boolean) => {
    setOpen(next);
    onOpenChange?.(next);
  };
  const min = minTime ? secondsOfDay(minTime) : 0;
  const max = maxTime ? secondsOfDay(maxTime) : 86399;
  const current = secondsOfDay(draft);
  for (const step of [hourStep, minuteStep, secondStep])
    if (!Number.isInteger(step) || step <= 0)
      throw RangeError("Time steps must be positive integers");
  const period = draft.getHours() >= 12 ? 1 : 0;
  const periodLabels = [0, 12].map(
    (hour) =>
      new Intl.DateTimeFormat(language, { hour: "numeric", hour12: true })
        .formatToParts(new Date(2026, 0, 1, hour))
        .find((part) => part.type === "dayPeriod")?.value ??
      (hour ? "PM" : "AM"),
  );
  const units = [
    {
      kind: "hour",
      name: translate("timePicker.hours"),
      count: use12Hours ? 12 : 24,
      step: hourStep,
      value: use12Hours ? draft.getHours() % 12 : draft.getHours(),
      set: (date: Date, n: number) =>
        date.setHours(n + (use12Hours ? period * 12 : 0)),
      span: 3600,
    },
    {
      kind: "minute",
      name: translate("timePicker.minutes"),
      count: 60,
      step: minuteStep,
      value: draft.getMinutes(),
      set: (date: Date, n: number) => date.setMinutes(n),
      span: 60,
    },
    ...(seconds
      ? [
          {
            kind: "second",
            name: translate("timePicker.seconds"),
            count: 60,
            step: secondStep,
            value: draft.getSeconds(),
            set: (date: Date, n: number) => date.setSeconds(n),
            span: 1,
          },
        ]
      : []),
    ...(use12Hours
      ? [
          {
            kind: "period",
            name: translate("timePicker.period"),
            count: 2,
            step: 1,
            value: period,
            set: (date: Date, n: number) =>
              date.setHours((date.getHours() % 12) + n * 12),
            span: 43200,
          },
        ]
      : []),
  ];
  return (
    <View style={style}>
      <Pressable
        accessibilityRole="combobox"
        accessibilityLabel={
          label ?? accessibilityLabel ?? translate("timePicker.label")
        }
        accessibilityValue={{
          text: selected
            ? formatTime(selected, pattern)
            : (placeholder ?? translate("timePicker.placeholder")),
        }}
        accessibilityState={{ expanded: open, disabled: disabled || readOnly }}
        disabled={disabled || readOnly}
        onPress={() => {
          const next = new Date(selected ?? new Date());
          if (!seconds) next.setSeconds(0);
          next.setMilliseconds(0);
          setDraft(next);
          show(true);
        }}
        style={{
          minHeight: t.touchTargetMin,
          padding: t.space["3"],
          borderWidth: 1,
          borderColor: invalid
            ? t.colors["danger-color"]
            : t.colors["border-color"],
          borderRadius: t.radius.md,
        }}
      >
        <Text style={textStyle(t)}>
          {selected
            ? formatTime(selected, pattern)
            : (placeholder ?? translate("timePicker.placeholder"))}
        </Text>
      </Pressable>
      {clearable && selected && !disabled && !readOnly && (
        <Button
          variant="link"
          accessibilityLabel={translate("timePicker.clear")}
          onPress={() => setSelected(null)}
        >
          {translate("timePicker.clear")}
        </Button>
      )}
      <Dialog
        open={open}
        onOpenChange={show}
        title={label ?? translate("timePicker.label")}
        footer={
          <View style={{ flexDirection: "row", gap: t.space["3"] }}>
            <Button variant="outline" onPress={() => show(false)}>
              {translate("picker.cancel")}
            </Button>
            <Button
              disabled={current < min || current > max}
              onPress={() => {
                setSelected(new Date(draft));
                show(false);
              }}
            >
              {translate("picker.confirm")}
            </Button>
          </View>
        }
      >
        <View style={{ flexDirection: "row", gap: t.space["2"] }}>
          {units.map((unit) => (
            <View key={unit.name} style={{ flex: 1 }}>
              <Text accessibilityRole="header" style={textStyle(t)}>
                {unit.name}
              </Text>
              <ScrollView style={{ height: 220 }}>
                {Array.from(
                  { length: Math.ceil(unit.count / unit.step) },
                  (_, i) => i * unit.step,
                ).map((n) => {
                  const next = new Date(draft);
                  unit.set(next, n);
                  const start =
                    Math.floor(secondsOfDay(next) / unit.span) * unit.span;
                  const off = start > max || start + unit.span - 1 < min;
                  const text =
                    unit.kind === "period"
                      ? periodLabels[n]!
                      : unit.kind === "hour" && use12Hours
                        ? String(n || 12)
                        : String(n).padStart(2, "0");
                  return (
                    <Button
                      key={n}
                      variant="ghost"
                      disabled={off}
                      active={unit.value === n}
                      accessibilityLabel={`${unit.name} ${text}`}
                      onPress={() => setDraft(next)}
                    >
                      {text}
                    </Button>
                  );
                })}
              </ScrollView>
            </View>
          ))}
        </View>
      </Dialog>
    </View>
  );
}
bindFormControl(TimePicker, { emptyValue: null, commitOnChange: true });
