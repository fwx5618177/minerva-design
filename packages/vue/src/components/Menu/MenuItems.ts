// Shared internals of Menu and ContextMenu (the Vue counterpart of the React
// `MenuItems.tsx`): the root (uncontrolled checkbox / radio state, focus
// restoration), the teleported panels (root menu and submenus) and the
// entries (items, checkbox / radio items, groups, separators, submenus).
import {
  computed,
  defineComponent,
  h,
  inject,
  isVNode,
  mergeProps,
  onBeforeUnmount,
  provide,
  ref,
  shallowRef,
  useId,
  watch,
  type Component,
  type CSSProperties,
  type InjectionKey,
  type PropType,
  type Ref,
  type VNode,
  type VNodeChild,
} from "vue";
import { createTypeahead, getNextIndex } from "@minerva/core";
import {
  createPointerGrace,
  focusElement,
  getTabbables,
  parsePlacement,
  type GraceSide,
  type Placement,
  type VirtualElement,
} from "@minerva/dom";
import styles from "@react-styles/components/Menu/menu.module.scss";
import { IconCheck, IconChevronRight } from "../../internal/icons";
import Portal from "../../internal/Portal";
import { firstElement, Slot } from "../../internal/Slot";
import { LAYER_KEY } from "../../internal/scope";
import { hooks, type HookStates } from "../../internal/hooks";
import { useAnchoredPosition } from "../../internal/anchored-position";
import { useDismissableLayer } from "../../internal/dismissable-layer";
import { useFocusScope } from "../../internal/focus-scope";
import { useHideOthers, useScrollLock } from "../../internal/scroll-lock";
import { usePresence } from "../../internal/presence";
import type {
  MenuAction,
  MenuCheckboxEntry,
  MenuDirection,
  MenuEntry,
  MenuRadioGroupEntry,
  MenuRadioItem,
  MenuRenderable,
  MenuSize,
} from "./types";

/** Where focus goes when a menu panel opens. */
export type FocusIntent = "first" | "last" | "content" | "none";

/** Component whose hooks the panels and items carry. */
export type MenuComponent = "menu" | "context-menu";

/** Delay before a hovered submenu trigger opens its submenu (ms). */
export const SUBMENU_OPEN_DELAY = 100;

const ITEM_ATTRIBUTE = "data-minerva-menu-item";
const ITEM_SELECTOR = `[${ITEM_ATTRIBUTE}]`;

/** Off-screen until the first position is computed (no flash at 0,0). */
const UNPOSITIONED: CSSProperties = { transform: "translate(0, -200%)" };

/** Submenus overlap the parent's padding so their first item lines up. */
const SUB_OFFSET = { mainAxis: 4, crossAxis: -5 };

type Offset = { mainAxis: number; crossAxis: number };
type Anchor = Element | VirtualElement | null;

/** Renders a label / icon of the data API (see `MenuRenderable`). */
export function renderNode(
  node: MenuRenderable | null | undefined,
): VNodeChild {
  if (node === null || node === undefined) return null;
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (typeof node === "function") return (node as () => VNodeChild)();
  if (isVNode(node)) return node;
  return h(node as Component);
}

const isDisabledItem = (item: HTMLElement) =>
  item.hasAttribute("data-disabled");

const itemText = (item: HTMLElement) =>
  item.dataset.textValue ??
  item.querySelector(`.${styles.text}`)?.textContent ??
  "";

/** Menu items of a panel (submenus are teleported, so never included). */
const getItems = (content: HTMLElement): HTMLElement[] =>
  Array.from(content.querySelectorAll<HTMLElement>(ITEM_SELECTOR));

const focusNoScroll = (el: HTMLElement | null | undefined) =>
  focusElement(el, { preventScroll: true });

/**
 * The tabbable element before / after `anchor` in `container`, in document
 * order (where Tab / Shift+Tab pressed on `anchor` would go).
 */
export function adjacentTabbable(
  anchor: Element,
  container: Element,
  backwards: boolean,
): HTMLElement | null {
  const tabbables = getTabbables(container).filter(
    (el) => el !== anchor && !anchor.contains(el) && !el.contains(anchor),
  );
  const follows = (el: Element) =>
    !!(anchor.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING);
  return backwards
    ? ([...tabbables].reverse().find((el) => !follows(el)) ?? null)
    : (tabbables.find(follows) ?? null);
}

