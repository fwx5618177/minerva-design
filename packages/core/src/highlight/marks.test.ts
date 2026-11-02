import { describe, expect, it } from "vitest";
import {
  CODE_MARK_DEFAULT_BACKGROUND,
  applyCodeMarks,
  clampCodeRange,
  codeMarkBackground,
  highlightCode,
  resolveCodeMarkBackground,
  splitCodeMarkLines,
  splitHighlightLines,
  type CodeMark,
  type CodeMarkRun,
  type HighlightToken,
} from ".";

const plain = (text: string): HighlightToken[] =>
  text ? [{ type: null, text }] : [];

const runText = (run: CodeMarkRun) => run.tokens.map((t) => t.text).join("");

/** `[text, mark index]` of each run */
const shape = (runs: readonly CodeMarkRun[]) =>
  runs.map((run) => [runText(run), run.index] as const);

/** Checks the invariants of the runs of `code` */
function expectConsistent(code: string, runs: readonly CodeMarkRun[]) {
  expect(runs.map(runText).join("")).toBe(code);
  let offset = 0;
  for (const run of runs) {
    expect(run.start).toBe(offset);
    expect(run.end - run.start).toBe(runText(run).length);
    expect(code.slice(run.start, run.end)).toBe(runText(run));
    offset = run.end;
  }
}

describe("clampCodeRange", () => {
  const code = "abcdef";
  it("keeps a valid range", () => {
    expect(clampCodeRange(code, 1, 3)).toEqual([1, 3]);
  });
  it("clamps to the code and swaps reversed ranges", () => {
    expect(clampCodeRange(code, -5, 2)).toEqual([0, 2]);
    expect(clampCodeRange(code, 4, 99)).toEqual([4, 6]);
    expect(clampCodeRange(code, 5, 2)).toEqual([2, 5]);
    expect(clampCodeRange(code, 1.7, 3.2)).toEqual([1, 3]);
    expect(clampCodeRange(code, 0, Infinity)).toEqual([0, 6]);
  });
  it("rejects empty and non-numeric ranges", () => {
    expect(clampCodeRange(code, 2, 2)).toBeNull();
    expect(clampCodeRange(code, 10, 20)).toBeNull();
    expect(clampCodeRange(code, -3, -1)).toBeNull();
    expect(clampCodeRange(code, Number.NaN, 2)).toBeNull();
    expect(clampCodeRange(code, "1" as never, 2)).toBeNull();
    expect(clampCodeRange("", 0, 1)).toBeNull();
  });
  it("never splits a surrogate pair", () => {
    const emoji = "a😀b"; // 😀 is 2 code units (1..3)
    expect(clampCodeRange(emoji, 2, 4)).toEqual([1, 4]);
    expect(clampCodeRange(emoji, 0, 2)).toEqual([0, 3]);
  });
});

