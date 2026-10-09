import {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  useState,
  type ReactNode,
} from "react";
import {
  Text,
  View,
  I18nManager,
  useWindowDimensions,
  type DimensionValue,
  type ViewProps,
  type ViewStyle,
  type StyleProp,
} from "react-native";
import { ResponsiveGridItemContext } from "../Grid/Grid";
import { useTheme } from "../../theme/MinervaProvider";
import { shadowStyle, textStyle } from "../../internal/styles";
import { part } from "../../internal/parts";
export type BoxSpace = number | string;
export type BoxSize = DimensionValue;
export interface BoxProps extends ViewProps {
  p?: BoxSpace;
  px?: BoxSpace;
  py?: BoxSpace;
  pt?: BoxSpace;
  pr?: BoxSpace;
  pb?: BoxSpace;
  pl?: BoxSpace;
  m?: BoxSpace;
  mx?: BoxSpace;
  my?: BoxSpace;
  mt?: BoxSpace;
  mr?: BoxSpace;
  mb?: BoxSpace;
  ml?: BoxSpace;
  w?: BoxSize;
  h?: BoxSize;
  minW?: BoxSize;
  minH?: BoxSize;
  maxW?: BoxSize;
  maxH?: BoxSize;
  bg?: string;
  rounded?: string;
  boxShadow?: "sm" | "md" | "lg" | "xl";
}
function useSpace() {
  const { tokens } = useTheme();
  return (value: BoxSpace | undefined): number | undefined =>
    value === undefined
      ? undefined
      : (tokens.space[String(value).replace(".", "-")] ??
        (typeof value === "number" ? value : Number.parseFloat(value) || 0));
}
export function Box({
  p,
  px,
  py,
  pt,
  pr,
  pb,
  pl,
  m,
  mx,
  my,
  mt,
  mr,
  mb,
  ml,
  w,
  h,
  minW,
  minH,
  maxW,
  maxH,
  bg,
  rounded,
  boxShadow,
  style,
  ...props
}: BoxProps) {
  const { tokens: t } = useTheme();
  const space = useSpace();
  const surfaces: Record<string, string> = {
    bg: t.colors["background-color"],
    "bg.subtle": t.colors["surface-color"],
    "bg.muted": t.colors["surface-muted-color"],
    "bg.canvas": t.colors["background-color"],
    "bg.elevated": t.colors["surface-color"],
    "bg.emphasis": t.colors["text-color"],
  };
  return (
    <View
      {...part("box", "root")}
      {...props}
      style={[
        {
          padding: space(p),
          paddingHorizontal: space(px),
          paddingVertical: space(py),
          paddingTop: space(pt),
          paddingRight: space(pr),
          paddingBottom: space(pb),
          paddingLeft: space(pl),
          margin: space(m),
          marginHorizontal: space(mx),
          marginVertical: space(my),
          marginTop: space(mt),
          marginRight: space(mr),
          marginBottom: space(mb),
          marginLeft: space(ml),
          width: w,
          height: h,
          minWidth: minW,
          minHeight: minH,
          maxWidth: maxW,
          maxHeight: maxH,
          backgroundColor: bg ? (surfaces[bg] ?? bg) : undefined,
          borderRadius: rounded
            ? (t.radius[rounded] ?? Number.parseFloat(rounded)) || 0
            : undefined,
          ...(boxShadow ? shadowStyle(t.shadows[boxShadow]) : {}),
        },
        style,
      ]}
    />
  );
}
export interface StackProps extends ViewProps {
  /** @default "column" */
  direction?: ViewStyle["flexDirection"];
  gap?: BoxSpace;
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  /** @default false */
  wrap?: boolean;
  separator?: ReactNode;
  /** @default false */
  attached?: boolean;
}
export function Stack({
  direction = "column",
  gap,
  align,
  justify,
  wrap = false,
  separator,
  attached = false,
  children,
  style,
  ...props
}: StackProps) {
  const space = useSpace();
  const alignMap = {
    start: "flex-start",
    end: "flex-end",
    center: "center",
    stretch: "stretch",
    baseline: "baseline",
  } as const;
  const justifyMap = {
    start: "flex-start",
    end: "flex-end",
    center: "center",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly",
  } as const;
  const items = Children.toArray(children);
  const horizontal = direction === "row" || direction === "row-reverse";
  const reversed =
    (direction === "row-reverse" || direction === "column-reverse") !==
    (horizontal && I18nManager.isRTL);
  const connected = (index: number): ViewStyle => {
    const first = index === 0,
      last = index === items.length - 1;
    const start = reversed ? last : first,
      end = reversed ? first : last;
    return {
      margin: 0,
      ...(horizontal
        ? {
            ...(!start
              ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }
              : {}),
            ...(!end
              ? { borderTopRightRadius: 0, borderBottomRightRadius: 0 }
              : {}),
            ...(!first
              ? reversed
                ? { marginRight: -1 }
                : { marginLeft: -1 }
              : {}),
          }
        : {
            ...(!start
              ? { borderTopLeftRadius: 0, borderTopRightRadius: 0 }
              : {}),
            ...(!end
              ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }
              : {}),
            ...(!first
              ? reversed
                ? { marginBottom: -1 }
                : { marginTop: -1 }
              : {}),
          }),
    };
  };
  return (
    <View
      {...part("stack", "root")}
      {...props}
      style={[
        {
          flexDirection: direction,
          gap: attached ? 0 : space(gap),
          alignItems: align ? alignMap[align] : undefined,
          justifyContent: justify ? justifyMap[justify] : undefined,
          flexWrap: wrap ? "wrap" : "nowrap",
          overflow: attached ? "hidden" : undefined,
        },
        style,
      ]}
    >
      {items.map((child, index) => (
        <Fragment key={isValidElement(child) ? (child.key ?? index) : index}>
          {index > 0 && separator !== undefined ? (
            typeof separator === "string" ? (
              <Text>{separator}</Text>
            ) : (
              separator
            )
          ) : null}
          {attached &&
          isValidElement<{
            style?:
              | StyleProp<ViewStyle>
              | ((state: { pressed: boolean }) => StyleProp<ViewStyle>);
          }>(child)
            ? cloneElement(child, {
                style:
                  typeof child.props.style === "function"
                    ? (state) => [
                        (
                          child.props.style as (state: {
                            pressed: boolean;
                          }) => StyleProp<ViewStyle>
                        )(state),
                        connected(index),
                      ]
                    : [child.props.style, connected(index)],
              })
            : child}
        </Fragment>
      ))}
    </View>
  );
}
export type HStackProps = Omit<StackProps, "direction">;
export type VStackProps = HStackProps;
export function HStack(props: HStackProps) {
  return <Stack {...props} direction="row" />;
}
export function VStack(props: VStackProps) {
  return <Stack {...props} direction="column" />;
}
export type ResponsiveGridColumns =
  number | { base?: number; sm?: number; md?: number; lg?: number };
