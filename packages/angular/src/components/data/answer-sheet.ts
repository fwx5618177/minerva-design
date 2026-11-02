import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterEveryRender,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  signal,
} from "@angular/core";
import {
  answerSheetLegend,
  answerSheetMoveIndex,
  answerSheetSections,
  answerSheetSummary,
  type AnswerSheetMove,
} from "@minerva/core";
import { centerInScroller, logicalArrowKey, nearestInRow } from "@minerva/dom";
import { injectScope } from "../../config/scope";
import { MnHook } from "../../internal/hooks";
import * as styles from "../../internal/styles";

/** Status of an AnswerSheet question */
export type AnswerSheetStatus =
  "unanswered" | "answered" | "correct" | "wrong" | "skipped";

/** Density of an AnswerSheet */
export type AnswerSheetSize = "small" | "medium";

/** "wrap" wraps the pills on several rows; "scroll" keeps a single scrolling row */
export type AnswerSheetLayout = "wrap" | "scroll";

/** A question of an AnswerSheet */
export interface AnswerSheetItem {
  /** Unique key of the question (the value of the sheet) */
  key: string;
  /** Visible label; defaults to its number across all the groups */
  label?: string;
  /** Status of the question (default "unanswered") */
  status?: AnswerSheetStatus;
  /** Flags the question for review (a warning dot in a corner) */
  flagged?: boolean;
  /** The question can't be selected */
  disabled?: boolean;
  /** Key of its group; items without a known group render first, untitled */
  group?: string;
}

/** A titled section of an AnswerSheet */
export interface AnswerSheetGroup {
  /** Key matched by `item.group` */
  key: string;
  /** Visible title */
  title: string;
}

const KEY_MOVES: Record<string, AnswerSheetMove> = {
  ArrowLeft: "previous",
  ArrowRight: "next",
  ArrowUp: "up",
  ArrowDown: "down",
  Home: "first",
  End: "last",
};

let uid = 0;

/**
 * A grid of numbered pills to jump between the questions of a practice or
 * exam session (a `navigation` landmark of buttons), grouped by section,
 * each with a status (unanswered, answered, correct, wrong, skipped) and an
 * optional flag. The current question carries `aria-current="step"` and is
 * `[(value)]`. Keyboard: a roving tab stop; ArrowLeft / ArrowRight move in
 * order, ArrowUp / ArrowDown by a row, Home / End to the ends, Enter /
 * Space select.
 */
