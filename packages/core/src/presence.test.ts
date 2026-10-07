import { afterEach, describe, expect, it, vi } from "vitest";
import { getExitAnimationDuration, waitForExitAnimation } from "./presence";

const make = (style = "") => {
  const el = document.createElement("div");
  el.setAttribute("style", style);
  document.body.appendChild(el);
  return el;
};

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = "";
});

describe("presence", () => {
  it("resolves immediately without animation", async () => {
    const el = make();
    expect(getExitAnimationDuration(el)).toBe(0);
    const resolved = vi.fn();
    void waitForExitAnimation(el).then(resolved);
    await Promise.resolve();
    expect(resolved).toHaveBeenCalled();
  });

  it("ignores durations when animation-name is none", () => {
    const el = make("animation-name: none; animation-duration: 1s");
    expect(getExitAnimationDuration(el)).toBe(0);
  });

  it("measures animations and transitions (largest of each list)", () => {
    expect(
      getExitAnimationDuration(
        make(
          "animation-name: fade; animation-duration: 200ms, 0.3s; animation-delay: 50ms",
        ),
      ),
    ).toBe(350);
    expect(
      getExitAnimationDuration(
        make("transition-duration: 0.5s; transition-delay: bogus"),
      ),
    ).toBe(500);
  });

  it("resolves on animationend from the element itself only", async () => {
    const el = make("animation-name: fade; animation-duration: 10s");
    const child = document.createElement("span");
    el.appendChild(child);
    const resolved = vi.fn();
    const done = waitForExitAnimation(el).then(resolved);

    child.dispatchEvent(new Event("animationend", { bubbles: true }));
    await Promise.resolve();
    expect(resolved).not.toHaveBeenCalled();

    el.dispatchEvent(new Event("animationend"));
    await done;
    expect(resolved).toHaveBeenCalled();
  });

  it("resolves on transitionend", async () => {
    const el = make("transition-duration: 5s");
    const done = waitForExitAnimation(el);
    el.dispatchEvent(new Event("transitionend"));
    await expect(done).resolves.toBeUndefined();
  });

  it("falls back to a timeout", async () => {
    vi.useFakeTimers();
    const el = make("animation-name: fade; animation-duration: 100ms");
    const resolved = vi.fn();
    void waitForExitAnimation(el).then(resolved);
    await vi.advanceTimersByTimeAsync(149);
    expect(resolved).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(2);
    expect(resolved).toHaveBeenCalled();

    const custom = vi.fn();
    void waitForExitAnimation(el, { timeout: 10 }).then(custom);
    await vi.advanceTimersByTimeAsync(11);
    expect(custom).toHaveBeenCalled();
  });
});
