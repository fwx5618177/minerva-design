import { css, html, nothing, type PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import type { ColorScheme } from "@minerva/core";
import styles from "@react-styles/components/Modal/modal.module.scss?inline";
import { DismissableLayerController } from "../../controllers/dismissable-layer";
import { popoverResetStyles } from "../../controllers/floating-layer";
import { FocusScopeController } from "../../controllers/focus-scope";
import { ModalController } from "../../controllers/modal";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import { hideTopLayer, showTopLayer } from "../../internal/dom";
import { IconX } from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { PresenceController } from "../../internal/presence";
import { HasSlotController } from "../../internal/slots";
import { MinervaButton } from "../button/button";
import { sharedStyles } from "../../internal/styles";

/** Semantic color of the confirm button (`danger` = destructive action) */
export type ConfirmColor = Extract<
  ColorScheme,
  "primary" | "danger" | "warning"
>;

/** Why the dialog closed / asked to close (`minerva-open-change` detail) */
export type ConfirmCloseReason =
  "confirm" | "cancel-button" | "close-button" | "escape" | "outside";

/** Reasons that cancel the confirmation (`minerva-cancel` detail) */
export type ConfirmCancelReason = Exclude<ConfirmCloseReason, "confirm">;

/**
 * Confirmation dialog (`<ConfirmDialog>` of React): a small modal
 * `alertdialog` asking the user to confirm an action, a themed replacement
 * for `window.confirm`. Focus moves to the Cancel button (the least
 * destructive action, WAI-ARIA APG) and is trapped; Escape (topmost layer
 * only), an overlay click, the Cancel and the close (×) buttons cancel; focus
 * returns to the opener on close.
 *
 * Pressing Confirm fires a cancelable `minerva-confirm`, runs the optional
 * `onConfirm` callback (a returned promise shows the loading state until it
 * settles; a rejection keeps the dialog open) and closes the dialog.
 *
 * For the imperative `confirm({ title }) -> Promise<boolean>` API, see
 * `confirm()` (exported by the same entry).
 *
 * @summary Modal confirmation dialog (alertdialog) with localized Confirm / Cancel buttons.
 * @tag minerva-confirm-dialog
 * @slot - Optional extra content below the description
 * @slot header - Title (alternative to the `label` attribute)
 * @csspart overlay - The backdrop
 * @csspart content - The dialog panel (`role="alertdialog"`)
 * @csspart header - The title (accessible name of the dialog)
 * @csspart description - The description below the title
 * @csspart body - The optional extra content
 * @csspart footer - The actions row (Cancel and Confirm buttons)
 * @csspart cancel-button - The Cancel `<minerva-button>` (web components only: in React it is a Button with its own hooks)
 * @csspart confirm-button - The Confirm `<minerva-button>` (web components only: in React it is a Button with its own hooks)
 * @csspart close-button - The close (×) button
 * @fires minerva-confirm - The confirm button was pressed; cancelable: `preventDefault()` keeps the dialog open (close it yourself)
 * @fires minerva-cancel - The confirmation was cancelled and the dialog closed (`detail: { reason }`)
 * @fires minerva-open-change - The user asked to close (`detail: { open, reason }`); cancelable: `preventDefault()` keeps it open
 * @fires minerva-after-open - The dialog is open and focus moved in
 * @fires minerva-after-close - The dialog finished closing (after its exit animation)
 */
export class MinervaConfirmDialog extends MinervaElement {
  static override tagName = "minerva-confirm-dialog";
  static override dependencies = [MinervaButton];
  static override styles = [
    hostStyles,
    popoverResetStyles,
    css`
      :host {
        display: contents;
      }
      .content .body {
        flex: 1 1 auto;
      }
    `,
    sharedStyles(styles),
  ];

  /** Whether the dialog is open */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** Title (or use the `header` slot); names the dialog */
  @property()
  label = "";

  /** Explanation below the title (the dialog's accessible description) */
  @property()
  description = "";

  /** Confirm button label (default: localized "Confirm", or "Delete" with `color="danger"`) */
  @property({ attribute: "confirm-label" })
  confirmLabel?: string;

  /** Cancel button label (default: localized "Cancel") */
  @property({ attribute: "cancel-label" })
  cancelLabel?: string;

  /** Accessible label of the close (×) button (default: localized "Close") */
  @property({ attribute: "close-label" })
  closeLabel?: string;

  /** Semantic color of the confirm button; `danger` marks a destructive action */
  @property({ reflect: true })
  color: ConfirmColor = "primary";

  /** Shows a spinner on the confirm button and disables Cancel */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /** Natively disables the confirm button */
  @property({ type: Boolean, reflect: true, attribute: "confirm-disabled" })
  confirmDisabled = false;

  /**
   * Called when Confirm is pressed (after a non-cancelled `minerva-confirm`).
   * A returned promise shows the loading state until it settles; the dialog
   * closes when it resolves and stays open when it rejects.
   */
  @property({ attribute: false })
  onConfirm?: () => unknown;

  /** An `onConfirm` promise is pending */
  @state()
  private busy = false;

  @query(".content")
  private panel?: HTMLElement;

  @query(".overlay")
  private overlay?: HTMLElement;

  private readonly locale = new LocaleController(this);
  private readonly aria = new AriaController(this);
  private readonly slots = new HasSlotController(this);
  private readonly presence = new PresenceController(this, () => this.panel);
  private readonly modal = new ModalController(this);
  private readonly focusScope = new FocusScopeController(this, () => ({
    trapped: true,
    loop: true,
    restoreFocus: true,
  }));
  private readonly layer = new DismissableLayerController(this, () => ({
    disableOutsidePointerEvents: true,
    // Focus is trapped: never dismiss on focus outside (`focusin` is not
    // cancelable, so preventDefault() would not stop the dismissal).
    onFocusOutside: () => false,
    onEscapeKeyDown: () => {
      this.reason = "escape";
    },
    onPointerDownOutside: () => {
      this.reason = "outside";
    },
    onDismiss: () => this.requestClose(this.reason),
  }));
  private reason: ConfirmCancelReason = "outside";
  private wasPresent = false;

  /** Opens the dialog */
  show(): void {
    this.open = true;
  }

  /** Closes the dialog (no event) */
  hide(): void {
    this.open = false;
  }

  /** Asks to close; listeners can cancel `minerva-open-change`. */
  private requestClose(reason: ConfirmCloseReason): boolean {
    if (!this.open) return false;
    const allowed = this.emit(
      "minerva-open-change",
      { open: false, reason },
      { cancelable: true },
    );
    if (!allowed) return false;
    this.open = false;
    if (reason !== "confirm") this.emit("minerva-cancel", { reason });
    return true;
  }

  private async handleConfirm() {
    if (!this.open || this.loading || this.busy || this.confirmDisabled) return;
    if (!this.emit("minerva-confirm", undefined, { cancelable: true })) return;
    const result = this.onConfirm?.();
    if (result && typeof (result as PromiseLike<unknown>).then === "function") {
      this.busy = true;
      try {
        await result;
      } catch {
        return;
      } finally {
        this.busy = false;
      }
    }
    this.requestClose("confirm");
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has("open")) this.presence.sync(this.open);
  }

  protected override hookStates() {
    return {
      state: this.open ? "open" : "closed",
      color: this.color,
      loading: this.loading || this.busy,
    };
  }

  protected override updated(changed: PropertyValues<this>): void {
    const present = this.open || this.presence.present;
    if (changed.has("open")) {
      const panel = this.panel;
      if (this.open && panel) {
        if (
          DEV &&
          !this.label &&
          !this.slots.test("header") &&
          !this.aria.label
        ) {
          devWarn(
            MinervaConfirmDialog.tagName,
            "set `label` (or the `header` slot / aria-label) to give the alertdialog an accessible name.",
          );
        }
        showTopLayer(this.overlay);
        showTopLayer(panel);
        this.modal.activate(this);
        this.layer.activate(panel);
        void this.focusInitial(panel);
      } else if (!this.open) {
        this.focusScope.deactivate();
        this.layer.deactivate();
        this.modal.deactivate();
      }
    }
    if (this.wasPresent && !present) this.afterClose();
    this.wasPresent = present;
  }

  /**
   * Moves focus in once the buttons rendered their native `<button>`, so the
   * focus scope starts on Cancel (the least destructive action).
   */
  private async focusInitial(panel: HTMLElement) {
    const buttons = Array.from(
      panel.querySelectorAll<MinervaButton>("minerva-button"),
    );
    await Promise.all(buttons.map((button) => button.updateComplete));
    if (!this.open || this.panel !== panel) return;
    this.focusScope.activate(panel);
    this.emit("minerva-after-open");
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    hideTopLayer(this.panel);
    hideTopLayer(this.overlay);
  }

  private afterClose() {
    hideTopLayer(this.panel);
    hideTopLayer(this.overlay);
    this.emit("minerva-after-close");
  }

  protected override render() {
    const present = this.open || this.presence.present;
    if (!present) return nothing;
    const state = this.open ? "open" : "closed";
    const t = this.locale.t;
    const hasHeader = !!this.label || this.slots.test("header");
    const description = this.description || this.aria.description;
    const loading = this.loading || this.busy;
    return html`<div
        part="overlay"
        class="overlay"
        popover="manual"
        data-state=${state}
        aria-hidden="true"
      ></div>
      <div
        part="content"
        class="content small"
        popover="manual"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby=${hasHeader ? "title" : nothing}
        aria-label=${!hasHeader ? (this.aria.label ?? nothing) : nothing}
        aria-describedby=${description ? "description" : nothing}
        tabindex="-1"
        data-state=${state}
      >
        ${
          description
            ? html`<p id="description" class="description" part="description">
                ${description}
              </p>`
            : nothing
        }
        ${
          hasHeader
            ? html`<div id="title" class="header" part="header">
                <slot name="header">${this.label}</slot>
              </div>`
            : nothing
        }
        <div class="body" part="body">
          ${this.slots.test("[default]") ? html`<slot></slot>` : nothing}
        </div>
        <div class="footer" part="footer">
          <minerva-button
            part="cancel-button"
            type="button"
            color="neutral"
            variant="outline"
            ?disabled=${loading}
            @click=${() => this.requestClose("cancel-button")}
            >${this.cancelLabel ?? t("confirm.cancel")}</minerva-button
          >
          <minerva-button
            part="confirm-button"
            type="button"
            color=${this.color}
            variant="solid"
            ?loading=${loading}
            ?disabled=${this.confirmDisabled}
            @click=${() => void this.handleConfirm()}
            >${
              this.confirmLabel ??
              (this.color === "danger"
                ? t("confirm.delete")
                : t("confirm.confirm"))
            }</minerva-button
          >
        </div>
        <button
          type="button"
          class="close"
          part="close-button"
          aria-label=${this.closeLabel ?? t("modal.close")}
          @click=${() => this.requestClose("close-button")}
        >
          ${IconX}
        </button>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-confirm-dialog": MinervaConfirmDialog;
  }
}
