import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";
import { shadowStyle, textStyle, weight } from "../../internal/styles";
import { useControllable } from "../../internal/useControllable";

/** Rotation axis of a Flashcard flip */
export type FlashcardAxis = "y" | "x";

/** Surface style of a Flashcard (matches Card) */
export type FlashcardVariant = "elevated" | "outline" | "filled";

/** Padding and typography scale of a Flashcard */
export type FlashcardSize = "small" | "medium" | "large";

export interface FlashcardProps extends Omit<ViewProps, "style" | "children"> {
  /** Content of the front face (the prompt) */
  front?: ReactNode;
  /** Content of the back face (the answer) */
  back?: ReactNode;
  /** Content below the card, not flipped (e.g. rating buttons) */
  footer?: ReactNode;
  /**
   * Small caption of the front face; `null`, `false` or `""` hides it
   * @default the "flashcard.frontLabel" message ("Question")
   */
  frontLabel?: ReactNode;
  /**
   * Small caption of the back face; `null`, `false` or `""` hides it
   * @default the "flashcard.backLabel" message ("Answer")
   */
  backLabel?: ReactNode;
  /**
   * Hint on the front face (shown with showHint while the card flips on press)
   * @default the "flashcard.hint" message
   */
  hint?: ReactNode;
  /**
   * Shows the hint on the front face
   * @default false
   */
  showHint?: boolean;
  /** Whether the back is shown (controlled; pair with onFlippedChange) */
  flipped?: boolean;
  /**
   * Whether the back is initially shown (uncontrolled)
   * @default false
   */
  defaultFlipped?: boolean;
  /** Called with the next flipped state */
  onFlippedChange?: (flipped: boolean) => void;
  /**
   * Pressing the card flips it. When false the card is not a button and
   * only `flipped` flips it.
   * @default true
   */
  flipOnClick?: boolean;
  /**
   * Blocks flipping and dims the card
   * @default false
   */
  disabled?: boolean;
  /**
   * Rotation axis: "y" flips horizontally, "x" vertically
   * @default "y"
   */
  axis?: FlashcardAxis;
  /**
   * Surface style
   * @default "elevated"
   */
  variant?: FlashcardVariant;
  /**
   * Padding and typography scale
   * @default "medium"
   */
  size?: FlashcardSize;
  /**
   * Minimum height of the card in dp (or a "px" / "rem" string, 1rem = 16);
   * the card grows to fit the taller face
   * @default 192
   */
  minHeight?: number | string;
  /** Style of the outer view (card and footer) */
  style?: StyleProp<ViewStyle>;
}

const PAD = { small: "3", medium: "5", large: "6" } as const;
const FONT = { small: "md", medium: "lg", large: "xl" } as const;
const FLIP_MS = 450;
const FADE_MS = 200;

const shown = (node: ReactNode) =>
  node !== null && node !== undefined && node !== false && node !== "";
const isText = (node: ReactNode) =>
  typeof node === "string" || typeof node === "number";

/** `minHeight` in dp: numbers as is, "px" / "rem" strings converted */
export const flashcardMinHeight = (value: number | string | undefined) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const match = /^\s*(\d+(?:\.\d+)?)\s*(px|rem)?\s*$/.exec(String(value ?? ""));
  if (!match) return 192;
  const amount = Number(match[1]);
  return match[2] === "rem" ? amount * 16 : amount;
};

/**
 * Flashcard: a two-sided study card that flips between a front (the prompt)
 * and a back (the answer) with an animated 3D rotation (`rotateY`, or
 * `rotateX` with axis="x"; a crossfade with reduced motion). Both faces are
 * stacked and the card is as tall as the taller face. The card is a button
 * (`selected` while the back shows); the hidden face is hidden from
 * accessibility and the back is a polite live region. The footer (e.g.
 * rating buttons) sits below the card and does not flip.
 */
