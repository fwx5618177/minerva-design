import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  ScrollView,
  Text,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import { kanbanAccent, kanbanCount, type ColorScheme } from "@minerva/core";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";
import { textStyle, weight } from "../../internal/styles";

/** Accent of a KanbanColumn: a theme color or any React Native color */
export type KanbanColumnColor = ColorScheme | (string & {});

export interface KanbanBoardProps extends Omit<
  ViewProps,
  "style" | "children"
> {
  /** The columns (KanbanColumn) */
  children?: ReactNode;
  /**
   * Width of every column, in device-independent pixels. With `fill` it is
   * the minimum width: columns stretch equally when they fit
   * @default 288
   */
  columnWidth?: number;
  /**
   * Stretches the columns equally to fill the board when they fit (they
   * keep `columnWidth` as their minimum width and scroll otherwise)
   * @default false
   */
  fill?: boolean;
  /**
   * Space between the columns, in device-independent pixels
   * @default 12
   */
  gap?: number;
  /** Height of the board: the column bodies scroll vertically within it */
  height?: number;
  /** Maximum height of the board: the column bodies scroll vertically within it */
  maxHeight?: number;
  /** Style of the board (the horizontal ScrollView) */
  style?: StyleProp<ViewStyle>;
}

export interface KanbanColumnProps extends Omit<
  ViewProps,
  "style" | "children"
> {
  /** Title of the column (also its accessible name) */
  title: ReactNode;
  /**
   * Number of items shown as a badge next to the title (and announced with
   * the title); omit to hide the badge
   */
  count?: number;
  /** Accent of the column (a dot before the title): a theme color or any color */
  color?: KanbanColumnColor;
  /** Supporting text under the header */
  description?: ReactNode;
  /** Header controls on the end side (e.g. an add button) */
  actions?: ReactNode;
  /**
   * Content shown when the column has no cards
   * @default "No items" (translated)
   */
  empty?: ReactNode;
  /** Footer below the cards (e.g. an "Add card" button) */
  footer?: ReactNode;
  /** The cards: each child is wrapped in a role="listitem" view */
  children?: ReactNode;
  /** Style of the column */
  style?: StyleProp<ViewStyle>;
}

const COLUMN_WIDTH = 288;
const GAP = 12;

interface BoardContext {
  width: number;
  bounded: boolean;
}

const KanbanBoardContext = createContext<BoardContext | null>(null);

/**
 * KanbanBoard: a horizontal ScrollView of status columns (KanbanColumn),
 * equal-width (`columnWidth`, 288 by default) and snapping column by
 * column. `fill` stretches the columns equally when they fit the board;
 * `height` / `maxHeight` bound the board so that the column bodies scroll
 * vertically. Drag and drop is not built in: move cards with your own
 * actions (a menu, buttons) and update the columns' data.
 */
export function KanbanBoard({
  children,
  columnWidth = COLUMN_WIDTH,
  fill = false,
  gap = GAP,
  height,
  maxHeight,
  style,
  accessibilityLabel,
  onLayout,
  ...rest
}: KanbanBoardProps) {
  const { tokens: t } = useTheme();
  const { t: translate } = useI18n();
  const [viewport, setViewport] = useState(0);
  const count = Children.toArray(children).filter(isValidElement).length;
  const minWidth = Math.max(0, columnWidth);
  const fits =
    fill &&
    viewport > 0 &&
    count > 0 &&
    count * minWidth + (count - 1) * gap <= viewport;
  const width = fits ? (viewport - (count - 1) * gap) / count : minWidth;
  const bounded = height !== undefined || maxHeight !== undefined;

  return (
    <KanbanBoardContext.Provider value={{ width, bounded }}>
      <ScrollView
        horizontal
        role="region"
        accessibilityLabel={accessibilityLabel ?? translate("kanban.label")}
        showsHorizontalScrollIndicator
        snapToInterval={fits ? undefined : width + gap}
        snapToAlignment="start"
        decelerationRate={fits ? "normal" : "fast"}
        onLayout={(event: LayoutChangeEvent) => {
          setViewport(event.nativeEvent.layout.width);
          onLayout?.(event);
        }}
        contentContainerStyle={{
          flexDirection: "row",
          alignItems: "stretch",
          gap,
          paddingBottom: t.space["2"],
          ...(bounded ? { flexGrow: 1 } : null),
        }}
        style={[{ flexGrow: 0, height, maxHeight }, style]}
        {...part("kanban-board", "root")}
        {...rest}
      >
        {children}
      </ScrollView>
    </KanbanBoardContext.Provider>
  );
}

/**
 * KanbanColumn: a status column of a KanbanBoard. The header shows an
 * optional accent dot (`color`), the `title`, a `count` badge and
 * `actions`; the cards (children) form a list (each child is wrapped in a
 * `listitem` view) that scrolls vertically within a bounded board; `empty`
 * replaces the list when there are no cards, and `footer` sits below. The
 * column is a group named by its title and count ("To do, 3 items").
 */
