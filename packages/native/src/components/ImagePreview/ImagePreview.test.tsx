import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { Dimensions } from "react-native";
import { resolveTokens } from "@minerva/core";
import { describe, expect, it, vi } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { Button } from "../Button";
import { hostElements, queryPart } from "../../../test/queries";
import { ImagePreview } from "./ImagePreview";

const images = [
  "https://x/1.jpg",
  "https://x/2.jpg",
  { uri: "https://x/3.jpg" },
];
const viewer = () => screen.getByRole("adjustable");
const action = (actionName: string) =>
  fireEvent(viewer(), "accessibilityAction", { nativeEvent: { actionName } });
const items = () =>
  hostElements().filter((el) => el.props.dataSet?.part === "item");

describe("ImagePreview", () => {
  it("renders nothing while closed", async () => {
    await render(<ImagePreview images={images} />);
    expect(screen.queryByRole("adjustable")).toBeNull();
  });

  it("opens on the first image with counter, label and close button", async () => {
    await render(<ImagePreview images={images} defaultOpen />);
    expect(viewer()).toHaveAccessibleName("Image preview");
    expect(viewer()).toHaveAccessibilityValue({ text: "1 / 3" });
    expect(queryPart("index", "image-preview")).toHaveTextContent("1 / 3");
    expect(screen.getByRole("button", { name: "Close preview" })).toBeTruthy();
    expect(items()).toHaveLength(3);
    expect(items()[0].props.dataSet.active).toBe("");
  });

  it("pages with accessibility actions and swipes, reporting the index", async () => {
    const onChange = vi.fn();
    await render(
      <ImagePreview
        images={images}
        defaultOpen
        defaultIndex={1}
        onChange={onChange}
      />,
    );
    expect(viewer()).toHaveAccessibilityValue({ text: "2 / 3" });
    await action("increment");
    expect(onChange).toHaveBeenLastCalledWith(2);
    expect(viewer()).toHaveAccessibilityValue({ text: "3 / 3" });
    // stays on the last image
    await action("increment");
    expect(onChange).toHaveBeenCalledTimes(1);
    const width = Dimensions.get("window").width;
    await fireEvent(queryPart("track", "image-preview")!, "momentumScrollEnd", {
      nativeEvent: {
        contentOffset: { x: 0, y: 0 },
        layoutMeasurement: { width, height: 800 },
      },
    });
    expect(onChange).toHaveBeenLastCalledWith(0);
    expect(viewer()).toHaveAccessibilityValue({ text: "1 / 3" });
    await action("decrement");
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("controlled index", async () => {
    const onChange = vi.fn();
    const { rerender } = await render(
      <ImagePreview images={images} open index={0} onChange={onChange} />,
    );
    await action("increment");
    expect(onChange).toHaveBeenCalledWith(1);
    expect(viewer()).toHaveAccessibilityValue({ text: "1 / 3" });
    await rerender(
      <ImagePreview images={images} open index={2} onChange={onChange} />,
    );
    expect(viewer()).toHaveAccessibilityValue({ text: "3 / 3" });
  });

  it("closes from the close button, the image and back, with reasons", async () => {
    const onOpenChange = vi.fn();
    const { rerender } = await render(
      <ImagePreview
        images={images}
        open
        onOpenChange={onOpenChange}
        testID="ip"
      />,
    );
    await fireEvent.press(
      screen.getByRole("button", { name: "Close preview" }),
    );
    expect(onOpenChange).toHaveBeenLastCalledWith(false, "close-button");
    await fireEvent.press(items()[0]);
    expect(onOpenChange).toHaveBeenLastCalledWith(false, "image");
    await action("activate");
    expect(onOpenChange).toHaveBeenCalledTimes(3);
    await fireEvent(screen.getByTestId("ip"), "requestClose");
    expect(onOpenChange).toHaveBeenLastCalledWith(false, "back");
    // controlled: still open
    expect(viewer()).toBeTruthy();
    await rerender(
      <ImagePreview
        images={images}
        open
        closeOnPress={false}
        onOpenChange={onOpenChange}
      />,
    );
    await fireEvent.press(items()[0]);
    expect(onOpenChange).toHaveBeenCalledTimes(4);
  });

  it("uncontrolled: opens from a trigger and closes", async () => {
    function App() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onPress={() => setOpen(true)}>Show</Button>
          <ImagePreview images={images} open={open} onOpenChange={setOpen} />
        </>
      );
    }
    await render(<App />);
    await fireEvent.press(screen.getByRole("button", { name: "Show" }));
    expect(viewer()).toBeTruthy();
    await fireEvent.press(
      screen.getByRole("button", { name: "Close preview" }),
    );
    expect(screen.queryByRole("adjustable")).toBeNull();
  });

  it("hides counter / close button; dark tokens; translated; safe area", async () => {
    const dark = resolveTokens({ mode: "dark", design: { preset: "touch" } });
    const { rerender } = await render(
      <MinervaProvider
        theme="light"
        locale={{ language: "zh" }}
        insets={{ top: 40 }}
      >
        <ImagePreview images={images} defaultOpen />
      </MinervaProvider>,
    );
    expect(viewer()).toHaveAccessibleName("图片预览");
    const close = screen.getByRole("button", { name: "关闭预览" });
    expect(close).toHaveStyle({ top: 40 + dark.space["2"] });
    expect(close.props.hitSlop).toEqual({
      top: 4,
      bottom: 4,
      left: 4,
      right: 4,
    });
    expect(queryPart("root", "image-preview")).toHaveStyle({
      backgroundColor: dark.colors["background-color"],
    });
    await rerender(
      <MinervaProvider theme="light">
        <ImagePreview
          images={images}
          defaultOpen
          showIndex={false}
          closeable={false}
        />
      </MinervaProvider>,
    );
    expect(queryPart("index", "image-preview")).toBeNull();
    expect(screen.queryByRole("button")).toBeNull();
  });
});
