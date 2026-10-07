// Children label, colors, sizes, checked / indeterminate state and
// FormControl integration.
import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Checkbox from "./Checkbox";
import styles from "./checkbox.module.scss";
import {
  FormControlContext,
  type FormControlContextValue,
} from "../FormControl/context";

const field = (
  overrides: Partial<FormControlContextValue> = {},
): FormControlContextValue => ({
  id: "field",
  helperId: "field-helper",
  errorId: "field-error",
  labelId: "field-label",
  invalid: false,
  required: false,
  disabled: false,
  readOnly: false,
  hasHelperText: false,
  hasErrorMessage: false,
  registerHelperText: () => {},
  registerErrorMessage: () => {},
  ...overrides,
});

const InField = ({
  value,
  children,
}: {
  value: Partial<FormControlContextValue>;
  children: React.ReactNode;
}) => (
  <FormControlContext.Provider value={field(value)}>
    {children}
  </FormControlContext.Provider>
);

const root = (el: HTMLElement) => el.closest("label")!;

describe("Checkbox labels, state and form integration", () => {
  it("renders children as the label with the default size", () => {
    render(<Checkbox>Agree</Checkbox>);
    const box = screen.getByRole("checkbox", { name: "Agree" });
    expect(box).toHaveClass(styles.input);
    expect(box).not.toBeChecked();
    expect(root(box)).toHaveClass(styles.checkbox, styles.medium);
    expect(root(box)).not.toHaveClass(styles.colorDanger);
    expect(screen.getByText("Agree")).toHaveClass(styles.label);
  });

  it("prefers label over children and omits the text span without content", () => {
    const { container, rerender } = render(
      <Checkbox label="Label">Child</Checkbox>,
    );
    expect(screen.queryByText("Child")).toBeNull();
    rerender(<Checkbox ariaLabel="Bare" />);
    expect(container.querySelector(`.${styles.label}`)).toBeNull();
  });

  it("maps size, color and error to module classes", () => {
    render(
      <Checkbox size="large" color="danger" error className="consumer">
        X
      </Checkbox>,
    );
    expect(root(screen.getByRole("checkbox"))).toHaveClass(
      styles.large,
      styles.error,
      styles.colorDanger,
      "consumer",
    );
  });

  it.each([
    ["success", "colorSuccess"],
    ["info", "colorInfo"],
    ["warning", "colorWarning"],
  ] as const)("applies the %s color class", (color, cls) => {
    render(<Checkbox color={color}>X</Checkbox>);
    expect(root(screen.getByRole("checkbox"))).toHaveClass(styles[cls]);
  });

  it("toggles when the label text is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox onChange={onChange}>Agree</Checkbox>);
    await user.click(screen.getByText("Agree"));
    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(onChange).toHaveBeenLastCalledWith(true, expect.anything());
  });

  it("exposes the indeterminate state as mixed", () => {
    function App() {
      const [checked, setChecked] = useState(false);
      const [mixed, setMixed] = useState(true);
      return (
        <Checkbox
          checked={checked}
          indeterminate={mixed}
          onChange={(next) => {
            setMixed(false);
            setChecked(next);
          }}
        >
          All
        </Checkbox>
      );
    }
    render(<App />);
    const box = screen.getByRole("checkbox") as HTMLInputElement;
    expect(box).toHaveAttribute("aria-checked", "mixed");
    expect(box).toBePartiallyChecked();
    expect(box.indeterminate).toBe(true);
  });

  it("marks the root disabled", () => {
    render(<Checkbox disabled>A</Checkbox>);
    expect(screen.getByRole("checkbox")).toBeDisabled();
    expect(root(screen.getByRole("checkbox"))).toHaveClass(styles.disabled);
  });

  it("passes id, value and aria-describedby to the input", () => {
    render(
      <>
        <span id="hint">Hint</span>
        <Checkbox id="agree" value="yes" required ariaDescribedBy="hint">
          A
        </Checkbox>
      </>,
    );
    const box = screen.getByRole("checkbox");
    expect(box).toHaveAttribute("id", "agree");
    expect(box).toHaveAttribute("value", "yes");
    expect(box).toBeRequired();
    expect(box).toHaveAccessibleDescription("Hint");
  });

  it("inherits invalid and disabled state from a FormControl", () => {
    render(
      <InField value={{ invalid: true, disabled: true }}>
        <Checkbox>A</Checkbox>
      </InField>,
    );
    const box = screen.getByRole("checkbox");
    expect(box).toBeDisabled();
    expect(box).toHaveAttribute("aria-invalid", "true");
    expect(root(box)).toHaveClass(styles.error, styles.disabled);
  });

  it("lets an explicit disabled={false} override the FormControl", () => {
    render(
      <InField value={{ disabled: true }}>
        <Checkbox disabled={false}>A</Checkbox>
      </InField>,
    );
    expect(screen.getByRole("checkbox")).toBeEnabled();
  });

  it("takes id, helper / error description and required from the FormControl", () => {
    const { rerender } = render(
      <InField value={{ id: "terms", required: true, hasHelperText: true }}>
        <Checkbox>Accept</Checkbox>
        <span id="field-helper">Required to continue</span>
      </InField>,
    );
    const box = screen.getByRole("checkbox");
    expect(box).toHaveAttribute("id", "terms");
    expect(box).toHaveAccessibleDescription("Required to continue");
    expect(box).toBeRequired();
    rerender(
      <InField
        value={{
          id: "terms",
          required: true,
          invalid: true,
          hasErrorMessage: true,
        }}
      >
        <Checkbox>Accept</Checkbox>
        <span id="field-error">You must accept</span>
      </InField>,
    );
    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByRole("checkbox")).toHaveAccessibleDescription(
      "You must accept",
    );
  });

  it("does not toggle inside a read-only FormControl", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <InField value={{ readOnly: true }}>
        <Checkbox onChange={onChange}>A</Checkbox>
      </InField>,
    );
    const box = screen.getByRole("checkbox");
    expect(box).toHaveAttribute("aria-readonly", "true");
    await user.click(box);
    expect(box).not.toBeChecked();
    expect(onChange).not.toHaveBeenCalled();
  });
});
