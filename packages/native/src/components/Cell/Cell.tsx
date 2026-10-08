import {
  Children,
  createContext,
  isValidElement,
  useContext,
  type ReactNode,
} from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
  type StyleProp,
  type TextStyle,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";
import { Icon } from "../../internal/Icon";
import { textStyle, weight } from "../../internal/styles";

export type CellSize = "medium" | "large";

export interface CellProps extends Omit<ViewProps, "style" | "children"> {
  /** Main text (left) */
  title?: ReactNode;
  /** Value shown on the right (muted) */
  value?: ReactNode;
  /** Supporting text under the title */
  label?: ReactNode;
  /** Leading element (icon, avatar...) */
  icon?: ReactNode;
  /** Trailing element after the value (replaces the `isLink` chevron) */
  rightIcon?: ReactNode;
  /**
   * Navigation row: shows a chevron and makes the row pressable
   * @default false
   */
  isLink?: boolean;
  /**
   * Adds a required mark (`*`) before the title
   * @default false
   */
  required?: boolean;
  /**
   * Vertically centers the content (top-aligned otherwise, for long
   * labels)
   * @default true
   */
  center?: boolean;
  /**
   * Row size (`large`: taller row, larger title)
   * @default "medium"
   */
  size?: CellSize;
  /**
   * Pressable row with pressed feedback (`accessibilityRole="button"`);
   * implied by `onPress` and `isLink`
   * @default false
   */
  clickable?: boolean;
  /** Called when the row is pressed */
  onPress?: (event: GestureResponderEvent) => void;
  /**
   * Disables a pressable row
   * @default false
   */
  disabled?: boolean;
  /**
   * Draws the inset hairline under the row (never under the last row of a
   * CellGroup)
   * @default true
   */
  border?: boolean;
  /** Custom right content (a Switch, a Tag...), shown after the value */
  children?: ReactNode;
  /** Style of the row */
  style?: StyleProp<ViewStyle>;
  /** Style of the title text */
  titleStyle?: StyleProp<TextStyle>;
  /** Style of the value text */
  valueStyle?: StyleProp<TextStyle>;
}

export interface CellGroupProps extends Omit<ViewProps, "style" | "children"> {
  /** Header text above the group */
  title?: ReactNode;
  /** Footer text below the group (hint, explanation) */
  footer?: ReactNode;
  /**
   * Inset card style (margins and rounded corners, like iOS inset grouped
   * lists); full-width rows with top / bottom hairlines otherwise
   * @default false
   */
  inset?: boolean;
  /**
   * Draws the hairlines between the rows and around a full-width group
   * @default true
   */
  border?: boolean;
  /** The Cell elements */
  children?: ReactNode;
  /** Style of the group (the rows container) */
  style?: StyleProp<ViewStyle>;
}

interface CellSlot {
  last: boolean;
  border: boolean;
}

const CellSlotContext = createContext<CellSlot | null>(null);

const isText = (node: ReactNode) =>
  typeof node === "string" || typeof node === "number";

/**
 * Cell: a settings-style row (iOS settings / Vant Cell): optional icon,
 * title with a label under it, a value and a chevron or custom content on
 * the right. Pressable rows (`onPress`, `isLink`, `clickable`) are buttons
 * with a pressed background; static rows are read as one element.
 */
