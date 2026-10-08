import { css, html, nothing, type PropertyValues } from "lit";
import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "@lib-core-styles/components/Drawer/drawer.module.scss?inline";
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
import { sharedStyles } from "../../internal/styles";

/** Edge of the viewport the drawer slides in from */
export type DrawerSide = "left" | "right" | "top" | "bottom";

/** Size preset: width for left / right drawers, height for top / bottom ones */
export type DrawerSize = "small" | "medium" | "large" | "full";

/** Why the drawer asked to open / close (`minerva-open-change` detail) */
export type DrawerChangeReason =
  "close-button" | "escape" | "outside" | "trigger" | "close-slot";

const SIDES: readonly DrawerSide[] = ["left", "right", "top", "bottom"];

/**
 * Side panel (`<Drawer>` of lib-core) sliding in from an edge of the
 * viewport over an overlay. Same behaviour as `<minerva-modal>` (WAI-ARIA
 * dialog): focus moves in and is trapped (Tab loops), Escape (topmost layer
 * only) and an overlay click close it, page scroll is locked, the rest of the
 * page is hidden from assistive technologies and focus returns to the opener.
 * `non-modal` drawers keep the page interactive and close on outside
 * interaction instead.
 *
 * The panel is shown in the top layer (Popover API) but stays in the DOM
 * where the element is, so it inherits the theme of its scope. Without a
 * `description`, a visually hidden localized description ("Drawer content")
 * describes the dialog, like lib-core.
 *
 * Any light DOM element with `data-drawer-close` closes the drawer when
 * clicked (lib-core's `DrawerClose`).
 *
 * @summary Side panel dialog with focus trap, Escape / overlay dismissal and focus return.
 * @tag minerva-drawer
 * @slot - Body content
 * @slot header - Title (alternative to the `label` attribute)
 * @slot footer - Actions row
 * @slot trigger - Element that opens the drawer when clicked
 * @csspart overlay - The backdrop
 * @csspart content - The dialog panel (`role="dialog"`)
 * @csspart header - The title (accessible name of the dialog)
 * @csspart description - The description below the title (visually hidden when no description is given)
 * @csspart body - The scrollable body
 * @csspart footer - The actions row
 * @csspart close-button - The close (×) button
 * @fires minerva-open-change - The user asked to open / close (`detail: { open, reason }`); cancelable: `preventDefault()` keeps the current state
 * @fires minerva-after-open - The drawer is open and focus moved in
 * @fires minerva-after-close - The drawer finished closing (after its exit animation)
 */
export class MinervaDrawer extends MinervaElement {
  static override tagName = "minerva-drawer";
  static override styles = [
    hostStyles,
    popoverResetStyles,
    css`
      :host {
        display: contents;
      }
    `,
    sharedStyles(styles),
  ];

  /** Whether the drawer is open */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** Title text (or use the `header` slot); names the dialog */
  @property()
  label = "";

  /** Visible description below the title (accessible description) */
  @property()
  description = "";

  /**
   * Text of the visually hidden description used when `description` is not
   * set (default: localized "Drawer content")
   */
  @property({ attribute: "hidden-description" })
  hiddenDescription?: string;

  /** Edge the panel slides in from */
  @property({ reflect: true })
  side: DrawerSide = "right";

  /** Size preset (width of left / right drawers, height of top / bottom ones) */
  @property({ reflect: true })
  size: DrawerSize = "medium";

  /** Hides the close (×) button */
  @property({ type: Boolean, attribute: "hide-close-button" })
  hideCloseButton = false;

  /** Accessible label of the close button (default: localized "Close") */
  @property({ attribute: "close-label" })
  closeLabel?: string;

  /** ARIA role of the panel */
  @property({ attribute: "dialog-role" })
  dialogRole: "dialog" | "alertdialog" = "dialog";

