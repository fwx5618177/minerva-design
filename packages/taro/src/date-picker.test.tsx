import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import * as M from "./index";
it("DatePicker selects bounded calendar days, emits open transitions and clears", () => {
  expect(M).toHaveProperty("DatePicker");
  const change = vi.fn(),
    opened = vi.fn();
  render(
    <M.DatePicker
      label="Start"
      defaultValue="2026-10-15"
      minDate="2026-10-10"
      maxDate="2026-10-20"
      onChange={change}
      onOpenChange={opened}
    />,
  );
  const input = screen.getByRole("textbox", { name: "Start" });
  fireEvent.click(input);
  expect(opened).toHaveBeenLastCalledWith(true);
  fireEvent.click(screen.getByRole("gridcell", { name: "2026-10-09" }));
  expect(change).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole("gridcell", { name: "2026-10-16" }));
  expect(change).toHaveBeenLastCalledWith("2026-10-16");
  expect(input).toHaveValue("2026-10-16");
  expect(opened).toHaveBeenLastCalledWith(false);
  fireEvent.click(screen.getByRole("button", { name: "Clear date" }));
  expect(change).toHaveBeenLastCalledWith("");
  expect(input).toHaveValue("");
});
it("DatePicker rolls back invalid and refused drafts, honors controlled null and form locks", () => {
  expect(M).toHaveProperty("DatePicker");
  const change = vi.fn();
  const { rerender } = render(
    <M.DatePicker value={null} defaultValue="2026-10-15" onChange={change} />,
  );
  const input = screen.getByRole("textbox", { name: "Date" });
  expect(input).toHaveValue("");
  fireEvent.input(input, { target: { value: "2026-02-30" } });
  fireEvent.blur(input);
  expect(change).not.toHaveBeenCalled();
  fireEvent.input(input, { target: { value: "2026-10-17" } });
  expect(change).toHaveBeenLastCalledWith("2026-10-17");
  fireEvent.blur(input);
  expect(input).toHaveValue("");
  rerender(
    <M.FormControl readOnly>
      <M.DatePicker defaultValue="2026-10-15" onChange={change} />
    </M.FormControl>,
  );
  fireEvent.click(screen.getByRole("textbox", { name: "Date" }));
  expect(screen.queryByRole("grid")).not.toBeInTheDocument();
});
it("DatePicker resets external values and keeps explicit false field overrides editable", () => {
  const change = vi.fn();
  const { rerender } = render(
    <M.FormControl disabled readOnly>
      <M.DatePicker
        value="2026-10-15"
        disabled={false}
        readOnly={false}
        minDate="2026-10-10"
        maxDate="2026-10-20"
        onChange={change}
      />
    </M.FormControl>,
  );
  const input = screen.getByRole("textbox", { name: "Date" });
  fireEvent.input(input, { target: { value: "2026-10-09" } });
  fireEvent.blur(input);
  expect(change).not.toHaveBeenCalled();
  expect(input).toHaveValue("2026-10-15");
  fireEvent.click(input);
  expect(screen.getByRole("grid")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("gridcell", { name: "2026-10-16" }));
  expect(change).toHaveBeenLastCalledWith("2026-10-16");
  expect(input).toHaveValue("2026-10-15");
  rerender(<M.DatePicker value="" onChange={change} />);
  const updated = screen.getByRole("textbox", { name: "Date" });
  expect(updated).toHaveValue("");
  fireEvent.input(updated, { target: { value: "draft" } });
  rerender(<M.DatePicker value="2026-11-01" onChange={change} />);
  expect(updated).toHaveValue("2026-11-01");
});
