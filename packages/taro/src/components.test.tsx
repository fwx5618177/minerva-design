import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { Button, Input, Switch } from "./index";

it("Button forwards clicks and blocks disabled/loading interactions", () => {
  const onClick = vi.fn();
  const { rerender } = render(<Button onClick={onClick}>Save</Button>);
  fireEvent.click(screen.getByRole("button", { name: "Save" }));
  expect(onClick).toHaveBeenCalledTimes(1);
  rerender(
    <Button loading onClick={onClick}>
      Save
    </Button>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Save" }));
  rerender(
    <Button disabled onClick={onClick}>
      Save
    </Button>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Save" }));
  expect(onClick).toHaveBeenCalledTimes(1);
});

it("Input reports a string value and accepts controlled updates", () => {
  const onChange = vi.fn();
  const { container, rerender } = render(
    <Input value="first" onChange={onChange} />,
  );
  const input = container.querySelector("input")!;
  fireEvent.input(input, { target: { value: "next" } });
  expect(onChange).toHaveBeenCalledWith("next");
  rerender(<Input value="server" onChange={onChange} />);
  expect(input.value).toBe("server");
  rerender(<Input value="server" disabled onChange={onChange} />);
  fireEvent.input(input, { target: { value: "blocked" } });
  expect(onChange).toHaveBeenCalledTimes(1);
});

it("Switch exposes a native controlled toggle", () => {
  const onChange = vi.fn();
  const { container, rerender } = render(
    <Switch checked={false} onChange={onChange} />,
  );
  const input = container.querySelector(".mn-switch")!;
  fireEvent.click(input);
  expect(onChange).toHaveBeenCalledWith(true);
  rerender(<Switch checked disabled onChange={onChange} />);
  fireEvent.click(input);
  expect(onChange).toHaveBeenCalledTimes(1);
});
