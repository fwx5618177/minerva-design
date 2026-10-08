import {
  css,
  html,
  nothing,
  type PropertyValues,
  type ReactiveControllerHost,
  type TemplateResult,
} from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { repeat } from "lit/directives/repeat.js";
import styles from "@react-styles/components/Menu/menu.module.scss?inline";
import {
  contains,
  createPointerGrace,
  createTypeahead,
  focusElement,
  getActiveElement,
  getExitAnimationDuration,
  getLayerStack,
  getNextIndex,
  getTabbables,
  parsePlacement,
  type AnchorElement,
  type GraceSide,
  type Placement,
  type PointerGrace,
  type Typeahead,
  waitForExitAnimation,
} from "@minerva/core";
import { AnchoredPositionController } from "../../controllers/anchored-position";
import { DismissableLayerController } from "../../controllers/dismissable-layer";
import { popoverResetStyles } from "../../controllers/floating-layer";
import { FocusScopeController } from "../../controllers/focus-scope";
import { ModalController } from "../../controllers/modal";
import { DEV, devWarn } from "../../internal/dev";
import { getDirection, hideTopLayer, showTopLayer } from "../../internal/dom";
import { IconCheck, IconChevronRight } from "../../internal/icons";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { itemParts } from "../../internal/styling-hooks";
import {
  affectsEntries,
  readEntries,
  type MenuAction,
  type MenuCheckboxEntry,
  type MenuContent,
  type MenuEntry,
  type MenuRadioGroupEntry,
  type MenuRadioItem,
} from "./menu-items";
import { sharedStyles } from "../../internal/styles";

/** Where focus goes when a menu panel opens */
export type FocusIntent = "first" | "last" | "content" | "none";

/** Density of the menu items */
export type MenuSize = "small" | "medium";

/** Why the menu asked to open / close (`minerva-open-change` detail) */
export type MenuChangeReason =
  | "trigger"
  | "keyboard"
  | "contextmenu"
  | "escape"
  | "outside"
  | "focus-outside"
  | "select"
  | "tab";

/** Delay before a hovered submenu trigger opens its submenu (ms) */
export const SUBMENU_OPEN_DELAY = 100;

const ITEM_SELECTOR = "[data-minerva-menu-item]";
const SUB_OFFSET = { mainAxis: 4, crossAxis: -5 };

const isDisabledItem = (item: HTMLElement) =>
  item.hasAttribute("data-disabled");
const itemText = (item: HTMLElement) =>
  item.dataset.textValue ??
  item.querySelector(".text")?.textContent ??
  item.textContent ??
  "";
const getItems = (panel: HTMLElement | null | undefined): HTMLElement[] =>
  panel ? Array.from(panel.querySelectorAll<HTMLElement>(ITEM_SELECTOR)) : [];
const focusNoScroll = (el: HTMLElement | null | undefined) =>
  focusElement(el, { preventScroll: true });

/** Plain text of a label (typeahead) when it is a string. */
const plainText = (label: MenuContent | undefined): string | undefined =>
  typeof label === "string" ? label : undefined;

/** Key of a rendered panel: the submenu trigger uids leading to it. */
const panelKey = (path: readonly string[]) => path.join("/");

/** A closed panel kept rendered (`data-state="closed"`) while it animates out. */
interface ExitingPanel {
  id: number;
  depth: number;
  path: string[];
}

let exitIds = 0;

/** Runtime state of one open panel (root menu or a submenu). */
class PanelLevel {
  readonly position: AnchoredPositionController;
  readonly layer: DismissableLayerController;
  readonly scope: FocusScopeController;
  readonly grace: PointerGrace = createPointerGrace();
  readonly typeahead: Typeahead = createTypeahead();
  lastTypeahead = 0;
  openTimer: ReturnType<typeof setTimeout> | undefined;
  element: HTMLElement | null = null;
  /** Submenu trigger uid ("" for the root) */
  uid: string | null = null;
  /** Submenu trigger uids leading to this panel (`[]` for the root) */
  path: string[] = [];

  constructor(host: ReactiveControllerHost, menu: MenuBase, depth: number) {
    this.position = new AnchoredPositionController(host, () =>
      depth === 0
        ? {
            placement: menu.rootPlacement(),
            offset: menu.rootOffset(),
            padding: 8,
          }
        : {
            placement: menu.direction === "rtl" ? "left-start" : "right-start",
            offset: SUB_OFFSET,
            padding: 8,
          },
    );
    this.layer = new DismissableLayerController(host, () =>
      depth === 0 ? menu.rootLayerOptions() : menu.subLayerOptions(depth),
    );
    this.scope = new FocusScopeController(host, () => ({
      trapped: depth === 0 && menu.isModal,
      autoFocus: false,
      restoreFocus: false,
    }));
  }

  clearTimer() {
    clearTimeout(this.openTimer);
    this.openTimer = undefined;
  }
}

