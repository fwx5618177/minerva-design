// QuadrantTaskBoard of the native WeChat build: a task board on top of the
// native quadrant-chart. A 2 x 2 row of quadrant headers (badge, title,
// count and an add button) mirrors the matrix, the chart shows the tasks
// (tap selects, quadrantclick adds at the tapped position, draggable dots
// and the accessible "Move to …" buttons move them), a toolbar edits or
// deletes the selected task, a modal (name input + quadrant select) adds /
// edits and a danger confirm-dialog deletes.
//
// It composes other Minerva native components (usingComponents, written to
// its JSON by scripts/build.mjs). The canvas has no DOM overlays, so the
// headers and the actions live around the chart instead of on it. Every
// decision comes from the shared task functions of minerva-design/charts;
// the board stays controlled: `points` in, `pointschange { points }` out.
import {
  QUADRANT_CORNERS,
  applyQuadrantTaskDraft,
  canSaveQuadrantTask,
  editQuadrantTaskDraft,
  moveQuadrantTask,
  newQuadrantTaskDraft,
  quadrantCountText,
  quadrantGroups,
  quadrantLabels,
  quadrantTaskDeleteText,
  quadrantTaskLabels,
  removeQuadrantTask,
  selectionAfterRemove,
  type QuadrantCorner,
  type QuadrantPoint,
  type QuadrantRegions,
  type QuadrantTaskDraft,
  type QuadrantTaskGeometry,
  type QuadrantTaskLabels,
} from "@minerva/charts/canvas";
import { createTranslator, messages } from "@minerva/core";
import { localeOf, quadrantChart } from "./charts";
import type { NativeConfiguration } from "./configuration";

type Instance = WechatMiniprogram.Component.TrivialInstance;
interface ChartHandle {
  [method: string]: (...args: unknown[]) => unknown;
}

/** Minerva components of the template (paths of the built package) */
export const quadrantTaskBoardComponents = {
  "mn-quadrant-chart": "../quadrant-chart/index",
  "mn-icon-button": "../icon-button/index",
  "mn-button": "../button/index",
  "mn-modal": "../modal/index",
  "mn-input": "../input/index",
  "mn-select": "../select/index",
  "mn-confirm-dialog": "../confirm-dialog/index",
};

const optional = () => ({ type: null, value: null });
const unset = <T>(value: T | null | undefined | ""): T | undefined =>
  value === null || value === "" ? undefined : (value as T | undefined);
const kebab = (name: string) =>
  name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

// The chart properties, except `labels` (the texts of the board here, as on
// the web) and the ones the board decides
const {
  labels: _chartLabels,
  ...chartProperties
}: WechatMiniprogram.IAnyObject = quadrantChart.definition.properties;
/** Chart attributes the board computes (property name -> board data) */
const COMPUTED: Record<string, string> = {
  locale: "chartLocale",
  disableScroll: "scrollLocked",
  selectedIndex: "activeIndex",
  // the counts are in the headers of the board
  showCounts: "chartCounts",
};
const chartAttributes = Object.keys(chartProperties)
  .map((name) => `${kebab(name)}="{{${COMPUTED[name] ?? name}}}"`)
  .join(" ");

export const quadrantTaskBoardProperties = {
  ...chartProperties,
  /** Overrides of the texts of the buttons and dialogs */
  labels: optional(),
  /** Dots can be dragged to move a task (the web board moves them too) */
  draggable: { type: Boolean, value: true },
  /** Stops page scrolling over the chart; follows `draggable` when unset */
  disableScroll: optional(),
  /** Count after each quadrant title; `false` hides it */
  showCounts: optional(),
};

const STATE_TEMPLATE =
  `<view wx:if="{{active}}" class="mn-quadrant-task-board__actions mn-toolbar" role="toolbar" aria-label="{{texts.actions}}" style="display:flex;align-items:center;gap:8px">` +
  `<text class="mn-quadrant-task-board__active" style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600">{{active.label}}</text>` +
  `<mn-button class="mn-quadrant-task-board__edit" size="small" variant="outline" color="neutral" start-icon="✎" label="{{texts.edit}}" bind:click="onEdit"/>` +
  `<mn-button class="mn-quadrant-task-board__delete" size="small" variant="outline" color="danger" start-icon="✕" label="{{texts.delete}}" bind:click="onDelete"/>` +
  `</view>`;

