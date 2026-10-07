import { createRef, useState, type ReactNode } from "react";
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  FormControl,
  FormErrorMessage,
  FormField,
  FormHelperText,
  FormLabel,
  FormLayout,
  Input,
  JsonField,
  KeyValueEditor,
  NumberInput,
  TagInput,
  Textarea,
  useFormControlContext,
  useFormControlProps,
  type FormControlProps,
  type FormFieldProps,
  type FormLabelProps,
  type FormLayoutProps,
  type InputProps,
  type InputSize,
  type InputVariant,
  type JsonFieldProps,
  type KeyValueEditorProps,
  type KeyValueEntry,
  type KeyValueEntryErrors,
  type NumberInputProps,
  type NumberInputSize,
  type TagInputProps,
  type TextareaProps,
  type TextareaResize,
  type TextareaSize,
  type TextareaVariant,
} from "./forms";

// Type-level: novel-isr-ui prop shapes are accepted as-is.
const formControlProps: FormControlProps = {
  isInvalid: true,
  isRequired: true,
  isDisabled: false,
  isReadOnly: false,
  id: "f",
};
const formFieldProps: FormFieldProps = {
  label: "Title",
  helperText: "Help",
  errorMessage: "Bad",
  isRequired: true,
};
const formLabelProps: FormLabelProps = {
  requiredIndicator: "(required)",
  htmlFor: "x",
};
const layoutProps: FormLayoutProps = {
  columns: { base: 1, sm: 2 },
  gap: 4,
  rowGap: "2",
  columnGap: "20px",
  noValidate: true,
};
const inputSize: InputSize = "sm";
const inputVariant: InputVariant = "filled";
const inputProps: InputProps = {
  size: inputSize,
  variant: inputVariant,
  isInvalid: true,
  prefix: "@",
  suffix: "kg",
};
const textareaSize: TextareaSize = "lg";
const textareaVariant: TextareaVariant = "unstyled";
const textareaResize: TextareaResize = "both";
const textareaProps: TextareaProps = {
  size: textareaSize,
  variant: textareaVariant,
  resize: textareaResize,
  isInvalid: false,
};
const numberSize: NumberInputSize = "lg";
const numberProps: NumberInputProps = {
  value: undefined,
  onChange: () => {},
  size: numberSize,
  isInvalid: true,
  showStepper: true,
  allowEmpty: false,
  "aria-label": "N",
};
const jsonProps: JsonFieldProps = {
  value: "{}",
  onChange: () => {},
  hideToolbar: false,
  indent: 2,
  isInvalid: false,
  size: "sm",
};
const entries: KeyValueEntry[] = [{ id: "a", key: "k", value: "v" }];
const entryErrors: KeyValueEntryErrors = { key: "Required" };
const kvProps: KeyValueEditorProps = {
  entries,
  onChange: () => {},
  errors: { a: entryErrors },
};
const tagProps: TagInputProps = {
  value: ["React"],
  onValueChange: () => {},
  size: "sm",
  options: ["Vue"],
};
void [
  formControlProps,
  formFieldProps,
  formLabelProps,
  layoutProps,
  inputProps,
  textareaProps,
  numberProps,
  jsonProps,
  kvProps,
  tagProps,
];

