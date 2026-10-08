import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MinervaPageTab, MinervaPageTabs } from "./page-tabs";
import "../../elements/page-tabs";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

const trigger = (item: Element) => $<HTMLButtonElement>(item, ".trigger");
const item = (value: string) =>
  document.querySelector<MinervaPageTab>(`minerva-page-tab[value="${value}"]`)!;
const strip = () =>
  document.querySelector<MinervaPageTabs>("minerva-page-tabs")!;
const scrollButton = (side: "left" | "right") =>
  strip().shadowRoot!.querySelector<HTMLButtonElement>(`.scroll-${side}`);

/**
 * happy-dom has no layout: the viewport is 200px wide with 600px of content,
 * and the active item's surface sits at x = 400 - scrollLeft (as the
 * scrollingGeometry helper of lib-core's tests).
 */
function scrollingGeometry(viewWidth = 200, itemWidth = 200) {
  const viewport = () =>
    strip()?.shadowRoot?.querySelector<HTMLElement>(".viewport");
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
      const isItem = this.classList.contains("pageTab");
      const x = isItem ? 400 - (viewport()?.scrollLeft || 0) : 0;
      const width = isItem ? itemWidth : viewWidth;
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

describe("<minerva-page-tabs>", () => {
  it("registers both elements", () => {
    expect(customElements.get("minerva-page-tabs")).toBe(MinervaPageTabs);
    expect(customElements.get("minerva-page-tab")).toBe(MinervaPageTab);
  });

  it("exposes route navigation without tablist semantics or nested controls", async () => {
    const el =
      await mount<MinervaPageTabs>(`<minerva-page-tabs aria-label="Open pages" active-value="article">
      <minerva-page-tab value="article" label="Article"><svg slot="icon"></svg>
        <button slot="action" aria-label="Close Article">x</button></minerva-page-tab>
      <minerva-page-tab value="other" label="Other"></minerva-page-tab>
    </minerva-page-tabs>`);
    const nav = $(el, "nav");
    expect(nav).toHaveClass("pageTabs");
    expect(nav).toHaveAttribute("aria-label", "Open pages");
    expect(document.querySelector('[role="tablist"], [role="tabpanel"]')).toBe(
      null,
    );
    expect(item("article").active).toBe(true);
    expect(item("other").active).toBe(false);
    const button = trigger(item("article"));
    expect(button).toHaveAttribute("aria-current", "page");
    expect(trigger(item("other"))).not.toHaveAttribute("aria-current");
    expect(button.textContent?.trim()).toBe("Article");
    expect(button.querySelector("button")).toBe(null);
    expect($(item("article"), ".icon")).toHaveAttribute("aria-hidden", "true");
    const wrapper = $(item("article"), ".pageTab");
    expect(wrapper.dataset.value).toBe("article");
    expect(wrapper).toHaveAttribute("data-current");
    // the action is a sibling of the label button
    expect($(item("article"), ".action slot[name=action]")).toBeTruthy();
  });

  it("selects a page on click: minerva-select, then active-value follows", async () => {
    const el =
      await mount<MinervaPageTabs>(`<minerva-page-tabs aria-label="Pages" active-value="a">
      <minerva-page-tab value="a" label="A"></minerva-page-tab>
      <minerva-page-tab value="b" label="B"></minerva-page-tab>
    </minerva-page-tabs>`);
    const onSelect = vi.fn();
    el.addEventListener("minerva-select", (e) =>
      onSelect((e as CustomEvent).detail),
    );
    trigger(item("b")).click();
    await settle();
    expect(onSelect).toHaveBeenCalledWith({ value: "b" });
    expect(el.activeValue).toBe("b");
    expect(trigger(item("b"))).toHaveAttribute("aria-current", "page");
  });

  it("keeps active-value when minerva-select is canceled (router guard)", async () => {
    const el =
      await mount<MinervaPageTabs>(`<minerva-page-tabs aria-label="Pages" active-value="a">
      <minerva-page-tab value="a" label="A"></minerva-page-tab>
      <minerva-page-tab value="b" label="B"></minerva-page-tab>
    </minerva-page-tabs>`);
    document.addEventListener("minerva-select", (e) => e.preventDefault(), {
      once: true,
    });
    trigger(item("b")).click();
    await settle();
    expect(el.activeValue).toBe("a");
  });

  it("does not select disabled pages and reflects the disabled state", async () => {
    await mount(`<minerva-page-tabs aria-label="Pages">
      <minerva-page-tab value="draft" label="Draft" disabled></minerva-page-tab>
    </minerva-page-tabs>`);
    const onSelect = vi.fn();
    document.addEventListener("minerva-select", onSelect);
    trigger(item("draft")).click();
    expect(onSelect).not.toHaveBeenCalled();
    expect(trigger(item("draft"))).toBeDisabled();
    expect($(item("draft"), ".pageTab")).toHaveAttribute("data-disabled");
    document.removeEventListener("minerva-select", onSelect);
  });

  it("closable pages render a localized close button firing minerva-close", async () => {
    await mount(`<minerva-page-tabs aria-label="Pages" active-value="a">
      <minerva-page-tab value="a" label="Report" closable></minerva-page-tab>
    </minerva-page-tabs>`);
    const onClose = vi.fn();
    const onSelect = vi.fn();
    document.addEventListener("minerva-close", onClose);
    document.addEventListener("minerva-select", onSelect);
    const close = $<HTMLButtonElement>(item("a"), "[part=close-button]");
    expect(close).toHaveAttribute("aria-label", "Close Report");
    expect(close.closest(".action")).toBeTruthy();
    close.click();
    expect((onClose.mock.calls[0][0] as CustomEvent).detail).toEqual({
      value: "a",
    });
    expect(onSelect).not.toHaveBeenCalled();
    document.removeEventListener("minerva-close", onClose);
    document.removeEventListener("minerva-select", onSelect);
  });

  it("keeps global actions outside the list and hides unneeded scroll buttons", async () => {
    const el =
      await mount<MinervaPageTabs>(`<minerva-page-tabs aria-label="Pages" active-value="d">
      <minerva-page-tab value="d" label="Draft"></minerva-page-tab>
      <button slot="actions" aria-label="Page menu">m</button>
    </minerva-page-tabs>`);
    expect($(el, ".actions slot[name=actions]")).toBeTruthy();
    expect($(el, ".list").querySelector("slot[name=actions]")).toBe(null);
    expect(scrollButton("left")).toBe(null);
    expect(scrollButton("right")).toBe(null);
  });

  it("reveals the active page and updates the scroll buttons when scrolling", async () => {
    scrollingGeometry();
    const el =
      await mount<MinervaPageTabs>(`<minerva-page-tabs aria-label="Pages" active-value="last">
      <minerva-page-tab value="last" label="Last"></minerva-page-tab>
    </minerva-page-tabs>`);
    await settle();
    const viewport = $(el, ".viewport");
    expect(viewport.scrollLeft).toBe(400);
    const left = scrollButton("left")!;
    const right = scrollButton("right")!;
    expect(left).toHaveAttribute("aria-label", "Scroll pages left");
    expect(right).toBeDisabled();
    expect(left).not.toBeDisabled();
    left.click();
    await settle();
    expect(viewport.scrollLeft).toBe(240);
    expect(scrollButton("right")).not.toBeDisabled();
    scrollButton("right")!.click();
    await settle();
    expect(viewport.scrollLeft).toBe(400);
    viewport.scrollLeft = 0;
    viewport.dispatchEvent(new Event("scroll"));
    await settle();
    expect(scrollButton("left")).toBeDisabled();
  });

  it("uses custom and localized scroll labels", async () => {
    scrollingGeometry();
    await mount(`<div lang="fr"><minerva-page-tabs aria-label="Pages" active-value="last" scroll-right-label="Next">
      <minerva-page-tab value="last" label="Last"></minerva-page-tab>
    </minerva-page-tabs></div>`);
    await settle();
    expect(scrollButton("right")).toHaveAttribute("aria-label", "Next");
    expect(scrollButton("left")?.getAttribute("aria-label")).not.toBe(
      "Scroll pages left",
    );
  });

  it("places the start scroll button on the right in RTL", async () => {
    scrollingGeometry();
    const el =
      await mount<MinervaPageTabs>(`<minerva-page-tabs dir="rtl" aria-label="Pages" active-value="last">
      <minerva-page-tab value="last" label="Last"></minerva-page-tab>
    </minerva-page-tabs>`);
    await settle();
    const buttons = Array.from(el.shadowRoot!.querySelectorAll(".scroll"));
    expect(buttons[0]).toHaveClass("scroll-right");
    expect(buttons[1]).toHaveClass("scroll-left");
  });

  it("warns in development without an accessible name", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await mount(`<minerva-page-tabs active-value="a">
      <minerva-page-tab value="a" label="A"></minerva-page-tab>
    </minerva-page-tabs>`);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("aria-label"));
  });
});

