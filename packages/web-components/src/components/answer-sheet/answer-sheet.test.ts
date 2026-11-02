import { afterEach, describe, expect, it, vi } from "vitest";
import { MinervaAnswerSheet, type AnswerSheetItem } from "./answer-sheet";
import "../../elements/answer-sheet";
import { customStates } from "../../internal/styling-hooks";
import { $, mount, settle } from "../../../tests/utils";

const items: AnswerSheetItem[] = [
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

afterEach(() => {
  vi.restoreAllMocks();
});

async function setup(
  attrs = "",
  props: Partial<MinervaAnswerSheet> = { groups },
) {
  const el = await mount<MinervaAnswerSheet>(
    `<minerva-answer-sheet ${attrs}></minerva-answer-sheet><button>After</button>`,
    "minerva-answer-sheet",
  );
  Object.assign(el, { items, ...props });
  await settle();
  return el;
}

const pills = (el: Element) =>
  Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>("[data-key]"));
const pill = (el: Element, key: string) => $(el, `[data-key="${key}"]`);
const keys = (el: Element) => pills(el).map((button) => button.dataset.key);
const focused = (el: Element) =>
  el.shadowRoot!.activeElement as HTMLElement | null;
const press = async (el: MinervaAnswerSheet, key: string) => {
  focused(el)!.dispatchEvent(
    new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true }),
  );
  await settle();
};