describe("compat/forms", () => {
  it("FormControl maps is* props and keeps the ui-* hooks and ids", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <FormControl
        ref={ref}
        id="email"
        isInvalid
        isRequired
        isDisabled
        isReadOnly
        className="c"
      >
        <FormLabel>Email</FormLabel>
        <Input />
        <FormHelperText>help</FormHelperText>
        <FormErrorMessage>bad</FormErrorMessage>
      </FormControl>,
    );
    expect(ref.current).toHaveClass("ui-form-control", "c");
    expect(ref.current).toHaveAttribute("data-invalid", "true");
    expect(ref.current).toHaveAttribute("data-disabled", "true");
    const input = screen.getByRole("textbox", { name: /Email/ });
    expect(input).toHaveAttribute("id", "email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-required", "true");
    expect(input).toHaveAttribute("aria-readonly", "true");
    expect(input).toBeDisabled();
    expect(screen.getByRole("alert")).toHaveAttribute("id", "email-error");
    expect(screen.getByText("*")).toHaveClass("ui-form-required");
    expect(screen.queryByText("help")).toBeNull();
  });

  it("FormField maps is* props (app usage: label + helperText + className)", () => {
    const { rerender } = render(
      <FormField
        label="Title"
        helperText="Public title"
        className="span-2"
        isRequired
      >
        <Input value="x" onChange={() => {}} placeholder="Title" />
      </FormField>,
    );
    const input = screen.getByRole("textbox", { name: /Title/ });
    expect(input).toHaveAccessibleDescription("Public title");
    expect(input).toHaveAttribute("aria-required", "true");
    expect(input.closest(".ui-form-control")).toHaveClass("span-2");
    rerender(
      <FormField
        label="Title"
        errorMessage="Required"
        isInvalid={false}
        isDisabled
        isReadOnly
      >
        <Input />
      </FormField>,
    );
    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.getByRole("textbox")).toBeDisabled();
    expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
  });

  it("useFormControlContext returns novel's is* flags (and null outside)", () => {
    expect(renderHook(() => useFormControlContext()).result.current).toBeNull();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <FormControl id="f" isInvalid isRequired isReadOnly>
        {children}
      </FormControl>
    );
    const { result } = renderHook(() => useFormControlContext(), { wrapper });
    expect(result.current).toMatchObject({
      id: "f",
      helperId: "f-helper",
      errorId: "f-error",
      isInvalid: true,
      isRequired: true,
      isDisabled: false,
      isReadOnly: true,
      hasHelperText: false,
      hasErrorMessage: false,
    });
  });

  it("useFormControlProps wires a custom control", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <FormControl id="f" isDisabled>
        {children}
      </FormControl>
    );
    const { result } = renderHook(
      () => useFormControlProps({ readOnly: false }),
      { wrapper },
    );
    expect(result.current).toMatchObject({ id: "f", disabled: true });
  });

  it("Input maps size / isInvalid (app usage: disabled + prefix, size sm)", () => {
    const { rerender } = render(
      <Input
        value="handle"
        disabled
        prefix={<span>@</span>}
        onChange={() => {}}
      />,
    );
    let input = screen.getByRole("textbox");
    expect(input.parentElement).toHaveClass(
      "ui-input-root",
      "ui-input-size-md",
      "ui-input-disabled",
    );
    expect(
      input.parentElement?.querySelector(".ui-input-addon-start"),
    ).toHaveTextContent("@");
    rerender(
      <Input
        size="sm"
        isInvalid
        variant="filled"
        aria-label="Search"
        type="search"
      />,
    );
    input = screen.getByRole("searchbox", { name: "Search" });
    expect(input.parentElement).toHaveClass(
      "ui-input-size-sm",
      "ui-input-variant-filled",
      "ui-input-error",
    );
  });

  it("Textarea maps size / isInvalid and ignores the deprecated resize (app usage)", async () => {
    const user = userEvent.setup();
    function App() {
      const [value, setValue] = useState("");
      return (
        <Textarea
          aria-label="Bio"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={4}
          placeholder="Say"
          resize="vertical"
          size="lg"
          isInvalid
        />
      );
    }
    render(<App />);
    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "hi");
    expect(textarea).toHaveValue("hi");
    expect(textarea).toHaveClass(
      "ui-textarea",
      "ui-textarea-size-lg",
      "ui-textarea-error",
      "ui-textarea-resize-none",
    );
    expect(textarea).not.toHaveAttribute("resize");
    expect(textarea.style.resize).toBe("none");
  });

  it("NumberInput stays controlled with undefined values (app usage: min / max / step / precision)", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    function App() {
      const [value, setValue] = useState<number | null | undefined>(undefined);
      return (
        <FormField label="Fail rate">
          <NumberInput
            min={0}
            max={1}
            step={0.01}
            precision={2}
            value={value}
            onChange={(v) => {
              spy(v);
              setValue(v);
            }}
            size="sm"
          />
        </FormField>
      );
    }
    render(<App />);
    const input = screen.getByRole("spinbutton", { name: "Fail rate" });
    expect(input).toHaveValue("");
    expect(input.parentElement).toHaveClass(
      "ui-number-input-root",
      "ui-number-input-size-sm",
    );
    await user.click(input);
    await user.keyboard("{ArrowUp}");
    expect(spy).toHaveBeenLastCalledWith(0.01);
    expect(input).toHaveValue("0.01");
    render(
      <NumberInput aria-label="Q" value={1} onChange={() => {}} isInvalid />,
    );
    expect(
      screen.getByRole("spinbutton", { name: "Q" }).parentElement,
    ).toHaveClass("ui-number-input-error");
  });

  it("JsonField keeps the controlled API (app usage: value / rows / placeholder / onChange)", () => {
    const changes: string[] = [];
    const { container, rerender } = render(
      <JsonField
        value='{"a":1}'
        rows={10}
        placeholder='{"data":[]}'
        onChange={(v) => changes.push(v)}
      />,
    );
    const textarea = container.querySelector("textarea")!;
    expect(textarea).toHaveAttribute("rows", "10");
    expect(textarea).toHaveAttribute("placeholder", '{"data":[]}');
    act(() => container.querySelector("button")!.click());
    expect(changes).toEqual(['{\n  "a": 1\n}']);
    rerender(
      <JsonField
        value="{}"
        onChange={() => {}}
        isInvalid
        size="lg"
        resize="both"
      />,
    );
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveClass("ui-textarea-size-lg");
  });

  it("KeyValueEditor keeps its API", () => {
    const onChange = vi.fn();
    const { container } = render(
      <KeyValueEditor
        entries={entries}
        onChange={onChange}
        errors={{ a: entryErrors }}
        keyLabel="Header"
      />,
    );
    expect(container.firstElementChild).toHaveClass("ui-key-value-editor");
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
    fireEvent.change(container.querySelector("textarea")!, {
      target: { value: "k2" },
    });
    expect(onChange).toHaveBeenLastCalledWith([
      { id: "a", key: "k2", value: "v" },
    ]);
  });

  it("TagInput maps onValueChange and size", () => {
    const onValueChange = vi.fn();
    const { container } = render(
      <TagInput
        value={["React"]}
        onValueChange={onValueChange}
        options={["Vue"]}
        size="sm"
        aria-label="Tags"
      />,
    );
    const input = container.querySelector("input")!;
    expect(input.parentElement).toHaveClass("ui-input-size-sm");
    act(() => input.focus());
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onValueChange).toHaveBeenLastCalledWith(["React", "Vue"]);
  });

  it("FormLayout is the Minerva form layout", () => {
    const ref = createRef<HTMLFormElement>();
    const { container } = render(
      <FormLayout ref={ref} columns={{ base: 1, sm: 2 }} gap={4}>
        <FormField label="Title">
          <Input name="title" />
        </FormField>
      </FormLayout>,
    );
    expect(ref.current).toHaveClass("ui-form-layout");
    expect(container.querySelector(".ui-responsive-grid")).not.toBeNull();
  });

  it("passes novel-isr-ui's built-in strings under the default en language", async () => {
    const user = userEvent.setup();
    const { container, unmount } = render(
      <NumberInput
        aria-label="N"
        value={1}
        onChange={() => {}}
        min={0}
        max={10}
        showStepper
      />,
    );
    expect(container.querySelector('[aria-label="增加"]')).not.toBeNull();
    expect(container.querySelector('[aria-label="减少"]')).not.toBeNull();
    const field = screen.getByRole("spinbutton");
    await user.clear(field);
    await user.type(field, "99");
    expect(field.parentElement).toHaveAttribute("title", "最大值 10");
    await user.clear(field);
    await user.type(field, "-5");
    expect(field.parentElement).toHaveAttribute("title", "最小值 0");
    await user.clear(field);
    await user.type(field, "x");
    expect(field.parentElement).toHaveAttribute("title", "请输入数字");
    unmount();

    const json = render(<JsonField value="{}" onChange={() => {}} />);
    expect(json.container.querySelector("button")).toHaveAttribute(
      "aria-label",
      "格式化 JSON",
    );
    expect(json.container.textContent).toContain("JSON 语法正确");
    json.rerender(<JsonField value="{" onChange={() => {}} />);
    expect(json.container.textContent).toContain("JSON 语法错误");
    json.rerender(
      <JsonField value="{}" onChange={() => {}} formatLabel="Format" />,
    );
    expect(json.container.querySelector("button")).toHaveAttribute(
      "aria-label",
      "Format",
    );
    json.unmount();

    const kv = render(<KeyValueEditor entries={entries} onChange={() => {}} />);
    expect(
      screen.getByRole("button", { name: "Remove entry 1" }),
    ).toBeDefined();
    expect(kv.container.querySelector("label")?.textContent).toBe("Key 1");
    kv.unmount();

    const tags = render(
      <TagInput
        value={["React"]}
        onValueChange={() => {}}
        options={[]}
        aria-label="Tags"
      />,
    );
    expect(
      tags.container.querySelector('[aria-label="Remove React"]'),
    ).not.toBeNull();
    expect(
      tags.container.querySelector('[aria-label="Add tag"]'),
    ).not.toBeNull();
    expect(
      tags.container.querySelector('[aria-label="Clear tags"]'),
    ).not.toBeNull();
    act(() => tags.container.querySelector("input")!.focus());
    expect(
      tags.container.querySelector(".ui-autocomplete-empty"),
    ).toHaveTextContent("无匹配项");
  });
});
