import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { Input, TimePicker, Cascader } from "./index";

it("H5 Input confirms Enter with its current text without leaking onConfirm to the DOM", () => {
  const error = vi.spyOn(console, "error");
  const confirm = vi.fn();
  const w = render(<Input defaultValue="draft" onConfirm={confirm} />);
  try {
    const input = screen.getByRole("textbox");
    fireEvent.keyDown(input, { key: "Enter", keyCode: 13 });
    expect(confirm).toHaveBeenCalledOnce();
    expect(confirm.mock.calls[0][0]).toMatchObject({
      type: "confirm",
      detail: { value: "draft" },
    });
    fireEvent.keyDown(input, { key: "Enter", isComposing: true });
    fireEvent.keyDown(input, { key: "Enter", repeat: true });
    fireEvent.keyDown(input, { key: "Escape" });
    expect(confirm).toHaveBeenCalledOnce();
    expect(error).not.toHaveBeenCalled();
    w.rerender(<Input defaultValue="draft" onConfirm={confirm} readOnly />);
    fireEvent.keyDown(input, { key: "Enter" });
    expect(confirm).toHaveBeenCalledOnce();
    w.rerender(<Input defaultValue="draft" onConfirm={confirm} disabled />);
    fireEvent.keyDown(input, { key: "Enter" });
    expect(confirm).toHaveBeenCalledOnce();
  } finally {
    error.mockRestore();
  }
});
it("H5 TimePicker Enter commits the draft and closes its panel without blur", () => {
  const change = vi.fn();
  render(<TimePicker format="HH:mm" label="Meeting time" onChange={change} />);
  const input = screen.getByRole("textbox", { name: "Meeting time" });
  fireEvent.click(input);
  fireEvent.input(input, { target: { value: "14:30" } });
  expect(screen.getByRole("listbox", { name: "Hours" })).toBeInTheDocument();
  fireEvent.keyDown(input, { key: "Enter" });
  expect(screen.queryAllByRole("listbox")).toHaveLength(0);
  expect(input).toHaveValue("14:30");
  expect(change.mock.calls.at(-1)?.[0].getHours()).toBe(14);
});

it("H5 Cascader hover expands children without leaking native long-press handlers", () => {
  const error = vi.spyOn(console, "error");
  try {
    render(
      <Cascader
        defaultOpen
        expandTrigger="hover"
        options={[
          {
            value: "parent",
            label: "Parent",
            children: [{ value: "child", label: "Child" }],
          },
        ]}
      />,
    );
    fireEvent.mouseEnter(screen.getByRole("option", { name: /Parent/ }));
    expect(screen.getByRole("option", { name: "Child" })).toBeInTheDocument();
    expect(error).not.toHaveBeenCalled();
  } finally {
    error.mockRestore();
  }
});
