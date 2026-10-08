// Tabs (WAI-ARIA tabs pattern): selected value, focused tab, keyboard
// navigation (arrows per orientation / direction, Home / End, optional
// wrapping) and automatic or manual activation. Renderers that discover
// their tabs at runtime (DOM children) pass them with the events.
import { getNextIndex, type Direction } from "../keyboard-navigation";
import { createMachine, type Machine } from "./store";

export type TabsMachineOrientation = "horizontal" | "vertical";
export type TabsActivation = "automatic" | "manual";

/** A tab of the list. */
export interface TabsItem {
  value: string;
  disabled?: boolean;
}

export interface TabsProps {
  /** Controlled selected value (`undefined`: uncontrolled). */
  value?: string;
  /** Initial selected value while uncontrolled. */
  defaultValue?: string;
  /** Tabs in order (events may pass their own list). @default [] */
  tabs?: readonly TabsItem[];
  /** @default "horizontal" */
  orientation?: TabsMachineOrientation;
  /** Reading direction (ArrowLeft / ArrowRight swap in RTL). @default "ltr" */
  dir?: Direction;
  /** Arrow keys wrap around at both ends. @default true */
  loop?: boolean;
  /**
   * "automatic": a tab is selected when it receives focus; "manual": with
   * Enter / Space / click only. @default "automatic"
   */
  activationMode?: TabsActivation;
  /** Called with the requested value (controlled or not). */
  onValueChange?: (value: string) => void;
}

export interface TabsState {
  value: string | undefined;
  /** Tab holding the focus (`undefined`: focus outside the tabs). */
  focusedValue: string | undefined;
}

export type TabsEvent =
  /** Click / Enter / Space on a tab. */
  | { type: "SELECT"; value: string; disabled?: boolean }
  /** A tab received focus (selects it in automatic mode). */
  | { type: "FOCUS"; value: string; disabled?: boolean }
  | { type: "BLUR" }
  /**
   * A key pressed on the tab list: moves `focusedValue` (the renderer then
   * focuses that tab, which sends FOCUS). `from` defaults to the focused
   * (else selected) tab.
   */
  | {
      type: "NAVIGATE";
      key: string;
      from?: string;
      tabs?: readonly TabsItem[];
    };

export type TabsMachine = Machine<TabsState, TabsEvent, TabsProps>;

export interface TabsNavigationOptions {
  key: string;
  currentIndex: number;
  tabs: readonly Pick<TabsItem, "disabled">[];
  orientation?: TabsMachineOrientation;
  dir?: Direction;
  loop?: boolean;
}

/**
 * Index of the tab a key moves the focus to (enabled tabs only), or `null`
 * when the key is not a navigation key for this orientation.
 */
export const getTabsNavigationIndex = ({
  key,
  currentIndex,
  tabs,
  orientation = "horizontal",
  dir = "ltr",
  loop = true,
}: TabsNavigationOptions): number | null =>
  getNextIndex({
    currentIndex,
    count: tabs.length,
    key,
    orientation,
    dir,
    loop,
    isDisabled: (index) => !!tabs[index].disabled,
  });

/**
 * The tab holding the roving tab stop: the selected tab when it is enabled,
 * else the first enabled one (`undefined` when every tab is disabled).
 */
export const getTabsTabStop = <T extends TabsItem>(
  tabs: readonly T[],
  value: string | undefined,
): T | undefined =>
  tabs.find((tab) => tab.value === value && !tab.disabled) ??
  tabs.find((tab) => !tab.disabled);

const isTabDisabled = (
  tabs: readonly TabsItem[] | undefined,
  value: string,
  explicit: boolean | undefined,
) => explicit ?? tabs?.find((tab) => tab.value === value)?.disabled ?? false;

/** Creates a tabs machine. */
export function createTabsMachine(props: TabsProps = {}): TabsMachine {
  return createMachine<TabsState, TabsEvent, TabsProps>(
    {
      controlled: ["value"],
      initial: (p) => ({
        value: p.value ?? p.defaultValue,
        focusedValue: undefined,
      }),
      reduce(state, event, p) {
        switch (event.type) {
          case "SELECT":
            if (isTabDisabled(p.tabs, event.value, event.disabled)) {
              return state;
            }
            return event.value === state.value
              ? state
              : { ...state, value: event.value };
          case "FOCUS": {
            const disabled = isTabDisabled(p.tabs, event.value, event.disabled);
            const select =
              !disabled &&
              (p.activationMode ?? "automatic") === "automatic" &&
              event.value !== state.value;
            return {
              focusedValue: event.value,
              value: select ? event.value : state.value,
            };
          }
          case "BLUR":
            return state.focusedValue === undefined
              ? state
              : { ...state, focusedValue: undefined };
          case "NAVIGATE": {
            const tabs = event.tabs ?? p.tabs ?? [];
            const from = event.from ?? state.focusedValue ?? state.value;
            const next = getTabsNavigationIndex({
              key: event.key,
              currentIndex: tabs.findIndex((tab) => tab.value === from),
              tabs,
              orientation: p.orientation,
              dir: p.dir,
              loop: p.loop,
            });
            if (next === null) return state;
            return { ...state, focusedValue: tabs[next].value };
          }
          default:
            return state;
        }
      },
      changed(requested, prev, p) {
        if (requested.value !== prev.value && requested.value !== undefined) {
          p.onValueChange?.(requested.value);
        }
      },
    },
    props,
  );
}
