import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
  type ReactNode,
  type Ref,
} from "react";
import {
  Animated,
  Easing,
  PanResponder,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type AccessibilityActionEvent,
  type LayoutChangeEvent,
  type PanResponderGestureState,
  type PanResponderInstance,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";
import {
  colorRole,
  duration,
  textStyle,
  weight,
  type NativeColor,
} from "../../internal/styles";

/** Side of a swipe cell's actions */
export type SwipeCellSide = "left" | "right";

/** An action button revealed by a swipe */
export interface SwipeCellAction {
  /** Text of the button (also its accessibility action label) */
  text: string;
  /** Accessibility action name @default `text` */
  name?: string;
  /** Background color role @default "danger" for the last right action, else "neutral" */
  color?: NativeColor;
  /** Called by the button and its accessibility action */
  onPress?: () => void;
}

/** Imperative handle of `SwipeCell` (`ref`) */
export interface SwipeCellHandle {
  /** Reveals the actions of a side */
  open: (side?: SwipeCellSide) => void;
  /** Hides the actions */
  close: () => void;
}

export interface SwipeCellProps extends Omit<ViewProps, "style" | "children"> {
  /** Row content */
  children?: ReactNode;
  /** Action buttons revealed by swiping right (shown on the left) */
  leftActions?: readonly SwipeCellAction[];
  /** Action buttons revealed by swiping left (shown on the right) */
  rightActions?: readonly SwipeCellAction[];
  /** Custom content revealed on the left (replaces `leftActions`) */
  left?: ReactNode;
  /** Custom content revealed on the right (replaces `rightActions`) */
  right?: ReactNode;
  /**
   * Disables swiping
   * @default false
   */
  disabled?: boolean;
  /**
   * Closes the cell after an action button press
   * @default true
   */
  closeOnActionPress?: boolean;
  /** Called when a side opens */
  onOpen?: (side: SwipeCellSide) => void;
  /** Called when the cell closes */
  onClose?: () => void;
  /** Imperative `open(side)` / `close()` */
  ref?: Ref<SwipeCellHandle>;
  /** Style of the row container */
  style?: StyleProp<ViewStyle>;
  /** Style of the sliding content */
  contentStyle?: StyleProp<ViewStyle>;
}

const nativeDriver = Platform.OS !== "web";
/** Share of the actions width a swipe must pass to open */
const OPEN_RATIO = 0.3;

interface SwipeOptions {
  widths: { left: number; right: number };
  disabled: boolean;
  ms: number;
  onOpen?: (side: SwipeCellSide) => void;
  onClose?: () => void;
}

/** Drag / settle logic of a swipe cell, shared by gestures and the ref */
class SwipeController {
  side: SwipeCellSide | null = null;
  options: SwipeOptions = {
    widths: { left: 0, right: 0 },
    disabled: false,
    ms: 0,
  };
  readonly panHandlers: PanResponderInstance["panHandlers"];

  private readonly x: Animated.Value;
  private readonly onSide: (side: SwipeCellSide | null) => void;

  constructor(x: Animated.Value, onSide: (side: SwipeCellSide | null) => void) {
    this.x = x;
    this.onSide = onSide;
    const horizontal = (g: PanResponderGestureState) =>
      Math.abs(g.dx) > 8 && Math.abs(g.dx) > Math.abs(g.dy) * 1.5;
    this.panHandlers = PanResponder.create({
      // an open cell takes the next touch (a tap closes it)
      onStartShouldSetPanResponderCapture: () =>
        !this.options.disabled && this.side !== null,
      onMoveShouldSetPanResponder: (_, g) =>
        !this.options.disabled && horizontal(g),
      onPanResponderTerminationRequest: () => false,
      onPanResponderMove: (_, g) => this.x.setValue(this.position(g.dx)),
      onPanResponderRelease: (_, g) => this.release(g),
      onPanResponderTerminate: () => this.settle(this.side),
    }).panHandlers;
  }

  update(options: SwipeOptions) {
    this.options = options;
  }

  /** Translation of a side (0: closed) */
  private offsetOf(side: SwipeCellSide | null) {
    const { widths } = this.options;
    return side === "left" ? widths.left : side === "right" ? -widths.right : 0;
  }

  private position(dx: number) {
    const { widths } = this.options;
    return Math.min(
      widths.left,
      Math.max(-widths.right, this.offsetOf(this.side) + dx),
    );
  }

  private release(g: PanResponderGestureState) {
    const { widths } = this.options;
    const current = this.side;
    if (current !== null && Math.abs(g.dx) < 8 && Math.abs(g.dy) < 8) {
      this.settle(null);
      return;
    }
    const at = this.position(g.dx);
    const fast = Math.abs(g.vx) > 0.5;
    if (at > 0 && widths.left > 0) {
      const open =
        current === "left"
          ? at > widths.left * (1 - OPEN_RATIO) && !(fast && g.vx < 0)
          : at > widths.left * OPEN_RATIO || (fast && g.vx > 0);
      this.settle(open ? "left" : null);
    } else if (at < 0 && widths.right > 0) {
      const open =
        current === "right"
          ? -at > widths.right * (1 - OPEN_RATIO) && !(fast && g.vx > 0)
          : -at > widths.right * OPEN_RATIO || (fast && g.vx < 0);
      this.settle(open ? "right" : null);
    } else {
      this.settle(null);
    }
  }

  /** Animates to a side (or closed) and reports the change */
  settle(next: SwipeCellSide | null) {
    const to = this.offsetOf(next);
    if (this.options.ms > 0) {
      Animated.timing(this.x, {
        toValue: to,
        duration: this.options.ms,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: nativeDriver,
      }).start();
    } else {
      this.x.setValue(to);
    }
    if (next === this.side) return;
    this.side = next;
    this.onSide(next);
    if (next) this.options.onOpen?.(next);
    else this.options.onClose?.();
  }
}

/**
 * A row that slides to reveal action buttons on its left / right (delete,
 * archive...). Built on PanResponder + Animated; `ref.open(side)` /
 * `ref.close()` drive it, and every action is also an accessibility
 * action of the row, so screen-reader users never need to swipe.
 */
export function SwipeCell({
  children,
  leftActions,
  rightActions,
  left,
  right,
  disabled = false,
  closeOnActionPress = true,
  onOpen,
  onClose,
  ref,
  style,
  contentStyle,
  accessibilityHint,
  accessibilityActions,
  onAccessibilityAction,
  ...rest
}: SwipeCellProps) {
  const { tokens: t, fonts } = useTheme();
  const { t: translate } = useI18n();
  const [x] = useState(() => new Animated.Value(0));
  const [side, setSide] = useState<SwipeCellSide | null>(null);
  const [widths, setWidths] = useState({ left: 0, right: 0 });
  const ms = duration(t, "base");

  // gesture state outside React (PanResponder handlers are created once)
  const [swipe] = useState(() => new SwipeController(x, setSide));
  useEffect(() => {
    swipe.update({ widths, disabled, ms, onOpen, onClose });
  });
  const settle = useCallback(
    (next: SwipeCellSide | null) => swipe.settle(next),
    [swipe],
  );

  useImperativeHandle(
    ref,
    () => ({
      open: (which: SwipeCellSide = "right") => settle(which),
      close: () => settle(null),
    }),
    [settle],
  );

  const lefts = leftActions ?? [];
  const rights = rightActions ?? [];
  const all = [...lefts, ...rights];
  const actionName = (action: SwipeCellAction) => action.name ?? action.text;

  const runAction = (action: SwipeCellAction) => {
    action.onPress?.();
    if (closeOnActionPress) settle(null);
  };

  const renderActions = (
    actions: readonly SwipeCellAction[],
    which: SwipeCellSide,
  ) =>
    actions.map((action, index) => {
      const role = colorRole(
        t,
        action.color ??
          (which === "right" && index === actions.length - 1
            ? "danger"
            : "neutral"),
      );
      return (
        <Pressable
          key={`${actionName(action)}-${index}`}
          accessibilityRole="button"
          onPress={() => runAction(action)}
          {...part("swipe-cell", "action", { side: which })}
          style={({ pressed }) => ({
            minWidth: t.sizes["control-height-lg"] + t.space["4"],
            paddingHorizontal: t.space["4"],
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: pressed ? role.pressed : role.solid,
          })}
        >
          <Text
            numberOfLines={1}
            style={[
              textStyle(t, "md", fonts.sans),
              { color: role.onSolid, fontWeight: weight(t, "medium") },
            ]}
          >
            {action.text}
          </Text>
        </Pressable>
      );
    });

  const measure =
    (which: SwipeCellSide) =>
    ({ nativeEvent }: LayoutChangeEvent) => {
      const width = nativeEvent.layout.width;
      setWidths((w) => (w[which] === width ? w : { ...w, [which]: width }));
    };

  const leftContent =
    left ?? (lefts.length ? renderActions(lefts, "left") : null);
  const rightContent =
    right ?? (rights.length ? renderActions(rights, "right") : null);
  const hiddenWhen = (which: SwipeCellSide) =>
    side === which
      ? {}
      : {
          importantForAccessibility: "no-hide-descendants" as const,
          accessibilityElementsHidden: true,
        };

  const a11yActions = all.map((action) => ({
    name: actionName(action),
    label: action.text,
  }));
  const handleAccessibilityAction = (event: AccessibilityActionEvent) => {
    onAccessibilityAction?.(event);
    const action = all.find(
      (candidate) => actionName(candidate) === event.nativeEvent.actionName,
    );
    if (action) runAction(action);
  };

  return (
    <View
      {...part("swipe-cell", "root", { open: side ?? undefined, disabled })}
      style={[
        { overflow: "hidden", backgroundColor: t.colors["surface-color"] },
        style,
      ]}
    >
      {leftContent !== null && (
        <View
          onLayout={measure("left")}
          {...hiddenWhen("left")}
          style={[styles.side, { left: 0 }]}
          {...part("swipe-cell", "left")}
        >
          {leftContent}
        </View>
      )}
      {rightContent !== null && (
        <View
          onLayout={measure("right")}
          {...hiddenWhen("right")}
          style={[styles.side, { right: 0 }]}
          {...part("swipe-cell", "right")}
        >
          {rightContent}
        </View>
      )}
      <Animated.View
        {...swipe.panHandlers}
        {...part("swipe-cell", "content")}
        style={[
          {
            backgroundColor: t.colors["surface-color"],
            transform: [{ translateX: x }],
          },
          contentStyle,
        ]}
      >
        <View
          accessible={all.length > 0 ? true : undefined}
          accessibilityHint={
            accessibilityHint ??
            (all.length ? translate("swipeCell.actions") : undefined)
          }
          accessibilityActions={[
            ...(accessibilityActions ?? []),
            ...a11yActions,
          ]}
          onAccessibilityAction={handleAccessibilityAction}
          {...rest}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  side: {
    position: "absolute",
    top: 0,
    bottom: 0,
    flexDirection: "row",
  },
});
