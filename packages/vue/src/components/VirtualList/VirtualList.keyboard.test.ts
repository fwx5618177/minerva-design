// Attribute passthrough, clickable rows (@item-click) and keyboard access.
import { h, nextTick } from "vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { mount } from "@vue/test-utils";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { VirtualList, type VirtualListItem } from ".";

const CONTAINER_HEIGHT = 100;
const ITEM_HEIGHT = 20;

const makeItems = (count: number): VirtualListItem[] =>
  Array.from({ length: count }, (_, i) => ({ id: i }));

const renderButton = (item: VirtualListItem) =>
  h("button", { type: "button" }, `Open ${item.id}`);

const scrollTo = async (container: HTMLElement, top: number) => {
  container.scrollTop = top;
  await fireEvent.scroll(container);
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

const base = {
  itemHeight: ITEM_HEIGHT,
  maxHeight: CONTAINER_HEIGHT,
  renderItem: (item: VirtualListItem) => `Row ${item.id}`,
};

describe("VirtualList attributes", () => {
  it("forwards id, data-*, aria-*, class, style and listeners to the root", async () => {
    const onMouseenter = vi.fn();
    render(VirtualList, {
      props: { ...base, items: makeItems(10), "aria-label": "Files" },
      attrs: {
        id: "files",
        "data-testid": "list",
        "aria-describedby": "hint",
        class: "custom",
        style: "margin-top: 4px",
        role: "listbox",
        tabindex: -1,
        "data-part": "x",
        onMouseenter,
      },
    });
    const root = screen.getByTestId("list");
    expect(root).toBe(screen.getByRole("region", { name: "Files" }));
    expect(root).toHaveAttribute("id", "files");
    expect(root).toHaveAttribute("aria-describedby", "hint");
    expect(root).toHaveClass("virtualList", "custom");
    expect(root.style.marginTop).toBe("4px");
    // Its own semantics and hooks are kept
    expect(root).toHaveAttribute("tabindex", "0");
    expect(root).toHaveAttribute("data-part", "root");
    await fireEvent.mouseEnter(root);
    expect(onMouseenter).toHaveBeenCalledTimes(1);
  });

  it("rows are not clickable (not focusable) without an item-click listener", async () => {
    const wrapper = mount(VirtualList, {
      props: { ...base, items: makeItems(3) },
    });
    const rows = wrapper.findAll('[role="listitem"]');
    for (const row of rows) {
      expect(row.attributes("tabindex")).toBeUndefined();
    }
    await rows[0].trigger("click");
    await rows[0].trigger("keydown", { key: "Enter" });
    expect(wrapper.emitted("itemClick")).toBeUndefined();
  });

  it("emits itemClick on click and on Enter / Space when the row is focused", async () => {
    const user = userEvent.setup();
    const onItemClick = vi.fn();
    const items = makeItems(3);
    render(VirtualList, {
      props: { ...base, items, "aria-label": "Files", onItemClick },
    });
    const rows = screen.getAllByRole("listitem");
    expect(rows[0]).toHaveAttribute("tabindex", "0");
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
    await user.keyboard("a");
    expect(onItemClick).toHaveBeenCalledTimes(3);
  });

  it("supports a once listener", async () => {
    const wrapper = mount(VirtualList, {
      props: { ...base, items: makeItems(2) },
      attrs: { onItemClickOnce: () => {} },
    });
    expect(wrapper.find('[role="listitem"]').attributes("tabindex")).toBe("0");
  });

  it("leaves keys of the row content to the content", async () => {
    const user = userEvent.setup();
    const onItemClick = vi.fn();
    const onOpen = vi.fn();
    render(VirtualList, {
      props: {
        ...base,
        items: makeItems(1),
        onItemClick,
        renderItem: () =>
          h(
            "button",
            {
              type: "button",
              onClick: (e: MouseEvent) => {
                e.stopPropagation();
                onOpen();
              },
            },
            "Open",
          ),
      },
    });
    screen.getByRole("button", { name: "Open" }).focus();
    await user.keyboard("{Enter}");
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onItemClick).not.toHaveBeenCalled();
  });
});

describe("VirtualList keyboard", () => {
  it("reaches the scroll region first, then the content of the rendered items in order", async () => {
    const user = userEvent.setup();
    render(VirtualList, {
      props: {
        ...base,
        items: makeItems(100),
        overscan: 0,
        renderItem: renderButton,
        "aria-label": "Files",
      },
    });
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
    render(VirtualList, {
      props: {
        ...base,
        items: makeItems(10),
        renderItem: (item: VirtualListItem) =>
          h(
            "button",
            { type: "button", onClick: () => onOpen(item.id) },
            `Open ${item.id}`,
          ),
      },
    });
    await user.tab();
    await user.tab();
    await user.keyboard("{Enter}");
    await user.tab();
    await user.keyboard(" ");
    expect(onOpen.mock.calls).toEqual([[0], [1]]);
  });

  it("keeps the focused item mounted (and focused) when it is scrolled out of the window", async () => {
    const user = userEvent.setup();
    render(VirtualList, {
      props: {
        ...base,
        items: makeItems(1000),
        overscan: 0,
        renderItem: renderButton,
        "aria-label": "Files",
      },
    });
    await nextTick();
    const scroller = screen.getByRole("region", { name: "Files" });
    const button = screen.getByRole("button", { name: "Open 2" });
    button.focus();
    await nextTick();
    await scrollTo(scroller, 10_000);
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

  it("keeps a focused item after the window (scrolling up)", async () => {
    render(VirtualList, {
      props: {
        ...base,
        items: makeItems(1000),
        overscan: 0,
        renderItem: renderButton,
        "aria-label": "Files",
      },
    });
    const scroller = screen.getByRole("region", { name: "Files" });
    await scrollTo(scroller, 2000);
    const button = screen.getByRole("button", { name: "Open 102" });
    button.focus();
    await nextTick();
    await scrollTo(scroller, 0);
    const rows = screen.getAllByRole("listitem");
    expect(rows.at(-1)).toHaveAttribute("aria-posinset", "103");
    expect(button).toHaveFocus();
    // focus moving inside the row keeps it
    await fireEvent.focusOut(rows.at(-1)!, { relatedTarget: button });
    expect(button).toBeInTheDocument();
  });
});
