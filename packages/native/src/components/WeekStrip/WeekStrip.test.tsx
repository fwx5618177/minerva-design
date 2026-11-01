import { fireEvent, render, screen } from "@testing-library/react-native";
import { describe, expect, it, vi } from "vitest";
import { getByRoleDeep } from "../../../test/queries";
import { WeekStrip } from "./WeekStrip";

// 2026-11-04 is a Wednesday: the Monday-first week is 11-02 ... 11-08.
const TODAY = "2026-11-04";
const dayButton = (d: number, month = "November") =>
  screen.getByRole("button", { name: new RegExp(`${month} ${d}, 2026`) });

describe("WeekStrip (native)", () => {
  it("renders a labelled group of seven day buttons, Monday first", async () => {
    await render(<WeekStrip today={TODAY} />);
    expect(getByRoleDeep("group", { name: "Week" })).toBeTruthy();
    const days = screen.getAllByRole("button", { name: /2026/ });
    expect(days).toHaveLength(7);
    expect(days[0]).toHaveAccessibleName("Monday, November 2, 2026");
    expect(dayButton(4)).toHaveAccessibleName(
      "Wednesday, November 4, 2026, Today",
    );
    expect(screen.getByText("Mon")).toBeTruthy();
    expect(screen.getByText("Sun")).toBeTruthy();
  });

  it("starts the week on firstDayOfWeek", async () => {
    await render(<WeekStrip today={TODAY} firstDayOfWeek={0} />);
    const days = screen.getAllByRole("button", { name: /2026/ });
    expect(days[0]).toHaveAccessibleName("Sunday, November 1, 2026");
  });

  it("selects a day and reports it", async () => {
    const onChange = vi.fn();
    await render(<WeekStrip today={TODAY} onChange={onChange} />);
    await fireEvent.press(dayButton(6));
    expect(onChange).toHaveBeenCalledWith("2026-11-06");
    expect(dayButton(6)).toBeSelected();
    expect(dayButton(5)).not.toBeSelected();
  });

  it("keeps a controlled value", async () => {
    const onChange = vi.fn();
    await render(
      <WeekStrip today={TODAY} value="2026-11-03" onChange={onChange} />,
    );
    await fireEvent.press(dayButton(5));
    expect(onChange).toHaveBeenCalledWith("2026-11-05");
    expect(dayButton(3)).toBeSelected();
    expect(dayButton(5)).not.toBeSelected();
  });

  it("describes markers", async () => {
    await render(
      <WeekStrip
        today={TODAY}
        markers={{ "2026-11-02": 3, "2026-11-03": true, "2026-11-06": 150 }}
      />,
    );
    expect(dayButton(2)).toHaveAccessibleName(
      "Monday, November 2, 2026, 3 items",
    );
    expect(dayButton(3)).toHaveAccessibleName(
      "Tuesday, November 3, 2026, marked",
    );
    expect(screen.getAllByText("3")).toHaveLength(2); // day 3 and the badge
    expect(screen.getByText("99+")).toBeTruthy();
  });

  it("navigates weeks and shows the month title", async () => {
    const onWeekChange = vi.fn();
    await render(
      <WeekStrip today={TODAY} showNavigation onWeekChange={onWeekChange} />,
    );
    expect(screen.getByRole("header", { name: "11/2026" })).toBeTruthy();
    await fireEvent.press(
      screen.getByRole("button", { name: "Previous week" }),
    );
    expect(onWeekChange).toHaveBeenLastCalledWith(new Date(2026, 9, 26));
    expect(
      screen.getByRole("header", { name: "10/2026 – 11/2026" }),
    ).toBeTruthy();
    expect(dayButton(26, "October")).toBeTruthy();
  });

  it("follows a controlled value into another week", async () => {
    const { rerender } = await render(
      <WeekStrip today={TODAY} value={TODAY} />,
    );
    await rerender(<WeekStrip today={TODAY} value="2026-12-25" />);
    expect(dayButton(25, "December")).toBeSelected();
  });

  it("is inert when disabled", async () => {
    const onChange = vi.fn();
    await render(
      <WeekStrip today={TODAY} disabled showNavigation onChange={onChange} />,
    );
    await fireEvent.press(dayButton(5));
    expect(onChange).not.toHaveBeenCalled();
    expect(dayButton(5)).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next week" })).toBeDisabled();
  });

  it("uses getDayLabel", async () => {
    await render(
      <WeekStrip
        today={TODAY}
        markers={{ "2026-11-02": 2 }}
        getDayLabel={(day, marker) => `${day}:${String(marker)}`}
      />,
    );
    expect(screen.getByRole("button", { name: "2026-11-02:2" })).toBeTruthy();
  });
});
