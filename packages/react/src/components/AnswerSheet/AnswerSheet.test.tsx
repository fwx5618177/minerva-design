import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import i18n from "../../config/i18n";
import { AnswerSheet, type AnswerSheetItem } from ".";

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
const pills = () => screen.getAllByRole("button");
const pill = (key: string) =>
  pills().find((button) => button.getAttribute("data-key") === key)!;
const keys = () => pills().map((button) => button.getAttribute("data-key"));

describe("AnswerSheet", () => {
  afterEach(() => {
    i18n.changeLanguage("en");
  });

  it("renders a nav of numbered pills, ungrouped first then groups", () => {
    render(<AnswerSheet items={items} groups={groups} />);
    expect(
      screen.getByRole("navigation", { name: "Questions" }),
    ).toBeInTheDocument();
    expect(keys()).toEqual(["x", "a1", "a2", "a3", "b1", "b2"]);
    expect(pills().map((button) => button.textContent)).toEqual([
      "Intro",
      "2",
      "3",
      "4",
      "5",
      "6",
    ]);
    const single = screen.getByRole("group", { name: "Single choice" });
    expect(single).toContainElement(pill("a1"));
    expect(
      screen.getByRole("group", { name: "Short answer" }),
    ).toContainElement(pill("b2"));
    expect(pill("a1")).toHaveAccessibleName("Question 2, answered");
    expect(pill("a2")).toHaveAccessibleName("Question 3, correct, flagged");
    expect(pill("x")).toHaveAccessibleName("Question Intro, unanswered");
    expect(pill("b2")).toHaveAttribute("aria-disabled", "true");
    expect(pill("a2")).toHaveAttribute("data-flagged", "");
    expect(pill("a3")).toHaveAttribute("data-status", "wrong");
    // no value: the first pill is the tab stop
    expect(pill("x")).toHaveAttribute("tabindex", "0");
    expect(pill("a1")).toHaveAttribute("tabindex", "-1");
  });

  it("selects on click (uncontrolled) and marks the current step", async () => {
    const onChange = vi.fn();
    render(<AnswerSheet items={items} defaultValue="a1" onChange={onChange} />);
    expect(pill("a1")).toHaveAttribute("aria-current", "step");
    expect(pill("a1")).toHaveAttribute("tabindex", "0");
    await userEvent.click(pill("a3"));
    expect(onChange).toHaveBeenCalledWith("a3");
    expect(pill("a3")).toHaveAttribute("aria-current", "step");
    expect(pill("a1")).not.toHaveAttribute("aria-current");
    // disabled items are focusable but not selectable
    await userEvent.click(pill("b2"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("is controllable", async () => {
    const Controlled = () => {
      const [value, setValue] = useState("a1");
      return (
        <>
          <AnswerSheet items={items} value={value} onChange={setValue} />
          <output>{value}</output>
        </>
      );
    };
    render(<Controlled />);
    await userEvent.click(pill("b1"));
    expect(screen.getByRole("status")).toHaveTextContent("b1");
    expect(pill("b1")).toHaveAttribute("aria-current", "step");
  });

  it("moves focus with arrows, Home / End and selects with Enter / Space", async () => {
    const onChange = vi.fn();
    render(<AnswerSheet items={items} groups={groups} onChange={onChange} />);
    pill("x").focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(pill("a1")).toHaveFocus();
    expect(pill("a1")).toHaveAttribute("tabindex", "0");
    expect(pill("x")).toHaveAttribute("tabindex", "-1");
    await userEvent.keyboard("{End}");
    expect(pill("b2")).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    expect(pill("b2")).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(onChange).not.toHaveBeenCalled();
    await userEvent.keyboard("{Home}");
    expect(pill("x")).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}{ArrowRight}{ArrowLeft}");
    expect(pill("a1")).toHaveFocus();
    await userEvent.keyboard(" ");
    expect(onChange).toHaveBeenLastCalledWith("a1");
    await userEvent.keyboard("{ArrowRight}{Enter}");
    expect(onChange).toHaveBeenLastCalledWith("a2");
  });

  it("moves by rows with columns, across sections", async () => {
    const many = Array.from({ length: 8 }, (_, i) => ({
      key: `q${i + 1}`,
      group: i < 5 ? "g1" : "g2",
    }));
    const { container } = render(
      <AnswerSheet
        items={many}
        groups={[
          { key: "g1", title: "One" },
          { key: "g2", title: "Two" },
        ]}
        columns={3}
      />,
    );
    expect(
      container.querySelector<HTMLElement>("[data-part=grid]")!.style
        .gridTemplateColumns,
    ).toBe("repeat(3, minmax(0, 1fr))");
    pill("q2").focus();
    await userEvent.keyboard("{ArrowDown}");
    expect(pill("q5")).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(pill("q7")).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}{ArrowUp}");
    expect(pill("q2")).toHaveFocus();
  });

  it("reverses horizontal arrows in RTL", async () => {
    render(
      <div dir="rtl">
        <AnswerSheet items={items} />
      </div>,
    );
    pill("a2").focus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(pill("a3")).toHaveFocus();
  });

  it("shows the summary and the legend of the statuses present", () => {
    render(<AnswerSheet items={items} showSummary showLegend />);
    expect(screen.getByText("3 / 6 answered")).toBeInTheDocument();
    const legend = screen.getByRole("list");
    expect(
      Array.from(legend.querySelectorAll("li")).map((li) => li.textContent),
    ).toEqual([
      "Unanswered",
      "Answered",
      "Correct",
      "Wrong",
      "Skipped",
      "Flagged",
    ]);
  });

  it("disables the whole sheet and applies size / layout hooks", () => {
    const onChange = vi.fn();
    const ref = createRef<HTMLElement>();
    render(
      <AnswerSheet
        ref={ref}
        items={items}
        disabled
        size="small"
        layout="scroll"
        className="custom"
        onChange={onChange}
      />,
    );
    expect(ref.current?.tagName).toBe("NAV");
    expect(ref.current).toHaveClass("custom");
    expect(ref.current).toHaveAttribute("data-size", "small");
    expect(ref.current).toHaveAttribute("data-layout", "scroll");
    expect(ref.current).toHaveAttribute("data-disabled", "");
    fireEvent.click(pill("a1"));
    expect(onChange).not.toHaveBeenCalled();
    expect(pill("a1")).toHaveAttribute("aria-disabled", "true");
  });

  it("uses custom labels and translations", () => {
    i18n.changeLanguage("zh");
    const { rerender } = render(<AnswerSheet items={items} showSummary />);
    expect(
      screen.getByRole("navigation", { name: "题目" }),
    ).toBeInTheDocument();
    // without groups, every item is in the untitled section, in order
    expect(pill("a1")).toHaveAccessibleName("第 1 题，已作答");
    expect(screen.getByText("已答 3 / 6")).toBeInTheDocument();
    rerender(
      <AnswerSheet
        items={items}
        aria-label="Exam"
        getItemLabel={(item, index) => `${item.key}#${index}`}
      />,
    );
    expect(
      screen.getByRole("navigation", { name: "Exam" }),
    ).toBeInTheDocument();
    expect(pill("a1")).toHaveAccessibleName("a1#0");
  });

  it("scrolls the row (not the page) to center the current pill", () => {
    const restore = stubScrollRow();
    try {
      const many = Array.from({ length: 20 }, (_, i) => ({ key: `q${i + 1}` }));
      const sheet = (value: string, layout?: "scroll") => (
        <AnswerSheet
          items={many}
          value={value}
          layout={layout}
          onChange={() => {}}
        />
      );
      const { rerender } = render(sheet("q16", "scroll"));
      const row = pill("q1").parentElement!;
      // pill 16 at 600..632 in a 200px row of 800px: centered
      expect(row.scrollLeft).toBe(516);
      rerender(sheet("q2", "scroll"));
      expect(row.scrollLeft).toBe(0);
      rerender(sheet("q20", "scroll"));
      expect(row.scrollLeft).toBe(600);
      // wrapping rows never scroll
      rerender(sheet("q10"));
      expect(row.scrollLeft).toBe(600);
    } finally {
      restore();
    }
  });
});

/**
 * Fake layout of a 200px-wide scroll row of 32px pills every 40px: the
 * pills' rects follow the row's scrollLeft.
 */
function stubScrollRow() {
  const spies = [
    vi
      .spyOn(HTMLElement.prototype, "getBoundingClientRect")
      .mockImplementation(function (this: HTMLElement) {
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
      }),
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(200),
    vi
      .spyOn(HTMLElement.prototype, "scrollWidth", "get")
      .mockImplementation(function (this: HTMLElement) {
        return this.children.length * 40;
      }),
  ];
  return () => spies.forEach((spy) => spy.mockRestore());
}
