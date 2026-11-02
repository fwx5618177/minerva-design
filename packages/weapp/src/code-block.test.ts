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
    expect(w.data.codeTokens).toEqual([]);
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
});
