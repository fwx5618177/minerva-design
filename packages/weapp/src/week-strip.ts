// WeekStrip of the native WeChat build: the seven days of a week in a row
// (listbox / option semantics), today marked, count / dot markers and
// previous / next week navigation. Dates are serialized "YYYY-MM-DD".
import { addDays, dayKey, parseDayKey, weekStart } from "@minerva/core";
import { nativeTranslate } from "./configuration";

type Instance = Pick<
  WechatMiniprogram.Component.TrivialInstance,
  "data" | "setData" | "triggerEvent"
>;
type Event = WechatMiniprogram.CustomEvent<{ value: string }>;
/** Marker of a day: a number shows a count badge, true shows a dot */
type WeekStripMarker = number | boolean;
export interface WeekStripConfig {
  getDayLabel?: (day: string, marker: WeekStripMarker | undefined) => string;
}

const WEEKDAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
const configs = new WeakMap<Instance, WeekStripConfig>();
const blocked = (self: Instance) => self.data.disabled || self.data.readOnly;
const flag = (value = false) => ({ type: Boolean, value });
const text = (value = "") => ({ type: String, value });

function format(
  self: Instance,
  date: Date,
  options: Intl.DateTimeFormatOptions,
) {
  try {
    return new Intl.DateTimeFormat(
      self.data.locale || self.data.localeLanguage || "en",
      options,
    ).format(date);
  } catch {
    // Older engines retain ISO labels.
    return dayKey(date);
  }
}

