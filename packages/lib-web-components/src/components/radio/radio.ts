import { css, html, nothing } from "lit";
import { setHostAria } from "../../internal/aria";
import { attachInternals as attachHostInternals } from "../../internal/form";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import type { ColorScheme } from "@minerva/core";
import styles from "@lib-core-styles/components/Radio/radio.module.scss?inline";
import { RovingFocusController } from "../../controllers/roving-focus";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import { getDirection } from "../../internal/dom";
import {
  isHostDeferred,
  onHostSettled,
  setHostAttribute,
} from "../../internal/hydration";
import {
  FormAssociatedElement,
  type ValidityResult,
} from "../../internal/form";
import { IconCircleInfoFilled } from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { HasSlotController } from "../../internal/slots";
import { sharedStyles } from "../../internal/styles";

export type RadioSize = "small" | "medium" | "large";
export type RadioColor = Extract<
  ColorScheme,
  "primary" | "success" | "warning" | "danger"
>;
export type RadioGroupDirection = "horizontal" | "vertical";

const NAVIGATION_KEYS = new Set([
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Home",
  "End",
]);

/**
 * One option of a `<minerva-radio-group>` (`<Radio>` of lib-core). The
 * element itself is the radio (`role="radio"`, `aria-checked`): the group
 * drives its checked state, size, color, disabled state and roving focus
 * (one Tab stop, arrow keys move and select). Space checks the focused
 * radio. A radio outside a group is focusable and checks itself on click,
 * but only the group takes part in forms.
 *
 * @summary Radio option of a radio group.
 * @tag minerva-radio
 * @slot - Label content (alternative to the `label` attribute)
 * @csspart base - The wrapper
 * @csspart mark - The visual radio mark
 * @csspart label - The label text
 * @csspart helper-text - The helper / error text
 * @fires minerva-change - A standalone radio was checked by the user; `detail: { checked: true, value }` (inside a group, the group fires it)
 */
