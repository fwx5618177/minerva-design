import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Input } from "./Input";

describe("Input (react-native-web)", () => {
  it("renders a labelled DOM input with the styling hooks", () => {
    render(<Input label="Email" placeholder="you@example.com" invalid />);
    const input = screen.getByRole("textbox", { name: "Email" });
    expect(input).toHaveAttribute("placeholder", "you@example.com");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("data-minerva", "input");
    expect(input).toHaveAttribute("data-part", "input");
  });

  it("typing calls onChange; the clear button empties it", () => {
    const onChange = vi.fn();
    render(<Input accessibilityLabel="Q" clearable onChange={onChange} />);
    const input = screen.getByRole("textbox", { name: "Q" });
    fireEvent.change(input, { target: { value: "abc" } });
    expect(onChange).toHaveBeenLastCalledWith("abc");
    expect(input).toHaveValue("abc");
    fireEvent.click(screen.getByRole("button", { name: "Clear" }));
    expect(onChange).toHaveBeenLastCalledWith("");
    expect(input).toHaveValue("");
  });

  it("password toggle switches the input type", () => {
    render(<Input accessibilityLabel="Password" type="password" />);
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "type",
      "password",
    );
    fireEvent.click(screen.getByRole("button", { name: "Show password" }));
    expect(screen.getByLabelText("Password")).not.toHaveAttribute(
      "type",
      "password",
    );
  });

  it("disabled input", () => {
    render(<Input accessibilityLabel="D" disabled />);
    expect(screen.getByRole("textbox", { name: "D" })).toBeDisabled();
  });
});
