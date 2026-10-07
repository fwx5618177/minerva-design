// Ported from @novel-isr/ui src/components/CodeBlock/__test__/CodeBlock.test.tsx
// and the CodeBlock part of src/components/__test__/ResponsiveDataLayout.test.tsx
import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import CodeBlock from "./CodeBlock";

describe("CodeBlock", () => {
  it("exposes a named, keyboard-focusable region for scrolling", async () => {
    const user = userEvent.setup();
    render(
      <>
        <button>Before</button>
        <CodeBlock aria-label="Payload">{"{}"}</CodeBlock>
      </>,
    );
    const region = screen.getByRole("region", { name: "Payload" });
    expect(region.tagName).toBe("PRE");
    expect(region).toHaveClass("codeBlock", "ui-code-block");
    await user.tab();
    await user.tab();
    expect(region).toHaveFocus();
  });

  it("names the region from ariaLabel, aria-labelledby or the localized default", () => {
    const { rerender } = render(<CodeBlock ariaLabel="Config">x</CodeBlock>);
    expect(screen.getByRole("region", { name: "Config" })).toBeInTheDocument();
    rerender(
      <>
        <h2 id="t">Response</h2>
        <CodeBlock aria-labelledby="t">x</CodeBlock>
      </>,
    );
    const region = screen.getByRole("region", { name: "Response" });
    expect(region).not.toHaveAttribute("aria-label");
    rerender(<CodeBlock>x</CodeBlock>);
    expect(screen.getByRole("region", { name: "Code" })).toBeInTheDocument();
  });

  it("preserves whitespace verbatim inside a code element", () => {
    const text = "line 1\n\tindented  spaced\n";
    render(<CodeBlock aria-label="Snippet">{text}</CodeBlock>);
    const code = screen
      .getByRole("region", { name: "Snippet" })
      .querySelector(":scope > code");
    expect(code?.textContent).toBe(text);
  });

  it("merges consumer className and style, letting style override maxHeight", () => {
    const { rerender } = render(
      <CodeBlock
        aria-label="Log"
        className="consumer"
        maxHeight="10rem"
        style={{ color: "red" }}
      >
        x
      </CodeBlock>,
    );
    const pre = screen.getByRole("region", { name: "Log" });
    expect(pre).toHaveClass("ui-code-block", "consumer");
    expect(pre.style.maxHeight).toBe("10rem");
    expect(pre.style.color).toBe("red");
    rerender(
      <CodeBlock
        aria-label="Log"
        maxHeight="10rem"
        style={{ maxHeight: "5rem" }}
      >
        x
      </CodeBlock>,
    );
    expect(pre.style.maxHeight).toBe("5rem");
  });

  it("forwards native attributes without leaking layout props", () => {
    render(
      <CodeBlock
        aria-label="Data"
        id="code"
        data-lang="json"
        wrap={false}
        maxHeight={120}
        tabIndex={-1}
      >
        x
      </CodeBlock>,
    );
    const pre = screen.getByRole("region", { name: "Data" });
    expect(pre).toHaveAttribute("id", "code");
    expect(pre).toHaveAttribute("data-lang", "json");
    expect(pre).toHaveAttribute("tabindex", "-1");
    expect(pre).not.toHaveAttribute("wrap");
    expect(pre).not.toHaveAttribute("maxheight");
  });

  it("renders untrusted text as text with region defaults (responsive data layout)", () => {
    const text = '{\n  "text": "<script>unsafe()</script>"\n}';
    const ref = createRef<HTMLPreElement>();
    const { container, rerender } = render(
      <CodeBlock aria-label="Record" ref={ref}>
        {text}
      </CodeBlock>,
    );
    expect(ref.current?.getAttribute("role")).toBe("region");
    expect(ref.current?.getAttribute("aria-label")).toBe("Record");
    expect(ref.current?.tabIndex).toBe(0);
    expect(ref.current?.style.maxHeight).toBe("24rem");
    expect(container.querySelector("code")?.textContent).toBe(text);
    expect(container.querySelector("script")).toBeNull();
    expect(ref.current?.dataset.wrap).toBe("true");
    rerender(
      <CodeBlock aria-label="Raw" wrap={false} maxHeight={200}>
        {text}
      </CodeBlock>,
    );
    expect(container.querySelector("pre")?.dataset.wrap).toBe("false");
    expect(container.querySelector("pre")?.style.maxHeight).toBe("200px");
  });
});
