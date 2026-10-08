import { useMemo, useState, type ReactNode } from "react";
import {
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import {
  addDays,
  createSelectionMachine,
  dayKey,
  localDate,
  monthStart,
  sameMonth,
} from "@minerva/core";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { Icon } from "../../internal/Icon";
import { Overlay, type OverlayCloseReason } from "../../internal/Overlay";
import { part } from "../../internal/parts";
import { hitSlopFor, textStyle, weight } from "../../internal/styles";
import { useControllable } from "../../internal/useControllable";
import { useMachine } from "../../internal/useMachine";
import { useOverlay } from "../../internal/useOverlay";
import { Button } from "../Button";

/** Selection type of `Calendar` */
export type CalendarType = "single" | "multiple" | "range";

/**
 * Value of `Calendar`: a day (`single`, `null`: none), days (`multiple`) or
 * a `[start, end]` range (`range`); every date is local midnight
 */
export type CalendarValue = Date | Date[] | [Date, Date] | null;

/** Why a poppable calendar closed */
export type CalendarCloseReason = OverlayCloseReason;

export interface CalendarProps extends Omit<ViewProps, "style" | "children"> {
  /**
   * Selection type: one day, several days, or a range
   * @default "single"
   */
  type?: CalendarType;
  /**
   * Selected day(s) (controlled; pair with `onChange`): a `Date` (`single`),
   * `Date[]` (`multiple`) or `[start, end]` (`range`)
   */
  value?: CalendarValue;
  /** Initially selected day(s) (uncontrolled) @default null */
  defaultValue?: CalendarValue;
  /**
   * Called with the new selection (a range once both ends are picked)
   */
  onChange?: (value: CalendarValue) => void;
  /** Called with every pressed day */
  onSelect?: (date: Date) => void;
  /** Displayed month (controlled; any day of the month; pair with `onMonthChange`) */
  month?: Date;
  /**
   * Initially displayed month (uncontrolled)
   * @default the month of the first selected day, else of today
   */
  defaultMonth?: Date;
  /** Called with the first day of the month navigated to */
  onMonthChange?: (month: Date) => void;
  /** Earliest selectable day (earlier days are disabled) */
  minDate?: Date;
  /** Latest selectable day (later days are disabled) */
  maxDate?: Date;
  /** Extra disabled days */
  disabledDate?: (date: Date) => boolean;
  /**
   * First column of the week (0: Sunday ... 6: Saturday)
   * @default 0
   */
  firstDayOfWeek?: number;
  /**
   * Cell density: compact ("small"), default ("medium") or comfortable
   * ("large")
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
  /**
   * Blocks navigation and selection
   * @default false
   */
  disabled?: boolean;
  /** Label of the previous-month button @default the "monthCalendar.previousMonth" message */
  previousMonthLabel?: string;
  /** Label of the next-month button @default the "monthCalendar.nextMonth" message */
  nextMonthLabel?: string;
  /**
   * Renders the calendar in a bottom sheet with a title and a confirm
   * button (`open` / `defaultOpen` / `onOpenChange`)
   * @default false
   */
  poppable?: boolean;
  /** Controlled open state of the poppable sheet */
  open?: boolean;
  /**
   * Initial open state of the poppable sheet while uncontrolled
   * @default false
   */
  defaultOpen?: boolean;
  /** Called with the requested open state of the sheet and the close reason */
  onOpenChange?: (open: boolean, reason?: CalendarCloseReason) => void;
  /** Title of the poppable sheet @default the "calendar.title" message */
  title?: ReactNode;
  /** Text of the confirm button @default the "calendar.confirm" message */
  confirmText?: ReactNode;
  /** Called by the confirm button of the poppable sheet with the selection */
  onConfirm?: (value: CalendarValue) => void;
  /** Style of the calendar */
  style?: StyleProp<ViewStyle>;
}

const WEEKDAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;
const CELL_HEIGHT = {
  small: "control-height-sm",
  medium: "control-height-md",
  large: "control-height-lg",
} as const;

const parseKey = (key: string) => {
  const [y, m, d] = key.split("-").map(Number);
  return localDate(y, m - 1, d);
};

/** The selected day keys of a value */
const keysOf = (value: CalendarValue | undefined): string[] | undefined => {
  if (value === undefined) return undefined;
  if (value === null) return [];
  return (Array.isArray(value) ? value : [value]).map(dayKey);
};

/** The same array while its items are unchanged (controlled values) */
function useStableKeys(keys: readonly string[] | undefined) {
  const joined = keys?.join("\u0000");
  return useMemo(
    () =>
      joined === undefined
        ? undefined
        : joined === ""
          ? []
          : joined.split("\u0000"),
    [joined],
  );
}

/**
 * A month calendar for picking a day, several days or a range: weekday
 * header, month navigation, min / max dates, today ring, selected fills
 * and range tint. Inline, or in a bottom sheet with a confirm button
 * (`poppable`). Single and multiple selections run on the selection
 * machine of @minerva/core.
 */
export function Calendar(props: CalendarProps) {
  if (!props.poppable) return <CalendarView {...props} />;
  return <PoppableCalendar {...props} />;
}

function PoppableCalendar({
  open,
  defaultOpen = false,
  onOpenChange,
  title,
  confirmText,
  onConfirm,
  onChange,
  value,
  defaultValue = null,
  type = "single",
  ...rest
}: CalendarProps) {
  const { tokens: t, fonts } = useTheme();
  const { t: translate } = useI18n();
  const overlay = useOverlay({ open, defaultOpen, onOpenChange });
  // the sheet keeps the selection to confirm
  const [current, setCurrent] = useControllable<CalendarValue>(
    value,
    defaultValue,
    onChange,
  );
  if (overlay.state.phase === "closed") return null;
  const ready = Array.isArray(current) ? current.length > 0 : current !== null;
  const titleNode = title ?? translate("calendar.title");
  const titleText =
    typeof titleNode === "string" || typeof titleNode === "number"
      ? String(titleNode)
      : undefined;
  const closeSize = 28;

  return (
    <Overlay
      component="calendar"
      phase={overlay.state.phase}
      onAnimationEnd={overlay.onAnimationEnd}
      onRequestClose={overlay.close}
      placement="bottom"
      panelProps={{ role: "dialog", accessibilityLabel: titleText }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: t.space["4"],
          paddingHorizontal: t.space["12"],
        }}
        {...part("calendar", "header")}
      >
        {titleText !== undefined ? (
          <Text
            accessibilityRole="header"
            style={[
              textStyle(t, "lg", fonts.sans),
              { fontWeight: weight(t, "semibold") },
            ]}
            {...part("calendar", "title")}
          >
            {titleText}
          </Text>
        ) : (
          titleNode
        )}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={translate("modal.close")}
          hitSlop={hitSlopFor(t, closeSize, closeSize)}
          onPress={() => overlay.close("close-button")}
          style={({ pressed }) => ({
            position: "absolute",
            right: t.space["4"],
            width: closeSize,
            height: closeSize,
            borderRadius: closeSize / 2,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: pressed
              ? t.colors["surface-muted-color"]
              : "transparent",
          })}
          {...part("calendar", "close")}
        >
          <Icon name="close" size={14} color={t.colors["text-muted-color"]} />
        </Pressable>
      </View>
      <CalendarView
        {...rest}
        type={type}
        value={current}
        onChange={setCurrent}
        style={[{ paddingHorizontal: t.space["2"] }, rest.style]}
      />
      <View
        style={{ padding: t.space["4"], paddingTop: t.space["2"] }}
        {...part("calendar", "footer")}
      >
        <Button
          fullWidth
          disabled={!ready}
          onPress={() => {
            onConfirm?.(current);
            overlay.close("confirm");
          }}
        >
          {confirmText ?? translate("calendar.confirm")}
        </Button>
      </View>
    </Overlay>
  );
}

