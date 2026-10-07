// Token-based appearance, icons, loadingText, fullWidth, sizes and colors.
import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { join } from "node:path";
import { compile } from "sass";
import { describe, expect, it, vi } from "vitest";
import Button from "./Button";
import styles from "./button.module.scss";
import type { ButtonColor } from "./types";

describe("Button sizes and colors", () => {
  it("defaults to the primary color and medium size", () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveClass(
      styles.customButton,
      styles.primary,
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

  it.each<ButtonColor>([
    "primary",
    "secondary",
    "success",
    "warning",
    "error",
    "danger",
    "info",
    "accent",
    "neutral",
    "retry",
    "back",
  ])("applies the %s color class", (variant) => {
    render(<Button variant={variant}>X</Button>);
    expect(screen.getByRole("button")).toHaveClass(styles[variant]);
  });
});

describe("Button classic markup", () => {
  it("renders the content directly, and next to the spinner while loading", () => {
    const { rerender } = render(<Button>Plain</Button>);
    expect(screen.getByText("Plain")).toBe(screen.getByRole("button"));
    rerender(<Button loading>Busy</Button>);
    const wrapper = screen.getByText("Busy");
    expect(wrapper).toHaveClass(styles.loadingWrapper);
    expect(wrapper.firstElementChild).toHaveClass(styles.loadingSpinner);
  });
});

describe("Button appearance", () => {
  it("applies appearance, size, fullWidth and custom className", () => {
    render(
      <Button appearance="outline" size="large" fullWidth className="consumer">
        Go
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "modern",
      "appearance-outline",
      "large",
      "fullWidth",
      "consumer",
    );
  });

  it("uses the theme radius in the token-based look unless one is given", () => {
    const { rerender } = render(<Button appearance="solid">A</Button>);
    expect(screen.getByRole("button")).not.toHaveClass("borderRadiusMedium");
    rerender(
      <Button appearance="solid" borderRadius="large">
        A
      </Button>,
    );
    expect(screen.getByRole("button")).toHaveClass("borderRadiusLarge");
    rerender(
      <Button appearance="ghost" borderRadius={6}>
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
      <Button appearance="ghost" onClick={onClick}>
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
    expect(button).toHaveClass("structured");
  });

  it("loading blocks activation, shows a spinner and visually hides content", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button
        loading
        appearance="solid"
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
        appearance="link"
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
      /\.customButton\.modern:focus-visible\s*\{[^}]*outline:[^;]*var\(--primary-color\)/,
    );
  });

  it("lets the label shrink and ellipsize inside the button", () => {
    expect(css).toMatch(
      /\.structured \.label\s*\{[^}]*min-width:\s*0;[^}]*text-overflow:\s*ellipsis/,
    );
  });

  it("lets containers make labels wrap through --button-label-white-space", () => {
    expect(css).toMatch(
      /\.structured \.label\s*\{[^}]*white-space:\s*var\(--button-label-white-space,\s*nowrap\)/,
    );
    expect(css).toMatch(
      /\.customButton\.modern\s*\{[^}]*white-space:\s*var\(--button-label-white-space,\s*nowrap\)/,
    );
  });

  it("defines tone variables for every color in the token-based look", () => {
    for (const name of ["primary", "danger", "accent", "neutral", "info"]) {
      expect(css).toMatch(
        new RegExp(`\\.customButton\\.modern\\.${name}\\s*\\{[^}]*--btn-tone:`),
      );
    }
  });
});