/**
 * Shared behaviour of `<minerva-menu>` and `<minerva-context-menu>`
 * (the React library's `MenuRoot` / `MenuPanel`): renders the entries in anchored
 * panels (`role="menu"`, top layer), keyboard navigation (arrows, Home /
 * End, typeahead, Enter / Space), submenus (keyboard, hover with delay and
 * pointer grace), checkbox / radio items, Escape closing only the topmost
 * (sub)menu, Tab closing the menu, modal mode and focus restoration.
 */
export abstract class MenuBase extends MinervaElement {
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

  /** Entries of the menu (alternative to the declarative child elements) */
  @property({ attribute: false })
  items: MenuEntry[] = [];

  /** Whether the menu is open */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** Density of the items */
  @property({ reflect: true })
  size: MenuSize = "medium";

  /** Selecting an action keeps the menu open (React `closeOnSelect={false}`) */
  @property({ type: Boolean, attribute: "keep-open" })
  keepOpen = false;

  /** Disables the menu */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Non-modal menu: the page stays interactive, focus is not trapped, scroll
   * is not locked (React `modal={false}`)
   */
  @property({ type: Boolean, reflect: true, attribute: "non-modal" })
  nonModal = false;

  /** Arrow keys stop at the first / last item instead of wrapping */
  @property({ type: Boolean, attribute: "no-loop" })
  noLoop = false;

  /** Declarative entries read from the child elements */
  @state()
  private declarative: MenuEntry[] = [];

  /** Uids of the submenu triggers whose submenu is open, by depth */
  @state()
  private openPath: string[] = [];

  /**
   * Closed panels still rendered with `data-state="closed"` until their CSS
   * exit animation ends (the React library's presence: `usePresence`)
   */
  @state()
  private exiting: ExitingPanel[] = [];

  /** Uncontrolled checkbox / radio state of `items`, by entry key */
  private stored = new Map<string, unknown>();
  private readonly levels: PanelLevel[] = [];
  private readonly modalController = new ModalController(this);
  private observer: MutationObserver | null = null;
  /** Focus target for the root panel when it opens */
  protected intent: FocusIntent = "content";
  private subIntent: FocusIntent = "none";
  /** Focus target on close: `undefined` = default, `null` = leave focus */
  protected restoreOverride: HTMLElement | null | undefined = undefined;
  private reason: MenuChangeReason = "outside";
  /** Reading direction captured when the menu opens */
  direction: "ltr" | "rtl" = "ltr";

  /* ---------------------------------------------------------------- hooks */

  /** Anchor of the root panel. */
  protected abstract anchorElement(): AnchorElement | null;
  /** Placement of the root panel. */
  abstract rootPlacement(): Placement;
  /** Offset of the root panel. */
  abstract rootOffset(): { mainAxis: number; crossAxis: number };
  /** Default focus target when the menu closes. */
  protected abstract restoreTarget(): HTMLElement | null;
  /** Elements that are part of the root layer (the trigger). */
  protected abstract branches(): Array<Element | null | undefined>;
  /** Accessible name of the root panel. */
  protected abstract rootLabel(): string | undefined;
  /** Root panel: pointer down outside (cancelable). */
  protected onRootPointerDownOutside(event: PointerEvent): void {
    void event;
  }
  /** Called after the open state changed (trigger attributes...). */
  protected abstract syncTrigger(): void;

  get isModal(): boolean {
    return !this.nonModal;
  }

  /** Effective entries: `items` when set, else the child elements */
  get entries(): MenuEntry[] {
    return this.items.length ? this.items : this.declarative;
  }

  /** Opens the menu */
  show(): void {
    this.open = true;
  }

  /** Closes the menu (and its submenus) */
  hide(): void {
    this.open = false;
  }

  /* ---------------------------------------------------------- open state */

  /** Asks to change `open`; listeners can cancel `minerva-open-change`. */
  protected requestOpenChange(
    open: boolean,
    reason: MenuChangeReason,
  ): boolean {
    if (open === this.open) return true;
    const allowed = this.emit(
      "minerva-open-change",
      { open, reason },
      { cancelable: true },
    );
    if (allowed) {
      this.open = open;
      if (!open) this.closeLevels();
    }
    return allowed;
  }

  protected openWith(intent: FocusIntent, reason: MenuChangeReason): void {
    this.intent = intent;
    this.requestOpenChange(true, reason);
  }

  /** Closes the whole menu (focus returns to the restore target). */
  private closeAll(reason: MenuChangeReason) {
    this.requestOpenChange(false, reason);
  }

