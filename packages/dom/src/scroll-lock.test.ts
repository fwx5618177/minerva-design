import { Window } from "happy-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getScrollbarGap,
  isScrollLocked,
  lockScroll,
  SCROLLBAR_GAP_VAR,
} from "./scroll-lock";

type ScrollLockModule = typeof import("./scroll-lock");

/** Two independent evaluations of the module (like the ESM + CJS builds). */
const loadTwoCopies = async (): Promise<
  [ScrollLockModule, ScrollLockModule]
> => {
  vi.resetModules();
  const a = await import("./scroll-lock");
  vi.resetModules();
  const b = await import("./scroll-lock");
  expect(a.lockScroll).not.toBe(b.lockScroll);
  return [a, b];
};

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

describe("lockScroll across module copies", () => {
  const preset = () => {
    mockGap(15);
    document.body.style.overflow = "scroll";
    document.body.style.paddingRight = "4px";
    html.style.overflow = "auto";
  };

  const expectLocked = () => {
    expect(document.body.style.overflow).toBe("hidden");
    expect(document.body.style.paddingRight).toBe("19px");
    expect(html.style.overflow).toBe("hidden");
    expect(html.style.getPropertyValue(SCROLLBAR_GAP_VAR)).toBe("15px");
  };

  const expectRestored = () => {
    expect(document.body.style.overflow).toBe("scroll");
    expect(document.body.style.paddingRight).toBe("4px");
    expect(html.style.overflow).toBe("auto");
    expect(html.style.getPropertyValue(SCROLLBAR_GAP_VAR)).toBe("");
  };

  it.each([
    ["A then B", "a"],
    ["B then A", "b"],
  ] as const)(
    "shares the lock count (release %s), restoring only after the last release",
    async (_, first) => {
      const [a, b] = await loadTwoCopies();
      preset();

      const unlockA = a.lockScroll();
      const unlockB = b.lockScroll(document.body);
      // the second lock must not save the locked styles as the originals
      expectLocked();
      expect(a.isScrollLocked()).toBe(true);
      expect(b.isScrollLocked()).toBe(true);

      const [release1, release2] =
        first === "a" ? [unlockA, unlockB] : [unlockB, unlockA];
      release1();
      release1();
      expectLocked();
      expect(a.isScrollLocked()).toBe(true);
      expect(b.isScrollLocked()).toBe(true);

      release2();
      expectRestored();
      expect(a.isScrollLocked()).toBe(false);
      expect(b.isScrollLocked()).toBe(false);
    },
  );

  it("shares nested locks with the statically imported copy", async () => {
    const [, b] = await loadTwoCopies();
    preset();
    const outer = lockScroll();
    const inner1 = b.lockScroll();
    const inner2 = b.lockScroll();
    outer();
    inner1();
    expectLocked();
    inner2();
    expectRestored();
    expect(isScrollLocked()).toBe(false);
  });
});

describe("lockScroll across documents", () => {
  it("locks and restores each document independently", () => {
    mockGap(0);
    const win = new Window();
    const doc = win.document as unknown as Document;
    const html2 = doc.documentElement;
    vi.spyOn(html2, "clientWidth", "get").mockReturnValue(win.innerWidth);
    document.body.style.overflow = "scroll";
    doc.body.style.overflow = "auto";

    const unlockMain = lockScroll();
    const unlockOther = lockScroll(doc.body);
    expect(isScrollLocked(doc.body)).toBe(true);
    expect(doc.body.style.overflow).toBe("hidden");
    expect(html2.style.overflow).toBe("hidden");

    unlockMain();
    expect(document.body.style.overflow).toBe("scroll");
    expect(html.style.overflow).toBe("");
    expect(doc.body.style.overflow).toBe("hidden");
    expect(html2.style.overflow).toBe("hidden");

    const relock = lockScroll();
    unlockOther();
    expect(isScrollLocked(doc.body)).toBe(false);
    expect(doc.body.style.overflow).toBe("auto");
    expect(html2.style.overflow).toBe("");
    expect(html2.style.getPropertyValue(SCROLLBAR_GAP_VAR)).toBe("");
    expect(document.body.style.overflow).toBe("hidden");
    relock();
    expect(document.body.style.overflow).toBe("scroll");
    win.happyDOM.close();
  });
});
