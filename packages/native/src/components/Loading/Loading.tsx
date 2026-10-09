import type { ReactNode } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";
import { colorRole, textStyle, type NativeColor } from "../../internal/styles";

export type LoadingSize = "small" | "medium" | "large";

export interface LoadingProps extends Omit<ViewProps, "style" | "children"> {
  /**
   * Visible text next to the spinner, also its accessible name; `null`
   * shows the spinner alone (named by the "common.loading" message)
   * @default the "loadingState.label" message
   */
  label?: ReactNode | null;
  /**
   * Spinner and text size
   * @default "medium"
   */
  size?: LoadingSize;
  /**
   * Color of the spinner (`neutral`: the secondary text color)
   * @default "primary"
   */
  color?: NativeColor;
  /**
   * Stacks the label under the spinner instead of beside it
   * @default false
   */
  vertical?: boolean;
  /**
   * Covers its container (or the screen, at the root) with a translucent
   * mask and centers the indicator on it
   * @default false
   */
  overlay?: boolean;
  /** Style of the root view */
  style?: StyleProp<ViewStyle>;
}

const SPINNER = { small: 16, medium: 24, large: 36 } as const;
const FONT = { small: "sm", medium: "md", large: "lg" } as const;

/**
 * A loading indicator (alias `Spinner`; contract `LoadingState`): a native
 * `ActivityIndicator` with an optional label, announced as a busy progress
 * bar. `overlay` turns it into a mask over its container.
 */
export function Loading({
  label,
  size = "medium",
  color = "primary",
  vertical = false,
  overlay = false,
  style,
  accessibilityLabel,
  ...rest
}: LoadingProps) {
  const { tokens: t, fonts } = useTheme();
  const { t: translate } = useI18n();
  const shown = label === undefined ? translate("loadingState.label") : label;
  const tint =
    color === "neutral"
      ? t.colors["text-secondary-color"]
      : colorRole(t, color).solid;
  const name =
    accessibilityLabel ??
    (typeof shown === "string" || typeof shown === "number"
      ? String(shown)
      : translate("common.loading"));

  const indicator = (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={name}
      accessibilityState={{ busy: true }}
      aria-busy
      accessibilityLiveRegion="polite"
      {...part("loading", "root", { size, vertical, overlay })}
      {...rest}
      style={[
        {
          flexDirection: vertical ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          gap: vertical ? t.space["2"] : t.space["2-5"],
        },
        overlay
          ? {
              backgroundColor: t.colors["surface-elevated-color"],
              borderRadius: t.radius.lg,
              padding: t.space["5"],
              minWidth: 96,
            }
          : null,
        overlay ? null : style,
      ]}
    >
      <View
        style={{
          width: SPINNER[size],
          height: SPINNER[size],
          alignItems: "center",
          justifyContent: "center",
        }}
        {...part("loading", "spinner")}
      >
        <ActivityIndicator
          size={size === "large" ? "large" : "small"}
          color={tint}
          accessible={false}
          importantForAccessibility="no-hide-descendants"
          {...part("loading", "indicator")}
          style={
            size === "small" ? { transform: [{ scale: 0.75 }] } : undefined
          }
        />
      </View>
      {shown !== null && shown !== undefined && shown !== false ? (
        typeof shown === "string" || typeof shown === "number" ? (
          <Text
            style={[
              textStyle(t, FONT[size], fonts.sans),
              { color: t.colors["text-secondary-color"] },
            ]}
            {...part("loading", "label")}
          >
            {shown}
          </Text>
        ) : (
          shown
        )
      ) : null}
    </View>
  );

  if (!overlay) return indicator;
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: t.colors["overlay-color"],
          zIndex: 1000,
        },
        style,
      ]}
      {...part("loading", "overlay")}
    >
      {indicator}
    </View>
  );
}

/** `Loading` under its common mobile name */
export const Spinner = Loading;
