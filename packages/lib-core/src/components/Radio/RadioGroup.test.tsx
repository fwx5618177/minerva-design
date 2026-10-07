import { StrictMode, createRef, useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Radio from "./Radio";
import RadioGroup from "./RadioGroup";
import type { RadioGroupProps } from "./types";

const renderGroup = (props: Partial<RadioGroupProps> = {}) =>
  render(
    <RadioGroup name="fruit" {...props}>
      <Radio label="Apple" value="apple" />
      <Radio label="Banana" value="banana" />
      <Radio label="Cherry" value={3} />
    </RadioGroup>,
  );

describe("RadioGroup", () => {
  it("renders a radiogroup containing its radios", () => {
    renderGroup();

    const group = screen.getByRole("radiogroup");
    expect(group).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
    expect(group).toHaveAttribute("aria-required", "false");
    expect(group).toHaveAttribute("aria-invalid", "false");
  });

  it("passes the group name to every radio", () => {
    renderGroup();

    screen.getAllByRole("radio").forEach((radio) => {
      expect(radio).toHaveAttribute("name", "fruit");
    });
  });

  it("selects the radio matching defaultValue", () => {
    renderGroup({ defaultValue: "banana" });

    expect(screen.getByRole("radio", { name: "Banana" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Apple" })).not.toBeChecked();
  });

  it("updates selection when uncontrolled", async () => {
    const user = userEvent.setup();
    renderGroup({ defaultValue: "apple" });

    await user.click(screen.getByRole("radio", { name: "Cherry" }));

    expect(screen.getByRole("radio", { name: "Cherry" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Apple" })).not.toBeChecked();
  });

  it("updates selection when uncontrolled and an onChange is provided", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderGroup({ defaultValue: "apple", onChange });

    await user.click(screen.getByRole("radio", { name: "Banana" }));

    expect(onChange).toHaveBeenCalledWith(
      "banana",
      expect.objectContaining({ type: "change" }),
    );
    expect(screen.getByRole("radio", { name: "Banana" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Apple" })).not.toBeChecked();
  });

  it("calls onChange with the radio value (preserving number type)", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderGroup({ onChange });

    await user.click(screen.getByRole("radio", { name: "Cherry" }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toBe(3);
  });

  it("is driven by the value prop when controlled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(
      <RadioGroup value="apple" onChange={onChange}>
        <Radio label="Apple" value="apple" />
        <Radio label="Banana" value="banana" />
      </RadioGroup>,
    );

    await user.click(screen.getByRole("radio", { name: "Banana" }));
    expect(onChange).toHaveBeenCalledWith("banana", expect.anything());
    expect(screen.getByRole("radio", { name: "Apple" })).toBeChecked();

    rerender(
      <RadioGroup value="banana" onChange={onChange}>
        <Radio label="Apple" value="apple" />
        <Radio label="Banana" value="banana" />
      </RadioGroup>,
    );
    expect(screen.getByRole("radio", { name: "Banana" })).toBeChecked();
  });

  it("works with a stateful parent", async () => {
    const user = userEvent.setup();
    const Wrapper = () => {
      const [value, setValue] = useState<string | number>("apple");
      return (
        <>
          <RadioGroup value={value} onChange={(v) => setValue(v)}>
            <Radio label="Apple" value="apple" />
            <Radio label="Banana" value="banana" />
          </RadioGroup>
          <output>{String(value)}</output>
        </>
      );
    };
    render(<Wrapper />);

    await user.click(screen.getByRole("radio", { name: "Banana" }));

    expect(screen.getByRole("radio", { name: "Banana" })).toBeChecked();
    expect(screen.getByRole("status")).toHaveTextContent("banana");
  });

  it("does not call the radio's own onChange when inside a group", async () => {
    const user = userEvent.setup();
    const radioOnChange = vi.fn();
    const groupOnChange = vi.fn();
    render(
      <RadioGroup onChange={groupOnChange}>
        <Radio label="Only" value="only" onChange={radioOnChange} />
      </RadioGroup>,
    );

    await user.click(screen.getByRole("radio"));

    expect(groupOnChange).toHaveBeenCalledWith("only", expect.anything());
    expect(radioOnChange).not.toHaveBeenCalled();
  });

  it("disables all radios and ignores clicks when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderGroup({ disabled: true, onChange });

    screen.getAllByRole("radio").forEach((radio) => {
      expect(radio).toBeDisabled();
    });
    await user.click(screen.getByRole("radio", { name: "Apple" }));

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole("radio", { name: "Apple" })).not.toBeChecked();
  });

  it("disables only an individually disabled radio", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <RadioGroup onChange={onChange}>
        <Radio label="Apple" value="apple" disabled />
        <Radio label="Banana" value="banana" />
      </RadioGroup>,
    );

    expect(screen.getByRole("radio", { name: "Apple" })).toBeDisabled();
    expect(screen.getByRole("radio", { name: "Banana" })).toBeEnabled();
    await user.click(screen.getByRole("radio", { name: "Apple" }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("supports arrow-key navigation between radios", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderGroup({ defaultValue: "apple", onChange });

    await user.click(screen.getByRole("radio", { name: "Apple" }));
    onChange.mockClear();
    await user.keyboard("{ArrowDown}");

    expect(onChange).toHaveBeenCalledWith("banana", expect.anything());
    expect(screen.getByRole("radio", { name: "Banana" })).toBeChecked();
  });

  it("sets aria-required and aria-invalid from required and error", () => {
    renderGroup({ required: true, error: true });

    const group = screen.getByRole("radiogroup");
    expect(group).toHaveAttribute("aria-required", "true");
    expect(group).toHaveAttribute("aria-invalid", "true");
  });

  it("renders helper text, with error styling when in error", () => {
    const { rerender } = renderGroup({ helperText: "Choose a fruit" });
    expect(screen.getByText("Choose a fruit")).toHaveClass("helperText");
    expect(screen.getByText("Choose a fruit")).not.toHaveClass("errorText");

    rerender(
      <RadioGroup helperText="Choose a fruit" error>
        <Radio label="Apple" value="apple" />
      </RadioGroup>,
    );
    expect(screen.getByText("Choose a fruit")).toHaveClass("errorText");
  });

  it("applies direction class and propagates size and color to radios", () => {
    const { container } = render(
      <RadioGroup direction="horizontal" size="small" color="red" className="g">
        <Radio label="Apple" value="apple" size="large" />
      </RadioGroup>,
    );

    expect(screen.getByRole("radiogroup")).toHaveClass(
      "radioGroup",
      "horizontal",
    );
    expect(container.firstChild).toHaveClass("radioGroupWrapper", "g");
    expect(container.querySelector(".radioWrapper")).toHaveClass("small");
    expect(container.querySelector(".radioMark")).toHaveStyle({
      color: "red",
    });
  });

  it("forwards the ref to the wrapper div", () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <RadioGroup ref={ref}>
        <Radio label="Apple" value="apple" />
      </RadioGroup>,
    );

    expect(ref.current).toBe(container.firstChild);
  });

  it("never emits undefined or stray whitespace in class names", () => {
    const { container, rerender } = renderGroup();
    const assertClean = () => {
      container.querySelectorAll("[class]").forEach((el) => {
        const cls = el.getAttribute("class") ?? "";
        expect(cls).not.toMatch(/undefined|null|false/);
        expect(cls).toBe(cls.trim());
        expect(cls).not.toMatch(/\s{2,}/);
      });
    };
    assertClean();
    expect(screen.getByRole("radiogroup")).toHaveClass(
      "radioGroup",
      "vertical",
    );

    rerender(
      <RadioGroup
        name="fruit"
        direction="horizontal"
        size="large"
        error
        helperText="Pick one"
        className="mine"
      >
        <Radio label="Apple" value="apple" />
      </RadioGroup>,
    );
    assertClean();
    expect(container.firstElementChild).toHaveClass(
      "radioGroupWrapper",
      "error",
      "mine",
    );
    expect(screen.getByRole("radiogroup")).toHaveClass("horizontal");
  });

  describe("regressions", () => {
    it("shares a generated name when none is given, so arrow keys work", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        <RadioGroup defaultValue="apple" onChange={onChange}>
          <Radio label="Apple" value="apple" />
          <Radio label="Banana" value="banana" />
        </RadioGroup>,
      );
      const [apple, banana] = screen.getAllByRole("radio");
      expect(apple.getAttribute("name")).toBeTruthy();
      expect(banana).toHaveAttribute("name", apple.getAttribute("name")!);

      await user.click(apple);
      onChange.mockClear();
      await user.keyboard("{ArrowDown}");
      expect(onChange).toHaveBeenCalledWith("banana", expect.anything());
      expect(banana).toBeChecked();
    });

    it("gets an accessible name from label or ariaLabel", () => {
      const { rerender } = render(
        <RadioGroup label="Favourite fruit">
          <Radio label="Apple" value="apple" />
        </RadioGroup>,
      );
      expect(
        screen.getByRole("radiogroup", { name: "Favourite fruit" }),
      ).toBeInTheDocument();
      expect(screen.getByText("Favourite fruit")).toBeVisible();

      rerender(
        <RadioGroup ariaLabel="Fruit">
          <Radio label="Apple" value="apple" />
        </RadioGroup>,
      );
      expect(
        screen.getByRole("radiogroup", { name: "Fruit" }),
      ).toBeInTheDocument();
    });

    it("links the helper text to the radiogroup", () => {
      renderGroup({ helperText: "Pick one" });
      expect(screen.getByRole("radiogroup")).toHaveAccessibleDescription(
        "Pick one",
      );
    });

    it("calls onChange once per selection under StrictMode", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        <StrictMode>
          <RadioGroup onChange={onChange}>
            <Radio label="Apple" value="apple" />
            <Radio label="Banana" value="banana" />
          </RadioGroup>
        </StrictMode>,
      );
      await user.click(screen.getByRole("radio", { name: "Banana" }));
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(screen.getByRole("radio", { name: "Banana" })).toBeChecked();
    });

    it("follows the controlled value on every render", async () => {
      const user = userEvent.setup();
      const Parent = () => {
        const [value, setValue] = useState<string | number>("apple");
        return (
          <>
            <RadioGroup value={value}>
              <Radio label="Apple" value="apple" />
              <Radio label="Banana" value="banana" />
            </RadioGroup>
            <button type="button" onClick={() => setValue("banana")}>
              pick banana
            </button>
          </>
        );
      };
      render(<Parent />);
      await user.click(screen.getByRole("radio", { name: "Apple" }));
      expect(screen.getByRole("radio", { name: "Apple" })).toBeChecked();
      await user.click(screen.getByRole("button", { name: "pick banana" }));
      expect(screen.getByRole("radio", { name: "Banana" })).toBeChecked();
    });
  });
});