  /** Closes the menu and moves focus on as Tab would from the trigger. */
  private closeWithTab(backwards: boolean) {
    const from = this.restoreTarget();
    let next: HTMLElement | null | undefined;
    if (from) {
      const rootLayer = getLayerStack().find(
        (layer) => layer.element === this.levels[0]?.element,
      );
      const container = rootLayer?.parent ?? document.body;
      const all = getTabbables(container).filter(
        (el) => el === from || !contains(this, el) || !this.isPanelNode(el),
      );
      const index = all.indexOf(from);
      next =
        index === -1 ? from : (all[backwards ? index - 1 : index + 1] ?? from);
    }
    this.restoreOverride = next ?? undefined;
    if (this.requestOpenChange(false, "tab")) focusNoScroll(next);
  }

  /** Whether `el` lives in one of the menu panels. */
  private isPanelNode(el: Element): boolean {
    return this.levels.some((level) => contains(level.element, el));
  }

  /* -------------------------------------------------------------- levels */

  private level(depth: number): PanelLevel {
    this.levels[depth] ??= new PanelLevel(this, this, depth);
    return this.levels[depth];
  }

  /** The submenu trigger item of the panel at `depth` (>= 1). */
  private parentItem(depth: number): HTMLElement | null {
    const uid = this.openPath[depth - 1];
    return uid
      ? (this.renderRoot.querySelector<HTMLElement>(`[data-uid="${uid}"]`) ??
          null)
      : null;
  }

  rootLayerOptions() {
    return {
      disableOutsidePointerEvents: this.isModal,
      branches: () => this.branches(),
      onEscapeKeyDown: () => {
        this.reason = "escape";
      },
      onPointerDownOutside: (event: PointerEvent) => {
        this.reason = "outside";
        this.onRootPointerDownOutside(event);
        // Like a native menu: a non-modal menu (or a right click) leaves
        // focus where the outside interaction put it.
        if (!event.defaultPrevented && (!this.isModal || event.button === 2)) {
          this.restoreOverride = null;
        }
      },
      onFocusOutside: (event: FocusEvent) => {
        this.reason = "focus-outside";
        // Focus is trapped while modal: never dismiss on focus outside
        // (`focusin` is not cancelable: return false).
        if (this.isModal) {
          event.preventDefault();
          return false;
        }
        return true;
      },
      onDismiss: () => this.closeAll(this.reason),
    };
  }

  subLayerOptions(depth: number) {
    return {
      // Explicit parent: inside a modal, the closest containing layer would
      // be the modal, not the parent menu panel.
      parent: this.levels[depth - 1]?.element ?? undefined,
      branches: () => [this.parentItem(depth)],
      // Escape closes the submenu only; focus goes back to its trigger.
      onEscapeKeyDown: () => {
        focusNoScroll(this.parentItem(depth));
      },
      onDismiss: () => this.closeSubmenu(depth),
    };
  }

  /**
   * Stops the panels from `depth` on (deepest first). With `animate`, a
   * panel whose CSS declares an exit animation for `data-state="closed"`
   * stays rendered (frozen in place, no longer interactive as a layer) until
   * the animation ends, like the React library's presence; reduced motion
   * (`animation: none`) or no animation removes it right away.
   */
  private closeLevels(from = 0, animate = true) {
    for (let depth = this.levels.length - 1; depth >= from; depth--) {
      const level = this.levels[depth];
      const element = level.element;
      if (!element) continue;
      level.clearTimer();
      level.grace.clear();
      level.typeahead.reset();
      level.scope.deactivate();
      level.layer.deactivate();
      level.position.end();
      if (animate && this.isConnected) this.exit(element, depth, level.path);
      else hideTopLayer(element);
      level.element = null;
      level.uid = null;
      if (depth === 0) {
        this.modalController.deactivate();
        this.scheduleRestore();
      }
    }
  }

  /** Keeps `element` rendered while its exit animation runs. */
  private exit(element: HTMLElement, depth: number, path: string[]) {
    element.setAttribute("data-state", "closed");
    if (getExitAnimationDuration(element) <= 0) {
      hideTopLayer(element);
      return;
    }
    const id = ++exitIds;
    const key = panelKey(path);
    this.exiting = [
      ...this.exiting.filter((panel) => panelKey(panel.path) !== key),
      { id, depth, path },
    ];
    void waitForExitAnimation(element).then(() => {
      if (!this.exiting.some((panel) => panel.id === id)) return;
      hideTopLayer(element);
      this.exiting = this.exiting.filter((panel) => panel.id !== id);
    });
  }

  /** Drops the exiting panels (disconnect): removed without animation. */
  private clearExiting() {
    if (this.exiting.length === 0) return;
    for (const panel of this.exiting) {
      hideTopLayer(
        this.renderRoot.querySelector<HTMLElement>(
          `[data-panel-key="${panelKey(panel.path)}"]`,
        ),
      );
    }
    this.exiting = [];
  }

