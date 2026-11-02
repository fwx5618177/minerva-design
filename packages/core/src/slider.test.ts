import { describe, expect, it } from "vitest";
import {
  clampSliderValue,
  closestSliderThumb,
  getSliderKeyValue,
  getSliderMarks,
  isSliderMarkActive,
  normalizeSliderValue,
  setSliderThumb,
  sliderPercent,
  sliderPrecision,
  sliderValueFromRatio,
  sliderValuesEqual,
  snapSliderValue,
  type SliderScale,
} from "./slider";

const scale: SliderScale = { min: 0, max: 100, step: 1 };

describe("slider math", () => {
  it("clamps and snaps to the step", () => {
    expect(clampSliderValue(120, 0, 100)).toBe(100);
    expect(clampSliderValue(Number.NaN, 5, 10)).toBe(5);
    expect(snapSliderValue(12.4, scale)).toBe(12);
    expect(snapSliderValue(0.26, { min: 0, max: 1, step: 0.05 })).toBe(0.25);
    expect(snapSliderValue(9.9, { min: 0, max: 10, step: 3 })).toBe(9);
    expect(sliderPrecision(0.005)).toBe(3);
    expect(sliderPrecision(1e-7)).toBe(7);
  });

  it("snaps to the marks with a null step or snapToMarks", () => {
    const marks = [{ value: 0 }, { value: 30 }, { value: 100 }];
    expect(snapSliderValue(20, { ...scale, step: null, marks })).toBe(30);
    expect(snapSliderValue(70, { ...scale, snapToMarks: true, marks })).toBe(
      100,
    );
  });

  it("resolves marks", () => {
    expect(getSliderMarks(true, 0, 10, 5)).toEqual([
      { value: 0 },
      { value: 5 },
      { value: 10 },
    ]);
    expect(getSliderMarks(true, 0, 1000, 1)).toEqual([]);
    expect(
      getSliderMarks([{ value: 50 }, { value: 200 }, { value: 10 }], 0, 100),
    ).toEqual([{ value: 10 }, { value: 50 }]);
    expect(getSliderMarks(undefined, 0, 100)).toEqual([]);
  });

  it("maps ratios and percents", () => {
    expect(sliderPercent(25, 0, 100)).toBe(25);
    expect(sliderPercent(5, 5, 5)).toBe(0);
    expect(sliderValueFromRatio(0.333, scale)).toBe(33);
    expect(sliderValueFromRatio(2, scale)).toBe(100);
  });

  it("steps with the keys", () => {
    expect(getSliderKeyValue("ArrowRight", 10, scale)).toBe(11);
    expect(getSliderKeyValue("ArrowDown", 0, scale)).toBe(0);
    expect(getSliderKeyValue("PageUp", 10, scale)).toBe(20);
    expect(getSliderKeyValue("Home", 50, scale)).toBe(0);
    expect(getSliderKeyValue("End", 50, scale)).toBe(100);
    expect(getSliderKeyValue("a", 50, scale)).toBeNull();
    const marks = [{ value: 0 }, { value: 30 }, { value: 100 }];
    const marksOnly = { ...scale, step: null, marks };
    expect(getSliderKeyValue("ArrowRight", 0, marksOnly)).toBe(30);
    expect(getSliderKeyValue("ArrowLeft", 30, marksOnly)).toBe(0);
    expect(getSliderKeyValue("ArrowRight", 100, marksOnly)).toBe(100);
  });

  it("normalizes values and keeps range thumbs from crossing", () => {
    expect(normalizeSliderValue([80, 20], true, scale)).toEqual([20, 80]);
    expect(normalizeSliderValue(undefined, true, scale)).toEqual([0, 100]);
    expect(normalizeSliderValue([30, 40], false, scale)).toBe(30);
    expect(normalizeSliderValue(140, false, scale)).toBe(100);
    expect(setSliderThumb([20, 60], 0, 90)).toEqual([60, 60]);
    expect(setSliderThumb([20, 60], 1, 10)).toEqual([20, 20]);
    expect(setSliderThumb(5, 0, 9)).toBe(9);
    expect(closestSliderThumb([20, 60], 30)).toBe(0);
    expect(closestSliderThumb([20, 60], 55)).toBe(1);
    expect(closestSliderThumb([50, 50], 70)).toBe(1);
    expect(sliderValuesEqual([1, 2], [1, 2])).toBe(true);
    expect(isSliderMarkActive(30, [20, 60])).toBe(true);
    expect(isSliderMarkActive(30, 10)).toBe(false);
  });
});
