import { defineComponent, h, nextTick, ref } from "vue";
import { fireEvent, render, screen, waitFor } from "@testing-library/vue";
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
import { setLanguage } from "../../config/i18n";
import { VirtualList, type VirtualListItem } from ".";

const CONTAINER_HEIGHT = 100;
const ITEM_HEIGHT = 20;

const makeItems = (count: number): VirtualListItem[] =>
  Array.from({ length: count }, (_, i) => ({ id: i, metadata: { idx: i } }));

const renderItem = (item: VirtualListItem, index: number) =>
  h("span", `Item ${item.id} @${index}`);

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

const scrollTo = async (container: HTMLElement, top: number) => {
  container.scrollTop = top;
  await fireEvent.scroll(container);
};

const getScroller = (container: Element) =>
  container.firstElementChild as HTMLElement;

/** The hidden measuring row (`styles.measureItem`, not a styled class) */
const measureRow = (container: Element) =>
  getScroller(container).querySelector(':scope > [aria-hidden="true"]');

type Props = Record<string, unknown>;
const renderList = (props: Props, slots?: Record<string, unknown>) =>
  render(VirtualList, {
    props: {
      itemHeight: ITEM_HEIGHT,
      maxHeight: CONTAINER_HEIGHT,
      renderItem,
      ...props,
    } as never,
    slots: slots as never,
  });

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
    it("renders only the visible window of items", async () => {
      renderList({ items: makeItems(1000), overscan: 0 });
      await nextTick();
      expect(renderedLabels()).toEqual([
        "Item 0 @0",
        "Item 1 @1",
        "Item 2 @2",
        "Item 3 @3",
        "Item 4 @4",
      ]);
    });

    it("includes overscan items after the visible window", async () => {
      renderList({ items: makeItems(1000), overscan: 2 });
      await nextTick();
      // ceil(100 / 20) + 2 * 2 = 9
      expect(renderedLabels()).toHaveLength(9);
    });

    it("treats a negative overscan as 0", async () => {
      renderList({ items: makeItems(1000), overscan: -3 });
      await nextTick();
      expect(renderedLabels()).toHaveLength(5);
    });

    it("never renders more items than provided", async () => {
      renderList({ items: makeItems(3) });
      await nextTick();
      expect(renderedLabels()).toEqual(["Item 0 @0", "Item 1 @1", "Item 2 @2"]);
    });

    it("renders rows with the default scoped slot (winning over renderItem)", async () => {
      renderList(
        { items: makeItems(2) },
        {
          default: ({
            item,
            index,
          }: {
            item: VirtualListItem;
            index: number;
          }) => h("b", `Slot ${item.id} #${index}`),
        },
      );
      await nextTick();
      expect(screen.getByText("Slot 1 #1").tagName).toBe("B");
      expect(renderedLabels()).toHaveLength(0);
    });

    it("renders empty rows without renderItem nor slot", () => {
      const { container } = renderList({
        items: makeItems(2),
        renderItem: undefined,
      });
      expect(container.querySelectorAll(".virtualListItem")).toHaveLength(2);
    });

    it("sizes the content to the full list and positions items", async () => {
      const { container } = renderList({
        items: makeItems(50),
        itemPadding: 4,
        overscan: 0,
      });
      await nextTick();
      const content = container.querySelector(
        ".virtualListContent",
      ) as HTMLElement;
      expect(content.style.height).toBe("1000px");
      expect(content).toHaveAttribute("data-part", "list");

      const second = screen.getByText("Item 1 @1").parentElement as HTMLElement;
      expect(second).toHaveClass("virtualListItem");
      expect(second).toHaveAttribute("data-part", "item");
      expect(second.style.transform).toBe("translateY(20px)");
      expect(second.style.height).toBe("20px");
      expect(second.style.padding).toBe("4px");
    });

    it("applies maxHeight, class and custom style to the scroll container", () => {
      const { container } = render(VirtualList, {
        props: {
          items: makeItems(10),
          itemHeight: ITEM_HEIGHT,
          maxHeight: 300,
          renderItem,
        },
        attrs: { class: "custom", style: { background: "red" } },
      });
      const scroller = getScroller(container);
      expect(scroller).toHaveClass("virtualList", "custom");
      expect(scroller.style.maxHeight).toBe("300px");
      expect(scroller.style.overflow).toBe("auto");
      expect(scroller.style.background).toBe("red");
      expect(scroller).toHaveAttribute("data-minerva", "virtual-list");
      expect(scroller).toHaveAttribute("data-part", "root");
    });

    it("renders nothing for an empty list", () => {
      const { container } = renderList({ items: [], itemHeight: undefined });
      expect(renderedLabels()).toHaveLength(0);
      expect(measureRow(container)).not.toBeInTheDocument();
      expect(
        (container.querySelector(".virtualListContent") as HTMLElement).style
          .height,
      ).toBe("auto");
    });

    it("shows a progress indicator while loading", async () => {
      const { rerender, container } = renderList({ items: makeItems(5) });
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
      expect(getScroller(container)).not.toHaveAttribute("aria-busy");

      await rerender({ loading: true });
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
      expect(getScroller(container)).toHaveAttribute("aria-busy", "true");
      expect(getScroller(container)).toHaveAttribute("data-loading", "");
      expect(container.querySelector('[data-part="loading"]')).toHaveClass(
        "loadingWrapper",
      );
    });
  });

  describe("automatic item height", () => {
    it("measures the first item and adds padding when itemHeight is omitted", async () => {
      mockLayout({ offsetHeight: 30 });
      const { container } = renderList({
        items: makeItems(100),
        itemHeight: undefined,
        itemPadding: 5,
        overscan: 0,
      });
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
      expect(measureRow(container)).not.toBeInTheDocument();
    });

    it("applies itemPadding changes after the item has been measured", async () => {
      mockLayout({ offsetHeight: 30 });
      const { container, rerender } = renderList({
        items: makeItems(100),
        itemHeight: undefined,
        overscan: 0,
        itemPadding: 5,
      });
      const content = () =>
        container.querySelector(".virtualListContent") as HTMLElement;
      await waitFor(() => {
        expect(content().style.height).toBe("4000px");
      });
      await rerender({ itemPadding: 10 });
      // (30 + 10 * 2) * 100
      expect(content().style.height).toBe("5000px");
      const second = screen.getByText("Item 1 @1").parentElement as HTMLElement;
      expect(second.style.transform).toBe("translateY(50px)");
    });

    it("renders a hidden measuring item until a height is known (slot too)", () => {
      const { container } = renderList({
        items: makeItems(10),
        itemHeight: undefined,
      });
      const measure = measureRow(container);
      expect(measure).toHaveAttribute("aria-hidden", "true");
      expect(measure).toHaveTextContent("Item 0 @0");
      expect(container.querySelectorAll(".virtualListItem")).toHaveLength(0);

      const slotted = renderList(
        { items: makeItems(10), itemHeight: undefined },
        {
          default: ({ item }: { item: VirtualListItem }) =>
            h("i", `S${item.id}`),
        },
      );
      expect(measureRow(slotted.container)).toHaveTextContent("S0");
    });

    it("measures without ResizeObserver", async () => {
      mockLayout({ offsetHeight: 30 });
      vi.stubGlobal("ResizeObserver", undefined);
      onTestFinished(() => {
        vi.unstubAllGlobals();
      });
      const { container } = renderList({
        items: makeItems(10),
        itemHeight: undefined,
        itemPadding: 0,
      });
      await waitFor(() => {
        expect(
          (container.querySelector(".virtualListContent") as HTMLElement).style
            .height,
        ).toBe("300px");
      });
    });

    it("follows container resizes", async () => {
      let callback: ResizeObserverCallback | undefined;
      const Original = ResizeObserver;
      vi.stubGlobal(
        "ResizeObserver",
        class extends Original {
          constructor(cb: ResizeObserverCallback) {
            super(cb);
            callback ??= cb;
          }
        },
      );
      onTestFinished(() => {
        vi.unstubAllGlobals();
      });
      renderList({ items: makeItems(100), overscan: 0 });
      await nextTick();
      expect(renderedLabels()).toHaveLength(5);
      callback!(
        [{ contentRect: { height: 200 } } as ResizeObserverEntry],
        {} as ResizeObserver,
      );
      await nextTick();
      expect(renderedLabels()).toHaveLength(10);
    });
  });

  describe("scrolling", () => {
    it("updates the rendered window on scroll", async () => {
      const { container } = renderList({ items: makeItems(1000), overscan: 0 });
      await scrollTo(getScroller(container), 400);
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

    it("keeps overscan items before the visible window", async () => {
      const { container } = renderList({ items: makeItems(1000), overscan: 2 });
      await scrollTo(getScroller(container), 400);
      const labels = renderedLabels();
      expect(labels[0]).toBe("Item 18 @18");
      expect(labels).toHaveLength(9);
    });

    it("updates the window via requestAnimationFrame in highPerformance mode", async () => {
      const { container } = renderList({
        items: makeItems(1000),
        overscan: 0,
        highPerformance: true,
      });
      await scrollTo(getScroller(container), 200);
      await waitFor(() => {
        expect(renderedLabels()[0]).toBe("Item 10 @10");
      });
    });

    it("uses requestIdleCallback when available in highPerformance mode", async () => {
      vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
        cb(0);
        return 1;
      });
      vi.stubGlobal(
        "requestIdleCallback",
        vi.fn((cb: IdleRequestCallback) => {
          cb({} as IdleDeadline);
          return 3;
        }),
      );
      onTestFinished(() => {
        vi.unstubAllGlobals();
      });
      const { container } = renderList({
        items: makeItems(1000),
        overscan: 0,
        highPerformance: true,
      });
      await scrollTo(getScroller(container), 200);
      expect(renderedLabels()[0]).toBe("Item 10 @10");
    });

    it("cancels pending highPerformance updates on unmount", async () => {
      const raf = vi
        .spyOn(window, "requestAnimationFrame")
        .mockImplementation(() => 42);
      const cancel = vi.spyOn(window, "cancelAnimationFrame");
      const { container, unmount } = renderList({
        items: makeItems(1000),
        highPerformance: true,
      });
      await scrollTo(getScroller(container), 200);
      expect(raf).toHaveBeenCalledTimes(1);
      await scrollTo(getScroller(container), 210);
      // the previous frame was dropped
      expect(cancel).toHaveBeenCalledWith(42);
      cancel.mockClear();
      unmount();
      expect(cancel).toHaveBeenCalledWith(42);
    });

    it("cancels a pending idle callback on unmount", async () => {
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
      const { container, unmount } = renderList({
        items: makeItems(1000),
        highPerformance: true,
      });
      await scrollTo(getScroller(container), 200);
      rafCallback?.(0);
      unmount();
      expect(cancelIdle).toHaveBeenCalledWith(7);
    });

    it("drops the idle id without cancelIdleCallback", async () => {
      let rafCallback: FrameRequestCallback | undefined;
      vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
        rafCallback = cb;
        return 1;
      });
      vi.stubGlobal(
        "requestIdleCallback",
        vi.fn(() => 7),
      );
      const original = window.cancelIdleCallback;
      // @ts-expect-error removed for the test
      delete window.cancelIdleCallback;
      onTestFinished(() => {
        vi.unstubAllGlobals();
        if (original) window.cancelIdleCallback = original;
      });
      const { container, unmount } = renderList({
        items: makeItems(1000),
        highPerformance: true,
      });
      await scrollTo(getScroller(container), 200);
      rafCallback?.(0);
      expect(() => unmount()).not.toThrow();
    });

    it("emits the native scroll listener of the root", async () => {
      const onScroll = vi.fn();
      const { container } = render(VirtualList, {
        props: {
          items: makeItems(10),
          itemHeight: ITEM_HEIGHT,
          maxHeight: CONTAINER_HEIGHT,
          renderItem,
        },
        attrs: { onScroll },
      });
      await scrollTo(getScroller(container), 20);
      expect(onScroll).toHaveBeenCalledTimes(1);
    });

    it("supports user interaction inside the rows", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      renderList({
        items: makeItems(10),
        renderItem: (item: VirtualListItem) =>
          h("button", { type: "button", onClick: () => onClick(item.id) }, [
            `Select ${item.id}`,
          ]),
      });
      await user.click(screen.getByRole("button", { name: "Select 3" }));
      expect(onClick).toHaveBeenCalledWith(3);
    });
  });

  describe("load more", () => {
    // 20 items * 20px = 400px of content
    const setup = (props: Props = {}) => {
      mockLayout({ scrollHeight: 400 });
      let resolve: () => void = () => {};
      const onLoadMore = vi.fn(
        () =>
          new Promise<void>((r) => {
            resolve = r;
          }),
      );
      const utils = renderList({
        items: makeItems(20),
        loadMoreThreshold: 100,
        onLoadMore,
        ...props,
      });
      return {
        ...utils,
        onLoadMore,
        scroller: getScroller(utils.container),
        resolve: () => resolve(),
      };
    };

    it("calls the load-more listener when scrolling down within the threshold", async () => {
      const { scroller, onLoadMore } = setup();
      await scrollTo(scroller, 100); // 400 - 100 - 100 = 200, outside threshold
      expect(onLoadMore).not.toHaveBeenCalled();
      await scrollTo(scroller, 250); // 400 - 250 - 100 = 50
      expect(onLoadMore).toHaveBeenCalledTimes(1);
    });

    it("does not call it again while a load is pending", async () => {
      const { scroller, onLoadMore, resolve } = setup();
      await scrollTo(scroller, 250);
      await scrollTo(scroller, 280);
      expect(onLoadMore).toHaveBeenCalledTimes(1);
      resolve();
      await new Promise((r) => setTimeout(r, 0));
      await scrollTo(scroller, 290);
      expect(onLoadMore).toHaveBeenCalledTimes(2);
    });

    it("does not call it when scrolling up", async () => {
      const { scroller, onLoadMore } = setup();
      await scrollTo(scroller, 300);
      expect(onLoadMore).toHaveBeenCalledTimes(1);
      onLoadMore.mockClear();
      await scrollTo(scroller, 250);
      expect(onLoadMore).not.toHaveBeenCalled();
    });

    it("does not call it while loading", async () => {
      const { scroller, onLoadMore } = setup({ loading: true });
      await scrollTo(scroller, 250);
      expect(onLoadMore).not.toHaveBeenCalled();
    });

    it("does not call it for content that does not scroll", async () => {
      mockLayout({ scrollHeight: 50, clientHeight: 100 });
      const onLoadMore = vi.fn();
      const { container } = renderList({ items: makeItems(2), onLoadMore });
      await scrollTo(getScroller(container), 10);
      expect(onLoadMore).not.toHaveBeenCalled();
    });

    it("binds a @load-more listener of a template", async () => {
      mockLayout({ scrollHeight: 400 });
      const onMore = vi.fn();
      const Host = defineComponent({
        setup: () => () =>
          h(VirtualList, {
            items: makeItems(20),
            itemHeight: ITEM_HEIGHT,
            maxHeight: CONTAINER_HEIGHT,
            renderItem,
            onLoadMore: onMore,
          }),
      });
      const { container } = render(Host);
      await scrollTo(getScroller(container), 250);
      expect(onMore).toHaveBeenCalledTimes(1);
    });
  });

  describe("regressions", () => {
    it("measures items that arrive after mounting with an empty list", async () => {
      mockLayout({ offsetHeight: 30 });
      const { container, rerender } = renderList({
        items: [],
        itemHeight: undefined,
        itemPadding: 5,
        overscan: 0,
      });
      await rerender({ items: makeItems(100) });
      await waitFor(() => {
        expect(
          (container.querySelector(".virtualListContent") as HTMLElement).style
            .height,
        ).toBe("4000px");
      });
      expect(renderedLabels()).toEqual(["Item 0 @0", "Item 1 @1", "Item 2 @2"]);
    });

    it("tolerates a load-more listener that does not return a promise", async () => {
      mockLayout({ clientHeight: 100, scrollHeight: 400 });
      const onLoadMore = vi.fn(() => undefined);
      const { container } = renderList({ items: makeItems(20), onLoadMore });
      const scroller = getScroller(container);
      await scrollTo(scroller, 250);
      expect(onLoadMore).toHaveBeenCalledTimes(1);
      await new Promise((r) => setTimeout(r, 0));
      // The pending flag was released, so loading more works again
      await scrollTo(scroller, 290);
      expect(onLoadMore).toHaveBeenCalledTimes(2);
    });

    it("disconnects its resize observers on unmount", () => {
      mockLayout({ offsetHeight: 0 });
      const observe = vi.spyOn(ResizeObserver.prototype, "observe");
      const disconnect = vi.spyOn(ResizeObserver.prototype, "disconnect");
      const { unmount } = renderList({
        items: makeItems(5),
        itemHeight: undefined,
      });
      unmount();
      expect(observe.mock.calls.length).toBeGreaterThan(0);
      expect(disconnect.mock.calls.length).toBe(observe.mock.calls.length);
    });
  });

  describe("accessibility", () => {
    it("exposes a labelled list whose items know their real position", async () => {
      renderList({
        items: makeItems(1000),
        overscan: 0,
        "aria-label": "Contacts",
      });
      await nextTick();
      const list = screen.getByRole("list", { name: "Contacts" });
      const items = screen.getAllByRole("listitem");
      expect(list).toContainElement(items[0]);
      expect(items[0]).toHaveAttribute("aria-setsize", "1000");
      expect(items[0]).toHaveAttribute("aria-posinset", "1");
    });

    it("makes the scroll container keyboard focusable", async () => {
      const user = userEvent.setup();
      const { container } = renderList({ items: makeItems(10) });
      await user.tab();
      expect(getScroller(container)).toHaveFocus();
    });

    it("exposes the focusable scroll container as a labelled region", () => {
      const { container } = renderList({
        items: makeItems(10),
        "aria-label": "Contacts",
      });
      expect(screen.getByRole("region", { name: "Contacts" })).toBe(
        getScroller(container),
      );
    });

    it("names the loading indicator", () => {
      renderList({ items: makeItems(5), loading: true });
      const progress = screen.getByRole("progressbar", { name: "Loading" });
      expect(progress).toHaveAttribute("data-minerva", "progress");
      expect(progress).toHaveAttribute("data-variant", "wave");
    });
  });

  it("exposes the scroll container as the root element", () => {
    const list = ref<{ $el: HTMLElement } | null>(null);
    const { container } = render(
      defineComponent({
        setup: () => () =>
          h(VirtualList, {
            ref: list,
            items: makeItems(5),
            itemHeight: ITEM_HEIGHT,
            maxHeight: CONTAINER_HEIGHT,
            renderItem,
          }),
      }),
    );
    expect(list.value!.$el).toBe(getScroller(container));
  });
});

describe("VirtualList localization", () => {
  afterEach(() => {
    setLanguage("en");
  });

  it("translates the loading indicator label", () => {
    setLanguage("zh");
    render(VirtualList, {
      props: {
        items: makeItems(5),
        itemHeight: ITEM_HEIGHT,
        maxHeight: CONTAINER_HEIGHT,
        renderItem,
        loading: true,
      },
    });
    expect(
      screen.getByRole("progressbar", { name: "加载中" }),
    ).toBeInTheDocument();
  });
});