export function Cell({
  title,
  value,
  label,
  icon,
  rightIcon,
  isLink = false,
  required = false,
  center = true,
  size = "medium",
  clickable = false,
  onPress,
  disabled = false,
  border = true,
  children,
  style,
  titleStyle,
  valueStyle,
  accessibilityLabel,
  accessibilityState,
  ...rest
}: CellProps) {
  const { tokens: t, fonts } = useTheme();
  const { t: tr } = useI18n();
  const slot = useContext(CellSlotContext);
  const pressable = clickable || isLink || onPress !== undefined;
  const large = size === "large";
  const paddingX = t.sizes["row-padding-x"];
  const paddingY = t.sizes["row-padding-y"] + (large ? t.space["1"] : 0);
  const minHeight = Math.max(
    large ? t.space["14"] : t.sizes["control-height-md"] + t.space["1"],
    t.touchTargetMin,
  );
  const showBorder = border && (slot ? slot.border && !slot.last : true);
  const font = fonts.sans;

  const titleNode = (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {required ? (
        <Text
          accessibilityLabel={tr("form.required")}
          style={{
            ...textStyle(t, large ? "lg" : "md", font),
            color: t.colors["danger-color"],
            marginRight: t.space["0-5"],
          }}
          {...part("cell", "required")}
        >
          *
        </Text>
      ) : null}
      {isText(title) ? (
        <Text
          style={[
            {
              ...textStyle(t, large ? "lg" : "md", font),
              fontWeight: weight(t, large ? "medium" : "regular"),
              flexShrink: 1,
            },
            titleStyle,
          ]}
          {...part("cell", "title")}
        >
          {title}
        </Text>
      ) : (
        title
      )}
    </View>
  );

  const content = (pressed: boolean) => (
    <>
      {icon !== undefined ? (
        <View
          {...part("cell", "icon")}
          style={{
            marginRight: t.space["3"],
            alignSelf: center ? "center" : "flex-start",
          }}
        >
          {icon}
        </View>
      ) : null}
      <View style={{ flex: 1, minWidth: 0, gap: t.space["0-5"] }}>
        {title !== undefined || required ? titleNode : null}
        {label !== undefined ? (
          isText(label) ? (
            <Text
              style={{
                ...textStyle(t, "sm", font),
                color: t.colors["text-secondary-color"],
              }}
              {...part("cell", "label")}
            >
              {label}
            </Text>
          ) : (
            label
          )
        ) : null}
      </View>
      {value !== undefined ? (
        isText(value) ? (
          <Text
            numberOfLines={title === undefined ? undefined : 2}
            style={[
              {
                ...textStyle(t, "md", font),
                color: t.colors["text-secondary-color"],
                textAlign: title === undefined ? "left" : "right",
                marginLeft: t.space["3"],
                flexShrink: 1,
                maxWidth: title === undefined ? undefined : "60%",
              },
              valueStyle,
            ]}
            {...part("cell", "value")}
          >
            {value}
          </Text>
        ) : (
          <View {...part("cell", "value")} style={{ marginLeft: t.space["3"] }}>
            {value}
          </View>
        )
      ) : null}
      {children !== undefined ? (
        <View {...part("cell", "extra")} style={{ marginLeft: t.space["3"] }}>
          {children}
        </View>
      ) : null}
      {rightIcon !== undefined ? (
        <View
          {...part("cell", "right-icon")}
          style={{ marginLeft: t.space["2"] }}
        >
          {rightIcon}
        </View>
      ) : isLink ? (
        <Icon
          name="chevron-right"
          size={t.fontSize.md}
          color={t.colors["text-muted-color"]}
          style={{ marginLeft: t.space["1"], marginRight: -t.space["1"] }}
        />
      ) : null}
      {showBorder ? (
        <View
          pointerEvents="none"
          {...part("cell", "border")}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            left:
              paddingX + (icon !== undefined ? t.space["8"] + t.space["1"] : 0),
            height: StyleSheet.hairlineWidth,
            backgroundColor: pressed ? "transparent" : t.colors["border-color"],
          }}
        />
      ) : null}
    </>
  );

  const rowStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: center ? "center" : "flex-start",
    minHeight,
    paddingHorizontal: paddingX,
    paddingVertical: paddingY,
  };
  const rootPart = part("cell", "root", {
    size,
    clickable: pressable,
    link: isLink,
    disabled: pressable && disabled,
  });

  if (pressable) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ ...accessibilityState, disabled }}
        aria-disabled={disabled}
        disabled={disabled}
        onPress={onPress}
        {...rootPart}
        {...rest}
        style={({ pressed }) => [
          rowStyle,
          {
            backgroundColor:
              pressed && !disabled ? t.colors["hover-color"] : "transparent",
            opacity: disabled ? 0.5 : 1,
          },
          style,
        ]}
      >
        {({ pressed }) => content(pressed && !disabled)}
      </Pressable>
    );
  }
  // Static row: one accessibility element (title, label and value) unless
  // it holds its own controls
  const merged = children === undefined;
  return (
    <View
      accessible={merged}
      accessibilityRole={merged ? "text" : undefined}
      accessibilityLabel={accessibilityLabel}
      accessibilityState={accessibilityState}
      {...rootPart}
      {...rest}
      style={[rowStyle, style]}
    >
      {content(false)}
    </View>
  );
}

/**
 * CellGroup: a group of Cells with an optional header and footer; hairlines
 * between rows, or an inset rounded card (`inset`).
 */
export function CellGroup({
  title,
  footer,
  inset = false,
  border = true,
  children,
  style,
  accessibilityLabel,
  ...rest
}: CellGroupProps) {
  const { tokens: t, fonts } = useTheme();
  const items = Children.toArray(children).filter(isValidElement);
  const marginX = inset ? t.space["4"] : 0;
  const caption = (node: ReactNode, which: "title" | "footer") =>
    isText(node) ? (
      <Text
        accessibilityRole={which === "title" ? "header" : undefined}
        style={{
          ...textStyle(t, "sm", fonts.sans),
          color: t.colors["text-secondary-color"],
          paddingHorizontal: marginX + t.sizes["row-padding-x"],
          paddingTop: which === "title" ? t.space["4"] : t.space["2"],
          paddingBottom: which === "title" ? t.space["2"] : 0,
        }}
        {...part("cell-group", which)}
      >
        {node}
      </Text>
    ) : (
      node
    );

  return (
    <View {...part("cell-group", "root", { inset })}>
      {title !== undefined ? caption(title, "title") : null}
      <View
        role="list"
        accessibilityLabel={
          accessibilityLabel ?? (typeof title === "string" ? title : undefined)
        }
        {...part("cell-group", "body")}
        {...rest}
        style={[
          { backgroundColor: t.colors["surface-color"] },
          inset
            ? {
                marginHorizontal: marginX,
                borderRadius: t.radius.lg,
                overflow: "hidden",
              }
            : border
              ? {
                  borderTopWidth: StyleSheet.hairlineWidth,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderColor: t.colors["border-color"],
                }
              : null,
          style,
        ]}
      >
        {items.map((child, index) => (
          <CellSlotContext.Provider
            key={child.key ?? index}
            value={{ last: index === items.length - 1, border }}
          >
            {child}
          </CellSlotContext.Provider>
        ))}
      </View>
      {footer !== undefined ? caption(footer, "footer") : null}
    </View>
  );
}
