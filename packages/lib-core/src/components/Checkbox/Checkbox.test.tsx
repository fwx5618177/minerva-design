import { StrictMode, createRef, useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Checkbox from "./Checkbox";

describe("Checkbox", () => {
  it("renders an unchecked checkbox labelled by its label", () => {
    render(<Checkbox label="Accept terms" />);

    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });
    expect(checkbox).not.toBeChecked();
    expect(checkbox).toBeEnabled();
  });

  it("toggles when uncontrolled and calls onChange with checked state and event", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="Opt in" onChange={onChange} />);

    const checkbox = screen.getByRole("checkbox", { name: "Opt in" });
    await user.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      true,
      expect.objectContaining({ type: "change" }),
    );

    await user.click(screen.getByText("Opt in"));
    expect(checkbox).not.toBeChecked();
    expect(onChange).toHaveBeenLastCalledWith(false, expect.anything());
  });

  it("respects defaultChecked", () => {
    render(<Checkbox label="Default" defaultChecked />);

    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("stays in sync with the checked prop when controlled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(
      <Checkbox label="Controlled" checked={false} onChange={onChange} />,
    );

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);
    expect(onChange).toHaveBeenCalledWith(true, expect.anything());
    expect(checkbox).not.toBeChecked();

    rerender(<Checkbox label="Controlled" checked onChange={onChange} />);
    expect(checkbox).toBeChecked();
  });

  it("works with a stateful parent", async () => {
    const user = userEvent.setup();
    const Wrapper = () => {
      const [checked, setChecked] = useState(false);
      return (
        <Checkbox
          label="Stateful"
          checked={checked}
          onChange={(value) => setChecked(value)}
          icon={<span data-testid="custom-icon" />}
        />
      );
    };
    render(<Wrapper />);

    expect(screen.queryByTestId("custom-icon")).not.toBeInTheDocument();
    await user.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("toggles with the Space key", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="Keyboard" onChange={onChange} />);

    await user.tab();
    expect(screen.getByRole("checkbox")).toHaveFocus();
    await user.keyboard(" ");

    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(onChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it("does not toggle or call onChange when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="Disabled" disabled onChange={onChange} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();
    expect(onChange).not.toHaveBeenCalled();
    expect(checkbox.closest("label")).toHaveClass("disabled");
  });

  it("sets the indeterminate DOM property and updates it", () => {
    const { rerender } = render(<Checkbox label="Some" indeterminate />);

    const checkbox = screen.getByRole<HTMLInputElement>("checkbox");
    expect(checkbox.indeterminate).toBe(true);

    rerender(<Checkbox label="Some" indeterminate={false} />);
    expect(checkbox.indeterminate).toBe(false);
  });

  it("does not render the custom icon while indeterminate", () => {
    render(
      <Checkbox
        label="Mixed"
        checked
        indeterminate
        icon={<span data-testid="custom-icon" />}
      />,
    );

    expect(screen.queryByTestId("custom-icon")).not.toBeInTheDocument();
  });

  it("forwards name and required to the input", () => {
    render(<Checkbox label="Required" name="agree" required />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("name", "agree");
    expect(checkbox).toBeRequired();
  });

  it("applies size, shape, labelPlacement and className classes", () => {
    render(
      <Checkbox
        label="Styled"
        size="large"
        shape="circle"
        labelPlacement="start"
        className="mine"
      />,
    );

    const label = screen.getByRole("checkbox").closest("label");
    expect(label).toHaveClass("checkbox", "large", "circle", "labelStart");
    expect(label).toHaveClass("mine");
  });

  it("applies custom colors to the checkmark", () => {
    const { container } = render(
      <Checkbox
        label="Colors"
        boxColor="red"
        boxBorderColor="blue"
        checkmarkColor="green"
      />,
    );

    const checkmark = container.querySelector<HTMLElement>(".checkmark");
    expect(checkmark).toHaveStyle({
      backgroundColor: "red",
      borderColor: "blue",
    });
    expect(checkmark?.style.getPropertyValue("--checkmark-color")).toBe(
      "green",
    );
  });

  it("renders helper text without error icon by default", () => {
    render(
      <Checkbox
        label="Helper"
        helperText="Some help"
        errorIcon={<span data-testid="err-icon" />}
      />,
    );

    expect(screen.getByText("Some help")).toHaveClass("helperText");
    expect(screen.getByText("Some help")).not.toHaveClass("errorText");
    expect(screen.queryByTestId("err-icon")).not.toBeInTheDocument();
  });

  it("renders error state with error icon and error text", () => {
    render(
      <Checkbox
        label="Err"
        error
        helperText="Required field"
        errorIcon={<span data-testid="err-icon" />}
      />,
    );

    expect(screen.getByText("Required field")).toHaveClass("errorText");
    expect(screen.getByTestId("err-icon")).toBeInTheDocument();
    expect(screen.getByRole("checkbox").closest("label")).toHaveClass("error");
  });

  it("forwards the ref to the input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox label="Ref" ref={ref} />);

    expect(ref.current).toBe(screen.getByRole("checkbox"));
  });

  it("never emits undefined or stray whitespace in class names", () => {
    const { container, rerender } = render(<Checkbox label="Defaults" />);
    const assertClean = () => {
      container.querySelectorAll("[class]").forEach((el) => {
        const cls = el.getAttribute("class") ?? "";
        expect(cls).not.toMatch(/undefined|null|false/);
        expect(cls).toBe(cls.trim());
        expect(cls).not.toMatch(/\s{2,}/);
      });
    };
    assertClean();
    expect(screen.getByRole("checkbox").closest("label")).toHaveClass(
      "checkbox",
    );

    rerender(
      <Checkbox
        label="All"
        size="large"
        shape="circle"
        labelPlacement="top"
        disabled
        error
        helperText="Help"
        className="mine"
      />,
    );
    assertClean();
    expect(screen.getByRole("checkbox").closest("label")).toHaveClass(
      "checkbox",
      "large",
      "circle",
      "labelTop",
      "disabled",
      "error",
      "mine",
    );
  });

  describe("regressions", () => {
    it("shows the custom icon in uncontrolled mode", async () => {
      const user = userEvent.setup();
      render(
        <Checkbox
          label="Icon"
          defaultChecked
          icon={<span data-testid="custom-icon" />}
        />,
      );
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
      await user.click(screen.getByRole("checkbox"));
      expect(screen.queryByTestId("custom-icon")).not.toBeInTheDocument();
      await user.click(screen.getByRole("checkbox"));
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });

    it("keeps the indeterminate prop applied after a click", async () => {
      const user = userEvent.setup();
      render(
        <Checkbox
          label="Select all"
          checked={false}
          indeterminate
          onChange={() => {}}
        />,
      );
      const checkbox = screen.getByRole<HTMLInputElement>("checkbox");
      await user.click(checkbox);
      // the parent did not change `indeterminate`, so it must stick
      expect(checkbox.indeterminate).toBe(true);
      expect(checkbox).not.toBeChecked();
    });

    it("links the helper text and flags errors for assistive tech", () => {
      const { rerender } = render(
        <Checkbox label="Terms" helperText="Please read them" />,
      );
      const checkbox = screen.getByRole("checkbox", { name: "Terms" });
      expect(checkbox).toHaveAccessibleDescription("Please read them");
      expect(checkbox).not.toHaveAttribute("aria-invalid");

      rerender(<Checkbox label="Terms" helperText="Required" error />);
      expect(checkbox).toHaveAccessibleDescription("Required");
      expect(checkbox).toHaveAttribute("aria-invalid", "true");
    });

    it("calls onChange exactly once per toggle under StrictMode", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        <StrictMode>
          <Checkbox label="Strict" onChange={onChange} />
        </StrictMode>,
      );
      await user.click(screen.getByRole("checkbox"));
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(screen.getByRole("checkbox")).toBeChecked();
    });

    it("forwards the ref to the input together with a callback ref", () => {
      const nodes: Array<HTMLInputElement | null> = [];
      const { unmount } = render(
        <Checkbox label="Ref" ref={(node) => void nodes.push(node)} />,
      );
      expect(nodes[0]).toBe(screen.getByRole("checkbox"));
      unmount();
      expect(nodes[nodes.length - 1]).toBeNull();
    });
  });
});
