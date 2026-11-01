import { defineComponent, h, nextTick, ref } from "vue";
import { fireEvent, render } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { WeekStrip } from ".";

type Props = Record<string, unknown>;
const renderStrip = (props: Props = {}, attrs: Props = {}) =>
  render(WeekStrip, {
    props: { today: "2026-01-07", ...props } as never,
    attrs,
  });

const days = () =>
  Array.from(document.querySelectorAll<HTMLElement>('[role="option"]'));
const keys = () => days().map((cell) => cell.dataset.date);
const day = (key: string) =>
  document.querySelector<HTMLElement>(`[data-date="${key}"]`)!;
const button = (label: string) =>
  document.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`)!;

/** Selection and week both controlled with v-model */
const Controlled = defineComponent({
  props: { initialValue: String, initialWeek: Date },
  setup(props) {
    const value = ref(props.initialValue);
    const week = ref(props.initialWeek);
    return () =>
      h(WeekStrip, {
        today: "2026-01-07",
        showNavigation: true,
        modelValue: value.value,
        "onUpdate:modelValue": (next: string) => (value.value = next),
        week: week.value,
        "onUpdate:week": (next: Date) => (week.value = next),
      });
  },
});

describe("WeekStrip (Vue)", () => {
  it("renders the Monday-first week of the value as a listbox", () => {
    renderStrip({ defaultValue: "2026-01-06" });
    const list = document.querySelector('[role="listbox"]')!;
    expect(list.getAttribute("aria-label")).toBe("Week");
    expect(list.getAttribute("aria-orientation")).toBe("horizontal");
    expect(keys()).toEqual([
      "2026-01-05",
      "2026-01-06",
      "2026-01-07",
      "2026-01-08",
      "2026-01-09",
      "2026-01-10",
      "2026-01-11",
    ]);
    expect(days()[0]!.textContent).toContain("Mon");
    expect(day("2026-01-06").getAttribute("aria-selected")).toBe("true");
    expect(day("2026-01-07").getAttribute("aria-current")).toBe("date");
    expect(day("2026-01-06").getAttribute("aria-label")).toBe(
      "Tuesday, January 6, 2026",
    );
    expect(days().filter((cell) => cell.tabIndex === 0)).toEqual([
      day("2026-01-06"),
    ]);
  });

  it("starts the week on firstDayOfWeek", () => {
    renderStrip({ firstDayOfWeek: 0 });
    expect(keys()[0]).toBe("2026-01-04");
    expect(days()[0]!.textContent).toContain("Sun");
  });

  it("selects a day (v-model, change)", async () => {
    const { emitted } = renderStrip({ defaultValue: "2026-01-06" });
    await fireEvent.click(day("2026-01-09"));
    expect(emitted()["update:modelValue"]).toEqual([["2026-01-09"]]);
    expect(emitted().change).toEqual([["2026-01-09"]]);
    expect(day("2026-01-09").getAttribute("aria-selected")).toBe("true");
  });

  it("shows count badges and dots and labels them", () => {
    renderStrip({
      markers: { "2026-01-05": 3, "2026-01-06": true, "2026-01-08": 120 },
    });
    const marker = (key: string) =>
      day(key).querySelector<HTMLElement>('[data-part="indicator"]')!;
    expect(marker("2026-01-05").textContent).toBe("3");
    expect(marker("2026-01-08").textContent).toBe("99+");
    expect(marker("2026-01-06").textContent).toBe("");
    expect(day("2026-01-05").getAttribute("aria-label")).toBe(
      "Monday, January 5, 2026, 3 items",
    );
    expect(day("2026-01-06").getAttribute("aria-label")).toBe(
      "Tuesday, January 6, 2026, marked",
    );
  });

  it("uses getDayLabel and the label props", () => {
    renderStrip(
      {
        markers: { "2026-01-05": 2 },
        getDayLabel: (key: string, marker: unknown) => `${key}:${marker}`,
        showNavigation: true,
        previousWeekLabel: "Back",
        nextWeekLabel: "Forward",
        weekdayLabels: ["一", "二", "三", "四", "五", "六", "日"],
      },
      { "aria-label": "Plan" },
    );
    expect(day("2026-01-05").getAttribute("aria-label")).toBe("2026-01-05:2");
    expect(
      document.querySelector('[role="listbox"]')!.getAttribute("aria-label"),
    ).toBe("Plan");
    expect(button("Back")).not.toBeNull();
    expect(button("Forward")).not.toBeNull();
    expect(days()[0]!.textContent).toContain("一");
  });

  it("moves by keyboard across weeks (weekChange)", async () => {
    const { emitted } = renderStrip({ defaultValue: "2026-01-06" });
    day("2026-01-06").focus();
    await fireEvent.keyDown(day("2026-01-06"), { key: "End" });
    await nextTick();
    expect(document.activeElement).toBe(day("2026-01-11"));
    await fireEvent.keyDown(day("2026-01-11"), { key: "ArrowRight" });
    await nextTick();
    expect(keys()[0]).toBe("2026-01-12");
    expect(document.activeElement).toBe(day("2026-01-12"));
    expect(emitted().weekChange).toEqual([[new Date(2026, 0, 12)]]);
    await fireEvent.keyDown(day("2026-01-12"), { key: "PageUp" });
    await nextTick();
    expect(document.activeElement).toBe(day("2026-01-05"));
    await fireEvent.keyDown(day("2026-01-05"), { key: "Home" });
    await fireEvent.keyDown(day("2026-01-05"), { key: "Enter" });
    expect(emitted().change).toEqual([["2026-01-05"]]);
  });

  it("navigates weeks with the buttons (v-model:week)", async () => {
    render(Controlled, {
      props: { initialValue: "2026-01-28", initialWeek: new Date(2026, 0, 28) },
    });
    expect(document.querySelector('[data-part="heading"]')!.textContent).toBe(
      "January – February 2026",
    );
    await fireEvent.click(button("Previous week"));
    expect(keys()[0]).toBe("2026-01-19");
    expect(document.querySelector('[data-part="heading"]')!.textContent).toBe(
      "January 2026",
    );
    await fireEvent.click(button("Next week"));
    await fireEvent.click(button("Next week"));
    expect(keys()[0]).toBe("2026-02-02");
    expect(day("2026-02-02")).not.toBeNull();
  });

  it("follows a v-model set from outside while the week is uncontrolled", async () => {
    const value = ref("2026-01-06");
    render(
      defineComponent({
        setup: () => () =>
          h(WeekStrip, { today: "2026-01-07", modelValue: value.value }),
      }),
    );
    value.value = "2026-03-04";
    await nextTick();
    await nextTick();
    expect(keys()[0]).toBe("2026-03-02");
  });

  it("blocks selection and navigation when disabled", async () => {
    const onChange = vi.fn();
    renderStrip({
      defaultValue: "2026-01-06",
      showNavigation: true,
      disabled: true,
      onChange,
    });
    await fireEvent.click(day("2026-01-09"));
    expect(onChange).not.toHaveBeenCalled();
    expect(days().every((cell) => cell.tabIndex === -1)).toBe(true);
    expect(button("Previous week").disabled).toBe(true);
    expect(
      document
        .querySelector('[data-part="root"]')!
        .hasAttribute("data-disabled"),
    ).toBe(true);
  });
});
