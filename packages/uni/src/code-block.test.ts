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

  it('language="auto" detects the language for the tokens and the label', async () => {
    const w = mount(CodeBlock, {
      props: {
        code: json,
        language: "auto",
        showLanguage: true,
        marks: [{ start: 4, end: 8 }],
      },
    });
    expect(w.get(".mn-code-language").text()).toBe("JSON");
    expect(w.get(".mn-code-mark .mn-code-token-property").text()).toBe('"id"');
    expect(w.get(".mn-code").element.textContent).toBe(json);
    await w.setProps({ code: "SELECT id FROM users WHERE id = 1;" });
    expect(w.get(".mn-code-language").text()).toBe("SQL");
    expect(w.find(".mn-code-token-keyword").exists()).toBe(true);
    await w.setProps({ code: "hello", marks: [] });
    expect(w.get(".mn-code-language").text()).toBe("PLAIN");
    expect(w.find("[class*=mn-code-token-]").exists()).toBe(false);
  });

  it("marks character ranges over the tokens and emits mark-click", async () => {
    const marks = [
      { start: 0, end: 9, id: "a", className: "saved" },
      { start: 4, end: 8, color: "#ff000055" },
      { start: 3, end: 3 },
    ];
    const w = mount(CodeBlock, {
      props: { code: json, language: "json", marks },
    });
    const list = w.findAll(".mn-code-mark");
    expect(list.map((m) => m.element.textContent)).toEqual([
      "{\n  ",
      '"id"',
      ":",
    ]);
    expect(list[0].classes()).toContain("saved");
    expect(list[0].attributes("data-mark-id")).toBe("a");
    expect(list[0].attributes("data-mark-index")).toBe("0");
    expect((list[0].element as HTMLElement).style.backgroundColor).toBe("");
    expect(list[1].find(".mn-code-token-property").text()).toBe('"id"');
    expect(w.get(".mn-code").element.textContent).toBe(json);
    await list[1].trigger("click");
    await list[2].trigger("click");
    expect(w.emitted("mark-click")).toEqual([[marks[1]], [marks[0]]]);
  });

  it("marks plain text, tints theme colors and cuts marks at line breaks", async () => {
    const w = mount(CodeBlock, {
      props: {
        code: "ab\ncd",
        showLineNumbers: true,
        marks: [{ start: 1, end: 4, color: "primary" }],
      },
    });
    const list = w.findAll(".mn-code-mark");
    expect(list.map((m) => m.text())).toEqual(["b", "c"]);
    expect(
      w.findAll(".mn-code-line-text").map((n) => n.element.textContent),
    ).toEqual(["ab", "cd"]);
    expect((list[0].element as HTMLElement).style.backgroundColor).toMatch(
      /^rgba\(/,
    );
    expect((list[0].element as HTMLElement).style.backgroundColor).not.toBe(
      "rgba(250, 204, 21, 0.35)",
    );
    const plain = mount(CodeBlock, {
      props: { code: "abc", marks: [{ start: 1, end: 2 }] },
    });
    expect(plain.get(".mn-code-mark").text()).toBe("b");
    expect(plain.get(".mn-code").element.textContent).toBe("abc");
  });
});
