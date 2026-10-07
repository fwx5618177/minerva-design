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
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "../FormControl";

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
    render(<Switch aria-label="Dark" />);
    const sw = screen.getByRole("switch", { name: "Dark" });
    expect(rootOf(sw)).toHaveClass(styles.medium, styles.primary);
    expect(sw).not.toBeChecked();
    expect(rootOf(sw).querySelector(`.${styles.thumb}`)).not.toBeNull();
  });

  it.each([
    ["large", "success"],
    ["small", "danger"],
    ["medium", "info"],
  ] as const)("maps size %s / color %s", (size, color) => {
    render(
      <Switch aria-label="x" size={size} color={color} className="consumer" />,
    );
    expect(rootOf(screen.getByRole("switch"))).toHaveClass(
      styles[size],
      styles[color],
      "consumer",
    );
  });

  it("emits only the selected color class", () => {
    render(<Switch aria-label="x" color="warning" />);
    const root = rootOf(screen.getByRole("switch"));
    expect(root).toHaveClass(styles.warning);
    for (const role of ["primary", "success", "danger", "info"]) {
      expect(root).not.toHaveClass(styles[role]);
    }
  });

  it("applies the color class to the segmented variant", () => {
    render(
      <Switch
        aria-label="Mode"
        variant="segmented"
        offLabel="Off"
        onLabel="On"
        color="success"
      />,
    );
    expect(screen.getByRole("group", { name: "Mode" })).toHaveClass(
      styles.segmented,
      styles.success,
    );
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
    render(<Controlled aria-label="x" />);
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
          aria-label="Mode"
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
    render(<Switch aria-label="x" offLabel="Off" onLabel="On" />);
    await user.click(screen.getByRole("button", { name: "On" }));
    expect(screen.getByRole("switch")).toBeChecked();
    expect(rootOf(screen.getByRole("switch"))).toHaveClass(styles.checked);
    expect(screen.getByRole("button", { name: "On" })).toHaveClass(
      styles.sideActive,
    );
  });

  it("prefers bilateral labels over the label / children", () => {
    render(
      <Switch aria-label="x" offLabel="Off" onLabel="On" label="Ignored">
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
        aria-label="x"
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
    render(<Switch ref={ref} aria-label="x" id="sw" value="on" />);
    expect(ref.current).toBe(screen.getByRole("switch"));
    expect(ref.current).toHaveAttribute("id", "sw");
    expect(ref.current).toHaveAttribute("value", "on");
  });

  it("inherits disabled from a FormControl unless overridden", () => {
    const { rerender } = render(
      <FormControlContext.Provider value={field({ disabled: true })}>
        <Switch aria-label="x" />
      </FormControlContext.Provider>,
    );
    expect(screen.getByRole("switch")).toBeDisabled();
    rerender(
      <FormControlContext.Provider value={field({ disabled: true })}>
        <Switch aria-label="x" disabled={false} />
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
        <Switch aria-label="Notify" />
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
        <Switch aria-label="x" onChange={onChange} />
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
        aria-label="Source"
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

  it("wires the enclosing FormControl label, helper text and required state to the group", () => {
    render(
      <FormControl required>
        <FormLabel>Data source</FormLabel>
        <Switch variant="segmented" offLabel="BFF" onLabel="Mock" />
        <FormHelperText>Where requests go</FormHelperText>
      </FormControl>,
    );
    const group = screen.getByRole("group", { name: /Data source/ });
    const helper = screen.getByText("Where requests go");
    expect(group.getAttribute("aria-describedby")).toBe(helper.id);
    expect(group).toHaveAccessibleDescription("Where requests go");
    expect(group).not.toHaveAttribute("data-invalid");
    expect(group).toHaveAttribute("data-required", "true");
    // the hidden input stays out of the accessibility tree
    expect(group.querySelector("input")).toHaveAttribute("aria-hidden", "true");
    expect(group.querySelector("input")).not.toHaveAttribute(
      "aria-describedby",
    );
  });

  it("exposes the FormControl error and invalid state on the group", () => {
    render(
      <FormControl invalid>
        <FormLabel>Data source</FormLabel>
        <Switch
          variant="segmented"
          offLabel="BFF"
          onLabel="Mock"
          aria-describedby="extra"
        />
        <FormErrorMessage>Pick a source</FormErrorMessage>
        <span id="extra">Extra</span>
      </FormControl>,
    );
    const group = screen.getByRole("group", { name: /Data source/ });
    const error = screen.getByText("Pick a source");
    expect(group).toHaveAttribute("data-invalid", "true");
    expect(group).not.toHaveAttribute("aria-invalid");
    expect(group.getAttribute("aria-describedby")).toBe(`${error.id} extra`);
    expect(group).toHaveAccessibleDescription("Pick a source Extra");
  });

  it("prefers an explicit aria-label / aria-labelledby over the FormControl label", () => {
    const { rerender } = render(
      <FormControlContext.Provider value={field()}>
        <span id="field-label">Field</span>
        <span id="own">Own label</span>
        <Switch
          variant="segmented"
          offLabel="A"
          onLabel="B"
          aria-labelledby="own"
        />
      </FormControlContext.Provider>,
    );
    expect(screen.getByRole("group", { name: "Own label" })).toBeTruthy();
    rerender(
      <FormControlContext.Provider value={field()}>
        <span id="field-label">Field</span>
        <Switch variant="segmented" offLabel="A" onLabel="B" aria-label="X" />
      </FormControlContext.Provider>,
    );
    const group = screen.getByRole("group", { name: "X" });
    expect(group).not.toHaveAttribute("aria-labelledby");
    expect(group).toHaveAttribute("id", "field");
  });

  it("forwards style and data-* attributes to the group", () => {
    render(
      <Switch
        variant="segmented"
        offLabel="A"
        onLabel="B"
        aria-label="Mode"
        style={{ margin: "2px" }}
        data-testid="seg"
      />,
    );
    const group = screen.getByRole("group", { name: "Mode" });
    expect(group).toHaveAttribute("data-testid", "seg");
    expect(group.style.margin).toBe("2px");
  });

  it("falls back to a slider when either label is missing", () => {
    render(<Switch variant="segmented" aria-label="x" offLabel="A" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
    expect(screen.queryByRole("group")).toBeNull();
  });
});

describe("Switch native attributes", () => {
  it("forwards aria-labelledby / aria-describedby to the input and data-* to the root", () => {
    render(
      <>
        <span id="lbl">Wi-Fi</span>
        <span id="desc">Uses more battery</span>
        <Switch
          aria-labelledby="lbl"
          aria-describedby="desc"
          data-track="wifi"
        />
      </>,
    );
    const input = screen.getByRole("switch", { name: "Wi-Fi" });
    expect(input).toHaveAccessibleDescription("Uses more battery");
    expect(rootOf(input)).toHaveAttribute("data-track", "wifi");
    expect(input).not.toHaveAttribute("data-track");
  });
});
