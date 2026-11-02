import { fireEvent, render, screen } from "@testing-library/react-native";
import { ScrollView } from "react-native";
import { describe, expect, it, vi } from "vitest";
import { getByRoleDeep, queryPart } from "../../../test/queries";
import { AnswerSheet, type AnswerSheetItem } from "./AnswerSheet";

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
const pill = (name: string) => screen.getByRole("button", { name });

describe("AnswerSheet (native)", () => {
  it("renders a labelled navigation of numbered pills, ungrouped first", async () => {
    await render(<AnswerSheet items={items} groups={groups} />);
    expect(getByRoleDeep("navigation", { name: "Questions" })).toBeTruthy();
    const names = screen
      .getAllByRole("button")
      .map((button) => button.props.accessibilityLabel);
    expect(names).toEqual([
      "Question Intro, unanswered",
      "Question 2, answered",
      "Question 3, correct, flagged",
      "Question 4, wrong",
      "Question 5, skipped",
      "Question 6, unanswered",
    ]);
    expect(screen.getByText("Single choice")).toBeTruthy();
    expect(screen.getByText("Short answer")).toBeTruthy();
    expect(screen.getByText("Intro")).toBeTruthy();
    expect(pill("Question 6, unanswered")).toBeDisabled();
  });

  it("selects a question and reports it", async () => {
    const onChange = vi.fn();
    await render(
      <AnswerSheet items={items} defaultValue="a1" onChange={onChange} />,
    );
    expect(pill("Question 1, answered")).toBeSelected();
    await fireEvent.press(pill("Question 3, wrong"));
    expect(onChange).toHaveBeenCalledWith("a3");
    expect(pill("Question 3, wrong")).toBeSelected();
    expect(pill("Question 1, answered")).not.toBeSelected();
  });

  it("keeps a controlled value", async () => {
    const onChange = vi.fn();
    await render(<AnswerSheet items={items} value="a1" onChange={onChange} />);
    await fireEvent.press(pill("Question 4, skipped"));
    expect(onChange).toHaveBeenCalledWith("b1");
    expect(pill("Question 1, answered")).toBeSelected();
  });

  it("shows the summary and the legend", async () => {
    await render(<AnswerSheet items={items} showSummary showLegend />);
    expect(screen.getByText("3 / 6 answered")).toBeTruthy();
    for (const text of [
      "Unanswered",
      "Answered",
      "Correct",
      "Wrong",
      "Skipped",
      "Flagged",
    ]) {
      expect(screen.getByText(text)).toBeTruthy();
    }
  });

  it("supports columns, scroll, disabled and custom labels", async () => {
    const many = Array.from({ length: 7 }, (_, i) => ({ key: `q${i + 1}` }));
    const { rerender } = await render(
      <AnswerSheet items={many} columns={3} accessibilityLabel="Exam" />,
    );
    expect(getByRoleDeep("navigation", { name: "Exam" })).toBeTruthy();
    expect(screen.getAllByRole("button")).toHaveLength(7);
    await rerender(
      <AnswerSheet
        items={many}
        layout="scroll"
        disabled
        getItemLabel={(item, index) => `${item.key}#${index}`}
      />,
    );
    expect(pill("q1#0")).toBeDisabled();
  });

  it("scrolls the row to center the current pill once laid out", async () => {
    const scrollTo = vi.spyOn(ScrollView.prototype, "scrollTo");
    const many = Array.from({ length: 20 }, (_, i) => ({ key: `q${i + 1}` }));
    const sheet = (value: string) => (
      <AnswerSheet
        items={many}
        value={value}
        onChange={() => {}}
        layout="scroll"
      />
    );
    const { rerender } = await render(sheet("q16"));
    const row = queryPart("grid", "answer-sheet")!;
    // a 200pt row of 32pt pills every 40pt (803pt of content)
    await fireEvent(row, "layout", {
      nativeEvent: { layout: { x: 0, y: 0, width: 200, height: 38 } },
    });
    await fireEvent(row, "contentSizeChange", 803, 38);
    for (let index = 0; index < many.length; index++) {
      // re-queried: a re-render replaces the host instances
      await fireEvent(screen.getAllByRole("button")[index], "layout", {
        nativeEvent: {
          layout: { x: 3 + index * 40, y: 3, width: 32, height: 32 },
        },
      });
    }
    // pill 16 at 603..635: centered
    expect(scrollTo).toHaveBeenLastCalledWith({ x: 519, animated: false });
    await rerender(sheet("q2"));
    expect(scrollTo).toHaveBeenLastCalledWith({ x: 0, animated: false });
    await rerender(sheet("q20"));
    expect(scrollTo).toHaveBeenLastCalledWith({ x: 603, animated: false });
    const calls = scrollTo.mock.calls.length;
    await rerender(sheet("q20"));
    expect(scrollTo).toHaveBeenCalledTimes(calls);
  });
});
