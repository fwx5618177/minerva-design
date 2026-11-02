import {
  useEffect,
  useId,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import { View, Text } from "@tarojs/components";
import { cn } from "@minerva/core";
import { isInteractiveEventTarget } from "@minerva/dom";
import { useI18n } from "./theme";
import { Part, useValue, type NativeProps } from "./shared";

export interface FlashcardProps extends Omit<NativeProps, "children"> {
  /** Content of the front face (the prompt) */
  front?: ReactNode;
  /** Content of the back face (the answer) */
  back?: ReactNode;
  /** Content below the card, not flipped (e.g. rating buttons) */
  footer?: ReactNode;
  /** Caption of the front face (default "Question", translated; "" / null hides it) */
  frontLabel?: ReactNode;
  /** Caption of the back face (default "Answer", translated; "" / null hides it) */
  backLabel?: ReactNode;
  /** Hint on the front face (default translated "Click or press Space to flip") */
  hint?: ReactNode;
  /** Shows the hint on the front face (default false) */
  showHint?: boolean;
  /** Whether the back is shown (controlled) */
  flipped?: boolean;
  /** Whether the back is initially shown (uncontrolled, default false) */
  defaultFlipped?: boolean;
  /** Called with the next flipped state */
  onFlippedChange?: (flipped: boolean) => void;
  /** Tapping the card flips it (default true) */
  flipOnClick?: boolean;
  /** Blocks flipping and dims the card (default false) */
  disabled?: boolean;
  /** Rotation axis (default "y") */
  axis?: "y" | "x";
  /** Surface style (default "elevated") */
  variant?: "elevated" | "outline" | "filled";
  /** Padding and typography scale (default "medium") */
  size?: "small" | "medium" | "large";
  /** Minimum height (a number is in px, default "12rem"); the card grows to fit the taller face */
  minHeight?: number | string;
}

const shown = (node: ReactNode) =>
  node !== null && node !== undefined && node !== false && node !== "";

/**
 * A two-sided study card that flips between a front (the prompt) and a back
 * (the answer) with a CSS 3D rotation: tap the card to flip it. Both faces
 * share one grid cell (the card is as tall as the taller face); the hidden
 * face is `aria-hidden`, the back is a polite live region. On H5 the card is
 * a toggle button (Enter / Space) and taps on interactive face content do
 * not flip it. The footer (e.g. rating buttons) does not flip.
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
  minHeight = "12rem",
  "aria-label": ariaLabel,
  ...props
}: FlashcardProps) {
  const { t } = useI18n();
  const [flipped, setFlipped] = useValue(
    flippedProp,
    defaultFlipped,
    onFlippedChange,
  );
  const generatedId = useId();
  const id = props.id ?? generatedId;
  const cardId = `${id}-card`;
  const interactive = flipOnClick && !disabled;
  const toggle = () => {
    if (interactive) setFlipped(!flipped);
  };
  const latest = useRef(toggle);
  latest.current = toggle;

  // H5: Enter / Space on the focused card (mini programs have no keyboard).
  useEffect(() => {
    if (typeof document === "undefined") return;
    const card = document.getElementById(cardId);
    if (!card) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.target !== card) return;
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      if (!event.repeat) latest.current();
    };
    card.addEventListener("keydown", onKey);
    return () => card.removeEventListener("keydown", onKey);
  }, [cardId]);

  const frontCaption =
    frontLabel === undefined ? t("flashcard.frontLabel") : frontLabel;
  const backCaption =
    backLabel === undefined ? t("flashcard.backLabel") : backLabel;
  const caption = flipped ? backCaption : frontCaption;
  const face =
    typeof caption === "string" && caption
      ? caption
      : t(flipped ? "flashcard.backLabel" : "flashcard.frontLabel");
  const hintText = hint === undefined ? t("flashcard.hint") : hint;
  const state = flipped ? "active" : "inactive";

  const renderFace = (side: "front" | "back") => {
    const isBack = side === "back";
    const hidden = isBack ? !flipped : flipped;
    const label = isBack ? backCaption : frontCaption;
    return (
      <View
        data-minerva="flashcard"
        data-part={side}
        className={cn(
          "mn-flashcard__face",
          `mn-flashcard__${side}`,
          hidden && "mn-hidden-face",
        )}
        aria-hidden={hidden || undefined}
        {...(isBack ? { "aria-live": "polite", "aria-atomic": true } : {})}
      >
        {shown(label) ? (
          <Text
            data-minerva="flashcard"
            data-part="label"
            className="mn-flashcard__label"
          >
            {label}
          </Text>
        ) : null}
        <View id={`${id}-${side}`} className="mn-flashcard__content">
          {isBack ? back : front}
        </View>
        {!isBack && showHint && flipOnClick && shown(hintText) ? (
          <Text
            data-minerva="flashcard"
            data-part="hint"
            className="mn-flashcard__hint"
          >
            {hintText}
          </Text>
        ) : null}
      </View>
    );
  };

  return (
    <Part
      name="flashcard"
      {...props}
      id={id}
      {...{
        "data-state": state,
        "data-disabled": disabled ? "" : undefined,
        "data-variant": variant,
        "data-size": size,
      }}
      className={cn(
        `mn-variant-${variant}`,
        `mn-size-${size}`,
        axis === "x" && "mn-axis-x",
        flipped && "mn-flipped",
        disabled && "mn-disabled",
        props.className,
      )}
      style={
        {
          "--flashcard-min-height":
            typeof minHeight === "number" ? `${minHeight}px` : minHeight,
          ...props.style,
        } as CSSProperties
      }
    >
      <View
        id={cardId}
        data-minerva="flashcard"
        data-part="card"
        {...{
          "data-state": state,
          "data-disabled": disabled ? "" : undefined,
        }}
        className={cn("mn-flashcard__card", flipOnClick && "mn-interactive")}
        {...(flipOnClick
          ? {
              role: "button",
              tabIndex: disabled ? -1 : 0,
              "aria-pressed": flipped,
              "aria-disabled": disabled || undefined,
            }
          : { role: "group" })}
        aria-label={ariaLabel ?? t("flashcard.label", { face })}
        aria-describedby={`${id}-${flipped ? "back" : "front"}`}
        onClick={(event) => {
          if (!flipOnClick) return;
          const card = event.currentTarget as unknown;
          if (
            typeof Element !== "undefined" &&
            card instanceof Element &&
            isInteractiveEventTarget(event as unknown as Event, card)
          )
            return;
          toggle();
        }}
      >
        <View className="mn-flashcard__inner">
          {renderFace("front")}
          {renderFace("back")}
        </View>
      </View>
      {shown(footer) ? (
        <View
          data-minerva="flashcard"
          data-part="footer"
          className="mn-flashcard__footer"
        >
          {footer}
        </View>
      ) : null}
    </Part>
  );
}
