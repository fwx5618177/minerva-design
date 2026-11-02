import { describe, expect, it } from "vitest";
import {
  answerSheetLegend,
  answerSheetMoveIndex,
  answerSheetSections,
  answerSheetStatus,
  answerSheetSummary,
} from "./answer-sheet";

const items = [
  { key: "a", group: "g2" },
  { key: "b", status: "answered", group: "g1" },
  { key: "c", status: "wrong", flagged: true },
  { key: "d", status: "bogus", group: "missing" },
  { key: "e", status: "correct", group: "g1", label: "E" },
];
const groups = [
  { key: "g1", title: "One" },
  { key: "g2", title: "Two" },
  { key: "g3", title: "Empty" },
];

describe("answerSheetSections", () => {
  it("puts ungrouped items first, then groups in order, numbering across", () => {
    const sections = answerSheetSections(items, groups);
    expect(sections.map((s) => [s.key, s.title])).toEqual([
      ["", undefined],
      ["g1", "One"],
      ["g2", "Two"],
    ]);
    expect(
      sections.flatMap((s) =>
        s.entries.map((e) => [e.item.key, e.index, e.label, e.status]),
      ),
    ).toEqual([
      ["c", 0, "1", "wrong"],
      ["d", 1, "2", "unanswered"],
      ["b", 2, "3", "answered"],
      ["e", 3, "E", "correct"],
      ["a", 4, "5", "unanswered"],
    ]);
  });

  it("tolerates missing input", () => {
    expect(answerSheetSections(undefined)).toEqual([]);
    expect(answerSheetStatus(undefined)).toBe("unanswered");
  });
});

describe("summary and legend", () => {
  it("counts answered, correct and wrong", () => {
    expect(answerSheetSummary(items)).toEqual({ answered: 3, total: 5 });
  });

  it("lists the statuses present and the flag", () => {
    expect(answerSheetLegend(items)).toEqual([
      "unanswered",
      "answered",
      "correct",
      "wrong",
      "flagged",
    ]);
    expect(answerSheetLegend([{ key: "x" }])).toEqual(["unanswered"]);
  });
});

describe("answerSheetMoveIndex", () => {
  // sections of 5 and 3 items, 3 columns:
  // [0 1 2]
  // [3 4]
  // [5 6 7]
  const sections = [{ entries: [1, 2, 3, 4, 5] }, { entries: [1, 2, 3] }];

  it("moves in display order", () => {
    expect(answerSheetMoveIndex(sections, 0, "previous")).toBe(0);
    expect(answerSheetMoveIndex(sections, 4, "next")).toBe(5);
    expect(answerSheetMoveIndex(sections, 7, "next")).toBe(7);
    expect(answerSheetMoveIndex(sections, 3, "first")).toBe(0);
    expect(answerSheetMoveIndex(sections, 3, "last")).toBe(7);
  });

  it("moves by rows with columns, across sections", () => {
    expect(answerSheetMoveIndex(sections, 1, "down", 3)).toBe(4);
    expect(answerSheetMoveIndex(sections, 2, "down", 3)).toBe(4);
    expect(answerSheetMoveIndex(sections, 4, "down", 3)).toBe(6);
    expect(answerSheetMoveIndex(sections, 6, "down", 3)).toBe(6);
    expect(answerSheetMoveIndex(sections, 7, "up", 3)).toBe(4);
    expect(answerSheetMoveIndex(sections, 5, "up", 3)).toBe(3);
    expect(answerSheetMoveIndex(sections, 4, "up", 3)).toBe(1);
    expect(answerSheetMoveIndex(sections, 1, "up", 3)).toBe(1);
  });

  it("can't move by rows without columns", () => {
    expect(answerSheetMoveIndex(sections, 1, "down")).toBeNull();
    expect(answerSheetMoveIndex([], 0, "next")).toBeNull();
  });
});
