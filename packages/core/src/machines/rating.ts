// Star rating: a score on a 0..max scale drawn as five stars, with hover
// preview, half-star picks, keyboard steps (slider pattern), read-only and
// clearable modes. The React Rating and <minerva-rating> run on it.
import {
  ratingDisplayStars,
  ratingStarFill,
  roundRating,
  type RatingStarFill,
} from "../rating";
import { createMachine, type Machine } from "./store";

/** Number of stars a rating is drawn with. */
export const RATING_STAR_COUNT = 5;

export interface RatingMachineProps {
  /** Controlled score (`undefined`: uncontrolled). */
  value?: number;
  /** @default 0 */
  defaultValue?: number;
  /** Highest score. @default 10 */
  max?: number;
  /** Display only: events are ignored, no hover preview. @default false */
  readOnly?: boolean;
  /** Picks and arrow keys use half stars. @default true */
  allowHalf?: boolean;
  /** Picking the current score again clears it to 0. @default false */
  clearable?: boolean;
  /** Called with the requested score (controlled or not). */
  onValueChange?: (value: number) => void;
}

export interface RatingMachineState {
  value: number;
  /** Stars previewed under the pointer (`null`: not hovering). */
  hoverStars: number | null;
}

export type RatingMachineEvent =
  /** The pointer is over star `index` (0-based); `half`: its first half. */
  | { type: "HOVER"; index: number; half?: boolean }
  | { type: "HOVER_END" }
  /** Star `index` (0-based) was clicked; `half`: on its first half. */
  | { type: "PICK"; index: number; half?: boolean }
  /**
   * A key on the slider. Arrow keys are logical (swap ArrowLeft / ArrowRight
   * in RTL before sending): Right / Up add a step (half a star, `max / 10`),
   * Left / Down remove one, PageUp / PageDown one whole star, Home / End go
   * to 0 / `max`; clamped to 0..max.
   */
  | { type: "KEY"; key: string }
  | { type: "SET"; value: number }
  | { type: "CLEAR" };

export type RatingMachine = Machine<
  RatingMachineState,
  RatingMachineEvent,
  RatingMachineProps
>;

/** PageUp / PageDown step, in stars. */
const PAGE_STARS = Math.max(1, Math.round(RATING_STAR_COUNT / 5));

/**
 * Score a key leads to from `value` (`null`: not a rating key). Arrow keys
 * are logical (already swapped in RTL).
 */
export function getRatingKeyValue(
  key: string,
  value: number,
  max: number,
  allowHalf = true,
): number | null {
  const step = max / (RATING_STAR_COUNT * (allowHalf ? 2 : 1));
  const pageStep = (max / RATING_STAR_COUNT) * PAGE_STARS;
  switch (key) {
    case "ArrowRight":
    case "ArrowUp":
      return Math.min(max, roundRating(value + step));
    case "ArrowLeft":
    case "ArrowDown":
      return Math.max(0, roundRating(value - step));
    case "PageUp":
      return Math.min(max, roundRating(value + pageStep));
    case "PageDown":
      return Math.max(0, roundRating(value - pageStep));
    case "Home":
      return 0;
    case "End":
      return max;
    default:
      return null;
  }
}

/** Score of a click on star `index` (its first half: a half star). */
export const getRatingPickValue = (
  index: number,
  half: boolean,
  max: number,
  allowHalf = true,
): number =>
  roundRating(
    ((index + (half && allowHalf ? 0.5 : 1)) / RATING_STAR_COUNT) * max,
  );

/** Stars drawn: the hover preview, else the score on five stars. */
export const getRatingDisplayStars = (
  state: RatingMachineState,
  max: number,
): number => state.hoverStars ?? ratingDisplayStars(state.value, max);

/** Fill of each of the five stars. */
export const getRatingStarFills = (
  state: RatingMachineState,
  max: number,
): RatingStarFill[] => {
  const displayed = getRatingDisplayStars(state, max);
  return Array.from({ length: RATING_STAR_COUNT }, (_, i) =>
    ratingStarFill(i, displayed),
  );
};

/** Creates a rating machine. */
export function createRatingMachine(
  props: RatingMachineProps = {},
): RatingMachine {
  return createMachine<
    RatingMachineState,
    RatingMachineEvent,
    RatingMachineProps
  >(
    {
      controlled: ["value"],
      initial: (p) => ({
        value: p.value ?? p.defaultValue ?? 0,
        hoverStars: null,
      }),
      reduce(state, event, p) {
        if (p.readOnly) return state;
        const max = p.max ?? 10;
        const allowHalf = p.allowHalf ?? true;
        const setValue = (value: number) =>
          value === state.value ? state : { ...state, value };
        switch (event.type) {
          case "HOVER": {
            const stars = event.index + (event.half && allowHalf ? 0.5 : 1);
            return stars === state.hoverStars
              ? state
              : { ...state, hoverStars: stars };
          }
          case "HOVER_END":
            return state.hoverStars === null
              ? state
              : { ...state, hoverStars: null };
          case "PICK": {
            const value = getRatingPickValue(
              event.index,
              !!event.half,
              max,
              allowHalf,
            );
            return setValue(p.clearable && value === state.value ? 0 : value);
          }
          case "KEY": {
            const value = getRatingKeyValue(
              event.key,
              state.value,
              max,
              allowHalf,
            );
            return value === null ? state : setValue(value);
          }
          case "SET":
            return setValue(Math.min(max, Math.max(0, event.value)));
          case "CLEAR":
            return setValue(0);
          default:
            return state;
        }
      },
      // No preview while read-only
      normalize: (state, p) =>
        p.readOnly && state.hoverStars !== null
          ? { ...state, hoverStars: null }
          : state,
      changed(requested, prev, p) {
        if (requested.value !== prev.value) p.onValueChange?.(requested.value);
      },
    },
    props,
  );
}
