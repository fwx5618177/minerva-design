import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import CodeBlock from "./CodeBlock.vue";

const json = '{\n  "id": 42,\n  "ok": true\n}';

describe("CodeBlock (uni)", () => {
  it("renders plain text without a language", () => {
    const w = mount(CodeBlock, { props: { code: json } });
    expect(w.find("[class*=mn-code-token-]").exists()).toBe(false);
    expect(w.get(".mn-code").element.textContent).toBe(json);
    expect(w.find(".mn-code-header").exists()).toBe(false);
  });

  it("highlights the language into token text, keeping the text verbatim", () => {
    const w = mount(CodeBlock, { props: { code: json, language: "json" } });
    expect(w.findAll(".mn-code-token-property").map((n) => n.text())).toEqual([
      '"id"',
      '"ok"',
    ]);
    expect(w.get(".mn-code-token-number").text()).toBe("42");
    expect(w.get(".mn-code").element.textContent).toBe(json);
    expect(w.find(".mn-code-language").exists()).toBe(false);
  });

  it("highlight=false keeps the text plain and never parses HTML", () => {
    const w = mount(CodeBlock, {
      props: { code: "<img src=x>", language: "html", highlight: false },
    });
    expect(w.find("[class*=mn-code-token-]").exists()).toBe(false);
    expect(w.find("img").exists()).toBe(false);
    const h = mount(CodeBlock, {
      props: { code: "<img src=x>", language: "html" },
    });
    expect(h.find("img").exists()).toBe(false);
    expect(h.get(".mn-code-token-tag").text()).toBe("img");
  });

  it("numbers the lines, shows the language and copies the raw text", async () => {
    const original = uni;
    const setClipboardData = vi.fn((options) => options.success());
    vi.stubGlobal("uni", { ...original, setClipboardData });
    try {
      const w = mount(CodeBlock, {
        props: {
          code: json,
          language: "json",
          showLineNumbers: true,
          showLanguage: true,
          copyable: true,
        },
      });
      const numbers = w.findAll(".mn-code-line-number");
      expect(numbers.map((n) => n.text())).toEqual(["1", "2", "3", "4"]);
      expect(numbers[0].attributes("aria-hidden")).toBe("true");
      expect(
        w.findAll(".mn-code-line-text").map((n) => n.element.textContent),
      ).toEqual(json.split("\n"));
      expect(w.get(".mn-code-language").text()).toBe("JSON");
      await w.find("button").trigger("click");
      expect(setClipboardData.mock.calls[0][0].data).toBe(json);
    } finally {
      vi.stubGlobal("uni", original);
    }
  });
});
