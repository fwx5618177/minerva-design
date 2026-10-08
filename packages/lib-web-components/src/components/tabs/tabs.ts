import { css, html, nothing, type PropertyValues } from "lit";
import { setHostAria } from "../../internal/aria";
import { attachInternals } from "../../internal/form";
import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import type { ColorScheme } from "@minerva/core";
import styles from "@lib-core-styles/components/Tabs/tabs.module.scss?inline";
import { RovingFocusController } from "../../controllers/roving-focus";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import { getDirection } from "../../internal/dom";
import {
  isHostDeferred,
  onHostSettled,
  setHostAttribute,
} from "../../internal/hydration";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { sharedStyles } from "../../internal/styles";

/**
 * Visual style: `line` (underline indicator), `enclosed` (browser-like
 * tabs), `soft` (segmented control) or `pills` (separated rounded tabs)
 */
export type TabsVariant = "line" | "enclosed" | "soft" | "pills";

/** Layout / keyboard direction of the tab list */
export type TabsOrientation = "horizontal" | "vertical";

/** When a focused tab becomes selected */
export type TabsActivationMode = "automatic" | "manual";

let nextId = 0;

/** The `<minerva-tabs>` owning `el` (not an outer / nested group). */
const ownerOf = (el: Element): MinervaTabs | null =>
  el.parentElement?.closest<MinervaTabs>("minerva-tabs") ?? null;

/**
 * Accessible tabs (WAI-ARIA tabs pattern, `<Tabs>` / `<TabList>` of
 * lib-core) with line / enclosed / soft / pills variants, semantic colors
 * and horizontal or vertical orientation.
 *
 * Tabs (`<minerva-tab>`) and panels (`<minerva-tab-panel>`) are light DOM
 * children paired by `value`; the element renders the `role="tablist"`
 * around the tabs (they go to the `tab` slot automatically) and wires
 * `aria-selected` / `aria-controls` / `aria-labelledby` with ids in the
 * light DOM. Arrow keys (per orientation and direction), Home and End move
 * focus among the enabled tabs (core roving focus); with
 * `activation-mode="automatic"` the focused tab is selected, with
 * `"manual"` only Enter / Space / click select.
 *
 * @summary Tabs with a tablist, roving focus and automatic or manual activation.
 * @tag minerva-tabs
 * @slot - `<minerva-tab-panel>` elements
 * @slot tab - `<minerva-tab>` elements (assigned automatically)
 * @csspart root - The root wrapper of the tab list and the panels
 * @csspart list - The role=tablist container of the tabs
 * @fires minerva-change - The user selected a tab (`detail: { value }`); cancelable: `preventDefault()` keeps the current selection (controlled pattern)
 */
