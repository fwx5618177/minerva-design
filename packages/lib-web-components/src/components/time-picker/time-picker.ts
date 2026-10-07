import { css, html, nothing, type PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { live } from "lit/directives/live.js";
import { contains, getTabbables } from "@minerva/core";
import inputStyles from "@lib-core-styles/components/Input/input.module.scss?inline";
import iconButtonStyles from "@lib-core-styles/components/IconButton/iconButton.module.scss?inline";
import styles from "@lib-core-styles/components/TimePicker/timePicker.module.scss?inline";
import panelStyles from "@lib-core-styles/components/TimePicker/timePickerPanel.module.scss?inline";
import {
  FloatingLayerController,
  popoverResetStyles,
} from "../../controllers/floating-layer";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import { getDirection } from "../../internal/dom";
import {
  FormAssociatedElement,
  type ValidityResult,
} from "../../internal/form";
import { IconClock, IconX } from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { hostStyles } from "../../internal/minerva-element";
import {
  formatHasSeconds,
  formatTime,
  resolveTimeFormat,
  parseTimeInput,
  parseTimeValue,
  secondsOfDay,
  startOfToday,
  toTimeValue,
} from "./utils";
import { sharedStyles } from "../../internal/styles";

export type TimePickerSize = "small" | "medium" | "large";
/** Display formats of lib-core's TimePicker (any HH / H / hh / h / mm / m / ss / s / a pattern works) */
export type TimePickerFormat =
  "HH:mm:ss" | "HH:mm" | "hh:mm:ss a" | "hh:mm a" | (string & {});

type Kind = "hour" | "minute" | "second" | "ampm";

interface TimeUnit {
  value: number;
  disabled: boolean;
  label: string;
}

interface Column {
  kind: Kind;
  label: string;
  items: TimeUnit[];
  selected: number;
  toValue: (v: number) => number;
}

const units = (
  count: number,
  step: number,
  start = 0,
  isDisabled: (value: number) => boolean = () => false,
): TimeUnit[] => {
  const items: TimeUnit[] = [];
  for (let i = start; i < start + count; i += Math.max(1, step)) {
    items.push({
      value: i,
      disabled: isDisabled(i),
      label: String(i).padStart(2, "0"),
    });
  }
  return items;
};

/**
 * Time field (`<TimePicker>` of lib-core): type a time or pick hours /
 * minutes / seconds (/ AM-PM) from a panel of listbox columns.
 *
 * The input toggles the panel on click; ArrowDown opens it and moves focus
 * into the hours column (Up / Down / Home / End move, Enter / Space pick,
 * Left / Right switch column, Tab past the last column leaves the field,
 * Shift+Tab before the first returns to the input). Escape (topmost layer
 * only) closes the panel and returns focus to the input; a pointer down or
 * focus outside closes it too.
 *
 * Seconds have one source of truth, the format in use: `hide-second`
 * removes the seconds token from `format` ("HH:mm:ss" -> "HH:mm"), and the
 * seconds column is shown exactly when that format has seconds.
 *
 * Form-associated: submits the value (24-hour `HH:mm:ss`, or `HH:mm` when
 * the format in use has no seconds) under `name`, supports
 * `required`, `form.reset()` (restores the `value` attribute) and
 * `<fieldset disabled>`. Name it with `label`, `<label for>`, `aria-label` or
 * `aria-labelledby` (default: localized "Time").
 *
 * @summary Time field with a typable input and an hours / minutes / seconds panel.
 * @tag minerva-time-picker
 * @csspart base - The field wrapper (`.timePicker`)
 * @csspart control - The input box (`.root` of lib-core's Input)
 * @csspart input - The native `<input>`
 * @csspart clear-button - The clear button
 * @csspart icon - The clock icon (shown when there is no clear button)
 * @csspart panel - The popup panel (`role="dialog"`)
 * @csspart column - An hours / minutes / seconds / AM-PM column (`role="listbox"`)
 * @csspart item - A time unit (`role="option"`)
 * @fires minerva-change - The time was committed (picked, typed, normalized on blur or cleared), `detail: { value }` (`""` when cleared)
 * @fires minerva-input - The text of the input changed while typing, `detail: { value }` (the typed text)
 * @fires minerva-open-change - The user opened / closed the panel, `detail: { open }`; cancelable: `preventDefault()` keeps the current state
 * @fires minerva-clear - The clear button emptied the field
 * @fires change - Same as `minerva-change` (native-like, bubbles)
 */
export class MinervaTimePicker extends FormAssociatedElement {
  static override tagName = "minerva-time-picker";

  /** Name submitted with the form data (same default as the React TimePicker) */
  @property({ reflect: true })
  override name = "time-picker";
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
      .timePicker {
        display: block;
      }
      .timePicker .root {
        width: 100%;
      }
    `,
    sharedStyles(inputStyles),
    sharedStyles(iconButtonStyles),
    sharedStyles(styles),
    sharedStyles(panelStyles),
  ];

  /** Current value: 24-hour `HH:mm:ss` / `HH:mm` (`""` = no time). The `value` attribute sets `defaultValue` */
  @property({ attribute: false })
  value = "";

  /**
   * Initial value, restored by `form.reset()` (the `value` attribute,
   * `HH:mm` or `HH:mm:ss`). Changing it also changes `value` until the user edits it
   */
  @property({ attribute: "value" })
  defaultValue = "";

  /** Whether the panel is open */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** Display format (tokens HH / H / hh / h / mm / m / ss / s / a) */
  @property({ reflect: true })
  format: TimePickerFormat = "HH:mm:ss";

  /** Uses a 12-hour clock with an AM/PM column */
  @property({ type: Boolean, reflect: true, attribute: "use-12-hours" })
  use12Hours = false;

  /** Placeholder of the input (default: localized "Select time") */
  @property()
  placeholder?: string;

  /** Accessible label of the input and panel (default: aria-label, `<label>`, else localized "Time") */
  @property()
  label?: string;

  /** Height and font size */
  @property({ reflect: true })
  size: TimePickerSize = "medium";

  /** Error state; sets aria-invalid */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /** Shows the value without allowing changes (typing, panel, clearing) */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /** Hides the clear button (lib-core: `clearable={false}`) */
  @property({ type: Boolean, reflect: true, attribute: "hide-clear-button" })
  hideClearButton = false;

  /** Hides the seconds column (lib-core: `showSecond={false}`) */
  @property({ type: Boolean, reflect: true, attribute: "hide-second" })
  hideSecond = false;

  /** Earliest selectable time (`HH:mm` / `HH:mm:ss`); earlier options are disabled */
  @property({ attribute: "min-time" })
  minTime?: string;

  /** Latest selectable time (`HH:mm` / `HH:mm:ss`); later options are disabled */
  @property({ attribute: "max-time" })
  maxTime?: string;

  /** Interval between hour options */
  @property({ type: Number, attribute: "hour-step" })
  hourStep = 1;

  /** Interval between minute options */
  @property({ type: Number, attribute: "minute-step" })
  minuteStep = 1;

  /** Interval between second options */
  @property({ type: Number, attribute: "second-step" })
  secondStep = 1;

  /** Text being typed; `null` = show the formatted value */
  @state()
  private draft: string | null = null;

  @query("input")
  private input?: HTMLInputElement;

  @query(".timePicker")
  private field?: HTMLElement;

  @query(".popup")
  private popup?: HTMLElement;

  private readonly locale = new LocaleController(this);
  private readonly aria = new AriaController(this, () => this.labels);
  private readonly floating = new FloatingLayerController(this, () => ({
    anchor: () => this.input,
    floating: () => this.popup,
    placement: "bottom-start",
    // the field (input + clear button) is part of the popup layer
    branches: () => [this.field],
    onDismiss: () => this.requestOpenChange(false),
    returnFocusOnEscape: () => this.input,
    focusable: true,
  }));

  /** The user (or a script setting `value`) changed the value */
  private dirty = false;
  /** Opened from the keyboard: focus moves into the first column */
  private focusPanelOnOpen = false;

  /** The value as a `Date` (today's date), `null` when empty or invalid */
  get valueAsDate(): Date | null {
    return parseTimeValue(this.value);
  }

  override focus(options?: FocusOptions): void {
    this.input?.focus(options);
  }

  override blur(): void {
    this.input?.blur();
  }

  /** Opens the panel (no event) */
  show(): void {
    this.open = true;
  }

  /** Closes the panel (no event) */
  hide(): void {
    this.open = false;
  }

  /** Format in use: `hide-second` removes the seconds token */
  private get effectiveFormat(): string {
    return resolveTimeFormat(this.format, !this.hideSecond);
  }

  /** The seconds column follows the format in use (single source of truth) */
  private get withSeconds(): boolean {
    return formatHasSeconds(this.effectiveFormat);
  }

  private get interactive(): boolean {
    return !this.isDisabled && !this.readonly;
  }

  protected getFormValue(): string {
    const current = this.valueAsDate;
    return current ? toTimeValue(current, this.withSeconds) : "";
  }

  protected override getValidity(): ValidityResult {
    if (this.required && !this.valueAsDate) {
      return {
        flags: { valueMissing: true },
        message: this.locale.t("validation.valueMissing"),
        anchor: this.input,
      };
    }
    return { flags: {}, message: "" };
  }

  protected resetFormValue(): void {
    this.dirty = false;
    this.draft = null;
    this.value = this.defaultValue;
  }

  protected override restoreFormState(state: unknown): void {
    if (typeof state === "string") this.value = state;
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has("value") && changed.get("value") !== undefined) {
      this.dirty = this.value !== this.defaultValue || this.dirty;
    }
    if (changed.has("defaultValue") && !this.dirty) {
      this.value = this.defaultValue;
    }
    if (DEV) this.checkUsage(changed);
  }

  private checkUsage(changed: PropertyValues<this>) {
    const tag = MinervaTimePicker.tagName;
    if (changed.has("value") && this.value && !parseTimeValue(this.value)) {
      devWarn(
        tag,
        `value "${this.value}" is not a valid time: use 24-hour "HH:mm" or "HH:mm:ss".`,
      );
    }
    if (changed.has("minTime") || changed.has("maxTime")) {
      for (const [name, text] of [
        ["min-time", this.minTime],
        ["max-time", this.maxTime],
      ] as const) {
        if (text && !parseTimeValue(text)) {
          devWarn(
            tag,
            `${name} "${text}" is not a valid time: use 24-hour "HH:mm" or "HH:mm:ss".`,
          );
        }
      }
      const min = parseTimeValue(this.minTime);
      const max = parseTimeValue(this.maxTime);
      if (min && max && secondsOfDay(min) > secondsOfDay(max)) {
        devWarn(
          tag,
          `min-time (${this.minTime}) is later than max-time (${this.maxTime}): no time can be selected.`,
        );
      }
    }
  }

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);
    const open = this.open && this.interactive;
    this.floating.sync(open);
    if (!open) {
      this.focusPanelOnOpen = false;
      return;
    }
    if (changed.has("open") || changed.has("disabled")) {
      const popup = this.popup;
      popup
        ?.querySelectorAll<HTMLElement>('[aria-selected="true"]')
        .forEach((el) => el.scrollIntoView?.({ block: "nearest" }));
      if (this.focusPanelOnOpen) this.focusFirstColumn();
    }
  }

  private focusFirstColumn() {
    this.popup
      ?.querySelector<HTMLElement>('[role="option"][tabindex="0"]')
      ?.focus();
  }

  /** Asks to change `open`; listeners can cancel `minerva-open-change`. */
  private requestOpenChange(open: boolean): boolean {
    if (open === this.open) return true;
    const allowed = this.emit(
      "minerva-open-change",
      { open },
      { cancelable: true },
    );
    if (allowed) this.open = open;
    return allowed;
  }

  private commit(next: Date | null) {
    this.value = next ? toTimeValue(next, this.withSeconds) : "";
    this.dispatchEvent(new Event("change", { bubbles: true }));
    this.emit("minerva-change", { value: this.value });
  }

  private handleTimeChange(type: Kind, val: number) {
    const next = new Date(this.valueAsDate ?? startOfToday());
    if (type === "hour") next.setHours(val);
    else if (type === "minute") next.setMinutes(val);
    else if (type === "second") next.setSeconds(val);
    else {
      const hours = next.getHours() % 12;
      next.setHours(val === 1 ? hours + 12 : hours);
    }
    this.draft = null;
    this.commit(next);
  }

  private handleInput(event: Event) {
    const text = (event.target as HTMLInputElement).value;
    this.draft = text;
    this.emit("minerva-input", { value: text });
    const parsed = parseTimeInput(text, this.effectiveFormat, {
      strict: true,
      base: this.valueAsDate ?? undefined,
    });
    if (parsed) this.commit(parsed);
  }

  private handleBlur() {
    const draft = this.draft;
    if (draft === null) return;
    const current = this.valueAsDate;
    if (draft.trim() === "") {
      if (current) this.commit(null);
    } else {
      const parsed = parseTimeInput(draft, this.effectiveFormat, {
        strict: false,
        base: current ?? undefined,
      });
      if (parsed && parsed.getTime() !== current?.getTime())
        this.commit(parsed);
    }
    this.draft = null;
  }

  private handleClear() {
    this.draft = null;
    this.commit(null);
    this.emit("minerva-clear");
    this.input?.focus();
  }

  private handleInputClick() {
    if (!this.interactive) return;
    this.focusPanelOnOpen = false;
    this.requestOpenChange(!this.open);
  }

  private handleInputKeyDown(event: KeyboardEvent) {
    // ArrowDown (also Alt+ArrowDown) opens the panel and moves focus into it
    if (event.key !== "ArrowDown") return;
    event.preventDefault();
    if (!this.interactive) return;
    if (!this.open) {
      this.focusPanelOnOpen = true;
      if (!this.requestOpenChange(true)) this.focusPanelOnOpen = false;
    } else {
      this.focusFirstColumn();
    }
  }

  /**
   * The panel sits after the field in the Tab order: Tab past its last
   * column continues after the input (its clear button, then the rest of the
   * page); Shift+Tab before its first column returns to the input.
   */
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

  private handleColumnKeyDown(event: KeyboardEvent, columnIndex: number) {
    const column = event.currentTarget as HTMLElement;
    const target = event.target as HTMLElement;
    const options = Array.from(
      column.querySelectorAll<HTMLElement>('[role="option"]'),
    );
    const enabled = options.filter(
      (o) => o.getAttribute("aria-disabled") !== "true",
    );
    const index = enabled.indexOf(target);
    const columns =
      this.popup?.querySelectorAll<HTMLElement>('[role="listbox"]');
    const count = columns?.length ?? 0;
    const focusColumn = (i: number) =>
      columns?.[i]?.querySelector<HTMLElement>('[tabindex="0"]')?.focus();
    let key = event.key;
    // RTL: columns are laid out right to left, so ArrowLeft is the next one.
    if (getDirection(this) === "rtl") {
      if (key === "ArrowLeft") key = "ArrowRight";
      else if (key === "ArrowRight") key = "ArrowLeft";
    }
    switch (key) {
      case "ArrowDown":
        event.preventDefault();
        enabled[Math.min(enabled.length - 1, index + 1)]?.focus();
        break;
      case "ArrowUp":
        event.preventDefault();
        enabled[Math.max(0, index - 1)]?.focus();
        break;
      case "Home":
        event.preventDefault();
        enabled[0]?.focus();
        break;
      case "End":
        event.preventDefault();
        enabled[enabled.length - 1]?.focus();
        break;
      case "ArrowRight":
        event.preventDefault();
        focusColumn(Math.min(count - 1, columnIndex + 1));
        break;
      case "ArrowLeft":
        event.preventDefault();
        focusColumn(Math.max(0, columnIndex - 1));
        break;
      default:
        break;
    }
  }

  private pick(column: Column, unit: TimeUnit) {
    if (!unit.disabled)
      this.handleTimeChange(column.kind, column.toValue(unit.value));
  }

  private columns(value: Date): Column[] {
    const { t } = this.locale;
    const use12Hours = this.use12Hours;
    const minTime = parseTimeValue(this.minTime);
    const maxTime = parseTimeValue(this.maxTime);
    const hour = value.getHours();
    const minute = value.getMinutes();
    const second = value.getSeconds();
    const isPM = hour >= 12;
    const toHour24 = (h: number) =>
      use12Hours ? (h % 12) + (isPM ? 12 : 0) : h;

    const hours = units(
      use12Hours ? 12 : 24,
      this.hourStep,
      use12Hours ? 1 : 0,
      (h) => {
        const h24 = toHour24(h);
        return Boolean(
          (minTime && h24 < minTime.getHours()) ||
          (maxTime && h24 > maxTime.getHours()),
        );
      },
    );
    const minutes = units(60, this.minuteStep, 0, (m) =>
      Boolean(
        (minTime && hour === minTime.getHours() && m < minTime.getMinutes()) ||
        (maxTime && hour === maxTime.getHours() && m > maxTime.getMinutes()),
      ),
    );
    const seconds = units(60, this.secondStep, 0, (s) => {
      const atMin =
        minTime &&
        hour === minTime.getHours() &&
        minute === minTime.getMinutes();
      const atMax =
        maxTime &&
        hour === maxTime.getHours() &&
        minute === maxTime.getMinutes();
      return Boolean(
        (atMin && s < minTime.getSeconds()) ||
        (atMax && s > maxTime.getSeconds()),
      );
    });

    const columns: Column[] = [
      {
        kind: "hour",
        label: t("timePicker.hours"),
        items: hours,
        selected: use12Hours ? hour % 12 || 12 : hour,
        toValue: toHour24,
      },
      {
        kind: "minute",
        label: t("timePicker.minutes"),
        items: minutes,
        selected: minute,
        toValue: (v) => v,
      },
    ];
    if (this.withSeconds) {
      columns.push({
        kind: "second",
        label: t("timePicker.seconds"),
        items: seconds,
        selected: second,
        toValue: (v) => v,
      });
    }
    if (use12Hours) {
      columns.push({
        kind: "ampm",
        label: t("timePicker.period"),
        items: [
          { value: 0, label: "AM", disabled: false },
          { value: 1, label: "PM", disabled: false },
        ],
        selected: isPM ? 1 : 0,
        toValue: (v) => v,
      });
    }
    return columns;
  }

  private renderPanel(current: Date | null, name: string) {
    const hasValue = current !== null;
    const columns = this.columns(current ?? startOfToday());
    return html`<div
      part="panel"
      class="popup"
      popover="manual"
      role="dialog"
      tabindex="-1"
      aria-label=${name}
      @keydown=${this.handlePanelKeyDown}
    >
      <div class="timePickerPanel">
        <div class="timeColumns">
          ${columns.map((column, columnIndex) => {
            const firstEnabled = column.items.find((u) => !u.disabled)?.value;
            const tabStop = column.items.some(
              (u) => u.value === column.selected && !u.disabled,
            )
              ? column.selected
              : firstEnabled;
            // Roving tabindex lives on the options; the listbox is only a
            // programmatic focus target.
            return html`<div
              part="column"
              class="timeColumn"
              role="listbox"
              aria-label=${column.label}
              tabindex="-1"
              data-kind=${column.kind}
              @keydown=${(e: KeyboardEvent) =>
                this.handleColumnKeyDown(e, columnIndex)}
            >
              ${column.items.map((unit) => {
                const selected = hasValue && unit.value === column.selected;
                return html`<div
                  part="item"
                  role="option"
                  aria-selected=${selected ? "true" : "false"}
                  aria-disabled=${unit.disabled ? "true" : nothing}
                  tabindex=${unit.value === tabStop ? "0" : "-1"}
                  class=${classMap({
                    timeUnit: true,
                    selected,
                    disabled: unit.disabled,
                  })}
                  @click=${() => this.pick(column, unit)}
                  @keydown=${(e: KeyboardEvent) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      this.pick(column, unit);
                    }
                  }}
                >
                  ${unit.label}
                </div>`;
              })}
            </div>`;
          })}
        </div>
      </div>
    </div>`;
  }

  protected override render() {
    const { t } = this.locale;
    const disabled = this.isDisabled;
    const readonly = this.readonly;
    const current = this.valueAsDate;
    const name = this.label || this.aria.label || t("timePicker.label");
    const displayValue =
      this.draft ?? (current ? formatTime(current, this.effectiveFormat) : "");
    const showClear =
      !this.hideClearButton && !!current && !disabled && !readonly;

    return html`<div part="base" class="timePicker">
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
            placeholder=${this.placeholder ?? t("timePicker.placeholder")}
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
                    aria-label=${t("timePicker.clear")}
                    @click=${this.handleClear}
                  >
                    ${IconX}
                  </button>`
                : html`<span part="icon" class="clockIcon" aria-hidden="true"
                    >${IconClock}</span
                  >`
            }
          </span>
        </div>
      </div>
      ${this.open && !disabled && !readonly ? this.renderPanel(current, name) : nothing}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-time-picker": MinervaTimePicker;
  }
}
