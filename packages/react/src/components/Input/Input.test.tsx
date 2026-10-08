import { StrictMode, createRef, useState } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import i18n from "../../config/i18n";
import { Input } from ".";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "../FormControl";

const root = (input: HTMLElement) => input.parentElement!;

describe("Input", () => {
  it("renders a textbox inside a root with default variant/size classes", () => {
    render(<Input aria-label="Name" />);
    const input = screen.getByRole("textbox", { name: "Name" });
    expect(input).toHaveClass("field");
    expect(root(input)).toHaveClass("root", "outline", "medium");
    expect(root(input)).toHaveAttribute("data-component", "input");
    expect(root(input)).not.toHaveClass("invalid", "disabled");
    expect(input).not.toHaveAttribute("aria-invalid");
  });

  it("puts className, variant and size on the root, not the input", () => {
    const { rerender } = render(
      <Input
        aria-label="Name"
        className="consumer"
        variant="filled"
        size="large"
      />,
    );
    const input = screen.getByRole("textbox");
    expect(root(input)).toHaveClass("consumer", "filled", "large");
    expect(input).not.toHaveClass("consumer");
    rerender(<Input aria-label="Name" variant="unstyled" size="small" />);
    expect(root(input)).toHaveClass("unstyled", "small");
  });

  it("works uncontrolled with defaultValue", async () => {
    const user = userEvent.setup();
    render(<Input aria-label="Name" defaultValue="Ab" />);
    const input = screen.getByRole("textbox");
    await user.type(input, "c");
    expect(input).toHaveValue("Abc");
  });

  it("works controlled and reports changes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    function App() {
      const [value, setValue] = useState("");
      return (
        <Input
          aria-label="Name"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setValue(e.target.value.toUpperCase());
          }}
        />
      );
    }
    render(<App />);
    await user.type(screen.getByRole("textbox"), "ab");
    expect(onChange).toHaveBeenLastCalledWith("Ab");
    expect(screen.getByRole("textbox")).toHaveValue("AB");
  });

  it("renders prefix and suffix addons around the field", () => {
    render(<Input aria-label="Price" prefix="$" suffix="USD" />);
    const input = screen.getByRole("textbox");
    const [start, field, end] = Array.from(root(input).children);
    expect(start).toHaveClass("addon", "start");
    expect(start).toHaveTextContent("$");
    expect(field).toBe(input);
    expect(end).toHaveClass("addon", "end");
    expect(end).toHaveTextContent("USD");
  });

  it("renders no addons for empty prefix / suffix", () => {
    render(<Input aria-label="Name" prefix={false} suffix={null} />);
    expect(root(screen.getByRole("textbox")).children).toHaveLength(1);
  });

  it("invalid marks the root as error and announces it", () => {
    render(<Input aria-label="Name" invalid />);
    const input = screen.getByRole("textbox");
    expect(root(input)).toHaveClass("invalid");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it('treats an explicit aria-invalid as an error, but not "false"', () => {
    const { rerender } = render(
      <Input aria-label="Name" aria-invalid="grammar" />,
    );
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "grammar");
    expect(root(input)).toHaveClass("invalid");
    rerender(<Input aria-label="Name" aria-invalid="false" />);
    expect(root(input)).not.toHaveClass("invalid");
  });

  it("disabled prevents typing and marks the root", async () => {
    const user = userEvent.setup();
    render(<Input aria-label="Name" disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
    expect(root(input)).toHaveClass("disabled");
    await user.type(input, "x");
    expect(input).toHaveValue("");
  });

  it("native readOnly prevents edits", async () => {
    const user = userEvent.setup();
    render(<Input aria-label="Name" readOnly defaultValue="fixed" />);
    await user.type(screen.getByRole("textbox"), "x");
    expect(screen.getByRole("textbox")).toHaveValue("fixed");
  });

  it("forwards the ref to the <input> and passes native attributes through", () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <Input
        ref={ref}
        aria-label="Email"
        type="email"
        name="email"
        placeholder="you@example.com"
        maxLength={20}
        autoComplete="email"
        data-owner="x"
      />,
    );
    const input = screen.getByRole("textbox");
    expect(ref.current).toBe(input);
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("name", "email");
    expect(input).toHaveAttribute("placeholder", "you@example.com");
    expect(input).toHaveAttribute("maxlength", "20");
    expect(input).toHaveAttribute("autocomplete", "email");
    expect(input).toHaveAttribute("data-owner", "x");
  });

  describe("inside FormControl", () => {
    it("is labelled by FormLabel and described by helper text", () => {
      render(
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input />
          <FormHelperText>Used to sign in</FormHelperText>
        </FormControl>,
      );
      const input = screen.getByRole("textbox", { name: "Email" });
      expect(input).toHaveAttribute("id", "email");
      expect(input).toHaveAccessibleDescription("Used to sign in");
      expect(input).not.toHaveAttribute("aria-invalid");
    });

    it("inherits invalid, required and disabled state", () => {
      render(
        <FormControl invalid required disabled>
          <FormLabel>Email</FormLabel>
          <Input />
          <FormErrorMessage>Bad email</FormErrorMessage>
        </FormControl>,
      );
      const input = screen.getByRole("textbox", { name: "Email" });
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(input).toBeInvalid();
      expect(input).toHaveAttribute("aria-required", "true");
      expect(input).toBeDisabled();
      expect(input).toHaveAccessibleDescription("Bad email");
      expect(root(input)).toHaveClass("invalid", "disabled");
    });

    it("keeps an explicit id and merges an incoming aria-describedby", () => {
      render(
        <FormControl>
          <Input id="own" aria-describedby="extra" />
          <FormHelperText>Help</FormHelperText>
        </FormControl>,
      );
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("id", "own");
      expect(input.getAttribute("aria-describedby")?.split(" ")).toContain(
        "extra",
      );
      expect(input).toHaveAccessibleDescription(/Help/);
    });

    it("sets aria-readonly when the FormControl is read-only", () => {
      render(
        <FormControl readOnly>
          <Input aria-label="Name" />
        </FormControl>,
      );
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-readonly",
        "true",
      );
    });

    // regression: readOnly used to map to aria-readonly only, leaving the field editable
    it("prevents edits when the FormControl is read-only", async () => {
      const user = userEvent.setup();
      render(
        <FormControl readOnly>
          <Input aria-label="Name" />
        </FormControl>,
      );
      await user.type(screen.getByRole("textbox"), "abc");
      expect(screen.getByRole("textbox")).toHaveValue("");
    });
  });

  it("supports callback refs and calls them with null on unmount", () => {
    const ref = vi.fn();
    const { unmount } = render(<Input ref={ref} aria-label="Ref" />);
    expect(ref).toHaveBeenLastCalledWith(screen.getByRole("textbox"));
    unmount();
    expect(ref).toHaveBeenLastCalledWith(null);
  });

  it("calls onFocus, onBlur, onKeyDown and composition handlers", async () => {
    const user = userEvent.setup();
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const onKeyDown = vi.fn();
    const onCompositionEnd = vi.fn();
    render(
      <Input
        aria-label="Name"
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onCompositionEnd={onCompositionEnd}
      />,
    );
    const input = screen.getByRole("textbox");
    await user.click(input);
    expect(onFocus).toHaveBeenCalledTimes(1);
    await user.keyboard("{Enter}");
    expect(onKeyDown.mock.calls[0][0]).toMatchObject({ key: "Enter" });
    fireEvent.compositionEnd(input);
    expect(onCompositionEnd).toHaveBeenCalledTimes(1);
    await user.tab();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it("keeps a controlled value that onChange does not update", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Input
        aria-label="Name"
        value="fixed"
        onChange={(e) => onChange(e.target.value)}
      />,
    );
    await user.type(screen.getByRole("textbox"), "x");
    expect(onChange).toHaveBeenCalledWith("fixedx");
    expect(screen.getByRole("textbox")).toHaveValue("fixed");
  });

  it("calls onChange once per keystroke under StrictMode", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    function App() {
      const [value, setValue] = useState("");
      return (
        <Input
          aria-label="Name"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setValue(e.target.value);
          }}
        />
      );
    }
    render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
    await user.type(screen.getByRole("textbox"), "ab");
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(screen.getByRole("textbox")).toHaveValue("ab");
  });

  describe("clearable", () => {
    const clearButton = () => screen.queryByRole("button", { name: "Clear" });

    it("shows a labelled clear button only while the field has a value", async () => {
      const user = userEvent.setup();
      render(<Input aria-label="Name" clearable />);
      expect(clearButton()).not.toBeInTheDocument();
      await user.type(screen.getByRole("textbox"), "abc");
      expect(clearButton()).toHaveAttribute("type", "button");
    });

    it("clears an uncontrolled value, reports it and keeps focus in the field", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const onClear = vi.fn();
      render(
        <Input
          aria-label="Name"
          clearable
          defaultValue="abc"
          onChange={(e) => onChange(e.target.value)}
          onClear={onClear}
        />,
      );
      await user.click(clearButton()!);
      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("");
      expect(input).toHaveFocus();
      expect(onChange).toHaveBeenLastCalledWith("");
      expect(onClear).toHaveBeenCalledTimes(1);
      expect(clearButton()).not.toBeInTheDocument();
    });

    it("calls onChange with an empty value for a controlled field", async () => {
      const user = userEvent.setup();
      function App() {
        const [value, setValue] = useState("abc");
        return (
          <Input
            aria-label="Name"
            clearable
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        );
      }
      render(<App />);
      await user.click(clearButton()!);
      expect(screen.getByRole("textbox")).toHaveValue("");
      expect(clearButton()).not.toBeInTheDocument();
    });

    it("reflects a controlled value change immediately", () => {
      const { rerender } = render(
        <Input aria-label="Name" clearable value="" onChange={() => {}} />,
      );
      expect(clearButton()).not.toBeInTheDocument();
      rerender(
        <Input aria-label="Name" clearable value="x" onChange={() => {}} />,
      );
      expect(clearButton()).toBeInTheDocument();
    });

    it.each([
      ["disabled", { disabled: true }],
      ["readOnly", { readOnly: true }],
    ] as const)("hides the clear button when %s", (_, extra) => {
      render(
        <Input aria-label="Name" clearable defaultValue="abc" {...extra} />,
      );
      expect(clearButton()).not.toBeInTheDocument();
    });

    it("uses clearLabel as the clear button's accessible name", () => {
      render(
        <Input
          aria-label="Name"
          clearable
          defaultValue="abc"
          clearLabel="Effacer"
        />,
      );
      expect(
        screen.getByRole("button", { name: "Effacer" }),
      ).toBeInTheDocument();
    });
  });

  describe("showCharCount", () => {
    it("counts the characters and links the count to the input", async () => {
      const user = userEvent.setup();
      render(<Input aria-label="Bio" showCharCount />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAccessibleDescription("0");
      await user.type(input, "abcd");
      expect(input).toHaveAccessibleDescription("4");
    });

    it("shows the limit when maxLength is set, next to other descriptions", async () => {
      const user = userEvent.setup();
      render(
        <>
          <span id="hint">Short bio</span>
          <Input
            aria-label="Bio"
            showCharCount
            maxLength={10}
            defaultValue="ab"
            aria-describedby="hint"
          />
        </>,
      );
      const input = screen.getByRole("textbox");
      expect(input).toHaveAccessibleDescription("Short bio 2 / 10");
      await user.type(input, "c");
      expect(screen.getByText("3 / 10")).toHaveClass("count");
    });
  });

  describe("password", () => {
    it("masks the value and toggles its visibility", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Input aria-label="Password" type="password" defaultValue="secret" />,
      );
      const input = container.querySelector("input")!;
      expect(input).toHaveAttribute("type", "password");
      await user.click(screen.getByRole("button", { name: "Show password" }));
      expect(input).toHaveAttribute("type", "text");
      await user.click(screen.getByRole("button", { name: "Hide password" }));
      expect(input).toHaveAttribute("type", "password");
    });

    it("has no toggle for other types and disables it with the field", () => {
      const { rerender } = render(<Input aria-label="Email" type="email" />);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
      rerender(<Input aria-label="Password" type="password" disabled />);
      expect(
        screen.getByRole("button", { name: "Show password" }),
      ).toBeDisabled();
    });

    it("uses custom toggle labels", () => {
      render(
        <Input
          aria-label="Password"
          type="password"
          showPasswordLabel="Reveal"
          hidePasswordLabel="Conceal"
        />,
      );
      expect(
        screen.getByRole("button", { name: "Reveal" }),
      ).toBeInTheDocument();
    });
  });

  it("keeps an interactive suffix clickable", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Input
        aria-label="Search"
        suffix={
          <button type="button" onClick={onClick}>
            Go
          </button>
        }
      />,
    );
    await user.click(screen.getByRole("button", { name: "Go" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe("Input localization", () => {
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
      <Input
        aria-label="Password"
        type="password"
        clearable
        defaultValue="x"
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
      <Input
        aria-label="Name"
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
