import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { StyleSheet } from "react-native";
import { describe, expect, it, vi } from "vitest";
import { resolveTokens } from "@minerva/core";
import { hostElements } from "../../../test/queries";
import { CodeBlock } from "./index";

const light = resolveTokens({ mode: "light" });
const json = '{\n  "id": 42,\n  "ok": true\n}';

/** Nested Text of a token (colored with its code token). */
const coloredTexts = (type: string) =>
  hostElements()
    .filter(
      (node) =>
        node.type === "Text" &&
        StyleSheet.flatten(node.props.style)?.color ===
          light.colors[`code-token-${type}-color`],
    )
    .map((node) => node.children.join(""));

describe("CodeBlock (native)", () => {
  it("renders plain text without a language", async () => {
    await render(<CodeBlock>{json}</CodeBlock>);
    expect(screen.getByText(json)).toBeTruthy();
    expect(coloredTexts("property")).toEqual([]);
  });

  it("highlights the language with nested colored Text", async () => {
    await render(<CodeBlock language="js">{'const a = "x"; // c'}</CodeBlock>);
    // keyword and operator share a color, as do number / boolean / property
    expect(coloredTexts("keyword")).toEqual(["const", "="]);
    expect(coloredTexts("string")).toEqual(['"x"']);
    expect(coloredTexts("comment")).toEqual(["// c"]);
  });

  it("highlight={false} keeps the text plain", async () => {
    await render(
      <CodeBlock language="json" highlight={false}>
        {json}
      </CodeBlock>,
    );
    expect(coloredTexts("property")).toEqual([]);
    expect(screen.getByText(json)).toBeTruthy();
  });

  it("numbers the lines (hidden from accessibility), shows the language, copies the raw text", async () => {
    const copy = vi.fn();
    await render(
      <CodeBlock
        language="json"
        showLineNumbers
        showLanguage
        copyable
        copyText={copy}
      >
        {json}
      </CodeBlock>,
    );
    const numbers = screen.getAllByTestId("code-block-line-number", {
      includeHiddenElements: true,
    });
    expect(numbers.map((n) => n.props.children)).toEqual([1, 2, 3, 4]);
    expect(numbers[0].props.accessibilityElementsHidden).toBe(true);
    const label = screen.getByTestId("code-block-language", {
      includeHiddenElements: true,
    });
    expect(label.props.children).toBe("JSON");
    await act(async () => {
      await fireEvent.press(screen.getByRole("button", { name: "Copy code" }));
    });
    expect(copy).toHaveBeenCalledWith(json);
  });

  it('language="auto" detects the language for the tokens and the label', async () => {
    const label = () =>
      screen.getByTestId("code-block-language", {
        includeHiddenElements: true,
      }).props.children;
    const { rerender } = await render(
      <CodeBlock language="auto" showLanguage marks={[{ start: 4, end: 8 }]}>
        {json}
      </CodeBlock>,
    );
    expect(label()).toBe("JSON");
    // property / number / boolean share a color
    expect(coloredTexts("property")).toEqual(['"id"', "42", '"ok"', "true"]);
    expect(screen.getByTestId("code-block-mark-0")).toBeTruthy();
    await rerender(
      <CodeBlock language="Auto" showLanguage>
        {"SELECT id FROM users WHERE id = 1;"}
      </CodeBlock>,
    );
    expect(label()).toBe("SQL");
    expect(coloredTexts("keyword")).toContain("SELECT");
    await rerender(
      <CodeBlock language="auto" showLanguage>
        {"hello"}
      </CodeBlock>,
    );
    expect(label()).toBe("PLAIN");
    expect(screen.getByText("hello")).toBeTruthy();
  });

  it("marks character ranges over the tokens and reports presses", async () => {
    const onMarkClick = vi.fn();
    const marks = [
      { start: 0, end: 9, id: "a" },
      { start: 4, end: 8, color: "primary" },
      { start: 3, end: 3 },
    ];
    await render(
      <CodeBlock language="json" marks={marks} onMarkClick={onMarkClick}>
        {json}
      </CodeBlock>,
    );
    const outer = screen.getAllByTestId("code-block-mark-0");
    const inner = screen.getByTestId("code-block-mark-1");
    expect(outer).toHaveLength(2);
    expect(StyleSheet.flatten(outer[0].props.style).backgroundColor).toBe(
      "rgba(250, 204, 21, 0.35)",
    );
    const tint = StyleSheet.flatten(inner.props.style).backgroundColor;
    expect(tint).toMatch(/^rgba\(/);
    expect(tint).not.toBe("rgba(250, 204, 21, 0.35)");
    // the token color survives inside the mark
    expect(coloredTexts("property")).toContain('"id"');
    await act(async () => {
      fireEvent.press(inner);
    });
    expect(onMarkClick).toHaveBeenCalledWith(marks[1]);
  });

  it("cuts marks at line breaks with line numbers and copies the raw text", async () => {
    const copy = vi.fn();
    await render(
      <CodeBlock
        showLineNumbers
        copyable
        copyText={copy}
        marks={[{ start: 1, end: 4, color: "#ff000055" }]}
      >
        {"ab\ncd"}
      </CodeBlock>,
    );
    const parts = screen.getAllByTestId("code-block-mark-0");
    expect(parts.map((p) => p.props.children.flat().join(""))).toEqual([
      "b",
      "c",
    ]);
    expect(StyleSheet.flatten(parts[0].props.style).backgroundColor).toBe(
      "#ff000055",
    );
    await act(async () => {
      await fireEvent.press(screen.getByRole("button", { name: "Copy code" }));
    });
    expect(copy).toHaveBeenCalledWith("ab\ncd");
  });
});
