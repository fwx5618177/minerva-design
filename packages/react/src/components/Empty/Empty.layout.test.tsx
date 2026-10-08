import { createRef } from "react";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { compile } from "sass";
import { describe, expect, it, vi } from "vitest";
import Empty from "./Empty";
import styles from "./empty.module.scss";

describe("Empty (title, actions, sizes)", () => {
  it("renders a status region with only the provided title (minimal usage)", () => {
    render(
      <Empty size="medium" title="No data" icon={null} description={null} />,
    );
    const status = screen.getByRole("status", { name: "No data" });
    expect(status).toHaveClass(
      styles.empty,
      styles.sized,
      styles["size-medium"],
    );
    expect(status.querySelector(`.${styles.title}`)).toHaveTextContent(
      "No data",
    );
    expect(status.querySelector(`.${styles.iconWrapper}`)).toBeNull();
    expect(status.querySelector(`.${styles.description}`)).toBeNull();
    expect(status.querySelector(`.${styles.actions}`)).toBeNull();
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
    expect(status).toHaveClass(styles["size-small"]);
    expect(screen.getByTestId("icon").parentElement).toHaveClass(
      styles.iconWrapper,
    );
    expect(status.querySelector(`.${styles.description}`)).toHaveTextContent(
      "Be the first",
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons.map((b) => b.textContent)).toEqual(["Write", "Browse"]);
    expect(buttons[0]!.parentElement).toHaveClass(styles.actions);
    await user.click(buttons[0]!);
    expect(onPrimary).toHaveBeenCalledTimes(1);
  });

  it("renders the actions container when only a secondary action is given", () => {
    render(<Empty size="large" secondaryAction={<a href="/x">Back</a>} />);
    const link = screen.getByRole("link", { name: "Back" });
    expect(link.parentElement).toHaveClass(styles.actions);
    expect(screen.getByRole("status")).toHaveClass(styles["size-large"]);
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
    expect(region).toHaveClass("x", styles.empty);
    expect(region).toHaveAttribute("data-k", "v");
  });

  it("keeps the classic layout (no size class) and default icon when size and icon are omitted", () => {
    render(<Empty />);
    const status = screen.getByRole("status");
    expect(status).toHaveClass(styles.empty);
    expect(status.className).not.toMatch(/size-|sized/);
    expect(status.querySelector(`.${styles.iconWrapper} svg`)).not.toBeNull();
    expect(status.querySelector(`.${styles.description}`)).toHaveTextContent(
      "No Data",
    );
  });

  it("hides the icon with icon={false}", () => {
    render(<Empty icon={false} />);
    expect(document.querySelector(`.${styles.iconWrapper}`)).toBeNull();
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
      /\.empty \.actions\s*\{[^}]*--button-label-white-space:\s*normal\s*;/,
    );
  });

  it("applies the padding of each size", () => {
    expect(css).toMatch(
      /\.empty\.size-small\s*\{[^}]*padding:\s*var\(--empty-padding,\s*var\(--space-4\) var\(--space-3\)\)/,
    );
    expect(css).toMatch(
      /\.empty\.size-medium\s*\{[^}]*padding:\s*var\(--empty-padding,\s*var\(--space-8\) var\(--space-4\)\)/,
    );
    expect(css).toMatch(
      /\.empty\.size-large\s*\{[^}]*padding:\s*var\(--empty-padding,\s*var\(--space-12\) var\(--space-6\)\)/,
    );
  });
});
