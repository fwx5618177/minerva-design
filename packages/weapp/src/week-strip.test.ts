import simulate from "miniprogram-simulate";
import { afterEach, expect, it } from "vitest";
import { weekStrip } from "./index";

const mounted: simulate.RootComponent<
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject
>[] = [];
afterEach(() => mounted.splice(0).forEach((w) => w.detach()));
function mount(props: Record<string, unknown>) {
  const id = simulate.load({
    tagName: "week-strip-case",
    template: weekStrip.template,
    ...weekStrip.definition,
  });
  const w = simulate.render(id, props);
  w.attach(document.createElement("div"));
  mounted.push(w);
  return w;
}
type Day = {
  date: string;
  selected: boolean;
  today: boolean;
  count: number;
  countLabel: string;
  dot: boolean;
  weekday: string;
  ariaLabel: string;
};
const tick = () => simulate.sleep(0);
const days = (w: ReturnType<typeof mount>) => w.data.days as Day[];
const day = (w: ReturnType<typeof mount>, date: string) =>
  w.querySelectorAll(".mn-week-strip__day")[
    days(w).findIndex((item) => item.date === date)
  ];

it("week strip shows the Monday-first week of the selection with today and markers", () => {
  const w = mount({
    defaultValue: "2026-01-06",
    today: "2026-01-07",
    markers: { "2026-01-05": 3, "2026-01-08": true, "2026-01-09": 150 },
  });
  expect(days(w).map((item) => item.date)).toEqual([
    "2026-01-05",
    "2026-01-06",
    "2026-01-07",
    "2026-01-08",
    "2026-01-09",
    "2026-01-10",
    "2026-01-11",
  ]);
  expect(days(w)[0]).toMatchObject({
    weekday: "Mon",
    count: 3,
    countLabel: "3",
    ariaLabel: "Monday, January 5, 2026, 3 items",
  });
  expect(days(w)[1]).toMatchObject({ selected: true, today: false });
  expect(days(w)[2]).toMatchObject({ today: true });
  expect(days(w)[3]).toMatchObject({
    dot: true,
    ariaLabel: "Thursday, January 8, 2026, marked",
  });
  expect(days(w)[4].countLabel).toBe("99+");
  expect(w.data.labels.list).toBe("Week");
  expect(day(w, "2026-01-06").dom!.className).toContain("mn-selected");
});

it("week strip selects days and navigates weeks (uncontrolled)", async () => {
  const w = mount({
    today: "2026-01-07",
    firstDayOfWeek: 0,
    showNavigation: true,
  });
  expect(days(w)[0]).toMatchObject({ date: "2026-01-04", weekday: "Sun" });
  expect(w.data.heading).toBe("January 2026");
  const changes: unknown[] = [],
    weeks: unknown[] = [];
  w.addEventListener("change", (e) => changes.push(e.detail));
  w.addEventListener("weekchange", (e) => weeks.push(e.detail));
  day(w, "2026-01-09").dispatchEvent("tap");
  await tick();
  expect(changes).toEqual([{ value: "2026-01-09" }]);
  expect(days(w)[5].selected).toBe(true);
  w.querySelectorAll(".mn-close")[1]!.dispatchEvent("tap");
  await tick();
  expect(weeks).toEqual([{ week: "2026-01-11" }]);
  expect(days(w)[0].date).toBe("2026-01-11");
  w.querySelectorAll(".mn-close")[1]!.dispatchEvent("tap");
  await tick();
  expect(days(w)[0].date).toBe("2026-01-18");
  // an uncontrolled week keeps the selection
  expect(changes).toHaveLength(1);
});

it("week strip keeps controlled props, follows an outside value and blocks disabled", async () => {
  const w = mount({
    today: "2026-01-07",
    value: "2026-01-06",
    showNavigation: true,
  });
  const changes: unknown[] = [],
    weeks: unknown[] = [];
  w.addEventListener("change", (e) => changes.push(e.detail));
  w.addEventListener("weekchange", (e) => weeks.push(e.detail));
  day(w, "2026-01-08").dispatchEvent("tap");
  await tick();
  expect(changes).toEqual([{ value: "2026-01-08" }]);
  expect(days(w)[1].selected).toBe(true);
  w.setData({ value: "2026-03-04" });
  await tick();
  expect(days(w)[0].date).toBe("2026-03-02");
  w.setData({ week: "2026-05-20" });
  await tick();
  expect(days(w)[0].date).toBe("2026-05-18");
  w.querySelectorAll(".mn-close")[0]!.dispatchEvent("tap");
  await tick();
  expect(weeks).toEqual([{ week: "2026-05-11" }]);
  expect(days(w)[0].date).toBe("2026-05-18");
  w.setData({ disabled: true });
  day(w, "2026-05-19").dispatchEvent("tap");
  w.querySelectorAll(".mn-close")[0]!.dispatchEvent("tap");
  await tick();
  expect(changes).toHaveLength(1);
  expect(weeks).toHaveLength(1);
});

it("week strip configure() customizes day labels", () => {
  const w = mount({ today: "2026-01-07", markers: { "2026-01-05": 2 } });
  (
    w.instance as unknown as {
      configure(config: {
        getDayLabel: (day: string, marker: unknown) => string;
      }): void;
    }
  ).configure({ getDayLabel: (key, marker) => `${key}:${String(marker)}` });
  expect(days(w)[0].ariaLabel).toBe("2026-01-05:2");
});
