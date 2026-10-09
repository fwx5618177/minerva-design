import { windowInfo } from "./system-info";
import { nativeTranslate } from "./configuration";
import {
  addDays,
  dayKey,
  localDate,
  monthStart,
  getPaginationItems,
  getPaginationVisibleRange,
  getTotalPages,
} from "@minerva/core";

type Instance = Pick<
  WechatMiniprogram.Component.TrivialInstance,
  "data" | "setData" | "triggerEvent"
>;
type Event = WechatMiniprogram.CustomEvent<{ value: string }>;
type Control = { template: string; definition: WechatMiniprogram.IAnyObject };
const flag = (value = false) => ({ type: Boolean, value });
const text = (value = "") => ({ type: String, value });
const number = (value = 0) => ({ type: Number, value });
const list = () => ({ type: Array, value: [] });
const optional = () => ({ type: null, value: null });
const blocked = (self: Instance) => self.data.disabled || self.data.readOnly;
const index = (event: Event) => Number(event.currentTarget.dataset.index);
const apply = (
  control: Control,
  template: string,
  properties: WechatMiniprogram.IAnyObject,
  methods: WechatMiniprogram.IAnyObject,
  extra: WechatMiniprogram.IAnyObject,
) => {
  control.template = template;
  Object.assign(control.definition, extra, {
    properties: { ...control.definition.properties, ...properties },
    methods: { ...control.definition.methods, ...methods },
  });
};
interface CalendarEvent {
  id: string;
  date: string;
  title: string;
}
export interface CalendarConfig {
  disabledDate?: (day: string) => boolean;
  getDayLabel?: (day: string, count: number) => string;
  getEventsLabel?: (day: string) => string;
}
const calendars = new WeakMap<Instance, CalendarConfig>();
const parseMonth = (value: string) => {
  const [year, month] = value.split("-").map(Number);
  return Number.isFinite(year) && month >= 1 && month <= 12
    ? localDate(year, month - 1, 1)
    : monthStart(new Date());
};
function calendarSync(self: Instance) {
  if (!self.data.initialized)
    self.setData({
      initialized: true,
      localMonth: self.data.defaultMonth || dayKey(new Date()).slice(0, 7),
      localValue: self.data.defaultValue,
    });
  const active = (self.data.month || self.data.localMonth).slice(0, 7),
    selected = self.data.value ?? self.data.localValue;
  const first = parseMonth(active),
    weekStart = Math.max(0, Math.min(6, self.data.weekStartsOn));
  const start = addDays(first, -((first.getDay() - weekStart + 7) % 7));
  const events = self.data.events as CalendarEvent[],
    callbacks = calendars.get(self);
  const range =
    self.data.rangeStart && self.data.rangeEnd
      ? [self.data.rangeStart, self.data.rangeEnd].sort()
      : undefined;
  const days = Array.from({ length: 42 }, (_, offset) => {
    const date = addDays(start, offset),
      key = dayKey(date),
      count = events.filter((event) => event.date === key).length;
    return {
      date: key,
      label: date.getDate(),
      selected: key === selected,
      outside: key.slice(0, 7) !== active,
      today: key === dayKey(new Date()),
      count,
      inRange: !!range && key >= range[0] && key <= range[1],
      rangeStart: key === range?.[0],
      rangeEnd: key === range?.[1],
      disabled:
        !!(self.data.min && key < self.data.min) ||
        !!(self.data.max && key > self.data.max) ||
        self.data.disabledDates.includes(key) ||
        !!callbacks?.disabledDate?.(key),
      ariaLabel:
        callbacks?.getDayLabel?.(key, count) ??
        (count
          ? nativeTranslate(self, "monthCalendar.dayWithEvents", {
              date: key,
              count,
            })
          : key),
    };
  });
  let heading = active;
  try {
    heading = new Intl.DateTimeFormat(
      self.data.locale || self.data.localeLanguage || "en",
      {
        year: "numeric",
        month: "long",
      },
    ).format(first);
  } catch {
    /* Older engines retain ISO labels. */
  }
  const weekdays =
    self.data.weekdayLabels.length === 7
      ? self.data.weekdayLabels
      : Array.from({ length: 7 }, (_, i) =>
          nativeTranslate(
            self,
            `monthCalendar.weekdays.${["sun", "mon", "tue", "wed", "thu", "fri", "sat"][(i + weekStart) % 7]}`,
          ),
        );
  self.setData({
    active,
    selected,
    days,
    heading,
    weekdays,
    selectedEvents: events.filter((event) => event.date === selected),
    eventsLabel:
      callbacks?.getEventsLabel?.(selected) ??
      nativeTranslate(self, "monthCalendar.eventsLabel", { date: selected }),
  });
}
function requestMonth(self: Instance, month: string) {
  if (blocked(self) || month === self.data.active) return;
  if (!self.data.month) self.setData({ localMonth: month });
  self.triggerEvent("monthchange", { month });
  calendarSync(self);
}
function calendar(control: Control) {
  apply(
    control,
    `<view class="mn-calendar mn-calendar-{{size}}" role="group" aria-label="{{ariaLabel || localeLabels.calendarLabel}}"><view class="mn-row"><button class="mn-close" disabled="{{disabled || readOnly}}" data-delta="-1" aria-label="{{previousMonthLabel || localeLabels.calendarPrevious}}" bindtap="onShift">‹</button><text>{{heading}}</text><button class="mn-close" disabled="{{disabled || readOnly}}" data-delta="1" aria-label="{{nextMonthLabel || localeLabels.calendarNext}}" bindtap="onShift">›</button><button class="mn-calendar-today" disabled="{{disabled || readOnly}}" bindtap="onToday">{{todayLabel || localeLabels.calendarToday}}</button><slot name="header"/></view><view class="mn-calendar-grid"><text wx:for="{{weekdays}}" wx:key="*this">{{item}}</text><button wx:for="{{days}}" wx:key="date" class="mn-calendar-day {{item.selected ? 'mn-active' : ''}} {{item.inRange ? 'mn-calendar-range' : ''}} {{item.outside ? 'mn-calendar-outside' : ''}} {{item.today ? 'mn-calendar-current' : ''}} {{disabled || readOnly || item.disabled ? 'mn-disabled' : ''}}" aria-label="{{item.ariaLabel}}" aria-selected="{{item.selected}}" disabled="{{disabled || readOnly || item.disabled}}" data-date="{{item.date}}" data-index="{{index}}" bindtap="onChoose"><text>{{item.label}}</text><text wx:if="{{item.count}}" class="mn-calendar-count">{{item.count}}</text></button></view><view wx:if="{{showSelectedDayEvents && selected}}" class="mn-calendar-events" aria-label="{{eventsLabel}}"><button wx:for="{{selectedEvents}}" wx:key="id" class="mn-calendar-event" disabled="{{disabled || readOnly}}" data-index="{{index}}" bindtap="onEvent">{{item.title}}</button><text wx:if="{{!selectedEvents.length}}">{{emptyEventsText || localeLabels.calendarEmpty}}</text><slot name="events"/></view></view>`,
    {
      value: optional(),
      month: text(),
      defaultMonth: text(),
      defaultValue: text(),
      events: list(),
      weekStartsOn: number(1),
      weekdayLabels: list(),
      disabledDates: list(),
      rangeStart: text(),
      rangeEnd: text(),
      size: text("medium"),
      locale: text(),
      showSelectedDayEvents: flag(true),
      ariaLabel: text(),
      previousMonthLabel: text(),
      nextMonthLabel: text(),
      todayLabel: text(),
      emptyEventsText: text(),
    },
    {
      configure(this: Instance, config: CalendarConfig) {
        calendars.set(this, config);
        calendarSync(this);
      },
      onShift(this: Instance, event: Event) {
        requestMonth(
          this,
          dayKey(
            monthStart(
              parseMonth(this.data.active),
              Number(event.currentTarget.dataset.delta),
            ),
          ).slice(0, 7),
        );
      },
      onToday(this: Instance) {
        requestMonth(this, dayKey(new Date()).slice(0, 7));
      },
      onChoose(this: Instance, event: Event) {
        const day = this.data.days[index(event)];
        if (!day || day.disabled || blocked(this)) return;
        if (this.data.value === null) this.setData({ localValue: day.date });
        this.triggerEvent("change", { value: day.date });
        if (day.outside) requestMonth(this, day.date.slice(0, 7));
        calendarSync(this);
      },
      onEvent(this: Instance, event: Event) {
        const selected = this.data.selectedEvents[index(event)];
        if (selected && !blocked(this))
          this.triggerEvent("eventclick", { event: selected });
      },
    },
    {
      data: {
        initialized: false,
        localMonth: "",
        localValue: "",
        active: "",
        selected: "",
        days: [],
        weekdays: [],
        selectedEvents: [],
      },
      observers: {
        "month,value,defaultMonth,defaultValue,events,weekStartsOn,weekdayLabels,disabledDates,rangeStart,rangeEnd,min,max,locale,localeLanguage":
          function (this: Instance) {
            calendarSync(this);
          },
      },
      lifetimes: {
        attached(this: Instance) {
          calendarSync(this);
        },
      },
    },
  );
}
export interface PaginationConfig {
  totalRender?: (total: number, range: [number, number]) => string;
  itemRender?: (page: number, type: string) => string;
}
const paginations = new WeakMap<Instance, PaginationConfig>();
function paginationSync(self: Instance) {
  if (!self.data.initialized)
    self.setData({
      initialized: true,
      localPage: self.data.defaultCurrent,
      localSize: self.data.defaultPageSize,
    });
  const page = Math.max(
      1,
      Math.floor(self.data.current ?? self.data.localPage),
    ),
    pageSize = Math.max(
      1,
      Math.floor(self.data.pageSize ?? self.data.localSize),
    ),
    pages = getTotalPages(self.data.total, pageSize),
    range = getPaginationVisibleRange(page, pageSize, self.data.total);
  const callbacks = paginations.get(self),
    labels = self.data.labels;
  const pageItems = getPaginationItems({
    page,
    totalPages: pages,
    siblingCount: self.data.siblingCount ?? undefined,
    boundaryCount: self.data.boundaryCount ?? undefined,
    hideEdges: self.data.hideEdges,
  })
    .filter(
      (item) =>
        (!self.data.hideNumbers && !self.data.simple) ||
        item.kind === "prev" ||
        item.kind === "next",
    )
    .map((item) => ({
      ...item,
      label:
        callbacks?.itemRender?.(item.page, item.kind) ??
        (item.kind === "page"
          ? String(item.page)
          : item.kind === "prev"
            ? (labels.prev ?? nativeTranslate(self, "pagination.prev"))
            : item.kind === "next"
              ? (labels.next ?? nativeTranslate(self, "pagination.next"))
              : "…"),
      disabled: item.kind === "ellipsis" || item.page < 1 || item.page > pages,
    }));
  const sizeChoices = (self.data.pageSizeOptions as number[]).filter(
    (size) => Number.isFinite(size) && size > 0,
  );
  self.setData({
    page,
    effectivePageSize: pageSize,
    pages,
    range,
    pageItems,
    sizeChoices,
    totalText:
      callbacks?.totalRender?.(self.data.total, range) ??
      `${nativeTranslate(self, "pagination.total", { total: self.data.total })} (${range[0]}–${range[1]})`,
  });
}
function pageRequest(
  self: Instance,
  page: number,
  size = self.data.effectivePageSize,
) {
  if (
    self.data.disabled ||
    !Number.isFinite(page) ||
    !Number.isFinite(size) ||
    size <= 0
  )
    return;
  page = Math.max(
    1,
    Math.min(Math.floor(page), getTotalPages(self.data.total, size)),
  );
  if (page === self.data.page && size === self.data.effectivePageSize) return;
  if (self.data.current === null) self.setData({ localPage: page });
  if (self.data.pageSize === null) self.setData({ localSize: size });
  self.triggerEvent("change", { current: page, pageSize: size });
  paginationSync(self);
}
function pagination(control: Control) {
  apply(
    control,
    `<view class="mn-pagination mn-pagination-{{size}} mn-pagination-{{shape}} mn-pagination-{{variant}} {{responsive ? 'mn-pagination-responsive' : ''}}" role="navigation" aria-label="{{labels.nav || 'Pagination'}}"><view wx:if="{{showTotal}}" class="mn-pagination-total"><slot name="total"/><text>{{totalText}}</text></view><button wx:for="{{pageItems}}" wx:key="key" class="mn-page-item mn-button mn-variant-outline {{item.kind === 'page' && item.page === page ? 'mn-active' : ''}} {{disabled || item.disabled ? 'mn-disabled' : ''}}" disabled="{{disabled || item.disabled}}" data-page="{{item.page}}" data-kind="{{item.kind}}" bindtap="onPage">{{item.label}}</button><text wx:if="{{hideNumbers}}" class="mn-page-counter">{{page}} / {{pages}}</text><input wx:if="{{simple || showQuickJumper}}" class="mn-page-jump mn-input" type="number" value="{{draft}}" placeholder="{{page}} / {{pages}}" disabled="{{disabled}}" aria-label="{{labels.jumpToInput || 'Jump to page'}}" bindinput="onJumpInput" bindconfirm="onJump"/><picker wx:if="{{showSizeChanger}}" class="mn-page-size" mode="selector" range="{{sizeChoices}}" disabled="{{disabled}}" bindchange="onSize"><text>{{effectivePageSize}} / page</text></picker><slot name="range"/><slot/></view>`,
    {
      current: optional(),
      pageSize: optional(),
      defaultCurrent: number(1),
      defaultPageSize: number(10),
      showQuickJumper: flag(),
      showSizeChanger: flag(),
      pageSizeOptions: { type: Array, value: [10, 20, 50, 100] },
      simple: flag(),
      siblingCount: optional(),
      boundaryCount: optional(),
      hideEdges: flag(),
      hideNumbers: flag(),
      responsive: flag(),
      size: text("medium"),
      shape: text("rounded"),
      variant: text("solid"),
      labels: { type: Object, value: {} },
    },
    {
      configure(this: Instance, config: PaginationConfig) {
        paginations.set(this, config);
        paginationSync(this);
      },
      onPage(this: Instance, event: Event) {
        pageRequest(
          this,
          event.currentTarget.dataset.page === undefined
            ? this.data.page + Number(event.currentTarget.dataset.delta)
            : Number(event.currentTarget.dataset.page),
        );
      },
      onJumpInput(this: Instance, event: Event) {
        if (!this.data.disabled) this.setData({ draft: event.detail.value });
      },
      onJump(this: Instance, event: Event) {
        pageRequest(this, Number(event.detail.value || this.data.draft));
        this.setData({ draft: "" });
      },
      onSize(this: Instance, event: Event) {
        pageRequest(this, 1, this.data.sizeChoices[Number(event.detail.value)]);
      },
    },
    {
      data: {
        initialized: false,
        localPage: 1,
        localSize: 10,
        page: 1,
        effectivePageSize: 10,
        pages: 1,
        range: [0, 0],
        draft: "",
        pageItems: [],
        sizeChoices: [],
      },
      observers: {
        "current,pageSize,total,defaultCurrent,defaultPageSize,siblingCount,boundaryCount,hideEdges,hideNumbers,simple,labels,pageSizeOptions,localeLanguage":
          function (this: Instance) {
            paginationSync(this);
          },
      },
      lifetimes: {
        attached(this: Instance) {
          paginationSync(this);
        },
      },
    },
  );
}

