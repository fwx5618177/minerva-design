import { afterEach, describe, expect, it } from "vitest";
import { getCodeSelectionRange } from "./code-selection";

/** A numbered, highlighted code block like the renderers produce */
function mount() {
  document.body.innerHTML = `<p id="before">before</p><div id="block"><pre><code><span class="line"><span data-line="1" aria-hidden="true"></span><span class="kw">const</span> a = <mark data-mark-id="m">1</mark>;</span>
<span class="line"><span data-line="2" aria-hidden="true"></span>b();</span></code></pre></div><p id="after">after</p>`;
  return {
    pre: document.querySelector("pre")!,
    code: document.querySelector("code")!,
    text: (selector: string) =>
      document.querySelector(selector)!.firstChild as Text,
  };
}

function select(
  start: Node,
  startOffset: number,
  end: Node,
  endOffset: number,
) {
  const range = document.createRange();
  range.setStart(start, startOffset);
  range.setEnd(end, endOffset);
  const selection = window.getSelection()!;
  selection.removeAllRanges();
  selection.addRange(range);
  return range;
}

describe("getCodeSelectionRange", () => {
  afterEach(() => {
    window.getSelection()?.removeAllRanges();
    document.body.innerHTML = "";
  });

  it("maps a selection across tokens, marks and lines to code offsets", () => {
    const { pre, code, text } = mount();
    expect(code.textContent).toBe("const a = 1;\nb();");
    // from "nst" in the keyword to "b(" on line 2
    const line2 = document.querySelectorAll(".line")[1].lastChild as Text;
    select(text(".kw"), 2, line2, 2);
    expect(getCodeSelectionRange(pre)).toEqual({
      start: 2,
      end: 15,
      text: "nst a = 1;\nb(",
    });
    // the <code>, an ancestor and an explicit Range give the same result
    expect(getCodeSelectionRange(code)?.start).toBe(2);
    expect(getCodeSelectionRange(document.getElementById("block"))?.end).toBe(
      15,
    );
    const range = document.createRange();
    range.setStart(text("mark"), 0);
    range.setEnd(text("mark"), 1);
    expect(getCodeSelectionRange(pre, range)).toEqual({
      start: 10,
      end: 11,
      text: "1",
    });
  });

  it("handles element boundary points (line number gutters count nothing)", () => {
    const { pre } = mount();
    const line1 = document.querySelector(".line")!;
    // from the start of line 1 (before its gutter) to after the keyword span
    expect(getCodeSelectionRange(pre, select(line1, 0, line1, 2))).toEqual({
      start: 0,
      end: 5,
      text: "const",
    });
  });

  it("clamps a selection extending outside the code", () => {
    const { pre, text } = mount();
    select(text("#before"), 2, text("mark"), 1);
    expect(getCodeSelectionRange(pre)).toMatchObject({ start: 0, end: 11 });
    select(text("mark"), 0, text("#after"), 2);
    expect(getCodeSelectionRange(pre)).toMatchObject({ start: 10, end: 17 });
    select(document.body, 0, document.body, 3);
    expect(getCodeSelectionRange(pre)).toMatchObject({ start: 0, end: 17 });
  });

  it("returns null when nothing of the code is selected", () => {
    const { pre, text } = mount();
    expect(getCodeSelectionRange(pre)).toBeNull();
    select(text(".kw"), 1, text(".kw"), 1);
    expect(getCodeSelectionRange(pre)).toBeNull();
    select(text("#before"), 0, text("#before"), 3);
    expect(getCodeSelectionRange(pre)).toBeNull();
    expect(getCodeSelectionRange(null)).toBeNull();
    expect(getCodeSelectionRange(pre, null)).toBeNull();
  });

  it("works inside a shadow root", () => {
    const host = document.createElement("div");
    document.body.append(host);
    const root = host.attachShadow({ mode: "open" });
    root.innerHTML = "<pre><code>abc<b>def</b></code></pre>";
    const range = document.createRange();
    range.setStart(root.querySelector("code")!.firstChild!, 1);
    range.setEnd(root.querySelector("b")!.firstChild!, 2);
    expect(getCodeSelectionRange(root, range)).toEqual({
      start: 1,
      end: 5,
      text: "bcde",
    });
  });
});
