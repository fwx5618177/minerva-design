import { describe, expect, it } from "vitest";
import { ratingDisplayStars, ratingStarFill, roundRating } from "./rating";

describe("rating math", () => {
  it("rounds scores to one decimal", () => {
    expect(roundRating(3.14)).toBe(3.1);
    expect(roundRating(0.1 + 0.2)).toBe(0.3);
    expect(roundRating(7)).toBe(7);
  });

  it.each([
    [8, 10, 4],
    [4.4, 10, 2],
    [5, 10, 2.5],
    [5.6, 10, 3],
    [3, 5, 3],
    [0, 10, 0],
    [10, 10, 5],
  ])("ratingDisplayStars(%s, %s) = %s", (value, max, stars) => {
    expect(ratingDisplayStars(value, max)).toBe(stars);
  });

  it("shows no stars when max is not positive", () => {
    expect(ratingDisplayStars(3, 0)).toBe(0);
    expect(ratingDisplayStars(3, -1)).toBe(0);
    expect(ratingDisplayStars(3, NaN)).toBe(0);
  });

  it("maps each star to full / half / empty", () => {
    expect([0, 1, 2, 3, 4].map((i) => ratingStarFill(i, 2.5))).toEqual([
      "full",
      "full",
      "half",
      "empty",
      "empty",
    ]);
    expect(ratingStarFill(4, 5)).toBe("full");
    expect(ratingStarFill(0, 0)).toBe("empty");
  });
});
