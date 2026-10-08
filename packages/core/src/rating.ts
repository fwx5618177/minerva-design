// Star math of the ratings (lib-core Rating and <minerva-rating>): scores
// on a 0..max scale shown as five stars with half stars.

/** Fill of one star. */
export type RatingStarFill = "full" | "half" | "empty";

/** Rounds a score to one decimal (`3.14` -> `3.1`). */
export const roundRating = (n: number): number => Math.round(n * 10) / 10;

/**
 * Stars shown for `value` on a `0..max` scale, normalized to five stars in
 * half-star steps: fractions in 0.25..0.75 give a half star, larger ones
 * round up, smaller ones down. A `max` of 0 or less (or NaN) shows 0 stars.
 */
export function ratingDisplayStars(value: number, max: number): number {
  const stars5 = max > 0 ? (value / max) * 5 : 0;
  const fullCount = Math.floor(stars5);
  const fraction = stars5 - fullCount;
  const half = fraction >= 0.25 && fraction < 0.75;
  const roundedFull = fraction >= 0.75 ? fullCount + 1 : fullCount;
  return roundedFull + (half ? 0.5 : 0);
}

/** Fill of the star at `index` (0-based) when `displayed` stars are shown. */
export const ratingStarFill = (
  index: number,
  displayed: number,
): RatingStarFill =>
  index < Math.floor(displayed) ? "full" : index < displayed ? "half" : "empty";
