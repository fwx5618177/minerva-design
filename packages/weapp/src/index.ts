import { appBaseInfo } from "./system-info";
import { enhanceFormContext } from "./form-context";
import { enhanceFeedback } from "./feedback-context";
import { enhanceBasics } from "./basic-components";
import { enhanceAdvanced } from "./advanced-components";
import { annotateNativeApi } from "./public-api";
export type { NativeConfiguration } from "./configuration";
export type { Messages, TranslateOptions } from "@minerva/core";
export type { NativeTableConfig, NativeTableCell } from "./table";
export type {
  NativePopoverConfig,
  NativePopoverGeometry,
} from "./interactions";
export type {
  CalendarConfig,
  PaginationConfig,
  MenuConfig,
  TreeItem,
} from "./navigation";
import { enhanceInteractions } from "./interactions";
import { enhanceConfiguration } from "./configuration";
export { tableCellContent } from "./table-cell";
import { enhanceTable } from "./table";
import { enhanceLayout } from "./layout";
import { enhanceDisplay } from "./display";
import { enhanceNavigation } from "./navigation";
import {
  globalConfirmStore,
  globalToastStore,
  type ConfirmOptions,
  type ToastOptions,
} from "./feedback-store";
import {
  miniTokenClassNames,
  resolveTokens,
  githubDark,
  clampNumber,
  formatNumberValue,
  inferStepPrecision,
  parseNumberDraft,
  splitBySeparators,
  DEFAULT_TAG_SEPARATORS,
  findCascaderPath,
  flattenCascaderOptions,
} from "@minerva/core";
/** Native WeChat definitions. Build emits Component registrations and WXML/WXSS/JSON. */
interface ControlInstance {
  data: Record<string, unknown>;
  triggerEvent(name: string, detail: Record<string, unknown>): void;
}
const flag = () => ({ type: Boolean, value: false });
const string = (value = "") => ({ type: String, value });
const blocked = (self: ControlInstance) =>
  self.data.disabled || self.data.readOnly;
export const button = {
  template: `<button class="{{disabled || loading ? 'mn-disabled' : ''}} mn-button mn-size-{{size}} mn-variant-{{variant}}" disabled="{{disabled || loading}}" loading="{{loading}}" form-type="{{formType}}" bindtap="onTap"><slot />{{label}}</button>`,
  definition: {
    behaviors: ["wx://form-field-button"],
    properties: {
      label: string(),
      disabled: flag(),
      loading: flag(),
      size: string("medium"),
      variant: string("solid"),
      formType: string(),
    },
    methods: {
      onTap(this: ControlInstance) {
        if (!this.data.disabled && !this.data.loading)
          this.triggerEvent("click", {});
      },
    },
  },
};
export const input = {
  template: `<input class="{{disabled || readOnly ? 'mn-disabled' : ''}} mn-input" value="{{value}}" disabled="{{disabled || readOnly}}" placeholder="{{placeholder}}" name="{{name}}" type="{{type}}" password="{{password}}" maxlength="{{maxlength}}" bindinput="onInput" />`,
  definition: {
    behaviors: ["wx://form-field"],
    properties: {
      value: string(),
      disabled: flag(),
      readOnly: flag(),
      placeholder: string(),
      name: string(),
      type: string("text"),
      password: flag(),
      maxlength: { type: Number, value: 140 },
    },
    methods: {
      onInput(this: ControlInstance, event: { detail: { value: string } }) {
        if (blocked(this)) return this.data.value;
        this.triggerEvent("change", { value: event.detail.value });
        return this.data.value;
      },
    },
  },
};
export const toggle = {
  template: `<switch class="{{disabled || readOnly ? 'mn-disabled' : ''}} mn-switch" checked="{{checked}}" disabled="{{disabled || readOnly}}" name="{{name}}" color="{{color}}" catchchange="onChange" />`,
  definition: {
    behaviors: ["wx://form-field-group"],
    properties: {
      checked: flag(),
      disabled: flag(),
      readOnly: flag(),
      name: string(),
      color: string("#2563eb"),
    },
    methods: {
      onChange(this: ControlInstance, event: { detail: { value: boolean } }) {
        if (!blocked(this))
          this.triggerEvent("change", { checked: event.detail.value });
      },
    },
  },
};

// Native definitions deliberately keep platform events and data serializable.
// Browser editors/iframes are represented by textarea/rich-text capabilities.
type NativeInstance = Pick<
  WechatMiniprogram.Component.TrivialInstance,
  "data" | "setData" | "triggerEvent"
