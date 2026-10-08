import {
  act,
  fireEvent,
  render,
  screen,
  userEvent,
} from "@testing-library/react-native";
import { resolveTokens } from "@minerva/core";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import {
  getByRoleDeep,
  queryAllByRoleDeep,
  queryPart,
} from "../../../test/queries";
import { Select, type SelectOption } from "./Select";

const wait = (ms: number) =>
  act(() => new Promise<void>((r) => setTimeout(r, ms)));

const options: SelectOption[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana", disabled: true },
  { label: "Cherry", value: "cherry", description: "Red and sweet" },
];

describe("Select", () => {
  it("a combobox trigger with placeholder, collapsed", async () => {
    await render(<Select label="Fruit" options={options} />);
    const trigger = screen.getByRole("combobox", { name: "Fruit" });
    expect(trigger).not.toBeExpanded();
    expect(trigger).toHaveAccessibilityValue({ text: "Please select" });
    expect(screen.getByText("Please select")).toBeTruthy();
    expect(screen.getByText("Fruit")).toBeTruthy();
    expect(trigger).toHaveStyle({ minHeight: 44 });
  });

  it("opens a sheet of radio rows; a pick reports the value and closes", async () => {
    const onChange = vi.fn();
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    await render(
      <Select
        label="Fruit"
        options={options}
        onChange={onChange}
        onOpenChange={onOpenChange}
      />,
    );
    await user.press(screen.getByRole("combobox"));
    expect(onOpenChange).toHaveBeenCalledWith(true, undefined);
    expect(screen.getByRole("combobox")).toBeExpanded();
    expect(getByRoleDeep("dialog", { name: "Fruit" })).toBeTruthy();
    expect(getByRoleDeep("radiogroup", { name: "Fruit" })).toBeTruthy();
    expect(screen.getByRole("radio", { name: "Banana" })).toBeDisabled();
    expect(
      screen.getByRole("radio", { name: "Cherry" }).props.accessibilityHint,
    ).toBe("Red and sweet");
    await user.press(screen.getByRole("radio", { name: "Cherry" }));
    expect(onChange).toHaveBeenCalledWith("cherry");
    expect(onOpenChange).toHaveBeenLastCalledWith(false, "action");
    await wait(400);
    expect(queryAllByRoleDeep("dialog")).toEqual([]);
    expect(screen.getByRole("combobox")).toHaveAccessibilityValue({
      text: "Cherry",
    });
  });

  it("selected row is checked; disabled rows ignore presses", async () => {
    const onChange = vi.fn();
    await render(
      <Select
        defaultOpen
        defaultValue="apple"
        options={options}
        onChange={onChange}
      />,
    );
    expect(screen.getByRole("radio", { name: "Apple" })).toBeChecked();
    await fireEvent.press(screen.getByRole("radio", { name: "Banana" }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("controlled value: requests only", async () => {
    const onChange = vi.fn();
    await render(
      <Select
        defaultOpen
        value="apple"
        options={options}
        onChange={onChange}
      />,
    );
    await fireEvent.press(screen.getByRole("radio", { name: "Cherry" }));
    expect(onChange).toHaveBeenCalledWith("cherry");
    await wait(400);
    expect(screen.getByRole("combobox")).toHaveAccessibilityValue({
      text: "Apple",
    });
  });

  it("controlled through state", async () => {
    function App() {
      const [value, setValue] = useState<string | undefined>("apple");
      return <Select value={value} onChange={setValue} options={options} />;
    }
    await render(<App />);
    await fireEvent.press(screen.getByRole("combobox"));
    await fireEvent.press(screen.getByRole("radio", { name: "Cherry" }));
    expect(screen.getByRole("combobox")).toHaveAccessibilityValue({
      text: "Cherry",
    });
  });

  it("multiple: checkboxes, confirm commits the values", async () => {
    const onChange = vi.fn();
    const onOpenChange = vi.fn();
    await render(
      <Select
        multiple
        defaultOpen
        defaultValue={["apple"]}
        options={options}
        onChange={onChange}
        onOpenChange={onOpenChange}
      />,
    );
    expect(screen.getByRole("checkbox", { name: "Apple" })).toBeChecked();
    await fireEvent.press(screen.getByRole("checkbox", { name: "Cherry" }));
    await fireEvent.press(screen.getByRole("checkbox", { name: "Apple" }));
    expect(screen.getByRole("checkbox", { name: "Cherry" })).toBeChecked();
    expect(onChange).not.toHaveBeenCalled();
    await fireEvent.press(screen.getByRole("button", { name: "Confirm" }));
    expect(onChange).toHaveBeenCalledWith(["cherry"]);
    expect(onOpenChange).toHaveBeenCalledWith(false, "confirm");
    await wait(400);
    expect(screen.getByRole("combobox")).toHaveAccessibilityValue({
      text: "Cherry",
    });
  });

  it("multiple: cancel drops the draft", async () => {
    const onChange = vi.fn();
    await render(
      <Select
        multiple
        options={options}
        defaultValue={["apple"]}
        onChange={onChange}
      />,
    );
    await fireEvent.press(screen.getByRole("combobox"));
    await fireEvent.press(screen.getByRole("checkbox", { name: "Cherry" }));
    await fireEvent.press(screen.getByRole("button", { name: "Cancel" }));
    await wait(400);
    expect(onChange).not.toHaveBeenCalled();
    await fireEvent.press(screen.getByRole("combobox"));
    expect(screen.getByRole("checkbox", { name: "Cherry" })).not.toBeChecked();
  });

  it("searchable filters by label", async () => {
    const user = userEvent.setup();
    await render(<Select defaultOpen searchable options={options} />);
    await user.type(screen.getByLabelText("Search"), "ch");
    expect(screen.queryByRole("radio", { name: "Apple" })).toBeNull();
    expect(screen.getByRole("radio", { name: "Cherry" })).toBeTruthy();
    await user.clear(screen.getByLabelText("Search"));
    await user.type(screen.getByLabelText("Search"), "zzz");
    expect(screen.getByText("No Data")).toBeTruthy();
  });

  it("disabled ignores presses", async () => {
    const onOpenChange = vi.fn();
    await render(
      <Select disabled options={options} onOpenChange={onOpenChange} />,
    );
    const trigger = screen.getByRole("combobox");
    expect(trigger).toBeDisabled();
    await fireEvent.press(trigger);
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it.each(["small", "medium", "large"] as const)("size %s", async (size) => {
    await render(<Select size={size} options={options} />);
    expect(screen.getByRole("combobox")).toHaveStyle({
      minHeight: { small: 36, medium: 44, large: 52 }[size],
    });
  });

  it("invalid border token; localized placeholder; dark mode", async () => {
    const dark = resolveTokens({ mode: "dark", design: { preset: "touch" } });
    await render(
      <MinervaProvider theme="dark" locale={{ language: "zh" }}>
        <Select invalid options={options} accessibilityLabel="水果" />
      </MinervaProvider>,
    );
    const trigger = screen.getByRole("combobox", { name: "水果" });
    expect(trigger).toHaveStyle({ borderColor: dark.colors["danger-color"] });
    expect(screen.getByText("请选择")).toBeTruthy();
    expect(queryPart("trigger", "select")?.props.dataSet.invalid).toBe("");
  });
});