  /**
   * Non-modal drawer: no overlay, no focus trap, no scroll lock; closes on
   * outside pointer down / focus (lib-core `DrawerRoot modal={false}`)
   */
  @property({ type: Boolean, reflect: true, attribute: "non-modal" })
  nonModal = false;

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
    trapped: !this.nonModal,
    loop: true,
    restoreFocus: true,
  }));
  private readonly layer = new DismissableLayerController(this, () => ({
    disableOutsidePointerEvents: !this.nonModal,
    branches: () => [this.triggerElement()],
    // Focus is trapped while modal: never dismiss on focus outside
    // (`focusin` is not cancelable, so return false).
    onFocusOutside: () => this.nonModal,
    onEscapeKeyDown: () => {
      this.reason = "escape";
    },
    onPointerDownOutside: () => {
      this.reason = "outside";
    },
    onDismiss: () => this.requestOpenChange(false, this.reason),
  }));
  private reason: DrawerChangeReason = "outside";
  private wasPresent = false;

  /** Opens the drawer */
  show(): void {
    this.open = true;
  }

  /** Closes the drawer */
  hide(): void {
    this.open = false;
  }

  private triggerElement(): Element | null {
    return this.querySelector(":scope > [slot='trigger']");
  }

  private requestOpenChange(open: boolean, reason: DrawerChangeReason) {
    if (open === this.open) return;
    const allowed = this.emit(
      "minerva-open-change",
      { open, reason },
      { cancelable: true },
    );
    if (allowed) this.open = open;
  }

  private readonly handleClick = (event: MouseEvent) => {
    if (event.defaultPrevented) return;
    const path = event.composedPath();
    const trigger = this.triggerElement();
    if (trigger && path.includes(trigger)) {
      this.requestOpenChange(!this.open, "trigger");
      return;
    }
    const closer = path.find(
      (node): node is Element =>
        node instanceof Element && node.hasAttribute("data-drawer-close"),
    );
    if (closer && this.contains(closer)) {
      this.requestOpenChange(false, "close-slot");
    }
  };

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("click", this.handleClick);
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has("open")) this.presence.sync(this.open);
    if (DEV && changed.has("side") && !SIDES.includes(this.side)) {
      devWarn(
        MinervaDrawer.tagName,
        `invalid side "${this.side}" (expected left, right, top or bottom).`,
      );
    }
  }

  protected override hookStates() {
    return {
      state: this.open ? "open" : "closed",
      side: SIDES.includes(this.side) ? this.side : "right",
      size: this.size,
    };
  }

  protected override updated(changed: PropertyValues<this>): void {
    const present = this.open || this.presence.present;
    if (changed.has("open") || (changed.has("nonModal") && this.open)) {
      const panel = this.panel;
      if (this.open && panel) {
        if (changed.has("nonModal") && !changed.has("open")) {
          // modality changed while open: rebuild the layers
          this.focusScope.deactivate();
          this.layer.deactivate();
          this.modal.deactivate();
        }
        showTopLayer(this.overlay);
        showTopLayer(panel);
        if (!this.nonModal) this.modal.activate(this);
        this.layer.activate(panel);
        this.focusScope.activate(panel);
        if (changed.has("open")) this.emit("minerva-after-open");
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
    const visibleDescription = this.description || this.aria.description;
    const side = SIDES.includes(this.side) ? this.side : "right";
    return html`<slot name="trigger"></slot> ${
        present
          ? html`${
                this.nonModal
                  ? nothing
                  : html`<div
                      part="overlay"
                      class="overlay"
                      popover="manual"
                      data-state=${state}
                      aria-hidden="true"
                    ></div>`
              }
              <div
                part="content"
                class=${classMap({
                  content: true,
                  [side]: true,
                  [this.size]: true,
                })}
                popover="manual"
                role=${this.dialogRole}
                aria-modal=${this.nonModal ? nothing : "true"}
                aria-labelledby=${hasHeader ? "title" : nothing}
                aria-label=${!hasHeader ? (this.aria.label ?? nothing) : nothing}
                aria-describedby="description"
                tabindex="-1"
                data-state=${state}
              >
                <p
                  id="description"
                  part="description"
                  class=${visibleDescription ? "description" : "visuallyHidden"}
                >
                  ${
                    visibleDescription ||
                    this.hiddenDescription ||
                    this.locale.t("drawer.description")
                  }
                </p>
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
                        aria-label=${this.closeLabel ?? this.locale.t("drawer.close")}
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
    "minerva-drawer": MinervaDrawer;
  }
}
