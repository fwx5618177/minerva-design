// Tooltip asChild triggers, TooltipProvider delays, content class / ref and
// colors / variants.
import { createRef } from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Tooltip, TooltipProvider } from ".";
import type { TooltipProps, TooltipVariant } from ".";

const contentEl = () => document.querySelector<HTMLElement>(".tooltip");

describe("Tooltip asChild and TooltipProvider", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not render the tooltip until the asChild trigger is focused", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Tooltip content="Save draft" asChild>
        <button type="button">Save</button>
      </Tooltip>,
    );
    const trigger = screen.getByRole("button", { name: "Save" });
    // no wrapper element
    expect(container.firstElementChild).toBe(trigger);
    expect(trigger).not.toHaveAttribute("aria-describedby");
    expect(screen.queryByRole("tooltip")).toBeNull();

    await user.tab();
    expect(trigger).toHaveFocus();
    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toHaveTextContent("Save draft");
    expect(trigger).toHaveAttribute("aria-describedby", tooltip.id);
    expect(trigger).toHaveAccessibleDescription("Save draft");
  });

  it("closes on Escape and on blur", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Tooltip content="Hint" asChild>
          <button type="button">Trigger</button>
        </Tooltip>
        <button type="button">Next</button>
      </>,
    );
    await user.tab();
    await screen.findByRole("tooltip");
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("tooltip")).toBeNull());

    await user.tab();
    await user.tab({ shift: true });
    await screen.findByRole("tooltip");
    await user.tab();
    await waitFor(() => expect(screen.queryByRole("tooltip")).toBeNull());
  });

  it("opens on hover only after the configured delay", () => {
    vi.useFakeTimers();
    render(
      <Tooltip content="Delayed" enterDelay={500} asChild>
        <button type="button">Hover me</button>
      </Tooltip>,
    );
    fireEvent.mouseEnter(screen.getByRole("button", { name: "Hover me" }));
    act(() => vi.advanceTimersByTime(499));
    expect(screen.queryByRole("tooltip")).toBeNull();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByRole("tooltip")).toHaveTextContent("Delayed");
  });

  it("applies the placement, content class, arrow and the content ref", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLDivElement>();
    render(
      <Tooltip
        contentRef={ref}
        content="L"
        placement="bottom-start"
        arrow
        variant="glass"
        contentClassName="extra"
        asChild
      >
        <button type="button">T</button>
      </Tooltip>,
    );
    await user.tab();
    await screen.findByRole("tooltip");
    const content = contentEl()!;
    expect(ref.current).toBe(content);
    expect(content).toHaveClass("tooltip", "glass", "arrow", "extra");
    expect(content).toHaveAttribute("data-placement", "bottom-start");
    expect(content.querySelector(".tooltipArrow")).not.toBeNull();
  });

  it.each<TooltipVariant>(["solid", "subtle", "glass"])(
    "applies the %s variant class",
    (variant) => {
      render(
        <Tooltip content="L" variant={variant} defaultOpen>
          <button type="button">T</button>
        </Tooltip>,
      );
      expect(contentEl()).toHaveClass("tooltip", "neutral", variant);
      expect(contentEl()!.querySelector(".tooltipArrow")).toBeNull();
    },
  );

  it.each<NonNullable<TooltipProps["color"]>>([
    "neutral",
    "info",
    "success",
    "warning",
    "danger",
  ])("applies the %s color class", (color) => {
    render(
      <Tooltip content="L" color={color} defaultOpen>
        <button type="button">T</button>
      </Tooltip>,
    );
    expect(contentEl()).toHaveClass("tooltip", color, "solid");
  });

  it("renders only the child when disabled with asChild and never opens", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Never" disabled asChild>
        <button type="button">Plain</button>
      </Tooltip>,
    );
    const trigger = screen.getByRole("button", { name: "Plain" });
    await user.tab();
    await user.hover(trigger);
    expect(trigger).toHaveFocus();
    expect(screen.queryByRole("tooltip")).toBeNull();
    expect(trigger).not.toHaveAttribute("aria-describedby");
  });

  it("keeps the child's own handlers, ref and className with asChild", async () => {
    const user = userEvent.setup();
    const onFocus = vi.fn();
    const onMouseEnter = vi.fn();
    const ref = createRef<HTMLButtonElement>();
    render(
      <Tooltip content="Hi" asChild className="from-tooltip">
        <button
          ref={ref}
          type="button"
          className="own"
          onFocus={onFocus}
          onMouseEnter={onMouseEnter}
        >
          Child
        </button>
      </Tooltip>,
    );
    const trigger = screen.getByRole("button", { name: "Child" });
    expect(ref.current).toBe(trigger);
    expect(trigger).toHaveClass("own", "from-tooltip");
    await user.hover(trigger);
    await user.tab();
    expect(onMouseEnter).toHaveBeenCalled();
    expect(onFocus).toHaveBeenCalled();
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Hi");
  });

  it("falls back to the wrapper when asChild gets a non-element child", () => {
    const { container } = render(
      <Tooltip content="Hi" asChild defaultOpen>
        text
      </Tooltip>,
    );
    expect(container.firstElementChild).toHaveClass("tooltipTrigger");
  });

  it("lets a TooltipProvider set the default delays", async () => {
    vi.useFakeTimers();
    render(
      <TooltipProvider enterDelay={50} leaveDelay={40}>
        <Tooltip content="Inside provider" asChild>
          <button type="button">P</button>
        </Tooltip>
      </TooltipProvider>,
    );
    const trigger = screen.getByRole("button", { name: "P" });
    fireEvent.mouseEnter(trigger);
    act(() => vi.advanceTimersByTime(49));
    expect(screen.queryByRole("tooltip")).toBeNull();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByRole("tooltip")).toHaveTextContent("Inside provider");
    fireEvent.mouseLeave(trigger);
    act(() => vi.advanceTimersByTime(39));
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("an explicit enterDelay wins over the provider", () => {
    vi.useFakeTimers();
    render(
      <TooltipProvider enterDelay={1000}>
        <Tooltip content="Own" enterDelay={10}>
          <button type="button">P</button>
        </Tooltip>
      </TooltipProvider>,
    );
    fireEvent.mouseEnter(screen.getByRole("button", { name: "P" }));
    act(() => vi.advanceTimersByTime(10));
    expect(screen.getByRole("tooltip")).toHaveTextContent("Own");
  });

  it("skips the delay when moving quickly between tooltips of a provider", () => {
    vi.useFakeTimers();
    render(
      <TooltipProvider enterDelay={300} skipDelay={200}>
        <Tooltip content="First" asChild>
          <button type="button">A</button>
        </Tooltip>
        <Tooltip content="Second" asChild>
          <button type="button">B</button>
        </Tooltip>
      </TooltipProvider>,
    );
    const a = screen.getByRole("button", { name: "A" });
    const b = screen.getByRole("button", { name: "B" });
    fireEvent.mouseEnter(a);
    act(() => vi.advanceTimersByTime(300));
    expect(screen.getByRole("tooltip")).toHaveTextContent("First");
    fireEvent.mouseLeave(a);
    act(() => vi.advanceTimersByTime(1));
    expect(screen.queryByRole("tooltip")).toBeNull();
    fireEvent.mouseEnter(b);
    expect(screen.getByRole("tooltip")).toHaveTextContent("Second");
    fireEvent.mouseLeave(b);
    act(() => vi.advanceTimersByTime(500));
    fireEvent.mouseEnter(a);
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("opens immediately with enterDelay 0", () => {
    render(
      <Tooltip content="Now" enterDelay={0}>
        <button type="button">N</button>
      </Tooltip>,
    );
    fireEvent.mouseEnter(screen.getByRole("button", { name: "N" }));
    expect(screen.getByRole("tooltip")).toHaveTextContent("Now");
  });
});

describe("Tooltip followCursor", () => {
  it("anchors to the pointer and follows mouse moves while open", async () => {
    render(
      <Tooltip content="Follow" followCursor enterDelay={0}>
        <button type="button">F</button>
      </Tooltip>,
    );
    fireEvent.mouseEnter(screen.getByRole("button", { name: "F" }), {
      clientX: 10,
      clientY: 20,
    });
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toHaveClass("followCursor");
    act(() => {
      fireEvent.mouseMove(document, { clientX: 40, clientY: 50 });
    });
    await waitFor(() => expect(tooltip).toHaveClass("show"));
  });
});

describe("Tooltip without a TooltipProvider (regression)", () => {
  it("works standalone", async () => {
    render(
      <Tooltip content="Standalone" enterDelay={0} asChild>
        <button type="button">S</button>
      </Tooltip>,
    );
    fireEvent.focus(screen.getByRole("button", { name: "S" }));
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Standalone");
  });
});
