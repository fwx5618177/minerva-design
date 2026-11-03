import { css, html, nothing, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "@react-styles/components/QuadrantTaskBoard/quadrantTaskBoard.module.scss?inline";
import {
  QUADRANT_CORNERS,
  QUADRANT_TASK_ICONS,
  applyQuadrantTaskDraft,
  canSaveQuadrantTask,
  editQuadrantTaskDraft,
  moveQuadrantTask,
  newQuadrantTaskDraft,
  placeQuadrantTaskPanel,
  quadrantCountText,
  quadrantGroups,
  quadrantLabels,
  quadrantTaskColor,
  quadrantTaskDeleteText,
  quadrantTaskLabels,
  removeQuadrantTask,
  selectionAfterRemove,
  type ChartOptions,
  type QuadrantAxisLabels,
  type QuadrantCorner,
  type QuadrantPoint,
  type QuadrantRegions,
  type QuadrantTaskBox,
  type QuadrantTaskDraft,
  type QuadrantTaskGeometry,
  type QuadrantTaskLabels,
} from "minerva-design/charts/core";
import { MinervaButton } from "../button/button";
import { MinervaQuadrantChart, QUADRANT_HEADER_SLOTS } from "../chart/charts";
import { MinervaIconButton } from "../icon-button/icon-button";
import { MinervaInput } from "../input/input";
import { AriaController } from "../../internal/aria";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { sharedStyles } from "../../internal/styles";

export type { QuadrantTaskLabels };

/** Detail of `minerva-points-change` */
export interface QuadrantTaskBoardChangeDetail {
  /** The next list of tasks (pass it back as `points`) */
  points: QuadrantPoint[];
}

/**
 * Events of the inner chart and of the fields of the panel that the board
 * consumes: they stop at its shadow root (the board fires
 * `minerva-points-change`). `minerva-hover`, `minerva-point-click`,
 * `minerva-point-drag`, `minerva-zoom` and `minerva-renderer-change` of the
 * chart go through.
 */
const INTERNAL_EVENTS = [
  "minerva-input",
  "minerva-change",
  "minerva-clear",
  "minerva-point-drop",
  "minerva-quadrant-click",
  "minerva-point-double-click",
  "input",
  "change",
];

const stop = (event: Event) => event.stopPropagation();

/** The inline panel: the add / edit form, or the delete confirmation */
type Panel =
  | { kind: "draft"; draft: QuadrantTaskDraft; anchor: QuadrantTaskBox }
  | { kind: "delete"; index: number; anchor: QuadrantTaskBox };

/** A panel whose position and focus were set: its anchor and kind */
interface Placed {
  anchor: QuadrantTaskBox;
  kind: Panel["kind"];
}

/** Half the size of the box around a task the panel keeps clear */
const DOT = 10;

const emptyBox = (): QuadrantTaskBox => ({ x: 0, y: 0, width: 0, height: 0 });

/** The focused element, looking into open shadow roots */
function deepActiveElement(): HTMLElement | null {
  let active = document.activeElement;
  while (active?.shadowRoot?.activeElement)
    active = active.shadowRoot.activeElement;
  return active instanceof HTMLElement ? active : null;
}

const icon = (kind: keyof typeof QUADRANT_TASK_ICONS, size = 16) =>
  html`<svg
    width=${size}
    height=${size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d=${QUADRANT_TASK_ICONS[kind]}></path>
  </svg>`;

/**
 * Task board on a four-quadrant matrix (`<QuadrantTaskBoard>` of React),
 * built on `<minerva-quadrant-chart>`: each quadrant header shows its
 * title, the number of tasks and an add button; the active task (hovered,
 * keyboard-focused or selected) shows edit and delete buttons; an inline
 * panel, anchored inside the board at the button or the task, names a task
 * and picks its quadrant, or confirms a delete (Escape or a press outside
 * closes it). Tasks can be dragged to another quadrant, or moved with
 * Shift + arrows once focused; a double click edits a task, a click on an
 * empty area adds one there.
 *
 * Controlled, like `<minerva-dashboard-columns>`: the board never changes its
 * own `points`. It fires `minerva-points-change` with the next list after
 * an add, an edit, a delete, a drag and drop or a keyboard move; set it
 * back as `points` to apply it (or keep the old list to refuse it).
 *
 * Texts are localized (the `locale` attribute, else the library language)
 * and can be overridden with `labels`. The host's `aria-label` names the
 * chart.
 *
 * Published as the optional entry
 * `minerva-design/web-components/quadrant-task-board` (it loads the chart
 * engine, minerva-design/charts/core).
 *
 * @summary Four-quadrant task board: add, edit, delete and drag tasks between quadrants.
 * @tag minerva-quadrant-task-board
 * @csspart root - The box around the chart and the inline panel
 * @csspart chart - The inner `<minerva-quadrant-chart>`
 * @csspart panel - The inline add / edit / delete panel, positioned next to its anchor
 * @fires minerva-points-change - The tasks changed (add, edit, delete, drag and drop, keyboard move); `detail: { points }`, the next list to set back as `points`
 * @fires minerva-point-click - A task was clicked (it becomes the selected one); `detail: { point, index }`
 * @fires minerva-point-drag - A task is being dragged (on every move); `detail: { point, index, x, y, quadrant }`
 * @fires minerva-hover - The hovered (or keyboard-focused) task changed; `detail: { x, xLabel, items }`, `null` when nothing is hovered
 * @fires minerva-zoom - The user zoomed or panned the chart; `detail`: the view
 * @fires minerva-renderer-change - The chart backend is ready (or fell back after a GPU loss); `detail`: the renderer
 */
export class MinervaQuadrantTaskBoard extends MinervaElement {
  static override tagName = "minerva-quadrant-task-board";
  static override dependencies = [
    MinervaQuadrantChart,
    MinervaIconButton,
    MinervaInput,
    MinervaButton,
  ];
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        /* fills flex rows too, like the chart elements */
        width: 100%;
        min-inline-size: 0;
      }
    `,
    sharedStyles(styles),
  ];

  /** Tasks `{ x, y, label, color, size }`; replace the array to update the board (controlled); property only */
  @property({ attribute: false })
  points?: readonly QuadrantPoint[];

  /** Texts of the buttons and panels (`add`, `edit`, `delete`, `deleteConfirm`, `confirmDelete`, `name`, `quadrant`, `save`, `cancel`, `actions`), localized by default; property only */
  @property({ attribute: false })
  labels?: Partial<QuadrantTaskLabels>;

  /** Titles, badges and colors of the quadrants (`topLeft`, `topRight`, `bottomLeft`, `bottomRight`); property only */
  @property({ attribute: false })
  quadrants?: QuadrantRegions;

  /** Title of the horizontal axis */
  @property({ attribute: "x-label" })
  xLabel?: string;

  /** Title of the vertical axis */
  @property({ attribute: "y-label" })
  yLabel?: string;

  /** Texts at the ends of the dividers, drawn inside the plot (`top`, `bottom`, `left`, `right`); property only */
  @property({ attribute: false })
  axisLabels?: QuadrantAxisLabels;

  /** Range of the horizontal axis (default [0, 10]); property only */
  @property({ attribute: false })
  xDomain?: [number, number];

  /** Range of the vertical axis (default [0, 10]); property only */
  @property({ attribute: false })
  yDomain?: [number, number];

  /** X value of the vertical divider (the middle of the x domain by default) */
  @property({ type: Number, attribute: "x-split" })
  xSplit?: number;

  /** Y value of the horizontal divider (the middle of the y domain by default) */
  @property({ type: Number, attribute: "y-split" })
  ySplit?: number;

  /** Reverses the horizontal axis (e.g. "urgent" on the left) */
  @property({ type: Boolean, attribute: "reverse-x" })
  reverseX = false;

  /** Hides the numeric ticks of the axes (only the matrix remains) */
  @property({ type: Boolean, attribute: "hide-ticks" })
  hideTicks = false;

  /** Hides the labels next to the tasks */
  @property({ type: Boolean, attribute: "hide-labels" })
  hideLabels = false;

  /** Hides the number of tasks in the quadrant headers */
  @property({ type: Boolean, attribute: "hide-counts" })
  hideCounts = false;

  /** Dot diameter in pixels */
  @property({ type: Number, attribute: "point-size" })
  pointSize = 12;

  /** Index of the selected task, drawn with a ring (`null`: none); by default the board selects the last clicked, moved or saved task */
  @property({ type: Number, attribute: "selected-index" })
  selectedIndex?: number | null;

  /** Height of the chart: pixels or any CSS length (default 320) */
  @property()
  height?: string | number;

  /** Language of the built-in texts, quadrant titles and numbers (e.g. "fr"); the library language by default */
  @property()
  locale?: string;

  /** Leaves out the visually hidden list of the tasks (keyboard and screen reader access, keyboard moves) */
  @property({ type: Boolean, attribute: "no-accessible-points" })
  noAccessiblePoints = false;

  /** Other engine options of the chart (legend, tooltip, padding, palette...); property only */
  @property({ attribute: false })
  options?: Omit<ChartOptions, "series">;

  @state() private panel: Panel | null = null;
  @state() private selection: number | null = null;

  /** Last pointer press in the board (anchor of a click on an empty area) */
  private lastPointer: QuadrantTaskBox | null = null;
  /** Focused element before the panel opened (focused again on Escape / Cancel) */
  private returnFocus: HTMLElement | null = null;
  /** Panel whose position and focus were set */
  private placed: Placed | null = null;
  /** Whether the press-outside listener is on the document */
  private listening = false;

  private readonly i18n = new LocaleController(this);
  private readonly aria = new AriaController(this);
  /** Options of the chart, kept while their sources do not change (no redraw on unrelated updates) */
  private chartOptions: {
    options: unknown;
    locale: string;
    ariaLabel: string | undefined;
    value: Omit<ChartOptions, "series">;
  } | null = null;

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    for (const type of INTERNAL_EVENTS) root.addEventListener(type, stop);
    return root;
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.listenOutside(false);
  }

  private get language(): string {
    return this.locale ?? this.i18n.language;
  }

  private get tasks(): readonly QuadrantPoint[] {
    return this.points ?? [];
  }

  private get chart(): MinervaQuadrantChart | null {
    return this.renderRoot.querySelector<MinervaQuadrantChart>(
      MinervaQuadrantChart.tagName,
    );
  }

  private get boardElement(): HTMLElement | null {
    return this.renderRoot.querySelector<HTMLElement>("[part=root]");
  }

  private get panelElement(): HTMLElement | null {
    return this.renderRoot.querySelector<HTMLElement>("[part=panel]");
  }

  /** The open panel, unless the task it is about is gone */
  private get shownPanel(): Panel | null {
    const panel = this.panel;
    if (!panel) return null;
    const points = this.tasks;
    const shown =
      panel.kind === "draft"
        ? panel.draft.index === null || !!points[panel.draft.index]
        : !!points[panel.index];
    return shown ? panel : null;
  }

  private geometry(): QuadrantTaskGeometry {
    return {
      xDomain: this.xDomain,
      yDomain: this.yDomain,
      xSplit: this.xSplit,
      ySplit: this.ySplit,
      reverseX: this.reverseX,
    };
  }

  private quadrantTitle(corner: QuadrantCorner): string {
    return (
      this.quadrants?.[corner]?.label || quadrantLabels(this.language)[corner]
    );
  }

  private engineOptions(
    locale: string,
    ariaLabel: string | undefined,
  ): Omit<ChartOptions, "series"> {
    const cached = this.chartOptions;
    if (
      cached &&
      cached.options === this.options &&
      cached.locale === locale &&
      cached.ariaLabel === ariaLabel
    )
      return cached.value;
    const value = {
      ...this.options,
      locale,
      ...(ariaLabel ? { ariaLabel } : {}),
    };
    this.chartOptions = { options: this.options, locale, ariaLabel, value };
    return value;
  }

  /** Box of an element, relative to the board */
  private boxOf(el: Element | null | undefined): QuadrantTaskBox | null {
    const board = this.boardElement;
    if (!el || !board) return null;
    const b = board.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return {
      x: r.left - b.left,
      y: r.top - b.top,
      width: r.width,
      height: r.height,
    };
  }

  /** Box around a task (the anchor of its actions in the chart), else the last pointer */
  private pointBox(index: number): QuadrantTaskBox {
    const box = this.boxOf(
      this.chart?.shadowRoot?.querySelector(
        `[part=point-actions][data-point-index="${index}"]`,
      ),
    );
    if (box)
      return {
        x: box.x - DOT,
        y: box.y - DOT,
        width: 2 * DOT,
        height: 2 * DOT,
      };
    return this.lastPointer ? { ...this.lastPointer } : emptyBox();
  }

  private change(points: QuadrantPoint[]): void {
    this.emit<QuadrantTaskBoardChangeDetail>("minerva-points-change", {
      points,
    });
  }

  private open(next: Panel): void {
    if (!this.panel) this.returnFocus = deepActiveElement();
    this.panel = next;
  }

  private readonly close = () => {
    this.panel = null;
    const target = this.returnFocus;
    this.returnFocus = null;
    if (target?.isConnected) target.focus();
  };

  private add(
    corner: QuadrantCorner,
    anchor: QuadrantTaskBox,
    at?: { x: number; y: number },
  ): void {
    this.open({
      kind: "draft",
      draft: newQuadrantTaskDraft(this.geometry(), corner, at),
      anchor,
    });
  }

  private edit(index: number | null): void {
    if (index === null) return;
    const draft = editQuadrantTaskDraft(this.geometry(), this.tasks, index);
    if (draft)
      this.open({ kind: "draft", draft, anchor: this.pointBox(index) });
  }

  private confirmRemove(index: number | null): void {
    if (index === null) return;
    this.open({ kind: "delete", index, anchor: this.pointBox(index) });
  }

  private setDraft(change: Partial<QuadrantTaskDraft>): void {
    const panel = this.panel;
    if (panel?.kind === "draft")
      this.panel = { ...panel, draft: { ...panel.draft, ...change } };
  }

  private save(): void {
    const panel = this.shownPanel;
    const saved = applyQuadrantTaskDraft(
      this.geometry(),
      this.tasks,
      panel?.kind === "draft" ? panel.draft : null,
    );
    if (!saved) return;
    this.change(saved.points);
    this.selection = saved.index;
    this.close();
  }

  private readonly removeTask = () => {
    const panel = this.shownPanel;
    if (panel?.kind === "delete" && this.tasks[panel.index]) {
      this.change(removeQuadrantTask(this.tasks, panel.index));
      this.selection = selectionAfterRemove(this.selection, panel.index);
    }
    this.close();
  };

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);
    const panel = this.shownPanel;
    this.listenOutside(panel !== null);
    if (!panel) {
      this.placed = null;
      return;
    }
    const placed = this.placed;
    if (placed?.anchor === panel.anchor && placed.kind === panel.kind) return;
    const next: Placed = { anchor: panel.anchor, kind: panel.kind };
    this.placed = next;
    // next to its anchor, inside the board, before the panel is painted
    this.placePanel();
    void this.settlePanel(next);
  }

  /** Places the panel again once its fields rendered, then focuses the first one (or Cancel) */
  private async settlePanel(placed: Placed): Promise<void> {
    const el = this.panelElement;
    if (!el) return;
    await Promise.all(
      Array.from(
        el.querySelectorAll("*"),
        (child) => (child as Partial<MinervaElement>).updateComplete,
      ),
    );
    if (this.placed !== placed || this.panelElement !== el) return;
    this.placePanel();
    el.querySelector<HTMLElement>("[data-autofocus]")?.focus({
      preventScroll: true,
    });
  }

  private placePanel(): void {
    const el = this.panelElement;
    const board = this.boardElement;
    const anchor = this.shownPanel?.anchor;
    if (!el || !board || !anchor) return;
    const place = placeQuadrantTaskPanel(
      anchor,
      { width: el.offsetWidth, height: el.offsetHeight },
      { width: board.clientWidth, height: board.clientHeight },
    );
    el.style.left = `${place.x}px`;
    el.style.top = `${place.y}px`;
    el.style.transformOrigin = `${place.origin.x}px ${place.origin.y}px`;
    el.dataset.placement = place.placement;
  }

  /** A press outside the panel closes it, like a popover */
  private listenOutside(on: boolean): void {
    if (on === this.listening) return;
    this.listening = on;
    if (on)
      document.addEventListener("pointerdown", this.onOutsidePointerDown, true);
    else
      document.removeEventListener(
        "pointerdown",
        this.onOutsidePointerDown,
        true,
      );
  }

  private readonly onOutsidePointerDown = (event: PointerEvent) => {
    const panel = this.panelElement;
    if (panel && event.composedPath().includes(panel)) return;
    this.returnFocus = null;
    this.panel = null;
  };

  private readonly onPanelKeydown = (event: KeyboardEvent) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    event.stopPropagation();
    this.close();
  };

  /** Where the last press in the board was (the anchor of a click on an empty area) */
  private readonly trackPointer = {
    capture: true,
    handleEvent: (event: PointerEvent) => {
      const board = this.boardElement;
      if (!board) return;
      const b = board.getBoundingClientRect();
      this.lastPointer = {
        x: event.clientX - b.left,
        y: event.clientY - b.top,
        width: 0,
        height: 0,
      };
    },
  };

  private readonly onPointClick = (event: CustomEvent<{ index: number }>) => {
    this.selection = event.detail.index;
  };

  private readonly onPointDoubleClick = (
    event: CustomEvent<{ index: number }>,
  ) => this.edit(event.detail.index);

  private readonly onQuadrantClick = (
    event: CustomEvent<{ quadrant: QuadrantCorner; x: number; y: number }>,
  ) => {
    const { quadrant, x, y } = event.detail;
    this.add(
      quadrant,
      this.lastPointer ? { ...this.lastPointer } : emptyBox(),
      { x, y },
    );
  };

  private readonly onPointDrop = (
    event: CustomEvent<{ index: number; x: number; y: number }>,
  ) => {
    const { index, x, y } = event.detail;
    this.change(moveQuadrantTask(this.tasks, index, { x, y }));
    this.selection = index;
  };

  private readonly onSubmit = (event: Event) => {
    event.preventDefault();
    this.save();
  };

  private readonly onNameKeydown = (event: KeyboardEvent) => {
    if (event.key !== "Enter" || event.isComposing) return;
    event.preventDefault();
    this.save();
  };

  private renderHeader(
    corner: QuadrantCorner,
    count: string | undefined,
    addLabel: string,
    expanded: boolean,
  ) {
    const badge = this.quadrants?.[corner]?.badge;
    return html`<div
      slot=${QUADRANT_HEADER_SLOTS[corner]}
      class="header"
      data-corner=${corner}
    >
      ${badge ? html`<span class="badge">${badge}</span>` : nothing}
      <span class="title">${this.quadrantTitle(corner)}</span>
      ${
        count === undefined
          ? nothing
          : html`<span class="count">${count}</span>`
      }
      <minerva-icon-button
        class="add"
        size="xsmall"
        variant="ghost"
        label=${`${addLabel} · ${this.quadrantTitle(corner)}`}
        aria-expanded=${expanded ? "true" : "false"}
        @click=${(event: MouseEvent) =>
          this.add(
            corner,
            this.boxOf(event.currentTarget as Element) ?? emptyBox(),
          )}
        >${icon("add")}</minerva-icon-button
      >
    </div>`;
  }

  private renderDraftPanel(
    draft: QuadrantTaskDraft,
    texts: QuadrantTaskLabels,
    points: readonly QuadrantPoint[],
  ) {
    return html`<div
      part="panel"
      class="panel"
      role="dialog"
      aria-labelledby="panel-title"
      data-quadrant-task-panel=${draft.index === null ? "add" : "edit"}
      @keydown=${this.onPanelKeydown}
    >
      <form class="form" @submit=${this.onSubmit}>
        <h3 id="panel-title" class="panelTitle">
          ${draft.index === null ? texts.add : texts.edit}
        </h3>
        <label class="field">
          <span>${texts.name}</span>
          <minerva-input
            required
            size="small"
            data-autofocus
            aria-label=${texts.name}
            .value=${draft.label}
            @minerva-input=${(event: CustomEvent<{ value: string }>) =>
              this.setDraft({ label: event.detail.value })}
            @keydown=${this.onNameKeydown}
          ></minerva-input>
        </label>
        <fieldset class="quadrants">
          <legend>${texts.quadrant}</legend>
          <div class="quadrantGrid">
            ${QUADRANT_CORNERS.map(
              (corner) =>
                html`<label class="quadrant" data-corner=${corner}>
                  <input
                    type="radio"
                    name="quadrant"
                    value=${corner}
                    .checked=${draft.quadrant === corner}
                    @change=${() => this.setDraft({ quadrant: corner })}
                  />
                  <span
                    class="swatch"
                    style=${styleMap({
                      background: quadrantTaskColor(this.quadrants, corner),
                    })}
                    aria-hidden="true"
                  ></span>
                  <span class="quadrantName"
                    >${this.quadrantTitle(corner)}</span
                  >
                </label>`,
            )}
          </div>
        </fieldset>
        <div class="footer">
          <minerva-button
            size="small"
            color="neutral"
            variant="ghost"
            @click=${this.close}
            >${texts.cancel}</minerva-button
          >
          <minerva-button
            size="small"
            type="submit"
            ?disabled=${!canSaveQuadrantTask(draft, points)}
            >${texts.save}</minerva-button
          >
        </div>
      </form>
    </div>`;
  }

  private renderDeletePanel(
    index: number,
    texts: QuadrantTaskLabels,
    points: readonly QuadrantPoint[],
  ) {
    return html`<div
      part="panel"
      class="panel"
      role="alertdialog"
      aria-labelledby="panel-title"
      aria-describedby="panel-text"
      data-quadrant-task-panel="delete"
      @keydown=${this.onPanelKeydown}
    >
      <h3 id="panel-title" class="panelTitle">${texts.delete}</h3>
      <p id="panel-text" class="panelText">
        ${quadrantTaskDeleteText(texts, points[index])}
      </p>
      <div class="footer">
        <minerva-button
          size="small"
          color="neutral"
          variant="ghost"
          data-autofocus
          @click=${this.close}
          >${texts.cancel}</minerva-button
        >
        <minerva-button size="small" color="danger" @click=${this.removeTask}
          >${texts.confirmDelete}</minerva-button
        >
      </div>
    </div>`;
  }

  protected override render() {
    const points = this.tasks;
    const locale = this.language;
    const texts = quadrantTaskLabels(locale, this.labels);
    const groups = quadrantGroups({ ...this.geometry(), points });
    const panel = this.shownPanel;
    const adding =
      panel?.kind === "draft" && panel.draft.index === null
        ? panel.draft.quadrant
        : null;
    const selected =
      this.selectedIndex !== undefined ? this.selectedIndex : this.selection;
    const ariaLabel = this.aria.label;
    return html`<div
      part="root"
      class="board"
      data-panel=${panel?.kind ?? nothing}
      @pointerdown=${this.trackPointer}
    >
      <minerva-quadrant-chart
        part="chart"
        drag-points
        .points=${points}
        .quadrants=${this.quadrants}
        .xLabel=${this.xLabel}
        .yLabel=${this.yLabel}
        .axisLabels=${this.axisLabels}
        .xDomain=${this.xDomain}
        .yDomain=${this.yDomain}
        .xSplit=${this.xSplit}
        .ySplit=${this.ySplit}
        .reverseX=${this.reverseX}
        .hideTicks=${this.hideTicks}
        .hideLabels=${this.hideLabels}
        .pointSize=${this.pointSize}
        .selectedIndex=${selected}
        .noAccessiblePoints=${this.noAccessiblePoints}
        .height=${this.height}
        .options=${this.engineOptions(locale, ariaLabel)}
        @minerva-point-click=${this.onPointClick}
        @minerva-point-double-click=${this.onPointDoubleClick}
        @minerva-quadrant-click=${this.onQuadrantClick}
        @minerva-point-drop=${this.onPointDrop}
      >
        ${QUADRANT_CORNERS.map((corner) =>
          this.renderHeader(
            corner,
            this.hideCounts
              ? undefined
              : quadrantCountText(true, groups[corner].points, locale),
            texts.add,
            adding === corner,
          ),
        )}
        <div
          slot="point-actions"
          role="toolbar"
          class="actions"
          aria-label=${texts.actions}
          @pointerdown=${stop}
        >
          <minerva-icon-button
            size="xsmall"
            variant="ghost"
            label=${texts.edit}
            data-action="edit"
            @click=${() => this.edit(this.chart?.activeIndex ?? null)}
            >${icon("edit", 14)}</minerva-icon-button
          >
          <minerva-icon-button
            size="xsmall"
            variant="ghost"
            color="danger"
            label=${texts.delete}
            data-action="delete"
            @click=${() => this.confirmRemove(this.chart?.activeIndex ?? null)}
            >${icon("delete", 14)}</minerva-icon-button
          >
        </div>
      </minerva-quadrant-chart>
      ${
        panel?.kind === "draft"
          ? this.renderDraftPanel(panel.draft, texts, points)
          : panel?.kind === "delete"
            ? this.renderDeletePanel(panel.index, texts, points)
            : nothing
      }
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-quadrant-task-board": MinervaQuadrantTaskBoard;
  }
}
