import { mount } from "@vue/test-utils";
import { expect, it } from "vitest";
import WeekStrip from "./WeekStrip.vue";

const keys = (w: ReturnType<typeof mount>) =>
  w.findAll("[data-day]").map((day) => day.attributes("data-day"));

it("week strip renders the Monday-first week of the selection with today and markers", () => {
  const w = mount(WeekStrip, {
    props: {
      defaultValue: "2026-01-06",
      today: "2026-01-07",
      markers: { "2026-01-05": 3, "2026-01-08": true, "2026-01-09": 150 },
    },
  });
  expect(keys(w)).toEqual([
    "2026-01-05",
    "2026-01-06",
    "2026-01-07",
    "2026-01-08",
    "2026-01-09",
    "2026-01-10",
    "2026-01-11",
  ]);
  const day = (key: string) => w.find(`[data-day="${key}"]`);
  expect(w.find('[role="listbox"]').attributes("aria-label")).toBe("Week");
  expect(day("2026-01-05").text()).toContain("Mon");
  expect(day("2026-01-06").attributes("aria-selected")).toBe("true");
  expect(day("2026-01-06").classes()).toContain("mn-selected");
  expect(day("2026-01-07").attributes("aria-current")).toBe("date");
  expect(day("2026-01-07").classes()).toContain("mn-today");
  expect(day("2026-01-05").find(".mn-has-count").text()).toBe("3");
  expect(day("2026-01-09").find(".mn-has-count").text()).toBe("99+");
  expect(day("2026-01-08").find(".mn-has-dot").exists()).toBe(true);
  expect(day("2026-01-05").attributes("aria-label")).toBe(
    "Monday, January 5, 2026, 3 items",
  );
  expect(day("2026-01-08").attributes("aria-label")).toBe(
    "Thursday, January 8, 2026, marked",
  );
  expect(day("2026-01-06").attributes("tabindex")).toBe("0");
});

it("week strip selects days, navigates weeks and starts on firstDayOfWeek", async () => {
  const w = mount(WeekStrip, {
    props: { today: "2026-01-07", firstDayOfWeek: 0, showNavigation: true },
  });
  expect(keys(w)[0]).toBe("2026-01-04");
  expect(w.find('[data-day="2026-01-04"]').text()).toContain("Sun");
  expect(w.find(".mn-week-strip__title").text()).toBe("January 2026");
  await w.find('[data-day="2026-01-09"]').trigger("click");
  expect(w.emitted("change")).toEqual([["2026-01-09"]]);
  expect(w.emitted("update:modelValue")).toEqual([["2026-01-09"]]);
  await w.find('[aria-label="Next week"]').trigger("click");
  const week = w.emitted("weekChange")?.[0]?.[0] as Date;
  expect(week).toEqual(new Date(2026, 0, 11));
  expect(keys(w)[0]).toBe("2026-01-11");
  await w.find('[data-day="2026-01-11"]').trigger("keydown", { key: "End" });
  await w.find('[data-day="2026-01-17"]').trigger("keydown", {
    key: "ArrowRight",
  });
  expect(keys(w)[0]).toBe("2026-01-18");
  expect(w.find('[data-day="2026-01-18"]').attributes("tabindex")).toBe("0");
  await w.find('[data-day="2026-01-18"]').trigger("keydown", { key: "Enter" });
  expect(w.emitted("change")?.[1]).toEqual(["2026-01-18"]);
});

it("week strip controlled week and value, disabled blocks interaction", async () => {
  const w = mount(WeekStrip, {
    props: {
      today: "2026-01-07",
      value: "2026-01-06",
      week: "2026-01-28",
      showNavigation: true,
    },
  });
  expect(keys(w)[0]).toBe("2026-01-26");
  expect(w.find(".mn-week-strip__title").text()).toBe(
    "January 2026 – February 2026",
  );
  await w.find('[aria-label="Previous week"]').trigger("click");
  expect(w.emitted("update:week")).toHaveLength(1);
  // controlled: the parent decides
  expect(keys(w)[0]).toBe("2026-01-26");
  await w.setProps({ disabled: true });
  await w.find('[data-day="2026-01-27"]').trigger("click");
  await w.find('[aria-label="Previous week"]').trigger("click");
  expect(w.emitted("change")).toBeUndefined();
  expect(w.emitted("update:week")).toHaveLength(1);
  expect(w.find('[data-day="2026-01-27"]').classes()).toContain("mn-disabled");
});
