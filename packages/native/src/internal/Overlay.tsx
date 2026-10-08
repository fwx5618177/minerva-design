// Shared modal layer of Dialog, Popup (bottom sheet), ActionSheet and the
// Select / Picker sheets: an RN `Modal` (own window, Android back button
// through `onRequestClose`) with a token-colored mask and a panel that
// fades / slides in. Presence follows the disclosure machine of
// @minerva/core: the Modal stays mounted during the "closing" phase and the
// end of each animation is reported with ANIMATION_END.
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Animated,
  Easing,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import type { DisclosurePhase } from "@minerva/core";
import { useInsets, useTheme } from "../theme/MinervaProvider";
import { part } from "./parts";
import { duration, shadowStyle } from "./styles";

export type OverlayPlacement = "center" | "bottom" | "top" | "left" | "right";

/** Why an overlay asks to close */
export type OverlayCloseReason =
  "mask" | "back" | "close-button" | "action" | "cancel" | "confirm";

export interface OverlayProps {
  /** Styling-hook component name (`modal`, `popup`, `action-sheet`...) */
  component: string;
  phase: DisclosurePhase;
  /** End of the enter / exit animation (send ANIMATION_END) */
  onAnimationEnd: () => void;
  /** Mask press / Android back */
  onRequestClose: (reason: OverlayCloseReason) => void;
  placement?: OverlayPlacement;
  /** @default true */
  closeOnMaskPress?: boolean;
  /** Pads the panel with the safe-area insets of its edge @default true */
  safeArea?: boolean;
  /** Accessibility props of the panel (role, label...) */
  panelProps?: object;
  panelStyle?: StyleProp<ViewStyle>;
  maskStyle?: StyleProp<ViewStyle>;
  testID?: string;
  children?: ReactNode;
}

const nativeDriver = Platform.OS !== "web";

export function Overlay({
  component,
  phase,
  onAnimationEnd,
  onRequestClose,
  placement = "center",
  closeOnMaskPress = true,
  safeArea = true,
  panelProps,
  panelStyle,
  maskStyle,
  testID,
  children,
}: OverlayProps) {
  const { tokens: t } = useTheme();
  const insets = useInsets();
  const [progress] = useState(
    () => new Animated.Value(phase === "open" ? 1 : 0),
  );
  const ms = duration(t, "base");
  const end = useRef(onAnimationEnd);
  useEffect(() => {
    end.current = onAnimationEnd;
  });

  useEffect(() => {
    if (phase !== "opening" && phase !== "closing") return;
    const to = phase === "opening" ? 1 : 0;
    if (ms <= 0) {
      progress.setValue(to);
      end.current();
      return;
    }
    const animation = Animated.timing(progress, {
      toValue: to,
      duration: ms,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: nativeDriver,
    });
    let done = false;
    animation.start(({ finished }) => {
      done = true;
      // a stopped animation (unmount, StrictMode re-run, phase change) is
      // not the end of the transition
      if (finished) end.current();
    });
    return () => {
      if (!done) animation.stop();
    };
  }, [phase, ms, progress]);

  const visible = phase !== "closed";
  const travel = placement === "center" ? 24 : 480;
  const transform =
    placement === "center"
      ? [
          {
            scale: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0.96, 1],
            }),
          },
        ]
      : placement === "left" || placement === "right"
        ? [
            {
              translateX: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [placement === "left" ? -travel : travel, 0],
              }),
            },
          ]
        : [
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [placement === "top" ? -travel : travel, 0],
              }),
            },
          ];

  const edgePadding: ViewStyle = safeArea
    ? placement === "bottom"
      ? { paddingBottom: insets.bottom }
      : placement === "top"
        ? { paddingTop: insets.top }
        : placement === "left"
          ? { paddingLeft: insets.left, paddingTop: insets.top }
          : placement === "right"
            ? { paddingRight: insets.right, paddingTop: insets.top }
            : {}
    : {};

  const align: ViewStyle =
    placement === "center"
      ? {
          justifyContent: "center",
          alignItems: "center",
          padding: t.space["6"],
        }
      : placement === "bottom"
        ? { justifyContent: "flex-end" }
        : placement === "top"
          ? { justifyContent: "flex-start" }
          : {
              flexDirection: "row",
              justifyContent: placement === "left" ? "flex-start" : "flex-end",
            };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={() => onRequestClose("back")}
      testID={testID}
    >
      <View style={[StyleSheet.absoluteFill, align]}>
        <Animated.View
          style={[StyleSheet.absoluteFill, { opacity: progress }]}
          pointerEvents="box-none"
        >
          <Pressable
            accessibilityRole="button"
            accessible={false}
            importantForAccessibility="no"
            onPress={
              closeOnMaskPress ? () => onRequestClose("mask") : undefined
            }
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: t.colors["overlay-color"] },
              maskStyle,
            ]}
            {...part(component, "overlay")}
          />
        </Animated.View>
        <Animated.View
          accessibilityViewIsModal
          aria-modal
          {...panelProps}
          {...part(component, "content")}
          style={[
            {
              backgroundColor: t.colors["surface-elevated-color"],
              opacity: placement === "center" ? progress : 1,
              transform,
              ...shadowStyle(t.shadows.lg),
            },
            placement === "center"
              ? {
                  borderRadius: t.radius.xl,
                  width: "100%",
                  maxWidth: 420,
                }
              : placement === "bottom"
                ? {
                    borderTopLeftRadius: t.radius.xl,
                    borderTopRightRadius: t.radius.xl,
                    maxHeight: "90%",
                  }
                : placement === "top"
                  ? {
                      borderBottomLeftRadius: t.radius.xl,
                      borderBottomRightRadius: t.radius.xl,
                    }
                  : { height: "100%", width: "80%", maxWidth: 360 },
            edgePadding,
            panelStyle,
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}
