import { css, html, nothing, type PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { live } from "lit/directives/live.js";
import {
  addDays,
  dayKey,
  localDate,
  monthStart,
  parseDayKey,
  sameMonth,
} from "@minerva/core";
import {
  contains,
  getTabbables,
  logicalArrowKey,
  parsePlacement,
} from "@minerva/dom";
import inputStyles from "@react-styles/components/Input/input.module.scss?inline";
import iconButtonStyles from "@react-styles/components/IconButton/iconButton.module.scss?inline";
import styles from "@react-styles/components/DatePicker/datePicker.module.scss?inline";
import {
  FloatingLayerController,
  popoverResetStyles,
} from "../../controllers/floating-layer";
import { AriaController } from "../../internal/aria";
import {
  FormAssociatedElement,
  type ValidityResult,
} from "../../internal/form";
import {
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
  IconX,
} from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { hostStyles } from "../../internal/minerva-element";
import { sharedStyles } from "../../internal/styles";

const WEEKDAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;

/**
 * Type a calendar date or choose it from an accessible popup month grid.
 * Form-associated: submits YYYY-MM-DD, supports required, reset and disabled fieldsets.
 * @summary Date field with a keyboard-accessible popup calendar and inclusive date bounds.
 * @tag minerva-date-picker
 * @csspart root - Field wrapper
 * @csspart control - Input box
 * @csspart input - Native text input
 * @csspart clear-button - Clear action
 * @csspart icon - Calendar icon
 * @csspart content - Popup dialog
 * @csspart day - Calendar day cell
 * @fires minerva-change - Committed date, detail: { value }; empty string when cleared
 * @fires minerva-input - Draft input text, detail: { value }
 * @fires minerva-open-change - Cancelable popup change, detail: { open }
 * @fires minerva-clear - Cleared date
 * @fires change - Native-like bubbling change after a committed date
 */
export class MinervaDatePicker extends FormAssociatedElement {
  static override tagName = "minerva-date-picker";
  static override shadowRootOptions = {
    ...FormAssociatedElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static override styles = [
    hostStyles,
    popoverResetStyles,
    css`
      :host {
        display: inline-block;
        vertical-align: middle;
      }
      .datePicker .root {
        width: 100%;
      }
    `,
    sharedStyles(inputStyles),
    sharedStyles(iconButtonStyles),
    sharedStyles(styles),
  ];
  /** Name submitted with form data. */
  @property({ reflect: true }) override name = "date-picker";
  /** Current date (YYYY-MM-DD), or empty; property assignment controls the current value. */
  @property({ attribute: false }) value = "";
  /** Initial date, restored by form reset. */
  @property({ attribute: "value" }) defaultValue = "";
  /** Whether the calendar is open. */
  @property({ type: Boolean, reflect: true }) open = false;
  /** Accessible field and popup label. */
  @property() label?: string;
  /** Input placeholder; localized by default. */
  @property() placeholder?: string;
  /** Calendar heading locale. */
  @property() locale?: string;
  /** Input control size. */
  @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";
  /** Error state. */
  @property({ type: Boolean, reflect: true }) invalid = false;
  /** Prevents typing, selection and clearing. */
  @property({ type: Boolean, reflect: true, attribute: "readonly" }) readOnly =
    false;
  /** Hides the clear action. */
  @property({ type: Boolean, attribute: "hide-clear-button" }) hideClearButton =
    false;
  /** Earliest selectable date, inclusive (YYYY-MM-DD). */
  @property({ attribute: "min-date" }) minDate?: string;
  /** Latest selectable date, inclusive (YYYY-MM-DD). */
  @property({ attribute: "max-date" }) maxDate?: string;
  @state() private draft: string | null = null;
  @state() private month = monthStart(new Date());
  @state() private focusedKey = "";
  @query("input") private input?: HTMLInputElement;
  @query(".datePicker") private field?: HTMLElement;
  @query(".popup") private popup?: HTMLElement;
  private dirty = false;
  private pendingFocus = false;
  private readonly i18n = new LocaleController(this);
  private readonly aria = new AriaController(this, () => this.labels);
  private readonly floating = new FloatingLayerController(this, () => ({
    anchor: () => this.input,
    floating: () => this.popup,
    placement: "bottom-start",
    branches: () => [this.field],
    onDismiss: () => this.requestOpenChange(false),
    returnFocusOnEscape: () => this.input,
    focusable: true,
  }));
  /** Current date as a local Date, null when empty or invalid. */
  get valueAsDate() {
    return parseDayKey(this.value || "", true);
  }
  override focus(options?: FocusOptions) {
    this.input?.focus(options);
  }
  override blur() {
    this.input?.blur();
  }
  private get interactive() {
    return !this.isDisabled && !this.readOnly;
  }
  private allowed(value: string) {
    return (
      !!parseDayKey(value, true) &&
      (!this.minDate || value >= this.minDate) &&
      (!this.maxDate || value <= this.maxDate)
    );
  }
  protected getFormValue() {
    return this.valueAsDate ? dayKey(this.valueAsDate) : "";
  }
  protected override getValidity(): ValidityResult {
    if (this.required && !this.valueAsDate)
      return {
        flags: { valueMissing: true },
        message: this.i18n.t("validation.valueMissing"),
        anchor: this.input,
      };
    if (this.valueAsDate && !this.allowed(this.value))
      return {
        flags: { customError: true },
        message: [this.minDate, this.maxDate].filter(Boolean).join(" – "),
        anchor: this.input,
      };
    return { flags: {}, message: "" };
  }
  protected resetFormValue() {
    this.dirty = false;
    this.draft = null;
    this.value = this.defaultValue;
    this.open = false;
  }
  protected override restoreFormState(state: unknown) {
    if (typeof state === "string") this.value = state;
  }
  protected override willUpdate(changed: PropertyValues<this>) {
    if (changed.has("value") && changed.get("value") !== undefined)
      this.dirty = this.value !== this.defaultValue || this.dirty;
    if (
      changed.has("defaultValue") &&
      !this.dirty &&
      (this.hasUpdated || this.hasAttribute("value"))
    )
      this.value = this.defaultValue;
    if (changed.has("open") && this.open) {
      this.month = monthStart(this.valueAsDate ?? new Date());
      this.focusedKey = dayKey(this.valueAsDate ?? new Date());
    }
  }
  protected override updated(changed: PropertyValues<this>) {
    super.updated(changed);
    this.floating.sync(this.open && this.interactive);
    if (this.open && this.pendingFocus) {
      this.popup
        ?.querySelector<HTMLElement>(`[data-date="${this.focusedKey}"]`)
        ?.focus();
      this.pendingFocus = false;
    }
  }
  private requestOpenChange(open: boolean) {
    if (open && !this.interactive) return false;
    if (open === this.open) return true;
    const allowed = this.emit(
      "minerva-open-change",
      { open },
      { cancelable: true },
    );
    if (allowed) this.open = open;
    return allowed;
  }
  private commit(value: string) {
    if (!this.interactive || (value && !this.allowed(value))) return;
    this.dirty = true;
    this.value = value;
    this.dispatchEvent(new Event("change", { bubbles: true }));
    this.emit("minerva-change", { value });
  }
  private handleInput(event: Event) {
    if (!this.interactive) return;
    const text = (event.target as HTMLInputElement).value;
    this.draft = text;
    this.emit("minerva-input", { value: text });
    if (!text || this.allowed(text)) {
      this.commit(text);
      if (text) this.month = monthStart(parseDayKey(text)!);
    }
  }
  private handleBlur() {
    if (this.draft === null) return;
    const parsed = parseDayKey(this.draft.trim(), false);
    const next = parsed ? dayKey(parsed) : "";
    if (!this.draft.trim()) {
      if (this.value) this.commit("");
    } else if (parsed && this.allowed(next) && next !== this.value) {
      this.commit(next);
      this.month = monthStart(parsed);
    }
    this.draft = null;
  }
  private handleClear() {
    if (!this.interactive) return;
    this.draft = null;
    this.commit("");
    this.emit("minerva-clear");
    this.input?.focus();
  }
  private handleInputClick() {
    this.requestOpenChange(!this.open);
  }
  private handleInputKeyDown(event: KeyboardEvent) {
    if (event.key !== "ArrowDown" || !this.interactive) return;
    event.preventDefault();
    this.pendingFocus = true;
    if (this.open) {
      this.requestUpdate();
    } else if (!this.requestOpenChange(true)) this.pendingFocus = false;
  }
  private select(date: Date) {
    if (!this.interactive || !this.allowed(dayKey(date))) return;
    this.draft = null;
    this.commit(dayKey(date));
    this.requestOpenChange(false);
    this.input?.focus();
  }
  private handleDayKeyDown(event: KeyboardEvent, date: Date) {
    if (!this.interactive) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!event.repeat) this.select(date);
      return;
    }
    const key = logicalArrowKey(event.key, this);
    const weekday = (date.getDay() + 6) % 7;
    let target: Date;
    switch (key) {
      case "ArrowLeft":
        target = addDays(date, -1);
        break;
      case "ArrowRight":
        target = addDays(date, 1);
        break;
      case "ArrowUp":
        target = addDays(date, -7);
        break;
      case "ArrowDown":
        target = addDays(date, 7);
        break;
      case "Home":
        target = addDays(date, -weekday);
        break;
      case "End":
        target = addDays(date, 6 - weekday);
        break;
      case "PageUp":
      case "PageDown": {
        const next = monthStart(
          date,
          (key === "PageUp" ? -1 : 1) * (event.shiftKey ? 12 : 1),
        );
        target = localDate(
          next.getFullYear(),
          next.getMonth(),
          Math.min(date.getDate(), addDays(monthStart(next, 1), -1).getDate()),
        );
        break;
      }
      default:
        return;
    }
    event.preventDefault();
    this.focusedKey = dayKey(target);
    this.month = monthStart(target);
    this.pendingFocus = true;
  }
  private renderPanel(name: string) {
    const t = this.i18n.t;
    const first = monthStart(this.month);
    const start = addDays(first, -((first.getDay() + 6) % 7));
    const days = Array.from({ length: 42 }, (_, i) => addDays(start, i));
    const keys = days.map(dayKey);
    const active = keys.includes(this.focusedKey)
      ? this.focusedKey
      : dayKey(first);
    let heading: string;
    try {
      heading = new Intl.DateTimeFormat(this.locale ?? this.i18n.language, {
        month: "long",
        year: "numeric",
      }).format(first);
    } catch {
      heading = dayKey(first).slice(0, 7);
    }
    return html`<div
      part="content"
      class="popup"
      popover="manual"
      role="dialog"
      tabindex="-1"
      aria-label=${name}
      @keydown=${this.handlePanelKeyDown}
    >
      <div class="panel">
        <div class="header">
          <h2 id="heading" class="heading" aria-live="polite">${heading}</h2>
          <div class="navGroup">
            <button
              type="button"
              class="navButton"
              aria-label=${t("monthCalendar.previousMonth")}
              @click=${() => {
                this.month = monthStart(first, -1);
              }}
            >
              ${IconChevronLeft}
            </button>
            <button
              type="button"
              class="navButton"
              aria-label=${t("monthCalendar.nextMonth")}
              @click=${() => {
                this.month = monthStart(first, 1);
              }}
            >
              ${IconChevronRight}
            </button>
          </div>
        </div>
        <div class="grid" role="grid" aria-labelledby="heading">
          <div class="week" role="row">
            ${WEEKDAYS.map((d) => html`<div class="weekday" role="columnheader">${t(`monthCalendar.weekdays.${d}`)}</div>`)}
          </div>
          ${Array.from(
            { length: 6 },
            (_, week) =>
              html`<div class="week" role="row">
                ${days.slice(week * 7, week * 7 + 7).map((date) => {
                  const key = dayKey(date);
                  return html`<div
                    part="day"
                    class="day"
                    role="gridcell"
                    data-date=${key}
                    ?data-outside=${!sameMonth(date, first)}
                    aria-label=${key}
                    aria-selected=${String(key === this.value)}
                    aria-disabled=${this.allowed(key) ? nothing : "true"}
                    aria-current=${key === dayKey(new Date()) ? "date" : nothing}
                    tabindex=${key === active && this.allowed(key) ? "0" : "-1"}
                    @focus=${() => {
                      this.focusedKey = key;
                    }}
                    @click=${() => this.select(date)}
                    @keydown=${(e: KeyboardEvent) => this.handleDayKeyDown(e, date)}
                  >
                    ${date.getDate()}
                  </div>`;
                })}
              </div>`,
          )}
        </div>
        <div class="footer">
          ${
            !this.hideClearButton && this.value
              ? html`<button
                  class="footerButton"
                  type="button"
                  @click=${() => {
                    this.handleClear();
                    this.requestOpenChange(false);
                  }}
                >
                  ${t("datePicker.clear")}
                </button>`
              : nothing
          }
          <button
            class="footerButton"
            type="button"
            ?disabled=${!this.allowed(dayKey(new Date()))}
            @click=${() => this.select(new Date())}
          >
            ${t("monthCalendar.today")}</button
          ><button
            class="footerButton"
            type="button"
            @click=${() => {
              this.requestOpenChange(false);
              this.input?.focus();
            }}
          >
            ${t("modal.close")}
          </button>
        </div>
      </div>
    </div>`;
  }
  protected override hookStates() {
    const placement =
      this.open && this.floating.isOpen
        ? this.floating.position.placement
        : undefined;
    const { side, align } = placement
      ? parsePlacement(placement)
      : { side: undefined, align: undefined };
    return {
      placement,
      side,
      align,
      state: this.open && this.interactive ? "open" : "closed",
      disabled: this.isDisabled,
      readonly: this.readOnly,
      invalid: this.invalid,
      size: this.size,
    };
  }
  private handlePanelKeyDown(event: KeyboardEvent) {
    const panel = event.currentTarget as HTMLElement;
    const input = this.input;
    if (
      !input ||
      event.key !== "Tab" ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey
    )
      return;
    const focused = this.shadowRoot?.activeElement ?? null;
    if (!focused || !panel.contains(focused)) return;
    const tabbables = getTabbables(panel);
    const leaves =
      tabbables.length === 0 ||
      (event.shiftKey
        ? focused === panel || focused === tabbables[0]
        : focused === tabbables[tabbables.length - 1]);
    if (!leaves) return;
    event.preventDefault();
    const next = event.shiftKey
      ? input
      : (this.shadowRoot?.querySelector<HTMLElement>(".clearButton") ??
        this.tabbableAfter() ??
        input);
    next.focus();
    this.requestOpenChange(false);
  }

  /** The first tabbable element of the page after this element. */
  private tabbableAfter(): HTMLElement | null {
    const all = getTabbables(this.ownerDocument.body);
    let last = -1;
    all.forEach((el, i) => {
      if (contains(this, el)) last = i;
    });
    if (last === -1) {
      return (
        all.find(
          (el) =>
            !!(
              this.compareDocumentPosition(el) &
              Node.DOCUMENT_POSITION_FOLLOWING
            ),
        ) ?? null
      );
    }
    return all.slice(last + 1).find((el) => !contains(this, el)) ?? null;
  }

  protected override render() {
    const { t } = this.i18n;
    const disabled = this.isDisabled;
    const readonly = this.readOnly;
    const current = this.valueAsDate;
    const name = this.label || this.aria.label || t("datePicker.label");
    const displayValue = this.draft ?? (current ? dayKey(current) : "");
    const showClear =
      !this.hideClearButton && !!current && !disabled && !readonly;

    return html`<div part="root" class="datePicker">
        <div
          part="control"
          class=${classMap({
            root: true,
            outline: true,
            [this.size]: true,
            invalid: this.invalid,
            disabled,
          })}
          data-component="input"
        >
          <input
            part="input"
            class="field"
            .value=${live(displayValue)}
            placeholder=${this.placeholder ?? t("datePicker.placeholder")}
            ?disabled=${disabled}
            ?readonly=${readonly}
            ?required=${this.required}
            autocomplete="off"
            aria-label=${name}
            aria-description=${this.aria.description ?? nothing}
            aria-invalid=${
              this.invalid || this.aria.attr("aria-invalid") === "true"
                ? "true"
                : nothing
            }
            aria-readonly=${readonly ? "true" : nothing}
            @input=${this.handleInput}
            @blur=${this.handleBlur}
            @click=${this.handleInputClick}
            @keydown=${this.handleInputKeyDown}
          />
          <span class="addon end">
            ${
              showClear
                ? html`<button
                    part="clear-button"
                    type="button"
                    class="iconButton neutral variant-ghost small circle clearButton"
                    aria-label=${t("datePicker.clear")}
                    @click=${this.handleClear}
                  >
                    ${IconX}
                  </button>`
                : html`<span part="icon" class="calendarIcon" aria-hidden="true"
                    >${IconCalendar}</span
                  >`
            }
          </span>
        </div>
      </div>
      ${this.open && !disabled && !readonly ? this.renderPanel(name) : nothing}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-date-picker": MinervaDatePicker;
  }
}
