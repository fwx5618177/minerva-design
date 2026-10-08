import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Radio } from "./Radio";
import { RadioGroup } from "./RadioGroup";

describe("RadioGroup (react-native-web)", () => {
  it("renders role=radiogroup with radios", () => {
    render(
      <RadioGroup label="Plan" defaultValue="pro" direction="horizontal">
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>,
    );
    const group = screen.getByRole("radiogroup", { name: "Plan" });
    expect(group).toHaveAttribute("data-minerva", "radio-group");
    expect(group).toHaveAttribute("data-direction", "horizontal");
    expect(screen.getByRole("radio", { name: "Pro" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByRole("radio", { name: "Free" })).toHaveAttribute(
      "aria-checked",
      "false",
    );
  });

  it("clicks select, not while disabled", () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <RadioGroup
        accessibilityLabel="g"
        options={["a", "b"]}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByRole("radio", { name: "b" }));
    expect(onChange).toHaveBeenCalledWith("b");
    expect(screen.getByRole("radio", { name: "b" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    rerender(
      <RadioGroup
        accessibilityLabel="g"
        options={["a", "b"]}
        disabled
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByRole("radio", { name: "a" }));
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
