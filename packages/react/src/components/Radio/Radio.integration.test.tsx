// Radio inside RadioGroup: children labels, per-item size, keyboard and
// FormControl integration.
import React, { createRef, useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Radio from "./Radio";
import RadioGroup from "./RadioGroup";
import type { RadioGroupProps } from "./types";
import styles from "./radio.module.scss";
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

function Sizes(props: Omit<RadioGroupProps, "children">) {
  return (
    <RadioGroup aria-label="Size" {...props}>
      <Radio value="s">Small</Radio>
      <Radio value="m">Medium</Radio>
      <Radio value="l">Large</Radio>
    </RadioGroup>
  );
}

describe("RadioGroup / Radio integration", () => {
  it("renders a vertical radiogroup with children-labelled medium radios", () => {
    render(<Sizes />);
    const group = screen.getByRole("radiogroup", { name: "Size" });
    expect(group).toHaveClass(styles.radioGroup, styles.vertical);
    const radios = screen.getAllByRole("radio");
    expect(radios.map((r) => r.closest("label")!.textContent)).toEqual([
      "Small",
      "Medium",
      "Large",
    ]);
    radios.forEach((r) => {
      expect(r).not.toBeChecked();
      expect(r).toHaveClass(styles.input);
      expect(r.closest("label")).toHaveClass(styles.radio);
      expect(r.closest("label")!.parentElement).toHaveClass(styles.medium);
    });
  });

  it("propagates the group size; items use their own size when the group has none", () => {
    const { rerender } = render(
      <RadioGroup size="large" direction="horizontal" aria-label="g">
        <Radio value="a">A</Radio>
      </RadioGroup>,
    );
    expect(screen.getByRole("radiogroup")).toHaveClass(styles.horizontal);
    expect(
      screen.getByRole("radio").closest("label")!.parentElement,
    ).toHaveClass(styles.large);
    rerender(
      <RadioGroup aria-label="g">
        <Radio value="a" size="small">
          A
        </Radio>
      </RadioGroup>,
    );
    expect(
      screen.getByRole("radio").closest("label")!.parentElement,
    ).toHaveClass(styles.small);
  });

  it("selects by clicking the label text and reports the value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Sizes defaultValue="s" onChange={onChange} />);
    expect(screen.getByRole("radio", { name: "Small" })).toBeChecked();
    await user.click(screen.getByText("Large"));
    expect(screen.getByRole("radio", { name: "Large" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Small" })).not.toBeChecked();
    expect(onChange).toHaveBeenLastCalledWith("l", expect.anything());
  });

  it("respects a controlled value", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    function App() {
      const [value, setValue] = useState<string | number>("m");
      return (
        <Sizes
          value={value}
          onChange={(v) => {
            spy(v);
            if (v !== "l") setValue(v);
          }}
        />
      );
    }
    render(<App />);
    await user.click(screen.getByRole("radio", { name: "Large" }));
    expect(spy).toHaveBeenCalledWith("l");
    expect(screen.getByRole("radio", { name: "Medium" })).toBeChecked();
    await user.click(screen.getByRole("radio", { name: "Small" }));
    expect(screen.getByRole("radio", { name: "Small" })).toBeChecked();
  });

  it("moves between radios with arrow keys and selects with Space", async () => {
    const user = userEvent.setup();
    render(<Sizes defaultValue="s" />);
    await user.tab();
    expect(screen.getByRole("radio", { name: "Small" })).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("radio", { name: "Medium" })).toHaveFocus();
    await user.keyboard(" ");
    expect(screen.getByRole("radio", { name: "Medium" })).toBeChecked();
    // native radios share a name: only one stop in the tab sequence
    expect(
      new Set(screen.getAllByRole("radio").map((r) => r.getAttribute("name")))
        .size,
    ).toBe(1);
  });

  it("disabled items cannot be selected and mark their label", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <RadioGroup aria-label="g" onChange={onChange}>
        <Radio value="a" disabled>
          A
        </Radio>
      </RadioGroup>,
    );
    const radio = screen.getByRole("radio", { name: "A" });
    expect(radio).toBeDisabled();
    expect(radio.closest("label")).toHaveClass(styles.disabled);
    await user.click(radio);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("forwards refs on group and item", () => {
    const groupRef = createRef<HTMLDivElement>();
    const itemRef = createRef<HTMLInputElement>();
    render(
      <RadioGroup ref={groupRef} aria-label="g">
        <Radio ref={itemRef} value="a">
          A
        </Radio>
      </RadioGroup>,
    );
    expect(groupRef.current).toContainElement(screen.getByRole("radiogroup"));
    expect(itemRef.current).toBe(screen.getByRole("radio"));
  });

  it("inherits disabled, required, invalid and description from a FormControl", () => {
    render(
      <FormControlContext.Provider
        value={field({
          disabled: true,
          required: true,
          invalid: true,
          hasErrorMessage: true,
        })}
      >
        <span id="field-label">Pick a size</span>
        <span id="field-error">Required</span>
        <RadioGroup>
          <Radio value="s">Small</Radio>
          <Radio value="m">Medium</Radio>
        </RadioGroup>
      </FormControlContext.Provider>,
    );
    const group = screen.getByRole("radiogroup", { name: "Pick a size" });
    expect(group).toHaveAttribute("aria-required", "true");
    expect(group).toHaveAttribute("aria-invalid", "true");
    expect(group).toHaveAccessibleDescription("Required");
    screen.getAllByRole("radio").forEach((r) => {
      expect(r).toBeDisabled();
      expect(r.closest("label")).toHaveClass(styles.disabled);
    });
  });

  it("describes the group with the FormControl helper text", () => {
    render(
      <FormControlContext.Provider value={field({ hasHelperText: true })}>
        <span id="field-helper">Pick one</span>
        <RadioGroup aria-label="g" disabled={false}>
          <Radio value="s">Small</Radio>
        </RadioGroup>
      </FormControlContext.Provider>,
    );
    expect(screen.getByRole("radiogroup")).toHaveAccessibleDescription(
      "Pick one",
    );
    expect(screen.getByRole("radio")).toBeEnabled();
  });

  it("standalone radios inherit disabled unless overridden", () => {
    render(
      <FormControlContext.Provider value={field({ disabled: true })}>
        <Radio value="a">A</Radio>
        <Radio value="b" disabled={false}>
          B
        </Radio>
      </FormControlContext.Provider>,
    );
    expect(screen.getByRole("radio", { name: "A" })).toBeDisabled();
    expect(screen.getByRole("radio", { name: "B" })).toBeEnabled();
  });

  it("value={null} is controlled with no selection", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Sizes value={null} onChange={onChange} />);
    screen.getAllByRole("radio").forEach((r) => expect(r).not.toBeChecked());
    await user.click(screen.getByRole("radio", { name: "Large" }));
    expect(onChange).toHaveBeenCalledWith("l", expect.anything());
    expect(screen.getByRole("radio", { name: "Large" })).not.toBeChecked();
  });
});
