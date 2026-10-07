// Ported from @novel-isr/ui src/components/EmptyState/__test__/EmptyState.test.tsx
// and src/components/__test__/EmptyState.layout.test.ts
import { createRef } from "react";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { compile } from "sass";
import { describe, expect, it, vi } from "vitest";
import Empty from "./Empty";

describe("Empty (title, actions, sizes)", () => {
  it("renders a status region with only the provided title (minimal usage)", () => {
    render(
      <Empty size="medium" title="No data" icon={null} description={null} />,
    );
    const status = screen.getByRole("status", { name: "No data" });
    expect(status).toHaveClass(
      "ui-empty-state",
      "ui-empty-state-size-default",
      "sized",
      "size-medium",
    );
    expect(status.querySelector(".ui-empty-state-title")).toHaveTextContent(
      "No data",
    );
    expect(status.querySelector(".ui-empty-state-icon")).toBeNull();
    expect(status.querySelector(".ui-empty-state-description")).toBeNull();
    expect(status.querySelector(".ui-empty-state-actions")).toBeNull();
    expect(status).not.toHaveAttribute("title");
    expect(status).not.toHaveAttribute("aria-describedby");
  });

  it("renders icon, description, and both actions in order", async () => {
    const user = userEvent.setup();
    const onPrimary = vi.fn();
    render(
      <Empty
        size="small"
        icon={<svg data-testid="icon" />}
        title="No reviews"
        description="Be the first"
        action={
          <button type="button" onClick={onPrimary}>
            Write
          </button>
        }
        secondaryAction={<button type="button">Browse</button>}
      />,
    );
    const status = screen.getByRole("status", { name: "No reviews" });
    expect(status).toHaveAccessibleDescription("Be the first");
    expect(status).toHaveClass("ui-empty-state-size-compact");
    expect(screen.getByTestId("icon").parentElement).toHaveClass(
      "ui-empty-state-icon",
    );
    expect(
      status.querySelector(".ui-empty-state-description"),
    ).toHaveTextContent("Be the first");
    const buttons = screen.getAllByRole("button");
    expect(buttons.map((b) => b.textContent)).toEqual(["Write", "Browse"]);
    expect(buttons[0]!.parentElement).toHaveClass("ui-empty-state-actions");
    await user.click(buttons[0]!);
    expect(onPrimary).toHaveBeenCalledTimes(1);
  });

  it("renders the actions container when only a secondary action is given", () => {
    render(<Empty size="large" secondaryAction={<a href="/x">Back</a>} />);
    const link = screen.getByRole("link", { name: "Back" });
    expect(link.parentElement).toHaveClass("ui-empty-state-actions");
    expect(screen.getByRole("status")).toHaveClass("ui-empty-state-size-lg");
  });

  it("forwards ref and native attributes, allowing role override", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Empty
        ref={ref}
        role="region"
        aria-label="Empty list"
        className="x"
        data-k="v"
        title="t"
      />,
    );
    const region = screen.getByRole("region", { name: "Empty list" });
    expect(ref.current).toBe(region);
    expect(region).toHaveClass("x", "ui-empty-state");
    expect(region).toHaveAttribute("data-k", "v");
  });

  it("keeps the classic layout (no size hook) and default icon when size and icon are omitted", () => {
    render(<Empty />);
    const status = screen.getByRole("status");
    expect(status).toHaveClass("ui-empty-state");
    expect(status.className).not.toMatch(/ui-empty-state-size-|sized/);
    expect(status.querySelector(".ui-empty-state-icon svg")).not.toBeNull();
    expect(
      status.querySelector(".ui-empty-state-description"),
    ).toHaveTextContent("No Data");
  });

  it("hides the icon with icon={false}", () => {
    render(<Empty icon={false} />);
    expect(document.querySelector(".ui-empty-state-icon")).toBeNull();
  });
});

describe("Empty layout styles", () => {
  const css = compile(join(import.meta.dirname, "empty.module.scss")).css;

  it("bounds shared empty state content and wraps unbroken error descriptions", () => {
    expect(css).toMatch(/\.empty\s*\{[^}]*min-width:\s*0\s*;/);
    expect(css).toMatch(/\.empty\s*\{[^}]*max-width:\s*100%\s*;/);
    expect(css).toMatch(/\.empty\s*\{[^}]*overflow-wrap:\s*anywhere\s*;/);
  });

  it("bounds and wraps action labels instead of expanding narrow error pages", () => {
    expect(css).toMatch(/\.empty \.actions\s*\{[^}]*max-width:\s*100%\s*;/);
    expect(css).toMatch(
      /\.empty \.actions > \*\s*\{[^}]*max-width:\s*100%\s*;/,
    );
    expect(css).toMatch(
      /\.empty \.actions :global\(\.ui-button-label\)\s*\{[^}]*white-space:\s*normal\s*;/,
    );
  });

  it("ships the novel size paddings", () => {
    expect(css).toMatch(
      /\.empty\.size-small\s*\{[^}]*padding:\s*var\(--space-4\) var\(--space-3\)/,
    );
    expect(css).toMatch(
      /\.empty\.size-medium\s*\{[^}]*padding:\s*var\(--space-8\) var\(--space-4\)/,
    );
    expect(css).toMatch(
      /\.empty\.size-large\s*\{[^}]*padding:\s*var\(--space-12\) var\(--space-6\)/,
    );
  });
});
