import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import i18n from "../../config/i18n";
import { WeekStrip } from ".";

// 2026-11-04 is a Wednesday: the Monday-first week is 11-02 ... 11-08.
const TODAY = "2026-11-04";
const days = () => screen.getAllByRole("option");
const dayOf = (key: string) =>
  days().find((day) => day.getAttribute("data-date") === key)!;
const keysOf = () => days().map((day) => day.getAttribute("data-date"));

describe("WeekStrip", () => {
  it("renders the seven days of the week of today, Monday first", () => {
    render(<WeekStrip today={TODAY} />);
    const list = screen.getByRole("listbox", { name: "Week" });
    expect(list).toHaveAttribute("aria-orientation", "horizontal");
    expect(keysOf()).toEqual([
      "2026-11-02",
      "2026-11-03",
      "2026-11-04",
      "2026-11-05",
      "2026-11-06",
      "2026-11-07",
      "2026-11-08",
    ]);
    expect(days()[0]).toHaveTextContent("Mon2");
    expect(days()[6]).toHaveTextContent("Sun8");
    expect(dayOf(TODAY)).toHaveAttribute("aria-current", "date");
    expect(dayOf("2026-11-03")).not.toHaveAttribute("aria-current");
    expect(dayOf(TODAY)).toHaveAccessibleName("Wednesday, November 4, 2026");
    // Nothing selected: today is the tab stop
    expect(
      days().every((day) => day.getAttribute("aria-selected") === "false"),
    ).toBe(true);
    expect(dayOf(TODAY)).toHaveAttribute("tabindex", "0");
  });

  it("honours firstDayOfWeek and custom weekday labels", () => {
    render(
      <WeekStrip
        today={TODAY}
        firstDayOfWeek={0}
        weekdayLabels={["M", "T", "W", "T", "F", "S", "S"]}
      />,
    );
    expect(keysOf()[0]).toBe("2026-11-01");
    expect(keysOf()[6]).toBe("2026-11-07");
    // labels stay Monday-first: Sunday is the 7th label
    expect(days()[0]).toHaveTextContent("S1");
    expect(days()[1]).toHaveTextContent("M2");
  });

  it("selects a day by click (uncontrolled) and reports it", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<WeekStrip today={TODAY} onChange={onChange} />);
    await user.click(dayOf("2026-11-06"));
    expect(onChange).toHaveBeenCalledWith("2026-11-06");
    expect(dayOf("2026-11-06")).toHaveAttribute("aria-selected", "true");
    expect(dayOf("2026-11-06")).toHaveAttribute("tabindex", "0");
  });

  it("stays on the controlled value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<WeekStrip today={TODAY} value="2026-11-03" onChange={onChange} />);
    await user.click(dayOf("2026-11-05"));
    expect(onChange).toHaveBeenCalledWith("2026-11-05");
    expect(dayOf("2026-11-03")).toHaveAttribute("aria-selected", "true");
    expect(dayOf("2026-11-05")).toHaveAttribute("aria-selected", "false");
  });

  it("shows count badges and dots and describes them", () => {
    render(
      <WeekStrip
        today={TODAY}
        markers={{
          "2026-11-02": 3,
          "2026-11-03": true,
          "2026-11-05": 0,
          "2026-11-06": 120,
          "2026-11-07": false,
        }}
      />,
    );
    const badge = dayOf("2026-11-02").querySelector(".marker");
    expect(badge).toHaveClass("count");
    expect(badge).toHaveTextContent("3");
    expect(dayOf("2026-11-02")).toHaveAccessibleName(
      "Monday, November 2, 2026, 3 items",
    );
    expect(dayOf("2026-11-03").querySelector(".marker")).toHaveClass("dot");
    expect(dayOf("2026-11-03")).toHaveAccessibleName(
      "Tuesday, November 3, 2026, marked",
    );
    expect(dayOf("2026-11-05").querySelector(".marker")?.className).not.toMatch(
      /count|dot/,
    );
    expect(dayOf("2026-11-06")).toHaveTextContent("99+");
    expect(dayOf("2026-11-07").querySelector(".marker")?.className).not.toMatch(
      /count|dot/,
    );
  });

  it("uses getDayLabel for the accessible names", () => {
    const getDayLabel = vi.fn(
      (day: string, marker: number | boolean | undefined) =>
        `${day}:${String(marker)}`,
    );
    render(
      <WeekStrip
        today={TODAY}
        markers={{ "2026-11-02": 2 }}
        getDayLabel={getDayLabel}
      />,
    );
    expect(dayOf("2026-11-02")).toHaveAccessibleName("2026-11-02:2");
    expect(dayOf("2026-11-03")).toHaveAccessibleName("2026-11-03:undefined");
  });

  it("navigates weeks with the buttons and shows the month", async () => {
    const user = userEvent.setup();
    const onWeekChange = vi.fn();
    render(
      <WeekStrip today={TODAY} showNavigation onWeekChange={onWeekChange} />,
    );
    expect(screen.getByText("November 2026")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Previous week" }));
    expect(onWeekChange).toHaveBeenLastCalledWith(new Date(2026, 9, 26));
    expect(keysOf()[0]).toBe("2026-10-26");
    // a week spanning two months shows both
    expect(screen.getByText(/October.*November 2026/)).toBeInTheDocument();
    // without a selection or today in view, the first day is the tab stop
    expect(dayOf("2026-10-26")).toHaveAttribute("tabindex", "0");
    await user.click(screen.getByRole("button", { name: "Next week" }));
    await user.click(screen.getByRole("button", { name: "Next week" }));
    expect(keysOf()[0]).toBe("2026-11-09");
  });

  it("keeps a controlled week", async () => {
    const user = userEvent.setup();
    const onWeekChange = vi.fn();
    render(
      <WeekStrip
        today={TODAY}
        showNavigation
        week={new Date(2026, 0, 7)}
        onWeekChange={onWeekChange}
      />,
    );
    expect(keysOf()[0]).toBe("2026-01-05");
    await user.click(screen.getByRole("button", { name: "Next week" }));
    expect(onWeekChange).toHaveBeenCalledWith(new Date(2026, 0, 12));
    expect(keysOf()[0]).toBe("2026-01-05");
  });

  it("follows a controlled value into another week", () => {
    const { rerender } = render(<WeekStrip today={TODAY} value={TODAY} />);
    expect(keysOf()[0]).toBe("2026-11-02");
    rerender(<WeekStrip today={TODAY} value="2026-12-25" />);
    expect(keysOf()[0]).toBe("2026-12-21");
    expect(dayOf("2026-12-25")).toHaveAttribute("aria-selected", "true");
  });

  it("opens on the week of the selected day", () => {
    render(<WeekStrip today={TODAY} defaultValue="2027-01-01" />);
    expect(keysOf()).toContain("2027-01-01");
    expect(keysOf()[0]).toBe("2026-12-28");
  });

  it("is inert when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <WeekStrip today={TODAY} disabled showNavigation onChange={onChange} />,
    );
    expect(screen.getByRole("listbox")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(days().every((day) => day.tabIndex === -1)).toBe(true);
    await user.click(dayOf("2026-11-05"));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Next week" })).toBeDisabled();
  });

  it("applies size, className and forwards the ref", () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <WeekStrip today={TODAY} size="large" className="mine" ref={ref} />,
    );
    expect(ref.current).toBe(container.firstChild);
    expect(ref.current).toHaveClass("weekStrip", "large", "mine");
  });

  it("accepts a custom aria-label", () => {
    render(<WeekStrip today={TODAY} aria-label="Study days" />);
    expect(
      screen.getByRole("listbox", { name: "Study days" }),
    ).toBeInTheDocument();
  });
});

