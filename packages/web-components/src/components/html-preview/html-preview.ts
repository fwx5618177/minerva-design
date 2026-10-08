import { css, html, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { keyed } from "lit/directives/keyed.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "@react-styles/components/HtmlPreview/htmlPreview.module.scss?inline";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { previewDocument } from "./preview-document";
import { sharedStyles } from "../../internal/styles";

/** Simulated viewport */
export type HtmlPreviewViewport = "desktop" | "mobile";

/**
 * Previews untrusted HTML (e.g. an email template) in a fully sandboxed
 * iframe (`<HtmlPreview>` of React). The markup is sanitized with
 * DOMPurify (fail-closed: an empty document when the sanitizer's
 * self-check does not pass) and rendered behind a Content-Security-Policy
 * that blocks scripts and network access; only inline styles and `data:`
 * images are allowed. The iframe itself is not configurable: always
 * `sandbox=""`, no referrer.
 *
 * Sanitizing needs a browser DOM: during SSR the empty shell is rendered
 * and the document is filled on the client.
 *
 * @summary Sandboxed, sanitized preview of untrusted HTML.
 * @tag minerva-html-preview
 * @csspart root - The scrolling container
 * @csspart frame - The sandboxed `<iframe>`
 */
export class MinervaHtmlPreview extends MinervaElement {
  static override tagName = "minerva-html-preview";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
    `,
    sharedStyles(styles),
  ];

  /** Untrusted HTML to preview (sanitized in the browser) */
  @property()
  html = "";

  /** Accessible title of the iframe (the React library's `title`; falls back to aria-label) */
  @property()
  label = "";

  /** Full-width desktop preview or fixed-width mobile preview */
  @property({ reflect: true })
  viewport: HtmlPreviewViewport = "desktop";

  /** Width of the mobile preview in pixels (invalid values fall back to 375) */
  @property({ type: Number, attribute: "mobile-width" })
  mobileWidth = 375;

  /** Height of the iframe in pixels (invalid values fall back to 600) */
  @property({ type: Number })
  height = 600;

  /** The sanitized document (empty shell until the first client update) */
  @state()
  private doc = previewDocument();

  private readonly aria = new AriaController(this);

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has("html")) this.doc = previewDocument(this.html);
  }

  protected override updated(): void {
    if (DEV && !this.label && !this.aria.label) {
      devWarn(
        MinervaHtmlPreview.tagName,
        "set label (or aria-label): the iframe needs a title for assistive technologies.",
      );
    }
  }

  protected override render() {
    const width =
      Number.isFinite(this.mobileWidth) && this.mobileWidth > 0
        ? this.mobileWidth
        : 375;
    const height =
      Number.isFinite(this.height) && this.height > 0 ? this.height : 600;
    // A new key replaces the browsing context, so an earlier document can
    // never finish loading after the current one.
    return html`<div part="root" class="preview">
      ${keyed(
        this.doc,
        html`<iframe
          part="frame"
          class="frame"
          title=${this.label || this.aria.label || ""}
          sandbox=""
          referrerpolicy="no-referrer"
          srcdoc=${this.doc}
          style=${styleMap({
            width: this.viewport === "mobile" ? `${width}px` : "100%",
            height: `${height}px`,
          })}
        ></iframe>`,
      )}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-html-preview": MinervaHtmlPreview;
  }
}
