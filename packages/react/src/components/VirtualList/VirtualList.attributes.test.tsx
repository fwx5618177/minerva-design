// Native attribute passthrough and clickable rows (onItemClick).
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import VirtualList from "./VirtualList";
import type { VirtualListItem } from "./types";

const CONTAINER_HEIGHT = 100;
const ITEM_HEIGHT = 20;

const makeItems = (count: number): VirtualListItem[] =>
  Array.from({ length: count }, (_, i) => ({ id: i }));

beforeEach(() => {
  Object.defineProperty(HTMLElement.prototype, "clientHeight", {
    configurable: true,
    get: () => CONTAINER_HEIGHT,
  });
});

afterEach(() => {
  delete (HTMLElement.prototype as unknown as Record<string, unknown>)
    .clientHeight;
});

describe("VirtualList attributes", () => {
  it("forwards id, data-*, aria-* and event handlers to the root", () => {
    const onScroll = vi.fn();
    const onMouseEnter = vi.fn();
    render(
      <VirtualList
        items={makeItems(10)}
        itemHeight={ITEM_HEIGHT}
        maxHeight={CONTAINER_HEIGHT}
        renderItem={(item) => `Row ${item.id}`}
        id="files"
        data-testid="list"
        aria-label="Files"
        aria-describedby="hint"
        className="custom"
        style={{ marginTop: 4 }}
        onScroll={onScroll}
        onMouseEnter={onMouseEnter}
      />,
    );
    const root = screen.getByTestId("list");
    expect(root).toBe(screen.getByRole("region", { name: "Files" }));
    expect(root).toHaveAttribute("id", "files");
    expect(root).toHaveAttribute("aria-describedby", "hint");
    expect(root).toHaveClass("virtualList", "custom");
    expect(root).toHaveStyle({ marginTop: "4px" });
    // Its own semantics are kept
    expect(root).toHaveAttribute("tabindex", "0");
    fireEvent.scroll(root);
    expect(onScroll).toHaveBeenCalledTimes(1);
    fireEvent.mouseEnter(root);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  it("rows are not clickable (no pointer cursor, not focusable) without onItemClick", () => {
    render(
      <VirtualList
        items={makeItems(3)}
        itemHeight={ITEM_HEIGHT}
        maxHeight={CONTAINER_HEIGHT}
        renderItem={(item) => `Row ${item.id}`}
      />,
    );
    for (const row of screen.getAllByRole("listitem")) {
      expect(row).not.toHaveClass("clickable");
      expect(row).not.toHaveAttribute("tabindex");
      expect(row.style.cursor).toBe("");
    }
  });

  it("calls onItemClick on click and on Enter / Space when the row is focused", async () => {
    const user = userEvent.setup();
    const onItemClick = vi.fn();
    const items = makeItems(3);
    render(
      <VirtualList
        items={items}
        itemHeight={ITEM_HEIGHT}
        maxHeight={CONTAINER_HEIGHT}
        renderItem={(item) => `Row ${item.id}`}
        onItemClick={onItemClick}
        aria-label="Files"
      />,
    );
    const rows = screen.getAllByRole("listitem");
    expect(rows[0]).toHaveClass("clickable");
    await user.click(screen.getByText("Row 1"));
    expect(onItemClick).toHaveBeenLastCalledWith(
      items[1],
      1,
      expect.objectContaining({ type: "click" }),
    );
    await user.click(screen.getByRole("region", { name: "Files" }));
    await user.tab();
    expect(rows[0]).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(onItemClick).toHaveBeenLastCalledWith(
      items[0],
      0,
      expect.objectContaining({ key: "Enter" }),
    );
    await user.tab();
    await user.keyboard(" ");
    expect(onItemClick).toHaveBeenLastCalledWith(
      items[1],
      1,
      expect.objectContaining({ key: " " }),
    );
    expect(onItemClick).toHaveBeenCalledTimes(3);
  });

  it("leaves keys of the row content to the content", async () => {
    const user = userEvent.setup();
    const onItemClick = vi.fn();
    const onOpen = vi.fn();
    render(
      <VirtualList
        items={makeItems(1)}
        itemHeight={ITEM_HEIGHT}
        maxHeight={CONTAINER_HEIGHT}
        renderItem={() => (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
          >
            Open
          </button>
        )}
        onItemClick={onItemClick}
      />,
    );
    screen.getByRole("button", { name: "Open" }).focus();
    await user.keyboard("{Enter}");
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onItemClick).not.toHaveBeenCalled();
  });
});