>;
type NativeEvent = WechatMiniprogram.CustomEvent<{
  value: string;
  scrollTop: number;
}>;
const num = (value = 0) => ({ type: Number, value });
const arr = () => ({ type: Array, value: [] });
const common = { disabled: flag(), readOnly: flag() };
const emitValue = (self: NativeInstance, value: unknown) => {
  if (!blocked(self)) self.triggerEvent("change", { value });
};
const itemIndex = (e: NativeEvent) => Number(e.currentTarget.dataset.index);
const nativeControls: {
  template: string;
  definition: WechatMiniprogram.IAnyObject;
}[] = [];
const native = (
  template: string,
  properties: WechatMiniprogram.IAnyObject,
  methods: WechatMiniprogram.IAnyObject = {},
  extra: WechatMiniprogram.IAnyObject = {},
) => {
  const control = {
    template,
    definition: {
      options: { multipleSlots: true },
      properties,
      methods,
      ...extra,
    },
  };
  nativeControls.push(control);
  return control;
};
export const checkbox = native(
  `<view aria-label="{{label}}" aria-invalid="{{error}}" aria-required="{{required}}" class="mn-choice mn-choice-color-{{color}} mn-choice-size-{{size}} mn-choice-shape-{{shape}} mn-choice-label-{{labelPlacement}} {{error ? 'mn-invalid' : ''}} {{disabled ? 'mn-disabled' : ''}}" bindtap="onToggle"><text aria-hidden="true" class="mn-choice-indicator {{checked || indeterminate ? 'mn-active' : ''}}"><block wx:if="{{indeterminate}}">−</block><block wx:elif="{{checked}}">{{icon || '✓'}}</block></text><view class="mn-choice-content"><text>{{label}}</text><slot/></view><text wx:if="{{helperText}}" class="mn-choice-helper"><slot wx:if="{{error}}" name="errorIcon"/>{{helperText}}</text></view>`,
  {
    ...common,
    checked: flag(),
    indeterminate: flag(),
    label: string(),
    value: string(),
    color: string("primary"),
    size: string("medium"),
    shape: string("square"),
    labelPlacement: string("end"),
    helperText: string(),
    icon: string(),
    error: flag(),
    required: flag(),
  },
  {
    onToggle(this: NativeInstance) {
      if (!blocked(this))
        this.triggerEvent("change", { checked: !this.data.checked });
    },
  },
);
export const radio = native(
  `<view class="mn-choice {{disabled ? 'mn-disabled' : ''}}" bindtap="onChoose"><text class="mn-choice-indicator mn-radio {{checked ? 'mn-active' : ''}}">{{checked ? '●' : ''}}</text><text>{{label}}</text><slot/></view>`,
  { ...common, checked: flag(), label: string(), value: string() },
  {
    onChoose(this: NativeInstance) {
      if (!blocked(this) && !this.data.checked)
        this.triggerEvent("change", { value: this.data.value, checked: true });
    },
  },
);
export const textarea = native(
  `<textarea class="{{disabled || readOnly ? 'mn-disabled' : ''}} mn-input mn-textarea" value="{{value}}" disabled="{{disabled || readOnly}}" placeholder="{{placeholder}}" maxlength="{{maxlength}}" auto-height="{{autoHeight}}" bindinput="onInput"/>`,
  {
    ...common,
    value: string(),
    placeholder: string(),
    maxlength: num(-1),
    autoHeight: flag(),
  },
  {
    onInput(this: NativeInstance, e: NativeEvent) {
      emitValue(this, e.detail.value);
      return this.data.value;
    },
  },
);
function numberChange(self: NativeInstance, value: number) {
  if (blocked(self) || !Number.isFinite(value)) return;
  emitValue(
    self,
    Math.max(self.data.min, Math.min(self.data.max, Number(value.toFixed(12)))),
  );
}
export const numberInput = native(
  `<view class="mn-number-input"><button class="{{disabled || readOnly || value <= min ? 'mn-disabled' : ''}} mn-button mn-variant-outline mn-decrement" disabled="{{disabled || readOnly || value <= min}}" bindtap="onDecrease">−</button><input class="{{disabled || readOnly ? 'mn-disabled' : ''}} mn-input" type="digit" value="{{value}}" disabled="{{disabled || readOnly}}" bindinput="onInput"/><button class="mn-button mn-variant-outline mn-increment" disabled="{{disabled || readOnly || value >= max}}" bindtap="onIncrease">+</button></view>`,
  {
    ...common,
    value: num(),
    min: num(-Number.MAX_VALUE),
    max: num(Number.MAX_VALUE),
    step: num(1),
  },
  {
    onDecrease(this: NativeInstance) {
      numberChange(this, this.data.value - this.data.step);
    },
    onIncrease(this: NativeInstance) {
      numberChange(this, this.data.value + this.data.step);
    },
    onInput(this: NativeInstance, e: NativeEvent) {
      numberChange(this, Number(e.detail.value));
      return this.data.value;
    },
  },
);
export const rating = native(
  `<view class="mn-rating"><button wx:for="{{stars}}" wx:key="*this" class="{{disabled || readOnly ? 'mn-disabled' : ''}} mn-star {{item <= value ? 'mn-active' : ''}}" disabled="{{disabled || readOnly}}" data-value="{{item}}" bindtap="onChoose">{{value >= item ? '★' : '☆'}}</button></view>`,
  {
    ...common,
    value: num(),
    max: num(5),
    allowClear: { type: Boolean, value: true },
  },
  {
    onChoose(this: NativeInstance, e: NativeEvent) {
      const n = Number(e.currentTarget.dataset.value);
      emitValue(this, this.data.allowClear && n === this.data.value ? 0 : n);
    },
  },
  {
    data: { stars: [1, 2, 3, 4, 5] },
    observers: {
      max(this: NativeInstance, max: number) {
        this.setData({
          stars: Array.from(
            { length: Math.max(0, Math.min(100, max)) },
            (_, i) => i + 1,
          ),
        });
      },
    },
  },
);
function filterOptions(self: NativeInstance) {
  self.setData({
    filtered: self.data.options
      .map((o: WechatMiniprogram.IAnyObject, index: number) => ({
        ...o,
        index,
      }))
      .filter((o: WechatMiniprogram.IAnyObject) =>
        String(o.label)
          .toLowerCase()
          .includes(String(self.data.query || "").toLowerCase()),
      ),
    selectedLabel:
      self.data.options.find(
        (o: WechatMiniprogram.IAnyObject) => o.value === self.data.value,
      )?.label || "",
  });
}
const selectMethods = {
  onToggle(this: NativeInstance) {
    if (blocked(this)) return;
    this.setData({ expanded: !this.data.expanded });
    this.triggerEvent("openchange", { open: this.data.expanded });
  },
  onQuery(this: NativeInstance, e: NativeEvent) {
    if (blocked(this)) return;
    this.setData({ query: e.detail.value, expanded: true });
    filterOptions(this);
  },
  onChoose(this: NativeInstance, e: NativeEvent) {
    const o = this.data.options[itemIndex(e)];
    if (!o || o.disabled || blocked(this)) return;
    emitValue(this, o.value);
    this.setData({ expanded: false });
    this.triggerEvent("openchange", { open: false });
  },
};
export const select = native(
  `<view class="mn-select"><button class="{{disabled || readOnly ? 'mn-disabled' : ''}} mn-input mn-select-trigger" disabled="{{disabled || readOnly}}" bindtap="onToggle">{{selectedLabel || placeholder}} ▾</button><view wx:if="{{expanded}}" class="mn-popup"><input wx:if="{{searchable}}" class="mn-input" value="{{query}}" placeholder="Search" bindinput="onQuery"/><button wx:for="{{filtered}}" wx:key="value" class="{{item.disabled ? 'mn-disabled' : ''}} mn-option {{value === item.value ? 'mn-active' : ''}}" disabled="{{item.disabled}}" data-index="{{item.index}}" bindtap="onChoose">{{item.label}}</button><text wx:if="{{!filtered.length}}" class="mn-muted">No results</text></view></view>`,
  {
    ...common,
    options: arr(),
    value: string(),
    placeholder: string("Select"),
    searchable: flag(),
  },
  selectMethods,
  {
    data: { expanded: false, query: "", filtered: [], selectedLabel: "" },
    observers: {
      "options,value": function (this: NativeInstance) {
        filterOptions(this);
      },
    },
  },
);
interface NativeCompletionOption {
  value: string | number;
  label: string;
  group?: string;
  disabled?: boolean;
  description?: string;
}
interface NativeCompletionConfig {
  filterOption?: (query: string, option: NativeCompletionOption) => boolean;
  groupBy?: (option: NativeCompletionOption) => string;
  sortOption?: (a: NativeCompletionOption, b: NativeCompletionOption) => number;
}
const completionConfig = new WeakMap<NativeInstance, NativeCompletionConfig>();
function completionOptions(self: NativeInstance) {
  const config = completionConfig.get(self);
  const query = String(self.data.value ?? "");
  const items = (self.data.options as (NativeCompletionOption | string)[])
    .map((option, index) => ({
      option:
        typeof option === "string" ? { value: option, label: option } : option,
      index,
    }))
    .filter(({ option }) =>
      config?.filterOption
        ? config.filterOption(query, option)
        : option.label.toLowerCase().includes(query.toLowerCase()),
    );
  if (config?.sortOption)
    items.sort((a, b) => config.sortOption!(a.option, b.option));
  const groups: { label: string; items: typeof items }[] = [];
  for (const item of items) {
    const label = config?.groupBy?.(item.option) ?? item.option.group ?? "";
    const existing =
      self.data.groupMode === "adjacent"
        ? groups.at(-1)?.label === label
          ? groups.at(-1)
          : undefined
        : groups.find((g) => g.label === label);
    if (existing) existing.items.push(item);
    else groups.push({ label, items: [item] });
  }
  self.setData({
    filtered: groups.flatMap((group) =>
      group.items.map((item, index) => ({
        ...item.option,
        index: item.index,
        heading: index === 0 ? group.label : "",
      })),
    ),
  });
}
export const autoComplete = native(
  `<view class="mn-select"><input class="{{disabled || readOnly ? 'mn-disabled' : ''}} mn-input" value="{{value}}" disabled="{{disabled || readOnly}}" placeholder="{{placeholder}}" bindfocus="onFocus" bindinput="onQuery" bindconfirm="onConfirm"/><view wx:if="{{expanded}}" class="mn-popup"><text wx:if="{{loading}}">Loading</text><block wx:else><block wx:for="{{filtered}}" wx:key="index"><text wx:if="{{item.heading}}" class="mn-label">{{item.heading}}</text><button class="{{item.disabled ? 'mn-disabled' : ''}} mn-option" disabled="{{disabled || readOnly || item.disabled}}" data-index="{{item.index}}" bindtap="onChoose">{{item.label}}<text wx:if="{{item.description}}" class="mn-muted">{{item.description}}</text></button></block></block><text wx:if="{{!loading && !filtered.length}}">{{emptyText}}</text><slot name="empty" wx:if="{{!loading && !filtered.length}}"/></view></view>`,
  {
    ...common,
    options: arr(),
    value: string(),
    placeholder: string(),
    groupMode: string("first"),
    loading: flag(),
    fillOnSelect: { type: Boolean, value: true },
    autoHighlight: { type: Boolean, value: true },
    emptyText: string("No results"),
  },
  {
    configure(this: NativeInstance, config: NativeCompletionConfig) {
      completionConfig.set(this, config);
      completionOptions(this);
    },
    onFocus(this: NativeInstance) {
      if (!blocked(this)) {
        this.setData({ expanded: true });
        completionOptions(this);
        this.triggerEvent("openchange", { open: true });
      }
    },
    onQuery(this: NativeInstance, e: NativeEvent) {
      if (blocked(this)) return this.data.value;
      this.setData({ expanded: true });
      emitValue(this, e.detail.value);
      completionOptions(this);
      return this.data.value;
    },
    onChoose(this: NativeInstance, e: NativeEvent) {
      chooseCompletion(this, itemIndex(e), true);
    },
    onConfirm(this: NativeInstance) {
      if (!this.data.autoHighlight) return;
      const item = this.data.filtered.find(
        (o: NativeCompletionOption) => !o.disabled,
      );
      if (item) chooseCompletion(this, item.index, false);
    },
  },
  {
    data: { expanded: false, filtered: [] },
    observers: {
      "options,value,groupMode": function (this: NativeInstance) {
        completionOptions(this);
      },
    },
  },
);
function chooseCompletion(
  self: NativeInstance,
  index: number,
  clicked: boolean,
) {
  const original = self.data.options[index];
  const option =
    typeof original === "string"
      ? { value: original, label: original }
      : original;
  if (!option || option.disabled || blocked(self) || self.data.loading) return;
  if (self.data.fillOnSelect) emitValue(self, option.label);
  self.triggerEvent("select", { value: option.value, option });
  if (clicked)
    self.triggerEvent("optionclick", { value: option.value, option });
  self.setData({ expanded: false });
  self.triggerEvent("openchange", { open: false });
}
interface NativeCascadeOption {
  value: string | number;
  label: string | number;
  isLeaf?: boolean;
  loading?: boolean;
  disabled?: boolean;
  children?: NativeCascadeOption[];
}
export interface NativeCascadeConfig {
  filter?: (inputValue: string, path: NativeCascadeOption[]) => boolean;
  loadData?: (path: NativeCascadeOption[]) => void | Promise<void>;
  optionRender?: (option: NativeCascadeOption, level: number) => string;
}
const cascadeConfigs = new WeakMap<NativeInstance, NativeCascadeConfig>();
const cascadeLoads = new WeakMap<NativeInstance, Set<string>>();
function cascadeLevels(self: NativeInstance) {
  if (!self.data.initialized)
    self.setData({
      initialized: true,
      localValue: [...self.data.defaultValue],
    });
  const selected = findCascaderPath(
    self.data.options as NativeCascadeOption[],
    self.data.value ?? self.data.localValue,
  );
  const levels: NativeCascadeOption[][] = [self.data.options];
  let opts = self.data.options;
  for (const value of self.data.browsePath) {
    const option = opts.find(
      (item: NativeCascadeOption) => item.value === value,
    );
    if (!option?.children?.length) break;
    opts = option.children;
    levels.push(opts);
  }
  const query = String(self.data.query ?? "");
  const config = cascadeConfigs.get(self);
  const results = query
    ? flattenCascaderOptions(self.data.options as NativeCascadeOption[])
        .filter(
          (entry) =>
            (self.data.changeOnSelect ||
              (!entry.option.children?.length &&
                (!config?.loadData || entry.option.isLeaf))) &&
            (config?.filter
              ? config.filter(query, entry.path)
              : entry.path
                  .map((o) => o.label)
                  .join(" / ")
                  .toLowerCase()
                  .includes(query.toLowerCase())),
        )
        .map((entry) => ({
          values: entry.path.map((o) => o.value),
          label: entry.path.map((o) => o.label).join(" / "),
        }))
    : [];
  self.setData({
    path: selected.map((o) => o.value),
    selectedLabel: selected.map((o) => o.label).join(" / "),
    levels: levels.slice(0, self.data.maxLevel).map((level, depth) =>
      level.map((option) => ({
        ...option,
        displayLabel: config?.optionRender?.(option, depth) ?? option.label,
        loading:
          !!option.loading ||
          !!cascadeLoads
            .get(self)
            ?.has(
              JSON.stringify([
                ...self.data.browsePath.slice(0, depth),
                option.value,
              ]),
            ),
      })),
    ),
    results,
  });
}
function chooseCascade(self: NativeInstance, path: (string | number)[]) {
  const selectedOptions = findCascaderPath(
    self.data.options as NativeCascadeOption[],
    path,
  );
  if (
    blocked(self) ||
    selectedOptions.length !== path.length ||
    selectedOptions.some((o) => o.disabled)
  )
    return;
  if (self.data.value === null) self.setData({ localValue: path });
  self.triggerEvent("change", { value: path, selectedOptions });
  cascadeLevels(self);
}
export const cascader = native(
  `<view class="mn-cascader"><text class="mn-selected-label">{{selectedLabel}}</text><input wx:if="{{showSearch}}" class="mn-input" value="{{query}}" disabled="{{disabled || readOnly}}" placeholder="Search options" bindinput="onQuery"/><view wx:if="{{query}}"><button wx:for="{{results}}" wx:key="index" class="mn-option mn-search-result" disabled="{{disabled || readOnly}}" data-index="{{index}}" bindtap="onSearchChoose">{{item.label}}</button><text wx:if="{{!results.length}}">No results</text></view><block wx:else><view wx:for="{{levels}}" wx:for-item="level" wx:for-index="depth" wx:key="index" class="mn-cascader-level"><button wx:for="{{level}}" wx:key="value" class="{{disabled || readOnly || item.disabled ? 'mn-disabled' : ''}} mn-option {{path[depth] === item.value ? 'mn-active' : ''}}" disabled="{{disabled || readOnly || item.disabled}}" data-depth="{{depth}}" data-index="{{index}}" bindtap="onChoose">{{item.displayLabel}}{{item.loading ? " …" : ""}}{{item.children.length ? ' ›' : ''}}</button></view></block><button wx:if="{{allowClear && path.length}}" class="mn-close" disabled="{{disabled || readOnly}}" bindtap="onClear">Clear</button></view>`,
  {
    ...common,
    options: arr(),
    maxLevel: num(6),
    value: { type: null, value: null },
    defaultValue: arr(),
    changeOnSelect: flag(),
    showSearch: flag(),
    allowClear: { type: Boolean, value: true },
  },
  {
    configure(this: NativeInstance, config: NativeCascadeConfig) {
      cascadeConfigs.set(this, config);
      cascadeLevels(this);
    },
    onChoose(this: NativeInstance, e: NativeEvent) {
      const depth = Number(e.currentTarget.dataset.depth);
      const option = this.data.levels[depth]?.[itemIndex(e)];
      if (!option || blocked(this) || option.disabled || option.loading) return;
      const path = [...this.data.browsePath.slice(0, depth), option.value];
      const config = cascadeConfigs.get(this);
      if (!option.children?.length && !option.isLeaf && config?.loadData) {
        const key = JSON.stringify(path);
        const pending = cascadeLoads.get(this) ?? new Set<string>();
        if (pending.has(key)) return;
        pending.add(key);
        cascadeLoads.set(this, pending);
        this.setData({ browsePath: path });
        const selectedOptions = findCascaderPath(
          this.data.options as NativeCascadeOption[],
          path,
        );
        this.triggerEvent("load", { selectedOptions });
        try {
          Promise.resolve(config.loadData(selectedOptions))
            .catch((error) => {
              this.triggerEvent("loaderror", {
                message: error instanceof Error ? error.message : String(error),
                selectedOptions,
              });
            })
            .finally(() => {
              pending.delete(key);
              cascadeLevels(this);
            });
        } catch (error) {
          pending.delete(key);
          this.triggerEvent("loaderror", {
            message: error instanceof Error ? error.message : String(error),
            selectedOptions,
          });
        }
        cascadeLevels(this);
        return;
      }
      if (option.children?.length) this.setData({ browsePath: path });
      if (!option.children?.length || this.data.changeOnSelect)
        chooseCascade(this, path);
      cascadeLevels(this);
    },
    onQuery(this: NativeInstance, e: NativeEvent) {
      if (blocked(this)) return;
      this.setData({ query: e.detail.value });
      cascadeLevels(this);
    },
    onSearchChoose(this: NativeInstance, e: NativeEvent) {
      const result = this.data.results[itemIndex(e)];
      if (result) chooseCascade(this, result.values);
    },
    onClear(this: NativeInstance) {
      if (blocked(this)) return;
      chooseCascade(this, []);
      this.setData({ query: "" });
      cascadeLevels(this);
    },
  },
  {
    data: {
      path: [],
      initialized: false,
      localValue: [],
      browsePath: [],
      levels: [],
      query: "",
      results: [],
      selectedLabel: "",
    },
    observers: {
      value: function (this: NativeInstance) {
        this.setData({
          browsePath: [...(this.data.value ?? this.data.defaultValue)],
        });
        cascadeLevels(this);
      },
      "options,changeOnSelect,maxLevel": function (this: NativeInstance) {
        cascadeLevels(this);
      },
    },
  },
);
const tagPointerSelection = new WeakSet<NativeInstance>();
function tagSuggestions(self: NativeInstance) {
  const query = String(self.data.draft ?? "").toLowerCase();
  self.setData({
    suggestions: [...new Set(self.data.options as string[])].filter(
      (tag) =>
        !self.data.tags.includes(tag) && tag.toLowerCase().includes(query),
    ),
  });
}
function changeTags(self: NativeInstance, next: string[]) {
  if (blocked(self)) return;
  if (self.data.value === null) self.setData({ tags: next });
  self.triggerEvent("change", { value: next });
  tagSuggestions(self);
}
function commitTags(self: NativeInstance, texts: string[], draft = "") {
  if (blocked(self)) return;
  const next = [...self.data.tags];
  for (const text of texts) {
    const value = text.trim();
    if (value && !next.includes(value) && next.length < self.data.maxTags)
      next.push(value);
  }
  if (next.length !== self.data.tags.length) changeTags(self, next);
  self.setData({ draft });
  tagSuggestions(self);
}
export const tagInput = native(
  `<view class="mn-tag-input"><view wx:for="{{tags}}" wx:key="*this" class="mn-tag">{{item}}<button class="{{disabled || readOnly ? 'mn-disabled' : ''}} mn-close" disabled="{{disabled || readOnly}}" data-index="{{index}}" bindtouchstart="onSuggestionStart" bindtouchcancel="onSuggestionCancel" bindtap="onRemove">×</button></view><input class="{{disabled || readOnly ? 'mn-disabled' : ''}} mn-input" value="{{draft}}" disabled="{{disabled || readOnly}}" placeholder="{{placeholder}}" bindinput="onInput" bindfocus="onFocus" bindblur="onBlur" bindconfirm="onConfirm"/><button class="{{disabled || readOnly ? 'mn-disabled' : ''}} mn-button" disabled="{{disabled || readOnly}}" bindtouchstart="onSuggestionStart" bindtouchcancel="onSuggestionCancel" bindtap="onAdd">{{addLabel}}</button><button wx:if="{{tags.length}}" class="mn-clear mn-button" disabled="{{disabled || readOnly}}" bindtouchstart="onSuggestionStart" bindtouchcancel="onSuggestionCancel" bindtap="onClear">{{clearLabel}}</button><view wx:if="{{expanded && !disabled && !readOnly}}" class="mn-popup"><button wx:for="{{suggestions}}" wx:key="*this" class="mn-option mn-suggestion" data-index="{{index}}" bindtouchstart="onSuggestionStart" bindtouchcancel="onSuggestionCancel" bindtap="onSuggestion">{{item}}</button><text wx:if="{{!suggestions.length}}">{{emptyText}}</text></view></view>`,
  {
    ...common,
    value: { type: null, value: null },
    defaultValue: arr(),
    placeholder: string(),
    maxTags: num(Number.MAX_SAFE_INTEGER),
    options: arr(),
    separators: { type: Array, value: [...DEFAULT_TAG_SEPARATORS] },
    commitOnBlur: { type: Boolean, value: true },
    addLabel: string("Add tag"),
    clearLabel: string("Clear tags"),
    emptyText: string("No matches"),
  },
  {
    onInput(this: NativeInstance, e: NativeEvent) {
      if (blocked(this)) return this.data.draft;
      const text = String(e.detail.value);
      const splitters = (this.data.separators as string[]).filter(
        (s) => s && s !== "Enter",
      );
      if (this.data.separators.includes("Enter"))
        splitters.push("\r\n", "\n", "\r");
      const parts = splitBySeparators(text, splitters);
      if (parts.length > 1) commitTags(this, parts.slice(0, -1), parts.at(-1));
      else this.setData({ draft: text });
      this.setData({ expanded: true });
      tagSuggestions(this);
      return this.data.draft;
    },
    onFocus(this: NativeInstance) {
      if (!blocked(this)) {
        this.setData({ expanded: true });
        tagSuggestions(this);
      }
    },
    onAdd(this: NativeInstance) {
      tagPointerSelection.delete(this);
      commitTags(this, [this.data.draft]);
    },
    onConfirm(this: NativeInstance) {
      if (this.data.separators.includes("Enter"))
        commitTags(this, [this.data.draft]);
    },
    onBlur(this: NativeInstance) {
      if (tagPointerSelection.has(this)) {
        tagPointerSelection.delete(this);
        return;
      }
      if (this.data.commitOnBlur) commitTags(this, [this.data.draft]);
      this.setData({ expanded: false });
    },
    onSuggestionStart(this: NativeInstance) {
      if (!blocked(this)) tagPointerSelection.add(this);
    },
    onSuggestionCancel(this: NativeInstance) {
      tagPointerSelection.delete(this);
    },
    onSuggestion(this: NativeInstance, e: NativeEvent) {
      tagPointerSelection.delete(this);
      const tag = this.data.suggestions[itemIndex(e)];
      if (tag) commitTags(this, [tag]);
      this.setData({ expanded: false });
    },
    onRemove(this: NativeInstance, e: NativeEvent) {
      tagPointerSelection.delete(this);
      changeTags(
        this,
        this.data.tags.filter((_: string, i: number) => i !== itemIndex(e)),
      );
    },
    onClear(this: NativeInstance) {
      tagPointerSelection.delete(this);
      if (blocked(this)) return;
      changeTags(this, []);
      this.setData({ draft: "" });
    },
    paste(this: NativeInstance, text: string, start?: number, end?: number) {
      if (blocked(this)) return;
      const draft = String(this.data.draft);
      const merged =
        draft.slice(0, start ?? draft.length) +
        text +
        draft.slice(end ?? start ?? draft.length);
      const separators = (this.data.separators as string[]).filter(
        (s) => s && s !== "Enter",
      );
      if (this.data.separators.includes("Enter"))
        separators.push("\r\n", "\n", "\r");
      commitTags(this, splitBySeparators(merged, separators));
      this.setData({ expanded: false });
    },
  },
  {
    data: { draft: "", tags: [], suggestions: [], expanded: false },
    observers: {
      "value,defaultValue": function (this: NativeInstance) {
        this.setData({
          tags: [...(this.data.value ?? this.data.defaultValue)],
        });
        tagSuggestions(this);
      },
      options: function (this: NativeInstance) {
        tagSuggestions(this);
      },
    },
  },
);
export const jsonField = native(
  `<view class="mn-json-field"><textarea class="{{disabled || readOnly ? 'mn-disabled' : ''}} mn-input mn-code" value="{{text}}" disabled="{{disabled || readOnly}}" maxlength="-1" bindinput="onInput"/><text wx:if="{{error}}" class="mn-error">{{error}}</text></view>`,
  { ...common, value: { type: null, value: {} } },
  {
    onInput(this: NativeInstance, e: NativeEvent) {
      if (blocked(this)) return;
      this.setData({ text: e.detail.value });
      try {
        const v = JSON.parse(e.detail.value);
        this.setData({ error: "" });
        emitValue(this, v);
      } catch {
        this.setData({ error: "Invalid JSON" });
        this.triggerEvent("error", { message: "Invalid JSON" });
      }
    },
  },
  {
    data: { text: "{}", error: "" },
    observers: {
      value(this: NativeInstance, v: unknown) {
        this.setData({ text: JSON.stringify(v ?? {}, null, 2) });
      },
    },
  },
);
interface NativeKeyValueEntry {
  id: string;
  key: string;
  value: string;
}
let nativeEntrySequence = 0;
function normalizeEntries(self: NativeInstance) {
  const source =
    self.data.entries ?? self.data.value ?? self.data.defaultEntries;
  const previous = self.data.rows ?? [];
  const rows = (
    Array.isArray(source)
      ? source
      : Object.entries(source ?? {}).map(([key, value]) => ({ key, value }))
  ).map((entry: Partial<NativeKeyValueEntry>, index: number) => ({
    id:
      entry.id ??
      previous.find(
        (row: NativeKeyValueEntry) => row.key === String(entry.key ?? ""),
      )?.id ??
      `mn-entry-${++nativeEntrySequence}-${index}`,
    key: String(entry.key ?? ""),
    value: String(entry.value ?? ""),
  }));
  self.setData({ rows });
  entryErrors(self);
}
function entryErrors(self: NativeInstance) {
  self.setData({
    rowErrors: (self.data.rows as NativeKeyValueEntry[]).map(
      (row) => self.data.errors?.[row.id] ?? {},
    ),
  });
}
function changeEntries(self: NativeInstance, entries: NativeKeyValueEntry[]) {
  if (blocked(self)) return;
  if (self.data.entries === null && self.data.value === null) {
    self.setData({ rows: entries });
    entryErrors(self);
  }
  self.triggerEvent("change", { value: entries, entries });
}
export const keyValueEditor = native(
  `<view class="mn-key-value"><view wx:for="{{rows}}" wx:key="id" class="mn-row"><input class="{{disabled || readOnly ? 'mn-disabled' : ''}} mn-input" value="{{item.key}}" disabled="{{disabled || readOnly}}" placeholder="{{keyLabel}}" aria-label="{{keyLabel}} {{index+1}}" data-index="{{index}}" data-field="key" bindinput="onEdit"/><text wx:if="{{rowErrors[index].key}}" class="mn-error">{{rowErrors[index].key}}</text><input class="{{disabled || readOnly ? 'mn-disabled' : ''}} mn-input" value="{{item.value}}" disabled="{{disabled || readOnly}}" placeholder="{{valueLabel}}" aria-label="{{valueLabel}} {{index+1}}" data-index="{{index}}" data-field="value" bindinput="onEdit"/><text wx:if="{{rowErrors[index].value}}" class="mn-error">{{rowErrors[index].value}}</text><button class="{{disabled || readOnly ? 'mn-disabled' : ''}} mn-close" aria-label="{{removeLabel}} {{index+1}}" data-index="{{index}}" disabled="{{disabled || readOnly}}" bindtap="onRemove">×</button></view><button class="{{disabled || readOnly ? 'mn-disabled' : ''}} mn-button" disabled="{{disabled || readOnly}}" bindtap="onAdd">{{addLabel}}</button></view>`,
  {
    ...common,
    value: { type: null, value: null },
    entries: { type: null, value: null },
    defaultEntries: arr(),
    errors: { type: Object, value: {} },
    keyLabel: string("Key"),
    valueLabel: string("Value"),
    addLabel: string("Add entry"),
    removeLabel: string("Remove entry"),
  },
  {
    onEdit(this: NativeInstance, e: NativeEvent) {
      const index = itemIndex(e),
        field = e.currentTarget.dataset.field;
      if (!this.data.rows[index] || !["key", "value"].includes(field)) return;
      changeEntries(
        this,
        this.data.rows.map((row: NativeKeyValueEntry, i: number) =>
          i === index ? { ...row, [field]: e.detail.value } : row,
        ),
      );
      return this.data.rows[index][field];
    },
    onRemove(this: NativeInstance, e: NativeEvent) {
      changeEntries(
        this,
        this.data.rows.filter(
          (_: NativeKeyValueEntry, i: number) => i !== itemIndex(e),
        ),
      );
    },
    onAdd(this: NativeInstance) {
      changeEntries(this, [
        ...this.data.rows,
        { id: `mn-entry-${++nativeEntrySequence}`, key: "", value: "" },
      ]);
    },
  },
  {
    data: { rows: [], rowErrors: [] },
    observers: {
      "value,entries,defaultEntries": function (this: NativeInstance) {
        normalizeEntries(this);
      },
      errors: function (this: NativeInstance) {
        entryErrors(this);
      },
    },
  },
);
export const timePicker = native(
  `<picker mode="time" value="{{value}}" start="{{start}}" end="{{end}}" disabled="{{disabled || readOnly}}" bindchange="onChange"><view class="mn-input">{{value || placeholder}}</view></picker>`,
  {
    ...common,
    value: string(),
    start: string("00:00"),
    end: string("23:59"),
    placeholder: string("Select time"),
  },
  {
    onChange(this: NativeInstance, e: NativeEvent) {
      emitValue(this, e.detail.value);
    },
  },
);
function calendarDays(self: NativeInstance) {
  const month = self.data.active || new Date().toISOString().slice(0, 7);
  const [y, m] = month.split("-").map(Number);
  const count = new Date(y, m, 0).getDate(),
    start = new Date(y, m - 1, 1).getDay();
  const days = [
    ...Array.from({ length: start }, () => ({
      date: "",
      label: "",
      disabled: true,
    })),
    ...Array.from({ length: count }, (_, i) => {
      const date = `${month}-${String(i + 1).padStart(2, "0")}`;
      return {
        date,
        label: i + 1,
        disabled:
          !!(self.data.min && date < self.data.min) ||
          !!(self.data.max && date > self.data.max),
      };
    }),
  ];
  self.setData({ active: month, days });
}
export const monthCalendar = native(
  `<view class="mn-calendar"><view class="mn-row"><button class="mn-close" data-delta="-1" bindtap="onShift">‹</button><text>{{active}}</text><button class="mn-close" data-delta="1" bindtap="onShift">›</button></view><view class="mn-calendar-grid"><text wx:for="{{weekdays}}" wx:key="*this">{{item}}</text><button wx:for="{{days}}" wx:key="index" class="{{disabled || item.disabled ? 'mn-disabled' : ''}} mn-calendar-day {{item.date === value ? 'mn-active' : ''}}" disabled="{{disabled || item.disabled}}" data-index="{{index}}" bindtap="onChoose">{{item.label}}</button></view></view>`,
  { ...common, value: string(), month: string(), min: string(), max: string() },
  {
    onShift(this: NativeInstance, e: NativeEvent) {
      const [y, m] = this.data.active.split("-").map(Number);
      const d = new Date(y, m - 1 + Number(e.currentTarget.dataset.delta), 1);
      this.setData({
        active: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      });
      calendarDays(this);
      this.triggerEvent("monthchange", { month: this.data.active });
    },
    onChoose(this: NativeInstance, e: NativeEvent) {
      const d = this.data.days[itemIndex(e)];
      if (d && !d.disabled && d.date) emitValue(this, d.date);
    },
  },
  {
    data: {
      active: "",
      days: [],
      weekdays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    },
    lifetimes: {
      attached(this: NativeInstance) {
        calendarDays(this);
      },
    },
    observers: {
      "month,min,max": function (this: NativeInstance) {
        if (this.data.month) this.setData({ active: this.data.month });
        calendarDays(this);
      },
    },
  },
);
export const pagination = native(
  `<view class="mn-pagination"><text wx:if="{{showTotal}}">Total {{total}}</text><button class="{{disabled || current <= 1 ? 'mn-disabled' : ''}} mn-button mn-variant-outline" disabled="{{disabled || current <= 1}}" data-delta="-1" bindtap="onPage">Previous</button><text>{{current}} / {{pages}}</text><button class="mn-button mn-variant-outline" disabled="{{disabled || current >= pages}}" data-delta="1" bindtap="onPage">Next</button></view>`,
  {
    disabled: flag(),
    current: num(1),
    total: num(),
    pageSize: num(10),
    showTotal: flag(),
  },
  {
    onPage(this: NativeInstance, e: NativeEvent) {
      const page = this.data.current + Number(e.currentTarget.dataset.delta);
      if (this.data.disabled || page < 1 || page > this.data.pages) return;
      this.triggerEvent("change", {
        current: page,
        pageSize: this.data.pageSize,
      });
    },
  },
  {
    data: { pages: 1 },
    observers: {
      "total,pageSize": function (this: NativeInstance) {
        this.setData({
          pages: Math.max(
            1,
            Math.ceil(this.data.total / Math.max(1, this.data.pageSize)),
          ),
        });
      },
    },
  },
);
const tabProperties = { ...common, items: arr(), value: string() };
const tabMethods = {
  onChoose(this: NativeInstance, e: NativeEvent) {
    const i = this.data.items[itemIndex(e)];
    if (!i || i.disabled || blocked(this)) return;
    emitValue(this, i.value);
  },
  onClose(this: NativeInstance, e: NativeEvent) {
    if (blocked(this)) return;
    this.triggerEvent("close", { value: this.data.items[itemIndex(e)]?.value });
  },
};
export const tabs = native(
  `<view class="mn-tabs"><scroll-view scroll-x class="mn-tabs-list"><view wx:for="{{items}}" wx:key="value" class="mn-tab {{item.value === value ? 'mn-active' : ''}}"><button class="{{disabled || item.disabled ? 'mn-disabled' : ''}} mn-option" disabled="{{disabled || item.disabled}}" data-index="{{index}}" bindtap="onChoose">{{item.label}}</button></view></scroll-view><view class="mn-tab-panel"><block wx:for="{{items}}" wx:key="value"><text wx:if="{{item.value === value}}">{{item.content}}</text></block><slot/></view></view>`,
  tabProperties,
  tabMethods,
);
export const pageTabs = native(
  `<view class="mn-tabs"><scroll-view scroll-x class="mn-tabs-list"><view wx:for="{{items}}" wx:key="value" class="mn-tab {{item.value === value ? 'mn-active' : ''}}"><button class="{{disabled || item.disabled ? 'mn-disabled' : ''}} mn-option" disabled="{{disabled || item.disabled}}" data-index="{{index}}" bindtap="onChoose">{{item.label}}</button><button wx:if="{{item.closable}}" class="{{disabled || item.disabled ? 'mn-disabled' : ''}} mn-close" disabled="{{disabled || item.disabled}}" data-index="{{index}}" bindtap="onClose">×</button></view></scroll-view><view class="mn-tab-panel"><slot/></view></view>`,
  tabProperties,
  tabMethods,
);
export const menu = native(
  `<view class="mn-menu"><button wx:for="{{items}}" wx:key="value" class="{{disabled || item.disabled ? 'mn-disabled' : ''}} mn-option {{item.value === value ? 'mn-active' : ''}} {{item.danger ? 'mn-error' : ''}}" disabled="{{disabled || item.disabled}}" data-index="{{index}}" bindtap="onChoose">{{item.label}}</button><slot/></view>`,
  tabProperties,
  {
    onChoose(this: NativeInstance, e: NativeEvent) {
      const i = this.data.items[itemIndex(e)];
      if (!i || i.disabled || blocked(this)) return;
      emitValue(this, i.value);
      this.triggerEvent("select", { value: i.value });
    },
  },
);
function flattenTree(self: NativeInstance) {
  const rows: WechatMiniprogram.IAnyObject[] = [];
  function walk(items: WechatMiniprogram.IAnyObject[], depth: number) {
    for (const item of items) {
      rows.push({
        ...item,
        depth,
        expanded: self.data.expandedKeys.includes(item.value),
      });
      if (item.children && self.data.expandedKeys.includes(item.value))
        walk(item.children, depth + 1);
    }
  }
  walk(self.data.items, 0);
  self.setData({ rows });
}
export const navTree = native(
  `<view class="mn-nav-tree"><view wx:for="{{rows}}" wx:key="value" class="mn-tree-row {{item.value === value ? 'mn-active' : ''}}" style="padding-left:{{item.depth * 20}}px"><button wx:if="{{item.children.length}}" class="{{disabled || item.disabled ? 'mn-disabled' : ''}} mn-close" disabled="{{disabled || item.disabled}}" data-index="{{index}}" bindtap="onExpand">{{item.expanded ? '−' : '+'}}</button><button class="{{disabled || item.disabled ? 'mn-disabled' : ''}} mn-option" disabled="{{disabled || item.disabled}}" data-index="{{index}}" bindtap="onSelect">{{item.label}}</button></view></view>`,
  { ...tabProperties, expandedKeys: arr() },
  {
    onExpand(this: NativeInstance, e: NativeEvent) {
      const n = this.data.rows[itemIndex(e)];
      if (blocked(this) || n.disabled) return;
      const expandedKeys = this.data.expandedKeys.includes(n.value)
        ? this.data.expandedKeys.filter((v: string) => v !== n.value)
        : [...this.data.expandedKeys, n.value];
      this.triggerEvent("expandchange", { expandedKeys });
    },
    onSelect(this: NativeInstance, e: NativeEvent) {
      const n = this.data.rows[itemIndex(e)];
      if (blocked(this) || n.disabled) return;
      emitValue(this, n.value);
      this.triggerEvent("select", { value: n.value });
    },
  },
  {
    data: { rows: [] },
    observers: {
      "items,expandedKeys": function (this: NativeInstance) {
        flattenTree(this);
      },
    },
  },
);
export const steps = native(
  `<view class="mn-steps mn-{{direction}}"><view wx:for="{{items}}" wx:key="index" class="mn-step {{index === current ? 'mn-active' : ''}} {{index < current ? 'mn-complete' : ''}}" data-index="{{index}}" bindtap="onStep"><text class="mn-step-indicator">{{current > index ? '✓' : index + 1}}</text><view><text>{{item.title}}</text><text class="mn-muted">{{item.description}}</text></view></view></view>`,
  {
    items: arr(),
    current: num(),
    direction: string("horizontal"),
    disabled: flag(),
  },
  {
    onStep(this: NativeInstance, e: NativeEvent) {
      emitValue(this, itemIndex(e));
    },
  },
);
const overlayProperties = {
  open: flag(),
  title: string(),
  description: string(),
  closeOnOverlayClick: { type: Boolean, value: true },
  loading: flag(),
  disabled: flag(),
  placement: string("right"),
};
const overlayMethods = {
  onBackdrop(this: NativeInstance) {
    if (this.data.closeOnOverlayClick && !this.data.loading) {
      this.triggerEvent("openchange", { open: false });
      this.triggerEvent("close", { reason: "overlay" });
    }
  },
  onClose(this: NativeInstance) {
    if (!this.data.loading) {
      this.triggerEvent("openchange", { open: false });
      this.triggerEvent("close", { reason: "close" });
    }
  },
  onConfirm(this: NativeInstance) {
    if (!this.data.disabled && !this.data.loading)
      this.triggerEvent("confirm", {});
  },
  onCancel(this: NativeInstance) {
    if (!this.data.loading) {
      this.triggerEvent("cancel", {});
      this.triggerEvent("openchange", { open: false });
    }
  },
};
export const modal = native(
  `<view wx:if="{{open}}" class="mn-overlay"><view class="mn-backdrop" bindtap="onBackdrop"/><view class="mn-dialog"><view class="mn-row"><text class="mn-title">{{title}}</text><button class="{{loading ? 'mn-disabled' : ''}} mn-close" disabled="{{loading}}" bindtap="onClose">×</button></view><text class="mn-muted">{{description}}</text><view class="mn-dialog-content"><slot/></view><slot name="footer"/></view></view>`,
  overlayProperties,
  overlayMethods,
);
export const drawer = native(
  `<view wx:if="{{open}}" class="mn-overlay"><view class="mn-backdrop" bindtap="onBackdrop"/><view class="mn-dialog mn-drawer mn-placement-{{placement}}"><view class="mn-row"><text class="mn-title">{{title}}</text><button class="{{loading ? 'mn-disabled' : ''}} mn-close" disabled="{{loading}}" bindtap="onClose">×</button></view><text class="mn-muted">{{description}}</text><view class="mn-dialog-content"><slot/></view><slot name="footer"/></view></view>`,
  overlayProperties,
  overlayMethods,
);
export const confirm = native(
  `<view wx:if="{{open}}" class="mn-overlay"><view class="mn-backdrop" bindtap="onBackdrop"/><view class="mn-dialog"><text class="mn-title">{{title}}</text><text class="mn-muted">{{description}}</text><view class="mn-dialog-content"><slot/></view><view class="mn-dialog-footer"><button class="{{loading ? 'mn-disabled' : ''}} mn-button mn-variant-outline" disabled="{{loading}}" bindtap="onCancel">{{cancelLabel}}</button><button class="{{disabled || loading ? 'mn-disabled' : ''}} mn-button" disabled="{{disabled || loading}}" loading="{{loading}}" bindtap="onConfirm">{{confirmLabel}}</button></view></view></view>`,
  {
    ...overlayProperties,
    confirmLabel: string("Confirm"),
    cancelLabel: string("Cancel"),
  },
  overlayMethods,
);
const popoverProperties = {
  open: flag(),
  content: string(),
  disabled: flag(),
  placement: string("bottom"),
};
const popoverMethods = {
  onToggle(this: NativeInstance) {
    if (!this.data.disabled)
      this.triggerEvent("openchange", { open: !this.data.open });
  },
};
export const popover = native(
  `<view class="mn-popover"><view class="mn-popover-trigger" bindtap="onToggle"><slot name="trigger"/></view><view wx:if="{{open}}" class="mn-popup mn-placement-{{placement}}"><text>{{content}}</text><slot/><button class="mn-close" bindtap="onToggle">×</button></view></view>`,
  popoverProperties,
  popoverMethods,
);
export const tooltip = native(
  `<view class="mn-popover"><view class="mn-popover-trigger" bindtap="onToggle"><slot/></view><view wx:if="{{open}}" class="mn-popup mn-tooltip mn-placement-{{placement}}"><text>{{content}}</text><button class="mn-close" bindtap="onToggle">×</button></view></view>`,
  popoverProperties,
  popoverMethods,
);
const toastTimers = new WeakMap<object, ReturnType<typeof setTimeout>>();
function scheduleToast(self: NativeInstance) {
  clearTimeout(toastTimers.get(self));
  if (self.data.open && self.data.duration > 0)
    toastTimers.set(
      self,
      setTimeout(() => {
        self.triggerEvent("close", {});
        self.triggerEvent("openchange", { open: false });
      }, self.data.duration),
    );
}
export const toast = native(
  `<view wx:if="{{open}}" class="mn-toast mn-status-{{status}}"><text>{{message}}</text><slot/><button class="mn-close" bindtap="onClose">×</button></view>`,
  {
    open: flag(),
    message: string(),
    status: string("info"),
    duration: num(3000),
  },
  {
    onClose(this: NativeInstance) {
      clearTimeout(toastTimers.get(this));
      this.triggerEvent("close", {});
      this.triggerEvent("openchange", { open: false });
    },
  },
  {
    observers: {
      "open,duration": function (this: NativeInstance) {
        scheduleToast(this);
      },
    },
    lifetimes: {
      detached(this: NativeInstance) {
        clearTimeout(toastTimers.get(this));
      },
    },
  },
);
function commandResults(self: NativeInstance) {
  const query = String(self.data.query || "").toLowerCase();
  self.setData({
    results: self.data.items
      .filter(
        (i: WechatMiniprogram.IAnyObject) =>
          !i.disabled &&
          `${i.title} ${i.description || ""} ${i.keywords || ""} ${i.group || ""}`
            .toLowerCase()
            .includes(query),
      )
      .slice(0, self.data.maxResults),
  });
}
export const commandDialog = native(
  `<view wx:if="{{open}}" class="mn-overlay"><view class="mn-backdrop" bindtap="onClose"/><view class="mn-dialog"><text class="mn-title">{{title}}</text><input class="mn-input" value="{{query}}" placeholder="Search commands" bindinput="onQuery"/><button wx:for="{{results}}" wx:key="id" class="mn-option" data-index="{{index}}" bindtap="onSelect"><text>{{item.title}}</text><text class="mn-muted">{{item.description}}</text></button><text wx:if="{{!results.length}}" class="mn-muted">No matching results</text></view></view>`,
  {
    open: flag(),
    title: string("Command palette"),
    items: arr(),
    maxResults: num(12),
  },
  {
    onClose(this: NativeInstance) {
      this.triggerEvent("openchange", { open: false });
    },
    onQuery(this: NativeInstance, e: NativeEvent) {
      this.setData({ query: e.detail.value });
      commandResults(this);
    },
    onSelect(this: NativeInstance, e: NativeEvent) {
      this.triggerEvent("select", { item: this.data.results[itemIndex(e)] });
      this.triggerEvent("openchange", { open: false });
    },
  },
  {
    data: { query: "", results: [] },
    observers: {
      "items,maxResults": function (this: NativeInstance) {
        commandResults(this);
      },
    },
  },
);
function tableRows(self: NativeInstance) {
  const filters = self.data.filters ?? self.data.localFilters ?? {};
  const rows = self.data.data
    .map((row: WechatMiniprogram.IAnyObject, i: number) => ({
      key: row[self.data.rowKey] ?? i,
      row,
      disabled:
        !!row.disabled ||
        (self.data.disabledRowKeys ?? []).includes(row[self.data.rowKey] ?? i),
    }))
    .filter(
      (e: WechatMiniprogram.IAnyObject) =>
        self.data.manualFilter ||
        Object.entries(filters).every(
          ([key, values]) =>
            !(values as string[]).length ||
            (values as string[]).includes(String(e.row[key])),
        ),
    );
  const sort = self.data.sortState ?? self.data.localSort;
  if (sort?.order && !self.data.manualSort)
    rows.sort(
      (a: WechatMiniprogram.IAnyObject, b: WechatMiniprogram.IAnyObject) => {
        const av = a.row[sort.key],
          bv = b.row[sort.key];
        if (av == null) return bv == null ? 0 : 1;
        if (bv == null) return -1;
        return (
          (typeof av === "number" && typeof bv === "number"
            ? av - bv
            : String(av).localeCompare(String(bv), undefined, {
                numeric: true,
              })) * (sort.order === "ascend" ? 1 : -1)
        );
      },
    );
  const pageCount =
    self.data.pageSize > 0 && !self.data.serverPagination
      ? Math.max(1, Math.ceil(rows.length / self.data.pageSize))
      : 1;
  const activePage = Math.min(
    pageCount,
    Math.max(1, self.data.current ?? self.data.localPage ?? 1),
  );
  const pageRows =
    self.data.pageSize > 0 && !self.data.serverPagination
      ? rows.slice(
          (activePage - 1) * self.data.pageSize,
          activePage * self.data.pageSize,
        )
      : rows;
  const enabled = pageRows.filter(
    (e: WechatMiniprogram.IAnyObject) => !e.disabled,
  );
  self.setData({
    pageCount,
    activePage,
    allChecked:
      enabled.length > 0 &&
      enabled.every((e: WechatMiniprogram.IAnyObject) =>
        self.data.selectedRowKeys.includes(e.key),
      ),
    someChecked: enabled.some((e: WechatMiniprogram.IAnyObject) =>
      self.data.selectedRowKeys.includes(e.key),
    ),
    rows: pageRows.map((e: WechatMiniprogram.IAnyObject) => ({
      ...e,
      selected: self.data.selectedRowKeys.includes(e.key),
      cells: self.data.columns.map((c: WechatMiniprogram.IAnyObject) => ({
        key: c.key,
        value: String(e.row[c.key] ?? ""),
        align: c.align || "left",
        width:
          typeof c.width === "number" ? `${c.width}px` : c.width || "120px",
      })),
    })),
  });
}
const tableProperties = {
  disabled: flag(),
  columns: arr(),
  data: arr(),
  rowKey: string("id"),
  selectable: flag(),
  selectedRowKeys: arr(),
  sortState: { type: Object, value: null },
  manualSort: flag(),
  loading: flag(),
  emptyText: string("No data"),
};
const tableMethods = {
  onSort(this: NativeInstance, e: NativeEvent) {
    const c = this.data.columns[itemIndex(e)];
    if (this.data.disabled || !c.sortable) return;
    const old = this.data.sortState ?? this.data.localSort;
    const sort = {
      key: c.key,
      order:
        old?.key !== c.key || !old?.order
          ? "ascend"
          : old.order === "ascend"
            ? "descend"
            : null,
    };
    this.setData({ localSort: sort });
    tableRows(this);
    this.triggerEvent("sortchange", { sortState: sort });
  },
  onSelect(this: NativeInstance, e: NativeEvent) {
    if (this.data.disabled) return;
    const key = this.data.rows[itemIndex(e)]?.key;
    const selectedRowKeys = this.data.selectedRowKeys.includes(key)
      ? this.data.selectedRowKeys.filter(
          (k: WechatMiniprogram.IAnyObject) => k !== key,
        )
      : [...this.data.selectedRowKeys, key];
    this.triggerEvent("selectionchange", { selectedRowKeys });
  },
  onRow(this: NativeInstance, e: NativeEvent) {
    this.triggerEvent("rowclick", { row: this.data.rows[itemIndex(e)]?.row });
  },
};
const tableTemplate = `<scroll-view scroll-x class="mn-table-scroll"><view class="mn-table"><view class="mn-table-row mn-table-head"><text wx:if="{{selectable}}" class="mn-table-cell">Select</text><button wx:for="{{columns}}" wx:key="key" class="{{disabled || !item.sortable ? 'mn-disabled' : ''}} mn-table-cell mn-table-sort" data-index="{{index}}" disabled="{{disabled || !item.sortable}}" bindtap="onSort">{{item.header}}</button></view><text wx:if="{{loading}}" class="mn-muted">Loading…</text><view wx:elif="{{!rows.length}}" class="mn-empty">{{emptyText}}</view><block wx:else><view wx:for="{{rows}}" wx:key="key" class="mn-table-row" data-index="{{index}}" bindtap="onRow"><button wx:if="{{selectable}}" class="{{disabled ? 'mn-disabled' : ''}} mn-table-cell mn-select-row" data-index="{{index}}" disabled="{{disabled}}" catchtap="onSelect">{{item.selected ? '☑' : '☐'}}</button><view wx:for="{{item.cells}}" wx:for-item="cell" wx:key="key" class="mn-table-cell" style="text-align:{{cell.align}};min-width:{{cell.width}}">{{cell.value}}</view></view></block></view></scroll-view>`;
const tableExtra = {
  data: { rows: [], localSort: null },
  observers: {
    "columns,data,selectedRowKeys,sortState,manualSort,rowKey": function (
      this: NativeInstance,
    ) {
      tableRows(this);
    },
  },
};
export const table = native(
  tableTemplate,
  tableProperties,
  tableMethods,
  tableExtra,
);
export const dataTable = native(
  `<view class="mn-data-table"><view wx:if="{{error}}" class="mn-alert mn-status-error"><text>{{error}}</text><button class="mn-button" bindtap="onRetry">Retry</button></view><block wx:else>${tableTemplate}<view wx:if="{{total > 0}}" class="mn-pagination"><button class="{{current <= 1 ? 'mn-disabled' : ''}} mn-button" data-delta="-1" disabled="{{current <= 1}}" bindtap="onPage">Previous</button><text>{{current}}</text><button class="mn-button" data-delta="1" disabled="{{current * pageSize >= total}}" bindtap="onPage">Next</button></view></block></view>`,
  {
    ...tableProperties,
    error: string(),
    current: num(1),
    pageSize: num(10),
    total: num(),
  },
  {
    ...tableMethods,
    onRetry(this: NativeInstance) {
      this.triggerEvent("retry", {});
    },
    onPage(this: NativeInstance, e: NativeEvent) {
      const current = this.data.current + Number(e.currentTarget.dataset.delta);
      if (
        this.data.disabled ||
        current < 1 ||
        current > Math.max(1, Math.ceil(this.data.total / this.data.pageSize))
      )
        return;
      this.triggerEvent("pagechange", {
        current,
        pageSize: this.data.pageSize,
      });
    },
  },
  tableExtra,
);
function virtualRows(self: NativeInstance) {
  const h = Math.max(1, self.data.itemHeight);
  const start = Math.max(
      0,
      Math.floor(self.data.scrollTop / h) - self.data.overscan,
    ),
    end = Math.min(
      self.data.items.length,
      Math.ceil((self.data.scrollTop + self.data.height) / h) +
        self.data.overscan,
    );
  self.setData({
    visible: self.data.items
      .slice(start, end)
      .map((item: WechatMiniprogram.IAnyObject, i: number) => ({
        item,
        index: i + start,
        label: item.label ?? String(item),
      })),
    before: start * h,
    after: (self.data.items.length - end) * h,
  });
}
export const virtualList = native(
  `<scroll-view scroll-y class="mn-virtual-list" style="height:{{height}}px" bindscroll="onScroll"><view style="height:{{before}}px"/><view wx:for="{{visible}}" wx:key="index" class="mn-list-item" style="height:{{itemHeight}}px" data-index="{{item.index}}" bindtap="onItem">{{item.label}}</view><view style="height:{{after}}px"/></scroll-view>`,
  { items: arr(), itemHeight: num(44), height: num(300), overscan: num(3) },
  {
    onScroll(this: NativeInstance, e: NativeEvent) {
      this.setData({ scrollTop: e.detail.scrollTop });
      virtualRows(this);
      this.triggerEvent("scroll", { scrollTop: e.detail.scrollTop });
    },
    onItem(this: NativeInstance, e: NativeEvent) {
      const index = itemIndex(e);
      this.triggerEvent("itemclick", { item: this.data.items[index], index });
    },
  },
  {
    data: { visible: [], before: 0, after: 0, scrollTop: 0 },
    observers: {
      "items,itemHeight,height,overscan": function (this: NativeInstance) {
        virtualRows(this);
      },
    },
  },
);
export const upload = native(
  `<view class="mn-upload"><view wx:for="{{value}}" wx:key="id" class="mn-upload-item"><text>{{item.name}}</text><text class="mn-muted">{{item.status}}</text><button class="{{disabled ? 'mn-disabled' : ''}} mn-close" disabled="{{disabled}}" data-index="{{index}}" bindtap="onRemove">×</button></view><button class="mn-button mn-variant-outline" disabled="{{disabled || value.length >= maxCount}}" bindtap="onChoose">Choose files</button></view>`,
  { value: arr(), disabled: flag(), maxCount: num(9), accept: string("image") },
  {
    onRemove(this: NativeInstance, e: NativeEvent) {
      if (this.data.disabled) return;
      const index = itemIndex(e);
      this.triggerEvent("remove", { id: this.data.value[index].id });
      emitValue(
        this,
        this.data.value.filter(
          (_: WechatMiniprogram.IAnyObject, i: number) => i !== index,
        ),
      );
    },
    onChoose(this: NativeInstance) {
      if (this.data.disabled || this.data.value.length >= this.data.maxCount)
        return;
      wx.chooseMedia({
        count: Math.min(9, this.data.maxCount - this.data.value.length),
        mediaType:
          this.data.accept === "all" ? ["image", "video"] : [this.data.accept],
        success: (r) => {
          const files = r.tempFiles.map((f, i) => ({
            id: `${Date.now()}-${i}`,
            name: f.tempFilePath.split("/").pop(),
            url: f.tempFilePath,
            size: f.size,
            status: "pending",
          }));
          this.triggerEvent("select", { files });
          emitValue(this, [...this.data.value, ...files]);
        },
        fail: (error) => this.triggerEvent("error", { error }),
      });
    },
  },
);
export const avatar = native(
  `<view class="mn-avatar mn-shape-{{shape}}" style="width:{{size}}px;height:{{size}}px"><image wx:if="{{src && !failed}}" class="mn-avatar-image" src="{{src}}" mode="aspectFill" binderror="onError"/><text wx:else>{{initials}}</text></view>`,
  { src: string(), name: string(), size: num(40), shape: string("circle") },
  {
    onError(this: NativeInstance) {
      this.setData({ failed: true });
    },
  },
  {
    data: { failed: false, initials: "?" },
    observers: {
      name(this: NativeInstance, v: string) {
        this.setData({
          initials:
            v
              .trim()
              .split(/\s+/)
              .slice(0, 2)
              .map((s) => s[0])
              .join("")
              .toUpperCase() || "?",
        });
      },
      src(this: NativeInstance) {
        this.setData({ failed: false });
      },
    },
  },
);
export const avatarGroup = native(
  `<view class="mn-avatar-group"><view wx:for="{{visible}}" wx:key="index" class="mn-avatar" style="width:{{size}}px;height:{{size}}px"><image wx:if="{{item.src}}" class="mn-avatar-image" src="{{item.src}}" mode="aspectFill"/><text wx:else>{{item.initials}}</text></view><view wx:if="{{items.length > max}}" class="mn-avatar">+{{items.length - max}}</view><slot/></view>`,
  { items: arr(), max: num(5), size: num(40) },
  {},
  {
    data: { visible: [] },
    observers: {
      "items,max": function (this: NativeInstance) {
        this.setData({
          visible: this.data.items
            .slice(0, this.data.max)
            .map((i: WechatMiniprogram.IAnyObject) => ({
              ...i,
              initials: (i.name || "?")
                .trim()
                .split(/\s+/)
                .slice(0, 2)
                .map((s: string) => s[0])
                .join("")
                .toUpperCase(),
            })),
        });
      },
    },
  },
);
export const badge = native(
  `<view class="mn-badge"><slot/><text wx:if="{{dot || count || showZero}}" class="mn-badge-indicator mn-status-{{status}} {{dot ? 'mn-badge-dot' : ''}}">{{dot ? '' : count > max ? max + '+' : count}}</text></view>`,
  {
    count: num(),
    max: num(99),
    dot: flag(),
    showZero: flag(),
    status: string("error"),
  },
);
export const card = native(
  `<view class="mn-card mn-variant-{{variant}}"><view class="mn-card-header"><text wx:if="{{title}}" class="mn-title">{{title}}</text><text wx:if="{{description}}" class="mn-muted">{{description}}</text><slot name="header"/></view><view class="mn-card-content"><slot/></view><view class="mn-card-footer"><slot name="footer"/></view></view>`,
  {
    title: string(),
    description: string(),
    variant: string("outline"),
    hoverable: flag(),
  },
);
export const progressIndicator = native(
  `<view class="mn-progress {{indeterminate ? 'mn-indeterminate' : ''}}"><view class="mn-progress-track"><view class="mn-progress-fill" style="width:{{indeterminate ? 35 : percent}}%"/></view><text wx:if="{{showLabel}}">{{percent}}%</text></view>`,
  { value: num(), max: num(100), indeterminate: flag(), showLabel: flag() },
  {},
  {
    data: { percent: 0 },
    observers: {
      "value,max": function (this: NativeInstance) {
        this.setData({
          percent: Math.round(
            Math.min(
              100,
              Math.max(0, (this.data.value / Math.max(1, this.data.max)) * 100),
            ),
          ),
        });
      },
    },
  },
);
export const empty = native(
  `<view class="mn-empty"><slot name="icon"/><text class="mn-title">{{title}}</text><text class="mn-muted">{{description}}</text><slot/></view>`,
  { title: string("No data"), description: string() },
);
export const skeleton = native(
  `<view class="mn-skeleton {{circle ? 'mn-skeleton-circle' : ''}} {{animated ? 'mn-skeleton-animated' : ''}}" style="width:{{width}};height:{{height}}"/>`,
  {
    width: string("100%"),
    height: string("20px"),
    circle: flag(),
    animated: { type: Boolean, value: true },
  },
);
export const alert = native(
  `<view wx:if="{{!closed}}" class="mn-alert mn-status-{{status}}"><view><text class="mn-title">{{title}}</text><text>{{description}}</text><slot/></view><button wx:if="{{closable}}" class="mn-close" bindtap="onClose">×</button></view>`,
  {
    title: string(),
    description: string(),
    status: string("info"),
    closable: flag(),
  },
  {
    onClose(this: NativeInstance) {
      this.setData({ closed: true });
      this.triggerEvent("close", {});
    },
  },
  { data: { closed: false } },
);
export const divider = native(
  `<view class="mn-divider {{vertical ? 'mn-divider-vertical' : ''}}"><text wx:if="{{label}}" class="mn-divider-label">{{label}}</text></view>`,
  { vertical: flag(), label: string() },
);
export const tag = native(
  `<view class="mn-tag mn-variant-{{variant}} mn-status-{{status}}"><slot/>{{label}}<button wx:if="{{closable}}" class="{{disabled ? 'mn-disabled' : ''}} mn-close" disabled="{{disabled}}" bindtap="onClose">×</button></view>`,
  {
    closable: flag(),
    disabled: flag(),
    variant: string("subtle"),
    status: string("info"),
    label: string(),
  },
  {
    onClose(this: NativeInstance) {
      if (!this.data.disabled) this.triggerEvent("close", {});
    },
  },
);
export const themeToggle = native(
  `<button class="{{disabled ? 'mn-disabled' : ''}} mn-button mn-variant-ghost" disabled="{{disabled}}" bindtap="onToggle">{{value === 'dark' ? '☀ Light' : '☾ Dark'}}</button>`,
  { value: string("light"), disabled: flag() },
  {
    onToggle(this: NativeInstance) {
      emitValue(this, this.data.value === "dark" ? "light" : "dark");
    },
  },
);
export const iconButton = native(
  `<button class="{{disabled || loading ? 'mn-disabled' : ''}} mn-button mn-icon-button mn-variant-{{variant}}" aria-label="{{label}}" disabled="{{disabled || loading}}" loading="{{loading}}" bindtap="onTap"><slot/>{{icon}}</button>`,
  {
    label: string(),
    icon: string(),
    disabled: flag(),
    loading: flag(),
    variant: string("ghost"),
  },
  {
    onTap(this: NativeInstance) {
      if (!this.data.disabled && !this.data.loading)
        this.triggerEvent("click", {});
    },
  },
);
export const box = native(
  `<view class="mn-box" style="padding:{{padding}};margin:{{margin}};background:{{background}};border-radius:{{radius}}"><slot/></view>`,
  {
    padding: string("0"),
    margin: string("0"),
    background: string(),
    radius: string("0"),
  },
);
export const stack = native(
  `<view class="mn-stack" style="flex-direction:{{direction === 'horizontal' ? 'row' : 'column'}};gap:{{gap}}px;align-items:{{align}};justify-content:{{justify}};flex-wrap:{{wrap ? 'wrap' : 'nowrap'}}"><slot/></view>`,
  {
    direction: string("vertical"),
    gap: num(12),
    align: string("stretch"),
    justify: string("flex-start"),
    wrap: flag(),
  },
);
export const responsiveGrid = native(
  `<view class="mn-grid" style="gap:{{gap}}px;grid-template-columns:repeat({{columns}},minmax(0,1fr))"><slot/></view>`,
  { columns: num(3), gap: num(16) },
);
export const splitLayout = native(
  `<view class="mn-split-layout" style="gap:{{gap}}px;flex-direction:{{reverse ? 'row-reverse' : 'row'}}"><view class="mn-split-sidebar" style="width:{{sidebarWidth}}px"><slot name="sidebar"/></view><view class="mn-split-main"><slot/></view></view>`,
  { sidebarWidth: num(240), gap: num(24), reverse: flag() },
);
export const page = native(
  `<view class="mn-page" style="max-width:{{maxWidth}}px"><view class="mn-page-header"><text class="mn-page-title">{{title}}</text><text class="mn-muted">{{description}}</text><slot name="actions"/></view><slot/></view>`,
  { title: string(), description: string(), maxWidth: num(1200) },
);
export const appShell = native(
  `<view class="mn-app-shell"><view class="mn-app-header"><slot name="header"/></view><view class="mn-app-body"><view class="mn-app-sidebar" style="width:{{sidebarWidth}}px"><slot name="sidebar"/></view><view class="mn-app-main"><slot/></view></view><view class="mn-app-footer"><slot name="footer"/></view></view>`,
  { sidebarWidth: num(240) },
);
export const formControl = native(
  `<view class="mn-form-control {{invalid ? 'mn-invalid' : ''}} {{disabled ? 'mn-disabled' : ''}}"><slot/></view>`,
  { ...common, invalid: flag(), required: flag() },
);
export const formField = native(
  `<view class="mn-form-control {{invalid || errorMessage ? 'mn-invalid' : ''}} {{disabled ? 'mn-disabled' : ''}}"><text class="mn-form-label">{{label}}<text wx:if="{{required}}" class="mn-error"> *</text></text><slot/><text wx:if="{{invalid || errorMessage}}" class="mn-error">{{errorMessage}}</text><text wx:else class="mn-muted">{{helperText}}</text></view>`,
  {
    ...common,
    invalid: flag(),
    required: flag(),
    label: string(),
    helperText: string(),
    errorMessage: string(),
  },
);
export const formLayout = native(
  `<form class="mn-form-layout" style="gap:{{gap}}px;grid-template-columns:repeat({{columns}},minmax(0,1fr))" bindsubmit="onSubmit" bindreset="onReset"><slot/></form>`,
  { columns: num(1), gap: num(16) },
  {
    onSubmit(this: NativeInstance, e: NativeEvent) {
      this.triggerEvent("submit", e.detail);
    },
    onReset(this: NativeInstance) {
      this.triggerEvent("reset", {});
    },
  },
);
export const loadingState = native(
  `<view class="mn-loading-state"><view wx:if="{{error}}" class="mn-alert mn-status-error"><text>{{error}}</text><button class="mn-button" bindtap="onRetry">{{retryLabel || localeLabels.tableRetry}}</button></view><view wx:elif="{{loading}}" class="mn-loading"><view class="mn-spinner"/><text>{{label}}</text></view><slot wx:else/></view>`,
  {
    loading: { type: Boolean, value: true },
    label: string(),
    retryLabel: string(),
    error: string(),
  },
  {
    onRetry(this: NativeInstance) {
      this.triggerEvent("retry", {});
    },
  },
);
export const textLink = native(
  `<navigator wx:if="{{href && !disabled}}" class="mn-text-link" url="{{href}}" open-type="{{openType}}" bindtap="onTap"><slot/>{{label}}</navigator><text wx:else class="mn-text-link {{disabled ? 'mn-disabled' : ''}}" bindtap="onTap"><slot/>{{label}}</text>`,
  {
    href: string(),
    disabled: flag(),
    label: string(),
    openType: string("navigate"),
  },
  {
    onTap(this: NativeInstance) {
      if (!this.data.disabled)
        this.triggerEvent("click", { href: this.data.href });
    },
  },
);
export const descriptionList = native(
  `<view class="mn-description-list" style="grid-template-columns:repeat({{columns}},minmax(0,1fr))"><view wx:for="{{items}}" wx:key="index" class="mn-description-item"><text class="mn-muted">{{item.label}}</text><text>{{item.value}}</text></view><slot/></view>`,
  { items: arr(), columns: num(1) },
);
export const list = native(
  `<view class="mn-list {{divided ? 'mn-list-divided' : ''}}"><view wx:for="{{items}}" wx:key="index" class="mn-list-item {{item.disabled ? 'mn-disabled' : ''}}" data-index="{{index}}" bindtap="onItem"><text>{{item.title}}</text><text class="mn-muted">{{item.description}}</text></view><slot/></view>`,
  { items: arr(), divided: { type: Boolean, value: true } },
  {
    onItem(this: NativeInstance, e: NativeEvent) {
      const index = itemIndex(e),
        item = this.data.items[index];
      if (!item.disabled) this.triggerEvent("itemclick", { item, index });
    },
  },
);
export const codeBlock = native(
  `<view class="mn-code-block"><view class="mn-row"><text class="mn-muted">{{language}}</text><button wx:if="{{copyable}}" class="mn-close" bindtap="onCopy">Copy</button></view><scroll-view scroll-x><text class="mn-code" selectable>{{code}}</text></scroll-view></view>`,
  {
    code: string(),
    language: string(),
    copyable: { type: Boolean, value: true },
  },
  {
    onCopy(this: NativeInstance) {
      wx.setClipboardData({
        data: this.data.code,
        success: () => this.triggerEvent("copy", { value: this.data.code }),
        fail: (error) => this.triggerEvent("error", { error }),
      });
    },
  },
);
export const prose = native(
  `<view class="mn-prose"><text wx:if="{{content}}" selectable>{{content}}</text><slot/></view>`,
  { content: string() },
);
export const htmlPreview = native(
  `<view class="mn-html-preview"><rich-text nodes="{{html}}"/></view>`,
  { html: string() },
);

