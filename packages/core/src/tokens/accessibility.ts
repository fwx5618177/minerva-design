// User preferences that apply to every component (media-query blocks of
// tokens.css).
import type { TokenBlock } from "./expr";

/**
 * `prefers-reduced-motion: reduce`: transitions become instant. Components
 * additionally stop their keyframe animations (spinners slow down instead of
 * stopping, so a pending state stays perceivable).
 */
export const reducedMotionTokens = {
  "transition-fast": "0s",
  "transition-base": "0s",
  "transition-slow": "0s",
} as const satisfies TokenBlock;

/**
 * `forced-colors: active` (Windows high contrast): the system palette replaces
 * colors, so the focus ring must not rely on a mixed color.
 */
export const forcedColorsTokens = {
  "focus-ring-color": "Highlight",
} as const satisfies TokenBlock;
