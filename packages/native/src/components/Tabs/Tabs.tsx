import {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import {
  createTabsMachine,
  type TabsActivation,
  type TabsItem as TabsMachineItem,
  type TabsMachineOrientation,
} from "@minerva/core";
import { useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";
import { useMachine } from "../../internal/useMachine";
import {
  colorRole,
  duration,
  hitSlopFor,
  shadowStyle,
  weight,
  type NativeColor,
} from "../../internal/styles";

export type TabsVariant = "line" | "pills" | "soft" | "enclosed";
export type TabsColor = NativeColor;

/** A tab of the data API (`items`) */
export interface TabsItemData {
  /** Value identifying the tab and its panel */
  value: string;
  /** Visible label of the tab */
  label: ReactNode;
  /** Disables the tab */
  disabled?: boolean;
  /** Count or short text shown in a small badge after the label */
  badge?: ReactNode;
  /** Panel content (renders a TabPanel for the tab) */
  content?: ReactNode;
}

export interface TabsProps extends Omit<ViewProps, "style" | "children"> {
  /** Value of the selected tab (controlled; pair with onChange) */
  value?: string;
  /**
   * Value of the initially selected tab (uncontrolled); the first enabled
   * tab when omitted
   */
  defaultValue?: string;
  /** Called with the value of the tab the user selects */
  onChange?: (value: string) => void;
  /**
   * Layout of the tab list
   * @default "horizontal"
   */
  orientation?: TabsMachineOrientation;
  /**
   * `automatic` selects a tab when it receives (keyboard) focus; `manual`
   * only on press
   * @default "automatic"
   */
  activationMode?: TabsActivation;
  /**
   * Visual style: `line` (animated underline), `pills` (filled pill),
   * `soft` (tinted background) or `enclosed` (segmented control)
   * @default "line"
   */
  variant?: TabsVariant;
  /**
   * Color of the selection
   * @default "primary"
   */
  color?: TabsColor;
  /**
   * Data API: the tabs (and optional panel contents) rendered as a
   * TabList (+ TabPanels) before the children
   */
  items?: readonly TabsItemData[];
  /** Accessible label of the tab list rendered from `items` */
  listLabel?: string;
  /**
   * Scrollable tab list of the `items` API
   * @default true with more than 4 items
   */
  scrollable?: boolean;
  /** TabList and TabPanel elements (or any content) */
  children?: ReactNode;
  /** Style of the root view */
  style?: StyleProp<ViewStyle>;
}

export interface TabListProps extends Omit<ViewProps, "style" | "children"> {
  /** The Tab elements */
  children?: ReactNode;
  /** Accessible label of the tab list (alias of `accessibilityLabel`) */
  "aria-label"?: string;
  /**
   * Moves focus from the last tab to the first (and back) with the arrow
   * keys (react-native-web)
   * @default true
   */
  loop?: boolean;
  /**
   * Horizontal scrolling list (natural tab widths) instead of equal-width
   * tabs
   * @default true with more than 4 tabs
   */
  scrollable?: boolean;
  /** Style of the list */
  style?: StyleProp<ViewStyle>;
}

export interface TabProps extends Omit<
  PressableProps,
  "children" | "style" | "disabled" | "onPress"
> {
  /** Value identifying the tab and its panel */
  value: string;
  /** Label: a string (rendered as Text) or any element */
  children?: ReactNode;
  /**
   * Disables the tab
   * @default false
   */
  disabled?: boolean;
  /** Overrides the group color */
  color?: TabsColor;
  /** Count or short text shown in a small badge after the label */
  badge?: ReactNode;
  /** Called on press (after the selection) */
  onPress?: (event: GestureResponderEvent) => void;
  /** Style of the tab */
  style?: StyleProp<ViewStyle>;
  /** Style of the label text */
  textStyle?: StyleProp<TextStyle>;
}

export interface TabPanelProps extends Omit<ViewProps, "style" | "children"> {
  /** Value of the tab this panel belongs to */
  value: string;
  /**
   * Keeps the panel mounted (hidden) while its tab is not selected
   * @default false
   */
  forceMount?: boolean;
  /** Panel content */
  children?: ReactNode;
  /** Style of the panel */
  style?: StyleProp<ViewStyle>;
}

interface TabLayout {
  x: number;
  width: number;
}

interface TabsContextValue {
  value: string | undefined;
  select: (value: string, disabled: boolean) => void;
  focus: (value: string, disabled: boolean) => void;
  variant: TabsVariant;
  color: TabsColor;
  orientation: TabsMachineOrientation;
}

interface TabListContextValue {
  scrollable: boolean;
  reportLayout: (value: string, layout: TabLayout) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);
const TabListContext = createContext<TabListContextValue | null>(null);

const useTabs = (name: string): TabsContextValue => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error(`<${name}> must be rendered inside <Tabs>`);
  return ctx;
};

const AUTO_SCROLL_COUNT = 4;

/** Tab elements found in a tree of children (value + disabled) */
function collectTabs(children: ReactNode, out: TabsMachineItem[] = []) {
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    const props = child.props as {
      value?: unknown;
      disabled?: boolean;
      children?: ReactNode;
    };
    if (child.type === Tab && typeof props.value === "string") {
      out.push({ value: props.value, disabled: !!props.disabled });
    } else if (props.children !== undefined) {
      collectTabs(props.children, out);
    }
  });
  return out;
}

