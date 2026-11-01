import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MinervaWeekStrip } from "./week-strip";
import "../../elements/week-strip";
import { resetDevWarnings } from "../../internal/dev";
import { customStates } from "../../internal/styling-hooks";
import { $, mount } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

async function setup(attrs = `today="2026-01-07" value="2026-01-06"`) {
  return mount<MinervaWeekStrip>(
    `<minerva-week-strip ${attrs}></minerva-week-strip><button>After</button>`,
    "minerva-week-strip",
  );
}

const days = (el: Element) =>
  Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('[role="option"]'));
const day = (el: Element, key: string) => $(el, `[data-date="${key}"]`);
const keys = (el: Element) => days(el).map((cell) => cell.dataset.date);
const focused = (el: Element) =>
  el.shadowRoot!.activeElement as HTMLElement | null;

describe("<minerva-week-strip>", () => {
  it("registers", () => {
    expect(customElements.get("minerva-week-strip")).toBe(MinervaWeekStrip);
  });

  it("renders the Monday-first week of the value as a listbox", async () => {
    const el = await setup();
    const list = $(el, '[role="listbox"]');
    expect(list.getAttribute("aria-label")).toBe("Week");
    expect(list.getAttribute("aria-orientation")).toBe("horizontal");
    expect(keys(el)).toEqual([
      "2026-01-05",
      "2026-01-06",
      "2026-01-07",
      "2026-01-08",
      "2026-01-09",
      "2026-01-10",
      "2026-01-11",
    ]);
    expect(days(el)[0].querySelector(".weekday")!.textContent).toBe("Mon");
    expect(day(el, "2026-01-06").getAttribute("aria-selected")).toBe("true");
    expect(day(el, "2026-01-05").getAttribute("aria-selected")).toBe("false");
    expect(day(el, "2026-01-07").getAttribute("aria-current")).toBe("date");
    expect(day(el, "2026-01-06").hasAttribute("aria-current")).toBe(false);
    expect(day(el, "2026-01-06").getAttribute("aria-label")).toBe(
      "Tuesday, January 6, 2026",
    );
    // one tab stop: the selected day
    expect(
      days(el).filter((cell) => cell.getAttribute("tabindex") === "0"),
    ).toEqual([day(el, "2026-01-06")]);
  });

  it("starts the week on first-day-of-week", async () => {
    const el = await setup(`today="2026-01-07" first-day-of-week="0"`);
    expect(keys(el)[0]).toBe("2026-01-04");
    expect(days(el)[0].querySelector(".weekday")!.textContent).toBe("Sun");
  });

  it("selects a day on click and fires minerva-change", async () => {
    const el = await setup();
    const onChange = vi.fn();
    el.addEventListener("minerva-change", (event) =>
      onChange((event as CustomEvent).detail),
    );
    day(el, "2026-01-09").click();
    await el.updateComplete;
    expect(onChange).toHaveBeenCalledWith({ value: "2026-01-09" });
    expect(el.value).toBe("2026-01-09");
    expect(day(el, "2026-01-09").getAttribute("aria-selected")).toBe("true");
    expect([...customStates(el)]).not.toContain("disabled");
  });

  it("shows count badges and dots and labels them", async () => {
    const el = await setup();
    el.markers = { "2026-01-05": 3, "2026-01-06": true, "2026-01-08": 120 };
    await el.updateComplete;
    const marker = (key: string) => day(el, key).querySelector(".marker")!;
    expect(marker("2026-01-05").className).toContain("count");
    expect(marker("2026-01-05").textContent).toBe("3");
    expect(marker("2026-01-08").textContent).toBe("99+");
    expect(marker("2026-01-06").className).toContain("dot");
    expect(marker("2026-01-07").className).toBe("marker");
    expect(day(el, "2026-01-05").getAttribute("aria-label")).toBe(
      "Monday, January 5, 2026, 3 items",
    );
    expect(day(el, "2026-01-06").getAttribute("aria-label")).toBe(
      "Tuesday, January 6, 2026, marked",
    );
    el.getDayLabel = (key, item) => `${key}:${String(item)}`;
    await el.updateComplete;
    expect(day(el, "2026-01-05").getAttribute("aria-label")).toBe(
      "2026-01-05:3",
    );
  });

  it("moves by keyboard across weeks and fires minerva-week-change", async () => {
    const user = userEvent.setup();
    const el = await setup();
    const onWeek = vi.fn();
    el.addEventListener("minerva-week-change", (event) =>
      onWeek((event as CustomEvent).detail.week),
    );
    day(el, "2026-01-06").focus();
    await user.keyboard("{End}");
    await el.updateComplete;
    expect(focused(el)?.dataset.date).toBe("2026-01-11");
    await user.keyboard("{ArrowRight}");
    await el.updateComplete;
    await el.updateComplete;
    expect(focused(el)?.dataset.date).toBe("2026-01-12");
    expect(onWeek).toHaveBeenCalledTimes(1);
    expect(onWeek.mock.calls[0][0]).toEqual(new Date(2026, 0, 12));
    expect(el.getAttribute("week")).toBe("2026-01-12");
    await user.keyboard("{Home}");
    expect(focused(el)?.dataset.date).toBe("2026-01-12");
    await user.keyboard("{PageUp}");
    await el.updateComplete;
    await el.updateComplete;
    expect(focused(el)?.dataset.date).toBe("2026-01-05");
    await user.keyboard("{Enter}");
    expect(el.value).toBe("2026-01-05");
  });

  it("navigates weeks with the buttons", async () => {
    const el = await setup(
      `today="2026-01-07" value="2026-01-28" show-navigation`,
    );
    const [previous, next] = Array.from(
      el.shadowRoot!.querySelectorAll<HTMLButtonElement>("button"),
    );
    expect(previous.getAttribute("aria-label")).toBe("Previous week");
    expect(next.getAttribute("aria-label")).toBe("Next week");
    expect($(el, ".heading").textContent?.trim()).toBe(
      "January – February 2026",
    );
    previous.click();
    await el.updateComplete;
    expect(keys(el)[0]).toBe("2026-01-19");
    expect($(el, ".heading").textContent?.trim()).toBe("January 2026");
    // the selection stays
    expect(el.value).toBe("2026-01-28");
  });

  it("displays the week of a value set from outside", async () => {
    const el = await setup();
    el.value = "2026-03-04";
    await el.updateComplete;
    expect(keys(el)[0]).toBe("2026-03-02");
  });

  it("blocks selection and navigation when disabled", async () => {
    const el = await setup(
      `today="2026-01-07" value="2026-01-06" show-navigation disabled`,
    );
    const onChange = vi.fn();
    el.addEventListener("minerva-change", onChange);
    day(el, "2026-01-09").click();
    expect(onChange).not.toHaveBeenCalled();
    expect(days(el).every((cell) => cell.tabIndex === -1)).toBe(true);
    expect(
      days(el).every((cell) => cell.getAttribute("aria-disabled") === "true"),
    ).toBe(true);
    expect(
      Array.from(el.shadowRoot!.querySelectorAll("button")).every(
        (button) => button.disabled,
      ),
    ).toBe(true);
    expect([...customStates(el)]).toContain("disabled");
  });

  it("takes custom labels", async () => {
    const el = await setup(
      `today="2026-01-07" aria-label="Plan" show-navigation previous-week-label="Back" next-week-label="Forward"`,
    );
    el.weekdayLabels = ["一", "二", "三", "四", "五", "六", "日"];
    await el.updateComplete;
    expect($(el, '[role="listbox"]').getAttribute("aria-label")).toBe("Plan");
    expect(days(el)[0].querySelector(".weekday")!.textContent).toBe("一");
    const [previous, next] = el.shadowRoot!.querySelectorAll("button");
    expect(previous.getAttribute("aria-label")).toBe("Back");
    expect(next.getAttribute("aria-label")).toBe("Forward");
  });

  it("warns about a malformed value", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await setup(`today="2026-01-07" value="2026/01/06"`);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('value "2026/01/06" is not a "YYYY-MM-DD" day'),
    );
  });
});