const DIALOGS_TEMPLATE =
  `<mn-modal class="mn-quadrant-task-board__dialog" open="{{draftOpen}}" title="{{draftTitle}}" size="small" bind:openchange="onDraftOpenChange">` +
  `<view class="mn-quadrant-task-board__form" style="display:flex;flex-direction:column;gap:12px">` +
  `<view class="mn-quadrant-task-board__field" style="display:flex;flex-direction:column;gap:4px"><text>{{texts.name}}</text><mn-input class="mn-quadrant-task-board__name" value="{{draftLabel}}" placeholder="{{texts.name}}" required bind:change="onDraftLabel" bind:confirm="onDraftSave"/></view>` +
  `<view class="mn-quadrant-task-board__field" style="display:flex;flex-direction:column;gap:4px"><text>{{texts.quadrant}}</text><mn-select class="mn-quadrant-task-board__quadrant" value="{{draftQuadrant}}" options="{{quadrantOptions}}" aria-label="{{texts.quadrant}}" bind:change="onDraftQuadrant"/></view>` +
  `</view>` +
  `<view slot="footer" class="mn-dialog-footer mn-quadrant-task-board__footer" style="justify-content:flex-end">` +
  `<mn-button class="mn-quadrant-task-board__cancel" variant="outline" color="neutral" label="{{texts.cancel}}" bind:click="onDraftCancel"/>` +
  `<mn-button class="mn-quadrant-task-board__save" label="{{texts.save}}" disabled="{{!canSave}}" bind:click="onDraftSave"/>` +
  `</view>` +
  `</mn-modal>` +
  `<mn-confirm-dialog class="mn-quadrant-task-board__confirm" open="{{deleteOpen}}" title="{{texts.delete}}" description="{{deleteText}}" cancel-label="{{texts.cancel}}" confirm-label="{{confirmLabel}}" color="danger" bind:confirm="onDeleteConfirm" bind:openchange="onDeleteOpenChange"/>`;

export const quadrantTaskBoardTemplate =
  `<view class="mn-quadrant-task-board" style="display:flex;flex-direction:column;gap:8px">` +
  `<view class="mn-quadrant-task-board__headers" style="display:grid;grid-template-columns:1fr 1fr;gap:4px 12px">` +
  `<view wx:for="{{headers}}" wx:key="corner" class="mn-quadrant-task-board__header" role="group" aria-label="{{item.title}}" data-corner="{{item.corner}}" style="display:flex;align-items:center;gap:6px;min-width:0">` +
  `<text wx:if="{{item.badge}}" class="mn-quadrant-task-board__badge mn-muted">{{item.badge}}</text>` +
  `<text class="mn-quadrant-task-board__title" style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600">{{item.title}}</text>` +
  `<text wx:if="{{item.count}}" class="mn-quadrant-task-board__count mn-muted">{{item.count}}</text>` +
  `<mn-icon-button class="mn-quadrant-task-board__add" size="xsmall" variant="ghost" icon="+" label="{{item.addLabel}}" data-corner="{{item.corner}}" bind:click="onAdd"/>` +
  `</view>` +
  `</view>` +
  `<mn-quadrant-chart id="chart" class="mn-quadrant-task-board__chart" ${chartAttributes} bind:pointclick="onPointClick" bind:quadrantclick="onQuadrantClick" bind:pointdrag="onPointDrag" bind:pointdrop="onPointDrop" bind:hover="onHover" bind:zoom="onZoom" bind:layout="onLayout"/>` +
  STATE_TEMPLATE +
  DIALOGS_TEMPLATE +
  `</view>`;

const pointsOf = (self: Instance): QuadrantPoint[] =>
  (self.data.points as QuadrantPoint[] | null) ?? [];
const geometryOf = (self: Instance): QuadrantTaskGeometry => ({
  xDomain: unset(self.data.xDomain),
  yDomain: unset(self.data.yDomain),
  xSplit: unset(self.data.xSplit),
  ySplit: unset(self.data.ySplit),
  reverseX: self.data.reverseX,
});
const indexOf = (value: unknown): number | null =>
  typeof value === "number" && Number.isInteger(value) && value >= 0
    ? value
    : null;
