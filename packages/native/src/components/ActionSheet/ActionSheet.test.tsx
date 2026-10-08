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
import { Button } from "../Button";
import { ActionSheet, type ActionSheetAction } from "./ActionSheet";

const wait = (ms: number) =>
  act(() => new Promise<void>((r) => setTimeout(r, ms)));

const actions: ActionSheetAction[] = [
  { name: "Copy" },
  { name: "Share", subname: "To contacts" },
  { name: "Delete", color: "danger" },
  { name: "Archive", disabled: true },
  { name: "Sync", loading: true },
];

describe("ActionSheet", () => {
  it("renders a sheet named by its title with button rows", async () => {
    await render(
      <ActionSheet
        defaultOpen
        title="Options"
        description="Pick one"
        actions={actions}
      />,
    );
    expect(getByRoleDeep("dialog", { name: "Options" })).toBeTruthy();
    expect(screen.getByText("Pick one")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Copy" })).toBeEnabled();
    expect(
      screen.getByRole("button", { name: "Share, To contacts" }),
    ).toBeTruthy();
    expect(screen.getByRole("button", { name: "Archive" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Sync" })).toBeBusy();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeTruthy();
  });

  it("rows reach the touch target height", async () => {
    await render(<ActionSheet defaultOpen actions={actions} />);
    expect(screen.getByRole("button", { name: "Copy" })).toHaveStyle({
      minHeight: 52,
    });
  });

  it("select: onSelect(action, index) then closes with 'action'", async () => {
    const onSelect = vi.fn();
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    await render(
      <ActionSheet
        defaultOpen
        actions={actions}
        onSelect={onSelect}
        onOpenChange={onOpenChange}
      />,
    );
    await user.press(screen.getByRole("button", { name: "Delete" }));
    expect(onSelect).toHaveBeenCalledWith(actions[2], 2);
    expect(onOpenChange).toHaveBeenCalledWith(false, "action");
    await wait(400);
    expect(queryAllByRoleDeep("dialog")).toEqual([]);
  });

  it("closeOnSelect=false keeps it open; disabled rows ignore presses", async () => {
    const onSelect = vi.fn();
    const onOpenChange = vi.fn();
    await render(
      <ActionSheet
        defaultOpen
        actions={actions}
        closeOnSelect={false}
        onSelect={onSelect}
        onOpenChange={onOpenChange}
      />,
    );
    await fireEvent.press(screen.getByRole("button", { name: "Archive" }));
    expect(onSelect).not.toHaveBeenCalled();
    await fireEvent.press(screen.getByRole("button", { name: "Copy" }));
    expect(onSelect).toHaveBeenCalledWith(actions[0], 0);
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("cancel button and mask close with their reasons", async () => {
    const onCancel = vi.fn();
    const onOpenChange = vi.fn();
    await render(
      <ActionSheet
        open
        actions={actions}
        onCancel={onCancel}
        onOpenChange={onOpenChange}
      />,
    );
    await fireEvent.press(screen.getByRole("button", { name: "Cancel" }));
    expect(onCancel).toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenCalledWith(false, "cancel");
    await fireEvent.press(queryPart("overlay", "action-sheet")!);
    expect(onOpenChange).toHaveBeenLastCalledWith(false, "mask");
    // controlled: still open
    await wait(300);
    expect(getByRoleDeep("dialog")).toBeTruthy();
  });

  it("custom / hidden cancel text", async () => {
    const { rerender } = await render(
      <ActionSheet defaultOpen actions={actions} cancelText="Dismiss" />,
    );
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeTruthy();
    await rerender(
      <ActionSheet defaultOpen actions={actions} cancelText={null} />,
    );
    expect(screen.queryByRole("button", { name: "Cancel" })).toBeNull();
  });

  it("opens from a trigger", async () => {
    function App() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onPress={() => setOpen(true)}>More</Button>
          <ActionSheet open={open} onOpenChange={setOpen} actions={actions} />
        </>
      );
    }
    await render(<App />);
    expect(queryAllByRoleDeep("dialog")).toEqual([]);
    await fireEvent.press(screen.getByRole("button", { name: "More" }));
    expect(getByRoleDeep("dialog")).toBeTruthy();
  });

  it("safe-area bottom padding, localized cancel, token colors", async () => {
    const light = resolveTokens({ design: { preset: "touch" } });
    await render(
      <MinervaProvider
        theme="light"
        locale={{ language: "zh" }}
        insets={{ bottom: 34 }}
      >
        <ActionSheet defaultOpen actions={actions} />
      </MinervaProvider>,
    );
    expect(screen.getByRole("button", { name: "取消" })).toBeTruthy();
    expect(queryPart("content", "action-sheet")).toHaveStyle({
      paddingBottom: 34,
    });
    expect(screen.getByText("Delete")).toHaveStyle({
      color: light.colors["danger-color"],
    });
  });
});