/**
 * Tabs: a tab list and the panel of the selected tab, on the tabs machine
 * of @minerva/core (controlled `value` or uncontrolled `defaultValue`).
 *
 *   <Tabs defaultValue="a">
 *     <TabList aria-label="Letters">
 *       <Tab value="a">Alpha</Tab>
 *       <Tab value="b">Beta</Tab>
 *     </TabList>
 *     <TabPanel value="a">...</TabPanel>
 *     <TabPanel value="b">...</TabPanel>
 *   </Tabs>
 *
 * or with data: `<Tabs items={[{ value: "a", label: "Alpha" }]} />`.
 */
export function Tabs({
  value,
  defaultValue,
  onChange,
  orientation = "horizontal",
  activationMode = "automatic",
  variant = "line",
  color = "primary",
  items,
  listLabel,
  scrollable,
  children,
  style,
  ...rest
}: TabsProps) {
  const tabs = useMemo(
    () =>
      items
        ? items.map((item) => ({
            value: item.value,
            disabled: !!item.disabled,
          }))
        : collectTabs(children),
    [items, children],
  );
  const [state, send] = useMachine(createTabsMachine, {
    value,
    defaultValue,
    tabs,
    orientation,
    activationMode,
    onValueChange: onChange,
  });
  const selected = state.value ?? tabs.find((tab) => !tab.disabled)?.value;

  const select = useCallback(
    (next: string, disabled: boolean) =>
      send({ type: "SELECT", value: next, disabled }),
    [send],
  );
  const focus = useCallback(
    (next: string, disabled: boolean) =>
      send({ type: "FOCUS", value: next, disabled }),
    [send],
  );
  const ctx = useMemo<TabsContextValue>(
    () => ({ value: selected, select, focus, variant, color, orientation }),
    [selected, select, focus, variant, color, orientation],
  );

  return (
    <TabsContext.Provider value={ctx}>
      <View
        {...part("tabs", "root", { variant, color, orientation })}
        {...rest}
        style={[orientation === "vertical" && { flexDirection: "row" }, style]}
      >
        {items ? (
          <>
            <TabList
              aria-label={listLabel}
              scrollable={scrollable ?? items.length > AUTO_SCROLL_COUNT}
            >
              {items.map((item) => (
                <Tab
                  key={item.value}
                  value={item.value}
                  disabled={item.disabled}
                  badge={item.badge}
                >
                  {item.label}
                </Tab>
              ))}
            </TabList>
            {items.map((item) =>
              item.content === undefined ? null : (
                <TabPanel key={item.value} value={item.value}>
                  {item.content}
                </TabPanel>
              ),
            )}
          </>
        ) : null}
        {children}
      </View>
    </TabsContext.Provider>
  );
}

/**
 * The row of tabs (`role="tablist"`, not an accessibility element itself).
 * Equal-width tabs, or a horizontal ScrollView when `scrollable` (default
 * with more than 4 tabs). The `line` variant animates an underline under
 * the selected tab.
 */
