import { useState } from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  toCamelPlacement,
  toPlacement,
  useAnchoredPosition,
  type AnchoredPositionOptions,
  type VirtualElement,
} from "./useAnchoredPosition";

const rect = (x: number, y: number, width: number, height: number) => ({
  x,
  y,
  left: x,
  top: y,
  width,
  height,
  right: x + width,
  bottom: y + height,
});

const virtualAnchor = (x: number, y: number): VirtualElement => ({
  getBoundingClientRect: () => rect(x, y, 40, 20),
});

// Stable reference: a new anchor object restarts positioning.
const defaultAnchor = virtualAnchor(100, 100);

function Floating(
  props: Omit<AnchoredPositionOptions, "anchor"> & {
    anchor?: VirtualElement | null;
  },
) {
  const [arrow, setArrow] = useState<HTMLElement | null>(null);
  const {
    setFloating,
    floatingStyles,
    placement,
    arrowStyles,
    isPositioned,
    update,
  } = useAnchoredPosition({
    anchor: props.anchor === undefined ? defaultAnchor : props.anchor,
    arrowElement: props.arrowElement === undefined ? arrow : null,
    ...props,
  });
  return (
    <>
      <button type="button" onClick={update}>
        update
      </button>
      <output
        data-testid="state"
        data-placement={placement}
        data-positioned={isPositioned}
        data-arrow={JSON.stringify(arrowStyles)}
      />
      {props.open && (
        <div ref={setFloating} data-testid="floating" style={floatingStyles}>
          <span ref={setArrow} style={arrowStyles} />
        </div>
      )}
    </>
  );
}

const state = () => screen.getByTestId("state");

describe("useAnchoredPosition", () => {
  it("positions a fixed floating element next to the anchor", async () => {
    // happy-dom has no viewport size: keep the side for exact coordinates.
    render(<Floating open placement="bottom-start" flip={false} />);
    const floating = screen.getByTestId("floating");
    expect(floating.style.position).toBe("fixed");
    // requested placement until the first computation resolves
    expect(state()).toHaveAttribute("data-placement", "bottom-start");
    await waitFor(() =>
      expect(state()).toHaveAttribute("data-positioned", "true"),
    );
    expect(floating.style.left).toBe("100px");
    // anchor bottom (120) + default 8px offset
    expect(floating.style.top).toBe("128px");
    expect(
      floating.style.getPropertyValue("--minerva-transform-origin"),
    ).not.toBe("");
  });

  it("applies offsets and recomputes on demand", async () => {
    render(
      <Floating
        open
        placement="right"
        offset={{ mainAxis: 4, crossAxis: 2 }}
        flip={false}
        shift={false}
      />,
    );
    const floating = screen.getByTestId("floating");
    await waitFor(() =>
      expect(state()).toHaveAttribute("data-positioned", "true"),
    );
    // anchor right (140) + 4
    expect(floating.style.left).toBe("144px");
    expect(state()).toHaveAttribute("data-placement", "right");
    await act(async () => {
      screen.getByRole("button", { name: "update" }).click();
    });
    expect(floating.style.left).toBe("144px");
  });

  it("is not positioned while closed or without an anchor", async () => {
    const { rerender } = render(<Floating open={false} />);
    expect(state()).toHaveAttribute("data-positioned", "false");
    expect(state()).toHaveAttribute("data-arrow", "{}");
    // update() is a no-op while closed
    screen.getByRole("button", { name: "update" }).click();
    rerender(<Floating open anchor={null} />);
    await act(async () => {});
    expect(state()).toHaveAttribute("data-positioned", "false");
    expect(screen.getByTestId("floating").style.left).toBe("0px");
    expect(screen.getByTestId("floating").style.top).toBe("0px");
  });

  it("sizes the floating element after the anchor", async () => {
    render(<Floating open matchAnchorWidth="exact" fitViewportHeight />);
    const floating = screen.getByTestId("floating");
    await waitFor(() => expect(floating.style.width).toBe("40px"));
    expect(floating.style.maxHeight).not.toBe("");
  });

  it("converts placements between camelCase and kebab-case", () => {
    expect(toPlacement("bottomStart")).toBe("bottom-start");
    expect(toPlacement("top")).toBe("top");
    expect(toPlacement("left-end")).toBe("left-end");
    expect(toCamelPlacement("right-end")).toBe("rightEnd");
    expect(toCamelPlacement("bottom")).toBe("bottom");
  });
});
