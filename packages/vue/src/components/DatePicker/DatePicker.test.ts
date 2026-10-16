import { expect, it } from "vitest";
import * as components from "../../index";
it("exports a native Vue DatePicker", () => {
  expect(components).toHaveProperty("DatePicker");
});

import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { flushPromises } from "@vue/test-utils";
import { describe, vi } from "vitest";
import { defineComponent, h, ref } from "vue";
import { DatePicker } from ".";
import { FormControl, FormLabel, FormHelperText } from "../FormControl";
const input = () => screen.getByRole<HTMLInputElement>("textbox");
const settle = async () => {
  await flushPromises();
  await new Promise((r) => setTimeout(r, 0));
};

describe("DatePicker", () => {
  it("selects a date from the bounded calendar and closes with focus restored", async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const open = vi.fn();
    render(DatePicker, {
      props: {
        defaultValue: "2026-10-15",
        minDate: "2026-10-10",
        maxDate: "2026-10-20",
        onChange: change,
        onOpenChange: open,
      },
    });
    await user.click(input());
    await settle();
    expect(screen.getAllByRole("gridcell")).toHaveLength(42);
    const disabled = screen.getByRole("gridcell", { name: "2026-10-09" });
    expect(disabled).toHaveAttribute("aria-disabled", "true");
    await user.click(disabled);
    expect(change).not.toHaveBeenCalled();
    await user.click(screen.getByRole("gridcell", { name: "2026-10-18" }));
    await settle();
    expect(change).toHaveBeenLastCalledWith("2026-10-18");
    expect(input()).toHaveValue("2026-10-18");
    expect(open.mock.calls).toEqual([[true], [false]]);
    expect(input()).toHaveFocus();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  it("normalizes typed dates on blur and rejects invalid and out-of-range dates", async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    render(DatePicker, { props: { minDate: "2026-01-01", onChange: change } });
    await user.type(input(), "2026-2-3");
    await user.tab();
    expect(input()).toHaveValue("2026-02-03");
    await user.clear(input());
    await user.type(input(), "2026-02-30");
    await user.tab();
    expect(input()).toHaveValue("");
    expect(change).not.toHaveBeenCalledWith("2026-02-30");
    await user.type(input(), "2025-12-31");
    await user.tab();
    expect(input()).toHaveValue("");
  });
  it("keeps null controlled and emits strings when selecting and clearing with v-model", async () => {
    const user = userEvent.setup();
    const value = ref<string | null>(null);
    const change = vi.fn();
    render(
      defineComponent(
        () => () =>
          h(DatePicker, {
            modelValue: value.value,
            defaultValue: "2026-10-15",
            onChange: change,
            "onUpdate:modelValue": (next: string) => {
              value.value = next;
            },
          }),
      ),
    );
    expect(input()).toHaveValue("");
    await user.type(input(), "2026-10-15");
    await user.tab();
    expect(value.value).toBe("2026-10-15");
    await user.click(screen.getAllByRole("button", { name: "Clear date" })[0]);
    expect(value.value).toBe("");
    expect(change).toHaveBeenLastCalledWith("");
  });
  it("does not overwrite an ignored controlled null selection", async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    render(DatePicker, { props: { modelValue: null, onChange: change } });
    await user.click(input());
    await settle();
    await user.click(screen.getAllByRole("gridcell")[15]);
    expect(change).toHaveBeenCalled();
    expect(input()).toHaveValue("");
  });
  it("supports keyboard month navigation, selection, and Escape", async () => {
    const user = userEvent.setup();
    render(DatePicker, { props: { defaultValue: "2026-01-31" } });
    input().focus();
    await user.keyboard("{ArrowDown}");
    await settle();
    expect(screen.getByRole("gridcell", { name: "2026-01-31" })).toHaveFocus();
    await user.keyboard("{PageDown}");
    await settle();
    expect(screen.getByRole("gridcell", { name: "2026-02-28" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(input()).toHaveValue("2026-02-28");
    await user.keyboard("{ArrowDown}");
    await settle();
    await user.keyboard("{Escape}");
    await settle();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(input()).toHaveFocus();
  });
  it("inherits form naming and read-only state", async () => {
    const user = userEvent.setup();
    render(
      defineComponent(
        () => () =>
          h(
            FormControl,
            { id: "birthday", readOnly: true, required: true },
            () => [
              h(FormLabel, {}, () => "Birthday"),
              h(DatePicker),
              h(FormHelperText, {}, () => "Help"),
            ],
          ),
      ),
    );
    await settle();
    expect(input()).toHaveAccessibleName("Birthday");
    expect(input()).toHaveAttribute("id", "birthday");
    expect(input()).toHaveAttribute("readonly");
    expect(input()).toBeRequired();
    expect(input()).toHaveAccessibleDescription("Help");
    input().focus();
    await user.keyboard("{ArrowDown}");
    await settle();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
