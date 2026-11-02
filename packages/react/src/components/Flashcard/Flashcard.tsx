import React, { useId, type CSSProperties, type ReactNode } from "react";
import { isInteractiveEventTarget } from "@minerva/dom";
import { cn } from "../../utils/cn";
import { useControllableState } from "../../internal/useControllableState";
import { warnControlledProps } from "../../internal/devWarnings";
import useI18n from "../../hooks/useI18n";
import { hooks } from "../../internal/stylingHooks";
import styles from "./flashcard.module.scss";
import type { FlashcardProps } from "./types";

const shown = (node: ReactNode) =>
  node !== null && node !== undefined && node !== false && node !== "";

/**
 * Flashcard: a two-sided study card that flips between a front (the prompt)
 * and a back (the answer) with a 3D rotation (a crossfade under
 * `prefers-reduced-motion`). Both faces share one grid cell, so the card is
 * as tall as the taller face. The card is a toggle button (`aria-pressed`
 * while the back shows): click, Enter or Space flips it, except clicks on
 * interactive content inside a face. The hidden face is `inert`; the back is
 * a polite live region, so the revealed answer is announced. The `footer`
 * (e.g. rating buttons) sits below the card and does not flip.
 */
const Flashcard = ({
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
  className,
  ref,
}: FlashcardProps) => {
  const { t } = useI18n();
  const id = useId();
  if (process.env.NODE_ENV !== "production") {
    warnControlledProps("Flashcard", {
      prop: "flipped",
      value: flippedProp,
      defaultProp: "defaultFlipped",
      defaultValue: defaultFlipped ? true : undefined,
      handlerProp: "onFlippedChange",
      handler: onFlippedChange,
      locked: disabled || !flipOnClick,
      lockHint: "set `flipOnClick={false}` or `disabled`",
    });
  }
  const [flipped, setFlipped] = useControllableState<boolean>({
    value: flippedProp,
    defaultValue: defaultFlipped,
    onChange: onFlippedChange,
    name: "Flashcard",
    prop: "flipped",
  });
  const interactive = flipOnClick && !disabled;

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

  const toggle = () => {
    if (interactive) setFlipped(!flipped);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isInteractiveEventTarget(event.nativeEvent, event.currentTarget)) {
      return;
    }
    toggle();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    if (!event.repeat) toggle();
  };

  const minHeightValue =
    typeof minHeight === "number" ? `${minHeight}px` : minHeight;

  const renderFace = (side: "front" | "back") => {
    const isBack = side === "back";
    const hidden = isBack ? !flipped : flipped;
    const label = isBack ? backCaption : frontCaption;
    return (
      <div
        className={cn(styles.face, styles[side])}
        {...hooks("flashcard", side)}
        aria-hidden={hidden || undefined}
        inert={hidden}
        aria-live={isBack ? "polite" : undefined}
        aria-atomic={isBack ? true : undefined}
      >
        {shown(label) ? (
          <span className={styles.label} {...hooks("flashcard", "label")}>
            {label}
          </span>
        ) : null}
        <div id={`${id}-${side}`} className={styles.content}>
          {isBack ? back : front}
        </div>
        {!isBack && showHint && flipOnClick && shown(hintText) ? (
          <span className={styles.hint} {...hooks("flashcard", "hint")}>
            {hintText}
          </span>
        ) : null}
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className={cn(
        styles.flashcard,
        styles[variant],
        styles[size],
        axis === "x" && styles.axisX,
        flipped && styles.flipped,
        disabled && styles.disabled,
        className,
      )}
      style={{ "--flashcard-min-height": minHeightValue } as CSSProperties}
      {...hooks("flashcard", "root", {
        state: flipped ? "active" : "inactive",
        disabled,
        variant,
        size,
      })}
    >
      <div
        className={cn(styles.card, flipOnClick && styles.interactive)}
        {...(flipOnClick
          ? {
              role: "button",
              tabIndex: disabled ? -1 : 0,
              "aria-pressed": flipped,
              "aria-disabled": disabled || undefined,
              onClick: handleClick,
              onKeyDown: handleKeyDown,
            }
          : { role: "group" })}
        aria-label={ariaLabel ?? t("flashcard.label", { face })}
        aria-describedby={`${id}-${flipped ? "back" : "front"}`}
        {...hooks("flashcard", "card", {
          state: flipped ? "active" : "inactive",
          disabled,
        })}
      >
        <div className={styles.inner}>
          {renderFace("front")}
          {renderFace("back")}
        </div>
      </div>
      {shown(footer) ? (
        <div className={styles.footer} {...hooks("flashcard", "footer")}>
          {footer}
        </div>
      ) : null}
    </div>
  );
};

export { Flashcard };
export default Flashcard;
