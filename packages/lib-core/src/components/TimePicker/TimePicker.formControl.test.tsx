import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  FormControl,
  FormErrorMessage,
  FormField,
  FormHelperText,
  FormLabel,
} from "../FormControl";
import TimePicker from "./TimePicker";

describe("TimePicker inside a FormControl", () => {
  it("takes the field id, label and helper text", () => {
    render(
      <FormField id="start" label="Start time" helperText="24-hour clock">
        <TimePicker />
      </FormField>,
    );
    const input = screen.getByLabelText("Start time");
    expect(input).toHaveAttribute("id", "start");
    expect(input).toHaveAttribute("aria-labelledby", "start-label");
    expect(screen.getByRole("textbox", { name: "Start time" })).toBe(input);
    expect(input.getAttribute("aria-describedby")).toContain("start-helper");
    expect(input).not.toHaveAttribute("aria-invalid");
  });

  it("merges a consumer aria-describedby with the helper id", () => {
    render(
      <FormControl id="f">
        <FormLabel>Start</FormLabel>
        <TimePicker aria-describedby="extra" />
        <FormHelperText>Help</FormHelperText>
      </FormControl>,
    );
    const ids = screen
      .getByLabelText("Start")
      .getAttribute("aria-describedby")
      ?.split(" ");
    expect(ids).toEqual(expect.arrayContaining(["f-helper", "extra"]));
  });

  it("reflects invalid and required from the context", () => {
    render(
      <FormControl id="f" invalid required>
        <FormLabel>Start</FormLabel>
        <TimePicker />
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>,
    );
    const input = screen.getByLabelText(/Start/);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toBeRequired();
    expect(input.getAttribute("aria-describedby")).toContain("f-error");
  });

  it("is disabled by the context", () => {
    render(
      <FormControl disabled>
        <FormLabel>Start</FormLabel>
        <TimePicker />
      </FormControl>,
    );
    expect(screen.getByLabelText("Start")).toBeDisabled();
  });

  it("lets explicit props win over the context", () => {
    render(
      <FormControl disabled required>
        <FormLabel>Start</FormLabel>
        <TimePicker disabled={false} required={false} id="own" />
      </FormControl>,
    );
    const input = screen.getByRole("textbox");
    expect(input).toBeEnabled();
    expect(input).not.toBeRequired();
    expect(input).toHaveAttribute("id", "own");
  });

  it("does not open, type or clear while read-only", async () => {
    const user = userEvent.setup();
    render(
      <FormControl readOnly>
        <FormLabel>Start</FormLabel>
        <TimePicker defaultValue={new Date(2024, 0, 1, 9, 30, 0)} />
      </FormControl>,
    );
    const input = screen.getByLabelText("Start");
    expect(input).toHaveAttribute("readonly");
    await user.click(input);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.type(input, "1");
    expect(input).toHaveValue("09:30:00");
    expect(
      screen.queryByRole("button", { name: /clear/i }),
    ).not.toBeInTheDocument();
  });

  it("keeps an explicit aria-label over the FormLabel", () => {
    render(
      <FormControl>
        <FormLabel>Start</FormLabel>
        <TimePicker aria-label="Departure" />
      </FormControl>,
    );
    const input = screen.getByRole("textbox", { name: "Departure" });
    expect(input).not.toHaveAttribute("aria-labelledby");
  });
});

describe("TimePicker root and control attributes", () => {
  it("applies style, className and data-* to the root and aria-* to the input", () => {
    const { container } = render(
      <>
        <span id="lbl">Arrival</span>
        <span id="desc">Local time</span>
        <TimePicker
          className="custom"
          style={{ margin: "4px" }}
          data-testid="root"
          data-foo="bar"
          aria-labelledby="lbl"
          aria-describedby="desc"
        />
      </>,
    );
    const root = screen.getByTestId("root");
    expect(root).toBe(container.querySelector(".custom"));
    expect(root).toHaveAttribute("data-foo", "bar");
    expect(root.style.margin).toBe("4px");
    const input = screen.getByRole("textbox", { name: "Arrival" });
    expect(input).toHaveAttribute("aria-describedby", "desc");
  });
});
