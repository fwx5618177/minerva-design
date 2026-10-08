import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { defineComponent, h } from "vue";
import { TimePicker } from ".";
import { Modal } from "../Modal";

const at = (h: number, m: number, s: number) => new Date(2024, 0, 1, h, m, s);

const renderPicker = (props: Record<string, unknown> = {}) => {
  const onChange = vi.fn();
  render(
    defineComponent(() => () => [
      h(TimePicker, {
        ariaLabel: "Start",
        defaultValue: at(10, 30, 0),
        onChange,
        ...props,
      }),
      h("button", { type: "button" }, "After"),
    ]),
  );
  return onChange;
};

const input = () => screen.getByRole("textbox", { name: "Start" });
const column = (name: string) => screen.getByRole("listbox", { name });

const openPanel = async (user: ReturnType<typeof userEvent.setup>) => {
  input().focus();
  await user.keyboard("{ArrowDown}");
  await waitFor(() =>
    expect(
      within(column("Hours")).getByRole("option", { name: "10" }),
    ).toHaveFocus(),
  );
};

describe("TimePicker keyboard", () => {
  it("ArrowDown opens the panel from the Tab-reachable input and moves focus into it", async () => {
    const user = userEvent.setup();
    renderPicker();
    await user.tab();
    expect(input()).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    await waitFor(() =>
      expect(screen.getByRole("dialog", { name: "Start" })).toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(
        within(column("Hours")).getByRole("option", { name: "10" }),
      ).toHaveFocus(),
    );
  });

  it("other keys on the input do not open the panel", async () => {
    const user = userEvent.setup();
    renderPicker();
    input().focus();
    await user.keyboard("{ArrowUp}");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("ArrowDown on an already open (clicked) panel moves focus into it", async () => {
    const user = userEvent.setup();
    renderPicker();
    await user.click(input());
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
    // A pointer opening keeps focus in the input (the user may type).
    expect(input()).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(
      within(column("Hours")).getByRole("option", { name: "10" }),
    ).toHaveFocus();
  });

  it("picks units with the keyboard only and Escape returns focus to the input", async () => {
    const user = userEvent.setup();
    const onChange = renderPicker();
    await openPanel(user);
    const hour = (name: string) =>
      within(column("Hours")).getByRole("option", { name });
    expect(hour("10")).toHaveAttribute("data-minerva", "time-picker");
    expect(hour("10")).toHaveAttribute("data-part", "item");
    expect(hour("10")).toHaveAttribute("data-selected", "");
    await user.keyboard("{ArrowDown}{Enter}");
    expect(onChange).toHaveBeenLastCalledWith(at(11, 30, 0));
    expect(hour("10")).not.toHaveAttribute("data-selected");
    expect(hour("11")).toHaveAttribute("data-selected", "");
    await user.keyboard("{ArrowRight}{End}{Enter}");
    expect(onChange).toHaveBeenLastCalledWith(at(11, 59, 0));
    await user.keyboard("{Home}");
    expect(
      within(column("Minutes")).getByRole("option", { name: "00" }),
    ).toHaveFocus();
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(input()).toHaveFocus();
    expect(input()).toHaveValue("11:59:00");
  });

  it("Tab moves between the column tab stops", async () => {
    const user = userEvent.setup();
    renderPicker();
    await openPanel(user);
    await user.tab();
    expect(
      within(column("Minutes")).getByRole("option", { name: "30" }),
    ).toHaveFocus();
    await user.tab();
    expect(
      within(column("Seconds")).getByRole("option", { name: "00" }),
    ).toHaveFocus();
  });

  it("Tab past the last column closes the panel and moves on after the field", async () => {
    const user = userEvent.setup();
    renderPicker();
    await openPanel(user);
    await user.tab();
    await user.tab();
    expect(
      within(column("Seconds")).getByRole("option", { name: "00" }),
    ).toHaveFocus();
    await user.tab();
    // the field's own clear button comes first, then the rest of the page
    expect(screen.getByRole("button", { name: /clear/i })).toHaveFocus();
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await user.tab();
    expect(screen.getByRole("button", { name: "After" })).toHaveFocus();
  });

  it("Tab past the last column goes to the next field when there is no clear button", async () => {
    const user = userEvent.setup();
    renderPicker({ clearable: false });
    await openPanel(user);
    await user.tab();
    await user.tab();
    await user.tab();
    expect(screen.getByRole("button", { name: "After" })).toHaveFocus();
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("Shift+Tab before the first column closes the panel and returns focus to the input", async () => {
    const user = userEvent.setup();
    renderPicker();
    await openPanel(user);
    await user.tab({ shift: true });
    expect(input()).toHaveFocus();
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("Ctrl+Tab and Tab inside the panel keep it open", async () => {
    const user = userEvent.setup();
    renderPicker();
    await openPanel(user);
    await user.keyboard("{Control>}{Tab}{/Control}");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("inside a Modal, Escape closes only the panel and returns focus to the input", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      defineComponent(
        () => () =>
          h(Modal, { open: true, onOpenChange, title: "Schedule" }, () => [
            h(TimePicker, { ariaLabel: "Start", defaultValue: at(10, 30, 0) }),
            h("button", { type: "button" }, "In modal"),
          ]),
      ),
    );
    await waitFor(() => expect(input()).toHaveFocus());
    await user.keyboard("{ArrowDown}");
    await waitFor(() =>
      expect(
        within(column("Hours")).getByRole("option", { name: "10" }),
      ).toHaveFocus(),
    );
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog", { name: "Start" })).toBeNull(),
    );
    expect(input()).toHaveFocus();
    expect(onOpenChange).not.toHaveBeenCalled();
    // Tab past the panel stays within the modal
    await user.keyboard("{ArrowDown}");
    await waitFor(() =>
      expect(
        within(column("Hours")).getByRole("option", { name: "10" }),
      ).toHaveFocus(),
    );
    await user.tab();
    await user.tab();
    await user.tab();
    expect(screen.getByRole("button", { name: /clear/i })).toHaveFocus();
    await user.keyboard("{Escape}");
    await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(false));
  });
});
