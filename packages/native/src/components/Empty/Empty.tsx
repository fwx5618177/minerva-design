import type { ReactNode } from "react";
import {
  Text,
  View,
  type DimensionValue,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";
import { shadowStyle, textStyle, weight } from "../../internal/styles";

export type EmptySize = "small" | "medium" | "large";

export interface EmptyProps extends Omit<ViewProps, "style" | "children"> {
  /** Heading of the empty state; also its accessible name */
  title?: ReactNode;
  /**
   * Description text; `null` hides it
   * @default the "empty.description" message
   */
  description?: ReactNode | null;
  /** Custom illustration replacing the built-in box; `null` hides it */
  image?: ReactNode | null;
  /** Custom icon (web contract name of `image`); `null` hides it */
  icon?: ReactNode | null;
  /** Primary call to action (e.g. a Button) */
  action?: ReactNode;
  /** Secondary action rendered after `action` */
  secondaryAction?: ReactNode;
  /**
   * Illustration, text sizes and padding
   * @default "medium"
   */
  size?: EmptySize;
  /** Width of the container */
  width?: DimensionValue;
  /** Height of the container */
  height?: DimensionValue;
  /**
   * Adds a drop shadow (and a surface background)
   * @default false
   */
  showShadow?: boolean;
  /** Extra content under the description */
  children?: ReactNode;
  /** Style of the root view */
  style?: StyleProp<ViewStyle>;
}

const ART = { small: 64, medium: 96, large: 128 } as const;

/** The built-in empty-box illustration, drawn with views (decorative) */
function EmptyBox({ size }: { size: number }) {
  const { tokens: t } = useTheme();
  const stroke = Math.max(1.5, Math.round(size / 40));
  const line = t.colors["border-strong-color"];
  const fill = t.colors["surface-subtle-color"];
  const bodyW = size * 0.68;
  const bodyH = size * 0.4;
  const flap = size * 0.22;
  return (
    <View
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      accessibilityElementsHidden
      style={{ width: size, height: size * 0.78, alignItems: "center" }}
      {...part("empty", "image")}
    >
      {/* floor shadow */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: size * 0.92,
          height: size * 0.12,
          borderRadius: size,
          backgroundColor: t.colors["surface-muted-color"],
        }}
      />
      {/* flaps */}
      <View
        style={{
          position: "absolute",
          top: size * 0.14,
          left: (size - bodyW) / 2 - flap * 0.55,
          width: flap,
          height: stroke,
          borderRadius: stroke,
          backgroundColor: line,
          transform: [{ rotate: "-28deg" }],
        }}
      />
      <View
        style={{
          position: "absolute",
          top: size * 0.14,
          right: (size - bodyW) / 2 - flap * 0.55,
          width: flap,
          height: stroke,
          borderRadius: stroke,
          backgroundColor: line,
          transform: [{ rotate: "28deg" }],
        }}
      />
      {/* box body */}
      <View
        style={{
          position: "absolute",
          top: size * 0.2,
          width: bodyW,
          height: bodyH,
          borderWidth: stroke,
          borderColor: line,
          backgroundColor: fill,
          borderBottomLeftRadius: t.radius.sm,
          borderBottomRightRadius: t.radius.sm,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: bodyW * 0.36,
            height: Math.max(stroke * 3, size * 0.07),
            borderRadius: size,
            borderWidth: stroke,
            borderColor: line,
            backgroundColor: t.colors["surface-color"],
          }}
        />
      </View>
    </View>
  );
}

/**
 * An empty state: a box illustration drawn with views (or a custom image),
 * a title, a description (localized "No data" by default) and actions.
 */
export function Empty({
  title,
  description,
  image,
  icon,
  action,
  secondaryAction,
  size = "medium",
  width,
  height,
  showShadow = false,
  children,
  style,
  accessibilityLabel,
  ...rest
}: EmptyProps) {
  const { tokens: t, fonts } = useTheme();
  const { t: translate } = useI18n();
  const desc =
    description === undefined ? translate("empty.description") : description;
  const art = image !== undefined ? image : icon;
  const titleText =
    typeof title === "string" || typeof title === "number"
      ? String(title)
      : undefined;
  const pad = {
    small: t.space["4"],
    medium: t.space["8"],
    large: t.space["12"],
  }[size];
  const titleSize = { small: "md", medium: "lg", large: "xl" } as const;
  const descSize = { small: "sm", medium: "md", large: "md" } as const;

  return (
    <View
      role="region"
      accessibilityLabel={accessibilityLabel ?? titleText}
      {...part("empty", "root", { size })}
      {...rest}
      style={[
        {
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: pad,
          paddingHorizontal: t.space["6"],
          gap: t.space["2"],
          width,
          height,
        },
        showShadow
          ? {
              backgroundColor: t.colors["surface-elevated-color"],
              borderRadius: t.radius.lg,
              ...shadowStyle(t.shadows.md),
            }
          : null,
        style,
      ]}
    >
      {art === undefined ? (
        <View style={{ marginBottom: t.space["2"] }}>
          <EmptyBox size={ART[size]} />
        </View>
      ) : art === null || art === false ? null : (
        <View
          style={{ marginBottom: t.space["2"] }}
          {...part("empty", "image")}
        >
          {art}
        </View>
      )}
      {title !== undefined && title !== null && (
        <Text
          accessibilityRole="header"
          style={[
            textStyle(t, titleSize[size], fonts.sans),
            { fontWeight: weight(t, "semibold"), textAlign: "center" },
          ]}
          {...part("empty", "title")}
        >
          {title}
        </Text>
      )}
      {desc !== null && desc !== false && desc !== undefined && (
        <Text
          style={[
            textStyle(t, descSize[size], fonts.sans),
            { color: t.colors["text-muted-color"], textAlign: "center" },
          ]}
          {...part("empty", "description")}
        >
          {desc}
        </Text>
      )}
      {children}
      {(action !== undefined || secondaryAction !== undefined) && (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: t.space["3"],
            marginTop: t.space["3"],
          }}
          {...part("empty", "actions")}
        >
          {action}
          {secondaryAction}
        </View>
      )}
    </View>
  );
}
