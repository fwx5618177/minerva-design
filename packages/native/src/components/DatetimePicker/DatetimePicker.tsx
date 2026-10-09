import { useMemo, useState, type ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { Overlay, type OverlayCloseReason } from "../../internal/Overlay";
import { useControllable } from "../../internal/useControllable";
import { useOverlay } from "../../internal/useOverlay";
import {
  PickerToolbar,
  PickerView,
  type PickerOption,
  type PickerValue,
} from "../Picker/Picker";

export type DatetimePickerType = "date" | "time" | "datetime" | "year-month";
/** A wheel column of the date / time */
export type DatetimeColumn = "year" | "month" | "day" | "hour" | "minute";
/** Why the picker closed */
export type DatetimePickerCloseReason = OverlayCloseReason;

export interface DatetimePickerProps {
  /**
   * Columns shown: `date` (year / month / day), `time` (hour / minute),
   * `datetime` (both) or `year-month`
   * @default "date"
   */
  type?: DatetimePickerType;
  /** Controlled confirmed value */
  value?: Date;
  /** Initial confirmed value while uncontrolled @default now (clamped to the range) */
  defaultValue?: Date;
  /** Called on confirm with the picked date */
  onChange?: (value: Date) => void;
  /** Called while scrolling with the pending (unconfirmed) date */
  onPick?: (value: Date) => void;
  /** Called when the cancel button closes the sheet */
  onCancel?: () => void;
  /**
   * Earliest selectable date (not applied to the `time` type)
   * @default January 1st, 10 years ago
   */
  minDate?: Date;
  /**
   * Latest selectable date (not applied to the `time` type)
   * @default December 31st, 10 years ahead
   */
  maxDate?: Date;
  /**
   * Step of the minute column
   * @default 1
   */
  minuteStep?: number;
  /** Text of each row @default zero-padded numbers ("2024", "03") */
  formatter?: (column: DatetimeColumn, value: number) => string;
  /** Controlled open state */
  open?: boolean;
  /**
   * Initial open state while uncontrolled
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Called with the requested open state and, when closing, the reason
   * ("confirm", "cancel", "mask", "back")
   */
  onOpenChange?: (open: boolean, reason?: DatetimePickerCloseReason) => void;
  /**
   * Toolbar title
   * @default the "datetimePicker.title" message ("datetimePicker.titleTime" for `time`)
   */
  title?: ReactNode;
  /** Text of the confirm button @default the "picker.confirm" message */
  confirmText?: ReactNode;
  /** Text of the cancel button @default the "picker.cancel" message */
  cancelText?: ReactNode;
  /**
   * Height of a row in dp
   * @default 44
   */
  itemHeight?: number;
  /**
   * Rows visible in each wheel
   * @default 5
   */
  visibleItemCount?: number;
  /**
   * Closes on a press on the mask
   * @default true
   */
  closeOnMaskPress?: boolean;
  /** Style of the sheet */
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const KINDS: Record<DatetimePickerType, DatetimeColumn[]> = {
  date: ["year", "month", "day"],
  time: ["hour", "minute"],
  datetime: ["year", "month", "day", "hour", "minute"],
  "year-month": ["year", "month"],
};

/** Days in a month (1-12), leap years included */
export const daysInMonth = (year: number, month: number): number =>
  new Date(year, month, 0).getDate();

const pad = (n: number) => String(n).padStart(2, "0");
const defaultFormat = (column: DatetimeColumn, n: number) =>
  column === "year" ? String(n) : pad(n);

const parts = (d: Date) => ({
  year: d.getFullYear(),
  month: d.getMonth() + 1,
  day: d.getDate(),
  hour: d.getHours(),
  minute: d.getMinutes(),
});
type Parts = ReturnType<typeof parts>;

const clampDate = (d: Date, min: Date, max: Date) =>
  d < min ? new Date(min) : d > max ? new Date(max) : d;

/** Bounds of each column for the current choice */
function bounds(
  kind: DatetimeColumn,
  cur: Parts,
  min: Parts,
  max: Parts,
  bounded: boolean,
): [number, number] {
  const atMin = (keys: (keyof Parts)[]) =>
    bounded && keys.every((k) => cur[k] === min[k]);
  const atMax = (keys: (keyof Parts)[]) =>
    bounded && keys.every((k) => cur[k] === max[k]);
  switch (kind) {
    case "year":
      return bounded ? [min.year, max.year] : [cur.year, cur.year];
    case "month":
      return [
        atMin(["year"]) ? min.month : 1,
        atMax(["year"]) ? max.month : 12,
      ];
    case "day":
      return [
        atMin(["year", "month"]) ? min.day : 1,
        atMax(["year", "month"]) ? max.day : daysInMonth(cur.year, cur.month),
      ];
    case "hour":
      return [
        atMin(["year", "month", "day"]) ? min.hour : 0,
        atMax(["year", "month", "day"]) ? max.hour : 23,
      ];
    case "minute":
      return [
        atMin(["year", "month", "day", "hour"]) ? min.minute : 0,
        atMax(["year", "month", "day", "hour"]) ? max.minute : 59,
      ];
  }
}

/** Builds the date of a value path (day clamped to the month length) */
function fromPath(
  kinds: DatetimeColumn[],
  values: readonly PickerValue[],
  base: Date,
): Date {
  const p = parts(base);
  kinds.forEach((k, i) => {
    if (values[i] !== undefined) p[k] = Number(values[i]);
  });
  const day = Math.min(p.day, daysInMonth(p.year, p.month));
  return new Date(p.year, p.month - 1, day, p.hour, p.minute);
}

/**
 * A bottom-sheet date / time picker on `PickerView` wheels: year, month,
 * day, hour and minute columns per `type`, bounded by `minDate` /
 * `maxDate` (the day column follows the month length and leap years).
 * The picked date is confirmed with the confirm button.
 */
export function DatetimePicker({
  type = "date",
  value,
  defaultValue,
  onChange,
  onPick,
  onCancel,
  minDate,
  maxDate,
  minuteStep = 1,
  formatter = defaultFormat,
  open,
  defaultOpen = false,
  onOpenChange,
  title,
  confirmText,
  cancelText,
  itemHeight,
  visibleItemCount,
  closeOnMaskPress = true,
  style,
  testID,
}: DatetimePickerProps) {
  const { tokens: t } = useTheme();
  const { t: translate } = useI18n();
  const overlay = useOverlay({ open, defaultOpen, onOpenChange });
  const [now] = useState(() => new Date());
  const min = minDate ?? new Date(now.getFullYear() - 10, 0, 1, 0, 0);
  const max = maxDate ?? new Date(now.getFullYear() + 10, 11, 31, 23, 59);
  const bounded = type !== "time";
  const [committed, setCommitted] = useControllable<Date | undefined>(
    value,
    defaultValue,
  );
  const initial = committed ?? now;
  const start = bounded ? clampDate(initial, min, max) : initial;
  const [draft, setDraft] = useState<Date>(start);
  const [wasOpen, setWasOpen] = useState(overlay.state.open);
  if (wasOpen !== overlay.state.open) {
    setWasOpen(overlay.state.open);
    if (overlay.state.open) setDraft(start);
  }

  const kinds = KINDS[type];
  const step = Math.max(1, Math.floor(minuteStep));
  const draftTime = draft.getTime();
  const minTime = min.getTime();
  const maxTime = max.getTime();
  const { columns, path } = useMemo(() => {
    const cur = parts(new Date(draftTime));
    const lo = parts(new Date(minTime));
    const hi = parts(new Date(maxTime));
    const cols: PickerOption[][] = [];
    const values: PickerValue[] = [];
    for (const kind of kinds) {
      const [from, to] = bounds(kind, cur, lo, hi, bounded);
      const options: PickerOption[] = [];
      for (let n = from; n <= to; n += kind === "minute" ? step : 1)
        options.push({ value: n, label: formatter(kind, n) });
      cols.push(options);
      let chosen = cur[kind];
      if (kind === "minute")
        chosen = from + Math.floor((chosen - from) / step) * step;
      values.push(Math.min(to, Math.max(from, chosen)));
    }
    return { columns: cols, path: values };
  }, [draftTime, minTime, maxTime, kinds, bounded, step, formatter]);

  if (overlay.state.phase === "closed") return null;

  const titleNode =
    title ??
    translate(
      type === "time" ? "datetimePicker.titleTime" : "datetimePicker.title",
    );
  const toDate = (values: readonly PickerValue[]) => {
    const d = fromPath(kinds, values, draft);
    return bounded ? clampDate(d, min, max) : d;
  };

  return (
    <Overlay
      component="datetime-picker"
      phase={overlay.state.phase}
      onAnimationEnd={overlay.onAnimationEnd}
      onRequestClose={overlay.close}
      placement="bottom"
      closeOnMaskPress={closeOnMaskPress}
      testID={testID}
      panelProps={{
        role: "dialog",
        accessibilityLabel:
          typeof titleNode === "string" ? titleNode : undefined,
      }}
      panelStyle={style}
    >
      <PickerToolbar
        component="datetime-picker"
        title={titleNode}
        cancelText={cancelText ?? translate("picker.cancel")}
        confirmText={confirmText ?? translate("picker.confirm")}
        onCancel={() => {
          onCancel?.();
          overlay.close("cancel");
        }}
        onConfirm={() => {
          const picked = toDate(path);
          setCommitted(picked);
          onChange?.(picked);
          overlay.close("confirm");
        }}
      />
      <PickerView
        columns={columns}
        value={path}
        onChange={(values) => {
          const next = toDate(values);
          setDraft(next);
          onPick?.(next);
        }}
        columnLabels={kinds.map((k) => translate(`datetimePicker.${k}`))}
        itemHeight={itemHeight}
        visibleItemCount={visibleItemCount}
        style={{ marginVertical: t.space["2"] }}
      />
    </Overlay>
  );
}