export class MinervaTabs extends MinervaElement {
  static override tagName = "minerva-tabs";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        min-width: 0;
      }
    `,
    sharedStyles(styles),
  ];

  /** Value of the selected tab */
  @property({ reflect: true })
  value?: string;

  /** Visual style */
  @property({ reflect: true })
  variant: TabsVariant = "line";

  /** Color of the selection */
  @property({ reflect: true })
  color: ColorScheme = "primary";

  /** Layout and arrow-key direction */
  @property({ reflect: true })
  orientation: TabsOrientation = "horizontal";

  /**
   * `automatic` selects a tab when it receives focus; `manual` only on
   * Enter / Space / click
   */
  @property({ reflect: true, attribute: "activation-mode" })
  activationMode: TabsActivationMode = "automatic";

  /** Stops arrow keys at the first / last tab instead of wrapping */
  @property({ type: Boolean, reflect: true, attribute: "no-loop" })
  noLoop = false;

  /**
   * Accessible name of the tab list (`aria-label` / `aria-labelledby` on the
   * element work too)
   */
  @property()
  label = "";

  @query('[role="tablist"]')
  private tablist!: HTMLElement;

  private readonly aria = new AriaController(this);
  private readonly baseId = `minerva-tabs-${++nextId}`;
  private rovingKey = "";
  private observer: MutationObserver | null = null;
  /** An update is queued for when server-rendered items settle */
  private settleQueued = false;

  private readonly roving = new RovingFocusController(this, () => ({
    getItems: () => this.tabs,
    orientation: this.orientation,
    dir: getDirection(this),
    loop: !this.noLoop,
  }));

  /** The `<minerva-tab>` elements of this group (not of nested groups). */
  get tabs(): MinervaTab[] {
    return Array.from(this.querySelectorAll<MinervaTab>("minerva-tab")).filter(
      (tab) => ownerOf(tab) === this,
    );
  }

  /** The `<minerva-tab-panel>` elements of this group. */
  get panels(): MinervaTabPanel[] {
    return Array.from(
      this.querySelectorAll<MinervaTabPanel>("minerva-tab-panel"),
    ).filter((panel) => ownerOf(panel) === this);
  }

  /** Called by a tab (click / Enter / Space / focus): selects `value`. */
  select(value: string): void {
    if (value === this.value) return;
    if (!this.emit("minerva-change", { value }, { cancelable: true })) {
      // controlled: the parent keeps (or later sets) the selection
      return;
    }
    this.value = value;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (typeof MutationObserver !== "undefined") {
      this.observer = new MutationObserver(() => this.sync());
      this.observer.observe(this, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["value", "disabled"],
      });
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.observer?.disconnect();
    this.observer = null;
    this.rovingKey = "";
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (
      changed.has("value") &&
      DEV &&
      this.value !== undefined &&
      this.tabs.length > 0 &&
      !this.tabs.some((tab) => tab.value === this.value)
    ) {
      devWarn(
        MinervaTabs.tagName,
        `value "${this.value}" does not match any <minerva-tab>.`,
      );
    }
    this.sync();
  }

  /** Re-creates the roving focus when its options changed. */
  private ensureRoving() {
    if (!this.tablist) return;
    const key = `${this.orientation}|${getDirection(this)}|${this.noLoop}`;
    if (key !== this.rovingKey) {
      this.rovingKey = key;
      this.roving.detach();
      this.roving.attach(this.tablist);
    }
  }

  /**
   * Pushes selection, ids and styles to the tabs and panels. Server-rendered
   * markup gets its host attributes (ids, `tabindex`...) once hydrated.
   */
  private sync() {
    if (!this.tablist) return;
    const tabs = this.tabs;
    const panels = this.panels;
    const ids = new Map<Element, string>();
    for (const tab of tabs) {
      ids.set(tab, tab.id || `${this.baseId}-tab-${tab.value}`);
      if (!tab.id) setHostAttribute(tab, "id", ids.get(tab)!, this);
    }
    for (const panel of panels) {
      ids.set(panel, panel.id || `${this.baseId}-panel-${panel.value}`);
      if (!panel.id) setHostAttribute(panel, "id", ids.get(panel)!, this);
    }
    for (const tab of tabs) {
      const panel = panels.find((p) => p.value === tab.value);
      tab.sync(this, tab.value === this.value, panel && ids.get(panel));
    }
    for (const panel of panels) {
      const tab = tabs.find((t) => t.value === panel.value);
      panel.sync(this, panel.value === this.value, tab && ids.get(tab));
    }
    // roving tabindex: once every item may get host attributes
    const waiting = [this, ...tabs, ...panels].find(isHostDeferred);
    if (waiting) {
      if (!this.settleQueued) {
        this.settleQueued = true;
        onHostSettled(waiting, () => {
          this.settleQueued = false;
          this.requestUpdate();
        });
      }
      return;
    }
    this.ensureRoving();
    // tab stop: the selected tab, else the first enabled one
    const selected = tabs.find(
      (tab) => tab.value === this.value && !tab.disabled,
    );
    const stop = selected ?? tabs.find((tab) => !tab.disabled);
    if (stop) this.roving.setActive(stop, { focus: false });
    else this.roving.refresh();
  }

  protected override hookStates() {
    return {
      orientation: this.orientation,
      variant: this.variant,
      color: this.color,
    };
  }

  /** Re-checks the direction before core's roving focus handles a key. */
  private handleKeyDownCapture = () => this.ensureRoving();

  /** Automatic activation: focusing a tab selects it. */
  private handleFocusIn = (event: FocusEvent) => {
    if (this.activationMode !== "automatic") return;
    const tab = this.tabs.find((t) => t === event.target);
    if (tab && !tab.disabled) this.select(tab.value);
  };

  protected override render() {
    return html`<div
      part="root"
      class=${classMap({
        tabs: true,
        [this.color]: true,
        vertical: this.orientation === "vertical",
      })}
      data-orientation=${this.orientation}
      @keydown=${{ handleEvent: this.handleKeyDownCapture, capture: true }}
    >
      <div
        part="list"
        role="tablist"
        aria-label=${this.label || this.aria.label || nothing}
        aria-orientation=${this.orientation}
        data-orientation=${this.orientation}
        class=${classMap({
          list: true,
          [`${this.variant}List`]: true,
          verticalList: this.orientation === "vertical",
        })}
        @focusin=${this.handleFocusIn}
      >
        <slot name="tab" @slotchange=${() => this.sync()}></slot>
      </div>
      <slot @slotchange=${() => this.sync()}></slot>
    </div>`;
  }
}

/**
 * A tab of a `<minerva-tabs>` (`<Tab>` of lib-core). The element itself is
 * the `role="tab"` (focusable, `aria-selected`, `aria-controls` pointing at
 * the panel with the same `value`).
 *
 * @summary A `role="tab"` trigger of `<minerva-tabs>`.
 * @tag minerva-tab
 * @slot - Tab content
 * @csspart root - The visual tab trigger
 */
export class MinervaTab extends MinervaElement {
  private readonly internals = attachInternals(this);
  private readonly ownedAria = new Set<string>();
  static override tagName = "minerva-tab";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline-flex;
        flex: 0 0 auto;
        min-width: 0;
        max-width: 100%;
        outline: none;
      }
      :host([disabled]) {
        pointer-events: none;
      }
      .trigger {
        width: 100%;
      }
      .verticalTrigger {
        justify-content: flex-start;
      }
      :host(:focus-visible) .trigger {
        outline: var(--focus-ring-width) solid var(--tabs-accent);
        outline-offset: -2px;
      }
      :host([disabled]) .trigger {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `,
    sharedStyles(styles),
  ];

  /** Value identifying the tab and its panel (must not contain whitespace) */
  @property({ reflect: true })
  value = "";

  /** Disables the tab (skipped by arrow keys) */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Overrides the group color (the tab stays tinted while inactive) */
  @property({ reflect: true })
  color?: ColorScheme;

  /** Whether the tab is the selected one (set by `<minerva-tabs>`) */
  @property({ type: Boolean, reflect: true })
  selected = false;

  private group: MinervaTabs | null = null;

  /** @internal Called by the owning `<minerva-tabs>`. */
  sync(group: MinervaTabs, selected: boolean, panelId?: string): void {
    this.group = group;
    this.selected = selected;
    setHostAttribute(this, "aria-controls", panelId ?? null);
    this.requestUpdate();
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (!this.hasAttribute("slot")) setHostAttribute(this, "slot", "tab");
    setHostAria(this, this.internals, { role: "tab" }, this.ownedAria);
    this.addEventListener("mousedown", this.handleMouseDown);
    this.addEventListener("keydown", this.handleKeyDown);
    this.addEventListener("click", this.handleClick);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("mousedown", this.handleMouseDown);
    this.removeEventListener("keydown", this.handleKeyDown);
    this.removeEventListener("click", this.handleClick);
    this.group = null;
  }

  private select() {
    (this.group ?? ownerOf(this))?.select(this.value);
  }

  private handleMouseDown = (event: MouseEvent) => {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    if (event.button === 0 && !event.ctrlKey) this.select();
    // keep focus where it is on ctrl-click / other buttons (context menus)
    else event.preventDefault();
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.defaultPrevented) return;
    if (this.disabled || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    this.select();
  };

  // Assistive technologies may activate with a bare click (no mouse down).
  private handleClick = (event: MouseEvent) => {
    if (!this.disabled && event.detail === 0) this.select();
  };

  protected override updated(): void {
    setHostAria(
      this,
      this.internals,
      {
        ariaSelected: String(this.selected),
        ariaDisabled: this.disabled ? "true" : null,
      },
      this.ownedAria,
    );
    setHostAttribute(this, "data-state", this.selected ? "active" : "inactive");
    setHostAttribute(this, "data-disabled", this.disabled);
    const orientation = this.group?.orientation ?? "horizontal";
    setHostAttribute(this, "data-orientation", orientation);
  }

  protected override hookStates() {
    return {
      state: this.selected ? "active" : "inactive",
      disabled: this.disabled,
      orientation: this.group?.orientation ?? "horizontal",
      variant: this.group?.variant ?? "line",
      color: this.color,
    };
  }

  protected override render() {
    const group = this.group;
    const variant = group?.variant ?? "line";
    const vertical = group?.orientation === "vertical";
    return html`<span
      part="root"
      class=${classMap({
        trigger: true,
        [`${variant}Trigger`]: true,
        verticalTrigger: vertical,
        [this.color ?? ""]: !!this.color,
        colored: !!this.color,
      })}
      data-state=${this.selected ? "active" : "inactive"}
      data-orientation=${group?.orientation ?? "horizontal"}
      ><slot></slot
    ></span>`;
  }
}

