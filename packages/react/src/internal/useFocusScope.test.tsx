import { StrictMode, useState } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useFocusScope, type UseFocusScopeOptions } from "./useFocusScope";

function Scope({ open, ...options }: UseFocusScopeOptions & { open: boolean }) {
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  useFocusScope(node, { enabled: open, ...options });
  return open ? (
    <div ref={setNode} data-testid="scope">
      <button type="button">first</button>
      <button type="button">last</button>
    </div>
  ) : null;
}

const flush = () => act(() => vi.runAllTimers());

beforeEach(() => {
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
});

describe("useFocusScope", () => {
  it("focuses the first tabbable on activation and restores the previous focus", () => {
    const { rerender } = render(
      <>
        <button type="button">opener</button>
        <Scope open={false} />
      </>,
    );
    const opener = screen.getByRole("button", { name: "opener" });
    opener.focus();
    rerender(
      <>
        <button type="button">opener</button>
        <Scope open />
      </>,
    );
    expect(screen.getByRole("button", { name: "first" })).toHaveFocus();
    rerender(
      <>
        <button type="button">opener</button>
        <Scope open={false} />
      </>,
    );
    flush();
    expect(opener).toHaveFocus();
  });

  it("traps and loops Tab / Shift+Tab inside the container", async () => {
    vi.useRealTimers();
    const user = userEvent.setup();
    render(
      <>
        <button type="button">outside</button>
        <Scope open trapped loop />
      </>,
    );
    const first = screen.getByRole("button", { name: "first" });
    const last = screen.getByRole("button", { name: "last" });
    expect(first).toHaveFocus();
    await user.tab();
    expect(last).toHaveFocus();
    await user.tab();
    expect(first).toHaveFocus();
    await user.tab({ shift: true });
    expect(last).toHaveFocus();
    // focus moved programmatically outside is pulled back
    act(() => screen.getByRole("button", { name: "outside" }).focus());
    expect(screen.getByTestId("scope")).toContainElement(
      document.activeElement as HTMLElement,
    );
  });

  it("supports custom auto-focus / restore targets and cancelable handlers", () => {
    const target = document.createElement("button");
    document.body.append(target);
    const onMountAutoFocus = vi.fn((event: Event) => event.preventDefault());
    const onUnmountAutoFocus = vi.fn();
    const { rerender } = render(
      <Scope
        open
        restoreFocus={() => target}
        onMountAutoFocus={onMountAutoFocus}
        onUnmountAutoFocus={onUnmountAutoFocus}
      />,
    );
    expect(onMountAutoFocus).toHaveBeenCalledTimes(1);
    expect(document.activeElement).toBe(document.body);
    rerender(
      <Scope
        open={false}
        restoreFocus={() => target}
        onUnmountAutoFocus={onUnmountAutoFocus}
      />,
    );
    flush();
    expect(onUnmountAutoFocus).toHaveBeenCalledTimes(1);
    expect(target).toHaveFocus();

    // preventDefault() on unmount skips restoring
    const keep = vi.fn((event: Event) => event.preventDefault());
    rerender(<Scope open restoreFocus={target} onUnmountAutoFocus={keep} />);
    act(() => screen.getByRole("button", { name: "last" }).focus());
    rerender(
      <Scope open={false} restoreFocus={target} onUnmountAutoFocus={keep} />,
    );
    flush();
    expect(keep).toHaveBeenCalledTimes(1);
    expect(target).not.toHaveFocus();
    target.remove();
  });

  it("does not restore focus over a deliberate focus move, nor with restoreFocus=false", () => {
    const elsewhere = document.createElement("input");
    document.body.append(elsewhere);
    const opener = document.createElement("button");
    document.body.append(opener);
    opener.focus();
    const { rerender } = render(<Scope open />);
    act(() => elsewhere.focus());
    rerender(<Scope open={false} />);
    flush();
    expect(elsewhere).toHaveFocus();

    opener.focus();
    rerender(<Scope open restoreFocus={false} />);
    rerender(<Scope open={false} restoreFocus={false} />);
    flush();
    expect(document.activeElement).toBe(document.body);
    elsewhere.remove();
    opener.remove();
  });

  it("does not steal focus back after a StrictMode effect replay", () => {
    const opener = document.createElement("button");
    document.body.append(opener);
    opener.focus();
    render(
      <StrictMode>
        <Scope open restoreFocus={opener} />
      </StrictMode>,
    );
    expect(screen.getByRole("button", { name: "first" })).toHaveFocus();
    flush();
    expect(screen.getByRole("button", { name: "first" })).toHaveFocus();
    opener.remove();
  });
});
