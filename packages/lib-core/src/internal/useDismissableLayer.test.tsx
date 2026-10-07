import { useState, type ReactNode } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { getLayerStack } from "@minerva/core";
import {
  LayerContext,
  useDismissableLayer,
  useLayerParent,
} from "./useDismissableLayer";
import { Portal } from "./Portal";

const setup = () => userEvent.setup({ pointerEventsCheck: 0 });

/** Next tick: core layers ignore the pointer down that opened them. */
const ready = () => act(() => new Promise((r) => setTimeout(r, 0)));

function Layer({
  name,
  onDismiss,
  onEscapeKeyDown,
  parent,
  modal = false,
  children,
}: {
  name: string;
  onDismiss: (name: string) => void;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  parent?: Element | null;
  modal?: boolean;
  children?: ReactNode;
}) {
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  useDismissableLayer(node, {
    parent,
    disableOutsidePointerEvents: modal,
    onEscapeKeyDown,
    onDismiss: () => onDismiss(name),
  });
  return (
    <Portal>
      <LayerContext.Provider value={node}>
        <div ref={setNode} data-testid={name}>
          <button type="button">{name} button</button>
          {children}
        </div>
      </LayerContext.Provider>
    </Portal>
  );
}

describe("useDismissableLayer", () => {
  it("makes React-nested layers children of their enclosing layer, even when portalled", async () => {
    const user = setup();
    const onDismiss = vi.fn();
    render(
      <>
        <button type="button">page</button>
        <Layer name="outer" onDismiss={onDismiss}>
          <Layer name="inner" onDismiss={onDismiss} />
        </Layer>
      </>,
    );
    await ready();
    const stack = getLayerStack();
    expect(stack).toHaveLength(2);
    const outer = screen.getByTestId("outer");
    const inner = screen.getByTestId("inner");
    expect(outer).not.toContainElement(inner);
    expect(stack.find((l) => l.element === inner)?.parent).toBe(outer);

    // A click in the child is inside its parent: only the child dismisses
    // when clicking the parent.
    await user.click(screen.getByRole("button", { name: "inner button" }));
    expect(onDismiss).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "outer button" }));
    // pointer down + focus outside (the test layers never close)
    expect(new Set(onDismiss.mock.calls.flat())).toEqual(new Set(["inner"]));
  });

  it("keeps unrelated layers independent and sends Escape to the topmost only", async () => {
    const user = setup();
    const onDismiss = vi.fn();
    render(
      <>
        <Layer name="a" onDismiss={onDismiss} />
        <Layer name="b" onDismiss={onDismiss} />
      </>,
    );
    await ready();
    expect(getLayerStack().map((l) => l.parent)).toEqual([null, null]);
    // clicking in b is outside a
    await user.click(screen.getByRole("button", { name: "b button" }));
    expect(new Set(onDismiss.mock.calls.flat())).toEqual(new Set(["a"]));
    onDismiss.mockClear();
    await user.keyboard("{Escape}");
    expect(onDismiss.mock.calls).toEqual([["b"]]);
  });

  it("lets handlers cancel the dismissal and reads the latest handler", async () => {
    const user = setup();
    const onDismiss = vi.fn();
    const first = vi.fn((event: KeyboardEvent) => event.preventDefault());
    const second = vi.fn();
    const { rerender } = render(
      <Layer name="l" onDismiss={onDismiss} onEscapeKeyDown={first} />,
    );
    await ready();
    await user.keyboard("{Escape}");
    expect(first).toHaveBeenCalledTimes(1);
    expect(onDismiss).not.toHaveBeenCalled();
    rerender(<Layer name="l" onDismiss={onDismiss} onEscapeKeyDown={second} />);
    await user.keyboard("{Escape}");
    expect(second).toHaveBeenCalledTimes(1);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("disables outside pointer events while modal and unregisters on unmount", async () => {
    const { unmount } = render(<Layer name="m" onDismiss={() => {}} modal />);
    await ready();
    expect(document.body.style.pointerEvents).toBe("none");
    expect(screen.getByTestId("m").style.pointerEvents).toBe("auto");
    unmount();
    expect(document.body.style.pointerEvents).toBe("");
    expect(getLayerStack()).toHaveLength(0);
  });

  it("exposes the enclosing layer element through useLayerParent", () => {
    function Probe() {
      const parent = useLayerParent();
      return <output data-testid="probe">{parent?.id ?? "none"}</output>;
    }
    const element = document.createElement("div");
    element.id = "enclosing";
    const { unmount } = render(
      <LayerContext.Provider value={element}>
        <Probe />
      </LayerContext.Provider>,
    );
    expect(screen.getByTestId("probe")).toHaveTextContent("enclosing");
    unmount();
    render(<Probe />);
    expect(screen.getByTestId("probe")).toHaveTextContent("none");
  });
});
