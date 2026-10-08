import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { flushPromises, mount } from "@vue/test-utils";
import { defineComponent, h, nextTick, ref } from "vue";
import { TimePicker } from ".";
import TimePickerPanel from "./TimePickerPanel.vue";
import type { TimePickerProps } from "./types";

const at = (h: number, m: number, s: number) => new Date(2024, 0, 1, h, m, s);

const settle = async () => {
  await flushPromises();
  await new Promise((r) => setTimeout(r, 0));
  await nextTick();
};

type Handlers = {
  onChange?: (date: Date | undefined) => void;
  "onUpdate:modelValue"?: (date: Date | null) => void;
  onOpenChange?: (open: boolean) => void;
};

const renderTimePicker = (props: Partial<TimePickerProps> & Handlers = {}) =>
  render(TimePicker, { props: props as never });

const getInput = () => screen.getByRole<HTMLInputElement>("textbox");

const getColumns = () =>
  Array.from(
    screen.getByRole("dialog").querySelectorAll<HTMLElement>(".timeColumn"),
  );

const openPanel = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(getInput());
  await settle();
  return getColumns();
};

const lastDate = (fn: ReturnType<typeof vi.fn>) =>
  fn.mock.lastCall?.[0] as Date | undefined;

describe("TimePicker", () => {
  it("renders an empty input with the default placeholder", () => {
    renderTimePicker();
    const input = getInput();
    expect(input).toHaveValue("");
    expect(input).toHaveAttribute("placeholder", "Select time");
    expect(input).toHaveAttribute("name", "time-picker");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("formats defaultValue and modelValue with the default format", () => {
    const { unmount } = renderTimePicker({ defaultValue: at(9, 5, 7) });
    expect(getInput()).toHaveValue("09:05:07");
    unmount();
    renderTimePicker({ modelValue: at(23, 59, 0) });
    expect(getInput()).toHaveValue("23:59:00");
  });

  it("supports custom format, placeholder, class and styling hooks", () => {
    const { container } = render(TimePicker, {
      props: {
        defaultValue: at(14, 30, 0),
        format: "HH:mm",
        placeholder: "Pick",
      },
      attrs: { class: "custom" },
    });
    expect(getInput()).toHaveValue("14:30");
    expect(getInput()).toHaveAttribute("placeholder", "Pick");
    const root = container.firstElementChild!;
    expect(root).toHaveClass("timePicker", "custom");
    expect(root).toHaveAttribute("data-minerva", "time-picker");
    expect(root).toHaveAttribute("data-part", "root");
    expect(root).toHaveAttribute("data-state", "closed");
    expect(root).toHaveAttribute("data-size", "medium");
  });

  it("applies the size to the input", () => {
    const { container } = renderTimePicker({ size: "small" });
    expect(container.querySelector('[data-component="input"]')).toHaveClass(
      "small",
    );
  });

  it("opens the panel when the input is clicked and toggles closed on a second click", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const { container } = renderTimePicker({
      defaultValue: at(10, 30, 45),
      onOpenChange,
    });
    const columns = await openPanel(user);
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    expect(container.firstElementChild).toHaveAttribute("data-state", "open");
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveClass("popup");
    expect(dialog).toHaveAttribute("data-part", "content");
    expect(dialog).toHaveAttribute("data-state", "open");
    expect(dialog).toHaveAttribute("data-placement");
    expect(dialog).toHaveAttribute("aria-label", "Time");
    expect(columns).toHaveLength(3);
    expect(columns[0]).toHaveAttribute("data-part", "column");
    expect(within(columns[0]).getAllByText(/^\d\d$/)).toHaveLength(24);
    expect(within(columns[1]).getAllByText(/^\d\d$/)).toHaveLength(60);
    expect(within(columns[2]).getAllByText(/^\d\d$/)).toHaveLength(60);
    expect(within(columns[0]).getByText("10")).toHaveClass("selected");
    expect(within(columns[1]).getByText("30")).toHaveClass("selected");
    expect(within(columns[2]).getByText("45")).toHaveClass("selected");

    await user.click(getInput());
    await settle();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it("emits change / update:modelValue and updates the input when units are clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onUpdate = vi.fn();
    renderTimePicker({
      defaultValue: at(10, 30, 45),
      onChange,
      "onUpdate:modelValue": onUpdate,
    });
    const columns = await openPanel(user);

    await user.click(within(columns[0]).getByText("08"));
    expect(lastDate(onChange)?.getHours()).toBe(8);
    expect(lastDate(onUpdate)?.getHours()).toBe(8);
    expect(getInput()).toHaveValue("08:30:45");

    await user.click(within(getColumns()[1]).getByText("15"));
    expect(lastDate(onChange)?.getMinutes()).toBe(15);
    expect(getInput()).toHaveValue("08:15:45");

    await user.click(within(getColumns()[2]).getByText("05"));
    const date = lastDate(onChange);
    expect([date?.getHours(), date?.getMinutes(), date?.getSeconds()]).toEqual([
      8, 15, 5,
    ]);
    expect(getInput()).toHaveValue("08:15:05");
    expect(within(getColumns()[2]).getByText("05")).toHaveClass("selected");
    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it("starts from today when picking without a value and highlights nothing before", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderTimePicker({ onChange });
    const [hours] = await openPanel(user);
    expect(hours.querySelector(".selected")).toBeNull();
    await user.click(within(hours).getByText("07"));
    const date = lastDate(onChange)!;
    expect(date.getHours()).toBe(7);
    expect(date.getMinutes()).toBe(0);
    expect(date.toDateString()).toBe(new Date().toDateString());
  });

  it("hides the seconds column when showSecond is false", async () => {
    const user = userEvent.setup();
    renderTimePicker({ showSecond: false, format: "HH:mm" });
    expect(await openPanel(user)).toHaveLength(2);
  });

  it("showSecond=false removes the seconds from the format too", async () => {
    const user = userEvent.setup();
    renderTimePicker({
      showSecond: false,
      format: "HH:mm:ss",
      defaultValue: at(9, 5, 7),
    });
    expect(getInput()).toHaveValue("09:05");
    expect(await openPanel(user)).toHaveLength(2);
  });

  it("a format without seconds hides the seconds column", async () => {
    const user = userEvent.setup();
    renderTimePicker({ format: "HH:mm" });
    expect(await openPanel(user)).toHaveLength(2);
  });

  it("respects hour, minute and second steps", async () => {
    const user = userEvent.setup();
    renderTimePicker({ hourStep: 2, minuteStep: 15, secondStep: 30 });
    const [hours, minutes, seconds] = await openPanel(user);
    const texts = (el: HTMLElement) =>
      within(el)
        .getAllByText(/^\d\d$/)
        .map((e) => e.textContent);
    expect(texts(hours)).toEqual(
      Array.from({ length: 12 }, (_, i) => String(i * 2).padStart(2, "0")),
    );
    expect(texts(minutes)).toEqual(["00", "15", "30", "45"]);
    expect(texts(seconds)).toEqual(["00", "30"]);
  });

  it("disables units outside minTime/maxTime and ignores clicks on them", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderTimePicker({
      defaultValue: at(9, 30, 0),
      minTime: at(9, 15, 0),
      maxTime: at(17, 0, 0),
      onChange,
    });
    const [hours, minutes] = await openPanel(user);
    expect(within(hours).getByText("08")).toHaveClass("disabled");
    expect(within(hours).getByText("08")).toHaveAttribute("data-disabled", "");
    expect(within(hours).getByText("08")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(within(hours).getByText("09")).not.toHaveAttribute("data-disabled");
    expect(within(hours).getByText("17")).not.toHaveClass("disabled");
    expect(within(hours).getByText("18")).toHaveClass("disabled");
    expect(within(minutes).getByText("14")).toHaveClass("disabled");
    expect(within(minutes).getByText("15")).not.toHaveClass("disabled");

    await user.click(within(hours).getByText("08"));
    await user.click(within(minutes).getByText("14"));
    expect(onChange).not.toHaveBeenCalled();
    expect(getInput()).toHaveValue("09:30:00");
  });

  it("disables seconds at the min / max minute", async () => {
    const user = userEvent.setup();
    const { unmount } = renderTimePicker({
      defaultValue: at(9, 15, 30),
      minTime: at(9, 15, 20),
    });
    let [, , seconds] = await openPanel(user);
    expect(within(seconds).getByText("19")).toHaveClass("disabled");
    expect(within(seconds).getByText("20")).not.toHaveClass("disabled");
    unmount();
    renderTimePicker({ defaultValue: at(17, 0, 0), maxTime: at(17, 0, 10) });
    [, , seconds] = await openPanel(user);
    expect(within(seconds).getByText("11")).toHaveClass("disabled");
    expect(within(seconds).getByText("10")).not.toHaveClass("disabled");
  });

  it("moves the tab stop to the first enabled unit when the selected one is disabled", async () => {
    const user = userEvent.setup();
    renderTimePicker({ defaultValue: at(8, 0, 0), minTime: at(9, 0, 0) });
    const [hours] = await openPanel(user);
    expect(within(hours).getByText("09")).toHaveAttribute("tabindex", "0");
    expect(within(hours).getByText("08")).toHaveAttribute("tabindex", "-1");
  });

  it("supports 12-hour mode with AM/PM switching", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderTimePicker({
      defaultValue: at(10, 30, 45),
      use12Hours: true,
      format: "hh:mm:ss a",
      onChange,
    });
    expect(getInput()).toHaveValue("10:30:45 AM");
    const columns = await openPanel(user);
    expect(columns).toHaveLength(4);
    expect(columns[3]).toHaveAttribute("aria-label", "AM/PM");
    expect(
      within(columns[0])
        .getAllByText(/^\d\d$/)
        .map((el) => el.textContent),
    ).toEqual(
      Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")),
    );
    expect(within(columns[3]).getByText("AM")).toHaveClass("selected");

    await user.click(within(columns[3]).getByText("PM"));
    expect(lastDate(onChange)?.getHours()).toBe(22);
    expect(getInput()).toHaveValue("10:30:45 PM");
    expect(within(getColumns()[3]).getByText("PM")).toHaveClass("selected");
    expect(within(getColumns()[0]).getByText("10")).toHaveClass("selected");

    await user.click(within(getColumns()[0]).getByText("03"));
    expect(lastDate(onChange)?.getHours()).toBe(15);
    expect(getInput()).toHaveValue("03:30:45 PM");

    await user.click(within(getColumns()[0]).getByText("12"));
    expect(lastDate(onChange)?.getHours()).toBe(12);
    expect(getInput()).toHaveValue("12:30:45 PM");

    await user.click(within(getColumns()[3]).getByText("AM"));
    expect(lastDate(onChange)?.getHours()).toBe(0);
    expect(getInput()).toHaveValue("12:30:45 AM");
  });

  it("disables 12-hour units outside the range", async () => {
    const user = userEvent.setup();
    renderTimePicker({
      defaultValue: at(14, 0, 0),
      use12Hours: true,
      format: "hh:mm a",
      minTime: at(13, 0, 0),
      maxTime: at(18, 0, 0),
    });
    const [hours] = await openPanel(user);
    expect(within(hours).getByText("12")).toHaveClass("disabled");
    expect(within(hours).getByText("01")).not.toHaveClass("disabled");
    expect(within(hours).getByText("07")).toHaveClass("disabled");
  });

  it("parses typed input and emits change for valid times", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderTimePicker({ onChange });
    await user.type(getInput(), "12:34:56");
    expect(getInput()).toHaveValue("12:34:56");
    const date = lastDate(onChange);
    expect([date?.getHours(), date?.getMinutes(), date?.getSeconds()]).toEqual([
      12, 34, 56,
    ]);
  });

  it("does not emit change for invalid input and clears it on blur", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderTimePicker({ onChange });
    await user.type(getInput(), "ab");
    expect(onChange).not.toHaveBeenCalled();
    expect(getInput()).toHaveValue("ab");
    await user.tab();
    expect(getInput()).toHaveValue("");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("clears the value when the text is erased and blurred", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderTimePicker({ defaultValue: at(10, 0, 0), onChange });
    await user.clear(getInput());
    await user.tab();
    expect(onChange).toHaveBeenLastCalledWith(undefined);
    expect(getInput()).toHaveValue("");
    // blur without edits does nothing
    getInput().focus();
    await user.tab();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("erasing an empty field emits nothing", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderTimePicker({ onChange });
    await user.type(getInput(), " ");
    await user.tab();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("normalizes the input to the format on blur", async () => {
    const user = userEvent.setup();
    renderTimePicker();
    await user.type(getInput(), "1:2:3");
    await user.tab();
    expect(getInput()).toHaveValue("01:02:03");
  });

  it("clears the value via the suffix button", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onUpdate = vi.fn();
    const { container } = renderTimePicker({
      defaultValue: at(10, 0, 0),
      onChange,
      "onUpdate:modelValue": onUpdate,
    });
    const clear = container.querySelector(".clearButton")!;
    expect(clear).toHaveAttribute("data-minerva", "icon-button");
    await user.click(screen.getByRole("button", { name: "Clear time" }));
    expect(onChange).toHaveBeenCalledWith(undefined);
    expect(onUpdate).toHaveBeenCalledWith(null);
    expect(getInput()).toHaveValue("");
    expect(getInput()).toHaveFocus();
    expect(container.querySelector(".clearButton")).not.toBeInTheDocument();
    expect(container.querySelector(".clockIcon")).toBeInTheDocument();
  });

  it("does not render a clear button when clearable is false", () => {
    const { container } = renderTimePicker({
      defaultValue: at(10, 0, 0),
      clearable: false,
    });
    expect(container.querySelector(".clearButton")).not.toBeInTheDocument();
    expect(container.querySelector(".clockIcon")).toHaveAttribute(
      "data-part",
      "icon",
    );
  });

  it("disables the input and never opens the panel when disabled", async () => {
    const user = userEvent.setup();
    const { container } = renderTimePicker({
      defaultValue: at(10, 0, 0),
      disabled: true,
      invalid: true,
    });
    expect(getInput()).toBeDisabled();
    expect(getInput()).toHaveAttribute("aria-invalid", "true");
    expect(container.firstElementChild).toHaveAttribute("data-disabled", "");
    expect(container.firstElementChild).toHaveAttribute("data-invalid", "");
    expect(container.querySelector(".clearButton")).not.toBeInTheDocument();
    await user.click(getInput());
    await settle();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("does not open from the keyboard while read-only", async () => {
    const user = userEvent.setup();
    const { container } = renderTimePicker({ readOnly: true });
    expect(container.firstElementChild).toHaveAttribute("data-readonly", "");
    getInput().focus();
    await user.keyboard("{ArrowDown}");
    await settle();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("ignores clicks on the root outside of the input", async () => {
    const user = userEvent.setup();
    const { container } = renderTimePicker();
    await user.click(container.querySelector(".clockIcon")!);
    await settle();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("uses the visible label as the accessible name", () => {
    renderTimePicker({ label: "Start" });
    expect(screen.getByRole("textbox", { name: "Start" })).toBe(getInput());
  });

  it("exposes the input, focus and blur", async () => {
    const wrapper = mount(TimePicker, { attachTo: document.body });
    await settle();
    const input = wrapper.find("input").element;
    expect(wrapper.vm.input).toBe(input);
    wrapper.vm.focus();
    expect(document.activeElement).toBe(input);
    wrapper.vm.blur();
    expect(document.activeElement).not.toBe(input);
  });

  describe("regressions", () => {
    it("follows the controlled value after mount", async () => {
      const wrapper = mount(TimePicker, {
        attachTo: document.body,
        props: { modelValue: at(9, 0, 0) },
      });
      const input = () => wrapper.find("input").element;
      expect(input().value).toBe("09:00:00");
      await wrapper.setProps({ modelValue: at(18, 45, 30) });
      expect(input().value).toBe("18:45:30");
      await wrapper.setProps({ modelValue: null });
      expect(input().value).toBe("");
    });

    it("stays on the controlled value when the parent ignores the update", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      renderTimePicker({ modelValue: at(10, 0, 0), onChange });
      const [hours] = await openPanel(user);
      await user.click(within(hours).getByText("07"));
      expect(lastDate(onChange)?.getHours()).toBe(7);
      expect(getInput()).toHaveValue("10:00:00");
    });

    it("works with v-model driven by state", async () => {
      const user = userEvent.setup();
      const time = ref<Date | null>(at(8, 0, 0));
      render(
        defineComponent(() => () => [
          h(TimePicker, {
            modelValue: time.value,
            "onUpdate:modelValue": (d: Date | null) => (time.value = d),
          }),
          h(
            "button",
            { type: "button", onClick: () => (time.value = at(12, 0, 0)) },
            "Noon",
          ),
        ]),
      );
      await user.click(screen.getByRole("button", { name: "Noon" }));
      expect(getInput()).toHaveValue("12:00:00");
      await user.click(screen.getByRole("button", { name: "Clear time" }));
      expect(time.value).toBeNull();
      expect(getInput()).toHaveValue("");
      await user.type(getInput(), "07:08:09");
      expect(time.value?.getMinutes()).toBe(8);
    });

    it("labels the clear button and the input", () => {
      renderTimePicker({ defaultValue: at(10, 0, 0) });
      expect(
        screen.getByRole("button", { name: "Clear time" }),
      ).toBeInTheDocument();
      expect(screen.getByRole("textbox", { name: "Time" })).toBe(getInput());
      expect(screen.getAllByRole("button")).toHaveLength(1);
    });

    it("is operable with the keyboard and returns focus on Escape", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      renderTimePicker({ defaultValue: at(10, 30, 0), onChange });
      getInput().focus();
      await user.keyboard("{ArrowDown}");
      await settle();
      const hours = screen.getByRole("listbox", { name: "Hours" });
      expect(within(hours).getByRole("option", { name: "10" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
      within(hours).getByRole("option", { name: "10" }).focus();
      await user.keyboard("{ArrowDown}{Enter}");
      expect(lastDate(onChange)?.getHours()).toBe(11);
      await user.keyboard("{ArrowRight}");
      expect(
        within(screen.getByRole("listbox", { name: "Minutes" })).getByRole(
          "option",
          { name: "30" },
        ),
      ).toHaveFocus();
      await user.keyboard("{Escape}");
      await settle();
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(getInput()).toHaveFocus();
    });

    it("picks a unit with Space and ignores Enter/Space on disabled units", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      renderTimePicker({
        defaultValue: at(10, 30, 0),
        minTime: at(9, 0, 0),
        onChange,
      });
      getInput().focus();
      await user.keyboard("{ArrowDown}");
      await settle();
      const hours = screen.getByRole("listbox", { name: "Hours" });
      within(hours).getByRole("option", { name: "12" }).focus();
      await user.keyboard(" ");
      expect(lastDate(onChange)?.getHours()).toBe(12);
      const disabled = within(hours).getByRole("option", { name: "08" });
      expect(disabled).toHaveAttribute("aria-disabled", "true");
      onChange.mockClear();
      disabled.focus();
      await user.keyboard("{Enter}");
      await user.keyboard(" ");
      await user.keyboard("a");
      expect(onChange).not.toHaveBeenCalled();
    });

    it("closes when clicking outside", async () => {
      const user = userEvent.setup();
      render(defineComponent(() => () => [h(TimePicker), h("p", "Outside")]));
      await openPanel(user);
      await user.click(screen.getByText("Outside"));
      await settle();
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("does not commit a half-typed time", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      renderTimePicker({ format: "HH:mm", onChange });
      await user.type(getInput(), "12:3");
      expect(onChange).not.toHaveBeenCalled();
      await user.type(getInput(), "0", { skipClick: true });
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(lastDate(onChange)?.getMinutes()).toBe(30);
    });
  });
});

describe("TimePickerPanel", () => {
  it("renders with its defaults and an epoch reference time", () => {
    const wrapper = mount(TimePickerPanel, {
      attachTo: document.body,
      props: { visible: false },
    });
    const columns = wrapper.findAll('[role="listbox"]');
    expect(columns).toHaveLength(2);
    expect(columns[0].find('[aria-selected="true"]').text()).toBe(
      String(new Date(0).getHours()).padStart(2, "0"),
    );
  });

  it("scrolls the selected units into view and focuses when it becomes visible", async () => {
    const scroll = vi.fn();
    const original = HTMLElement.prototype.scrollIntoView;
    HTMLElement.prototype.scrollIntoView = scroll;
    try {
      const wrapper = mount(TimePickerPanel, {
        attachTo: document.body,
        props: { visible: false, value: at(10, 20, 0), showSecond: true },
      });
      expect(scroll).not.toHaveBeenCalled();
      await wrapper.setProps({ visible: true });
      expect(scroll).toHaveBeenCalledTimes(3);
      await wrapper.setProps({ focusOnOpen: true });
      expect(document.activeElement?.textContent?.trim()).toBe("10");
    } finally {
      HTMLElement.prototype.scrollIntoView = original;
    }
  });

  it("moves with ArrowUp, ArrowLeft and clamps at the edges", async () => {
    const user = userEvent.setup();
    const wrapper = mount(TimePickerPanel, {
      attachTo: document.body,
      props: { visible: true, value: at(0, 1, 0), focusOnOpen: true },
    });
    await settle();
    const option = (text: string, column: number) =>
      wrapper
        .findAll('[role="listbox"]')
        [column].findAll('[role="option"]')
        .find((o) => o.text() === text)!.element;
    expect(option("00", 0)).toBe(document.activeElement);
    await user.keyboard("{ArrowUp}");
    expect(option("00", 0)).toBe(document.activeElement);
    await user.keyboard("{ArrowLeft}");
    expect(option("00", 0)).toBe(document.activeElement);
    await user.keyboard("{ArrowRight}{ArrowRight}");
    expect(option("01", 1)).toBe(document.activeElement);
    await user.keyboard("{ArrowUp}");
    expect(option("00", 1)).toBe(document.activeElement);
    await user.keyboard("{ArrowLeft}");
    expect(option("00", 0)).toBe(document.activeElement);
    await user.keyboard("{End}{ArrowDown}");
    expect(option("23", 0)).toBe(document.activeElement);
  });

  it("swaps ArrowLeft / ArrowRight in right-to-left layouts", async () => {
    const user = userEvent.setup();
    const host = document.createElement("div");
    host.dir = "rtl";
    document.body.appendChild(host);
    const wrapper = mount(TimePickerPanel, {
      attachTo: host,
      props: { visible: true, value: at(3, 4, 0), focusOnOpen: true },
    });
    await settle();
    await user.keyboard("{ArrowLeft}");
    expect(document.activeElement?.textContent?.trim()).toBe("04");
    await user.keyboard("{ArrowRight}");
    expect(document.activeElement?.textContent?.trim()).toBe("03");
    wrapper.unmount();
  });
});
