import { css, html, nothing } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { live } from "lit/directives/live.js";
import type { ColorScheme } from "@minerva/core";
import styles from "@lib-core-styles/components/Switch/switch.module.scss?inline";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import {
  FormAssociatedElement,
  type ValidityResult,
} from "../../internal/form";
import { LocaleController } from "../../internal/locale";
import { hostStyles } from "../../internal/minerva-element";
import { HasSlotController } from "../../internal/slots";
import { sharedStyles } from "../../internal/styles";

export type SwitchVariant = "slider" | "segmented";
export type SwitchSize = "small" | "medium" | "large";
export type SwitchShape = "round" | "square";
export type SwitchLabelPlacement = "start" | "end" | "top" | "bottom";
export type SwitchIconPlacement = "start" | "end";
export type SwitchColor = Extract<
  ColorScheme,
  "primary" | "success" | "info" | "warning" | "danger"
>;

const RIPPLE_DURATION = 400;

const placementClass: Record<SwitchLabelPlacement, string> = {
  start: "labelStart",
  end: "labelEnd",
  top: "labelTop",
  bottom: "labelBottom",
};

/**
 * Toggles between two mutually exclusive states (`<Switch>` of lib-core): a
 * native checkbox with `role="switch"` (Space and Enter toggle it).
 * `off-label` + `on-label` add clickable labels on both sides of the slider,
 * or build a two-segment control with `variant="segmented"`.
 *
 * Form-associated like a checkbox: when on, submits `value` (default
 * `"on"`) under `name`; `required` makes it invalid until on
 * (`valueMissing`); supports `form.reset()` (restores the `checked`
 * attribute), `<fieldset disabled>` and state restoration.
 *
 * @summary On / off switch (slider, side labels or segmented).
 * @tag minerva-switch
 * @slot - Label content (alternative to the `label` attribute)
 * @slot icon - Icon inside the thumb (`icon-placement="start"`) or after the switch ("end")
 * @csspart root - The outer element (<label>; a <span> with side labels; the group of segments)
 * @csspart input - The native `<input type="checkbox" role="switch">`
 * @csspart control - The slider box (wraps the track and the thumb)
 * @csspart track - The track
 * @csspart thumb - The thumb
 * @csspart icon - The icon (in the thumb or after the slider)
 * @csspart label - The label text
 * @csspart side - The off / on side labels (buttons)
 * @csspart segment - The off / on segments (buttons, variant="segmented")
 * @fires change - The state changed (re-dispatched from the inner input)
 * @fires minerva-change - The user toggled the switch; `detail: { checked, value }`
 */
