import { Platform } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../theme/MinervaProvider";
import type { IconProps } from "./types";

const HIDDEN = {
  accessible: false,
  importantForAccessibility: "no-hide-descendants",
  accessibilityElementsHidden: true,
} as const;

// react-native-svg's web build writes its props on the DOM <svg> as they
// are: web (react-native-web, Expo web) gets the ARIA attributes instead of
// the React Native accessibility props.
const WEB = Platform.OS === "web";
const HIDDEN_WEB = { "aria-hidden": true } as const;

/**
 * An icon of minerva-design/icons drawn with react-native-svg: the same 24×24
 * path data as the web, stroked with round caps and joins. The color follows
 * the theme's text color unless set.
 */
export function Icon(props: IconProps) {
  const {
    icon,
    size = 24,
    color,
    strokeWidth = 2,
    absoluteStrokeWidth = false,
    title,
    accessibilityLabel,
    accessibilityRole,
    ...rest
  } = props;
  const { colors } = useTheme();
  const stroke = color ?? colors["text-color"];
  // the 24×24 grid is scaled by size / 24: dividing keeps the stroke in dp
  const width =
    absoluteStrokeWidth && size > 0 ? (strokeWidth * 24) / size : strokeWidth;
  const label = title ?? accessibilityLabel;
  const a11y = WEB
    ? label
      ? { role: "img" as const, "aria-label": label }
      : HIDDEN_WEB
    : label
      ? {
          accessible: true,
          accessibilityRole: accessibilityRole ?? ("image" as const),
          accessibilityLabel: label,
        }
      : HIDDEN;

  return (
    <Svg
      {...rest}
      {...a11y}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      {icon.paths.map((d, i) => (
        <Path
          key={i}
          d={d}
          fill="none"
          stroke={icon.colors?.[i] ?? stroke}
          strokeWidth={width}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </Svg>
  );
}
