// Built-in glyphs drawn with plain Views (no icon font, no SVG dependency):
// they render the same on iOS, Android and react-native-web and follow the
// token colors. Decorative: hidden from accessibility (the owning control
// carries the label).
import { Text, View, type ViewStyle } from "react-native";

export type IconName =
  | "check"
  | "close"
  | "chevron-left"
  | "chevron-right"
  | "chevron-up"
  | "chevron-down"
  | "plus"
  | "minus"
  | "star"
  | "search"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "dot";

export interface IconProps {
  name: IconName;
  /** Box size in dp @default 16 */
  size?: number;
  color: string;
  /** Background of the status icons' glyph @default "#ffffff" */
  contrast?: string;
  style?: ViewStyle;
}

const hidden = {
  accessible: false,
  importantForAccessibility: "no-hide-descendants",
  accessibilityElementsHidden: true,
} as const;

const ROTATION = {
  "chevron-right": "45deg",
  "chevron-down": "135deg",
  "chevron-left": "225deg",
  "chevron-up": "-45deg",
} as const;

/** A decorative glyph */
export function Icon({
  name,
  size = 16,
  color,
  contrast = "#ffffff",
  style,
}: IconProps) {
  const stroke = Math.max(1.5, Math.round(size / 9));
  const box: ViewStyle = {
    width: size,
    height: size,
    alignItems: "center",
    justifyContent: "center",
  };
  const bar = (rotate: string, length = size * 0.9): ViewStyle => ({
    position: "absolute",
    width: length,
    height: stroke,
    borderRadius: stroke,
    backgroundColor: color,
    transform: [{ rotate }],
  });

  switch (name) {
    case "check":
      return (
        <View {...hidden} style={[box, style]}>
          <View
            style={{
              width: size * 0.32,
              height: size * 0.62,
              borderColor: color,
              borderRightWidth: stroke,
              borderBottomWidth: stroke,
              transform: [{ translateY: -size * 0.06 }, { rotate: "45deg" }],
            }}
          />
        </View>
      );
    case "close":
      return (
        <View {...hidden} style={[box, style]}>
          <View style={bar("45deg", size * 0.85)} />
          <View style={bar("-45deg", size * 0.85)} />
        </View>
      );
    case "plus":
    case "minus":
      return (
        <View {...hidden} style={[box, style]}>
          <View style={bar("0deg", size * 0.7)} />
          {name === "plus" && <View style={bar("90deg", size * 0.7)} />}
        </View>
      );
    case "chevron-left":
    case "chevron-right":
    case "chevron-up":
    case "chevron-down": {
      const arm = size * 0.42;
      const shift = size * 0.1;
      const horizontal = name === "chevron-left" || name === "chevron-right";
      const towards =
        name === "chevron-right" || name === "chevron-down" ? -shift : shift;
      return (
        <View {...hidden} style={[box, style]}>
          <View
            style={{
              width: arm,
              height: arm,
              borderColor: color,
              borderTopWidth: stroke,
              borderRightWidth: stroke,
              transform: [
                horizontal ? { translateX: towards } : { translateY: towards },
                { rotate: ROTATION[name] },
              ],
            }}
          />
        </View>
      );
    }
    case "star":
      return (
        <View {...hidden} style={[box, style]}>
          <Text
            allowFontScaling={false}
            style={{
              color,
              fontSize: size,
              lineHeight: size * 1.15,
              includeFontPadding: false,
              textAlign: "center",
            }}
          >
            {"★"}
          </Text>
        </View>
      );
    case "search": {
      const ring = size * 0.62;
      return (
        <View {...hidden} style={[box, style]}>
          <View
            style={{
              position: "absolute",
              top: size * 0.08,
              left: size * 0.08,
              width: ring,
              height: ring,
              borderRadius: ring / 2,
              borderWidth: stroke,
              borderColor: color,
            }}
          />
          <View
            style={{
              position: "absolute",
              right: size * 0.06,
              bottom: size * 0.18,
              width: size * 0.36,
              height: stroke,
              borderRadius: stroke,
              backgroundColor: color,
              transform: [{ rotate: "45deg" }],
            }}
          />
        </View>
      );
    }
    case "dot":
      return (
        <View {...hidden} style={[box, style]}>
          <View
            style={{
              width: size * 0.5,
              height: size * 0.5,
              borderRadius: size,
              backgroundColor: color,
            }}
          />
        </View>
      );
    case "info":
    case "warning":
    case "success":
    case "danger": {
      const inner = size * 0.62;
      return (
        <View
          {...hidden}
          style={[
            box,
            { borderRadius: size / 2, backgroundColor: color },
            style,
          ]}
        >
          {name === "success" ? (
            <Icon name="check" size={inner} color={contrast} />
          ) : name === "danger" ? (
            <Icon name="close" size={inner * 0.85} color={contrast} />
          ) : (
            <Text
              allowFontScaling={false}
              style={{
                color: contrast,
                fontSize: size * 0.68,
                lineHeight: size * 0.8,
                fontWeight: "700",
                includeFontPadding: false,
                textAlign: "center",
              }}
            >
              {name === "info" ? "i" : "!"}
            </Text>
          )}
        </View>
      );
    }
  }
}
