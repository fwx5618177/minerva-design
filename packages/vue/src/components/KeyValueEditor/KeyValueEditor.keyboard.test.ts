// Keyboard audit: add / remove reachable by keyboard, focus follows the action.
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { defineComponent, h, ref } from "vue";
import { KeyValueEditor, type KeyValueEntry } from ".";

const initial: KeyValueEntry[] = [
  { id: "a", key: "alpha", value: "1" },
  { id: "b", key: "beta", value: "2" },
  { id: "c", key: "gamma", value: "3" },
];

const App = defineComponent({
  props: {
    start: { type: Array as () => KeyValueEntry[], default: () => initial },
    accept: { type: Boolean, default: true },
  },
  setup(props) {
    const entries = ref(props.start);
    return () =>
      h(KeyValueEditor, {
        modelValue: entries.value,
        "onUpdate:modelValue": (next: KeyValueEntry[]) => {
          if (props.accept) entries.value = next;
        },
      });
  },
});

const remove = (n: number) =>
  screen.getByRole("button", { name: `Remove entry ${n}` });
const add = () => screen.getByRole("button", { name: "Add entry" });

describe("KeyValueEditor keyboard", () => {
  it("tabs through key, value and remove of each row, then the add button", async () => {
    const user = userEvent.setup();
    render(App, { props: { start: initial.slice(0, 1) } });
    await user.tab();
    expect(screen.getByRole("textbox", { name: "Key 1" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("textbox", { name: "Value 1" })).toHaveFocus();
    await user.tab();
    expect(remove(1)).toHaveFocus();
    await user.tab();
    expect(add()).toHaveFocus();
  });

  it("adds a row with Enter / Space and focuses its key field", async () => {
    const user = userEvent.setup();
    render(App, { props: { start: [] } });
    await user.tab();
    expect(add()).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(screen.getByRole("textbox", { name: "Key 1" })).toHaveFocus();
    await user.keyboard("token");
    expect(screen.getByRole("textbox", { name: "Key 1" })).toHaveValue("token");

    add().focus();
    await user.keyboard(" ");
    expect(screen.getByRole("textbox", { name: "Key 2" })).toHaveFocus();
  });

  it("moves focus to the next row's remove button, else the previous one, else the add button", async () => {
    const user = userEvent.setup();
    render(App);
    remove(2).focus();
    await user.keyboard("{Enter}");
    expect(screen.queryByDisplayValue("beta")).not.toBeInTheDocument();
    // "gamma" is now row 2
    expect(remove(2)).toHaveFocus();
    expect(screen.getByRole("textbox", { name: "Key 2" })).toHaveValue("gamma");

    await user.keyboard(" ");
    expect(remove(1)).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(screen.queryAllByRole("textbox")).toHaveLength(0);
    expect(add()).toHaveFocus();
  });

  it("keeps focus where it is when a controlled parent rejects the change", async () => {
    const user = userEvent.setup();
    render(App, { props: { accept: false } });
    remove(1).focus();
    await user.keyboard("{Enter}");
    expect(remove(1)).toHaveFocus();
    add().focus();
    await user.keyboard("{Enter}");
    expect(add()).toHaveFocus();
  });

  it("does not steal focus later when rows change by typing", async () => {
    const user = userEvent.setup();
    const { emitted } = render(KeyValueEditor, {
      props: { defaultValue: initial },
    });
    const value = screen.getByRole("textbox", { name: "Value 3" });
    await user.click(value);
    await user.keyboard("x");
    expect(value).toHaveFocus();
    expect(value).toHaveValue("3x");
    expect(emitted().change).toBeDefined();
  });

  it("skips every control when disabled", async () => {
    const user = userEvent.setup();
    render(KeyValueEditor, {
      props: { defaultValue: initial, disabled: true },
    });
    await user.tab();
    expect(document.body).toHaveFocus();
  });
});
