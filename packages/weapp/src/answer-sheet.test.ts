import simulate from "miniprogram-simulate";
import { afterEach, expect, it, vi } from "vitest";
import { answerSheet } from "./index";

const mounted: simulate.RootComponent<
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject
>[] = [];
afterEach(() => {
  mounted.splice(0).forEach((w) => w.detach());
  vi.restoreAllMocks();
});
function mount(props: Record<string, unknown>) {
  const id = simulate.load({
    tagName: "answer-sheet-case",
    template: answerSheet.template,
    ...answerSheet.definition,
  });
  const w = simulate.render(id, props);
  w.attach(document.createElement("div"));
  mounted.push(w);
  return w;
}
type Pill = {
  key: string;
  label: string;
  status: string;
  current: boolean;
  flagged: boolean;
  disabled: boolean;
  ariaLabel: string;
};
type Section = { title: string; titleId: string; pills: Pill[] };
const tick = () => simulate.sleep(0);
const pills = (w: ReturnType<typeof mount>) =>
  (w.data.sections as Section[]).flatMap((section) => section.pills);
const pill = (w: ReturnType<typeof mount>, key: string) =>
  w.querySelectorAll(".mn-answer-sheet__item")[
    pills(w).findIndex((item) => item.key === key)
  ]!;

const items = [
  { key: "a1", status: "answered", group: "single" },
  { key: "a2", status: "correct", group: "single", flagged: true },
  { key: "a3", status: "wrong", group: "single" },
  { key: "b1", status: "skipped", group: "short" },
  { key: "b2", group: "short", disabled: true },
  { key: "x", label: "Intro" },
];
const groups = [
  { key: "single", title: "Single choice" },
  { key: "short", title: "Short answer" },
];

it("answer sheet lays out numbered pills by section with statuses", () => {
  const w = mount({ items, groups, defaultValue: "a1" });
  const sections = w.data.sections as Section[];
  expect(sections.map((section) => section.title)).toEqual([
    "",
    "Single choice",
    "Short answer",
  ]);
  expect(pills(w).map((item) => [item.key, item.label])).toEqual([
    ["x", "Intro"],
    ["a1", "2"],
    ["a2", "3"],
    ["a3", "4"],
    ["b1", "5"],
    ["b2", "6"],
  ]);
  expect(pills(w)[1]).toMatchObject({
    current: true,
    ariaLabel: "Question 2, answered",
  });
  expect(pills(w)[2]).toMatchObject({
    flagged: true,
    ariaLabel: "Question 3, correct, flagged",
  });
  expect(pills(w)[5]).toMatchObject({ disabled: true, status: "unanswered" });
  expect(w.data.labels.nav).toBe("Questions");
  const a1 = pill(w, "a1").dom!.className;
  expect(a1).toContain("mn-status-answered");
  expect(a1).toContain("mn-current");
  expect(w.querySelectorAll(".mn-answer-sheet__flag")).toHaveLength(1);
});

it("answer sheet selects by tap (uncontrolled) and blocks disabled pills", async () => {
  const w = mount({ items, groups });
  const changes: unknown[] = [];
  w.addEventListener("change", (e) => changes.push(e.detail));
  pill(w, "a3").dispatchEvent("tap");
  await tick();
  expect(changes).toEqual([{ value: "a3" }]);
  expect(pills(w).find((item) => item.key === "a3")?.current).toBe(true);
  pill(w, "b2").dispatchEvent("tap");
  await tick();
  expect(changes).toHaveLength(1);
  w.setData({ disabled: true });
  await tick();
  pill(w, "a1").dispatchEvent("tap");
  await tick();
  expect(changes).toHaveLength(1);
});

it("answer sheet keeps a controlled value, shows summary, legend and columns", async () => {
  const w = mount({
    items,
    value: "a1",
    showSummary: true,
    showLegend: true,
    columns: 3,
  });
  const changes: unknown[] = [];
  w.addEventListener("change", (e) => changes.push(e.detail));
  pill(w, "b1").dispatchEvent("tap");
  await tick();
  expect(changes).toEqual([{ value: "b1" }]);
  expect(pills(w).find((item) => item.current)?.key).toBe("a1");
  expect(w.data.summary).toBe("3 / 6 answered");
  expect(
    (w.data.legend as { label: string }[]).map((entry) => entry.label),
  ).toEqual([
    "Unanswered",
    "Answered",
    "Correct",
    "Wrong",
    "Skipped",
    "Flagged",
  ]);
  expect(w.data.gridStyle).toBe(
    "grid-template-columns: repeat(3, minmax(0, 1fr))",
  );
  w.setData({ layout: "scroll" });
  await tick();
  expect(w.data.gridStyle).toBe("");
});

it("answer sheet centres the current pill in a scroll row via scroll-left", async () => {
  const many = Array.from({ length: 20 }, (_, i) => ({ key: `q${i + 1}` }));
  const w = mount({ items: many, layout: "wrap", value: "q16" });
  expect(w.querySelector("#mn-answer-sheet-row-0")).toBeFalsy();
  // a 300px row over 20 × 36px pills (720px content) at x = 0
  const selectors: string[] = [];
  const query = {
    selector: "",
    select(selector: string) {
      selectors.push(selector);
      this.selector = selector;
      return this;
    },
    boundingClientRect(cb: (rect: object) => void) {
      const s = this.selector;
      if (s.includes("-row-")) cb({ left: 0, width: 300 });
      else if (s.includes("-grid-")) cb({ left: 0, width: 720 });
      else cb({ left: Number(s.split("-q-")[1]) * 36, width: 32 });
      return this;
    },
    exec() {},
  };
  vi.spyOn(w.instance, "createSelectorQuery").mockReturnValue(
    query as unknown as WechatMiniprogram.SelectorQuery,
  );
  w.setData({ layout: "scroll" });
  await tick();
  expect(w.querySelector("#mn-answer-sheet-row-0")).toBeTruthy();
  expect(selectors).toContain("#mn-answer-sheet-q-15");
  // q16 centre = 15 × 36 + 16 = 556 → 556 - 150
  expect(w.data.scroll).toEqual({ row: 0, left: 406 });
  w.setData({ value: "q1" });
  await tick();
  expect(w.data.scroll).toEqual({ row: 0, left: 0 });
  w.setData({ value: "q20" });
  await tick();
  expect(w.data.scroll).toEqual({ row: 0, left: 420 });
  // the user scrolled away; q19 also clamps to 420, which must re-apply
  const row = w.querySelector("#mn-answer-sheet-row-0")!;
  row.dispatchEvent("scroll", { detail: { scrollLeft: 0 } });
  await tick();
  w.setData({ value: "q19" });
  await tick();
  expect(w.data.scroll).toEqual({ row: 0, left: 420.01 });
});

it("answer sheet configure() customizes item labels", () => {
  const w = mount({ items });
  (
    w.instance as unknown as {
      configure(config: {
        getItemLabel: (item: { key: string }, index: number) => string;
      }): void;
    }
  ).configure({ getItemLabel: (item, index) => `${item.key}#${index}` });
  expect(pills(w)[0].ariaLabel).toBe("a1#0");
});
