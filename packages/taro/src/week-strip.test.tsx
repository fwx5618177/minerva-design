import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as M from "./index";

// 2026-11-04 is a Wednesday: the Monday-first week is 11-02 ... 11-08.
const TODAY = "2026-11-04";
const days = () => screen.getAllByRole("option");
const dayOf = (key: string) =>
  days().find((day) => day.getAttribute("data-date") === key)!;

describe("Taro WeekStrip", () => {
  it("renders the week of today as a horizontal listbox", () => {
    render(<M.WeekStrip today={TODAY} />);
    const list = screen.getByRole("listbox", { name: "Week" });
    expect(list).toHaveAttribute("aria-orientation", "horizontal");
    expect(days().map((day) => day.getAttribute("data-date"))).toEqual([
      "2026-11-02",
      "2026-11-03",
      "2026-11-04",
      "2026-11-05",
      "2026-11-06",
      "2026-11-07",
      "2026-11-08",
    ]);
    expect(dayOf(TODAY)).toHaveAttribute("aria-current", "date");
    expect(dayOf(TODAY)).toHaveClass("mn-today");
    expect(days()[0]).toHaveTextContent("Mon");
  });

  it("selects a day on click and follows firstDayOfWeek", () => {
    const onChange = vi.fn();
    render(
      <M.WeekStrip today={TODAY} firstDayOfWeek={0} onChange={onChange} />,
    );
    expect(days()[0]).toHaveAttribute("data-date", "2026-11-01");
    fireEvent.click(dayOf("2026-11-06"));
    expect(onChange).toHaveBeenCalledWith("2026-11-06");
    expect(dayOf("2026-11-06")).toHaveAttribute("aria-selected", "true");
    expect(dayOf("2026-11-06")).toHaveClass("mn-selected");
  });

  it("shows count badges and dots", () => {
    const { container } = render(
      <M.WeekStrip
        today={TODAY}
        markers={{ "2026-11-02": 3, "2026-11-03": true, "2026-11-05": 200 }}
      />,
    );
    expect(container.querySelectorAll(".mn-has-count")).toHaveLength(2);
    expect(container.querySelectorAll(".mn-has-dot")).toHaveLength(1);
    expect(dayOf("2026-11-05")).toHaveTextContent("99+");
    expect(dayOf("2026-11-02").getAttribute("aria-label")).toMatch(/3 items$/);
    expect(dayOf("2026-11-03").getAttribute("aria-label")).toMatch(/marked$/);
  });

  it("navigates weeks and stays inert when disabled", () => {
    const onWeekChange = vi.fn();
    const onChange = vi.fn();
    const { rerender } = render(
      <M.WeekStrip
        today={TODAY}
        showNavigation
        onWeekChange={onWeekChange}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Next week" }));
    expect(onWeekChange).toHaveBeenCalledWith(new Date(2026, 10, 9));
    expect(days()[0]).toHaveAttribute("data-date", "2026-11-09");
    rerender(
      <M.WeekStrip today={TODAY} showNavigation disabled onChange={onChange} />,
    );
    fireEvent.click(days()[1]!);
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Next week" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("follows a controlled value into another week", () => {
    const { rerender } = render(<M.WeekStrip today={TODAY} value={TODAY} />);
    rerender(<M.WeekStrip today={TODAY} value="2026-12-25" />);
    expect(dayOf("2026-12-25")).toHaveAttribute("aria-selected", "true");
  });
});
