import {
  css,
  html,
  nothing,
  unsafeCSS,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { live } from "lit/directives/live.js";
import { styleMap } from "lit/directives/style-map.js";
import inputStyles from "@lib-core-styles/components/Input/input.module.scss?inline";
import styles from "@lib-core-styles/components/AutoComplete/autoComplete.module.scss?inline";
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
import { IconInbox, IconSpinner } from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { hostStyles } from "../../internal/minerva-element";
import { HasSlotController } from "../../internal/slots";

/** Content a render callback may return */
export type AutoCompleteRenderResult = string | Node | TemplateResult;

/** An option of the AutoComplete dropdown */
export interface AutoCompleteOption {
  /** Text displayed for the option and written to the input when selected */
  label: string;
  /** Unique value of the option */
  value: string | number;
  /** Prevents the option from being selected */
  disabled?: boolean;
  /** Highlights the option (e.g. as a recommendation) */
  highlight?: boolean;
  /** Icon displayed before the label (basic mode) */
  icon?: AutoCompleteRenderResult;
  /** Secondary text displayed under the label (basic mode) */
  description?: string;
  /** Free-form group identifier, typically read by groupBy */
  group?: string;
  /** Inline styles of the option */
  style?: Record<string, string>;
}

export type AutoCompleteMode = "basic" | "custom";
export type AutoCompletePlacement = "top" | "bottom" | "left" | "right";
export type AutoCompleteGroupMode = "first" | "adjacent";
export type AutoCompleteSize = "small" | "medium" | "large";
export type AutoCompleteVariant = "outline" | "filled" | "unstyled";

const PLACEMENT = {
  top: "top-start",
  bottom: "bottom-start",
  left: "left-start",
  right: "right-start",
} as const;

/**
 * Text input (combobox) suggesting options from a list (`<AutoComplete>` of
 * lib-core): filtering, grouping, custom rendering and async loading.
 * Focus stays in the input; the active option is exposed with
 * `aria-activedescendant` (the listbox lives in the same shadow root).
 *
 * Keyboard (WAI-ARIA combobox): ArrowDown / ArrowUp open the list and move
 * the active option (wrapping, disabled options skipped), Enter picks the
 * active option (or fires `minerva-submit` with the typed text when none is
 * active), Escape closes the open list (topmost layer only) and, on a
 * closed list, clears the text (without closing an enclosing modal).
 *
 * Form-associated: submits the input text under `name`; `required` makes an
 * empty text invalid; `form.reset()` restores the `value` attribute.
 *
 * @summary Text input with a filtered suggestion list.
 * @tag minerva-autocomplete
 * @slot prefix - Content before the text (icon)
 * @slot suffix - Content after the text
 * @csspart base - The root wrapper
 * @csspart label - The visible label
 * @csspart field - The input wrapper
 * @csspart input - The native `<input>`
 * @csspart popup - The positioned dropdown
 * @csspart listbox - The `role="listbox"` list
 * @csspart option - An option
 * @csspart group-label - A group heading
 * @csspart empty - The empty state
 * @csspart loading - The loading state
 * @fires minerva-input - The input text changed (typing, picking an option, Escape clearing) (`detail: { value }`)
 * @fires minerva-change - The text was committed: an option filled it in, Escape cleared it, or the native change (blur) (`detail: { value }`)
 * @fires minerva-select - An option was picked with the mouse or the keyboard (`detail: { value, option }`)
 * @fires minerva-submit - Enter was pressed with no active option and non-blank text (`detail: { value }`, trimmed)
 * @fires minerva-open-change - The dropdown opens / closes (`detail: { open }`); cancelable: `preventDefault()` keeps the current state
 */
export class MinervaAutocomplete extends FormAssociatedElement {
  static override tagName = "minerva-autocomplete";
  static override shadowRootOptions = {
    ...FormAssociatedElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static override styles = [
    hostStyles,
    popoverResetStyles,
    unsafeCSS(inputStyles),
    unsafeCSS(styles),
    css`
      :host {
        display: block;
        width: 100%;
      }
      /* Input's .disabled shares the class name of disabled options */
      .optionItem.disabled:not(.active):not(.highlight) {
        background-color: transparent;
      }
      .popup .dropdown .optionList .loading svg {
        font-size: 1.5em;
        animation: minerva-autocomplete-spin 1s linear infinite;
      }
      .empty svg {
        display: block;
        margin: 0 auto var(--space-2);
        font-size: 40px;
        color: var(--text-muted-color);
      }
      @keyframes minerva-autocomplete-spin {
        to {
          transform: rotate(360deg);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .popup .dropdown .optionList .loading svg {
          animation: none;
        }
      }
    `,
  ];

  /** Input text (property; the `value` attribute sets `defaultValue`) */
  @property({ attribute: false })
  value = "";

  /** Initial text, restored by `form.reset()` (the `value` attribute) */
  @property({ attribute: "value" })
  defaultValue = "";

  /** Options to suggest */
  @property({ attribute: false })
  options: AutoCompleteOption[] = [];

  /** Whether the dropdown is open */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** Visible label of the input (also names the listbox) */
  @property()
  label = "";

  /** Placeholder of the input */
  @property()
  placeholder = "";

  /** "basic" renders icon / label / description; "custom" uses `renderOption` */
  @property({ reflect: true })
  mode: AutoCompleteMode = "basic";

  /** Size of the input */
  @property({ reflect: true })
  size: AutoCompleteSize = "medium";

  /** Visual style of the input */
  @property({ reflect: true })
  variant: AutoCompleteVariant = "outline";

  /** Error state; sets aria-invalid */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /** Read-only: focusable and submitted, no dropdown */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /** Shows a loading indicator instead of the options */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /** Preferred dropdown side (aligned with the input's start edge) */
  @property({ reflect: true })
  placement: AutoCompletePlacement = "bottom";

  /**
   * Dropdown offset in px: for top / bottom `y` is the gap and `x` the
   * shift, for left / right the reverse
   */
  @property({ attribute: false })
  offset: { x: number; y: number } = { x: 0, y: 4 };

  /** Disables the opening animation */
  @property({ type: Boolean, attribute: "no-animation" })
  noAnimation = false;

  /** Makes the first enabled option active whenever the dropdown opens */
  @property({ type: Boolean, attribute: "auto-highlight" })
  autoHighlight = false;

  /** Keeps the typed text when an option is picked (no fill-in) */
  @property({ type: Boolean, attribute: "no-fill-on-select" })
  noFillOnSelect = false;

  /** How `groupBy` groups options: at first appearance, or runs of adjacent options */
  @property({ attribute: "group-mode" })
  groupMode: AutoCompleteGroupMode = "first";

  /** Custom filter (default: label contains the text, case-insensitive) */
  @property({ attribute: false })
  filterOption?: (inputValue: string, option: AutoCompleteOption) => boolean;

  /** Compare function sorting the filtered options */
  @property({ attribute: false })
  sortOption?: (a: AutoCompleteOption, b: AutoCompleteOption) => number;

  /** Group name of an option; options are grouped under headings ("" = none) */
  @property({ attribute: false })
  groupBy?: (option: AutoCompleteOption) => string;

  /** Custom option renderer (used when `mode` is "custom") */
  @property({ attribute: false })
  renderOption?: (option: AutoCompleteOption) => AutoCompleteRenderResult;

  /** Custom content shown when no option matches */
  @property({ attribute: false })
  renderEmpty?: () => AutoCompleteRenderResult;

  @state()
  private focusedIndex = -1;

  @state()
  private hoveredIndex = -1;

  @query("input")
  private input?: HTMLInputElement;

  @query(".autoComplete")
  private container?: HTMLElement;

  @query(".popup")
  private popup?: HTMLElement;

  private readonly locale = new LocaleController(this);
  private readonly aria = new AriaController(this, () => this.labels);
  private readonly slots = new HasSlotController(this);
  private readonly floating = new FloatingLayerController(this, () => {
    const vertical = this.placement === "top" || this.placement === "bottom";
    const offset = this.offset ?? { x: 0, y: 4 };
    return {
      anchor: () => this.container,
      floating: () => this.popup,
      placement: PLACEMENT[this.placement] ?? "bottom-start",
      offset: {
        mainAxis: vertical ? offset.y : offset.x,
        crossAxis: vertical ? offset.x : offset.y,
      },
      matchAnchorWidth: "min",
      // the field (label, input, suffix) is part of the dropdown layer
      branches: () => [this.container],
      onEscapeKeyDown: (event) => {
        // Escape during IME composition cancels the composition only
        if (this.composing || event.isComposing) event.preventDefault();
      },
      onDismiss: () => this.close(),
      returnFocusOnEscape: () => this.input,
    };
  });
  /** IME composition in progress: Enter / arrows belong to the IME. */
  private composing = false;
  private dirty = false;

  override focus(options?: FocusOptions): void {
    this.input?.focus(options);
  }

  override blur(): void {
    this.input?.blur();
  }

  /** Whether the input accepts no interaction (disabled / read-only). */
  private get blocked(): boolean {
    return this.isDisabled || this.readonly;
  }

  /** The dropdown is rendered (open and interactive). */
  private get shown(): boolean {
    return this.open && !this.blocked;
  }

  protected getFormValue(): string {
    return this.value;
  }

  protected override getValidity(): ValidityResult {
    return this.required && this.value === ""
      ? {
          flags: { valueMissing: true },
          message: this.locale.t("validation.valueMissing"),
          anchor: this.input,
        }
      : { flags: {}, message: "" };
  }

  protected resetFormValue(): void {
    this.dirty = false;
    this.value = this.defaultValue;
    this.focusedIndex = -1;
  }

  protected override restoreFormState(state: unknown): void {
    if (typeof state === "string") this.value = state;
  }

  /** Filtered (and sorted) options. */
  private get processedOptions(): AutoCompleteOption[] {
    const text = this.value;
    const search = text.toLowerCase();
    const result = (this.options ?? []).filter((option) =>
      this.filterOption
        ? this.filterOption(text, option)
        : option.label.toLowerCase().includes(search),
    );
    return this.sortOption ? [...result].sort(this.sortOption) : result;
  }

  /** Groups in order of first appearance, or runs of adjacent options. */
  private groupOptions(
    options: AutoCompleteOption[],
  ): Array<[string, AutoCompleteOption[]]> | null {
    const groupBy = this.groupBy;
    if (!groupBy) return null;
    if (this.groupMode === "adjacent") {
      const runs: Array<[string, AutoCompleteOption[]]> = [];
      for (const option of options) {
        const group = groupBy(option);
        const last = runs[runs.length - 1];
        if (last && last[0] === group) last[1].push(option);
        else runs.push([group, [option]]);
      }
      return runs;
    }
    const groups = new Map<string, AutoCompleteOption[]>();
    for (const option of options) {
      const group = groupBy(option);
      const list = groups.get(group);
      if (list) list.push(option);
      else groups.set(group, [option]);
    }
    return Array.from(groups.entries());
  }

  /** Options in display order; keyboard / hover indexes refer to this list. */
  private get navigableOptions(): AutoCompleteOption[] {
    const processed = this.processedOptions;
    const grouped = this.groupOptions(processed);
    return grouped ? grouped.flatMap(([, list]) => list) : processed;
  }

  private activeIndex(navigable: AutoCompleteOption[]): number {
    if (this.focusedIndex >= 0) return this.focusedIndex;
    return this.autoHighlight && this.shown
      ? navigable.findIndex((option) => !option.disabled)
      : -1;
  }

  /** Asks to open / close; listeners can cancel `minerva-open-change`. */
  private requestOpen(open: boolean): boolean {
    if (open === this.open) return true;
    const allowed = this.emit(
      "minerva-open-change",
      { open },
      { cancelable: true },
    );
    if (allowed) this.open = open;
    return allowed;
  }

  private openDropdown() {
    if (!this.blocked) this.requestOpen(true);
  }

  private close() {
    this.requestOpen(false);
    this.focusedIndex = -1;
  }

  private setText(next: string, commit: boolean) {
    if (next === this.value) return;
    this.value = next;
    this.emit("minerva-input", { value: next });
    if (commit) this.emit("minerva-change", { value: next });
  }

  private moveFocus(step: 1 | -1) {
    const navigable = this.navigableOptions;
    const count = navigable.length;
    if (count === 0) return;
    // from "nothing focused", ArrowDown starts at the first option and
    // ArrowUp at the last one
    const active = this.activeIndex(navigable);
    let index = active >= 0 ? active : step === 1 ? -1 : count;
    for (let i = 0; i < count; i += 1) {
      index = (index + step + count) % count;
      if (!navigable[index].disabled) {
        this.focusedIndex = index;
        return;
      }
    }
  }

  private selectOption(option: AutoCompleteOption) {
    if (option.disabled) return;
    if (!this.noFillOnSelect) this.setText(option.label, true);
    this.close();
    this.emit("minerva-select", { value: option.value, option });
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (
      this.blocked ||
      this.composing ||
      event.isComposing ||
      event.keyCode === 229
    ) {
      return;
    }
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp": {
        event.preventDefault();
        // open first: the active index depends on the open state
        if (!this.open) this.openDropdown();
        this.moveFocus(event.key === "ArrowDown" ? 1 : -1);
        break;
      }
      case "Enter": {
        const navigable = this.navigableOptions;
        const option = this.shown
          ? navigable[this.activeIndex(navigable)]
          : undefined;
        const text = this.value.trim();
        if (option) {
          event.preventDefault();
          this.selectOption(option);
        } else if (text) {
          // No active option: submit the typed text (e.g. a search).
          event.preventDefault();
          this.emit("minerva-submit", { value: text });
          this.close();
        }
        break;
      }
      case "Escape":
        // Open: the dropdown's dismissable layer closes it (topmost only).
        // Closed: clears the text (APG combobox). The layer's document
        // listener may already have closed it during this very keydown.
        if (!this.shown && !this.floating.isOpen && this.value !== "") {
          event.preventDefault();
          this.setText("", true);
          this.focusedIndex = -1;
        }
        break;
      default:
        break;
    }
  }

  private handleInput() {
    this.setText(this.input!.value, false);
    this.focusedIndex = -1;
    this.openDropdown();
  }

  private handleChange() {
    this.value = this.input!.value;
    // `change` is not composed: re-dispatch it from the host
    this.dispatchEvent(new Event("change", { bubbles: true }));
    this.emit("minerva-change", { value: this.value });
  }

  private handleBlur(event: FocusEvent) {
    const next = event.relatedTarget as Node | null;
    if (
      next &&
      (this.popup?.contains(next) || this.container?.contains(next))
    ) {
      return;
    }
    this.close();
  }

  private handleOptionClick(option: AutoCompleteOption) {
    if (option.disabled || this.composing) return;
    this.selectOption(option);
    this.input?.focus();
  }

  protected override willUpdate(changed: PropertyValues): void {
    if (changed.has("value") && changed.get("value") !== undefined) {
      this.dirty = this.value !== this.defaultValue || this.dirty;
    }
    if (changed.has("defaultValue") && !this.dirty) {
      this.value = this.defaultValue;
    }
    // A disabled / read-only field never keeps the dropdown.
    if (this.open && this.blocked) {
      this.open = false;
      this.focusedIndex = -1;
    }
  }

  protected override updated(changed: PropertyValues): void {
    super.updated(changed);
    this.floating.sync(this.shown);
    // Keep the keyboard-focused option scrolled into view
    if (changed.has("focusedIndex") && this.focusedIndex >= 0) {
      this.shadowRoot
        ?.getElementById(`option-${this.focusedIndex}`)
        ?.scrollIntoView?.({ block: "nearest" });
    }
    if (DEV && changed.has("options")) {
      const seen = new Set<string | number>();
      for (const option of this.options ?? []) {
        if (seen.has(option.value)) {
          devWarn(
            MinervaAutocomplete.tagName,
            `several options have the value "${option.value}"; option values must be unique.`,
          );
          break;
        }
        seen.add(option.value);
      }
    }
  }

  private renderOptionContent(option: AutoCompleteOption) {
    if (this.mode === "custom" && this.renderOption) {
      return this.renderOption(option);
    }
    return html`<div class="basicOption">
      ${option.icon ? html`<span class="icon">${option.icon}</span>` : nothing}
      <div class="content">
        <div class="label">${option.label}</div>
        ${
          option.description
            ? html`<div class="description">${option.description}</div>`
            : nothing
        }
      </div>
    </div>`;
  }

  private renderOptionItem(
    option: AutoCompleteOption,
    index: number,
    activeIndex: number,
  ) {
    const active = activeIndex === index;
    return html`<div
      part="option"
      class=${classMap({
        optionItem: true,
        disabled: !!option.disabled,
        highlight: !!option.highlight,
        active: this.hoveredIndex === index || active,
      })}
      style=${option.style ? styleMap(option.style) : nothing}
      role="option"
      tabindex="-1"
      id=${`option-${index}`}
      aria-selected=${String(active)}
      aria-disabled=${option.disabled ? "true" : nothing}
      @mousedown=${(event: MouseEvent) => event.preventDefault()}
      @click=${() => this.handleOptionClick(option)}
      @keydown=${(event: KeyboardEvent) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        event.stopPropagation();
        this.handleOptionClick(option);
      }}
      @mouseenter=${() => (this.hoveredIndex = index)}
      @mouseleave=${() => (this.hoveredIndex = -1)}
    >
      ${this.renderOptionContent(option)}
    </div>`;
  }

  private renderList() {
    const { t } = this.locale;
    if (this.loading) {
      return html`<div role="presentation" class="loading" part="loading">
        <span role="progressbar" aria-label=${t("common.loading")}
          >${IconSpinner}</span
        >
      </div>`;
    }
    const processed = this.processedOptions;
    if (processed.length === 0) {
      return html`<div role="presentation" class="empty" part="empty">
        ${
          this.renderEmpty?.() ||
          html`${IconInbox}<span>${t("empty.description")}</span>`
        }
      </div>`;
    }
    const grouped = this.groupOptions(processed);
    const navigable = grouped ? grouped.flatMap(([, list]) => list) : processed;
    const activeIndex = this.activeIndex(navigable);
    if (!grouped) {
      return processed.map((option, index) =>
        this.renderOptionItem(option, index, activeIndex),
      );
    }
    return grouped.map(([group, list]) => {
      const items = list.map((option) =>
        this.renderOptionItem(option, navigable.indexOf(option), activeIndex),
      );
      return group === ""
        ? items
        : html`<div class="optionGroup" role="group" aria-label=${group}>
            <div class="groupLabel" part="group-label" aria-hidden="true">
              ${group}
            </div>
            ${items}
          </div>`;
    });
  }

  protected override render() {
    const shown = this.shown;
    const disabled = this.isDisabled;
    const navigable = shown ? this.navigableOptions : [];
    const activeIndex = shown ? this.activeIndex(navigable) : -1;
    const activeId =
      shown && activeIndex >= 0 && activeIndex < navigable.length
        ? `option-${activeIndex}`
        : undefined;
    const label = this.label ? undefined : this.aria.label;
    // data-minerva-escape-consumer (core's ESCAPE_CONSUMER_ATTRIBUTE): on a
    // closed list with text, Escape clears it instead of closing an
    // enclosing modal / drawer / popover.
    return html`<div
      part="base"
      class="autoComplete"
      @compositionstart=${() => (this.composing = true)}
      @compositionend=${() => (this.composing = false)}
    >
      ${
        this.label
          ? html`<label for="input" class="label" part="label"
              >${this.label}</label
            >`
          : nothing
      }
      <div
        part="field"
        class=${classMap({
          root: true,
          [this.variant]: true,
          [this.size]: true,
          invalid: this.invalid,
          disabled,
        })}
        data-component="input"
      >
        ${
          this.slots.test("prefix")
            ? html`<span class="addon start"><slot name="prefix"></slot></span>`
            : nothing
        }
        <input
          id="input"
          part="input"
          class="field"
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded=${String(shown)}
          aria-controls=${shown ? "listbox" : nothing}
          aria-activedescendant=${activeId ?? nothing}
          aria-label=${label ?? nothing}
          aria-description=${this.aria.description ?? nothing}
          aria-required=${this.required ? "true" : nothing}
          aria-invalid=${
            this.invalid || this.aria.attr("aria-invalid") === "true"
              ? "true"
              : nothing
          }
          data-minerva-escape-consumer=${
            !shown && this.value !== "" ? "" : nothing
          }
          autocomplete="off"
          .value=${live(this.value)}
          placeholder=${this.placeholder || nothing}
          ?disabled=${disabled}
          ?readonly=${this.readonly}
          @input=${this.handleInput}
          @change=${this.handleChange}
          @focus=${() => this.openDropdown()}
          @click=${() => {
            if (!this.open) this.openDropdown();
          }}
          @blur=${this.handleBlur}
          @keydown=${this.handleKeyDown}
        />
        ${
          this.slots.test("suffix")
            ? html`<span class="addon end"><slot name="suffix"></slot></span>`
            : nothing
        }
      </div>
      ${
        shown
          ? html`<div class="popup" part="popup" popover="manual">
              <div
                class=${classMap({
                  dropdown: true,
                  animated: !this.noAnimation,
                })}
              >
                <div
                  class="optionList"
                  part="listbox"
                  role="listbox"
                  id="listbox"
                  aria-label=${this.label || label || nothing}
                  aria-busy=${this.loading ? "true" : nothing}
                >
                  ${this.renderList()}
                </div>
              </div>
            </div>`
          : nothing
      }
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-autocomplete": MinervaAutocomplete;
  }
}
