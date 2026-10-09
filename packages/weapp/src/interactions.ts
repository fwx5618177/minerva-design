import { windowInfo } from "./system-info";
import { nativeTranslate } from "./configuration";
import {
  formatTime,
  parseTimeInput,
  parseTimeValue,
  toTimeValue,
  resolveTimeFormat,
  formatHasSeconds,
  startOfToday,
  secondsOfDay,
} from "@minerva/core";
type Instance = WechatMiniprogram.Component.TrivialInstance;
type Control = { template: string; definition: WechatMiniprogram.IAnyObject };
type Event = WechatMiniprogram.CustomEvent<{
  value: string;
  scrollLeft: number;
  scrollWidth: number;
}>;
const flag = (value = false) => ({ type: Boolean, value });
const text = (value = "") => ({ type: String, value });
const optional = (value: unknown = null) => ({ type: null, value });
const number = (value = 0) => ({ type: Number, value });
const blocked = (self: Instance) => self.data.disabled || self.data.readOnly;
function patch(
  c: Control,
  template: string,
  properties: WechatMiniprogram.IAnyObject,
  methods: WechatMiniprogram.IAnyObject,
  extra: WechatMiniprogram.IAnyObject,
) {
  c.template = template;
  c.definition = {
    ...c.definition,
    ...extra,
    properties: { ...c.definition.properties, ...properties },
    methods: { ...c.definition.methods, ...methods },
  };
}
function currentTime(self: Instance) {
  return parseTimeValue(
    self.data.value === false ? self.data.localValue : self.data.value,
  );
}
function timeSync(self: Instance, preserveDraft = false) {
  const d = self.data;
  if (!d.initialized)
    self.setData({ initialized: true, localValue: d.defaultValue });
  const format = resolveTimeFormat(
    d.format || (d.use12Hours ? "hh:mm:ss a" : "HH:mm:ss"),
    d.showSecond,
  );
  const current = currentTime(self);
  const date = current ?? startOfToday();
  const min = parseTimeValue(d.minTime || d.start),
    max = parseTimeValue(d.maxTime || d.end);
  const hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds();
  const unit = (kind: string, count: number, step: number, start = 0) =>
    Array.from(
      { length: Math.ceil(count / Math.max(1, Math.floor(step || 1))) },
      (_, i) => start + i * Math.max(1, Math.floor(step || 1)),
    )
      .filter((v) => v < count + start)
      .map((value) => {
        const h = d.use12Hours ? (value % 12) + (hour >= 12 ? 12 : 0) : value;
        return {
          value,
          label: String(value).padStart(2, "0"),
          disabled:
            kind === "hour"
              ? !!((min && h < min.getHours()) || (max && h > max.getHours()))
              : kind === "minute"
                ? !!(
                    (min &&
                      hour === min.getHours() &&
                      value < min.getMinutes()) ||
                    (max && hour === max.getHours() && value > max.getMinutes())
                  )
                : !!(
                    (min &&
                      hour === min.getHours() &&
                      minute === min.getMinutes() &&
                      value < min.getSeconds()) ||
                    (max &&
                      hour === max.getHours() &&
                      minute === max.getMinutes() &&
                      value > max.getSeconds())
                  ),
        };
      });
  const columns = [
    {
      kind: "hour",
      label: nativeTranslate(self, "timePicker.hours"),
      selected: d.use12Hours ? hour % 12 || 12 : hour,
      items: unit(
        "hour",
        d.use12Hours ? 12 : 24,
        d.hourStep,
        d.use12Hours ? 1 : 0,
      ),
    },
    {
      kind: "minute",
      label: nativeTranslate(self, "timePicker.minutes"),
      selected: minute,
      items: unit("minute", 60, d.minuteStep),
    },
  ];
  if (formatHasSeconds(format))
    columns.push({
      kind: "second",
      label: nativeTranslate(self, "timePicker.seconds"),
      selected: second,
      items: unit("second", 60, d.secondStep),
    });
  if (d.use12Hours)
    columns.push({
      kind: "ampm",
      label: nativeTranslate(self, "timePicker.period"),
      selected: hour >= 12 ? 1 : 0,
      items: [
        { value: 0, label: "AM", disabled: false },
        { value: 1, label: "PM", disabled: false },
      ],
    });
  const displayValue = current ? formatTime(current, format) : "";
  self.setData({
    effectiveFormat: format,
    hasSeconds: formatHasSeconds(format),
    displayValue,
    draft: preserveDraft ? d.draft : displayValue,
    timeColumns: columns,
  });
}
function timeCommit(self: Instance, date: Date | null, preserveDraft = false) {
  if (blocked(self)) return;
  const value = date ? toTimeValue(date, self.data.hasSeconds) : null;
  if (self.data.value === false) self.setData({ localValue: value });
  self.triggerEvent("change", { value });
  timeSync(self, preserveDraft);
}
function timeOpen(self: Instance, open: boolean) {
  if ((open && blocked(self)) || self.data.expanded === open) return;
  self.setData({ expanded: open });
  self.triggerEvent("openchange", { open });
}
function tabsSync(self: Instance) {
  const active = self.data.activeValue || self.data.value;
  const activeIndex = self.data.items.findIndex(
    (item: { value: string }) => item.value === active,
  );
  self.setData({
    active,
    scrollIntoView: activeIndex >= 0 ? `mn-page-tab-${activeIndex}` : "",
    tabRows: self.data.items.map(
      (item: Record<string, unknown>, index: number) => ({
        ...item,
        nativeId: `mn-page-tab-${index}`,
      }),
    ),
  });
}
interface TabMetrics {
  viewportWidth: number;
  contentWidth: number;
  scrollLeft?: number;
}
function tabsMeasure(self: Instance, metrics: TabMetrics) {
  const scrollLeft = Math.max(0, metrics.scrollLeft ?? self.data.scrollLeft);
  self.setData({
    viewportWidth: metrics.viewportWidth,
    contentWidth: metrics.contentWidth,
    scrollLeft,
    canScrollLeft: scrollLeft > 1,
    canScrollRight:
      scrollLeft + metrics.viewportWidth < metrics.contentWidth - 1,
  });
}
function measureTabs(self: Instance) {
  const query = self.createSelectorQuery();
  let viewport: WechatMiniprogram.BoundingClientRectCallbackResult | null =
    null;
  query.select(".mn-page-viewport").boundingClientRect((r) => {
    if (r && !Array.isArray(r)) viewport = r;
  });
  query.select(".mn-page-strip").boundingClientRect((r) => {
    if (r && !Array.isArray(r) && viewport)
      tabsMeasure(self, {
        viewportWidth: viewport.width,
        contentWidth: r.width,
      });
  });
  query.exec();
}
export interface NativePopoverRect {
  left: number;
  top: number;
  width: number;
  height: number;
}
export interface NativePopoverGeometry {
  anchor: NativePopoverRect;
  panel: NativePopoverRect;
  viewport: { width: number; height: number };
}
export interface NativePopoverConfig {
  measure?: () => NativePopoverGeometry | Promise<NativePopoverGeometry>;
  onInteractOutside?: () => boolean | void;
}
const popovers = new WeakMap<object, NativePopoverConfig>();
const resizeListeners = new WeakMap<object, () => void>();
function position(
  self: Instance,
  { anchor: a, panel: p, viewport: v }: NativePopoverGeometry,
) {
  const d = self.data,
    pad = Math.max(0, d.collisionPadding),
    gap = d.sideOffset;
  let side = d.side || d.placement || "bottom";
  const maxWidth = Math.max(0, v.width - 2 * pad),
    width = Math.min(
      maxWidth,
      d.matchAnchorWidth === "exact"
        ? a.width
        : d.matchAnchorWidth === "min"
          ? Math.max(p.width, a.width)
          : p.width,
    );
  const available: Record<string, number> = {
    top: a.top - pad - gap,
    bottom: v.height - a.top - a.height - pad - gap,
    left: a.left - pad - gap,
    right: v.width - a.left - a.width - pad - gap,
  };
  const opposite: Record<string, string> = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left",
  };
  const size = side === "left" || side === "right" ? width : p.height;
  if (available[side] < size && available[opposite[side]] > available[side])
    side = opposite[side];
  const vertical = side === "top" || side === "bottom";
  const maxHeight = Math.max(
    0,
    vertical ? available[side] : v.height - 2 * pad,
  );
  const height = Math.min(p.height, maxHeight);
  const aligned = (start: number, anchorSize: number, panelSize: number) =>
    d.align === "start"
      ? start
      : d.align === "end"
        ? start + anchorSize - panelSize
        : start + (anchorSize - panelSize) / 2;
  let left = vertical
    ? aligned(a.left, a.width, width) + d.alignOffset
    : side === "left"
      ? a.left - width - gap
      : a.left + a.width + gap;
  let top = vertical
    ? side === "top"
      ? a.top - height - gap
      : a.top + a.height + gap
    : aligned(a.top, a.height, height) + d.alignOffset;
  left = Math.min(Math.max(pad, left), Math.max(pad, v.width - width - pad));
  top = Math.min(Math.max(pad, top), Math.max(pad, v.height - height - pad));
  self.setData({
    actualSide: side,
    panelStyle: `position:fixed;left:${left}px;top:${top}px;right:auto;bottom:auto;transform:none;max-width:${maxWidth}px;max-height:${maxHeight}px;${d.matchAnchorWidth ? `width:${width}px;` : ""}`,
    arrowStyle: vertical
      ? `left:${Math.max(4, Math.min(width - 12, a.left + a.width / 2 - left))}px`
      : `top:${Math.max(4, Math.min(height - 12, a.top + a.height / 2 - top))}px`,
  });
  self.triggerEvent("positionchange", {
    side,
    left,
    top,
    availableWidth: maxWidth,
    availableHeight: maxHeight,
  });
}
async function reposition(self: Instance) {
  if (!self.data.visible && !self.data.forceMount) return;
  const config = popovers.get(self);
  if (config?.measure) {
    position(self, await config.measure());
    return;
  }
  if (typeof wx === "undefined") return;
  const info = windowInfo();
  await new Promise<void>((resolve) => {
    const query = self.createSelectorQuery();
    let anchor: NativePopoverRect | null = null,
      panel: NativePopoverRect | null = null;
    query.select(".mn-popover-anchor").boundingClientRect((r) => {
      if (r && !Array.isArray(r)) anchor = r;
    });
    query.select(".mn-popup").boundingClientRect((r) => {
      if (r && !Array.isArray(r)) panel = r;
      if (anchor && panel)
        position(self, {
          anchor,
          panel,
          viewport: { width: info.windowWidth, height: info.windowHeight },
        });
      resolve();
    });
    query.exec();
  });
}
function popoverSync(self: Instance) {
  const visible =
    self.data.open === null ? self.data.localOpen : self.data.open;
  self.setData({ visible });
  if (visible && typeof wx !== "undefined")
    wx.nextTick?.(() => {
      void reposition(self);
    });
}
function requestOpen(self: Instance, open: boolean) {
  if (blocked(self) || self.data.visible === open) return;
  if (self.data.open === null) self.setData({ localOpen: open });
  popoverSync(self);
  self.triggerEvent("openchange", { open });
}
export function enhanceInteractions(c: {
  timePicker: Control;
  pageTabs: Control;
  popover: Control;
}) {
  patch(
    c.timePicker,
    `<view class="mn-time-picker mn-size-{{size}} {{invalid?'mn-invalid':''}}"><text wx:if="{{label}}">{{label}}</text><view class="mn-row"><input class="mn-input mn-time-input" value="{{draft}}" name="{{name}}" disabled="{{disabled || readOnly}}" placeholder="{{placeholder}}" aria-label="{{ariaLabel || label || 'Time'}}" aria-required="{{required}}" aria-invalid="{{invalid}}" bindinput="onInput" bindblur="onBlur" bindconfirm="onBlur"/><button class="mn-button mn-time-trigger" disabled="{{disabled || readOnly}}" aria-expanded="{{expanded}}" bindtap="onToggle">◷</button><button wx:if="{{clearable && displayValue}}" class="mn-close mn-time-clear" disabled="{{disabled || readOnly}}" bindtap="onClear">×</button></view><view wx:if="{{expanded}}" class="mn-time-panel"><view class="mn-time-columns"><scroll-view wx:for="{{timeColumns}}" wx:key="kind" wx:for-item="column" scroll-y class="mn-time-column" aria-label="{{column.label}}"><button wx:for="{{column.items}}" wx:key="value" class="mn-time-unit {{item.value===column.selected?'mn-active':''}}" disabled="{{disabled || readOnly || item.disabled}}" data-kind="{{column.kind}}" data-value="{{item.value}}" bindtap="onUnit">{{item.label}}</button></scroll-view></view><button class="mn-button mn-time-done" bindtap="onDone">✓</button></view></view>`,
    {
      value: optional(false),
      defaultValue: optional(),
      format: text(),
      use12Hours: flag(),
      showSecond: flag(true),
      hourStep: number(1),
      minuteStep: number(1),
      secondStep: number(1),
      minTime: text(),
      maxTime: text(),
      start: text(),
      end: text(),
      clearable: flag(true),
      size: text("medium"),
      name: text("time-picker"),
      label: text(),
      ariaLabel: text(),
      required: flag(),
      invalid: flag(),
    },
    {
      onInput(this: Instance, e: Event) {
        if (blocked(this)) return;
        this.setData({ draft: e.detail.value });
        const date = parseTimeInput(e.detail.value, this.data.effectiveFormat, {
          strict: true,
          base: currentTime(this) ?? undefined,
        });
        if (date) timeCommit(this, date, true);
      },
      onBlur(this: Instance) {
        if (blocked(this)) return;
        const draft = this.data.draft;
        if (!draft.trim()) {
          if (currentTime(this)) timeCommit(this, null);
        } else {
          const date = parseTimeInput(draft, this.data.effectiveFormat, {
            strict: false,
            base: currentTime(this) ?? undefined,
          });
          if (
            date &&
            secondsOfDay(date) !==
              (currentTime(this) ? secondsOfDay(currentTime(this)!) : -1)
          )
            timeCommit(this, date);
        }
        timeSync(this);
      },
      onToggle(this: Instance) {
        timeOpen(this, !this.data.expanded);
      },
      onDone(this: Instance) {
        timeOpen(this, false);
      },
      onClear(this: Instance) {
        timeCommit(this, null);
      },
      onUnit(this: Instance, e: Event) {
        if (blocked(this)) return;
        const kind = String(e.currentTarget.dataset.kind),
          value = Number(e.currentTarget.dataset.value);
        const column = this.data.timeColumns.find(
          (col: { kind: string }) => col.kind === kind,
        );
        if (
          !column ||
          column.items.find(
            (unit: { value: number; disabled: boolean }) =>
              unit.value === value,
          )?.disabled
        )
          return;
        const date = currentTime(this) ?? startOfToday();
        if (kind === "hour")
          date.setHours(
            this.data.use12Hours
              ? (value % 12) + (date.getHours() >= 12 ? 12 : 0)
              : value,
          );
        else if (kind === "minute") date.setMinutes(value);
        else if (kind === "second") date.setSeconds(value);
        else date.setHours((date.getHours() % 12) + (value ? 12 : 0));
        timeCommit(this, date);
      },
    },
    {
      data: {
        initialized: false,
        localValue: null,
        displayValue: "",
        draft: "",
        expanded: false,
        timeColumns: [],
        effectiveFormat: "HH:mm:ss",
        hasSeconds: true,
      },
      observers: {
        "value,format,use12Hours,showSecond,hourStep,minuteStep,secondStep,minTime,maxTime,start,end,localeLanguage":
          function (this: Instance) {
            timeSync(this);
          },
        "disabled,readOnly": function (this: Instance) {
          if (blocked(this)) timeOpen(this, false);
        },
      },
      lifetimes: {
        attached(this: Instance) {
          timeSync(this);
        },
      },
    },
  );
  patch(
    c.pageTabs,
    `<view class="mn-page-tabs" role="navigation" aria-label="{{ariaLabel}}"><button wx:if="{{canScrollLeft}}" class="mn-button mn-pages-left" aria-label="{{scrollLeftLabel}}" data-delta="-1" bindtap="onScrollButton">‹</button><scroll-view scroll-x scroll-with-animation class="mn-page-viewport" scroll-left="{{scrollLeft}}" scroll-into-view="{{scrollIntoView}}" bindscroll="onScroll"><view class="mn-page-strip"><view wx:for="{{tabRows}}" wx:key="value" id="{{item.nativeId}}" class="mn-tab {{item.value===active?'mn-active':''}}"><button class="mn-page-label mn-option" aria-current="{{item.value===active?'page':''}}" disabled="{{disabled || item.disabled}}" data-index="{{index}}" bindtap="onChoose"><text wx:if="{{item.icon}}">{{item.icon}}</text>{{item.label}}</button><button wx:if="{{item.closable || item.action}}" class="mn-close" disabled="{{disabled || item.actionDisabled}}" data-index="{{index}}" catchtap="onClose">{{item.action || '×'}}</button></view></view></scroll-view><button wx:if="{{canScrollRight}}" class="mn-button mn-pages-right" aria-label="{{scrollRightLabel}}" data-delta="1" bindtap="onScrollButton">›</button><slot name="actions"/><slot/></view>`,
    {
      activeValue: text(),
      ariaLabel: text("Open pages"),
      scrollLeftLabel: text("Scroll pages left"),
      scrollRightLabel: text("Scroll pages right"),
    },
    {
      measure(this: Instance, metrics: TabMetrics) {
        tabsMeasure(this, metrics);
      },
      reposition(this: Instance) {
        measureTabs(this);
      },
      onChoose(this: Instance, e: Event) {
        const item = this.data.items[Number(e.currentTarget.dataset.index)];
        if (blocked(this) || item?.disabled) return;
        this.triggerEvent("select", { value: item.value });
        this.triggerEvent("change", { value: item.value });
      },
      onClose(this: Instance, e: Event) {
        const item = this.data.items[Number(e.currentTarget.dataset.index)];
        if (this.data.disabled || item?.actionDisabled) return;
        this.triggerEvent("close", { value: item.value });
      },
      onScroll(this: Instance, e: Event) {
        tabsMeasure(this, {
          viewportWidth: this.data.viewportWidth,
          contentWidth: e.detail.scrollWidth || this.data.contentWidth,
          scrollLeft: e.detail.scrollLeft,
        });
        this.setData({ scrollIntoView: "" });
      },
      onScrollButton(this: Instance, e: Event) {
        const next = Math.min(
          Math.max(0, this.data.contentWidth - this.data.viewportWidth),
          Math.max(
            0,
            this.data.scrollLeft +
              Number(e.currentTarget.dataset.delta) *
                this.data.viewportWidth *
                0.8,
          ),
        );
        this.setData({ scrollIntoView: "" });
        tabsMeasure(this, {
          viewportWidth: this.data.viewportWidth,
          contentWidth: this.data.contentWidth,
          scrollLeft: next,
        });
      },
    },
    {
      data: {
        tabRows: [],
        active: "",
        scrollIntoView: "",
        scrollLeft: 0,
        viewportWidth: 0,
        contentWidth: 0,
        canScrollLeft: false,
        canScrollRight: false,
      },
      observers: {
        "items,activeValue,value": function (this: Instance) {
          tabsSync(this);
          if (typeof wx !== "undefined") wx.nextTick?.(() => measureTabs(this));
        },
      },
      lifetimes: {
        attached(this: Instance) {
          tabsSync(this);
        },
        ready(this: Instance) {
          measureTabs(this);
          const fn = () => measureTabs(this);
          resizeListeners.set(this, fn);
          wx.onWindowResize?.(fn);
        },
        detached(this: Instance) {
          const fn = resizeListeners.get(this);
          if (fn) wx.offWindowResize?.(fn);
          resizeListeners.delete(this);
        },
      },
    },
  );
  patch(
    c.popover,
    `<view class="mn-popover"><view class="mn-popover-anchor"><slot name="anchor"/><view class="mn-popover-trigger" aria-expanded="{{visible}}" bindtap="onToggle"><slot name="trigger"/></view></view><view wx:if="{{visible}}" class="mn-popover-backdrop {{modal?'mn-popover-modal':''}}" catchtap="onOutside" catchtouchmove="onBlockScroll"/><view wx:if="{{visible || forceMount}}" hidden="{{!visible}}" class="mn-popup mn-popover-content" role="dialog" aria-modal="{{modal}}" style="{{panelStyle}}"><view wx:if="{{arrow}}" class="mn-popover-arrow mn-arrow-{{actualSide}}" style="{{arrowStyle}}"/><text>{{content}}</text><slot/><button class="mn-close mn-popover-close" bindtap="onClose">×</button></view></view>`,
    {
      open: optional(),
      defaultOpen: flag(),
      side: text("bottom"),
      align: text("center"),
      sideOffset: number(6),
      alignOffset: number(),
      collisionPadding: number(8),
      matchAnchorWidth: optional(false),
      arrow: flag(),
      modal: flag(),
      forceMount: flag(),
    },
    {
      configure(this: Instance, config: NativePopoverConfig) {
        popovers.set(this, config);
        void reposition(this);
      },
      reposition(this: Instance) {
        return reposition(this);
      },
      onToggle(this: Instance) {
        requestOpen(this, !this.data.visible);
      },
      onClose(this: Instance) {
        requestOpen(this, false);
      },
      onOutside(this: Instance) {
        this.triggerEvent("interactoutside", {});
        if (popovers.get(this)?.onInteractOutside?.() !== false)
          requestOpen(this, false);
      },
      onBlockScroll() {
        /* Native backdrop consumes touchmove in modal interactions. */
      },
    },
    {
      data: {
        visible: false,
        localOpen: false,
        panelStyle: "",
        actualSide: "bottom",
        arrowStyle: "",
      },
      observers: {
        "open,side,align,sideOffset,alignOffset,collisionPadding,matchAnchorWidth":
          function (this: Instance) {
            popoverSync(this);
          },
      },
      lifetimes: {
        attached(this: Instance) {
          this.setData({ localOpen: this.data.defaultOpen });
          popoverSync(this);
        },
        ready(this: Instance) {
          void reposition(this);
          const fn = () => {
            void reposition(this);
          };
          resizeListeners.set(this, fn);
          wx.onWindowResize?.(fn);
        },
        detached(this: Instance) {
          popovers.delete(this);
          const fn = resizeListeners.get(this);
          if (fn) wx.offWindowResize?.(fn);
          resizeListeners.delete(this);
        },
      },
    },
  );
}
