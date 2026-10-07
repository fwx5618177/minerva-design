import { createRef, useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Textarea } from ".";
import {
  FormControl,
  FormErrorMessage,
  FormField,
  FormHelperText,
  FormLabel,
} from "../FormControl";

describe("Textarea", () => {
  it("renders a multiline textbox with default classes and no manual resize", () => {
    render(<Textarea aria-label="Bio" />);
    const textarea = screen.getByRole("textbox", { name: "Bio" });
    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea).toHaveClass(
      "textarea",
      "outline",
      "medium",
      "ui-textarea",
      "ui-textarea-variant-outline",
      "ui-textarea-size-md",
      "ui-textarea-resize-none",
    );
    expect(textarea.style.resize).toBe("none");
  });

  it("applies variant, size and className", () => {
    const { rerender } = render(
      <Textarea
        aria-label="Bio"
        variant="filled"
        size="large"
        className="consumer"
      />,
    );
    expect(screen.getByRole("textbox")).toHaveClass(
      "filled",
      "large",
      "ui-textarea-variant-filled",
      "ui-textarea-size-lg",
      "consumer",
    );
    rerender(<Textarea aria-label="Bio" variant="unstyled" size="small" />);
    expect(screen.getByRole("textbox")).toHaveClass(
      "ui-textarea-variant-unstyled",
      "ui-textarea-size-sm",
    );
  });

  it("prevents inline styles from re-enabling manual resize while keeping other styles", () => {
    render(
      <Textarea
        aria-label="Bio"
        style={{ minHeight: 40, height: 120, resize: "both" }}
      />,
    );
    const textarea = screen.getByRole("textbox");
    expect(textarea.style.resize).toBe("none");
    expect(textarea.style.minHeight).toBe("40px");
    expect(textarea.style.height).toBe("120px");
    expect(textarea).not.toHaveAttribute("resize");
  });

  it("supports multiline uncontrolled typing", async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="Bio" defaultValue="a" />);
    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "{Enter}b");
    expect(textarea).toHaveValue("a\nb");
  });

  it("supports controlled value", async () => {
    const user = userEvent.setup();
    function App() {
      const [value, setValue] = useState("");
      return (
        <Textarea
          aria-label="Bio"
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, 3))}
        />
      );
    }
    render(<App />);
    await user.type(screen.getByRole("textbox"), "abcdef");
    expect(screen.getByRole("textbox")).toHaveValue("abc");
  });

  it("invalid adds the error class and aria-invalid", () => {
    render(<Textarea aria-label="Bio" invalid />);
    expect(screen.getByRole("textbox")).toHaveClass(
      "invalid",
      "ui-textarea-error",
    );
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("disabled prevents typing", async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="Bio" disabled />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeDisabled();
    await user.type(textarea, "x");
    expect(textarea).toHaveValue("");
  });

  it("forwards ref and native attributes", () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(
      <Textarea
        ref={ref}
        aria-label="Bio"
        rows={6}
        name="bio"
        maxLength={100}
        placeholder="Say"
      />,
    );
    const textarea = screen.getByRole("textbox");
    expect(ref.current).toBe(textarea);
    expect(textarea).toHaveAttribute("rows", "6");
    expect(textarea).toHaveAttribute("name", "bio");
    expect(textarea).toHaveAttribute("maxlength", "100");
    expect(textarea).toHaveAttribute("placeholder", "Say");
  });

  it("integrates with FormControl label, helper, invalid and disabled state", () => {
    const { rerender } = render(
      <FormControl>
        <FormLabel>Bio</FormLabel>
        <Textarea />
        <FormHelperText>Short intro</FormHelperText>
        <FormErrorMessage>Too long</FormErrorMessage>
      </FormControl>,
    );
    let textarea = screen.getByRole("textbox", { name: "Bio" });
    expect(textarea).toHaveAccessibleDescription("Short intro");
    expect(textarea).not.toHaveClass("ui-textarea-error");

    rerender(
      <FormControl invalid disabled required>
        <FormLabel>Bio</FormLabel>
        <Textarea />
        <FormHelperText>Short intro</FormHelperText>
        <FormErrorMessage>Too long</FormErrorMessage>
      </FormControl>,
    );
    textarea = screen.getByRole("textbox", { name: "Bio" });
    expect(textarea).toHaveClass("ui-textarea-error");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveAttribute("aria-required", "true");
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveAccessibleDescription("Too long");
  });

  // from novel JsonField.test: FormField and explicit child aria-invalid
  it("FormField preserves explicit child aria-invalid while its own error takes precedence", () => {
    const { rerender } = render(
      <FormField label="Text">
        <Textarea aria-invalid="grammar" />
      </FormField>,
    );
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-invalid",
      "grammar",
    );
    rerender(
      <FormField label="Text" invalid errorMessage="Business error">
        <Textarea aria-invalid={false} />
      </FormField>,
    );
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it('does not treat the "false" ARIA string as an error when preserving a child state', () => {
    render(
      <FormField label="Text">
        <Textarea aria-invalid="false" />
      </FormField>,
    );
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-invalid",
      "false",
    );
    expect(screen.getByRole("textbox")).not.toHaveClass("ui-textarea-error");
  });
});