export class MinervaSwitch extends FormAssociatedElement {
  static override tagName = "minerva-switch";
  static override shadowRootOptions = {
    ...FormAssociatedElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }
    `,
    sharedStyles(styles),
  ];

  /** Whether the switch is on (property; the `checked` attribute sets `defaultChecked`) */
  @property({ attribute: false })
  checked = false;

  /** Initial state, restored by `form.reset()` (the `checked` attribute) */
  @property({ type: Boolean, attribute: "checked", reflect: true })
  defaultChecked = false;

  /** Value submitted with the form when on */
  @property()
  value = "on";

  /** Label text (alternative to the default slot) */
  @property()
  label = "";

  /** Label of the "off" state; with `on-label`, rendered as side buttons or segments */
  @property({ attribute: "off-label" })
  offLabel = "";

  /** Label of the "on" state (see `off-label`) */
  @property({ attribute: "on-label" })
  onLabel = "";

  /** "slider" (track + thumb) or "segmented" (needs off-label and on-label) */
  @property({ reflect: true })
  variant: SwitchVariant = "slider";

  /** Switch size */
  @property({ reflect: true })
  size: SwitchSize = "medium";

  /** Semantic color of the "on" state */
  @property({ reflect: true })
  color: SwitchColor = "primary";

  /** Shape of the track and thumb */
  @property({ reflect: true })
  shape: SwitchShape = "round";

  /** Position of the label relative to the switch */
  @property({ attribute: "label-placement", reflect: true })
  labelPlacement: SwitchLabelPlacement = "end";

  /** Icon position: inside the thumb ("start") or after the switch ("end") */
  @property({ attribute: "icon-placement" })
  iconPlacement: SwitchIconPlacement = "start";

  /** Shows a loading state and blocks interaction (aria-busy) */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /** Disables the ripple effect on click */
  @property({ type: Boolean, attribute: "no-ripple" })
  noRipple = false;

  /** Read-only: focusable and submitted, but the user cannot toggle it */
  @property({ type: Boolean, reflect: true, attribute: "readonly" })
  readOnly = false;

  /** Error state (aria-invalid) */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  @state()
  private rippleActive = false;

  @query("input")
  private input!: HTMLInputElement;

  private rippleTimer: ReturnType<typeof setTimeout> | undefined;
  private dirty = false;
  private readonly locale = new LocaleController(this);
  private readonly aria = new AriaController(this, () => this.labels);
  private readonly slots = new HasSlotController(this);

  private get bilateral(): boolean {
    return !!this.offLabel && !!this.onLabel;
  }

  private get segmented(): boolean {
    return this.variant === "segmented" && this.bilateral;
  }

  private get blocked(): boolean {
    return this.isDisabled || this.loading || this.readOnly;
  }

  override focus(options?: FocusOptions): void {
    if (this.segmented) {
      this.renderRoot
        .querySelector<HTMLButtonElement>(".segmentActive")
        ?.focus(options);
      return;
    }
    this.input?.focus(options);
  }

  override blur(): void {
    (this.shadowRoot?.activeElement as HTMLElement | null)?.blur();
  }

  override click(): void {
    this.input?.click();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    clearTimeout(this.rippleTimer);
  }

  protected getFormValue(): string | null {
    return this.checked ? this.value : null;
  }

  protected override getValidity(): ValidityResult {
    if (this.required && !this.checked) {
      return {
        flags: { valueMissing: true },
        message: this.locale.t("validation.checkMissing"),
        anchor: this.input,
      };
    }
    return { flags: {}, message: "" };
  }

  protected resetFormValue(): void {
    this.dirty = false;
    this.checked = this.defaultChecked;
  }

  protected override restoreFormState(state: unknown): void {
    this.checked = state !== null && state !== undefined && state !== "";
  }

  protected override willUpdate(changed: Map<PropertyKey, unknown>): void {
    // first update: a state set before connecting wins over the default
    // unless the checked attribute is present
    if (
      changed.has("defaultChecked") &&
      !this.dirty &&
      (this.hasUpdated || this.hasAttribute("checked"))
    ) {
      this.checked = this.defaultChecked;
    }
    if (
      DEV &&
      changed.has("variant") &&
      this.variant === "segmented" &&
      !this.bilateral
    ) {
      devWarn(
        MinervaSwitch.tagName,
        'variant="segmented" needs both off-label and on-label; rendering a slider.',
      );
    }
  }

  private handleChange() {
    if (this.blocked) {
      this.input.checked = this.checked;
      return;
    }
    this.dirty = true;
    this.checked = this.input.checked;
    this.dispatchEvent(new Event("change", { bubbles: true }));
    this.emit("minerva-change", { checked: this.checked, value: this.value });
  }

  // Native checkboxes toggle on Space only; the switch pattern also allows Enter.
  private handleKeyDown(event: KeyboardEvent) {
    if (event.key !== "Enter") return;
    event.preventDefault();
    if (this.blocked) return;
    this.input.click();
  }

  private handleClick(event: MouseEvent) {
    if (this.readOnly) {
      event.preventDefault();
      return;
    }
    if (this.noRipple || this.blocked) return;
    clearTimeout(this.rippleTimer);
    this.rippleActive = true;
    this.rippleTimer = setTimeout(
      () => (this.rippleActive = false),
      RIPPLE_DURATION,
    );
  }

  /** Side labels / segments click the input so the regular events fire */
  private setState(next: boolean) {
    if (this.blocked || next === this.checked) return;
    this.input.click();
  }

  protected override hookStates() {
    return {
      state: this.checked ? "checked" : "unchecked",
      disabled: this.isDisabled,
      loading: this.loading,
      invalid: this.invalid || this.aria.attr("aria-invalid") === "true",
      readonly: this.readOnly,
      required: this.required,
      size: this.size,
      color: this.color,
      shape: this.shape,
      variant: this.segmented ? "segmented" : "slider",
    };
  }

  private renderInput(segmented: boolean) {
    const invalid = this.invalid || this.aria.attr("aria-invalid") === "true";
    return html`<input
      part="input"
      type="checkbox"
      role=${segmented ? nothing : "switch"}
      class=${segmented ? "hiddenInput" : ""}
      .checked=${live(this.checked)}
      ?disabled=${this.isDisabled || this.loading}
      ?required=${this.required}
      tabindex=${segmented ? "-1" : nothing}
      aria-hidden=${segmented ? "true" : nothing}
      aria-label=${segmented ? nothing : (this.aria.label ?? nothing)}
      aria-description=${segmented ? nothing : (this.aria.description ?? nothing)}
      aria-checked=${segmented ? nothing : String(this.checked)}
      aria-disabled=${
        !segmented && (this.isDisabled || this.loading) ? "true" : nothing
      }
      aria-busy=${this.loading ? "true" : nothing}
      aria-invalid=${!segmented && invalid ? "true" : nothing}
      aria-readonly=${!segmented && this.readOnly ? "true" : nothing}
      aria-required=${!segmented && this.required ? "true" : nothing}
      @change=${this.handleChange}
      @click=${this.handleClick}
      @keydown=${this.handleKeyDown}
    />`;
  }

  protected override render() {
    const blocked = this.blocked;
    const disabled = this.isDisabled;

    if (this.segmented) {
      return html`<span
        part="root"
        role="group"
        aria-label=${this.aria.label ?? nothing}
        aria-description=${this.aria.description ?? nothing}
        aria-disabled=${blocked ? "true" : nothing}
        class=${classMap({
          segmented: true,
          [this.size]: true,
          [this.color]: true,
          disabled: blocked,
        })}
      >
        ${this.renderInput(true)}
        ${[false, true].map((segmentState) => {
          const active = this.checked === segmentState;
          return html`<button
            part="segment"
            type="button"
            class=${classMap({ segment: true, segmentActive: active })}
            ?disabled=${blocked}
            aria-pressed=${String(active)}
            @click=${() => this.setState(segmentState)}
          >
            ${segmentState ? this.onLabel : this.offLabel}
          </button>`;
        })}
      </span>`;
    }

    const bilateral = this.bilateral;
    const hasIcon = this.slots.test("icon");
    const switchClasses = classMap({
      switch: true,
      [this.size]: true,
      [placementClass[this.labelPlacement]]: !bilateral,
      [this.color]: true,
      checked: this.checked,
      checkedLarge: this.checked && this.size === "large",
      disabled,
      loading: this.loading,
      square: this.shape === "square",
      ripple: !this.noRipple && this.rippleActive,
      bilateral,
    });
    const control = html`<span class="switchBase" part="control">
      ${this.renderInput(false)}
      <span class="track" part="track"></span>
      <span class="thumb" part="thumb"
        >${
          this.iconPlacement === "start" && hasIcon
            ? html`<span class="icon" part="icon"
                ><slot name="icon"></slot
              ></span>`
            : nothing
        }</span
      >
      ${this.noRipple ? nothing : html`<span class="rippleEffect"></span>`}
    </span>`;
    const iconNode =
      this.iconPlacement === "end" && hasIcon
        ? html`<span class="icon" part="icon"><slot name="icon"></slot></span>`
        : nothing;

    if (bilateral) {
      const side = (sideState: boolean) =>
        html`<button
          part="side"
          type="button"
          class=${classMap({ side: true, sideActive: this.checked === sideState })}
          ?disabled=${blocked}
          @click=${() => this.setState(sideState)}
        >
          ${sideState ? this.onLabel : this.offLabel}
        </button>`;
      return html`<span part="root" class=${switchClasses}
        >${side(false)}${control}${side(true)}${iconNode}</span
      >`;
    }

    const hasLabel = !!this.label || this.slots.test("[default]");
    const labelNode = hasLabel
      ? html`<span class="label" part="label"
          >${this.label || html`<slot></slot>`}</span
        >`
      : nothing;
    const labelFirst =
      this.labelPlacement === "start" || this.labelPlacement === "top";
    return html`<label part="root" class=${switchClasses}
      >${labelFirst ? labelNode : nothing}${control}${iconNode}${
        labelFirst ? nothing : labelNode
      }</label
    >`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-switch": MinervaSwitch;
  }
}
