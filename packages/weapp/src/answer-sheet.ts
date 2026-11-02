// AnswerSheet of the native WeChat build: numbered question pills grouped by
// section (an untitled section first), each with a status and an optional
// flag; the current question is marked aria-current="step". Tap selects.
// layout="scroll" puts each section in a horizontal scroll-view whose
// scroll-left centres the current pill (measured with createSelectorQuery).
import {
  answerSheetLegend,
  answerSheetSections,
  answerSheetSummary,
} from "@minerva/core";
import { nativeTranslate } from "./configuration";

type Instance = Pick<
  WechatMiniprogram.Component.TrivialInstance,
  "data" | "setData" | "triggerEvent" | "createSelectorQuery"
>;
type Event = WechatMiniprogram.CustomEvent<{ key: string }>;
interface AnswerSheetItem {
  key: string;
  label?: string;
  status?: string;
  flagged?: boolean;
  disabled?: boolean;
  group?: string;
}
export interface AnswerSheetConfig {
  getItemLabel?: (item: AnswerSheetItem, index: number) => string;
}

const configs = new WeakMap<Instance, AnswerSheetConfig>();
/** Last centred `layout:key` and the actual scroll offset of each row */
const scrollState = new WeakMap<
  Instance,
  { revealed: string; offsets: number[] }
>();
const stateOf = (self: Instance) => {
  let state = scrollState.get(self);
  if (!state) scrollState.set(self, (state = { revealed: "", offsets: [] }));
  return state;
};
const blocked = (self: Instance) => self.data.disabled || self.data.readOnly;
const flag = (value = false) => ({ type: Boolean, value });
const text = (value = "") => ({ type: String, value });

function sync(self: Instance) {
  if (!self.data.initialized) {
    self.setData({ initialized: true, localValue: self.data.defaultValue });
  }
  const items = (
    Array.isArray(self.data.items) ? self.data.items : []
  ) as AnswerSheetItem[];
  const groups = Array.isArray(self.data.groups) ? self.data.groups : [];
  const current: string = self.data.value ?? self.data.localValue;
  const config = configs.get(self);
  const disabled = blocked(self);
  const columns =
    self.data.layout !== "scroll" && self.data.columns > 0
      ? Math.floor(self.data.columns)
      : 0;
  const sections = answerSheetSections(items, groups).map(
    (section, sectionIndex) => ({
      key: section.key || "-",
      title: section.title ?? "",
      titleId: section.title ? `mn-answer-sheet-group-${sectionIndex}` : "",
      pills: section.entries.map(({ item, index, status, label }) => ({
        key: item.key,
        index,
        label,
        status,
        flagged: !!item.flagged,
        current: item.key === current,
        disabled: disabled || !!item.disabled,
        ariaLabel:
          config?.getItemLabel?.(item, index) ??
          nativeTranslate(
            self,
            item.flagged ? "answerSheet.itemFlagged" : "answerSheet.item",
            {
              number: item.label ?? index + 1,
              status: nativeTranslate(self, `answerSheet.status.${status}`),
            },
          ),
      })),
    }),
  );
  self.setData({
    current,
    sections,
    gridStyle: columns
      ? `grid-template-columns: repeat(${columns}, minmax(0, 1fr))`
      : "",
    columnsClass: columns ? "mn-columns" : "",
    summary: nativeTranslate(self, "answerSheet.summary", {
      ...answerSheetSummary(items),
    }),
    legend: self.data.showLegend
      ? answerSheetLegend(items).map((entry) => ({
          key: entry,
          label: nativeTranslate(self, `answerSheet.legend.${entry}`),
        }))
      : [],
    labels: { nav: nativeTranslate(self, "answerSheet.label") },
  });
  revealCurrent(self);
}

type Box = { left: number; width: number };
const isBox = (rect: unknown): rect is Box =>
  !!rect && !Array.isArray(rect) && typeof (rect as Box).width === "number";

/** Centres the current pill in its scroll row (scroll layout only) */
function revealCurrent(self: Instance) {
  const state = stateOf(self);
  const current: string = self.data.current;
  const sections = self.data.sections as {
    pills: { key: string; index: number }[];
  }[];
  const row = sections.findIndex((section) =>
    section.pills.some((pill) => pill.key === current),
  );
  const target = `${self.data.layout}:${current}`;
  if (self.data.layout !== "scroll" || row < 0) {
    state.revealed = target;
    return;
  }
  if (state.revealed === target) return;
  const index = sections[row]!.pills.find(
    (pill) => pill.key === current,
  )!.index;
  const boxes: (Box | null)[] = [];
  const query = self.createSelectorQuery();
  [
    `#mn-answer-sheet-row-${row}`,
    `#mn-answer-sheet-grid-${row}`,
    `#mn-answer-sheet-q-${index}`,
  ].forEach((selector, at) =>
    query.select(selector).boundingClientRect((rect) => {
      boxes[at] = isBox(rect) ? rect : null;
      if (at < 2) return;
      const [box, content, pill] = boxes;
      // not laid out yet: retry on the next sync / ready
      if (!box?.width || !content || !pill) return;
      if (self.data.current !== current) return;
      state.revealed = target;
      const max = Math.max(0, content.width - box.width);
      const center = pill.left - content.left + pill.width / 2;
      const left = Math.min(
        max,
        Math.max(0, Math.round(center - box.width / 2)),
      );
      const scroll = self.data.scroll as { row: number; left: number };
      const same = scroll.row === row && Math.round(scroll.left) === left;

      if (same && Math.abs((state.offsets[row] ?? left) - left) < 1) return;
      // the same scroll-left again (the user scrolled since) must still apply
      self.setData({
        scroll: {
          row,
          left: same && scroll.left === left ? left + 0.01 : left,
        },
      });
    }),
  );
  query.exec();
}

