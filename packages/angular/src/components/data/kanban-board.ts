import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  booleanAttribute,
  computed,
  inject,
  input,
  signal,
} from "@angular/core";
import {
  kanbanAccent,
  kanbanCount,
  kanbanLength,
  type ColorScheme,
} from "@minerva/core";
import { injectScope } from "../../config/scope";
import { MnHook } from "../../internal/hooks";
import { injectId } from "../../internal/ids";
import * as styles from "../../internal/styles";

/** A length: a number of pixels or any CSS length ("18rem", "40vh") */
export type KanbanLength = number | string;

/** Accent of a KanbanColumn: a theme color or any CSS color */
export type KanbanColumnColor = ColorScheme | (string & {});

/**
 * A horizontally scrolling board of status columns (`mn-kanban-column`),
 * equal-width by default (`columnWidth`, 18rem). `fill` stretches the
 * columns equally when they fit; `height` / `maxHeight` bound the board so
 * that the column bodies scroll vertically. The host is a labelled
 * `role="region"` and a tab stop, so the keyboard can scroll it; on narrow
 * screens the columns keep their width and snap while scrolling.
 *
 * Drag and drop is not built in: move cards with your own actions (a menu,
 * buttons) and update the columns' data.
 */
@Component({
  selector: "mn-kanban-board",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "kanban-board",
    "data-part": "root",
    role: "region",
    tabindex: "0",
    "[attr.aria-label]":
      "ariaLabelledby() ? (ariaLabel() ?? null) : (ariaLabel() ?? scope.t('kanban.label'))",
    "[attr.aria-labelledby]": "ariaLabelledby() ?? null",
    "[class]": "rootClass()",
    "[style.--kanban-column-width]": "length(columnWidth())",
    "[style.--kanban-gap]": "length(gap())",
    "[style.height]": "length(height())",
    "[style.max-height]": "length(maxHeight())",
  },
  template: `<ng-content />`,
})
export class MnKanbanBoard {
  /** Width of every column (a number is pixels; default 18rem); with `fill` the minimum width */
  readonly columnWidth = input<KanbanLength | undefined>(undefined);
  /** Stretches the columns equally to fill the board when they fit */
  readonly fill = input(false, { transform: booleanAttribute });
  /** Space between the columns (a number is pixels; default 0.75rem) */
  readonly gap = input<KanbanLength | undefined>(undefined);
  /** Height of the board: the column bodies scroll vertically within it */
  readonly height = input<KanbanLength | undefined>(undefined);
  /** Maximum height of the board: the column bodies scroll vertically within it */
  readonly maxHeight = input<KanbanLength | undefined>(undefined);
  /** Accessible name of the board (default: translated "Board") */
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });
  /** Id of an element naming the board (instead of aria-label) */
  readonly ariaLabelledby = input<string | undefined>(undefined, {
    alias: "aria-labelledby",
  });

  protected readonly s = styles.kanbanBoardStyles;
  protected readonly scope = injectScope();
  protected readonly rootClass = computed(() =>
    this.fill() ? `${this.s.board} ${this.s.fill}` : this.s.board,
  );
  protected length(value: KanbanLength | undefined): string | null {
    return kanbanLength(value) ?? null;
  }
}

/**
 * A status column of an `mn-kanban-board`. The header shows an optional
 * accent dot (`color`: a theme color or any CSS color), the `title`, a
 * `count` badge and the projected `[mnKanbanActions]`; the projected cards
 * form a `role="list"` that scrolls vertically within a bounded board
 * (each projected card without a role gets `role="listitem"`, there is no
 * wrapper); `[mnKanbanEmpty]` content (else `empty`, default translated
 * "No items") replaces the list when there are no cards, and
 * `[mnKanbanFooter]` sits below. The host is a `role="group"` named by its
 * title and count ("To do, 3 items").
 */
