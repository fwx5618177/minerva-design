import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from "@angular/core";
import {
  dashboardAccent,
  dashboardCount,
  dashboardLength,
  type ColorScheme,
  type DashboardCardMove,
} from "@minerva/core";
import {
  createDashboardDrag,
  dashboardDataAdapter,
  type DashboardDrag,
} from "@minerva/dom";
import { injectScope } from "../../config/scope";
import { MnHook } from "../../internal/hooks";
import { injectId } from "../../internal/ids";
import * as styles from "../../internal/styles";

/** A length: a number of pixels or any CSS length ("18rem", "40vh") */
export type DashboardLength = number | string;

/** Accent of a DashboardColumn: a theme color or any CSS color */
export type DashboardColumnColor = ColorScheme | (string & {});

export type { DashboardCardMove };

/**
 * A horizontally scrolling board of status columns (`mn-dashboard-column`),
 * equal-width by default (`columnWidth`, 18rem). `fill` stretches the
 * columns equally when they fit; `height` / `maxHeight` bound the board so
 * that the column bodies scroll vertically. The host is a labelled
 * `role="region"` and a tab stop, so the keyboard can scroll it; on narrow
 * screens the columns keep their width and snap while scrolling.
 *
 * `draggable` lets the `mn-dashboard-card` children of keyed columns (`value`)
 * be dragged with the mouse, touch (long press) or the keyboard. The board
 * is controlled: it emits each move (`cardMove`) and the app updates the
 * columns' data.
 */
@Component({
  selector: "mn-dashboard-columns",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "dashboard-columns",
    "data-part": "root",
    role: "region",
    tabindex: "0",
    "[attr.aria-label]":
      "ariaLabelledby() ? (ariaLabel() ?? null) : (ariaLabel() ?? scope.t('dashboard.label'))",
    "[attr.aria-labelledby]": "ariaLabelledby() ?? null",
    "[class]": "rootClass()",
    "[style.--dashboard-column-width]": "length(columnWidth())",
    "[style.--dashboard-gap]": "length(gap())",
    "[style.height]": "length(height())",
    "[style.max-height]": "length(maxHeight())",
  },
  template: `<ng-content />`,
})
export class MnDashboardColumns {
  /** Width of every column (a number is pixels; default 18rem); with `fill` the minimum width */
  readonly columnWidth = input<DashboardLength | undefined>(undefined);
  /** Stretches the columns equally to fill the board when they fit */
  readonly fill = input(false, { transform: booleanAttribute });
  /** Space between the columns (a number is pixels; default 0.75rem) */
  readonly gap = input<DashboardLength | undefined>(undefined);
  /** Height of the board: the column bodies scroll vertically within it */
  readonly height = input<DashboardLength | undefined>(undefined);
  /** Maximum height of the board: the column bodies scroll vertically within it */
  readonly maxHeight = input<DashboardLength | undefined>(undefined);
  /**
   * Lets the `mn-dashboard-card` children of keyed columns be dragged between
   * and within columns (mouse, touch long press, keyboard: Space / Enter
   * picks a focused card up, the arrows move it, Space / Enter drops it,
   * Escape cancels)
   */
  readonly draggable = input(false, { transform: booleanAttribute });
  /**
   * Whether a card may be dropped at a position: refused positions show no
   * drop indicator and the keyboard skips them
   */
  readonly canDrop = input<((move: DashboardCardMove) => boolean) | undefined>(
    undefined,
  );
  /**
   * A card was dropped at a new position (not when put back where it was):
   * move it in your data (`moveDashboardCard` from `minerva-design/core`)
   */
  readonly cardMove = output<DashboardCardMove>();
  /** Accessible name of the board (default: translated "Board") */
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });
  /** Id of an element naming the board (instead of aria-label) */
  readonly ariaLabelledby = input<string | undefined>(undefined, {
    alias: "aria-labelledby",
  });

  protected readonly s = styles.dashboardColumnsStyles;
  protected readonly scope = injectScope();
  /** Id of the keyboard instructions describing the draggable cards */
  readonly hintId = injectId("dashboard-hint");
  private drag: DashboardDrag | null = null;
  protected readonly rootClass = computed(() =>
    this.fill() ? `${this.s.board} ${this.s.fill}` : this.s.board,
  );
  protected length(value: DashboardLength | undefined): string | null {
    return dashboardLength(value) ?? null;
  }

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);
    // browser only; one controller for the life of the board, reading the
    // inputs lazily
    afterNextRender(() => {
      this.drag = createDashboardDrag(host, {
        ...dashboardDataAdapter(host),
        scroller: () => host,
        hintId: this.hintId,
        enabled: () => this.draggable(),
        canDrop: (move) => this.canDrop()?.(move) ?? true,
        onMove: (move) => this.cardMove.emit(move),
        t: (key, params) => this.scope.t(key, params),
      });
      destroyRef.onDestroy(() => this.drag?.destroy());
    });
    effect(() => {
      // the layer follows `draggable` and the language
      this.draggable();
      this.scope.t("dashboard.dragHint");
      this.drag?.refresh();
    });
  }
}

