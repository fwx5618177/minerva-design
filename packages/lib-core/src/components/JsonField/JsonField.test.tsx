import { act, createRef, useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import i18n from "../../config/i18n";
import { JsonField } from ".";
import { FormField } from "../FormControl";
import textareaStyles from "../Textarea/textarea.module.scss";
import styles from "./jsonField.module.scss";

const input = () => document.querySelector("textarea")!;
const button = () => document.querySelector("button")!;
const focus = () => fireEvent.focus(input());
const blur = () => fireEvent.blur(input());

describe("JsonField", () => {
  it("uses a keyboard-reachable format button and preserves the controlled callback", () => {
    const changes: string[] = [];
    render(
      <JsonField
        value='{"title":"Draft"}'
        onChange={(value) => changes.push(value)}
      />,
    );
    expect(button()).toHaveAttribute("aria-label", "Format JSON");
    expect(button().tabIndex).toBe(0);
    expect(button().type).toBe("button");
    act(() => button().click());
    expect(changes).toEqual(['{\n  "title": "Draft"\n}']);
    // controlled: the value only changes when the parent accepts it
    expect(input().value).toBe('{"title":"Draft"}');
  });

  it("works uncontrolled with defaultValue, typing and formatting", () => {
    const onChange = vi.fn();
    render(<JsonField defaultValue="[1,2]" onChange={onChange} />);
    act(() => button().click());
    expect(input().value).toBe("[\n  1,\n  2\n]");
    fireEvent.change(input(), { target: { value: "[]" } });
    expect(input().value).toBe("[]");
    expect(onChange).toHaveBeenLastCalledWith("[]");
  });

  it("renders the root, textarea and an invalid status", () => {
    const { container } = render(
      <JsonField value="{" onChange={() => {}} className="consumer" />,
    );
    const root = container.firstElementChild!;
    expect(root).toHaveClass(styles.root, "consumer");
    expect(input()).toHaveClass(textareaStyles.textarea, styles.textarea);
    expect(screen.getByRole("status")).toHaveClass(
      styles.status,
      styles.statusInvalid,
    );
  });

  it("forwards native textarea attributes, form association, event handlers and ref", () => {
    const ref = createRef<HTMLTextAreaElement>();
    const events: string[] = [];
    render(
      <JsonField
        ref={ref}
        value="{}"
        onChange={() => {}}
        name="dictionary"
        form="settings"
        id="json"
        rows={12}
        required
        readOnly
        maxLength={1000}
        aria-describedby="help"
        data-owner="fixture"
        onFocus={() => events.push("focus")}
        onBlur={() => events.push("blur")}
      />,
    );
    expect(ref.current).toBe(input());
    expect(input().name).toBe("dictionary");
    expect(input().getAttribute("form")).toBe("settings");
    expect(input().id).toBe("json");
    expect(input().getAttribute("rows")).toBe("12");
    expect(input().required).toBe(true);
    expect(input().readOnly).toBe(true);
    expect(input().maxLength).toBe(1000);
    expect(input().dataset.owner).toBe("fixture");
    expect(input().getAttribute("aria-describedby")).toContain("help");
    expect(input().getAttribute("spellcheck")).toBe("false");
    focus();
    blur();
    expect(events).toEqual(["focus", "blur"]);
  });

  it("defaults to 8 rows", () => {
    render(<JsonField value="" onChange={() => {}} />);
    expect(input().getAttribute("rows")).toBe("8");
  });

  it.each(["disabled", "readOnly"] as const)(
    "blocks formatting and edits and preserves values when %s",
    (state) => {
      let changes = 0;
      render(
        <JsonField
          value='{"a":1}'
          onChange={() => changes++}
          {...{ [state]: true }}
        />,
      );
      expect(input()[state]).toBe(true);
      expect(button().disabled).toBe(true);
      act(() => button().click());
      fireEvent.change(input(), { target: { value: "x" } });
      expect(changes).toBe(0);
    },
  );

  it.each(["disabled", "readOnly"] as const)(
    "inherits %s from FormField for textarea and formatting",
    (state) => {
      render(
        <FormField label="Dictionary" {...{ [state]: true }} required>
          <JsonField value='{"a":1}' onChange={() => {}} />
        </FormField>,
      );
      expect(input()[state]).toBe(true);
      expect(input().required).toBe(true);
      expect(document.querySelector("label")?.htmlFor).toBe(input().id);
      expect(button().disabled).toBe(true);
    },
  );

  it("revalidates external values and associates full syntax errors with the textarea", () => {
    const view = (value: string) => (
      <FormField label="Dictionary" helperText="Help">
        <JsonField
          value={value}
          onChange={() => {}}
          aria-describedby="external-help"
        />
      </FormField>
    );
    const { container, rerender } = render(view("{}"));
    expect(container.textContent).toContain("Valid JSON");
    rerender(view("{"));
    expect(container.textContent).toContain("Invalid JSON");
    expect(input().getAttribute("aria-invalid")).toBe("true");
    const status = screen.getByRole("status");
    expect(status.id).not.toBe("");
    expect(input().getAttribute("aria-describedby")?.split(" ")).toContain(
      status.id,
    );
    expect(input().getAttribute("aria-describedby")).toContain("external-help");
    rerender(view('{"reloaded":true}'));
    expect(container.textContent).not.toContain("Invalid JSON");
    expect(input().getAttribute("aria-invalid")).not.toBe("true");
  });

  it("does not show stale validation while editing and checks the latest value on blur", () => {
    const { container, rerender } = render(
      <JsonField value="{}" onChange={() => {}} />,
    );
    focus();
    rerender(<JsonField value="{" onChange={() => {}} />);
    expect(container.textContent).not.toContain("Valid JSON");
    expect(container.textContent).not.toContain("Invalid JSON");
    blur();
    expect(container.textContent).toContain("Invalid JSON");
  });

  it.each(['{"a":1,}', '{/* comment */"a":1}', "{", "[1,]"])(
    "rejects non-JSON syntax without changing %s",
    (value) => {
      let changes = 0;
      render(<JsonField value={value} onChange={() => changes++} />);
      act(() => button().click());
      expect(changes).toBe(0);
      expect(input().value).toBe(value);
      expect(input().getAttribute("aria-invalid")).toBe("true");
    },
  );

  it("formats whitespace without changing numeric tokens, escapes, duplicate keys or property order", () => {
    let formatted = "";
    const value =
      '{"n":9007199254740993,"huge":1e400,"s":"\\u0061","x":1,"x":2,"10":true,"2":false}';
    render(
      <JsonField
        value={value}
        onChange={(text) => (formatted = text)}
        indent={4}
      />,
    );
    act(() => button().click());
    expect(formatted).toContain('\n    "n": 9007199254740993');
    expect(formatted).toContain('"huge": 1e400');
    expect(formatted).toContain('"s": "\\u0061"');
    expect(formatted.match(/"x"/g)).toHaveLength(2);
    expect(formatted.indexOf('"10"')).toBeLessThan(formatted.indexOf('"2"'));
  });

  it("does not emit a change when formatting is already applied", () => {
    let changes = 0;
    render(<JsonField value={'{\n  "a": 1\n}'} onChange={() => changes++} />);
    act(() => button().click());
    expect(changes).toBe(0);
  });

  it("retains compact-mode compatibility without rewriting token values", () => {
    let formatted = "";
    render(
      <JsonField
        value={'  { "n": 9007199254740993, "s": "a b", "escape": "\\u0061" }  '}
        onChange={(value) => (formatted = value)}
        indent={0}
      />,
    );
    act(() => button().click());
    expect(formatted).toBe(
      '{"n":9007199254740993,"s":"a b","escape":"\\u0061"}',
    );
  });

  it("clamps the indent to 10 spaces", () => {
    let formatted = "";
    render(
      <JsonField
        value="[1]"
        onChange={(value) => (formatted = value)}
        indent={40}
      />,
    );
    act(() => button().click());
    expect(formatted).toBe(`[\n${" ".repeat(10)}1\n]`);
  });

  it("keeps empty fields neutral and formatting disabled", () => {
    render(<JsonField value="   " onChange={() => {}} />);
    expect(button().disabled).toBe(true);
    expect(screen.getByRole("status").textContent ?? "").toBe("");
  });

  it("can hide formatting controls while retaining associated syntax errors", () => {
    const { container } = render(
      <JsonField value="{" onChange={() => {}} hideToolbar />,
    );
    expect(container.querySelector("button")).toBeNull();
    expect(container.textContent).toContain("Invalid JSON");
    expect(input().getAttribute("aria-invalid")).toBe("true");
  });

  it("allows localized format and validation labels", () => {
    const { container, rerender } = render(
      <JsonField
        value="{}"
        onChange={() => {}}
        formatLabel="Formatieren"
        validLabel="Gültiges JSON"
        invalidLabel="Ungültiges JSON"
      />,
    );
    expect(button().getAttribute("aria-label")).toBe("Formatieren");
    expect(container.textContent).toContain("Gültiges JSON");
    rerender(
      <JsonField
        value="{"
        onChange={() => {}}
        invalidLabel="Ungültiges JSON"
      />,
    );
    expect(container.textContent).toContain("Ungültiges JSON:");
  });

  it("reflects explicit invalid state to assistive technology without losing a business error", () => {
    render(<JsonField value="{}" onChange={() => {}} invalid />);
    expect(input().getAttribute("aria-invalid")).toBe("true");
    expect(input()).toHaveClass(textareaStyles.invalid);
  });

  it('passes a child aria-invalid through and normalizes "false"', () => {
    const { rerender } = render(
      <JsonField value="{}" onChange={() => {}} aria-invalid="grammar" />,
    );
    expect(input().getAttribute("aria-invalid")).toBe("grammar");
    rerender(<JsonField value="{}" onChange={() => {}} aria-invalid="false" />);
    expect(input().getAttribute("aria-invalid")).toBe("false");
  });

  it("emits typed text when editable", () => {
    function App() {
      const [text, setText] = useState("");
      return <JsonField value={text} onChange={setText} />;
    }
    render(<App />);
    fireEvent.change(input(), { target: { value: "[true]" } });
    expect(input().value).toBe("[true]");
  });
});

describe("JsonField localization", () => {
  afterEach(() => {
    act(() => {
      i18n.changeLanguage("en");
    });
  });

  it("uses the Chinese strings", () => {
    act(() => {
      i18n.changeLanguage("zh");
    });
    const { container, rerender } = render(
      <JsonField value="{}" onChange={() => {}} />,
    );
    expect(button().getAttribute("aria-label")).toBe("格式化 JSON");
    expect(container.textContent).toContain("JSON 语法正确");
    rerender(<JsonField value="{" onChange={() => {}} />);
    expect(container.textContent).toContain("JSON 语法错误");
  });
});
