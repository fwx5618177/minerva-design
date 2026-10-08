import { css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import styles from "@react-styles/components/FormControl/formControl.module.scss?inline";
import { DEV, devWarn } from "../../internal/dev";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { HasSlotController } from "../../internal/slots";
import { sharedStyles } from "../../internal/styles";

type Control = HTMLElement & Record<string, unknown>;

/** Boolean state the field applies to its control. */
type Flag = "invalid" | "required" | "disabled" | "readOnly";

/** Controls that a label click toggles (like a native `<label>`) */
const isCheckable = (el: Element) =>
  el.localName === "minerva-checkbox" ||
  el.localName === "minerva-switch" ||
  (el instanceof HTMLInputElement &&
    (el.type === "checkbox" || el.type === "radio"));

/**
 * Field wrapper (`<FormControl>` + `<FormField>` of React): a label with
 * a required indicator, ONE slotted control (a Minerva form control or a
 * native `<input>` / `<select>` / `<textarea>`), a helper text, and an error
 * message that replaces the helper text while `invalid`.
 *
 * Wiring (React shares it through context; ids cannot cross shadow roots,
 * so the field writes it onto the slotted control instead):
 * - name: `aria-label` = the label text (unless the control has its own
 *   `aria-label`); Minerva controls forward it to their inner element
 * - description: `aria-description` = the helper text, or the error message
 *   while invalid (forwarded the same way)
 * - `invalid` -> the control's `invalid` (or `error`) property when it has
 *   one, and `aria-invalid="true"`
 * - `required` / `disabled` / `readonly` -> the control's `required` /
 *   `disabled` / `readonly` (`readOnly` natively) properties when present,
 *   plus `aria-required` / `aria-readonly`
 * Everything the field set is restored when the state is turned off or the
 * control is removed. Clicking the label focuses the control (checkboxes and
 * switches are toggled, like a native `<label>`).
 *
 * @summary Label, help text and error message around one form control.
 * @tag minerva-form-control
 * @slot - The control (one element)
 * @slot label - Rich label content (alternative to the `label` attribute)
 * @slot helper-text - Rich helper text (alternative to `helper-text`)
 * @slot error-message - Rich error message (alternative to `error-message`)
 * @csspart root - The field container
 * @csspart label - The <label>
 * @csspart required-indicator - The required marker of the label
 * @csspart helper-text - The helper text (hidden while invalid)
 * @csspart error-message - The error message (role="alert", while invalid)
 */
export class MinervaFormControl extends MinervaElement {
  static override tagName = "minerva-form-control";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
      .label {
        cursor: default;
      }
    `,
    sharedStyles(styles),
  ];

  /** Label text (alternative to the `label` slot) */
  @property()
  label = "";

  /** Help text below the control, hidden while invalid */
  @property({ attribute: "helper-text" })
  helperText = "";

  /** Error message, shown (and describing the control) while invalid */
  @property({ attribute: "error-message" })
  errorMessage = "";

  /** Marks the field (and its control) as invalid */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /** Marks the field as required (indicator on the label, required control) */
  @property({ type: Boolean, reflect: true })
  required = false;

  /** Disables the control */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Makes the control read-only */
  @property({ type: Boolean, reflect: true, attribute: "readonly" })
  readOnly = false;

  /** Indicator shown after the label when required (hidden from assistive technology) */
  @property({ attribute: "required-indicator" })
  requiredIndicator = "*";

  private readonly slots = new HasSlotController(this);
  private observer: MutationObserver | null = null;
  private control: Control | null = null;
  /** Previous values of what the field changed on the control */
  private readonly saved = new Map<string, unknown>();

  /** The slotted control */
  get controlElement(): HTMLElement | null {
    return (
      (Array.from(this.children).find(
        (child) => !child.hasAttribute("slot"),
      ) as HTMLElement | undefined) ?? null
    );
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (typeof MutationObserver !== "undefined") {
      this.observer = new MutationObserver(() => this.sync());
      this.observer.observe(this, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.observer?.disconnect();
    this.observer = null;
    this.release();
  }

  protected override updated(): void {
    this.sync();
  }

  private get labelText(): string {
    if (this.label) return this.label;
    return Array.from(this.children)
      .filter((child) => child.getAttribute("slot") === "label")
      .map((child) => child.textContent?.trim() ?? "")
      .filter(Boolean)
      .join(" ");
  }

  private slotText(name: string): string {
    return Array.from(this.children)
      .filter((child) => child.getAttribute("slot") === name)
      .map((child) => child.textContent?.trim() ?? "")
      .filter(Boolean)
      .join(" ");
  }

  private get descriptionText(): string {
    return this.invalid
      ? this.errorMessage || this.slotText("error-message")
      : this.helperText || this.slotText("helper-text");
  }

  /** Remembers the original value of `key` before changing it */
  private save(key: string, value: unknown) {
    if (!this.saved.has(key)) this.saved.set(key, value);
  }

  private setAttr(el: Control, name: string, value: string | null) {
    const key = `@${name}`;
    if (value === null) {
      if (!this.saved.has(key)) return;
      const previous = this.saved.get(key) as string | null;
      this.saved.delete(key);
      if (previous === null) el.removeAttribute(name);
      else el.setAttribute(name, previous);
      return;
    }
    this.save(key, el.getAttribute(name));
    if (el.getAttribute(name) !== value) el.setAttribute(name, value);
  }

  private setProp(el: Control, prop: string, on: boolean) {
    const key = `.${prop}`;
    if (!on) {
      if (!this.saved.has(key)) return;
      el[prop] = this.saved.get(key);
      this.saved.delete(key);
      return;
    }
    this.save(key, el[prop]);
    el[prop] = true;
  }

  /** Name of the boolean property implementing `flag` on `el`, if any */
  private propFor(el: Control, flag: Flag): string | null {
    const candidates: Record<Flag, string[]> = {
      invalid: ["invalid", "error"],
      required: ["required"],
      disabled: ["disabled"],
      readOnly: ["readOnly", "readonly"],
    };
    return (
      candidates[flag].find(
        (prop) => prop in el && typeof el[prop] === "boolean",
      ) ?? null
    );
  }

  /** Undoes everything applied to the current control */
  private release() {
    const el = this.control;
    if (!el) return;
    for (const [key, value] of this.saved) {
      if (key.startsWith("@")) {
        const name = key.slice(1);
        if (value === null) el.removeAttribute(name);
        else el.setAttribute(name, value as string);
      } else el[key.slice(1)] = value;
    }
    this.saved.clear();
    this.control = null;
  }

  /** Applies the field state to the slotted control */
  private sync() {
    const el = this.controlElement as Control | null;
    if (el !== this.control) {
      this.release();
      this.control = el;
    }
    if (!el) return;

    const label = this.labelText;
    const ownsLabel = this.saved.has("@aria-label");
    if (label && (ownsLabel || !el.hasAttribute("aria-label"))) {
      this.setAttr(el, "aria-label", label);
    } else if (!label) this.setAttr(el, "aria-label", null);

    const description = this.descriptionText;
    this.setAttr(el, "aria-description", description || null);

    const flags: Flag[] = ["invalid", "required", "disabled", "readOnly"];
    for (const flag of flags) {
      const prop = this.propFor(el, flag);
      if (prop) this.setProp(el, prop, this[flag]);
    }
    this.setAttr(el, "aria-invalid", this.invalid ? "true" : null);
    this.setAttr(el, "aria-required", this.required ? "true" : null);
    this.setAttr(el, "aria-readonly", this.readOnly ? "true" : null);

    if (DEV && this.children.length > 0) {
      const controls = Array.from(this.children).filter(
        (child) => !child.hasAttribute("slot"),
      );
      if (controls.length > 1) {
        devWarn(
          MinervaFormControl.tagName,
          `wraps ONE control, found ${controls.length} elements in the default slot: only the first one is wired.`,
        );
      }
    }
  }

  private handleLabelClick(event: MouseEvent) {
    const el = this.controlElement;
    if (!el || this.disabled) return;
    event.preventDefault();
    if (isCheckable(el)) el.click();
    else el.focus();
  }

  protected override hookStates() {
    return {
      disabled: this.disabled,
      invalid: this.invalid,
      readonly: this.readOnly,
      required: this.required,
    };
  }

  protected override render() {
    const hasLabel = !!this.label || this.slots.test("label");
    const hasHelper = !!this.helperText || this.slots.test("helper-text");
    const hasError = !!this.errorMessage || this.slots.test("error-message");
    return html`<div class="root" part="root">
      ${
        hasLabel
          ? html`<label
              id="label"
              class="label"
              part="label"
              @click=${this.handleLabelClick}
              >${this.label || html`<slot name="label"></slot>`}${
                this.required
                  ? html`<span
                      class="required"
                      part="required-indicator"
                      aria-hidden="true"
                      >${this.requiredIndicator}</span
                    >`
                  : nothing
              }</label
            >`
          : nothing
      }
      <slot @slotchange=${() => this.sync()}></slot>
      ${
        !this.invalid && hasHelper
          ? html`<div id="helper" class="helper" part="helper-text">
              ${this.helperText || html`<slot name="helper-text"></slot>`}
            </div>`
          : nothing
      }
      ${
        this.invalid && hasError
          ? html`<div
              id="error"
              class="error"
              part="error-message"
              role="alert"
            >
              ${this.errorMessage || html`<slot name="error-message"></slot>`}
            </div>`
          : nothing
      }
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-form-control": MinervaFormControl;
  }
}