const pillsTemplate = `<view wx:for="{{section.pills}}" wx:key="key" id="mn-answer-sheet-q-{{item.index}}" class="mn-answer-sheet__item mn-status-{{item.status}} {{item.current ? 'mn-current' : ''}} {{item.flagged ? 'mn-flagged' : ''}} {{item.disabled ? 'mn-disabled' : ''}}" role="button" aria-current="{{item.current ? 'step' : ''}}" aria-disabled="{{item.disabled}}" aria-label="{{item.ariaLabel}}" data-key="{{item.key}}" bindtap="onChoose"><text aria-hidden="true">{{item.label}}</text><view wx:if="{{item.flagged}}" class="mn-answer-sheet__flag" aria-hidden="true"></view></view>`;

export const answerSheetTemplate = `<view class="mn-answer-sheet mn-size-{{size}} mn-layout-{{layout}} {{disabled || readOnly ? 'mn-disabled' : ''}}" role="navigation" aria-label="{{ariaLabel || labels.nav}}"><text wx:if="{{showSummary}}" class="mn-answer-sheet__summary">{{summary}}</text><view wx:for="{{sections}}" wx:for-item="section" wx:for-index="sectionIndex" wx:key="key" class="mn-answer-sheet__section" role="{{section.titleId ? 'group' : ''}}" aria-labelledby="{{section.titleId}}"><text wx:if="{{section.title}}" id="{{section.titleId}}" class="mn-answer-sheet__title">{{section.title}}</text><scroll-view wx:if="{{layout === 'scroll'}}" id="mn-answer-sheet-row-{{sectionIndex}}" class="mn-answer-sheet__scroller" scroll-x="{{true}}" show-scrollbar="{{false}}" enhanced="{{true}}" scroll-left="{{scroll.row === sectionIndex ? scroll.left : 0}}" data-row="{{sectionIndex}}" bindscroll="onRowScroll"><view id="mn-answer-sheet-grid-{{sectionIndex}}" class="mn-answer-sheet__grid">${pillsTemplate}</view></scroll-view><view wx:else class="mn-answer-sheet__grid {{columnsClass}}" style="{{gridStyle}}">${pillsTemplate}</view></view><view wx:if="{{legend.length}}" class="mn-answer-sheet__legend" role="list"><view wx:for="{{legend}}" wx:key="key" class="mn-answer-sheet__legend-item" role="listitem"><view class="mn-answer-sheet__swatch mn-status-{{item.key}}" aria-hidden="true"></view><text>{{item.label}}</text></view></view></view>`;

export const answerSheetProperties = {
  items: { type: Array, value: [] },
  groups: { type: Array, value: [] },
  value: { type: null, value: null },
  defaultValue: text(),
  size: text("medium"),
  layout: text("wrap"),
  columns: { type: Number, value: 0 },
  showLegend: flag(),
  showSummary: flag(),
  disabled: flag(),
  readOnly: flag(),
  ariaLabel: text(),
};

export const answerSheetMethods = {
  configure(this: Instance, config: AnswerSheetConfig) {
    configs.set(this, config);
    sync(this);
  },
  onChoose(this: Instance, event: Event) {
    const key = String(event.currentTarget.dataset.key ?? "");
    const item = (this.data.items as AnswerSheetItem[]).find(
      (entry) => entry.key === key,
    );
    if (!item || item.disabled || blocked(this) || key === this.data.current)
      return;
    if (this.data.value === null) this.setData({ localValue: key });
    this.triggerEvent("change", { value: key });
    sync(this);
  },
  onRowScroll(
    this: Instance,
    event: WechatMiniprogram.ScrollViewScroll & {
      currentTarget: { dataset: { row?: number } };
    },
  ) {
    const row = Number(event.currentTarget.dataset.row ?? 0);
    const left = event.detail?.scrollLeft;
    if (typeof left === "number") stateOf(this).offsets[row] = left;
  },
};

export const answerSheetExtra = {
  data: {
    initialized: false,
    localValue: "",
    current: "",
    sections: [],
    gridStyle: "",
    columnsClass: "",
    summary: "",
    legend: [],
    labels: {},
    scroll: { row: -1, left: 0 },
  },
  observers: {
    "items,groups,value,defaultValue,layout,columns,showLegend,disabled,readOnly,localeLanguage":
      function (this: Instance) {
        sync(this);
      },
  },
  lifetimes: {
    attached(this: Instance) {
      sync(this);
    },
    ready(this: Instance) {
      revealCurrent(this);
    },
  },
};
