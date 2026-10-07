import React, { StrictMode, createRef, useState } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import Switch from "./Switch";

const getRoot = (input: HTMLElement) => input.closest("label") as HTMLElement;

describe("Switch", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders an unchecked switch labelled by its label", () => {
    render(<Switch label="Wi-Fi" />);
    const input = screen.getByRole("switch", { name: "Wi-Fi" });
    expect(input).not.toBeChecked();
    expect(input).toBeEnabled();
    expect(getRoot(input)).toHaveClass("switch", "medium");
  });

  it("respects defaultChecked", () => {
    render(<Switch label="Wi-Fi" defaultChecked />);
    const input = screen.getByRole("switch", { name: "Wi-Fi" });
    expect(input).toBeChecked();
    expect(getRoot(input)).toHaveClass("checked");
  });

  it("toggles uncontrolled state and calls onChange with checked and event", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch label="Wi-Fi" onChange={onChange} />);
    const input = screen.getByRole("switch", { name: "Wi-Fi" });

    await user.click(input);
    expect(input).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(
      true,
      expect.objectContaining({ target: input }),
    );

    await user.click(screen.getByText("Wi-Fi"));
    expect(input).not.toBeChecked();
    expect(onChange).toHaveBeenLastCalledWith(false, expect.anything());
  });

  it("toggles with the Space key", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch label="Wi-Fi" onChange={onChange} />);
    await user.tab();
    const input = screen.getByRole("switch", { name: "Wi-Fi" });
    expect(input).toHaveFocus();
    await user.keyboard(" ");
    expect(input).toBeChecked();
    expect(onChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it("stays in sync with the controlled checked prop", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(
      <Switch label="Wi-Fi" checked={false} onChange={onChange} />,
    );
    const input = screen.getByRole("switch", { name: "Wi-Fi" });

    await user.click(input);
    expect(onChange).toHaveBeenCalledWith(true, expect.anything());
    expect(input).not.toBeChecked();

    rerender(<Switch label="Wi-Fi" checked onChange={onChange} />);
    expect(input).toBeChecked();
  });

  it("works as a controlled component driven by onChange", async () => {
    const user = userEvent.setup();
    const Controlled = () => {
      const [on, setOn] = useState(false);
      return <Switch label="Wi-Fi" checked={on} onChange={setOn} />;
    };
    render(<Controlled />);
    const input = screen.getByRole("switch", { name: "Wi-Fi" });
    await user.click(input);
    expect(input).toBeChecked();
    await user.click(input);
    expect(input).not.toBeChecked();
  });

  it("does not toggle when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch label="Wi-Fi" disabled onChange={onChange} />);
    const input = screen.getByRole("switch", { name: "Wi-Fi" });
    expect(input).toBeDisabled();
    expect(getRoot(input)).toHaveClass("disabled");
    await user.click(input);
    expect(input).not.toBeChecked();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("does not toggle when loading", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch label="Wi-Fi" loading onChange={onChange} />);
    const input = screen.getByRole("switch", { name: "Wi-Fi" });
    expect(input).toBeDisabled();
    expect(getRoot(input)).toHaveClass("loading");
    await user.click(input);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("calls onFocus and onBlur", async () => {
    const user = userEvent.setup();
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    render(<Switch label="Wi-Fi" onFocus={onFocus} onBlur={onBlur} />);
    await user.tab();
    expect(onFocus).toHaveBeenCalledTimes(1);
    await user.tab();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it.each(["small", "medium", "large"] as const)(
    "applies the %s size class",
    (size) => {
      render(<Switch label="S" size={size} />);
      expect(getRoot(screen.getByRole("switch"))).toHaveClass(size);
    },
  );

  it("adds checkedLarge when large and checked", () => {
    render(<Switch label="S" size="large" defaultChecked />);
    expect(getRoot(screen.getByRole("switch"))).toHaveClass("checkedLarge");
  });

  it("applies square shape and custom className", () => {
    render(<Switch label="S" shape="square" className="mine" />);
    expect(getRoot(screen.getByRole("switch"))).toHaveClass("square", "mine");
  });

  it("keeps the semantic color class while toggling, without inline thumb colors", async () => {
    const user = userEvent.setup();
    const { container } = render(<Switch label="S" color="warning" />);
    const thumb = container.querySelector(".thumb") as HTMLElement;
    expect(getRoot(screen.getByRole("switch"))).toHaveClass("warning");
    await user.click(screen.getByRole("switch"));
    expect(getRoot(screen.getByRole("switch"))).toHaveClass(
      "warning",
      "checked",
    );
    expect(thumb.style.backgroundColor).toBe("");
  });

  it("applies custom label, track and thumb styles", () => {
    const { container } = render(
      <Switch
        label="S"
        labelStyle={{ margin: "3px" }}
        trackStyle={{ opacity: "0.5" }}
        thumbStyle={{ width: "10px" }}
      />,
    );
    expect(getRoot(screen.getByRole("switch")).style.margin).toBe("3px");
    expect(
      (container.querySelector(".track") as HTMLElement).style.opacity,
    ).toBe("0.5");
    expect((container.querySelector(".thumb") as HTMLElement).style.width).toBe(
      "10px",
    );
  });

  it("places the label before the control when labelPlacement is start", () => {
    const { container } = render(
      <Switch label="Start" labelPlacement="start" />,
    );
    const root = container.querySelector("label") as HTMLElement;
    expect(root.firstElementChild).toHaveTextContent("Start");
  });

  it("places the label after the control by default", () => {
    const { container } = render(<Switch label="End" />);
    const root = container.querySelector("label") as HTMLElement;
    expect(root.lastElementChild).toHaveTextContent("End");
  });

  it("renders the icon inside the thumb or after the control", () => {
    const { container, rerender } = render(
      <Switch label="S" icon={<span data-testid="icon" />} />,
    );
    expect(container.querySelector(".thumb")).toContainElement(
      screen.getByTestId("icon"),
    );

    rerender(
      <Switch
        label="S"
        icon={<span data-testid="icon" />}
        iconPlacement="end"
      />,
    );
    expect(container.querySelector(".thumb")).not.toContainElement(
      screen.getByTestId("icon"),
    );
  });

  it("shows a temporary ripple on click", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Switch label="S" />);
    const input = screen.getByRole("switch");
    await user.click(input);
    expect(getRoot(input)).toHaveClass("ripple");
    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(getRoot(input)).not.toHaveClass("ripple");
  });

  it("does not render a ripple when ripple is false", async () => {
    const user = userEvent.setup();
    const { container } = render(<Switch label="S" ripple={false} />);
    await user.click(screen.getByRole("switch"));
    expect(container.querySelector(".rippleEffect")).not.toBeInTheDocument();
    expect(container.querySelector("label")).not.toHaveClass("ripple");
  });

  it("exposes role=switch with aria-checked reflecting state", async () => {
    const user = userEvent.setup();
    render(<Switch label="Wi-Fi" />);
    const control = screen.getByRole("switch", { name: "Wi-Fi" });
    expect(control).toHaveAttribute("type", "checkbox");
    expect(control).toHaveAttribute("aria-checked", "false");
    expect(control).not.toHaveAttribute("aria-disabled");
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();

    await user.click(control);
    expect(control).toHaveAttribute("aria-checked", "true");
  });

  it("reflects the controlled checked prop in aria-checked", () => {
    const { rerender } = render(<Switch label="Wi-Fi" checked={false} />);
    const control = screen.getByRole("switch");
    expect(control).toHaveAttribute("aria-checked", "false");
    rerender(<Switch label="Wi-Fi" checked />);
    expect(control).toHaveAttribute("aria-checked", "true");
  });

  it("toggles with the Enter key", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch label="Wi-Fi" onChange={onChange} />);
    await user.tab();
    const control = screen.getByRole("switch", { name: "Wi-Fi" });
    expect(control).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(control).toBeChecked();
    expect(control).toHaveAttribute("aria-checked", "true");
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true, expect.anything());
    await user.keyboard("{Enter}");
    expect(control).not.toBeChecked();
    expect(onChange).toHaveBeenLastCalledWith(false, expect.anything());
  });

  it.each([
    ["disabled", { disabled: true }],
    ["loading", { loading: true }],
  ] as const)(
    "marks the switch aria-disabled and blocks toggling when %s",
    async (_, props) => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Switch label="Wi-Fi" onChange={onChange} {...props} />);
      const control = screen.getByRole("switch", { name: "Wi-Fi" });
      expect(control).toHaveAttribute("aria-disabled", "true");
      expect(control).toHaveAttribute("aria-checked", "false");

      await user.click(control);
      control.focus();
      await user.keyboard("{Enter}");
      await user.keyboard(" ");
      expect(control).toHaveAttribute("aria-checked", "false");
      expect(onChange).not.toHaveBeenCalled();
    },
  );

  it("sets aria-busy while loading", () => {
    const { rerender } = render(<Switch label="Wi-Fi" />);
    expect(screen.getByRole("switch")).not.toHaveAttribute("aria-busy");
    rerender(<Switch label="Wi-Fi" loading />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-busy", "true");
  });

  describe("regressions", () => {
    it.each([
      ["top", "labelTop"],
      ["bottom", "labelBottom"],
    ] as const)(
      "renders the label when labelPlacement is %s",
      (placement, className) => {
        const { container } = render(
          <Switch label="Wi-Fi" labelPlacement={placement} />,
        );
        expect(screen.getByText("Wi-Fi")).toBeInTheDocument();
        expect(
          screen.getByRole("switch", { name: "Wi-Fi" }),
        ).toBeInTheDocument();
        const root = container.querySelector("label") as HTMLElement;
        expect(root).toHaveClass(className);
        if (placement === "top") {
          expect(root.firstElementChild).toHaveTextContent("Wi-Fi");
        } else {
          expect(root.lastElementChild).toHaveTextContent("Wi-Fi");
        }
      },
    );

    it.each([
      ["start", "labelStart"],
      ["end", "labelEnd"],
    ] as const)("adds a placement class for %s", (placement, className) => {
      const { container } = render(
        <Switch label="Wi-Fi" labelPlacement={placement} />,
      );
      expect(container.querySelector("label")).toHaveClass(className);
    });

    it("forwards the ref to the <input>", () => {
      const ref = createRef<HTMLInputElement>();
      render(<Switch label="Wi-Fi" ref={ref} />);
      expect(ref.current).toBe(screen.getByRole("switch"));
    });

    it("calls onChange exactly once per toggle under StrictMode", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        <StrictMode>
          <Switch label="Wi-Fi" onChange={onChange} />
        </StrictMode>,
      );
      await user.click(screen.getByRole("switch"));
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(screen.getByRole("switch")).toBeChecked();
    });

    it("follows the controlled prop on every render (controlled -> new value)", async () => {
      const user = userEvent.setup();
      const Parent = () => {
        const [on, setOn] = useState(true);
        return (
          <>
            <Switch label="Wi-Fi" checked={on} />
            <button type="button" onClick={() => setOn((v) => !v)}>
              flip
            </button>
          </>
        );
      };
      render(
        <StrictMode>
          <Parent />
        </StrictMode>,
      );
      const control = screen.getByRole("switch");
      expect(control).toBeChecked();
      await user.click(screen.getByRole("button", { name: "flip" }));
      expect(control).not.toBeChecked();
      expect(control).toHaveAttribute("aria-checked", "false");
    });

    it("clears the ripple timer on unmount", async () => {
      vi.useFakeTimers({ shouldAdvanceTime: true });
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      const { unmount } = render(<Switch label="S" />);
      await user.click(screen.getByRole("switch"));
      expect(vi.getTimerCount()).toBeGreaterThan(0);
      unmount();
      expect(vi.getTimerCount()).toBe(0);
    });
  });
});