interface MenuEntry {
  key?: string;
  value?: string;
  label?: string;
  type?: "checkbox" | "radio-group" | "separator" | "group";
  children?: MenuEntry[];
  items?: MenuEntry[];
  checked?: boolean;
  defaultChecked?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  closeOnSelect?: boolean;
  icon?: string;
  shortcut?: string;
  danger?: boolean;
}
interface MenuRow {
  key: string;
  label?: string;
  type: string;
  depth: number;
  checked?: boolean;
  expanded?: boolean;
  disabled?: boolean;
  entry: MenuEntry;
  group?: MenuEntry;
  icon?: string;
  shortcut?: string;
  danger?: boolean;
}
export interface MenuConfig {
  onSelect?: (item: MenuEntry) => void;
  onCheckedChange?: (key: string, checked: boolean) => void;
  onValueChange?: (group: string, value: string) => void;
}
const menus = new WeakMap<Instance, MenuConfig>();
function menuSync(self: Instance) {
  const rows: MenuRow[] = [];
  const localChecks = self.data.localChecks as Record<string, boolean>,
    localRadios = self.data.localRadios as Record<string, string>;
  const visit = (items: MenuEntry[], depth: number) =>
    items.forEach((entry, i) => {
      const key = entry.key ?? entry.value ?? `${depth}:${i}`,
        type = entry.type ?? "action";
      if (type === "group") {
        rows.push({ key, label: entry.label, type: "group", depth, entry });
        visit(entry.items ?? [], depth);
        return;
      }
      if (type === "radio-group") {
        if (entry.label)
          rows.push({ key, label: entry.label, type: "group", depth, entry });
        for (const option of entry.items ?? [])
          rows.push({
            key: `${key}:${option.value}`,
            label: option.label,
            type: "radio",
            depth,
            entry: option,
            group: entry,
            checked:
              option.value ===
              (entry.value ?? localRadios[key] ?? entry.defaultValue),
            disabled: entry.disabled || option.disabled,
            shortcut: option.shortcut,
          });
        return;
      }
      const expanded = self.data.expandedMenuKeys.includes(key);
      rows.push({
        key,
        label: entry.label,
        type,
        depth,
        entry,
        expanded,
        disabled: entry.disabled,
        checked:
          entry.checked ?? localChecks[key] ?? entry.defaultChecked ?? false,
        icon: entry.icon,
        shortcut: entry.shortcut,
        danger: entry.danger,
      });
      if (expanded && entry.children) visit(entry.children, depth + 1);
    });
  visit(self.data.items, 0);
  self.setData({
    menuRows: rows,
    effectiveOpen: self.data.open ?? self.data.localOpen,
  });
}
function menuOpen(self: Instance, open: boolean) {
  if (self.data.open === null) self.setData({ localOpen: open });
  self.triggerEvent("openchange", { open });
  menuSync(self);
}
function menu(control: Control) {
  apply(
    control,
    `<view class="mn-menu mn-menu-{{size}}"><view wx:if="{{triggered}}" class="mn-menu-trigger" bindtap="onToggle"><slot name="trigger"/></view><view wx:if="{{!triggered || effectiveOpen}}" class="mn-menu-panel" role="menu"><block wx:for="{{menuRows}}" wx:key="key"><view wx:if="{{item.type === 'separator'}}" class="mn-menu-separator" role="separator"/><text wx:elif="{{item.type === 'group'}}" class="mn-menu-group">{{item.label}}</text><button wx:else class="mn-option mn-menu-item {{item.checked ? 'mn-active' : ''}} {{item.danger ? 'mn-error' : ''}} {{disabled || item.disabled ? 'mn-disabled' : ''}}" role="{{item.type === 'checkbox' ? 'menuitemcheckbox' : item.type === 'radio' ? 'menuitemradio' : 'menuitem'}}" aria-checked="{{item.checked}}" style="padding-left:{{12+item.depth*16}}px" disabled="{{disabled || item.disabled}}" data-index="{{index}}" data-key="{{item.key}}" bindtap="onChoose"><text wx:if="{{item.type === 'checkbox' || item.type === 'radio'}}">{{item.checked ? '✓' : '○'}} </text><text wx:if="{{item.icon}}">{{item.icon}} </text>{{item.label}}<text wx:if="{{item.entry.children.length}}"> {{item.expanded ? '−' : '›'}}</text><text class="mn-menu-shortcut">{{item.shortcut}}</text></button></block><slot/></view></view>`,
    {
      open: optional(),
      defaultOpen: flag(),
      triggered: flag(),
      closeOnSelect: flag(true),
      size: text("medium"),
    },
    {
      configure(this: Instance, config: MenuConfig) {
        menus.set(this, config);
      },
      onToggle(this: Instance) {
        if (!blocked(this)) menuOpen(this, !this.data.effectiveOpen);
      },
      onChoose(this: Instance, event: Event) {
        const row = this.data.menuRows[index(event)] as MenuRow;
        if (!row || row.disabled || blocked(this)) return;
        const entry = row.entry,
          config = menus.get(this);
        if (entry.children?.length) {
          const expanded = this.data.expandedMenuKeys.includes(row.key)
            ? this.data.expandedMenuKeys.filter(
                (key: string) => key !== row.key,
              )
            : [...this.data.expandedMenuKeys, row.key];
          this.setData({ expandedMenuKeys: expanded });
          menuSync(this);
          return;
        }
        if (row.type === "checkbox") {
          const checked = !row.checked;
          if (entry.checked === undefined)
            this.setData({
              localChecks: { ...this.data.localChecks, [row.key]: checked },
            });
          config?.onCheckedChange?.(row.key, checked);
          this.triggerEvent("checkedchange", {
            key: row.key,
            checked,
            item: entry,
          });
        } else if (row.type === "radio" && row.group) {
          const key = row.group.key ?? "",
            value = entry.value ?? "";
          if (!row.checked) {
            if (row.group.value === undefined)
              this.setData({
                localRadios: { ...this.data.localRadios, [key]: value },
              });
            config?.onValueChange?.(key, value);
            this.triggerEvent("valuechange", { key, value, item: entry });
          }
        } else {
          const value = entry.value ?? entry.key;
          config?.onSelect?.(entry);
          this.triggerEvent("change", { value });
          this.triggerEvent("select", { value, item: entry });
        }
        if (
          (row.group ?? entry).closeOnSelect ??
          (row.type === "action" && this.data.closeOnSelect)
        )
          menuOpen(this, false);
        menuSync(this);
      },
    },
    {
      data: {
        menuRows: [],
        localChecks: {},
        localRadios: {},
        expandedMenuKeys: [],
        localOpen: false,
        effectiveOpen: false,
      },
      observers: {
        "items,open": function (this: Instance) {
          menuSync(this);
        },
      },
      lifetimes: {
        attached(this: Instance) {
          this.setData({ localOpen: this.data.defaultOpen });
          menuSync(this);
        },
      },
    },
  );
}
export interface TreeItem {
  id?: string;
  value?: string;
  label: string;
  description?: string;
  href?: string;
  icon?: string;
  endContent?: string;
  disabled?: boolean;
  children?: TreeItem[];
}
interface TreeSection {
  id: string;
  title?: string;
  items: TreeItem[];
}
const treeKey = (item: TreeItem) => item.id ?? item.value ?? "";
const treeConfigs = new WeakMap<
  Instance,
  { filter?: (query: string, item: TreeItem) => boolean }
