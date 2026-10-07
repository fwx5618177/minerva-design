// A "translation settings" admin page: JsonField + KeyValueEditor inside a
// FormLayout, a command Toolbar and a List with row actions (every string
// here is consumer-provided). Buttons outside the submit action set an
// explicit type="button", since the native Button does not default it.
import { useState } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  Button,
  Checkbox,
  Divider,
  Empty,
  FormField,
  FormLayout,
  IconButton,
  JsonField,
  KeyValueEditor,
  List,
  ListItem,
  Toolbar,
  type KeyValueEntry,
} from "@minerva/lib-core";

const LOSSLESS =
  '{"n":9007199254740993,"exponent":1e400,"escaped":"\\u0061","duplicate":1,"duplicate":2}';

function DictionarySettings({
  onSave,
}: {
  onSave: (data: Record<string, FormDataEntryValue>) => void;
}) {
  const [value, setValue] = useState('{"title":"Draft"}');
  const [writes, setWrites] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [businessError, setBusinessError] = useState(false);
  return (
    <FormLayout
      aria-label="Settings"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        onSave(Object.fromEntries(new FormData(event.currentTarget)));
      }}
    >
      <FormField
        label="Dictionary"
        helperText="Translations"
        required
        disabled={disabled}
        readOnly={readOnly}
        invalid={businessError}
        errorMessage={
          businessError ? "Dictionary must contain string values" : undefined
        }
      >
        <JsonField
          name="dictionary"
          rows={6}
          value={value}
          onChange={(next) => {
            setWrites((n) => n + 1);
            setValue(next);
          }}
          formatLabel="Format JSON"
          validLabel="Valid JSON syntax"
          invalidLabel="Invalid JSON syntax"
          aria-describedby="external-help"
        />
      </FormField>
      <span id="external-help">JSON object</span>
      <p>Writes: {writes}</p>
      <Toolbar aria-label="Dictionary options">
        <Checkbox checked={disabled} onChange={(v) => setDisabled(v)}>
          Disable field
        </Checkbox>
        <Checkbox checked={readOnly} onChange={(v) => setReadOnly(v)}>
          Read only
        </Checkbox>
        <Checkbox checked={businessError} onChange={(v) => setBusinessError(v)}>
          Server rejected
        </Checkbox>
        <Button
          type="button"
          appearance="outline"
          onClick={() => setValue(LOSSLESS)}
        >
          Load sample
        </Button>
        <Button
          type="button"
          appearance="outline"
          onClick={() => setValue('{"markup":"<img src=x onerror=alert(1)>"}')}
        >
          Load markup
        </Button>
        <Button type="submit">Save</Button>
      </Toolbar>
    </FormLayout>
  );
}

