import {
  createContext,
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import {
  createPointerGrace,
  createTypeahead,
  focusElement,
  getNextIndex,
  parsePlacement,
  type GraceSide,
  type Placement,
  type VirtualElement,
} from "@minerva/core";
import { IconCheck, IconChevronRight } from "../../internal/icons";
import { warnControlledProps } from "../../internal/devWarnings";
import { useMergedRefs } from "../../internal/mergeRefs";
import { Portal } from "../../internal/Portal";
import { useAnchoredPosition } from "../../internal/useAnchoredPosition";
import { useControlledSwitchWarning } from "../../internal/useControllableState";
import {
  LayerContext,
  useDismissableLayer,
} from "../../internal/useDismissableLayer";
import { useFocusScope } from "../../internal/useFocusScope";
import { useHideOthers } from "../../internal/useHideOthers";
import { usePresence } from "../../internal/usePresence";
import { useScrollLock } from "../../internal/useScrollLock";
import { adjacentTabbable } from "../../internal/tabbing";
import { cn } from "../../utils/cn";
import type {
  MenuAction,
  MenuCheckboxEntry,
  MenuDirection,
  MenuEntry,
  MenuRadioGroupEntry,
  MenuRadioItem,
  MenuSize,
} from "./types";
import styles from "./menu.module.scss";

/** Where focus goes when a menu panel opens. */
export type FocusIntent = "first" | "last" | "content" | "none";

/** Delay before a hovered submenu trigger opens its submenu (ms). */
export const SUBMENU_OPEN_DELAY = 100;

const ITEM_ATTRIBUTE = "data-minerva-menu-item";
const ITEM_SELECTOR = `[${ITEM_ATTRIBUTE}]`;

/** Off-screen until the first position is computed (no flash at 0,0). */
const UNPOSITIONED: CSSProperties = { transform: "translate(0, -200%)" };

/** Classes of a menu panel (root menu or submenu). */
export const contentClassName = (size: MenuSize, className?: string) =>
  cn(styles.content, size === "small" && styles.small, className);

const isDisabledItem = (item: HTMLElement) =>
  item.hasAttribute("data-disabled");

const itemText = (item: HTMLElement) =>
  item.dataset.textValue ??
  item.querySelector(`.${styles.text}`)?.textContent ??
  item.textContent ??
  "";

/** Menu items of a panel (submenus are portalled, so never included). */
const getItems = (content: HTMLElement | null): HTMLElement[] =>
  content
    ? Array.from(content.querySelectorAll<HTMLElement>(ITEM_SELECTOR))
    : [];

const focusNoScroll = (el: HTMLElement | null | undefined) =>
  focusElement(el, { preventScroll: true });

/* -------------------------------------------------------------------------- */
/* Root context                                                               */
/* -------------------------------------------------------------------------- */

interface MenuRootContextValue {
  onSelect?: (item: MenuAction) => void;
  closeOnSelect: boolean;
  size: MenuSize;
  loop: boolean;
  dir: MenuDirection;
  modal: boolean;
  /** Closes the whole menu (focus returns to the trigger). */
  close: () => void;
  /** Closes the whole menu and moves focus on as Tab would from the trigger. */
  closeWithTab: (backwards: boolean) => void;
  /** Uncontrolled checkbox / radio-group state, by entry key. */
  getStored: <T>(key: string, fallback: T) => T;
  setStored: (key: string, value: unknown) => void;
}

const MenuRootContext = createContext<MenuRootContextValue | null>(null);

const useMenuRoot = () => {
  const context = useContext(MenuRootContext);
  if (!context) throw new Error("Menu items must be rendered inside a menu");
  return context;
};

/* -------------------------------------------------------------------------- */
/* Panel context                                                              */
/* -------------------------------------------------------------------------- */

interface ItemApi {
  /** Enter / Space / click. */
  activate: (intent: FocusIntent) => void;
  /** Submenu triggers: opens the submenu (ArrowRight in LTR). */
  openSub?: (intent: FocusIntent) => void;
}

interface PanelContextValue {
  register: (element: HTMLElement, api: { current: ItemApi }) => () => void;
  /** Key of the open submenu trigger. */
  openSub: string | null;
  openSubmenu: (key: string, intent: FocusIntent) => void;
  closeSubmenu: (key: string) => void;
  /** Read (once) by a submenu when it opens. */
  consumeSubIntent: () => FocusIntent;
  setSubElement: (element: HTMLElement | null) => void;
  /** Pointer moved over an item. */
  onItemPointerMove: (
    event: ReactPointerEvent<HTMLElement>,
    options: { disabled: boolean; subKey?: string },
  ) => void;
  /** Pointer left an item. */
  onItemPointerLeave: (
    event: ReactPointerEvent<HTMLElement>,
    options: { subKey?: string },
  ) => void;
}

const PanelContext = createContext<PanelContextValue | null>(null);

const usePanel = () => {
  const context = useContext(PanelContext);
  if (!context) throw new Error("Menu items must be rendered inside a menu");
  return context;
};

/* -------------------------------------------------------------------------- */
/* Panel                                                                      */
/* -------------------------------------------------------------------------- */

interface MenuPanelProps {
  entries: MenuEntry[];
  open: boolean;
  /** Closes this panel (the root panel closes the whole menu). */
  onClose: () => void;
  anchor: Element | VirtualElement | null;
  placement: Placement;
  offset: { mainAxis: number; crossAxis: number };
  /** Focus target on open, read once when the panel opens. */
  consumeIntent: () => FocusIntent;
  /** Focus target when the panel closes. */
  restoreFocus: () => HTMLElement | null;
  /** Elements that are part of the layer (the trigger). */
  branches: () => Array<Element | null | undefined>;
  id: string;
  /** Submenu: its trigger item (ArrowLeft / Escape return focus to it). */
  parentItem?: HTMLElement | null;
  className?: string;
  "aria-label"?: string;
  labelledBy?: string;
  /** Root panel: called on pointer down outside (cancelable). */
  onPointerDownOutside?: (event: PointerEvent) => void;
  /** Reports the panel element (submenus: for the pointer grace area). */
  onElement?: (element: HTMLElement | null) => void;
}

const MenuPanel = ({
  entries,
  open,
  onClose,
  anchor,
  placement,
  offset,
  consumeIntent,
  restoreFocus,
  branches,
  id,
  parentItem,
  className,
  "aria-label": ariaLabel,
  labelledBy,
  onPointerDownOutside,
  onElement,
}: MenuPanelProps) => {
  const root = useMenuRoot();
  const isSub = parentItem !== undefined;
  const modal = root.modal && !isSub;
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const present = usePresence(open, element);
  const active = open && !!element;

  const {
    setFloating,
    floatingStyles,
    placement: finalPlacement,
    isPositioned,
  } = useAnchoredPosition({
    open: present,
    anchor,
    placement,
    offset,
    padding: 8,
  });
  const contentRef = useMergedRefs<HTMLDivElement>(setElement, setFloating);
  const { side, align } = parsePlacement(finalPlacement);

  useLayoutEffect(() => {
    onElement?.(element);
  }, [onElement, element]);

  useDismissableLayer(element, {
    enabled: active,
    disableOutsidePointerEvents: modal,
    branches,
    onEscapeKeyDown: () => {
      // A submenu: Escape closes it only, focus goes back to its trigger.
      if (isSub) focusNoScroll(parentItem);
    },
    onPointerDownOutside,
    // Focus is trapped while modal: never dismiss on focus outside.
    onFocusOutside: (event) => {
      if (modal) event.preventDefault();
    },
    onDismiss: onClose,
  });
  useFocusScope(element, {
    enabled: active,
    trapped: modal,
    restoreFocus,
    onMountAutoFocus: (event) => {
      event.preventDefault();
      const intent = consumeIntent();
      if (intent === "none" || !element) return;
      const items = getItems(element).filter((item) => !isDisabledItem(item));
      const target =
        intent === "first"
          ? items[0]
          : intent === "last"
            ? items[items.length - 1]
            : undefined;
      focusNoScroll(target ?? element);
    },
  });
  useScrollLock(active && modal);
  useHideOthers(element, active && modal);

  // Item registry (keyboard activation goes through the panel).
  const registry = useRef(new Map<HTMLElement, { current: ItemApi }>());
  const register = useCallback((el: HTMLElement, api: { current: ItemApi }) => {
    registry.current.set(el, api);
    return () => {
      if (registry.current.get(el) === api) registry.current.delete(el);
    };
  }, []);

  // Submenus: one open at a time per panel.
  const [openSub, setOpenSub] = useState<string | null>(null);
  const subIntent = useRef<FocusIntent>("none");
  const subElement = useRef<HTMLElement | null>(null);
  const setSubElement = useCallback((el: HTMLElement | null) => {
    subElement.current = el;
  }, []);
  const consumeSubIntent = useCallback(() => {
    const intent = subIntent.current;
    subIntent.current = "none";
    return intent;
  }, []);
  const openSubmenu = useCallback(
    (key: string, intent: FocusIntent) => {
      if (openSub === key && subElement.current) {
        if (intent === "first") {
          focusNoScroll(
            getItems(subElement.current).find((item) => !isDisabledItem(item)),
          );
        }
        return;
      }
      subIntent.current = intent;
      setOpenSub(key);
    },
    [openSub],
  );
  const closeSubmenu = useCallback((key: string) => {
    setOpenSub((current) => (current === key ? null : current));
  }, []);

  // Pointer: hover highlights, hover-open delay, grace area.
  const grace = useMemo(() => createPointerGrace(), []);
  const openTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const clearOpenTimer = () => {
    clearTimeout(openTimer.current);
    openTimer.current = undefined;
  };
  useLayoutEffect(() => () => clearTimeout(openTimer.current), []);
  useLayoutEffect(() => {
    if (!open) {
      grace.clear();
      clearTimeout(openTimer.current);
    }
  }, [open, grace]);

  const inGrace = (event: ReactPointerEvent) =>
    grace.isInGraceArea({ x: event.clientX, y: event.clientY });

  const onItemPointerMove: PanelContextValue["onItemPointerMove"] = (
    event,
    { disabled, subKey },
  ) => {
    if (event.pointerType === "touch" || inGrace(event)) return;
    grace.clear();
    const item = event.currentTarget;
    if (disabled) {
      if (item.ownerDocument.activeElement !== element) focusNoScroll(element);
      return;
    }
    if (item.ownerDocument.activeElement !== item) focusNoScroll(item);
    if (subKey && openSub !== subKey && openTimer.current === undefined) {
      openTimer.current = setTimeout(() => {
        openTimer.current = undefined;
        subIntent.current = "none";
        setOpenSub(subKey);
      }, SUBMENU_OPEN_DELAY);
    }
  };

  const onItemPointerLeave: PanelContextValue["onItemPointerLeave"] = (
    event,
    { subKey },
  ) => {
    if (event.pointerType === "touch") return;
    clearOpenTimer();
    const item = event.currentTarget;
    const sub = subElement.current;
    if (subKey && openSub === subKey && sub) {
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
    if (item.ownerDocument.activeElement === item) focusNoScroll(element);
  };

  // Keyboard: navigation, typeahead, activation, submenus, Tab.
  const typeahead = useMemo(() => createTypeahead(), []);
  const lastTypeahead = useRef(0);
  const openKey = root.dir === "rtl" ? "ArrowLeft" : "ArrowRight";
  const closeKey = root.dir === "rtl" ? "ArrowRight" : "ArrowLeft";

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const content = event.currentTarget;
    const target = event.target as HTMLElement;
    // Keys from portalled submenus bubble through the React tree: ignore.
    if (!content.contains(target)) return;
    const { key } = event;
    // Tab (even when a focus trap handled it) closes the whole menu.
    if (key === "Tab") {
      event.preventDefault();
      root.closeWithTab(event.shiftKey);
      return;
    }
    if (event.defaultPrevented) return;
    const items = getItems(content);
    const item = target.closest<HTMLElement>(ITEM_SELECTOR);
    const currentIndex = item ? items.indexOf(item) : -1;
    const api = item ? registry.current.get(item)?.current : undefined;
    if (event.altKey || event.ctrlKey || event.metaKey) return;

    const next = getNextIndex({
      currentIndex,
      count: items.length,
      key,
      orientation: "vertical",
      loop: root.loop,
      isDisabled: (index) => isDisabledItem(items[index]),
    });
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(key)) {
      event.preventDefault();
      typeahead.reset();
      if (next !== null) focusNoScroll(items[next]);
      return;
    }
    if (key === openKey && api?.openSub) {
      event.preventDefault();
      api.openSub("first");
      return;
    }
    if (key === closeKey && isSub) {
      event.preventDefault();
      focusNoScroll(parentItem);
      onClose();
      return;
    }

    if (key.length === 1) {
      const now = Date.now();
      if (now - lastTypeahead.current > 500) typeahead.reset();
      const typing = typeahead.getBuffer() !== "";
      if (key !== " " || typing) {
        lastTypeahead.current = now;
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

  const panelContext: PanelContextValue = {
    register,
    openSub,
    openSubmenu,
    closeSubmenu,
    consumeSubIntent,
    setSubElement,
    onItemPointerMove,
    onItemPointerLeave,
  };

  if (!present) return null;

  return (
    <Portal>
      <LayerContext.Provider value={element}>
        <PanelContext.Provider value={panelContext}>
          <div
            ref={contentRef}
            id={id}
            role="menu"
            aria-orientation="vertical"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabel ? undefined : labelledBy}
            tabIndex={-1}
            dir={root.dir}
            data-state={open ? "open" : "closed"}
            data-side={side}
            data-align={align}
            className={contentClassName(root.size, className)}
            style={
              isPositioned
                ? floatingStyles
                : { ...floatingStyles, ...UNPOSITIONED }
            }
            onKeyDown={onKeyDown}
          >
            <Entries entries={entries} />
          </div>
        </PanelContext.Provider>
      </LayerContext.Provider>
    </Portal>
  );
};

/* -------------------------------------------------------------------------- */
/* Items                                                                      */
/* -------------------------------------------------------------------------- */

interface ItemShellProps {
  role: "menuitem" | "menuitemcheckbox" | "menuitemradio";
  label: ReactNode;
  textValue?: string;
  icon?: ReactNode;
  shortcut?: string;
  disabled?: boolean;
  /** Checkbox / radio indicator. */
  indicator?: ReactNode;
  /** Trailing element (submenu chevron). */
  trailing?: ReactNode;
  api: ItemApi;
  subKey?: string;
  id?: string;
  /** Extra attributes (aria-checked, aria-haspopup...). */
  attributes?: Record<string, string | boolean | undefined>;
  onElement?: (element: HTMLDivElement | null) => void;
}

/** Shared markup and behaviour of every focusable item. */
const ItemShell = ({
  role,
  label,
  textValue,
  icon,
  shortcut,
  disabled = false,
  indicator,
  trailing,
  api,
  subKey,
  id,
  attributes,
  onElement,
}: ItemShellProps) => {
  const panel = usePanel();
  const [highlighted, setHighlighted] = useState(false);
  const apiRef = useRef(api);
  useLayoutEffect(() => {
    apiRef.current = api;
  });
  const { register } = panel;
  const ref = useCallback(
    (el: HTMLDivElement | null) => {
      onElement?.(el);
      if (!el) return;
      const unregister = register(el, apiRef);
      return () => {
        unregister();
        onElement?.(null);
      };
    },
    [register, onElement],
  );
  const text =
    textValue ??
    (typeof label === "string" || typeof label === "number"
      ? String(label)
      : undefined);
  // Events from portalled submenus bubble through the React tree: ignore.
  const own = (event: { target: EventTarget; currentTarget: Element }) =>
    event.currentTarget.contains(event.target as Node);

  return (
    // Keyboard activation is handled by the panel (roving focus).
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      ref={ref}
      id={id}
      role={role}
      tabIndex={-1}
      className={styles.item}
      data-minerva-menu-item=""
      data-text-value={text}
      data-highlighted={highlighted ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      aria-disabled={disabled || undefined}
      {...attributes}
      onFocus={(event) => {
        if (event.target === event.currentTarget) setHighlighted(true);
      }}
      onBlur={(event) => {
        if (event.target === event.currentTarget) setHighlighted(false);
      }}
      onClick={(event) => {
        if (!own(event) || disabled) return;
        apiRef.current.activate("none");
      }}
      onPointerMove={(event) => {
        if (own(event)) panel.onItemPointerMove(event, { disabled, subKey });
      }}
      onPointerLeave={(event) => {
        if (own(event)) panel.onItemPointerLeave(event, { subKey });
      }}
    >
      {indicator}
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      <span className={styles.text}>{label}</span>
      {shortcut && <span className={styles.shortcut}>{shortcut}</span>}
      {trailing}
    </div>
  );
};

const ActionItem = ({ entry }: { entry: MenuAction }) => {
  const root = useMenuRoot();
  return (
    <ItemShell
      role="menuitem"
      label={entry.label}
      textValue={entry.textValue}
      icon={entry.icon}
      shortcut={entry.shortcut}
      disabled={entry.disabled}
      api={{
        activate: () => {
          root.onSelect?.(entry);
          if (entry.closeOnSelect ?? root.closeOnSelect) root.close();
        },
      }}
    />
  );
};

const CheckboxItem = ({ entry }: { entry: MenuCheckboxEntry }) => {
  const root = useMenuRoot();
  const controlled = entry.checked !== undefined;
  useControlledSwitchWarning(controlled, "Menu", "checked");
  if (process.env.NODE_ENV !== "production") {
    warnControlledProps("Menu", {
      prop: "checked",
      value: entry.checked,
      defaultProp: "defaultChecked",
      defaultValue: entry.defaultChecked,
      handlerProp: "onCheckedChange",
      handler: entry.onCheckedChange,
      locked: entry.disabled,
    });
  }
  const checked = controlled
    ? !!entry.checked
    : root.getStored(entry.key, entry.defaultChecked ?? false);
  return (
    <ItemShell
      role="menuitemcheckbox"
      label={entry.label}
      textValue={entry.textValue}
      shortcut={entry.shortcut}
      disabled={entry.disabled}
      attributes={{
        "aria-checked": checked,
        "data-state": checked ? "checked" : "unchecked",
      }}
      indicator={
        <span className={styles.indicator} aria-hidden="true">
          {checked && <IconCheck size={16} />}
        </span>
      }
      api={{
        activate: () => {
          if (!controlled) root.setStored(entry.key, !checked);
          entry.onCheckedChange?.(!checked);
          if (entry.closeOnSelect) root.close();
        },
      }}
    />
  );
};

const RadioItem = ({
  item,
  group,
  value,
  onChoose,
}: {
  item: MenuRadioItem;
  group: MenuRadioGroupEntry;
  value: string | undefined;
  onChoose: (value: string) => void;
}) => {
  const root = useMenuRoot();
  const checked = item.value === value;
  return (
    <ItemShell
      role="menuitemradio"
      label={item.label}
      textValue={item.textValue}
      shortcut={item.shortcut}
      disabled={item.disabled}
      attributes={{
        "aria-checked": checked,
        "data-state": checked ? "checked" : "unchecked",
      }}
      indicator={
        <span className={styles.indicator} aria-hidden="true">
          {checked && <span className={styles.dot} />}
        </span>
      }
      api={{
        activate: () => {
          onChoose(item.value);
          if (group.closeOnSelect) root.close();
        },
      }}
    />
  );
};

const RadioGroup = ({ entry }: { entry: MenuRadioGroupEntry }) => {
  const root = useMenuRoot();
  const labelId = useId();
  const controlled = entry.value !== undefined;
  useControlledSwitchWarning(controlled, "Menu", "value");
  if (process.env.NODE_ENV !== "production") {
    warnControlledProps("Menu", {
      prop: "value",
      value: entry.value,
      defaultProp: "defaultValue",
      defaultValue: entry.defaultValue,
      handlerProp: "onValueChange",
      handler: entry.onValueChange,
    });
  }
  const value = controlled
    ? entry.value
    : root.getStored<string | undefined>(entry.key, entry.defaultValue);
  const onChoose = (next: string) => {
    if (!controlled) root.setStored(entry.key, next);
    if (next !== value) entry.onValueChange?.(next);
  };
  return (
    <div
      role="group"
      aria-labelledby={entry.label != null ? labelId : undefined}
    >
      {entry.label != null && (
        <div id={labelId} className={styles.label}>
          {entry.label}
        </div>
      )}
      {entry.items.map((item) => (
        <RadioItem
          key={item.value}
          item={item}
          group={entry}
          value={value}
          onChoose={onChoose}
        />
      ))}
    </div>
  );
};

const SubmenuItem = ({ entry }: { entry: MenuAction }) => {
  const root = useMenuRoot();
  const panel = usePanel();
  const [item, setItem] = useState<HTMLDivElement | null>(null);
  const itemId = useId();
  const subId = useId();
  const open = panel.openSub === entry.key && !entry.disabled;
  const openSub = (intent: FocusIntent) => panel.openSubmenu(entry.key, intent);
  return (
    <>
      <ItemShell
        role="menuitem"
        id={itemId}
        label={entry.label}
        textValue={entry.textValue}
        icon={entry.icon}
        shortcut={entry.shortcut}
        disabled={entry.disabled}
        subKey={entry.key}
        onElement={setItem}
        attributes={{
          "aria-haspopup": "menu",
          "aria-expanded": open,
          "aria-controls": open ? subId : undefined,
          "data-state": open ? "open" : "closed",
        }}
        trailing={
          <IconChevronRight
            className={styles.chevron}
            size={16}
            aria-hidden="true"
          />
        }
        api={{ activate: openSub, openSub }}
      />
      <MenuPanel
        entries={entry.children ?? []}
        open={open}
        onClose={() => panel.closeSubmenu(entry.key)}
        anchor={item}
        placement={root.dir === "rtl" ? "left-start" : "right-start"}
        offset={SUB_OFFSET}
        consumeIntent={panel.consumeSubIntent}
        restoreFocus={() => item}
        branches={() => [item]}
        id={subId}
        parentItem={item}
        labelledBy={itemId}
        onElement={panel.setSubElement}
      />
    </>
  );
};

/** Submenus overlap the parent's padding so their first item lines up. */
const SUB_OFFSET = { mainAxis: 4, crossAxis: -5 };

/** Renders entries (items, separators, groups, submenus) recursively. */
const Entries = ({ entries }: { entries: MenuEntry[] }) => (
  <>
    {entries.map((entry) => {
      if ("type" in entry) {
        switch (entry.type) {
          case "separator":
            return (
              <div
                key={entry.key}
                role="separator"
                aria-orientation="horizontal"
                className={styles.separator}
              />
            );
          case "group":
            return (
              <Group
                key={entry.key}
                label={entry.label}
                entries={entry.items}
              />
            );
          case "checkbox":
            return <CheckboxItem key={entry.key} entry={entry} />;
          case "radio-group":
            return <RadioGroup key={entry.key} entry={entry} />;
        }
      }
      const action = entry as MenuAction;
      return action.children?.length ? (
        <SubmenuItem key={action.key} entry={action} />
      ) : (
        <ActionItem key={action.key} entry={action} />
      );
    })}
  </>
);

const Group = ({
  label,
  entries,
}: {
  label: ReactNode;
  entries: MenuEntry[];
}) => {
  const labelId = useId();
  return (
    <div role="group" aria-labelledby={labelId}>
      <div id={labelId} className={styles.label}>
        {label}
      </div>
      <Entries entries={entries} />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Root                                                                       */
/* -------------------------------------------------------------------------- */

export interface MenuRootProps {
  items: MenuEntry[];
  onSelect?: (item: MenuAction) => void;
  closeOnSelect: boolean;
  size: MenuSize;
  loop: boolean;
  dir: MenuDirection;
  modal: boolean;
  className?: string;
  "aria-label"?: string;
  labelledBy?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  anchor: Element | VirtualElement | null;
  placement: Placement;
  offset: { mainAxis: number; crossAxis: number };
  contentId: string;
  /** The trigger (part of the layer). */
  trigger: HTMLElement | null;
  /** Default focus target on close (the trigger). */
  getRestoreTarget: () => HTMLElement | null;
  consumeIntent: () => FocusIntent;
  /** Pointer down outside; `preventDefault()` keeps the menu open. */
  onPointerDownOutside?: (event: PointerEvent) => void;
  /** Container in which Tab moves on (the enclosing layer, else the body). */
  tabContainer: Element | null;
}

/**
 * Shared root of Menu and ContextMenu: owns the uncontrolled checkbox /
 * radio state, focus restoration and the root panel.
 */
export const MenuRoot = ({
  items,
  onSelect,
  closeOnSelect,
  size,
  loop,
  dir,
  modal,
  className,
  "aria-label": ariaLabel,
  labelledBy,
  open,
  setOpen,
  anchor,
  placement,
  offset,
  contentId,
  trigger,
  getRestoreTarget,
  consumeIntent,
  onPointerDownOutside,
  tabContainer,
}: MenuRootProps) => {
  const [stored, setStoredState] = useState<Record<string, unknown>>({});
  // Focus target on close: `undefined` = the trigger, `null` = leave focus.
  const restoreOverride = useRef<HTMLElement | null | undefined>(undefined);

  const close = useCallback(() => setOpen(false), [setOpen]);

  const context = useMemo<MenuRootContextValue>(
    () => ({
      onSelect,
      closeOnSelect,
      size,
      loop,
      dir,
      modal,
      close,
      closeWithTab: (backwards) => {
        const from = getRestoreTarget();
        const container = tabContainer ?? from?.ownerDocument.body;
        restoreOverride.current =
          from && container
            ? (adjacentTabbable(from, container, backwards) ?? from)
            : undefined;
        close();
      },
      getStored: <T,>(key: string, fallback: T) =>
        key in stored ? (stored[key] as T) : fallback,
      setStored: (key, value) =>
        setStoredState((prev) => ({ ...prev, [key]: value })),
    }),
    [
      onSelect,
      closeOnSelect,
      size,
      loop,
      dir,
      modal,
      close,
      getRestoreTarget,
      tabContainer,
      stored,
    ],
  );

  const consume = useCallback(() => {
    restoreOverride.current = undefined;
    return consumeIntent();
  }, [consumeIntent]);

  return (
    <MenuRootContext.Provider value={context}>
      <MenuPanel
        entries={items}
        open={open}
        onClose={close}
        anchor={anchor}
        placement={placement}
        offset={offset}
        consumeIntent={consume}
        restoreFocus={() =>
          restoreOverride.current === undefined
            ? getRestoreTarget()
            : restoreOverride.current
        }
        branches={() => [trigger]}
        id={contentId}
        className={className}
        aria-label={ariaLabel}
        labelledBy={labelledBy}
        onPointerDownOutside={(event) => {
          onPointerDownOutside?.(event);
          // Like a native menu: a non-modal menu (or a right click) leaves
          // focus where the outside interaction put it.
          if (!event.defaultPrevented && (!modal || event.button === 2)) {
            restoreOverride.current = null;
          }
        }}
      />
    </MenuRootContext.Provider>
  );
};