export interface ResponsiveGridProps extends ViewProps {
  /** @default 1 */
  columns?: ResponsiveGridColumns;
  /** @default 4 */
  gap?: BoxSpace;
  rowGap?: BoxSpace;
  columnGap?: BoxSpace;
}
export function ResponsiveGrid({
  columns = 1,
  gap = 4,
  rowGap = gap,
  columnGap = gap,
  children,
  style,
  onLayout,
  ...props
}: ResponsiveGridProps) {
  const window = useWindowDimensions();
  const [width, setWidth] = useState(window.width);
  const space = useSpace();
  const values =
    typeof columns === "number" ? [columns] : Object.values(columns);
  if (values.some((n) => !Number.isInteger(n) || n < 1 || n > 12))
    throw RangeError("Grid columns must be integers between 1 and 12");
  const count =
    typeof columns === "number"
      ? columns
      : width >= 1200
        ? (columns.lg ?? columns.md ?? columns.sm ?? columns.base ?? 1)
        : width >= 768
          ? (columns.md ?? columns.sm ?? columns.base ?? 1)
          : width >= 480
            ? (columns.sm ?? columns.base ?? 1)
            : (columns.base ?? 1);
  const x = space(columnGap) ?? 0;
  return (
    <View
      {...part("responsive-grid", "root")}
      {...props}
      onLayout={(event) => {
        setWidth(event.nativeEvent.layout.width);
        onLayout?.(event);
      }}
      style={[
        {
          flexDirection: "row",
          flexWrap: "wrap",
          columnGap: x,
          rowGap: space(rowGap),
        },
        style,
      ]}
    >
      {Children.toArray(children).map((child, index) => (
        <View
          testID="grid-cell"
          key={isValidElement(child) ? (child.key ?? index) : index}
          style={{
            width:
              isValidElement<{ fullWidth?: boolean }>(child) &&
              child.props.fullWidth
                ? width
                : Math.max(0, (width - x * (count - 1)) / count),
          }}
        >
          <ResponsiveGridItemContext value={true}>
            {child}
          </ResponsiveGridItemContext>
        </View>
      ))}
    </View>
  );
}
export interface SplitLayoutProps extends ViewProps {
  aside: ReactNode;
  /** @default 320 */
  asideWidth?: number;
  /** @default "md" */
  collapseBelow?: "md" | "lg";
  /** @default 6 */
  gap?: BoxSpace;
}
export function SplitLayout({
  aside,
  asideWidth = 320,
  collapseBelow = "md",
  gap = 6,
  children,
  style,
  onLayout,
  ...props
}: SplitLayoutProps) {
  const window = useWindowDimensions();
  const [width, setWidth] = useState(window.width);
  const space = useSpace();
  if (!Number.isFinite(asideWidth) || asideWidth <= 0)
    throw RangeError("asideWidth must be positive");
  const split = width >= (collapseBelow === "md" ? 768 : 1200);
  return (
    <View
      {...part("split-layout", "root")}
      {...props}
      onLayout={(event) => {
        setWidth(event.nativeEvent.layout.width);
        onLayout?.(event);
      }}
      style={[
        { flexDirection: split ? "row" : "column", gap: space(gap) },
        style,
      ]}
    >
      <View style={{ flex: split ? 1 : undefined, minWidth: 0 }}>
        {children}
      </View>
      {aside !== null && aside !== undefined && aside !== false && (
        <View
          style={{ width: split ? Math.min(asideWidth, width / 2) : undefined }}
        >
          {typeof aside === "number" || typeof aside === "string" ? (
            <Text>{aside}</Text>
          ) : (
            aside
          )}
        </View>
      )}
    </View>
  );
}
export interface PageProps extends ViewProps {
  maxWidth?: DimensionValue;
}
export function Page({ maxWidth = 1200, style, ...props }: PageProps) {
  const { tokens } = useTheme();
  return (
    <View
      {...part("page", "root")}
      {...props}
      style={[
        {
          width: "100%",
          maxWidth,
          alignSelf: "center",
          padding: tokens.space["4"],
          gap: tokens.space["6"],
        },
        style,
      ]}
    />
  );
}
export interface PageHeaderProps extends ViewProps {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}
export function PageHeader({
  title,
  description,
  actions,
  style,
  children,
  ...props
}: PageHeaderProps) {
  const { tokens: t } = useTheme();
  return (
    <View
      {...part("page-header", "root")}
      {...props}
      style={[
        {
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          gap: t.space["3"],
        },
        style,
      ]}
    >
      <View style={{ flex: 1, minWidth: 180 }}>
        <Text
          accessibilityRole="header"
          style={[textStyle(t, "xl"), { fontWeight: "600" }]}
        >
          {title}
        </Text>
        {description !== undefined && (
          <Text
            style={[
              textStyle(t, "sm"),
              { color: t.colors["text-secondary-color"] },
            ]}
          >
            {description}
          </Text>
        )}
      </View>
      {actions}
      {children}
    </View>
  );
}
export interface PageSectionProps extends PageHeaderProps {
  icon?: ReactNode;
}
export function PageSection({ children, icon, ...props }: PageSectionProps) {
  return (
    <VStack gap={4}>
      <PageHeader
        {...props}
        title={
          <>
            {icon}
            {props.title}
          </>
        }
      />
      {children}
    </VStack>
  );
}
export interface StatCardProps extends ViewProps {
  label: ReactNode;
  value: ReactNode;
  icon?: ReactNode;
  description?: ReactNode;
}
export function StatCard({
  label,
  value,
  icon,
  description,
  style,
  ...props
}: StatCardProps) {
  const { tokens: t } = useTheme();
  return (
    <View
      {...part("stat-card", "root")}
      {...props}
      style={[
        {
          padding: t.space["4"],
          gap: t.space["2"],
          borderWidth: 1,
          borderColor: t.colors["border-color"],
          borderRadius: t.radius.lg,
          backgroundColor: t.colors["surface-color"],
        },
        style,
      ]}
    >
      <Text style={textStyle(t, "sm")}>{label}</Text>
      <HStack gap={2}>
        {icon}
        <Text style={[textStyle(t, "2xl"), { fontWeight: "700" }]}>
          {value}
        </Text>
      </HStack>
      {description !== undefined && (
        <Text style={textStyle(t, "sm")}>{description}</Text>
      )}
    </View>
  );
}
export interface ToolbarProps extends ViewProps {
  /** @default true */
  wrap?: boolean;
  /** @default "default" */
  density?: "default" | "compact";
}
export function Toolbar({
  wrap = true,
  density = "default",
  ...props
}: ToolbarProps) {
  return (
    <HStack
      {...props}
      accessibilityRole="toolbar"
      wrap={wrap}
      align="center"
      gap={density === "compact" ? 1 : 3}
    />
  );
}
export interface FormLayoutProps extends ResponsiveGridProps {
  layout?: "vertical" | "horizontal";
}
export function FormLayout({
  layout = "vertical",
  columns,
  ...props
}: FormLayoutProps) {
  return (
    <ResponsiveGrid
      {...props}
      columns={columns ?? (layout === "horizontal" ? { base: 1, md: 2 } : 1)}
    />
  );
}
