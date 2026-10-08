import { css, html, nothing, type PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { createTypeahead, getNextIndex, parsePlacement } from "@minerva/core";
import styles from "@lib-core-styles/components/Select/select.module.scss?inline";
import {
  FloatingLayerController,
  popoverResetStyles,
} from "../../controllers/floating-layer";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import {
  FormAssociatedElement,
  type ValidityResult,
} from "../../internal/form";
import { IconCheck, IconChevronDown } from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { hostStyles } from "../../internal/minerva-element";
import { MinervaOption } from "./option";
import { sharedStyles } from "../../internal/styles";

export type SelectSize = "small" | "medium" | "large";

/** An option given through the `options` property */
export interface SelectOptionData {
  /** Value of the option (must not be empty) */
  value: string;
  /** Text of the option */
  label: string;
  /** Prevents selecting the option */
  disabled?: boolean;
  /** Text used for typeahead (default: `label`) */
  textValue?: string;
}

/** A labelled group of options given through the `options` property */
export interface SelectOptionGroupData {
  /** Heading of the group */
  label: string;
  /** Options of the group */
  options: SelectOptionData[];
}

/** Which option is highlighted when the listbox opens. */
type OpenIntent = "selected" | "first" | "last";

/** Metadata of an option (property or light DOM). */
interface ItemRecord {
  value: string;
  disabled: boolean;
  /** Typeahead text */
  text: string;
  /** Text shown in the trigger when selected */
  label: string;
}

const PAGE_SIZE = 10;

const isGroup = (
  entry: SelectOptionData | SelectOptionGroupData,
): entry is SelectOptionGroupData =>
  Array.isArray((entry as SelectOptionGroupData).options);

const isOptionDisabled = (option: HTMLElement) =>
  option.getAttribute("aria-disabled") === "true";

const optionValue = (option: HTMLElement) =>
  option instanceof MinervaOption ? option.value : (option.dataset.value ?? "");

const isPrintable = (event: KeyboardEvent) =>
  event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;

/**
 * Single-choice dropdown (`<Select>` of lib-core) following the WAI-ARIA
 * "select-only combobox" pattern: a `<button role="combobox">` trigger and a
 * `role="listbox"` popup anchored below it (flips above when there is no
 * room, at least as wide as the trigger, height capped to the viewport).
 * Options are `<minerva-option>` children (optionally in
 * `<minerva-option-group>` with a `<minerva-select-label>`, separated by
 * `<minerva-select-separator>`) and / or the `options` property (rendered
 * before the children).
 *
 * Keyboard: Enter / Space / ArrowDown / ArrowUp / Home / End open the
 * listbox (DOM focus moves to the highlighted option); typing on the closed
 * trigger selects the matching option without opening; in the listbox the
 * arrows (no wrap, disabled options skipped), Home / End, PageUp / PageDown
 * and typeahead move, Enter / Space / Alt+ArrowUp select, Escape closes
 * (topmost layer only) and Tab closes, focus returning to the trigger.
 *
 * Form-associated: submits `value` under `name`, `required` makes an empty
 * value invalid (`valueMissing`), `form.reset()` restores the `value`
 * attribute, `<fieldset disabled>` disables it.
 *
 * @summary Single-choice dropdown (select-only combobox + listbox).
 * @tag minerva-select
 * @slot - `<minerva-option>`, `<minerva-option-group>`, `<minerva-select-separator>` elements
 * @csspart trigger - The combobox `<button>`
 * @csspart value - The selected label / placeholder
 * @csspart icon - The chevron
 * @csspart positioner - The positioned popup wrapper
 * @csspart listbox - The `role="listbox"` popup
 * @csspart option - An option rendered from the `options` property
 * @csspart group-label - A group heading rendered from the `options` property
 * @fires minerva-change - The user selected an option (`detail: { value }`)
 * @fires minerva-open-change - The user opened / closed the listbox (`detail: { open }`); cancelable: `preventDefault()` keeps the current state
 * @fires input - The value changed (native-like, composed)
 * @fires change - The value changed (native-like)
 */
export class MinervaSelect extends FormAssociatedElement {
  static override tagName = "minerva-select";
  static override shadowRootOptions = {
    ...FormAssociatedElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static override styles = [
    hostStyles,
    popoverResetStyles,
    css`
      :host {
        display: inline-flex;
        width: 100%;
        min-width: 0;
        vertical-align: middle;
      }
    `,
    sharedStyles(styles),
  ];

  /** Selected value (property; the `value` attribute sets `defaultValue`) */
  @property({ attribute: false })
  value = "";

  /** Initially selected value, restored by `form.reset()` (the `value` attribute) */
  @property({ attribute: "value" })
  defaultValue = "";

  /** Options rendered before the `<minerva-option>` children */
  @property({ attribute: false })
  options: Array<SelectOptionData | SelectOptionGroupData> = [];

  /** Whether the listbox is open */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** Text shown in the trigger while nothing is selected */
  @property()
  placeholder = "";

  /** Size of the trigger */
  @property({ reflect: true })
  size: SelectSize = "medium";

  /** Error state; sets aria-invalid */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  @state()
  private highlighted: string | null = null;

  @query(".trigger")
  private trigger?: HTMLButtonElement;

  @query(".positioner")
  private positioner?: HTMLElement;

  @query("[role=listbox]")
  private listbox?: HTMLElement;

  private readonly locale = new LocaleController(this);
  private readonly aria = new AriaController(this, () => this.labels);
  private readonly typeahead = createTypeahead();
  private readonly floating = new FloatingLayerController(this, () => ({
    anchor: () => this.trigger,
    floating: () => this.positioner,
    placement: "bottom-start",
    offset: { mainAxis: 4 },
    matchAnchorWidth: "min",
    fitViewportHeight: true,
    branches: () => [this.trigger],
    onDismiss: () => this.requestOpen(false),
    returnFocusOnEscape: () => this.trigger,
    focusable: true,
  }));
  private openIntent: OpenIntent = "selected";
  /** Scroll the highlighted option into view after the next update. */
  private scrollPending = false;
  private dirty = false;
  private observer: MutationObserver | null = null;

  override focus(options?: FocusOptions): void {
    this.trigger?.focus(options);
  }

  override blur(): void {
    this.trigger?.blur();
  }

  /** Opens the listbox */
  show(): void {
    this.open = true;
  }

  /** Closes the listbox */
  hide(): void {
    this.open = false;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (typeof MutationObserver === "undefined") return;
    // options added / renamed / disabled: refresh the trigger label & listbox
    this.observer = new MutationObserver(() => this.requestUpdate());
    this.observer.observe(this, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["value", "disabled", "label", "text-value"],
    });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.observer?.disconnect();
    this.observer = null;
    this.typeahead.reset();
  }

  /** `<minerva-option>` children (also inside groups), in document order. */
  private get lightOptions(): MinervaOption[] {
    return Array.from(this.querySelectorAll("minerva-option")).filter(
      (el): el is MinervaOption => el instanceof MinervaOption,
    );
  }

  /** Options of the `options` property, groups flattened. */
  private get dataOptions(): SelectOptionData[] {
    return (this.options ?? []).flatMap((entry) =>
      isGroup(entry) ? entry.options : [entry],
    );
  }

  /** Every option, in display order (property options, then children). */
  private get items(): ItemRecord[] {
    return [
      ...this.dataOptions.map((o) => ({
        value: o.value,
        disabled: !!o.disabled,
        text: o.textValue ?? o.label,
        label: o.label,
      })),
      ...this.lightOptions.map((o) => ({
        value: o.value,
        disabled: o.disabled,
        text: o.text,
        label: o.displayLabel,
      })),
    ];
  }

  /** The rendered option elements of the open listbox, in display order. */
  private getOptions(): HTMLElement[] {
    const listbox = this.listbox;
    if (!listbox) return [];
    return [
      ...Array.from(listbox.querySelectorAll<HTMLElement>("[role=option]")),
      ...this.lightOptions,
    ];
  }

  private findOption(value: string | null): HTMLElement | undefined {
    if (value === null) return undefined;
    return this.getOptions().find((option) => optionValue(option) === value);
  }

  protected getFormValue(): string {
    return this.value;
  }

  protected override getValidity(): ValidityResult {
    return this.required && this.value === ""
      ? {
          flags: { valueMissing: true },
          message: this.locale.t("validation.selectMissing"),
          anchor: this.trigger,
        }
      : { flags: {}, message: "" };
  }

  protected resetFormValue(): void {
    this.dirty = false;
    this.value = this.defaultValue;
  }

  protected override restoreFormState(state: unknown): void {
    if (typeof state === "string") this.value = state;
  }

  /** Asks to open / close; listeners can cancel `minerva-open-change`. */
  private requestOpen(open: boolean) {
    if (open === this.open) return;
    if (open && this.isDisabled) return;
    const allowed = this.emit(
      "minerva-open-change",
      { open },
      { cancelable: true },
    );
    if (allowed) this.open = open;
  }

  private openWith(intent: OpenIntent) {
    this.openIntent = intent;
    this.requestOpen(true);
  }

  private close(focusTrigger: boolean) {
    if (focusTrigger) this.trigger?.focus();
    this.requestOpen(false);
  }

  private commitValue(next: string) {
    if (next === this.value) return;
    this.value = next;
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    this.dispatchEvent(new Event("change", { bubbles: true }));
    this.emit("minerva-change", { value: next });
  }

  private selectValue(next: string) {
    this.commitValue(next);
    this.close(true);
  }

  protected override willUpdate(changed: PropertyValues): void {
    if (changed.has("value") && changed.get("value") !== undefined) {
      this.dirty = this.value !== this.defaultValue || this.dirty;
    }
    // first update: a value set before connecting wins over the default
    // unless the value attribute is present
    if (
      changed.has("defaultValue") &&
      !this.dirty &&
      (this.hasUpdated || this.hasAttribute("value"))
    ) {
      this.value = this.defaultValue;
    }
    if (changed.has("open") && this.open) {
      // highlight the selected option, else the first / last enabled one
      const intent = this.openIntent;
      this.openIntent = "selected";
      const enabled = this.items.filter((item) => !item.disabled);
      const target =
        intent === "last"
          ? enabled[enabled.length - 1]
          : intent === "first"
            ? enabled[0]
            : (enabled.find((item) => item.value === this.value) ?? enabled[0]);
      this.typeahead.reset();
      this.scrollPending = true;
      this.highlighted = target?.value ?? null;
    }
    if (changed.has("open") && !this.open) this.highlighted = null;
  }

  protected override updated(changed: PropertyValues): void {
    super.updated(changed);
    for (const option of this.lightOptions) {
      option.selected = option.value === this.value;
      option.highlighted = this.open && option.value === this.highlighted;
    }
    this.floating.sync(this.open);
    if (this.open && this.listbox) {
      // DOM focus follows the highlight (the listbox itself when none)
      if (changed.has("open") || changed.has("highlighted")) {
        const target = this.findOption(this.highlighted) ?? this.listbox;
        if (target.getRootNode() === this.shadowRoot) {
          if (this.shadowRoot?.activeElement !== target) {
            target.focus({ preventScroll: true });
          }
        } else if (document.activeElement !== target) {
          // light <minerva-option>: focusable from script only, made so when
          // first focused (no tabindex on server-rendered markup)
          if (!target.hasAttribute("tabindex")) target.tabIndex = -1;
          target.focus({ preventScroll: true });
        }
      }
      if (this.scrollPending) {
        this.scrollPending = false;
        this.findOption(this.highlighted)?.scrollIntoView?.({
          block: "nearest",
        });
      }
    }
    if (DEV) this.checkOptions();
  }

  private checkOptions() {
    const items = this.items;
    if (items.length === 0) return;
    const seen = new Set<string>();
    for (const item of items) {
      if (seen.has(item.value)) {
        devWarn(
          MinervaSelect.tagName,
          `several options have the value "${item.value}"; option values must be unique.`,
        );
      }
      seen.add(item.value);
    }
    if (this.value !== "" && !seen.has(this.value)) {
      devWarn(
        MinervaSelect.tagName,
        `value "${this.value}" does not match any option.`,
      );
    }
  }

  private handleTriggerKeyDown(event: KeyboardEvent) {
    if (this.open) return;
    const { key } = event;
    // Typeahead while closed changes the selection without opening (like a
    // native select). Space continues a search in progress.
    if (
      isPrintable(event) &&
      (key !== " " || this.typeahead.getBuffer() !== "")
    ) {
      const items = this.items;
      const index = this.typeahead.search(
        key,
        items,
        items.findIndex((item) => item.value === this.value),
      );
      event.preventDefault();
      if (index !== -1) this.commitValue(items[index].value);
      return;
    }
    const intent: Record<string, OpenIntent> = {
      Enter: "selected",
      " ": "selected",
      ArrowDown: "selected",
      ArrowUp: this.value === "" ? "last" : "selected",
      Home: "first",
      End: "last",
    };
    if (key in intent) {
      // Prevents the native click (Enter) and page scrolling (arrows).
      event.preventDefault();
      this.openWith(intent[key]);
    }
  }

  private handleListboxKeyDown(event: KeyboardEvent) {
    const { key } = event;
    if (key === "Tab") {
      // Close and let the browser move on from the trigger: the natural Tab
      // order continues after the select (no preventDefault).
      this.close(true);
      return;
    }
    const options = this.getOptions();
    const currentIndex = options.findIndex(
      (option) => optionValue(option) === this.highlighted,
    );
    const current = currentIndex === -1 ? undefined : options[currentIndex];
    const selectCurrent = () => {
      if (current && !isOptionDisabled(current)) {
        this.selectValue(optionValue(current));
      }
    };

    if (key === "Enter" || (key === "ArrowUp" && event.altKey)) {
      event.preventDefault();
      selectCurrent();
      return;
    }
    if (key === " " && this.typeahead.getBuffer() === "") {
      event.preventDefault();
      selectCurrent();
      return;
    }
    if (event.ctrlKey || event.metaKey || event.altKey) return;

    const next = getNextIndex({
      currentIndex,
      count: options.length,
      key,
      loop: false,
      isDisabled: (i) => isOptionDisabled(options[i]),
      pageSize: PAGE_SIZE,
    });
    if (next !== null || key.startsWith("Arrow") || key.startsWith("Page")) {
      // Arrow keys never scroll the list / page, even at the edges.
      event.preventDefault();
    }
    if (next === null && isPrintable(event)) {
      const index = this.typeahead.search(
        key,
        options.map((option) => ({
          text:
            option instanceof MinervaOption
              ? option.text
              : (option.dataset.textValue ?? option.textContent ?? ""),
          disabled: isOptionDisabled(option),
        })),
        currentIndex,
      );
      if (index !== -1) {
        event.preventDefault();
        this.scrollPending = true;
        this.highlighted = optionValue(options[index]);
      }
      return;
    }
    if (next !== null) {
      this.typeahead.reset();
      this.scrollPending = true;
      this.highlighted = optionValue(options[next]);
    }
  }

  /** The option (of this select) an event comes from. */
  private optionFromEvent(event: Event): HTMLElement | undefined {
    const options = this.getOptions();
    return event
      .composedPath()
      .find((node): node is HTMLElement =>
        options.includes(node as HTMLElement),
      );
  }

  private handleListboxPointerMove(event: PointerEvent) {
    const option = this.optionFromEvent(event);
    if (!option || isOptionDisabled(option)) return;
    const value = optionValue(option);
    if (this.highlighted !== value) {
      this.scrollPending = false;
      this.highlighted = value;
    }
  }

  private handleListboxClick(event: MouseEvent) {
    const option = this.optionFromEvent(event);
    if (!option || isOptionDisabled(option)) return;
    this.selectValue(optionValue(option));
  }

  private renderDataOption(option: SelectOptionData) {
    const selected = option.value === this.value;
    return html`<div
      part="option"
      class="item"
      role="option"
      tabindex="-1"
      aria-selected=${String(selected)}
      aria-disabled=${option.disabled ? "true" : nothing}
      data-state=${selected ? "checked" : "unchecked"}
      ?data-highlighted=${this.highlighted === option.value}
      ?data-disabled=${!!option.disabled}
      data-value=${option.value}
      data-text-value=${option.textValue ?? nothing}
    >
      <span class="itemText">${option.label}</span>
      ${
        selected
          ? html`<span class="itemIndicator" aria-hidden="true"
              >${IconCheck}</span
            >`
          : nothing
      }
    </div>`;
  }

  private renderDataOptions() {
    return (this.options ?? []).map((entry, index) => {
      if (!isGroup(entry)) return this.renderDataOption(entry);
      const labelId = `group-label-${index}`;
      return html`<div role="group" aria-labelledby=${labelId}>
        <div id=${labelId} class="label" part="group-label">${entry.label}</div>
        ${entry.options.map((option) => this.renderDataOption(option))}
      </div>`;
    });
  }

  protected override render() {
    const disabled = this.isDisabled;
    const showPlaceholder = this.value === "";
    const selectedItem = showPlaceholder
      ? undefined
      : this.items.find((item) => item.value === this.value);
    const label = this.aria.label;
    const { side, align } = parsePlacement(this.floating.position.placement);

    return html`<button
        part="trigger"
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded=${String(this.open)}
        aria-controls=${this.open ? "listbox" : nothing}
        aria-autocomplete="none"
        aria-label=${label ?? nothing}
        aria-description=${this.aria.description ?? nothing}
        aria-required=${this.required ? "true" : nothing}
        aria-invalid=${
          this.invalid || this.aria.attr("aria-invalid") === "true"
            ? "true"
            : nothing
        }
        ?disabled=${disabled}
        data-state=${this.open ? "open" : "closed"}
        ?data-placeholder=${showPlaceholder}
        data-component="select"
        class=${classMap({
          trigger: true,
          [this.size]: true,
          invalid: this.invalid,
        })}
        @click=${() => this.requestOpen(!this.open)}
        @keydown=${this.handleTriggerKeyDown}
        @keyup=${(event: KeyboardEvent) => {
          // Space is handled on keydown: never let its keyup click (re)toggle.
          if (event.key === " ") event.preventDefault();
        }}
      >
        <span class="value" part="value"
          ><span
            >${
              showPlaceholder
                ? this.placeholder
                : (selectedItem?.label ?? this.value)
            }</span
          ></span
        >
        <span class="icon" part="icon" aria-hidden="true"
          >${IconChevronDown}</span
        >
      </button>
      ${
        this.open
          ? html`<div
              part="positioner"
              class="positioner"
              popover="manual"
              data-side=${side}
            >
              <div
                id="listbox"
                part="listbox"
                role="listbox"
                tabindex="-1"
                aria-label=${label ?? nothing}
                data-state="open"
                data-side=${side}
                data-align=${align}
                class="content"
                @keydown=${this.handleListboxKeyDown}
                @pointermove=${this.handleListboxPointerMove}
                @click=${this.handleListboxClick}
              >
                ${this.renderDataOptions()}
                <slot></slot>
              </div>
            </div>`
          : nothing
      }`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-select": MinervaSelect;
  }
}
