// Ported from @novel-isr/ui src/components/Tag/__test__/Tag.test.tsx
import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Tag from "./Tag";
import type { TagVariant } from "./types";

describe("Tag styling hooks and native attributes", () => {
  it("renders children with default size/color hooks and no close button", () => {
    render(<Tag data-testid="tag">JavaScript</Tag>);
    const tag = screen.getByTestId("tag");
    expect(tag).toHaveTextContent("JavaScript");
    expect(tag).toHaveClass("ui-tag", "ui-tag-size-md", "ui-tag-color-gray");
    expect(screen.queryByRole("button")).toBeNull();
  });

  it.each<[TagVariant, string]>([
    ["primary", "brand"],
    ["default", "gray"],
    ["success", "success"],
    ["warning", "warning"],
    ["error", "danger"],
    ["info", "info"],
  ])("maps variant %s to ui-tag-color-%s", (variant, hook) => {
    render(
      <Tag data-testid="tag" variant={variant} size="large">
        x
      </Tag>,
    );
    expect(screen.getByTestId("tag")).toHaveClass(
      `ui-tag-color-${hook}`,
      "ui-tag-size-lg",
    );
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
    expect(screen.getByTestId("tag")).toHaveClass("ui-tag-size-sm");
    const close = screen.getByRole("button", { name: "Close" });
    expect(close).toHaveAttribute("type", "button");
    expect(close).toHaveAttribute("title", "Close");
    expect(close).toHaveClass("ui-tag-close");
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
