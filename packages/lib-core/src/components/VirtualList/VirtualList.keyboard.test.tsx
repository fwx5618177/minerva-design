import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import VirtualList from "./VirtualList";
import type { VirtualListItem } from "./types";

const CONTAINER_HEIGHT = 100;
const ITEM_HEIGHT = 20;

const makeItems = (count: number): VirtualListItem[] =>
  Array.from({ length: count }, (_, i) => ({ id: i }));

const renderButton = (item: VirtualListItem) => (
  <button type="button">{`Open ${item.id}`}</button>
);

const scrollTo = (container: HTMLElement, top: number) => {
  container.scrollTop = top;
  fireEvent.scroll(container);
};

beforeEach(() => {
  // happy-dom has no layout: the container is 100px tall
  Object.defineProperty(HTMLElement.prototype, "clientHeight", {
    configurable: true,
    get: () => CONTAINER_HEIGHT,
  });
});

afterEach(() => {
  delete (HTMLElement.prototype as unknown as Record<string, unknown>)
    .clientHeight;
  vi.restoreAllMocks();
});

describe("VirtualList keyboard", () => {
  it("reaches the scroll region first, then the content of the rendered items in order", async () => {
    const user = userEvent.setup();
    render(
      <VirtualList
        items={makeItems(100)}
        itemHeight={ITEM_HEIGHT}
        maxHeight={CONTAINER_HEIGHT}
        overscan={0}
        renderItem={renderButton}
        aria-label="Files"
      />,
    );
    await user.tab();
    expect(screen.getByRole("region", { name: "Files" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Open 0" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Open 1" })).toHaveFocus();
    await user.tab({ shift: true });
    expect(screen.getByRole("button", { name: "Open 0" })).toHaveFocus();
  });

  it("activates item content with Enter and Space", async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();
    render(
      <VirtualList
        items={makeItems(10)}
        itemHeight={ITEM_HEIGHT}
        maxHeight={CONTAINER_HEIGHT}
        renderItem={(item) => (
          <button type="button" onClick={() => onOpen(item.id)}>
            {`Open ${item.id}`}
          </button>
        )}
      />,
    );
    await user.tab();
    await user.tab();
    await user.keyboard("{Enter}");
    await user.tab();
    await user.keyboard(" ");
    expect(onOpen.mock.calls).toEqual([[0], [1]]);
  });

  it("keeps the focused item mounted (and focused) when it is scrolled out of the window", async () => {
    const user = userEvent.setup();
    render(
      <VirtualList
        items={makeItems(1000)}
        itemHeight={ITEM_HEIGHT}
        maxHeight={CONTAINER_HEIGHT}
        overscan={0}
        renderItem={renderButton}
        aria-label="Files"
      />,
    );
    const scroller = screen.getByRole("region", { name: "Files" });
    const button = screen.getByRole("button", { name: "Open 2" });
    act(() => button.focus());
    scrollTo(scroller, 10_000);
    // The window moved far away, but the focused row stays in the DOM
    expect(
      screen.getByRole("button", { name: "Open 500" }),
    ).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toHaveFocus();
    expect(button.closest('[role="listitem"]')).toHaveAttribute(
      "aria-posinset",
      "3",
    );
    // Once focus leaves, the off-window row is released again
    await user.click(screen.getByRole("button", { name: "Open 500" }));
    expect(
      screen.queryByRole("button", { name: "Open 2" }),
    ).not.toBeInTheDocument();
  });
});
