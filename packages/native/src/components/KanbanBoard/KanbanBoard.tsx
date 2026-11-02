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
  type ReactElement,
  type ReactNode,
} from "react";
import {
  Animated,
  ScrollView,
  Text,
  View,
  type AccessibilityActionEvent,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import {
  kanbanAccent,
  kanbanCount,
  type ColorScheme,
  type KanbanCardMove,
} from "@minerva/core";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";
import { textStyle, weight } from "../../internal/styles";
import {
  useKanbanDrag,
  type KanbanBoardColumn,
  type KanbanDragApi,
} from "./drag";

export type { KanbanCardMove };

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
  /**
   * Lets the KanbanCard children of keyed columns (`value`) be dragged
   * between and within columns: a long press picks a card up (the board
   * stops scrolling), lifting the finger drops it; screen readers get
   * "Move up" / "Move down" / "Move to <column>" actions on each card. The
   * board is controlled: it reports the move (`onCardMove`) and the app
   * moves the card in its data.
   * @default false
   */
  draggable?: boolean;
  /**
   * Called when a card is dropped at a new position (not when it is put back
   * where it was): move the card in your data (`moveKanbanCard` from
   * `minerva-design/core` does it for plain lists)
   */
  onCardMove?: (move: KanbanCardMove) => void;
  /**
   * Whether a card may be dropped at a position: refused positions show no
   * drop indicator and get no accessibility action
   */
  canDrop?: (move: KanbanCardMove) => boolean;
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
   * Key of the column, reported as `fromColumn` / `toColumn` by a draggable
   * board (columns without one take no cards)
   */
  value?: string;
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

export interface KanbanCardProps extends Omit<ViewProps, "style" | "children"> {
  /** Key of the card, reported as `cardKey` by a draggable board */
  value: string;
  /**
   * Name of the card in the announcements and, when draggable, its
   * accessible name
   * @default its text when it is a string, else `value`
   */
  label?: string;
  /** Content of the card */
  children?: ReactNode;
  /** Style of the card */
  style?: StyleProp<ViewStyle>;
}

const COLUMN_WIDTH = 288;
const GAP = 12;
/** Long press (ms) that picks a card up */
const LONG_PRESS = 400;
/** Distance (dp) the finger may move during the long press (more: a scroll) */
const TOLERANCE = 8;

interface BoardContext {
  width: number;
  bounded: boolean;
  drag: KanbanDragApi;
}

const KanbanBoardContext = createContext<BoardContext | null>(null);

const textOf = (node: ReactNode) =>
  typeof node === "string" || typeof node === "number"
    ? String(node)
    : undefined;

/**
 * The keyed columns and cards of a board, read from its children: the
 * KanbanColumn children with a `value`, and their KanbanCard children with
 * a `value` (cards nested in other components are not draggable)
 */
function readBoard(children: ReactNode) {
  const columns: KanbanBoardColumn[] = [];
  const cardLabels: Record<string, string> = {};
  for (const child of Children.toArray(children)) {
    if (!isValidElement(child) || child.type !== KanbanColumn) continue;
    const column = (child as ReactElement<KanbanColumnProps>).props;
    if (!column.value) continue;
    const cards: string[] = [];
    for (const item of Children.toArray(column.children)) {
      if (!isValidElement(item) || item.type !== KanbanCard) continue;
      const card = (item as ReactElement<KanbanCardProps>).props;
      if (!card.value) continue;
      cards.push(card.value);
      cardLabels[card.value] =
        card.label ??
        card.accessibilityLabel ??
        textOf(card.children) ??
        card.value;
    }
    columns.push({
      key: column.value,
      label: textOf(column.title) ?? column.accessibilityLabel ?? column.value,
      cards,
    });
  }
  return { columns, cardLabels };
}

/**
 * KanbanBoard: a horizontal ScrollView of status columns (KanbanColumn),
 * equal-width (`columnWidth`, 288 by default) and snapping column by
 * column. `fill` stretches the columns equally when they fit the board;
 * `height` / `maxHeight` bound the board so that the column bodies scroll
 * vertically. `draggable` lets the KanbanCard children of keyed columns be
 * moved with a long press and drag, or with accessibility actions; the
 * board is controlled and reports each move (`onCardMove`).
 */
export function KanbanBoard({
  children,
  columnWidth = COLUMN_WIDTH,
  fill = false,
  gap = GAP,
  height,
  maxHeight,
  draggable = false,
  onCardMove,
  canDrop,
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
  const { columns, cardLabels } = useMemo(
    () => readBoard(children),
    [children],
  );
  const drag = useKanbanDrag({
    enabled: draggable,
    columns,
    cardLabels,
    onCardMove,
    canDrop,
    t: translate,
  });
  const dragging = drag.state !== null;
  const context = useMemo(
    () => ({ width, bounded, drag }),
    [width, bounded, drag],
  );

  return (
    <KanbanBoardContext.Provider value={context}>
      <ScrollView
        horizontal
        role="region"
        accessibilityLabel={accessibilityLabel ?? translate("kanban.label")}
        showsHorizontalScrollIndicator
        snapToInterval={fits ? undefined : width + gap}
        snapToAlignment="start"
        decelerationRate={fits ? "normal" : "fast"}
        scrollEnabled={!dragging}
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
        {draggable ? (
          <KanbanDragLayer
            layerRef={drag.registerLayer}
            state={drag.state}
            ghost={drag.ghost}
          />
        ) : null}
      </ScrollView>
    </KanbanBoardContext.Provider>
  );
}

/**
 * The drop line and the floating copy of the picked-up card, over the
 * columns (it also gives the drag its coordinate origin)
 */
function KanbanDragLayer({
  layerRef,
  state,
  ghost,
}: {
  layerRef: KanbanDragApi["registerLayer"];
  state: KanbanDragApi["state"];
  ghost: KanbanDragApi["ghost"];
}) {
  const { tokens: t } = useTheme();
  return (
    <View
      ref={layerRef}
      pointerEvents="none"
      importantForAccessibility="no-hide-descendants"
      accessibilityElementsHidden
      style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0 }}
    >
      {state?.line ? (
        <View
          style={{
            position: "absolute",
            left: state.line.left,
            top: state.line.top,
            width: state.line.width,
            height: 2,
            borderRadius: 1,
            backgroundColor: t.colors["primary-color"],
          }}
        />
      ) : null}
      {state?.width !== undefined ? (
        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: state.width,
            opacity: 0.92,
            transform: [...ghost.getTranslateTransform(), { rotate: "1.5deg" }],
            shadowColor: "#000",
            shadowOpacity: 0.18,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 8,
          }}
        >
          {state.content}
        </Animated.View>
      ) : null}
    </View>
  );
}

