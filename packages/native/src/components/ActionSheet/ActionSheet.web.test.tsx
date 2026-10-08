import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ActionSheet } from "./ActionSheet";

describe("ActionSheet (react-native-web)", () => {
  it("renders a DOM dialog with button rows and styling hooks", async () => {
    const onSelect = vi.fn();
    const onOpenChange = vi.fn();
    render(
      <ActionSheet
        defaultOpen
        title="Options"
        actions={[{ name: "Copy" }, { name: "Archive", disabled: true }]}
        onSelect={onSelect}
        onOpenChange={onOpenChange}
      />,
    );
    const dialog = await screen.findByRole("dialog", { name: "Options" });
    expect(dialog).toHaveAttribute("data-minerva", "action-sheet");
    expect(dialog).toHaveAttribute("data-part", "content");
    const archive = screen.getByRole("button", { name: "Archive" });
    expect(archive).toHaveAttribute("aria-disabled", "true");
    expect(archive).toHaveAttribute("data-part", "item");
    fireEvent.click(archive);
    expect(onSelect).not.toHaveBeenCalled();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    });
    expect(onSelect).toHaveBeenCalledWith({ name: "Copy" }, 0);
    expect(onOpenChange).toHaveBeenCalledWith(false, "action");
  });
});
