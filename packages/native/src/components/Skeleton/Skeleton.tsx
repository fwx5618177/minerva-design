import { useEffect, useState, type ReactNode } from "react";
import {
  Animated,
  Easing,
  Platform,
  View,
  type DimensionValue,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import type { ResolvedTokens } from "@minerva/core";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";

export type SkeletonVariant =
  "text" | "circular" | "rectangular" | "rounded" | "button" | "image";
export type SkeletonAnimation = "pulse" | "wave" | false;

export interface SkeletonProps extends Omit<ViewProps, "style" | "children"> {
  /**
   * Shape of each placeholder block
   * @default "text"
   */
  variant?: SkeletonVariant;
  /**
   * Loading animation (`false`: static; always static under reduced motion)
   * @default "pulse"
   */
  animation?: SkeletonAnimation;
  /**
   * Shows the placeholder; `false` renders the children instead
   * @default true
   */
  loading?: boolean;
  /** Content shown once `loading` is false */
  children?: ReactNode;
  /**
   * One bare placeholder block hidden from accessibility (no busy region),
   * for composing custom layouts
   * @default false
   */
  decorative?: boolean;
  /** Edge length of a circular placeholder (wins over width / height) */
  size?: number;
  /** Width of each block (dp or percentage) */
  width?: DimensionValue;
  /** Height of each block (dp or percentage) */
  height?: DimensionValue;
  /** Corner radius of each block, overriding the variant's */
  borderRadius?: number;
  /**
   * Number of blocks (lines) rendered
   * @default 1
   */
  lines?: number;
  /**
   * Shows an avatar placeholder before the lines
   * @default false
   */
  avatar?: boolean;
  /**
   * Avatar edge length in dp
   * @default 40
   */
  avatarSize?: number;
  /**
   * Avatar shape
   * @default "circle"
   */
  avatarShape?: "circle" | "square";
  /**
   * Shows a title placeholder (replaces the lines)
   * @default false
   */
  title?: boolean;
  /**
   * Shows a four-line paragraph placeholder (replaces the lines)
   * @default false
   */
  paragraph?: boolean;
  /** Accessible name of the busy region @default the "common.loading" message */
  accessibilityLabel?: string;
  /** Style of the root view */
  style?: StyleProp<ViewStyle>;
}

const nativeDriver = Platform.OS !== "web";

function defaults(
  t: ResolvedTokens,
  variant: SkeletonVariant,
): { width: DimensionValue; height: DimensionValue; radius: number } {
  switch (variant) {
    case "circular":
      return { width: 32, height: 32, radius: 9999 };
    case "rectangular":
      return { width: "100%", height: 96, radius: 0 };
    case "rounded":
      return { width: "100%", height: 96, radius: t.radius.lg };
    case "button":
      return {
        width: 96,
        height: t.sizes["control-height-md"],
        radius: t.radius.lg,
      };
    case "image":
      return { width: "100%", height: 160, radius: t.radius.md };
    default:
      return {
        width: "100%",
        height: Math.round(t.fontSize.md * 1.15),
        radius: t.radius.sm,
      };
  }
}

/** Opacity pulse or a 0 -> 1 sweep, shared by every block */
function useShimmer(kind: SkeletonAnimation, ms: number): Animated.Value {
  const [anim] = useState(() => new Animated.Value(0));
  useEffect(() => {
    if (!kind || ms <= 0) return;
    const timing = (toValue: number) =>
      Animated.timing(anim, {
        toValue,
        duration: kind === "pulse" ? ms / 2 : ms,
        easing: kind === "pulse" ? Easing.inOut(Easing.ease) : Easing.linear,
        useNativeDriver: nativeDriver,
      });
    const loop = Animated.loop(
      kind === "pulse"
        ? Animated.sequence([timing(1), timing(0)])
        : Animated.sequence([timing(1), Animated.delay(ms / 3)]),
      kind === "wave" ? { resetBeforeIteration: true } : undefined,
    );
    loop.start();
    return () => {
      loop.stop();
      anim.setValue(0);
    };
  }, [kind, ms, anim]);
  return anim;
}

interface BlockProps {
  shimmer: Animated.Value;
  animation: SkeletonAnimation;
  style: ViewStyle;
  name: string;
}

function Block({ shimmer, animation, style, name }: BlockProps) {
  const { tokens: t } = useTheme();
  const [width, setWidth] = useState(0);
  const base = t.colors["surface-muted-color"];
  return (
    <Animated.View
      onLayout={
        animation === "wave"
          ? (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)
          : undefined
      }
      style={[
        { backgroundColor: base, overflow: "hidden" },
        style,
        animation === "pulse"
          ? {
              opacity: shimmer.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.45],
              }),
            }
          : null,
      ]}
      {...part("skeleton", name)}
    >
      {animation === "wave" && width > 0 && (
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: Math.max(width * 0.4, 24),
            backgroundColor: t.colors["surface-subtle-color"],
            opacity: 0.7,
            transform: [
              {
                translateX: shimmer.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-Math.max(width * 0.4, 24), width],
                }),
              },
            ],
          }}
        />
      )}
    </Animated.View>
  );
}

