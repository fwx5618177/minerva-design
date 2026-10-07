// Ported from @novel-isr/ui src/components/Button/__test__/Button.test.tsx
// (IconButton) and the IconButton assertions of src/components/__test__/
// {AdminPrimitives,List,PageTabs}.test.tsx.
import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import IconButton from "./IconButton";

describe("IconButton label and children", () => {
  it("uses label as accessible name and hides children icons from AT", () => {
    render(
      <IconButton label="Delete">
        <svg data-testid="glyph" />
      </IconButton>,
    );
    const button = screen.getByRole("button", { name: "Delete" });
    expect(button).toHaveClass(
      "ui-button",
      "ui-icon-button",
      "ui-button-variant-ghost",
      "ui-button-size-md",
      "ui-button-color-neutral",
    );
    const wrapper = screen.getByTestId("glyph").parentElement;
    expect(wrapper).toHaveAttribute("aria-hidden", "true");
    expect(wrapper).toHaveClass("ui-button-label", "glyph");
  });

  it("label wins over ariaLabel", () => {
    render(<IconButton label="Refresh" ariaLabel="Other" icon={<svg />} />);
    expect(screen.getByRole("button", { name: "Refresh" })).toBeInTheDocument();
  });

  it("accepts variant/appearance overrides, forwards ref and handles clicks", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLButtonElement>();
    const onClick = vi.fn();
    render(
      <IconButton
        ref={ref}
        label="Remove"
        appearance="solid"
        variant="danger"
        className="x"
        onClick={onClick}
      >
        <svg />
      </IconButton>,
    );
    const button = screen.getByRole("button", { name: "Remove" });
    expect(ref.current).toBe(button);
    expect(button).toHaveClass(
      "ui-button-variant-solid",
      "ui-button-color-danger",
      "ui-icon-button",
      "solid",
      "error",
      "x",
    );
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it.each([
    ["xsmall", "xs"],
    ["small", "sm"],
    ["large", "lg"],
  ] as const)("maps size %s to the ui-button-size-%s hook", (size, hook) => {
    render(<IconButton label="A" size={size} icon={<svg />} />);
    expect(screen.getByRole("button")).toHaveClass(
      `ui-button-size-${hook}`,
      size,
    );
  });

  it("maps the error / primary variants and the outline appearance to hooks", () => {
    const { rerender } = render(
      <IconButton
        label="A"
        variant="error"
        appearance="outline"
        icon={<svg />}
      />,
    );
    expect(screen.getByRole("button")).toHaveClass(
      "ui-button-color-danger",
      "ui-button-variant-outline",
      "outline",
    );
    rerender(<IconButton label="A" variant="neutral" icon={<svg />} />);
    expect(screen.getByRole("button")).toHaveClass(
      "default",
      "ui-button-color-neutral",
    );
    rerender(<IconButton label="A" variant="primary" icon={<svg />} />);
    expect(screen.getByRole("button")).toHaveClass("ui-button-color-primary");
  });

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

  it("is a non-submitting button that can be disabled (AdminPrimitives)", () => {
    render(
      <IconButton label="Refresh" disabled>
        R
      </IconButton>,
    );
    const button = screen.getByRole("button", { name: "Refresh" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toBeDisabled();
  });

  it("keeps caller-owned descriptions (List)", () => {
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

  it("marks the loading state with data-loading and the loading hook", () => {
    render(<IconButton label="Busy" loading icon={<svg />} size="xsmall" />);
    const button = screen.getByRole("button", { name: "Busy" });
    expect(button).toHaveAttribute("data-loading", "true");
    expect(button).toHaveClass("ui-button-loading");
  });
});