  private scheduleRestore() {
    const override = this.restoreOverride;
    this.restoreOverride = undefined;
    const target = override === undefined ? this.restoreTarget() : override;
    if (!target) return;
    setTimeout(() => {
      if (this.open || !target.isConnected) return;
      const focused = getActiveElement(document);
      const lost =
        !focused ||
        focused === document.body ||
        !focused.isConnected ||
        (this.shadowRoot?.contains(focused) ?? false);
      if (lost) focusNoScroll(target);
    }, 0);
  }

  /** Opens / anchors / closes the panels to match `open` + `openPath`. */
  private syncLevels() {
    const wanted = this.open && !this.disabled ? this.openPath.length + 1 : 0;
    this.closeLevels(wanted);
    for (let depth = 0; depth < wanted; depth++) {
      const uid = depth === 0 ? "" : this.openPath[depth - 1];
      const element = this.renderRoot.querySelector<HTMLElement>(
        `[data-panel-key="${panelKey(this.openPath.slice(0, depth))}"]`,
      );
      if (!element) return;
      const level = this.level(depth);
      if (level.element === element && level.uid === uid) continue;
      if (level.element) this.closeLevels(depth);
      const anchor =
        depth === 0 ? this.anchorElement() : this.parentItem(depth);
      if (!anchor) return;
      level.element = element;
      level.uid = uid;
      level.path = this.openPath.slice(0, depth);
      // reopened while animating out: the same element, open again
      element.setAttribute("data-state", "open");
      showTopLayer(element);
      level.position.start(anchor, element);
      if (depth === 0 && this.isModal) this.modalController.activate(this);
      level.layer.activate(element);
      level.scope.activate(element);
      const intent = depth === 0 ? this.intent : this.subIntent;
      if (depth === 0) this.intent = "content";
      else this.subIntent = "none";
      this.focusIntent(element, intent);
    }
  }

  private focusIntent(panel: HTMLElement, intent: FocusIntent) {
    if (intent === "none") return;
    const items = getItems(panel).filter((item) => !isDisabledItem(item));
    const target =
      intent === "first"
        ? items[0]
        : intent === "last"
          ? items[items.length - 1]
          : undefined;
    focusNoScroll(target ?? panel);
  }

  /** Repositions the root panel against a new anchor (context menu). */
  protected reanchor(): void {
    const level = this.levels[0];
    const anchor = this.anchorElement();
    if (level?.element && anchor) level.position.start(anchor, level.element);
  }

  /* ------------------------------------------------------------ submenus */

  private openSubmenu(depth: number, uid: string, intent: FocusIntent) {
    // `depth`: depth of the panel containing the trigger item
    if (this.openPath[depth] === uid && this.levels[depth + 1]?.element) {
      if (intent === "first") {
        focusNoScroll(
          getItems(this.levels[depth + 1].element).find(
            (item) => !isDisabledItem(item),
          ),
        );
      }
      return;
    }
    this.subIntent = intent;
    this.openPath = [...this.openPath.slice(0, depth), uid];
  }

  private closeSubmenu(depth: number) {
    if (this.openPath.length < depth) return;
    this.closeLevels(depth);
    this.openPath = this.openPath.slice(0, depth - 1);
  }

  /* ------------------------------------------------------- item handling */

  private stateOf<T>(key: string, fallback: T): T {
    return this.stored.has(key) ? (this.stored.get(key) as T) : fallback;
  }

  private isChecked(entry: MenuCheckboxEntry): boolean {
    if (entry.element) return entry.element.hasAttribute("checked");
    return this.stateOf(
      entry.key,
      entry.checked ?? entry.defaultChecked ?? false,
    );
  }

  private radioValue(group: MenuRadioGroupEntry): string | undefined {
    if (group.items.some((item) => item.element)) {
      return group.items.find((item) => item.element?.hasAttribute("checked"))
        ?.value;
    }
    return this.stateOf(group.key, group.value ?? group.defaultValue);
  }

  private activateAction(entry: MenuAction) {
    const allowed = this.emit(
      "minerva-select",
      { value: entry.key, item: entry },
      { cancelable: true },
    );
    if (allowed && (entry.closeOnSelect ?? !this.keepOpen)) {
      this.closeAll("select");
    }
  }

  private toggleCheckbox(entry: MenuCheckboxEntry) {
    const checked = !this.isChecked(entry);
    const allowed = this.emit(
      "minerva-change",
      { value: entry.key, checked, item: entry },
      { cancelable: true },
    );
    if (allowed) {
      if (entry.element) entry.element.toggleAttribute("checked", checked);
      else this.stored.set(entry.key, checked);
      this.requestUpdate();
    }
    if (entry.closeOnSelect) this.closeAll("select");
  }

  private chooseRadio(group: MenuRadioGroupEntry, item: MenuRadioItem) {
    const current = this.radioValue(group);
    if (item.value !== current) {
      const allowed = this.emit(
        "minerva-change",
        { value: item.value, group: group.key, item },
        { cancelable: true },
      );
      if (allowed) {
        if (item.element) {
          for (const option of group.items) {
            option.element?.toggleAttribute("checked", option === item);
          }
        } else this.stored.set(group.key, item.value);
        this.requestUpdate();
      }
    }
    if (group.closeOnSelect || item.closeOnSelect) this.closeAll("select");
  }

