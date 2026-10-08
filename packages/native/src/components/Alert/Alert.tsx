import { useEffect, useState, type ReactNode } from "react";
import {
  AccessibilityInfo,
  Animated,
  Easing,
  Platform,
  Pressable,
  Text,
  View,
  type GestureResponderEvent,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { Icon } from "../../internal/Icon";
import { part } from "../../internal/parts";
import {
  colorRole,
  hitSlopFor,
  shadowStyle,
  textStyle,
  weight,
} from "../../internal/styles";
import { useControllable } from "../../internal/useControllable";

export type AlertColor = "info" | "success" | "warning" | "danger";
export type AlertVariant = "subtle" | "outline" | "solid";
export type AlertSize = "small" | "medium" | "large";

export interface AlertProps extends Omit<ViewProps, "style" | "children"> {
  /** Alert title */
  title?: ReactNode;
  /** Description (body) of the alert */
  children?: ReactNode;
  /**
   * Semantic (status) color, which also sets the default icon and the role
   * @default "info"
   */
  color?: AlertColor;
  /**
   * Visual style: `subtle` (tinted background), `outline` (colored border)
   * or `solid` (filled)
   * @default "subtle"
   */
  variant?: AlertVariant;
  /**
   * Alert size (padding and text sizes)
   * @default "medium"
   */
  size?: AlertSize;
  /**
   * Shows the status icon of the color
   * @default true
   */
  showIcon?: boolean;
  /** Custom icon, replacing the status icon */
  icon?: ReactNode;
  /** Accessible label of the status icon @default the "alert.icon.<color>" message */
  iconLabel?: string;
  /**
   * Shows a close button; pressing it hides the alert and calls `onClose`
   * @default false
   */
  closable?: boolean;
  /** Custom close icon */
  closeIcon?: ReactNode;
  /** Called when the close button is pressed */
  onClose?: (event: GestureResponderEvent) => void;
  /** Accessible label of the close button @default the "alert.close" message */
  closeLabel?: string;
  /** Action area rendered on the right, e.g. buttons */
  action?: ReactNode;
  /**
   * Banner mode for page-level notices: full width, square corners, no side
   * borders
   * @default false
   */
  banner?: boolean;
  /**
   * Adds a drop shadow
   * @default false
   */
  elevation?: boolean;
  /**
   * Rounds the corners
   * @default true
   */
  rounded?: boolean;
  /** Custom corner radius */
  borderRadius?: number;
  /**
   * Plays an entrance animation (fade + slide; none under reduced motion)
   * @default true
   */
  animation?: boolean;
  /**
   * Lets the description be expanded and collapsed (requires a title)
   * @default false
   */
  collapsible?: boolean;
  /** Whether the description is expanded (controlled; pair with `onExpand`) */
  expanded?: boolean;
  /**
   * Whether the description is initially expanded (uncontrolled)
   * @default true
   */
  defaultExpanded?: boolean;
  /** Called with the requested expanded state */
  onExpand?: (expanded: boolean) => void;
  /** Accessible label of the toggle while collapsed @default the "alert.expand" message */
  expandLabel?: string;
  /** Accessible label of the toggle while expanded @default the "alert.collapse" message */
  collapseLabel?: string;
  /**
   * Role of the alert: danger and warning interrupt ("alert", assertive
   * live region), info and success are polite ("status")
   * @default "alert" for danger / warning, else "status"
   */
  role?: "alert" | "status";
  /** Style of the root view */
  style?: StyleProp<ViewStyle>;
}

const nativeDriver = Platform.OS !== "web";
const PAD = { small: "2-5", medium: "3", large: "4" } as const;
const FONT = { small: "sm", medium: "md", large: "lg" } as const;
const ICON = { small: 16, medium: 18, large: 22 } as const;

/**
 * An inline status message: info / success / warning / danger in subtle,
 * outline or solid style, with a title, a description, an action, a close
 * button and an optional collapsible body. Danger and warning alerts are
 * announced at once (assertive), the others politely.
 */
export function Alert({
  title,
  children,
  color = "info",
  variant = "subtle",
  size = "medium",
  showIcon = true,
  icon,
  iconLabel,
  closable = false,
  closeIcon,
  onClose,
  closeLabel,
  action,
  banner = false,
  elevation = false,
  rounded = true,
  borderRadius,
  animation = true,
  collapsible = false,
  expanded: expandedProp,
  defaultExpanded = true,
  onExpand,
  expandLabel,
  collapseLabel,
  role,
  style,
  ...rest
}: AlertProps) {
  const { tokens: t, fonts, reducedMotion } = useTheme();
  const { t: translate } = useI18n();
  const [visible, setVisible] = useState(true);
  const [expanded, setExpanded] = useControllable(
    expandedProp,
    defaultExpanded,
    onExpand,
  );
  const ms =
    animation && !reducedMotion ? (t.transitions.base?.duration ?? 0) : 0;
  const [enter] = useState(() => new Animated.Value(ms > 0 ? 0 : 1));
  const urgent = color === "danger" || color === "warning";
  const resolvedRole = role ?? (urgent ? "alert" : "status");

  useEffect(() => {
    if (ms <= 0) return;
    const anim = Animated.timing(enter, {
      toValue: 1,
      duration: ms,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: nativeDriver,
    });
    anim.start();
    return () => anim.stop();
  }, [enter, ms]);

  const titleText =
    typeof title === "string" || typeof title === "number"
      ? String(title)
      : undefined;
  const bodyText =
    typeof children === "string" || typeof children === "number"
      ? String(children)
      : undefined;
  useEffect(() => {
    // iOS has no live regions: speak urgent alerts when they appear
    if (resolvedRole !== "alert" || Platform.OS !== "ios") return;
    const text = [titleText, bodyText].filter(Boolean).join(". ");
    if (text) AccessibilityInfo.announceForAccessibility?.(text);
    // announce once, on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  const c = colorRole(t, color);
  const solid = variant === "solid";
  const fg = solid ? c.onSolid : t.colors["text-color"];
  const muted = solid ? c.onSolid : t.colors["text-secondary-color"];
  const isCollapsible = collapsible && title !== undefined && title !== null;
  const hasContent =
    children !== undefined &&
    children !== null &&
    children !== false &&
    children !== "";
  const showBody = hasContent && (!isCollapsible || expanded);
  const iconSize = ICON[size];
  const radius = banner || !rounded ? 0 : (borderRadius ?? t.radius.lg);
  const boxStyle: ViewStyle = {
    backgroundColor: solid
      ? c.solid
      : variant === "outline"
        ? "transparent"
        : c.subtle,
    borderColor: solid ? c.solid : c.border,
    borderWidth: banner ? 0 : variant === "subtle" ? 0 : 1,
    borderBottomWidth: banner ? 1 : undefined,
    borderRadius: radius,
  };
  const textNode = (node: ReactNode, strong: boolean) =>
    typeof node === "string" || typeof node === "number" ? (
      <Text
        style={[
          textStyle(
            t,
            strong || !title ? FONT[size] : size === "large" ? "md" : "sm",
            fonts.sans,
          ),
          {
            color: strong ? fg : title ? muted : fg,
            fontWeight: strong ? weight(t, "semibold") : undefined,
          },
        ]}
      >
        {node}
      </Text>
    ) : (
      node
    );
  const small = 24;

  return (
    <Animated.View
      role={resolvedRole}
      accessibilityLiveRegion={urgent ? "assertive" : "polite"}
      accessibilityLabel={titleText}
      {...part("alert", "root", {
        color,
        variant,
        size,
        banner,
        state: isCollapsible ? (expanded ? "open" : "closed") : undefined,
      })}
      {...rest}
      style={[
        {
          flexDirection: "row",
          alignItems: title && showBody ? "flex-start" : "center",
          gap: t.space["2-5"],
          padding: t.space[PAD[size]],
          paddingHorizontal: banner ? t.space["4"] : t.space[PAD[size]] + 2,
          opacity: enter,
          transform: [
            {
              translateY: enter.interpolate({
                inputRange: [0, 1],
                outputRange: [-6, 0],
              }),
            },
          ],
        },
        boxStyle,
        elevation ? shadowStyle(t.shadows.md) : null,
        style,
      ]}
    >
      {showIcon && (
        <View
          accessible
          role="img"
          accessibilityLabel={iconLabel ?? translate(`alert.icon.${color}`)}
          style={{ paddingTop: title && showBody ? 2 : 0 }}
          {...part("alert", "icon")}
        >
          {icon ?? (
            <Icon
              name={color}
              size={iconSize}
              color={solid ? c.onSolid : c.solid}
              contrast={solid ? c.solid : c.onSolid}
            />
          )}
        </View>
      )}
      <View style={{ flex: 1, gap: t.space["1"] }}>
        {title !== undefined && title !== null && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: t.space["2"],
            }}
            {...part("alert", "title")}
          >
            <View style={{ flex: 1 }}>{textNode(title, true)}</View>
            {isCollapsible && (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={
                  expanded
                    ? (collapseLabel ?? translate("alert.collapse"))
                    : (expandLabel ?? translate("alert.expand"))
                }
                accessibilityState={{ expanded }}
                aria-expanded={expanded}
                hitSlop={hitSlopFor(t, small, small)}
                onPress={() => setExpanded(!expanded)}
                style={({ pressed }) => ({
                  width: small,
                  height: small,
                  borderRadius: small / 2,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: pressed
                    ? solid
                      ? c.pressed
                      : t.colors["surface-muted-color"]
                    : "transparent",
                })}
                {...part("alert", "trigger")}
              >
                <Icon
                  name={expanded ? "chevron-up" : "chevron-down"}
                  size={14}
                  color={muted}
                />
              </Pressable>
            )}
          </View>
        )}
        {showBody && (
          <View {...part("alert", "description")}>
            {textNode(children, false)}
          </View>
        )}
      </View>
      {action !== undefined && action !== null && (
        <View {...part("alert", "action")}>{action}</View>
      )}
      {closable && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={closeLabel ?? translate("alert.close")}
          hitSlop={hitSlopFor(t, small, small)}
          onPress={(event) => {
            onClose?.(event);
            setVisible(false);
          }}
          style={({ pressed }) => ({
            width: small,
            height: small,
            borderRadius: small / 2,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: pressed
              ? solid
                ? c.pressed
                : t.colors["surface-muted-color"]
              : "transparent",
          })}
          {...part("alert", "close-button")}
        >
          {closeIcon ?? <Icon name="close" size={12} color={muted} />}
        </Pressable>
      )}
    </Animated.View>
  );
}