describe("applyCodeMarks", () => {
  it("returns one unmarked run without marks", () => {
    const tokens = highlightCode("const a = 1;", "js");
    for (const marks of [undefined, null, []]) {
      const runs = applyCodeMarks(tokens, marks);
      expect(runs).toHaveLength(1);
      expect(runs[0]).toMatchObject({ mark: null, index: -1, start: 0 });
      expect(runs[0].tokens).toEqual(tokens);
    }
  });

  it("returns no runs for empty code", () => {
    expect(applyCodeMarks([], [{ start: 0, end: 3 }])).toEqual([]);
  });

  it("wraps a range inside a token", () => {
    const mark = { start: 2, end: 4, id: "m" };
    const runs = applyCodeMarks(plain("abcdef"), [mark]);
    expect(shape(runs)).toEqual([
      ["ab", -1],
      ["cd", 0],
      ["ef", -1],
    ]);
    expect(runs[1].mark).toBe(mark);
    expectConsistent("abcdef", runs);
  });

  it("cuts the highlighted tokens a mark crosses, keeping their types", () => {
    const code = 'const name = "x";';
    const tokens = highlightCode(code, "js");
    // "name = \"x" : from inside the identifier to inside the string
    const runs = applyCodeMarks(tokens, [{ start: 8, end: 15 }]);
    expectConsistent(code, runs);
    const marked = runs.find((run) => run.index === 0)!;
    expect(runText(marked)).toBe(code.slice(8, 15));
    expect(marked.tokens.map((t) => t.type)).toContain("string");
    expect(marked.tokens.map((t) => t.type)).toContain("operator");
    // the keyword before the mark is untouched
    expect(runs[0].tokens[0]).toEqual({ type: "keyword", text: "const" });
    // every piece keeps the type of the token it comes from
    const typeAt = (offset: number) => {
      let at = 0;
      for (const t of tokens) {
        if (offset < at + t.text.length) return t.type;
        at += t.text.length;
      }
      return undefined;
    };
    for (const run of runs) {
      let at = run.start;
      for (const t of run.tokens) {
        expect(t.type).toBe(typeAt(at));
        at += t.text.length;
      }
    }
  });

  it("lets the later mark win where marks overlap", () => {
    const a = { start: 0, end: 6, id: "a" };
    const b = { start: 2, end: 4, id: "b" };
    expect(shape(applyCodeMarks(plain("abcdefgh"), [a, b]))).toEqual([
      ["ab", 0],
      ["cd", 1],
      ["ef", 0],
      ["gh", -1],
    ]);
    // reversed order: the outer mark hides the inner one
    expect(shape(applyCodeMarks(plain("abcdefgh"), [b, a]))).toEqual([
      ["abcdef", 1],
      ["gh", -1],
    ]);
    // partial overlap
    const c = { start: 4, end: 8 };
    expect(shape(applyCodeMarks(plain("abcdefgh"), [a, c]))).toEqual([
      ["abcd", 0],
      ["efgh", 1],
    ]);
  });

  it("keeps adjacent marks apart and handles identical ranges", () => {
    expect(
      shape(
        applyCodeMarks(plain("abcdef"), [
          { start: 0, end: 3 },
          { start: 3, end: 6 },
        ]),
      ),
    ).toEqual([
      ["abc", 0],
      ["def", 1],
    ]);
    expect(
      shape(
        applyCodeMarks(plain("abcdef"), [
          { start: 1, end: 3 },
          { start: 1, end: 3 },
        ]),
      ),
    ).toEqual([
      ["a", -1],
      ["bc", 1],
      ["def", -1],
    ]);
  });

  it("clamps out-of-range marks and ignores empty or invalid ones", () => {
    const marks = [
      { start: -10, end: 2 },
      { start: 3, end: 3 },
      { start: 5, end: 100 },
      { start: Number.NaN, end: 4 },
      null as unknown as CodeMark,
      { start: 4, end: 3 },
    ];
    const runs = applyCodeMarks(plain("abcdef"), marks);
    expect(shape(runs)).toEqual([
      ["ab", 0],
      ["c", -1],
      ["d", 5],
      ["e", -1],
      ["f", 2],
    ]);
    expectConsistent("abcdef", runs);
  });

  it("keeps a mark across line breaks in a single run", () => {
    const code = "one\ntwo\nthree";
    const runs = applyCodeMarks(plain(code), [{ start: 2, end: 9 }]);
    expect(shape(runs)).toEqual([
      ["on", -1],
      ["e\ntwo\nt", 0],
      ["hree", -1],
    ]);
  });

  it("matches arbitrary marks on highlighted code (fuzz)", () => {
    const code = [
      "import { a } from 'b';",
      "// comment 😀",
      "function f(x) {",
      "  return x * 2; /* multi",
      "  line */",
      "}",
      "",
    ].join("\n");
    const tokens = highlightCode(code, "ts");
    let seed = 7;
    const next = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return (seed % (code.length + 6)) - 3;
    };
    for (let round = 0; round < 200; round++) {
      const marks = Array.from({ length: 1 + (round % 5) }, () => ({
        start: next(),
        end: next(),
      }));
      const runs = applyCodeMarks(tokens, marks);
      expectConsistent(code, runs);
      // each character shows the last mark covering it
      for (const run of runs) {
        for (let i = run.start; i < run.end; i++) {
          let expected = -1;
          marks.forEach((mark, index) => {
            const range = clampCodeRange(code, mark.start, mark.end);
            if (range && range[0] <= i && i < range[1]) expected = index;
          });
          expect(run.index).toBe(expected);
        }
      }
    }
  });
});

