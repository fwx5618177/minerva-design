import { StrictMode, createRef } from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  onTestFinished,
  vi,
} from "vitest";
import i18n from "../../config/i18n";
import VirtualList from "./VirtualList";
import type { VirtualListItem } from "./types";

const CONTAINER_HEIGHT = 100;
const ITEM_HEIGHT = 20;

const makeItems = (count: number): VirtualListItem[] =>
  Array.from({ length: count }, (_, i) => ({ id: i, metadata: { idx: i } }));

const renderItem = (item: VirtualListItem, index: number) => (
  <span>{`Item ${item.id} @${index}`}</span>
);

const renderedLabels = () =>
  screen.queryAllByText(/^Item \d+ @\d+$/).map((el) => el.textContent);

const mockedProps = ["clientHeight", "offsetHeight", "scrollHeight"] as const;

/** happy-dom has no layout, so stub the size getters used by the component. */
const mockLayout = ({
  clientHeight = CONTAINER_HEIGHT,
  offsetHeight = 0,
  scrollHeight = 0,
}: Partial<Record<(typeof mockedProps)[number], number>> = {}) => {
  const values = { clientHeight, offsetHeight, scrollHeight };
  mockedProps.forEach((prop) => {
    Object.defineProperty(HTMLElement.prototype, prop, {
      configurable: true,
      get: () => values[prop],
    });
  });
};

const scrollTo = (container: HTMLElement, top: number) => {
  container.scrollTop = top;
  fireEvent.scroll(container);
};

const getScroller = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement;