>();
function treeSync(self: Instance) {
  const sections = self.data.sections.length
      ? (self.data.sections as TreeSection[])
      : [{ id: "root", items: self.data.items as TreeItem[] }],
    active = self.data.activeId || self.data.value;
  const ancestors: string[] = [];
  const find = (items: TreeItem[]): boolean => {
    let found = false;
    for (const item of items) {
      if (treeKey(item) === active) found = true;
      if (item.children && find(item.children)) {
        ancestors.push(treeKey(item));
        found = true;
      }
    }
    return found;
  };
  sections.forEach((section) => find(section.items));
  if (!self.data.initialized) {
    self.setData({
      initialized: true,
      localExpanded: [
        ...new Set([
          ...self.data.defaultExpandedIds,
          ...self.data.defaultExpandedKeys,
          ...ancestors,
        ]),
      ],
      lastActive: active,
    });
  } else if (self.data.lastActive !== active) {
    self.setData({
      localExpanded: [...new Set([...self.data.localExpanded, ...ancestors])],
      lastActive: active,
    });
  }
  const expanded =
      self.data.expandedIds ??
      self.data.expandedKeys ??
      self.data.localExpanded,
    query = String(self.data.query).toLowerCase(),
    filter = treeConfigs.get(self)?.filter;
  const matches = (item: TreeItem): boolean =>
    !query ||
    (filter ? filter(query, item) : item.label.toLowerCase().includes(query)) ||
    !!item.children?.some(matches);
  const rows: Record<string, unknown>[] = [];
  const walk = (items: TreeItem[], depth: number, section: TreeSection) => {
    for (const item of items) {
      if (!matches(item)) continue;
      const key = treeKey(item),
        open =
          !self.data.collapsed &&
          (query ? !!item.children?.some(matches) : expanded.includes(key));
      rows.push({
        ...item,
        id: key,
        value: key,
        depth,
        section: section.title,
        original: item,
        sectionFirst: !rows.some((row) => row.sectionId === section.id),
        sectionId: section.id,
        expanded: open,
        active: key === active,
        ancestorActive: ancestors.includes(key),
      });
      if (open && item.children) walk(item.children, depth + 1, section);
    }
  };
  sections.forEach((section) => walk(section.items, 0, section));
  self.setData({ rows, effectiveExpanded: expanded });
}
function navTree(control: Control) {
  apply(
    control,
    `<view class="mn-nav-tree {{collapsed ? 'mn-tree-collapsed' : ''}} {{wrapLabels ? 'mn-tree-wrap' : ''}}" role="navigation"><input wx:if="{{searchable}}" class="mn-input mn-tree-search" value="{{query}}" placeholder="{{searchPlaceholder}}" bindinput="onFilter"/><block wx:for="{{rows}}" wx:key="id"><text wx:if="{{item.sectionFirst && item.section && !collapsed}}" class="mn-tree-section">{{item.section}}</text><view class="mn-tree-row {{item.active ? 'mn-active' : ''}} {{item.ancestorActive ? 'mn-ancestor-active' : ''}}" style="padding-left:{{item.depth*20}}px"><button wx:if="{{item.children.length && !collapsed}}" class="mn-close mn-tree-expand" disabled="{{disabled || item.disabled}}" data-index="{{index}}" bindtap="onExpand">{{item.expanded ? '−' : '+'}}</button><button class="mn-option" disabled="{{disabled || item.disabled}}" data-index="{{index}}" bindtap="onSelect"><text>{{item.icon}}</text><text wx:if="{{!collapsed}}">{{item.label}}</text><text wx:if="{{!collapsed && !item.depth}}" class="mn-muted">{{item.description}}</text><text wx:if="{{!collapsed}}">{{item.endContent}}</text></button></view></block><text wx:if="{{!rows.length}}">{{emptyText}}</text><slot/></view>`,
    {
      sections: list(),
      activeId: text(),
      expandedIds: optional(),
      expandedKeys: optional(),
      defaultExpandedIds: list(),
      defaultExpandedKeys: list(),
      collapsed: flag(),
      wrapLabels: flag(),
      query: text(),
      searchable: flag(),
      searchPlaceholder: text("Search navigation"),
      emptyText: text("No results"),
    },
    {
      configure(
        this: Instance,
        config: { filter?: (query: string, item: TreeItem) => boolean },
      ) {
        treeConfigs.set(this, config);
        treeSync(this);
      },
      onFilter(this: Instance, event: Event) {
        if (blocked(this)) return;
        this.setData({ query: event.detail.value });
        treeSync(this);
        this.triggerEvent("filterchange", { query: event.detail.value });
      },
      onExpand(this: Instance, event: Event) {
        const row = this.data.rows[index(event)];
        if (!row || row.disabled || blocked(this)) return;
        const expanded = this.data.effectiveExpanded as string[],
          next = expanded.includes(row.id)
            ? expanded.filter((key) => key !== row.id)
            : [...expanded, row.id];
        if (this.data.expandedIds === null && this.data.expandedKeys === null)
          this.setData({ localExpanded: next });
        this.triggerEvent("expandchange", {
          expandedKeys: next,
          expandedIds: next,
        });
        treeSync(this);
      },
      onSelect(this: Instance, event: Event) {
        const row = this.data.rows[index(event)];
        if (!row || row.disabled || blocked(this)) return;
        this.triggerEvent("change", { value: row.id });
        this.triggerEvent("select", { value: row.id, item: row.original });
        if (row.children?.length) {
          const expanded = this.data.effectiveExpanded as string[],
            next = expanded.includes(row.id)
              ? expanded.filter((key) => key !== row.id)
              : [...expanded, row.id];
          if (this.data.expandedIds === null && this.data.expandedKeys === null)
            this.setData({ localExpanded: next });
          this.triggerEvent("expandchange", {
            expandedKeys: next,
            expandedIds: next,
          });
          treeSync(this);
        } else if (row.href) wx.navigateTo({ url: row.href });
      },
    },
    {
      data: {
        rows: [],
        localExpanded: [],
        effectiveExpanded: [],
        initialized: false,
        lastActive: "",
      },
      observers: {
        "items,sections,activeId,value,expandedIds,expandedKeys,query,collapsed":
          function (this: Instance) {
            treeSync(this);
          },
      },
      lifetimes: {
        attached(this: Instance) {
          treeSync(this);
        },
      },
    },
  );
}
function steps(control: Control) {
  function sync(self: Instance) {
    if (!self.data.initialized)
      self.setData({ initialized: true, localValue: self.data.defaultValue });
    const selected =
      self.data.value ??
      self.data.localValue ??
      self.data.items[self.data.current]?.value;
    const position = self.data.items.findIndex(
      (item: { value?: string }, i: number) =>
        (item.value ?? String(i)) === selected,
    );
    self.setData({
      selectedStep: selected,
      stepRows: self.data.items.map(
        (item: Record<string, unknown>, i: number) => ({
          ...item,
          value: item.value ?? String(i),
          label: item.label ?? item.title,
          current: position >= 0 ? i === position : i === self.data.current,
          complete: position >= 0 ? i < position : i < self.data.current,
          status:
            item.status ??
            ((position >= 0 ? i < position : i < self.data.current)
              ? "complete"
              : "upcoming"),
        }),
      ),
    });
  }
  apply(
    control,
    `<view class="mn-steps mn-{{direction}}" role="list"><view wx:for="{{stepRows}}" wx:key="value" class="mn-step {{item.current ? 'mn-active' : ''}} {{item.complete ? 'mn-complete' : ''}} mn-step-{{item.status}} {{item.disabled || disabled ? 'mn-disabled' : ''}}" aria-current="{{item.current ? 'step' : ''}}" data-index="{{index}}" bindtap="onStep"><text class="mn-step-indicator">{{item.icon || (item.status === 'error' ? '!' : item.complete ? '✓' : index+1)}}</text><view><text>{{item.label}}</text><text class="mn-muted">{{item.description}}</text></view></view><slot/></view>`,
    { value: optional(), defaultValue: optional(), readOnly: flag(true) },
    {
      onStep(this: Instance, event: Event) {
        const i = index(event),
          item = this.data.stepRows[i];
        if (!item || item.disabled || blocked(this)) return;
        if (this.data.value === null) this.setData({ localValue: item.value });
        this.triggerEvent("change", { value: item.value, current: i });
        sync(this);
      },
    },
    {
      data: {
        stepRows: [],
        selectedStep: null,
        localValue: null,
        initialized: false,
      },
      observers: {
        "items,value,defaultValue,current": function (this: Instance) {
          sync(this);
        },
      },
      lifetimes: {
        attached(this: Instance) {
          sync(this);
        },
      },
    },
  );
}
export function enhanceNavigation(controls: {
  monthCalendar: Control;
  pagination: Control;
  menu: Control;
  contextMenu?: Control;
  navTree: Control;
  steps: Control;
}) {
  calendar(controls.monthCalendar);
  pagination(controls.pagination);
  menu(controls.menu);
  if (controls.contextMenu) {
    const control = controls.contextMenu;
    menu(control);
    control.definition.properties = {
      ...control.definition.properties,
      triggered: flag(true),
      modal: flag(true),
      dir: text("ltr"),
      ariaLabel: text("Context menu"),
    };
    control.template = control.template
      .replace(
        'class="mn-menu-trigger" bindtap="onToggle"><slot name="trigger"/>',
        'class="mn-context-area" bindlongpress="onContextOpen"><slot/>',
      )
      .replace(
        '<view wx:if="{{!triggered || effectiveOpen}}" class="mn-menu-panel"',
        '<view wx:if="{{effectiveOpen}}" class="mn-context-backdrop" bindtap="onContextClose"/><view wx:if="{{!triggered || effectiveOpen}}" style="{{contextStyle}}" class="mn-menu-panel mn-context-panel"',
      )
      .replace("</block><slot/></view>", "</block></view>");
    Object.assign(control.definition.methods, {
      onContextOpen(
        this: Instance,
        event: WechatMiniprogram.CustomEvent<{ x?: number; y?: number }> & {
          changedTouches?: { clientX: number; clientY: number }[];
        },
      ) {
        if (blocked(this)) return;
        const viewport = windowInfo();
        const x = event.detail.x ?? event.changedTouches?.[0]?.clientX ?? 8,
          y = event.detail.y ?? event.changedTouches?.[0]?.clientY ?? 8;
        this.setData({
          contextStyle: `position:fixed;left:${Math.min(Math.max(8, x), Math.max(8, viewport.windowWidth - 168))}px;top:${Math.max(8, y)}px;max-height:${Math.max(80, viewport.windowHeight - y - 8)}px;overflow:auto;z-index:102;`,
        });
        menuOpen(this, true);
      },
      onContextClose(this: Instance) {
        menuOpen(this, false);
      },
    });
  }
  navTree(controls.navTree);
  steps(controls.steps);
}
