import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useMemo,
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
import { useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";
import { textStyle } from "../../internal/styles";

export type GridDirection = "vertical" | "horizontal";

export interface GridProps extends Omit<ViewProps, "style" | "children"> {
  /**
   * Number of columns
   * @default 4
   */
  columnNum?: number;
  /**
   * Square cells (height = width)
   * @default false
   */
  square?: boolean;
  /**
   * Space between the cells, in dp (cells get their own border and radius
   * when set)
   * @default 0
   */
  gutter?: number;
  /**
   * Hairline borders between the cells
   * @default true
   */
  border?: boolean;
  /**
   * Centers the content of the cells
   * @default true
   */
  center?: boolean;
  /**
   * Layout of icon and text in a cell: `vertical` (icon above) or
   * `horizontal` (icon before)
   * @default "vertical"
   */
  direction?: GridDirection;
  /** `GridItem` elements */
  children?: ReactNode;
  /** Style of the grid */
  style?: StyleProp<ViewStyle>;
}

export interface GridItemProps extends Omit<
  PressableProps,
  "children" | "style" | "disabled"
> {
  /** Span every column inside ResponsiveGrid or Grid. @default false */
  fullWidth?: boolean;
  /** Apply layout and press behavior to a single child. @default false */
  asChild?: boolean;
  /** Icon (any element) */
  icon?: ReactNode;
  /** Text under (or next to) the icon */
  text?: ReactNode;
  /** Custom content, replacing icon and text */
  children?: ReactNode;
  /** Called on press: the cell becomes a button */
  onPress?: (event: GestureResponderEvent) => void;
  /**
   * Disables the cell's press
   * @default false
   */
  disabled?: boolean;
  /** Style of the cell content */
  style?: StyleProp<ViewStyle>;
}

interface GridContextValue {
  columnNum: number;
  square: boolean;
  gutter: number;
  border: boolean;
  center: boolean;
  direction: GridDirection;
}

export const ResponsiveGridItemContext = createContext(false);

const GridContext = createContext<GridContextValue>({
  columnNum: 4,
  square: false,
  gutter: 0,
  border: true,
  center: true,
  direction: "vertical",
});

/**
 * A grid of entries (icon + text shortcuts): `columnNum` cells per row,
 * optionally square, with hairline borders or gutters. Cells with
 * `onPress` are buttons.
 */
export function Grid({
  columnNum = 4,
  square = false,
  gutter = 0,
  border = true,
  center = true,
  direction = "vertical",
  children,
  style,
  ...rest
}: GridProps) {
  const { tokens: t } = useTheme();
  const context = useMemo(
    () => ({ columnNum, square, gutter, border, center, direction }),
    [columnNum, square, gutter, border, center, direction],
  );
  return (
    <GridContext.Provider value={context}>
      <View
        {...part("grid", "root")}
        {...rest}
        style={[
          {
            flexDirection: "row",
            flexWrap: "wrap",
            paddingLeft: gutter,
            borderTopWidth: border && !gutter ? StyleSheet.hairlineWidth : 0,
            borderLeftWidth: border && !gutter ? StyleSheet.hairlineWidth : 0,
            borderColor: t.colors["border-color"],
          },
          style,
        ]}
      >
        {children}
      </View>
    </GridContext.Provider>
  );
}

/** A cell of `Grid` (a button when `onPress` is set) */
export function GridItem({
  fullWidth = false,
  asChild = false,
  icon,
  text,
  children,
  onPress,
  disabled = false,
  style,
  accessibilityState,
  ...rest
}: GridItemProps) {
  const { tokens: t, fonts } = useTheme();
  const { columnNum, square, gutter, border, center, direction } =
    useContext(GridContext);
  const responsive = useContext(ResponsiveGridItemContext);
  const pressable = onPress !== undefined;
  const textual = typeof text === "string" || typeof text === "number";
  const layoutStyle: ViewStyle = {
    width: responsive || fullWidth ? "100%" : `${100 / columnNum}%`,
    paddingRight: gutter,
    paddingTop: gutter,
    aspectRatio: square ? 1 : undefined,
  };

  if (asChild) {
    const child = Children.only(children);
    if (!isValidElement<PressableProps>(child)) {
      throw new Error("GridItem asChild requires a single React element");
    }
    const childStyle = child.props.style;
    const blocked = disabled || Boolean(child.props.disabled);
    return cloneElement(child, {
      ...rest,
      disabled: blocked,
      accessibilityState: {
        ...child.props.accessibilityState,
        ...accessibilityState,
        disabled: blocked,
      },
      onPress: (event) => {
        if (blocked) return;
        child.props.onPress?.(event);
        if (!event?.isDefaultPrevented?.()) onPress?.(event);
      },
      style:
        typeof childStyle === "function"
          ? (state) => [childStyle(state), layoutStyle, style]
          : [childStyle, layoutStyle, style],
    });
  }

  const content = (pressed: boolean): ViewStyle => ({
    flex: 1,
    flexDirection: direction === "horizontal" ? "row" : "column",
    alignItems: center ? "center" : "flex-start",
    justifyContent: center ? "center" : "flex-start",
    gap: t.space["2"],
    minHeight: Math.max(t.touchTargetMin, 44),
    paddingVertical: t.space["4"],
    paddingHorizontal: t.space["2"],
    backgroundColor:
      pressed && !disabled
        ? t.colors["surface-muted-color"]
        : t.colors["surface-color"],
    opacity: disabled ? 0.5 : 1,
    ...(gutter
      ? {
          borderRadius: t.radius.lg,
          borderWidth: border ? StyleSheet.hairlineWidth : 0,
          borderColor: t.colors["border-color"],
        }
      : {
          borderRightWidth: border ? StyleSheet.hairlineWidth : 0,
          borderBottomWidth: border ? StyleSheet.hairlineWidth : 0,
          borderColor: t.colors["border-color"],
        }),
  });

  const inner = children ?? (
    <>
      {icon}
      {textual ? (
        <Text
          numberOfLines={2}
          style={[
            textStyle(t, "sm", fonts.sans),
            { textAlign: center ? "center" : "left" },
          ]}
          {...part("grid", "text")}
        >
          {text}
        </Text>
      ) : (
        text
      )}
    </>
  );

  return (
    <View style={layoutStyle} {...part("grid", "item")}>
      {pressable ? (
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ ...accessibilityState, disabled }}
          disabled={disabled}
          onPress={onPress}
          {...part("grid", "content", { disabled })}
          {...rest}
          style={({ pressed }) => [content(pressed), style]}
        >
          {inner}
        </Pressable>
      ) : (
        <View
          {...part("grid", "content")}
          {...(rest as ViewProps)}
          style={[content(false), style]}
        >
          {inner}
        </View>
      )}
    </View>
  );
}
