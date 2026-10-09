import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  Image,
  Text,
  View,
  type ImageSourcePropType,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import type { ResolvedTokens } from "@minerva/core";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";
import { colorRole, weight, type SemanticColor } from "../../internal/styles";

export type AvatarShape = "circle" | "rounded" | "square";
export type AvatarSizeName =
  "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge";
export type AvatarSize = AvatarSizeName | number;

export interface AvatarProps extends Omit<ViewProps, "style" | "children"> {
  /**
   * Image: a URL or an `Image` source (`require("./me.png")`). When
   * omitted (or when it fails to load), the initials of `name` are shown
   */
  src?: string | ImageSourcePropType;
  /**
   * Name of the person: initials (first letters of the first two words, or
   * the first CJK character), the accessible label and the fallback color
   * @default ""
   */
  name?: string;
  /** Alternative text of the image; pass "" for a decorative avatar */
  alt?: string;
  /** Accessible label of the avatar (alias of `accessibilityLabel`) */
  "aria-label"?: string;
  /** Custom fallback content shown instead of the initials */
  fallback?: ReactNode;
  /**
   * Avatar shape
   * @default "circle"
   */
  shape?: AvatarShape;
  /**
   * A preset (xsmall 24, small 32, medium 48, large 64, xlarge 80, xxlarge
   * 96) or a number of dp
   * @default "medium"
   */
  size?: AvatarSize;
  /**
   * Color of the initials fallback; picked from the name when omitted
   * (the same name always gets the same color)
   */
  color?: SemanticColor;
  /** Fallback content when there is neither an image nor a name */
  children?: ReactNode;
  /** Style of the avatar */
  style?: StyleProp<ViewStyle>;
}

export interface AvatarGroupProps extends Omit<
  ViewProps,
  "style" | "children"
> {
  /** The Avatar elements */
  children?: ReactNode;
  /**
   * Maximum number of avatars to display; the others are counted in the
   * "+N" avatar
   */
  max?: number;
  /** Number of additional avatars (not rendered), added to the "+N" avatar */
  count?: number;
  /**
   * Size of every avatar of the group
   * @default "medium"
   */
  size?: AvatarSize;
  /**
   * Shape of every avatar of the group
   * @default "circle"
   */
  shape?: AvatarShape;
  /** Overlap between avatars in dp @default a quarter of the avatar size */
  spacing?: number;
  /** Accessible label of the group (alias of `accessibilityLabel`) */
  "aria-label"?: string;
  /** Style of the group */
  style?: StyleProp<ViewStyle>;
}

const CJK = /[㐀-鿿豈-﫿가-힯]/;

/** Initials of a name ("Ada Lovelace" -> "AL", "张三" -> "张") */
export function getAvatarInitials(name?: string): string {
  const trimmed = name?.trim() ?? "";
  if (!trimmed) return "";
  if (CJK.test(trimmed[0])) return trimmed[0];
  return trimmed
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

const FALLBACK_COLORS: readonly SemanticColor[] = [
  "primary",
  "success",
  "warning",
  "danger",
  "info",
];

/** Color of a name's initials (stable string hash) */
export function getAvatarColor(name: string): SemanticColor {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0;
  }
  return FALLBACK_COLORS[Math.abs(hash) % FALLBACK_COLORS.length];
}

const SIZE_SPACE: Record<AvatarSizeName, string> = {
  xsmall: "6",
  small: "8",
  medium: "12",
  large: "16",
  xlarge: "20",
  xxlarge: "24",
};

const avatarPx = (t: ResolvedTokens, size: AvatarSize): number =>
  typeof size === "number" ? size : t.space[SIZE_SPACE[size]];

const avatarRadius = (t: ResolvedTokens, shape: AvatarShape, px: number) =>
  shape === "circle"
    ? px / 2
    : shape === "square"
      ? t.radius.sm
      : px <= 32
        ? t.radius.md
        : t.radius.lg;

interface AvatarGroupContextValue {
  size: AvatarSize;
  shape: AvatarShape;
  /** Ring color separating overlapped avatars */
  ring: string;
}

const AvatarGroupContext = createContext<AvatarGroupContextValue | null>(null);

/**
 * Avatar: a picture of a person, falling back to their initials on a
 * deterministic token color (or custom fallback content) when there is no
 * image or it fails to load. Announced as one image named after the person.
 */
