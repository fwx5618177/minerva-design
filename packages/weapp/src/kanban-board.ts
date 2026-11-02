// KanbanBoard / KanbanColumn of the native WeChat build: a region around a
// scroll-view (scroll-x) laying out equal-width status columns; each column
// has an accent dot, a title, a count badge, an actions slot, a role=list
// body (default slot), translated empty text and a footer slot.
import { kanbanAccent, kanbanCount, kanbanLength } from "@minerva/core";
import { nativeTranslate } from "./configuration";

type Instance = Pick<
  WechatMiniprogram.Component.TrivialInstance,
  "data" | "setData"
>;
const flag = (value = false) => ({ type: Boolean, value });
const text = (value = "") => ({ type: String, value });
/** A length property: a number is pixels, a string any CSS length */
const length = () => ({
  type: null,
  optionalTypes: [Number, String],
  value: null,
});
const css = (entries: Record<string, string | undefined>) =>
  Object.entries(entries)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}:${value}`)
    .join(";");

function syncBoard(self: Instance) {
  self.setData({
    boardStyle: css({
      "--kanban-column-width": kanbanLength(self.data.columnWidth),
      "--kanban-gap": kanbanLength(self.data.gap),
    }),
    scrollStyle: css({
      height: kanbanLength(self.data.height),
      "max-height": kanbanLength(self.data.maxHeight),
    }),
    boardLabel: self.data.ariaLabel || nativeTranslate(self, "kanban.label"),
  });
}

function syncColumn(self: Instance) {
  const count = kanbanCount(self.data.count);
  const { scheme, custom } = kanbanAccent(self.data.color);
  const title: string = self.data.title;
  self.setData({
    shown: count ?? -1,
    scheme: scheme ?? "",
    hasAccent: !!(scheme || custom),
    accentStyle: custom ? `--kanban-column-color:${custom}` : "",
    columnLabel:
      self.data.ariaLabel ||
      (title && count !== undefined
        ? nativeTranslate(self, "kanban.columnLabel", { title, count })
        : title),
    emptyText: self.data.empty || nativeTranslate(self, "kanban.empty"),
  });
}

export const kanbanBoardTemplate = `<view class="mn-kanban-board {{fill ? 'mn-fill' : ''}}" role="region" aria-label="{{boardLabel}}" style="{{boardStyle}}"><scroll-view scroll-x enable-flex class="mn-kanban-board__scroll" style="{{scrollStyle}}"><view class="mn-kanban-board__track"><slot/></view></scroll-view></view>`;

export const kanbanBoardProperties = {
  columnWidth: length(),
  fill: flag(),
  gap: length(),
  height: length(),
  maxHeight: length(),
  ariaLabel: text(),
};

export const kanbanBoardExtra = {
  data: { boardStyle: "", scrollStyle: "", boardLabel: "" },
  observers: {
    "columnWidth,gap,height,maxHeight,ariaLabel,localeLanguage": function (
      this: Instance,
    ) {
      syncBoard(this);
    },
  },
  lifetimes: {
    attached(this: Instance) {
      syncBoard(this);
    },
  },
};

export const kanbanColumnTemplate = `<view class="mn-kanban-column {{scheme ? 'mn-color-' + scheme : ''}}" role="group" aria-label="{{columnLabel}}" style="{{accentStyle}}"><view class="mn-kanban-column__header"><view wx:if="{{hasAccent}}" class="mn-kanban-column__indicator" aria-hidden="true"></view><view class="mn-kanban-column__title"><text wx:if="{{title}}">{{title}}</text><slot name="title"/></view><view wx:if="{{shown >= 0}}" class="mn-kanban-column__count" aria-hidden="{{columnLabel ? 'true' : 'false'}}"><text>{{shown}}</text></view><view class="mn-kanban-column__actions"><slot name="actions"/></view></view><view wx:if="{{description}}" class="mn-kanban-column__description"><text>{{description}}</text></view><view wx:if="{{shown !== 0}}" class="mn-kanban-column__list" role="list"><slot/></view><view wx:else class="mn-kanban-column__empty"><text>{{emptyText}}</text></view><view class="mn-kanban-column__footer"><slot name="footer"/></view></view>`;

export const kanbanColumnProperties = {
  title: text(),
  count: { type: null, optionalTypes: [Number, String], value: null },
  color: text(),
  description: text(),
  empty: text(),
  ariaLabel: text(),
};

export const kanbanColumnExtra = {
  data: {
    shown: -1,
    scheme: "",
    hasAccent: false,
    accentStyle: "",
    columnLabel: "",
    emptyText: "",
  },
  observers: {
    "title,count,color,empty,ariaLabel,localeLanguage": function (
      this: Instance,
    ) {
      syncColumn(this);
    },
  },
  lifetimes: {
    attached(this: Instance) {
      syncColumn(this);
    },
  },
};
