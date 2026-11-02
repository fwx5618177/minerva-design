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