function updateTheme(self: NativeInstance) {
  const requested =
    self.data.theme === "github-dark"
      ? "dark"
      : self.data.theme === "light" || self.data.theme === "dark"
        ? self.data.theme
        : self.data.mode || self.data.currentMode || "light";
  const mode =
    requested === "system" ||
    self.data.theme === "system" ||
    self.data.theme === "auto"
      ? self.data.systemMode
      : requested;
  const overrides =
    self.data.theme === "github-dark"
      ? githubDark
      : typeof self.data.theme === "object"
        ? self.data.theme
        : undefined;
  const themeStyle = overrides
    ? Object.entries(
        resolveTokens({
          mode,
          palette: self.data.palette,
          design: self.data.design,
          overrides,
        }).css,
      )
        .map(([k, v]) => `--${k}:${v}`)
        .join(";")
    : "";
  self.setData({
    themeStyle,
    themeClass: miniTokenClassNames({
      mode,
      palette: self.data.palette,
      design: self.data.design,
    }),
  });
}
const themeHandlers = new WeakMap<object, (event: { theme: string }) => void>();
const providerProperties = {
  mode: string("light"),
  theme: { type: null, value: "" },
  palette: { type: null, value: null },
  design: { type: Object, value: {} },
  locale: string("en"),
  dir: string("ltr"),
};
const providerExtra = {
  data: { themeClass: "mn-root", systemMode: "light" },
  observers: {
    "mode,palette,design,theme": function (this: NativeInstance) {
      updateTheme(this);
    },
  },
  lifetimes: {
    attached(this: NativeInstance) {
      try {
        this.setData({
          systemMode: appBaseInfo().theme === "dark" ? "dark" : "light",
        });
      } catch {
        /* Simulator and older SDKs may not expose system theme. */
      }
      const handler = (e: { theme: string }) => {
        this.setData({ systemMode: e.theme === "dark" ? "dark" : "light" });
        updateTheme(this);
        this.triggerEvent("themechange", {
          mode: this.data.mode,
          resolvedMode:
            this.data.mode === "system" ? this.data.systemMode : this.data.mode,
          palette: this.data.palette,
        });
      };
      themeHandlers.set(this, handler);
      wx.onThemeChange?.(handler);
      updateTheme(this);
    },
    detached(this: NativeInstance) {
      const handler = themeHandlers.get(this);
      if (handler) wx.offThemeChange?.(handler);
    },
  },
};
export const configProvider = native(
  `<view class="mn-provider {{themeClass}}" style="direction:{{dir}};{{themeStyle}}"><slot/></view>`,
  providerProperties,
  {},
  providerExtra,
);
export const themeProvider = native(
  `<view class="mn-provider {{themeClass}}" style="{{themeStyle}}"><slot/></view>`,
  providerProperties,
  {},
  providerExtra,
);

