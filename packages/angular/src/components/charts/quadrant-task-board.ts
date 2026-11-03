import { DOCUMENT } from "@angular/common";
import {
  afterNextRender,
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  untracked,
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
  placeQuadrantTaskPanel,
  quadrantCountText,
  quadrantLabels,
  quadrantTaskColor,
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
  type QuadrantTaskBox,
  type QuadrantTaskDraft,
  type QuadrantTaskLabels,
} from "minerva-design/charts/core";
import { injectScope } from "../../config/scope";
import { injectId } from "../../internal/ids";
import { quadrantTaskBoardStyles as s } from "../../internal/styles";
import { MnButton } from "../button";
import { MnIconButton } from "../foundations";
import { MnInput } from "../input";
import { MnQuadrantChart, type QuadrantPointDrop } from "./cartesian";
import { optionalBoolean } from "./engine";

export type { QuadrantTaskLabels };

type ShowCounts =
  boolean | ((count: number, points: readonly QuadrantPoint[]) => string);

/** The inline panel: the add / edit form, or the delete confirmation */
type Panel =
  | { kind: "draft"; draft: QuadrantTaskDraft; anchor: QuadrantTaskBox }
  | { kind: "delete"; index: number; anchor: QuadrantTaskBox };

/** Half the size of the box around a task the panel keeps clear */
const DOT = 10;

const emptyBox = (): QuadrantTaskBox => ({ x: 0, y: 0, width: 0, height: 0 });

const ICON_ATTRS = `width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"`;
/** The compact icons of the toolbar of the active task */
const ACTION_ICON_ATTRS = `width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"`;

/**
 * Task board on a four-quadrant matrix (MnQuadrantChart): an add button per
 * quadrant, edit and delete buttons on the active task, an inline panel
 * anchored inside the board at the button or the task to name a task and
 * pick its quadrant, an inline confirmation before a delete (Escape or a
 * press outside closes the panel), drag and drop and keyboard moves
 * (Shift + arrows). Controlled: `points` in, `pointsChange` out
 * (`[(points)]`). The other inputs go to the chart.
 *
 * @example
 * <mn-quadrant-task-board [(points)]="tasks" [quadrants]="quadrants" reverseX />
 */
