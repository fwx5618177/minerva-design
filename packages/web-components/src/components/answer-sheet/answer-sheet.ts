import { css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "@react-styles/components/AnswerSheet/answerSheet.module.scss?inline";
import {
  answerSheetLegend,
  answerSheetMoveIndex,
  answerSheetSections,
  answerSheetSummary,
  type AnswerSheetMove,
} from "@minerva/core";
import { centerInScroller, logicalArrowKey, nearestInRow } from "@minerva/dom";
import { AriaController } from "../../internal/aria";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { itemParts } from "../../internal/styling-hooks";
import { sharedStyles } from "../../internal/styles";

/** Status of a question */
export type AnswerSheetStatus =
  "unanswered" | "answered" | "correct" | "wrong" | "skipped";

/** Pill density */
export type AnswerSheetSize = "small" | "medium";

/** "wrap" wraps the pills on several rows; "scroll" keeps a single scrolling row */
export type AnswerSheetLayout = "wrap" | "scroll";

/** A question of the sheet */
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

/** A titled section */
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
 * exam session (`<AnswerSheet>` of React): a `nav` landmark of buttons,
 * grouped by section (`groups`), each with a status (unanswered, answered,
 * correct, wrong, skipped) and an optional flag. The current question
 * carries `aria-current="step"`. Keyboard: one tab stop (roving
 * `tabindex`); ArrowLeft / ArrowRight move in order (RTL swaps them),
 * ArrowUp / ArrowDown by a row, Home / End to the ends, Enter / Space
 * select.
 *
 * Selecting a question updates `value` and fires `minerva-change`.
 *
 * @summary A question navigator: numbered pills with statuses, grouped by section.
 * @tag minerva-answer-sheet
 * @csspart root - The outermost element (a `nav` landmark)
 * @csspart total - The "12 / 20 answered" summary (with `show-summary`)
 * @csspart group - A section of questions (`role=group` when titled)
 * @csspart group-label - The title of a section
 * @csspart grid - The element holding the pills of a section
 * @csspart item - A question pill (a button)
 * @csspart item--current - Item state of `item`: the current question
 * @csspart item--disabled - Item state of `item`: disabled
 * @csspart item--flagged - Item state of `item`: flagged
 * @csspart item--status-unanswered - Item state of `item`: status unanswered
 * @csspart item--status-answered - Item state of `item`: status answered
 * @csspart item--status-correct - Item state of `item`: status correct
 * @csspart item--status-wrong - Item state of `item`: status wrong
 * @csspart item--status-skipped - Item state of `item`: status skipped
 * @csspart indicator - The flag dot of a flagged question
 * @csspart legend - The legend of the statuses (with `show-legend`)
 * @csspart legend-item - An entry of the legend
 * @fires minerva-change - The user selected a question (`detail: { value }`, its key)
 */
export class MinervaAnswerSheet extends MinervaElement {
  static override tagName = "minerva-answer-sheet";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        inline-size: 100%;
        min-inline-size: 0;
      }
    `,
    sharedStyles(styles),
  ];

  /** The questions, in order */
  @property({ attribute: false })
  items: readonly AnswerSheetItem[] = [];

  /** Titled sections, in display order (items render under the group whose key matches `item.group`) */
  @property({ attribute: false })
  groups?: readonly AnswerSheetGroup[];

  /** Key of the current question */
  @property({ reflect: true })
  value?: string;

  /** Pill density */
  @property({ reflect: true })
  size: AnswerSheetSize = "medium";

  /** "wrap" wraps the pills on several rows; "scroll" keeps a single horizontally scrolling row */
  @property({ reflect: true })
  layout: AnswerSheetLayout = "wrap";

  /** Fixed number of columns (ArrowUp / ArrowDown move by a row); ignored with layout="scroll" */
  @property({ type: Number })
  columns?: number;

  /** Shows a legend of the statuses present (and of the flag) */
  @property({ type: Boolean, attribute: "show-legend", reflect: true })
  showLegend = false;

  /** Shows the number of answered questions ("12 / 20 answered") */
  @property({ type: Boolean, attribute: "show-summary", reflect: true })
  showSummary = false;

  /** Disables the whole sheet */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Accessible name of a pill, from the item and its display index (default: "Question <n>, <status>", localized) */
  @property({ attribute: false })
  getItemLabel?: (item: AnswerSheetItem, index: number) => string;

  /** Pill holding the roving tab stop after focus / keyboard moves */
  @state()
  private focusedKey = "";

  private pendingFocus: string | null = null;
  private readonly baseId = `mn-answer-sheet-${++uid}`;
  private readonly i18n = new LocaleController(this);
  private readonly aria = new AriaController(this);

  override focus(options?: FocusOptions): void {
    this.renderRoot
      .querySelector<HTMLElement>('[data-key][tabindex="0"]')
      ?.focus(options);
  }

  private pills(): HTMLElement[] {
    return Array.from(
      this.renderRoot.querySelectorAll<HTMLElement>("[data-key]"),
    );
  }

  private select(item: AnswerSheetItem) {
    if (this.disabled || item.disabled) return;
    if (item.key === this.value) return;
    this.value = item.key;
    this.emit("minerva-change", { value: item.key });
  }

  private get gridColumns(): number | undefined {
    return this.layout !== "scroll" && this.columns && this.columns > 0
      ? Math.floor(this.columns)
      : undefined;
  }

  private handleKeyDown(
    event: KeyboardEvent,
    item: AnswerSheetItem,
    index: number,
  ) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!event.repeat) this.select(item);
      return;
    }
    // RTL: the rows run right to left, so ArrowLeft is the next question.
    const move = KEY_MOVES[logicalArrowKey(event.key, this)];
    if (!move) return;
    event.preventDefault();
    const columns = this.gridColumns;
    let target: string | undefined;
    if ((move === "up" || move === "down") && !columns) {
      // wrapping rows: the closest pill of the row above / below (measured)
      if (this.layout === "scroll") return;
      target = nearestInRow(
        this.pills(),
        event.currentTarget as HTMLElement,
        move === "down" ? 1 : -1,
      )?.dataset.key;
    } else {
      const sections = answerSheetSections(this.items, this.groups);
      const next = answerSheetMoveIndex(sections, index, move, columns);
      if (next !== null) {
        target = sections.flatMap((section) => section.entries)[next]?.item.key;
      }
    }
    if (!target) return;
    this.pendingFocus = target;
    if (target === this.focusedKey) this.focusPending();
    else this.focusedKey = target;
  }

  private focusPending() {
    const key = this.pendingFocus;
    if (!key) return;
    this.pendingFocus = null;
    this.pills()
      .find((pill) => pill.dataset.key === key)
      ?.focus();
  }

  protected override updated(): void {
    this.focusPending();
    this.revealCurrent();
  }

  /** Key of the last pill revealed in the scroll row ("" when none) */
  private revealed = "";

  /**
   * layout="scroll": keeps the current pill in view (scrolling the row only)
   * on first render and when the value or the layout change.
   */
  private revealCurrent() {
    const pill =
      this.layout === "scroll" && this.value
        ? this.pills().find((element) => element.dataset.key === this.value)
        : undefined;
    const state = pill ? `${this.value}` : "";
    if (state === this.revealed) return;
    this.revealed = state;
    if (pill?.parentElement) centerInScroller(pill.parentElement, pill);
  }

  protected override hookStates() {
    return {
      disabled: this.disabled,
      size: this.size === "small" ? "small" : "medium",
      layout: this.layout === "scroll" ? "scroll" : "wrap",
    };
  }

  protected override render() {
    const t = this.i18n.t;
    const items = Array.isArray(this.items) ? this.items : [];
    const sections = answerSheetSections(items, this.groups);
    const keys = sections.flatMap((section) =>
      section.entries.map((entry) => entry.item.key),
    );
    const value = this.value || undefined;
    const activeKey =
      [this.focusedKey, value].find((key) => key && keys.includes(key)) ??
      keys[0];
    const { size, layout } = this.hookStates();
    const columns = this.gridColumns;
    const legend = this.showLegend ? answerSheetLegend(items) : [];
    const itemLabel = (item: AnswerSheetItem, index: number, status: string) =>
      this.getItemLabel
        ? this.getItemLabel(item, index)
        : t(item.flagged ? "answerSheet.itemFlagged" : "answerSheet.item", {
            number: item.label ?? index + 1,
            status: t(`answerSheet.status.${status}`),
          });

    return html`<nav
      part="root"
      class=${classMap({
        answerSheet: true,
        [size]: true,
        scroll: layout === "scroll",
      })}
      aria-label=${this.aria.label ?? t("answerSheet.label")}
    >
      ${
        this.showSummary
          ? html`<p part="total" class="summary">
              ${t("answerSheet.summary", answerSheetSummary(items))}
            </p>`
          : nothing
      }
      ${sections.map((section, sectionIndex) => {
        const titleId = section.title
          ? `${this.baseId}-group-${sectionIndex}`
          : undefined;
        return html`<div
          part="group"
          class="section"
          role=${titleId ? "group" : nothing}
          aria-labelledby=${titleId ?? nothing}
        >
          ${
            titleId
              ? html`<div part="group-label" class="sectionTitle" id=${titleId}>
                  ${section.title}
                </div>`
              : nothing
          }
          <div
            part="grid"
            class=${columns ? "grid columns" : "grid"}
            style=${styleMap(
              columns
                ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }
                : {},
            )}
          >
            ${section.entries.map(({ item, index, status, label }) => {
              const current = value === item.key;
              const itemDisabled = this.disabled || !!item.disabled;
              return html`<button
                type="button"
                part=${itemParts("item", {
                  current,
                  disabled: itemDisabled,
                  flagged: !!item.flagged,
                  status,
                })}
                class="item ${status}"
                data-key=${item.key}
                aria-label=${itemLabel(item, index, status)}
                aria-current=${current ? "step" : nothing}
                aria-disabled=${itemDisabled ? "true" : nothing}
                tabindex=${item.key === activeKey ? "0" : "-1"}
                @focus=${() => (this.focusedKey = item.key)}
                @click=${() => this.select(item)}
                @keydown=${(event: KeyboardEvent) =>
                  this.handleKeyDown(event, item, index)}
              >
                ${label}${
                  item.flagged
                    ? html`<span
                        part="indicator"
                        class="flag"
                        aria-hidden="true"
                      ></span>`
                    : nothing
                }
              </button>`;
            })}
          </div>
        </div>`;
      })}
      ${
        legend.length
          ? html`<ul part="legend" class="legend">
              ${legend.map(
                (entry) =>
                  html`<li part="legend-item" class="legendItem">
                    <span class="swatch ${entry}" aria-hidden="true"></span
                    >${t(`answerSheet.legend.${entry}`)}
                  </li>`,
              )}
            </ul>`
          : nothing
      }
    </nav>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-answer-sheet": MinervaAnswerSheet;
  }
}
