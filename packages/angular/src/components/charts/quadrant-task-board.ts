import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
  viewChild,
} from "@angular/core";
import {
  QUADRANT_CORNERS,
  QUADRANT_TASK_ICONS,
  applyQuadrantTaskDraft,
  canSaveQuadrantTask,
  editQuadrantTaskDraft,
  moveQuadrantTask,
  newQuadrantTaskDraft,
  quadrantCountText,
  quadrantLabels,
  quadrantTaskDeleteText,
  quadrantTaskLabels,
  removeQuadrantTask,
  selectionAfterRemove,
  type ChartAnnotation,
  type ChartHoverEvent,
  type ChartInteractionOptions,
  type ChartLegendOptions,
  type ChartPadding,
  type ChartRendererKind,
  type ChartRendererPreference,
  type ChartTooltipOptions,
  type ChartView,
  type QuadrantAxisLabels,
  type QuadrantCorner,
  type QuadrantPoint,
  type QuadrantRegions,
  type QuadrantTaskDraft,
  type QuadrantTaskLabels,
} from "minerva-design/charts/core";
import { injectScope } from "../../config/scope";
import { quadrantTaskBoardStyles as s } from "../../internal/styles";
import { MnButton } from "../button";
import { MnIconButton } from "../foundations";
import { MnInput } from "../input";
import { MnModal } from "../modal";
import { MnConfirmDialog } from "../overlays";
import { MnSelect, MnSelectItem } from "../select";
import { MnQuadrantChart, type QuadrantPointDrop } from "./cartesian";
import { optionalBoolean } from "./engine";

export type { QuadrantTaskLabels };

type ShowCounts =
  boolean | ((count: number, points: readonly QuadrantPoint[]) => string);

const ICON_ATTRS = `width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"`;

/**
 * Task board on a four-quadrant matrix (MnQuadrantChart): an add button per
 * quadrant, edit and delete buttons on the active task, a dialog to name a
 * task and pick its quadrant, a confirmation before a delete, drag and drop
 * and keyboard moves (Shift + arrows). Controlled: `points` in,
 * `pointsChange` out (`[(points)]`). The other inputs go to the chart.
 *
 * @example
 * <mn-quadrant-task-board [(points)]="tasks" [quadrants]="quadrants" reverseX />
 */
