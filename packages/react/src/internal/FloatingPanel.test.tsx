import { createRef, useState } from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getLayerStack } from "@minerva/dom";
import { FloatingPanel, type FloatingPanelProps } from "./FloatingPanel";

type HarnessProps = Partial<
  Omit<FloatingPanelProps, "open" | "anchor" | "onDismiss">
> & {
  initialOpen?: boolean;
  onDismiss?: () => void;
};

/** A trigger button anchoring a panel (role="dialog"), like a picker. */
const Harness = ({
  initialOpen = true,
  children = "Panel content",
  onDismiss,
  ...rest
}: HarnessProps) => {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(initialOpen);
  return (
    <div>
      <button ref={setAnchor} type="button" onClick={() => setOpen((o) => !o)}>
        Anchor
      </button>
      <button type="button">Outside</button>
      <FloatingPanel
        open={open}
        anchor={anchor}
        branches={() => [anchor]}
        returnFocusOnEscape={() => anchor}
        role="dialog"
        aria-label="Panel"
        onDismiss={() => {
          onDismiss?.();
          setOpen(false);
        }}
        {...rest}
      >
        {children}
      </FloatingPanel>
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

describe("FloatingPanel", () => {
  it("renders nothing while closed and portals the content when open", async () => {
    const user = userEvent.setup();
    const { container } = render(<Harness initialOpen={false} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Anchor" }));
    const panel = screen.getByRole("dialog", { name: "Panel" });
    expect(container).not.toContainElement(panel);
    expect(panel).toHaveTextContent("Panel content");
  });

  it("forwards the ref and HTML attributes to the panel element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Harness ref={ref} id="panel" className="custom" />);
    const panel = screen.getByRole("dialog");
    expect(ref.current).toBe(panel);
    expect(panel).toHaveAttribute("id", "panel");
    expect(panel).toHaveClass("custom");
    expect(panel.style.position).toBe("fixed");
  });

  it("registers a dismissable layer while open", () => {
    const { unmount } = render(<Harness />);
    expect(getLayerStack().map((l) => l.element)).toContain(
      screen.getByRole("dialog"),
    );
    unmount();
    expect(getLayerStack()).toHaveLength(0);
  });

  it("closes on Escape and returns focus from inside the panel to the anchor", async () => {
    const user = userEvent.setup();
    render(
      <Harness>
        <button type="button">Inside</button>
      </Harness>,
    );
    await user.click(screen.getByRole("button", { name: "Inside" }));
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Anchor" })).toHaveFocus();
  });

  it("keeps the panel open when onEscapeKeyDown prevents the default", async () => {
    const user = userEvent.setup();
    render(<Harness onEscapeKeyDown={(event) => event.preventDefault()} />);
    await user.keyboard("{Escape}");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("closes on a click away, not on clicks inside or on a branch", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<Harness onDismiss={onDismiss} />);
    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

    await user.click(screen.getByText("Panel content"));
    expect(onDismiss).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: "Outside" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // the anchor is a branch: its own click toggles the panel
    await user.click(screen.getByRole("button", { name: "Anchor" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Anchor" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("closes when focus moves outside unless dismissOnFocusOutside is false", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Harness />);
    await user.click(screen.getByRole("button", { name: "Anchor" }));
    await user.click(screen.getByRole("button", { name: "Anchor" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    act(() => screen.getByRole("button", { name: "Outside" }).focus());
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    unmount();

    render(
      <Harness
        dismissOnFocusOutside={false}
        dismissOnPointerDownOutside={false}
      />,
    );
    act(() => screen.getByRole("button", { name: "Outside" }).focus());
    await user.click(screen.getByRole("button", { name: "Outside" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("makes nested panels child layers: Escape closes the innermost only", async () => {
    const user = userEvent.setup();
    const NestedHarness = () => {
      const [inner, setInner] = useState<HTMLButtonElement | null>(null);
      const [innerOpen, setInnerOpen] = useState(true);
      return (
        <Harness>
          <button ref={setInner} type="button">
            Inner anchor
          </button>
          <FloatingPanel
            open={innerOpen}
            anchor={inner}
            role="listbox"
            aria-label="Inner"
            onDismiss={() => setInnerOpen(false)}
          >
            Inner content
          </FloatingPanel>
        </Harness>
      );
    };
    render(<NestedHarness />);
    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
    const [outerLayer, innerLayer] = getLayerStack();
    expect(innerLayer.parent).toBe(outerLayer.element);

    // the inner panel is portalled elsewhere but counts as inside the outer one
    await user.click(screen.getByText("Inner content"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  describe("positioning", () => {
    const mockLayout = (
      anchor: Partial<DOMRect>,
      panel: { width: number; height: number },
    ) => {
      const root = document.documentElement;
      vi.spyOn(root, "clientWidth", "get").mockReturnValue(1024);
      vi.spyOn(root, "clientHeight", "get").mockReturnValue(768);
      vi.spyOn(
        HTMLElement.prototype,
        "getBoundingClientRect",
      ).mockImplementation(function (this: HTMLElement) {
        if (this.textContent === "Anchor") return rect(anchor);
        if (this.getAttribute("role") === "dialog") return rect(panel);
        return rect({});
      });
      // floating-ui reads the floating element's size from offsetWidth/Height
      const size = (dim: "width" | "height") =>
        function (this: HTMLElement) {
          return this.getAttribute("role") === "dialog" ? panel[dim] : 0;
        };
      vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockImplementation(
        size("width"),
      );
      vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockImplementation(
        size("height"),
      );
    };

    it("stays off-screen until positioned, then sits below the anchor", async () => {
      mockLayout(
        { top: 100, left: 100, width: 50, height: 20, bottom: 120, right: 150 },
        { width: 20, height: 10 },
      );
      render(<Harness placement="bottom" />);
      const panel = screen.getByRole("dialog");
      // bottom: anchor.bottom + 8px gap; centered horizontally
      await waitFor(() => expect(panel.style.top).toBe("128px"));
      expect(panel.style.left).toBe("115px");
      expect(panel).toHaveAttribute("data-placement", "bottom");
      expect(panel).toHaveAttribute("data-side", "bottom");
      expect(panel).toHaveAttribute("data-align", "center");
    });

    it("flips to the opposite side when there is no room below", async () => {
      mockLayout(
        { top: 730, bottom: 750, left: 100, right: 150, width: 50, height: 20 },
        { width: 100, height: 80 },
      );
      render(<Harness placement="bottom" />);
      const panel = screen.getByRole("dialog");
      await waitFor(() => expect(panel).toHaveAttribute("data-side", "top"));
      // anchor.top - panel.height - 8px gap
      expect(panel.style.top).toBe("642px");
    });

    it("shifts inside the viewport and flips the alignment near the right edge", async () => {
      mockLayout(
        {
          top: 100,
          bottom: 120,
          left: 990,
          right: 1020,
          width: 30,
          height: 20,
        },
        { width: 200, height: 40 },
      );
      render(<Harness placement="bottom-start" />);
      const panel = screen.getByRole("dialog");
      await waitFor(() =>
        expect(panel).toHaveAttribute("data-placement", "bottom-end"),
      );
      // end-aligned (820px), then kept 8px away from the viewport edge
      expect(panel.style.left).toBe("816px");
    });

    it("keeps the preferred side when flip is disabled", async () => {
      mockLayout(
        { top: 730, bottom: 750, left: 100, right: 150, width: 50, height: 20 },
        { width: 100, height: 80 },
      );
      render(<Harness placement="bottom" flip={false} />);
      const panel = screen.getByRole("dialog");
      await waitFor(() => expect(panel.style.top).toBe("758px"));
      expect(panel).toHaveAttribute("data-side", "bottom");
    });

    it("applies the offset and can match the anchor width", async () => {
      mockLayout(
        {
          top: 100,
          bottom: 120,
          left: 100,
          right: 400,
          width: 300,
          height: 20,
        },
        { width: 100, height: 40 },
      );
      render(
        <Harness
          placement="bottom-start"
          offset={{ mainAxis: 4, crossAxis: 10 }}
          matchAnchorWidth="min"
        />,
      );
      const panel = screen.getByRole("dialog");
      await waitFor(() => expect(panel.style.minWidth).toBe("300px"));
      await waitFor(() => expect(panel.style.top).toBe("124px"));
      expect(panel.style.left).toBe("110px");
    });
  });
});
