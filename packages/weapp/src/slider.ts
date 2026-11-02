// Slider of the native WeChat build: a custom touch slider (not the host
// <slider>, for marks, ranges and theming) with one thumb, or two
// non-crossing thumbs with `range`. Touch the track to move the closest
// thumb, then drag: `change` ({ value }) follows the drag and `changeend`
// ({ value }) fires on release. The track is measured with
// `createSelectorQuery` on touch start (cached afterwards).
import {
  closestSliderThumb,
  getSliderKeyValue,
  getSliderMarks,
  isSliderMarkActive,
  normalizeSliderValue,
  setSliderThumb,
  sliderPercent,
  sliderValueFromRatio,
  sliderValues,
  sliderValuesEqual,
  type SliderMark,
  type SliderScale,
  type SliderValue,
} from "@minerva/core";
import { nativeTranslate } from "./configuration";

type Instance = Pick<
  WechatMiniprogram.Component.TrivialInstance,
  "data" | "setData" | "triggerEvent" | "createSelectorQuery"
>;
type TouchEvent = {
  touches?: { clientX?: number; pageX?: number; x?: number }[];
  changedTouches?: { clientX?: number; pageX?: number; x?: number }[];
};
export interface SliderConfig {
  /** Formats a value for the value label, the tooltip and aria-valuetext */
  formatValue?: (value: number) => string;
  /** aria-valuetext of a thumb (index 0, or 1 for the end thumb) */
  getAriaValueText?: (value: number, index: number) => string;
}
interface Rect {
  left: number;
  width: number;
}

const configs = new WeakMap<Instance, SliderConfig>();
const rects = new WeakMap<Instance, Rect>();
const gestures = new WeakMap<
  Instance,
  { index: number; latest: SliderValue }
>();
const flag = (value = false) => ({ type: Boolean, value });
const text = (value = "") => ({ type: String, value });
const blocked = (self: Instance) =>
  !!(self.data.disabled || self.data.readOnly);

function scaleOf(self: Instance): SliderScale {
  const min = Number(self.data.min) || 0;
  const max = Number.isFinite(Number(self.data.max))
    ? Number(self.data.max)
    : 100;
  const step =
    self.data.step === null || self.data.step === "null"
      ? null
      : Number(self.data.step) || 1;
  const marks = getSliderMarks(
    self.data.marks as SliderMark[] | boolean,
    min,
    max,
    step,
  );
  return { min, max, step, marks, snapToMarks: !!self.data.snapToMarks };
}

function currentOf(self: Instance): SliderValue {
  const raw = (self.data.value ?? self.data.localValue) as
    SliderValue | null | undefined;
  return normalizeSliderValue(
    raw ?? undefined,
    !!self.data.range,
    scaleOf(self),
  );
}

function sync(self: Instance) {
  if (!self.data.initialized)
    self.setData({ initialized: true, localValue: self.data.defaultValue });
  const scale = scaleOf(self);
  const value = currentOf(self);
  const values = sliderValues(value);
  const range = !!self.data.range;
  const config = configs.get(self);
  const format = config?.formatValue ?? String;
  const percent = (v: number) => sliderPercent(v, scale.min, scale.max);
  const label = (index: number) => {
    const own: string = self.data.ariaLabel;
    if (!range) return own;
    const suffix = nativeTranslate(
      self,
      index === 0 ? "slider.minimum" : "slider.maximum",
    );
    return own ? `${own} ${suffix}` : suffix;
  };
  const start = range ? percent(values[0]) : 0;
  const end = percent(values[values.length - 1]);
  const dragging = self.data.dragging as number;
  self.setData({
    current: value,
    thumbs: values.map((v, index) => ({
      value: v,
      text: format(v),
      ariaLabel: label(index),
      ariaValueText: config?.getAriaValueText?.(v, index) ?? format(v),
      min: range && index === 1 ? values[0] : scale.min,
      max: range && index === 0 ? values[1] : scale.max,
      style: `left:${percent(v)}%`,
      dragging: dragging === index,
    })),
    marksView: (scale.marks ?? []).map((mark) => {
      const active = isSliderMarkActive(mark.value, value);
      return {
        value: mark.value,
        label: mark.label ?? "",
        active,
        state: active ? "active" : "inactive",
        labelClass:
          percent(mark.value) <= 0
            ? "mn-start"
            : percent(mark.value) >= 100
              ? "mn-end"
              : "",
        style: `left:${percent(mark.value)}%`,
      };
    }),
    labelled: (scale.marks ?? []).some((mark) => mark.label),
    rangeStyle: `left:${start}%;width:${end - start}%`,
    valueText: values.map((v) => format(v)).join(" – "),
    variant: range ? "range" : "single",
  });
}

function request(self: Instance, next: SliderValue, from: SliderValue) {
  if (sliderValuesEqual(next, from)) return false;
  if (self.data.value === null || self.data.value === undefined)
    self.setData({ localValue: next });
  self.triggerEvent("change", { value: next });
  sync(self);
  return true;
}

const touchX = (event: TouchEvent) => {
  const touch = event.touches?.[0] ?? event.changedTouches?.[0];
  return touch?.clientX ?? touch?.pageX ?? touch?.x;
};

