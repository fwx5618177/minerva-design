import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./Checkbox";
import { CheckboxGroup } from "./CheckboxGroup";

describe("Checkbox (react-native-web)", () => {
  it("renders role=checkbox with aria-checked and the styling hooks", () => {
    render(<Checkbox label="Accept" color="success" />);
    const box = screen.getByRole("checkbox", { name: "Accept" });
    expect(box).toHaveAttribute("aria-checked", "false");
    expect(box).toHaveAttribute("data-minerva", "checkbox");
    expect(box).toHaveAttribute("data-part", "root");
    expect(box).toHaveAttribute("data-color", "success");
  });

  it("clicks toggle it, not while disabled", () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <Checkbox label="A" value="a" onChange={onChange} />,
    );
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledWith(true, "a");
    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByRole("checkbox")).toHaveAttribute("data-checked", "");
    rerender(<Checkbox label="A" value="a" disabled onChange={onChange} />);
    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("indeterminate is aria-checked=mixed", () => {
    render(<Checkbox label="All" indeterminate />);
    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "aria-checked",
      "mixed",
    );
  });

  it("group: role=group named by its label", () => {
    const onChange = vi.fn();
    render(
      <CheckboxGroup
        label="Fruits"
        options={["apple", "pear"]}
        onChange={onChange}
      />,
    );
    expect(screen.getByRole("group", { name: "Fruits" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("checkbox", { name: "pear" }));
    expect(onChange).toHaveBeenCalledWith(["pear"]);
  });
});
