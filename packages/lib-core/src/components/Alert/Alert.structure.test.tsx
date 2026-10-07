import { createRef } from "react";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { compile } from "sass";
import { describe, expect, it } from "vitest";
import Alert from "./Alert";
import type { AlertVariant } from "./types";
import styles from "./alert.module.scss";

describe("Alert layout", () => {
  const css = compile(join(import.meta.dirname, "alert.module.scss")).css;

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
    expect(alert).toHaveClass(styles.alert, styles.info, styles.medium);
    expect(alert.querySelector(`.${styles.message}`)).toHaveTextContent(
      "Saved",
    );
    expect(alert.querySelector(`.${styles.title}`)).toBeNull();
  });

  it.each<[AlertVariant, string]>([
    ["info", "info"],
    ["success", "success"],
    ["warning", "warning"],
    ["error", "error"],
    ["danger", "error"],
  ])("renders a default icon and the status class for %s", (variant, cls) => {
    render(
      <Alert variant={variant} type="filled" role="alert">
        Body
      </Alert>,
    );
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass(styles[cls], styles.filled);
    expect(alert.querySelector(`.${styles.icon} svg`)).not.toBeNull();
  });

  it("treats danger as an alias of error", () => {
    render(<Alert variant="danger">Boom</Alert>);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("error");
    expect(screen.getByRole("img", { name: "error icon" })).toBeInTheDocument();
  });

  it.each([
    [{ type: "outlined" as const }, "outlined"],
    [{ outlined: true }, "outlined"],
    [{ filled: true }, "filled"],
  ])("maps %j to the %s class", (props, cls) => {
    render(<Alert {...props}>x</Alert>);
    expect(screen.getByRole("status")).toHaveClass(styles[cls]);
  });

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
        variant="warning"
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
  });

  it("does not point aria-controls at missing content", () => {
    render(<Alert title="Only title" collapsible />);
    expect(
      screen.getByRole("button", { name: "Collapse" }),
    ).not.toHaveAttribute("aria-controls");
  });
});
