import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { ScrollView, Text } from "react-native";
import { resolveTokens } from "@minerva/core";
import { describe, expect, it, vi } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { queryPart } from "../../../test/queries";
import { PullRefresh, usePullRefresh } from "./PullRefresh";

const light = resolveTokens({ design: { preset: "touch" } });

const control = () => screen.getByTestId("scroll").props.refreshControl;
const pull = () => act(() => control().props.onRefresh());
const wait = (ms: number) =>
  act(() => new Promise<void>((r) => setTimeout(r, ms)));

function deferred() {
  let resolve!: () => void;
  const promise = new Promise<void>((r) => {
    resolve = r;
  });
  return { promise, resolve };
}

describe("PullRefresh", () => {
  it("renders its content with a themed RefreshControl", async () => {
    await render(
      <PullRefresh testID="scroll">
        <Text>Feed</Text>
      </PullRefresh>,
    );
    expect(screen.getByText("Feed")).toBeTruthy();
    expect(control().props).toMatchObject({
      refreshing: false,
      enabled: true,
      tintColor: light.colors["primary-color"],
      colors: [light.colors["primary-color"]],
    });
    expect(queryPart("status", "pull-refresh")?.props).toMatchObject({
      accessibilityLiveRegion: "polite",
    });
  });

  it("manages refreshing from the promise of onRefresh, then shows success", async () => {
    const job = deferred();
    const onRefresh = vi.fn(() => job.promise);
    await render(<PullRefresh testID="scroll" onRefresh={onRefresh} />);
    await pull();
    expect(onRefresh).toHaveBeenCalledTimes(1);
    expect(control().props.refreshing).toBe(true);
    expect(screen.getByTestId("scroll")).toBeBusy();
    expect(screen.getByText("Refreshing...")).toBeTruthy();
    // no second refresh while one is running
    await pull();
    expect(onRefresh).toHaveBeenCalledTimes(1);
    await act(async () => job.resolve());
    expect(control().props.refreshing).toBe(false);
    expect(screen.getByText("Refreshed")).toBeTruthy();
    await wait(600);
    expect(screen.queryByText("Refreshed")).toBeNull();
  });

  it("a rejected promise also ends the refresh", async () => {
    const onRefresh = vi.fn(() => Promise.reject(new Error("offline")));
    await render(<PullRefresh testID="scroll" onRefresh={onRefresh} />);
    await pull();
    await act(async () => {});
    expect(control().props.refreshing).toBe(false);
  });

  it("controlled refreshing and custom texts", async () => {
    const onRefresh = vi.fn();
    const { rerender } = await render(
      <PullRefresh
        testID="scroll"
        refreshing
        onRefresh={onRefresh}
        loadingText="Loading feed"
        successText="Done"
      />,
    );
    expect(control().props.refreshing).toBe(true);
    expect(screen.getByText("Loading feed")).toBeTruthy();
    await rerender(
      <PullRefresh
        testID="scroll"
        refreshing={false}
        onRefresh={onRefresh}
        loadingText="Loading feed"
        successText="Done"
      />,
    );
    expect(screen.getByText("Done")).toBeTruthy();
    await pull();
    expect(onRefresh).toHaveBeenCalledTimes(1);
    // controlled: stays as the prop says
    expect(control().props.refreshing).toBe(false);
  });

  it("disabled: no refresh", async () => {
    const onRefresh = vi.fn();
    await render(
      <PullRefresh testID="scroll" disabled onRefresh={onRefresh} />,
    );
    expect(control().props.enabled).toBe(false);
    await pull();
    expect(onRefresh).not.toHaveBeenCalled();
  });

  it("pulling / loosing texts follow the overscroll (iOS title)", async () => {
    const onScroll = vi.fn();
    await render(
      <MinervaProvider locale={{ language: "zh" }}>
        <PullRefresh testID="scroll" onScroll={onScroll} />
      </MinervaProvider>,
    );
    const scroll = (y: number) =>
      fireEvent.scroll(screen.getByTestId("scroll"), {
        nativeEvent: { contentOffset: { x: 0, y } },
      });
    await scroll(-20);
    expect(onScroll).toHaveBeenCalled();
    expect(control().props.title).toBe("下拉即可刷新");
    await scroll(-80);
    expect(control().props.title).toBe("释放即可刷新");
    await scroll(10);
    expect(control().props.title).toBeUndefined();
  });

  it("usePullRefresh gives a refreshControl to any scrollable (FlatList...)", async () => {
    const job = deferred();
    function List() {
      const { refreshControl, refreshing } = usePullRefresh(() => job.promise);
      return (
        <ScrollView testID="scroll" refreshControl={refreshControl}>
          <Text>{refreshing ? "busy" : "idle"}</Text>
        </ScrollView>
      );
    }
    await render(
      <MinervaProvider theme="dark">
        <List />
      </MinervaProvider>,
    );
    const dark = resolveTokens({ mode: "dark", design: { preset: "touch" } });
    expect(control().props.tintColor).toBe(dark.colors["primary-color"]);
    expect(screen.getByText("idle")).toBeTruthy();
    await pull();
    expect(screen.getByText("busy")).toBeTruthy();
    await act(async () => job.resolve());
    expect(screen.getByText("idle")).toBeTruthy();
  });
});
