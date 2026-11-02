// SegmentedControl of the native WeChat build: a single-choice segmented
// switch (radiogroup / radio semantics) with equal-width segments and a
// thumb sliding under the selected one (`change` with `{ value }`).

type Instance = Pick<
  WechatMiniprogram.Component.TrivialInstance,
  "data" | "setData" | "triggerEvent"
>;
type Event = WechatMiniprogram.CustomEvent<Record<string, never>>;
interface SegmentedControlOptionObject {
  value: string;
  label?: string;
  icon?: string;
  disabled?: boolean;
  "aria-label"?: string;
  ariaLabel?: string;
}
type SegmentedControlOption = string | SegmentedControlOptionObject;

const flag = (value = false) => ({ type: Boolean, value });
const text = (value = "") => ({ type: String, value });
const blocked = (self: Instance) => self.data.disabled || self.data.readOnly;

function sync(self: Instance) {
  if (!self.data.initialized)
    self.setData({ initialized: true, localValue: self.data.defaultValue });
  const selected: string = self.data.value ?? self.data.localValue;
  const options = (
    Array.isArray(self.data.options) ? self.data.options : []
  ) as SegmentedControlOption[];
  const items = options.map((option) =>
    typeof option === "string" ? { value: option } : option,
  );
  const off = blocked(self);
  const selectedIndex = items.findIndex((item) => item.value === selected);
  const isDisabled = (index: number) => off || Boolean(items[index]?.disabled);
  const tabStop =
    selectedIndex >= 0 && !isDisabled(selectedIndex)
      ? selectedIndex
      : items.findIndex((_, index) => !isDisabled(index));
  const segments = items.map((item, index) => ({
    value: String(item.value),
    icon: item.icon ?? "",
    label: item.label ?? (item.icon ? "" : String(item.value)),
    ariaLabel: item["aria-label"] ?? item.ariaLabel ?? "",
    selected: index === selectedIndex,
    disabled: isDisabled(index),
    tabindex: !off && index === tabStop ? 0 : -1,
  }));
  const count = Math.max(items.length, 1);
  self.setData({
    selected,
    segments,
    thumbStyle:
      selectedIndex < 0
        ? "display: none;"
        : `width: calc((100% - 4px) / ${count}); transform: translateX(${selectedIndex * 100}%);`,
  });
}

export const segmentedControlTemplate = `<view class="mn-segmented-control mn-size-{{size}} mn-color-{{color}} {{fullWidth ? 'mn-full-width' : ''}} {{disabled || readOnly ? 'mn-disabled' : ''}}" role="radiogroup" aria-label="{{ariaLabel}}" aria-disabled="{{disabled || readOnly}}"><view class="mn-segmented-control__indicator" aria-hidden="true" style="{{thumbStyle}}"/><view wx:for="{{segments}}" wx:key="value" class="mn-segmented-control__item {{item.selected ? 'mn-selected' : ''}} {{item.disabled ? 'mn-disabled' : ''}}" role="radio" aria-checked="{{item.selected}}" aria-disabled="{{item.disabled}}" aria-label="{{item.ariaLabel}}" data-index="{{index}}" bindtap="onChoose"><text wx:if="{{item.icon}}" class="mn-segmented-control__icon" aria-hidden="true">{{item.icon}}</text><text wx:if="{{item.label}}" class="mn-segmented-control__label">{{item.label}}</text></view></view>`;

export const segmentedControlProperties = {
  options: { type: Array, value: [] },
  value: { type: null, value: null },
  defaultValue: text(),
  size: text("medium"),
  color: text("neutral"),
  fullWidth: flag(),
  disabled: flag(),
  readOnly: flag(),
  ariaLabel: text(),
};

export const segmentedControlMethods = {
  onChoose(this: Instance, event: Event) {
    const segment =
      this.data.segments[Number(event.currentTarget.dataset.index)];
    if (!segment || segment.disabled || segment.selected) return;
    if (this.data.value === null) this.setData({ localValue: segment.value });
    this.triggerEvent("change", { value: segment.value });
    sync(this);
  },
};

export const segmentedControlExtra = {
  data: {
    initialized: false,
    localValue: "",
    selected: "",
    segments: [],
    thumbStyle: "display: none;",
  },
  observers: {
    "options,value,defaultValue,disabled,readOnly": function (this: Instance) {
      sync(this);
    },
  },
  lifetimes: {
    attached(this: Instance) {
      sync(this);
    },
  },
};
