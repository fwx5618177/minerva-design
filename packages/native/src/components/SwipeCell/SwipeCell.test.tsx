import { act, createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import { resolveTokens } from "@minerva/core";
import { describe, expect, it, vi } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { queryPart } from "../../../test/queries";
import { SwipeCell, type SwipeCellHandle } from "./SwipeCell";

const light = resolveTokens({ design: { preset: "touch" } });

const row = () => screen.getByTestId("row");
const openState = () =>
  queryPart("root", "swipe-cell")?.props.dataSet.open as string | undefined;

/** Sizes the action areas (no layout pass in the test renderer) */
async function layout(left: number, right: number) {
  const l = queryPart("left", "swipe-cell");
  const r = queryPart("right", "swipe-cell");
  if (l)
    await fireEvent(l, "layout", { nativeEvent: { layout: { width: left } } });
  if (r)
    await fireEvent(r, "layout", {
      nativeEvent: { layout: { width: right } },
    });
}

/** A one-finger touch history at `x` (what PanResponder reads) */
function touch(startX: number, x: number, time: number) {
  return {
    touchHistory: {
      numberActiveTouches: 1,
      indexOfSingleActiveTouch: 0,
      mostRecentTimeStamp: time,
      touchBank: [
        {
          touchActive: true,
          startPageX: startX,
          startPageY: 0,
          startTimeStamp: 0,
          currentPageX: x,
          currentPageY: 0,
          currentTimeStamp: time,
          previousPageX: startX,
          previousPageY: 0,
          previousTimeStamp: 0,
        },
      ],
    },
    nativeEvent: { touches: [], changedTouches: [] },
  };
}

/** Drives the PanResponder handlers of the sliding content */
async function swipe(dx: number) {
  const handlers = queryPart("content", "swipe-cell")!.props;
  await act(async () => {
    handlers.onResponderGrant(touch(200, 200, 1));
    handlers.onResponderMove(touch(200, 200 + dx, 300));
    handlers.onResponderRelease(touch(200, 200 + dx, 300));
  });
}

const actions = (onDelete = vi.fn(), onArchive = vi.fn()) => ({
  rightActions: [
    { text: "Archive", color: "warning" as const, onPress: onArchive },
    { text: "Delete", onPress: onDelete },
  ],
});

describe("SwipeCell", () => {
  it("exposes its actions as accessibility actions with a hint", async () => {
    await render(
      <SwipeCell testID="row" {...actions()}>
        <Text>Message</Text>
      </SwipeCell>,
    );
    expect(row().props.accessible).toBe(true);
    expect(row().props.accessibilityHint).toBe("More actions");
    expect(row().props.accessibilityActions).toEqual([
      { name: "Archive", label: "Archive" },
      { name: "Delete", label: "Delete" },
    ]);
    // hidden action buttons stay out of the accessibility tree
    expect(screen.queryByRole("button", { name: "Delete" })).toBeNull();
    expect(openState()).toBeUndefined();
  });

  it("accessibility actions run the action", async () => {
    const onDelete = vi.fn();
    const onAccessibilityAction = vi.fn();
    await render(
      <SwipeCell
        testID="row"
        {...actions(onDelete)}
        onAccessibilityAction={onAccessibilityAction}
      >
        <Text>Message</Text>
      </SwipeCell>,
    );
    await fireEvent(row(), "accessibilityAction", {
      nativeEvent: { actionName: "Delete" },
    });
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onAccessibilityAction).toHaveBeenCalled();
  });

  it("ref open / close, onOpen / onClose, revealed buttons", async () => {
    const ref = createRef<SwipeCellHandle>();
    const onOpen = vi.fn();
    const onClose = vi.fn();
    await render(
      <SwipeCell
        ref={ref}
        testID="row"
        {...actions()}
        leftActions={[{ text: "Pin" }]}
        onOpen={onOpen}
        onClose={onClose}
      >
        <Text>Message</Text>
      </SwipeCell>,
    );
    await act(async () => ref.current?.open());
    expect(onOpen).toHaveBeenCalledWith("right");
    expect(openState()).toBe("right");
    expect(screen.getByRole("button", { name: "Delete" })).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Pin" })).toBeNull();
    await act(async () => ref.current?.open("left"));
    expect(onOpen).toHaveBeenLastCalledWith("left");
    expect(screen.getByRole("button", { name: "Pin" })).toBeTruthy();
    await act(async () => ref.current?.close());
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(openState()).toBeUndefined();
  });

  it("pressing an action button runs it and closes the cell", async () => {
    const ref = createRef<SwipeCellHandle>();
    const onArchive = vi.fn();
    const onClose = vi.fn();
    await render(
      <SwipeCell
        ref={ref}
        testID="row"
        {...actions(vi.fn(), onArchive)}
        onClose={onClose}
      >
        <Text>Message</Text>
      </SwipeCell>,
    );
    await act(async () => ref.current?.open("right"));
    await fireEvent.press(screen.getByRole("button", { name: "Archive" }));
    expect(onArchive).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(openState()).toBeUndefined();
  });

  it("closeOnActionPress={false} keeps it open", async () => {
    const ref = createRef<SwipeCellHandle>();
    await render(
      <SwipeCell
        ref={ref}
        testID="row"
        {...actions()}
        closeOnActionPress={false}
      >
        <Text>Message</Text>
      </SwipeCell>,
    );
    await act(async () => ref.current?.open("right"));
    await fireEvent.press(screen.getByRole("button", { name: "Delete" }));
    expect(openState()).toBe("right");
  });

  it("swipes open past the threshold, springs back below it", async () => {
    const onOpen = vi.fn();
    await render(
      <SwipeCell testID="row" {...actions()} onOpen={onOpen}>
        <Text>Message</Text>
      </SwipeCell>,
    );
    await layout(0, 160);
    await swipe(-30); // < 30% of 160
    expect(onOpen).not.toHaveBeenCalled();
    expect(openState()).toBeUndefined();
    await swipe(-100);
    expect(onOpen).toHaveBeenCalledWith("right");
    expect(openState()).toBe("right");
    // a tap on the open cell closes it
    await swipe(0);
    expect(openState()).toBeUndefined();
  });

  it("disabled: no swipe responder", async () => {
    await render(
      <SwipeCell testID="row" {...actions()} disabled>
        <Text>Message</Text>
      </SwipeCell>,
    );
    await layout(0, 160);
    const moveShould = queryPart("content", "swipe-cell")!.props
      .onMoveShouldSetResponder;
    expect(moveShould(touch(200, 100, 10))).toBe(false);
  });

  it("action colors from the tokens, translated hint, custom sides", async () => {
    const ref = createRef<SwipeCellHandle>();
    await render(
      <MinervaProvider locale={{ language: "zh" }}>
        <SwipeCell ref={ref} testID="row" {...actions()}>
          <Text>Message</Text>
        </SwipeCell>
      </MinervaProvider>,
    );
    expect(row().props.accessibilityHint).toBe("更多操作");
    await act(async () => ref.current?.open("right"));
    expect(screen.getByRole("button", { name: "Delete" })).toHaveStyle({
      backgroundColor: light.colors["danger-color"],
    });
    expect(screen.getByRole("button", { name: "Archive" })).toHaveStyle({
      backgroundColor: light.colors["warning-color"],
    });
    await render(
      <SwipeCell testID="row" right={<Text>Custom</Text>}>
        <Text>Row</Text>
      </SwipeCell>,
    );
    expect(
      screen.getByText("Custom", { includeHiddenElements: true }),
    ).toBeTruthy();
    expect(row().props.accessible).toBeUndefined();
  });
});
