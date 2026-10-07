import { useState } from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import Popper from "./Popper";
import type { PopperProps } from "./types";

type HarnessProps = Partial<Omit<PopperProps, "anchorEl" | "visible">> & {
  initialVisible?: boolean;
};

const Harness = ({
  initialVisible = false,
  children = "Popper content",
  onVisibleChange,
  ...rest
}: HarnessProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(initialVisible);
  return (
    <div>
      <button ref={setAnchorEl} type="button">
        Anchor
      </button>
      <button type="button">Outside</button>
      <Popper
        anchorEl={anchorEl}
        visible={visible}
        onVisibleChange={(next) => {
          onVisibleChange?.(next);
          setVisible(next);
        }}
        {...rest}
      >
        {children}
      </Popper>
    </div>
  );
};

const rect = (r: Partial<DOMRect>): DOMRect =>
  ({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    toJSON: () => ({}),
    ...r,
  }) as DOMRect;

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Popper", () => {
  it("renders nothing when not visible", () => {
    render(<Harness />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.queryByText("Popper content")).not.toBeInTheDocument();
  });

  it("renders children into a portal on document.body when visible", () => {
    const { container } = render(<Harness initialVisible />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveTextContent("Popper content");
    expect(container).not.toContainElement(dialog);
    expect(dialog.parentElement).toBe(document.body);
  });

  it("wraps children in a content wrapper", () => {
    render(
      <Harness initialVisible>
        <span>Inner</span>
      </Harness>,
    );
    const content = screen.getByText("Inner").parentElement;
    expect(content).toHaveClass("popperContent");
    expect(content?.parentElement).toBe(screen.getByRole("dialog"));
  });

  it("uses role menu for the menu type and dialog otherwise", () => {
    const { rerender } = render(<Harness initialVisible type="menu" />);
    expect(screen.getByRole("menu")).toBeInTheDocument();
    rerender(<Harness initialVisible type="select" />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("applies aria-label, tabIndex and zIndex", () => {
    render(
      <Harness initialVisible ariaLabel="Details" tabIndex={-1} zIndex={42} />,
    );
    const dialog = screen.getByRole("dialog", { name: "Details" });
    expect(dialog).toHaveAttribute("tabindex", "-1");
    expect(dialog).toHaveAttribute("aria-hidden", "false");
    expect(dialog.style.zIndex).toBe("42");
  });

  it("applies variant, type, size, multiline and custom classes", () => {
    render(
      <Harness
        initialVisible
        variant="success"
        type="tooltip"
        size="small"
        multiline
        className="custom"
      />,
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveClass(
      "popper",
      "success",
      "tooltip",
      "small",
      "multiline",
      "visible",
      "scrollable",
      "custom",
    );
    expect(dialog).not.toHaveClass("singleline");
  });

  it("uses singleline and omits scrollable class when configured", () => {
    render(<Harness initialVisible scrollable={false} />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveClass("singleline");
    expect(dialog).not.toHaveClass("scrollable");
  });

  it("uses the preset size dimensions unless width/height are given", () => {
    const { rerender } = render(<Harness initialVisible size="medium" />);
    let dialog = screen.getByRole("dialog");
    expect(dialog.style.width).toBe("300px");
    expect(dialog.style.height).toBe("200px");

    rerender(
      <Harness initialVisible size="medium" width={120} height="5rem" />,
    );
    dialog = screen.getByRole("dialog");
    expect(dialog.style.width).toBe("120px");
    expect(dialog.style.height).toBe("5rem");
  });

  it("applies custom popperStyle", () => {
    render(
      <Harness
        initialVisible
        popperStyle={{ backgroundColor: "red", color: "blue", maxWidth: 250 }}
      />,
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog.style.backgroundColor).toBe("red");
    expect(dialog.style.color).toBe("blue");
    expect(dialog.style.maxWidth).toBe("250px");
  });

  describe("arrow", () => {
    it("does not render an arrow by default", () => {
      render(<Harness initialVisible />);
      expect(
        screen.getByRole("dialog").querySelector(".popperArrow"),
      ).toBeNull();
    });

    it("renders a hidden arrow with the placement and inherited colors", () => {
      render(
        <Harness
          initialVisible
          arrow
          placement="rightStart"
          popperStyle={{ backgroundColor: "green", borderColor: "black" }}
        />,
      );
      const dialog = screen.getByRole("dialog");
      const arrowEl = dialog.querySelector(".popperArrow") as HTMLElement;
      expect(arrowEl).not.toBeNull();
      expect(arrowEl).toHaveAttribute("data-placement", "rightStart");
      expect(arrowEl).toHaveAttribute("aria-hidden", "true");
      expect(arrowEl.style.backgroundColor).toBe("green");
      expect(arrowEl.style.borderColor).toBe("black");
      // Arrow sits outside the content wrapper so it is not clipped.
      expect(arrowEl.parentElement).toBe(dialog);
      expect(dialog.style.overflow).toBe("visible");
    });
  });

  describe("triggers", () => {
    it("toggles on anchor click by default", async () => {
      const user = userEvent.setup();
      const onVisibleChange = vi.fn();
      render(<Harness onVisibleChange={onVisibleChange} />);

      await user.click(screen.getByRole("button", { name: "Anchor" }));
      expect(onVisibleChange).toHaveBeenLastCalledWith(true);
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: "Anchor" }));
      expect(onVisibleChange).toHaveBeenLastCalledWith(false);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("opens on hover and closes on unhover", async () => {
      const user = userEvent.setup();
      const onVisibleChange = vi.fn();
      render(<Harness trigger="hover" onVisibleChange={onVisibleChange} />);
      const anchor = screen.getByRole("button", { name: "Anchor" });

      await user.hover(anchor);
      expect(onVisibleChange).toHaveBeenLastCalledWith(true);
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      await user.unhover(anchor);
      expect(onVisibleChange).toHaveBeenLastCalledWith(false);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("opens on focus and closes on blur", async () => {
      const user = userEvent.setup();
      const onVisibleChange = vi.fn();
      render(<Harness trigger="focus" onVisibleChange={onVisibleChange} />);

      await user.tab();
      expect(screen.getByRole("button", { name: "Anchor" })).toHaveFocus();
      expect(onVisibleChange).toHaveBeenLastCalledWith(true);
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      await user.tab();
      expect(onVisibleChange).toHaveBeenLastCalledWith(false);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("opens on context menu", async () => {
      const user = userEvent.setup();
      const onVisibleChange = vi.fn();
      render(
        <Harness trigger="contextMenu" onVisibleChange={onVisibleChange} />,
      );

      await user.pointer({
        keys: "[MouseRight]",
        target: screen.getByRole("button", { name: "Anchor" }),
      });
      expect(onVisibleChange).toHaveBeenCalledWith(true);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("does not react to anchor interaction in manual mode", async () => {
      const user = userEvent.setup();
      const onVisibleChange = vi.fn();
      render(<Harness trigger="manual" onVisibleChange={onVisibleChange} />);

      const anchor = screen.getByRole("button", { name: "Anchor" });
      await user.click(anchor);
      await user.hover(anchor);
      expect(onVisibleChange).not.toHaveBeenCalled();
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  describe("onClickAway", () => {
    it("fires when clicking outside the popper and anchor", async () => {
      const user = userEvent.setup();
      const onClickAway = vi.fn();
      render(
        <Harness initialVisible trigger="manual" onClickAway={onClickAway} />,
      );

      await user.click(screen.getByRole("button", { name: "Outside" }));
      expect(onClickAway).toHaveBeenCalledTimes(1);
      expect(onClickAway.mock.calls[0][0]).toBeInstanceOf(MouseEvent);
    });

    it("does not fire when clicking inside the popper or on the anchor", async () => {
      const user = userEvent.setup();
      const onClickAway = vi.fn();
      render(
        <Harness initialVisible trigger="manual" onClickAway={onClickAway} />,
      );

      await user.click(screen.getByText("Popper content"));
      await user.click(screen.getByRole("button", { name: "Anchor" }));
      expect(onClickAway).not.toHaveBeenCalled();
    });
  });

  describe("positioning", () => {
    it("positions below the anchor for bottom placement", async () => {
      const root = document.documentElement;
      vi.spyOn(root, "clientWidth", "get").mockReturnValue(1024);
      vi.spyOn(root, "clientHeight", "get").mockReturnValue(768);
      vi.spyOn(
        HTMLElement.prototype,
        "getBoundingClientRect",
      ).mockImplementation(function (this: HTMLElement) {
        if (this.textContent === "Anchor") {
          return rect({
            top: 100,
            left: 100,
            width: 50,
            height: 20,
            bottom: 120,
            right: 150,
          });
        }
        return rect({ width: 20, height: 10 });
      });

      render(<Harness initialVisible trigger="manual" placement="bottom" />);
      const dialog = screen.getByRole("dialog");
      // bottom: anchor.bottom + offset.y (8) + 8; centered horizontally
      await waitFor(() => expect(dialog.style.top).toBe("136px"));
      expect(dialog.style.left).toBe("115px");
    });

    it("settles instead of re-measuring on every animation frame", async () => {
      const spy = vi.spyOn(HTMLElement.prototype, "getBoundingClientRect");
      render(<Harness initialVisible trigger="manual" />);

      await act(() => new Promise((resolve) => setTimeout(resolve, 150)));
      const settledCalls = spy.mock.calls.length;
      await act(() => new Promise((resolve) => setTimeout(resolve, 150)));
      expect(spy.mock.calls.length).toBe(settledCalls);
    });

    it("keeps default offset/animation/popperStyle stable across re-renders", async () => {
      const anchor = document.createElement("button");
      document.body.appendChild(anchor);
      const addSpy = vi.spyOn(window, "addEventListener");
      const { rerender } = render(
        <Popper anchorEl={anchor} visible ariaLabel="First">
          Content
        </Popper>,
      );
      await act(() => new Promise((resolve) => setTimeout(resolve, 50)));
      const resizeListeners = () =>
        addSpy.mock.calls.filter(([type]) => type === "resize").length;
      const initialResizeListeners = resizeListeners();
      const dialog = screen.getByRole("dialog");
      const initialTransition = dialog.style.transition;

      rerender(
        <Popper anchorEl={anchor} visible ariaLabel="Second">
          Content
        </Popper>,
      );
      await act(() => new Promise((resolve) => setTimeout(resolve, 50)));

      // Positioning effect must not re-subscribe when only unrelated props change.
      expect(resizeListeners()).toBe(initialResizeListeners);
      expect(
        screen.getByRole("dialog", { name: "Second" }).style.transition,
      ).toBe(initialTransition);
      expect(initialTransition).toContain("200ms ease");
      anchor.remove();
    });
  });
});
