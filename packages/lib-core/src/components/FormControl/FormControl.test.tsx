import { createRef, type ReactNode } from "react";
import { render, renderHook, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  FormControl,
  FormErrorMessage,
  FormField,
  FormHelperText,
  FormLabel,
  useFormControlContext,
  useFormControlProps,
} from ".";
import type { FormControlProps } from ".";
import { Input } from "../Input";

describe("FormControl", () => {
  it("renders a div container with data flags, className and native attributes", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <FormControl
        ref={ref}
        invalid
        disabled
        readOnly
        className="consumer"
        data-testid="fc"
        role="group"
        aria-label="Field"
      >
        x
      </FormControl>,
    );
    const el = screen.getByTestId("fc");
    expect(ref.current).toBe(el);
    expect(el).toHaveClass("root", "ui-form-control", "consumer");
    expect(el).toHaveAttribute("data-invalid", "true");
    expect(el).toHaveAttribute("data-disabled", "true");
    expect(el).toHaveAttribute("data-readonly", "true");
    expect(el).toHaveAttribute("role", "group");
  });

  it("omits data flags by default and does not leak state props or the id to the DOM", () => {
    render(<FormControl data-testid="fc" />);
    const el = screen.getByTestId("fc");
    expect(el).not.toHaveAttribute("data-invalid");
    expect(el).not.toHaveAttribute("data-disabled");
    expect(el).not.toHaveAttribute("invalid");
    expect(el).not.toHaveAttribute("id");
  });

  it("wires label htmlFor / id, helper id and error id from an explicit id", () => {
    const { rerender } = render(
      <FormControl id="email">
        <FormLabel>Email</FormLabel>
        <FormHelperText>help</FormHelperText>
        <FormErrorMessage>bad</FormErrorMessage>
      </FormControl>,
    );
    const label = screen.getByText("Email");
    expect(label).toHaveAttribute("for", "email");
    expect(label).toHaveAttribute("id", "email-label");
    expect(screen.getByText("help")).toHaveAttribute("id", "email-helper");
    expect(screen.getByText("help")).toHaveClass("ui-form-helper");
    expect(screen.queryByRole("alert")).toBeNull();

    rerender(
      <FormControl id="email" invalid>
        <FormLabel>Email</FormLabel>
        <FormHelperText>help</FormHelperText>
        <FormErrorMessage>bad</FormErrorMessage>
      </FormControl>,
    );
    expect(screen.queryByText("help")).toBeNull();
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("bad");
    expect(alert).toHaveAttribute("id", "email-error");
    expect(alert).toHaveClass("ui-form-error");
  });

  it("generates unique ids per control", () => {
    render(
      <>
        <FormControl>
          <FormLabel>A</FormLabel>
          <Input />
        </FormControl>
        <FormControl>
          <FormLabel>B</FormLabel>
          <Input />
        </FormControl>
      </>,
    );
    const a = screen.getByRole("textbox", { name: "A" });
    const b = screen.getByRole("textbox", { name: "B" });
    expect(a.id).toMatch(/^field-/);
    expect(a.id).not.toBe(b.id);
  });
});

describe("FormLabel", () => {
  it("shows an aria-hidden required indicator only when required", () => {
    const { rerender } = render(
      <FormControl>
        <FormLabel>Name</FormLabel>
      </FormControl>,
    );
    expect(document.querySelector(".ui-form-required")).toBeNull();
    rerender(
      <FormControl required>
        <FormLabel>Name</FormLabel>
      </FormControl>,
    );
    expect(screen.getByText("*")).toHaveClass("ui-form-required");
    rerender(
      <FormControl required>
        <FormLabel requiredIndicator="(required)">Name</FormLabel>
      </FormControl>,
    );
    const indicator = screen.getByText("(required)");
    expect(indicator).toHaveClass("required", "ui-form-required");
    expect(indicator).toHaveAttribute("aria-hidden", "true");
  });

  it("lets an explicit htmlFor win and works outside a FormControl", () => {
    const ref = createRef<HTMLLabelElement>();
    render(
      <>
        <FormControl id="ctx">
          <FormLabel htmlFor="other">In</FormLabel>
        </FormControl>
        <FormLabel ref={ref} className="c">
          Out
        </FormLabel>
      </>,
    );
    expect(screen.getByText("In")).toHaveAttribute("for", "other");
    expect(ref.current).toBe(screen.getByText("Out"));
    expect(ref.current).not.toHaveAttribute("for");
    expect(ref.current).not.toHaveAttribute("id");
    expect(ref.current).toHaveClass("ui-form-label", "c");
  });
});

describe("FormHelperText / FormErrorMessage outside FormControl", () => {
  it("helper renders without an id; error message never renders", () => {
    const helperRef = createRef<HTMLDivElement>();
    render(
      <>
        <FormHelperText ref={helperRef}>help</FormHelperText>
        <FormErrorMessage>err</FormErrorMessage>
      </>,
    );
    expect(screen.getByText("help")).not.toHaveAttribute("id");
    expect(helperRef.current).toBe(screen.getByText("help"));
    expect(screen.queryByText("err")).toBeNull();
  });
});

