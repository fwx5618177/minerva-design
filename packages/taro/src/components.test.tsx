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
  expect(onChange).toHaveBeenCalledWith(true, expect.any(Object));
  rerender(<Switch checked disabled onChange={onChange} />);
  fireEvent.click(input);
  expect(onChange).toHaveBeenCalledTimes(1);
});

it("Button renders loading replacement and semantic appearance while blocking activation", () => {
  const { rerender } = render(
    <Button
      color="danger"
      size="xsmall"
      variant="link"
      startIcon="Start"
      endIcon="End"
      fullWidth
    >
      Save
    </Button>,
  );
  expect(screen.getByRole("button", { name: "StartSaveEnd" })).toHaveClass(
    "mn-color-danger",
    "mn-size-xsmall",
    "mn-full-width",
  );
  rerender(
    <Button loading loadingText="Saving" startIcon="Start">
      Save
    </Button>,
  );
  expect(screen.getByRole("button", { name: "Saving" })).toHaveAttribute(
    "aria-busy",
    "true",
  );
  expect(screen.queryByText("Start")).not.toBeInTheDocument();
});
it("Input supports uncontrolled editing, clearing and character counts", () => {
  const change = vi.fn();
  const { container } = render(
    <Input
      defaultValue="Ada"
      clearable
      showCharCount
      maxLength={10}
      onChange={change}
    />,
  );
  expect(container.querySelector("input")).toHaveValue("Ada");
  fireEvent.input(container.querySelector("input")!, {
    target: { value: "Grace" },
  });
  expect(screen.getByText("5 / 10")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Clear" }));
  expect(container.querySelector("input")).toHaveValue("");
  expect(change).toHaveBeenLastCalledWith("");
});
it("Switch supports uncontrolled state, labels and read only interaction guards", () => {
  const change = vi.fn();
  const { container, rerender } = render(
    <Switch defaultChecked label="Enabled" onChange={change} />,
  );
  expect(screen.getByRole("switch", { name: "Enabled" })).toHaveAttribute(
    "aria-checked",
    "true",
  );
  fireEvent.click(container.querySelector(".mn-switch")!);
  expect(change).toHaveBeenCalledWith(false, expect.any(Object));
  rerender(<Switch checked readOnly label="Enabled" onChange={change} />);
  fireEvent.click(container.querySelector(".mn-switch")!);
  expect(change).toHaveBeenCalledTimes(1);
});
