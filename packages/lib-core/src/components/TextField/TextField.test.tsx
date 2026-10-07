import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StrictMode, createRef, useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import i18n from "../../config/i18n";
import TextField from "./TextField";
import type { TextFieldProps } from "./types";

const renderField = (props: Partial<TextFieldProps> = {}) =>
  render(<TextField name="email" label="Email" {...props} />);

const Controlled = ({ onChange }: { onChange: (value: string) => void }) => {
  const [value, setValue] = useState("");
  return (
    <TextField
      name="ctl"
      label="Controlled"
      value={value}
      onChange={(next) => {
        onChange(next);
        setValue(next);
      }}
    />
  );
};

describe("TextField", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  describe("rendering", () => {
    it("renders a textbox associated with its label", () => {
      renderField();
      const input = screen.getByLabelText("Email");
      expect(input).toBe(screen.getByRole("textbox", { name: "Email" }));
      expect(input).toHaveAttribute("name", "email");
      expect(input).toHaveAttribute("id", "email");
    });

    it("focuses the input when the label is clicked", async () => {
      const user = userEvent.setup();
      renderField();
      await user.click(screen.getByText("Email"));
      expect(screen.getByRole("textbox")).toHaveFocus();
    });

    it("shrinks the label when focused or filled", async () => {
      const user = userEvent.setup();
      renderField();
      const label = screen.getByText("Email");
      expect(label).not.toHaveClass("shrink");
      await user.click(screen.getByRole("textbox"));
      expect(label).toHaveClass("shrink");
      await user.tab();
      expect(label).not.toHaveClass("shrink");
    });

    it("renders placeholder instead of label and hides it once focused", async () => {
      const user = userEvent.setup();
      renderField({ placeholder: "you@example.com" });
      expect(screen.queryByText("Email")).not.toBeInTheDocument();
      const input = screen.getByPlaceholderText("you@example.com");
      await user.click(input);
      expect(input).toHaveAttribute("placeholder", "");
    });

    it("uses ariaLabel for the accessible name", () => {
      renderField({ placeholder: "x", ariaLabel: "Email address" });
      expect(
        screen.getByRole("textbox", { name: "Email address" }),
      ).toBeInTheDocument();
    });

    it("applies size, minimal and custom className", () => {
      const { container } = renderField({
        size: "large",
        minimal: true,
        className: "custom",
      });
      expect(container.firstElementChild).toHaveClass("container", "custom");
      expect(container.querySelector(".textField")).toHaveClass(
        "large",
        "minimal",
      );
    });

    it("applies width, borderRadius and borderColor styles", () => {
      const { container } = renderField({
        width: "200px",
        borderRadius: "8px",
        borderColor: "red",
      });
      const root = container.firstElementChild as HTMLElement;
      expect(root.style.width).toBe("200px");
      expect(root.style.borderRadius).toBe("8px");
      expect(root.style.borderColor).toBe("red");
    });

    it("uses full width when fullWidth is set", () => {
      const { container } = renderField({ fullWidth: true, width: "200px" });
      expect((container.firstElementChild as HTMLElement).style.width).toBe(
        "100%",
      );
    });

    it("applies hideBorder classes", () => {
      const { container } = renderField({ hideBorder: true });
      expect(container.firstElementChild).toHaveClass("containerHideBorder");
      expect(screen.getByRole("textbox")).toHaveClass("hideBorder");
    });

    it("renders icon and suffix content", () => {
      renderField({ icon: <span>ICON</span>, suffix: "kg" });
      expect(screen.getByText("ICON").parentElement).toHaveClass("iconLeft");
      expect(screen.getByText("kg")).toHaveClass("suffix");
    });

    it("renders a right icon", () => {
      renderField({ icon: <span>ICON</span>, iconPosition: "right" });
      expect(screen.getByText("ICON").parentElement).toHaveClass("iconRight");
    });

    it("forwards the ref to the input element", () => {
      const ref = createRef<HTMLInputElement>();
      render(<TextField ref={ref} name="r" label="Ref" />);
      expect(ref.current).toBe(screen.getByRole("textbox"));
    });

    it("supports callback refs", () => {
      const ref = vi.fn();
      render(<TextField ref={ref} name="r" label="Ref" />);
      expect(ref).toHaveBeenCalledWith(screen.getByRole("textbox"));
    });

    it("keeps internal focus logic working when a ref is forwarded", async () => {
      const user = userEvent.setup();
      const ref = createRef<HTMLInputElement>();
      render(<TextField ref={ref} name="r" label="Ref" />);
      await user.click(screen.getByText("Ref"));
      expect(ref.current).toHaveFocus();
    });

    it("focuses the input on helperText when a ref is forwarded", () => {
      const ref = createRef<HTMLInputElement>();
      render(<TextField ref={ref} name="r" label="Ref" helperText="Bad" />);
      expect(ref.current).toHaveFocus();
    });

    it("passes non-password types through to the input", () => {
      const { container, rerender } = renderField({ type: "email" });
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("type", "email");
      rerender(<TextField name="email" label="Email" type="number" />);
      expect(input).toHaveAttribute("type", "number");
    });

    it("defaults to type text", () => {
      const { container } = renderField();
      expect(container.querySelector("input")).toHaveAttribute("type", "text");
    });
  });

  describe("value handling", () => {
    it("updates its own value when uncontrolled", async () => {
      const user = userEvent.setup();
      const { container } = renderField();
      const input = screen.getByRole("textbox");
      await user.type(input, "hello");
      expect(input).toHaveValue("hello");
      expect(container.querySelector(".textField")).toHaveClass("filled");
    });

    it("calls onChange with the new string value", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Controlled onChange={onChange} />);
      const input = screen.getByRole("textbox", { name: "Controlled" });
      await user.type(input, "abc");
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenNthCalledWith(1, "a");
      expect(onChange).toHaveBeenLastCalledWith("abc");
      expect(input).toHaveValue("abc");
    });

    it("keeps the controlled value when onChange does not update it", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      renderField({ value: "fixed", onChange });
      const input = screen.getByRole("textbox");
      await user.type(input, "x");
      expect(onChange).toHaveBeenCalledWith("fixedx");
      expect(input).toHaveValue("fixed");
    });

    it("shows the character count", async () => {
      const user = userEvent.setup();
      renderField({ showCharCount: true });
      expect(screen.getByText("0")).toHaveClass("charCount");
      await user.type(screen.getByRole("textbox"), "abcd");
      expect(screen.getByText("4")).toHaveClass("charCount");
    });
  });

  describe("events", () => {
    it("calls onFocus, onBlur and onKeyDown", async () => {
      const user = userEvent.setup();
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const onKeyDown = vi.fn();
      const { container } = renderField({ onFocus, onBlur, onKeyDown });
      const input = screen.getByRole("textbox");

      await user.click(input);
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(container.querySelector(".textField")).toHaveClass("focused");

      await user.keyboard("{Enter}");
      expect(onKeyDown).toHaveBeenCalledTimes(1);
      expect(onKeyDown.mock.calls[0][0]).toMatchObject({ key: "Enter" });

      await user.tab();
      expect(onBlur).toHaveBeenCalledTimes(1);
      expect(container.querySelector(".textField")).not.toHaveClass("focused");
    });
  });

  describe("clearable", () => {
    const getClearIcon = (container: HTMLElement) =>
      container.querySelector(".clearIcon");

    it("does not show the clear icon when empty", () => {
      const { container } = renderField({ clearable: true });
      expect(getClearIcon(container)).not.toBeInTheDocument();
    });

    it("clears an uncontrolled value", async () => {
      const user = userEvent.setup();
      const { container } = renderField({ clearable: true });
      const input = screen.getByRole("textbox");
      await user.type(input, "abc");
      const clear = getClearIcon(container);
      expect(clear).toBeInTheDocument();
      await user.click(clear as Element);
      expect(input).toHaveValue("");
      expect(getClearIcon(container)).not.toBeInTheDocument();
    });

    it("calls onChange with an empty string for a controlled value", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const { container } = renderField({
        clearable: true,
        value: "abc",
        onChange,
      });
      await user.click(getClearIcon(container) as Element);
      expect(onChange).toHaveBeenCalledWith("");
    });

    it.each([
      ["disabled", { disabled: true }],
      ["readOnly", { readOnly: true }],
      ["suffix", { suffix: "kg" }],
    ] as const)("hides the clear icon when %s", (_, extra) => {
      const { container } = renderField({
        clearable: true,
        value: "abc",
        ...extra,
      });
      expect(getClearIcon(container)).not.toBeInTheDocument();
    });
  });

  describe("disabled and readOnly", () => {
    it("disables the input and ignores typing", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const { container } = renderField({ disabled: true, onChange });
      const input = screen.getByRole("textbox");
      expect(input).toBeDisabled();
      expect(container.querySelector(".textField")).toHaveClass("disabled");
      await user.type(input, "abc");
      expect(onChange).not.toHaveBeenCalled();
    });

    it("makes the input read-only and hides the floating label", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const { container } = renderField({
        readOnly: true,
        value: "v",
        onChange,
      });
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("readonly");
      expect(screen.queryByText("Email")).not.toBeInTheDocument();
      expect(container.querySelector(".textField")).toHaveClass("readonly");
      await user.type(input, "abc");
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("password", () => {
    it("masks the value", () => {
      const { container } = renderField({ type: "password" });
      expect(container.querySelector("input")).toHaveAttribute(
        "type",
        "password",
      );
    });

    it("toggles visibility with the right icon", async () => {
      const user = userEvent.setup();
      const { container } = renderField({
        type: "password",
        icon: <span>lock</span>,
        iconPosition: "right",
      });
      const input = container.querySelector("input") as HTMLInputElement;
      const toggle = container.querySelector(".togglePasswordIcon");
      expect(toggle).toBeInTheDocument();
      expect(screen.queryByText("lock")).not.toBeInTheDocument();

      await user.click(toggle as Element);
      expect(input).toHaveAttribute("type", "text");
      await user.click(toggle as Element);
      expect(input).toHaveAttribute("type", "password");
    });
  });

  describe("helperText", () => {
    it("shows the error message, focuses the input and shakes briefly", () => {
      vi.useFakeTimers({ shouldAdvanceTime: true });
      const { container } = renderField({ helperText: "Required" });
      expect(screen.getByText("Required")).toHaveClass("errorMessage");
      const field = container.querySelector(".textField");
      expect(field).toHaveClass("error", "shake");
      expect(screen.getByRole("textbox")).toHaveFocus();

      act(() => {
        vi.advanceTimersByTime(500);
      });
      expect(field).not.toHaveClass("shake");
      expect(field).toHaveClass("error");
    });

    it("clears the shake timer on unmount", () => {
      vi.useFakeTimers({ shouldAdvanceTime: true });
      const { unmount } = renderField({ helperText: "Required" });
      expect(vi.getTimerCount()).toBeGreaterThan(0);
      unmount();
      expect(vi.getTimerCount()).toBe(0);
    });

    it("does not render an error without helperText", () => {
      const { container } = renderField();
      expect(container.querySelector(".errorMessage")).not.toBeInTheDocument();
      expect(container.querySelector(".textField")).not.toHaveClass("error");
    });
  });

  it("stays editable when uncontrolled but onChange is provided", async () => {
    const onChange = vi.fn();
    renderField({ onChange });
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "hi");
    expect(input).toHaveValue("hi");
    expect(onChange).toHaveBeenLastCalledWith("hi");
  });

  it("exposes the clear control as a labelled button", async () => {
    renderField({ clearable: true });
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "abc");
    await userEvent.click(screen.getByRole("button", { name: "Clear" }));
    expect(input).toHaveValue("");
  });

  describe("regressions", () => {
    it("supports an uncontrolled defaultValue", async () => {
      const user = userEvent.setup();
      const { container } = renderField({ defaultValue: "hi" });
      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("hi");
      expect(container.querySelector(".textField")).toHaveClass("filled");
      await user.type(input, "!");
      expect(input).toHaveValue("hi!");
    });

    it("returns focus to the input after clearing", async () => {
      const user = userEvent.setup();
      renderField({ clearable: true, defaultValue: "abc" });
      await user.click(screen.getByRole("button", { name: "Clear" }));
      expect(screen.getByRole("textbox")).toHaveValue("");
      expect(screen.getByRole("textbox")).toHaveFocus();
    });

    it("uses clearLabel as the clear button's accessible name", () => {
      renderField({
        clearable: true,
        defaultValue: "abc",
        clearLabel: "Effacer",
      });
      expect(
        screen.getByRole("button", { name: "Effacer" }),
      ).toBeInTheDocument();
    });

    it.each([
      ["a placeholder", { placeholder: "you@example.com" }],
      ["readOnly", { readOnly: true, value: "v" }],
    ] as const)(
      "keeps the label as accessible name when hidden by %s",
      (_, extra) => {
        renderField(extra);
        expect(
          screen.getByRole("textbox", { name: "Email" }),
        ).toBeInTheDocument();
      },
    );

    it("links the error message and sets aria-invalid", () => {
      renderField({ helperText: "Required" });
      const input = screen.getByRole("textbox", { name: "Email" });
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(input).toHaveAccessibleDescription("Required");
    });

    it("uses the id prop for the input and its label", () => {
      render(
        <>
          <TextField name="email" id="email-a" label="Work email" />
          <TextField name="email" id="email-b" label="Home email" />
        </>,
      );
      expect(screen.getByLabelText("Work email")).toHaveAttribute(
        "id",
        "email-a",
      );
      expect(screen.getByLabelText("Home email")).toHaveAttribute(
        "id",
        "email-b",
      );
    });

    it("calls onChange once per keystroke under StrictMode", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        <StrictMode>
          <Controlled onChange={onChange} />
        </StrictMode>,
      );
      await user.type(screen.getByRole("textbox"), "ab");
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(screen.getByRole("textbox")).toHaveValue("ab");
    });

    it("reflects a controlled value change in the filled state immediately", () => {
      const { container, rerender } = renderField({ value: "" });
      const field = container.querySelector(".textField");
      expect(field).not.toHaveClass("filled");
      rerender(<TextField name="email" label="Email" value="x" />);
      expect(field).toHaveClass("filled");
      expect(screen.getByText("Email")).toHaveClass("shrink");
    });

    it("calls a callback ref with null on unmount", () => {
      const ref = vi.fn();
      const { unmount } = render(<TextField ref={ref} name="r" label="Ref" />);
      expect(ref).toHaveBeenLastCalledWith(expect.any(HTMLInputElement));
      unmount();
      expect(ref).toHaveBeenLastCalledWith(null);
    });
  });
});

describe("TextField localization", () => {
  afterEach(() => {
    act(() => {
      i18n.changeLanguage("en");
    });
  });
  it("translates the clear and password toggle labels", async () => {
    const user = userEvent.setup();
    act(() => {
      i18n.changeLanguage("zh");
    });
    render(
      <TextField
        name="password"
        label="Password"
        type="password"
        icon={<span />}
        iconPosition="right"
        clearable
        defaultValue="secret"
      />,
    );
    expect(screen.getByRole("button", { name: "清除" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "显示密码" }));
    expect(
      screen.getByRole("button", { name: "隐藏密码" }),
    ).toBeInTheDocument();
  });

  it("lets the label props win over the translation", () => {
    act(() => {
      i18n.changeLanguage("fr");
    });
    render(
      <TextField
        name="name"
        label="Name"
        clearable
        defaultValue="x"
        clearLabel="Reset name"
      />,
    );
    expect(
      screen.getByRole("button", { name: "Reset name" }),
    ).toBeInTheDocument();
  });
});