/**
 * The `role="tabpanel"` content of the tab with the same `value`
 * (`<TabPanel>` of lib-core).
 *
 * Inactive panels: React's `<TabPanel>` unmounts them by default and keeps
 * them in the DOM with `hidden` only with `forceMount`. Light DOM children
 * belong to the page, so a custom element cannot unmount them: regular
 * children behave like React's `forceMount` (the panel is `hidden`, its
 * content stays in the DOM, keeps its state and its form fields are still
 * submitted). For React's default semantics, put the content in a
 * `<template>` child: it is stamped while the panel is active and removed
 * when it becomes inactive (state reset, elements disconnected, nothing
 * submitted); add `force-mount` to keep it mounted (hidden) while inactive,
 * like `forceMount`.
 *
 * @summary A `role="tabpanel"` of `<minerva-tabs>`.
 * @tag minerva-tab-panel
 * @slot - Panel content (or a `<template>` stamped only while active)
 * @csspart root - The panel wrapper
 */
export class MinervaTabPanel extends MinervaElement {
  private readonly internals = attachInternals(this);
  static override tagName = "minerva-tab-panel";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        flex: 1;
        min-width: 0;
        outline: none;
      }
      :host(:focus-visible) .panel {
        outline: var(--focus-ring-width) solid var(--primary-color);
        outline-offset: var(--focus-ring-offset);
      }
    `,
    sharedStyles(styles),
  ];

  /** Value of the tab this panel belongs to */
  @property({ reflect: true })
  value = "";

  /**
   * Mounts the content of a `<template>` child even while the panel is
   * inactive (hidden), like React's `forceMount`. Regular children are
   * always mounted
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: "force-mount" })
  forceMount = false;

  private orientation: TabsOrientation = "horizontal";
  private selected = false;
  /** Nodes stamped from the `<template>` child */
  private stamped: Node[] = [];

  /** The `<template>` child holding lazily mounted content, if any. */
  private get template(): HTMLTemplateElement | null {
    return (
      Array.from(this.children).find(
        (child): child is HTMLTemplateElement =>
          child instanceof HTMLTemplateElement,
      ) ?? null
    );
  }

  /** Mounts / unmounts the `<template>` content (React's unmounting). */
  private syncContent() {
    // server-rendered markup: no extra light DOM child before hydration
    if (isHostDeferred(this)) return;
    const template = this.template;
    if (this.selected || this.forceMount) {
      if (template && !this.stamped.length) {
        const content = this.ownerDocument.importNode(template.content, true);
        this.stamped = Array.from(content.childNodes);
        template.after(content);
      }
      return;
    }
    for (const node of this.stamped) node.parentNode?.removeChild(node);
    this.stamped = [];
  }

  /** @internal Called by the owning `<minerva-tabs>`. */
  sync(group: MinervaTabs, selected: boolean, tabId?: string): void {
    this.orientation = group.orientation;
    this.selected = selected;
    setHostAttribute(this, "hidden", !selected);
    this.syncContent();
    setHostAttribute(this, "data-state", selected ? "active" : "inactive");
    setHostAttribute(this, "data-orientation", group.orientation);
    setHostAttribute(this, "aria-labelledby", tabId ?? null);
    this.requestUpdate();
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has("forceMount") && this.hasUpdated) this.syncContent();
  }

  override connectedCallback(): void {
    super.connectedCallback();
    setHostAria(this, this.internals, { role: "tabpanel" });
    if (!this.hasAttribute("tabindex")) setHostAttribute(this, "tabindex", "0");
  }

  protected override hookStates() {
    return {
      state: this.selected ? "active" : "inactive",
      orientation: this.orientation,
    };
  }

  protected override render() {
    // until `hidden` may be set on the host (hydration), an inactive panel
    // hides its content
    return html`<div
      part="root"
      class="panel"
      data-orientation=${this.orientation}
      ?hidden=${!this.selected && isHostDeferred(this) && !!ownerOf(this)}
    >
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-tabs": MinervaTabs;
    "minerva-tab": MinervaTab;
    "minerva-tab-panel": MinervaTabPanel;
  }
}
