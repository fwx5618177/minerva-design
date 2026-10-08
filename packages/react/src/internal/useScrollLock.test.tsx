import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { isScrollLocked } from "@minerva/core";
import { useScrollLock } from "./useScrollLock";

function Lock({ enabled }: { enabled: boolean }) {
  useScrollLock(enabled);
  return null;
}

describe("useScrollLock", () => {
  it("locks the page while enabled, nested-safe, and restores it", () => {
    document.body.style.overflow = "scroll";
    const { rerender, unmount } = render(
      <>
        <Lock enabled />
        <Lock enabled={false} />
      </>,
    );
    expect(isScrollLocked()).toBe(true);
    expect(document.body.style.overflow).toBe("hidden");
    rerender(
      <>
        <Lock enabled />
        <Lock enabled />
      </>,
    );
    rerender(
      <>
        <Lock enabled={false} />
        <Lock enabled />
      </>,
    );
    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    expect(isScrollLocked()).toBe(false);
    expect(document.body.style.overflow).toBe("scroll");
    document.body.style.overflow = "";
  });
});
