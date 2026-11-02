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
});
