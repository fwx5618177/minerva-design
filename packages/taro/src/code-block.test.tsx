import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Taro from "@tarojs/taro";
import * as M from "./index";

afterEach(() => vi.restoreAllMocks());

const json = '{\n  "id": 42,\n  "ok": true\n}';
const texts = (container: HTMLElement, selector: string) =>
  [...container.querySelectorAll(selector)].map((node) => node.textContent);

describe("CodeBlock (Taro)", () => {
  it('language="auto" highlights and labels the detected language, with marks', () => {
    const python = "def greet(name):\n    return f'Hello {name}'\n";
    const { container, rerender } = render(
      <M.CodeBlock
        code={python}
        language="auto"
        showLanguage
        copyable={false}
        marks={[{ start: 4, end: 9, id: "m" }]}
      />,
    );
    expect(container.querySelector(".mn-code-language")?.textContent).toBe(
      "PYTHON",
    );
    expect(texts(container, ".mn-code-token-keyword")).toContain("def");
    expect(texts(container, ".mn-code-mark")).toEqual(["greet"]);
    expect(container.querySelector(".mn-code")?.textContent).toBe(python);
    rerender(
      <M.CodeBlock
        code="Just a sentence."
        language="AUTO"
        showLanguage
        copyable={false}
      />,
    );
    expect(container.querySelector(".mn-code-language")?.textContent).toBe(
      "PLAIN",
    );
    expect(container.querySelector("[class*=mn-code-token-]")).toBeNull();
  });
  it("renders plain text without a language", () => {
    const { container } = render(<M.CodeBlock code={json} copyable={false} />);
    expect(container.querySelector("[class*=mn-code-token-]")).toBeNull();
    expect(container.querySelector(".mn-code")?.textContent).toBe(json);
    expect(container.querySelector(".mn-code-toolbar")).toBeNull();
  });

  it("highlights the language into token Text, keeping the text verbatim", () => {
    const { container } = render(
      <M.CodeBlock code={json} language="json" copyable={false} />,
    );
    expect(texts(container, ".mn-code-token-property")).toEqual([
      '"id"',
      '"ok"',
    ]);
    expect(texts(container, ".mn-code-token-number")).toEqual(["42"]);
    expect(container.querySelector(".mn-code")?.textContent).toBe(json);
    // no label without showLanguage
    expect(container.querySelector(".mn-code-language")).toBeNull();
  });

  it("highlight={false} keeps the text plain", () => {
    const { container } = render(
      <M.CodeBlock
        code={json}
        language="json"
        highlight={false}
        copyable={false}
      />,
    );
    expect(container.querySelector("[class*=mn-code-token-]")).toBeNull();
  });

  it("numbers the lines, shows the language and copies the raw text", async () => {
    const copy = vi
      .spyOn(Taro, "setClipboardData")
      .mockResolvedValue({ errMsg: "ok", data: json });
    const { container } = render(
      <M.CodeBlock code={json} language="json" showLineNumbers showLanguage />,
    );
    const numbers = [...container.querySelectorAll(".mn-code-line-number")];
    expect(numbers.map((n) => n.textContent)).toEqual(["1", "2", "3", "4"]);
    expect(numbers[0]).toHaveAttribute("aria-hidden");
    expect(container.querySelector(".mn-code-language")?.textContent).toBe(
      "JSON",
    );
    fireEvent.click(screen.getByRole("button", { name: "Copy code" }));
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Copied" }),
      ).toBeInTheDocument(),
    );
    expect(copy).toHaveBeenCalledWith({ data: json });
  });

  it("marks character ranges over the tokens and reports taps", () => {
    const onMarkClick = vi.fn();
    const marks = [
      { start: 0, end: 9, id: "a", className: "saved" },
      { start: 4, end: 8, color: "#ff000055" },
      { start: 3, end: 3 },
    ];
    const { container } = render(
      <M.CodeBlock
        code={json}
        language="json"
        copyable={false}
        marks={marks}
        onMarkClick={onMarkClick}
      />,
    );
    const list = [...container.querySelectorAll<HTMLElement>(".mn-code-mark")];
    expect(list.map((m) => m.textContent)).toEqual(["{\n  ", '"id"', ":"]);
    expect(list[0]).toHaveClass("saved");
    expect(list[0].style.backgroundColor).toBe("");
    expect(list[1].style.backgroundColor).not.toBe("");
    // the token classes survive inside the mark
    expect(list[1].querySelector(".mn-code-token-property")?.textContent).toBe(
      '"id"',
    );
    expect(container.querySelector(".mn-code")?.textContent).toBe(json);
    fireEvent.click(list[1]);
    expect(onMarkClick).toHaveBeenCalledWith(marks[1]);
    fireEvent.click(list[2]);
    expect(onMarkClick).toHaveBeenLastCalledWith(marks[0]);
  });

  it("marks plain text and cuts marks at line breaks with line numbers", async () => {
    const copy = vi
      .spyOn(Taro, "setClipboardData")
      .mockResolvedValue({ errMsg: "ok", data: "ab\ncd" });
    const { container } = render(
      <M.CodeBlock
        code={"ab\ncd"}
        showLineNumbers
        marks={[{ start: 1, end: 4, color: "primary" }]}
      />,
    );
    const list = [...container.querySelectorAll<HTMLElement>(".mn-code-mark")];
    expect(list.map((m) => m.textContent)).toEqual(["b", "c"]);
    expect(list[0].closest(".mn-code-line")).not.toBe(
      list[1].closest(".mn-code-line"),
    );
    expect(list[0].style.backgroundColor).toMatch(/^rgba\(/);
    fireEvent.click(screen.getByRole("button", { name: "Copy code" }));
    await waitFor(() => expect(copy).toHaveBeenCalledWith({ data: "ab\ncd" }));
  });
});
