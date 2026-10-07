import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { join } from "node:path";
import { compile } from "sass";
import { describe, expect, it, vi } from "vitest";
import IconButton from "./IconButton";
import styles from "./iconButton.module.scss";

describe("IconButton label and children", () => {
  it("uses label as accessible name and hides children icons from AT", () => {
    render(
      <IconButton label="Delete">
        <svg data-testid="glyph" />
      </IconButton>,
    );
    const button = screen.getByRole("button", { name: "Delete" });
    expect(button).toHaveClass(
      styles.iconButton,
      styles.medium,
      styles.neutral,
      styles["variant-ghost"],
      styles.circle,
    );
    const wrapper = screen.getByTestId("glyph").parentElement;
    expect(wrapper).toHaveAttribute("aria-hidden", "true");
    expect(wrapper).toHaveClass(styles.glyph);
  });

  it("label wins over aria-label", () => {
    render(<IconButton label="Refresh" aria-label="Other" icon={<svg />} />);
    expect(screen.getByRole("button", { name: "Refresh" })).toBeInTheDocument();
  });

  it("accepts color/variant overrides, forwards ref and handles clicks", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLButtonElement>();
    const onClick = vi.fn();
    render(
      <IconButton
        ref={ref}
        label="Remove"
        variant="solid"
        color="danger"
        className="x"
        onClick={onClick}
      >
        <svg />
      </IconButton>,
    );
    const button = screen.getByRole("button", { name: "Remove" });
    expect(ref.current).toBe(button);
    expect(button).toHaveClass(
      styles.iconButton,
      styles["variant-solid"],
      styles.danger,
      "x",
    );
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it.each(["xsmall", "small", "large"] as const)(
    "applies the %s size class",
    (size) => {
      render(<IconButton label="A" size={size} icon={<svg />} />);
      expect(screen.getByRole("button")).toHaveClass(styles[size]);
    },
  );

  it.each([
    "primary",
    "neutral",
    "success",
    "warning",
    "danger",
    "info",
  ] as const)("applies the %s color class", (color) => {
    render(<IconButton label="A" color={color} icon={<svg />} />);
    expect(screen.getByRole("button")).toHaveClass(styles[color]);
  });

  it.each(["ghost", "solid", "outline"] as const)(
    "applies the %s variant class",
    (variant) => {
      render(
        <IconButton
          label="A"
          color="danger"
          variant={variant}
          icon={<svg />}
        />,
      );
      expect(screen.getByRole("button")).toHaveClass(
        styles.danger,
        styles[`variant-${variant}`],
      );
    },
  );

  it("shows the label as a tooltip on keyboard focus", async () => {
    const user = userEvent.setup();
    render(
      <IconButton label="Settings">
        <svg />
      </IconButton>,
    );
    await user.tab();
    expect(screen.getByRole("button", { name: "Settings" })).toHaveFocus();
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Settings");
  });

  it("does not show the label tooltip when showTooltip is false", async () => {
    const user = userEvent.setup();
    render(
      <IconButton label="Settings" showTooltip={false}>
        <svg />
      </IconButton>,
    );
    await user.tab();
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("is a non-submitting button that can be disabled", () => {
    render(
      <IconButton label="Refresh" disabled>
        R
      </IconButton>,
    );
    const button = screen.getByRole("button", { name: "Refresh" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toBeDisabled();
  });

  it("keeps caller-owned descriptions", () => {
    render(
      <>
        <span id="device-first">first</span>
        <IconButton label="Delete device" aria-describedby="device-first">
          <svg aria-hidden="true" />
        </IconButton>
      </>,
    );
    const button = screen.getByRole("button", { name: "Delete device" });
    expect(button).toHaveAttribute("aria-describedby", "device-first");
    expect(button).toHaveAccessibleDescription("first");
  });

  it("marks the loading state as busy and aria-disabled, staying focusable", () => {
    render(<IconButton label="Busy" loading icon={<svg />} size="xsmall" />);
    const button = screen.getByRole("button", { name: "Busy" });
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).toBeEnabled();
    expect(button).toHaveClass(styles.loading);
  });
});

describe("IconButton styles", () => {
  const css = compile(join(import.meta.dirname, "iconButton.module.scss")).css;

  it("follows the shared variant recipe", () => {
    // solid: --<c>-color fill with inverse text
    expect(css).toMatch(
      /\.iconButton\.danger\s*\{[^}]*--_ib-tone:\s*var\(--danger-color\);[^}]*--_ib-border:\s*var\(--danger-color\);[^}]*--_ib-text:\s*var\(--danger-color-text\)/,
    );
    expect(css).toMatch(
      /\.iconButton\.variant-solid\s*\{[^}]*background-color:\s*var\(--_ib-tone\);[^}]*color:\s*var\(--icon-button-color,\s*var\(--text-inverse-color\)\)/,
    );
    // outline: 1px --<c>-color border (inset) and --<c>-color-text text
    expect(css).toMatch(
      /\.iconButton\.variant-outline\s*\{[^}]*box-shadow:\s*inset 0 0 0 1px var\(--_ib-border\)/,
    );
    expect(css).toMatch(
      /\.iconButton\.variant-ghost, \.iconButton\.variant-outline\s*\{[^}]*color:\s*var\(--icon-button-color,\s*var\(--_ib-text\)\)/,
    );
    // neutral: strong border, secondary text
    expect(css).toMatch(
      /\.iconButton\.neutral\s*\{[^}]*--_ib-border:\s*var\(--border-strong-color\);[^}]*--_ib-text:\s*var\(--text-secondary-color\)/,
    );
  });

  it("exposes the documented CSS custom property hooks", () => {
    for (const hook of [
      "--icon-button-color",
      "--icon-button-hover-bg",
      "--icon-button-pressed-color",
      "--icon-button-pressed-bg",
    ]) {
      expect(css).toContain(`var(${hook},`);
    }
  });
});