describe("WeekStrip keyboard", () => {
  it("moves with the arrows across weeks, Home / End and PageUp / PageDown", async () => {
    const user = userEvent.setup();
    const onWeekChange = vi.fn();
    render(<WeekStrip today={TODAY} onWeekChange={onWeekChange} />);
    await user.tab();
    expect(dayOf(TODAY)).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    expect(dayOf("2026-11-05")).toHaveFocus();
    await user.keyboard("{End}");
    expect(dayOf("2026-11-08")).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(dayOf("2026-11-09")).toHaveFocus();
    expect(onWeekChange).toHaveBeenLastCalledWith(new Date(2026, 10, 9));
    await user.keyboard("{Home}");
    expect(dayOf("2026-11-09")).toHaveFocus();
    await user.keyboard("{ArrowLeft}");
    expect(dayOf("2026-11-08")).toHaveFocus();
    await user.keyboard("{PageDown}");
    expect(dayOf("2026-11-15")).toHaveFocus();
    await user.keyboard("{PageUp}{PageUp}");
    expect(dayOf("2026-11-01")).toHaveFocus();
    expect(keysOf()[0]).toBe("2026-10-26");
  });

  it("selects with Enter and Space", async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [value, setValue] = useState<string>();
      return <WeekStrip today={TODAY} value={value} onChange={setValue} />;
    }
    render(<Controlled />);
    await user.tab();
    await user.keyboard("{ArrowLeft}{Enter}");
    expect(dayOf("2026-11-03")).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{ArrowLeft} ");
    expect(dayOf("2026-11-02")).toHaveAttribute("aria-selected", "true");
    expect(dayOf("2026-11-03")).toHaveAttribute("aria-selected", "false");
  });

  it("reverses the arrows in right-to-left layouts", async () => {
    const user = userEvent.setup();
    render(
      <div dir="rtl">
        <WeekStrip today={TODAY} />
      </div>,
    );
    await user.tab();
    await user.keyboard("{ArrowLeft}");
    expect(dayOf("2026-11-05")).toHaveFocus();
  });
});

describe("WeekStrip localization", () => {
  afterEach(() => {
    act(() => {
      i18n.changeLanguage("en");
    });
  });

  it("translates the labels and weekdays", () => {
    act(() => {
      i18n.changeLanguage("zh");
    });
    render(<WeekStrip today={TODAY} showNavigation markers={{ [TODAY]: 2 }} />);
    expect(screen.getByRole("listbox", { name: "周" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "上一周" })).toBeInTheDocument();
    expect(days()[0]).toHaveTextContent("一");
    expect(dayOf(TODAY).getAttribute("aria-label")).toContain("2 项");
  });
});
