import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { defineComponent, h, nextTick, ref } from "vue";
import { PageTab, PageTabs } from ".";
import { IconButton } from "../IconButton";

afterEach(() => {
  vi.restoreAllMocks();
});

const settle = async () => {
  await nextTick();
  await new Promise((r) => setTimeout(r, 0));
  await nextTick();
};

const closeButton = (label: string, onClick?: () => void) =>
  h(IconButton, { "aria-label": label, onClick }, () => "x");

function scrollingGeometry(viewWidth = 200, itemWidth = 200) {
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(
    function (this: HTMLElement) {
      return this.classList.contains("viewport") ? viewWidth : 0;
    },
  );
  vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockImplementation(
    function (this: HTMLElement) {
      return this.classList.contains("viewport") ? 600 : 0;
    },
  );
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
    function (this: HTMLElement) {
      const item = this.classList.contains("pageTab");
      const x = item
        ? 400 - (document.querySelector(".viewport")?.scrollLeft || 0)
        : 0;
      const width = item ? itemWidth : viewWidth;
      return {
        x,
        y: 0,
        width,
        height: 48,
        left: x,
        right: x + width,
        top: 0,
        bottom: 48,
        toJSON() {},
      } as DOMRect;
    },
  );
}

const single = (props: Record<string, unknown> = {}) =>
  render(PageTabs, {
    props: { activeValue: "last", ...props },
    attrs: { "aria-label": "Open pages" },
    slots: {
      default: () => h(PageTab, { value: "last", label: "Last", active: true }),
    },
  });

describe("PageTab", () => {
  it("uses the shared tooltip on focus instead of a native title", async () => {
    const { container } = render(PageTab, {
      props: {
        value: "article",
        label: "Complete article title",
        active: true,
      },
    });
    const trigger = container.querySelector<HTMLButtonElement>(".trigger")!;
    expect(trigger.hasAttribute("title")).toBe(false);
    expect(trigger).toHaveAttribute("aria-current", "page");
    expect(trigger).toHaveAttribute("data-part", "trigger");
    trigger.focus();
    await settle();
    const tooltip = document.querySelector('[role="tooltip"]');
    expect(tooltip?.textContent).toBe("Complete article title");
    trigger.blur();
    await settle();
  });

  it("exposes the disabled state without disabling the action control", async () => {
    const { container } = render(PageTab, {
      props: { value: "draft", label: "Draft", disabled: true },
      slots: { action: () => closeButton("Close Draft") },
    });
    const root = container.querySelector(".pageTab")!;
    expect(root).toHaveAttribute("data-disabled", "");
    expect(root).toHaveAttribute("data-value", "draft");
    expect(
      container.querySelector<HTMLButtonElement>(".trigger")!.disabled,
    ).toBe(true);
    expect(
      container.querySelector<HTMLButtonElement>('[aria-label="Close Draft"]')!
        .disabled,
    ).toBe(false);
    expect(container.querySelector('[data-part="action"]')).toHaveClass(
      "action",
    );
  });
});

