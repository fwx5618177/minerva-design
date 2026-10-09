import { render, screen, fireEvent } from "@testing-library/react-native";
import { expect, it, vi } from "vitest";
import { Menu } from "./index";
import { Button } from "../Button";
import { DescriptionList } from "../Display";

it("renders description data rows including zero and updates their values", async () => {
  const { rerender } = await render(
    <DescriptionList items={[{ key: "count", label: "Count", value: 0 }]} />,
  );
  expect(screen.getByText("Count")).toBeTruthy();
  expect(screen.getByText("0")).toBeTruthy();
  await rerender(
    <DescriptionList items={[{ key: "count", label: "Count", value: 3 }]} />,
  );
  expect(screen.getByText("3")).toBeTruthy();
});
it("implements group headings, action, checkbox and radio menu descriptors", async () => {
  const selected = vi.fn(),
    checked = vi.fn(),
    choice = vi.fn();
  await render(
    <Menu
      defaultOpen
      onSelect={selected}
      items={[
        {
          type: "group",
          key: "display",
          label: "Display",
          items: [
            {
              type: "checkbox",
              key: "grid",
              label: "Show grid",
              onCheckedChange: checked,
            },
            { type: "separator", key: "sep" },
            {
              type: "radio-group",
              key: "mode",
              label: "Density",
              items: [
                { value: "compact", label: "Compact" },
                { value: "large", label: "Large" },
              ],
              defaultValue: "compact",
              onValueChange: choice,
            },
            { key: "save", label: "Save" },
          ],
        },
      ]}
    >
      <Button>Actions</Button>
    </Menu>,
  );
  expect(screen.getByRole("header", { name: "Display" })).toBeTruthy();
  expect(screen.getByRole("header", { name: "Density" })).toBeTruthy();
  await fireEvent.press(screen.getByRole("checkbox", { name: "Show grid" }));
  expect(checked).toHaveBeenCalledWith(true);
  expect(screen.getByRole("checkbox", { name: "Show grid" })).toBeChecked();
  await fireEvent.press(screen.getByRole("radio", { name: "Large" }));
  expect(choice).toHaveBeenCalledWith("large");
  expect(screen.getByRole("radio", { name: "Large" })).toBeChecked();
  await fireEvent.press(screen.getByRole("button", { name: "Save" }));
  expect(selected).toHaveBeenCalledWith({ key: "save", label: "Save" });
  await fireEvent.press(screen.getByRole("button", { name: "Actions" }));
  expect(screen.getByRole("checkbox", { name: "Show grid" })).toBeChecked();
  expect(screen.getByRole("radio", { name: "Large" })).toBeChecked();
});
