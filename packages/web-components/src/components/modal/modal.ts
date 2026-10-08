import { css, html, nothing, type PropertyValues } from "lit";
import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "@react-styles/components/Modal/modal.module.scss?inline";
import { DismissableLayerController } from "../../controllers/dismissable-layer";
import { popoverResetStyles } from "../../controllers/floating-layer";
import { FocusScopeController } from "../../controllers/focus-scope";
import { ModalController } from "../../controllers/modal";
import { AriaController } from "../../internal/aria";
import { hideTopLayer, showTopLayer } from "../../internal/dom";
import { IconX } from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { PresenceController } from "../../internal/presence";
import { HasSlotController } from "../../internal/slots";
import { sharedStyles } from "../../internal/styles";

export type ModalSize = "small" | "medium" | "large" | "xlarge" | "full";

/** Why the modal asked to close (`minerva-open-change` detail) */
export type ModalCloseReason =
  "close-button" | "escape" | "outside" | "trigger" | "method";

/**
 * Modal dialog (`<Modal>` of React): centered panel (bottom sheet on
 * narrow screens) over an overlay. Focus moves in and is trapped (Tab
 * loops), Escape (topmost layer only) and an overlay click close it, page
 * scroll is locked, the rest of the page is hidden from assistive
 * technologies, and focus returns to the opener on close. The behaviour
 * (focus scope, dismissable layer stack, scroll lock, hide-others) comes
 * from Minerva's core package and is shared with the React components.
 *
 * The panel is shown in the top layer (Popover API) but stays in the DOM
 * where the element is, so it inherits the theme of its scope.
 *
 * @summary Modal dialog with focus trap, Escape / overlay dismissal and focus return.
 * @tag minerva-modal
 * @slot - Body content
 * @slot header - Title (alternative to the `label` attribute)
 * @slot footer - Actions row
 * @slot trigger - Element that opens the modal when clicked
 * @csspart overlay - The backdrop
 * @csspart content - The dialog panel (`role="dialog"`)
 * @csspart header - The title (accessible name of the dialog)
 * @csspart description - The description
 * @csspart body - The scrollable body
 * @csspart footer - The actions row
 * @csspart close-button - The close (×) button
 * @fires minerva-open-change - The user asked to open / close (`detail: { open, reason }`); cancelable: `preventDefault()` keeps the current state
 * @fires minerva-after-open - The modal is open and focus moved in
 * @fires minerva-after-close - The modal finished closing (after its exit animation)
 */
export class MinervaModal extends MinervaElement {
  static override tagName = "minerva-modal";
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

  /** Whether the modal is open */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** Title text (or use the `header` slot); names the dialog */
  @property()
  label = "";

  /** Description below the title (aria-describedby) */
  @property()
  description = "";

  /** Width preset */
  @property({ reflect: true })
  size: ModalSize = "medium";

  /** Hides the close (×) button */
  @property({ type: Boolean, attribute: "hide-close-button" })
  hideCloseButton = false;

  /** Accessible label of the close button (default: localized "Close") */
  @property({ attribute: "close-label" })
  closeLabel?: string;

  /** ARIA role of the panel; "alertdialog" for interrupting confirmations */
  @property({ attribute: "dialog-role" })
  dialogRole: "dialog" | "alertdialog" = "dialog";

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
    branches: () => [this.triggerElement()],
    onFocusOutside: (event) => event.preventDefault(),
    onEscapeKeyDown: () => this.lastReason("escape"),
    onPointerDownOutside: () => this.lastReason("outside"),
    onDismiss: () => this.requestOpenChange(false, this.reason),
  }));
  private reason: ModalCloseReason = "outside";
  /** Rendered at the previous update (detects the end of the exit) */
  private wasPresent = false;

  private lastReason(reason: ModalCloseReason) {
    this.reason = reason;
  }

  /** Opens the modal */
  show(): void {
    this.open = true;
  }

  /** Closes the modal */
  hide(): void {
    this.open = false;
  }

  private triggerElement(): Element | null {
    return this.querySelector(":scope > [slot='trigger']");
  }

  /** Asks to change `open`; listeners can cancel `minerva-open-change`. */
  private requestOpenChange(open: boolean, reason: ModalCloseReason) {
    if (open === this.open) return;
    const allowed = this.emit(
      "minerva-open-change",
      { open, reason },
      { cancelable: true },
    );
    if (allowed) this.open = open;
  }

  /** Clicks on the `trigger` slot content toggle the modal. */
  private readonly handleClick = (event: MouseEvent) => {
    const trigger = this.triggerElement();
    if (event.defaultPrevented || !trigger) return;
    if (!event.composedPath().includes(trigger)) return;
    this.requestOpenChange(!this.open, "trigger");
  };

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("click", this.handleClick);
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has("open")) this.presence.sync(this.open);
  }

  protected override hookStates() {
    return { state: this.open ? "open" : "closed", size: this.size };
  }

  protected override updated(changed: PropertyValues<this>): void {
    const present = this.open || this.presence.present;
    if (changed.has("open")) {
      const panel = this.panel;
      if (this.open && panel) {
        showTopLayer(this.overlay);
        showTopLayer(panel);
        this.modal.activate(this);
        this.layer.activate(panel);
        this.focusScope.activate(panel);
        this.emit("minerva-after-open");
      } else if (!this.open) {
        this.focusScope.deactivate();
        this.layer.deactivate();
        this.modal.deactivate();
      }
    }
    if (this.wasPresent && !present) this.afterClose();
    this.wasPresent = present;
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("click", this.handleClick);
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
    const state = this.open ? "open" : "closed";
    const hasHeader = !!this.label || this.slots.test("header");
    const description = this.description || this.aria.description;
    return html`<slot name="trigger"></slot> ${
        present
          ? html`<div
                part="overlay"
                class="overlay"
                popover="manual"
                data-state=${state}
                aria-hidden="true"
              ></div>
              <div
                part="content"
                class=${classMap({ content: true, [this.size]: true })}
                popover="manual"
                role=${this.dialogRole}
                aria-modal="true"
                aria-labelledby=${hasHeader ? "title" : nothing}
                aria-label=${!hasHeader ? (this.aria.label ?? nothing) : nothing}
                aria-describedby=${description ? "description" : nothing}
                tabindex="-1"
                data-state=${state}
              >
                ${
                  description
                    ? html`<p
                        id="description"
                        class="description"
                        part="description"
                      >
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
                <div class="body" part="body"><slot></slot></div>
                ${
                  this.slots.test("footer")
                    ? html`<div class="footer" part="footer">
                        <slot name="footer"></slot>
                      </div>`
                    : nothing
                }
                ${
                  this.hideCloseButton
                    ? nothing
                    : html`<button
                        type="button"
                        class="close"
                        part="close-button"
                        aria-label=${this.closeLabel ?? this.locale.t("modal.close")}
                        @click=${() => this.requestOpenChange(false, "close-button")}
                      >
                        ${IconX}
                      </button>`
                }
              </div>`
          : nothing
      }`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-modal": MinervaModal;
  }
}
