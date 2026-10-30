// Renders the view primitives of ./geometry: absolutely positioned <View>
// and <Text> elements, nested clipping squares for the polygons and sectors.

import type { ReactNode } from "react";
import {
  StyleSheet,
  Text,
  View,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { measureChartText } from "../Chart/measure";
import type { Prim } from "./geometry";

type TextPrim = Extract<Prim, { t: "text" }>;

const lineHeightOf = (size: number) => Math.ceil(size * 1.35);

const SHADOW: ViewStyle = {
  shadowColor: "#0f172a",
  shadowOpacity: 0.18,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 6 },
  elevation: 6,
};

/** A one-line text anchored like the canvas `fillText` */
function textView(
  p: TextPrim,
  key: string,
  family: string | undefined,
): ReactNode {
  const lh = lineHeightOf(p.size);
  const pad = (lh - p.size) / 2;
  const estimate = measureChartText(
    p.text,
    `${p.weight} ${p.size}px sans-serif`,
  );
  // canvas `maxWidth` squeezes the text: ellipsize it when it would not fit
  const squeezed = p.maxWidth !== undefined && estimate > p.maxWidth + 0.5;
  const w = squeezed
    ? Math.max(1, p.maxWidth ?? 0)
    : Math.ceil(estimate * 1.4 + p.size * 2);
  const rotated = Math.abs(p.rotate) > 1e-4;
  // rotated: a wrapper centered on the anchor turns around it (RN rotates
  // around the center); it is sized for the text, as single-line texts are
  // limited to the width of their parent on the web
  const box = { w: 2 * w + 2, h: 2 * lh };
  const ax = rotated ? box.w / 2 : p.x;
  const ay = rotated ? box.h / 2 : p.y;
  const top =
    p.baseline === "top"
      ? ay - pad
      : p.baseline === "bottom"
        ? ay - lh + pad
        : p.baseline === "middle"
          ? ay - lh / 2
          : ay - p.size * 0.8 - pad;
  const left =
    p.align === "left" ? ax : p.align === "right" ? ax - w : ax - w / 2;
  const style: TextStyle = {
    position: "absolute",
    left,
    top,
    width: w,
    textAlign: p.align,
    fontSize: p.size,
    lineHeight: lh,
    color: p.color,
    fontWeight: String(p.weight) as TextStyle["fontWeight"],
    includeFontPadding: false,
    ...(family ? { fontFamily: family } : null),
    ...(p.halo
      ? {
          textShadowColor: p.halo,
          textShadowRadius: 2,
          textShadowOffset: { width: 0, height: 0 },
        }
      : null),
  };
  const text = (
    <Text
      key={rotated ? undefined : key}
      numberOfLines={1}
      ellipsizeMode="tail"
      style={style}
    >
      {p.text}
    </Text>
  );
  if (!rotated) return text;
  return (
    <View
      key={key}
      style={{
        position: "absolute",
        left: p.x - box.w / 2,
        top: p.y - box.h / 2,
        width: box.w,
        height: box.h,
        transform: [{ rotate: `${p.rotate}rad` }],
      }}
    >
      {text}
    </View>
  );
}

/** Elements of the primitives */
export function renderPrims(
  prims: readonly Prim[],
  family: string | undefined,
  prefix = "",
): ReactNode[] {
  return prims.map((p, i) => {
    const key = `${prefix}${i}`;
    switch (p.t) {
      case "box": {
        const style: ViewStyle = {
          position: "absolute",
          left: p.x,
          top: p.y,
          width: p.w,
          height: p.h,
          ...(p.color ? { backgroundColor: p.color } : null),
          ...(p.radius ? { borderRadius: p.radius } : null),
          ...(p.borderWidth
            ? { borderWidth: p.borderWidth, borderColor: p.borderColor }
            : null),
          ...(p.rotate ? { transform: [{ rotate: `${p.rotate}rad` }] } : null),
          ...(p.shadow ? SHADOW : null),
        };
        return <View key={key} style={style} />;
      }
      case "clip":
        return (
          <View
            key={key}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              overflow: "hidden",
              transform: [{ rotate: `${p.rotate}rad` }],
            }}
          >
            {renderPrims(p.children, family, `${key}.`)}
          </View>
        );
      case "group":
        return (
          <View
            key={key}
            needsOffscreenAlphaCompositing={
              p.children.length > 1 || p.children[0]?.t === "clip"
            }
            style={[StyleSheet.absoluteFill, { opacity: p.opacity }]}
          >
            {renderPrims(p.children, family, `${key}.`)}
          </View>
        );
      case "text":
        return textView(p, key, family);
      default:
        return null;
    }
  });
}
