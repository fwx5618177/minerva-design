import * as RadixTabs from "@radix-ui/react-tabs";
import { createContext, useContext, useEffect, useRef } from "react";
import { cn } from "../../utils/cn";
import { useMergedRefs } from "../../internal/mergeRefs";
import type {
  TabListProps,
  TabPanelProps,
  TabProps,
  TabsOrientation,
  TabsProps,
  TabsVariant,
} from "./types";
import styles from "./tabs.module.scss";

interface TabsContextValue {
  variant: TabsVariant;
  orientation: TabsOrientation;
}

// Variant / orientation are applied on the list and the triggers themselves
// (not through descendant selectors), so nested Tabs never inherit styles.
const TabsContext = createContext<TabsContextValue>({
  variant: "line",
  orientation: "horizontal",
});

/**
 * Tabs: accessible tabs (Radix Tabs) with line / enclosed / soft / pills
 * variants, semantic colors and horizontal or vertical orientation.
 */
export const Tabs = ({
  variant = "line",
  color = "primary",
  orientation = "horizontal",
  value,
  defaultValue,
  onChange,
  className,
  children,
  ref,
  ...rest
}: TabsProps) => (
  <TabsContext.Provider value={{ variant, orientation }}>
    <RadixTabs.Root
      ref={ref}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onChange}
      orientation={orientation}
      className={cn(
        styles.tabs,
        styles[color],
        orientation === "vertical" && styles.vertical,
        className,
      )}
      {...rest}
    >
      {children}
    </RadixTabs.Root>
  </TabsContext.Provider>
);

/**
 * TabList: the `role="tablist"` container. It scrolls (without a visible
 * scrollbar) and keeps the selected tab in view after async option updates
 * and resizes, without scrolling the page or moving focus.
 */
export const TabList = ({ className, ref, ...rest }: TabListProps) => {
  const { variant, orientation } = useContext(TabsContext);
  const listRef = useRef<HTMLDivElement>(null);
  const mergedRef = useMergedRefs(listRef, ref);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const reveal = () => {
      const selected = Array.from(
        list.querySelectorAll<HTMLElement>('[role="tab"][data-state="active"]'),
      ).find((tab) => tab.closest('[role="tablist"]') === list);
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

  return (
    <RadixTabs.List
      ref={mergedRef}
      className={cn(
        styles.list,
        styles[`${variant}List`],
        orientation === "vertical" && styles.verticalList,
        className,
      )}
      {...rest}
    />
  );
};

/** Tab: a `role="tab"` trigger button. */
export const Tab = ({ className, children, color, ref, ...rest }: TabProps) => {
  const { variant, orientation } = useContext(TabsContext);
  return (
    <RadixTabs.Trigger
      ref={ref}
      className={cn(
        styles.trigger,
        styles[`${variant}Trigger`],
        orientation === "vertical" && styles.verticalTrigger,
        color && styles[color],
        color && styles.colored,
        className,
      )}
      {...rest}
    >
      {children}
    </RadixTabs.Trigger>
  );
};

/** TabPanel: the `role="tabpanel"` content of the tab with the same value. */
export const TabPanel = ({
  className,
  forceMount,
  ref,
  ...rest
}: TabPanelProps) => (
  <RadixTabs.Content
    ref={ref}
    forceMount={forceMount || undefined}
    className={cn(styles.panel, className)}
    {...rest}
  />
);
