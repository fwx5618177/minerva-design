import { createRef, useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
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
});
