import { describe, expect, it } from "vitest";
import {
  addDays,
  dayKey,
  localDate,
  monthStart,
  sameMonth,
} from "./calendar-date";

describe("calendar dates", () => {
  it("builds local midnights, keeping years below 100", () => {
    const date = localDate(2024, 1, 29);
    expect([date.getFullYear(), date.getMonth(), date.getDate()]).toEqual([
      2024, 1, 29,
    ]);
    expect(date.getHours() + date.getMinutes()).toBe(0);
    expect(localDate(42, 0, 1).getFullYear()).toBe(42);
    expect(dayKey(localDate(2024, 0, 32))).toBe("2024-02-01");
  });

  it("formats day keys with padding", () => {
    expect(dayKey(localDate(2024, 2, 5))).toBe("2024-03-05");
    expect(dayKey(localDate(7, 11, 31))).toBe("0007-12-31");
  });

  it("adds days across months and years", () => {
    expect(dayKey(addDays(localDate(2024, 11, 31), 1))).toBe("2025-01-01");
    expect(dayKey(addDays(localDate(2024, 2, 1), -1))).toBe("2024-02-29");
  });

  it("finds month starts and compares months", () => {
    const date = localDate(2024, 0, 15);
    expect(dayKey(monthStart(date))).toBe("2024-01-01");
    expect(dayKey(monthStart(date, -1))).toBe("2023-12-01");
    expect(dayKey(monthStart(date, 13))).toBe("2025-02-01");
    expect(sameMonth(date, localDate(2024, 0, 31))).toBe(true);
    expect(sameMonth(date, localDate(2023, 0, 15))).toBe(false);
    expect(sameMonth(date, localDate(2024, 1, 15))).toBe(false);
  });
});