@Component({
  selector: "mn-quadrant-task-board",
  exportAs: "mnQuadrantTaskBoard",
  imports: [
    MnQuadrantChart,
    MnIconButton,
    MnModal,
    MnInput,
    MnSelect,
    MnSelectItem,
    MnButton,
    MnConfirmDialog,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "s.board",
    style: "display: block",
  },
  template: `
    <mn-quadrant-chart
      [points]="points()"
      [locale]="language()"
      [selectedIndex]="selected()"
      [draggable]="draggable() ?? true"
      [height]="height()"
      [width]="width()"
      [renderer]="renderer()"
      [legend]="legend()"
      [tooltip]="tooltip()"
      [crosshair]="crosshair()"
      [annotations]="annotations()"
      [interaction]="interaction()"
      [padding]="padding()"
      [palette]="palette()"
      [ariaLabel]="ariaLabel()"
      [xDomain]="xDomain()"
      [yDomain]="yDomain()"
      [xSplit]="xSplit()"
      [ySplit]="ySplit()"
      [quadrants]="quadrants()"
      [xLabel]="xLabel()"
      [yLabel]="yLabel()"
      [axisLabels]="axisLabels()"
      [showTicks]="showTicks()"
      [reverseX]="reverseX()"
      [showLabels]="showLabels()"
      [pointSize]="pointSize()"
      [name]="name()"
      [selectedIndices]="selectedIndices()"
      [accessiblePoints]="accessiblePoints()"
      [quadrantHeader]="header"
      [pointActions]="actions"
      (hover)="hover.emit($event)"
      (zoom)="zoom.emit($event)"
      (rendererChange)="rendererChange.emit($event)"
      (pointClick)="onPointClick($event)"
      (pointDoubleClick)="edit($event.index)"
      (pointDrag)="pointDrag.emit($event)"
      (pointDrop)="onPointDrop($event)"
      (quadrantClick)="add($event.quadrant, $event)"
    />
    <ng-template #header let-corner let-info="info">
      <div [class]="s.header" [attr.data-corner]="corner">
        @if (info.region?.badge) {
          <span [class]="s.badge">{{ info.region.badge }}</span>
        }
        <span [class]="s.title">{{ title(corner) }}</span>
        @if (showCounts() !== false) {
          <span [class]="s.count">{{ countText(info.points) }}</span>
        }
        <button
          mnIconButton
          size="xsmall"
          variant="ghost"
          [class]="s.add"
          [label]="texts().add + ' · ' + title(corner)"
          (click)="add(corner)"
        >
          <svg ${ICON_ATTRS}><path [attr.d]="icons.add" /></svg>
        </button>
      </div>
    </ng-template>
    <ng-template #actions let-index="index">
      <div
        role="toolbar"
        [attr.aria-label]="texts().actions"
        [class]="s.actions"
        (pointerdown)="$event.stopPropagation()"
      >
        <button
          mnIconButton
          size="small"
          variant="ghost"
          [label]="texts().edit"
          (click)="edit(index)"
        >
          <svg ${ICON_ATTRS}><path [attr.d]="icons.edit" /></svg>
        </button>
        <button
          mnIconButton
          size="small"
          variant="ghost"
          color="danger"
          [label]="texts().delete"
          (click)="deleting.set(index)"
        >
          <svg ${ICON_ATTRS}><path [attr.d]="icons.delete" /></svg>
        </button>
      </div>
    </ng-template>
    <mn-modal
      [open]="editing()"
      (openChange)="$event || draft.set(null)"
      [title]="draft()?.index === null ? texts().add : texts().edit"
      size="small"
    >
      <form [class]="s.form" (submit)="save($event)">
        <label [class]="s.field">
          <span>{{ texts().name }}</span>
          <mn-input
            required
            [value]="draft()?.label ?? ''"
            [aria-label]="texts().name"
            (valueChange)="setLabel($event ?? '')"
          />
        </label>
        <label [class]="s.field">
          <span>{{ texts().quadrant }}</span>
          <mn-select
            [value]="draft()?.quadrant ?? 'topLeft'"
            [aria-label]="texts().quadrant"
            (valueChange)="setQuadrant($event)"
          >
            @for (corner of corners; track corner) {
              <mn-select-item [value]="corner">{{
                title(corner)
              }}</mn-select-item>
            }
          </mn-select>
        </label>
        <div [class]="s.footer">
          <button
            mnButton
            color="neutral"
            variant="outline"
            (click)="draft.set(null)"
          >
            {{ texts().cancel }}
          </button>
          <button mnButton type="submit" [disabled]="!canSave()">
            {{ texts().save }}
          </button>
        </div>
      </form>
    </mn-modal>
    <mn-confirm-dialog
      [open]="deletingPoint() !== undefined"
      (openChange)="$event || deleting.set(null)"
      [title]="texts().delete"
      [description]="deleteText()"
      [cancelLabel]="texts().cancel"
      [confirmLabel]="scope.t('confirm.delete')"
      color="danger"
      (confirm)="remove()"
    />
  `,
})
export class MnQuadrantTaskBoard {
  /** Tasks to place (controlled: `[(points)]`, or `[points]` + `(pointsChange)`) */
  readonly points = input.required<readonly QuadrantPoint[]>();
  /** Texts of the buttons and dialogs (localized by default) */
  readonly labels = input<Partial<QuadrantTaskLabels> | undefined>(undefined);