export class MinervaRadio extends MinervaElement {
  private readonly hostInternals = attachHostInternals(this);
  private readonly ownedAria = new Set<string>();
  static override tagName = "minerva-radio";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline-flex;
        outline: none;
        vertical-align: middle;
      }
      .input {
        pointer-events: none;
      }
      :host(:focus-visible) .radioMark {
        box-shadow: 0 0 0 3px var(--focus-ring-color);
      }
      @media (forced-colors: active) {
        :host(:focus-visible) .radioMark {
          outline: 2px solid Highlight;
          outline-offset: 2px;
        }
      }
    `,
    sharedStyles(styles),
  ];

  /** Value of the radio; identifies it within its group */
  @property()
  value = "";

  /** Whether the radio is checked (set by the group) */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /** Disables the radio (the group skips it) */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Label text (alternative to the default slot) */
  @property()
  label = "";

  /** Radio size (the group's `size` wins when set) */
  @property({ reflect: true })
  size: RadioSize = "medium";

  /** Semantic color of the checked radio (the group's `color` wins when set) */
  @property({ reflect: true })
  color: RadioColor = "primary";

  /** Error state (`error-message` replaces `helper-text`) */
  @property({ type: Boolean, reflect: true })
  error = false;

  /** Helper text shown below the radio (describes it) */
  @property({ attribute: "helper-text" })
  helperText = "";

  /** Message shown below the radio while `error` is set */
  @property({ attribute: "error-message" })
  errorMessage = "";

  private readonly slots = new HasSlotController(this);
  /** Whether `aria-description` on the host was set by the element */
  private ownsDescription = false;

  /** The group the radio belongs to */
  get group(): MinervaRadioGroup | null {
    const group = this.parentElement?.closest("minerva-radio-group");
    return group instanceof MinervaRadioGroup ? group : null;
  }

  /** Whether the radio cannot be checked (itself or by its group) */
  get isDisabled(): boolean {
    return this.disabled || !!this.group?.isDisabled;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("click", this.handleClick);
    this.addEventListener("keydown", this.handleKeyDown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("click", this.handleClick);
    this.removeEventListener("keydown", this.handleKeyDown);
  }

  private readonly handleClick = (event: MouseEvent) => {
    if (this.isDisabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    // inside a group, the group selects the radio (its click listener)
    if (this.group || this.checked) return;
    this.checked = true;
    this.emit("minerva-change", { checked: true, value: this.value });
  };

  private readonly handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== " ") return;
    event.preventDefault();
    if (!this.isDisabled) this.click();
  };

  protected override updated(): void {
    const disabled = this.isDisabled;
    setHostAria(
      this,
      this.hostInternals,
      {
        role: "radio",
        ariaChecked: String(this.checked),
        ariaDisabled: disabled ? "true" : null,
      },
      this.ownedAria,
    );
    if (!this.group) setHostAttribute(this, "tabindex", disabled ? "-1" : "0");
    const helper = this.error ? this.errorMessage : this.helperText;
    if (
      helper &&
      (this.ownsDescription || !this.hasAttribute("aria-description"))
    ) {
      this.ownsDescription = true;
      setHostAttribute(this, "aria-description", helper);
    } else if (!helper && this.ownsDescription) {
      this.ownsDescription = false;
      setHostAttribute(this, "aria-description", null);
    }
  }

  protected override render() {
    const group = this.group;
    const size = group?.size ?? this.size;
    const color = group?.color ?? this.color;
    const helper = this.error ? this.errorMessage : this.helperText;
    const hasLabel = !!this.label || this.slots.test("[default]");
    return html`<div
      part="base"
      class=${classMap({
        radioWrapper: true,
        [size]: true,
        [color]: true,
        error: this.error,
      })}
    >
      <span class=${classMap({ radio: true, disabled: this.isDisabled })}>
        <input
          type="radio"
          class="input"
          tabindex="-1"
          aria-hidden="true"
          inert
          .checked=${this.checked}
        />
        <span class="radioMark" part="mark"></span>
        ${
          hasLabel
            ? html`<span class="label" part="label"
                >${this.label || html`<slot></slot>`}</span
              >`
            : nothing
        }
      </span>
      ${
        helper
          ? html`<div class="helperTextWrapper" aria-hidden="true">
              ${
                this.error && this.errorMessage
                  ? html`<span class="errorIcon">${IconCircleInfoFilled}</span>`
                  : nothing
              }
              <span
                part="helper-text"
                class=${classMap({ helperText: true, errorText: this.error })}
                >${helper}</span
              >
            </div>`
          : nothing
      }
    </div>`;
  }
}

/**
 * A set of `<minerva-radio>` children of which one can be selected
 * (`<RadioGroup>` of lib-core), with an optional visible label and helper
 * text. Keyboard: one Tab stop (the checked radio, else the first enabled
 * one); arrow keys move and select, skipping disabled radios and wrapping
 * (core's roving focus; RTL-aware); Space checks the focused radio.
 *
 * The GROUP is the form-associated element: it submits the selected radio's
 * `value` under `name`, `required` makes it invalid while nothing is
 * selected (`valueMissing`, localized "select one of these options"), and it
 * supports `form.reset()` (restores the `value` attribute),
 * `<fieldset disabled>` and state restoration. Name it with `label`,
 * `<label for>`, `aria-label` or `aria-labelledby`.
 *
 * @summary Group of radios with roving focus, submitted as one form value.
 * @tag minerva-radio-group
 * @slot - The `<minerva-radio>` options
 * @csspart base - The wrapper
 * @csspart label - The visible group label
 * @csspart group - The element with role="radiogroup"
 * @csspart helper-text - The helper text
 * @fires change - The user selected another radio (like native radios)
 * @fires minerva-change - The user selected another radio; `detail: { value }`
 */
export class MinervaRadioGroup extends FormAssociatedElement {
  static override tagName = "minerva-radio-group";
  static override dependencies = [MinervaRadio];
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
    `,
    sharedStyles(styles),
  ];

  /** Value of the selected radio (property; the `value` attribute sets `defaultValue`) */
  @property({ attribute: false })
  value = "";

  /** Initially selected value, restored by `form.reset()` (the `value` attribute) */
  @property({ attribute: "value" })
  defaultValue = "";

  /** Visible label of the group (also its accessible name) */
  @property()
  label = "";

  /** Helper text shown below the group (describes it) */
  @property({ attribute: "helper-text" })
  helperText = "";

  /** Error state (aria-invalid) */
  @property({ type: Boolean, reflect: true })
  error = false;

  /** Layout direction of the radios */
  @property({ reflect: true })
  direction: RadioGroupDirection = "vertical";

  /** Size applied to every radio (each radio's own size when unset) */
  @property({ reflect: true })
  size?: RadioSize;

  /** Color applied to every radio (each radio's own color when unset) */
  @property({ reflect: true })
  color?: RadioColor;

  private readonly locale = new LocaleController(this);
  private readonly aria = new AriaController(this, () => this.labels);
  private readonly roving = new RovingFocusController(this, () => ({
    getItems: () => this.radios,
    isItemDisabled: (item) =>
      this.isDisabled || (item as MinervaRadio).disabled,
    orientation: "both",
    dir: getDirection(this),
    loop: true,
  }));
  private observer: MutationObserver | null = null;
  private dirty = false;
  private rovingAttached = false;
  /** An update is queued for when server-rendered radios settle */
  private settleQueued = false;

  /** The radios of the group */
  get radios(): MinervaRadio[] {
    return Array.from(this.querySelectorAll("minerva-radio")).filter(
      (radio): radio is MinervaRadio =>
        radio instanceof MinervaRadio && radio.group === this,
    );
  }

  /** Focuses the checked radio (else the first enabled one) */
  override focus(options?: FocusOptions): void {
    const radios = this.radios;
    const target =
      radios.find((radio) => radio.checked && !radio.disabled) ??
      radios.find((radio) => !radio.disabled);
    target?.focus(options);
  }

  override connectedCallback(): void {
    super.connectedCallback();
    // roving tabindex: once server-rendered radios may get host attributes
    // (see `syncRoving()`)
    if (!isHostDeferred(this)) this.attachRoving();
    this.addEventListener("click", this.handleClick);
    if (typeof MutationObserver !== "undefined") {
      this.observer = new MutationObserver(() => this.requestUpdate());
      this.observer.observe(this, { childList: true, subtree: true });
    }
  }

  /** Attaches the roving focus, then the group's keydown listener. */
  private attachRoving() {
    if (this.rovingAttached) return;
    this.rovingAttached = true;
    this.roving.attach(this);
    // after core's handler (registered by attach): it moved focus already
    this.addEventListener("keydown", this.handleKeyDown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.rovingAttached = false;
    this.removeEventListener("keydown", this.handleKeyDown);
    this.removeEventListener("click", this.handleClick);
    this.observer?.disconnect();
    this.observer = null;
  }

  protected getFormValue(): string | null {
    return this.value === "" ? null : this.value;
  }

  protected override getValidity(): ValidityResult {
    if (this.required && this.value === "") {
      return {
        flags: { valueMissing: true },
        message: this.locale.t("validation.radioMissing"),
        anchor: this.radios.find((radio) => !radio.disabled) ?? null,
      };
    }
    return { flags: {}, message: "" };
  }

  protected resetFormValue(): void {
    this.dirty = false;
    this.value = this.defaultValue;
  }

  protected override restoreFormState(state: unknown): void {
    if (typeof state === "string") this.value = state;
    else if (state === null) this.value = "";
  }

  protected override willUpdate(changed: Map<PropertyKey, unknown>): void {
    // first update: a value set before connecting wins over the default
    // unless the value attribute is present
    if (
      changed.has("defaultValue") &&
      !this.dirty &&
      (this.hasUpdated || this.hasAttribute("value"))
    ) {
      this.value = this.defaultValue;
    }
  }

  protected override updated(changed: Map<PropertyKey, unknown>): void {
    super.updated(changed);
    const radios = this.radios;
    let checked: MinervaRadio | undefined;
    for (const radio of radios) {
      radio.checked = this.value !== "" && radio.value === this.value;
      if (radio.checked) checked ??= radio;
      radio.requestUpdate();
    }
    this.syncRoving(radios, checked);
    if (DEV && this.value !== "" && radios.length > 0 && !checked) {
      devWarn(
        MinervaRadioGroup.tagName,
        `value "${this.value}" matches no <minerva-radio> of the group.`,
      );
    }
  }

  /**
   * Roving tabindex (the checked radio is the Tab stop; disabled radios
   * never are), once server-rendered radios may get host attributes.
   */
  private syncRoving(radios: MinervaRadio[], checked?: MinervaRadio) {
    const waiting = [this, ...radios].find(isHostDeferred);
    if (waiting) {
      if (!this.settleQueued) {
        this.settleQueued = true;
        onHostSettled(waiting, () => {
          this.settleQueued = false;
          this.requestUpdate();
        });
      }
      return;
    }
    this.attachRoving();
    if (checked && !checked.disabled && !this.isDisabled) {
      this.roving.setActive(checked, { focus: false });
    } else {
      this.roving.refresh();
    }
    for (const radio of radios) {
      if (this.isDisabled || radio.disabled)
        radio.setAttribute("tabindex", "-1");
    }
  }

  private select(radio: MinervaRadio) {
    if (this.isDisabled || radio.disabled || radio.value === this.value) return;
    this.dirty = true;
    this.value = radio.value;
    this.dispatchEvent(new Event("change", { bubbles: true }));
    this.emit("minerva-change", { value: this.value });
  }

  private readonly handleClick = (event: MouseEvent) => {
    const target = event.target as Element | null;
    const radio = target?.closest?.("minerva-radio");
    if (radio instanceof MinervaRadio && radio.group === this) {
      this.select(radio);
    }
  };

  private readonly handleKeyDown = (event: KeyboardEvent) => {
    if (!event.defaultPrevented || !NAVIGATION_KEYS.has(event.key)) return;
    const active = this.roving.getActive();
    if (active instanceof MinervaRadio) this.select(active);
  };

  protected override render() {
    const invalid = this.error || this.aria.attr("aria-invalid") === "true";
    const label = this.label;
    const description = [this.helperText, this.aria.description]
      .filter(Boolean)
      .join(" ");
    return html`<div
      part="base"
      class=${classMap({ radioGroupWrapper: true, error: invalid })}
    >
      ${
        label
          ? html`<div id="label" part="label" class="groupLabel">${label}</div>`
          : nothing
      }
      <div
        part="group"
        class=${classMap({ radioGroup: true, [this.direction]: true })}
        role="radiogroup"
        aria-labelledby=${label ? "label" : nothing}
        aria-label=${label ? nothing : (this.aria.label ?? nothing)}
        aria-description=${description || nothing}
        aria-required=${this.required ? "true" : "false"}
        aria-invalid=${invalid ? "true" : "false"}
        aria-disabled=${this.isDisabled ? "true" : nothing}
      >
        <slot></slot>
      </div>
      ${
        this.helperText
          ? html`<div
              part="helper-text"
              aria-hidden="true"
              class=${classMap({ helperText: true, errorText: invalid })}
            >
              ${this.helperText}
            </div>`
          : nothing
      }
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-radio": MinervaRadio;
    "minerva-radio-group": MinervaRadioGroup;
  }
}
