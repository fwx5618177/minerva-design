import { useEffect, useMemo, useRef } from "react";
import {
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import { addDays, dayKey, parseDayKey, weekStart } from "@minerva/core";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { Icon } from "../../internal/Icon";
import { part } from "../../internal/parts";
import { hitSlopFor, textStyle, weight } from "../../internal/styles";
import { useControllable } from "../../internal/useControllable";

/**
 * Marker of a WeekStrip day: a number shows a count badge (0 shows
 * nothing), true shows a dot
 */
export type WeekStripMarker = number | boolean;

/** Density of a WeekStrip */
export type WeekStripSize = "small" | "medium" | "large";

export interface WeekStripProps extends Omit<ViewProps, "style" | "children"> {
  /** Selected day, "YYYY-MM-DD" (controlled; pair with onChange) */
  value?: string;
  /** Initially selected day, "YYYY-MM-DD" (uncontrolled) */
  defaultValue?: string;
  /** Called with the selected day ("YYYY-MM-DD") */
  onChange?: (day: string) => void;
  /** Displayed week (controlled; any day of the week; pair with onWeekChange) */
  week?: Date;
  /**
   * Initially displayed week (uncontrolled; any day of the week). While the
   * week is uncontrolled it follows the selected day.
   * @default the week of the selected day, else of today
   */
  defaultWeek?: Date;
  /** Called with the first day of the requested week, at local midnight */
  onWeekChange?: (weekStart: Date) => void;
  /**
   * First day of the week: 0 = Sunday, 1 = Monday ... 6 = Saturday
   * @default 1
   */
  firstDayOfWeek?: number;
  /**
   * The day marked as today, "YYYY-MM-DD"
   * @default the current local day
   */
  today?: string;
  /**
   * Per-day markers keyed by "YYYY-MM-DD": a number shows a count badge
   * (99+ above 99), true shows a dot
   */
  markers?: Readonly<Record<string, WeekStripMarker>>;
  /** Accessible label of a day; receives the day ("YYYY-MM-DD") and its marker */
  getDayLabel?: (day: string, marker: WeekStripMarker | undefined) => string;
  /**
   * Shows previous / next week buttons around the month of the week
   * @default false
   */
  showNavigation?: boolean;
  /** Label of the previous-week button @default the "weekStrip.previousWeek" message */
  previousWeekLabel?: string;
  /** Label of the next-week button @default the "weekStrip.nextWeek" message */
  nextWeekLabel?: string;
  /** Weekday names, Monday first (7 labels), whatever firstDayOfWeek is */
  weekdayLabels?: readonly string[];
  /** Locale of the accessible dates and of the month title */
  locale?: string;
  /**
   * Blocks selection and navigation
   * @default false
   */
  disabled?: boolean;
  /**
   * Cell density
   * @default "medium"
   */
  size?: WeekStripSize;
  /** Style of the strip */
  style?: StyleProp<ViewStyle>;
}

const WEEKDAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
const CELL_HEIGHT = { small: 48, medium: 60, large: 72 } as const;

const markerCount = (marker: WeekStripMarker | undefined) =>
  typeof marker === "number" && Number.isFinite(marker) && marker > 0
    ? Math.floor(marker)
    : 0;

/**
 * The seven days of a week in a row: tap a day to select it; today is
 * ringed; days can show a count badge or a dot (`markers`);
 * `showNavigation` adds previous / next week buttons and the month title.
 * Days are buttons with a selected / disabled accessibility state.
 */
export function WeekStrip({
  value,
  defaultValue,
  onChange,
  week,
  defaultWeek,
  onWeekChange,
  firstDayOfWeek = 1,
  today: todayProp,
  markers,
  getDayLabel,
  showNavigation = false,
  previousWeekLabel,
  nextWeekLabel,
  weekdayLabels,
  locale,
  disabled = false,
  size = "medium",
  style,
  accessibilityLabel,
  ...rest
}: WeekStripProps) {
  const { tokens: t, fonts } = useTheme();
  const { t: translate, language } = useI18n();
  const todayKey =
    todayProp && parseDayKey(todayProp) ? todayProp : dayKey(new Date());
  const [selected, setSelected] = useControllable<string | undefined>(
    value,
    defaultValue,
    (next) => {
      if (next !== undefined) onChange?.(next);
    },
  );
  const [shownWeek, setShownWeek] = useControllable<Date>(
    week,
    weekStart(
      defaultWeek ??
        parseDayKey(value ?? defaultValue ?? "") ??
        parseDayKey(todayKey) ??
        new Date(),
      firstDayOfWeek,
    ),
    onWeekChange,
  );
  const start = weekStart(shownWeek, firstDayOfWeek);
  const startKey = dayKey(start);
  const days = Array.from({ length: 7 }, (_, index) => addDays(start, index));

  const goToWeek = (date: Date) => {
    const next = weekStart(date, firstDayOfWeek);
    if (dayKey(next) !== startKey) setShownWeek(next);
  };

  // An uncontrolled week follows the selected day.
  const lastSelected = useRef(selected);
  useEffect(() => {
    if (lastSelected.current === selected) return;
    lastSelected.current = selected;
    const date = selected ? parseDayKey(selected) : null;
    if (week === undefined && date) goToWeek(date);
  });

  const fullDate = useMemo(() => {
    try {
      const format = new Intl.DateTimeFormat(locale ?? language, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return (date: Date) => format.format(date);
    } catch {
      return (date: Date) => date.toDateString();
    }
  }, [language, locale]);

  const monthTitle = (date: Date) =>
    locale
      ? new Intl.DateTimeFormat(locale, {
          year: "numeric",
          month: "long",
        }).format(date)
      : translate("calendar.monthTitle", {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
        });
  const title =
    start.getMonth() === days[6].getMonth()
      ? monthTitle(start)
      : `${monthTitle(start)} – ${monthTitle(days[6])}`;

  const primary = t.colors["primary-color"];
  const sans = fonts.sans;
  const navSize = 32;
  const cellHeight = CELL_HEIGHT[size];

  const navButton = (direction: -1 | 1) => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        direction < 0
          ? (previousWeekLabel ?? translate("weekStrip.previousWeek"))
          : (nextWeekLabel ?? translate("weekStrip.nextWeek"))
      }
      accessibilityState={{ disabled }}
      disabled={disabled}
      hitSlop={hitSlopFor(t, navSize, navSize)}
      onPress={() => goToWeek(addDays(start, direction * 7))}
      style={({ pressed }) => ({
        width: navSize,
        height: navSize,
        borderRadius: navSize / 2,
        alignItems: "center",
        justifyContent: "center",
        opacity: disabled ? 0.35 : 1,
        backgroundColor: pressed
          ? t.colors["surface-muted-color"]
          : "transparent",
      })}
      {...part("week-strip", direction < 0 ? "prev" : "next")}
    >
      <Icon
        name={direction < 0 ? "chevron-left" : "chevron-right"}
        size={16}
        color={t.colors["text-secondary-color"]}
      />
    </Pressable>
  );

  const renderDay = (date: Date) => {
    const key = dayKey(date);
    const isSelected = selected === key;
    const isToday = key === todayKey;
    const marker = markers?.[key];
    const count = markerCount(marker);
    const weekdayIndex = (date.getDay() + 6) % 7;
    const label = getDayLabel
      ? getDayLabel(key, marker)
      : [
          count
            ? translate("weekStrip.dayWithMarkers", {
                date: fullDate(date),
                count,
              })
            : marker === true
              ? translate("weekStrip.dayMarked", { date: fullDate(date) })
              : fullDate(date),
          isToday ? translate("monthCalendar.today") : undefined,
        ]
          .filter(Boolean)
          .join(", ");
    const textColor = isSelected
      ? t.colors["text-inverse-color"]
      : isToday
        ? t.colors["primary-color-text"]
        : t.colors["text-color"];
    const markerColor = isSelected ? t.colors["text-inverse-color"] : primary;

    return (
      <Pressable
        key={key}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ selected: isSelected, disabled }}
        aria-selected={isSelected}
        disabled={disabled}
        onPress={() => {
          setSelected(key);
          goToWeek(date);
        }}
        style={({ pressed }) => ({
          flex: 1,
          height: cellHeight,
          alignItems: "center",
          justifyContent: "center",
          gap: t.space["0-5"],
          borderRadius: t.radius.md,
          borderWidth: 1,
          borderColor: isSelected || isToday ? primary : "transparent",
          backgroundColor: isSelected
            ? primary
            : pressed
              ? t.colors["surface-muted-color"]
              : "transparent",
          opacity: disabled ? 0.5 : 1,
        })}
        {...part("week-strip", "day", {
          selected: isSelected,
          today: isToday,
          disabled,
        })}
      >
        <Text
          allowFontScaling={false}
          style={[
            textStyle(t, "xs", sans),
            {
              color: isSelected
                ? t.colors["text-inverse-color"]
                : t.colors["text-muted-color"],
            },
          ]}
        >
          {weekdayLabels?.[weekdayIndex] ??
            translate(`monthCalendar.weekdays.${WEEKDAYS[weekdayIndex]}`)}
        </Text>
        <Text
          allowFontScaling={false}
          style={[
            textStyle(
              t,
              size === "large" ? "lg" : size === "small" ? "sm" : "md",
              sans,
            ),
            { color: textColor, fontWeight: weight(t, "semibold") },
          ]}
        >
          {date.getDate()}
        </Text>
        <View
          style={{ height: 16, alignItems: "center", justifyContent: "center" }}
        >
          {count > 0 && size !== "small" ? (
            <View
              style={{
                minWidth: 16,
                height: 16,
                paddingHorizontal: t.space["1"],
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isSelected
                  ? t.colors["text-inverse-color"]
                  : t.colors["primary-color-subtle"],
              }}
              {...part("week-strip", "marker")}
            >
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: t.fontSize.xs,
                  lineHeight: 16,
                  color: isSelected ? primary : t.colors["primary-color-text"],
                  fontWeight: weight(t, "medium"),
                  ...(sans ? { fontFamily: sans } : null),
                }}
              >
                {count > 99 ? "99+" : count}
              </Text>
            </View>
          ) : count > 0 || marker === true ? (
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: markerColor,
              }}
              {...part("week-strip", "marker")}
            />
          ) : null}
        </View>
      </Pressable>
    );
  };

  return (
    <View
      role="group"
      accessibilityLabel={accessibilityLabel ?? translate("weekStrip.label")}
      {...part("week-strip", "root", { disabled, size })}
      {...rest}
      style={style}
    >
      {showNavigation ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: t.space["2"],
          }}
        >
          {navButton(-1)}
          <Text
            accessibilityRole="header"
            accessibilityLiveRegion="polite"
            style={[
              textStyle(t, "md", sans),
              { fontWeight: weight(t, "semibold") },
            ]}
            {...part("week-strip", "title")}
          >
            {title}
          </Text>
          {navButton(1)}
        </View>
      ) : null}
      <View style={{ flexDirection: "row", gap: t.space["1"] }}>
        {days.map(renderDay)}
      </View>
    </View>
  );
}
