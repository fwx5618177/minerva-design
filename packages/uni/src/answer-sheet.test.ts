import { mount } from "@vue/test-utils";
import { afterEach, expect, it, vi } from "vitest";
import AnswerSheet from "./AnswerSheet.vue";

afterEach(() => {
  vi.restoreAllMocks();
});

const items = [
  { key: "a1", status: "answered", group: "single" },
  { key: "a2", status: "correct", group: "single", flagged: true },
  { key: "a3", status: "wrong", group: "single" },
  { key: "b1", status: "skipped", group: "short" },
  { key: "b2", group: "short", disabled: true },
  { key: "x", label: "Intro" },
] as const;
const groups = [
  { key: "single", title: "Single choice" },
  { key: "short", title: "Short answer" },
];

const keys = (w: ReturnType<typeof mount>) =>
  w.findAll("[data-key]").map((pill) => pill.attributes("data-key"));

it("answer sheet renders numbered pills by section with statuses", () => {
  const w = mount(AnswerSheet, { props: { items, groups } });
  const nav = w.find('[role="navigation"]');
  expect(nav.attributes("aria-label")).toBe("Questions");
  expect(nav.attributes("data-minerva")).toBe("answer-sheet");
  expect(keys(w)).toEqual(["x", "a1", "a2", "a3", "b1", "b2"]);
  expect(w.findAll("[data-key]").map((pill) => pill.text())).toEqual([
    "Intro",
    "2",
    "3",
    "4",
    "5",
    "6",
  ]);
  const pill = (key: string) => w.find(`[data-key="${key}"]`);
  const group = w.find('[role="group"]');
  expect(w.find(`#${group.attributes("aria-labelledby")}`).text()).toBe(
    "Single choice",
  );
  expect(pill("a1").attributes("aria-label")).toBe("Question 2, answered");
  expect(pill("a2").attributes("aria-label")).toBe(
    "Question 3, correct, flagged",
  );
  expect(pill("a2").classes()).toEqual(
    expect.arrayContaining(["mn-status-correct", "mn-flagged"]),
  );
  expect(pill("a2").find(".mn-answer-sheet__flag").exists()).toBe(true);
  expect(pill("b2").attributes("aria-disabled")).toBe("true");
  expect(pill("x").attributes("tabindex")).toBe("0");
});

it("answer sheet selects, moves with keys and blocks disabled pills", async () => {
  const w = mount(AnswerSheet, {
    props: { items, groups, defaultValue: "a1" },
  });
  const pill = (key: string) => w.find(`[data-key="${key}"]`);
  expect(pill("a1").attributes("aria-current")).toBe("step");
  await pill("a3").trigger("click");
  expect(w.emitted("change")).toEqual([["a3"]]);
  expect(w.emitted("update:modelValue")).toEqual([["a3"]]);
  expect(pill("a3").classes()).toContain("mn-current");
  await pill("b2").trigger("click");
  expect(w.emitted("change")).toHaveLength(1);
  await pill("a3").trigger("keydown", { key: "End" });
  expect(pill("b2").attributes("tabindex")).toBe("0");
  await pill("b2").trigger("keydown", { key: "Home" });
  await pill("x").trigger("keydown", { key: "ArrowRight" });
  expect(pill("a1").attributes("tabindex")).toBe("0");
  await pill("a1").trigger("keydown", { key: "Enter" });
  expect(w.emitted("change")?.[1]).toEqual(["a1"]);
});

it("answer sheet columns, summary, legend, controlled value and disabled", async () => {
  const many = Array.from({ length: 7 }, (_, i) => ({ key: `q${i + 1}` }));
  const w = mount(AnswerSheet, {
    props: { items: many, columns: 3, value: "q1", size: "small" },
  });
  const grid = w.find(".mn-answer-sheet__grid");
  expect(grid.classes()).toContain("mn-columns");
  expect(grid.attributes("style")).toContain("repeat(3, minmax(0, 1fr))");
  await w.find('[data-key="q2"]').trigger("keydown", { key: "ArrowDown" });
  expect(w.find('[data-key="q5"]').attributes("tabindex")).toBe("0");
  await w.find('[data-key="q4"]').trigger("click");
  expect(w.emitted("change")).toEqual([["q4"]]);
  // controlled: the parent decides
  expect(w.find('[data-key="q1"]').attributes("aria-current")).toBe("step");

  await w.setProps({
    items,
    columns: undefined,
    showSummary: true,
    showLegend: true,
    disabled: true,
    layout: "scroll",
    ariaLabel: "Exam",
    getItemLabel: (item: { key: string }, index: number) =>
      `${item.key}#${index}`,
  });
  const nav = w.find('[role="navigation"]');
  expect(nav.attributes("aria-label")).toBe("Exam");
  expect(nav.classes()).toEqual(
    expect.arrayContaining(["mn-size-small", "mn-layout-scroll"]),
  );
  expect(w.find(".mn-answer-sheet__summary").text()).toBe("3 / 6 answered");
  expect(w.findAll('[role="listitem"]').map((li) => li.text())).toEqual([
    "Unanswered",
    "Answered",
    "Correct",
    "Wrong",
    "Skipped",
    "Flagged",
  ]);
  expect(w.find('[data-key="a1"]').attributes("aria-label")).toBe("a1#0");
  await w.find('[data-key="a1"]').trigger("click");
  expect(w.emitted("change")).toHaveLength(1);
});

it("answer sheet centers the current pill with the row's scroll-left", async () => {
  // a 200px row of 32px pills every 40px (800px of content)
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
    function (this: HTMLElement) {
      const pill = /-q-(\d+)$/.exec(this.id);
      const [left, width] = pill
        ? [Number(pill[1]) * 40, 32]
        : this.id.includes("-grid-")
          ? [0, 800]
          : [0, 200];
      return { left, width, right: left + width } as DOMRect;
    },
  );
  const many = Array.from({ length: 20 }, (_, i) => ({ key: `q${i + 1}` }));
  const w = mount(AnswerSheet, {
    props: { items: many, value: "q16", layout: "scroll" },
  });
  const settle = async () => {
    await w.vm.$nextTick();
    await w.vm.$nextTick();
  };
  await settle();
  const row = w.find(".mn-answer-sheet__scroller");
  expect(row.find('[data-part="grid"]').find('[data-key="q1"]').exists()).toBe(
    true,
  );
  // pill 16 at 600..632: centered
  expect(row.attributes("scroll-left")).toBe("516");
  await w.setProps({ value: "q2" });
  await settle();
  expect(row.attributes("scroll-left")).toBe("0");
  await w.setProps({ value: "q20" });
  await settle();
  expect(row.attributes("scroll-left")).toBe("600");
  // the user scrolled back: the same target applies again
  await row.trigger("scroll", { detail: { scrollLeft: 100 } });
  await w.setProps({ value: "q19" });
  await settle();
  expect(Number(row.attributes("scroll-left"))).toBeCloseTo(600, 1);
  expect(row.attributes("scroll-left")).not.toBe("600");
  // wrapping rows don't use a scroll-view
  await w.setProps({ layout: "wrap" });
  expect(w.find(".mn-answer-sheet__scroller").exists()).toBe(false);
});
