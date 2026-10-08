import { inject, type ComputedRef, type InjectionKey, type Ref } from "vue";
import type { TabsEvent } from "@minerva/core";
import type { TabsOrientation, TabsVariant } from "./types";

export interface TabsContext {
  baseId: string;
  value: ComputedRef<string | undefined>;
  /** Sends an event to the tabs machine (selection, focus) */
  send: (event: TabsEvent) => void;
  variant: ComputedRef<TabsVariant>;
  orientation: ComputedRef<TabsOrientation>;
  /** Explicit `dir` prop; `undefined` inherits the direction from the DOM */
  dir: ComputedRef<"ltr" | "rtl" | undefined>;
}

// Each Tabs provides its own context, so nested Tabs never share selection,
// ids or styles.
export const TABS_KEY: InjectionKey<TabsContext> = Symbol("MinervaTabs");

/** Id of the tab whose roving tabindex is 0 when the selected tab can't be */
export const TAB_STOP_KEY: InjectionKey<Ref<string | undefined>> =
  Symbol("MinervaTabStop");

export function useTabsContext(component: string): TabsContext {
  const context = inject(TABS_KEY, null);
  if (!context) throw new Error(`${component} must be used inside <Tabs>.`);
  return context;
}

export const tabId = (baseId: string, value: string) =>
  `${baseId}-tab-${value}`;
export const panelId = (baseId: string, value: string) =>
  `${baseId}-panel-${value}`;

/** The `role="tab"` buttons owned by `list` (not those of nested Tabs) */
export const getOwnTabs = (list: HTMLElement) =>
  Array.from(list.querySelectorAll<HTMLButtonElement>('[role="tab"]')).filter(
    (tab) => tab.closest('[role="tablist"]') === list,
  );
