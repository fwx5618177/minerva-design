import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Select } from "./Select";

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana", disabled: true },
  { label: "Cherry", value: "cherry" },
];

describe("Select (react-native-web)", () => {
  it("a DOM combobox opening radio options; a click picks", async () => {
    const onChange = vi.fn();
    render(<Select label="Fruit" options={options} onChange={onChange} />);
    const trigger = screen.getByRole("combobox", { name: "Fruit" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("data-minerva", "select");
    expect(trigger).toHaveAttribute("data-part", "trigger");
    await act(async () => {
      fireEvent.click(trigger);
    });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(await screen.findByRole("dialog", { name: "Fruit" })).toBeTruthy();
    const banana = screen.getByRole("radio", { name: "Banana" });
    expect(banana).toHaveAttribute("aria-disabled", "true");
    await act(async () => {
      fireEvent.click(screen.getByRole("radio", { name: "Cherry" }));
    });
    expect(onChange).toHaveBeenCalledWith("cherry");
  });

  it("multiple mode: checkboxes and confirm", async () => {
    const onChange = vi.fn();
    render(
      <Select multiple defaultOpen options={options} onChange={onChange} />,
    );
    const apple = await screen.findByRole("checkbox", { name: "Apple" });
    await act(async () => {
      fireEvent.click(apple);
    });
    expect(screen.getByRole("checkbox", { name: "Apple" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Confirm" }));
    });
    expect(onChange).toHaveBeenCalledWith(["apple"]);
  });
});
