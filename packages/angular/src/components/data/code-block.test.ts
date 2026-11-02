import { Component, signal } from "@angular/core";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, settle } from "../../testing";
import { MnCodeBlock } from ".";

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

const code = () => document.querySelector<HTMLElement>("mn-code-block code")!;
const json = '{\n  "id": 42,\n  "ok": true\n}';

describe("MnCodeBlock", () => {
  it("renders plain text by default (language text)", async () => {
    @Component({
      imports: [MnCodeBlock],
      template: `<mn-code-block [code]="code" />`,
    })
    class Host {
      code = json;
    }
    await render(Host);
    expect(code().textContent).toBe(json);
    expect(code().querySelector("span")).toBeNull();
    expect(document.querySelector("[data-part=language]")).toBeNull();
  });

  it("highlights the language into token spans, never parsing HTML", async () => {
    @Component({
      imports: [MnCodeBlock],
      template: `<mn-code-block
        [code]="code()"
        [language]="language()"
        [highlight]="highlight()"
      />`,
    })
    class Host {
      code = signal(json);
      language = signal("json");
      highlight = signal(true);
    }
    const fixture = await render(Host);
    expect(code().textContent).toBe(json);
    expect(code().getAttribute("data-language")).toBe("json");
    expect(
      [...code().querySelectorAll(".token-property")].map((s) => s.textContent),
    ).toEqual(['"id"', '"ok"']);
    expect(code().querySelector(".token-number")?.textContent).toBe("42");
    const host = fixture.componentInstance as Host;
    host.code.set('<img src=x onerror="alert(1)">');
    host.language.set("html");
    await settle(fixture);
    expect(code().querySelector("img")).toBeNull();
    expect(code().querySelector(".token-tag")?.textContent).toBe("img");
    host.highlight.set(false);
    await settle(fixture);
    expect(code().querySelector("span")).toBeNull();
    expect(code().textContent).toBe('<img src=x onerror="alert(1)">');
  });

  it("numbers the lines, shows the language and copies the raw text", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
    @Component({
      imports: [MnCodeBlock],
      template: `<mn-code-block
        [code]="code"
        language="js"
        showLineNumbers
        showLanguage
        copyable
      />`,
    })
    class Host {
      code = "a\nb\n\nc\n";
    }
    const fixture = await render(Host);
    const numbers = [...document.querySelectorAll("[data-part=line-number]")];
    expect(numbers.map((n) => n.getAttribute("data-line"))).toEqual([
      "1",
      "2",
      "3",
      "4",
    ]);
    for (const n of numbers) expect(n.getAttribute("aria-hidden")).toBe("true");
    expect(code().textContent).toBe("a\nb\n\nc\n");
    expect(code().style.getPropertyValue("--code-line-digits")).toBe("2");
    const label = document.querySelector("[data-part=language]")!;
    expect(label.textContent).toBe("JS");
    expect(label.getAttribute("aria-hidden")).toBe("true");
    document.querySelector<HTMLButtonElement>("mn-code-block button")!.click();
    await settle(fixture);
    expect(writeText).toHaveBeenCalledWith("a\nb\n\nc\n");
  });
});

describe('MnCodeBlock language="auto"', () => {
  const python = "def greet(name):\n    return f'Hello {name}'\n";

  it("highlights, labels and tags the detected language, following the code", async () => {
    @Component({
      imports: [MnCodeBlock],
      template: `<mn-code-block
        [code]="code()"
        language="auto"
        showLanguage
      />`,
    })
    class Host {
      code = signal(python);
    }
    const fixture = await render(Host);
    expect(code().getAttribute("data-language")).toBe("python");
    expect(code().className).toBe("language-python");
    expect(document.querySelector("[data-part=language]")?.textContent).toBe(
      "PYTHON",
    );
    expect(
      [...code().querySelectorAll(".token-keyword")].map((k) => k.textContent),
    ).toContain("def");
    expect(code().textContent).toBe(python);
    (fixture.componentInstance as Host).code.set("Just a sentence.");
    await settle(fixture);
    expect(code().getAttribute("data-language")).toBe("plain");
    expect(code().querySelector("span")).toBeNull();
  });

  it("lays marks over the detected highlighting", async () => {
    @Component({
      imports: [MnCodeBlock],
      template: `<mn-code-block
        [code]="code"
        language="AUTO"
        [marks]="marks"
      />`,
    })
    class Host {
      code = python;
      marks = [{ start: 4, end: 9, id: "m" }];
    }
    await render(Host);
    const mark = document.querySelector("mn-code-block mark")!;
    expect(mark.textContent).toBe("greet");
    expect(mark.getAttribute("data-mark-id")).toBe("m");
    expect(code().querySelector(".token-keyword")?.textContent).toBe("def");
  });
});

