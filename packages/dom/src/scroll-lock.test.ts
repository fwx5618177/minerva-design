import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getScrollbarGap,
  isScrollLocked,
  lockScroll,
  SCROLLBAR_GAP_VAR,
} from "./scroll-lock";

const html = document.documentElement;

afterEach(() => {
  vi.restoreAllMocks();
  document.body.removeAttribute("style");
  html.removeAttribute("style");
});

const mockGap = (gap: number) => {
  vi.spyOn(html, "clientWidth", "get").mockReturnValue(window.innerWidth - gap);
};

describe("lockScroll", () => {
  it("locks the page, compensates the scrollbar and restores styles", () => {
    mockGap(15);
    document.body.style.overflow = "scroll";
    document.body.style.paddingRight = "4px";
    html.style.overflow = "auto";

    const unlock = lockScroll();
    expect(isScrollLocked()).toBe(true);
    expect(document.body.style.overflow).toBe("hidden");
    expect(html.style.overflow).toBe("hidden");
    expect(document.body.style.paddingRight).toBe("19px");
    expect(html.style.getPropertyValue(SCROLLBAR_GAP_VAR)).toBe("15px");

    unlock();
    expect(isScrollLocked()).toBe(false);
    expect(document.body.style.overflow).toBe("scroll");
    expect(document.body.style.paddingRight).toBe("4px");
    expect(html.style.overflow).toBe("auto");
    expect(html.style.getPropertyValue(SCROLLBAR_GAP_VAR)).toBe("");
  });

  it("is nested-safe (reference counted) and unlock is idempotent", () => {
    mockGap(0);
    const unlockA = lockScroll(document.body);
    const unlockB = lockScroll();
    expect(document.body.style.paddingRight).toBe("");
    expect(html.style.getPropertyValue(SCROLLBAR_GAP_VAR)).toBe("0px");

    unlockA();
    unlockA();
    expect(document.body.style.overflow).toBe("hidden");
    unlockB();
    expect(document.body.style.overflow).toBe("");
    expect(html.style.overflow).toBe("");
  });

  it("restores a pre-existing gap variable", () => {
    mockGap(0);
    html.style.setProperty(SCROLLBAR_GAP_VAR, "3px");
    const unlock = lockScroll();
    unlock();
    expect(html.style.getPropertyValue(SCROLLBAR_GAP_VAR)).toBe("3px");
  });

  it("locks an arbitrary scroll container without touching <html>", () => {
    const box = document.createElement("div");
    document.body.appendChild(box);
    vi.spyOn(box, "offsetWidth", "get").mockReturnValue(110);
    vi.spyOn(box, "clientWidth", "get").mockReturnValue(100);
    expect(getScrollbarGap(box)).toBe(10);

    const unlock = lockScroll(box);
    expect(isScrollLocked(box)).toBe(true);
    expect(box.style.overflow).toBe("hidden");
    expect(box.style.paddingRight).toBe("10px");
    expect(html.style.overflow).toBe("");
    unlock();
    expect(box.style.overflow).toBe("");
    expect(box.style.paddingRight).toBe("");
    box.remove();
  });
});
