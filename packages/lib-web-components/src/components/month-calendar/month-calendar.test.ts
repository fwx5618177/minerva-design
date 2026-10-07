import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import {
  MinervaMonthCalendar,
  type MonthCalendarEvent,
} from "./month-calendar";
import "../../elements/month-calendar";
import "../../elements/config";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
  resetDevWarnings();
});

const EVENTS: MonthCalendarEvent[] = [
  { id: "1", date: "2024-02-29", title: "Leap day party" },
  { id: "2", date: "2024-03-01", title: "Standup" },
  { id: "3", date: "2024-03-01", title: "Review" },
];

async function setup(attrs = `month="2024-02" value="2024-02-14"`) {
  const el = await mount<MinervaMonthCalendar>(
    `<minerva-month-calendar ${attrs}></minerva-month-calendar><button>After</button>`,
    "minerva-month-calendar",
  );
  return el;
}

const day = (el: Element, key: string) => $(el, `[data-date="${key}"]`);
const focused = (el: Element) =>
  el.shadowRoot!.activeElement as HTMLElement | null;
const buttons = (el: Element) =>
  Array.from(el.shadowRoot!.querySelectorAll<HTMLButtonElement>("button"));

describe("<minerva-month-calendar>", () => {
  it("registers", () => {
    expect(customElements.get("minerva-month-calendar")).toBe(
      MinervaMonthCalendar,
    );
  });

  it.each([
    ["2024-02", "2024-01-29", "2024-03-10"],
    ["2025-12", "2025-12-01", "2026-01-11"],
    ["2026-02", "2026-01-26", "2026-03-08"],
  ])("renders six Monday-first weeks for %s", async (month, first, last) => {
    const el = await setup(`month="${month}"`);
    const days = el.shadowRoot!.querySelectorAll("[data-date]");
    expect(days).toHaveLength(42);
    expect(days[0].getAttribute("data-date")).toBe(first);
    expect(days[41].getAttribute("data-date")).toBe(last);
    const headers = el.shadowRoot!.querySelectorAll('[role="columnheader"]');
    expect(headers).toHaveLength(7);
    expect(headers[0].textContent?.trim()).toBe("Mon");
    expect(
      el.shadowRoot!.querySelectorAll('[data-date][tabindex="0"]'),
    ).toHaveLength(1);
  });

  it("renders lib-core's structure, a localized heading and event counts", async () => {
    const el = await setup(`month="2024-02"`);
    el.events = EVENTS;
    await el.updateComplete;
    const root = $(el, "section.monthCalendar");
    expect(root).toHaveAttribute("aria-label", "Month calendar");
    expect($(el, ".toolbar .navigation")).not.toBeNull();
    expect($(el, "#heading").textContent?.trim()).toBe("February 2024");
    expect($(el, "[role=grid]")).toHaveAttribute("aria-labelledby", "heading");
    expect(el.shadowRoot!.querySelectorAll("[role=row]")).toHaveLength(7);
    expect(day(el, "2024-02-29")).toHaveClass("day");
    expect(day(el, "2024-02-29")).toHaveAttribute(
      "aria-label",
      "2024-02-29, 1 event",
    );
    expect(day(el, "2024-03-01")).toHaveAttribute(
      "aria-label",
      "2024-03-01, 2 events",
    );
    expect(day(el, "2024-03-01")).toHaveAttribute("data-outside", "true");
    expect(day(el, "2024-02-28")).toHaveAttribute("aria-label", "2024-02-28");
    expect(day(el, "2024-02-28")).not.toHaveAttribute("data-outside");
    expect(day(el, "2024-02-29").querySelector(".count")!.textContent).toBe(
      "1",
    );
  });

  it("caps the count at 99+", async () => {
    const el = await setup(`month="2024-02"`);
    el.events = Array.from({ length: 120 }, (_, i) => ({
      id: String(i),
      date: "2024-02-10",
      title: `E${i}`,
    }));
    await el.updateComplete;
    expect(day(el, "2024-02-10").querySelector(".count")!.textContent).toBe(
      "99+",
    );
  });

  it("navigates months with the toolbar and fires minerva-month-change", async () => {
    const el = await setup(`month="2025-12"`);
    const onMonth = vi.fn();
    el.addEventListener("minerva-month-change", onMonth);
    const [previous, , next] = buttons(el);
    expect(previous).toHaveAttribute("aria-label", "Previous month");
    expect(next).toHaveAttribute("aria-label", "Next month");
    await userEvent.click(next);
    expect(onMonth.mock.calls[0][0].detail.month).toEqual(new Date(2026, 0, 1));
    expect(el.getAttribute("month")).toBe("2026-01");
    await el.updateComplete;
    expect($(el, "#heading").textContent?.trim()).toBe("January 2026");
    await userEvent.click(buttons(el)[0]);
    await userEvent.click(buttons(el)[0]);
    expect(el.month).toEqual(new Date(2025, 10, 1));
  });

  it("returns to the current month with Today", async () => {
    const el = await setup(`month="2020-01" value="2020-01-05"`);
    await userEvent.click(buttons(el)[1]);
    const now = new Date();
    expect(el.month).toEqual(new Date(now.getFullYear(), now.getMonth(), 1));
    expect(el.value).toBe("2020-01-05");
  });

  it("defaults to the current month", async () => {
    const el = await setup(``);
    const now = new Date();
    const heading = new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "long",
    }).format(now);
    expect($(el, "#heading").textContent?.trim()).toBe(heading);
  });

  it("selects a day with a click, also requesting another month", async () => {
    const el = await setup(`month="2024-02"`);
    const onChange = vi.fn();
    const onMonth = vi.fn();
    el.addEventListener("minerva-change", onChange);
    el.addEventListener("minerva-month-change", onMonth);
    await userEvent.click(day(el, "2024-03-02"));
    expect(onChange.mock.calls[0][0].detail).toEqual({ value: "2024-03-02" });
    expect(el.value).toBe("2024-03-02");
    expect(onMonth.mock.calls[0][0].detail.month).toEqual(new Date(2024, 2, 1));
  });

  it("lists the selected day's events, clickable with clickable-events", async () => {
    const el = await setup(`month="2024-03" value="2024-03-01"`);
    el.events = EVENTS;
    await el.updateComplete;
    const section = $(el, "section.events");
    expect(section).toHaveAttribute("aria-label", "Events on 2024-03-01");
    expect($(el, ".eventsHeading").textContent).toBe("2024-03-01");
    expect(el.shadowRoot!.querySelectorAll(".eventItem")).toHaveLength(2);
    expect(el.shadowRoot!.querySelector(".eventButton")).toBeNull();
    el.clickableEvents = true;
    await el.updateComplete;
    const onEvent = vi.fn();
    el.addEventListener("minerva-event-click", onEvent);
    await userEvent.click($(el, ".eventButton"));
    expect(onEvent.mock.calls[0][0].detail.event).toEqual(EVENTS[1]);
    el.value = "2024-03-05";
    await el.updateComplete;
    expect($(el, ".empty").textContent?.trim()).toBe("No events");
    el.hideEvents = true;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("section.events")).toBeNull();
  });

  it("is a single tab stop on the selected day (APG date grid)", async () => {
    const el = await setup();
    expect(day(el, "2024-02-14")).toHaveAttribute("tabindex", "0");
    expect(day(el, "2024-02-14")).toHaveAttribute("aria-selected", "true");
    expect(day(el, "2024-02-15")).toHaveAttribute("aria-selected", "false");
    expect(day(el, "2024-02-15")).toHaveAttribute("tabindex", "-1");
    el.focus();
    expect(focused(el)).toBe(day(el, "2024-02-14"));
    expect(focused(el)).toHaveAttribute("role", "gridcell");
  });

  it("moves with arrows / Home / End / PageDown and selects with Enter and Space", async () => {
    const el = await setup();
    day(el, "2024-02-14").focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(focused(el)).toBe(day(el, "2024-02-15"));
    await userEvent.keyboard("{ArrowDown}");
    expect(focused(el)).toBe(day(el, "2024-02-22"));
    await userEvent.keyboard("{Home}");
    expect(focused(el)).toBe(day(el, "2024-02-19"));
    await userEvent.keyboard("{End}");
    expect(focused(el)).toBe(day(el, "2024-02-25"));
    await userEvent.keyboard("{Enter}");
    await el.updateComplete;
    expect(day(el, "2024-02-25")).toHaveAttribute("aria-selected", "true");
    expect(day(el, "2024-02-14")).toHaveAttribute("aria-selected", "false");
    // the roving tab stop follows focus
    expect(day(el, "2024-02-25")).toHaveAttribute("tabindex", "0");
    expect(day(el, "2024-02-14")).toHaveAttribute("tabindex", "-1");
    await userEvent.keyboard("{PageDown}");
    await el.updateComplete;
    expect(focused(el)).toBe(day(el, "2024-03-25"));
    expect($(el, "#heading").textContent?.trim()).toBe("March 2024");
    await userEvent.keyboard("{ArrowUp} ");
    await el.updateComplete;
    expect(day(el, "2024-03-18")).toHaveAttribute("aria-selected", "true");
  });

  it("moves across years, clamps PageDown and handles Shift+PageDown", async () => {
    const el = await setup(`month="2023-12" value="2023-12-31"`);
    day(el, "2023-12-31").focus();
    await userEvent.keyboard("{ArrowRight}");
    await el.updateComplete;
    expect(focused(el)).toBe(day(el, "2024-01-01"));
    day(el, "2024-01-31").focus();
    await userEvent.keyboard("{PageDown}");
    await el.updateComplete;
    expect(focused(el)).toBe(day(el, "2024-02-29"));
    await userEvent.keyboard("{PageUp}");
    await el.updateComplete;
    expect(focused(el)).toBe(day(el, "2024-01-29"));
    await userEvent.keyboard("{Shift>}{PageDown}{/Shift}");
    await el.updateComplete;
    expect(focused(el)).toBe(day(el, "2025-01-29"));
  });

  it("swaps left / right in RTL", async () => {
    const el = await mount<MinervaMonthCalendar>(
      `<div dir="rtl"><minerva-month-calendar month="2024-02" value="2024-02-14"></minerva-month-calendar></div>`,
      "minerva-month-calendar",
    );
    day(el, "2024-02-14").focus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(focused(el)).toBe(day(el, "2024-02-15"));
    await userEvent.keyboard("{ArrowRight}");
    expect(focused(el)).toBe(day(el, "2024-02-14"));
  });

  it("ignores repeated Enter and unrelated keys", async () => {
    const el = await setup(`month="2024-02"`);
    const onChange = vi.fn();
    el.addEventListener("minerva-change", onChange);
    day(el, "2024-02-10").dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Enter",
        repeat: true,
        bubbles: true,
      }),
    );
    day(el, "2024-02-10").dispatchEvent(
      new KeyboardEvent("keydown", { key: "a", bubbles: true }),
    );
    expect(onChange).not.toHaveBeenCalled();
  });

  it("blocks navigation, selection and event clicks when disabled", async () => {
    const el = await setup(
      `month="2024-02" value="2024-02-29" disabled clickable-events`,
    );
    el.events = EVENTS;
    await el.updateComplete;
    const onAny = vi.fn();
    for (const name of [
      "minerva-change",
      "minerva-month-change",
      "minerva-event-click",
    ]) {
      el.addEventListener(name, onAny);
    }
    for (const button of buttons(el)) {
      expect(button.disabled).toBe(true);
      button.click();
    }
    expect($(el, "[role=grid]")).toHaveAttribute("aria-disabled", "true");
    for (const cell of el.shadowRoot!.querySelectorAll("[data-date]")) {
      expect(cell).toHaveAttribute("aria-disabled", "true");
      expect(cell).toHaveAttribute("tabindex", "-1");
    }
    day(el, "2024-03-01").click();
    day(el, "2024-02-29").dispatchEvent(
      new KeyboardEvent("keydown", { key: "Enter", bubbles: true }),
    );
    expect(onAny).not.toHaveBeenCalled();
  });

  it("uses custom labels and callbacks", async () => {
    const el = await setup(
      `month="2024-02" value="2024-02-29" today-label="Now" previous-month-label="Back" next-month-label="Forward" empty-events-text="Free" locale="fr-FR"`,
    );
    el.weekdayLabels = ["L", "M", "M", "J", "V", "S", "D"];
    el.getDayLabel = (d, n) => `${d}:${n}`;
    el.getEventsLabel = (d) => `On ${d}`;
    await el.updateComplete;
    const [previous, today, next] = buttons(el);
    expect(previous).toHaveAttribute("aria-label", "Back");
    expect(next).toHaveAttribute("aria-label", "Forward");
    expect(today.textContent).toContain("Now");
    expect(
      el
        .shadowRoot!.querySelector('[role="columnheader"]')!
        .textContent?.trim(),
    ).toBe("L");
    expect(day(el, "2024-02-29")).toHaveAttribute("aria-label", "2024-02-29:0");
    expect($(el, "section.events")).toHaveAttribute(
      "aria-label",
      "On 2024-02-29",
    );
    expect($(el, ".empty").textContent?.trim()).toBe("Free");
    expect($(el, "#heading").textContent?.trim().toLowerCase()).toContain(
      "février",
    );
  });

  it("follows the library language", async () => {
    const el = await mount<MinervaMonthCalendar>(
      `<minerva-config locale="zh"><minerva-month-calendar month="2024-02"></minerva-month-calendar></minerva-config>`,
      "minerva-month-calendar",
    );
    expect($(el, "section.monthCalendar").getAttribute("aria-label")).not.toBe(
      "Month calendar",
    );
    expect($(el, "#heading").textContent).toContain("2024");
    expect($(el, "#heading").textContent).toContain("2");
  });

  it("warns about a malformed value", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    await setup(`month="2024-02" value="2024/02/03"`);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("YYYY-MM-DD"));
  });
});
