import { createRef, type CSSProperties } from "react";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { compile } from "sass";
import { describe, expect, it } from "vitest";
import Badge from "./Badge";
import styles from "./badge.module.scss";
import type { BadgeProps } from "./types";

type BadgeColor = NonNullable<BadgeProps["color"]>;
type BadgeVariant = NonNullable<BadgeProps["variant"]>;

describe("Badge styles", () => {
  const css = compile(join(import.meta.dirname, "badge.module.scss")).css;

  it("uses the palette-aware inverse foreground for every solid color", () => {
    for (const name of ["primary", "success", "warning", "danger", "info"]) {
      const rule = css.match(new RegExp(`\\.badge\\.${name}\\s*\\{[^}]+\\}`));
      expect(rule?.[0]).toContain(`--_badge-bg: var(--${name}-color)`);
      expect(rule?.[0]).toContain("--_badge-fg: var(--text-inverse-color)");
    }
    expect(css).toMatch(
      /\.badge\.neutral\s*\{[^}]*--_badge-fg: var\(--text-inverse-color\)/,
    );
    expect(css).not.toMatch(/#fff(?:fff)?\b/i);
  });

  it("tints subtle badges and borders outline badges with the role tokens", () => {
    expect(css).toMatch(
      /\.badge\.success\.subtle\s*\{[^}]*--_badge-bg: var\(--success-color-subtle\)/,
    );
    expect(css).toMatch(
      /\.badge\.danger\.outline\s*\{[^}]*--_badge-border: var\(--danger-color\)/,
    );
  });

  it("exposes public CSS custom properties to override the colors", () => {
    expect(css).toContain(
      "background-color: var(--badge-bg, var(--_badge-bg))",
    );
    expect(css).toContain("color: var(--badge-fg, var(--_badge-fg))");
    expect(css).toContain(
      "border: 1px solid var(--badge-border, var(--_badge-border))",
    );
  });

  it("has no styles for the removed colors", () => {
    for (const name of ["secondary", "light", "dark"]) {
      expect(css).not.toMatch(new RegExp(`\\.badge\\.${name}\\b`));
    }
  });
});

describe("Badge color, variant and native attributes", () => {
  it("renders a solid primary span by default", () => {
    render(<Badge>NEW</Badge>);
    const badge = screen.getByText("NEW");
    expect(badge.tagName).toBe("SPAN");
    expect(badge).toHaveClass(
      styles.badge,
      styles.primary,
      styles.solid,
      styles.medium,
    );
    expect(badge).not.toHaveClass(styles.subtle, styles.outline);
  });

  it.each<[BadgeVariant | "dot", BadgeColor]>([
    ["solid", "success"],
    ["outline", "warning"],
    ["dot", "danger"],
    ["subtle", "neutral"],
    ["subtle", "info"],
    ["outline", "primary"],
  ])("applies variant %s and color %s", (variant, color) => {
    render(
      variant === "dot" ? (
        <Badge color={color} dot data-testid="b" />
      ) : (
        <Badge color={color} variant={variant} data-testid="b">
          x
        </Badge>
      ),
    );
    const badge = screen.getByTestId("b");
    expect(badge).toHaveClass(styles[color]);
    if (variant !== "dot") {
      expect(badge).toHaveClass(styles[variant]);
    }
  });

  it("lets consumers override the colors with CSS custom properties", () => {
    render(
      <Badge
        data-testid="b"
        style={
          {
            "--badge-bg": "rgb(1, 2, 3)",
            "--badge-fg": "rgb(4, 5, 6)",
          } as CSSProperties
        }
      >
        x
      </Badge>,
    );
    const badge = screen.getByTestId("b");
    expect(badge.style.getPropertyValue("--badge-bg")).toBe("rgb(1, 2, 3)");
    expect(badge.style.getPropertyValue("--badge-fg")).toBe("rgb(4, 5, 6)");
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
        aria-label="3 unread"
        color="danger"
        variant="subtle"
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
    expect(badge).not.toHaveAttribute("color");
  });

  it("lets the role be overridden", () => {
    render(<Badge role="presentation">Tag</Badge>);
    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.getByText("Tag")).toHaveAttribute("role", "presentation");
  });
});
