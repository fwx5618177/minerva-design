// Keyboard audit: select button opens the picker, item actions are reachable
// and focus is kept in the component when an item is removed.
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { defineComponent, h, nextTick, ref } from "vue";
import { Upload, type UploadItem } from ".";

const items: UploadItem[] = [
  { id: "1", name: "a.png", status: "done" },
  { id: "2", name: "b.png", status: "error", error: "Offline" },
  { id: "3", name: "c.png", status: "done" },
];

const App = defineComponent({
  props: { disabled: { type: Boolean, default: false } },
  setup(props) {
    const value = ref(items);
    return () =>
      h(Upload, {
        label: "Attachments",
        multiple: true,
        disabled: props.disabled,
        modelValue: value.value,
        onRetry: () => {},
        onRemove: (item: UploadItem) => {
          value.value = value.value.filter((it) => it.id !== item.id);
        },
      });
  },
});

/** A parent that removes the item later (e.g. after cancelling a transfer) */
const deferred = (extra = false) => {
  let removeLater: (() => void) | undefined;
  const Async = defineComponent({
    setup() {
      const value = ref(items.slice(0, 1));
      return () => [
        h(Upload, {
          label: "Attachments",
          modelValue: value.value,
          onRemove: () => {
            removeLater = () => {
              value.value = [];
            };
          },
        }),
        extra ? h("input", { "aria-label": "elsewhere" }) : null,
      ];
    },
  });
  render(Async);
  return { later: () => removeLater! };
};

const select = () => screen.getByRole("button", { name: "Select files" });
const removeButton = (name: string) =>
  screen.getByRole("button", { name: `Remove ${name}` });

describe("Upload keyboard", () => {
  it("opens the file picker with Space on the select button", async () => {
    const user = userEvent.setup();
    const { container } = render(App);
    const input =
      container.querySelector<HTMLInputElement>('input[type="file"]')!;
    const click = vi.spyOn(input, "click");
    await user.tab();
    expect(select()).toHaveFocus();
    await user.keyboard(" ");
    expect(click).toHaveBeenCalledTimes(1);
  });

  it("reaches the retry and remove buttons of every item in order", async () => {
    const user = userEvent.setup();
    render(App);
    await user.tab();
    await user.tab();
    expect(removeButton("a.png")).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Retry b.png" })).toHaveFocus();
    await user.tab();
    expect(removeButton("b.png")).toHaveFocus();
    await user.tab();
    expect(removeButton("c.png")).toHaveFocus();
  });

  it("moves focus to the next remove button, else the select button, after a keyboard removal", async () => {
    const user = userEvent.setup();
    render(App);
    removeButton("b.png").focus();
    await user.keyboard("{Enter}");
    expect(screen.queryByText("b.png")).not.toBeInTheDocument();
    expect(removeButton("c.png")).toHaveFocus();
    // last item: falls back to the previous one
    await user.keyboard(" ");
    expect(removeButton("a.png")).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
    expect(select()).toHaveFocus();
  });

  it("restores focus when the parent removes the item later (async)", async () => {
    const user = userEvent.setup();
    const { later } = deferred();
    removeButton("a.png").focus();
    await user.keyboard("{Enter}");
    // still focused while the transfer is cancelled
    expect(removeButton("a.png")).toHaveFocus();
    later()();
    await nextTick();
    await nextTick();
    expect(select()).toHaveFocus();
  });

  it("does not move focus that the user already moved elsewhere", async () => {
    const user = userEvent.setup();
    const { later } = deferred(true);
    removeButton("a.png").focus();
    await user.keyboard("{Enter}");
    await user.click(screen.getByRole("textbox", { name: "elsewhere" }));
    later()();
    await nextTick();
    await nextTick();
    expect(screen.getByRole("textbox", { name: "elsewhere" })).toHaveFocus();
  });

  it("skips every control when disabled", async () => {
    const user = userEvent.setup();
    render(App, { props: { disabled: true } });
    await user.tab();
    expect(document.body).toHaveFocus();
  });
});
