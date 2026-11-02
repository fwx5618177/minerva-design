import { css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import styles from "@react-styles/components/QuadrantTaskBoard/quadrantTaskBoard.module.scss?inline";
import {
  QUADRANT_CORNERS,
  QUADRANT_TASK_ICONS,
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
  type ChartOptions,
  type QuadrantAxisLabels,
  type QuadrantCorner,
  type QuadrantPoint,
  type QuadrantRegions,
  type QuadrantTaskDraft,
  type QuadrantTaskGeometry,
  type QuadrantTaskLabels,
} from "minerva-design/charts/core";
import { MinervaButton } from "../button/button";
import { MinervaQuadrantChart, QUADRANT_HEADER_SLOTS } from "../chart/charts";
import { MinervaConfirmDialog } from "../confirm/confirm";
import { MinervaIconButton } from "../icon-button/icon-button";
import { MinervaInput } from "../input/input";
import { MinervaModal } from "../modal/modal";
import { MinervaSelect } from "../select/select";
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
 * Events of the inner chart, dialogs and fields that the board consumes:
 * they stop at its shadow root (the board fires `minerva-points-change`).
 * `minerva-hover`, `minerva-point-click`, `minerva-point-drag`,
 * `minerva-zoom` and `minerva-renderer-change` of the chart go through.
 */
const INTERNAL_EVENTS = [
  "minerva-open-change",
  "minerva-after-open",
  "minerva-after-close",
  "minerva-confirm",
  "minerva-cancel",
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

const icon = (kind: keyof typeof QUADRANT_TASK_ICONS) =>
  html`<svg
    width="16"
    height="16"
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
 * keyboard-focused or selected) shows edit and delete buttons; a dialog
 * names a task and picks its quadrant, a confirmation precedes a delete.
 * Tasks can be dragged to another quadrant, or moved with Shift + arrows
 * once focused; a double click edits a task, a click on an empty area adds
 * one there.
 *
 * Controlled, like `<minerva-kanban-board>`: the board never changes its
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
 * @csspart root - The box around the chart and the dialogs
 * @csspart chart - The inner `<minerva-quadrant-chart>`
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
    MinervaModal,
    MinervaConfirmDialog,
    MinervaIconButton,
    MinervaInput,
    MinervaSelect,
    MinervaButton,
  ];
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        min-inline-size: 0;
      }
    `,
    sharedStyles(styles),
  ];

  /** Tasks `{ x, y, label, color, size }`; replace the array to update the board (controlled); property only */
  @property({ attribute: false })
  points?: readonly QuadrantPoint[];

  /** Texts of the buttons and dialogs (`add`, `edit`, `delete`, `deleteConfirm`, `name`, `quadrant`, `save`, `cancel`, `actions`), localized by default; property only */
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

  @state() private draft: QuadrantTaskDraft | null = null;
  @state() private deleting: number | null = null;
  @state() private selection: number | null = null;

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

  private change(points: QuadrantPoint[]): void {
    this.emit<QuadrantTaskBoardChangeDetail>("minerva-points-change", {
      points,
    });
  }

  private add(corner: QuadrantCorner, at?: { x: number; y: number }): void {
    this.draft = newQuadrantTaskDraft(this.geometry(), corner, at);
  }

  private edit(index: number | null): void {
    if (index === null) return;
    this.draft = editQuadrantTaskDraft(this.geometry(), this.tasks, index);
  }

  private save(): void {
    const saved = applyQuadrantTaskDraft(
      this.geometry(),
      this.tasks,
      this.draft,
    );
    if (!saved) return;
    this.change(saved.points);
    this.selection = saved.index;
    this.draft = null;
  }

  private removeTask(): void {
    const index = this.deleting;
    if (index !== null && this.tasks[index]) {
      this.change(removeQuadrantTask(this.tasks, index));
      this.selection = selectionAfterRemove(this.selection, index);
    }
    this.deleting = null;
  }

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
    this.add(quadrant, { x, y });
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

  private readonly onModalOpened = () => {
    this.renderRoot.querySelector<MinervaInput>(MinervaInput.tagName)?.focus();
  };

  private readonly onModalOpenChange = (
    event: CustomEvent<{ open: boolean }>,
  ) => {
    if (!event.detail.open) this.draft = null;
  };

  private readonly onConfirmOpenChange = (
    event: CustomEvent<{ open: boolean }>,
  ) => {
    if (!event.detail.open) this.deleting = null;
  };

  private renderHeader(
    corner: QuadrantCorner,
    count: string | undefined,
    addLabel: string,
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
        @click=${() => this.add(corner)}
        >${icon("add")}</minerva-icon-button
      >
    </div>`;
  }

  protected override render() {
    const points = this.tasks;
    const locale = this.language;
    const texts = quadrantTaskLabels(locale, this.labels);
    const groups = quadrantGroups({ ...this.geometry(), points });
    const draft = this.draft;
    const editing =
      draft !== null && (draft.index === null || !!points[draft.index]);
    const deleted = this.deleting === null ? undefined : points[this.deleting];
    const selected =
      this.selectedIndex !== undefined ? this.selectedIndex : this.selection;
    const ariaLabel = this.aria.label;
    return html`<div part="root" class="board">
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
            size="small"
            variant="ghost"
            label=${texts.edit}
            data-action="edit"
            @click=${() => this.edit(this.chart?.activeIndex ?? null)}
            >${icon("edit")}</minerva-icon-button
          >
          <minerva-icon-button
            size="small"
            variant="ghost"
            color="danger"
            label=${texts.delete}
            data-action="delete"
            @click=${() => {
              this.deleting = this.chart?.activeIndex ?? null;
            }}
            >${icon("delete")}</minerva-icon-button
          >
        </div>
      </minerva-quadrant-chart>
      <minerva-modal
        size="small"
        .open=${editing}
        label=${draft?.index === null ? texts.add : texts.edit}
        @minerva-open-change=${this.onModalOpenChange}
        @minerva-after-open=${this.onModalOpened}
      >
        <form class="form" @submit=${this.onSubmit}>
          <label class="field">
            <span>${texts.name}</span>
            <minerva-input
              required
              aria-label=${texts.name}
              .value=${draft?.label ?? ""}
              @minerva-input=${(event: CustomEvent<{ value: string }>) => {
                if (this.draft)
                  this.draft = { ...this.draft, label: event.detail.value };
              }}
              @keydown=${this.onNameKeydown}
            ></minerva-input>
          </label>
          <label class="field">
            <span>${texts.quadrant}</span>
            <minerva-select
              aria-label=${texts.quadrant}
              .value=${draft?.quadrant ?? "topLeft"}
              .options=${QUADRANT_CORNERS.map((corner) => ({
                value: corner,
                label: this.quadrantTitle(corner),
              }))}
              @minerva-change=${(event: CustomEvent<{ value: string }>) => {
                if (this.draft)
                  this.draft = {
                    ...this.draft,
                    quadrant: event.detail.value as QuadrantCorner,
                  };
              }}
            ></minerva-select>
          </label>
          <div class="footer">
            <minerva-button
              color="neutral"
              variant="outline"
              @click=${() => {
                this.draft = null;
              }}
              >${texts.cancel}</minerva-button
            >
            <minerva-button
              type="submit"
              ?disabled=${!canSaveQuadrantTask(draft, points)}
              >${texts.save}</minerva-button
            >
          </div>
        </form>
      </minerva-modal>
      <minerva-confirm-dialog
        color="danger"
        .open=${deleted !== undefined}
        label=${texts.delete}
        description=${quadrantTaskDeleteText(texts, deleted)}
        cancel-label=${texts.cancel}
        @minerva-confirm=${() => this.removeTask()}
        @minerva-open-change=${this.onConfirmOpenChange}
      ></minerva-confirm-dialog>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-quadrant-task-board": MinervaQuadrantTaskBoard;
  }
}