describe("splitCodeMarkLines", () => {
  it("cuts multi-line marks at the line breaks", () => {
    const code = "one\ntwo\nthree";
    const lines = splitCodeMarkLines(
      applyCodeMarks(plain(code), [{ start: 2, end: 9, id: "m" }]),
    );
    expect(lines.map(shape)).toEqual([
      [
        ["on", -1],
        ["e", 0],
      ],
      [["two", 0]],
      [
        ["t", 0],
        ["hree", -1],
      ],
    ]);
    for (const line of lines) {
      for (const run of line) {
        expect(code.slice(run.start, run.end)).toBe(runText(run));
      }
    }
    expect(lines[1][0].mark?.id).toBe("m");
  });

  it("agrees with splitHighlightLines (empty lines, final break)", () => {
    for (const code of ["a\n\nb\n", "\n\nx", "x\n", "a\nb"]) {
      const tokens = highlightCode(code, "js");
      const lines = splitCodeMarkLines(
        applyCodeMarks(tokens, [{ start: 1, end: code.length - 1 }]),
      );
      const expected = splitHighlightLines(tokens);
      expect(lines.length).toBe(expected.length);
      lines.forEach((line, i) => {
        expect(line.map(runText).join("")).toBe(
          expected[i].map((t) => t.text).join(""),
        );
      });
    }
  });

  it("drops a mark covering only a line break", () => {
    const lines = splitCodeMarkLines(
      applyCodeMarks(plain("ab\ncd"), [{ start: 2, end: 3 }]),
    );
    expect(lines.map(shape)).toEqual([[["ab", -1]], [["cd", -1]]]);
  });

  it("keeps highlighted token types on each line", () => {
    const code = "/* a\nb */ x";
    const tokens = highlightCode(code, "js");
    const lines = splitCodeMarkLines(
      applyCodeMarks(tokens, [{ start: 3, end: 7 }]),
    );
    expect(lines[0]).toEqual([
      {
        mark: null,
        index: -1,
        start: 0,
        end: 3,
        tokens: [{ type: "comment", text: "/* " }],
      },
      {
        mark: { start: 3, end: 7 },
        index: 0,
        start: 3,
        end: 4,
        tokens: [{ type: "comment", text: "a" }],
      },
    ]);
    expect(lines[1][0]).toMatchObject({
      index: 0,
      start: 5,
      end: 7,
      tokens: [{ type: "comment", text: "b " }],
    });
  });
});

describe("codeMarkBackground", () => {
  it("tints theme colors and passes CSS colors through", () => {
    expect(codeMarkBackground(undefined)).toBe("");
    expect(codeMarkBackground("  ")).toBe("");
    expect(codeMarkBackground("primary")).toBe(
      "color-mix(in srgb, var(--primary-color) 30%, transparent)",
    );
    expect(codeMarkBackground("neutral")).toBe(
      "color-mix(in srgb, var(--text-muted-color) 30%, transparent)",
    );
    expect(codeMarkBackground("#ff000055")).toBe("#ff000055");
    expect(codeMarkBackground(" rgb(0 0 0 / .2) ")).toBe("rgb(0 0 0 / .2)");
  });

  it("has a translucent default", () => {
    expect(CODE_MARK_DEFAULT_BACKGROUND).toMatch(/^rgba\(.*, 0\.\d+\)$/);
  });
});

describe("resolveCodeMarkBackground", () => {
  const colors = {
    "primary-color": "#0000ff",
    "text-muted-color": "#646464",
    "danger-color": "not a color",
  };
  it("resolves theme tints to rgba, keeps CSS colors, defaults to yellow", () => {
    expect(resolveCodeMarkBackground(undefined, colors)).toBe(
      CODE_MARK_DEFAULT_BACKGROUND,
    );
    expect(resolveCodeMarkBackground("primary", colors)).toBe(
      "rgba(0, 0, 255, 0.3)",
    );
    expect(resolveCodeMarkBackground("neutral", colors)).toBe(
      "rgba(100, 100, 100, 0.3)",
    );
    // unknown / unparsable theme colors fall back to the default
    expect(resolveCodeMarkBackground("success", colors)).toBe(
      CODE_MARK_DEFAULT_BACKGROUND,
    );
    expect(resolveCodeMarkBackground("danger", colors)).toBe(
      CODE_MARK_DEFAULT_BACKGROUND,
    );
    expect(resolveCodeMarkBackground("#ff000055", colors)).toBe("#ff000055");
  });
});
