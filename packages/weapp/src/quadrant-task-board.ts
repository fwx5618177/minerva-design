// QuadrantTaskBoard of the native WeChat build: a task board on top of the
// native quadrant-chart. A 2 x 2 row of quadrant headers (badge, title,
// count and an add button) mirrors the matrix, the chart shows the tasks
// (tap selects, quadrantclick adds at the tapped position, draggable dots
// and the accessible "Move to …" buttons move them), a toolbar edits or
// deletes the selected task. Adding, editing and deleting happen in an
// inline panel (popover style, with a caret) inserted right below what
// opened it: the headers (+ or a tap on an empty quadrant) or the toolbar.
//
// It composes other Minerva native components (usingComponents, written to
// its JSON by scripts/build.mjs). The canvas has no DOM overlays, so the
// headers and the actions live around the chart instead of on it. Every
// decision comes from the shared task functions of minerva-design/charts;
// the board stays controlled: `points` in, `pointschange { points }` out.
import {
  QUADRANT_CORNERS,
  quadrantTaskIconUri,
  applyQuadrantTaskDraft,
  canSaveQuadrantTask,
  editQuadrantTaskDraft,
  moveQuadrantTask,
  newQuadrantTaskDraft,
  quadrantCountText,
  quadrantGroups,
  quadrantLabels,
  quadrantTaskColor,
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
import { chartTheme, localeOf, quadrantChart } from "./charts";
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
  /** Overrides of the texts of the buttons and panels */
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

/**
 * The inline add / edit / delete panel shown when `panel.at` is `at` (the
 * markup is written twice: below the headers and below the toolbar). The
 * caret is a rotated square clipped by its box, at the column of the
 * quadrant or at the pressed button (`panel.caret`).
 */
const panelTemplate = (at: "headers" | "actions") =>
  `<view wx:if="{{panel && panel.at === '${at}'}}" class="mn-quadrant-task-board__panel mn-quadrant-task-board__panel--{{panel.kind}} mn-quadrant-task-board__panel--caret-{{panel.caret}}" data-quadrant-task-panel="{{panel.kind}}" role="{{panel.kind === 'delete' ? 'alertdialog' : 'dialog'}}" aria-role="{{panel.kind === 'delete' ? 'alertdialog' : 'dialog'}}" aria-label="{{panel.title}}">` +
  `<view class="mn-quadrant-task-board__caret" aria-hidden="true"><view class="mn-quadrant-task-board__caret-tip"/></view>` +
  `<text class="mn-quadrant-task-board__panel-title">{{panel.title}}</text>` +
  `<block wx:if="{{panel.kind !== 'delete'}}">` +
  `<view class="mn-quadrant-task-board__field"><text class="mn-quadrant-task-board__label">{{texts.name}}</text>` +
  `<input class="mn-input mn-quadrant-task-board__name" value="{{draftLabel}}" placeholder="{{texts.name}}" aria-label="{{texts.name}}" aria-required="true" focus="{{panelFocus}}" bindinput="onDraftLabel" bindconfirm="onDraftSave" bindblur="onDraftBlur"/></view>` +
  `<view class="mn-quadrant-task-board__field"><text class="mn-quadrant-task-board__label">{{texts.quadrant}}</text>` +
  `<view class="mn-quadrant-task-board__quadrant-grid" role="radiogroup" aria-role="radiogroup" aria-label="{{texts.quadrant}}">` +
  `<view wx:for="{{chips}}" wx:key="corner" class="mn-quadrant-task-board__chip {{item.checked ? 'mn-quadrant-task-board__chip--checked' : ''}}" role="radio" aria-role="radio" aria-checked="{{item.checked}}" aria-label="{{item.title}}" data-corner="{{item.corner}}" bindtap="onDraftQuadrant">` +
  `<view class="mn-quadrant-task-board__swatch" style="background:{{item.color}}" aria-hidden="true"/>` +
  `<text class="mn-quadrant-task-board__chip-name">{{item.title}}</text>` +
  `</view>` +
  `</view>` +
  `</view>` +
  `</block>` +
  `<text wx:else class="mn-quadrant-task-board__panel-text">{{deleteText}}</text>` +
  `<view class="mn-quadrant-task-board__footer">` +
  `<mn-button class="mn-quadrant-task-board__cancel" size="small" variant="ghost" color="neutral" label="{{texts.cancel}}" bind:click="onPanelCancel"/>` +
  `<mn-button wx:if="{{panel.kind !== 'delete'}}" class="mn-quadrant-task-board__save" size="small" label="{{texts.save}}" disabled="{{!canSave}}" bind:click="onDraftSave"/>` +
  `<mn-button wx:else class="mn-quadrant-task-board__confirm" size="small" color="danger" label="{{texts.confirmDelete}}" bind:click="onDeleteConfirm"/>` +
  `</view>` +
  `</view>`;

export const quadrantTaskBoardTemplate =
  `<view class="mn-quadrant-task-board" style="display:flex;flex-direction:column;gap:8px">` +
  `<view class="mn-quadrant-task-board__headers mn-quadrant-task-board__quadrants">` +
  `<view wx:for="{{headers}}" wx:key="corner" class="mn-quadrant-task-board__header" role="group" aria-label="{{item.title}}" data-corner="{{item.corner}}">` +
  `<text wx:if="{{item.badge}}" class="mn-quadrant-task-board__badge">{{item.badge}}</text>` +
  `<text class="mn-quadrant-task-board__title">{{item.title}}</text>` +
  `<text wx:if="{{item.count}}" class="mn-quadrant-task-board__count">{{item.count}}</text>` +
  `<mn-icon-button class="mn-quadrant-task-board__add" size="xsmall" variant="ghost" label="{{item.addLabel}}" data-corner="{{item.corner}}" bind:click="onAdd"><image class="mn-quadrant-task-board__add-icon" src="{{addIcon}}" mode="aspectFit" aria-hidden="true"/></mn-icon-button>` +
  `</view>` +
  `</view>` +
  panelTemplate("headers") +
  `<mn-quadrant-chart id="chart" class="mn-quadrant-task-board__chart" ${chartAttributes} bind:pointclick="onPointClick" bind:quadrantclick="onQuadrantClick" bind:pointdrag="onPointDrag" bind:pointdrop="onPointDrop" bind:hover="onHover" bind:zoom="onZoom" bind:layout="onLayout"/>` +
  STATE_TEMPLATE +
  panelTemplate("actions") +
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

/**
 * The plus icon of the add buttons as an SVG data URI (an `<image>` does
 * not inherit `currentColor`: it is stroked with the theme's text color)
 */
const addIconOf = (self: Instance) => {
  const color = (
    chartTheme(configOf(self)).variables?.["--text-color"] ?? "#111827"
  ).replace(/["<>&]/g, "");
  return quadrantTaskIconUri("add", color);
};

/** Where the inline panel is: below the headers or the toolbar, and its caret */
interface PanelAnchor {
  at: "headers" | "actions";
  caret: "start" | "end" | "edit" | "delete";
}
/** Caret of a panel opened from the headers: the column of the quadrant */
const headerAnchor = (corner: QuadrantCorner): PanelAnchor => ({
  at: "headers",
  caret: corner === "topLeft" || corner === "bottomLeft" ? "start" : "end",
});

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
  const anchor = d.anchor as PanelAnchor | null;
  const active =
    indexOf(d.selectedIndex) ?? indexOf(d.selection) ?? (null as number | null);
  const kind =
    draft !== null && (draft.index === null || !!points[draft.index])
      ? draft.index === null
        ? "add"
        : "edit"
      : deleting !== null && points[deleting]
        ? "delete"
        : null;
  self.setData({
    ...state,
    texts,
    addIcon: addIconOf(self),
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
    chartLocale: locale ?? "",
    chartCounts: false,
    scrollLocked:
      typeof d.disableScroll === "boolean" ? d.disableScroll : !!d.draggable,
    activeIndex: active !== null && points[active] ? active : null,
    active:
      active !== null && points[active]
        ? { index: active, label: points[active].label ?? "" }
        : null,
    panel:
      kind && anchor
        ? {
            kind,
            at: anchor.at,
            caret: anchor.caret,
            title: texts[kind],
          }
        : null,
    chips: QUADRANT_CORNERS.map((corner) => ({
      corner,
      title: title(corner),
      color: quadrantTaskColor(regions, corner),
      checked: draft?.quadrant === corner,
    })),
    draftLabel: draft?.label ?? "",
    canSave: canSaveQuadrantTask(draft, points),
    deleteText: quadrantTaskDeleteText(
      texts,
      deleting === null ? undefined : points[deleting],
    ),
  });
}

const emitPoints = (self: Instance, points: QuadrantPoint[]) =>
  self.triggerEvent("pointschange", { points });

/** State of a closed panel */
const CLOSED = { draft: null, deleting: null, anchor: null, panelFocus: false };

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
    sync(this, {
      ...CLOSED,
      draft: newQuadrantTaskDraft(geometryOf(this), corner),
      anchor: headerAnchor(corner),
      panelFocus: true,
    });
  },
  onQuadrantClick(
    this: Instance,
    event: Detail<{ quadrant: QuadrantCorner; x: number; y: number }>,
  ) {
    const { quadrant, x, y } = event.detail;
    sync(this, {
      ...CLOSED,
      draft: newQuadrantTaskDraft(geometryOf(this), quadrant, { x, y }),
      anchor: headerAnchor(quadrant),
      panelFocus: true,
    });
  },
  onPointClick(
    this: Instance,
    event: Detail<{ point: QuadrantPoint; index: number }>,
  ) {
    sync(this, { ...CLOSED, selection: event.detail.index });
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
    sync(this, { ...CLOSED, selection: index });
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
    if (draft)
      sync(this, {
        ...CLOSED,
        draft,
        anchor: { at: "actions", caret: "edit" },
        panelFocus: true,
      });
  },
  onDelete(this: Instance) {
    const index = activeOf(this);
    if (index !== null && pointsOf(this)[index])
      sync(this, {
        ...CLOSED,
        deleting: index,
        anchor: { at: "actions", caret: "delete" },
      });
  },
  onDraftLabel(this: Instance, event: Detail<{ value: string }>) {
    const draft = this.data.draft as QuadrantTaskDraft | null;
    if (draft)
      sync(this, { draft: { ...draft, label: String(event.detail.value) } });
  },
  onDraftBlur(this: Instance) {
    // lets the next open focus the field again
    if (this.data.panelFocus) this.setData({ panelFocus: false });
  },
  onDraftQuadrant(this: Instance, event: TapEvent) {
    const draft = this.data.draft as QuadrantTaskDraft | null;
    const quadrant = event.currentTarget?.dataset?.corner as QuadrantCorner;
    if (draft && QUADRANT_CORNERS.includes(quadrant))
      sync(this, { draft: { ...draft, quadrant } });
  },
  onPanelCancel(this: Instance) {
    sync(this, CLOSED);
  },
  onDraftSave(this: Instance) {
    const saved = applyQuadrantTaskDraft(
      geometryOf(this),
      pointsOf(this),
      this.data.draft as QuadrantTaskDraft | null,
    );
    if (!saved) return;
    emitPoints(this, saved.points);
    sync(this, { ...CLOSED, selection: saved.index });
  },
  onDeleteConfirm(this: Instance) {
    const index = indexOf(this.data.deleting);
    const points = pointsOf(this);
    if (index !== null && points[index]) {
      emitPoints(this, removeQuadrantTask(points, index));
      sync(this, {
        ...CLOSED,
        selection: selectionAfterRemove(indexOf(this.data.selection), index),
      });
      return;
    }
    sync(this, CLOSED);
  },
};

export const quadrantTaskBoardExtra = {
  data: {
    /** Add / edit panel content (`null`: closed) */
    draft: null,
    /** Index of the task whose deletion is being confirmed */
    deleting: null,
    /** Where the open panel is (`{ at, caret }`) */
    anchor: null,
    /** Task selected by a tap, a save or a move */
    selection: null,
    texts: quadrantTaskLabels("en"),
    addIcon: "",
    headers: [],
    chartLocale: "",
    chartCounts: false,
    scrollLocked: true,
    activeIndex: null,
    active: null,
    /** The open inline panel (`{ kind, at, caret, title }`), else `null` */
    panel: null,
    panelFocus: false,
    chips: [],
    draftLabel: "",
    canSave: false,
    deleteText: "",
  },
  observers: {
    "points,labels,locale,localeLanguage,quadrants,xDomain,yDomain,xSplit,ySplit,reverseX,showCounts,selectedIndex,draggable,disableScroll,inheritedTheme,inheritedMode,inheritedPalette":
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