describe("JsonField in a settings form", () => {
  it("label focus, Shift+Tab to the format button, Enter formats without submitting; no-op format is not a write", async () => {
    const user = userEvent.setup();
    const saves: Record<string, FormDataEntryValue>[] = [];
    render(<DictionarySettings onSave={(data) => saves.push(data)} />);
    const field = screen.getByRole("textbox", { name: /Dictionary/ });
    const format = screen.getByRole("button", { name: "Format JSON" });

    expect(screen.getByRole("status")).toHaveTextContent("Valid JSON syntax");
    await user.click(screen.getByText("Dictionary"));
    expect(field).toHaveFocus();
    expect(screen.getByRole("status")).not.toHaveTextContent(/Valid|Invalid/);

    await user.tab({ shift: true });
    expect(format).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(field).toHaveValue('{\n  "title": "Draft"\n}');
    expect(screen.getByText("Writes: 1")).toBeInTheDocument();
    expect(saves).toEqual([]);

    await user.keyboard(" ");
    expect(screen.getByText("Writes: 1")).toBeInTheDocument();

    await user.hover(format);
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Format JSON");
  });

  it("flags syntax errors on blur with linked descriptions; business errors render as an alert", async () => {
    const user = userEvent.setup();
    render(<DictionarySettings onSave={() => {}} />);
    const field = screen.getByRole("textbox", { name: /Dictionary/ });
    const format = screen.getByRole("button", { name: "Format JSON" });

    await user.clear(field);
    await user.type(field, "{{");
    expect(screen.getByRole("status")).not.toHaveTextContent(/Valid|Invalid/);
    expect(field).not.toBeInvalid();

    await user.tab();
    expect(field).toBeInvalid();
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("Invalid JSON syntax");
    const describedBy =
      field.getAttribute("aria-describedby")?.split(" ") ?? [];
    expect(describedBy).toContain(status.id);
    expect(describedBy).toContain("external-help");

    const writesBefore = screen.getByText(/^Writes:/).textContent;
    await user.click(format);
    expect(screen.getByText(/^Writes:/).textContent).toBe(writesBefore);
    expect(field).toHaveValue("{");

    await user.click(screen.getByRole("button", { name: "Load sample" }));
    expect(field).not.toBeInvalid();
    expect(screen.getByRole("status")).toHaveTextContent("Valid JSON syntax");

    await user.click(screen.getByRole("checkbox", { name: "Server rejected" }));
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Dictionary must contain string values",
    );
    expect(field).toBeInvalid();
    await user.click(screen.getByRole("checkbox", { name: "Server rejected" }));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("disabled and read-only fields both block editing and formatting; read-only values are still submitted", async () => {
    const user = userEvent.setup();
    const saves: Record<string, FormDataEntryValue>[] = [];
    render(<DictionarySettings onSave={(data) => saves.push(data)} />);
    const field = screen.getByRole("textbox", { name: /Dictionary/ });
    const format = screen.getByRole("button", { name: "Format JSON" });

    await user.click(screen.getByRole("checkbox", { name: "Disable field" }));
    expect(field).toBeDisabled();
    expect(format).toBeDisabled();
    // FormData exclusion of disabled controls is not asserted: happy-dom's FormData still includes
    // disabled <textarea> values (environment limitation; real browsers omit them).
    await user.click(screen.getByRole("checkbox", { name: "Disable field" }));

    await user.click(screen.getByRole("checkbox", { name: "Read only" }));
    expect(field).toHaveAttribute("readonly");
    expect(format).toBeDisabled();
    await user.type(field, "xyz");
    expect(field).toHaveValue('{"title":"Draft"}');
    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(saves.at(-1)).toEqual({ dictionary: '{"title":"Draft"}' });
  });

  it("formats losslessly (big ints, exponents, escapes, duplicate keys) and never renders markup", async () => {
    const user = userEvent.setup();
    render(<DictionarySettings onSave={() => {}} />);
    const field = screen.getByRole("textbox", { name: /Dictionary/ });

    await user.click(screen.getByRole("button", { name: "Load sample" }));
    await user.click(screen.getByRole("button", { name: "Format JSON" }));
    const formatted = (field as HTMLTextAreaElement).value;
    expect(formatted).toMatch(/9007199254740993/);
    expect(formatted).toMatch(/1e400/);
    expect(formatted).toMatch(/\\u0061/);
    expect(formatted.match(/"duplicate"/g)).toHaveLength(2);

    await user.click(screen.getByRole("button", { name: "Load markup" }));
    await user.click(screen.getByRole("button", { name: "Format JSON" }));
    expect(document.querySelector("img")).toBeNull();
  });
});

function HeadersForm({ onSubmit }: { onSubmit: () => void }) {
  const [entries, setEntries] = useState<KeyValueEntry[]>([
    { id: "first", key: "legacy\nkey", value: "Hello\nworld" },
    { id: "second", key: "long-key", value: "Second" },
  ]);
  const [disabled, setDisabled] = useState(false);
  return (
    <FormLayout
      aria-label="Headers"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <KeyValueEditor
        entries={entries}
        onChange={setEntries}
        disabled={disabled}
        keyLabel="Header key"
        valueLabel="Header value"
        addLabel="Add header"
        removeLabel="Delete header"
        errors={{ second: { value: "Translation needs review" } }}
      />
      <Checkbox checked={disabled} onChange={(v) => setDisabled(v)}>
        Lock headers
      </Checkbox>
      <output aria-label="Serialized">
        {JSON.stringify(entries.map(({ key, value }) => [key, value]))}
      </output>
    </FormLayout>
  );
}

describe("KeyValueEditor", () => {
  it("edits multiline keys/values, adds and deletes rows without submitting the parent form", async () => {
    const user = userEvent.setup();
    let submits = 0;
    render(
      <HeadersForm
        onSubmit={() => {
          submits += 1;
        }}
      />,
    );
    const serialized = () =>
      JSON.parse(
        screen.getByRole("status", { name: "Serialized" }).textContent ?? "[]",
      ) as string[][];

    const key1 = screen.getByRole("textbox", { name: "Header key 1" });
    const value1 = screen.getByRole("textbox", { name: "Header value 1" });
    expect(key1).toHaveValue("legacy\nkey");
    expect(key1).toHaveAttribute("rows", "1");
    expect(value1).toHaveAttribute("rows", "2");

    await user.type(value1, "!{Enter}new line");
    expect(serialized()[0]).toEqual(["legacy\nkey", "Hello\nworld!\nnew line"]);
    await user.type(key1, ".updated");
    expect(serialized()[0]?.[0]).toBe("legacy\nkey.updated");

    const invalid = screen.getByRole("textbox", { name: "Header value 2" });
    expect(invalid).toBeInvalid();
    expect(invalid).toHaveAccessibleDescription("Translation needs review");
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Translation needs review",
    );

    await user.click(screen.getByRole("button", { name: "Add header" }));
    expect(screen.getAllByRole("textbox")).toHaveLength(6);
    await user.type(
      screen.getByRole("textbox", { name: "Header key 3" }),
      "x-new",
    );
    expect(serialized()[2]).toEqual(["x-new", ""]);

    await user.click(screen.getByRole("button", { name: "Delete header 1" }));
    expect(screen.getAllByRole("textbox")).toHaveLength(4);
    expect(screen.getByRole("textbox", { name: "Header key 1" })).toHaveValue(
      "long-key",
    );
    expect(submits).toBe(0);
  });

  it("locking disables every control", async () => {
    const user = userEvent.setup();
    render(<HeadersForm onSubmit={() => {}} />);

    await user.click(screen.getByRole("checkbox", { name: "Lock headers" }));
    for (const textbox of screen.getAllByRole("textbox"))
      expect(textbox).toBeDisabled();
    expect(screen.getByRole("button", { name: "Add header" })).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Delete header 1" }),
    ).toBeDisabled();
  });
});

