import React, { act, createRef, useState } from "react";
import { render as rtlRender, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MonthCalendar, type MonthCalendarProps } from ".";
import i18n from "../../config/i18n";
import styles from "./monthCalendar.module.scss";

const events = [
  { id: "a", date: "2024-02-29", title: "Release" },
  { id: "b", date: "2024-03-01", title: "Review" },
  { id: "c", date: "2024-03-01", title: "Retro" },
];

afterEach(() => {
  vi.useRealTimers();
});

let container: HTMLElement;
let rerenderFn: (ui: React.ReactElement) => void;
function render(props: Partial<MonthCalendarProps> = {}) {
  const ui = (
    <MonthCalendar
      month={new Date(2024, 1, 29)}
      onMonthChange={vi.fn()}
      onChange={vi.fn()}
      events={events}
      {...props}
    />
  );
  if (container && container.isConnected) {
    rerenderFn(ui);
  } else {
    const result = rtlRender(ui);
    container = result.container;
    rerenderFn = result.rerender;
  }
}
afterEach(() => {
  container = undefined as unknown as HTMLElement;
});

const button = (label: string) =>
  container.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`)!;
const day = (key: string) =>
  container.querySelector<HTMLButtonElement>(`button[data-date="${key}"]`)!;
const key = (
  element: HTMLElement,
  value: string,
  init: KeyboardEventInit = {},
) =>
  act(() => {
    element.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: value,
        bubbles: true,
        cancelable: true,
        ...init,
      }),
    );
  });

describe("MonthCalendar", () => {
  it.each([
    [new Date(2024, 1, 29), "2024-01-29", "2024-03-10"],
    [new Date(2025, 11, 31), "2025-12-01", "2026-01-11"],
    [new Date(2026, 1, 1), "2026-01-26", "2026-03-08"],
  ])("renders six Monday-first weeks for %s", (month, first, last) => {
    render({ month });
    const days = container.querySelectorAll("button[data-date]");
    expect(days).toHaveLength(42);
    expect(days[0].getAttribute("data-date")).toBe(first);
    expect(days[41].getAttribute("data-date")).toBe(last);
    expect(container.querySelectorAll('[role="columnheader"]')).toHaveLength(7);
    expect(container.querySelector('[role="columnheader"]')!.textContent).toBe(
      "Mon",
    );
    expect(
      container.querySelectorAll('button[data-date][tabindex="0"]'),
    ).toHaveLength(1);
  });

  it("renders the calendar structure, a localized heading and event counts", () => {
    const ref = createRef<HTMLElement>();
    render({ className: "c", ref });
    const root = screen.getByRole("region", { name: "Month calendar" });
    expect(ref.current).toBe(root);
    expect(root).toHaveClass(styles.monthCalendar, "c");
    expect(root.querySelector(`.${styles.toolbar}`)).not.toBeNull();
    expect(root.querySelector(`.${styles.navigation}`)).not.toBeNull();
    expect(screen.getByRole("grid", { name: "February 2024" })).toHaveClass(
      styles.grid,
    );
    expect(screen.getAllByRole("row")).toHaveLength(7);
    expect(day("2024-02-29")).toHaveClass(styles.day);
    expect(day("2024-02-29")).toHaveAttribute(
      "aria-label",
      "2024-02-29, 1 event",
    );
    expect(day("2024-03-01")).toHaveAttribute(
      "aria-label",
      "2024-03-01, 2 events",
    );
    expect(day("2024-03-01")).toHaveAttribute("data-outside", "true");
    expect(day("2024-02-28")).toHaveAttribute("aria-label", "2024-02-28");
    expect(
      day("2024-02-29").querySelector(`.${styles.count}`),
    ).toHaveTextContent("1");
  });

  it("caps the count at 99+", () => {
    const many = Array.from({ length: 120 }, (_, i) => ({
      id: String(i),
      date: "2024-02-10",
      title: `E${i}`,
    }));
    render({ events: many });
    expect(
      day("2024-02-10").querySelector(`.${styles.count}`),
    ).toHaveTextContent("99+");
  });

  it.each([
    [new Date(2025, 11, 31), "Next month", new Date(2026, 0, 1)],
    [new Date(2026, 0, 31), "Previous month", new Date(2025, 11, 1)],
    [new Date(2024, 0, 31), "Next month", new Date(2024, 1, 1)],
  ])(
    "navigates without overflowing a month or mutating the input",
    (month, label, expected) => {
      const before = month.getTime();
      const onMonthChange = vi.fn();
      render({ month, onMonthChange });
      act(() => button(label).click());
      expect(onMonthChange).toHaveBeenCalledWith(expected);
      expect(month.getTime()).toBe(before);
    },
  );

  it("returns to the local current month without changing the controlled selection", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 1, 0, 15));
    const onMonthChange = vi.fn();
    const onChange = vi.fn();
    render({ onMonthChange, onChange });
    act(() => screen.getByRole("button", { name: "Today" }).click());
    expect(onMonthChange).toHaveBeenCalledWith(new Date(2026, 0, 1));
    expect(onChange).not.toHaveBeenCalled();
    render({ month: new Date(2026, 0, 1) });
    expect(day("2026-01-01").getAttribute("aria-current")).toBe("date");
    expect(day("2026-01-01").tabIndex).toBe(0);
  });

  it("keeps selection controlled and displays only selected-day events on demand", () => {
    const onChange = vi.fn();
    const onEventClick = vi.fn();
    render({ value: "2024-02-29", onChange, onEventClick });
    act(() => day("2024-03-01").click());
    expect(onChange).toHaveBeenCalledWith("2024-03-01");
    expect(day("2024-02-29").getAttribute("aria-pressed")).toBe("true");
    expect(day("2024-02-29").parentElement).toHaveAttribute(
      "aria-selected",
      "true",
    );
    const list = screen.getByRole("region", { name: "Events on 2024-02-29" });
    expect(list).toHaveClass(styles.events);
    expect(list.textContent).toContain("Release");
    expect(list.textContent).not.toContain("Review");
    act(() => screen.getByRole("button", { name: "Release" }).click());
    expect(onEventClick).toHaveBeenCalledWith(events[0]);
    render({ value: "2024-02-29", showSelectedDayEvents: false });
    expect(
      screen.queryByRole("region", { name: "Events on 2024-02-29" }),
    ).toBeNull();
  });

  it("lists events as text without onEventClick and shows an empty text", () => {
    render({ value: "2024-02-29" });
    expect(screen.queryByRole("button", { name: "Release" })).toBeNull();
    expect(screen.getByText("Release").tagName).toBe("SPAN");
    render({ value: "2024-02-12" });
    expect(screen.getByText("No events")).toBeInTheDocument();
    render({ value: "2024-02-12", emptyEventsText: "Nothing" });
    expect(screen.getByText("Nothing")).toBeInTheDocument();
  });

  it("selecting a day of another month also requests that month", () => {
    const onMonthChange = vi.fn();
    render({ onMonthChange });
    act(() => day("2024-03-01").click());
    expect(onMonthChange).toHaveBeenCalledWith(new Date(2024, 2, 1));
  });

  it("works uncontrolled with defaultMonth / defaultValue", () => {
    const onChange = vi.fn();
    rtlRender(
      <MonthCalendar
        defaultMonth={new Date(2024, 1, 10)}
        defaultValue="2024-02-10"
        onChange={onChange}
      />,
    );
    expect(
      screen.getByRole("grid", { name: "February 2024" }),
    ).toBeInTheDocument();
    const next = screen.getByRole("button", { name: "Next month" });
    act(() => next.click());
    expect(
      screen.getByRole("grid", { name: "March 2024" }),
    ).toBeInTheDocument();
    const target = document.querySelector<HTMLButtonElement>(
      'button[data-date="2024-03-05"]',
    )!;
    act(() => target.click());
    expect(onChange).toHaveBeenCalledWith("2024-03-05");
    expect(target).toHaveAttribute("aria-pressed", "true");
  });

  it("defaults to the current month", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2025, 4, 20, 12));
    rtlRender(<MonthCalendar />);
    expect(screen.getByRole("grid", { name: "May 2025" })).toBeInTheDocument();
  });

  it("moves keyboard focus across years and clamps PageDown to the last day of February", () => {
    function Controlled() {
      const [month, setMonth] = useState(new Date(2023, 11, 1));
      const [value, setValue] = useState("2023-12-31");
      return (
        <MonthCalendar
          month={month}
          onMonthChange={setMonth}
          value={value}
          onChange={setValue}
        />
      );
    }
    container = rtlRender(<Controlled />).container;
    act(() => day("2023-12-31").focus());
    key(day("2023-12-31"), "ArrowRight");
    expect(document.activeElement).toBe(day("2024-01-01"));
    key(day("2024-01-01"), "End");
    expect(document.activeElement).toBe(day("2024-01-07"));
    key(day("2024-01-07"), "Home");
    expect(document.activeElement).toBe(day("2024-01-01"));
    act(() => day("2024-01-31").focus());
    key(day("2024-01-31"), "PageDown");
    expect(document.activeElement).toBe(day("2024-02-29"));
    key(day("2024-02-29"), "Enter");
    expect(day("2024-02-29").getAttribute("aria-pressed")).toBe("true");
    key(day("2024-02-29"), "ArrowDown");
    expect(document.activeElement).toBe(day("2024-03-07"));
    key(day("2024-03-07"), " ");
    expect(day("2024-03-07").getAttribute("aria-pressed")).toBe("true");
    key(day("2024-03-07"), "PageUp");
    expect(document.activeElement).toBe(day("2024-02-07"));
    key(day("2024-02-07"), "ArrowUp");
    expect(document.activeElement).toBe(day("2024-01-31"));
    key(day("2024-01-31"), "ArrowLeft");
    expect(document.activeElement).toBe(day("2024-01-30"));
    key(day("2024-01-30"), "PageDown", { shiftKey: true });
    expect(document.activeElement).toBe(day("2025-01-30"));
  });

  it("ignores repeated Enter and unrelated keys", () => {
    const onChange = vi.fn();
    render({ onChange });
    key(day("2024-02-10"), "Enter", { repeat: true });
    key(day("2024-02-10"), "a");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("blocks all navigation, selection and event callbacks when disabled", () => {
    const onMonthChange = vi.fn();
    const onChange = vi.fn();
    const onEventClick = vi.fn();
    render({
      disabled: true,
      value: "2024-02-29",
      onMonthChange,
      onChange,
      onEventClick,
    });
    for (const element of container.querySelectorAll("button")) {
      expect(element.disabled).toBe(true);
      act(() => element.click());
    }
    key(day("2024-02-29"), "ArrowRight");
    key(day("2024-02-29"), "Enter");
    expect(onMonthChange).not.toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
    expect(onEventClick).not.toHaveBeenCalled();
  });

  it("uses custom labels", () => {
    render({
      value: "2024-02-29",
      locale: "zh-CN",
      weekdayLabels: ["一", "二", "三", "四", "五", "六", "日"],
      getDayLabel: (d, n) => `${d}#${n}`,
      getEventsLabel: (d) => `${d} list`,
      ariaLabel: "Schedule",
      previousMonthLabel: "Prev",
      nextMonthLabel: "Next",
      todayLabel: "Now",
    });
    expect(
      screen.getByRole("region", { name: "Schedule" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Prev" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Now" })).toBeInTheDocument();
    expect(screen.getByRole("grid", { name: "2024年2月" })).toBeInTheDocument();
    expect(container.querySelector('[role="columnheader"]')!.textContent).toBe(
      "一",
    );
    expect(day("2024-02-29")).toHaveAttribute("aria-label", "2024-02-29#1");
    expect(
      screen.getByRole("region", { name: "2024-02-29 list" }),
    ).toBeInTheDocument();
  });

  it("follows the library language (zh)", async () => {
    await act(() => i18n.changeLanguage("zh"));
    try {
      render({ value: "2024-02-29" });
      expect(screen.getByRole("region", { name: "月历" })).toBeInTheDocument();
      expect(
        screen.getByRole("grid", { name: "2024年2月" }),
      ).toBeInTheDocument();
      expect(
        container.querySelector('[role="columnheader"]')!.textContent,
      ).toBe("一");
      expect(button("上个月")).not.toBeNull();
      expect(button("下个月")).not.toBeNull();
      expect(day("2024-02-29")).toHaveAttribute(
        "aria-label",
        "2024-02-29，1 项日程",
      );
      expect(
        screen.getByRole("region", { name: "2024-02-29 日程" }),
      ).toBeInTheDocument();
    } finally {
      await act(() => i18n.changeLanguage("en"));
    }
  });
});