export function Flashcard({
  front,
  back,
  footer,
  frontLabel,
  backLabel,
  hint,
  showHint = false,
  flipped: flippedProp,
  defaultFlipped = false,
  onFlippedChange,
  flipOnClick = true,
  disabled = false,
  axis = "y",
  variant = "elevated",
  size = "medium",
  minHeight = 192,
  style,
  accessibilityLabel,
  accessibilityState,
  ...rest
}: FlashcardProps) {
  const { tokens: t, fonts, reducedMotion } = useTheme();
  const { t: translate } = useI18n();
  const [flipped, setFlipped] = useControllable(
    flippedProp,
    defaultFlipped,
    onFlippedChange,
  );
  const [progress] = useState(() => new Animated.Value(flipped ? 1 : 0));
  const first = useRef(true);
  useEffect(() => {
    const target = flipped ? 1 : 0;
    if (first.current) {
      first.current = false;
      progress.setValue(target);
      return;
    }
    const animation = Animated.timing(progress, {
      toValue: target,
      duration: reducedMotion ? FADE_MS : FLIP_MS,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: false,
    });
    animation.start();
    return () => animation.stop();
  }, [flipped, reducedMotion, progress]);

  // Both faces are absolutely stacked; the card takes the taller one.
  const [heights, setHeights] = useState({ front: 0, back: 0 });
  const pad = t.space[PAD[size]];
  const height = Math.max(
    flashcardMinHeight(minHeight),
    heights.front + pad * 2,
    heights.back + pad * 2,
  );
  const measure = (side: "front" | "back") => (event: LayoutChangeEvent) => {
    const value = Math.ceil(event.nativeEvent.layout.height);
    setHeights((prev) =>
      prev[side] === value ? prev : { ...prev, [side]: value },
    );
  };

  const font = fonts.sans;
  const interactive = flipOnClick && !disabled;
  const frontCaption =
    frontLabel === undefined ? translate("flashcard.frontLabel") : frontLabel;
  const backCaption =
    backLabel === undefined ? translate("flashcard.backLabel") : backLabel;
  const hintText = hint === undefined ? translate("flashcard.hint") : hint;

  const surface: ViewStyle = {
    borderRadius: t.radius.xl,
    padding: pad,
    justifyContent: "center",
    backfaceVisibility: "hidden",
    ...(variant === "outline"
      ? {
          backgroundColor: t.colors["surface-color"],
          borderWidth: 1,
          borderColor: t.colors["border-strong-color"],
        }
      : variant === "filled"
        ? { backgroundColor: t.colors["surface-muted-color"] }
        : {
            backgroundColor: t.colors["surface-elevated-color"],
            ...shadowStyle(t.shadows.md),
          }),
  };

  const rotate = axis === "x" ? "rotateX" : "rotateY";
  const faceMotion = (side: "front" | "back") => {
    const isBack = side === "back";
    if (reducedMotion) {
      return {
        opacity: progress.interpolate({
          inputRange: [0, 1],
          outputRange: isBack ? [0, 1] : [1, 0],
        }),
      };
    }
    // The opacity switch at half way backs up backfaceVisibility (not
    // honored everywhere on Android).
    return {
      opacity: progress.interpolate({
        inputRange: [0, 0.5, 0.5001, 1],
        outputRange: isBack ? [0, 0, 1, 1] : [1, 1, 0, 0],
      }),
      transform: [
        { perspective: 1200 },
        {
          [rotate]: progress.interpolate({
            inputRange: [0, 1],
            outputRange: isBack ? ["180deg", "360deg"] : ["0deg", "180deg"],
          }),
        },
      ] as never,
    };
  };

  const textOf = (node: ReactNode, style: object) =>
    isText(node) ? <Text style={style}>{node}</Text> : node;

  const renderFace = (side: "front" | "back") => {
    const isBack = side === "back";
    const hidden = isBack ? !flipped : flipped;
    const caption = isBack ? backCaption : frontCaption;
    return (
      <Animated.View
        {...part("flashcard", side)}
        pointerEvents={hidden ? "none" : "auto"}
        accessibilityElementsHidden={hidden}
        importantForAccessibility={hidden ? "no-hide-descendants" : "auto"}
        accessibilityLiveRegion={isBack ? "polite" : undefined}
        style={[StyleSheet.absoluteFill, surface, faceMotion(side)]}
      >
        <View onLayout={measure(side)} style={{ gap: t.space["2"] }}>
          {shown(caption) ? (
            <View {...part("flashcard", "label")}>
              {textOf(caption, {
                ...textStyle(t, "xs", font),
                fontWeight: weight(t, "semibold"),
                color: t.colors["text-muted-color"],
                letterSpacing: 0.5,
                textTransform: "uppercase",
              })}
            </View>
          ) : null}
          {/* Plain text is centred; rich content stretches so it lines up with the label. */}
          <View
            style={{
              alignItems: isText(isBack ? back : front) ? "center" : "stretch",
            }}
          >
            {textOf(isBack ? back : front, {
              ...textStyle(t, FONT[size], font),
              color: t.colors["text-color"],
              textAlign: "center",
            })}
          </View>
          {!isBack && showHint && flipOnClick && shown(hintText) ? (
            <View {...part("flashcard", "hint")}>
              {textOf(hintText, {
                ...textStyle(t, "xs", font),
                color: t.colors["text-muted-color"],
                textAlign: "center",
              })}
            </View>
          ) : null}
        </View>
      </Animated.View>
    );
  };

  const faces = (
    <>
      {renderFace("front")}
      {renderFace("back")}
    </>
  );
  const cardStyle: ViewStyle = { height, opacity: disabled ? 0.6 : 1 };
  const cardHooks = part("flashcard", "card", {
    state: flipped ? "active" : "inactive",
    disabled,
  });

  return (
    <View
      {...rest}
      {...part("flashcard", "root", {
        state: flipped ? "active" : "inactive",
        disabled,
        variant,
        size,
      })}
      style={[{ gap: t.space["3"] }, style]}
    >
      {flipOnClick ? (
        <Pressable
          {...cardHooks}
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel}
          accessibilityState={{
            ...accessibilityState,
            selected: flipped,
            disabled,
          }}
          disabled={disabled}
          onPress={() => {
            if (interactive) setFlipped(!flipped);
          }}
          style={cardStyle}
        >
          {faces}
        </Pressable>
      ) : (
        <View
          {...cardHooks}
          accessibilityLabel={accessibilityLabel}
          style={cardStyle}
        >
          {faces}
        </View>
      )}
      {shown(footer) ? (
        <View
          {...part("flashcard", "footer")}
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: t.space["2"],
          }}
        >
          {footer}
        </View>
      ) : null}
    </View>
  );
}
