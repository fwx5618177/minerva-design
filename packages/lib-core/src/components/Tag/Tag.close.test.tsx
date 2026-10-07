import { createRef } from "react";
import { join } from "node:path";
import { compile } from "sass";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Tag from "./Tag";
import type { TagProps } from "./types";

describe("Tag colors, close button and native attributes", () => {
  it("renders children with the default color/variant/size and no close button", () => {
    render(<Tag data-testid="tag">JavaScript</Tag>);
    const tag = screen.getByTestId("tag");
    expect(tag).toHaveTextContent("JavaScript");
    expect(tag).toHaveClass("tag", "neutral", "subtle", "medium");
    expect(tag).toHaveAttribute("data-component", "tag");
    expect(screen.queryByRole("button")).toBeNull();
  });

  it.each<NonNullable<TagProps["color"]>>([
    "primary",
    "neutral",
    "success",
    "warning",
    "danger",
    "info",
  ])("applies the %s color class", (color) => {
    render(
      <Tag data-testid="tag" color={color} size="large">
        x
      </Tag>,
    );
    expect(screen.getByTestId("tag")).toHaveClass(color, "large");
  });

  it("renders a labelled close button that calls onClose without bubbling the click", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const onRootClick = vi.fn();
    render(
      <div onClick={onRootClick} role="presentation">
        <Tag closable onClose={onClose} size="small" data-testid="tag">
          v2.0
        </Tag>
      </div>,
    );
    expect(screen.getByTestId("tag")).toHaveClass("small");
    const close = screen.getByRole("button", { name: "Close" });
    expect(close).toHaveAttribute("type", "button");
    expect(close).toHaveAttribute("title", "Close");
    expect(close).toHaveClass("closeIcon");
    await user.click(close);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onRootClick).not.toHaveBeenCalled();
  });

  it("activates the close button via keyboard and supports a custom label", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Tag closable onClose={onClose} closeLabel="Remove React">
        React
      </Tag>,
    );
    await user.tab();
    const close = screen.getByRole("button", { name: "Remove React" });
    expect(close).toHaveFocus();
    expect(close).toHaveAttribute("title", "Remove React");
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it("disables the close button when disabled", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Tag closable onClose={onClose} disabled>
        Locked
      </Tag>,
    );
    const close = screen.getByRole("button", { name: "Close" });
    expect(close).toBeDisabled();
    await user.click(close);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("forwards ref and native attributes without leaking custom props", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Tag
        ref={ref}
        id="t"
        className="c"
        aria-label="Tag label"
        title="hint"
        disabled
        closeLabel="x"
      >
        x
      </Tag>,
    );
    const tag = ref.current!;
    expect(tag).toHaveAttribute("id", "t");
    expect(tag).toHaveClass("c");
    expect(tag).toHaveAttribute("aria-label", "Tag label");
    expect(tag).toHaveAttribute("title", "hint");
    expect(tag).not.toHaveAttribute("disabled");
    expect(tag).not.toHaveAttribute("closeLabel");
  });
});

describe("Tag styles", () => {
  const css = compile(join(import.meta.dirname, "tag.module.scss")).css;

  it("reads the per-color custom properties with token fallbacks", () => {
    expect(css).toContain(
      "background-color: var(--tag-danger-bg, var(--danger-color-subtle))",
    );
    expect(css).toContain("color: var(--tag-neutral-text, var(--text-color))");
  });

  it("fills solid tags and borders outline tags", () => {
    expect(css).toMatch(
      /\.tag\.success\.solid\s*\{[^}]*background-color: var\(--success-color\)/,
    );
    expect(css).toMatch(
      /\.tag\.success\.outline\s*\{[^}]*background-color: transparent;[^}]*border: 1px solid var\(--success-color\)/,
    );
    expect(css).toMatch(
      /\.tag\.neutral\.outline\s*\{[^}]*background-color: transparent;[^}]*border: 1px solid var\(--border-strong-color\)/,
    );
    expect(css).not.toMatch(/\.tag\.(default|bordered)\b/);
  });
});