describe("<minerva-answer-sheet>", () => {
  it("registers", () => {
    expect(customElements.get("minerva-answer-sheet")).toBe(MinervaAnswerSheet);
  });

  it("renders a nav of numbered pills, ungrouped first then groups", async () => {
    const el = await setup();
    expect($(el, "nav").getAttribute("aria-label")).toBe("Questions");
    expect(keys(el)).toEqual(["x", "a1", "a2", "a3", "b1", "b2"]);
    expect(pills(el).map((button) => button.textContent?.trim())).toEqual([
      "Intro",
      "2",
      "3",
      "4",
      "5",
      "6",
    ]);
    const group = $(el, '[role="group"]');
    const title = el.shadowRoot!.getElementById(
      group.getAttribute("aria-labelledby")!,
    );
    expect(title?.textContent?.trim()).toBe("Single choice");
    expect(pill(el, "a1").getAttribute("aria-label")).toBe(
      "Question 2, answered",
    );
    expect(pill(el, "a2").getAttribute("aria-label")).toBe(
      "Question 3, correct, flagged",
    );
    expect(pill(el, "a2").getAttribute("part")).toBe(
      "item item--flagged item--status-correct",
    );
    expect(pill(el, "b2").getAttribute("aria-disabled")).toBe("true");
    expect(pill(el, "x").getAttribute("tabindex")).toBe("0");
    expect(pill(el, "a1").getAttribute("tabindex")).toBe("-1");
  });

  it("selects on click and fires minerva-change", async () => {
    const el = await setup(`value="a1"`);
    const onChange = vi.fn();
    el.addEventListener("minerva-change", (event) =>
      onChange((event as CustomEvent).detail),
    );
    expect(pill(el, "a1").getAttribute("aria-current")).toBe("step");
    pill(el, "a3").click();
    await settle();
    expect(onChange).toHaveBeenCalledWith({ value: "a3" });
    expect(el.value).toBe("a3");
    expect(pill(el, "a3").getAttribute("aria-current")).toBe("step");
    expect(pill(el, "a3").getAttribute("part")).toContain("item--current");
    pill(el, "b2").click();
    await settle();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("moves focus with the keyboard and selects with Enter / Space", async () => {
    const el = await setup();
    const onChange = vi.fn();
    el.addEventListener("minerva-change", onChange);
    el.focus();
    expect(focused(el)).toBe(pill(el, "x"));
    await press(el, "ArrowRight");
    expect(focused(el)).toBe(pill(el, "a1"));
    expect(pill(el, "a1").getAttribute("tabindex")).toBe("0");
    await press(el, "End");
    expect(focused(el)).toBe(pill(el, "b2"));
    await press(el, "Enter");
    expect(onChange).not.toHaveBeenCalled();
    await press(el, "Home");
    expect(focused(el)).toBe(pill(el, "x"));
    await press(el, " ");
    expect(el.value).toBe("x");
  });

  it("moves by rows with columns", async () => {
    const many = Array.from({ length: 8 }, (_, i) => ({ key: `q${i + 1}` }));
    const el = await setup(`columns="3"`, { items: many });
    const grid = $(el, '[part="grid"]');
    expect(grid.style.gridTemplateColumns).toBe("repeat(3, minmax(0, 1fr))");
    expect(grid.classList.contains("columns")).toBe(true);
    pill(el, "q2").focus();
    await press(el, "ArrowDown");
    expect(focused(el)).toBe(pill(el, "q5"));
    await press(el, "ArrowUp");
    expect(focused(el)).toBe(pill(el, "q2"));
  });

  it("shows the summary, the legend and the host states", async () => {
    const el = await setup(
      `show-summary show-legend size="small" layout="scroll" disabled aria-label="Exam"`,
    );
    expect($(el, "nav").getAttribute("aria-label")).toBe("Exam");
    expect($(el, '[part="total"]').textContent?.trim()).toBe("3 / 6 answered");
    expect(
      Array.from(el.shadowRoot!.querySelectorAll("li")).map((li) =>
        li.textContent?.trim(),
      ),
    ).toEqual([
      "Unanswered",
      "Answered",
      "Correct",
      "Wrong",
      "Skipped",
      "Flagged",
    ]);
    expect([...customStates(el)]).toEqual(
      expect.arrayContaining(["disabled", "size-small", "layout-scroll"]),
    );
    pill(el, "a1").click();
    await settle();
    expect(el.value).toBeUndefined();
  });

  it("uses getItemLabel", async () => {
    const el = await setup("", {
      getItemLabel: (item, index) => `${item.key}#${index}`,
    });
    expect(pill(el, "a1").getAttribute("aria-label")).toBe("a1#0");
  });

  it("scrolls the row (not the page) to center the current pill", async () => {
    stubScrollRow();
    const many = Array.from({ length: 20 }, (_, i) => ({ key: `q${i + 1}` }));
    const el = await setup(`value="q16" layout="scroll"`, { items: many });
    const row = $(el, '[part="grid"]');
    // pill 16 at 600..632 in a 200px row of 800px: centered
    expect(row.scrollLeft).toBe(516);
    el.value = "q2";
    await settle();
    expect(row.scrollLeft).toBe(0);
    el.value = "q20";
    await settle();
    expect(row.scrollLeft).toBe(600);
    // unrelated updates keep a manual scroll; wrapping rows never scroll
    row.scrollLeft = 300;
    el.items = [...many];
    await settle();
    expect(row.scrollLeft).toBe(300);
    el.layout = "wrap";
    el.value = "q10";
    await settle();
    expect(row.scrollLeft).toBe(300);
  });
});

/**
 * Fake layout of a 200px-wide scroll row of 32px pills every 40px: the
 * pills' rects follow the row's scrollLeft.
 */
function stubScrollRow() {
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
    function (this: HTMLElement) {
      const row = this.parentElement;
      const isPill = this.hasAttribute("data-key") && row;
      const left = isPill
        ? Array.from(row.children).indexOf(this) * 40 - row.scrollLeft
        : 0;
      const width = isPill ? 32 : 200;
      return {
        left,
        width,
        right: left + width,
        x: left,
        top: 0,
        y: 0,
        height: 32,
        bottom: 32,
      } as DOMRect;
    },
  );
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(200);
  vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockImplementation(
    function (this: HTMLElement) {
      return this.children.length * 40;
    },
  );
}