describe("FormField", () => {
  it("renders label, child and helper; label targets the child", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <FormField ref={ref} label="Title" helperText="Public title" required>
        <Input />
      </FormField>,
    );
    const input = screen.getByRole("textbox", { name: /Title/ });
    expect(input).toHaveAccessibleDescription("Public title");
    expect(input).toHaveAttribute("aria-required", "true");
    expect(ref.current).toHaveClass("ui-form-control");
  });

  it("becomes invalid automatically when errorMessage is given, hiding helper text", () => {
    render(
      <FormField
        label="Title"
        helperText="Public title"
        errorMessage="Required"
      >
        <Input />
      </FormField>,
    );
    const input = screen.getByRole("textbox", { name: "Title" });
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
    expect(screen.queryByText("Public title")).toBeNull();
    expect(input).toHaveAccessibleDescription("Required");
  });

  it("allows invalid={false} to suppress the error even with errorMessage", () => {
    render(
      <FormField label="Title" errorMessage="Required" invalid={false}>
        <Input />
      </FormField>,
    );
    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid");
  });
});

describe("useFormControlContext", () => {
  it("returns null outside a FormControl", () => {
    const { result } = renderHook(() => useFormControlContext());
    expect(result.current).toBeNull();
  });

  it("exposes ids and flags inside a FormControl", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <FormControl id="f" invalid required readOnly>
        {children}
      </FormControl>
    );
    const { result } = renderHook(() => useFormControlContext(), { wrapper });
    expect(result.current).toMatchObject({
      id: "f",
      labelId: "f-label",
      helperId: "f-helper",
      errorId: "f-error",
      invalid: true,
      required: true,
      disabled: false,
      readOnly: true,
      // no helper / error element is rendered
      hasHelperText: false,
      hasErrorMessage: false,
    });
  });
});

describe("useFormControlProps", () => {
  const wrap =
    (props: FormControlProps) =>
    ({ children }: { children: ReactNode }) => (
      <FormControl id="f" {...props}>
        {children}
      </FormControl>
    );

  it("returns props unchanged outside a FormControl", () => {
    const props = { id: "x", disabled: false };
    const { result } = renderHook(() => useFormControlProps(props));
    expect(result.current).toBe(props);
  });

  it("adds the id and leaves describedby/invalid/required/readonly undefined by default", () => {
    const { result } = renderHook(() => useFormControlProps({}), {
      wrapper: wrap({}),
    });
    expect(result.current).toEqual({
      id: "f",
      "aria-describedby": undefined,
      "aria-invalid": undefined,
      "aria-required": undefined,
      "aria-readonly": undefined,
      readOnly: undefined,
      disabled: undefined,
    });
  });

  it("references only helper / error elements that are actually rendered", () => {
    const { rerender } = render(
      <FormControl id="g">
        <Input aria-label="Name" />
        <FormHelperText>Help</FormHelperText>
        <FormErrorMessage>Error</FormErrorMessage>
      </FormControl>,
    );
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-describedby",
      "g-helper",
    );
    rerender(
      <FormControl id="g" invalid>
        <Input aria-label="Name" />
        <FormHelperText>Help</FormHelperText>
        <FormErrorMessage>Error</FormErrorMessage>
      </FormControl>,
    );
    // the helper is not rendered while invalid, so it is not referenced
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-describedby",
      "g-error",
    );
    rerender(
      <FormControl id="g" invalid>
        <Input aria-label="Name" />
      </FormControl>,
    );
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-describedby");
  });

  it("prepends the error id when invalid and merges incoming describedby", () => {
    const { result } = renderHook(
      () => useFormControlProps({ id: "own", "aria-describedby": "extra" }),
      {
        wrapper: ({ children }: { children: ReactNode }) => (
          <FormControl id="f" invalid required readOnly disabled>
            {children}
            <FormErrorMessage>Bad</FormErrorMessage>
          </FormControl>
        ),
      },
    );
    expect(result.current).toMatchObject({
      id: "own",
      "aria-describedby": "f-error extra",
      readOnly: true,
      "aria-invalid": true,
      "aria-required": true,
      "aria-readonly": true,
      disabled: true,
    });
  });

  it('preserves an explicit child aria-invalid and normalizes the "false" string', () => {
    const { result: r1 } = renderHook(
      () => useFormControlProps({ "aria-invalid": "grammar" }),
      { wrapper: wrap({}) },
    );
    expect(r1.current["aria-invalid"]).toBe("grammar");
    const { result: r2 } = renderHook(
      () => useFormControlProps({ "aria-invalid": "false" }),
      { wrapper: wrap({}) },
    );
    expect(r2.current["aria-invalid"]).toBe(false);
  });

  it("keeps a child disabled=true even when the control is enabled", () => {
    const { result } = renderHook(
      () => useFormControlProps({ disabled: true }),
      { wrapper: wrap({}) },
    );
    expect(result.current.disabled).toBe(true);
  });
});
