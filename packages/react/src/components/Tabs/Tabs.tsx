import {
  createContext,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { getNextIndex } from "@minerva/core";
import { cn } from "../../utils/cn";
import { useMergedRefs } from "../../internal/mergeRefs";
import { useControllableState } from "../../internal/useControllableState";
import { warnControlledProps, warnOnce } from "../../internal/devWarnings";
import { composeEventHandlers } from "../../internal/composeEventHandlers";
import type {
  TabListProps,
  TabPanelProps,
  TabProps,
  TabsOrientation,
  TabsProps,
  TabsVariant,
} from "./types";
import { resolveDirection } from "../../internal/direction";
import { hooks } from "../../internal/stylingHooks";
import styles from "./tabs.module.scss";

interface TabsContextValue {
  baseId: string;
  value: string | undefined;
  select: (value: string) => void;
  variant: TabsVariant;
  orientation: TabsOrientation;
  /** Explicit `dir` prop; `undefined` inherits the direction from the DOM. */
  dir: "ltr" | "rtl" | undefined;
  activationMode: "automatic" | "manual";
}

// Each Tabs provides its own context, so nested Tabs never share selection,
// ids or styles (variant / orientation are applied on the list and the tabs
// themselves, not through descendant selectors).
const TabsContext = createContext<TabsContextValue>({
  baseId: "tabs",
  value: undefined,
  select: () => {},
  variant: "line",
  orientation: "horizontal",
  dir: undefined,
  activationMode: "automatic",
});

/** Id of the tab whose roving tabIndex is 0 when the selected tab can't be. */
const TabStopContext = createContext<string | undefined>(undefined);

const tabId = (baseId: string, value: string) => `${baseId}-tab-${value}`;
const panelId = (baseId: string, value: string) => `${baseId}-panel-${value}`;

/** The `role="tab"` buttons owned by `list` (not those of nested Tabs). */
const getOwnTabs = (list: HTMLElement) =>
  Array.from(list.querySelectorAll<HTMLButtonElement>('[role="tab"]')).filter(
    (tab) => tab.closest('[role="tablist"]') === list,
  );

/**
 * Tabs: accessible tabs (WAI-ARIA tabs pattern) with line / enclosed / soft /
 * pills variants, semantic colors and horizontal or vertical orientation.
 */
export const Tabs = ({
  variant = "line",
  color = "primary",
  orientation = "horizontal",
  activationMode = "automatic",
  dir,
  value: valueProp,
  defaultValue,
  onChange,
  className,
  children,
  ref,
  ...rest
}: TabsProps) => {
  const baseId = useId();
  if (process.env.NODE_ENV !== "production") {
    warnControlledProps("Tabs", {
      prop: "value",
      value: valueProp,
      defaultProp: "defaultValue",
      defaultValue,
      handlerProp: "onChange",
      handler: onChange,
    });
  }
  const [value, setValue] = useControllableState<string | undefined>({
    value: valueProp,
    defaultValue,
    onChange: onChange as ((value: string | undefined) => void) | undefined,
    name: "Tabs",
  });

  return (
    <TabsContext.Provider
      value={{
        baseId,
        value,
        select: setValue,
        variant,
        orientation,
        dir,
        activationMode,
      }}
    >
      <div
        ref={ref}
        dir={dir}
        className={cn(
          styles.tabs,
          styles[color],
          orientation === "vertical" && styles.vertical,
          className,
        )}
        {...rest}
        {...hooks("tabs", "root", { orientation, variant, color })}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

/**
 * TabList: the `role="tablist"` container. Arrow keys (per orientation and
 * direction), Home and End move focus among its enabled tabs. It scrolls
 * (without a visible scrollbar) and keeps the selected tab in view after
 * async option updates and resizes, without scrolling the page or moving
 * focus.
 */
export const TabList = ({
  className,
  loop = true,
  onKeyDown,
  ref,
  ...rest
}: TabListProps) => {
  const { baseId, value, variant, orientation, dir } = useContext(TabsContext);
  const listRef = useRef<HTMLDivElement>(null);
  const mergedRef = useMergedRefs(listRef, ref);
  const [fallbackStop, setFallbackStop] = useState<string>();

  // The selected tab is the tab stop; when there is none (no value, or the
  // selected tab is disabled / missing) the first enabled tab is.
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const update = () => {
      const tabs = getOwnTabs(list);
      const selectedId = value === undefined ? undefined : tabId(baseId, value);
      const selectedFocusable = tabs.some(
        (tab) => tab.id === selectedId && !tab.disabled,
      );
      setFallbackStop(
        selectedFocusable ? undefined : tabs.find((tab) => !tab.disabled)?.id,
      );
    };
    update();
    if (process.env.NODE_ENV !== "production") {
      // Checked when the value or the list changes, not on later mutations
      // (tabs loaded asynchronously).
      const tabs = getOwnTabs(list);
      const selectedId = value === undefined ? undefined : tabId(baseId, value);
      if (
        selectedId &&
        tabs.length > 0 &&
        !tabs.some((t) => t.id === selectedId)
      ) {
        warnOnce(
          "Tabs:value",
          `[minerva] Tabs: \`value\` "${value}" does not match any Tab. ` +
            "Pass the `value` of one of the rendered tabs.",
        );
      }
    }
    // Tabs added, removed or (un)disabled without a selection change.
    const observer = new MutationObserver(update);
    observer.observe(list, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["disabled"],
    });
    return () => observer.disconnect();
  }, [baseId, value]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const reveal = () => {
      const selected = getOwnTabs(list).find(
        (tab) => tab.getAttribute("data-state") === "active",
      );
      if (!selected) return;
      // Scroll only the list (never scrollIntoView, which scrolls the page).
      const item = selected.getBoundingClientRect();
      const box = list.getBoundingClientRect();
      if (orientation === "horizontal") {
        if (item.left < box.left) list.scrollLeft += item.left - box.left;
        else if (item.right > box.right)
          list.scrollLeft += item.right - box.right;
      } else if (item.top < box.top) list.scrollTop += item.top - box.top;
      else if (item.bottom > box.bottom)
        list.scrollTop += item.bottom - box.bottom;
    };
    reveal();
    const mutations = new MutationObserver(reveal);
    mutations.observe(list, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["data-state"],
    });
    const resize =
      typeof ResizeObserver === "undefined"
        ? undefined
        : new ResizeObserver(reveal);
    resize?.observe(list);
    return () => {
      mutations.disconnect();
      resize?.disconnect();
    };
  }, [orientation]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const list = event.currentTarget;
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const tabs = getOwnTabs(list);
    const currentIndex = tabs.indexOf(event.target as HTMLButtonElement);
    // Keys from nested Tabs (or other descendants) are not ours.
    if (currentIndex === -1) return;
    const next = getNextIndex({
      currentIndex,
      count: tabs.length,
      key: event.key,
      orientation,
      dir: resolveDirection(dir, list),
      loop,
      isDisabled: (index) => tabs[index].disabled,
    });
    if (next === null) return;
    event.preventDefault();
    tabs[next].focus();
  };

  return (
    <TabStopContext.Provider value={fallbackStop}>
      {/* The tabs are the focusable elements, not the tablist itself. */}
      {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
      <div
        ref={mergedRef}
        role="tablist"
        aria-orientation={orientation}
        className={cn(
          styles.list,
          styles[`${variant}List`],
          orientation === "vertical" && styles.verticalList,
          className,
        )}
        onKeyDown={composeEventHandlers(onKeyDown, handleKeyDown)}
        {...rest}
        {...hooks("tabs", "list", { orientation, variant })}
      />
    </TabStopContext.Provider>
  );
};

