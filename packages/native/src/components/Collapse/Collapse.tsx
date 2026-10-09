import { createContext, useContext, useMemo, type ReactNode } from "react";
import {
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import { createSelectionMachine } from "@minerva/core";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { Icon } from "../../internal/Icon";
import { part } from "../../internal/parts";
import { duration, textStyle, weight } from "../../internal/styles";
import { useMachine } from "../../internal/useMachine";

export interface CollapseProps extends Omit<ViewProps, "style" | "children"> {
  /**
   * Names of the expanded items (controlled; pair with `onChange`): an
   * array, or a single name (`""`: none) in `accordion` mode
   */
  value?: string | string[];
  /**
   * Names of the items expanded at first (uncontrolled)
   * @default [] ("" in accordion mode)
   */
  defaultValue?: string | string[];
  /**
   * Called with the requested expanded names: an array, or the single
   * expanded name (`""`: none) in `accordion` mode
   */
  onChange?: (value: string | string[]) => void;
  /**
   * Accordion: at most one item expanded at a time
   * @default false
   */
  accordion?: boolean;
  /**
   * Hairline borders above the list and under each item
   * @default true
   */
  border?: boolean;
  /** `CollapseItem` elements */
  children?: ReactNode;
  /** Style of the list */
  style?: StyleProp<ViewStyle>;
}

export interface CollapseItemProps extends Omit<
  ViewProps,
  "style" | "children"
> {
  /** Name identifying the item in the `Collapse` value */
  name: string;
  /** Title of the header */
  title?: ReactNode;
  /** Secondary text under the title */
  label?: ReactNode;
  /** Text on the right of the header (before the chevron) */
  value?: ReactNode;
  /** Element before the title */
  icon?: ReactNode;
  /**
   * Disables the item (cannot be toggled)
   * @default false
   */
  disabled?: boolean;
  /**
   * Shows the chevron of the header
   * @default true
   */
  isLink?: boolean;
  /** Content shown while expanded */
  children?: ReactNode;
  /** Style of the item */
  style?: StyleProp<ViewStyle>;
}

interface CollapseContextValue {
  expanded: readonly string[];
  toggle: (name: string) => void;
  border: boolean;
}

const CollapseContext = createContext<CollapseContextValue | null>(null);

const toList = (value: string | string[] | undefined) =>
  value === undefined
    ? undefined
    : Array.isArray(value)
      ? value
      : value === ""
        ? []
        : [value];

/** The same array while its items are unchanged (controlled values) */
function useStableKeys(keys: readonly string[] | undefined) {
  const joined = keys?.join("\u0000");
  return useMemo(
    () =>
      joined === undefined
        ? undefined
        : joined === ""
          ? []
          : joined.split("\u0000"),
    [joined],
  );
}

/**
 * Collapsible panels (accordion): `CollapseItem`s whose header toggles
 * their content, several at once or one at a time (`accordion`). The
 * expanded names run on the selection machine of @minerva/core
 * (controlled or not).
 */
export function Collapse({
  value,
  defaultValue,
  onChange,
  accordion = false,
  border = true,
  children,
  style,
  ...rest
}: CollapseProps) {
  const { tokens: t, reducedMotion } = useTheme();
  const controlledNames = useStableKeys(toList(value));
  const [state, send] = useMachine(createSelectionMachine<string>, {
    mode: accordion ? ("single" as const) : ("multiple" as const),
    value: controlledNames,
    defaultValue: toList(defaultValue) ?? [],
    onValueChange: (next: string[]) =>
      onChange?.(accordion ? (next[0] ?? "") : next),
  });
  const ms = duration(t, "base");
  const context = useMemo<CollapseContextValue>(
    () => ({
      expanded: state.value,
      toggle: (name) => {
        if (Platform.OS !== "web" && !reducedMotion && ms > 0) {
          LayoutAnimation.configureNext(
            LayoutAnimation.create(ms, "easeInEaseOut", "opacity"),
          );
        }
        send({ type: "TOGGLE", value: name });
      },
      border,
    }),
    [state.value, send, border, ms, reducedMotion],
  );

  return (
    <CollapseContext.Provider value={context}>
      <View
        {...part("collapse", "root")}
        {...rest}
        style={[
          {
            backgroundColor: t.colors["surface-color"],
            borderTopWidth: border ? StyleSheet.hairlineWidth : 0,
            borderColor: t.colors["border-color"],
          },
          style,
        ]}
      >
        {children}
      </View>
    </CollapseContext.Provider>
  );
}

/** A panel of `Collapse`: a pressable header and its collapsible content */
export function CollapseItem({
  name,
  title,
  label,
  value,
  icon,
  disabled = false,
  isLink = true,
  children,
  style,
  ...rest
}: CollapseItemProps) {
  const { tokens: t, fonts } = useTheme();
  const { t: translate } = useI18n();
  const context = useContext(CollapseContext);
  const expanded = context?.expanded.includes(name) ?? false;
  const border = context?.border ?? true;
  const sans = fonts.sans;
  const textual = (node: ReactNode) =>
    typeof node === "string" || typeof node === "number";

  return (
    <View
      {...part("collapse", "item", { expanded, disabled })}
      {...rest}
      style={style}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded, disabled }}
        aria-expanded={expanded}
        accessibilityHint={translate(
          expanded ? "collapse.collapse" : "collapse.expand",
        )}
        disabled={disabled}
        onPress={() => context?.toggle(name)}
        {...part("collapse", "header", { expanded, disabled })}
        style={({ pressed }) => ({
          flexDirection: "row",
          alignItems: "center",
          gap: t.space["3"],
          minHeight: t.sizes["control-height-lg"],
          paddingVertical: t.sizes["row-padding-y"],
          paddingHorizontal: t.sizes["row-padding-x"],
          backgroundColor:
            pressed && !disabled
              ? t.colors["surface-muted-color"]
              : t.colors["surface-color"],
        })}
      >
        {icon}
        <View style={{ flex: 1, gap: t.space["0-5"] }}>
          {textual(title) ? (
            <Text
              style={[
                textStyle(t, "md", sans),
                {
                  fontWeight: weight(t, "medium"),
                  color: disabled
                    ? t.colors["text-disabled-color"]
                    : t.colors["text-color"],
                },
              ]}
              {...part("collapse", "title")}
            >
              {title}
            </Text>
          ) : (
            title
          )}
          {textual(label) ? (
            <Text
              style={[
                textStyle(t, "sm", sans),
                { color: t.colors["text-muted-color"] },
              ]}
            >
              {label}
            </Text>
          ) : (
            label
          )}
        </View>
        {textual(value) ? (
          <Text
            style={[
              textStyle(t, "md", sans),
              { color: t.colors["text-secondary-color"] },
            ]}
          >
            {value}
          </Text>
        ) : (
          value
        )}
        {isLink && (
          <Icon
            name={expanded ? "chevron-up" : "chevron-down"}
            size={14}
            color={
              disabled
                ? t.colors["text-disabled-color"]
                : t.colors["text-muted-color"]
            }
          />
        )}
      </Pressable>
      {expanded && (
        <View
          style={{
            paddingHorizontal: t.sizes["row-padding-x"],
            paddingBottom: t.sizes["row-padding-y"],
            paddingTop: t.space["1"],
            backgroundColor: t.colors["surface-color"],
          }}
          {...part("collapse", "content")}
        >
          {textual(children) ? (
            <Text
              style={[
                textStyle(t, "md", sans),
                { color: t.colors["text-secondary-color"] },
              ]}
            >
              {children}
            </Text>
          ) : (
            children
          )}
        </View>
      )}
      {border && (
        <View
          style={{
            height: StyleSheet.hairlineWidth,
            backgroundColor: t.colors["border-color"],
          }}
        />
      )}
    </View>
  );
}