function sync(self: Instance) {
  if (!self.data.initialized) {
    const initial: string = self.data.value ?? self.data.defaultValue;
    self.setData({
      initialized: true,
      localValue: self.data.defaultValue,
      localWeek: self.data.defaultWeek || initial,
      lastSelected: initial,
    });
  }
  const selected: string = self.data.value ?? self.data.localValue;
  // An uncontrolled week follows a selection set from outside.
  if (
    selected !== self.data.lastSelected &&
    !self.data.week &&
    parseDayKey(selected)
  )
    self.setData({ localWeek: selected });
  const firstDay = ((Math.trunc(self.data.firstDayOfWeek) % 7) + 7) % 7;
  const todayKey = parseDayKey(self.data.today)
    ? self.data.today
    : dayKey(new Date());
  const start = weekStart(
    parseDayKey(self.data.week) ??
      parseDayKey(self.data.localWeek) ??
      parseDayKey(todayKey) ??
      new Date(),
    firstDay,
  );
  const markers = (self.data.markers ?? {}) as Record<string, WeekStripMarker>;
  const labels = self.data.weekdayLabels as string[];
  const config = configs.get(self);
  const days = Array.from({ length: 7 }, (_, offset) => {
    const date = addDays(start, offset),
      key = dayKey(date),
      marker = markers[key],
      count =
        typeof marker === "number" && Number.isFinite(marker) && marker > 0
          ? Math.floor(marker)
          : 0,
      index = (date.getDay() + 6) % 7,
      long = format(self, date, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    return {
      date: key,
      label: date.getDate(),
      weekday:
        labels.length === 7
          ? labels[index]
          : nativeTranslate(self, `monthCalendar.weekdays.${WEEKDAYS[index]}`),
      selected: key === selected,
      today: key === todayKey,
      count,
      countLabel: count ? (count > 99 ? "99+" : String(count)) : "",
      dot: !count && marker === true,
      ariaLabel:
        config?.getDayLabel?.(key, marker) ??
        (count
          ? nativeTranslate(self, "weekStrip.dayWithMarkers", {
              date: long,
              count,
            })
          : marker === true
            ? nativeTranslate(self, "weekStrip.dayMarked", { date: long })
            : long),
    };
  });
  const end = addDays(start, 6);
  const month = (date: Date) =>
    format(self, date, { year: "numeric", month: "long" });
  self.setData({
    lastSelected: selected,
    start: dayKey(start),
    selected,
    days,
    heading:
      start.getMonth() === end.getMonth()
        ? month(start)
        : `${month(start)} – ${month(end)}`,
    labels: {
      list: nativeTranslate(self, "weekStrip.label"),
      previous: nativeTranslate(self, "weekStrip.previousWeek"),
      next: nativeTranslate(self, "weekStrip.nextWeek"),
    },
  });
}

export const weekStripTemplate = `<view class="mn-week-strip mn-size-{{size}}"><view wx:if="{{showNavigation}}" class="mn-week-strip__toolbar"><button class="mn-close" disabled="{{disabled || readOnly}}" data-delta="-7" aria-label="{{previousWeekLabel || labels.previous}}" bindtap="onShift">‹</button><text class="mn-week-strip__title" aria-live="polite">{{heading}}</text><button class="mn-close" disabled="{{disabled || readOnly}}" data-delta="7" aria-label="{{nextWeekLabel || labels.next}}" bindtap="onShift">›</button></view><view class="mn-week-strip__days" role="listbox" aria-label="{{ariaLabel || labels.list}}" aria-disabled="{{disabled || readOnly}}"><view wx:for="{{days}}" wx:key="date" class="mn-week-strip__day {{item.selected ? 'mn-selected' : ''}} {{item.today ? 'mn-today' : ''}} {{disabled || readOnly ? 'mn-disabled' : ''}}" role="option" aria-selected="{{item.selected}}" aria-disabled="{{disabled || readOnly}}" aria-label="{{item.ariaLabel}}" data-date="{{item.date}}" data-index="{{index}}" bindtap="onChoose"><text class="mn-week-strip__weekday" aria-hidden="true">{{item.weekday}}</text><text class="mn-week-strip__number" aria-hidden="true">{{item.label}}</text><text class="mn-week-strip__marker {{item.count ? 'mn-has-count' : ''}} {{item.dot ? 'mn-has-dot' : ''}}" aria-hidden="true">{{item.countLabel}}</text></view></view></view>`;

export const weekStripProperties = {
  disabled: flag(),
  readOnly: flag(),
  value: { type: null, value: null },
  defaultValue: text(),
  week: text(),
  defaultWeek: text(),
  firstDayOfWeek: { type: Number, value: 1 },
  today: text(),
  markers: { type: Object, value: {} },
  showNavigation: flag(),
  previousWeekLabel: text(),
  nextWeekLabel: text(),
  weekdayLabels: { type: Array, value: [] },
  locale: text(),
  size: text("medium"),
  ariaLabel: text(),
};

export const weekStripMethods = {
  configure(this: Instance, config: WeekStripConfig) {
    configs.set(this, config);
    sync(this);
  },
  onShift(this: Instance, event: Event) {
    if (blocked(this)) return;
    const next = dayKey(
      addDays(
        parseDayKey(this.data.start) ?? new Date(),
        Number(event.currentTarget.dataset.delta),
      ),
    );
    if (!this.data.week) this.setData({ localWeek: next });
    this.triggerEvent("weekchange", { week: next });
    sync(this);
  },
  onChoose(this: Instance, event: Event) {
    const day = this.data.days[Number(event.currentTarget.dataset.index)];
    if (!day || blocked(this) || day.date === this.data.selected) return;
    if (this.data.value === null) this.setData({ localValue: day.date });
    this.triggerEvent("change", { value: day.date });
    sync(this);
  },
};

export const weekStripExtra = {
  data: {
    initialized: false,
    localValue: "",
    localWeek: "",
    lastSelected: "",
    start: "",
    selected: "",
    heading: "",
    days: [],
    labels: {},
  },
  observers: {
    "value,defaultValue,week,defaultWeek,firstDayOfWeek,today,markers,weekdayLabels,locale,localeLanguage":
      function (this: Instance) {
        sync(this);
      },
  },
  lifetimes: {
    attached(this: Instance) {
      sync(this);
    },
  },
};