  /* -------------------------------------------------------------- events */

  private panelDepth(panel: HTMLElement): number {
    return Number(panel.dataset.level ?? 0);
  }

  private readonly onPanelKeyDown = (event: KeyboardEvent) => {
    const panel = event.currentTarget as HTMLElement;
    const depth = this.panelDepth(panel);
    const level = this.levels[depth];
    const { key } = event;
    // Tab (even when a focus trap handled it) closes the whole menu.
    if (key === "Tab") {
      event.preventDefault();
      this.closeWithTab(event.shiftKey);
      return;
    }
    if (event.defaultPrevented || !level) return;
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const items = getItems(panel);
    const target = event.composedPath()[0] as HTMLElement;
    const item = items.find((candidate) => candidate === target) ?? null;
    const currentIndex = item ? items.indexOf(item) : -1;
    const rtl = this.direction === "rtl";
    const openKey = rtl ? "ArrowLeft" : "ArrowRight";
    const closeKey = rtl ? "ArrowRight" : "ArrowLeft";

    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(key)) {
      event.preventDefault();
      level.typeahead.reset();
      const next = getNextIndex({
        currentIndex,
        count: items.length,
        key,
        orientation: "vertical",
        loop: !this.noLoop,
        isDisabled: (index) => isDisabledItem(items[index]),
      });
      if (next !== null) focusNoScroll(items[next]);
      return;
    }
    if (key === openKey && item?.hasAttribute("aria-haspopup")) {
      event.preventDefault();
      if (!isDisabledItem(item)) {
        this.openSubmenu(depth, item.dataset.uid ?? "", "first");
      }
      return;
    }
    if (key === closeKey && depth > 0) {
      event.preventDefault();
      focusNoScroll(this.parentItem(depth));
      this.closeSubmenu(depth);
      return;
    }
    if (key.length === 1) {
      const now = Date.now();
      if (now - level.lastTypeahead > 500) level.typeahead.reset();
      const typing = level.typeahead.getBuffer() !== "";
      if (key !== " " || typing) {
        level.lastTypeahead = now;
        event.preventDefault();
        const index = level.typeahead.search(
          key,
          items.map((el) => ({
            text: itemText(el),
            disabled: isDisabledItem(el),
          })),
          currentIndex,
        );
        if (index !== -1) focusNoScroll(items[index]);
        return;
      }
    }
    if ((key === "Enter" || key === " ") && item) {
      event.preventDefault();
      if (!isDisabledItem(item)) this.activateItem(item, "first");
    }
  };

  private readonly itemActions = new Map<
    string,
    (intent: FocusIntent) => void
  >();

  private activateItem(item: HTMLElement, intent: FocusIntent) {
    this.itemActions.get(item.dataset.uid ?? "")?.(intent);
  }

  /**
   * Uid of the focused item. Not reactive: focus moves update the item's
   * hooks directly (`data-highlighted`, `item--highlighted` part), and
   * renders compute the same values from it (no extra render per move).
   */
  private highlightedItem: string | null = null;

  private highlightItem(item: HTMLElement, highlighted: boolean) {
    if (highlighted) this.highlightedItem = item.dataset.uid ?? null;
    else if (this.highlightedItem === item.dataset.uid) {
      this.highlightedItem = null;
    }
    item.toggleAttribute("data-highlighted", highlighted);
    item.setAttribute(
      "part",
      itemParts("item", {
        state: item.dataset.state,
        highlighted,
        disabled: item.hasAttribute("data-disabled"),
        expanded: item.hasAttribute("data-expanded"),
      }),
    );
  }

  private readonly onPanelFocusIn = (event: FocusEvent) => {
    const target = event.composedPath()[0] as HTMLElement;
    if (target.matches?.(ITEM_SELECTOR)) this.highlightItem(target, true);
  };

  private readonly onPanelFocusOut = (event: FocusEvent) => {
    const target = event.composedPath()[0] as HTMLElement;
    if (target.matches?.(ITEM_SELECTOR)) this.highlightItem(target, false);
  };

  private onItemClick(event: MouseEvent) {
    const item = event.currentTarget as HTMLElement;
    if (isDisabledItem(item)) return;
    this.activateItem(item, "none");
  }

  private onItemPointerMove(event: PointerEvent) {
    const item = event.currentTarget as HTMLElement;
    const panel = item.closest<HTMLElement>("[data-level]");
    if (!panel) return;
    const depth = this.panelDepth(panel);
    const level = this.levels[depth];
    if (!level) return;
    if (
      event.pointerType === "touch" ||
      level.grace.isInGraceArea({ x: event.clientX, y: event.clientY })
    ) {
      return;
    }
    level.grace.clear();
    const active = getActiveElement(document);
    if (isDisabledItem(item)) {
      if (active !== panel) focusNoScroll(panel);
      return;
    }
    if (active !== item) focusNoScroll(item);
    const uid = item.dataset.uid ?? "";
    if (
      item.hasAttribute("aria-haspopup") &&
      this.openPath[depth] !== uid &&
      level.openTimer === undefined
    ) {
      level.openTimer = setTimeout(() => {
        level.openTimer = undefined;
        if (!this.open) return;
        this.openSubmenu(depth, uid, "none");
      }, SUBMENU_OPEN_DELAY);
    }
  }

  private onItemPointerLeave(event: PointerEvent) {
    if (event.pointerType === "touch") return;
    const item = event.currentTarget as HTMLElement;
    const panel = item.closest<HTMLElement>("[data-level]");
    if (!panel) return;
    const depth = this.panelDepth(panel);
    const level = this.levels[depth];
    if (!level) return;
    level.clearTimer();
    const sub = this.levels[depth + 1]?.element;
    if (
      item.hasAttribute("aria-haspopup") &&
      this.openPath[depth] === item.dataset.uid &&
      sub
    ) {
      // Heading towards the open submenu: keep it while in the safe triangle.
      const side = (sub.getAttribute("data-side") ?? "right") as GraceSide;
      level.grace.start(
        { x: event.clientX, y: event.clientY },
        sub.getBoundingClientRect(),
        side,
      );
      return;
    }
    if (level.grace.isInGraceArea({ x: event.clientX, y: event.clientY }))
      return;
    if (getActiveElement(document) === item) focusNoScroll(panel);
  }

  /* ------------------------------------------------------------ lifecycle */

  private readEntries() {
    this.declarative = readEntries(this);
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.readEntries();
    if (typeof MutationObserver !== "undefined") {
      this.observer = new MutationObserver((records) => {
        if (
          records.some(
            (record) =>
              affectsEntries(record.target) ||
              Array.from(record.addedNodes).some(affectsEntries) ||
              Array.from(record.removedNodes).some(
                (node) =>
                  node.nodeType === 1 &&
                  (node as Element).localName.startsWith("minerva-menu-"),
              ),
          )
        ) {
          this.readEntries();
        }
      });
      this.observer.observe(this, {
        subtree: true,
        childList: true,
        attributes: true,
        characterData: true,
      });
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.observer?.disconnect();
    this.observer = null;
    this.closeLevels(0, false);
    this.clearExiting();
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has("items")) {
      this.stored = new Map();
      if (DEV) this.checkKeys(this.items);
    }
    if (changed.has("open") && this.open) {
      const anchor = this.anchorElement();
      const from = anchor && "nodeType" in anchor ? (anchor as Element) : this;
      this.direction = this.isConnected ? getDirection(from) : "ltr";
    }
    if (changed.has("open") && !this.open) this.openPath = [];
    // Panels no longer wanted start closing before they leave the template,
    // so the ones with an exit animation stay rendered (presence).
    const wanted = this.open && !this.disabled ? this.openPath.length + 1 : 0;
    const stale = this.levels.findIndex(
      (level, depth) =>
        level.element !== null &&
        (depth >= wanted ||
          panelKey(level.path) !== panelKey(this.openPath.slice(0, depth))),
    );
    if (stale !== -1) this.closeLevels(stale);
    if (this.exiting.length) {
      const open = this.openKeys();
      if (this.exiting.some((panel) => open.has(panelKey(panel.path)))) {
        this.exiting = this.exiting.filter(
          (panel) => !open.has(panelKey(panel.path)),
        );
      }
    }
  }

  /** Keys of the panels that are open (root + open submenus). */
  private openKeys(): Set<string> {
    if (!this.open || this.disabled) return new Set();
    return new Set(
      [[], ...this.openPath.map((_, i) => this.openPath.slice(0, i + 1))].map(
        panelKey,
      ),
    );
  }

  private checkKeys(entries: MenuEntry[], seen = new Set<string>()) {
    for (const entry of entries) {
      if ("type" in entry && entry.type === "separator") continue;
      if (
        "type" in entry &&
        (entry.type === "group" || entry.type === "label")
      ) {
        if (entry.type === "group") this.checkKeys(entry.items, seen);
        continue;
      }
      if (seen.has(entry.key)) {
        devWarn(
          (this.constructor as typeof MinervaElement).tagName,
          `duplicate item key "${entry.key}": keys must be unique (checkbox / radio state and minerva-select values are keyed by it).`,
        );
      }
      seen.add(entry.key);
      if (!("type" in entry) && entry.children)
        this.checkKeys(entry.children, seen);
    }
  }

  protected override hookStates() {
    // The root panel's final placement (after flip) once positioned.
    const placement = this.levels[0]?.position.running
      ? this.levels[0].position.placement
      : this.rootPlacement();
    return {
      state: this.open && !this.disabled ? "open" : "closed",
      disabled: this.disabled,
      size: this.size,
      ...parsePlacement(placement),
      placement,
    };
  }

  protected override updated(changed: PropertyValues): void {
    this.syncTrigger();
    if (
      changed.has("open") ||
      changed.has("openPath") ||
      changed.has("disabled")
    ) {
      this.syncLevels();
    }
  }

  /* -------------------------------------------------------------- render */

  protected renderPanels(): unknown {
    const open = this.open && !this.disabled;
    if (!open && this.exiting.length === 0) return nothing;
    this.itemActions.clear();
    const panels: Array<{
      key: string;
      depth: number;
      path: string[];
      state: "open" | "closed";
    }> = [];
    if (open) {
      panels.push({ key: "", depth: 0, path: [], state: "open" });
      this.openPath.forEach((_, depth) => {
        const path = this.openPath.slice(0, depth + 1);
        panels.push({
          key: panelKey(path),
          depth: depth + 1,
          path,
          state: "open",
        });
      });
    }
    const keys = new Set(panels.map((panel) => panel.key));
    for (const panel of this.exiting) {
      const key = panelKey(panel.path);
      if (keys.has(key)) continue;
      keys.add(key);
      panels.push({
        key,
        depth: panel.depth,
        path: panel.path,
        state: "closed",
      });
    }
    return repeat(
      panels,
      (panel) => panel.key,
      (panel) => this.renderPanelAt(panel.depth, panel.path, panel.state),
    );
  }

  /** The panel reached through the submenu triggers `path` (null: gone). */
  private renderPanelAt(
    depth: number,
    path: string[],
    state: "open" | "closed",
  ): unknown {
    let entries = this.entries;
    let label = depth === 0 ? this.rootLabel() : undefined;
    for (const [index, uid] of path.entries()) {
      const found = this.findSubmenu(entries, uid, `${index}:`);
      if (!found) return nothing;
      entries = found.children ?? [];
      label = plainText(found.label) ?? found.textValue;
    }
    return this.renderPanel(
      depth,
      path.at(-1) ?? "",
      entries,
      label,
      state,
      panelKey(path),
    );
  }

  /** The submenu entry with `uid` among `entries` (groups included). */
  private findSubmenu(
    entries: MenuEntry[],
    uid: string,
    prefix: string,
  ): MenuAction | null {
    for (const [index, entry] of entries.entries()) {
      const id = `${prefix}${index}`;
      if ("type" in entry) {
        if (entry.type === "group") {
          const found = this.findSubmenu(entry.items, uid, `${id}.`);
          if (found) return found;
        }
        continue;
      }
      if (entry.children?.length && id === uid) return entry;
    }
    return null;
  }

  private renderPanel(
    depth: number,
    uid: string,
    entries: MenuEntry[],
    label: string | undefined,
    state: "open" | "closed",
    key: string,
  ): TemplateResult {
    const parentId = depth === 0 ? "" : `item-${uid}`;
    return html`<div
      part="content"
      id=${depth === 0 ? "menu" : `menu-${uid}`}
      class=${classMap({ content: true, small: this.size === "small" })}
      popover="manual"
      role="menu"
      aria-orientation="vertical"
      aria-label=${depth === 0 ? (label ?? nothing) : nothing}
      aria-labelledby=${depth > 0 ? parentId : nothing}
      tabindex="-1"
      dir=${this.direction}
      data-state=${state}
      data-level=${depth}
      data-panel-key=${key}
      @keydown=${this.onPanelKeyDown}
      @focusin=${this.onPanelFocusIn}
      @focusout=${this.onPanelFocusOut}
    >
      ${this.renderEntries(entries, depth, `${depth}:`)}
    </div>`;
  }

  private renderEntries(
    entries: MenuEntry[],
    depth: number,
    prefix: string,
  ): TemplateResult[] {
    return entries.map((entry, index) => {
      const id = `${prefix}${index}`;
      if ("type" in entry) {
        switch (entry.type) {
          case "separator":
            return html`<div
              role="separator"
              aria-orientation="horizontal"
              class="separator"
              part="separator"
            ></div>`;
          case "label":
            return html`<div class="label" part="label">${entry.label}</div>`;
          case "group": {
            const labelId = `label-${id.replace(/[:.]/g, "-")}`;
            return html`<div
              role="group"
              part="group"
              aria-labelledby=${labelId}
            >
              <div id=${labelId} class="label" part="label">${entry.label}</div>
              ${this.renderEntries(entry.items, depth, `${id}.`)}
            </div>`;
          }
          case "checkbox":
            return this.renderCheckbox(entry, id);
          case "radio-group":
            return this.renderRadioGroup(entry, id);
        }
      }
      return this.renderAction(entry, depth, id);
    });
  }

  private renderItem(options: {
    uid: string;
    role: "menuitem" | "menuitemcheckbox" | "menuitemradio";
    label: MenuContent;
    textValue?: string;
    icon?: MenuContent;
    shortcut?: string;
    disabled?: boolean;
    indicator?: TemplateResult;
    trailing?: TemplateResult;
    checked?: boolean;
    submenu?: { open: boolean };
    activate: (intent: FocusIntent) => void;
  }): TemplateResult {
    const { uid, disabled = false, submenu } = options;
    this.itemActions.set(uid, options.activate);
    const text = options.textValue ?? plainText(options.label);
    const states = {
      state:
        options.checked === undefined
          ? undefined
          : options.checked
            ? "checked"
            : "unchecked",
      highlighted: this.highlightedItem === uid,
      disabled,
      expanded: submenu?.open,
    };
    return html`<div
      id=${`item-${uid}`}
      part=${itemParts("item", states)}
      role=${options.role}
      tabindex="-1"
      class="item"
      data-minerva-menu-item=""
      data-uid=${uid}
      data-text-value=${text ?? nothing}
      data-state=${states.state ?? nothing}
      ?data-highlighted=${states.highlighted}
      ?data-disabled=${disabled}
      ?data-expanded=${submenu?.open}
      aria-disabled=${disabled ? "true" : nothing}
      aria-checked=${options.checked === undefined ? nothing : String(options.checked)}
      aria-haspopup=${submenu ? "menu" : nothing}
      aria-expanded=${submenu ? String(submenu.open) : nothing}
      aria-controls=${submenu?.open ? `menu-${uid}` : nothing}
      @click=${this.onItemClick}
      @pointermove=${this.onItemPointerMove}
      @pointerleave=${this.onItemPointerLeave}
    >
      ${options.indicator ?? nothing}
      ${
        options.icon
          ? html`<span class="icon" part="icon" aria-hidden="true"
              >${options.icon}</span
            >`
          : nothing
      }
      <span class="text" part="item-label">${options.label}</span>
      ${options.shortcut ? html`<span class="shortcut" part="shortcut">${options.shortcut}</span>` : nothing}
      ${options.trailing ?? nothing}
    </div>`;
  }

  private renderAction(entry: MenuAction, depth: number, id: string) {
    if (entry.children?.length) {
      const open = this.openPath[depth] === id && !entry.disabled;
      const openSub = (intent: FocusIntent) =>
        this.openSubmenu(depth, id, intent);
      return this.renderItem({
        uid: id,
        role: "menuitem",
        label: entry.label,
        textValue: entry.textValue,
        icon: entry.icon,
        shortcut: entry.shortcut,
        disabled: entry.disabled,
        submenu: { open },
        trailing: html`<span class="chevron" aria-hidden="true"
          >${IconChevronRight}</span
        >`,
        activate: openSub,
      });
    }
    return this.renderItem({
      uid: id,
      role: "menuitem",
      label: entry.label,
      textValue: entry.textValue,
      icon: entry.icon,
      shortcut: entry.shortcut,
      disabled: entry.disabled,
      activate: () => this.activateAction(entry),
    });
  }

  private renderCheckbox(entry: MenuCheckboxEntry, id: string) {
    const checked = this.isChecked(entry);
    return this.renderItem({
      uid: id,
      role: "menuitemcheckbox",
      label: entry.label,
      textValue: entry.textValue,
      shortcut: entry.shortcut,
      disabled: entry.disabled,
      checked,
      indicator: html`<span
        class="indicator"
        part="item-indicator"
        aria-hidden="true"
        >${checked ? IconCheck : nothing}</span
      >`,
      activate: () => this.toggleCheckbox(entry),
    });
  }

  private renderRadioGroup(group: MenuRadioGroupEntry, id: string) {
    const value = this.radioValue(group);
    const labelId = `label-${id.replace(/[:.]/g, "-")}`;
    const hasLabel = group.label != null && group.label !== "";
    return html`<div
      role="group"
      part="group"
      aria-labelledby=${hasLabel ? labelId : nothing}
    >
      ${hasLabel ? html`<div id=${labelId} class="label" part="label">${group.label}</div>` : nothing}
      ${group.items.map((item, index) => {
        const checked = item.value === value;
        return this.renderItem({
          uid: `${id}.${index}`,
          role: "menuitemradio",
          label: item.label,
          textValue: item.textValue,
          shortcut: item.shortcut,
          disabled: item.disabled,
          checked,
          indicator: html`<span
            class="indicator"
            part="item-indicator"
            aria-hidden="true"
            >${checked ? html`<span class="dot"></span>` : nothing}</span
          >`,
          activate: () => this.chooseRadio(group, item),
        });
      })}
    </div>`;
  }
}
