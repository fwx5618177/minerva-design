// Switch behaviour: size/color classes, children label, bilateral labels,
// segmented variant and FormControl integration.
import React, { createRef, useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Switch from "./Switch";
import type { SwitchProps } from "./types";
import styles from "./switch.module.scss";
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

const rootOf = (el: HTMLElement) =>
  el.closest<HTMLElement>(`.${styles.switch}`)!;

describe("Switch slider", () => {
  it("renders the default size / color classes and a thumb", () => {
    render(<Switch ariaLabel="Dark" />);
    const sw = screen.getByRole("switch", { name: "Dark" });
    expect(rootOf(sw)).toHaveClass(styles.medium, styles.primary);
    expect(sw).not.toBeChecked();
    expect(rootOf(sw).querySelector(`.${styles.thumb}`)).not.toBeNull();
  });

  it.each([
    ["large", "success"],
    ["small", "error"],
    ["medium", "info"],
  ] as const)("maps size %s / color %s", (size, color) => {
    render(
      <Switch ariaLabel="x" size={size} color={color} className="consumer" />,
    );
    expect(rootOf(screen.getByRole("switch"))).toHaveClass(
      styles[size],
      styles[color],
      "consumer",
    );
  });

  it("emits no theme color class for custom CSS colors", () => {
    render(<Switch ariaLabel="x" color="#ff0000" />);
    const root = rootOf(screen.getByRole("switch"));
    for (const role of ["primary", "success", "error", "info"]) {
      expect(root).not.toHaveClass(styles[role]);
    }
  });

  it("renders children as the label text", () => {
    render(<Switch>Dark mode</Switch>);
    expect(screen.getByText("Dark mode")).toHaveClass(styles.label);
    expect(
      screen.getByRole("switch", { name: "Dark mode" }),
    ).toBeInTheDocument();
  });

  it("reflects controlled state on the root class", async () => {
    const user = userEvent.setup();
    render(<Controlled ariaLabel="x" />);
    const sw = screen.getByRole("switch");
    expect(rootOf(sw)).not.toHaveClass(styles.checked);
    await user.click(sw);
    expect(sw).toBeChecked();
    expect(rootOf(sw)).toHaveClass(styles.checked);
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
    expect(rootOf(sw)).toHaveClass(styles.bilateral);
    expect(rootOf(sw).tagName).toBe("SPAN");
    expect(off).toHaveClass(styles.side, styles.sideActive);
    await user.click(on);
    expect(sw).toBeChecked();
    expect(onChange).toHaveBeenLastCalledWith(
      true,
      expect.objectContaining({ type: "change" }),
    );
    expect(on).toHaveClass(styles.side, styles.sideActive);
    expect(off).not.toHaveClass(styles.sideActive);
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
    expect(rootOf(screen.getByRole("switch"))).toHaveClass(styles.checked);
    expect(screen.getByRole("button", { name: "On" })).toHaveClass(
      styles.sideActive,
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
    expect(rootOf(sw)).toHaveClass(styles.disabled);
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
    expect(group).toHaveClass(styles.segmented, styles.medium, styles.primary);
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
    expect(mock).toHaveClass(styles.segmentActive);
    expect(screen.getByRole("button", { name: "BFF" })).not.toHaveClass(
      styles.segmentActive,
    );
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
    expect(screen.getByRole("group")).toHaveClass(styles.disabled);
  });

  it("falls back to a slider when either label is missing", () => {
    render(<Switch variant="segmented" ariaLabel="x" offLabel="A" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
    expect(screen.queryByRole("group")).toBeNull();
  });
});