export function Avatar({
  src,
  name = "",
  alt,
  "aria-label": ariaLabel,
  accessibilityLabel,
  fallback,
  shape: shapeProp,
  size: sizeProp,
  color,
  children,
  style,
  ...rest
}: AvatarProps) {
  const { tokens: t, fonts } = useTheme();
  const { t: tr } = useI18n();
  const group = useContext(AvatarGroupContext);
  const size = sizeProp ?? group?.size ?? "medium";
  const shape = shapeProp ?? group?.shape ?? "circle";
  const px = avatarPx(t, size);
  const radius = avatarRadius(t, shape, px);

  // The source that failed to load: derived, so a new src is tried again
  const [failed, setFailed] = useState<unknown>(undefined);
  const source = useMemo<ImageSourcePropType | undefined>(
    () => (typeof src === "string" ? (src ? { uri: src } : undefined) : src),
    [src],
  );
  const showImage = source !== undefined && failed !== src;

  const label =
    accessibilityLabel ?? ariaLabel ?? (alt || name || tr("avatar.default"));
  const decorative = alt === "" && !ariaLabel && !accessibilityLabel;
  const initials = getAvatarInitials(name);
  const role = colorRole(t, color ?? getAvatarColor(name));

  return (
    <View
      accessible={!decorative}
      accessibilityRole={decorative ? undefined : "image"}
      accessibilityLabel={decorative ? undefined : label}
      importantForAccessibility={decorative ? "no-hide-descendants" : undefined}
      {...part("avatar", "root", {
        size: typeof size === "number" ? undefined : size,
        shape,
      })}
      {...rest}
      style={[
        {
          width: px,
          height: px,
          borderRadius: radius,
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: showImage
            ? t.colors["surface-muted-color"]
            : fallback !== undefined || !initials
              ? t.colors["surface-muted-color"]
              : role.subtle,
        },
        group && {
          borderWidth: Math.max(2, Math.round(px / 24)),
          borderColor: group.ring,
        },
        style,
      ]}
    >
      {showImage ? (
        <Image
          source={source}
          accessibilityIgnoresInvertColors
          onError={() => setFailed(src)}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
          {...part("avatar", "image")}
        />
      ) : fallback !== undefined ? (
        fallback
      ) : initials ? (
        <Text
          allowFontScaling={false}
          numberOfLines={1}
          style={{
            color: role.text,
            fontSize: Math.max(
              10,
              Math.round(px * (initials.length > 1 ? 0.38 : 0.44)),
            ),
            fontWeight: weight(t, "semibold"),
            ...(fonts.sans ? { fontFamily: fonts.sans } : null),
          }}
          {...part("avatar", "fallback")}
        >
          {initials}
        </Text>
      ) : typeof children === "string" ? (
        <Text
          allowFontScaling={false}
          style={{
            color: t.colors["text-secondary-color"],
            fontSize: Math.round(px * 0.4),
            ...(fonts.sans ? { fontFamily: fonts.sans } : null),
          }}
          {...part("avatar", "fallback")}
        >
          {children}
        </Text>
      ) : children !== undefined ? (
        children
      ) : (
        <PersonGlyph px={px} color={t.colors["text-muted-color"]} />
      )}
    </View>
  );
}

/** Default silhouette of an anonymous avatar (head + shoulders) */
function PersonGlyph({ px, color }: { px: number; color: string }) {
  const head = px * 0.36;
  const body = px * 0.72;
  return (
    <View
      {...part("avatar", "fallback")}
      style={{ width: px, height: px, alignItems: "center" }}
    >
      <View
        style={{
          marginTop: px * 0.2,
          width: head,
          height: head,
          borderRadius: head / 2,
          backgroundColor: color,
        }}
      />
      <View
        style={{
          marginTop: px * 0.06,
          width: body,
          height: body,
          borderRadius: body / 2,
          backgroundColor: color,
        }}
      />
    </View>
  );
}

/**
 * AvatarGroup: overlapping avatars of one size and shape with a "+N"
 * avatar for those over `max` (and `count`). A labelled group (not an
 * accessibility element itself).
 */
export function AvatarGroup({
  children,
  max,
  count,
  size = "medium",
  shape = "circle",
  spacing,
  "aria-label": ariaLabel,
  accessibilityLabel,
  style,
  ...rest
}: AvatarGroupProps) {
  const { tokens: t, fonts } = useTheme();
  const { t: tr } = useI18n();
  const avatars = Children.toArray(children);
  const visible =
    max === undefined ? avatars : avatars.slice(0, Math.max(0, max));
  const extra = (count ?? 0) + avatars.length - visible.length;
  const px = avatarPx(t, size);
  const overlap = spacing ?? Math.round(px / 4);
  const ctx = useMemo(
    () => ({ size, shape, ring: t.colors["surface-color"] }),
    [size, shape, t],
  );
  const label =
    accessibilityLabel ??
    ariaLabel ??
    (extra > 0
      ? tr("avatar.groupWithMore", { count: extra })
      : tr("avatar.group"));

  return (
    <AvatarGroupContext.Provider value={ctx}>
      <View
        role="group"
        accessibilityLabel={label}
        {...part("avatar-group", "root")}
        {...rest}
        style={[{ flexDirection: "row", alignItems: "center" }, style]}
      >
        {visible.map((child, index) => (
          <View
            key={isValidElement(child) ? (child.key ?? index) : index}
            {...part("avatar-group", "item")}
            style={{
              marginLeft: index === 0 ? 0 : -overlap,
              zIndex: visible.length - index,
            }}
          >
            {child}
          </View>
        ))}
        {extra > 0 ? (
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            {...part("avatar-group", "count")}
            style={{
              marginLeft: visible.length ? -overlap : 0,
              width: px,
              height: px,
              borderRadius: avatarRadius(t, shape, px),
              borderWidth: Math.max(2, Math.round(px / 24)),
              borderColor: t.colors["surface-color"],
              backgroundColor: t.colors["surface-muted-color"],
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                color: t.colors["text-secondary-color"],
                fontSize: Math.max(10, Math.round(px * 0.34)),
                fontWeight: weight(t, "semibold"),
                ...(fonts.sans ? { fontFamily: fonts.sans } : null),
              }}
            >
              +{extra}
            </Text>
          </View>
        ) : null}
      </View>
    </AvatarGroupContext.Provider>
  );
}