/**
 * KanbanColumn: a status column of a KanbanBoard. The header shows an
 * optional accent dot (`color`), the `title`, a `count` badge and
 * `actions`; the cards (children) form a list (each child is wrapped in a
 * `listitem` view) that scrolls vertically within a bounded board; `empty`
 * replaces the list when there are no cards, and `footer` sits below. The
 * column is a group named by its title and count ("To do, 3 items").
 * `value` keys the column for drag and drop.
 */
export function KanbanColumn({
  title,
  value,
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
  const drag = board?.drag;
  const registerColumn = drag?.registerColumn;
  const rootRef = useCallback(
    (view: View | null) => {
      if (value) registerColumn?.(value, "root", view);
    },
    [registerColumn, value],
  );
  const bodyRef = useCallback(
    (view: View | null) => {
      if (value) registerColumn?.(value, "body", view);
    },
    [registerColumn, value],
  );
  const dropTarget =
    value !== undefined && drag?.state?.target?.column === value;
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
        ref={bodyRef}
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
        ref={bodyRef}
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
      ref={rootRef}
      role="group"
      accessibilityLabel={label}
      style={[
        {
          width: board?.width ?? COLUMN_WIDTH,
          ...(board?.bounded ? { flexShrink: 1 } : null),
          borderWidth: 1,
          borderColor: dropTarget
            ? t.colors["primary-color"]
            : t.colors["border-color"],
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
          scrollEnabled={!drag?.state}
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

/**
 * KanbanCard: a card of a KanbanColumn, keyed by `value`. In a draggable
 * board a long press picks it up (it then follows the finger and drops
 * where the finger lifts), and it is one accessible element with the
 * "Move up" / "Move down" / "Move to <column>" accessibility actions;
 * otherwise it renders a plain view.
 */
export function KanbanCard({
  value,
  label,
  children,
  style,
  onAccessibilityAction,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onTouchCancel,
  ...rest
}: KanbanCardProps) {
  const board = useContext(KanbanBoardContext);
  const drag = board?.drag;
  const enabled = !!drag?.enabled;
  const dragging = drag?.state?.card === value;
  const registerCard = drag?.registerCard;
  const ref = useCallback(
    (view: View | null) => registerCard?.(value, view),
    [registerCard, value],
  );
  // the floating copy renders the card's content
  const setContent = drag?.setContent;
  useEffect(() => {
    setContent?.(value, children);
  });
  useEffect(() => () => setContent?.(value, undefined), [setContent, value]);

  // a press waiting for the long press; once the card is picked up, the
  // board's drag session holds the gesture (it outlives a re-mount)
  const press = useRef<{
    x: number;
    y: number;
    timer: ReturnType<typeof setTimeout>;
  } | null>(null);
  const stopPress = () => {
    if (press.current) clearTimeout(press.current.timer);
    press.current = null;
  };
  useEffect(
    () => () => {
      if (press.current) clearTimeout(press.current.timer);
    },
    [],
  );

  const gestures = enabled
    ? {
        onTouchStart: (event: GestureResponderEvent) => {
          onTouchStart?.(event);
          stopPress();
          // a second finger is not a drag
          if (event.nativeEvent.touches?.length > 1) {
            if (drag!.active(value)) drag!.cancel();
            return;
          }
          const { pageX, pageY } = event.nativeEvent;
          press.current = {
            x: pageX,
            y: pageY,
            timer: setTimeout(() => {
              press.current = null;
              drag!.lift(value, pageX, pageY);
            }, LONG_PRESS),
          };
        },
        onTouchMove: (event: GestureResponderEvent) => {
          onTouchMove?.(event);
          const { pageX, pageY } = event.nativeEvent;
          if (drag!.active(value)) {
            drag!.move(pageX, pageY);
            return;
          }
          // moving before the long press is a scroll
          const current = press.current;
          if (
            current &&
            Math.hypot(pageX - current.x, pageY - current.y) > TOLERANCE
          )
            stopPress();
        },
        onTouchEnd: (event: GestureResponderEvent) => {
          onTouchEnd?.(event);
          stopPress();
          if (drag!.active(value)) drag!.drop();
        },
        onTouchCancel: (event: GestureResponderEvent) => {
          onTouchCancel?.(event);
          stopPress();
          if (drag!.active(value)) drag!.cancel();
        },
        // once picked up, the card owns the gesture: the board, a column or
        // a pressable inside the card stop handling it
        onMoveShouldSetResponderCapture: () => drag!.active(value),
        onResponderTerminationRequest: () => !drag!.active(value),
        onResponderTerminate: () => {
          if (drag!.active(value)) drag!.cancel();
        },
      }
    : { onTouchStart, onTouchMove, onTouchEnd, onTouchCancel };

  const accessibility = enabled
    ? {
        accessible: true,
        accessibilityLabel: label ?? rest.accessibilityLabel,
        accessibilityActions: drag!.actions(value),
        onAccessibilityAction: (event: AccessibilityActionEvent) => {
          onAccessibilityAction?.(event);
          drag!.act(value, event.nativeEvent.actionName);
        },
      }
    : { onAccessibilityAction };

  return (
    <View
      ref={ref}
      {...rest}
      {...accessibility}
      {...gestures}
      style={[dragging ? { opacity: 0.4 } : null, style]}
      {...part("kanban-card", "root")}
    >
      {children}
    </View>
  );
}