/* -------------------------------------------------------------------------- */
/* Trigger                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * The trigger (Menu) / area (ContextMenu): renders the single child of its
 * slot with the attributes merged in (`Slot`), plus the public trigger hooks
 * on a native element child only. A component child (e.g. a Minerva Button)
 * keeps its own hooks (`aria-expanded` reflects the menu's state there).
 */
export const TriggerSlot = defineComponent({
  name: "MenuTriggerSlot",
  inheritAttrs: false,
  props: {
    hookComponent: {
      type: String as PropType<MenuComponent>,
      required: true,
    },
    hookOpen: { type: Boolean, default: false },
    hookDisabled: { type: Boolean, default: false },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const children = slots.default?.() as VNode[] | undefined;
      const child = firstElement(children);
      const native = typeof child?.type === "string";
      const hookAttrs = native
        ? hooks(props.hookComponent, "trigger", {
            state: props.hookOpen ? "open" : "closed",
            disabled: props.hookDisabled,
          })
        : {};
      return h(Slot, { ...attrs, ...hookAttrs }, () => children);
    };
  },
});

/* -------------------------------------------------------------------------- */
/* Contexts                                                                   */
/* -------------------------------------------------------------------------- */

interface MenuRootContext {
  readonly component: MenuComponent;
  readonly closeOnSelect: boolean;
  readonly size: MenuSize;
  readonly loop: boolean;
  readonly dir: MenuDirection;
  readonly modal: boolean;
  select: (item: MenuAction) => void;
  /** Closes the whole menu (focus returns to the trigger). */
  close: () => void;
  /** Closes the whole menu and moves focus on as Tab would from the trigger. */
  closeWithTab: (backwards: boolean) => void;
  /** Uncontrolled checkbox / radio-group state, by entry key. */
  getStored: <T>(key: string, fallback: T) => T;
  setStored: (key: string, value: unknown) => void;
}

const ROOT_KEY: InjectionKey<MenuRootContext> = Symbol("minerva-menu-root");
const useMenuRoot = () => inject(ROOT_KEY) as MenuRootContext;

interface ItemApi {
  /** Enter / Space / click. */
  activate: (intent: FocusIntent) => void;
  /** Submenu triggers: opens the submenu (ArrowRight in LTR). */
  openSub?: (intent: FocusIntent) => void;
}

interface PanelContext {
  register: (element: HTMLElement, api: () => ItemApi) => () => void;
  /** Key of the open submenu trigger. */
  openSub: Ref<string | null>;
  openSubmenu: (key: string, intent: FocusIntent) => void;
  closeSubmenu: (key: string) => void;
  /** Read (once) by a submenu when it opens. */
  consumeSubIntent: () => FocusIntent;
  /** A submenu panel element mounted (`el`) or unmounted (`null`, `prev`). */
  setSubElement: (el: HTMLElement | null, prev: HTMLElement | null) => void;
  onItemPointerMove: (
    event: PointerEvent,
    options: { disabled: boolean; subKey?: string },
  ) => void;
  onItemPointerLeave: (
    event: PointerEvent,
    options: { subKey?: string },
  ) => void;
}

const PANEL_KEY: InjectionKey<PanelContext> = Symbol("minerva-menu-panel");
const usePanel = () => inject(PANEL_KEY) as PanelContext;

/* -------------------------------------------------------------------------- */
/* Panel                                                                      */
/* -------------------------------------------------------------------------- */