// Extended native control surfaces retain the original form behaviors.
Object.assign(button.definition.properties, {
  color: string("primary"),
  fullWidth: flag(),
  active: flag(),
  shape: string("rounded"),
  borderRadius: string(),
  loadingText: string(),
  startIcon: string(),
  endIcon: string(),
});
Object.assign(button.definition, { options: { multipleSlots: true } });
button.template = `<button class="{{disabled || loading ? 'mn-disabled' : ''}} mn-button mn-size-{{size}} mn-variant-{{variant}} mn-color-{{color}} mn-shape-{{shape}} {{fullWidth ? 'mn-full-width' : ''}} {{active ? 'mn-active' : ''}}" style="border-radius:{{borderRadius}}" disabled="{{disabled || loading}}" loading="{{loading}}" form-type="{{formType}}" bindtap="onTap"><block wx:if="{{loading && loadingText}}">{{loadingText}}</block><block wx:else><text wx:if="{{!loading && startIcon}}">{{startIcon}}</text><slot wx:if="{{!loading}}" name="startIcon"/><slot/>{{label}}<text wx:if="{{!loading && endIcon}}">{{endIcon}}</text><slot wx:if="{{!loading}}" name="endIcon"/></block></button>`;
Object.assign(input.definition.properties, {
  variant: string("outline"),
  size: string("medium"),
  invalid: flag(),
  required: flag(),
  clearable: flag(),
  showCharCount: flag(),
  prefix: string(),
  suffix: string(),
  clearLabel: string("Clear"),
  showPasswordLabel: string("Show password"),
  hidePasswordLabel: string("Hide password"),
});
Object.assign(input.definition, {
  options: { multipleSlots: true },
  data: { passwordVisible: false, focused: false },
});
Object.assign(input.definition.methods, {
  onClear(this: NativeInstance) {
    if (blocked(this)) return;
    this.triggerEvent("change", { value: "" });
    this.triggerEvent("clear", {});
    this.setData({ focused: true });
  },
  onPassword(this: NativeInstance) {
    if (!this.data.disabled)
      this.setData({ passwordVisible: !this.data.passwordVisible });
  },
  onFocus(this: NativeInstance, e: NativeEvent) {
    this.triggerEvent("focus", e.detail);
  },
  onBlur(this: NativeInstance, e: NativeEvent) {
    this.setData({ focused: false });
    this.triggerEvent("blur", e.detail);
  },
  onConfirm(this: NativeInstance) {
    this.triggerEvent("confirm", { value: this.data.value });
  },
});
input.template = `<view class="mn-input-wrapper mn-input-{{variant}} mn-size-{{size}} {{invalid ? 'mn-invalid' : ''}} {{disabled ? 'mn-disabled' : ''}}"><text wx:if="{{prefix}}">{{prefix}}</text><slot name="prefix"/><input class="{{disabled || readOnly ? 'mn-disabled' : ''}} mn-input" value="{{value}}" disabled="{{disabled || readOnly}}" placeholder="{{placeholder}}" name="{{name}}" type="{{type === 'password' ? 'text' : type}}" password="{{(password || type === 'password') && !passwordVisible}}" maxlength="{{maxlength}}" focus="{{focused}}" bindinput="onInput" bindfocus="onFocus" bindblur="onBlur" bindconfirm="onConfirm"/><button wx:if="{{clearable && value && !disabled && !readOnly}}" class="mn-close mn-input-clear" aria-label="{{clearLabel}}" bindtap="onClear">×</button><button wx:if="{{password || type === 'password'}}" class="{{disabled ? 'mn-disabled' : ''}} mn-close mn-password-toggle" disabled="{{disabled}}" aria-label="{{passwordVisible ? hidePasswordLabel : showPasswordLabel}}" bindtap="onPassword">{{passwordVisible ? 'Hide' : 'Show'}}</button><text wx:if="{{showCharCount}}" class="mn-muted">{{value.length}}{{maxlength > 0 ? ' / ' + maxlength : ''}}</text><text wx:if="{{suffix}}">{{suffix}}</text><slot name="suffix"/></view>`;
function ratingStars(self: NativeInstance) {
  const score =
    self.data.max > 0
      ? Math.max(0, Math.min(5, (self.data.value / self.data.max) * 5))
      : 0;
  const f = score - Math.floor(score),
    display = Math.floor(score) + (f >= 0.75 ? 1 : f >= 0.25 ? 0.5 : 0);
  self.setData({
    stars: Array.from({ length: 5 }, (_, i) => ({
      value: i + 1,
      full: i + 1 <= display,
      half: i + 0.5 === display,
    })),
    formattedValue: Number(self.data.value).toFixed(1),
  });
}
Object.assign(rating.definition.properties, {
  max: num(10),
  size: string("medium"),
  showValue: flag(),
  ratingCount: num(-1),
});
Object.assign(rating.definition, {
  observers: {
    "value,max": function (this: NativeInstance) {
      ratingStars(this);
    },
  },
  lifetimes: {
    attached(this: NativeInstance) {
      ratingStars(this);
    },
  },
});
Object.assign(rating.definition.methods, {
  onChoose(this: NativeInstance, e: NativeEvent) {
    if (blocked(this)) return;
    const stars = Number(e.currentTarget.dataset.value);
    const n = Math.round((stars / 5) * this.data.max * 10) / 10;
    emitValue(this, this.data.allowClear && n === this.data.value ? 0 : n);
  },
});
rating.template = `<view class="mn-rating mn-size-{{size}}"><view wx:for="{{stars}}" wx:key="value" class="mn-star {{item.full ? 'mn-active' : ''}} {{item.half ? 'mn-rating-half' : ''}}"><text>{{item.full ? '★' : '☆'}}</text><text wx:if="{{item.half}}" class="mn-half-star">★</text><button class="{{disabled || readOnly ? 'mn-disabled' : ''}} mn-rating-target mn-rating-target-left" disabled="{{disabled || readOnly}}" data-value="{{item.value - 0.5}}" bindtap="onChoose"/><button class="{{disabled || readOnly ? 'mn-disabled' : ''}} mn-rating-target mn-rating-target-right" disabled="{{disabled || readOnly}}" data-value="{{item.value}}" bindtap="onChoose"/></view><text wx:if="{{showValue}}" class="mn-rating-value">{{formattedValue}}<text wx:if="{{ratingCount >= 0}}"> ({{ratingCount}})</text></text></view>`;