describe("PageTabs", () => {
  it("exposes route navigation without tab panels or nested controls", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const close = vi.fn();
    const onContextmenu = vi.fn();
    const { container } = render(PageTabs, {
      props: { activeValue: "article" },
      attrs: { "aria-label": "Open pages" },
      slots: {
        default: () => [
          h(
            PageTab,
            {
              value: "article",
              label: "Article",
              active: true,
              onSelect,
              onContextmenu,
            },
            {
              icon: () => h("svg", { "data-testid": "icon" }),
              action: () => closeButton("Close Article", close),
            },
          ),
          h(PageTab, { value: "other", label: "Other" }),
        ],
      },
    });
    const nav = screen.getByRole("navigation", { name: "Open pages" });
    expect(nav).toHaveClass("pageTabs");
    expect(nav).toHaveAttribute("data-minerva", "page-tabs");
    expect(container.querySelector('[data-part="viewport"]')).toHaveClass(
      "viewport",
    );
    expect(container.querySelector('[data-part="list"]')).toHaveClass("list");
    expect(screen.queryByRole("tab")).toBeNull();
    expect(screen.queryByRole("tabpanel")).toBeNull();
    const item = container.querySelector(".pageTab")!;
    expect(item).toHaveAttribute("data-current", "");
    expect(item.querySelector('[data-part="icon"]')).toContainElement(
      screen.getByTestId("icon"),
    );
    const trigger = screen.getByRole("button", { name: "Article" });
    expect(trigger.querySelector("button")).toBeNull();
    await user.click(trigger);
    expect(onSelect).toHaveBeenCalledTimes(1);
    await user.click(screen.getByRole("button", { name: "Close Article" }));
    expect(close).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledTimes(1);
    await fireEvent.contextMenu(trigger);
    expect(onContextmenu).toHaveBeenCalled();
  });

  it("keeps global actions outside the list and hides unneeded scroll controls", () => {
    const { container } = render(PageTabs, {
      props: { activeValue: "draft" },
      attrs: { "aria-label": "Open pages" },
      slots: {
        default: () =>
          h(PageTab, { value: "draft", label: "Draft", active: true }),
        actions: () => closeButton("Page menu"),
      },
    });
    expect(
      container.querySelector('.list [aria-label="Page menu"]'),
    ).toBeNull();
    expect(
      container.querySelector('.actions [aria-label="Page menu"]'),
    ).not.toBeNull();
    expect(container.querySelector('[data-part="actions"]')).not.toBeNull();
    expect(
      screen.queryByRole("button", { name: "Scroll pages left" }),
    ).toBeNull();
  });

  it("reveals the active page and updates the overflow controls when scrolling", async () => {
    scrollingGeometry();
    const { container } = single();
    await settle();
    const viewport = container.querySelector<HTMLDivElement>(".viewport")!;
    expect(viewport.scrollLeft).toBe(400);
    const left = screen.getByRole("button", { name: "Scroll pages left" });
    const right = screen.getByRole("button", { name: "Scroll pages right" });
    expect(right).toBeDisabled();
    expect(left).not.toBeDisabled();
    left.click();
    await settle();
    expect(viewport.scrollLeft).toBe(240);
    expect(right).not.toBeDisabled();
    right.click();
    await settle();
    expect(viewport.scrollLeft).toBe(400);
    viewport.scrollLeft = 0;
    viewport.dispatchEvent(new Event("scroll"));
    await settle();
    expect(left).toBeDisabled();
  });

  it("puts the start button on the right in RTL", async () => {
    scrollingGeometry();
    const { container } = render(PageTabs, {
      props: { activeValue: "last" },
      attrs: { "aria-label": "Open pages", dir: "rtl" },
      slots: {
        default: () =>
          h(PageTab, { value: "last", label: "Last", active: true }),
      },
    });
    await settle();
    const labels = Array.from(
      container.querySelectorAll("nav button[aria-label]"),
      (b) => b.getAttribute("aria-label"),
    );
    expect(labels).toEqual(["Scroll pages right", "Scroll pages left"]);
  });

  it("scrolls an item that is left of the viewport back into view", async () => {
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(200);
    vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockReturnValue(600);
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
      function (this: HTMLElement) {
        const item = this.classList.contains("pageTab");
        const x = item ? -50 : 0;
        const width = item ? 100 : 200;
        return {
          x,
          y: 0,
          width,
          height: 48,
          left: x,
          right: x + width,
          top: 0,
          bottom: 48,
          toJSON() {},
        } as DOMRect;
      },
    );
    const { container } = single({ activeValue: "first" });
    await settle();
    expect(
      container.querySelector<HTMLDivElement>(".viewport")!.scrollLeft,
    ).toBe(-50);
  });

  it("aligns an oversized active item on its start edge", async () => {
    scrollingGeometry(200, 300);
    const { container } = single();
    await settle();
    expect(
      container.querySelector<HTMLDivElement>(".viewport")!.scrollLeft,
    ).toBe(400);
  });

  it("uses custom scroll labels", async () => {
    scrollingGeometry();
    single({ scrollLeftLabel: "Prev", scrollRightLabel: "Next" });
    await settle();
    expect(screen.getByRole("button", { name: "Prev" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
  });

  it("returns focus to the current page when a focused item is removed, without stealing unrelated focus", async () => {
    const removed = ref(false);
    const { container } = render(
      defineComponent({
        setup: () => () =>
          h(
            PageTabs,
            {
              "aria-label": "Open pages",
              activeValue: removed.value ? "home" : "draft",
            },
            () => [
              h(PageTab, {
                key: "home",
                value: "home",
                label: "Home",
                active: removed.value,
              }),
              removed.value
                ? null
                : h(
                    PageTab,
                    {
                      key: "draft",
                      value: "draft",
                      label: "Draft",
                      active: true,
                    },
                    { action: () => closeButton("Close Draft") },
                  ),
            ],
          ),
      }),
    );
    container
      .querySelector<HTMLButtonElement>('[aria-label="Close Draft"]')!
      .focus();
    removed.value = true;
    await settle();
    expect(document.activeElement?.getAttribute("aria-current")).toBe("page");
    const outside = document.createElement("button");
    document.body.append(outside);
    outside.focus();
    removed.value = false;
    await settle();
    expect(document.activeElement).toBe(outside);
    outside.remove();
  });

  it("remembers the item of a context menu and ignores focus from outside", async () => {
    const removed = ref(false);
    const { container } = render(
      defineComponent({
        setup: () => () =>
          h(
            PageTabs,
            { "aria-label": "Open pages", activeValue: "home" },
            () => [
              h(PageTab, {
                key: "home",
                value: "home",
                label: "Home",
                active: true,
              }),
              removed.value
                ? null
                : h(PageTab, { key: "draft", value: "draft", label: "Draft" }),
            ],
          ),
      }),
    );
    const nav = container.querySelector("nav")!;
    // focus events that do not come from inside the nav are ignored
    const outside = document.createElement("input");
    document.body.append(outside);
    nav.dispatchEvent(new FocusEvent("focus", { bubbles: false }));
    await fireEvent.contextMenu(nav);
    await fireEvent.contextMenu(screen.getByRole("button", { name: "Draft" }));
    removed.value = true;
    await settle();
    expect(screen.getByRole("button", { name: "Home" })).toHaveFocus();
    outside.remove();
  });

  it("hands focus to the opposite scroll button when the focused one reaches its end", async () => {
    const user = userEvent.setup();
    scrollingGeometry();
    single();
    await settle();
    const left = screen.getByRole("button", { name: "Scroll pages left" });
    const right = screen.getByRole("button", { name: "Scroll pages right" });
    expect(right).toBeDisabled();
    left.focus();
    await user.keyboard("{Enter}");
    await settle();
    await user.keyboard("{Enter}");
    await settle();
    expect(left).toHaveFocus();
    await user.keyboard("{Enter}");
    await settle();
    expect(left).toBeDisabled();
    expect(right).not.toBeDisabled();
    expect(right).toHaveFocus();
  });

  it("re-measures on resize and works without ResizeObserver", async () => {
    const callbacks: (() => void)[] = [];
    const original = globalThis.ResizeObserver;
    globalThis.ResizeObserver = class {
      constructor(cb: () => void) {
        callbacks.push(cb);
      }
      observe() {}
      disconnect() {}
      unobserve() {}
    } as unknown as typeof ResizeObserver;
    const { container, unmount } = single();
    await settle();
    expect(
      screen.queryByRole("button", { name: "Scroll pages left" }),
    ).toBeNull();
    scrollingGeometry();
    callbacks.forEach((cb) => cb());
    await settle();
    expect(
      container.querySelector<HTMLDivElement>(".viewport")!.scrollLeft,
    ).toBe(400);
    expect(
      screen.getByRole("button", { name: "Scroll pages left" }),
    ).toBeVisible();
    unmount();
    // @ts-expect-error simulate a runtime without ResizeObserver
    delete globalThis.ResizeObserver;
    single();
    await settle();
    globalThis.ResizeObserver = original;
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