describe("VirtualList", () => {
  beforeEach(() => {
    mockLayout();
  });

  afterEach(() => {
    mockedProps.forEach((prop) => {
      delete (HTMLElement.prototype as unknown as Record<string, unknown>)[
        prop
      ];
    });
    vi.restoreAllMocks();
  });

  describe("rendering", () => {
    it("renders only the visible window of items", () => {
      render(
        <VirtualList
          items={makeItems(1000)}
          itemHeight={ITEM_HEIGHT}
          maxHeight={CONTAINER_HEIGHT}
          overscan={0}
          renderItem={renderItem}
        />,
      );
      expect(renderedLabels()).toEqual([
        "Item 0 @0",
        "Item 1 @1",
        "Item 2 @2",
        "Item 3 @3",
        "Item 4 @4",
      ]);
    });

    it("includes overscan items after the visible window", () => {
      render(
        <VirtualList
          items={makeItems(1000)}
          itemHeight={ITEM_HEIGHT}
          maxHeight={CONTAINER_HEIGHT}
          overscan={2}
          renderItem={renderItem}
        />,
      );
      // ceil(100 / 20) + 2 * 2 = 9
      expect(renderedLabels()).toHaveLength(9);
    });

    it("treats a negative overscan as 0", () => {
      render(
        <VirtualList
          items={makeItems(1000)}
          itemHeight={ITEM_HEIGHT}
          maxHeight={CONTAINER_HEIGHT}
          overscan={-3}
          renderItem={renderItem}
        />,
      );
      // ceil(100 / 20) rows, no shrinking of the window
      expect(renderedLabels()).toHaveLength(5);
    });

    it("never renders more items than provided", () => {
      render(
        <VirtualList
          items={makeItems(3)}
          itemHeight={ITEM_HEIGHT}
          maxHeight={CONTAINER_HEIGHT}
          renderItem={renderItem}
        />,
      );
      expect(renderedLabels()).toEqual(["Item 0 @0", "Item 1 @1", "Item 2 @2"]);
    });

    it("sizes the content to the full list and positions items", () => {
      const { container } = render(
        <VirtualList
          items={makeItems(50)}
          itemHeight={ITEM_HEIGHT}
          itemPadding={4}
          maxHeight={CONTAINER_HEIGHT}
          overscan={0}
          renderItem={renderItem}
        />,
      );
      const content = container.querySelector(
        ".virtualListContent",
      ) as HTMLElement;
      expect(content.style.height).toBe("1000px");

      const second = screen.getByText("Item 1 @1").parentElement as HTMLElement;
      expect(second).toHaveClass("virtualListItem");
      expect(second.style.transform).toBe("translateY(20px)");
      expect(second.style.height).toBe("20px");
      expect(second.style.padding).toBe("4px");
    });

    it("applies maxHeight, className and custom style to the scroll container", () => {
      const { container } = render(
        <VirtualList
          items={makeItems(10)}
          itemHeight={ITEM_HEIGHT}
          maxHeight={300}
          className="custom"
          style={{ background: "red" }}
          renderItem={renderItem}
        />,
      );
      const scroller = getScroller(container);
      expect(scroller).toHaveClass("virtualList", "custom");
      expect(scroller.style.maxHeight).toBe("300px");
      expect(scroller.style.overflow).toBe("auto");
      expect(scroller.style.background).toBe("red");
    });

    it("renders nothing for an empty list", () => {
      const { container } = render(
        <VirtualList items={[]} maxHeight={100} renderItem={renderItem} />,
      );
      expect(renderedLabels()).toHaveLength(0);
      expect(container.querySelector(".measureItem")).not.toBeInTheDocument();
    });

    it("shows a progress indicator while loading", () => {
      const { rerender } = render(
        <VirtualList
          items={makeItems(5)}
          itemHeight={ITEM_HEIGHT}
          maxHeight={CONTAINER_HEIGHT}
          renderItem={renderItem}
        />,
      );
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();

      rerender(
        <VirtualList
          items={makeItems(5)}
          itemHeight={ITEM_HEIGHT}
          maxHeight={CONTAINER_HEIGHT}
          renderItem={renderItem}
          loading
        />,
      );
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });
  });

  describe("automatic item height", () => {
    it("measures the first item and adds padding when itemHeight is omitted", async () => {
      mockLayout({ offsetHeight: 30 });
      const renderSpy = vi.fn(renderItem);
      const { container } = render(
        <VirtualList
          items={makeItems(100)}
          itemPadding={5}
          overscan={0}
          maxHeight={CONTAINER_HEIGHT}
          renderItem={renderSpy}
        />,
      );

      await waitFor(() => {
        const content = container.querySelector(
          ".virtualListContent",
        ) as HTMLElement;
        // (30 + 5 * 2) * 100
        expect(content.style.height).toBe("4000px");
      });
      // ceil(100 / 40) = 3 visible items
      expect(renderedLabels()).toEqual(["Item 0 @0", "Item 1 @1", "Item 2 @2"]);
      const second = screen.getByText("Item 1 @1").parentElement as HTMLElement;
      expect(second.style.transform).toBe("translateY(40px)");
    });

    it("applies itemPadding changes after the item has been measured", async () => {
      mockLayout({ offsetHeight: 30 });
      const props = {
        items: makeItems(100),
        overscan: 0,
        maxHeight: CONTAINER_HEIGHT,
        renderItem,
      };
      const { container, rerender } = render(
        <VirtualList {...props} itemPadding={5} />,
      );
      const content = () =>
        container.querySelector(".virtualListContent") as HTMLElement;
      await waitFor(() => {
        expect(content().style.height).toBe("4000px");
      });

      rerender(<VirtualList {...props} itemPadding={10} />);
      // (30 + 10 * 2) * 100
      expect(content().style.height).toBe("5000px");
      const second = screen.getByText("Item 1 @1").parentElement as HTMLElement;
      expect(second.style.transform).toBe("translateY(50px)");
    });

    it("renders a hidden measuring item until a height is known", () => {
      const { container } = render(
        <VirtualList
          items={makeItems(10)}
          maxHeight={CONTAINER_HEIGHT}
          renderItem={renderItem}
        />,
      );
      const measure = container.querySelector(".measureItem");
      expect(measure).toHaveAttribute("aria-hidden", "true");
      expect(measure).toHaveTextContent("Item 0 @0");
      expect(container.querySelectorAll(".virtualListItem")).toHaveLength(0);
    });
  });

  describe("scrolling", () => {
    it("updates the rendered window on scroll", () => {
      const { container } = render(
        <VirtualList
          items={makeItems(1000)}
          itemHeight={ITEM_HEIGHT}
          maxHeight={CONTAINER_HEIGHT}
          overscan={0}
          renderItem={renderItem}
        />,
      );
      scrollTo(getScroller(container), 400);
      expect(renderedLabels()).toEqual([
        "Item 20 @20",
        "Item 21 @21",
        "Item 22 @22",
        "Item 23 @23",
        "Item 24 @24",
      ]);
      const first = screen.getByText("Item 20 @20")
        .parentElement as HTMLElement;
      expect(first.style.transform).toBe("translateY(400px)");
    });

    it("keeps overscan items before the visible window", () => {
      const { container } = render(
        <VirtualList
          items={makeItems(1000)}
          itemHeight={ITEM_HEIGHT}
          maxHeight={CONTAINER_HEIGHT}
          overscan={2}
          renderItem={renderItem}
        />,
      );
      scrollTo(getScroller(container), 400);
      const labels = renderedLabels();
      expect(labels[0]).toBe("Item 18 @18");
      expect(labels).toHaveLength(9);
    });

    it("updates the window via requestAnimationFrame in highPerformance mode", async () => {
      const { container } = render(
        <VirtualList
          items={makeItems(1000)}
          itemHeight={ITEM_HEIGHT}
          maxHeight={CONTAINER_HEIGHT}
          overscan={0}
          highPerformance
          renderItem={renderItem}
        />,
      );
      scrollTo(getScroller(container), 200);
      await waitFor(() => {
        expect(renderedLabels()[0]).toBe("Item 10 @10");
      });
    });

    it("cancels pending highPerformance updates on unmount", () => {
      const raf = vi
        .spyOn(window, "requestAnimationFrame")
        .mockImplementation(() => 42);
      const cancel = vi.spyOn(window, "cancelAnimationFrame");
      const { container, unmount } = render(
        <VirtualList
          items={makeItems(1000)}
          itemHeight={ITEM_HEIGHT}
          maxHeight={CONTAINER_HEIGHT}
          highPerformance
          renderItem={renderItem}
        />,
      );
      scrollTo(getScroller(container), 200);
      expect(raf).toHaveBeenCalledTimes(1);
      unmount();
      expect(cancel).toHaveBeenCalledWith(42);
    });

    it("cancels a pending idle callback on unmount", () => {
      let rafCallback: FrameRequestCallback | undefined;
      vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
        rafCallback = cb;
        return 1;
      });
      const cancelIdle = vi.fn();
      vi.stubGlobal(
        "requestIdleCallback",
        vi.fn(() => 7),
      );
      vi.stubGlobal("cancelIdleCallback", cancelIdle);
      onTestFinished(() => {
        vi.unstubAllGlobals();
      });
      const { container, unmount } = render(
        <VirtualList
          items={makeItems(1000)}
          itemHeight={ITEM_HEIGHT}
          maxHeight={CONTAINER_HEIGHT}
          highPerformance
          renderItem={renderItem}
        />,
      );
      scrollTo(getScroller(container), 200);
      rafCallback?.(0);
      unmount();
      expect(cancelIdle).toHaveBeenCalledWith(7);
    });

    it("renders items via renderItem and supports user interaction inside them", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <VirtualList
          items={makeItems(10)}
          itemHeight={ITEM_HEIGHT}
          maxHeight={CONTAINER_HEIGHT}
          renderItem={(item) => (
            <button type="button" onClick={() => onClick(item.id)}>
              {`Select ${item.id}`}
            </button>
          )}
        />,
      );
      await user.click(screen.getByRole("button", { name: "Select 3" }));
      expect(onClick).toHaveBeenCalledWith(3);
    });
  });

  describe("load more", () => {
    // 20 items * 20px = 400px of content
    const setup = (props: { loading?: boolean } = {}) => {
      mockLayout({ scrollHeight: 400 });
      let resolve: () => void = () => {};
      const onLoadMore = vi.fn(
        () =>
          new Promise<void>((r) => {
            resolve = r;
          }),
      );
      const utils = render(
        <VirtualList
          items={makeItems(20)}
          itemHeight={ITEM_HEIGHT}
          maxHeight={CONTAINER_HEIGHT}
          loadMoreThreshold={100}
          onLoadMore={onLoadMore}
          renderItem={renderItem}
          {...props}
        />,
      );
      return {
        ...utils,
        onLoadMore,
        scroller: getScroller(utils.container),
        resolve: () => resolve(),
      };
    };

    it("calls onLoadMore when scrolling down within the threshold", () => {
      const { scroller, onLoadMore } = setup();
      scrollTo(scroller, 100); // 400 - 100 - 100 = 200, outside threshold
      expect(onLoadMore).not.toHaveBeenCalled();
      scrollTo(scroller, 250); // 400 - 250 - 100 = 50
      expect(onLoadMore).toHaveBeenCalledTimes(1);
    });

    it("does not call onLoadMore again while a load is pending", async () => {
      const { scroller, onLoadMore, resolve } = setup();
      scrollTo(scroller, 250);
      scrollTo(scroller, 280);
      expect(onLoadMore).toHaveBeenCalledTimes(1);

      await act(async () => {
        resolve();
      });
      scrollTo(scroller, 290);
      expect(onLoadMore).toHaveBeenCalledTimes(2);
    });

    it("does not call onLoadMore when scrolling up", () => {
      const { scroller, onLoadMore } = setup();
      scrollTo(scroller, 300);
      expect(onLoadMore).toHaveBeenCalledTimes(1);
      onLoadMore.mockClear();
      scrollTo(scroller, 250);
      expect(onLoadMore).not.toHaveBeenCalled();
    });

    it("does not call onLoadMore while loading", () => {
      const { scroller, onLoadMore } = setup({ loading: true });
      scrollTo(scroller, 250);
      expect(onLoadMore).not.toHaveBeenCalled();
    });
  });

  describe("regressions", () => {
    it("measures items that arrive after mounting with an empty list", async () => {
      mockLayout({ offsetHeight: 30 });
      const props = {
        itemPadding: 5,
        overscan: 0,
        maxHeight: CONTAINER_HEIGHT,
        renderItem,
      };
      const { container, rerender } = render(
        <VirtualList {...props} items={[]} />,
      );
      rerender(<VirtualList {...props} items={makeItems(100)} />);
      await waitFor(() => {
        expect(
          (container.querySelector(".virtualListContent") as HTMLElement).style
            .height,
        ).toBe("4000px");
      });
      expect(renderedLabels()).toEqual(["Item 0 @0", "Item 1 @1", "Item 2 @2"]);
    });

    it("tolerates an onLoadMore that does not return a promise", async () => {
      mockLayout({ clientHeight: 100, scrollHeight: 400 });
      const onLoadMore = vi.fn(() => undefined);
      const { container } = render(
        <VirtualList
          items={makeItems(20)}
          itemHeight={ITEM_HEIGHT}
          maxHeight={CONTAINER_HEIGHT}
          renderItem={renderItem}
          onLoadMore={onLoadMore}
        />,
      );
      const scroller = getScroller(container);
      scrollTo(scroller, 250);
      expect(onLoadMore).toHaveBeenCalledTimes(1);
      await act(async () => {});
      // The pending flag was released, so loading more works again
      scrollTo(scroller, 290);
      expect(onLoadMore).toHaveBeenCalledTimes(2);
    });

    it("disconnects its resize observers on unmount under StrictMode", () => {
      mockLayout({ offsetHeight: 0 });
      const observe = vi.spyOn(ResizeObserver.prototype, "observe");
      const disconnect = vi.spyOn(ResizeObserver.prototype, "disconnect");
      const { unmount } = render(
        <StrictMode>
          <VirtualList
            items={makeItems(5)}
            maxHeight={CONTAINER_HEIGHT}
            renderItem={renderItem}
          />
        </StrictMode>,
      );
      unmount();
      expect(observe.mock.calls.length).toBeGreaterThan(0);
      expect(disconnect.mock.calls.length).toBe(observe.mock.calls.length);
    });
  });

  describe("accessibility", () => {
    it("exposes a labelled list whose items know their real position", () => {
      render(
        <VirtualList
          items={makeItems(1000)}
          itemHeight={ITEM_HEIGHT}
          maxHeight={CONTAINER_HEIGHT}
          overscan={0}
          renderItem={renderItem}
          aria-label="Contacts"
        />,
      );
      const list = screen.getByRole("list", { name: "Contacts" });
      const items = screen.getAllByRole("listitem");
      expect(list).toContainElement(items[0]);
      expect(items[0]).toHaveAttribute("aria-setsize", "1000");
      expect(items[0]).toHaveAttribute("aria-posinset", "1");
    });

    it("makes the scroll container keyboard focusable", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <VirtualList
          items={makeItems(10)}
          itemHeight={ITEM_HEIGHT}
          maxHeight={CONTAINER_HEIGHT}
          renderItem={renderItem}
        />,
      );
      await user.tab();
      expect(getScroller(container)).toHaveFocus();
    });

    it("exposes the focusable scroll container as a labelled region", () => {
      const { container } = render(
        <VirtualList
          items={makeItems(10)}
          itemHeight={ITEM_HEIGHT}
          maxHeight={CONTAINER_HEIGHT}
          renderItem={renderItem}
          aria-label="Contacts"
        />,
      );
      expect(screen.getByRole("region", { name: "Contacts" })).toBe(
        getScroller(container),
      );
    });

    it("names the loading indicator", () => {
      render(
        <VirtualList
          items={makeItems(5)}
          itemHeight={ITEM_HEIGHT}
          maxHeight={CONTAINER_HEIGHT}
          renderItem={renderItem}
          loading
        />,
      );
      expect(
        screen.getByRole("progressbar", { name: "Loading" }),
      ).toBeInTheDocument();
    });
  });

  it("forwards ref to the scroll container", () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <VirtualList
        ref={ref}
        items={makeItems(5)}
        itemHeight={ITEM_HEIGHT}
        maxHeight={CONTAINER_HEIGHT}
        renderItem={renderItem}
      />,
    );
    expect(ref.current).toBe(getScroller(container));
  });
});

describe("VirtualList localization", () => {
  afterEach(() => {
    act(() => {
      i18n.changeLanguage("en");
    });
  });
  it("translates the loading indicator label", () => {
    act(() => {
      i18n.changeLanguage("zh");
    });
    render(
      <VirtualList
        items={makeItems(5)}
        itemHeight={ITEM_HEIGHT}
        maxHeight={CONTAINER_HEIGHT}
        renderItem={renderItem}
        loading
      />,
    );
    expect(
      screen.getByRole("progressbar", { name: "加载中" }),
    ).toBeInTheDocument();
  });
});