const PARAGRAPH: DimensionValue[] = ["100%", "100%", "92%", "60%"];

/**
 * Loading placeholders: text lines, circles, rectangles, buttons or images,
 * or an avatar + title + paragraph composition; renders its children once
 * `loading` is false. Announced as one busy status region; pulses or sweeps
 * (static under reduced motion).
 */
export function Skeleton({
  variant = "text",
  animation = "pulse",
  loading = true,
  children,
  decorative = false,
  size,
  width,
  height,
  borderRadius,
  lines = 1,
  avatar = false,
  avatarSize = 40,
  avatarShape = "circle",
  title = false,
  paragraph = false,
  accessibilityLabel,
  style,
  ...rest
}: SkeletonProps) {
  const { tokens: t, reducedMotion } = useTheme();
  const { t: translate } = useI18n();
  const kind = reducedMotion ? false : animation;
  const shimmer = useShimmer(kind, 1400);
  if (!loading) return <>{children}</>;

  const d = defaults(t, variant);
  const radius = borderRadius ?? d.radius;
  const dim = variant === "circular" ? (size ?? undefined) : undefined;
  const blockStyle: ViewStyle = {
    width: dim ?? width ?? d.width,
    height: dim ?? height ?? d.height,
    borderRadius: radius,
  };

  if (decorative) {
    return (
      <View
        accessible={false}
        importantForAccessibility="no-hide-descendants"
        accessibilityElementsHidden
        {...part("skeleton", "root", { variant, decorative: true })}
        {...rest}
        style={style}
      >
        <Block
          shimmer={shimmer}
          animation={kind}
          style={blockStyle}
          name="block"
        />
      </View>
    );
  }

  const count = Number.isFinite(lines) ? Math.max(0, Math.floor(lines)) : 0;
  const textual = variant === "text";
  const lineBlocks =
    title || paragraph
      ? null
      : Array.from({ length: count }, (_, i) => (
          <Block
            key={i}
            shimmer={shimmer}
            animation={kind}
            name="line"
            style={{
              ...blockStyle,
              // the last of several text lines is shorter, like real text
              width:
                textual && width === undefined && count > 1 && i === count - 1
                  ? "60%"
                  : blockStyle.width,
            }}
          />
        ));
  const lineHeight = Math.round(t.fontSize.md * 1.15);

  return (
    <View
      accessible
      role="status"
      accessibilityLabel={accessibilityLabel ?? translate("common.loading")}
      accessibilityState={{ busy: true }}
      aria-busy
      {...part("skeleton", "root", { variant, animation: kind || "none" })}
      {...rest}
      style={[
        {
          flexDirection: "row",
          alignItems: "flex-start",
          gap: t.space["3"],
          alignSelf: "stretch",
        },
        style,
      ]}
    >
      {avatar && (
        <Block
          shimmer={shimmer}
          animation={kind}
          name="avatar"
          style={{
            width: avatarSize,
            height: avatarSize,
            borderRadius:
              avatarShape === "circle" ? avatarSize / 2 : t.radius.md,
          }}
        />
      )}
      <View
        style={{
          flex: variant === "circular" || variant === "button" ? 0 : 1,
          gap: textual ? t.space["2-5"] : t.space["3"],
        }}
      >
        {title && (
          <Block
            shimmer={shimmer}
            animation={kind}
            name="title"
            style={{
              width: "40%",
              height: Math.round(t.fontSize.lg * 1.2),
              borderRadius: t.radius.sm,
            }}
          />
        )}
        {lineBlocks}
        {paragraph &&
          PARAGRAPH.map((w, i) => (
            <Block
              key={i}
              shimmer={shimmer}
              animation={kind}
              name="line"
              style={{
                width: w,
                height: lineHeight,
                borderRadius: t.radius.sm,
              }}
            />
          ))}
      </View>
    </View>
  );
}
