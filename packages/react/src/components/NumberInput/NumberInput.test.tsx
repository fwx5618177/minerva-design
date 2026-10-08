import { createRef, useState, type ReactElement } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import i18n from "../../config/i18n";
import { NumberInput, type NumberInputProps } from ".";
import { FormControl, FormHelperText, FormLabel } from "../FormControl";
import styles from "./numberInput.module.scss";

type Extra = Omit<NumberInputProps, "value" | "onChange">;

function Controlled({
  initial = null,
  spy,
  ...props
}: Extra & { initial?: number | null; spy?: (v: number | null) => void }) {
  const [value, setValue] = useState<number | null>(initial);
  return (
    <NumberInput
      aria-label="Qty"
      {...props}
      value={value}
      onChange={(v) => {
        spy?.(v);
        setValue(v);
      }}
    />
  );
}

const field = () => screen.getByRole("spinbutton", { name: "Qty" });
const rootOf = (el: HTMLElement) => el.parentElement!;

describe("NumberInput", () => {
  it("renders a spinbutton with aria-valuemin/max/now", () => {
    render(
      <NumberInput
        aria-label="Qty"
        value={5}
        onChange={vi.fn()}
        min={0}
        max={10}
      />,
    );
    const input = field();
    expect(input).toHaveAttribute("aria-valuemin", "0");
    expect(input).toHaveAttribute("aria-valuemax", "10");
    expect(input).toHaveAttribute("aria-valuenow", "5");
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("inputmode", "decimal");
    expect(input).toHaveClass(styles.field);
    expect(rootOf(input)).toHaveClass(styles.root, styles.medium);
    expect(input).toHaveValue("5");
  });

  it("omits aria-valuenow when value is null and aria-valuemin/max when unbounded", () => {
    render(<NumberInput aria-label="Qty" value={null} onChange={vi.fn()} />);
    const input = field();
    expect(input).not.toHaveAttribute("aria-valuenow");
    expect(input).not.toHaveAttribute("aria-valuemin");
    expect(input).not.toHaveAttribute("aria-valuemax");
    expect(input).toHaveValue("");
  });

  it("formats value using precision inferred from step", () => {
    const { rerender } = render(
      <NumberInput
        aria-label="Qty"
        value={1.5}
        onChange={vi.fn()}
        step={0.01}
      />,
    );
    expect(field()).toHaveValue("1.50");
    rerender(
      <NumberInput
        aria-label="Qty"
        value={2.25}
        onChange={vi.fn()}
        precision={3}
      />,
    );
    expect(field()).toHaveValue("2.250");
    rerender(
      <NumberInput
        aria-label="Qty"
        value={2.5}
        onChange={vi.fn()}
        step={0}
        precision={undefined}
      />,
    );
    expect(field()).toHaveValue("3");
  });

  it("works uncontrolled with defaultValue", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <NumberInput aria-label="Qty" defaultValue={2} onChange={onChange} />,
    );
    await user.click(field());
    await user.keyboard("{ArrowUp}");
    expect(onChange).toHaveBeenLastCalledWith(3);
    expect(field()).toHaveValue("3");
    expect(field()).toHaveAttribute("aria-valuenow", "3");
  });

  it("does not emit onChange while typing, only on blur commit", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    const onBlur = vi.fn();
    render(<Controlled spy={spy} onBlur={onBlur} />);
    await user.type(field(), "-1");
    expect(field()).toHaveValue("-1");
    expect(spy).not.toHaveBeenCalled();
    await user.tab();
    expect(spy).toHaveBeenCalledWith(-1);
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(field()).toHaveAttribute("aria-valuenow", "-1");
  });

  it("keeps an intermediate draft such as '1.' while typing", async () => {
    const user = userEvent.setup();
    render(<Controlled step={0.1} />);
    await user.type(field(), "1.");
    expect(field()).toHaveValue("1.");
    expect(rootOf(field())).not.toHaveClass(styles.invalid);
    await user.type(field(), "25");
    await user.tab();
    expect(field()).toHaveValue("1.3");
  });

  it("commits on Enter by blurring", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<Controlled spy={spy} />);
    await user.type(field(), "42{Enter}");
    expect(spy).toHaveBeenCalledWith(42);
    expect(field()).not.toHaveFocus();
  });

  it("clamps committed values to min/max and rounds to precision", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<Controlled spy={spy} min={0} max={10} />);
    await user.type(field(), "99");
    expect(rootOf(field())).toHaveClass(styles.invalid, styles.shake);
    expect(rootOf(field())).toHaveAttribute("title", "Maximum 10");
    await user.tab();
    expect(spy).toHaveBeenLastCalledWith(10);
    expect(field()).toHaveValue("10");
    expect(rootOf(field())).not.toHaveClass(styles.invalid);

    await user.clear(field());
    await user.type(field(), "3.7");
    await user.tab();
    expect(spy).toHaveBeenLastCalledWith(4);
  });

  it("flags drafts below min", async () => {
    const user = userEvent.setup();
    render(<Controlled min={5} />);
    await user.type(field(), "2");
    expect(rootOf(field())).toHaveAttribute("title", "Minimum 5");
    expect(field()).toHaveAttribute("aria-invalid", "true");
  });

  it("flags non-numeric drafts and reverts them on blur without emitting", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<Controlled initial={3} spy={spy} />);
    await user.clear(field());
    await user.type(field(), "abc");
    expect(rootOf(field())).toHaveClass(styles.invalid);
    expect(rootOf(field())).toHaveAttribute("title", "Enter a number");
    await user.tab();
    expect(spy).not.toHaveBeenCalled();
    expect(field()).toHaveValue("3");
  });

  it("rejects exponent notation", async () => {
    const user = userEvent.setup();
    render(<Controlled />);
    await user.type(field(), "1e3");
    expect(rootOf(field())).toHaveAttribute("title", "Enter a number");
  });

  it("emits null when cleared and allowEmpty (default)", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<Controlled initial={3} spy={spy} />);
    await user.clear(field());
    await user.tab();
    expect(spy).toHaveBeenCalledWith(null);
    expect(field()).not.toHaveAttribute("aria-valuenow");
  });

  it("falls back to clamped min when cleared and allowEmpty=false", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<Controlled initial={7} spy={spy} allowEmpty={false} min={2} />);
    await user.clear(field());
    await user.tab();
    expect(spy).toHaveBeenCalledWith(2);
    expect(field()).toHaveValue("2");
  });

  it("falls back to 0 when cleared, allowEmpty=false and unbounded", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<Controlled initial={7} spy={spy} allowEmpty={false} />);
    await user.clear(field());
    await user.type(field(), "-");
    await user.tab();
    expect(spy).toHaveBeenCalledWith(0);
  });

  it("steps with ArrowUp/ArrowDown and respects bounds", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<Controlled initial={1} spy={spy} min={0} max={2} />);
    await user.click(field());
    await user.keyboard("{ArrowUp}");
    expect(spy).toHaveBeenLastCalledWith(2);
    await user.keyboard("{ArrowUp}");
    expect(spy).toHaveBeenLastCalledWith(2);
    expect(field()).toHaveAttribute("aria-valuenow", "2");
    await user.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}");
    expect(spy).toHaveBeenLastCalledWith(0);
    expect(field()).toHaveValue("0");
  });

  it("lets an onKeyDown handler cancel stepping", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(
      <Controlled
        initial={1}
        spy={spy}
        onKeyDown={(e) => e.preventDefault()}
      />,
    );
    await user.click(field());
    await user.keyboard("{ArrowUp}");
    expect(spy).not.toHaveBeenCalled();
  });

  it("avoids floating point drift when stepping decimals", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<Controlled initial={0.1} spy={spy} step={0.1} />);
    await user.click(field());
    await user.keyboard("{ArrowUp}{ArrowUp}");
    expect(spy).toHaveBeenLastCalledWith(0.3);
    expect(field()).toHaveValue("0.3");
  });

  it("steps from 0 when empty", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<Controlled spy={spy} step={5} />);
    await user.click(field());
    await user.keyboard("{ArrowDown}");
    expect(spy).toHaveBeenCalledWith(-5);
  });

  it("hides the stepper by default and renders stepper buttons with showStepper", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    const { container, unmount } = render(<Controlled initial={1} spy={spy} />);
    expect(container.querySelector(`.${styles.stepper}`)).toBeNull();
    expect(container.querySelectorAll("button")).toHaveLength(0);
    unmount();

    const view = render(
      <Controlled initial={1} spy={spy} showStepper max={2} min={1} />,
    );
    const up = view.container.querySelector<HTMLButtonElement>(
      `.${styles.stepUp}`,
    )!;
    const down = view.container.querySelector<HTMLButtonElement>(
      `.${styles.stepDown}`,
    )!;
    expect(up.parentElement).toHaveAttribute("aria-hidden", "true");
    expect(up).toHaveAttribute("tabindex", "-1");
    expect(up).toHaveAttribute("aria-label", "Increase");
    expect(down).toHaveAttribute("aria-label", "Decrease");
    expect(down).toBeDisabled();
    await user.click(up);
    expect(spy).toHaveBeenLastCalledWith(2);
    expect(up).toBeDisabled();
    expect(down).toBeEnabled();
    await user.click(down);
    expect(spy).toHaveBeenLastCalledWith(1);
  });

  it("syncs the draft when the controlled value changes externally", () => {
    const { rerender } = render(
      <NumberInput aria-label="Qty" value={1} onChange={vi.fn()} />,
    );
    rerender(<NumberInput aria-label="Qty" value={9} onChange={vi.fn()} />);
    expect(field()).toHaveValue("9");
    rerender(<NumberInput aria-label="Qty" value={null} onChange={vi.fn()} />);
    expect(field()).toHaveValue("");
  });

  it("disabled blocks typing, keyboard stepping and stepper buttons", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    const { container } = render(
      <Controlled initial={1} spy={spy} disabled showStepper />,
    );
    expect(field()).toBeDisabled();
    expect(rootOf(field())).toHaveClass(styles.disabled);
    container
      .querySelectorAll("button")
      .forEach((b) => expect(b).toBeDisabled());
    await user.type(field(), "5{ArrowUp}");
    expect(field()).toHaveValue("1");
    expect(spy).not.toHaveBeenCalled();
  });

  it("invalid prop marks the root invalid", () => {
    render(
      <NumberInput
        aria-label="Qty"
        value={1}
        onChange={vi.fn()}
        invalid
        size="large"
        className="c"
      />,
    );
    const root = rootOf(field());
    expect(root).toHaveClass(styles.invalid, styles.large, "c");
    expect(root).not.toHaveClass(styles.shake);
    expect(root).not.toHaveAttribute("title");
    expect(field()).toHaveAttribute("aria-invalid", "true");
  });

  it("forwards ref, id, name and placeholder", () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <NumberInput
        ref={ref}
        id="qty"
        name="qty"
        aria-label="Qty"
        placeholder="0"
        value={null}
        onChange={vi.fn()}
      />,
    );
    expect(ref.current).toBe(field());
    expect(field()).toHaveAttribute("id", "qty");
    expect(field()).toHaveAttribute("name", "qty");
    expect(field()).toHaveAttribute("placeholder", "0");
  });

  it("integrates with FormControl label, helper, invalid and disabled", () => {
    render(
      <FormControl invalid disabled required>
        <FormLabel>Count</FormLabel>
        <NumberInput value={1} onChange={vi.fn()} />
        <FormHelperText>help</FormHelperText>
      </FormControl>,
    );
    const input = screen.getByRole("spinbutton", { name: "Count" });
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-required", "true");
    expect(input).toBeDisabled();
    expect(rootOf(input)).toHaveClass(styles.invalid, styles.disabled);
  });

  it("lets label props override the built-in strings", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Controlled
        showStepper
        min={0}
        max={5}
        incrementLabel="Plus"
        decrementLabel="Minus"
        notANumberMessage="NaN!"
        belowMinMessage="Too small"
        aboveMaxMessage="Too big"
      />,
    );
    expect(container.querySelector('[aria-label="Plus"]')).not.toBeNull();
    expect(container.querySelector('[aria-label="Minus"]')).not.toBeNull();
    await user.type(field(), "x");
    expect(rootOf(field())).toHaveAttribute("title", "NaN!");
    await user.clear(field());
    await user.type(field(), "9");
    expect(rootOf(field())).toHaveAttribute("title", "Too big");
    await user.clear(field());
    await user.type(field(), "-1");
    expect(rootOf(field())).toHaveAttribute("title", "Too small");
  });
});

