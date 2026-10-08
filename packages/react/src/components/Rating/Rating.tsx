import React from "react";
import {
  createRatingMachine,
  getRatingKeyValue,
  getRatingStarFills,
  RATING_STAR_COUNT,
  type RatingStarFill,
} from "@minerva/core";
import { cn } from "../../utils/cn";
import { IconStar, IconStarHalf } from "../../internal/icons";
import { logicalArrowKey } from "../../internal/direction";
import { warnOnce } from "../../internal/devWarnings";
import { hooks } from "../../internal/stylingHooks";
import { useMachine } from "../../internal/useMachine";
import styles from "./rating.module.scss";
import type { RatingProps, RatingScaleProps } from "./types";

const SIZE_PX = { small: 12, medium: 16, large: 20 } as const;
const STARS = Array.from({ length: RATING_STAR_COUNT }, (_, i) => i);

const Star = ({ fill, size }: { fill: RatingStarFill; size: number }) => {
  const className = cn(styles.star, styles[fill]);
  if (fill === "half") {
    // Empty outline with the filled left half drawn on top.
    return (
      <span
        className={className}
        style={{ width: size, height: size }}
        {...hooks("rating", "star", { fill })}
      >
        <IconStar size={size} strokeWidth={1.5} className={styles.halfBase} />
        <IconStarHalf
          size={size}
          fill="currentColor"
          strokeWidth={1.5}
          className={styles.halfFill}
        />
      </span>
    );
  }
  return (
    <IconStar
      size={size}
      className={className}
      fill={fill === "full" ? "currentColor" : "none"}
      strokeWidth={1.5}
      aria-hidden
      focusable={false}
      {...hooks("rating", "star", { fill })}
    />
  );
};

/**
 * Rating: displays a score as 5 stars (any 0..max scale), optionally with
 * the value and the number of ratings. With `onChange` it becomes an
 * interactive slider (hover preview, half-star clicks, keyboard): arrows
 * step half a star (`max / 10`; in RTL ArrowLeft increases), PageUp /
 * PageDown one whole star (`max / 5`), Home / End jump to 0 / `max`; all
 * clamped to 0..max.
 */
const Rating = ({
  value,
  max = 10,
  size = "medium",
  showValue = false,
  ratingCount,
  onChange,
  readOnly = false,
  "aria-label": ariaLabel,
  onKeyDown,
  className,
  style,
  ref,
  ...rest
}: RatingProps) => {
  const interactive = !!onChange && !readOnly;
  if (process.env.NODE_ENV !== "production") {
    if (!(max > 0)) {
      warnOnce(
        "Rating:max",
        `[minerva] Rating: \`max\` must be a positive number, got ${max}.`,
      );
    } else if (value < 0 || value > max) {
      warnOnce(
        "Rating:range",
        `[minerva] Rating: \`value\` (${value}) should be between 0 and \`max\` (${max}).`,
      );
    }
  }
  // Hover preview, picks and keys: core's rating machine (the score stays
  // controlled by `value` / `onChange`).
  const [state, send] = useMachine(createRatingMachine, {
    value,
    max,
    readOnly: !interactive,
    onValueChange: onChange,
  });

  // Normalize the score to 5 stars; fractions in 0.25..0.75 render a half star.
  const fills = getRatingStarFills(state, max);
  const fillOf = (i: number) => fills[i];

  const handleStarClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    // Left half of a star -> half star, right half -> full star.
    const rect = event.currentTarget.getBoundingClientRect();
    const leftHalf = event.clientX - rect.left < rect.width / 2;
    send({ type: "PICK", index, half: leftHalf });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    // The consumer goes first; preventDefault() takes over the key.
    onKeyDown?.(event);
    if (event.defaultPrevented || !interactive) return;
    // Stars follow the reading direction: in RTL ArrowLeft increases.
    const key = logicalArrowKey(event.key, event.currentTarget);
    if (getRatingKeyValue(key, value, max) === null) return;
    event.preventDefault();
    send({ type: "KEY", key });
  };

  const px = SIZE_PX[size];
  const label = ariaLabel ?? `${value.toFixed(1)} / ${max}`;
  const rootClassName = cn(
    styles.rating,
    styles[size],
    interactive && styles.interactive,
    className,
  );

  const rootHooks = hooks("rating", "root", { readonly: !interactive, size });

  const stars = (
    <span className={styles.stars} aria-hidden {...hooks("rating", "stars")}>
      {STARS.map((i) =>
        interactive ? (
          <button
            key={i}
            type="button"
            tabIndex={-1}
            className={styles.starButton}
            onClick={(event) => handleStarClick(event, i)}
            onMouseEnter={() => send({ type: "HOVER", index: i })}
          >
            <Star fill={fillOf(i)} size={px} />
          </button>
        ) : (
          <Star key={i} fill={fillOf(i)} size={px} />
        ),
      )}
    </span>
  );

  const valueNode = showValue && (
    <span className={styles.value} {...hooks("rating", "value")}>
      <strong>{value.toFixed(1)}</strong>
      {ratingCount !== undefined && (
        <span className={styles.count} {...hooks("rating", "count")}>
          ({ratingCount.toLocaleString("en-US")})
        </span>
      )}
    </span>
  );

  if (!interactive) {
    return (
      <span
        {...rest}
        ref={ref}
        className={rootClassName}
        style={style}
        aria-label={label}
        role="img"
        {...rootHooks}
      >
        {stars}
        {valueNode}
      </span>
    );
  }

  return (
    <span
      {...rest}
      ref={ref}
      className={rootClassName}
      style={style}
      role="slider"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseLeave={() => send({ type: "HOVER_END" })}
      {...rootHooks}
    >
      {stars}
      {valueNode}
    </span>
  );
};

/**
 * RatingScale: several labelled ratings sharing one scale (e.g. plot /
 * characters / writing). Interactive when `onChange` is set.
 */
const RatingScale = ({
  dimensions,
  max = 10,
  size = "medium",
  onChange,
  readOnly,
  showValue = true,
  className,
  ref,
}: RatingScaleProps) => (
  <div
    ref={ref}
    className={cn(styles.scale, className)}
    {...hooks("rating-scale", "root", {
      readonly: !onChange || !!readOnly,
      size,
    })}
  >
    {dimensions.map((dim) => (
      <div
        key={dim.key}
        className={styles.scaleRow}
        title={typeof dim.hint === "string" ? dim.hint : undefined}
        {...hooks("rating-scale", "row")}
      >
        <span className={styles.scaleLabel} {...hooks("rating-scale", "label")}>
          {dim.label}
        </span>
        <Rating
          value={dim.value}
          max={max}
          size={size}
          showValue={showValue}
          readOnly={readOnly}
          onChange={onChange ? (v) => onChange(dim.key, v) : undefined}
          aria-label={`${dim.label} ${dim.value.toFixed(1)} / ${max}`}
        />
      </div>
    ))}
  </div>
);

export { Rating, RatingScale };
export default Rating;
