import { css, html, nothing, unsafeCSS, type TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { repeat } from "lit/directives/repeat.js";
import styles from "@lib-core-styles/components/Steps/steps.module.scss?inline";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";

/** One step */
export interface StepsItem {
  /** Unique value, matched against the Steps value */
  value: string;
  /** Visible label */
  label: string | Node | TemplateResult;
  /** Prevents navigating to this step */
  disabled?: boolean;
}

/**
 * The stages of a workflow as an ordered list (`<Steps>` of lib-core).
 * Earlier steps are marked complete and the current one with
 * `aria-current="step"`. By default the steps are a read-only progress
 * indicator (no buttons, `aria-current` on the `<li>`); with `navigable`
 * each step is a native button, and choosing one sets `value` and fires
 * `minerva-change` (validation and workflow transitions belong to the
 * caller: cancel the event to keep the current step).
 *
 * @summary Workflow steps, read-only or navigable.
 * @tag minerva-steps
 * @csspart base - The `<ol>`
 * @csspart step - Each `<li>`
 * @csspart button - The button (or static wrapper) of each step
 * @csspart number - The numbered indicator
 * @csspart label - The label of each step
 * @fires minerva-change - The user navigated to a step (`detail: { value }`); cancelable: `preventDefault()` keeps the current step
 */
export class MinervaSteps extends MinervaElement {
  static override tagName = "minerva-steps";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
    `,
    unsafeCSS(styles),
  ];

  /** Steps, in order */
  @property({ attribute: false })
  items: StepsItem[] = [];

  /** Value of the current step ("" matches no step) */
  @property({ reflect: true })
  value = "";

  /** Renders each step as a button the user can navigate with (default: read-only) */
  @property({ type: Boolean, reflect: true })
  navigable = false;

  private readonly locale = new LocaleController(this);
  private readonly aria = new AriaController(this);

  private select(item: StepsItem) {
    if (item.disabled || item.value === this.value) return;
    const allowed = this.emit(
      "minerva-change",
      { value: item.value },
      { cancelable: true },
    );
    if (allowed) this.value = item.value;
  }

  protected override updated(): void {
    if (
      DEV &&
      this.value &&
      this.items.length &&
      !this.items.some((item) => item.value === this.value)
    ) {
      devWarn(
        MinervaSteps.tagName,
        `value "${this.value}" matches no step: no step is marked current.`,
      );
    }
  }

  protected override render() {
    const items = this.items ?? [];
    const currentIndex = items.findIndex((item) => item.value === this.value);
    const readOnly = !this.navigable;
    return html`<ol
      part="base"
      class="steps"
      aria-label=${this.aria.label ?? this.locale.t("steps.label")}
    >
      ${repeat(
        items,
        (item) => item.value,
        (item, index) => {
          const isCurrent = index === currentIndex;
          const isComplete = currentIndex > -1 && index < currentIndex;
          const content = html`<span
              part="number"
              class="number"
              aria-hidden="true"
              >${index + 1}</span
            ><span part="label" class="label">${item.label}</span>`;
          return html`<li
            part="step"
            class=${classMap({
              step: true,
              current: isCurrent,
              complete: isComplete,
            })}
            aria-current=${readOnly && isCurrent ? "step" : nothing}
          >
            ${
              readOnly
                ? html`<span part="button" class="button static"
                    >${content}</span
                  >`
                : html`<button
                    type="button"
                    part="button"
                    class="button"
                    ?disabled=${!!item.disabled}
                    aria-current=${isCurrent ? "step" : nothing}
                    @click=${() => this.select(item)}
                  >
                    ${content}
                  </button>`
            }
          </li>`;
        },
      )}
    </ol>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-steps": MinervaSteps;
  }
}
