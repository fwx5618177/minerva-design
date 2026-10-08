import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { defineComponent, h } from "vue";
import {
  FormControl,
  FormErrorMessage,
  FormField,
  FormHelperText,
  FormLabel,
} from "../FormControl";
import { TimePicker } from ".";

const renderTree = (
  tree: () => ReturnType<typeof h> | ReturnType<typeof h>[],
) => render(defineComponent(() => tree));

describe("TimePicker inside a FormControl", () => {
  it("takes the field id, label and helper text", async () => {
    renderTree(() =>
      h(
        FormField,
        { id: "start", label: "Start time", helperText: "24-hour clock" },
        () => h(TimePicker),
      ),
    );
    const input = await screen.findByLabelText("Start time");
    expect(input).toHaveAttribute("id", "start");
    expect(input).toHaveAttribute("aria-labelledby", "start-label");
    expect(screen.getByRole("textbox", { name: "Start time" })).toBe(input);
    await waitFor(() =>
      expect(input.getAttribute("aria-describedby")).toContain("start-helper"),
    );
    expect(input).not.toHaveAttribute("aria-invalid");
  });

  it("merges a consumer aria-describedby with the helper id", async () => {
    renderTree(() =>
      h(FormControl, { id: "f" }, () => [
        h(FormLabel, null, () => "Start"),
        h(TimePicker, { "aria-describedby": "extra" }),
        h(FormHelperText, null, () => "Help"),
      ]),
    );
    await waitFor(() =>
      expect(
        screen
          .getByLabelText("Start")
          .getAttribute("aria-describedby")
          ?.split(" "),
      ).toEqual(expect.arrayContaining(["f-helper", "extra"])),
    );
  });

  it("reflects invalid and required from the context", async () => {
    const { container } = renderTree(() =>
      h(FormControl, { id: "f", invalid: true, required: true }, () => [
        h(FormLabel, null, () => "Start"),
        h(TimePicker),
        h(FormErrorMessage, null, () => "Required"),
      ]),
    );
    const input = screen.getByLabelText(/Start/);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toBeRequired();
    await waitFor(() =>
      expect(input.getAttribute("aria-describedby")).toContain("f-error"),
    );
    expect(
      container.querySelector('[data-minerva="time-picker"]'),
    ).toHaveAttribute("data-invalid", "");
  });

  it("is disabled by the context", () => {
    renderTree(() =>
      h(FormControl, { disabled: true }, () => [
        h(FormLabel, null, () => "Start"),
        h(TimePicker),
      ]),
    );
    expect(screen.getByLabelText("Start")).toBeDisabled();
  });

  it("lets explicit props win over the context", () => {
    renderTree(() =>
      h(FormControl, { disabled: true, required: true }, () => [
        h(FormLabel, null, () => "Start"),
        h(TimePicker, { disabled: false, required: false, id: "own" }),
      ]),
    );
    const input = screen.getByRole("textbox");
    expect(input).toBeEnabled();
    expect(input).not.toBeRequired();
    expect(input).toHaveAttribute("id", "own");
  });

  it("does not open, type or clear while read-only", async () => {
    const user = userEvent.setup();
    renderTree(() =>
      h(FormControl, { readOnly: true }, () => [
        h(FormLabel, null, () => "Start"),
        h(TimePicker, { defaultValue: new Date(2024, 0, 1, 9, 30, 0) }),
      ]),
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
    renderTree(() =>
      h(FormControl, null, () => [
        h(FormLabel, null, () => "Start"),
        h(TimePicker, { "aria-label": "Departure" }),
      ]),
    );
    const input = screen.getByRole("textbox", { name: "Departure" });
    expect(input).not.toHaveAttribute("aria-labelledby");
  });
});

describe("TimePicker root and control attributes", () => {
  it("applies style, class and data-* to the root and aria-* to the input", () => {
    const { container } = renderTree(() => [
      h("span", { id: "lbl" }, "Arrival"),
      h("span", { id: "desc" }, "Local time"),
      h(TimePicker, {
        class: "custom",
        style: { margin: "4px" },
        "data-testid": "root",
        "data-foo": "bar",
        "aria-labelledby": "lbl",
        "aria-describedby": "desc",
      }),
    ]);
    const root = screen.getByTestId("root");
    expect(root).toBe(container.querySelector(".custom"));
    expect(root).toHaveAttribute("data-foo", "bar");
    expect(root.style.margin).toBe("4px");
    const input = screen.getByRole("textbox", { name: "Arrival" });
    expect(input).toHaveAttribute("aria-describedby", "desc");
  });
});
