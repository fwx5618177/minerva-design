// Variants, colors, sizes, icons, loadingText and fullWidth.
import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { join } from "node:path";
import { compile } from "sass";
import { describe, expect, it, vi } from "vitest";
import Button from "./Button";
import styles from "./button.module.scss";
import type { ColorScheme } from "@minerva/core";
import type { ButtonProps } from "./types";

describe("Button sizes and colors", () => {
  it("defaults to the primary color and medium size", () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveClass(
      styles.customButton,
      styles.primary,
      styles["variant-solid"],
      styles.medium,
    );
    expect(button).not.toHaveAttribute("aria-busy");
  });

  it.each(["xsmall", "small", "medium", "large", "xlarge"] as const)(
    "applies the %s size class",
    (size) => {
      render(<Button size={size}>X</Button>);
      expect(screen.getByRole("button")).toHaveClass(styles[size]);
    },
  );

  it.each<ColorScheme>([
    "primary",
    "neutral",
    "success",
    "warning",
    "danger",
    "info",
  ])("applies the %s color class", (color) => {
    render(<Button color={color}>X</Button>);
    expect(screen.getByRole("button")).toHaveClass(styles[color]);
  });

  it.each<NonNullable<ButtonProps["variant"]>>([
    "solid",
    "outline",
    "ghost",
    "link",
  ])("applies the %s variant class", (variant) => {
    render(
      <Button color="neutral" variant={variant}>
        X
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass(styles[`variant-${variant}`], styles.neutral);
  });

  it("does not forward color as an HTML attribute", () => {
    render(<Button color="danger">X</Button>);
    expect(screen.getByRole("button")).not.toHaveAttribute("color");
  });
});

describe("Button markup", () => {
  it("always wraps the content in a label slot, next to the spinner while loading", () => {
    const { rerender } = render(<Button>Plain</Button>);
    const button = screen.getByRole("button");
    expect(screen.getByText("Plain")).toHaveClass(styles.label);
    expect(button.children).toHaveLength(1);
    rerender(<Button loading>Busy</Button>);
    const label = screen.getByText("Busy");
    expect(label).toHaveClass(styles.label, styles.hidden);
    expect(button.firstElementChild).toHaveClass(styles.loadingSpinner);
  });
});

