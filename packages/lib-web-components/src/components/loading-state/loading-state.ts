import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "@lib-core-styles/components/LoadingState/loadingState.module.scss?inline";
import { DEV, devWarn } from "../../internal/dev";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { MinervaProgress } from "../progress/progress";
import { sharedStyles } from "../../internal/styles";

/** Minimum-height preset (64 / 160 / 240 px) */
export type LoadingStateSize = "small" | "medium" | "large";

const SIZES: readonly string[] = ["small", "medium", "large"];

/**
 * Page / route / section loading presentation (`<LoadingState>` of
 * lib-core): a decorative spinner next to a visible label, inside a single
 * polite status region. It does not set `aria-busy`: mark the content
 * container busy yourself.
 *
 * @summary Loading placeholder for a page, route or section.
 * @tag minerva-loading-state
 * @slot - Label (alternative to the `label` attribute)
 * @csspart root - The status region
 * @csspart spinner - The decorative spinner (wraps a ProgressIndicator in React; the <minerva-progress> element in the web components)
 * @csspart label - The label
 */
export class MinervaLoadingState extends MinervaElement {
  static override tagName = "minerva-loading-state";
  static override dependencies = [MinervaProgress];
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
    `,
    sharedStyles(styles),
  ];

  /** Visible text, also announced by the status region (default: localized "Loading...") */
  @property()
  label?: string;

  /** Minimum height: small (section), medium (page / route) or large */
  @property({ reflect: true })
  size: LoadingStateSize = "medium";

  private readonly locale = new LocaleController(this);

  protected override hookStates() {
    return { size: this.size };
  }

  protected override updated(): void {
    if (DEV && !SIZES.includes(this.size)) {
      devWarn(
        MinervaLoadingState.tagName,
        `unknown size "${this.size}" (expected ${SIZES.join(", ")}).`,
      );
    }
  }

  protected override render() {
    return html`<div
      part="root"
      class=${classMap({ loadingState: true, [this.size]: true })}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <minerva-progress
        part="spinner"
        class="indicator"
        color="current"
        decorative
      ></minerva-progress>
      <span part="label" class="label"
        ><slot>${this.label ?? this.locale.t("loadingState.label")}</slot></span
      >
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-loading-state": MinervaLoadingState;
  }
}
