// Ported from @novel-isr/ui src/components/Button/__test__/Button.test.tsx
// (appearance / icons / loadingText / fullWidth / styling hooks).
import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { join } from "node:path";
import { compile } from "sass";
import { describe, expect, it, vi } from "vitest";
import Button from "./Button";
import type { ButtonColor } from "./types";

describe("Button styling hooks", () => {
  it("renders the stable ui-button hooks with default variant/size/color", () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveClass(
      "ui-button",
      "ui-button-variant-solid",
      "ui-button-size-md",
      "ui-button-color-primary",
    );
    expect(button).not.toHaveAttribute("data-loading");
  });

  it.each([
    ["xsmall", "xs"],
    ["small", "sm"],
    ["medium", "md"],
    ["large", "lg"],
    ["xlarge", "xl"],
  ] as const)("maps size %s to ui-button-size-%s", (size, hook) => {
    render(<Button size={size}>X</Button>);
    expect(screen.getByRole("button")).toHaveClass(
      `ui-button-size-${hook}`,
      size,
    );
  });

  it.each<[ButtonColor, string]>([
    ["primary", "primary"],
    ["secondary", "secondary"],
    ["success", "success"],
    ["warning", "warning"],
    ["error", "danger"],
    ["danger", "danger"],
    ["info", "info"],
    ["accent", "accent"],
    ["neutral", "neutral"],
    ["retry", "danger"],
    ["back", "info"],
  ])("maps variant %s to ui-button-color-%s", (variant, hook) => {
    render(<Button variant={variant}>X</Button>);
    expect(screen.getByRole("button")).toHaveClass(
      `ui-button-color-${hook}`,
      variant,
    );
  });
});

describe("Button label hook", () => {
  it("wraps the content in span.ui-button-label in the classic look too", () => {
    const { rerender } = render(<Button>Plain</Button>);
    expect(screen.getByText("Plain")).toHaveClass("ui-button-label");
    rerender(<Button loading>Busy</Button>);
    expect(screen.getByText("Busy")).toHaveClass("ui-button-label");
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
      "ui-button-variant-outline",
      "ui-button-size-lg",
      "ui-button-fullwidth",
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
    expect(children[0]).toHaveClass("ui-button-icon", "icon");
    expect(children[1]).toHaveClass("ui-button-label", "label");
    expect(children[2]).toHaveClass("ui-button-icon");
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
    expect(button).toHaveAttribute("data-loading", "true");
    expect(button).toHaveClass("ui-button-loading");
    expect(button.querySelector(".ui-button-spinner")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(button.querySelector(".ui-button-label")).toHaveClass(
      "ui-button-hidden",
      "hidden",
    );
    expect(screen.getByTestId("icon").parentElement).toHaveClass(
      "ui-button-hidden",
    );
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
    expect(button.querySelector(".ui-button-spinner")).not.toBeNull();

    rerender(
      <Button loadingText="Saving..." startIcon={<i data-testid="icon" />}>
        Save
      </Button>,
    );
    expect(screen.getByRole("button")).toHaveTextContent("Save");
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(button.querySelector(".ui-button-spinner")).toBeNull();
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

  it("defines tone variables for every color in the token-based look", () => {
    for (const name of ["primary", "danger", "accent", "neutral", "info"]) {
      expect(css).toMatch(
        new RegExp(`\\.customButton\\.modern\\.${name}\\s*\\{[^}]*--btn-tone:`),
      );
    }
  });
});
