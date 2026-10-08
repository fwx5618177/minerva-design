import {
  act,
  fireEvent,
  render,
  screen,
  userEvent,
} from "@testing-library/react-native";
import { Text } from "react-native";
import { describe, expect, it, vi } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { Button } from "../Button";
import { Dialog } from "./Dialog";
import { useState } from "react";
import { getByRoleDeep, queryAllByRoleDeep } from "../../../test/queries";

const wait = (ms: number) =>
  act(() => new Promise<void>((r) => setTimeout(r, ms)));

describe("Dialog", () => {
  it("renders an open dialog named by its title", async () => {
    await render(
      <Dialog
        defaultOpen
        title="Delete file?"
        description="This cannot be undone"
      >
        <Text>Body</Text>
      </Dialog>,
    );
    expect(getByRoleDeep("dialog", { name: "Delete file?" })).toBeTruthy();
    expect(screen.getByText("This cannot be undone")).toBeTruthy();
    expect(screen.getByText("Body")).toBeTruthy();
  });

  it("closes from the close button with its reason", async () => {
    const onOpenChange = vi.fn();
    await render(<Dialog defaultOpen title="T" onOpenChange={onOpenChange} />);
    await fireEvent.press(screen.getByRole("button", { name: "Close" }));
    expect(onOpenChange).toHaveBeenCalledWith(false, "close-button");
    await wait(400);
    expect(queryAllByRoleDeep("dialog")).toEqual([]);
  });

  it("controlled: requests only, the prop decides", async () => {
    const onOpenChange = vi.fn();
    await render(<Dialog open title="T" onOpenChange={onOpenChange} />);
    await fireEvent.press(screen.getByRole("button", { name: "Close" }));
    await wait(400);
    expect(onOpenChange).toHaveBeenCalledWith(false, "close-button");
    expect(getByRoleDeep("dialog")).toBeTruthy();
  });

  it("confirm / cancel buttons", async () => {
    const onConfirm = vi.fn();
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    await render(
      <MinervaProvider locale={{ language: "fr" }}>
        <Dialog
          defaultOpen
          title="T"
          onConfirm={onConfirm}
          onCancel={() => {}}
          onOpenChange={onOpenChange}
        />
      </MinervaProvider>,
    );
    expect(screen.getByRole("button", { name: "Annuler" })).toBeTruthy();
    await user.press(screen.getByRole("button", { name: "Confirmer" }));
    expect(onConfirm).toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenCalledWith(false, "confirm");
  });

  it("Android back closes it", async () => {
    const onOpenChange = vi.fn();
    await render(
      <Dialog defaultOpen title="T" onOpenChange={onOpenChange} testID="dlg" />,
    );
    await fireEvent(screen.getByTestId("dlg"), "requestClose");
    expect(onOpenChange).toHaveBeenCalledWith(false, "back");
  });

  it("opens from a trigger", async () => {
    function App() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onPress={() => setOpen(true)}>Open</Button>
          <Dialog open={open} onOpenChange={setOpen} title="Hello" />
        </>
      );
    }
    await render(<App />);
    expect(queryAllByRoleDeep("dialog")).toEqual([]);
    await fireEvent.press(screen.getByRole("button", { name: "Open" }));
    expect(getByRoleDeep("dialog", { name: "Hello" })).toBeTruthy();
  });
});