/** Tab: a `role="tab"` trigger button. */
export const Tab = ({
  value,
  className,
  children,
  color,
  disabled = false,
  onMouseDown,
  onKeyDown,
  onFocus,
  onClick,
  ref,
  ...rest
}: TabProps) => {
  const {
    baseId,
    value: selectedValue,
    select,
    variant,
    orientation,
    activationMode,
  } = useContext(TabsContext);
  const fallbackStop = useContext(TabStopContext);
  const id = tabId(baseId, value);
  const selected = value === selectedValue;
  const isTabStop = fallbackStop === undefined ? selected : fallbackStop === id;

  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (event.button === 0 && !event.ctrlKey) select(value);
    // Keep focus where it is on ctrl-click / other buttons (context menus).
    else event.preventDefault();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled || (event.key !== "Enter" && event.key !== " ")) return;
    // Handled here, so suppress the native button click activation.
    event.preventDefault();
    select(value);
  };

  const handleFocus = () => {
    if (!disabled && !selected && activationMode === "automatic") select(value);
  };

  // Assistive technologies may activate with a bare click (no mouse down).
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!disabled && event.detail === 0) select(value);
  };

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      id={id}
      aria-selected={selected}
      aria-controls={panelId(baseId, value)}
      disabled={disabled}
      tabIndex={isTabStop ? 0 : -1}
      className={cn(
        styles.trigger,
        styles[`${variant}Trigger`],
        orientation === "vertical" && styles.verticalTrigger,
        color && styles[color],
        color && styles.colored,
        className,
      )}
      onMouseDown={composeEventHandlers(onMouseDown, handleMouseDown)}
      onKeyDown={composeEventHandlers(onKeyDown, handleKeyDown)}
      onFocus={composeEventHandlers(onFocus, handleFocus)}
      onClick={composeEventHandlers(onClick, handleClick)}
      {...rest}
      {...hooks("tab", "root", {
        state: selected ? "active" : "inactive",
        disabled,
        orientation,
        variant,
        color,
      })}
    >
      {children}
    </button>
  );
};

/**
 * TabPanel: the `role="tabpanel"` content of the tab with the same value.
 * Inactive panels are unmounted unless `forceMount`, which keeps them in the
 * DOM with the `hidden` attribute.
 */
export const TabPanel = ({
  value,
  className,
  forceMount = false,
  children,
  ref,
  ...rest
}: TabPanelProps) => {
  const { baseId, value: selectedValue, orientation } = useContext(TabsContext);
  const selected = value === selectedValue;
  if (!selected && !forceMount) return null;
  return (
    <div
      ref={ref}
      role="tabpanel"
      id={panelId(baseId, value)}
      aria-labelledby={tabId(baseId, value)}
      hidden={!selected}
      tabIndex={0}
      className={cn(styles.panel, className)}
      {...rest}
      {...hooks("tab-panel", "root", {
        state: selected ? "active" : "inactive",
        orientation,
      })}
    >
      {children}
    </div>
  );
};