/** The selected task: the `selectedIndex` property, else the board's own */
const activeOf = (self: Instance): number | null =>
  indexOf(self.data.selectedIndex) ?? indexOf(self.data.selection);

const configOf = (self: Instance): NativeConfiguration | undefined =>
  typeof self.getConfig === "function" ? self.getConfig() : undefined;
/** Localized text of the core messages in the board's locale */
const translate = (self: Instance, locale: string | undefined, key: string) => {
  const config = configOf(self);
  return createTranslator({
    messages: config?.messages ?? messages,
    language: locale ?? config?.locale.language ?? "en",
  })(key);
};

/** Recomputes the template data from the properties and the board state */
function sync(self: Instance, state: WechatMiniprogram.IAnyObject = {}) {
  const d = { ...self.data, ...state };
  const points = (d.points as QuadrantPoint[] | null) ?? [];
  const locale = localeOf(d);
  const texts: QuadrantTaskLabels = quadrantTaskLabels(
    locale,
    (d.labels as Partial<QuadrantTaskLabels> | null) ?? undefined,
  );
  const defaults = quadrantLabels(locale);
  const regions = (d.quadrants as QuadrantRegions | null) ?? {};
  const title = (corner: QuadrantCorner) =>
    regions[corner]?.label || defaults[corner];
  const groups = quadrantGroups({ points, ...geometryOf(self) });
  const draft = d.draft as QuadrantTaskDraft | null;
  const deleting = indexOf(d.deleting);
  const active =
    indexOf(d.selectedIndex) ?? indexOf(d.selection) ?? (null as number | null);
  self.setData({
    ...state,
    texts,
    headers: QUADRANT_CORNERS.map((corner) => ({
      corner,
      title: title(corner),
      badge: regions[corner]?.badge ?? "",
      count:
        d.showCounts === false
          ? ""
          : (quadrantCountText(true, groups[corner].points, locale) ?? ""),
      addLabel: `${texts.add} · ${title(corner)}`,
    })),
    quadrantOptions: QUADRANT_CORNERS.map((corner) => ({
      value: corner,
      label: title(corner),
    })),
    chartLocale: locale ?? "",
    chartCounts: false,
    scrollLocked:
      typeof d.disableScroll === "boolean" ? d.disableScroll : !!d.draggable,
    activeIndex: active !== null && points[active] ? active : null,
    active:
      active !== null && points[active]
        ? { index: active, label: points[active].label ?? "" }
        : null,
    draftOpen:
      draft !== null && (draft.index === null || !!points[draft.index]),
    draftTitle: draft?.index === null ? texts.add : texts.edit,
    draftLabel: draft?.label ?? "",
    draftQuadrant: draft?.quadrant ?? "topLeft",
    canSave: canSaveQuadrantTask(draft, points),
    deleteOpen: deleting !== null && !!points[deleting],
    deleteText: quadrantTaskDeleteText(
      texts,
      deleting === null ? undefined : points[deleting],
    ),
    confirmLabel: translate(self, locale, "confirm.delete"),
  });
}

const emitPoints = (self: Instance, points: QuadrantPoint[]) =>
  self.triggerEvent("pointschange", { points });

const chartOf = (self: Instance) =>
  self.selectComponent("#chart") as unknown as ChartHandle | null;
/** Instance methods of the chart, called on the inner quadrant-chart */
const CHART_METHODS = [
  "configure",
  "resize",
  "resetZoom",
  "getView",
  "setView",
  "getPlotRect",
  "toPixel",
  "fromPixel",
];

type Detail<T> = { detail: T };
interface TapEvent {
  currentTarget?: { dataset?: { corner?: string } };
}