describe("List rows and Toolbar commands (native keyboard activation)", () => {
  it("row actions respond to Enter/Space, Tab skips disabled actions, and the error state offers retry", async () => {
    const user = userEvent.setup();
    const actions: string[] = [];
    render(
      <>
        <List aria-label="Devices">
          <ListItem
            primary="MacBook"
            secondary="Last used today"
            actions={
              <IconButton
                label="Remove MacBook"
                onClick={() => actions.push("mac")}
              >
                ×
              </IconButton>
            }
          />
          <ListItem
            primary={0}
            secondary={0}
            actions={
              <IconButton label="Remove disabled" disabled>
                ×
              </IconButton>
            }
          />
          <ListItem
            primary="Phone"
            actions={
              <Button onClick={() => actions.push("phone")}>
                Sign out phone
              </Button>
            }
          />
        </List>
        <Empty
          role="alert"
          title="Render error"
          action={<Button onClick={() => actions.push("retry")}>Retry</Button>}
          secondaryAction={<Button disabled>Unavailable</Button>}
        />
      </>,
    );

    const list = screen.getByRole("list", { name: "Devices" });
    expect(within(list).getAllByRole("listitem")).toHaveLength(3);
    expect(within(list).getAllByRole("listitem")[1]).toHaveTextContent("00");

    screen.getByRole("button", { name: "Remove MacBook" }).focus();
    await user.keyboard("{Enter}");
    await user.tab();
    expect(
      screen.getByRole("button", { name: "Sign out phone" }),
    ).toHaveFocus();
    await user.keyboard(" ");
    expect(actions).toEqual(["mac", "phone"]);

    await user.click(
      within(screen.getByRole("alert")).getByRole("button", { name: "Retry" }),
    );
    expect(actions).toEqual(["mac", "phone", "retry"]);
    expect(screen.getByRole("button", { name: "Unavailable" })).toBeDisabled();
  });

  it("toolbar is a labelled group of icon commands with vertical separators", async () => {
    const user = userEvent.setup();
    const activated: number[] = [];
    render(
      <Toolbar aria-label="Commands">
        {[0, 1, 2, 3, 4].map((index) => (
          <span key={index} style={{ display: "contents" }}>
            {index === 2 && <Divider orientation="vertical" />}
            <IconButton
              label={`Command ${index}`}
              size="small"
              onClick={() => activated.push(index)}
            >
              B
            </IconButton>
          </span>
        ))}
      </Toolbar>,
    );

    const toolbar = screen.getByRole("group", { name: "Commands" });
    expect(within(toolbar).getAllByRole("button")).toHaveLength(5);
    expect(within(toolbar).getByRole("separator")).toHaveAttribute(
      "aria-orientation",
      "vertical",
    );

    await user.tab();
    expect(
      within(toolbar).getByRole("button", { name: "Command 0" }),
    ).toHaveFocus();
    await user.keyboard("{Enter}");
    await user.tab();
    expect(
      within(toolbar).getByRole("button", { name: "Command 1" }),
    ).toHaveFocus();
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Command 1");
    await user.keyboard(" ");
    expect(activated).toEqual([0, 1]);
  });
});
