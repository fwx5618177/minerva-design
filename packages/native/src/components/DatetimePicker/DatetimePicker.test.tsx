import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { describe, expect, it, vi } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { getByRoleDeep, queryAllByRoleDeep } from "../../../test/queries";
import { DatetimePicker, daysInMonth } from "./DatetimePicker";

const wait = (ms: number) =>
  act(() => new Promise<void>((r) => setTimeout(r, ms)));
const step = (name: string, actionName: "increment" | "decrement") =>
  fireEvent(screen.getByRole("adjustable", { name }), "accessibilityAction", {
    nativeEvent: { actionName },
  });
const valueOf = (name: string) =>
  screen.getByRole("adjustable", { name }).props.accessibilityValue.text;

describe("DatetimePicker", () => {
  it("days in month follow leap years", () => {
    expect(daysInMonth(2024, 2)).toBe(29);
    expect(daysInMonth(2023, 2)).toBe(28);
    expect(daysInMonth(2023, 4)).toBe(30);
  });

  it("date type: year / month / day wheels, titled", async () => {
    await render(
      <DatetimePicker defaultOpen defaultValue={new Date(2024, 0, 31)} />,
    );
    expect(getByRoleDeep("dialog", { name: "Select date" })).toBeTruthy();
    expect(screen.getAllByRole("adjustable")).toHaveLength(3);
    expect(valueOf("Year")).toBe("2024");
    expect(valueOf("Month")).toBe("01");
    expect(valueOf("Day")).toBe("31");
  });

  it("changing the month clamps the day to the month length (leap year)", async () => {
    const onPick = vi.fn();
    await render(
      <DatetimePicker
        defaultOpen
        defaultValue={new Date(2024, 0, 31)}
        onPick={onPick}
      />,
    );
    await step("Month", "increment");
    expect(onPick).toHaveBeenLastCalledWith(new Date(2024, 1, 29));
    expect(valueOf("Day")).toBe("29");
    expect(screen.queryByText("30")).toBeNull();
  });

  it("confirm reports the date; cancel does not", async () => {
    const onChange = vi.fn();
    const onOpenChange = vi.fn();
    await render(
      <DatetimePicker
        defaultOpen
        defaultValue={new Date(2023, 5, 15)}
        onChange={onChange}
        onOpenChange={onOpenChange}
      />,
    );
    await step("Day", "increment");
    await fireEvent.press(screen.getByRole("button", { name: "Confirm" }));
    expect(onChange).toHaveBeenCalledWith(new Date(2023, 5, 16));
    expect(onOpenChange).toHaveBeenCalledWith(false, "confirm");
    await wait(400);
    expect(queryAllByRoleDeep("dialog")).toEqual([]);
  });

  it("min / max bound the columns", async () => {
    const onChange = vi.fn();
    await render(
      <DatetimePicker
        defaultOpen
        type="year-month"
        minDate={new Date(2022, 3, 1)}
        maxDate={new Date(2023, 1, 28)}
        defaultValue={new Date(2020, 0, 1)}
        onChange={onChange}
      />,
    );
    // clamped to the min
    expect(valueOf("Year")).toBe("2022");
    expect(valueOf("Month")).toBe("04");
    await step("Month", "decrement");
    expect(valueOf("Month")).toBe("04");
    await step("Year", "increment");
    // 2023 April is past the max: clamped to February
    expect(valueOf("Month")).toBe("02");
    await fireEvent.press(screen.getByRole("button", { name: "Confirm" }));
    expect(onChange).toHaveBeenCalledWith(new Date(2023, 1, 28));
  });

  it("time type with a minute step and its own title", async () => {
    const onChange = vi.fn();
    await render(
      <DatetimePicker
        defaultOpen
        type="time"
        minuteStep={15}
        defaultValue={new Date(2024, 4, 2, 9, 20)}
        onChange={onChange}
      />,
    );
    expect(getByRoleDeep("dialog", { name: "Select time" })).toBeTruthy();
    expect(valueOf("Hour")).toBe("09");
    expect(valueOf("Minute")).toBe("15");
    await step("Minute", "increment");
    await fireEvent.press(screen.getByRole("button", { name: "Confirm" }));
    expect(onChange).toHaveBeenCalledWith(new Date(2024, 4, 2, 9, 30));
  });

  it("datetime type: five wheels; custom formatter", async () => {
    await render(
      <DatetimePicker
        defaultOpen
        type="datetime"
        defaultValue={new Date(2024, 4, 2, 9, 20)}
        formatter={(column, n) => (column === "month" ? `${n}月` : String(n))}
      />,
    );
    expect(screen.getAllByRole("adjustable")).toHaveLength(5);
    expect(valueOf("Month")).toBe("5月");
  });

  it("controlled value stays until the parent changes it", async () => {
    const onChange = vi.fn();
    const { rerender } = await render(
      <DatetimePicker
        defaultOpen
        value={new Date(2024, 0, 1)}
        onChange={onChange}
      />,
    );
    await step("Year", "increment");
    await fireEvent.press(screen.getByRole("button", { name: "Confirm" }));
    expect(onChange).toHaveBeenCalledWith(new Date(2025, 0, 1));
    await rerender(
      <DatetimePicker open value={new Date(2024, 0, 1)} onChange={onChange} />,
    );
    expect(valueOf("Year")).toBe("2024");
  });

  it("localized column names and toolbar", async () => {
    await render(
      <MinervaProvider locale={{ language: "fr" }}>
        <DatetimePicker defaultOpen defaultValue={new Date(2024, 0, 1)} />
      </MinervaProvider>,
    );
    expect(getByRoleDeep("dialog", { name: "Choisir une date" })).toBeTruthy();
    expect(screen.getByRole("adjustable", { name: "Année" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Confirmer" })).toBeTruthy();
  });
});
