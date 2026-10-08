import { defineComponent, h, nextTick, ref } from "vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { setLanguage } from "../../config/i18n";
import { MonthCalendar, type MonthCalendarEvent } from ".";

const events: MonthCalendarEvent[] = [
  { id: "a", date: "2024-02-29", title: "Release" },
  { id: "b", date: "2024-03-01", title: "Review" },
  { id: "c", date: "2024-03-01", title: "Retro" },
];

afterEach(() => {
  vi.useRealTimers();
});

type Props = Record<string, unknown>;
const renderCalendar = (props: Props = {}, attrs: Props = {}) =>
  render(MonthCalendar, {
    props: { month: new Date(2024, 1, 29), events, ...props } as never,
    attrs,
  });

const button = (label: string) =>
  document.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`)!;
const day = (key: string) =>
  document.querySelector<HTMLElement>(`[data-date="${key}"]`)!;
const key = (
  element: HTMLElement,
  value: string,
  init: KeyboardEventInit = {},
) => fireEvent.keyDown(element, { key: value, ...init });

/** Month and selection both controlled with v-model */
const Controlled = defineComponent({
  props: { initialMonth: Date, initialValue: String },
  setup(props) {
    const month = ref(props.initialMonth);
    const value = ref(props.initialValue);
    return () =>
      h(MonthCalendar, {
        month: month.value,
        "onUpdate:month": (next: Date) => (month.value = next),
        modelValue: value.value,
        "onUpdate:modelValue": (next: string) => (value.value = next),
      });
  },
});

describe("MonthCalendar", () => {
  it.each([
    [new Date(2024, 1, 29), "2024-01-29", "2024-03-10"],
    [new Date(2025, 11, 31), "2025-12-01", "2026-01-11"],
    [new Date(2026, 1, 1), "2026-01-26", "2026-03-08"],
  ])("renders six Monday-first weeks for %s", (month, first, last) => {
    const { container } = renderCalendar({ month });
    const days = container.querySelectorAll("[data-date]");
    expect(days).toHaveLength(42);
    expect(days[0].getAttribute("data-date")).toBe(first);
    expect(days[41].getAttribute("data-date")).toBe(last);
    expect(container.querySelectorAll('[role="columnheader"]')).toHaveLength(7);
    expect(
      container.querySelector('[role="columnheader"]')!.textContent!.trim(),
    ).toBe("Mon");
    expect(
      container.querySelectorAll('[data-date][tabindex="0"]'),
    ).toHaveLength(1);
  });

  it("renders the calendar structure, hooks, a localized heading and event counts", () => {
    renderCalendar({}, { class: "c", id: "cal" });
    const root = screen.getByRole("region", { name: "Month calendar" });
    expect(root.tagName).toBe("SECTION");
    expect(root).toHaveClass("monthCalendar", "c");
    expect(root).toHaveAttribute("id", "cal");
    expect(root).toHaveAttribute("data-minerva", "month-calendar");
    expect(root).toHaveAttribute("data-part", "root");
    expect(root).toHaveAttribute("data-size", "medium");
    expect(root).not.toHaveAttribute("data-disabled");
    expect(root.querySelector(".toolbar")).not.toBeNull();
    expect(root.querySelector(".navigation")).not.toBeNull();
    const grid = screen.getByRole("grid", { name: "February 2024" });
    expect(grid).toHaveClass("grid");
    expect(grid).toHaveAttribute("data-part", "grid");
    expect(grid).not.toHaveAttribute("aria-disabled");
    const heading = root.querySelector("h2")!;
    expect(heading).toHaveAttribute("aria-live", "polite");
    expect(heading).toHaveAttribute("data-part", "heading");
    expect(root.querySelectorAll('[data-part="nav-button"]')).toHaveLength(3);
    expect(screen.getAllByRole("row")).toHaveLength(7);
    expect(day("2024-02-29")).toHaveClass("day");
    expect(day("2024-02-29")).toHaveAttribute("data-part", "day");
    expect(day("2024-02-29")).toHaveAttribute(
      "aria-label",
      "2024-02-29, 1 event",
    );
    expect(day("2024-03-01")).toHaveAttribute(
      "aria-label",
      "2024-03-01, 2 events",
    );
    expect(day("2024-03-01")).toHaveAttribute("data-outside", "");
    expect(day("2024-02-28")).not.toHaveAttribute("data-outside");
    expect(day("2024-02-28")).toHaveAttribute("aria-label", "2024-02-28");
    expect(day("2024-02-29").querySelector(".count")).toHaveTextContent("1");
    // no selection: no events section
    expect(root.querySelector('[data-part="events"]')).toBeNull();
  });

  it("caps the count at 99+", () => {
    const many = Array.from({ length: 120 }, (_, i) => ({
      id: String(i),
      date: "2024-02-10",
      title: `E${i}`,
    }));
    renderCalendar({ events: many });
    expect(day("2024-02-10").querySelector(".count")).toHaveTextContent("99+");
  });

  it.each([
    [new Date(2025, 11, 31), "Next month", new Date(2026, 0, 1)],
    [new Date(2026, 0, 31), "Previous month", new Date(2025, 11, 1)],
    [new Date(2024, 0, 31), "Next month", new Date(2024, 1, 1)],
  ])(
    "navigates without overflowing a month or mutating the input",
    async (month, label, expected) => {
      const before = month.getTime();
      const wrapper = mount(MonthCalendar, { props: { month } });
      await wrapper.get(`button[aria-label="${label}"]`).trigger("click");
      expect(wrapper.emitted("monthChange")).toEqual([[expected]]);
      expect(wrapper.emitted("update:month")).toEqual([[expected]]);
      expect(month.getTime()).toBe(before);
    },
  );

  it("returns to the local current month without changing the controlled selection", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 1, 0, 15));
    const wrapper = mount(MonthCalendar, {
      props: { month: new Date(2024, 1, 29), events },
    });
    const today = wrapper
      .findAll("button")
      .find((b) => b.text().trim() === "Today")!;
    await today.trigger("click");
    expect(wrapper.emitted("monthChange")).toEqual([[new Date(2026, 0, 1)]]);
    expect(wrapper.emitted("change")).toBeUndefined();
    await wrapper.setProps({ month: new Date(2026, 0, 1) });
    const cell = wrapper.get('[data-date="2026-01-01"]');
    expect(cell.attributes("aria-current")).toBe("date");
    expect(cell.attributes("tabindex")).toBe("0");
  });

  it("keeps the selection controlled and lists only the selected day's events", async () => {
    const wrapper = mount(MonthCalendar, {
      props: {
        month: new Date(2024, 1, 29),
        events,
        modelValue: "2024-02-29",
        onEventClick: () => {},
      },
      attachTo: document.body,
    });
    await wrapper.get('[data-date="2024-03-01"]').trigger("click");
    expect(wrapper.emitted("update:modelValue")).toEqual([["2024-03-01"]]);
    expect(wrapper.emitted("change")).toEqual([["2024-03-01"]]);
    // still controlled
    expect(day("2024-02-29")).toHaveAttribute("aria-selected", "true");
    expect(day("2024-03-01")).toHaveAttribute("aria-selected", "false");
    expect(day("2024-02-29")).toHaveAttribute("role", "gridcell");
    expect(day("2024-02-29")).toHaveAttribute("data-selected", "");
    expect(day("2024-02-29").querySelector("button")).toBeNull();
    expect(document.querySelector("[aria-pressed]")).toBeNull();
    const list = screen.getByRole("region", { name: "Events on 2024-02-29" });
    expect(list).toHaveClass("events");
    expect(list).toHaveAttribute("data-part", "events");
    expect(list.textContent).toContain("Release");
    expect(list.textContent).not.toContain("Review");
    const release = screen.getByRole("button", { name: "Release" });
    expect(release).toHaveAttribute("data-part", "event");
    await fireEvent.click(release);
    expect(wrapper.emitted("eventClick")).toEqual([[events[0]]]);
    await wrapper.setProps({ showSelectedDayEvents: false });
    expect(
      screen.queryByRole("region", { name: "Events on 2024-02-29" }),
    ).toBeNull();
  });

  it("lists events as text without an event-click listener and shows an empty text", async () => {
    const { rerender } = renderCalendar({ modelValue: "2024-02-29" });
    expect(screen.queryByRole("button", { name: "Release" })).toBeNull();
    expect(screen.getByText("Release").tagName).toBe("SPAN");
    expect(screen.getByText("Release")).toHaveAttribute("data-part", "event");
    await rerender({ modelValue: "2024-02-12" });
    expect(screen.getByText("No events")).toHaveAttribute("data-part", "empty");
    await rerender({ modelValue: "2024-02-12", emptyEventsText: "Nothing" });
    expect(screen.getByText("Nothing")).toBeInTheDocument();
  });

  it("supports a once event-click listener", () => {
    render(MonthCalendar, {
      props: { month: new Date(2024, 1, 29), events, modelValue: "2024-02-29" },
      attrs: { onEventClickOnce: () => {} },
    });
    expect(screen.getByRole("button", { name: "Release" })).toBeInTheDocument();
  });

  it("selecting a day of another month also requests that month", async () => {
    const wrapper = mount(MonthCalendar, {
      props: { month: new Date(2024, 1, 29), events },
    });
    await wrapper.get('[data-date="2024-03-01"]').trigger("click");
    expect(wrapper.emitted("monthChange")).toEqual([[new Date(2024, 2, 1)]]);
  });

  it("works uncontrolled with defaultMonth / defaultValue", async () => {
    const wrapper = mount(MonthCalendar, {
      props: {
        defaultMonth: new Date(2024, 1, 10),
        defaultValue: "2024-02-10",
      },
      attachTo: document.body,
    });
    expect(
      screen.getByRole("grid", { name: "February 2024" }),
    ).toBeInTheDocument();
    expect(day("2024-02-10")).toHaveAttribute("tabindex", "0");
    await fireEvent.click(screen.getByRole("button", { name: "Next month" }));
    expect(
      screen.getByRole("grid", { name: "March 2024" }),
    ).toBeInTheDocument();
    await fireEvent.click(day("2024-03-05"));
    expect(wrapper.emitted("change")).toEqual([["2024-03-05"]]);
    expect(day("2024-03-05")).toHaveAttribute("aria-selected", "true");
    // the 1st is the tab stop of a month without selection nor today
    await fireEvent.click(screen.getByRole("button", { name: "Next month" }));
    expect(day("2024-04-01")).toHaveAttribute("tabindex", "0");
  });

  it("supports v-model on both the month and the selection", async () => {
    render(Controlled, {
      props: { initialMonth: new Date(2024, 1, 1), initialValue: undefined },
    });
    await fireEvent.click(day("2024-03-02"));
    expect(
      screen.getByRole("grid", { name: "March 2024" }),
    ).toBeInTheDocument();
    expect(day("2024-03-02")).toHaveAttribute("aria-selected", "true");
  });

  it("defaults to the current month", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2025, 4, 20, 12));
    render(MonthCalendar);
    expect(screen.getByRole("grid", { name: "May 2025" })).toBeInTheDocument();
    expect(day("2025-05-20")).toHaveAttribute("tabindex", "0");
    expect(day("2025-05-20")).toHaveAttribute("data-today", "");
  });

  it("moves keyboard focus across years and clamps PageDown to the last day of February", async () => {
    render(Controlled, {
      props: {
        initialMonth: new Date(2023, 11, 1),
        initialValue: "2023-12-31",
      },
      attachTo: document.body,
    } as never);
    day("2023-12-31").focus();
    await key(day("2023-12-31"), "ArrowRight");
    expect(document.activeElement).toBe(day("2024-01-01"));
    await key(day("2024-01-01"), "End");
    expect(document.activeElement).toBe(day("2024-01-07"));
    await key(day("2024-01-07"), "Home");
    expect(document.activeElement).toBe(day("2024-01-01"));
    day("2024-01-31").focus();
    await key(day("2024-01-31"), "PageDown");
    expect(document.activeElement).toBe(day("2024-02-29"));
    await key(day("2024-02-29"), "Enter");
    expect(day("2024-02-29").getAttribute("aria-selected")).toBe("true");
    await key(day("2024-02-29"), "ArrowDown");
    expect(document.activeElement).toBe(day("2024-03-07"));
    await key(day("2024-03-07"), " ");
    expect(day("2024-03-07").getAttribute("aria-selected")).toBe("true");
    await key(day("2024-03-07"), "PageUp");
    expect(document.activeElement).toBe(day("2024-02-07"));
    await key(day("2024-02-07"), "ArrowUp");
    expect(document.activeElement).toBe(day("2024-01-31"));
    await key(day("2024-01-31"), "ArrowLeft");
    expect(document.activeElement).toBe(day("2024-01-30"));
    await key(day("2024-01-30"), "PageDown", { shiftKey: true });
    expect(document.activeElement).toBe(day("2025-01-30"));
  });

  it("swaps ArrowLeft / ArrowRight in RTL", async () => {
    render(
      defineComponent({
        setup: () => () =>
          h("div", { dir: "rtl" }, [
            h(MonthCalendar, { defaultMonth: new Date(2024, 1, 1) }),
          ]),
      }),
      { attachTo: document.body } as never,
    );
    day("2024-02-14").focus();
    await key(day("2024-02-14"), "ArrowLeft");
    expect(document.activeElement).toBe(day("2024-02-15"));
    await key(day("2024-02-15"), "ArrowRight");
    expect(document.activeElement).toBe(day("2024-02-14"));
  });

  it("ignores repeated Enter and unrelated keys", async () => {
    const wrapper = mount(MonthCalendar, {
      props: { month: new Date(2024, 1, 29), events },
    });
    const cell = wrapper.get('[data-date="2024-02-10"]');
    await cell.trigger("keydown", { key: "Enter", repeat: true });
    await cell.trigger("keydown", { key: "a" });
    expect(wrapper.emitted("change")).toBeUndefined();
    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
  });

  it("blocks all navigation, selection and event callbacks when disabled", async () => {
    const wrapper = mount(MonthCalendar, {
      props: {
        month: new Date(2024, 1, 29),
        events,
        disabled: true,
        modelValue: "2024-02-29",
        onEventClick: () => {},
      },
      attachTo: document.body,
    });
    const root = wrapper.get("section");
    expect(root.attributes("data-disabled")).toBe("");
    for (const element of wrapper.findAll("button")) {
      expect((element.element as HTMLButtonElement).disabled).toBe(true);
      await element.trigger("click");
    }
    expect(wrapper.get('[role="grid"]').attributes("aria-disabled")).toBe(
      "true",
    );
    for (const cell of wrapper.findAll("[data-date]")) {
      expect(cell.attributes("aria-disabled")).toBe("true");
      expect(cell.attributes("data-disabled")).toBe("");
      expect(cell.attributes("tabindex")).toBe("-1");
    }
    await wrapper.get('[data-date="2024-03-01"]').trigger("click");
    await wrapper
      .get('[data-date="2024-02-29"]')
      .trigger("keydown", { key: "ArrowRight" });
    await wrapper
      .get('[data-date="2024-02-29"]')
      .trigger("keydown", { key: "Enter" });
    expect(wrapper.emitted("monthChange")).toBeUndefined();
    expect(wrapper.emitted("change")).toBeUndefined();
    expect(wrapper.emitted("eventClick")).toBeUndefined();
  });

  it("uses custom labels", () => {
    renderCalendar({
      modelValue: "2024-02-29",
      locale: "zh-CN",
      weekdayLabels: ["一", "二", "三", "四", "五", "六", "日"],
      getDayLabel: (d: string, n: number) => `${d}#${n}`,
      getEventsLabel: (d: string) => `${d} list`,
      "aria-label": "Schedule",
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
    expect(
      document.querySelector('[role="columnheader"]')!.textContent!.trim(),
    ).toBe("一");
    expect(day("2024-02-29")).toHaveAttribute("aria-label", "2024-02-29#1");
    expect(
      screen.getByRole("region", { name: "2024-02-29 list" }),
    ).toBeInTheDocument();
  });

  it("follows the library language (zh)", async () => {
    setLanguage("zh");
    try {
      renderCalendar({ modelValue: "2024-02-29" });
      expect(screen.getByRole("region", { name: "月历" })).toBeInTheDocument();
      expect(
        screen.getByRole("grid", { name: "2024年2月" }),
      ).toBeInTheDocument();
      expect(
        document.querySelector('[role="columnheader"]')!.textContent!.trim(),
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
      // reactive: switching back re-renders
      setLanguage("en");
      await nextTick();
      expect(button("Previous month")).not.toBeNull();
    } finally {
      setLanguage("en");
    }
  });

  it.each(["small", "medium", "large"] as const)(
    "applies the %s size (class and data-size hook)",
    (size) => {
      renderCalendar({ size });
      const root = screen.getByRole("region", { name: "Month calendar" });
      // (the stylesheet has no "medium" class: the default density)
      if (size !== "medium") expect(root).toHaveClass(size);
      expect(root).toHaveAttribute("data-size", size);
    },
  );

  it("highlights a range (either order) without changing the selection", () => {
    const wrapper = mount(MonthCalendar, {
      props: {
        month: new Date(2024, 1, 29),
        rangeStart: "2024-02-14",
        rangeEnd: "2024-02-12",
      },
    });
    const cls = (k: string) => wrapper.get(`[data-date="${k}"]`).classes();
    expect(cls("2024-02-11")).not.toContain("inRange");
    expect(cls("2024-02-12")).toEqual(
      expect.arrayContaining(["inRange", "rangeStart"]),
    );
    expect(cls("2024-02-12")).not.toContain("rangeEnd");
    expect(cls("2024-02-13")).toContain("inRange");
    expect(cls("2024-02-13")).not.toContain("rangeStart");
    expect(cls("2024-02-13")).not.toContain("rangeEnd");
    expect(cls("2024-02-14")).toEqual(
      expect.arrayContaining(["inRange", "rangeEnd"]),
    );
    expect(cls("2024-02-15")).not.toContain("inRange");
    expect(
      wrapper.get('[data-date="2024-02-13"]').attributes("aria-selected"),
    ).toBe("false");
    expect(wrapper.emitted("change")).toBeUndefined();
  });

  it("ignores an incomplete or malformed range", async () => {
    const { container, rerender } = renderCalendar({
      rangeStart: "2024-02-12",
    });
    expect(container.querySelector(".inRange")).toBeNull();
    await rerender({ rangeStart: "2024-02-12", rangeEnd: "soon" });
    expect(container.querySelector(".inRange")).toBeNull();
  });

  it("marks the day number and the days with events", () => {
    renderCalendar();
    expect(day("2024-02-29").querySelector(".dayNumber")).toHaveTextContent(
      "29",
    );
    expect(day("2024-02-29").querySelector(".count")).toHaveClass("hasEvents");
    expect(day("2024-02-28").querySelector(".count")).not.toHaveClass(
      "hasEvents",
    );
  });
});