function measure(self: Instance, done: (rect: Rect) => void) {
  const query = self.createSelectorQuery();
  query.select(".mn-slider__control").boundingClientRect((result) => {
    const r = result as { left?: number; width?: number } | null;
    if (r && !Array.isArray(r) && typeof r.width === "number" && r.width > 0)
      done({ left: r.left ?? 0, width: r.width });
  });
  query.exec();
}

const valueAt = (self: Instance, x: number, rect: Rect) =>
  sliderValueFromRatio(
    rect.width ? (x - rect.left) / rect.width : 0,
    scaleOf(self),
  );

export const sliderTemplate = `<view class="mn-slider mn-size-{{size}} mn-color-{{color}} {{labelled ? 'mn-labelled' : ''}} {{disabled ? 'mn-disabled' : ''}} {{readOnly ? 'mn-readonly' : ''}} {{dragging >= 0 ? 'mn-dragging' : ''}}" data-minerva="slider" data-part="root" data-variant="{{variant}}"><view class="mn-slider__control" bindtouchstart="onTouchStart" catchtouchmove="onTouchMove" bindtouchend="onTouchEnd" bindtouchcancel="onTouchEnd"><view class="mn-slider__rail"/><view class="mn-slider__range" style="{{rangeStyle}}"/><view wx:for="{{marksView}}" wx:key="value" class="mn-slider__mark {{item.active ? 'mn-active' : ''}}" aria-hidden="true" data-state="{{item.state}}" style="{{item.style}}"><text wx:if="{{item.label}}" class="mn-slider__mark-label {{item.labelClass}}">{{item.label}}</text></view><view wx:for="{{thumbs}}" wx:key="index" class="mn-slider__thumb {{item.dragging ? 'mn-dragging' : ''}}" role="slider" aria-role="slider" aria-label="{{item.ariaLabel}}" aria-valuemin="{{item.min}}" aria-valuemax="{{item.max}}" aria-valuenow="{{item.value}}" aria-valuetext="{{item.ariaValueText}}" aria-orientation="horizontal" aria-disabled="{{disabled}}" aria-readonly="{{readOnly}}" aria-invalid="{{invalid}}" data-index="{{index}}" style="{{item.style}}"><text wx:if="{{tooltip && item.dragging}}" class="mn-slider__tooltip" aria-hidden="true">{{item.text}}</text></view></view><text wx:if="{{showValue}}" class="mn-slider__value" aria-hidden="true">{{valueText}}</text><block wx:if="{{name}}"><input wx:for="{{thumbs}}" wx:key="index" class="mn-slider__input" name="{{name}}" value="{{item.value}}" disabled="{{disabled}}" hidden/></block></view>`;

export const sliderProperties = {
  disabled: flag(),
  readOnly: flag(),
  invalid: flag(),
  value: { type: null, value: null },
  defaultValue: { type: null, value: null },
  range: flag(),
  min: { type: Number, value: 0 },
  max: { type: Number, value: 100 },
  step: { type: null, value: 1 },
  marks: { type: null, value: false },
  snapToMarks: flag(),
  size: text("medium"),
  color: text("primary"),
  showValue: flag(),
  tooltip: flag(),
  name: text(),
  ariaLabel: text(),
};

export const sliderMethods = {
  configure(this: Instance, config: SliderConfig) {
    configs.set(this, config);
    sync(this);
  },
  onTouchStart(this: Instance, event: TouchEvent) {
    if (blocked(this)) return;
    const x = touchX(event);
    if (x === undefined) return;
    const apply = (rect: Rect) => {
      const from = currentOf(this);
      const pointed = valueAt(this, x, rect);
      const index = closestSliderThumb(from, pointed);
      const next = setSliderThumb(from, index, pointed);
      gestures.set(this, { index, latest: next });
      this.setData({ dragging: index });
      if (!request(this, next, from)) sync(this);
    };
    const cached = rects.get(this);
    if (cached) apply(cached);
    measure(this, (rect) => {
      rects.set(this, rect);
      if (!cached) apply(rect);
    });
  },
  onTouchMove(this: Instance, event: TouchEvent) {
    const gesture = gestures.get(this),
      rect = rects.get(this),
      x = touchX(event);
    if (!gesture || !rect || x === undefined) return;
    const next = setSliderThumb(
      gesture.latest,
      gesture.index,
      valueAt(this, x, rect),
    );
    if (request(this, next, gesture.latest)) gesture.latest = next;
  },
  onTouchEnd(this: Instance) {
    const gesture = gestures.get(this);
    if (!gesture) return;
    gestures.delete(this);
    this.setData({ dragging: -1 });
    sync(this);
    this.triggerEvent("changeend", { value: gesture.latest });
  },
  /** Moves a thumb like a key press (assistive / programmatic stepping) */
  stepThumb(this: Instance, key: string, index = 0) {
    if (blocked(this)) return;
    const from = currentOf(this);
    const next = getSliderKeyValue(
      key,
      sliderValues(from)[index],
      scaleOf(this),
    );
    if (next === null) return;
    const value = setSliderThumb(from, index, next);
    if (request(this, value, from)) this.triggerEvent("changeend", { value });
  },
};

export const sliderExtra = {
  data: {
    initialized: false,
    localValue: null,
    current: 0,
    dragging: -1,
    thumbs: [],
    marksView: [],
    labelled: false,
    rangeStyle: "",
    valueText: "",
    variant: "single",
  },
  observers: {
    "value,defaultValue,range,min,max,step,marks,snapToMarks,ariaLabel,localeLanguage":
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