describe("Button variant", () => {
  it("applies variant, size, fullWidth and custom className", () => {
    render(
      <Button variant="outline" size="large" fullWidth className="consumer">
        Go
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "variant-outline",
      "large",
      "fullWidth",
      "consumer",
    );
  });

  it("uses the theme radius unless one is given", () => {
    const { rerender } = render(<Button variant="solid">A</Button>);
    expect(screen.getByRole("button")).not.toHaveClass("borderRadiusMedium");
    rerender(
      <Button variant="solid" borderRadius="large">
        A
      </Button>,
    );
    expect(screen.getByRole("button")).toHaveClass("borderRadiusLarge");
    rerender(
      <Button variant="ghost" borderRadius={6}>
        A
      </Button>,
    );
    expect(screen.getByRole("button")).toHaveStyle({ borderRadius: "6px" });
  });

  it("does not submit an enclosing form with type=button and submits with type=submit", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((e: { preventDefault: () => void }) =>
      e.preventDefault(),
    );
    const { rerender } = render(
      <form onSubmit={onSubmit}>
        <Button type="button">Plain</Button>
      </form>,
    );
    await user.click(screen.getByRole("button", { name: "Plain" }));
    expect(onSubmit).not.toHaveBeenCalled();
    rerender(
      <form onSubmit={onSubmit}>
        <Button type="submit">Send</Button>
      </form>,
    );
    await user.click(screen.getByRole("button", { name: "Send" }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("activates via keyboard (Enter and Space)", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button variant="ghost" onClick={onClick}>
        Key
      </Button>,
    );
    await user.tab();
    expect(screen.getByRole("button")).toHaveFocus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});

describe("Button icons and loading", () => {
  it("renders start and end icons around the label", () => {
    render(
      <Button
        startIcon={<i data-testid="left" />}
        endIcon={<i data-testid="right" />}
      >
        Label
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Label" });
    const children = Array.from(button.children);
    expect(children).toHaveLength(3);
    expect(children[0]).toHaveClass(styles.icon);
    expect(children[1]).toHaveClass(styles.label);
    expect(children[2]).toHaveClass(styles.icon);
    expect(children[0]).toContainElement(screen.getByTestId("left"));
    expect(children[2]).toContainElement(screen.getByTestId("right"));
  });

  it("loading blocks activation, shows a spinner and visually hides content", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button
        loading
        variant="solid"
        startIcon={<i data-testid="icon" />}
        onClick={onClick}
      >
        Save
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).toHaveClass(styles.loading);
    expect(button.querySelector(`.${styles.loadingSpinner}`)).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(screen.getByText("Save")).toHaveClass(styles.label, styles.hidden);
    expect(screen.getByTestId("icon").parentElement).toHaveClass(styles.hidden);
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("loadingText replaces the label and icons while loading only", () => {
    const { rerender } = render(
      <Button
        loading
        loadingText="Saving..."
        startIcon={<i data-testid="icon" />}
      >
        Save
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Saving...");
    expect(button).not.toHaveTextContent("Save$");
    expect(screen.queryByTestId("icon")).toBeNull();
    expect(button.querySelector(`.${styles.loadingSpinner}`)).not.toBeNull();

    rerender(
      <Button loadingText="Saving..." startIcon={<i data-testid="icon" />}>
        Save
      </Button>,
    );
    expect(screen.getByRole("button")).toHaveTextContent("Save");
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(button.querySelector(`.${styles.loadingSpinner}`)).toBeNull();
  });

  it("forwards ref and native attributes", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Button
        ref={ref}
        name="action"
        value="go"
        aria-describedby="hint"
        data-owner="x"
        form="f"
        variant="link"
      >
        Go
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(ref.current).toBe(button);
    expect(button).toHaveAttribute("name", "action");
    expect(button).toHaveAttribute("value", "go");
    expect(button).toHaveAttribute("aria-describedby", "hint");
    expect(button).toHaveAttribute("data-owner", "x");
    expect(button).toHaveAttribute("form", "f");
  });
});

describe("Button styles", () => {
  const css = compile(join(import.meta.dirname, "button.module.scss")).css;

  it("uses an outline focus ring so the solid shadow survives focus", () => {
    expect(css).toMatch(
      /\.customButton:focus-visible\s*\{[^}]*outline:[^;]*var\(--primary-color\)/,
    );
  });

  it("lets the label shrink and ellipsize inside the button", () => {
    expect(css).toMatch(
      /\.customButton \.label\s*\{[^}]*min-width:\s*0;[^}]*text-overflow:\s*ellipsis/,
    );
  });

  it("lets containers make labels wrap through --button-label-white-space", () => {
    expect(css).toMatch(
      /\.customButton \.label\s*\{[^}]*white-space:\s*var\(--button-label-white-space,\s*nowrap\)/,
    );
    expect(css).toMatch(
      /\.customButton\s*\{[^}]*white-space:\s*var\(--button-label-white-space,\s*nowrap\)/,
    );
  });

  it("follows the shared variant recipe", () => {
    // solid: --<c>-color fill with inverse text
    expect(css).toMatch(
      /\.customButton\.danger\s*\{[^}]*--btn-tone:\s*var\(--btn-bg-color-danger,\s*var\(--danger-color\)\)/,
    );
    expect(css).toMatch(
      /\.customButton\.variant-solid\s*\{[^}]*background:\s*var\(--btn-tone\);[^}]*color:\s*var\(--btn-tone-on\)/,
    );
    // outline: transparent, 1px --<c>-color border, --<c>-color-text text
    expect(css).toMatch(
      /\.customButton\.success\s*\{[^}]*--btn-tone-text:\s*var\(--success-color-text\);[^}]*--btn-tone-border:\s*var\(--success-color\)/,
    );
    expect(css).toMatch(
      /\.customButton\.variant-outline\s*\{[^}]*background:\s*transparent;[^}]*color:\s*var\(--btn-tone-text\);[^}]*border-color:\s*var\(--btn-tone-border\)/,
    );
    // ghost: transparent, no border, subtle tint on hover
    expect(css).toMatch(
      /\.customButton\.variant-ghost\s*\{[^}]*background:\s*transparent;[^}]*border-color:\s*transparent/,
    );
    expect(css).toMatch(
      /\.customButton\.variant-ghost:not\(:disabled\):hover[^{]*\{[^}]*background:\s*var\(--btn-tone-subtle\)/,
    );
    // neutral: strong border, secondary text
    expect(css).toMatch(
      /\.customButton\.neutral\s*\{[^}]*--btn-tone-text:\s*var\(--text-secondary-color\);[^}]*--btn-tone-border:\s*var\(--border-strong-color\)/,
    );
  });

  it("defines tone variables for every color", () => {
    for (const name of [
      "primary",
      "neutral",
      "success",
      "warning",
      "danger",
      "info",
    ]) {
      expect(css).toMatch(
        new RegExp(`\\.customButton\\.${name}\\s*\\{[^}]*--btn-tone:`),
      );
    }
  });
});
