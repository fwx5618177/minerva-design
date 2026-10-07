import { act, createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { compile } from "sass";
import { join } from "node:path";
import { afterEach, expect, it, vi } from "vitest";
import { PageTab, PageTabs } from ".";
import { IconButton } from "../IconButton";
import { ContextMenu } from "../Menu";
import styles from "./pageTabs.module.scss";

afterEach(() => {
  vi.restoreAllMocks();
});

const closeButton = (label: string) => (
  <IconButton ariaLabel={label} icon="x" />
);

it("uses the shared tooltip on keyboard focus instead of a duplicate native title", async () => {
  const { container } = render(
    <PageTab value="article" label="Complete article title" active />,
  );
  const trigger = container.querySelector<HTMLButtonElement>(
    `.${styles.trigger}`,
  )!;
  expect(trigger.hasAttribute("title")).toBe(false);
  await act(async () => trigger.focus());
  const tooltip = document.querySelector('[role="tooltip"]');
  expect(tooltip?.textContent).toBe("Complete article title");
  expect(tooltip).toHaveAttribute("data-placement", "bottom-start");
  expect(trigger.getAttribute("aria-describedby")).toBe(tooltip?.id);
  expect(trigger.getAttribute("aria-current")).toBe("page");
  await act(async () => trigger.blur());
  expect(document.querySelector('[role="tooltip"]')).toBeNull();
});

it("exposes disabled presentation state without changing the action control", async () => {
  const { container } = render(
    <PageTab
      value="draft"
      label="Draft"
      disabled
      action={closeButton("Close Draft")}
    />,
  );
  expect(
    container
      .querySelector(`.${styles.pageTab}`)
      ?.hasAttribute("data-disabled"),
  ).toBe(true);
  const trigger = container.querySelector<HTMLButtonElement>(
    `.${styles.trigger}`,
  )!;
  expect(trigger.disabled).toBe(true);
  await act(async () => trigger.focus());
  expect(document.querySelector('[role="tooltip"]')).toBeNull();
  expect(
    container.querySelector<HTMLButtonElement>('[aria-label="Close Draft"]')
      ?.disabled,
  ).toBe(false);
});

it("exposes route navigation without inventing tab panels or nesting controls", () => {
  const select = vi.fn();
  const close = vi.fn();
  const ref = createRef<HTMLDivElement>();
  const { container } = render(
    <PageTabs ariaLabel="Open pages" activeValue="article">
      <PageTab
        value="article"
        label="Article"
        active
        onSelect={select}
        ref={ref}
        icon={<svg data-testid="icon" />}
        action={
          <IconButton ariaLabel="Close Article" icon="x" onClick={close} />
        }
      />
    </PageTabs>,
  );
  const nav = container.querySelector("nav")!;
  expect(nav.getAttribute("aria-label")).toBe("Open pages");
  expect(nav).toHaveClass(styles.pageTabs);
  expect(
    container.querySelector('[role="tablist"], [role="tabpanel"]'),
  ).toBeNull();
  const trigger = container.querySelector<HTMLButtonElement>(
    '[aria-current="page"]',
  )!;
  expect(trigger.textContent).toBe("Article");
  expect(trigger.querySelector("button")).toBeNull();
  expect(trigger.querySelector(`.${styles.icon}`)).toHaveAttribute(
    "aria-hidden",
    "true",
  );
  expect(ref.current?.dataset.value).toBe("article");
  expect(ref.current).toHaveAttribute("data-active");
  act(() => trigger.click());
  expect(select).toHaveBeenCalledTimes(1);
  act(() =>
    container
      .querySelector<HTMLButtonElement>('[aria-label="Close Article"]')!
      .click(),
  );
  expect(close).toHaveBeenCalledTimes(1);
  expect(select).toHaveBeenCalledTimes(1);
  expect(
    container.querySelector(`.${styles.action} [aria-label='Close Article']`),
  ).not.toBeNull();
});

it("forwards context-menu events to the item wrapper and supports disabled selection", () => {
  const context = vi.fn();
  const select = vi.fn();
  const { container } = render(
    <PageTab
      value="draft"
      label="Draft"
      disabled
      onSelect={select}
      onContextMenu={context}
    />,
  );
  act(() => container.querySelector<HTMLButtonElement>("button")!.click());
  expect(select).not.toHaveBeenCalled();
  act(() => {
    container
      .querySelector(`.${styles.pageTab}`)!
      .dispatchEvent(new MouseEvent("contextmenu", { bubbles: true }));
  });
  expect(context).toHaveBeenCalledTimes(1);
  expect(container.querySelector("[aria-current]")).toBeNull();
});

it("keeps global actions outside the scrollable list and hides unnecessary scroll controls", () => {
  const { container } = render(
    <PageTabs
      ariaLabel="Open pages"
      activeValue="draft"
      actions={closeButton("Page menu")}
    >
      <PageTab value="draft" label="Draft" active />
    </PageTabs>,
  );
  expect(
    container.querySelector(`.${styles.list} [aria-label="Page menu"]`),
  ).toBeNull();
  expect(
    container.querySelector(`.${styles.actions} [aria-label="Page menu"]`),
  ).not.toBeNull();
  expect(
    container.querySelector('[aria-label="Scroll pages left"]'),
  ).toBeNull();
  expect(
    container.querySelector('[aria-label="Scroll pages right"]'),
  ).toBeNull();
});

function scrollingGeometry(viewWidth = 200, itemWidth = 200) {
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(
    function (this: HTMLElement) {
      return this.classList.contains(styles.viewport) ? viewWidth : 0;
    },
  );
  vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockImplementation(
    function (this: HTMLElement) {
      return this.classList.contains(styles.viewport) ? 600 : 0;
    },
  );
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
    function (this: HTMLElement) {
      const item = this.classList.contains(styles.pageTab);
      const x = item
        ? 400 - (document.querySelector(`.${styles.viewport}`)?.scrollLeft || 0)
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

it("reveals the active page within its own viewport and updates overflow controls when scrolling", () => {
  scrollingGeometry();
  const { container } = render(
    <PageTabs ariaLabel="Open pages" activeValue="last">
      <PageTab value="last" label="Last" active />
    </PageTabs>,
  );
  const viewport = container.querySelector<HTMLDivElement>(
    `.${styles.viewport}`,
  )!;
  expect(viewport.scrollLeft).toBe(400);
  const left = screen.getByRole("button", { name: "Scroll pages left" });
  const right = screen.getByRole("button", { name: "Scroll pages right" });
  expect(right).toBeDisabled();
  expect(left).not.toBeDisabled();
  act(() => left.click());
  expect(viewport.scrollLeft).toBe(240);
  expect(right).not.toBeDisabled();
  act(() => right.click());
  expect(viewport.scrollLeft).toBe(400);
  act(() => {
    viewport.scrollLeft = 0;
    viewport.dispatchEvent(new Event("scroll"));
  });
  expect(left).toBeDisabled();
});

it("scrolls an item that is left of the viewport back into view", () => {
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(200);
  vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockReturnValue(600);
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
    function (this: HTMLElement) {
      const item = this.classList.contains(styles.pageTab);
      const x = item ? -50 : 0;
      return {
        x,
        y: 0,
        width: item ? 100 : 200,
        height: 48,
        left: x,
        right: x + (item ? 100 : 200),
        top: 0,
        bottom: 48,
        toJSON() {},
      } as DOMRect;
    },
  );
  const { container } = render(
    <PageTabs ariaLabel="Open pages" activeValue="first">
      <PageTab value="first" label="First" active />
    </PageTabs>,
  );
  const viewport = container.querySelector<HTMLDivElement>(
    `.${styles.viewport}`,
  )!;
  // moved left by the 50px the item sticks out
  expect(viewport.scrollLeft).toBe(-50);
});

it("uses custom scroll labels", () => {
  scrollingGeometry();
  render(
    <PageTabs
      ariaLabel="Open pages"
      activeValue="last"
      scrollLeftLabel="Prev"
      scrollRightLabel="Next"
    >
      <PageTab value="last" label="Last" active />
    </PageTabs>,
  );
  expect(screen.getByRole("button", { name: "Prev" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
});

it("returns focus to the current page when a focused item is removed, without stealing unrelated focus", () => {
  const tabs = (removed = false) => (
    <PageTabs ariaLabel="Open pages" activeValue={removed ? "home" : "draft"}>
      <PageTab key="home" value="home" label="Home" active={removed} />
      {!removed && (
        <PageTab
          key="draft"
          value="draft"
          label="Draft"
          active
          action={closeButton("Close Draft")}
        />
      )}
    </PageTabs>
  );
  const { container, rerender } = render(tabs());
  act(() =>
    container
      .querySelector<HTMLButtonElement>('[aria-label="Close Draft"]')!
      .focus(),
  );
  rerender(tabs(true));
  expect(document.activeElement?.getAttribute("aria-current")).toBe("page");
  const outside = document.createElement("button");
  document.body.append(outside);
  act(() => outside.focus());
  rerender(tabs());
  expect(document.activeElement).toBe(outside);
  outside.remove();
});

it("preserves manual scrolling through unrelated parent rerenders", () => {
  scrollingGeometry();
  const tabs = () => (
    <PageTabs ariaLabel="Open pages" activeValue="last">
      <PageTab value="last" label="Last" active />
    </PageTabs>
  );
  const { container, rerender } = render(tabs());
  act(() => screen.getByRole("button", { name: "Scroll pages left" }).click());
  const viewport = container.querySelector(`.${styles.viewport}`)!;
  expect(viewport.scrollLeft).toBe(240);
  rerender(tabs());
  expect(viewport.scrollLeft).toBe(240);
});

it("measures overflowing pages even when the current route has no active item", () => {
  scrollingGeometry();
  const { container } = render(
    <PageTabs ariaLabel="Open pages" activeValue="">
      <PageTab value="last" label="Last" />
    </PageTabs>,
  );
  expect(
    container.querySelector('[aria-label="Scroll pages right"]'),
  ).not.toBeNull();
});

it("aligns an oversized active item consistently instead of alternating its edges", () => {
  scrollingGeometry(150, 200);
  const { container } = render(
    <PageTabs ariaLabel="Open pages" activeValue="last">
      <PageTab value="last" label="Last" active />
    </PageTabs>,
  );
  expect(container.querySelector(`.${styles.viewport}`)!.scrollLeft).toBe(400);
});

it("re-measures when the viewport or list resizes", () => {
  const callbacks: ResizeObserverCallback[] = [];
  const disconnect = vi.fn();
  vi.stubGlobal(
    "ResizeObserver",
    class {
      constructor(cb: ResizeObserverCallback) {
        callbacks.push(cb);
      }
      observe() {}
      disconnect = disconnect;
    },
  );
  const { container, unmount } = render(
    <PageTabs ariaLabel="Open pages" activeValue="a">
      <PageTab value="a" label="A" active />
    </PageTabs>,
  );
  expect(callbacks).toHaveLength(1);
  scrollingGeometry();
  act(() => callbacks[0]([], {} as ResizeObserver));
  expect(container.querySelector(`.${styles.viewport}`)!.scrollLeft).toBe(400);
  unmount();
  expect(disconnect).toHaveBeenCalled();
  vi.unstubAllGlobals();
});

it("works without ResizeObserver", () => {
  vi.stubGlobal("ResizeObserver", undefined);
  render(
    <PageTabs ariaLabel="Open pages" activeValue="a">
      <PageTab value="a" label="A" active />
    </PageTabs>,
  );
  expect(screen.getByRole("navigation")).toBeInTheDocument();
  vi.unstubAllGlobals();
});

it("calls the consumer's capture handlers and ignores focus from portals", () => {
  const onFocusCapture = vi.fn();
  const onContextMenuCapture = vi.fn();
  const { container } = render(
    <PageTabs
      ariaLabel="Open pages"
      activeValue="a"
      onFocusCapture={onFocusCapture}
      onContextMenuCapture={onContextMenuCapture}
    >
      <PageTab value="a" label="A" active />
      <span tabIndex={-1} data-testid="other">
        other
      </span>
    </PageTabs>,
  );
  fireEvent.focus(screen.getByTestId("other"));
  fireEvent.contextMenu(screen.getByTestId("other"));
  fireEvent.contextMenu(container.querySelector(`.${styles.trigger}`)!);
  expect(onFocusCapture).toHaveBeenCalledTimes(1);
  expect(onContextMenuCapture).toHaveBeenCalledTimes(2);
});

it("restores the current page focus after removal through a portaled context menu", async () => {
  let removed = false;
  const tabs = () => (
    <PageTabs ariaLabel="Open pages" activeValue={removed ? "home" : "draft"}>
      <PageTab key="home" value="home" label="Home" active={removed} />
      {!removed && (
        <ContextMenu
          key="draft"
          items={[{ key: "close", label: "Close draft" }]}
          onSelect={() => {
            removed = true;
            rerender(tabs());
          }}
        >
          <PageTab value="draft" label="Draft" active />
        </ContextMenu>
      )}
    </PageTabs>
  );
  const { container, rerender } = render(tabs());
  const trigger = container.querySelector<HTMLButtonElement>(
    '[aria-current="page"]',
  )!;
  act(() => trigger.focus());
  await act(async () => {
    trigger.dispatchEvent(
      new MouseEvent("contextmenu", { bubbles: true, button: 2 }),
    );
  });
  const item = document.querySelector<HTMLElement>('[role="menuitem"]')!;
  expect(item).not.toBeNull();
  act(() => item.focus());
  await act(async () => item.click());
  expect(document.activeElement?.textContent).toBe("Home");
  expect(document.activeElement?.getAttribute("aria-current")).toBe("page");
});

it("keeps the documented geometry (48px nav, 36px items, 8px gaps)", () => {
  const css = compile(join(import.meta.dirname, "pageTabs.module.scss")).css;
  expect(css).toMatch(/\.pageTabs \{[^}]*height: 48px/);
  expect(css).toMatch(/\.pageTab \{[^}]*height: 36px/);
  expect(css).toMatch(/\.list \{[^}]*gap: var\(--space-2\)/);
  expect(css).toMatch(/\.label \{[^}]*text-overflow: ellipsis/);
});
