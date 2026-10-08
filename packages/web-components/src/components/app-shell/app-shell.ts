import { css, html, nothing, type PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { contains } from "@minerva/dom";
import styles from "@react-styles/components/AppShell/appShell.module.scss?inline";
import iconButtonStyles from "@react-styles/components/IconButton/iconButton.module.scss?inline";
import { DismissableLayerController } from "../../controllers/dismissable-layer";
import { popoverResetStyles } from "../../controllers/floating-layer";
import { FocusScopeController } from "../../controllers/focus-scope";
import { ModalController } from "../../controllers/modal";
import { DEV, devWarn } from "../../internal/dev";
import { hideTopLayer, showTopLayer } from "../../internal/dom";
import {
  IconPanelLeftClose,
  IconPanelLeftOpen,
  IconPin,
  IconPinOff,
  IconX,
} from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { HasSlotController } from "../../internal/slots";
import { sharedStyles } from "../../internal/styles";

/**
 * Desktop sidebar mode: `expanded` (full width), `compact` (icon rail) or
 * `floating` (rail that overlays content while hovered / keyboard-focused)
 */
export type AppShellSidebarMode = "expanded" | "compact" | "floating";

const MODES: readonly AppShellSidebarMode[] = [
  "expanded",
  "compact",
  "floating",
];
const MOBILE_QUERY = "(max-width: 768px)";

const mobileQuery = (): MediaQueryList | null =>
  typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia(MOBILE_QUERY)
    : null;

/** the React library's IconButton classes of the shell controls (small, square, neutral ghost) */
const CONTROL_CLASSES = {
  iconButton: true,
  neutral: true,
  "variant-ghost": true,
  small: true,
  square: true,
  control: true,
};

/**
 * Application chrome (`<AppShell>` of React): a desktop sidebar
 * (expanded, compact rail or floating rail), a sticky header and a single
 * `main` landmark. At 768px and below the navigation moves into a modal
 * drawer opened from the header (focus trapped, Escape / overlay click close
 * it, focus returns to the header button). A "Skip to content" link (first
 * focusable element, visible on focus) moves focus to `main`.
 *
 * Differences from React: `navigation` is the `navigation` slot instead of
 * a render function. The slot is rendered in exactly one place (the sidebar
 * on desktop, the open drawer on mobile); the state the render function
 * received is exposed as the `collapsed` / `mobile` attributes (style the
 * navigation with `minerva-app-shell[collapsed] ...`) and the
 * `closeNavigation()` / `expandNavigation()` methods. Control names are
 * overridden with the `*-label` attributes.
 *
 * @summary Application layout with collapsible sidebar, header and mobile drawer.
 * @tag minerva-app-shell
 * @slot - Page content, inside the `main` landmark
 * @slot navigation - Navigation (sidebar on desktop, drawer on mobile)
 * @slot brand - Brand (alternative to the `brand` attribute)
 * @slot brand-icon - Decorative brand icon, still visible in the compact rail
 * @slot header-actions - Content of the header bar (account menu, search...)
 * @slot page-navigation - Rendered between the header and `main` (e.g. page tabs)
 * @csspart root - The shell (`state`: whether the mobile navigation drawer is open)
 * @csspart skip-link - The skip to content link
 * @csspart sidebar - The desktop sidebar (<aside>)
 * @csspart header - The header bar
 * @csspart main - The <main> landmark
 * @csspart overlay - The backdrop of the mobile drawer
 * @csspart content - The mobile navigation drawer (role=dialog)
 * @csspart close-button - The close button of the mobile drawer
 * @fires minerva-sidebar-mode-change - The user changed the sidebar mode (`detail: { mode }`); cancelable: `preventDefault()` keeps the current mode
 * @fires minerva-open-change - The mobile drawer opened / closed (`detail: { open }`); cancelable when the user asked for it
 */
export class MinervaAppShell extends MinervaElement {
  static override tagName = "minerva-app-shell";
  static override styles = [
    hostStyles,
    popoverResetStyles,
    css`
      :host {
        display: block;
      }
    `,
    sharedStyles(iconButtonStyles),
    sharedStyles(styles),
  ];

  /** Brand text shown at the top of the sidebar (or use the `brand` slot) */
  @property()
  brand = "";

  /** Sidebar mode */
  @property({ attribute: "sidebar-mode", reflect: true })
  sidebarMode: AppShellSidebarMode = "expanded";

  /** Accessible name of the sidebar landmark and title of the mobile drawer (default: localized "Navigation") */
  @property({ attribute: "navigation-label" })
  navigationLabel?: string;

  /** Change it when a route commits to dismiss the mobile navigation */
  @property({ attribute: "navigation-key" })
  navigationKey?: string;

  /** Text of the "Skip to content" link (default: localized) */
  @property({ attribute: "skip-link" })
  skipLink?: string;

  /** Removes the skip link */
  @property({ type: Boolean, attribute: "no-skip-link" })
  noSkipLink = false;

  /** Name of the toggle that expands the sidebar */
  @property({ attribute: "expand-label" })
  expandLabel?: string;

  /** Name of the toggle that collapses the sidebar */
  @property({ attribute: "collapse-label" })
  collapseLabel?: string;

  /** Name of the pin toggle when floating mode is off */
  @property({ attribute: "enable-floating-label" })
  enableFloatingLabel?: string;

  /** Name of the pin toggle when floating mode is on */
  @property({ attribute: "disable-floating-label" })
  disableFloatingLabel?: string;

  /** Name of the header button that opens the mobile navigation */
  @property({ attribute: "open-navigation-label" })
  openNavigationLabel?: string;

  /** Name of the close button of the mobile navigation */
  @property({ attribute: "close-navigation-label" })
  closeNavigationLabel?: string;

  /** Read-only: the desktop sidebar currently shows the compact rail */
  @property({ type: Boolean, reflect: true })
  collapsed = false;

  /** Read-only: the mobile layout is active (viewport <= 768px) */
  @property({ type: Boolean, reflect: true })
  mobile = false;

  /** Whether the mobile navigation drawer is open */
  @state()
  private drawerOpen = false;

  @state()
  private hovered = false;

  @state()
  private keyboardFocus = false;

  @query(".header button")
  private headerToggle?: HTMLButtonElement;

  @query(".drawer")
  private drawer?: HTMLElement;

  @query(".overlay")
  private overlay?: HTMLElement;

  @query("main")
  private main?: HTMLElement;

  @query("aside")
  private sidebar?: HTMLElement;

  private readonly locale = new LocaleController(this);
  private readonly slots = new HasSlotController(this);
  private readonly modal = new ModalController(this);
  private readonly focusScope = new FocusScopeController(this, () => ({
    trapped: true,
    loop: true,
    restoreFocus: false,
  }));
  private readonly layer = new DismissableLayerController(this, () => ({
    disableOutsidePointerEvents: true,
    branches: () => [this.headerToggle],
    onFocusOutside: (event) => event.preventDefault(),
    onDismiss: () => this.requestDrawer(false),
  }));
  private query: MediaQueryList | null = null;
  private drawerActive = false;

  private readonly handleMediaChange = () => this.syncMobile();

  /** Opens the mobile navigation drawer (mobile layout only) */
  openNavigation(): void {
    if (this.mobile) this.drawerOpen = true;
  }

  /** Closes the mobile navigation drawer (call it when an item is selected) */
  closeNavigation(): void {
    this.drawerOpen = false;
  }

  /** Switches the sidebar to `expanded` (e.g. when a compact group is opened) */
  expandNavigation(): void {
    this.sidebarMode = "expanded";
  }

  /** Moves focus to the `main` landmark */
  focusMain(): void {
    this.main?.focus();
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.query = mobileQuery();
    this.query?.addEventListener("change", this.handleMediaChange);
    this.syncMobile();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.query?.removeEventListener("change", this.handleMediaChange);
    this.query = null;
    this.deactivateDrawer();
  }

  private syncMobile() {
    const mobile = !!this.query?.matches;
    if (mobile === this.mobile) return;
    // A breakpoint change dismisses the drawer and the floating state
    this.mobile = mobile;
    this.hovered = false;
    this.keyboardFocus = false;
    this.drawerOpen = false;
  }

  private get mode(): AppShellSidebarMode {
    return MODES.includes(this.sidebarMode) ? this.sidebarMode : "expanded";
  }

  private setMode(mode: AppShellSidebarMode) {
    if (mode === this.mode) return;
    if (
      this.emit("minerva-sidebar-mode-change", { mode }, { cancelable: true })
    ) {
      this.sidebarMode = mode;
    }
  }

  private requestDrawer(open: boolean) {
    if (open === this.drawerOpen) return;
    if (this.emit("minerva-open-change", { open }, { cancelable: true })) {
      this.drawerOpen = open;
    }
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    // A committed route dismisses the temporary navigation
    if (
      changed.has("navigationKey") &&
      changed.get("navigationKey") !== undefined
    ) {
      this.drawerOpen = false;
    }
    if (!this.mobile) this.drawerOpen = false;
    this.collapsed =
      !this.mobile &&
      this.mode !== "expanded" &&
      !(this.mode === "floating" && (this.hovered || this.keyboardFocus));
  }

  protected override updated(changed: PropertyValues<this>): void {
    const open = this.mobile && this.drawerOpen;
    if (open && !this.drawerActive && this.drawer) {
      this.drawerActive = true;
      showTopLayer(this.overlay);
      showTopLayer(this.drawer);
      this.modal.activate(this);
      this.layer.activate(this.drawer);
      this.focusScope.activate(this.drawer);
    } else if (!open && this.drawerActive) {
      this.deactivateDrawer();
      // Focus returns to the header button (also when leaving the mobile
      // layout: the same button then toggles the desktop sidebar)
      this.headerToggle?.focus();
    }
    if (
      DEV &&
      changed.has("sidebarMode") &&
      !MODES.includes(this.sidebarMode)
    ) {
      devWarn(
        MinervaAppShell.tagName,
        `unknown sidebar-mode="${this.sidebarMode}" (expected ${MODES.join(", ")}); using "expanded".`,
      );
    }
    if (DEV && !this.slots.test("navigation")) {
      devWarn(
        MinervaAppShell.tagName,
        'put the navigation in the "navigation" slot (e.g. <nav slot="navigation">).',
      );
    }
  }

  protected override hookStates() {
    return { state: this.mobile && this.drawerOpen ? "open" : "closed" };
  }

  private deactivateDrawer() {
    if (!this.drawerActive) return;
    this.drawerActive = false;
    this.focusScope.deactivate();
    this.layer.deactivate();
    this.modal.deactivate();
    hideTopLayer(this.drawer);
    hideTopLayer(this.overlay);
  }

  private label(override: string | undefined, key: string): string {
    return override ?? this.locale.t(`appShell.${key}`);
  }

  private handleSkip(event: MouseEvent) {
    // Focus main directly: no hash change (routers) and focus really lands
    // there (tabindex="-1")
    event.preventDefault();
    this.focusMain();
  }

  private handleSidebarFocusIn(event: FocusEvent) {
    const target = event.composedPath()[0] as Element | undefined;
    let visible: boolean;
    try {
      visible = !!target?.matches?.(":focus-visible");
    } catch {
      visible = false;
    }
    if (visible) this.keyboardFocus = true;
  }

  private handleSidebarFocusOut(event: FocusEvent) {
    const next = event.relatedTarget as Node | null;
    if (!next || !this.sidebar || !contains(this.sidebar, next)) {
      this.keyboardFocus = false;
    }
  }

  private renderHeaderToggle() {
    if (this.mobile) {
      return html`<button
        type="button"
        class=${classMap(CONTROL_CLASSES)}
        aria-label=${this.label(this.openNavigationLabel, "openNavigation")}
        aria-haspopup="dialog"
        aria-expanded=${String(this.drawerOpen)}
        aria-controls=${this.drawerOpen ? "drawer" : nothing}
        @click=${() => this.requestDrawer(!this.drawerOpen)}
      >
        ${IconPanelLeftOpen}
      </button>`;
    }
    return this.renderCollapseControl();
  }

  private renderCollapseControl() {
    const compact = this.mode !== "expanded";
    return html`<button
      type="button"
      class=${classMap(CONTROL_CLASSES)}
      aria-label=${
        compact
          ? this.label(this.expandLabel, "expand")
          : this.label(this.collapseLabel, "collapse")
      }
      aria-controls="sidebar"
      aria-expanded=${String(!this.collapsed)}
      @click=${() => this.setMode(compact ? "expanded" : "compact")}
    >
      ${compact ? IconPanelLeftOpen : IconPanelLeftClose}
    </button>`;
  }

  private renderSidebar() {
    const floating = this.mode === "floating";
    const navigationLabel = this.label(this.navigationLabel, "navigation");
    return html`<aside
      id="sidebar"
      class="sidebar"
      part="sidebar"
      aria-label=${navigationLabel}
      @mouseenter=${() => (this.hovered = true)}
      @mouseleave=${() => (this.hovered = false)}
      @focusin=${this.handleSidebarFocusIn}
      @focusout=${this.handleSidebarFocusOut}
      @keydown=${(event: KeyboardEvent) => {
        if (event.key === "Tab") this.keyboardFocus = true;
      }}
      @pointerdown=${() => (this.keyboardFocus = false)}
    >
      <div class="brand">
        ${
          this.slots.test("brand-icon")
            ? html`<span class="brandIcon" aria-hidden="true"
                ><slot name="brand-icon"></slot
              ></span>`
            : nothing
        }
        <span class="brandLabel"><slot name="brand">${this.brand}</slot></span>
      </div>
      <div class="navigation"><slot name="navigation"></slot></div>
      <div class="sidebarActions">
        ${this.renderCollapseControl()}
        <button
          type="button"
          class=${classMap(CONTROL_CLASSES)}
          aria-pressed=${String(floating)}
          aria-label=${
            floating
              ? this.label(this.disableFloatingLabel, "disableFloating")
              : this.label(this.enableFloatingLabel, "enableFloating")
          }
          @click=${() => this.setMode(floating ? "compact" : "floating")}
        >
          ${floating ? IconPinOff : IconPin}
        </button>
      </div>
    </aside>`;
  }

  private renderDrawer() {
    const navigationLabel = this.label(this.navigationLabel, "navigation");
    return html`<div
        class="overlay"
        part="overlay"
        popover="manual"
        aria-hidden="true"
      ></div>
      <div
        id="drawer"
        class="drawer"
        part="content"
        popover="manual"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        tabindex="-1"
      >
        <h2 id="drawer-title" class="drawerHeader">${navigationLabel}</h2>
        <div class="drawerBody"><slot name="navigation"></slot></div>
        <button
          type="button"
          class="drawerClose"
          part="close-button"
          aria-label=${this.label(this.closeNavigationLabel, "closeNavigation")}
          @click=${() => this.requestDrawer(false)}
        >
          ${IconX}
        </button>
      </div>`;
  }

  protected override render() {
    const skipText = this.skipLink || this.locale.t("appShell.skipToContent");
    return html`<div
        class="shell"
        part="root"
        data-sidebar-mode=${this.mode}
        data-sidebar-expanded=${this.collapsed ? nothing : "true"}
      >
        ${
          this.noSkipLink
            ? nothing
            : html`<a
                class="skipLink"
                part="skip-link"
                href="#main"
                @click=${this.handleSkip}
                >${skipText}</a
              >`
        }
        ${this.mobile ? nothing : this.renderSidebar()}
        <div class="workspace">
          <header class="header" part="header">
            ${this.renderHeaderToggle()}
            <div class="headerActions">
              <slot name="header-actions"></slot>
            </div>
          </header>
          <slot name="page-navigation"></slot>
          <main id="main" class="content" part="main" tabindex="-1">
            <slot></slot>
          </main>
        </div>
      </div>
      ${this.mobile && this.drawerOpen ? this.renderDrawer() : nothing}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-app-shell": MinervaAppShell;
  }
}
