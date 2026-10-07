import { createRef } from "react";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { compile } from "sass";
import { describe, expect, it } from "vitest";
import Alert from "./Alert";
import type { AlertProps } from "./types";
import styles from "./alert.module.scss";

describe("Alert layout", () => {
  const css = compile(join(import.meta.dirname, "alert.module.scss")).css;

  it("styles every color for the subtle, outline and solid variants", () => {
    for (const name of ["info", "success", "warning", "danger"]) {
      expect(css).toMatch(
        new RegExp(
          `\\.alert\\.${name}\\s*\\{[^}]*var\\(--${name}-color-subtle\\)`,
        ),
      );
      expect(css).toMatch(
        new RegExp(
          `\\.alert\\.${name}\\.solid\\s*\\{[^}]*background-color: var\\(--${name}-color\\)`,
        ),
      );
      expect(css).toMatch(
        new RegExp(
          `\\.alert\\.${name}\\.outline\\s*\\{[^}]*background-color: transparent`,
        ),
      );
    }
    expect(css).not.toMatch(/\.(outlined|filled)\b/);
  });

  it("allows the alert root to shrink inside flex and grid layouts", () => {
    expect(css).toMatch(/\.alert\s*\{[^}]*min-width:\s*0\s*;/);
  });

  it("lets alert titles and content inherit wrapping for unbroken text", () => {
    expect(css).toMatch(/\.alert\s*\{[^}]*overflow-wrap:\s*anywhere\s*;/);
  });
});

describe("Alert structure and native attributes", () => {
  it("renders the default status classes and a description", () => {
    render(<Alert>Saved</Alert>);
    const alert = screen.getByRole("status");
    expect(alert).toHaveClass(
      styles.alert,
      styles.info,
      styles.subtle,
      styles.medium,
    );
    expect(alert.querySelector(`.${styles.message}`)).toHaveTextContent(
      "Saved",
    );
    expect(alert.querySelector(`.${styles.title}`)).toBeNull();
  });

  it.each<[NonNullable<AlertProps["color"]>, string]>([
    ["info", "info"],
    ["success", "success"],
    ["warning", "warning"],
    ["danger", "danger"],
  ])("renders a default icon and the status class for %s", (color, cls) => {
    render(
      <Alert color={color} variant="solid" role="alert">
        Body
      </Alert>,
    );
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass(styles[cls], styles.solid);
    expect(alert.querySelector(`.${styles.icon} svg`)).not.toBeNull();
  });

  it("renders danger as an interrupting alert with a localized icon label", () => {
    render(<Alert color="danger">Boom</Alert>);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("danger");
    expect(
      screen.getByRole("img", { name: "danger icon" }),
    ).toBeInTheDocument();
  });

  it.each(["subtle", "outline", "solid"] as const)(
    "applies the %s variant class",
    (variant) => {
      render(<Alert variant={variant}>x</Alert>);
      const alert = screen.getByRole("status");
      expect(alert).toHaveClass(styles.info, styles[variant]);
      for (const other of ["subtle", "outline", "solid"] as const) {
        if (other !== variant) expect(alert).not.toHaveClass(styles[other]);
      }
    },
  );

  it("renders a title above the description and omits description without children", () => {
    const { rerender } = render(
      <Alert title="Error">Server returned 500</Alert>,
    );
    const content = screen
      .getByRole("status")
      .querySelector(`.${styles.content}`)!;
    expect(content.children[0]).toHaveClass(styles.title);
    expect(content.children[0]).toHaveTextContent("Error");
    expect(content.children[1]).toHaveClass(styles.message);

    rerender(<Alert title="Only title" />);
    expect(
      screen.getByRole("status").querySelector(`.${styles.message}`),
    ).toBeNull();
  });

  it("supports a custom icon and hiding the icon entirely", () => {
    const { rerender } = render(
      <Alert icon={<span data-testid="custom-icon">!</span>}>x</Alert>,
    );
    expect(screen.getByTestId("custom-icon").parentElement).toHaveClass(
      styles.icon,
    );
    rerender(
      <Alert showIcon={false} icon={<span data-testid="custom-icon">!</span>}>
        x
      </Alert>,
    );
    expect(screen.queryByTestId("custom-icon")).toBeNull();
    expect(
      screen.getByRole("status").querySelector(`.${styles.icon}`),
    ).toBeNull();
  });

  it("forwards ref, className and native attributes without leaking custom props", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Alert
        ref={ref}
        id="a1"
        data-testid="alert"
        className="extra"
        aria-live="assertive"
        title="T"
        color="warning"
        variant="outline"
      >
        msg
      </Alert>,
    );
    const alert = screen.getByRole("alert");
    expect(ref.current).toBe(alert);
    expect(alert).toHaveAttribute("id", "a1");
    expect(alert).toHaveAttribute("aria-live", "assertive");
    expect(alert).toHaveClass("extra", styles.alert);
    expect(alert).not.toHaveAttribute("title");
    expect(alert).not.toHaveAttribute("variant");
    expect(alert).not.toHaveAttribute("color");
  });

  it("does not point aria-controls at missing content", () => {
    render(<Alert title="Only title" collapsible />);
    expect(
      screen.getByRole("button", { name: "Collapse" }),
    ).not.toHaveAttribute("aria-controls");
  });
});
