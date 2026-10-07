import { css, html } from "lit";
import { MinervaElement } from "../../internal/minerva-element";
import { MinervaConfirmDialog } from "./confirm";
import {
  ConfirmQueue,
  registerConfirmProvider,
  type ConfirmFunction,
  type ConfirmQueueOwner,
} from "./confirm-function";

/**
 * Renders the imperative confirmations of its subtree (lib-core's
 * `ConfirmProvider`): `confirm({ host })` / `confirmFor(host)` called with an
 * element inside it are queued here and their dialogs are appended inside it
 * (or inside the host's nested `<minerva-config>` scope), so they use its
 * theme, palette and language. `confirm()` without a host uses the most
 * recently connected provider. Disconnecting the provider cancels its
 * pending confirmations (they resolve `false`). Optional: without a
 * provider, confirmations render on `document.body`.
 *
 * It renders as `display: contents`.
 *
 * @summary Scope that renders the imperative confirm() dialogs of its subtree (ConfirmProvider).
 * @tag minerva-confirm-provider
 * @slot - Application content
 */
export class MinervaConfirmProvider
  extends MinervaElement
  implements ConfirmQueueOwner
{
  static override tagName = "minerva-confirm-provider";
  static override dependencies = [MinervaConfirmDialog];
  static override styles = css`
    :host {
      display: contents;
    }
  `;

  /** @internal The FIFO queue rendered by this provider */
  readonly confirmQueue = new ConfirmQueue(() => this);

  private unregister: (() => void) | null = null;

  /**
   * Asks for a confirmation rendered by this provider (its scope, or the
   * scope of `options.host`); resolves `true` when confirmed.
   */
  readonly confirm: ConfirmFunction = (options) =>
    this.confirmQueue.enqueue(options);

  override connectedCallback(): void {
    super.connectedCallback();
    this.unregister = registerConfirmProvider(this);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unregister?.();
    this.unregister = null;
    this.confirmQueue.cancelAll();
  }

  protected override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-confirm-provider": MinervaConfirmProvider;
  }
}