describe("<minerva-page-tabs> keyboard", () => {
  it("selects a page with Enter and Space, but not through its action", async () => {
    const user = userEvent.setup();
    await mount(`<minerva-page-tabs aria-label="Pages" active-value="home">
      <minerva-page-tab value="home" label="Home"></minerva-page-tab>
      <minerva-page-tab value="report" label="Report" closable></minerva-page-tab>
    </minerva-page-tabs>`);
    const onSelect = vi.fn();
    const onClose = vi.fn();
    const report = item("report");
    report.addEventListener("minerva-select", (e) => {
      e.preventDefault();
      onSelect();
    });
    report.addEventListener("minerva-close", onClose);
    report.focus();
    expect(report.shadowRoot!.activeElement).toBe(trigger(report));
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onSelect).toHaveBeenCalledTimes(2);
    $<HTMLButtonElement>(report, "[part=close-button]").focus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onClose).toHaveBeenCalledTimes(2);
    expect(onSelect).toHaveBeenCalledTimes(2);
  });

  it("moves focus to the current page when the focused item is closed", async () => {
    const user = userEvent.setup();
    await mount(`<minerva-page-tabs aria-label="Pages" active-value="home">
      <minerva-page-tab value="home" label="Home"></minerva-page-tab>
      <minerva-page-tab value="report" label="Report" closable></minerva-page-tab>
    </minerva-page-tabs>`);
    document.addEventListener(
      "minerva-close",
      (e) => (e.target as Element).remove(),
      { once: true },
    );
    $<HTMLButtonElement>(item("report"), "[part=close-button]").focus();
    await user.keyboard("{Enter}");
    await settle();
    expect(item("report")).toBe(null);
    expect(document.activeElement).toBe(item("home"));
    expect(item("home").shadowRoot!.activeElement).toBe(trigger(item("home")));
  });

  it("does not steal unrelated focus when an item is removed", async () => {
    await mount(`<minerva-page-tabs aria-label="Pages" active-value="home">
      <minerva-page-tab value="home" label="Home"></minerva-page-tab>
      <minerva-page-tab value="report" label="Report"></minerva-page-tab>
    </minerva-page-tabs><button id="outside">x</button>`);
    item("report").focus();
    const outside = document.getElementById("outside")!;
    outside.focus();
    item("report").remove();
    await settle();
    expect(document.activeElement).toBe(outside);
  });

  it("hands focus to the opposite scroll button when the focused one reaches its end", async () => {
    const user = userEvent.setup();
    scrollingGeometry();
    await mount(`<minerva-page-tabs aria-label="Pages" active-value="last">
      <minerva-page-tab value="last" label="Last"></minerva-page-tab>
    </minerva-page-tabs>`);
    await settle();
    expect(scrollButton("right")).toBeDisabled();
    scrollButton("left")!.focus();
    await user.keyboard("{Enter}");
    await settle();
    await user.keyboard("{Enter}");
    await settle();
    expect(strip().shadowRoot!.activeElement).toBe(scrollButton("left"));
    await user.keyboard("{Enter}");
    await settle();
    expect(scrollButton("left")).toBeDisabled();
    expect(scrollButton("right")).not.toBeDisabled();
    expect(strip().shadowRoot!.activeElement).toBe(scrollButton("right"));
  });
});