  /** Height of the chart; numbers are pixels, strings any CSS length (default 320) */
  readonly height = input<number | string | undefined>(undefined);
  /** Width of the chart; numbers are pixels (default `100%`) */
  readonly width = input<number | string | undefined>(undefined);
  /** Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D */
  readonly renderer = input<ChartRendererPreference | undefined>(undefined);
  /** Legend of the chart */
  readonly legend = input<boolean | ChartLegendOptions | undefined>(undefined);
  /** Tooltip; `false` disables it */
  readonly tooltip = input<boolean | ChartTooltipOptions | undefined>(
    undefined,
  );
  /** Vertical guide line following the pointer */
  readonly crosshair = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /** Background areas and reference lines */
  readonly annotations = input<readonly ChartAnnotation[] | undefined>(
    undefined,
  );
  /** Zoom, pan and keyboard navigation of the chart; `false` makes it static */
  readonly interaction = input<boolean | ChartInteractionOptions | undefined>(
    undefined,
  );
  /** Space around the plot area, in pixels */
  readonly padding = input<ChartPadding | undefined>(undefined);
  /** Series colors */
  readonly palette = input<readonly string[] | undefined>(undefined);
  /** Accessible name of the chart */
  readonly ariaLabel = input<string | undefined>(undefined);
  /** BCP 47 locale of the texts (chart and board); the language of `<mn-config>` by default */
  readonly locale = input<string | undefined>(undefined);
  /** Range of the horizontal axis (default `[0, 10]`) */
  readonly xDomain = input<[number, number] | undefined>(undefined);
  /** Range of the vertical axis (default `[0, 10]`) */
  readonly yDomain = input<[number, number] | undefined>(undefined);
  /** X value of the vertical divider (the middle of `xDomain` by default) */
  readonly xSplit = input<number | undefined>(undefined);
  /** Y value of the horizontal divider (the middle of `yDomain` by default) */
  readonly ySplit = input<number | undefined>(undefined);
  /** Titles and colors of the quadrants (the titles name the quadrants in the headers and the dialog) */
  readonly quadrants = input<QuadrantRegions | undefined>(undefined);
  /** Title of the horizontal axis */
  readonly xLabel = input<string | undefined>(undefined);
  /** Title of the vertical axis */
  readonly yLabel = input<string | undefined>(undefined);
  /** Texts at the ends of the dividers, drawn inside the plot */
  readonly axisLabels = input<QuadrantAxisLabels | undefined>(undefined);
  /** Shows the numeric ticks of the axes (default `true`) */
  readonly showTicks = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /** Reverses the horizontal axis (e.g. "urgent" on the left) */
  readonly reverseX = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /** Draws the labels next to the dots (default `true`) */
  readonly showLabels = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /** Dot diameter in pixels (default 12) */
  readonly pointSize = input<number | undefined>(undefined);
  /** Name of the points in the tooltip */
  readonly name = input<string | undefined>(undefined);
  /** Lets the user drag the tasks (default `true`; `false` keeps the keyboard moves off too) */
  readonly draggable = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /** Number of tasks in each quadrant header (default `true`); a function `(count, points) => text` returns the text */
  readonly showCounts = input<ShowCounts | undefined, unknown>(undefined, {
    transform: (value: unknown) =>
      typeof value === "function"
        ? (value as Exclude<ShowCounts, boolean>)
        : optionalBoolean(value),
  });
  /** Index of the selected task (`null`: none); by default the last clicked, added, edited or moved task */
  readonly selectedIndex = input<number | null | undefined>(undefined);
  /** Indices of other selected tasks */
  readonly selectedIndices = input<readonly number[] | undefined>(undefined);
  /** Visually hidden list of the tasks for keyboards and screen readers (default `true`) */
  readonly accessiblePoints = input(true, { transform: booleanAttribute });

  /**
   * The next list of tasks after an add, an edit, a delete, a drag and drop
   * or a keyboard move (`[(points)]`)
   */
  readonly pointsChange = output<QuadrantPoint[]>();
  /** The hovered (or keyboard-focused) task changed (`null`: none) */
  readonly hover = output<ChartHoverEvent | null>();
  /** A task was clicked (it becomes the active task) */
  readonly pointClick = output<{ point: QuadrantPoint; index: number }>();
  /** A task is being dragged (on every move, with the quadrant under the pointer) */
  readonly pointDrag = output<QuadrantPointDrop>();
  /** The user zoomed or panned */
  readonly zoom = output<ChartView>();
  /** The backend is ready (or fell back after a GPU loss) */
  readonly rendererChange = output<ChartRendererKind>();