/**
 * A status column of an `mn-dashboard-columns`. The header shows an optional
 * accent dot (`color`: a theme color or any CSS color), the `title`, a
 * `count` badge and the projected `[mnDashboardActions]`; the projected cards
 * form a `role="list"` that scrolls vertically within a bounded board
 * (each projected card without a role gets `role="listitem"`, there is no
 * wrapper); `[mnDashboardEmpty]` content (else `empty`, default translated
 * "No items") replaces the list when there are no cards, and
 * `[mnDashboardFooter]` sits below. The host is a `role="group"` named by its
 * title and count ("To do, 3 items"). `value` keys the column for drag and
 * drop.
 */
@Component({
  selector: "mn-dashboard-column",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "dashboard-column",
    "data-part": "root",
    role: "group",
    // `title` is an input: no native tooltip on the whole column
    "[attr.title]": "null",
    "[attr.data-color]": "accent().scheme ?? null",
    "[attr.data-dashboard-column]": "value() || null",
    "[attr.aria-label]": "label() ?? null",
    "[attr.aria-labelledby]":
      "label() === undefined ? (count() !== undefined ? titleId + ' ' + countId : titleId) : null",
    "[class]": "rootClass()",
    "[style.--dashboard-column-color]": "accent().custom ?? null",
  },
  template: `<div mnHook="dashboard-column" mnPart="header" [class]="s.header">
      @if (accent().scheme || accent().custom) {
        <span
          mnHook="dashboard-column"
          mnPart="indicator"
          aria-hidden="true"
          [class]="s.indicator"
        ></span>
      }
      <span
        mnHook="dashboard-column"
        mnPart="title"
        [id]="titleId"
        [class]="s.title"
        >{{ title() }}<ng-content select="[mnDashboardTitle]"
      /></span>
      @if (count() !== undefined) {
        <span
          mnHook="dashboard-column"
          mnPart="count"
          [id]="countId"
          [attr.aria-hidden]="label() !== undefined ? 'true' : null"
          [class]="s.count"
          >{{ count() }}</span
        >
      }
      <div
        mnHook="dashboard-column"
        mnPart="actions"
        [class]="s.actions"
        [style.display]="hasActions() ? null : 'none'"
      >
        <ng-content select="[mnDashboardActions]" />
      </div>
    </div>
    @if (description()) {
      <p mnHook="dashboard-column" mnPart="description" [class]="s.description">
        {{ description() }}
      </p>
    }
    <div
      mnHook="dashboard-column"
      mnPart="list"
      role="list"
      [class]="s.list"
      [style.display]="hasCards() ? null : 'none'"
    >
      <ng-content />
    </div>
    <div
      mnHook="dashboard-column"
      mnPart="empty"
      [class]="s.empty"
      [style.display]="hasCards() ? 'none' : null"
    >
      <ng-content select="[mnDashboardEmpty]" />
      @if (!hasEmpty()) {
        {{ empty() ?? scope.t("dashboard.empty") }}
      }
    </div>
    <div
      mnHook="dashboard-column"
      mnPart="footer"
      [class]="s.footer"
      [style.display]="hasFooter() ? null : 'none'"
    >
      <ng-content select="[mnDashboardFooter]" />
    </div>`,
})
export class MnDashboardColumn {
  /** Title of the column (also its accessible name; or project `[mnDashboardTitle]`) */
  readonly title = input<string | undefined>(undefined);
  /** Key of the column, reported as `fromColumn` / `toColumn` by a draggable board (columns without one take no cards) */
  readonly value = input<string | undefined>(undefined);
  /** Number of items shown as a badge (and announced with the title); unset hides it */
  readonly count = input<number | undefined, unknown>(undefined, {
    transform: (value: unknown) => dashboardCount(value),
  });
  /** Accent: a theme color (primary, success, warning, danger, info, neutral) or any CSS color */
  readonly color = input<DashboardColumnColor | undefined>(undefined);
  /** Supporting text under the header */
  readonly description = input<string | undefined>(undefined);
  /** Text shown when there are no cards (default: translated "No items"; or project `[mnDashboardEmpty]`) */
  readonly empty = input<string | undefined>(undefined);
  /** Accessible name (default: the title with the count, translated) */
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });

  protected readonly s = styles.dashboardColumnsStyles;
  protected readonly scope = injectScope();
  protected readonly titleId = injectId("dashboard-title");
  protected readonly countId = `${this.titleId}-count`;
  protected readonly hasCards = signal(false);
  protected readonly hasActions = signal(false);
  protected readonly hasFooter = signal(false);
  protected readonly hasEmpty = signal(false);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  /** Projected cards the column gave role="listitem" */
  private readonly listItems = new Set<Element>();

  protected readonly accent = computed(() => dashboardAccent(this.color()));
  protected readonly rootClass = computed(() => {
    const scheme = this.accent().scheme;
    return scheme ? `${this.s.column} ${this.s[scheme]}` : this.s.column;
  });
  protected readonly label = computed(() => {
    const ariaLabel = this.ariaLabel();
    if (ariaLabel) return ariaLabel;
    const title = this.title()?.trim();
    if (!title) return undefined;
    const count = this.count();
    return count !== undefined
      ? this.scope.t("dashboard.columnLabel", { title, count })
      : title;
  });

  constructor() {
    // Projected content is plain DOM: observe it to toggle the list / empty
    // state and the optional wrappers, and to give the cards their role.
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      this.sync();
      if (typeof MutationObserver === "undefined") return;
      const observer = new MutationObserver(() => this.sync());
      for (const name of ["list", "actions", "empty", "footer"]) {
        const element = this.part(name);
        if (element) observer.observe(element, { childList: true });
      }
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  /** A part of this column (not of a nested one) */
  private part(name: string): Element | null {
    const root = this.host.nativeElement;
    return name === "actions"
      ? root.querySelector(
          ':scope > [data-part="header"] > [data-part="actions"]',
        )
      : root.querySelector(`:scope > [data-part="${name}"]`);
  }

  private sync() {
    const cards = Array.from(this.part("list")?.children ?? []);
    for (const item of this.listItems) {
      if (cards.includes(item)) continue;
      if (item.getAttribute("role") === "listitem")
        item.removeAttribute("role");
      this.listItems.delete(item);
    }
    for (const card of cards) {
      if (card.hasAttribute("role")) continue;
      card.setAttribute("role", "listitem");
      this.listItems.add(card);
    }
    this.hasCards.set(cards.length > 0);
    this.hasActions.set((this.part("actions")?.children.length ?? 0) > 0);
    this.hasFooter.set((this.part("footer")?.children.length ?? 0) > 0);
    this.hasEmpty.set(
      !!this.part("empty")?.querySelector(":scope > [mnDashboardEmpty]"),
    );
  }
}

