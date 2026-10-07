import { createRef } from "react";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { compile } from "sass";
import { describe, expect, it } from "vitest";
import Badge from "./Badge";
import styles from "./badge.module.scss";
import type { BadgeAppearance, BadgeProps } from "./types";

describe("Badge styles", () => {
  const css = compile(join(import.meta.dirname, "badge.module.scss")).css;

  it("uses the palette-aware inverse foreground for every solid color", () => {
    for (const name of ["primary", "success", "warning", "danger", "neutral"]) {
      const rule = css.match(new RegExp(`\\.badge\\.${name}\\s*\\{[^}]+\\}`));
      expect(rule?.[0]).toContain("color: var(--text-inverse-color)");
    }
    expect(css).not.toMatch(/#fff(?:fff)?\b/i);
  });

  it("tints subtle badges and borders outline badges with the role tokens", () => {
    expect(css).toMatch(
      /\.badge\.success\.subtle\s*\{[^}]*background-color: var\(--success-color-subtle\)/,
    );
    expect(css).toMatch(
      /\.badge\.error\.outline\s*\{[^}]*border-color: var\(--danger-color\)/,
    );
  });
});

describe("Badge appearance and native attributes", () => {
  it("renders a solid primary span by default", () => {
    render(<Badge>NEW</Badge>);
    const badge = screen.getByText("NEW");
    expect(badge.tagName).toBe("SPAN");
    expect(badge).toHaveClass(styles.badge, styles.primary, styles.medium);
    expect(badge).not.toHaveClass(styles.subtle, styles.outline);
  });

  it.each<[BadgeAppearance | "dot", NonNullable<BadgeProps["variant"]>]>([
    ["solid", "success"],
    ["outline", "warning"],
    ["dot", "danger"],
    ["subtle", "neutral"],
    ["subtle", "error"],
  ])("applies appearance %s and color %s", (appearance, variant) => {
    render(
      appearance === "dot" ? (
        <Badge variant={variant} dot data-testid="b" />
      ) : (
        <Badge variant={variant} appearance={appearance} data-testid="b">
          x
        </Badge>
      ),
    );
    const badge = screen.getByTestId("b");
    expect(badge).toHaveClass(styles[variant]);
    if (appearance !== "solid") {
      expect(badge).toHaveClass(styles[appearance]);
    }
  });

  it("renders rich content standalone", () => {
    render(
      <Badge
        content={
          <>
            <i data-testid="icon" /> Beta
          </>
        }
        data-testid="b"
      />,
    );
    const badge = screen.getByTestId("b");
    expect(badge).toContainElement(screen.getByTestId("icon"));
    expect(badge).toHaveClass("standalone");
  });

  it("forwards ref, className, role and native attributes without leaking style props", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Badge
        ref={ref}
        className="consumer"
        ariaLabel="3 unread"
        dot
        role="status"
        title="unread"
        style={{ margin: 2 }}
      />,
    );
    const badge = screen.getByRole("status", { name: "3 unread" });
    expect(ref.current).toBe(badge);
    expect(badge).toHaveClass(styles.badge, "consumer");
    expect(badge).toHaveAttribute("title", "unread");
    expect(badge).toHaveStyle({ margin: "2px" });
    expect(badge).not.toHaveAttribute("variant");
    expect(badge).not.toHaveAttribute("appearance");
  });

  it("lets the role be overridden", () => {
    render(<Badge role="presentation">Tag</Badge>);
    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.getByText("Tag")).toHaveAttribute("role", "presentation");
  });
});
