import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { html } from "lit";
import { getActiveElement } from "@minerva/dom";
import {
  MinervaVirtualList,
  type VirtualListItem,
  type VirtualListRenderItem,
} from "./virtual-list";
import "../../elements/virtual-list";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle } from "../../../tests/utils";

const CONTAINER_HEIGHT = 100;
const ITEM_HEIGHT = 20;

const makeItems = (count: number): VirtualListItem[] =>
  Array.from({ length: count }, (_, i) => ({ id: i }));

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
  resetDevWarnings();
  document.documentElement.removeAttribute("lang");
});

const setup = async (
  attrs = "",
  count = 100,
  renderItem: VirtualListRenderItem = (item: VirtualListItem) =>
    html`<button type="button">Open ${item.id}</button>`,
) => {
  const el = await mount<MinervaVirtualList>(
    `<minerva-virtual-list aria-label="Files" item-height="${ITEM_HEIGHT}" max-height="${CONTAINER_HEIGHT}" ${attrs}></minerva-virtual-list>`,
  );
  el.items = makeItems(count);
  el.renderItem = renderItem;
  await settle();
  return el;
};

const rows = (el: MinervaVirtualList) =>
  Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>("[role=listitem]"));
const region = (el: MinervaVirtualList) => $(el, "[role=region]");

const scrollTo = async (el: MinervaVirtualList, top: number) => {
  const container = region(el);
  container.scrollTop = top;
  container.dispatchEvent(new Event("scroll"));
  await settle();
};

describe("<minerva-virtual-list>", () => {
  it("registers", () => {
    expect(customElements.get("minerva-virtual-list")).toBe(MinervaVirtualList);
  });

  it("renders a focusable named region and a list window with real positions", async () => {
    const el = await setup('overscan="0"');
    const container = region(el);
    expect(container.classList).toContain("virtualList");
    expect(container).toHaveAttribute("tabindex", "0");
    expect(container).toHaveAttribute("aria-label", "Files");
    expect(container.style.maxHeight).toBe("100px");
    const list = $(el, "[role=list]");
    expect(list).toHaveAttribute("aria-label", "Files");
    expect(list.style.height).toBe(`${100 * ITEM_HEIGHT}px`);
    const window = rows(el);
    expect(window).toHaveLength(5);
    expect(window[0]).toHaveAttribute("aria-setsize", "100");
    expect(window[0]).toHaveAttribute("aria-posinset", "1");
    expect(window[0].style.padding).toBe("8px");
    expect(window[0].style.transform).toBe("translateY(0px)");
    expect(window[0].textContent?.trim()).toBe("Open 0");
    expect(window[0].classList).toContain("virtualListItem");
    expect(window[0].hasAttribute("tabindex")).toBe(false);
  });

  it("renders overscan rows and moves the window on scroll", async () => {
    const el = await setup('overscan="2"');
    expect(rows(el)).toHaveLength(5 + 4);
    await scrollTo(el, 500); // row 25 at the top
    const window = rows(el);
    expect(window[0]).toHaveAttribute("aria-posinset", String(25 - 2 + 1));
    expect(window[0].style.transform).toBe(`translateY(${23 * ITEM_HEIGHT}px)`);
  });

  it("keeps the focused row rendered when it scrolls out of the window", async () => {
    const el = await setup('overscan="0"');
    const button = rows(el)[0].querySelector("button")!;
    button.focus();
    await settle();
    await scrollTo(el, 1000);
    const window = rows(el);
    expect(window[0]).toHaveAttribute("aria-posinset", "1");
    expect(window[0].querySelector("button")).toBe(button);
    expect(getActiveElement()).toBe(button);
    expect(window).toHaveLength(6);
  });

  it("activates item content with Enter and Space (content keeps its keys)", async () => {
    const onOpen = vi.fn();
    const el = await setup(
      "",
      10,
      (item) =>
        html`<button type="button" @click=${() => onOpen(item.id)}>
          Open ${item.id}
        </button>`,
    );
    const onItem = vi.fn();
    el.addEventListener("minerva-item-click", onItem);
    rows(el)[0].querySelector("button")!.focus();
    await userEvent.keyboard("{Enter}");
    rows(el)[1].querySelector("button")!.focus();
    await userEvent.keyboard(" ");
    expect(onOpen.mock.calls).toEqual([[0], [1]]);
    expect(onItem).not.toHaveBeenCalled();
  });

  it("clickable rows: focusable, Enter / Space / click fire minerva-item-click", async () => {
    const el = await setup("clickable", 10, (item) => `Row ${item.id}`);
    const onItem = vi.fn();
    el.addEventListener("minerva-item-click", onItem);
    const [first, second] = rows(el);
    expect(first).toHaveAttribute("tabindex", "0");
    expect(first.classList).toContain("clickable");
    first.focus();
    await userEvent.keyboard("{Enter}");
    second.focus();
    await userEvent.keyboard(" ");
    await userEvent.click(second);
    expect(onItem).toHaveBeenCalledTimes(3);
    expect(onItem.mock.calls[0][0].detail).toEqual({
      item: { id: 0 },
      index: 0,
    });
    expect(onItem.mock.calls[1][0].detail.index).toBe(1);
  });

  it("fires minerva-load-more near the bottom, once until items change", async () => {
    const el = await setup("", 10);
    Object.defineProperty(region(el), "scrollHeight", {
      configurable: true,
      get: () => 10 * ITEM_HEIGHT,
    });
    const onMore = vi.fn();
    el.addEventListener("minerva-load-more", onMore);
    await scrollTo(el, 50);
    expect(onMore).toHaveBeenCalledTimes(1);
    await scrollTo(el, 60);
    expect(onMore).toHaveBeenCalledTimes(1);
    el.items = makeItems(20);
    await settle();
    await scrollTo(el, 70);
    expect(onMore).toHaveBeenCalledTimes(2);
  });

  it("loading: aria-busy, localized indicator, no load-more", async () => {
    document.documentElement.lang = "zh";
    const el = await setup("loading", 10);
    expect(region(el)).toHaveAttribute("aria-busy", "true");
    const indicator = $(el, ".loadingWrapper [role=progressbar]");
    expect(indicator.getAttribute("aria-label")).not.toBe("Loading");
    Object.defineProperty(region(el), "scrollHeight", {
      configurable: true,
      get: () => 10 * ITEM_HEIGHT,
    });
    const onMore = vi.fn();
    el.addEventListener("minerva-load-more", onMore);
    await scrollTo(el, 50);
    expect(onMore).not.toHaveBeenCalled();
  });

  it("measures the first item when item-height is omitted", async () => {
    const el = await mount<MinervaVirtualList>(
      `<minerva-virtual-list max-height="100"></minerva-virtual-list>`,
    );
    el.renderItem = (item) => `Row ${item.id}`;
    el.items = makeItems(3);
    await settle();
    // no layout in happy-dom: the measuring element stays until it has a size
    expect($(el, ".measureItem")).toHaveAttribute("aria-hidden", "true");
    expect(rows(el)).toHaveLength(0);
  });

  it("warns in development without renderItem / max-height", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    const el = await mount<MinervaVirtualList>(
      `<minerva-virtual-list item-height="20"></minerva-virtual-list>`,
    );
    el.items = makeItems(2);
    await settle();
    expect(rows(el)[0].textContent?.trim()).toBe("0");
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("renderItem"));
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("max-height"));
  });
});
