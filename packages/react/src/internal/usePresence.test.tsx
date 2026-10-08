import { useState } from "react";
import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { usePresence } from "./usePresence";

function Panel({ open }: { open: boolean }) {
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const present = usePresence(open, node);
  return present ? (
    <div
      ref={setNode}
      data-testid="panel"
      data-state={open ? "open" : "closed"}
    />
  ) : null;
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("usePresence", () => {
  it("mounts with open and unmounts in the same commit without an exit animation", () => {
    const { rerender } = render(<Panel open={false} />);
    expect(screen.queryByTestId("panel")).toBeNull();
    rerender(<Panel open />);
    expect(screen.getByTestId("panel")).toHaveAttribute("data-state", "open");
    rerender(<Panel open={false} />);
    expect(screen.queryByTestId("panel")).toBeNull();
  });

  it("keeps the element mounted with data-state=closed until the exit animation ends", async () => {
    const { rerender } = render(<Panel open />);
    const panel = screen.getByTestId("panel");
    const original = window.getComputedStyle.bind(window);
    vi.spyOn(window, "getComputedStyle").mockImplementation((el, pseudo) => {
      const style = original(el, pseudo);
      if (el !== panel) return style;
      return {
        ...style,
        animationName: "fade-out",
        animationDuration: "0.2s",
        animationDelay: "0s",
        transitionDuration: "0s",
        transitionDelay: "0s",
      } as CSSStyleDeclaration;
    });
    rerender(<Panel open={false} />);
    expect(panel).toBeInTheDocument();
    expect(panel).toHaveAttribute("data-state", "closed");
    await act(async () => {
      panel.dispatchEvent(new Event("animationend"));
    });
    expect(screen.queryByTestId("panel")).toBeNull();
  });

  it("stays mounted when re-opened during the exit animation", async () => {
    const { rerender } = render(<Panel open />);
    const panel = screen.getByTestId("panel");
    const original = window.getComputedStyle.bind(window);
    vi.spyOn(window, "getComputedStyle").mockImplementation((el, pseudo) =>
      el === panel
        ? ({
            ...original(el, pseudo),
            animationName: "fade-out",
            animationDuration: "200ms",
          } as CSSStyleDeclaration)
        : original(el, pseudo),
    );
    rerender(<Panel open={false} />);
    rerender(<Panel open />);
    await act(async () => {
      panel.dispatchEvent(new Event("animationend"));
    });
    expect(screen.getByTestId("panel")).toHaveAttribute("data-state", "open");
  });
});
