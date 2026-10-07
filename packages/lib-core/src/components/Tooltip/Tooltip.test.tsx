import { createRef } from "react";
import type React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Tooltip from "./Tooltip";
import type { TooltipRef } from "./types";

const getTrigger = () => screen.getByRole("button", { name: "Trigger" });

describe("Tooltip", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  const setup = () =>
    userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

  it("keeps the child as the only interactive element", () => {
    const { container } = render(
      <Tooltip content="Hello" ariaLabel="Tip">
        <button type="button">Trigger</button>
      </Tooltip>,
    );
    expect(screen.getAllByRole("button")).toHaveLength(1);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass("tooltipTrigger");
    expect(wrapper).not.toHaveAttribute("role");
    expect(wrapper).not.toHaveAttribute("tabindex");
    expect(wrapper).not.toHaveAttribute("aria-label");
    expect(getTrigger()).not.toHaveAttribute("aria-describedby");
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("does not swallow Enter/Space so the wrapped button still activates", async () => {
    const user = setup();
    const onClick = vi.fn();
    const onKeyDown = vi.fn((e: React.KeyboardEvent) => e.defaultPrevented);
    render(
      <Tooltip content="Hello" ariaLabel="Tip">
        <button type="button" onClick={onClick} onKeyDown={onKeyDown}>
          Trigger
        </button>
      </Tooltip>,
    );

    await user.tab();
    expect(getTrigger()).toHaveFocus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(2);
    expect(onKeyDown.mock.results.every((r) => r.value === false)).toBe(true);
  });

  it("gives each instance a unique tooltip id referenced by aria-describedby", () => {
    render(
      <>
        <Tooltip content="First" defaultOpen>
          <button type="button">One</button>
        </Tooltip>
        <Tooltip content="Second" defaultOpen>
          <button type="button">Two</button>
        </Tooltip>
      </>,
    );
    const [first, second] = screen.getAllByRole("tooltip");
    expect(first.id).toBeTruthy();
    expect(second.id).toBeTruthy();
    expect(first.id).not.toBe(second.id);
    expect(first.id).not.toBe("tooltip");
    expect(document.querySelectorAll(`#${first.id}`)).toHaveLength(1);
    expect(screen.getByRole("button", { name: "One" })).toHaveAttribute(
      "aria-describedby",
      first.id,
    );
    expect(screen.getByRole("button", { name: "Two" })).toHaveAttribute(
      "aria-describedby",
      second.id,
    );
    expect(
      screen.getByRole("button", { name: "One" }),
    ).toHaveAccessibleDescription("First");
  });

  it("merges an existing aria-describedby on the child", () => {
    render(
      <Tooltip content="Hello" defaultOpen>
        <button type="button" aria-describedby="hint">
          Trigger
        </button>
      </Tooltip>,
    );
    const tooltip = screen.getByRole("tooltip");
    expect(getTrigger()).toHaveAttribute(
      "aria-describedby",
      `hint ${tooltip.id}`,
    );
  });

  it("puts aria-describedby on the wrapper for non-element children", () => {
    const { container } = render(
      <Tooltip content="Hello" defaultOpen>
        plain text
      </Tooltip>,
    );
    expect(container.firstElementChild).toHaveAttribute(
      "aria-describedby",
      screen.getByRole("tooltip").id,
    );
  });

  it("shows after enterDelay on hover and hides on unhover", async () => {
    const user = setup();
    const onOpen = vi.fn();
    const onClose = vi.fn();
    render(
      <Tooltip
        content="Hello"
        ariaLabel="Trigger"
        enterDelay={300}
        leaveDelay={100}
        onOpen={onOpen}
        onClose={onClose}
      >
        <button type="button">Trigger</button>
      </Tooltip>,
    );

    await user.hover(getTrigger());
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(300);
    });
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toHaveTextContent("Hello");
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(getTrigger()).toHaveAttribute("aria-describedby", tooltip.id);

    await user.unhover(getTrigger());
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("cancels opening if the pointer leaves before enterDelay", async () => {
    const user = setup();
    const onOpen = vi.fn();
    render(
      <Tooltip content="Hello" ariaLabel="Trigger" onOpen={onOpen}>
        <button type="button">Trigger</button>
      </Tooltip>,
    );

    await user.hover(getTrigger());
    await user.unhover(getTrigger());
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    expect(onOpen).not.toHaveBeenCalled();
  });

  it("adds the show class once positioned", async () => {
    render(
      <Tooltip content="Hello" ariaLabel="Trigger" defaultOpen>
        <button type="button">Trigger</button>
      </Tooltip>,
    );
    await waitFor(() =>
      expect(screen.getByRole("tooltip")).toHaveClass("show"),
    );
  });

  it("does not open when disabled", async () => {
    const user = setup();
    const onOpen = vi.fn();
    render(
      <Tooltip content="Hello" ariaLabel="Trigger" disabled onOpen={onOpen}>
        <button type="button">Trigger</button>
      </Tooltip>,
    );

    await user.hover(getTrigger());
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    await user.tab();
    expect(getTrigger()).toHaveFocus();
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    expect(onOpen).not.toHaveBeenCalled();
  });

  it("opens on keyboard focus, closes on Escape and on blur", async () => {
    const user = setup();
    const onOpen = vi.fn();
    const onClose = vi.fn();
    render(
      <Tooltip
        content="Hello"
        ariaLabel="Trigger"
        onOpen={onOpen}
        onClose={onClose}
      >
        <button type="button">Trigger</button>
      </Tooltip>,
    );

    await user.tab();
    expect(getTrigger()).toHaveFocus();
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    expect(onOpen).toHaveBeenCalledTimes(1);

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalledTimes(1);

    await user.tab({ shift: true });
    await user.tab();
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    expect(onOpen).toHaveBeenCalledTimes(2);

    await user.tab();
    expect(getTrigger()).not.toHaveFocus();
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it("ignores Escape when already closed", async () => {
    const user = setup();
    const onClose = vi.fn();
    render(
      <Tooltip content="Hello" ariaLabel="Trigger" onClose={onClose}>
        <button type="button">Trigger</button>
      </Tooltip>,
    );
    await user.tab();
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("respects the controlled open prop", async () => {
    const user = setup();
    const { rerender } = render(
      <Tooltip content="Hello" ariaLabel="Trigger" open={false}>
        <button type="button">Trigger</button>
      </Tooltip>,
    );
    await user.hover(getTrigger());
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    rerender(
      <Tooltip content="Hello" ariaLabel="Trigger" open>
        <button type="button">Trigger</button>
      </Tooltip>,
    );
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("exposes open, close and toggle via ref", () => {
    const ref = createRef<TooltipRef>();
    render(
      <Tooltip ref={ref} content="Hello" ariaLabel="Trigger">
        <button type="button">Trigger</button>
      </Tooltip>,
    );

    act(() => ref.current?.open());
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    act(() => ref.current?.close());
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    act(() => ref.current?.toggle());
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    act(() => ref.current?.toggle());
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("applies variant, shape, animation, arrow and style props", () => {
    render(
      <Tooltip
        content="Hello"
        ariaLabel="Trigger"
        defaultOpen
        variant="success"
        shape="rounded"
        animation="scale"
        arrow
        bgColor="rgb(1, 2, 3)"
        textColor="white"
        zIndex={99}
        className="custom-trigger"
      >
        <button type="button">Trigger</button>
      </Tooltip>,
    );
    expect(getTrigger().parentElement).toHaveClass(
      "tooltipTrigger",
      "custom-trigger",
    );

    const tooltip = screen.getByRole("tooltip", { name: "Trigger" });
    expect(tooltip).toHaveClass("tooltip", "success", "rounded", "arrow");
    expect(tooltip).toHaveClass("animation-scale");
    expect(tooltip.style.backgroundColor).toBe("rgb(1, 2, 3)");
    expect(tooltip.style.color).toBe("white");
    expect(tooltip.style.zIndex).toBe("99");

    const arrowEl = tooltip.querySelector(".tooltipArrow") as HTMLElement;
    expect(arrowEl).not.toBeNull();
    expect(arrowEl.style.backgroundColor).toBe("rgb(1, 2, 3)");
  });

  it("uses the background shorthand for gradient colors", () => {
    render(
      <Tooltip
        content="Hello"
        ariaLabel="Trigger"
        defaultOpen
        bgColor="linear-gradient(red, blue)"
      >
        <button type="button">Trigger</button>
      </Tooltip>,
    );
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip.style.background).toContain("linear-gradient");
    expect(tooltip.querySelector(".tooltipArrow")).toBeNull();
  });

  it("settles instead of re-measuring on every animation frame", async () => {
    vi.useRealTimers();
    const spy = vi.spyOn(HTMLElement.prototype, "getBoundingClientRect");
    render(
      <Tooltip content="Hello" ariaLabel="Trigger" defaultOpen>
        <button type="button">Trigger</button>
      </Tooltip>,
    );

    await act(() => new Promise((resolve) => setTimeout(resolve, 150)));
    const settledCalls = spy.mock.calls.length;
    await act(() => new Promise((resolve) => setTimeout(resolve, 150)));
    expect(spy.mock.calls.length).toBe(settledCalls);
  });

  describe("React 19 / positioning", () => {
    const rect = (r: Partial<DOMRect>) =>
      ({
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0,
        toJSON: () => ({}),
        ...r,
      }) as DOMRect;

    it("flips below the trigger when there is no room above", async () => {
      vi.spyOn(document.documentElement, "clientWidth", "get").mockReturnValue(
        1024,
      );
      vi.spyOn(document.documentElement, "clientHeight", "get").mockReturnValue(
        768,
      );
      vi.spyOn(
        HTMLElement.prototype,
        "getBoundingClientRect",
      ).mockImplementation(function (this: HTMLElement) {
        return this.classList.contains("tooltipTrigger")
          ? rect({
              top: 4,
              bottom: 24,
              left: 100,
              right: 160,
              width: 60,
              height: 20,
            })
          : rect({});
      });
      vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockImplementation(
        function (this: HTMLElement) {
          return this.getAttribute("role") === "tooltip" ? 30 : 0;
        },
      );
      render(
        <Tooltip content="Hello" defaultOpen placement="top">
          <button type="button">Trigger</button>
        </Tooltip>,
      );
      const tooltip = screen.getByRole("tooltip");
      await waitFor(() =>
        expect(tooltip).toHaveAttribute("data-placement", "bottom"),
      );
      expect(tooltip.style.top).toBe("32px");
    });

    const mockLayout = () => {
      vi.spyOn(document.documentElement, "clientWidth", "get").mockReturnValue(
        1024,
      );
      vi.spyOn(document.documentElement, "clientHeight", "get").mockReturnValue(
        768,
      );
      // Trigger: 60x20 at (100, 200); the tooltip measures 0x30.
      vi.spyOn(
        HTMLElement.prototype,
        "getBoundingClientRect",
      ).mockImplementation(function (this: HTMLElement) {
        return this.classList.contains("tooltipTrigger")
          ? rect({
              x: 100,
              y: 200,
              top: 200,
              bottom: 220,
              left: 100,
              right: 160,
              width: 60,
              height: 20,
            })
          : rect({});
      });
      vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockImplementation(
        function (this: HTMLElement) {
          return this.getAttribute("role") === "tooltip" ? 30 : 0;
        },
      );
    };

    it("uses offset [x, y] as cross / main axis for top placements", async () => {
      mockLayout();
      render(
        <Tooltip content="Hello" defaultOpen placement="top" offset={[12, 20]}>
          <button type="button">Trigger</button>
        </Tooltip>,
      );
      const tooltip = screen.getByRole("tooltip");
      // top: 200 - 30 (height) - 20 (y gap); left: 130 (trigger center) + 12
      await waitFor(() => expect(tooltip.style.top).toBe("150px"));
      expect(tooltip).toHaveAttribute("data-placement", "top");
      expect(tooltip.style.left).toBe("142px");
    });

    it("uses offset [x, y] as main / cross axis for right placements", async () => {
      mockLayout();
      render(
        <Tooltip content="Hello" defaultOpen placement="right" offset={[16, 4]}>
          <button type="button">Trigger</button>
        </Tooltip>,
      );
      const tooltip = screen.getByRole("tooltip");
      // left: 160 (trigger right) + 16 (x gap); top: 210 - 15 (half height) + 4
      await waitFor(() => expect(tooltip.style.left).toBe("176px"));
      expect(tooltip).toHaveAttribute("data-placement", "right");
      expect(tooltip.style.top).toBe("199px");
    });

    it("adds the arrow gap to the offset main axis", async () => {
      mockLayout();
      render(
        <Tooltip
          content="Hello"
          defaultOpen
          placement="top"
          offset={[0, 20]}
          arrow
        >
          <button type="button">Trigger</button>
        </Tooltip>,
      );
      const tooltip = screen.getByRole("tooltip");
      // 200 - 30 - (20 + 6 arrow gap)
      await waitFor(() => expect(tooltip.style.top).toBe("144px"));
      expect(tooltip.style.left).toBe("130px");
    });

    it("dismisses with Escape even when opened by hover (focus elsewhere)", async () => {
      const user = setup();
      render(
        <Tooltip content="Hello" enterDelay={0}>
          <button type="button">Trigger</button>
        </Tooltip>,
      );
      await user.hover(getTrigger());
      await act(() => vi.advanceTimersByTimeAsync(10));
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
      await user.keyboard("{Escape}");
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });

    it("reports requested changes through onOpenChange when controlled", async () => {
      const user = setup();
      const onOpenChange = vi.fn();
      render(
        <Tooltip content="Hello" open={false} onOpenChange={onOpenChange}>
          <button type="button">Trigger</button>
        </Tooltip>,
      );
      await user.tab();
      expect(onOpenChange).toHaveBeenCalledExactlyOnceWith(true);
      // still controlled: stays closed until the parent says otherwise
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });
});
