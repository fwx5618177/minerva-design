import { act, createRef, useState } from "react";
import { fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import i18n from "../../config/i18n";
import {
  KeyValueEditor,
  type KeyValueEditorProps,
  type KeyValueEntry,
  type KeyValueEntryErrors,
} from ".";
import styles from "./keyValueEditor.module.scss";

const initial: KeyValueEntry[] = [
  { id: "first", key: "duplicate", value: "one" },
  { id: "second", key: "duplicate", value: "two" },
];

const inputs = () => Array.from(document.querySelectorAll("textarea"));
const button = (label: string) =>
  Array.from(document.querySelectorAll("button")).find(
    (el) => (el.getAttribute("aria-label") || el.textContent) === label,
  )!;
const type = (input: HTMLTextAreaElement, value: string) =>
  fireEvent.change(input, { target: { value } });

function fixture(props: Partial<KeyValueEditorProps> = {}) {
  const changed = vi.fn();
  function App() {
    const [entries, setEntries] = useState(initial);
    return (
      <KeyValueEditor
        entries={entries}
        onChange={(next) => {
          changed(next);
          setEntries(next);
        }}
        {...props}
      />
    );
  }
  const view = render(<App />);
  return { changed, ...view };
}

describe("KeyValueEditor", () => {
  it("renders rows, controls and non-resizable editor textareas", () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <KeyValueEditor
        ref={ref}
        entries={initial}
        className="consumer"
        data-owner="x"
      />,
    );
    expect(ref.current).toBe(container.firstElementChild);
    expect(ref.current).toHaveClass(styles.root, "consumer");
    expect(ref.current).toHaveAttribute("data-owner", "x");
    expect(container.querySelectorAll(`.${styles.row}`)).toHaveLength(2);
    expect(container.querySelectorAll(`.${styles.key}`)).toHaveLength(2);
    expect(container.querySelector(`.${styles.add}`)).not.toBeNull();
    expect(container.querySelectorAll(`.${styles.remove}`)).toHaveLength(2);
    const fields = inputs();
    expect(fields).toHaveLength(4);
    expect(fields.every((field) => field.style.resize === "none")).toBe(true);
  });

  it("edits by stable row id, preserving duplicate keys, whitespace and untouched entries", () => {
    const { changed } = fixture();
    type(inputs()[2], "  renamed  ");
    const next = changed.mock.lastCall![0];
    expect(next).toEqual([
      initial[0],
      { id: "second", key: "  renamed  ", value: "two" },
    ]);
    expect(next).not.toBe(initial);
    expect(next[0]).toBe(initial[0]);
    expect(initial[1]).toEqual({
      id: "second",
      key: "duplicate",
      value: "two",
    });
    type(inputs()[3], "");
    expect(changed.mock.lastCall![0][1]).toEqual({
      id: "second",
      key: "  renamed  ",
      value: "",
    });
  });

  it("renders the supplied entries until the parent accepts a change", () => {
    const onChange = vi.fn();
    render(<KeyValueEditor entries={initial} onChange={onChange} />);
    type(inputs()[0], "proposed");
    expect(onChange.mock.lastCall![0][0].key).toBe("proposed");
    expect(inputs()[0].value).toBe("duplicate");
    act(() => button("Add entry").click());
    expect(inputs()).toHaveLength(4);
    expect(onChange.mock.lastCall![0]).toHaveLength(3);
  });

  it("works uncontrolled with defaultEntries", () => {
    const onChange = vi.fn();
    render(<KeyValueEditor defaultEntries={initial} onChange={onChange} />);
    type(inputs()[1], "changed");
    expect(inputs()[1].value).toBe("changed");
    act(() => button("Add entry").click());
    expect(inputs()).toHaveLength(6);
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("preserves multiline translations and legacy keys when editing around newlines", () => {
    const changed = vi.fn();
    function App() {
      const [entries, setEntries] = useState([
        { id: "translation", key: "legacy\nkey", value: "Hello\nworld" },
      ]);
      return (
        <KeyValueEditor
          entries={entries}
          onChange={(next) => {
            changed(next);
            setEntries(next);
          }}
        />
      );
    }
    render(<App />);
    expect(inputs().map((el) => el.value)).toEqual([
      "legacy\nkey",
      "Hello\nworld",
    ]);
    type(inputs()[1], "Hello!\nnew world");
    expect(changed.mock.lastCall![0]).toEqual([
      { id: "translation", key: "legacy\nkey", value: "Hello!\nnew world" },
    ]);
    type(inputs()[0], "legacy\nkey.updated");
    expect(changed.mock.lastCall![0]).toEqual([
      {
        id: "translation",
        key: "legacy\nkey.updated",
        value: "Hello!\nnew world",
      },
    ]);
    expect(inputs().map((el) => el.value)).toEqual([
      "legacy\nkey.updated",
      "Hello!\nnew world",
    ]);
  });

  it("adds blank rows with unique ids and removes only the requested duplicate-key row", () => {
    const { changed } = fixture();
    act(() => button("Add entry").click());
    act(() => button("Add entry").click());
    const added = changed.mock.lastCall![0] as KeyValueEntry[];
    expect(added).toHaveLength(4);
    expect(new Set(added.map((entry) => entry.id)).size).toBe(4);
    expect(added.slice(2)).toEqual([
      { id: expect.any(String), key: "", value: "" },
      { id: expect.any(String), key: "", value: "" },
    ]);
    expect(added.every((entry) => entry.id.length > 0)).toBe(true);
    act(() => button("Remove entry 1").click());
    expect(changed.mock.lastCall![0]).toEqual(added.slice(1));
    expect(inputs()[1].value).toBe("two");
    expect(
      Array.from(document.querySelectorAll("button")).every(
        (el) => el.type === "button",
      ),
    ).toBe(true);
  });

  it("skips generated ids that are already used by entries", () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <KeyValueEditor entries={[]} onChange={onChange} />,
    );
    act(() => button("Add entry").click());
    const firstId = onChange.mock.lastCall![0][0].id as string;
    const nextId = firstId.replace(/-0$/, "-1");
    rerender(
      <KeyValueEditor
        entries={[{ id: nextId, key: "", value: "" }]}
        onChange={onChange}
      />,
    );
    act(() => button("Add entry").click());
    const ids = (onChange.mock.lastCall![0] as KeyValueEntry[]).map(
      (entry) => entry.id,
    );
    expect(new Set(ids).size).toBe(2);
  });

  it("supports removing the last row and adding into an empty editor", () => {
    const changed = vi.fn();
    function Empty() {
      const [entries, setEntries] = useState<KeyValueEntry[]>([]);
      return (
        <KeyValueEditor
          entries={entries}
          onChange={(next) => {
            changed(next);
            setEntries(next);
          }}
        />
      );
    }
    render(<Empty />);
    expect(inputs()).toHaveLength(0);
    act(() => button("Add entry").click());
    expect(inputs()).toHaveLength(2);
    act(() => button("Remove entry 1").click());
    expect(changed.mock.lastCall![0]).toEqual([]);
    expect(inputs()).toHaveLength(0);
  });

  it("disables every input and mutation control", () => {
    const { changed } = fixture({ disabled: true });
    expect(inputs().every((el) => el.disabled)).toBe(true);
    for (const control of document.querySelectorAll("button")) {
      expect(control.disabled).toBe(true);
      act(() => control.click());
    }
    type(inputs()[0], "blocked");
    expect(changed).not.toHaveBeenCalled();
    expect(inputs().map((el) => el.value)).toEqual([
      "duplicate",
      "one",
      "duplicate",
      "two",
    ]);
  });

  it("labels each field and associates errors by row id across reordering", () => {
    const errors: Record<string, KeyValueEntryErrors> = {
      second: { key: "Key conflict", value: "Value required" },
    };
    const props = {
      entries: initial,
      onChange: vi.fn(),
      keyLabel: "Header",
      valueLabel: "Content",
      addLabel: "Add header",
      removeLabel: "Delete header",
      errors,
    };
    const { rerender } = render(<KeyValueEditor {...props} />);
    const field = inputs()[2];
    const described = field.getAttribute("aria-describedby")!.split(" ");
    expect(field.getAttribute("aria-invalid")).toBe("true");
    expect(
      described.some(
        (id) => document.getElementById(id)?.textContent === "Key conflict",
      ),
    ).toBe(true);
    expect(inputs()[3].getAttribute("aria-invalid")).toBe("true");
    expect(inputs()[0].getAttribute("aria-invalid")).not.toBe("true");
    expect(
      inputs().map(
        (input) =>
          Array.from(document.querySelectorAll("label")).find(
            (label) => label.htmlFor === input.id,
          )?.textContent,
      ),
    ).toEqual(["Header 1", "Content 1", "Header 2", "Content 2"]);
    expect(button("Add header")).toBeDefined();
    expect(button("Delete header 2")).toBeDefined();
    const stableField = inputs()[2];
    act(() => stableField.focus());
    rerender(<KeyValueEditor {...props} entries={[initial[1], initial[0]]} />);
    expect(inputs()[0]).toBe(stableField);
    expect(document.activeElement).toBe(stableField);
    expect(inputs()[0].getAttribute("aria-invalid")).toBe("true");
    expect(inputs()[2].getAttribute("aria-invalid")).not.toBe("true");
    // public item hook: the row with an error is invalid
    const rows = document.querySelectorAll('[data-part="row"]');
    expect(rows[0]).toHaveAttribute("data-invalid", "");
    expect(rows[1]).not.toHaveAttribute("data-invalid");
  });

  it("keeps field ids distinct across multiple editors", () => {
    render(
      <>
        <KeyValueEditor entries={initial} onChange={() => {}} />
        <KeyValueEditor entries={initial} onChange={() => {}} />
      </>,
    );
    expect(new Set(inputs().map((el) => el.id)).size).toBe(8);
    expect(inputs().every((el) => !!el.id)).toBe(true);
  });
});

describe("KeyValueEditor localization", () => {
  afterEach(() => {
    act(() => {
      i18n.changeLanguage("en");
    });
  });

  it("translates the built-in labels", () => {
    act(() => {
      i18n.changeLanguage("zh");
    });
    render(<KeyValueEditor entries={initial.slice(0, 1)} />);
    expect(button("删除条目 1")).toBeDefined();
    expect(document.querySelector("label")?.textContent).toBe("键 1");
    expect(document.querySelector(`.${styles.add}`)?.textContent).toBe(
      "添加条目",
    );
  });
});