function CalendarView({
  type = "single",
  value,
  defaultValue = null,
  onChange,
  onSelect,
  month,
  defaultMonth,
  onMonthChange,
  minDate,
  maxDate,
  disabledDate,
  firstDayOfWeek = 0,
  size = "medium",
  disabled = false,
  previousMonthLabel,
  nextMonthLabel,
  style,
  accessibilityLabel,
  // poppable-only props, unused inline
  poppable: _poppable,
  open: _open,
  defaultOpen: _defaultOpen,
  onOpenChange: _onOpenChange,
  title: _title,
  confirmText: _confirmText,
  onConfirm: _onConfirm,
  ...rest
}: CalendarProps) {
  const { tokens: t, fonts } = useTheme();
  const { t: translate, language } = useI18n();
  const [today] = useState(() => {
    const now = new Date();
    return localDate(now.getFullYear(), now.getMonth(), now.getDate());
  });
  const todayKey = dayKey(today);
  const minKey = minDate ? dayKey(minDate) : undefined;
  const maxKey = maxDate ? dayKey(maxDate) : undefined;
  const isDisabled = (date: Date) => {
    const key = dayKey(date);
    return (
      (minKey !== undefined && key < minKey) ||
      (maxKey !== undefined && key > maxKey) ||
      !!disabledDate?.(date)
    );
  };

  const toValue = (keys: readonly string[]): CalendarValue => {
    const dates = keys.map(parseKey);
    if (type === "single") return dates[0] ?? null;
    if (type === "range") {
      return dates.length === 2 ? [dates[0], dates[1]] : null;
    }
    return dates;
  };
  const controlledKeys = useStableKeys(keysOf(value));
  const [state, send] = useMachine(createSelectionMachine<string>, {
    mode: type === "single" ? ("single" as const) : ("multiple" as const),
    value: controlledKeys,
    defaultValue: keysOf(defaultValue) ?? [],
    isDisabled: (key: string) => isDisabled(parseKey(key)),
    max: type === "range" ? 2 : undefined,
    onValueChange: (keys: string[]) => onChange?.(toValue(keys)),
  });
  // range: the first end picked, waiting for the second
  const [pendingStart, setPendingStart] = useState<string | null>(null);

  const selected = state.value;
  const rangeKeys: [string, string] | null =
    type === "range"
      ? pendingStart !== null
        ? [pendingStart, pendingStart]
        : selected.length === 2
          ? [selected[0], selected[1]]
          : null
      : null;

  const firstSelected = selected[0] ? parseKey(selected[0]) : undefined;
  const [shownMonth, setShownMonth] = useControllable<Date>(
    month,
    defaultMonth ??
      firstSelected ??
      (minDate && minDate > today ? minDate : today),
    onMonthChange,
  );
  const first = monthStart(shownMonth);
  const canPrev = !disabled && (!minDate || first > monthStart(minDate));
  const canNext = !disabled && (!maxDate || monthStart(first, 1) <= maxDate);

  const press = (date: Date) => {
    const key = dayKey(date);
    onSelect?.(date);
    if (type === "single") {
      send({ type: "SELECT", value: key });
    } else if (type === "multiple") {
      send({ type: "TOGGLE", value: key });
    } else if (pendingStart === null || key < pendingStart) {
      setPendingStart(key);
    } else {
      setPendingStart(null);
      send({ type: "SET", value: [pendingStart, key] });
    }
    if (!sameMonth(date, first)) setShownMonth(monthStart(date));
  };

  const fullDate = useMemo(() => {
    try {
      const format = new Intl.DateTimeFormat(language, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return (date: Date) => format.format(date);
    } catch {
      return (date: Date) => date.toDateString();
    }
  }, [language]);

  const lead = (first.getDay() - firstDayOfWeek + 7) % 7;
  const daysInMonth = localDate(
    first.getFullYear(),
    first.getMonth() + 1,
    0,
  ).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: lead }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => addDays(first, i)),
  ];
  while (cells.length % 7) cells.push(null);
  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  const cellHeight = t.sizes[CELL_HEIGHT[size]];
  const dot = Math.min(cellHeight - t.space["1"], 44);
  const primary = t.colors["primary-color"];
  const sans = fonts.sans;
  const navSize = 32;

  const navButton = (direction: -1 | 1) => {
    const enabled = direction < 0 ? canPrev : canNext;
    const label =
      direction < 0
        ? (previousMonthLabel ?? translate("monthCalendar.previousMonth"))
        : (nextMonthLabel ?? translate("monthCalendar.nextMonth"));
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ disabled: !enabled }}
        disabled={!enabled}
        hitSlop={hitSlopFor(t, navSize, navSize)}
        onPress={() => setShownMonth(monthStart(first, direction))}
        style={({ pressed }) => ({
          width: navSize,
          height: navSize,
          borderRadius: navSize / 2,
          alignItems: "center",
          justifyContent: "center",
          opacity: enabled ? 1 : 0.35,
          backgroundColor: pressed
            ? t.colors["surface-muted-color"]
            : "transparent",
        })}
        {...part("calendar", direction < 0 ? "prev" : "next")}
      >
        <Icon
          name={direction < 0 ? "chevron-left" : "chevron-right"}
          size={16}
          color={t.colors["text-secondary-color"]}
        />
      </Pressable>
    );
  };

  const renderDay = (date: Date) => {
    const key = dayKey(date);
    const off = disabled || isDisabled(date);
    const isToday = key === todayKey;
    const start = rangeKeys?.[0] === key;
    const end = rangeKeys?.[1] === key && pendingStart === null;
    const middle = !!rangeKeys && key > rangeKeys[0] && key < rangeKeys[1];
    const filled = rangeKeys ? start || end : selected.includes(key);
    const isSelected = filled || middle;
    const singleDayRange = rangeKeys?.[0] === rangeKeys?.[1];
    const suffixes = [
      isToday ? translate("monthCalendar.today") : undefined,
      start ? translate("calendar.rangeStart") : undefined,
      end ? translate("calendar.rangeEnd") : undefined,
    ].filter(Boolean);
    const label = [fullDate(date), ...suffixes].join(", ");
    const textColor = off
      ? t.colors["text-disabled-color"]
      : filled
        ? t.colors["text-inverse-color"]
        : middle
          ? t.colors["primary-color-text"]
          : isToday
            ? primary
            : t.colors["text-color"];
    const band = t.colors["primary-color-subtle"];

    return (
      <Pressable
        key={key}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ selected: isSelected, disabled: off }}
        aria-selected={isSelected}
        disabled={off}
        onPress={() => press(date)}
        style={{
          flex: 1,
          height: cellHeight,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: middle ? band : "transparent",
        }}
        {...part("calendar", "day", {
          selected: isSelected,
          today: isToday,
          disabled: off,
          "range-start": start && !!rangeKeys,
          "range-end": end,
          "range-middle": middle,
        })}
      >
        {rangeKeys && !singleDayRange && (start || end) && (
          <View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: start ? "50%" : 0,
              right: end ? "50%" : 0,
              backgroundColor: band,
            }}
          />
        )}
        <View
          style={{
            width: dot,
            height: dot,
            borderRadius: dot / 2,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: filled && !off ? primary : "transparent",
            borderWidth: isToday && !filled ? 1 : 0,
            borderColor: primary,
          }}
        >
          <Text
            allowFontScaling={false}
            style={[
              textStyle(t, size === "small" ? "sm" : "md", sans),
              {
                color: textColor,
                fontWeight: weight(
                  t,
                  filled || isToday ? "semibold" : "regular",
                ),
              },
            ]}
          >
            {date.getDate()}
          </Text>
          {(start || end) && !singleDayRange && size !== "small" && (
            <Text
              allowFontScaling={false}
              style={{
                position: "absolute",
                bottom: -t.space["0-5"],
                fontSize: t.fontSize.xs - 3,
                color: t.colors["text-inverse-color"],
                ...(sans ? { fontFamily: sans } : null),
              }}
            >
              {translate(start ? "calendar.rangeStart" : "calendar.rangeEnd")}
            </Text>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <View
      role="group"
      accessibilityLabel={
        accessibilityLabel ?? translate("monthCalendar.label")
      }
      {...part("calendar", "root", { type, disabled })}
      {...rest}
      style={[{ backgroundColor: t.colors["surface-color"] }, style]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: t.space["2"],
          paddingVertical: t.space["2"],
        }}
      >
        {navButton(-1)}
        <Text
          accessibilityRole="header"
          accessibilityLiveRegion="polite"
          style={[
            textStyle(t, "lg", sans),
            { fontWeight: weight(t, "semibold") },
          ]}
          {...part("calendar", "month-title")}
        >
          {translate("calendar.monthTitle", {
            year: first.getFullYear(),
            month: first.getMonth() + 1,
          })}
        </Text>
        {navButton(1)}
      </View>
      <View
        importantForAccessibility="no-hide-descendants"
        accessibilityElementsHidden
        style={{ flexDirection: "row", paddingVertical: t.space["1"] }}
        {...part("calendar", "weekdays")}
      >
        {Array.from({ length: 7 }, (_, i) => {
          const name = WEEKDAYS[(firstDayOfWeek + i) % 7];
          return (
            <Text
              key={name}
              style={[
                textStyle(t, "xs", sans),
                {
                  flex: 1,
                  textAlign: "center",
                  color: t.colors["text-muted-color"],
                },
              ]}
            >
              {translate(`monthCalendar.weekdays.${name}`)}
            </Text>
          );
        })}
      </View>
      {weeks.map((week, row) => (
        <View
          key={row}
          style={{ flexDirection: "row", marginBottom: t.space["0-5"] }}
          {...part("calendar", "week")}
        >
          {week.map((date, col) =>
            date ? (
              renderDay(date)
            ) : (
              <View
                key={`empty-${col}`}
                style={{ flex: 1, height: cellHeight }}
              />
            ),
          )}
        </View>
      ))}
    </View>
  );
}
