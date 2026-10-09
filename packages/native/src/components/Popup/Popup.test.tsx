import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { resolveTokens } from "@minerva/core";
import { useState } from "react";
import { Text } from "react-native";
import { describe, expect, it, vi } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import {
  getByRoleDeep,
  queryAllByRoleDeep,
  queryPart,
} from "../../../test/queries";
import { Button } from "../Button";
import { BottomSheet, Popup } from "./Popup";

const wait = (ms: number) =>
  act(() => new Promise<void>((r) => setTimeout(r, ms)));

describe("Popup", () => {
  it("renders an open bottom sheet named by its title, with a handle", async () => {
    await render(
      <Popup defaultOpen title="Share" description="Pick a target">
        <Text>Body</Text>
      </Popup>,
    );
    expect(getByRoleDeep("dialog", { name: "Share" })).toBeTruthy();
    expect(screen.getByRole("header", { name: "Share" })).toBeTruthy();
    expect(screen.getByText("Pick a target")).toBeTruthy();
    expect(screen.getByText("Body")).toBeTruthy();
    expect(queryPart("handle", "popup")).toBeTruthy();
  });

  it("closes from the close button with its reason (uncontrolled)", async () => {
    const onOpenChange = vi.fn();
    await render(
      <Popup defaultOpen title="T" onOpenChange={onOpenChange}>
        x
      </Popup>,
    );
    const close = screen.getByRole("button", { name: "Close" });
    expect(close.props.hitSlop).toEqual({
      top: 8,
      bottom: 8,
      left: 8,
      right: 8,
    });
    await fireEvent.press(close);
    expect(onOpenChange).toHaveBeenCalledWith(false, "close-button");
    await wait(400);
    expect(queryAllByRoleDeep("dialog")).toEqual([]);
  });

  it("mask press closes unless disabled; controlled stays open", async () => {
    const onOpenChange = vi.fn();
    const { rerender } = await render(
      <Popup open title="T" onOpenChange={onOpenChange} />,
    );
    await fireEvent.press(queryPart("overlay", "popup")!);
    expect(onOpenChange).toHaveBeenCalledWith(false, "mask");
    await wait(300);
    expect(getByRoleDeep("dialog")).toBeTruthy();
    onOpenChange.mockClear();
    await rerender(
      <Popup
        open
        title="T"
        closeOnMaskPress={false}
        onOpenChange={onOpenChange}
      />,
    );
    await fireEvent.press(queryPart("overlay", "popup")!);
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("Android back closes it", async () => {
    const onOpenChange = vi.fn();
    await render(
      <Popup defaultOpen onOpenChange={onOpenChange} testID="pop">
        x
      </Popup>,
    );
    await fireEvent(screen.getByTestId("pop"), "requestClose");
    expect(onOpenChange).toHaveBeenCalledWith(false, "back");
  });

  it("opens from a trigger", async () => {
    function App() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onPress={() => setOpen(true)}>Open</Button>
          <BottomSheet open={open} onOpenChange={setOpen} title="Sheet">
            <Text>Inside</Text>
          </BottomSheet>
        </>
      );
    }
    await render(<App />);
    expect(queryAllByRoleDeep("dialog")).toEqual([]);
    await fireEvent.press(screen.getByRole("button", { name: "Open" }));
    expect(getByRoleDeep("dialog", { name: "Sheet" })).toBeTruthy();
    await fireEvent.press(screen.getByRole("button", { name: "Close" }));
    await wait(400);
    expect(queryAllByRoleDeep("dialog")).toEqual([]);
  });

  it.each(["center", "top", "left", "right"] as const)(
    "placement %s (no handle)",
    async (placement) => {
      await render(
        <Popup defaultOpen placement={placement} title="P">
          x
        </Popup>,
      );
      expect(getByRoleDeep("dialog", { name: "P" })).toBeTruthy();
      expect(queryPart("handle", "popup")).toBeNull();
    },
  );

  it("Drawer side, size and square corners", async () => {
    await render(
      <Popup defaultOpen side="left" size="small" round={false} title="D">
        x
      </Popup>,
    );
    expect(queryPart("content", "popup")).toHaveStyle({
      width: "60%",
      borderRadius: 0,
    });
  });

  it("hides the close button; localized label; dark tokens", async () => {
    const dark = resolveTokens({ mode: "dark", design: { preset: "touch" } });
    const { rerender } = await render(
      <Popup defaultOpen hideCloseButton title="T" />,
    );
    expect(screen.queryByRole("button")).toBeNull();
    await rerender(
      <MinervaProvider theme="dark" locale={{ language: "ja" }}>
        <Popup defaultOpen title="T" />
      </MinervaProvider>,
    );
    expect(screen.getByRole("button", { name: "閉じる" })).toBeTruthy();
    expect(queryPart("content", "popup")).toHaveStyle({
      backgroundColor: dark.colors["surface-elevated-color"],
    });
  });
});