export function TabList({
  children,
  "aria-label": ariaLabel,
  accessibilityLabel,
  loop = true,
  scrollable,
  style,
  ...rest
}: TabListProps) {
  const { tokens: t } = useTheme();
  const { value, variant, color, orientation, focus } = useTabs("TabList");
  const role = colorRole(t, color);
  const vertical = orientation === "vertical";
  const count = Children.toArray(children).filter(isValidElement).length;
  const scroll = !vertical && (scrollable ?? count > AUTO_SCROLL_COUNT);

  const [layouts, setLayouts] = useState<Record<string, TabLayout>>({});
  const reportLayout = useCallback((tab: string, layout: TabLayout) => {
    setLayouts((prev) => {
      const old = prev[tab];
      return old && old.x === layout.x && old.width === layout.width
        ? prev
        : { ...prev, [tab]: layout };
    });
  }, []);
  const listCtx = useMemo(
    () => ({ scrollable: scroll, reportLayout }),
    [scroll, reportLayout],
  );

  // Animated underline of the `line` variant
  const target = value === undefined ? undefined : layouts[value];
  const [left] = useState(() => new Animated.Value(0));
  const [width] = useState(() => new Animated.Value(0));
  const placed = useRef(false);
  const ms = duration(t, "base");
  useEffect(() => {
    if (!target || variant !== "line" || vertical) return;
    if (!placed.current || ms <= 0) {
      placed.current = true;
      left.setValue(target.x);
      width.setValue(target.width);
      return;
    }
    const animation = Animated.parallel([
      Animated.timing(left, {
        toValue: target.x,
        duration: ms,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.timing(width, {
        toValue: target.width,
        duration: ms,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
    ]);
    animation.start();
    return () => animation.stop();
  }, [target, variant, vertical, ms, left, width]);

  // Keeps the selected tab in view
  const scrollRef = useRef<ScrollView>(null);
  const [viewport, setViewport] = useState(0);
  useEffect(() => {
    if (!scroll || !target || !viewport) return;
    const x = Math.max(0, target.x + target.width / 2 - viewport / 2);
    scrollRef.current?.scrollTo?.({ x, animated: ms > 0 });
  }, [scroll, target, viewport, ms]);

  // Arrow keys (react-native-web): move the selection like the web tabs
  const values = useMemo(
    () =>
      Children.toArray(children)
        .filter(isValidElement)
        .map((child) => child.props as TabProps)
        .filter((p) => typeof p.value === "string"),
    [children],
  );
  const onKeyDown = (event: { nativeEvent: { key: string } }) => {
    const enabled = values.filter((p) => !p.disabled);
    if (!enabled.length) return;
    const index = enabled.findIndex((p) => p.value === value);
    const key = event.nativeEvent.key;
    const prevKey = vertical ? "ArrowUp" : "ArrowLeft";
    const nextKey = vertical ? "ArrowDown" : "ArrowRight";
    let next: number | null = null;
    if (key === nextKey)
      next = index + 1 < enabled.length ? index + 1 : loop ? 0 : index;
    else if (key === prevKey)
      next = index > 0 ? index - 1 : loop ? enabled.length - 1 : index;
    else if (key === "Home") next = 0;
    else if (key === "End") next = enabled.length - 1;
    if (next !== null && next !== index) focus(enabled[next].value, false);
  };

  const listStyle: ViewStyle =
    variant === "enclosed"
      ? {
          backgroundColor: t.colors["surface-muted-color"],
          borderRadius: t.radius.lg,
          padding: t.space["1"],
        }
      : variant === "line"
        ? vertical
          ? {
              borderRightWidth: StyleSheet.hairlineWidth,
              borderRightColor: t.colors["border-color"],
            }
          : {
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: t.colors["border-color"],
            }
        : { gap: t.space["2"] };

  const indicator =
    variant === "line" && !vertical && target ? (
      <Animated.View
        pointerEvents="none"
        {...part("tabs", "indicator")}
        style={{
          position: "absolute",
          bottom: 0,
          left,
          width,
          height: 3,
          borderRadius: 3,
          backgroundColor: role.solid,
        }}
      />
    ) : null;

  const row = (
    <View
      style={[
        {
          flexDirection: vertical ? "column" : "row",
          alignItems: "stretch",
        },
        scroll && { paddingHorizontal: t.space["1"] },
      ]}
    >
      {children}
      {indicator}
    </View>
  );

  // react-native-web forwards onKeyDown to the DOM element
  const keyProps =
    Platform.OS === "web" ? ({ onKeyDown } as object) : undefined;

  return (
    <TabListContext.Provider value={listCtx}>
      <View
        role="tablist"
        accessibilityLabel={accessibilityLabel ?? ariaLabel}
        aria-orientation={orientation}
        {...keyProps}
        {...part("tabs", "list", { variant })}
        {...rest}
        style={[listStyle, style]}
      >
        {scroll ? (
          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            {...part("tabs", "scroller")}
            onLayout={(e: LayoutChangeEvent) =>
              setViewport(e.nativeEvent.layout.width)
            }
          >
            {row}
          </ScrollView>
        ) : (
          row
        )}
      </View>
    </TabListContext.Provider>
  );
}

/**
 * A tab (`accessibilityRole="tab"`, `selected` state). Pressing it selects
 * its panel; 44pt tall (or more with the `--touch-target-min` token).
 */
export function Tab({
  value,
  children,
  disabled = false,
  color: tabColor,
  badge,
  onPress,
  style,
  textStyle,
  accessibilityState,
  hitSlop,
  ...rest
}: TabProps) {
  const { tokens: t, fonts } = useTheme();
  const tabs = useTabs("Tab");
  const list = useContext(TabListContext);
  const color = tabColor ?? tabs.color;
  const role = colorRole(t, color);
  const selected = tabs.value === value;
  const variant = tabs.variant;
  const vertical = tabs.orientation === "vertical";
  const height = Math.max(t.sizes["control-height-md"], t.touchTargetMin);
  const enclosedHeight = height - t.space["1"] * 2;
  const tabHeight = variant === "enclosed" ? enclosedHeight : height;
  const scrollable = list?.scrollable ?? false;
  const textual = typeof children === "string" || typeof children === "number";
  const reportLayout = list?.reportLayout;

  const foreground = disabled
    ? t.colors["text-disabled-color"]
    : selected
      ? variant === "pills"
        ? role.onSolid
        : variant === "enclosed"
          ? t.colors["text-color"]
          : color === "neutral"
            ? t.colors["text-color"]
            : role.text
      : t.colors["text-secondary-color"];

  const fill = (pressed: boolean): ViewStyle => {
    switch (variant) {
      case "pills":
        return {
          backgroundColor: selected
            ? pressed
              ? role.pressed
              : role.solid
            : pressed
              ? t.colors["hover-color"]
              : tabColor
                ? role.subtle
                : "transparent",
          borderRadius: t.radius.full,
        };
      case "soft":
        return {
          backgroundColor:
            selected || pressed || tabColor ? role.subtle : "transparent",
          borderRadius: t.radius.md,
        };
      case "enclosed":
        return selected
          ? {
              backgroundColor: t.colors["surface-color"],
              borderRadius: t.radius.md,
              ...shadowStyle(t.shadows.sm),
            }
          : {
              backgroundColor: pressed
                ? t.colors["hover-color"]
                : "transparent",
              borderRadius: t.radius.md,
            };
      case "line":
        return {
          backgroundColor: pressed ? t.colors["hover-color"] : "transparent",
          ...(vertical && selected
            ? { borderRightWidth: 3, borderRightColor: role.solid }
            : null),
        };
    }
  };

  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ ...accessibilityState, selected, disabled }}
      aria-selected={selected}
      aria-disabled={disabled}
      disabled={disabled}
      onPress={(event) => {
        tabs.select(value, disabled);
        onPress?.(event);
      }}
      onFocus={() => tabs.focus(value, disabled)}
      hitSlop={hitSlop ?? hitSlopFor(t, tabHeight)}
      onLayout={(e: LayoutChangeEvent) =>
        reportLayout?.(value, {
          x: e.nativeEvent.layout.x,
          width: e.nativeEvent.layout.width,
        })
      }
      {...part("tabs", "tab", { selected, disabled, color: tabColor })}
      {...rest}
      style={({ pressed }) => [
        {
          minHeight: tabHeight,
          paddingHorizontal: t.space[scrollable ? "4" : "3"],
          flexDirection: "row",
          alignItems: "center",
          justifyContent: vertical ? "flex-start" : "center",
          gap: t.space["1-5"],
          flexGrow: scrollable || vertical ? 0 : 1,
          flexBasis: scrollable || vertical ? "auto" : 0,
          opacity: disabled ? 0.5 : 1,
        },
        fill(pressed && !disabled),
        style,
      ]}
    >
      {textual ? (
        <Text
          numberOfLines={1}
          style={[
            {
              color: foreground,
              fontSize: t.fontSize.md,
              fontWeight: weight(t, selected ? "semibold" : "medium"),
              ...(fonts.sans ? { fontFamily: fonts.sans } : null),
            },
            textStyle,
          ]}
          {...part("tabs", "label")}
        >
          {children}
        </Text>
      ) : (
        children
      )}
      {badge !== undefined && badge !== null && badge !== false ? (
        <View
          {...part("tabs", "badge")}
          style={{
            minWidth: t.space["4"],
            height: t.space["4"],
            paddingHorizontal: t.space["1"],
            borderRadius: t.radius.full,
            backgroundColor: selected ? role.solid : t.colors["danger-color"],
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: t.colors["text-inverse-color"],
              fontSize: Math.round(t.fontSize.xs * 0.85),
              lineHeight: t.space["4"],
              fontWeight: weight(t, "semibold"),
              ...(fonts.sans ? { fontFamily: fonts.sans } : null),
            }}
          >
            {badge}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}

/**
 * Content of a tab (`role="tabpanel"`): rendered while its tab is
 * selected; `forceMount` keeps it mounted but hidden otherwise.
 */
export function TabPanel({
  value,
  forceMount = false,
  children,
  style,
  ...rest
}: TabPanelProps) {
  const tabs = useTabs("TabPanel");
  const selected = tabs.value === value;
  if (!selected && !forceMount) return null;
  return (
    <View
      role="tabpanel"
      {...(selected
        ? null
        : {
            accessibilityElementsHidden: true,
            importantForAccessibility: "no-hide-descendants" as const,
            "aria-hidden": true,
          })}
      {...part("tabs", "panel", { selected })}
      {...rest}
      style={[
        tabs.orientation === "vertical" && { flex: 1 },
        !selected && { display: "none" },
        style,
      ]}
    >
      {children}
    </View>
  );
}