  protected readonly s = s;
  protected readonly icons = QUADRANT_TASK_ICONS;
  protected readonly corners = QUADRANT_CORNERS;
  protected readonly scope = injectScope();
  private readonly chart = viewChild.required(MnQuadrantChart);

  protected readonly language = computed(
    () => this.locale() ?? this.scope.language(),
  );
  protected readonly texts = computed(() =>
    quadrantTaskLabels(this.language(), this.labels()),
  );
  private readonly defaults = computed(() => quadrantLabels(this.language()));

  /** Dialog content (`null`: closed) */
  protected readonly draft = signal<QuadrantTaskDraft | null>(null);
  /** Index of the task whose delete is being confirmed */
  protected readonly deleting = signal<number | null>(null);
  private readonly selection = signal<number | null>(null);
  protected readonly selected = computed(() => {
    const own = this.selectedIndex();
    return own !== undefined ? own : this.selection();
  });

  protected readonly editing = computed(() => {
    const draft = this.draft();
    return (
      draft !== null && (draft.index === null || !!this.points()[draft.index])
    );
  });
  protected readonly canSave = computed(() =>
    canSaveQuadrantTask(this.draft(), this.points()),
  );
  protected readonly deletingPoint = computed(() => {
    const index = this.deleting();
    return index === null ? undefined : this.points()[index];
  });
  protected readonly deleteText = computed(() =>
    quadrantTaskDeleteText(this.texts(), this.deletingPoint()),
  );

  private geometry() {
    return {
      xDomain: this.xDomain(),
      yDomain: this.yDomain(),
      xSplit: this.xSplit(),
      ySplit: this.ySplit(),
      reverseX: this.reverseX(),
    };
  }

  /** Title of a quadrant (its `quadrants` label, else the built-in name) */
  protected title(corner: QuadrantCorner): string {
    return this.quadrants()?.[corner]?.label || this.defaults()[corner];
  }

  protected countText(points: readonly QuadrantPoint[]): string | undefined {
    return quadrantCountText(
      this.showCounts() ?? true,
      points,
      this.language(),
    );
  }

  protected add(corner: QuadrantCorner, at?: { x: number; y: number }): void {
    this.draft.set(newQuadrantTaskDraft(this.geometry(), corner, at));
  }

  protected edit(index: number): void {
    this.draft.set(
      editQuadrantTaskDraft(this.geometry(), this.points(), index),
    );
  }

  protected setLabel(label: string): void {
    this.draft.update((draft) => draft && { ...draft, label });
  }

  protected setQuadrant(quadrant: string | undefined): void {
    if (!quadrant) return;
    this.draft.update(
      (draft) => draft && { ...draft, quadrant: quadrant as QuadrantCorner },
    );
  }

  protected save(event: Event): void {
    event.preventDefault();
    const saved = applyQuadrantTaskDraft(
      this.geometry(),
      this.points(),
      this.draft(),
    );
    if (!saved) return;
    this.pointsChange.emit(saved.points);
    this.selection.set(saved.index);
    this.draft.set(null);
  }

  protected remove(): void {
    const index = this.deleting();
    if (index !== null && this.points()[index]) {
      this.pointsChange.emit(removeQuadrantTask(this.points(), index));
      this.selection.update((selected) =>
        selectionAfterRemove(selected, index),
      );
    }
    this.deleting.set(null);
  }

  protected onPointClick(event: { point: QuadrantPoint; index: number }): void {
    this.selection.set(event.index);
    this.pointClick.emit(event);
  }

  protected onPointDrop(drop: QuadrantPointDrop): void {
    this.pointsChange.emit(moveQuadrantTask(this.points(), drop.index, drop));
    this.selection.set(drop.index);
  }

  /** Shows the whole data range */
  resetZoom(): void {
    this.chart().resetZoom();
  }

  /** Visible range, `null` before the first render */
  getView(): ChartView | null {
    return this.chart().getView();
  }

  /** Sets the visible range */
  setView(view: Partial<ChartView>): void {
    this.chart().setView(view);
  }

  /** Backend in use, `null` until ready */
  getRenderer(): ChartRendererKind | null {
    return this.chart().getRenderer();
  }
}
