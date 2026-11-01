import { useMemo } from "react";
import { Image } from "@tarojs/components";
import { toSvgBase64DataUri } from "@minerva/icons/core";
import { useThemeTokens } from "../theme";
import type { IconProps } from "./types";

const cssSize = (size: number | string) =>
  typeof size === "number" ? `${size}px` : size;

/**
 * An icon of minerva-design/icons in a Taro `Image`: mini programs cannot
 * render inline SVG, so the icon is a base64 `data:image/svg+xml` URI (the
 * WeChat `<image>` rejects percent-encoded SVG) with an explicit color: the
 * theme's text color of the active light / dark mode unless set. The URI is
 * rebuilt when the color, mode, size or stroke changes.
 */
export function Icon(props: IconProps) {
  const {
    icon,
    size = 24,
    color,
    strokeWidth = 2,
    absoluteStrokeWidth = false,
    title,
    style,
    ariaLabel,
    ariaHidden,
    ...rest
  } = props as IconProps & { "aria-label"?: string };
  const { colors } = useThemeTokens();
  const stroke = color ?? colors["text-color"];
  // CSS sizes ("48rpx") draw the 24×24 grid: aspectFit scales it
  const pixels = typeof size === "number" && size > 0 ? size : 24;
  const width =
    absoluteStrokeWidth && typeof size === "number" && size > 0
      ? (strokeWidth * 24) / size
      : strokeWidth;
  const src = useMemo(
    () =>
      toSvgBase64DataUri(icon, {
        size: pixels,
        color: stroke,
        strokeWidth: width,
      }),
    [icon, pixels, stroke, width],
  );
  const length = cssSize(size);
  const label = title ?? ariaLabel ?? rest["aria-label"];
  // kebab-case like the other Taro components: H5 renders them as is, the
  // mini-program runtime camel-cases them (`ariaLabel`, `ariaRole`…)
  const a11y = label
    ? {
        role: "img",
        "aria-role": "img",
        "aria-label": label,
        "aria-hidden": undefined,
      }
    : { "aria-hidden": true };

  return (
    <Image
      {...rest}
      {...a11y}
      src={src}
      mode="aspectFit"
      style={
        typeof style === "string"
          ? `width:${length};height:${length};${style}`
          : { width: length, height: length, ...style }
      }
    />
  );
}