Object.assign(themeProvider.definition.properties, {
  mode: string(""),
  defaultTheme: string("system"),
  defaultPalette: { type: null, value: null },
  disableStorage: flag(),
  storageKey: string("minerva-theme"),
});
Object.assign(themeProvider.definition.methods, {
  setTheme(this: NativeInstance, mode: string) {
    if (!["light", "dark", "system"].includes(mode)) return;
    this.setData({ currentMode: mode });
    updateTheme(this);
    this.triggerEvent("themechange", { mode });
    if (!this.data.disableStorage)
      try {
        wx.setStorageSync(this.data.storageKey, {
          mode,
          palette: this.data.palette,
        });
      } catch {
        /* Storage may be unavailable. */
      }
  },
  setPalette(this: NativeInstance, palette: string | null) {
    if (
      palette !== null &&
      !["editorial", "tech", "graphite", "cool"].includes(palette)
    )
      return;
    this.setData({ palette });
    updateTheme(this);
    this.triggerEvent("palettechange", { palette });
    if (!this.data.disableStorage)
      try {
        wx.setStorageSync(this.data.storageKey, {
          mode: this.data.mode || this.data.currentMode,
          palette,
        });
      } catch {
        /* Storage may be unavailable. */
      }
  },
});
Object.assign(themeProvider.definition, {
  lifetimes: {
    ...providerExtra.lifetimes,
    attached(this: NativeInstance) {
      this.setData({
        currentMode: this.data.defaultTheme,
        palette: this.data.palette ?? this.data.defaultPalette,
      });
      if (!this.data.disableStorage)
        try {
          const saved = wx.getStorageSync(this.data.storageKey);
          if (saved && ["light", "dark", "system"].includes(saved.mode))
            this.setData({ currentMode: saved.mode });
          if (
            saved &&
            (saved.palette === null ||
              ["editorial", "tech", "graphite", "cool"].includes(saved.palette))
          )
            this.setData({ palette: saved.palette });
        } catch {
          /* Storage may be unavailable. */
        }
      providerExtra.lifetimes.attached.call(this);
    },
  },
});

