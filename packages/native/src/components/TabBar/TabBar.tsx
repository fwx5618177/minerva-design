import {
  Children,
  createContext,
  Fragment,
  isValidElement,
  useContext,
  useMemo,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
  type PressableProps,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import { createTabsMachine, type TabsItem } from "@minerva/core";
import { useI18n, useInsets, useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";
import { textStyle, weight } from "../../internal/styles";
import { useMachine } from "../../internal/useMachine";

export interface TabBarProps extends Omit<ViewProps, "style" | "children"> {
  /** Value of the selected item (controlled; pair with `onChange`) */
  value?: string;
  /**
   * Value of the initially selected item (uncontrolled)
   * @default the first enabled item's value
   */
  defaultValue?: string;
  /** Called with the value of the item the user selects */
  onChange?: (value: string) => void;
  /** Items: `TabBarItem` elements */
  children?: ReactNode;
  /**
   * Icon / label color of the selected item
   * @default the "primary-color" token
   */
  activeColor?: string;
  /**
   * Icon / label color of the other items
   * @default the "text-muted-color" token
   */
  inactiveColor?: string;
  /**
   * Pads the bar with the bottom safe-area inset (home indicator) of
   * `MinervaProvider`
   * @default true
   */
  safeAreaInsetBottom?: boolean;
  /**
   * Hairline border above the bar
   * @default true
   */
  border?: boolean;
  /** Accessible label of the tab list @default the "tabBar.label" message */
  accessibilityLabel?: string;
  /** Style of the bar */
  style?: StyleProp<ViewStyle>;
}

export interface TabBarItemProps extends Omit<
  PressableProps,
  "children" | "style" | "disabled"
> {
  /** Value identifying the item (reported by `onChange`) */
  value: string;
  /** Label under the icon */
  label?: ReactNode;
  /**
   * Icon: an element, or a function of the selected state and the current
   * item color returning one (e.g. a filled icon when active)
   */
  icon?: ReactNode | ((active: boolean, color: string) => ReactNode);
  /** Badge content (a count or a short text) on the icon's corner */
  badge?: number | string;
  /**
   * Largest count shown in the badge (`99+` beyond)
   * @default 99
   */
  badgeMax?: number;
  /**
   * Shows a small dot on the icon's corner instead of a badge
   * @default false
   */
  dot?: boolean;
  /**
   * Disables the item
   * @default false
   */
  disabled?: boolean;
  /** Style of the item */
  style?: StyleProp<ViewStyle>;
}

interface TabBarContextValue {
  value: string | undefined;
  select: (value: string, disabled: boolean) => void;
  activeColor: string;
  inactiveColor: string;
}

const TabBarContext = createContext<TabBarContextValue | null>(null);

/** The items among the children (fragments flattened) */
const itemsOf = (children: ReactNode): TabsItem[] =>
  Children.toArray(children).flatMap((child): TabsItem[] => {
    if (!isValidElement(child)) return [];
    if (child.type === Fragment) {
      return itemsOf(
        (child as ReactElement<{ children?: ReactNode }>).props.children,
      );
    }
    const props = (child as ReactElement<Partial<TabBarItemProps>>).props;
    return typeof props.value === "string"
      ? [{ value: props.value, disabled: !!props.disabled }]
      : [];
  });

/**
 * Bottom tab bar of an app: `TabBarItem`s with an icon, a label and a badge
 * or dot. The selection runs on the tabs machine of @minerva/core
 * (controlled or not); the bar pads itself with the bottom safe-area inset.
 */
export function TabBar({
  value,
  defaultValue,
  onChange,
  children,
  activeColor,
  inactiveColor,
  safeAreaInsetBottom = true,
  border = true,
  accessibilityLabel,
  style,
  ...rest
}: TabBarProps) {
  const { tokens: t } = useTheme();
  const { t: translate } = useI18n();
  const insets = useInsets();
  const tabs = itemsOf(children);
  const [state, send] = useMachine(createTabsMachine, {
    value,
    defaultValue: defaultValue ?? tabs.find((tab) => !tab.disabled)?.value,
    tabs,
    activationMode: "manual" as const,
    onValueChange: onChange,
  });
  const active = activeColor ?? t.colors["primary-color"];
  const inactive = inactiveColor ?? t.colors["text-muted-color"];
  const context = useMemo<TabBarContextValue>(
    () => ({
      value: state.value,
      select: (next, disabled) =>
        send({ type: "SELECT", value: next, disabled }),
      activeColor: active,
      inactiveColor: inactive,
    }),
    [state.value, send, active, inactive],
  );

  return (
    <TabBarContext.Provider value={context}>
      <View
        role="tablist"
        accessibilityLabel={accessibilityLabel ?? translate("tabBar.label")}
        {...part("tab-bar", "root")}
        {...rest}
        style={[
          {
            flexDirection: "row",
            backgroundColor: t.colors["surface-color"],
            borderTopWidth: border ? StyleSheet.hairlineWidth : 0,
            borderTopColor: t.colors["border-color"],
            paddingBottom: safeAreaInsetBottom ? insets.bottom : 0,
          },
          style,
        ]}
      >
        {children}
      </View>
    </TabBarContext.Provider>
  );
}

/** An item of `TabBar` (`tab` role, selected state) */
export function TabBarItem({
  value,
  label,
  icon,
  badge,
  badgeMax = 99,
  dot = false,
  disabled = false,
  onPress,
  accessibilityLabel,
  style,
  ...rest
}: TabBarItemProps) {
  const { tokens: t, fonts } = useTheme();
  const context = useContext(TabBarContext);
  const selected = context?.value === value;
  const color = selected
    ? (context?.activeColor ?? t.colors["primary-color"])
    : (context?.inactiveColor ?? t.colors["text-muted-color"]);
  const iconNode = typeof icon === "function" ? icon(selected, color) : icon;
  const badgeText =
    badge === undefined
      ? undefined
      : typeof badge === "number" && badge > badgeMax
        ? `${badgeMax}+`
        : String(badge);
  const labelText =
    typeof label === "string" || typeof label === "number"
      ? String(label)
      : undefined;
  const name =
    accessibilityLabel ??
    (labelText !== undefined && badgeText !== undefined
      ? `${labelText}, ${badgeText}`
      : labelText);
  const height = t.sizes["control-height-lg"];

  const badgeView =
    badgeText !== undefined ? (
      <View
        style={{
          position: "absolute",
          top: -t.space["1"],
          left: "60%",
          minWidth: t.space["4"],
          height: t.space["4"],
          paddingHorizontal: t.space["1"],
          borderRadius: t.radius.full,
          backgroundColor: t.colors["danger-color"],
          borderWidth: 1,
          borderColor: t.colors["surface-color"],
          alignItems: "center",
          justifyContent: "center",
        }}
        {...part("tab-bar", "badge")}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: t.colors["text-inverse-color"],
            fontSize: t.fontSize.xs - 2,
            lineHeight: t.fontSize.xs,
            fontWeight: weight(t, "semibold"),
            ...(fonts.sans ? { fontFamily: fonts.sans } : null),
          }}
        >
          {badgeText}
        </Text>
      </View>
    ) : dot ? (
      <View
        style={{
          position: "absolute",
          top: 0,
          right: -t.space["1"],
          width: t.space["2"],
          height: t.space["2"],
          borderRadius: t.radius.full,
          backgroundColor: t.colors["danger-color"],
        }}
        {...part("tab-bar", "dot")}
      />
    ) : null;

  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityLabel={name}
      accessibilityState={{ selected, disabled }}
      aria-selected={selected}
      disabled={disabled}
      onPress={(event: GestureResponderEvent) => {
        onPress?.(event);
        context?.select(value, disabled);
      }}
      {...part("tab-bar", "item", { selected, disabled })}
      {...rest}
      style={({ pressed }) => [
        {
          flex: 1,
          minHeight: height,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: t.space["1-5"],
          gap: t.space["0-5"],
          opacity: disabled ? 0.4 : pressed ? 0.7 : 1,
        },
        style,
      ]}
    >
      {iconNode !== undefined && iconNode !== null && (
        <View
          style={{ alignItems: "center", justifyContent: "center" }}
          {...part("tab-bar", "icon")}
        >
          {iconNode}
          {badgeView}
        </View>
      )}
      {label !== undefined && (
        <View>
          {labelText !== undefined ? (
            <Text
              numberOfLines={1}
              style={[
                textStyle(t, "xs", fonts.sans),
                {
                  color,
                  fontWeight: weight(t, selected ? "semibold" : "medium"),
                },
              ]}
              {...part("tab-bar", "label")}
            >
              {labelText}
            </Text>
          ) : (
            label
          )}
          {iconNode === undefined || iconNode === null ? badgeView : null}
        </View>
      )}
    </Pressable>
  );
}
