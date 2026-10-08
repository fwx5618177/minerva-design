import type { ReactNode } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useI18n, useInsets, useTheme } from "../../theme/MinervaProvider";
import { Icon } from "../../internal/Icon";
import {
  Overlay,
  type OverlayCloseReason,
  type OverlayPlacement,
} from "../../internal/Overlay";
import { part } from "../../internal/parts";
import { hitSlopFor, textStyle, weight } from "../../internal/styles";
import { useOverlay } from "../../internal/useOverlay";

/** Why a popup closed */
export type PopupCloseReason = OverlayCloseReason;
export type PopupPlacement = OverlayPlacement;
export type PopupSize = "small" | "medium" | "large" | "full";

export interface PopupProps {
  /** Controlled open state */
  open?: boolean;
  /**
   * Initial open state while uncontrolled
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Called with the requested open state and, when closing, the reason
   * ("mask", "back" for the Android back button, "close-button")
   */
  onOpenChange?: (open: boolean, reason?: PopupCloseReason) => void;
  /**
   * Edge the panel slides in from (`center`: a centered card). Mobile
   * default "bottom" (a bottom sheet); the web Drawer slides from the right
   * @default "bottom"
   */
  placement?: PopupPlacement;
  /** Web Drawer name of `placement` (used when `placement` is not set) */
  side?: "top" | "bottom" | "left" | "right";
  /**
   * Size preset: the width of a side panel, the maximum height of a top /
   * bottom sheet (`full`: the whole screen)
   * @default "medium"
   */
  size?: PopupSize;
  /** Title (also the accessible name of the panel) */
  title?: ReactNode;
  /** Text under the title */
  description?: ReactNode;
  /** Panel content */
  children?: ReactNode;
  /** Content pinned under the scrolling body (e.g. buttons) */
  footer?: ReactNode;
  /**
   * Rounds the panel corners on its open edges
   * @default true
   */
  round?: boolean;
  /**
   * Hides the close (×) button
   * @default false
   */
  hideCloseButton?: boolean;
  /**
   * Accessible label of the close button
   * @default the "drawer.close" message ("modal.close" when centered)
   */
  closeLabel?: string;
  /**
   * Closes on a press on the mask
   * @default true
   */
  closeOnMaskPress?: boolean;
  /**
   * Pads the panel with the safe-area insets of its edge
   * @default true
   */
  safeArea?: boolean;
  /**
   * Shows the drag handle (visual only) at the top of a bottom sheet
   * @default true for placement "bottom"
   */
  showHandle?: boolean;
  /** Accessible name of the panel when there is no string title */
  accessibilityLabel?: string;
  /** Style of the panel */
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const SIDE_WIDTH = { small: "60%", medium: "80%", large: "90%" } as const;
const SHEET_HEIGHT = { small: "40%", medium: "90%", large: "95%" } as const;

/**
 * A generic overlay panel (contract `Drawer`; alias `BottomSheet` for the
 * bottom placement): slides in from an edge or fades in at the center,
 * with an optional title, close button and drag handle, the mask and the
 * Android back button closing it. Runs on the disclosure machine of
 * @minerva/core (controlled or not).
 */
export function Popup({
  open,
  defaultOpen = false,
  onOpenChange,
  placement: placementProp,
  side,
  size = "medium",
  title,
  description,
  children,
  footer,
  round = true,
  hideCloseButton = false,
  closeLabel,
  closeOnMaskPress = true,
  safeArea = true,
  showHandle,
  accessibilityLabel,
  style,
  testID,
}: PopupProps) {
  const { tokens: t, fonts } = useTheme();
  const { t: translate } = useI18n();
  const insets = useInsets();
  const overlay = useOverlay({ open, defaultOpen, onOpenChange });
  if (overlay.state.phase === "closed") return null;

  const placement = placementProp ?? side ?? "bottom";
  const handle = showHandle ?? placement === "bottom";
  const horizontal = placement === "left" || placement === "right";
  const titleText =
    typeof title === "string" || typeof title === "number"
      ? String(title)
      : undefined;
  const closeSize = 28;
  const hasHeader =
    (title !== undefined && title !== null) ||
    (description !== undefined && description !== null);

  const sizing: ViewStyle =
    size === "full"
      ? horizontal
        ? { width: "100%", maxWidth: undefined }
        : placement === "center"
          ? { flex: 1, maxWidth: undefined }
          : { height: "100%", maxHeight: undefined }
      : horizontal
        ? { width: SIDE_WIDTH[size] }
        : placement === "center"
          ? {}
          : { maxHeight: SHEET_HEIGHT[size] };
  const corners: ViewStyle | null =
    round && size !== "full"
      ? null
      : {
          borderRadius: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        };

  return (
    <Overlay
      component="popup"
      phase={overlay.state.phase}
      onAnimationEnd={overlay.onAnimationEnd}
      onRequestClose={overlay.close}
      placement={placement}
      closeOnMaskPress={closeOnMaskPress}
      safeArea={safeArea}
      testID={testID}
      panelProps={{
        role: "dialog",
        accessibilityLabel: accessibilityLabel ?? titleText,
      }}
      panelStyle={[sizing, corners, style]}
    >
      {handle && (
        <View
          style={{ alignItems: "center", paddingTop: t.space["2"] }}
          {...part("popup", "handle")}
        >
          <View
            accessible={false}
            style={{
              width: 36,
              height: 5,
              borderRadius: 3,
              backgroundColor: t.colors["border-strong-color"],
            }}
          />
        </View>
      )}
      {hasHeader && (
        <View
          style={{
            paddingHorizontal: t.space["5"],
            paddingTop: handle ? t.space["2"] : t.space["5"],
            paddingBottom: t.space["3"],
            gap: t.space["1"],
            minHeight: hideCloseButton ? undefined : closeSize + t.space["4"],
            justifyContent: "center",
          }}
          {...part("popup", "header")}
        >
          {title !== undefined && title !== null && (
            <Text
              accessibilityRole="header"
              style={[
                textStyle(t, "lg", fonts.sans),
                {
                  fontWeight: weight(t, "semibold"),
                  textAlign: horizontal ? "left" : "center",
                  paddingHorizontal: hideCloseButton ? 0 : closeSize + 4,
                },
              ]}
              {...part("popup", "title")}
            >
              {title}
            </Text>
          )}
          {description !== undefined && description !== null && (
            <Text
              style={[
                textStyle(t, "sm", fonts.sans),
                {
                  color: t.colors["text-secondary-color"],
                  textAlign: horizontal ? "left" : "center",
                },
              ]}
              {...part("popup", "description")}
            >
              {description}
            </Text>
          )}
        </View>
      )}
      {children !== undefined && children !== null && (
        <ScrollView
          style={{ flexGrow: horizontal || size === "full" ? 1 : 0 }}
          contentContainerStyle={{
            paddingHorizontal: t.space["5"],
            paddingTop: hasHeader ? 0 : handle ? t.space["2"] : t.space["5"],
            paddingBottom: t.space["5"],
          }}
          {...part("popup", "body")}
        >
          {typeof children === "string" || typeof children === "number" ? (
            <Text style={textStyle(t, "md", fonts.sans)}>{children}</Text>
          ) : (
            children
          )}
        </ScrollView>
      )}
      {footer !== undefined && footer !== null && (
        <View
          style={{
            paddingHorizontal: t.space["5"],
            paddingBottom: t.space["4"],
          }}
          {...part("popup", "footer")}
        >
          {footer}
        </View>
      )}
      {!hideCloseButton && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            closeLabel ??
            translate(placement === "center" ? "modal.close" : "drawer.close")
          }
          hitSlop={hitSlopFor(t, closeSize, closeSize)}
          onPress={() => overlay.close("close-button")}
          style={({ pressed }) => ({
            position: "absolute",
            top:
              t.space["4"] +
              (safeArea && placement !== "bottom" && placement !== "center"
                ? insets.top
                : 0),
            right: t.space["4"],
            width: closeSize,
            height: closeSize,
            borderRadius: closeSize / 2,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: pressed
              ? t.colors["surface-muted-color"]
              : "transparent",
          })}
          {...part("popup", "close")}
        >
          <Icon name="close" size={14} color={t.colors["text-muted-color"]} />
        </Pressable>
      )}
    </Overlay>
  );
}

/** Props of `BottomSheet` (a `Popup` from the bottom edge) */
export type BottomSheetProps = Omit<PopupProps, "placement" | "side">;

/** A `Popup` sliding up from the bottom edge, with a drag handle */
export function BottomSheet(props: BottomSheetProps) {
  return <Popup {...props} placement="bottom" />;
}