function numberPrecision(self: NativeInstance) {
  return Math.max(
    0,
    Math.min(20, self.data.precision ?? inferStepPrecision(self.data.step)),
  );
}
function commitNumber(self: NativeInstance, value: number | null) {
  if (blocked(self)) return;
  const next =
    value === null
      ? null
      : Number(
          clampNumber(value, self.data.min, self.data.max).toFixed(
            numberPrecision(self),
          ),
        );
  emitValue(self, next);
  self.setData({
    draft: formatNumberValue(self.data.value, numberPrecision(self)),
  });
}
Object.assign(numberInput.definition.properties, {
  value: { type: null, value: null },
  precision: { type: null, value: null },
  showStepper: flag(),
  allowEmpty: { type: Boolean, value: true },
  size: string("medium"),
  invalid: flag(),
});
Object.assign(numberInput.definition, {
  data: { draft: "" },
  observers: {
    "value,precision,step": function (this: NativeInstance) {
      this.setData({
        draft: formatNumberValue(this.data.value, numberPrecision(this)),
      });
    },
  },
});
Object.assign(numberInput.definition.methods, {
  onInput(this: NativeInstance, e: NativeEvent) {
    if (!blocked(this)) this.setData({ draft: e.detail.value });
  },
  onCommit(this: NativeInstance) {
    if (blocked(this)) return;
    const text = String(this.data.draft).trim();
    if (text === "" || text === "-") {
      commitNumber(
        this,
        this.data.allowEmpty
          ? null
          : Number.isFinite(this.data.min) &&
              this.data.min !== -Number.MAX_VALUE
            ? this.data.min
            : 0,
      );
      return;
    }
    const n = parseNumberDraft(text);
    if (n === null) {
      this.setData({
        draft: formatNumberValue(this.data.value, numberPrecision(this)),
      });
      return;
    }
    commitNumber(this, n);
  },
  onDecrease(this: NativeInstance) {
    commitNumber(
      this,
      (parseNumberDraft(this.data.draft) ?? this.data.value ?? 0) -
        this.data.step,
    );
  },
  onIncrease(this: NativeInstance) {
    commitNumber(
      this,
      (parseNumberDraft(this.data.draft) ?? this.data.value ?? 0) +
        this.data.step,
    );
  },
});
numberInput.template = `<view class="mn-number-input mn-size-{{size}} {{invalid ? 'mn-invalid' : ''}}"><button wx:if="{{showStepper}}" class="mn-button mn-variant-outline mn-decrement {{disabled || readOnly ? 'mn-disabled' : ''}}" disabled="{{disabled || readOnly || value !== null && value <= min}}" bindtap="onDecrease">−</button><input class="mn-input {{disabled || readOnly ? 'mn-disabled' : ''}}" type="digit" value="{{draft}}" disabled="{{disabled || readOnly}}" bindinput="onInput" bindblur="onCommit" bindconfirm="onCommit"/><button wx:if="{{showStepper}}" class="mn-button mn-variant-outline mn-increment {{disabled || readOnly ? 'mn-disabled' : ''}}" disabled="{{disabled || readOnly || value !== null && value >= max}}" bindtap="onIncrease">+</button></view>`;