@Component({
  selector: "mn-quadrant-task-board",
  exportAs: "mnQuadrantTaskBoard",
  imports: [MnQuadrantChart, MnIconButton, MnInput, MnButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "s.board",
    "[attr.data-panel]": "shown()?.kind ?? null",
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
      (quadrantClick)="add($event.quadrant, pointerBox(), $event)"
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
          [attr.aria-expanded]="adding() === corner"
          (click)="add(corner, boxOf($event.currentTarget))"
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
          size="xsmall"
          variant="ghost"
          [label]="texts().edit"
          (click)="edit(index)"
        >
          <svg ${ACTION_ICON_ATTRS}><path [attr.d]="icons.edit" /></svg>
        </button>
        <button
          mnIconButton
          size="xsmall"
          variant="ghost"
          color="danger"
          [label]="texts().delete"
          (click)="confirmRemove(index)"
        >
          <svg ${ACTION_ICON_ATTRS}><path [attr.d]="icons.delete" /></svg>
        </button>
      </div>
    </ng-template>
    @if (draft(); as current) {
      <div
        #panel
        role="dialog"
        [attr.aria-labelledby]="ids.title"
        [class]="s.panel"
        [attr.data-quadrant-task-panel]="
          current.index === null ? 'add' : 'edit'
        "
        (keydown)="onPanelKeydown($event)"
      >
        <form [class]="s.form" (submit)="save($event)">
          <h3 [id]="ids.title" [class]="s.panelTitle">
            {{ current.index === null ? texts().add : texts().edit }}
          </h3>
          <label [class]="s.field">
            <span>{{ texts().name }}</span>
            <mn-input
              required
              size="small"
              [value]="current.label"
              [aria-label]="texts().name"
              (valueChange)="setLabel($event ?? '')"
            />
          </label>
          <fieldset [class]="s.quadrants">
            <legend>{{ texts().quadrant }}</legend>
            <div [class]="s.quadrantGrid">
              @for (corner of corners; track corner) {
                <label [class]="s.quadrant" [attr.data-corner]="corner">
                  <input
                    type="radio"
                    [name]="ids.quadrant"
                    [value]="corner"
                    [checked]="current.quadrant === corner"
                    (change)="setQuadrant(corner)"
                  />
                  <span
                    [class]="s.swatch"
                    [style.background]="color(corner)"
                    aria-hidden="true"
                  ></span>
                  <span [class]="s.quadrantName">{{ title(corner) }}</span>
                </label>
              }
            </div>
          </fieldset>
          <div [class]="s.footer">
            <button
              mnButton
              size="small"
              color="neutral"
              variant="ghost"
              (click)="close()"
            >
              {{ texts().cancel }}
            </button>
            <button mnButton size="small" type="submit" [disabled]="!canSave()">
              {{ texts().save }}
            </button>
          </div>
        </form>
      </div>
    }
    @if (deletingPoint()) {
      <div
        #panel
        role="alertdialog"
        [attr.aria-labelledby]="ids.title"
        [attr.aria-describedby]="ids.text"
        [class]="s.panel"
        data-quadrant-task-panel="delete"
        (keydown)="onPanelKeydown($event)"
      >
        <h3 [id]="ids.title" [class]="s.panelTitle">{{ texts().delete }}</h3>
        <p [id]="ids.text" [class]="s.panelText">{{ deleteText() }}</p>
        <div [class]="s.footer">
          <button
            #deleteCancel
            mnButton
            size="small"
            color="neutral"
            variant="ghost"
            (click)="close()"
          >
            {{ texts().cancel }}
          </button>
          <button mnButton size="small" color="danger" (click)="remove()">
            {{ texts().confirmDelete }}
          </button>
        </div>
      </div>
    }
  `,
})
export class MnQuadrantTaskBoard {
  /** Tasks to place (controlled: `[(points)]`, or `[points]` + `(pointsChange)`) */
  readonly points = input.required<readonly QuadrantPoint[]>();
  /** Texts of the buttons and panels (localized by default) */
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
  /** Titles and colors of the quadrants (the titles name the quadrants in the headers and the panel) */
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
  private readonly scope = injectScope();
  private readonly chart = viewChild.required(MnQuadrantChart);
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly document = inject(DOCUMENT);
  private readonly panelRef = viewChild<ElementRef<HTMLElement>>("panel");
  private readonly nameInput = viewChild(MnInput);
  private readonly deleteCancel = viewChild("deleteCancel", {
    read: ElementRef<HTMLButtonElement>,
  });
  /** Ids of the panel title, delete text and quadrant radio group */
  protected readonly ids = (() => {
    const id = injectId("quadrant-task");
    return {
      title: `${id}-title`,
      text: `${id}-text`,
      quadrant: `${id}-quadrant`,
    };
  })();

  protected readonly language = computed(
    () => this.locale() ?? this.scope.language(),
  );
  protected readonly texts = computed(() =>
    quadrantTaskLabels(this.language(), this.labels()),
  );
  private readonly defaults = computed(() => quadrantLabels(this.language()));

  /** The inline panel (`null`: closed) */
  private readonly panel = signal<Panel | null>(null);
  /** Last pointer press in the board (anchor of a click on an empty area) */
  private lastPointer: QuadrantTaskBox | null = null;
  /** Focused element before the panel opened (focused again on Escape / Cancel) */
  private returnFocus: HTMLElement | null = null;
  private readonly selection = signal<number | null>(null);
  protected readonly selected = computed(() => {
    const own = this.selectedIndex();
    return own !== undefined ? own : this.selection();
  });

  /** The open panel, unless the task it is about is gone */
  protected readonly shown = computed(() => {
    const panel = this.panel();
    if (!panel) return null;
    const points = this.points();
    const shown =
      panel.kind === "draft"
        ? panel.draft.index === null || !!points[panel.draft.index]
        : !!points[panel.index];
    return shown ? panel : null;
  });
  /** Content of the add / edit panel */
  protected readonly draft = computed(() => {
    const panel = this.shown();
    return panel?.kind === "draft" ? panel.draft : null;
  });
  /** Quadrant of the add panel (its add button is expanded) */
  protected readonly adding = computed(() => {
    const draft = this.draft();
    return draft?.index === null ? draft.quadrant : null;
  });
  protected readonly canSave = computed(() =>
    canSaveQuadrantTask(this.draft(), this.points()),
  );
  /** The task whose delete is being confirmed */
  protected readonly deletingPoint = computed(() => {
    const panel = this.shown();
    return panel?.kind === "delete" ? this.points()[panel.index] : undefined;
  });
  protected readonly deleteText = computed(() =>
    quadrantTaskDeleteText(this.texts(), this.deletingPoint()),
  );
  /** Anchor and kind of the shown panel: it is placed and focused when they change */
  private readonly opened = computed(
    () => {
      const panel = this.shown();
      return panel ? { anchor: panel.anchor, kind: panel.kind } : null;
    },
    {
      equal: (a, b) => a?.anchor === b?.anchor && a?.kind === b?.kind,
    },
  );
  private readonly isOpen = computed(() => this.shown() !== null);

  constructor() {
    const destroyRef = inject(DestroyRef);
    // where the last press in the board was (before the chart or the
    // toolbar of the active task handle it)
    afterNextRender(() => {
      const track = (event: PointerEvent) => {
        const b = this.host.getBoundingClientRect();
        this.lastPointer = {
          x: event.clientX - b.left,
          y: event.clientY - b.top,
          width: 0,
          height: 0,
        };
      };
      this.host.addEventListener("pointerdown", track, true);
      destroyRef.onDestroy(() =>
        this.host.removeEventListener("pointerdown", track, true),
      );
    });
    // next to its anchor, inside the board; the first field (or Cancel)
    // takes the focus
    afterRenderEffect(() => {
      const opened = this.opened();
      const el = this.panelRef()?.nativeElement;
      if (!opened || !el) return;
      untracked(() => {
        const place = placeQuadrantTaskPanel(
          opened.anchor,
          { width: el.offsetWidth, height: el.offsetHeight },
          { width: this.host.clientWidth, height: this.host.clientHeight },
        );
        el.style.left = `${place.x}px`;
        el.style.top = `${place.y}px`;
        el.style.transformOrigin = `${place.origin.x}px ${place.origin.y}px`;
        el.dataset["placement"] = place.placement;
        if (opened.kind === "draft")
          this.nameInput()?.focus({ preventScroll: true });
        else this.deleteCancel()?.nativeElement.focus({ preventScroll: true });
      });
    });
    // a press outside the panel closes it, like a popover
    effect((onCleanup) => {
      if (!this.isOpen()) return;
      const onDown = (event: PointerEvent) => {
        const panel = this.panelRef()?.nativeElement;
        if (panel && event.composedPath().includes(panel)) return;
        this.returnFocus = null;
        this.panel.set(null);
      };
      this.document.addEventListener("pointerdown", onDown, true);
      onCleanup(() =>
        this.document.removeEventListener("pointerdown", onDown, true),
      );
    });
  }

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

  /** Color of a quadrant (its swatch in the quadrant picker) */
  protected color(corner: QuadrantCorner): string {
    return quadrantTaskColor(this.quadrants(), corner);
  }

  protected countText(points: readonly QuadrantPoint[]): string | undefined {
    return quadrantCountText(
      this.showCounts() ?? true,
      points,
      this.language(),
    );
  }

  /** Box of an element, relative to the board */
  protected boxOf(el: EventTarget | null | undefined): QuadrantTaskBox {
    if (!(el instanceof Element)) return emptyBox();
    const b = this.host.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return {
      x: r.left - b.left,
      y: r.top - b.top,
      width: r.width,
      height: r.height,
    };
  }

  /** The last press in the board, as a 0 x 0 box */
  protected pointerBox(): QuadrantTaskBox {
    return this.lastPointer ? { ...this.lastPointer } : emptyBox();
  }

  /** Box around a task (its anchor in the chart), else the last press */
  private pointBox(index: number): QuadrantTaskBox {
    const el = this.host.querySelector(
      `.minerva-chart-quadrant-point[data-point-index="${index}"]`,
    );
    if (!el) return this.pointerBox();
    const box = this.boxOf(el);
    return {
      x: box.x - DOT,
      y: box.y - DOT,
      width: 2 * DOT,
      height: 2 * DOT,
    };
  }

  private open(next: Panel): void {
    if (!this.panel()) {
      let active = this.document.activeElement;
      while (active?.shadowRoot?.activeElement)
        active = active.shadowRoot.activeElement;
      this.returnFocus = active instanceof HTMLElement ? active : null;
    }
    this.panel.set(next);
  }

  protected close(): void {
    this.panel.set(null);
    const target = this.returnFocus;
    this.returnFocus = null;
    if (target?.isConnected) target.focus();
  }

  protected onPanelKeydown(event: KeyboardEvent): void {
    if (event.key !== "Escape") return;
    event.preventDefault();
    event.stopPropagation();
    this.close();
  }

  protected add(
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

  protected edit(index: number): void {
    const draft = editQuadrantTaskDraft(this.geometry(), this.points(), index);
    if (draft)
      this.open({ kind: "draft", draft, anchor: this.pointBox(index) });
  }

  protected confirmRemove(index: number): void {
    this.open({ kind: "delete", index, anchor: this.pointBox(index) });
  }

  private setDraft(change: Partial<QuadrantTaskDraft>): void {
    this.panel.update((panel) =>
      panel?.kind === "draft"
        ? { ...panel, draft: { ...panel.draft, ...change } }
        : panel,
    );
  }

  protected setLabel(label: string): void {
    this.setDraft({ label });
  }

  protected setQuadrant(quadrant: QuadrantCorner): void {
    this.setDraft({ quadrant });
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
    this.close();
  }

  protected remove(): void {
    const panel = this.shown();
    if (panel?.kind === "delete" && this.points()[panel.index]) {
      const index = panel.index;
      this.pointsChange.emit(removeQuadrantTask(this.points(), index));
      this.selection.update((selected) =>
        selectionAfterRemove(selected, index),
      );
    }
    this.close();
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