const MenuPanel = defineComponent({
  name: "MenuPanel",
  props: {
    entries: { type: Array as PropType<MenuEntry[]>, required: true },
    open: { type: Boolean, required: true },
    /** Closes this panel (the root panel closes the whole menu). */
    close: { type: Function as PropType<() => void>, required: true },
    anchor: { type: Object as PropType<Anchor>, default: null },
    placement: { type: String as PropType<Placement>, required: true },
    offset: { type: Object as PropType<Offset>, required: true },
    /** Focus target on open, read once when the panel opens. */
    consumeIntent: {
      type: Function as PropType<() => FocusIntent>,
      required: true,
    },
    /** Focus target when the panel closes. */
    restoreFocus: {
      type: Function as PropType<() => HTMLElement | null>,
      required: true,
    },
    /** Elements that are part of the layer (the trigger). */
    branches: {
      type: Function as PropType<() => Array<Element | null | undefined>>,
      required: true,
    },
    panelId: { type: String, required: true },
    /** Submenu: its trigger item (ArrowLeft / Escape return focus to it). */
    isSub: { type: Boolean, default: false },
    parentItem: { type: Object as PropType<HTMLElement | null>, default: null },
    ariaLabel: { type: String, default: undefined },
    labelledBy: { type: String, default: undefined },
    /** Root panel: called on pointer down outside (cancelable). */
    pointerDownOutside: {
      type: Function as PropType<(event: PointerEvent) => void>,
      default: undefined,
    },
    /** Reports the panel element (submenus: for the pointer grace area). */
    reportElement: {
      type: Function as PropType<
        (el: HTMLElement | null, prev: HTMLElement | null) => void
      >,
      default: undefined,
    },
    /** Fall-through attributes of the root panel (class, style...). */
    panelAttrs: {
      type: Object as PropType<Record<string, unknown>>,
      default: undefined,
    },
  },
  setup(props) {
    const root = useMenuRoot();
    const modal = () => root.modal && !props.isSub;
    const element = shallowRef<HTMLElement | null>(null);
    const present = usePresence(() => props.open, element);
    const active = () => props.open && !!element.value;

    const anchored = useAnchoredPosition(() => ({
      open: present.value,
      anchor: props.anchor,
      placement: props.placement,
      offset: props.offset,
      padding: 8,
    }));
    const setRef = (el: unknown) => {
      const node = el instanceof HTMLElement ? el : null;
      const prev = element.value;
      if (node === prev) return;
      element.value = node;
      anchored.floating.value = node;
      props.reportElement?.(node, prev);
    };

    useDismissableLayer(element, () => ({
      enabled: active(),
      disableOutsidePointerEvents: modal(),
      branches: props.branches,
      onEscapeKeyDown: () => {
        // A submenu: Escape closes it only, focus goes back to its trigger.
        if (props.isSub) focusNoScroll(props.parentItem);
      },
      onPointerDownOutside: props.pointerDownOutside,
      // Focus is trapped while modal: never dismiss on focus outside.
      onFocusOutside: (event) => {
        if (modal()) event.preventDefault();
      },
      onDismiss: () => props.close(),
    }));
    useFocusScope(element, () => ({
      enabled: active(),
      trapped: modal(),
      restoreFocus: props.restoreFocus,
      onMountAutoFocus: (event) => {
        event.preventDefault();
        const intent = props.consumeIntent();
        const el = element.value;
        if (intent === "none" || !el) return;
        const items = getItems(el).filter((item) => !isDisabledItem(item));
        const target =
          intent === "first"
            ? items[0]
            : intent === "last"
              ? items[items.length - 1]
              : undefined;
        focusNoScroll(target ?? el);
      },
    }));
    useScrollLock(() => active() && modal());
    useHideOthers(element, () => active() && modal());

    // Item registry (keyboard activation goes through the panel).
    const registry = new Map<HTMLElement, () => ItemApi>();
    const register = (el: HTMLElement, api: () => ItemApi) => {
      registry.set(el, api);
      return () => {
        if (registry.get(el) === api) registry.delete(el);
      };
    };

    // Submenus: one open at a time per panel.
    const openSub = ref<string | null>(null);
    let subIntent: FocusIntent = "none";
    let subElement: HTMLElement | null = null;
    const firstEnabled = (content: HTMLElement) =>
      getItems(content).find((item) => !isDisabledItem(item));
    const openSubmenu = (key: string, intent: FocusIntent) => {
      if (openSub.value === key && subElement) {
        if (intent === "first") focusNoScroll(firstEnabled(subElement));
        return;
      }
      subIntent = intent;
      openSub.value = key;
    };
    const closeSubmenu = (key: string) => {
      if (openSub.value === key) openSub.value = null;
    };

    // Pointer: hover highlights, hover-open delay, grace area.
    const grace = createPointerGrace();
    let openTimer: ReturnType<typeof setTimeout> | undefined;
    const clearOpenTimer = () => {
      clearTimeout(openTimer);
      openTimer = undefined;
    };
    onBeforeUnmount(clearOpenTimer);
    watch(
      () => props.open,
      (open) => {
        if (open) return;
        grace.clear();
        clearOpenTimer();
        openSub.value = null;
      },
    );

    const inGrace = (event: PointerEvent) =>
      grace.isInGraceArea({ x: event.clientX, y: event.clientY });

    const onItemPointerMove: PanelContext["onItemPointerMove"] = (
      event,
      { disabled, subKey },
    ) => {
      if (event.pointerType === "touch" || inGrace(event)) return;
      grace.clear();
      const item = event.currentTarget as HTMLElement;
      const doc = item.ownerDocument;
      if (disabled) {
        if (doc.activeElement !== element.value) focusNoScroll(element.value);
        return;
      }
      if (doc.activeElement !== item) focusNoScroll(item);
      if (subKey && openSub.value !== subKey && openTimer === undefined) {
        openTimer = setTimeout(() => {
          openTimer = undefined;
          subIntent = "none";
          openSub.value = subKey;
        }, SUBMENU_OPEN_DELAY);
      }
    };

    const onItemPointerLeave: PanelContext["onItemPointerLeave"] = (
      event,
      { subKey },
    ) => {
      if (event.pointerType === "touch") return;
      clearOpenTimer();
      const item = event.currentTarget as HTMLElement;
      const sub = subElement;
      if (subKey && openSub.value === subKey && sub) {
        // Heading towards the open submenu: keep it while in the safe triangle.
        const subSide = (sub.getAttribute("data-side") ?? "right") as GraceSide;
        grace.start(
          { x: event.clientX, y: event.clientY },
          sub.getBoundingClientRect(),
          subSide,
        );
        return;
      }
      if (inGrace(event)) return;
      if (item.ownerDocument.activeElement === item) {
        focusNoScroll(element.value);
      }
    };

    // Keyboard: navigation, typeahead, activation, submenus, Tab.
    const typeahead = createTypeahead();
    let lastTypeahead = 0;

    const onKeydown = (event: KeyboardEvent) => {
      const content = event.currentTarget as HTMLElement;
      const target = event.target as HTMLElement;
      const { key } = event;
      // Tab (even when a focus trap handled it) closes the whole menu.
      if (key === "Tab") {
        event.preventDefault();
        root.closeWithTab(event.shiftKey);
        return;
      }
      if (event.defaultPrevented) return;
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const items = getItems(content);
      const item = target.closest<HTMLElement>(ITEM_SELECTOR);
      const currentIndex = item ? items.indexOf(item) : -1;
      const api = item ? registry.get(item)?.() : undefined;
      const openKey = root.dir === "rtl" ? "ArrowLeft" : "ArrowRight";
      const closeKey = root.dir === "rtl" ? "ArrowRight" : "ArrowLeft";

      if (["ArrowDown", "ArrowUp", "Home", "End"].includes(key)) {
        event.preventDefault();
        typeahead.reset();
        const next = getNextIndex({
          currentIndex,
          count: items.length,
          key,
          orientation: "vertical",
          loop: root.loop,
          isDisabled: (index) => isDisabledItem(items[index]),
        });
        if (next !== null) focusNoScroll(items[next]);
        return;
      }
      if (key === openKey && api?.openSub) {
        event.preventDefault();
        api.openSub("first");
        return;
      }
      if (key === closeKey && props.isSub) {
        event.preventDefault();
        focusNoScroll(props.parentItem);
        props.close();
        return;
      }

      if (key.length === 1) {
        const now = Date.now();
        if (now - lastTypeahead > 500) typeahead.reset();
        const typing = typeahead.getBuffer() !== "";
        if (key !== " " || typing) {
          lastTypeahead = now;
          event.preventDefault();
          const index = typeahead.search(
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
      if ((key === "Enter" || key === " ") && item && api) {
        event.preventDefault();
        if (!isDisabledItem(item)) api.activate("first");
      }
    };

    provide(LAYER_KEY, element);
    provide(PANEL_KEY, {
      register,
      openSub,
      openSubmenu,
      closeSubmenu,
      consumeSubIntent: () => {
        const intent = subIntent;
        subIntent = "none";
        return intent;
      },
      setSubElement: (el, prev) => {
        if (el) subElement = el;
        else if (subElement === prev) subElement = null;
      },
      onItemPointerMove,
      onItemPointerLeave,
    });

    const renderPanel = () => {
      if (!present.value) return null;
      const finalPlacement = anchored.placement.value;
      const { side, align } = parsePlacement(finalPlacement);
      const floatingStyles = anchored.isPositioned.value
        ? anchored.floatingStyles.value
        : { ...anchored.floatingStyles.value, ...UNPOSITIONED };
      return h(
        "div",
        mergeProps(
          props.panelAttrs ?? {},
          {
            ref: setRef,
            id: props.panelId,
            role: "menu",
            "aria-orientation": "vertical",
            "aria-label": props.ariaLabel,
            "aria-labelledby": props.ariaLabel ? undefined : props.labelledBy,
            tabindex: -1,
            dir: root.dir,
            class: [styles.content, root.size === "small" && styles.small],
            style: floatingStyles,
            onKeydown,
          },
          hooks(root.component, "content", {
            state: props.open ? "open" : "closed",
            size: root.size,
            side,
            align,
            placement: finalPlacement,
          }),
        ),
        h(Entries, { entries: props.entries }),
      );
    };
    // The Portal stays mounted (only its content toggles): nothing changes
    // in place, so an enclosing focus trap (a Modal) does not react to the
    // panel unmounting before focus returns to the trigger.
    return () => h(Portal, null, renderPanel);
  },
});

/* -------------------------------------------------------------------------- */
/* Items                                                                      */
/* -------------------------------------------------------------------------- */

/** Shared markup and behaviour of every focusable item. */
const ItemShell = defineComponent({
  name: "MenuItemShell",
  props: {
    role: {
      type: String as PropType<
        "menuitem" | "menuitemcheckbox" | "menuitemradio"
      >,
      required: true,
    },
    label: {
      type: [String, Number, Object, Function] as PropType<MenuRenderable>,
      default: undefined,
    },
    textValue: { type: String, default: undefined },
    icon: {
      type: [String, Number, Object, Function] as PropType<MenuRenderable>,
      default: undefined,
    },
    shortcut: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
    api: { type: Object as PropType<ItemApi>, required: true },
    subKey: { type: String, default: undefined },
    itemId: { type: String, default: undefined },
    /** Extra attributes (aria-checked, aria-haspopup...). */
    attributes: {
      type: Object as PropType<Record<string, string | undefined>>,
      default: undefined,
    },
    /** Item state hooks (checked / unchecked, expanded) */
    itemStates: { type: Object as PropType<HookStates>, default: undefined },
    reportElement: {
      type: Function as PropType<(el: HTMLElement | null) => void>,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    const panel = usePanel();
    const root = useMenuRoot();
    const highlighted = ref(false);
    let current: HTMLElement | null = null;
    let unregister: (() => void) | undefined;
    const setRef = (el: unknown) => {
      const node = el instanceof HTMLElement ? el : null;
      if (node === current) return;
      unregister?.();
      unregister = undefined;
      current = node;
      if (node) unregister = panel.register(node, () => props.api);
      props.reportElement?.(node);
    };

    return () => {
      const { component } = root;
      const text =
        props.textValue ??
        (typeof props.label === "string" || typeof props.label === "number"
          ? String(props.label)
          : undefined);
      return h(
        "div",
        {
          ref: setRef,
          id: props.itemId,
          role: props.role,
          tabindex: -1,
          class: styles.item,
          [ITEM_ATTRIBUTE]: "",
          "data-text-value": text,
          "aria-disabled": props.disabled ? "true" : undefined,
          ...props.attributes,
          ...hooks(component, "item", {
            ...props.itemStates,
            highlighted: highlighted.value,
            disabled: props.disabled,
          }),
          onFocus: () => {
            highlighted.value = true;
          },
          onBlur: () => {
            highlighted.value = false;
          },
          onClick: () => {
            if (!props.disabled) props.api.activate("none");
          },
          onPointermove: (event: PointerEvent) =>
            panel.onItemPointerMove(event, {
              disabled: props.disabled,
              subKey: props.subKey,
            }),
          onPointerleave: (event: PointerEvent) =>
            panel.onItemPointerLeave(event, { subKey: props.subKey }),
        },
        [
          slots.indicator?.(),
          props.icon !== undefined && props.icon !== null && props.icon !== ""
            ? h(
                "span",
                {
                  class: styles.icon,
                  "aria-hidden": "true",
                  ...hooks(component, "icon"),
                },
                [renderNode(props.icon)],
              )
            : null,
          h("span", { class: styles.text, ...hooks(component, "item-label") }, [
            renderNode(props.label),
          ]),
          props.shortcut
            ? h(
                "span",
                { class: styles.shortcut, ...hooks(component, "shortcut") },
                props.shortcut,
              )
            : null,
          slots.trailing?.(),
        ],
      );
    };
  },
});

const indicator = (component: MenuComponent, content: VNodeChild) =>
  h(
    "span",
    {
      class: styles.indicator,
      "aria-hidden": "true",
      ...hooks(component, "item-indicator"),
    },
    [content],
  );

function renderAction(root: MenuRootContext, entry: MenuAction) {
  return h(ItemShell, {
    key: entry.key,
    role: "menuitem",
    label: entry.label,
    textValue: entry.textValue,
    icon: entry.icon,
    shortcut: entry.shortcut,
    disabled: !!entry.disabled,
    api: {
      activate: () => {
        root.select(entry);
        if (entry.closeOnSelect ?? root.closeOnSelect) root.close();
      },
    },
  });
}

function renderCheckbox(root: MenuRootContext, entry: MenuCheckboxEntry) {
  const controlled = entry.checked !== undefined;
  const checked = controlled
    ? !!entry.checked
    : root.getStored(entry.key, entry.defaultChecked ?? false);
  return h(
    ItemShell,
    {
      key: entry.key,
      role: "menuitemcheckbox",
      label: entry.label,
      textValue: entry.textValue,
      shortcut: entry.shortcut,
      disabled: !!entry.disabled,
      attributes: { "aria-checked": String(checked) },
      itemStates: { state: checked ? "checked" : "unchecked" },
      api: {
        activate: () => {
          if (!controlled) root.setStored(entry.key, !checked);
          entry.onCheckedChange?.(!checked);
          if (entry.closeOnSelect) root.close();
        },
      },
    },
    {
      indicator: () =>
        indicator(root.component, checked ? h(IconCheck, { size: 16 }) : null),
    },
  );
}

const RadioGroup = defineComponent({
  name: "MenuRadioGroup",
  props: {
    entry: { type: Object as PropType<MenuRadioGroupEntry>, required: true },
  },
  setup(props) {
    const root = useMenuRoot();
    const labelId = useId();
    return () => {
      const { entry } = props;
      const { component } = root;
      const controlled = entry.value !== undefined;
      const value = controlled
        ? entry.value
        : root.getStored<string | undefined>(entry.key, entry.defaultValue);
      const onChoose = (next: string) => {
        if (!controlled) root.setStored(entry.key, next);
        if (next !== value) entry.onValueChange?.(next);
      };
      const hasLabel = entry.label !== undefined && entry.label !== null;
      const radio = (item: MenuRadioItem) => {
        const checked = item.value === value;
        return h(
          ItemShell,
          {
            key: item.value,
            role: "menuitemradio",
            label: item.label,
            textValue: item.textValue,
            shortcut: item.shortcut,
            disabled: !!item.disabled,
            attributes: { "aria-checked": String(checked) },
            itemStates: { state: checked ? "checked" : "unchecked" },
            api: {
              activate: () => {
                onChoose(item.value);
                if (entry.closeOnSelect) root.close();
              },
            },
          },
          {
            indicator: () =>
              indicator(
                component,
                checked ? h("span", { class: styles.dot }) : null,
              ),
          },
        );
      };
      return h(
        "div",
        {
          role: "group",
          "aria-labelledby": hasLabel ? labelId : undefined,
          ...hooks(component, "group"),
        },
        [
          hasLabel
            ? h(
                "div",
                {
                  id: labelId,
                  class: styles.label,
                  ...hooks(component, "label"),
                },
                [renderNode(entry.label)],
              )
            : null,
          ...entry.items.map(radio),
        ],
      );
    };
  },
});

const SubmenuItem = defineComponent({
  name: "MenuSubmenuItem",
  props: {
    entry: { type: Object as PropType<MenuAction>, required: true },
  },
  setup(props) {
    const root = useMenuRoot();
    const panel = usePanel();
    const item = shallowRef<HTMLElement | null>(null);
    const itemId = useId();
    const subId = useId();
    const open = computed(
      () => panel.openSub.value === props.entry.key && !props.entry.disabled,
    );
    const openSub = (intent: FocusIntent) =>
      panel.openSubmenu(props.entry.key, intent);
    const setItem = (el: HTMLElement | null) => {
      item.value = el;
    };
    const api: ItemApi = { activate: openSub, openSub };

    return () => {
      const { entry } = props;
      return [
        h(
          ItemShell,
          {
            role: "menuitem",
            itemId,
            label: entry.label,
            textValue: entry.textValue,
            icon: entry.icon,
            shortcut: entry.shortcut,
            disabled: !!entry.disabled,
            subKey: entry.key,
            reportElement: setItem,
            attributes: {
              "aria-haspopup": "menu",
              "aria-expanded": String(open.value),
              "aria-controls": open.value ? subId : undefined,
            },
            itemStates: { expanded: open.value },
            api,
          },
          {
            trailing: () =>
              h(IconChevronRight, {
                class: styles.chevron,
                size: 16,
                "aria-hidden": "true",
              }),
          },
        ),
        h(MenuPanel, {
          entries: entry.children ?? [],
          open: open.value,
          close: () => panel.closeSubmenu(entry.key),
          anchor: item.value,
          placement: root.dir === "rtl" ? "left-start" : "right-start",
          offset: SUB_OFFSET,
          consumeIntent: panel.consumeSubIntent,
          restoreFocus: () => item.value,
          branches: () => [item.value],
          panelId: subId,
          isSub: true,
          parentItem: item.value,
          labelledBy: itemId,
          reportElement: panel.setSubElement,
        }),
      ];
    };
  },
});

const Group = defineComponent({
  name: "MenuGroup",
  props: {
    label: {
      type: [String, Number, Object, Function] as PropType<MenuRenderable>,
      default: undefined,
    },
    entries: { type: Array as PropType<MenuEntry[]>, required: true },
  },
  setup(props) {
    const labelId = useId();
    const root = useMenuRoot();
    return (): VNode =>
      h(
        "div",
        {
          role: "group",
          "aria-labelledby": labelId,
          ...hooks(root.component, "group"),
        },
        [
          h(
            "div",
            {
              id: labelId,
              class: styles.label,
              ...hooks(root.component, "label"),
            },
            [renderNode(props.label)],
          ),
          h(Entries, { entries: props.entries }),
        ],
      );
  },
});

/** Renders entries (items, separators, groups, submenus) recursively. */
const Entries = defineComponent({
  name: "MenuEntries",
  props: {
    entries: { type: Array as PropType<MenuEntry[]>, required: true },
  },
  setup(props) {
    const root = useMenuRoot();
    return (): VNode[] =>
      props.entries.map((entry): VNode => {
        if ("type" in entry) {
          switch (entry.type) {
            case "separator":
              return h("div", {
                key: entry.key,
                role: "separator",
                "aria-orientation": "horizontal",
                class: styles.separator,
                ...hooks(root.component, "separator"),
              });
            case "group":
              return h(Group, {
                key: entry.key,
                label: entry.label,
                entries: entry.items,
              });
            case "checkbox":
              return renderCheckbox(root, entry);
            case "radio-group":
              return h(RadioGroup, { key: entry.key, entry });
          }
        }
        const action = entry as MenuAction;
        return action.children?.length
          ? h(SubmenuItem, { key: action.key, entry: action })
          : renderAction(root, action);
      });
  },
});

/* -------------------------------------------------------------------------- */
/* Root                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Shared root of Menu and ContextMenu: owns the uncontrolled checkbox /
 * radio state, focus restoration and the root panel.
 */
export const MenuRoot = defineComponent({
  name: "MenuRoot",
  props: {
    component: { type: String as PropType<MenuComponent>, required: true },
    items: { type: Array as PropType<MenuEntry[]>, required: true },
    closeOnSelect: { type: Boolean, required: true },
    size: { type: String as PropType<MenuSize>, required: true },
    loop: { type: Boolean, required: true },
    dir: { type: String as PropType<MenuDirection>, required: true },
    modal: { type: Boolean, required: true },
    ariaLabel: { type: String, default: undefined },
    labelledBy: { type: String, default: undefined },
    open: { type: Boolean, required: true },
    setOpen: {
      type: Function as PropType<(open: boolean) => void>,
      required: true,
    },
    selectItem: {
      type: Function as PropType<(item: MenuAction) => void>,
      required: true,
    },
    anchor: { type: Object as PropType<Anchor>, default: null },
    placement: { type: String as PropType<Placement>, required: true },
    offset: { type: Object as PropType<Offset>, required: true },
    contentId: { type: String, required: true },
    /** The trigger (part of the layer). */
    trigger: { type: Object as PropType<HTMLElement | null>, default: null },
    /** Default focus target on close (the trigger). */
    getRestoreTarget: {
      type: Function as PropType<() => HTMLElement | null>,
      required: true,
    },
    consumeIntent: {
      type: Function as PropType<() => FocusIntent>,
      required: true,
    },
    /** Pointer down outside; `preventDefault()` keeps the menu open. */
    pointerDownOutside: {
      type: Function as PropType<(event: PointerEvent) => void>,
      default: undefined,
    },
    /** Container in which Tab moves on (the enclosing layer, else the body). */
    tabContainer: { type: Object as PropType<Element | null>, default: null },
    panelAttrs: {
      type: Object as PropType<Record<string, unknown>>,
      default: undefined,
    },
  },
  setup(props) {
    const stored = ref<Record<string, unknown>>({});
    // Focus target on close: `undefined` = the trigger, `null` = leave focus.
    let restoreOverride: HTMLElement | null | undefined;
    const close = () => props.setOpen(false);

    provide(ROOT_KEY, {
      get component() {
        return props.component;
      },
      get closeOnSelect() {
        return props.closeOnSelect;
      },
      get size() {
        return props.size;
      },
      get loop() {
        return props.loop;
      },
      get dir() {
        return props.dir;
      },
      get modal() {
        return props.modal;
      },
      select: (item) => props.selectItem(item),
      close,
      closeWithTab: (backwards) => {
        const from = props.getRestoreTarget();
        const container = props.tabContainer ?? from?.ownerDocument.body;
        restoreOverride =
          from && container
            ? (adjacentTabbable(from, container, backwards) ?? from)
            : undefined;
        close();
      },
      getStored: <T>(key: string, fallback: T) =>
        key in stored.value ? (stored.value[key] as T) : fallback,
      setStored: (key, value) => {
        stored.value = { ...stored.value, [key]: value };
      },
    });

    const consume = () => {
      restoreOverride = undefined;
      return props.consumeIntent();
    };
    const restoreFocus = () =>
      restoreOverride === undefined
        ? props.getRestoreTarget()
        : restoreOverride;
    const branches = () => [props.trigger];
    const onPointerDownOutside = (event: PointerEvent) => {
      props.pointerDownOutside?.(event);
      // Like a native menu: a non-modal menu (or a right click) leaves focus
      // where the outside interaction put it.
      if (!event.defaultPrevented && (!props.modal || event.button === 2)) {
        restoreOverride = null;
      }
    };

    return () =>
      h(MenuPanel, {
        entries: props.items,
        open: props.open,
        close,
        anchor: props.anchor,
        placement: props.placement,
        offset: props.offset,
        consumeIntent: consume,
        restoreFocus,
        branches,
        panelId: props.contentId,
        ariaLabel: props.ariaLabel,
        labelledBy: props.labelledBy,
        pointerDownOutside: onPointerDownOutside,
        panelAttrs: props.panelAttrs,
      });
  },
});