const tablePaginationTemplate = `<view wx:if="{{pageSize > 0 && !serverPagination}}" class="mn-pagination"><button class="mn-button mn-variant-outline mn-previous-page {{disabled || activePage <= 1 ? 'mn-disabled' : ''}}" disabled="{{disabled || activePage <= 1}}" data-delta="-1" bindtap="onPage">Previous</button><text>{{activePage}} / {{pageCount}}</text><button class="mn-button mn-variant-outline mn-next-page {{disabled || activePage >= pageCount ? 'mn-disabled' : ''}}" disabled="{{disabled || activePage >= pageCount}}" data-delta="1" bindtap="onPage">Next</button></view>`;
for (const definition of [table.definition, dataTable.definition]) {
  Object.assign(definition.properties, {
    readOnly: flag(),
    disabledRowKeys: arr(),
    filters: { type: Object, value: null },
    manualFilter: flag(),
    size: string("medium"),
    variant: string("simple"),
  });
  Object.assign(definition.methods, {
    onSelectAll(this: NativeInstance) {
      if (blocked(this)) return;
      const keys = this.data.rows
        .filter((e: WechatMiniprogram.IAnyObject) => !e.disabled)
        .map((e: WechatMiniprogram.IAnyObject) => e.key);
      const selectedRowKeys = this.data.allChecked
        ? this.data.selectedRowKeys.filter(
            (k: string | number) => !keys.includes(k),
          )
        : [...new Set([...this.data.selectedRowKeys, ...keys])];
      this.triggerEvent("selectionchange", {
        selectedRowKeys,
        selectedRows: this.data.data.filter(
          (r: WechatMiniprogram.IAnyObject, i: number) =>
            selectedRowKeys.includes(r[this.data.rowKey] ?? i),
        ),
      });
    },
    onSelect(this: NativeInstance, e: NativeEvent) {
      const entry = this.data.rows[itemIndex(e)];
      if (blocked(this) || entry?.disabled) return;
      const key = entry.key;
      const selectedRowKeys = this.data.selectedRowKeys.includes(key)
        ? this.data.selectedRowKeys.filter((k: string | number) => k !== key)
        : [...this.data.selectedRowKeys, key];
      this.triggerEvent("selectionchange", {
        selectedRowKeys,
        selectedRows: this.data.data.filter(
          (r: WechatMiniprogram.IAnyObject, i: number) =>
            selectedRowKeys.includes(r[this.data.rowKey] ?? i),
        ),
      });
    },
    onFilter(this: NativeInstance, e: NativeEvent) {
      if (blocked(this)) return;
      const key = String(e.currentTarget.dataset.key),
        value = String(e.currentTarget.dataset.value);
      const filters = this.data.filters ?? this.data.localFilters ?? {},
        old = filters[key] ?? [];
      const next = {
        ...filters,
        [key]: old.includes(value)
          ? old.filter((v: string) => v !== value)
          : [...old, value],
      };
      this.setData({ localFilters: next, localPage: 1 });
      tableRows(this);
      this.triggerEvent("filterchange", { filters: next });
      this.triggerEvent("pagechange", {
        current: 1,
        pageSize: this.data.pageSize,
      });
    },
  });
  Object.assign(definition, {
    observers: {
      "columns,data,selectedRowKeys,sortState,manualSort,rowKey,filters,manualFilter,disabledRowKeys,pageSize,current":
        function (this: NativeInstance) {
          tableRows(this);
        },
    },
  });
}
Object.assign(table.definition.properties, {
  current: { type: null, value: null },
  pageSize: num(),
  serverPagination: flag(),
});
Object.assign(dataTable.definition.properties, {
  serverPagination: { type: Boolean, value: true },
});
Object.assign(table.definition.methods, {
  onPage(this: NativeInstance, e: NativeEvent) {
    const current =
      this.data.activePage + Number(e.currentTarget.dataset.delta);
    if (this.data.disabled || current < 1 || current > this.data.pageCount)
      return;
    this.setData({ localPage: current });
    tableRows(this);
    this.triggerEvent("pagechange", { current, pageSize: this.data.pageSize });
  },
});
for (const control of [table, dataTable]) {
  control.template = control.template
    .replace(
      '<text wx:if="{{selectable}}" class="mn-table-cell">Select</text>',
      '<button wx:if="{{selectable}}" class="mn-table-cell mn-select-all" disabled="{{disabled || readOnly}}" bindtap="onSelectAll">{{allChecked ? "☑" : someChecked ? "⊟" : "☐"}}</button>',
    )
    .replace(
      "{{item.header}}</button>",
      '{{item.header}}</button><view wx:for="{{columns}}" wx:key="key" class="mn-table-filters"><button wx:for="{{item.filters}}" wx:for-item="filter" wx:key="value" class="mn-tag mn-filter-option" disabled="{{disabled || readOnly}}" data-key="{{item.key}}" data-value="{{filter.value}}" bindtap="onFilter">{{filter.text}}</button></view>',
    )
    .replace(
      'disabled="{{disabled}}" catchtap="onSelect"',
      'disabled="{{disabled || readOnly || item.disabled}}" catchtap="onSelect"',
    );
}
table.template += tablePaginationTemplate;

export const contextMenu = native(
  `<view class="mn-context-menu"><view class="mn-context-area" bindlongpress="onOpen"><slot/></view><view wx:if="{{expanded}}" class="mn-overlay"><view class="mn-backdrop" bindtap="onClose"/><view class="mn-context-panel"><view class="mn-menu"><button wx:for="{{items}}" wx:key="value" class="mn-option {{item.disabled ? 'mn-disabled' : ''}} {{item.danger ? 'mn-error' : ''}}" disabled="{{item.disabled}}" data-index="{{index}}" bindtap="onSelect">{{item.label}}</button></view><button class="mn-button mn-variant-ghost" bindtap="onClose">Cancel</button></view></view></view>`,
  {
    items: arr(),
    disabled: flag(),
    closeOnSelect: { type: Boolean, value: true },
  },
  {
    onOpen(this: NativeInstance) {
      if (this.data.disabled) return;
      this.setData({ expanded: true });
      this.triggerEvent("openchange", { open: true });
    },
    onClose(this: NativeInstance) {
      this.setData({ expanded: false });
      this.triggerEvent("openchange", { open: false });
    },
    onSelect(this: NativeInstance, e: NativeEvent) {
      const item = this.data.items[itemIndex(e)];
      if (this.data.disabled || item?.disabled) return;
      this.triggerEvent("select", { value: item.value });
      if (this.data.closeOnSelect) {
        this.setData({ expanded: false });
        this.triggerEvent("openchange", { open: false });
      }
    },
  },
  { data: { expanded: false } },
);
export const paletteToggle = native(
  `<view class="mn-palette-toggle"><button wx:for="{{choices}}" wx:key="key" class="mn-button mn-variant-outline {{item.value === value ? 'mn-active' : ''}} {{disabled ? 'mn-disabled' : ''}}" disabled="{{disabled}}" data-index="{{index}}" bindtap="onChoose">{{item.label}}</button></view>`,
  {
    value: { type: null, value: null },
    palettes: { type: Array, value: ["editorial", "tech", "graphite", "cool"] },
    showDefault: flag(),
    labels: { type: Object, value: {} },
    disabled: flag(),
  },
  {
    onChoose(this: NativeInstance, e: NativeEvent) {
      if (this.data.disabled) return;
      const value = this.data.choices[itemIndex(e)].value;
      this.triggerEvent("change", { value });
      this.triggerEvent(
        "paletterequest",
        { palette: value },
        { bubbles: true, composed: true },
      );
    },
  },
  {
    data: { choices: [] },
    observers: {
      "palettes,showDefault,labels": function (this: NativeInstance) {
        this.setData({
          choices: [
            ...(this.data.showDefault ? [null] : []),
            ...this.data.palettes,
          ].map((value: string | null) => ({
            value,
            key: value ?? "default",
            label: this.data.labels[value ?? "default"] ?? value ?? "Default",
          })),
        });
      },
    },
  },
);
export const statCard = native(
  `<view class="mn-card mn-stat-card"><text class="mn-muted">{{label}}</text><text class="mn-stat-value">{{value}}</text><text>{{trend}}</text><text class="mn-muted">{{description}}</text><slot/></view>`,
  {
    label: string(),
    value: { type: null, value: "" },
    trend: string(),
    description: string(),
  },
);
export const radioGroup = native(
  `<view class="mn-radio-group mn-{{direction}}"><view wx:for="{{options}}" wx:key="value" class="mn-choice {{disabled || readOnly || item.disabled ? 'mn-disabled' : ''}}" data-index="{{index}}" bindtap="onSelect"><text class="mn-choice-indicator mn-radio {{value === item.value ? 'mn-active' : ''}}">{{value === item.value ? '●' : ''}}</text><text>{{item.label}}</text></view><slot/></view>`,
  {
    ...common,
    options: arr(),
    value: string(),
    direction: string("vertical"),
    name: string(),
  },
  {
    onSelect(this: NativeInstance, e: NativeEvent) {
      const option = this.data.options[itemIndex(e)];
      if (
        blocked(this) ||
        option?.disabled ||
        option?.value === this.data.value
      )
        return;
      emitValue(this, option.value);
    },
  },
  { behaviors: ["wx://form-field"] },
);
function scaleRows(self: NativeInstance) {
  self.setData({
    rows: self.data.dimensions.map(
      (d: { key: string; label: string; value: number; hint?: string }) => {
        const scaled =
          self.data.max > 0
            ? Math.max(0, Math.min(5, (d.value / self.data.max) * 5))
            : 0;
        const fraction = scaled - Math.floor(scaled);
        const filled =
          Math.floor(scaled) +
          (fraction >= 0.75 ? 1 : fraction >= 0.25 ? 0.5 : 0);
        return {
          ...d,
          formatted: d.value.toFixed(1),
          stars: Array.from({ length: 5 }, (_, i) => ({
            index: i + 1,
            full: i + 1 <= filled,
            half: i + 0.5 === filled,
          })),
        };
      },
    ),
  });
}
export const ratingScale = native(
  `<view class="mn-rating-scale"><view wx:for="{{rows}}" wx:key="key" wx:for-item="dimension" class="mn-row"><view><text>{{dimension.label}}</text><text class="mn-muted">{{dimension.hint}}</text></view><view class="mn-rating"><view wx:for="{{dimension.stars}}" wx:key="index" class="mn-star {{item.full ? 'mn-active' : ''}}"><text>{{item.full ? '★' : '☆'}}</text><text wx:if="{{item.half}}" class="mn-half-star">★</text><button class="mn-rating-target mn-rating-target-left" disabled="{{disabled || readOnly}}" data-key="{{dimension.key}}" data-score="{{item.index - 0.5}}" bindtap="onRate"/><button class="mn-rating-target mn-rating-target-right" disabled="{{disabled || readOnly}}" data-key="{{dimension.key}}" data-score="{{item.index}}" bindtap="onRate"/></view><text wx:if="{{showValue}}" class="mn-rating-value">{{dimension.formatted}}</text></view></view></view>`,
  {
    ...common,
    dimensions: arr(),
    max: num(10),
    showValue: { type: Boolean, value: true },
  },
  {
    onRate(this: NativeInstance, e: NativeEvent) {
      if (blocked(this)) return;
      this.triggerEvent("change", {
        key: e.currentTarget.dataset.key,
        value:
          Math.round(
            (Number(e.currentTarget.dataset.score) / 5) * this.data.max * 10,
          ) / 10,
      });
    },
  },
  {
    data: { rows: [] },
    observers: {
      "dimensions,max": function (this: NativeInstance) {
        scaleRows(this);
      },
    },
  },
);
export const skeletonText = native(
  `<view class="mn-skeleton-text" style="gap:{{gap}}px" aria-hidden="true"><view wx:for="{{lineItems}}" wx:key="*this" class="mn-skeleton {{animated ? 'mn-skeleton-animated' : ''}}" style="height:{{lineHeight}};width:{{index === lineItems.length - 1 ? lastLineWidth : '100%'}}"/></view>`,
  {
    lines: num(3),
    lineHeight: string("14px"),
    gap: num(8),
    lastLineWidth: string("60%"),
    animated: { type: Boolean, value: true },
  },
  {},
  {
    data: { lineItems: [1, 2, 3] },
    observers: {
      lines(this: NativeInstance, lines: number) {
        this.setData({
          lineItems: Array.from(
            {
              length: Number.isFinite(lines)
                ? Math.max(0, Math.floor(lines))
                : 0,
            },
            (_, i) => i + 1,
          ),
        });
      },
    },
  },
);
export const confirmDialog = native(
  `<view wx:if="{{open}}" class="mn-overlay"><view class="mn-backdrop" bindtap="onCancel"/><view class="mn-dialog"><view class="mn-row"><text class="mn-title">{{title}}</text><button class="mn-close" disabled="{{loading}}" bindtap="onCancel">×</button></view><text class="mn-muted">{{description}}</text><view class="mn-dialog-content"><slot/></view><view class="mn-dialog-footer"><button class="mn-button mn-variant-outline mn-confirm-cancel {{loading ? 'mn-disabled' : ''}}" disabled="{{loading}}" bindtap="onCancel">{{cancelLabel || 'Cancel'}}</button><button class="mn-button mn-confirm-accept mn-color-{{color}} {{loading || confirmDisabled ? 'mn-disabled' : ''}}" disabled="{{loading || confirmDisabled}}" loading="{{loading}}" bindtap="onConfirm">{{confirmLabel || (color === 'danger' ? 'Delete' : 'Confirm')}}</button></view></view></view>`,
  {
    ...overlayProperties,
    color: string("primary"),
    confirmLabel: string(),
    cancelLabel: string(),
    confirmDisabled: flag(),
  },
  {
    onCancel(this: NativeInstance) {
      if (this.data.loading) return;
      this.triggerEvent("cancel", {});
      this.triggerEvent("openchange", { open: false });
    },
    onConfirm(this: NativeInstance) {
      if (!this.data.loading && !this.data.confirmDisabled)
        this.triggerEvent("confirm", {});
    },
  },
);