describe("MnCodeBlock marks", () => {
  const marks = () => [
    ...document.querySelectorAll<HTMLElement>("mn-code-block mark"),
  ];

  it("wraps the ranges in marks over the highlighted tokens", async () => {
    @Component({
      imports: [MnCodeBlock],
      template: `<mn-code-block
        [code]="code"
        language="js"
        [marks]="marks()"
      />`,
    })
    class Host {
      code = 'const a = "hi";';
      marks = signal([
        { start: 3, end: 12, id: "n1", title: "Note", className: "saved" },
      ]);
    }
    const fixture = await render(Host);
    expect(marks()).toHaveLength(1);
    const [mark] = marks();
    expect(mark.textContent).toBe('st a = "h');
    expect(mark.getAttribute("data-part")).toBe("code-mark");
    expect(mark.getAttribute("data-mark-id")).toBe("n1");
    expect(mark.getAttribute("data-mark-index")).toBe("0");
    expect(mark.getAttribute("title")).toBe("Note");
    expect(mark.className).toBe("mark saved");
    expect(mark.querySelector(".token-keyword")?.textContent).toBe("st");
    expect(mark.querySelector(".token-string")?.textContent).toBe('"h');
    expect(code().textContent).toBe('const a = "hi";');
    (fixture.componentInstance as Host).marks.set([]);
    await settle(fixture);
    expect(marks()).toHaveLength(0);
    expect(code().textContent).toBe('const a = "hi";');
  });

  it("colors and overlaps marks, cut at line breaks with line numbers", async () => {
    @Component({
      imports: [MnCodeBlock],
      template: `<mn-code-block
        [code]="code"
        showLineNumbers
        [marks]="marks"
      />`,
    })
    class Host {
      code = "abc\ndef\n";
      marks = [
        { start: 1, end: 6, color: "success" },
        { start: 2, end: 3, color: "#f0f" },
        { start: 7, end: 7 },
      ];
    }
    await render(Host);
    const list = marks();
    expect(list.map((m) => m.textContent)).toEqual(["b", "c", "de"]);
    expect(list.map((m) => m.getAttribute("data-mark-index"))).toEqual([
      "0",
      "1",
      "0",
    ]);
    expect(list[0].getAttribute("data-mark-color")).toBe("success");
    expect(list[0].style.getPropertyValue("--code-mark-bg")).toContain(
      "var(--success-color)",
    );
    expect(list[1].hasAttribute("data-mark-color")).toBe(false);
    expect(list[1].style.getPropertyValue("--code-mark-bg")).toBe("#f0f");
    expect(list[2].closest(".line")).not.toBe(list[0].closest(".line"));
    expect(document.querySelectorAll("[data-part=line-number]").length).toBe(2);
    expect(code().textContent).toBe("abc\ndef\n");
  });

  it("emits markClick and maps a selection to offsets", async () => {
    @Component({
      imports: [MnCodeBlock],
      template: `<mn-code-block
        code="abcdef"
        clickableMarks
        [marks]="marks"
        (markClick)="clicked($event)"
      />`,
    })
    class Host {
      marks = [
        { start: 0, end: 4, id: "a" },
        { start: 1, end: 2, id: "b" },
      ];
      clicked = vi.fn();
    }
    const fixture = await render(Host);
    const host = fixture.componentInstance as Host;
    expect(marks()[0].classList).toContain("markClickable");
    marks()[1].click();
    expect(host.clicked).toHaveBeenCalledTimes(1);
    const payload = host.clicked.mock.calls[0][0];
    expect(payload.mark).toBe(host.marks[1]);
    expect(payload.event).toBeInstanceOf(MouseEvent);
    code().click();
    expect(host.clicked).toHaveBeenCalledTimes(1);

    const block = fixture.debugElement.children[0]
      .componentInstance as MnCodeBlock;
    const text = (el: Element) =>
      [...el.childNodes].find((n) => n.nodeType === Node.TEXT_NODE)!;
    const range = document.createRange();
    range.setStart(text(marks()[1]), 0);
    range.setEnd(text(marks()[2]), 1);
    expect(block.getSelectionRange(range)).toEqual({
      start: 1,
      end: 3,
      text: "bc",
    });
    expect(block.getSelectionRange(null)).toBeNull();
  });
});