export function KanbanColumn({
  title,
  count: countProp,
  color,
  description,
  actions,
  empty,
  footer,
  children,
  style,
  accessibilityLabel,
  ...rest
}: KanbanColumnProps) {
  const { tokens: t, fonts } = useTheme();
  const { t: translate } = useI18n();
  const board = useContext(KanbanBoardContext);
  const count = kanbanCount(countProp);
  const { scheme, custom } = kanbanAccent(color);
  const accentColor =
    custom ??
    (scheme === "neutral"
      ? t.colors["text-muted-color"]
      : scheme
        ? t.colors[`${scheme}-color`]
        : undefined);
  const items = Children.toArray(children);
  const textTitle =
    typeof title === "string" || typeof title === "number"
      ? String(title)
      : undefined;
  const label =
    accessibilityLabel ??
    (textTitle !== undefined && count !== undefined
      ? translate("kanban.columnLabel", { title: textTitle, count })
      : textTitle);
  const sans = fonts.sans;

  const list =
    items.length > 0 ? (
      <View
        role="list"
        style={{ gap: t.space["2"] }}
        {...part("kanban-column", "list")}
      >
        {items.map((item, index) => (
          <View
            key={isValidElement(item) && item.key != null ? item.key : index}
            role="listitem"
          >
            {item}
          </View>
        ))}
      </View>
    ) : (
      <View
        style={{
          minHeight: 64,
          alignItems: "center",
          justifyContent: "center",
          padding: t.space["3"],
          borderWidth: 1,
          borderStyle: "dashed",
          borderColor: t.colors["border-color"],
          borderRadius: t.radius.md,
        }}
        {...part("kanban-column", "empty")}
      >
        {empty == null || typeof empty === "string" ? (
          <Text
            style={[
              textStyle(t, "sm", sans),
              { color: t.colors["text-muted-color"], textAlign: "center" },
            ]}
          >
            {empty ?? translate("kanban.empty")}
          </Text>
        ) : (
          empty
        )}
      </View>
    );

  return (
    <View
      role="group"
      accessibilityLabel={label}
      style={[
        {
          width: board?.width ?? COLUMN_WIDTH,
          ...(board?.bounded ? { flexShrink: 1 } : null),
          borderWidth: 1,
          borderColor: t.colors["border-color"],
          borderRadius: t.radius.lg,
          backgroundColor: t.colors["surface-muted-color"],
          overflow: "hidden",
        },
        style,
      ]}
      {...part("kanban-column", "root", { color: scheme })}
      {...rest}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: t.space["2"],
          minHeight: 44,
          paddingHorizontal: t.space["3"],
          paddingVertical: t.space["2"],
        }}
        {...part("kanban-column", "header")}
      >
        {accentColor ? (
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: accentColor,
            }}
            {...part("kanban-column", "indicator")}
          />
        ) : null}
        <View style={{ flexShrink: 1 }} {...part("kanban-column", "title")}>
          {textTitle !== undefined ? (
            <Text
              accessibilityRole="header"
              numberOfLines={1}
              style={[
                textStyle(t, "sm", sans),
                { fontWeight: weight(t, "semibold") },
              ]}
            >
              {textTitle}
            </Text>
          ) : (
            title
          )}
        </View>
        {count !== undefined ? (
          <View
            importantForAccessibility={
              label !== undefined ? "no-hide-descendants" : "auto"
            }
            accessibilityElementsHidden={label !== undefined}
            style={{
              minWidth: 20,
              height: 20,
              paddingHorizontal: t.space["1-5"],
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: t.colors["surface-color"],
            }}
            {...part("kanban-column", "count")}
          >
            <Text
              allowFontScaling={false}
              style={{
                fontSize: t.fontSize.xs,
                lineHeight: 16,
                color: t.colors["text-secondary-color"],
                fontWeight: weight(t, "medium"),
                ...(sans ? { fontFamily: sans } : null),
              }}
            >
              {count}
            </Text>
          </View>
        ) : null}
        {actions != null && actions !== false ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: t.space["1"],
              marginLeft: "auto",
            }}
            {...part("kanban-column", "actions")}
          >
            {actions}
          </View>
        ) : null}
      </View>
      {description != null && description !== false ? (
        <View
          style={{
            paddingHorizontal: t.space["3"],
            paddingBottom: t.space["2"],
          }}
          {...part("kanban-column", "description")}
        >
          {typeof description === "string" ? (
            <Text
              style={[
                textStyle(t, "xs", sans),
                { color: t.colors["text-muted-color"] },
              ]}
            >
              {description}
            </Text>
          ) : (
            description
          )}
        </View>
      ) : null}
      {board?.bounded ? (
        <ScrollView
          style={{ flexShrink: 1 }}
          contentContainerStyle={{
            paddingHorizontal: t.space["2"],
            paddingTop: t.space["1"],
            paddingBottom: t.space["2"],
          }}
          nestedScrollEnabled
        >
          {list}
        </ScrollView>
      ) : (
        <View
          style={{
            paddingHorizontal: t.space["2"],
            paddingTop: t.space["1"],
            paddingBottom: t.space["2"],
          }}
        >
          {list}
        </View>
      )}
      {footer != null && footer !== false ? (
        <View
          style={{
            gap: t.space["2"],
            paddingHorizontal: t.space["2"],
            paddingBottom: t.space["2"],
          }}
          {...part("kanban-column", "footer")}
        >
          {footer}
        </View>
      ) : null}
    </View>
  );
}