@Component({
  selector: "mn-answer-sheet",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "answer-sheet",
    "data-part": "root",
    role: "navigation",
    "[attr.aria-label]": "ariaLabel() ?? scope.t('answerSheet.label')",
    "[attr.data-disabled]": "disabled() ? '' : null",
    "[attr.data-size]": "size()",
    "[attr.data-layout]": "layout()",
    "[class]": "rootClass()",
  },
  template: `@if (showSummary()) {
      <p mnHook="answer-sheet" mnPart="total" [class]="s.summary">
        {{ scope.t("answerSheet.summary", summary()) }}
      </p>
    }
    @for (section of view(); track section.key) {
      <div
        mnHook="answer-sheet"
        mnPart="group"
        [class]="s.section"
        [attr.role]="section.titleId ? 'group' : null"
        [attr.aria-labelledby]="section.titleId"
      >
        @if (section.titleId) {
          <div
            mnHook="answer-sheet"
            mnPart="group-label"
            [class]="s.sectionTitle"
            [id]="section.titleId"
          >
            {{ section.title }}
          </div>
        }
        <div
          mnHook="answer-sheet"
          mnPart="grid"
          [class]="gridClass()"
          [style.grid-template-columns]="gridTemplate()"
        >
          @for (pill of section.pills; track pill.key) {
            <button
              type="button"
              mnHook="answer-sheet"
              mnPart="item"
              [mnStates]="{
                current: pill.current,
                disabled: pill.disabled,
                flagged: pill.flagged,
                status: pill.status,
              }"
              [class]="pill.className"
              [attr.data-key]="pill.key"
              [attr.aria-label]="pill.ariaLabel"
              [attr.aria-current]="pill.current ? 'step' : null"
              [attr.aria-disabled]="pill.disabled ? 'true' : null"
              [attr.tabindex]="pill.tabindex"
              (focus)="focused.set(pill.key)"
              (click)="select(pill.item)"
              (keydown)="navigate($event, pill.item, pill.index)"
            >
              {{ pill.label }}
              @if (pill.flagged) {
                <span
                  mnHook="answer-sheet"
                  mnPart="indicator"
                  [class]="s.flag"
                  aria-hidden="true"
                ></span>
              }
            </button>
          }
        </div>
      </div>
    }
    @if (legend().length) {
      <ul mnHook="answer-sheet" mnPart="legend" [class]="s.legend">
        @for (entry of legend(); track entry) {
          <li mnHook="answer-sheet" mnPart="legend-item" [class]="s.legendItem">
            <span [class]="swatchClass(entry)" aria-hidden="true"></span
            >{{ scope.t("answerSheet.legend." + entry) }}
          </li>
        }
      </ul>
    }`,
})
export class MnAnswerSheet {
  /** The questions, in order */
  readonly items = input<readonly AnswerSheetItem[]>([]);
  /** Titled sections, in display order (items render under the group whose key matches `item.group`) */
  readonly groups = input<readonly AnswerSheetGroup[] | undefined>(undefined);
  /** Key of the current question (`[(value)]`) */
  readonly value = model<string | null>(null);
  /** Pill density */
  readonly size = input<AnswerSheetSize>("medium");
  /** "wrap" wraps the pills on several rows; "scroll" keeps a single horizontally scrolling row */
  readonly layout = input<AnswerSheetLayout>("wrap");
  /** Fixed number of columns (ArrowUp / ArrowDown move by a row); ignored with layout="scroll" */
  readonly columns = input<number | undefined, unknown>(undefined, {
    transform: (value: unknown) => {
      const n = Number(value);
      return value == null || value === "" || !(n > 0)
        ? undefined
        : Math.floor(n);
    },
  });
  /** Shows a legend of the statuses present (and of the flag) */
  readonly showLegend = input(false, { transform: booleanAttribute });
  /** Shows the number of answered questions ("12 / 20 answered") */
  readonly showSummary = input(false, { transform: booleanAttribute });
  /** Accessible name of a pill, from the item and its display index (default: "Question <n>, <status>", translated) */
  readonly getItemLabel = input<
    ((item: AnswerSheetItem, index: number) => string) | undefined
  >(undefined);
  /** Disables the whole sheet */
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Accessible name of the navigation landmark (default: translated "Questions") */
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });

  protected readonly s = styles.answerSheetStyles;
  protected readonly scope = injectScope();
  protected readonly focused = signal("");
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly baseId = `mn-answer-sheet-${++uid}`;
  /** Pill to focus once rendered (keyboard navigation) */
  private pendingFocus: string | null = null;
  /** Key of the last pill revealed in the scroll row ("" when none) */
  private revealed = "";

  constructor() {
    afterEveryRender(() => {
      this.revealCurrent();
      if (!this.pendingFocus) return;
      const key = this.pendingFocus;
      this.pendingFocus = null;
      this.pills()
        .find((pill) => pill.dataset["key"] === key)
        ?.focus();
    });
  }

  protected readonly rootClass = computed(() =>
    [
      this.s.answerSheet,
      this.size() === "small" ? this.s.small : "",
      this.layout() === "scroll" ? this.s.scroll : "",
    ]
      .filter(Boolean)
      .join(" "),
  );
  private readonly gridColumns = computed(() =>
    this.layout() === "scroll" ? undefined : this.columns(),
  );
  protected readonly gridClass = computed(() =>
    this.gridColumns() ? `${this.s.grid} ${this.s.columns}` : this.s.grid,
  );
  protected readonly gridTemplate = computed(() => {
    const columns = this.gridColumns();
    return columns ? `repeat(${columns}, minmax(0, 1fr))` : null;
  });
  private readonly sections = computed(() =>
    answerSheetSections(this.items(), this.groups()),
  );
  protected readonly summary = computed(() => answerSheetSummary(this.items()));
  protected readonly legend = computed(() =>
    this.showLegend() ? answerSheetLegend(this.items()) : [],
  );
  protected readonly view = computed(() => {
    const sections = this.sections();
    const keys = sections.flatMap((section) =>
      section.entries.map((entry) => entry.item.key),
    );
    const value = this.value();
    // Roving tab stop: the focused pill, else the current one, else the 1st.
    const activeKey =
      [this.focused(), value].find(
        (key): key is string => !!key && keys.includes(key),
      ) ?? keys[0];
    const getItemLabel = this.getItemLabel();
    const disabled = this.disabled();
    const t = (key: string, options?: Record<string, unknown>) =>
      this.scope.t(key, options);
    return sections.map((section, sectionIndex) => ({
      key: section.key || "-",
      title: section.title,
      titleId: section.title ? `${this.baseId}-group-${sectionIndex}` : null,
      pills: section.entries.map(({ item, index, status, label }) => ({
        item,
        index,
        key: item.key,
        label,
        status,
        current: value === item.key,
        disabled: disabled || !!item.disabled,
        flagged: !!item.flagged,
        className: this.statusClass(this.s.item, status),
        ariaLabel: getItemLabel
          ? getItemLabel(item, index)
          : t(item.flagged ? "answerSheet.itemFlagged" : "answerSheet.item", {
              number: item.label ?? index + 1,
              status: t(`answerSheet.status.${status}`),
            }),
        tabindex: item.key === activeKey ? 0 : -1,
      })),
    }));
  });

  private statusClass(base: string, entry: string): string {
    const extra = (this.s as Record<string, string | undefined>)[entry];
    return extra ? `${base} ${extra}` : base;
  }

  protected swatchClass(entry: string): string {
    return this.statusClass(this.s.swatch, entry);
  }

  private pills(): HTMLElement[] {
    return Array.from(
      this.host.nativeElement.querySelectorAll<HTMLElement>("[data-key]"),
    );
  }

  /**
   * layout="scroll": keeps the current pill in view (scrolling the row only)
   * on first render and when the value or the layout change.
   */
  private revealCurrent() {
    const value = this.value();
    const pill =
      this.layout() === "scroll" && value
        ? this.pills().find((element) => element.dataset["key"] === value)
        : undefined;
    const state = pill && value ? value : "";
    if (state === this.revealed) return;
    this.revealed = state;
    if (pill?.parentElement) centerInScroller(pill.parentElement, pill);
  }

  protected select(item: AnswerSheetItem) {
    if (this.disabled() || item.disabled) return;
    if (item.key !== this.value()) this.value.set(item.key);
  }

  protected navigate(
    event: KeyboardEvent,
    item: AnswerSheetItem,
    index: number,
  ) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!event.repeat) this.select(item);
      return;
    }
    const from = event.currentTarget as HTMLElement;
    // RTL: the rows run right to left, so ArrowLeft is the next question.
    const move = KEY_MOVES[logicalArrowKey(event.key, from)];
    if (!move) return;
    event.preventDefault();
    const columns = this.gridColumns();
    let target: string | undefined;
    if ((move === "up" || move === "down") && !columns) {
      // wrapping rows: the closest pill of the row above / below (measured)
      if (this.layout() === "scroll") return;
      target = nearestInRow(this.pills(), from, move === "down" ? 1 : -1)
        ?.dataset["key"];
    } else {
      const sections = this.sections();
      const next = answerSheetMoveIndex(sections, index, move, columns);
      if (next !== null) {
        target = sections.flatMap((section) => section.entries)[next]?.item.key;
      }
    }
    if (!target) return;
    this.pendingFocus = target;
    if (target === this.focused()) {
      this.pills()
        .find((pill) => pill.dataset["key"] === target)
        ?.focus();
      this.pendingFocus = null;
    } else {
      this.focused.set(target);
    }
  }

  /** Focuses the pill holding the tab stop */
  focus(options?: FocusOptions): void {
    this.host.nativeElement
      .querySelector<HTMLElement>('[data-key][tabindex="0"]')
      ?.focus(options);
  }
}
