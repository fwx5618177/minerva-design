import simulate from "miniprogram-simulate";
import { afterEach, describe, expect, it, vi } from "vitest";
import * as controls from "./index";

const mounted: Array<{ detach(): void }> = [];
afterEach(() => {
  mounted.splice(0).forEach((w) => w.detach());
  vi.restoreAllMocks();
});
function mount(props: Record<string, unknown> = {}) {
  const c = controls.codeBlock;
  const id = simulate.load({
    tagName: "code-block-case",
    template: c.template,
    ...c.definition,
  });
  const w = simulate.render(id, props);
  w.attach(document.createElement("div"));
  mounted.push(w);
  return w;
}
const json = '{\n  "id": 42,\n  "ok": true\n}';
const texts = (w: ReturnType<typeof mount>, selector: string) =>
  w.querySelectorAll(selector).map((n) => n.dom!.textContent);

describe("codeBlock (weapp)", () => {
  it("renders plain text without a language", () => {
    const w = mount({ code: json });
    expect(w.data.codeRuns).toEqual([]);
    expect(w.querySelector(".mn-code-token-property")).toBeFalsy();
    expect(w.querySelector(".mn-code")!.dom!.textContent).toBe(json);
    expect(w.querySelector(".mn-row")).toBeFalsy();
  });

  it("highlights the language into nested text, keeping the text verbatim", () => {
    const w = mount({ code: json, language: "json" });
    expect(texts(w, ".mn-code-token-property")).toEqual(['"id"', '"ok"']);
    expect(texts(w, ".mn-code-token-number")).toEqual(["42"]);
    expect(w.querySelector(".mn-code")!.dom!.textContent).toBe(json);
    expect(w.querySelector(".mn-code-language")).toBeFalsy();
    w.setData({ highlight: false });
    expect(w.querySelector(".mn-code-token-property")).toBeFalsy();
    expect(w.querySelector(".mn-code")!.dom!.textContent).toBe(json);
  });

  it("never renders the code as markup", () => {
    const w = mount({ code: '<img src="x"/>', language: "html" });
    expect(w.dom!.querySelector("img")).toBeNull();
    expect(texts(w, ".mn-code-token-tag")).toEqual(["img"]);
  });

  it("numbers the lines, shows the language and copies the raw text", async () => {
    const setClipboardData = vi
      .spyOn(wx, "setClipboardData")
      .mockImplementation(() => undefined);
    const w = mount({
      code: json,
      language: "json",
      showLineNumbers: true,
      showLanguage: true,
      copyable: true,
    });
    expect(texts(w, ".mn-code-line-number")).toEqual(["1", "2", "3", "4"]);
    // (the simulator drops aria-* attributes: check the template)
    expect(controls.codeBlock.template).toContain(
      '<text class="mn-code-line-number" aria-hidden="true">',
    );
    expect(texts(w, ".mn-code-line-text")).toEqual(json.split("\n"));
    expect(w.querySelector(".mn-code-language")!.dom!.textContent).toBe("JSON");
    w.querySelector(".mn-close")!.dispatchEvent("tap");
    await simulate.sleep(0);
    expect(setClipboardData.mock.calls[0][0].data).toBe(json);
  });

  it('language="auto" detects the language for the tokens and the label', () => {
    const w = mount({
      code: json,
      language: "auto",
      showLanguage: true,
      marks: [{ start: 4, end: 8 }],
    });
    expect(w.querySelector(".mn-code-language")!.dom!.textContent).toBe("JSON");
    expect(
      w
        .querySelector(".mn-code-mark")!
        .dom!.querySelector(".mn-code-token-property")?.textContent,
    ).toBe('"id"');
    expect(w.querySelector(".mn-code")!.dom!.textContent).toBe(json);
    w.setData({ code: "SELECT id FROM users WHERE id = 1;", marks: [] });
    expect(w.querySelector(".mn-code-language")!.dom!.textContent).toBe("SQL");
    expect(w.querySelector(".mn-code-token-keyword")).toBeTruthy();
    w.setData({ code: "hello" });
    expect(w.querySelector(".mn-code-language")!.dom!.textContent).toBe(
      "PLAIN",
    );
    expect(w.querySelector("[class*=mn-code-token-]")).toBeFalsy();
  });

  it("marks character ranges over the tokens and fires markclick", async () => {
    const marks = [
      { start: 0, end: 9, id: "a", className: "saved" },
      { start: 4, end: 8, color: "#ff000055" },
      { start: 3, end: 3 },
    ];
    const w = mount({ code: json, language: "json", marks });
    const list = w.querySelectorAll(".mn-code-mark");
    expect(list.map((n) => n.dom!.textContent)).toEqual(["{\n  ", '"id"', ":"]);
    expect(list[0].dom!.className).toContain("saved");
    expect(w.data.codeRuns[0]).toMatchObject({ m: 0, id: "a", style: "" });
    expect(w.data.codeRuns[1].style).toBe("background-color:#ff000055");
    expect(
      list[1].dom!.querySelector(".mn-code-token-property")?.textContent,
    ).toBe('"id"');
    expect(w.querySelector(".mn-code")!.dom!.textContent).toBe(json);
    const events: unknown[] = [];
    w.addEventListener("markclick", (e) => events.push(e.detail));
    list[1].dispatchEvent("tap");
    list[2].dispatchEvent("tap");
    await simulate.sleep(0);
    expect(events).toEqual([
      { mark: marks[1], index: 1 },
      { mark: marks[0], index: 0 },
    ]);
  });

  it("marks plain text, tints theme colors and cuts marks at line breaks", () => {
    const w = mount({
      code: "ab\ncd",
      showLineNumbers: true,
      marks: [{ start: 1, end: 4, color: "primary" }],
    });
    expect(texts(w, ".mn-code-mark")).toEqual(["b", "c"]);
    expect(texts(w, ".mn-code-line-text")).toEqual(["ab", "cd"]);
    expect(w.data.codeLines[0][1].style).toMatch(
      /^background-color:rgba\(.*\);background-color:color-mix\(in srgb, var\(--primary-color\) 30%, transparent\)$/,
    );
    w.setData({ showLineNumbers: false, marks: [{ start: 2, end: 3 }] });
    expect(texts(w, ".mn-code-mark")).toEqual(["\n"]);
    expect(w.querySelector(".mn-code")!.dom!.textContent).toBe("ab\ncd");
    w.setData({ marks: [] });
    expect(w.data.codeRuns).toEqual([]);
  });
});
