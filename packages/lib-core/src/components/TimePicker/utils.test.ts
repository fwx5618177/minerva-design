import { describe, expect, it } from "vitest";
import {
  formatHasSeconds,
  formatTime,
  parseTimeInput,
  resolveTimeFormat,
  startOfToday,
} from "./utils";

const at = (h: number, m: number, s: number) => new Date(2024, 0, 1, h, m, s);
const hms = (d: Date | undefined) =>
  d ? [d.getHours(), d.getMinutes(), d.getSeconds()] : undefined;

describe("TimePicker utils", () => {
  it("formats every token without clobbering earlier replacements", () => {
    expect(formatTime(at(9, 5, 7), "HH:mm:ss")).toBe("09:05:07");
    expect(formatTime(at(21, 5, 7), "hh:mm a")).toBe("09:05 PM");
    expect(formatTime(at(0, 0, 0), "h:m:s a")).toBe("12:0:0 AM");
    expect(formatTime(at(13, 4, 0), "H.mm")).toBe("13.04");
  });

  it("parses strictly while typing", () => {
    const opts = { strict: true };
    expect(hms(parseTimeInput("12:34:56", "HH:mm:ss", opts))).toEqual([
      12, 34, 56,
    ]);
    expect(parseTimeInput("12:3", "HH:mm", opts)).toBeUndefined();
    expect(parseTimeInput("1:02", "HH:mm", opts)).toBeUndefined();
    expect(parseTimeInput("24:00", "HH:mm", opts)).toBeUndefined();
    expect(hms(parseTimeInput("07:15 pm", "hh:mm a", opts))).toEqual([
      19, 15, 0,
    ]);
    expect(hms(parseTimeInput("12:00 AM", "hh:mm a", opts))).toEqual([0, 0, 0]);
    expect(parseTimeInput("13:00 PM", "hh:mm a", opts)).toBeUndefined();
  });

  it("parses leniently on blur", () => {
    const opts = { strict: false };
    expect(hms(parseTimeInput("1:2:3", "HH:mm:ss", opts))).toEqual([1, 2, 3]);
    expect(parseTimeInput("1:2", "HH:mm:ss", opts)).toBeUndefined();
    expect(parseTimeInput("9:30", "hh:mm a", opts)).toBeUndefined();
    expect(parseTimeInput("", "HH:mm", opts)).toBeUndefined();
    expect(parseTimeInput("ab", "HH:mm", opts)).toBeUndefined();
  });

  it("keeps the date part of the base", () => {
    const parsed = parseTimeInput("08:00", "HH:mm", {
      strict: true,
      base: at(23, 59, 59),
    });
    expect(parsed?.getFullYear()).toBe(2024);
    expect(hms(parsed)).toEqual([8, 0, 0]);
  });

  it("starts today at midnight", () => {
    expect(hms(startOfToday())).toEqual([0, 0, 0]);
  });
});

describe("resolveTimeFormat / formatHasSeconds", () => {
  it.each([
    ["HH:mm:ss", true, "HH:mm:ss"],
    ["HH:mm:ss", false, "HH:mm"],
    ["hh:mm:ss a", false, "hh:mm a"],
    ["HH:mm", true, "HH:mm"],
  ])("resolveTimeFormat(%s, %s) = %s", (format, show, expected) => {
    expect(resolveTimeFormat(format, show)).toBe(expected);
    expect(formatHasSeconds(expected)).toBe(expected.includes("s"));
  });
});
