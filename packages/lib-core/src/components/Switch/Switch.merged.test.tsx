// Behaviours ported from @novel-isr/ui's Switch tests (ui-* hooks, children
// label, bilateral labels, segmented variant, FormControl integration).
import React, { createRef, useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Switch from "./Switch";
import type { SwitchProps } from "./types";
import {
  FormControlContext,
  type FormControlContextValue,
} from "../FormControl/context";

const field = (
  overrides: Partial<FormControlContextValue> = {},
): FormControlContextValue => ({
  id: "field",
  helperId: "field-helper",
  errorId: "field-error",
  labelId: "field-label",
  invalid: false,
  required: false,
  disabled: false,
  readOnly: false,
  hasHelperText: false,
  hasErrorMessage: false,
  registerHelperText: () => {},
  registerErrorMessage: () => {},
  ...overrides,
});

function Controlled(props: SwitchProps) {
  const [checked, setChecked] = useState(false);
  return (
    <Switch {...props} checked={checked} onChange={(c) => setChecked(c)} />
  );
}

const rootOf = (el: HTMLElement) => el.closest(".ui-switch-root")!;

describe("Switch slider (merged capabilities)", () => {
  it("renders ui-* hooks and data-state", () => {
    render(<Switch ariaLabel="Dark" />);
    const sw = screen.getByRole("switch", { name: "Dark" });
    expect(sw).toHaveClass("ui-switch-control");
    expect(rootOf(sw)).toHaveClass(
      "ui-switch-size-md",
      "ui-switch-color-brand",
    );
    expect(rootOf(sw)).toHaveAttribute("data-state", "unchecked");
    expect(rootOf(sw).querySelector(".ui-switch-thumb")).not.toBeNull();
  });

  it.each([
    ["large", "success", "ui-switch-size-lg", "ui-switch-color-success"],
    ["small", "error", "ui-switch-size-sm", "ui-switch-color-danger"],
    ["medium", "info", "ui-switch-size-md", "ui-switch-color-info"],
  ] as const)("maps size %s / color %s", (size, color, sizeCls, colorCls) => {
    render(
      <Switch ariaLabel="x" size={size} color={color} className="consumer" />,
    );
    expect(rootOf(screen.getByRole("switch"))).toHaveClass(
      sizeCls,
      colorCls,
      "consumer",
    );
  });

  it("emits no ui color class for custom CSS colors", () => {
    render(<Switch ariaLabel="x" color="#ff0000" />);
    expect(rootOf(screen.getByRole("switch")).className).not.toMatch(
      /ui-switch-color/,
    );
  });

  it("renders children as the label text", () => {
    render(<Switch>Dark mode</Switch>);
    expect(screen.getByText("Dark mode")).toHaveClass("ui-switch-text");
    expect(
      screen.getByRole("switch", { name: "Dark mode" }),
    ).toBeInTheDocument();
  });

  it("reflects controlled state on the root data-state", async () => {
    const user = userEvent.setup();
    render(<Controlled ariaLabel="x" />);
    const sw = screen.getByRole("switch");
    await user.click(sw);
    expect(sw).toBeChecked();
    expect(rootOf(sw)).toHaveAttribute("data-state", "checked");
    expect(sw).toHaveAttribute("data-state", "checked");
  });

  it("bilateral labels set the state directly and highlight the active side", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    function App() {
      const [checked, setChecked] = useState(false);
      return (
        <Switch
          ariaLabel="Mode"
          offLabel="BFF"
          onLabel="Mock"
          checked={checked}
          onChange={(c, e) => {
            onChange(c, e);
            setChecked(c);
          }}
        />
      );
    }
    render(<App />);
    const sw = screen.getByRole("switch", { name: "Mode" });
    const off = screen.getByRole("button", { name: "BFF" });
    const on = screen.getByRole("button", { name: "Mock" });
    expect(rootOf(sw)).toHaveClass("ui-switch-bilateral", "bilateral");
    expect(rootOf(sw).tagName).toBe("SPAN");
    expect(off).toHaveClass(
      "ui-switch-side",
      "ui-switch-side-off",
      "ui-switch-side-active",
    );
    await user.click(on);
    expect(sw).toBeChecked();
    expect(onChange).toHaveBeenLastCalledWith(
      true,
      expect.objectContaining({ type: "change" }),
    );
    expect(on).toHaveClass("ui-switch-side-on", "ui-switch-side-active");
    expect(off).not.toHaveClass("ui-switch-side-active");
    await user.click(on);
    expect(onChange).toHaveBeenCalledTimes(1);
    await user.click(off);
    expect(sw).not.toBeChecked();
  });

  it("uncontrolled bilateral labels change state and stay in sync", async () => {
    const user = userEvent.setup();
    render(<Switch ariaLabel="x" offLabel="Off" onLabel="On" />);
    await user.click(screen.getByRole("button", { name: "On" }));
    expect(screen.getByRole("switch")).toBeChecked();
    expect(rootOf(screen.getByRole("switch"))).toHaveAttribute(
      "data-state",
      "checked",
    );
    expect(screen.getByRole("button", { name: "On" })).toHaveClass(
      "ui-switch-side-active",
    );
  });

  it("prefers bilateral labels over the label / children", () => {
    render(
      <Switch ariaLabel="x" offLabel="Off" onLabel="On" label="Ignored">
        Ignored too
      </Switch>,
    );
    expect(screen.queryByText("Ignored")).toBeNull();
    expect(screen.queryByText("Ignored too")).toBeNull();
  });

  it("disabled blocks the switch and side labels", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Switch
        ariaLabel="x"
        disabled
        offLabel="Off"
        onLabel="On"
        icon={<i data-testid="end-icon" />}
        iconPlacement="end"
        onChange={onChange}
      />,
    );
    const sw = screen.getByRole("switch");
    expect(sw).toBeDisabled();
    expect(rootOf(sw)).toHaveAttribute("data-disabled", "true");
    expect(screen.getByRole("button", { name: "On" })).toBeDisabled();
    expect(screen.getByTestId("end-icon")).toBeInTheDocument();
    await user.click(sw);
    await user.click(screen.getByRole("button", { name: "On" }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("forwards the ref and passes id / value to the input", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Switch ref={ref} ariaLabel="x" id="sw" value="on" />);
    expect(ref.current).toBe(screen.getByRole("switch"));
    expect(ref.current).toHaveAttribute("id", "sw");
    expect(ref.current).toHaveAttribute("value", "on");
  });

  it("inherits disabled from a FormControl unless overridden", () => {
    const { rerender } = render(
      <FormControlContext.Provider value={field({ disabled: true })}>
        <Switch ariaLabel="x" />
      </FormControlContext.Provider>,
    );
    expect(screen.getByRole("switch")).toBeDisabled();
    rerender(
      <FormControlContext.Provider value={field({ disabled: true })}>
        <Switch ariaLabel="x" disabled={false} />
      </FormControlContext.Provider>,
    );
    expect(screen.getByRole("switch")).toBeEnabled();
  });

  it("takes id, description, invalid and required from a FormControl", () => {
    render(
      <FormControlContext.Provider
        value={field({
          id: "notify",
          invalid: true,
          required: true,
          hasErrorMessage: true,
        })}
      >
        <Switch ariaLabel="Notify" />
        <span id="field-error">Must be on</span>
      </FormControlContext.Provider>,
    );
    const sw = screen.getByRole("switch");
    expect(sw).toHaveAttribute("id", "notify");
    expect(sw).toHaveAttribute("aria-invalid", "true");
    expect(sw).toHaveAttribute("aria-required", "true");
    expect(sw).toHaveAccessibleDescription("Must be on");
  });

  it("does not toggle inside a read-only FormControl", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <FormControlContext.Provider value={field({ readOnly: true })}>
        <Switch ariaLabel="x" onChange={onChange} />
      </FormControlContext.Provider>,
    );
    const sw = screen.getByRole("switch");
    expect(sw).toHaveAttribute("aria-readonly", "true");
    await user.click(sw);
    expect(sw).not.toBeChecked();
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe("Switch segmented", () => {
  it("renders a group of two pressed-state buttons and no switch", () => {
    render(
      <Switch
        variant="segmented"
        offLabel="BFF"
        onLabel="Mock"
        checked={false}
        ariaLabel="Source"
      />,
    );
    expect(screen.queryByRole("switch")).toBeNull();
    const group = screen.getByRole("group", { name: "Source" });
    expect(group).toHaveClass(
      "ui-switch-segmented",
      "ui-switch-segmented-size-md",
      "ui-switch-color-brand",
    );
    expect(screen.getByRole("button", { name: "BFF" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "Mock" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("switches state when a segment is clicked (controlled)", async () => {
    const user = userEvent.setup();
    render(<Controlled variant="segmented" offLabel="BFF" onLabel="Mock" />);
    await user.click(screen.getByRole("button", { name: "Mock" }));
    const mock = screen.getByRole("button", { name: "Mock" });
    expect(mock).toHaveAttribute("aria-pressed", "true");
    expect(mock).toHaveClass("ui-switch-segment-active", "segmentActive");
    expect(screen.getByRole("group")).toHaveAttribute("data-state", "checked");
  });

  it("submits its value with a name through a hidden input", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <form>
        <Switch variant="segmented" offLabel="A" onLabel="B" name="mock" />
      </form>,
    );
    const form = container.querySelector("form")!;
    expect(new FormData(form).get("mock")).toBeNull();
    await user.click(screen.getByRole("button", { name: "B" }));
    expect(new FormData(form).get("mock")).toBe("on");
  });

  it("disables both segments when disabled", () => {
    render(<Switch variant="segmented" offLabel="A" onLabel="B" disabled />);
    screen.getAllByRole("button").forEach((b) => expect(b).toBeDisabled());
    expect(screen.getByRole("group")).toHaveAttribute("data-disabled", "true");
  });

  it("falls back to a slider when either label is missing", () => {
    render(<Switch variant="segmented" ariaLabel="x" offLabel="A" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
    expect(screen.queryByRole("group")).toBeNull();
  });
});