@Component({
  selector: "mn-kanban-column",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "kanban-column",
    "data-part": "root",
    role: "group",
    // `title` is an input: no native tooltip on the whole column
    "[attr.title]": "null",
    "[attr.data-color]": "accent().scheme ?? null",
    "[attr.aria-label]": "label() ?? null",
    "[attr.aria-labelledby]":
      "label() === undefined ? (count() !== undefined ? titleId + ' ' + countId : titleId) : null",
    "[class]": "rootClass()",
    "[style.--kanban-column-color]": "accent().custom ?? null",
  },
  template: `<div mnHook="kanban-column" mnPart="header" [class]="s.header">
      @if (accent().scheme || accent().custom) {
        <span
          mnHook="kanban-column"
          mnPart="indicator"
          aria-hidden="true"
          [class]="s.indicator"
        ></span>
      }
      <span
        mnHook="kanban-column"
        mnPart="title"
        [id]="titleId"
        [class]="s.title"
        >{{ title() }}<ng-content select="[mnKanbanTitle]"
      /></span>
      @if (count() !== undefined) {
        <span
          mnHook="kanban-column"
          mnPart="count"
          [id]="countId"
          [attr.aria-hidden]="label() !== undefined ? 'true' : null"
          [class]="s.count"
          >{{ count() }}</span
        >
      }
      <div
        mnHook="kanban-column"
        mnPart="actions"
        [class]="s.actions"
        [style.display]="hasActions() ? null : 'none'"
      >
        <ng-content select="[mnKanbanActions]" />
      </div>
    </div>
    @if (description()) {
      <p mnHook="kanban-column" mnPart="description" [class]="s.description">
        {{ description() }}
      </p>
    }
    <div
      mnHook="kanban-column"
      mnPart="list"
      role="list"
      [class]="s.list"
      [style.display]="hasCards() ? null : 'none'"
    >
      <ng-content />
    </div>
    <div
      mnHook="kanban-column"
      mnPart="empty"
      [class]="s.empty"
      [style.display]="hasCards() ? 'none' : null"
    >
      <ng-content select="[mnKanbanEmpty]" />
      @if (!hasEmpty()) {
        {{ empty() ?? scope.t("kanban.empty") }}
      }
    </div>
    <div
      mnHook="kanban-column"
      mnPart="footer"
      [class]="s.footer"
      [style.display]="hasFooter() ? null : 'none'"
    >
      <ng-content select="[mnKanbanFooter]" />
    </div>`,
})
export class MnKanbanColumn {
  /** Title of the column (also its accessible name; or project `[mnKanbanTitle]`) */
  readonly title = input<string | undefined>(undefined);
  /** Number of items shown as a badge (and announced with the title); unset hides it */
  readonly count = input<number | undefined, unknown>(undefined, {
    transform: (value: unknown) => kanbanCount(value),
  });
  /** Accent: a theme color (primary, success, warning, danger, info, neutral) or any CSS color */
  readonly color = input<KanbanColumnColor | undefined>(undefined);
  /** Supporting text under the header */
  readonly description = input<string | undefined>(undefined);
  /** Text shown when there are no cards (default: translated "No items"; or project `[mnKanbanEmpty]`) */
  readonly empty = input<string | undefined>(undefined);
  /** Accessible name (default: the title with the count, translated) */
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });

  protected readonly s = styles.kanbanBoardStyles;
  protected readonly scope = injectScope();
  protected readonly titleId = injectId("kanban-title");
  protected readonly countId = `${this.titleId}-count`;
  protected readonly hasCards = signal(false);
  protected readonly hasActions = signal(false);
  protected readonly hasFooter = signal(false);
  protected readonly hasEmpty = signal(false);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  /** Projected cards the column gave role="listitem" */
  private readonly listItems = new Set<Element>();

  protected readonly accent = computed(() => kanbanAccent(this.color()));
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
      ? this.scope.t("kanban.columnLabel", { title, count })
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
      !!this.part("empty")?.querySelector(":scope > [mnKanbanEmpty]"),
    );
  }
}