describe("read-only (regression)", () => {
  it.each([
    ["readOnly prop", (ui: ReactElement) => ui, true],
    [
      "FormControl readOnly",
      (ui: ReactElement) => <FormControl readOnly>{ui}</FormControl>,
      false,
    ],
  ] as const)(
    "%s blocks typing and keyboard stepping",
    async (_, wrap, readOnlyProp) => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        wrap(
          <NumberInput
            aria-label="Qty"
            value={3}
            onChange={onChange}
            readOnly={readOnlyProp || undefined}
          />,
        ),
      );
      const input = screen.getByRole("spinbutton", { name: "Qty" });
      expect(input).toHaveAttribute("readonly");
      await user.click(input);
      await user.keyboard("{ArrowUp}9");
      await user.tab();
      expect(input).toHaveValue("3");
      expect(onChange).not.toHaveBeenCalled();
    },
  );
});

describe("NumberInput localization", () => {
  afterEach(() => {
    act(() => {
      i18n.changeLanguage("en");
    });
  });

  it("uses the Chinese strings", async () => {
    const user = userEvent.setup();
    act(() => {
      i18n.changeLanguage("zh");
    });
    const { container } = render(<Controlled showStepper max={10} />);
    expect(container.querySelector('[aria-label="增加"]')).not.toBeNull();
    await user.type(field(), "99");
    expect(rootOf(field())).toHaveAttribute("title", "最大值 10");
    await user.clear(field());
    await user.type(field(), "abc");
    expect(rootOf(field())).toHaveAttribute("title", "请输入数字");
  });
});