export const requestConfirm = (options: ConfirmOptions) =>
  globalConfirmStore.request(options);
export const toastApi = globalToastStore.api;
const nativeFeedbackSubscriptions = new WeakMap<object, () => boolean>();
export const confirmProvider = native(
  `<view class="mn-confirm-provider"><slot/><view wx:if="{{current}}" class="mn-overlay"><view class="mn-backdrop" bindtap="onCancel"/><view class="mn-dialog"><text class="mn-title">{{current.title}}</text><text class="mn-muted">{{current.description}}</text><view class="mn-dialog-footer"><button class="mn-button mn-variant-outline mn-confirm-cancel" disabled="{{current.loading}}" bindtap="onCancel">{{current.cancelLabel || 'Cancel'}}</button><button class="mn-button mn-confirm-accept mn-color-{{current.color || 'primary'}}" disabled="{{current.loading || current.confirmDisabled}}" loading="{{current.loading}}" bindtap="onConfirm">{{current.confirmLabel || (current.color === 'danger' ? 'Delete' : 'Confirm')}}</button></view></view></view></view>`,
  {},
  {
    request(this: NativeInstance, options: ConfirmOptions) {
      return requestConfirm(options);
    },
    onConfirm(this: NativeInstance) {
      if (
        !this.data.current ||
        this.data.current.loading ||
        this.data.current.confirmDisabled
      )
        return;
      globalConfirmStore.settle(this.data.current.id, true);
    },
    onCancel(this: NativeInstance) {
      if (this.data.current && !this.data.current.loading)
        globalConfirmStore.settle(this.data.current.id, false);
    },
  },
  {
    data: { current: null },
    lifetimes: {
      attached(this: NativeInstance) {
        nativeFeedbackSubscriptions.set(
          this,
          globalConfirmStore.subscribe((entries) =>
            this.setData({ current: entries[0] ?? null }),
          ),
        );
      },
      detached(this: NativeInstance) {
        nativeFeedbackSubscriptions.get(this)?.();
        nativeFeedbackSubscriptions.delete(this);
        globalConfirmStore.clear();
      },
    },
  },
);
export const toastProvider = native(
  `<view class="mn-toast-provider"><slot/><view class="mn-toast-viewport mn-position-{{position}}"><view wx:for="{{entries}}" wx:key="id" class="mn-toast mn-status-{{item.color}}"><view wx:if="{{item.loading}}" class="mn-spinner"/><view><text class="mn-title">{{item.title}}</text><text class="mn-muted">{{item.description}}</text></view><button wx:if="{{item.actionLabel}}" class="mn-close mn-toast-action" data-id="{{item.id}}" bindtap="onAction">{{item.actionLabel}}</button><button wx:if="{{item.closable}}" class="mn-close" aria-label="{{closeLabel}}" data-id="{{item.id}}" bindtap="onDismiss">×</button></view></view></view>`,
  {
    position: string("top-right"),
    max: num(Number.MAX_SAFE_INTEGER),
    closeLabel: string("Close"),
  },
  {
    show(this: NativeInstance, options: ToastOptions) {
      return toastApi(options);
    },
    update(this: NativeInstance, id: string | number, options: ToastOptions) {
      toastApi.update(id, options);
    },
    dismiss(this: NativeInstance, id?: string | number) {
      toastApi.dismiss(id);
    },
    onDismiss(this: NativeInstance, e: NativeEvent) {
      toastApi.dismiss(e.currentTarget.dataset.id);
    },
    onAction(this: NativeInstance, e: NativeEvent) {
      globalToastStore.action(e.currentTarget.dataset.id);
    },
  },
  {
    data: { entries: [] },
    observers: {
      max(this: NativeInstance, max: number) {
        globalToastStore.setLimit(max);
      },
    },
    lifetimes: {
      attached(this: NativeInstance) {
        globalToastStore.setLimit(this.data.max);
        nativeFeedbackSubscriptions.set(
          this,
          globalToastStore.subscribe((entries) =>
            this.setData({
              entries: entries.map((e) => ({
                id: e.id,
                title: e.title ?? "",
                description: e.description ?? "",
                color: e.color ?? "info",
                loading: e.loading ?? false,
                closable: e.closable !== false,
                actionLabel: e.action?.label ?? "",
              })),
            }),
          ),
        );
      },
      detached(this: NativeInstance) {
        nativeFeedbackSubscriptions.get(this)?.();
        nativeFeedbackSubscriptions.delete(this);
        toastApi.dismiss();
      },
    },
  },
);
// Palette events cross native custom-component boundaries; applications can
// also call the provider's setPalette method from their own controls.
Object.assign(themeProvider.definition.methods, {
  onPaletteRequest(
    this: NativeInstance,
    event: WechatMiniprogram.CustomEvent<{ palette: string | null }>,
  ) {
    const palette = event.detail.palette;
    if (
      palette !== null &&
      !["editorial", "tech", "graphite", "cool"].includes(palette)
    )
      return;
    this.setData({ palette });
    updateTheme(this);
    this.triggerEvent("palettechange", { palette });
  },
});
themeProvider.template = themeProvider.template.replace(
  '<view class="mn-provider',
  '<view bindpaletterequest="onPaletteRequest" class="mn-provider',
);
export const gridItem = native(
  `<view class="mn-grid-item" style="grid-column:{{fullWidth ? '1 / -1' : columnSpan ? 'span ' + columnSpan : 'auto'}};grid-row:{{rowSpan ? 'span ' + rowSpan : 'auto'}};min-width:0"><slot/></view>`,
  { fullWidth: flag(), columnSpan: num(), rowSpan: num() },
);
// Native optional checked properties preserve controlled/uncontrolled ownership.
function syncNativeChecked(self: NativeInstance) {
  const controlled = typeof self.data.checked === "boolean";
  if (!self.data.checkedInitialized)
    self.setData({
      localChecked: !!self.data.defaultChecked,
      checkedInitialized: true,
    });
  self.setData({
    effectiveChecked: controlled ? self.data.checked : !!self.data.localChecked,
  });
}
for (const control of [checkbox, radio, toggle]) {
  Object.assign(control.definition.properties, {
    checked: { type: null, value: null },
    defaultChecked: flag(),
  });
  Object.assign(control.definition, {
    data: {
      localChecked: false,
      effectiveChecked: false,
      checkedInitialized: false,
    },
    observers: {
      "checked,defaultChecked": function (this: NativeInstance) {
        syncNativeChecked(this);
      },
    },
    lifetimes: {
      attached(this: NativeInstance) {
        syncNativeChecked(this);
      },
    },
  });
}
Object.assign(checkbox.definition.methods, {
  onToggle(this: NativeInstance) {
    if (blocked(this)) return;
    const checked = !this.data.effectiveChecked;
    if (typeof this.data.checked !== "boolean")
      this.setData({ localChecked: checked, effectiveChecked: checked });
    this.triggerEvent("change", { checked });
  },
});
checkbox.template = checkbox.template
  .replace(
    /{{([^}]+)}}/g,
    (_all, expression: string) =>
      `{{${expression.replace(/\bchecked\b/g, "effectiveChecked")}}}`,
  )
  .replace(
    "<view aria-label=",
    '<view role="checkbox" aria-checked="{{indeterminate ? \'mixed\' : effectiveChecked}}" aria-disabled="{{disabled}}" aria-label=',
  );
Object.assign(radio.definition.methods, {
  onChoose(this: NativeInstance) {
    if (blocked(this) || this.data.effectiveChecked) return;
    if (typeof this.data.checked !== "boolean")
      this.setData({ localChecked: true, effectiveChecked: true });
    this.triggerEvent("change", { value: this.data.value, checked: true });
  },
});
radio.template = radio.template
  .replace(
    /{{([^}]+)}}/g,
    (_all, expression: string) =>
      `{{${expression.replace(/\bchecked\b/g, "effectiveChecked")}}}`,
  )
  .replace(
    '<view class="mn-choice',
    '<view role="radio" aria-checked="{{effectiveChecked}}" aria-disabled="{{disabled}}" class="mn-choice',
  );
Object.assign(toggle.definition.methods, {
  onChange(
    this: NativeInstance,
    event: WechatMiniprogram.CustomEvent<{ value: boolean }>,
  ) {
    if (blocked(this)) return;
    const checked = event.detail.value;
    if (typeof this.data.checked !== "boolean") {
      this.setData({ localChecked: checked, effectiveChecked: checked });
    } else {
      // The platform switch has already changed its own checked state. First
      // acknowledge that state in the view data, then restore the owner's value
      // after rendering so equal old props cannot leave the native widget stale.
      this.setData({ effectiveChecked: checked }, () => {
        if (
          typeof this.data.checked === "boolean" &&
          this.data.effectiveChecked !== this.data.checked
        )
          this.setData({ effectiveChecked: this.data.checked });
      });
    }
    this.triggerEvent("change", { checked });
  },
});
toggle.template = `<switch class="mn-switch {{disabled || readOnly ? 'mn-disabled' : ''}}" role="switch" aria-checked="{{effectiveChecked}}" aria-disabled="{{disabled}}" checked="{{effectiveChecked}}" disabled="{{disabled || readOnly}}" name="{{name}}" color="{{color}}" catchchange="onChange"/>`;

enhanceNavigation({
  monthCalendar,
  pagination,
  menu,
  contextMenu,
  navTree,
  steps,
});

enhanceDisplay({ avatar, avatarGroup, badge, card, tag, progressIndicator });

enhanceLayout({ responsiveGrid, formLayout, splitLayout, appShell });

enhanceTable({ table, dataTable });

enhanceInteractions({ timePicker, pageTabs, popover });

enhanceAdvanced({
  modal,
  drawer,
  virtualList,
  upload,
  alert,
  box,
  commandDialog,
});

enhanceBasics({
  statCard,
  loadingState,
  textLink,
  input,
  divider,
  empty,
  iconButton,
  jsonField,
  radio,
  radioGroup,
  select,
  tabs,
  skeleton,
  skeletonText,
  tooltip,
  codeBlock,
  list,
  descriptionList,
  textarea,
  toggle,
});

enhanceFormContext(
  [formControl, formField],
  [
    input,
    textarea,
    numberInput,
    checkbox,
    radio,
    radioGroup,
    toggle,
    select,
    autoComplete,
    cascader,
    tagInput,
    jsonField,
    keyValueEditor,
    rating,
    ratingScale,
    timePicker,
    upload,
  ],
);
enhanceFeedback({ confirmProvider, toastProvider });

enhanceConfiguration(
  { configProvider, themeProvider, themeToggle, paletteToggle },
  [button, input, toggle, ...nativeControls],
);

annotateNativeApi({
  button,
  input,
  toggle,
  checkbox,
  radio,
  textarea,
  numberInput,
  rating,
  select,
  autoComplete,
  cascader,
  tagInput,
  jsonField,
  keyValueEditor,
  timePicker,
  monthCalendar,
  pagination,
  tabs,
  pageTabs,
  menu,
  navTree,
  steps,
  modal,
  drawer,
  confirm,
  popover,
  tooltip,
  toast,
  commandDialog,
  table,
  dataTable,
  virtualList,
  upload,
  avatar,
  avatarGroup,
  badge,
  card,
  progressIndicator,
  empty,
  skeleton,
  alert,
  divider,
  tag,
  themeToggle,
  iconButton,
  box,
  stack,
  responsiveGrid,
  splitLayout,
  page,
  appShell,
  formControl,
  formField,
  formLayout,
  loadingState,
  textLink,
  descriptionList,
  list,
  codeBlock,
  prose,
  htmlPreview,
  configProvider,
  themeProvider,
  contextMenu,
  paletteToggle,
  statCard,
  radioGroup,
  ratingScale,
  skeletonText,
  confirmDialog,
  confirmProvider,
  toastProvider,
  gridItem,
});
