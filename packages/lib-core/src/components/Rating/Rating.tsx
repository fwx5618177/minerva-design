import React, { useState } from "react";
import classNames from "classnames";
import { LuStar, LuStarHalf } from "react-icons/lu";
import styles from "./rating.module.scss";
import type { RatingProps, RatingScaleProps } from "./types";

type StarFill = "full" | "half" | "empty";

const SIZE_PX = { small: 12, medium: 16, large: 20 } as const;
/** `ui-*` styling hooks (stable class names shared with @novel-isr/ui). */
const UI_SIZE = { small: "sm", medium: "md", large: "lg" } as const;
const STARS = [0, 1, 2, 3, 4];

const round1 = (n: number) => Math.round(n * 10) / 10;

const Star = ({ fill, size }: { fill: StarFill; size: number }) => {
  const className = classNames(
    styles.star,
    styles[fill],
    "ui-rating-star",
    `ui-rating-star-${fill}`,
  );
  if (fill === "half") {
    // Empty outline with the filled left half drawn on top.
    return (
      <span className={className} style={{ width: size, height: size }}>
        <LuStar size={size} strokeWidth={1.5} className={styles.halfBase} />
        <LuStarHalf
          size={size}
          fill="currentColor"
          strokeWidth={1.5}
          className={styles.halfFill}
        />
      </span>
    );
  }
  return (
    <LuStar
      size={size}
      className={className}
      fill={fill === "full" ? "currentColor" : "none"}
      strokeWidth={1.5}
      aria-hidden
      focusable={false}
    />
  );
};

/**
 * Rating: displays a score as 5 stars (any 0..max scale), optionally with
 * the value and the number of ratings. With `onChange` it becomes an
 * interactive slider (hover preview, half-star clicks, arrow keys).
 */
const Rating = ({
  value,
  max = 10,
  size = "medium",
  showValue = false,
  ratingCount,
  onChange,
  readOnly = false,
  ariaLabel,
  onKeyDown,
  className,
  style,
  ref,
  ...rest
}: RatingProps) => {
  const interactive = !!onChange && !readOnly;
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Normalize the score to 5 stars; fractions in 0.25..0.75 render a half star.
  const stars5 = (value / max) * 5;
  const fullCount = Math.floor(stars5);
  const fraction = stars5 - fullCount;
  const half = fraction >= 0.25 && fraction < 0.75;
  const roundedFull = fraction >= 0.75 ? fullCount + 1 : fullCount;
  const displayed =
    interactive && hoverIndex !== null
      ? hoverIndex
      : roundedFull + (half ? 0.5 : 0);

  const fillOf = (i: number): StarFill =>
    i < Math.floor(displayed) ? "full" : i < displayed ? "half" : "empty";

  const handleStarClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    // Left half of a star -> half star, right half -> full star.
    const rect = event.currentTarget.getBoundingClientRect();
    const leftHalf = event.clientX - rect.left < rect.width / 2;
    const stars = index + (leftHalf ? 0.5 : 1);
    onChange?.(round1((stars / 5) * max));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    // The consumer goes first; preventDefault() takes over the key.
    onKeyDown?.(event);
    if (event.defaultPrevented || !interactive) return;
    const step = max / 10;
    let next: number;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowUp":
        next = Math.min(max, round1(value + step));
        break;
      case "ArrowLeft":
      case "ArrowDown":
        next = Math.max(0, round1(value - step));
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = max;
        break;
      default:
        return;
    }
    event.preventDefault();
    onChange?.(next);
  };

  const px = SIZE_PX[size];
  const label = ariaLabel ?? `${value.toFixed(1)} / ${max}`;
  const rootClassName = classNames(
    styles.rating,
    styles[size],
    interactive && styles.interactive,
    "ui-rating",
    `ui-rating-size-${UI_SIZE[size]}`,
    interactive && "ui-rating-interactive",
    className,
  );

  const stars = (
    <span className={classNames(styles.stars, "ui-rating-stars")} aria-hidden>
      {STARS.map((i) =>
        interactive ? (
          <button
            key={i}
            type="button"
            tabIndex={-1}
            className={classNames(
              styles.starButton,
              "ui-rating-star-btn",
              `ui-rating-star-${fillOf(i)}`,
            )}
            onClick={(event) => handleStarClick(event, i)}
            onMouseEnter={() => setHoverIndex(i + 1)}
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
    <span className={classNames(styles.value, "ui-rating-value")}>
      <strong>{value.toFixed(1)}</strong>
      {ratingCount !== undefined && (
        <span className={classNames(styles.count, "ui-rating-count")}>
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
      onMouseLeave={() => setHoverIndex(null)}
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
    className={classNames(styles.scale, "ui-rating-scale", className)}
  >
    {dimensions.map((dim) => (
      <div
        key={dim.key}
        className={classNames(styles.scaleRow, "ui-rating-scale-row")}
        title={typeof dim.hint === "string" ? dim.hint : undefined}
      >
        <span
          className={classNames(styles.scaleLabel, "ui-rating-scale-label")}
        >
          {dim.label}
        </span>
        <Rating
          value={dim.value}
          max={max}
          size={size}
          showValue={showValue}
          readOnly={readOnly}
          onChange={onChange ? (v) => onChange(dim.key, v) : undefined}
          ariaLabel={`${dim.label} ${dim.value.toFixed(1)} / ${max}`}
        />
      </div>
    ))}
  </div>
);

export { Rating, RatingScale };
export default Rating;