export const quadrantTaskBoardMethods = {
  ...Object.fromEntries(
    CHART_METHODS.map((name) => [
      name,
      function (this: Instance, ...args: unknown[]) {
        return chartOf(this)?.[name]?.(...args) ?? null;
      },
    ]),
  ),
  onAdd(this: Instance, event: TapEvent) {
    const corner = event.currentTarget?.dataset?.corner as QuadrantCorner;
    if (!QUADRANT_CORNERS.includes(corner)) return;
    sync(this, { draft: newQuadrantTaskDraft(geometryOf(this), corner) });
  },
  onQuadrantClick(
    this: Instance,
    event: Detail<{ quadrant: QuadrantCorner; x: number; y: number }>,
  ) {
    const { quadrant, x, y } = event.detail;
    sync(this, {
      draft: newQuadrantTaskDraft(geometryOf(this), quadrant, { x, y }),
    });
  },
  onPointClick(
    this: Instance,
    event: Detail<{ point: QuadrantPoint; index: number }>,
  ) {
    sync(this, { selection: event.detail.index });
    this.triggerEvent("pointclick", event.detail);
  },
  onPointDrop(
    this: Instance,
    event: Detail<{ index: number; target: { x: number; y: number } }>,
  ) {
    const { index, target } = event.detail;
    const points = pointsOf(this);
    if (!points[index]) return;
    emitPoints(this, moveQuadrantTask(points, index, target));
    sync(this, { selection: index });
  },
  onPointDrag(this: Instance, event: Detail<unknown>) {
    this.triggerEvent("pointdrag", event.detail);
  },
  onHover(this: Instance, event: Detail<unknown>) {
    this.triggerEvent("hover", event.detail);
  },
  onZoom(this: Instance, event: Detail<unknown>) {
    this.triggerEvent("zoom", event.detail);
  },
  onLayout(this: Instance, event: Detail<unknown>) {
    this.triggerEvent("layout", event.detail);
  },
  onEdit(this: Instance) {
    const index = activeOf(this);
    if (index === null) return;
    const draft = editQuadrantTaskDraft(
      geometryOf(this),
      pointsOf(this),
      index,
    );
    if (draft) sync(this, { draft });
  },
  onDelete(this: Instance) {
    const index = activeOf(this);
    if (index !== null && pointsOf(this)[index])
      sync(this, { deleting: index });
  },
  onDraftLabel(this: Instance, event: Detail<{ value: string }>) {
    const draft = this.data.draft as QuadrantTaskDraft | null;
    if (draft)
      sync(this, { draft: { ...draft, label: String(event.detail.value) } });
  },
  onDraftQuadrant(this: Instance, event: Detail<{ value: string }>) {
    const draft = this.data.draft as QuadrantTaskDraft | null;
    const quadrant = event.detail.value as QuadrantCorner;
    if (draft && QUADRANT_CORNERS.includes(quadrant))
      sync(this, { draft: { ...draft, quadrant } });
  },
  onDraftCancel(this: Instance) {
    sync(this, { draft: null });
  },
  onDraftOpenChange(this: Instance, event: Detail<{ open: boolean }>) {
    if (!event.detail.open) sync(this, { draft: null });
  },
  onDraftSave(this: Instance) {
    const saved = applyQuadrantTaskDraft(
      geometryOf(this),
      pointsOf(this),
      this.data.draft as QuadrantTaskDraft | null,
    );
    if (!saved) return;
    emitPoints(this, saved.points);
    sync(this, { selection: saved.index, draft: null });
  },
  onDeleteConfirm(this: Instance) {
    const index = indexOf(this.data.deleting);
    const points = pointsOf(this);
    if (index !== null && points[index]) {
      emitPoints(this, removeQuadrantTask(points, index));
      sync(this, {
        selection: selectionAfterRemove(indexOf(this.data.selection), index),
        deleting: null,
      });
      return;
    }
    sync(this, { deleting: null });
  },
  onDeleteOpenChange(this: Instance, event: Detail<{ open: boolean }>) {
    if (!event.detail.open) sync(this, { deleting: null });
  },
};

export const quadrantTaskBoardExtra = {
  data: {
    /** Add / edit dialog content (`null`: closed) */
    draft: null,
    /** Index of the task whose deletion is being confirmed */
    deleting: null,
    /** Task selected by a tap, a save or a move */
    selection: null,
    texts: quadrantTaskLabels("en"),
    headers: [],
    quadrantOptions: [],
    chartLocale: "",
    chartCounts: false,
    scrollLocked: true,
    activeIndex: null,
    active: null,
    draftOpen: false,
    draftTitle: "",
    draftLabel: "",
    draftQuadrant: "topLeft",
    canSave: false,
    deleteOpen: false,
    deleteText: "",
    confirmLabel: "Delete",
  },
  observers: {
    "points,labels,locale,localeLanguage,quadrants,xDomain,yDomain,xSplit,ySplit,reverseX,showCounts,selectedIndex,draggable,disableScroll":
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