/**
 * A card of an `mn-dashboard-column`, keyed by `value`. In a draggable board
 * its content sits in a focusable `role="button"` (the `root` part)
 * described by the drag instructions; otherwise the part is a plain
 * wrapper. The host is the list item of the column. Controls inside a
 * draggable card keep working (a drag never starts on them), but keep them
 * few: they sit inside the button.
 */
@Component({
  selector: "mn-dashboard-card",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[class]": "s.item" },
  template: `<div
    mnHook="dashboard-card"
    mnPart="root"
    [class]="s.card"
    [attr.data-dashboard-card]="value()"
    [attr.data-draggable]="draggable() ? '' : null"
    [attr.role]="draggable() ? 'button' : null"
    [attr.tabindex]="draggable() ? 0 : null"
    [attr.aria-label]="draggable() ? (label() ?? null) : null"
    [attr.aria-describedby]="draggable() ? board?.hintId : null"
  >
    <ng-content />
  </div>`,
})
export class MnDashboardCard {
  /** Key of the card, reported as `cardKey` by a draggable board */
  readonly value = input.required<string>();
  /** Name of the card in the drag announcements and, when draggable, its accessible name (default: its text) */
  readonly label = input<string | undefined>(undefined);

  protected readonly s = styles.dashboardColumnsStyles;
  protected readonly board = inject(MnDashboardColumns, { optional: true });
  protected readonly draggable = computed(
    () => this.board?.draggable() ?? false,
  );
}
