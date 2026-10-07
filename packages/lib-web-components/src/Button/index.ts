import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./styles";
import type { ButtonProps } from "./types";

@customElement("minerva-button")
export class Button extends LitElement {
  static styles = styles;

  @property({ type: String, reflect: true })
  variant: ButtonProps["variant"] = "primary";

  @property({ type: String, reflect: true })
  size: ButtonProps["size"] = "medium";

  @property({ type: String, reflect: true })
  shape: ButtonProps["shape"] = "rounded";

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: Boolean, reflect: true })
  active = false;

  @property({ type: String, attribute: "aria-label" })
  ariaLabel = "";

  @property({ type: String })
  type: NonNullable<ButtonProps["type"]> = "button";

  private handleClick(e: MouseEvent) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    this.createRippleEffect(e);

    // The inner <button> lives in the shadow root and cannot reach a light
    // DOM form: submit / reset the enclosing form explicitly when asked to.
    if (this.type === "submit") this.closest("form")?.requestSubmit();
    else if (this.type === "reset") this.closest("form")?.reset();
  }

  private createRippleEffect(e: MouseEvent) {
    const button = this.shadowRoot?.querySelector<HTMLElement>(".button");
    if (!button) return;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add("ripple");

    const existingRipple = button.querySelector(".ripple");
    if (existingRipple) {
      existingRipple.remove();
    }

    button.appendChild(ripple);

    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
  }

  render() {
    return html`
      <button
        type="button"
        class=${this.generateClasses()}
        ?disabled=${this.disabled}
        aria-label=${this.ariaLabel || nothing}
        aria-busy=${this.loading ? "true" : nothing}
        @click=${this.handleClick}
      >
        ${
          this.loading
            ? html`<span class="loading-spinner"></span>`
            : html`<slot></slot>`
        }
      </button>
    `;
  }

  private generateClasses(): string {
    return [
      "button",
      `variant-${this.variant}`,
      `size-${this.size}`,
      `shape-${this.shape}`,
      this.loading && "loading",
      this.active && "active",
      this.disabled && "disabled",
    ]
      .filter(Boolean)
      .join(" ");
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-button": Button;
  }
}
