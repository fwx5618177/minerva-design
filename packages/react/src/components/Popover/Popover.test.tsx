import { createRef } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { act } from "react";
import { isScrollLocked } from "@minerva/dom";
import {
  Popover,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "./index";

const setup = () => userEvent.setup({ pointerEventsCheck: 0 });

/** Next tick: layers ignore the pointer down that opened them. */
const ready = () => act(() => new Promise((r) => setTimeout(r, 0)));

function Basic(props: {
  arrow?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}) {
  return (
    <Popover open={props.open} onOpenChange={props.onOpenChange}>
      <PopoverTrigger>Filter</PopoverTrigger>
      <PopoverContent
        aria-label="Filters"
        arrow={props.arrow}
        className="extra"
      >
        <label>
          Read <input type="checkbox" />
        </label>
        <PopoverClose>Close</PopoverClose>
      </PopoverContent>
    </Popover>
  );
}

describe("Popover", () => {
  it("is closed by default and opens on trigger click", async () => {
    const user = setup();
    render(<Basic />);
    const trigger = screen.getByRole("button", { name: "Filter" });
    expect(trigger).toHaveAttribute("type", "button");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(screen.queryByRole("dialog")).toBeNull();

    await user.click(trigger);
    const content = screen.getByRole("dialog", { name: "Filters" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("aria-controls", content.id);
    expect(content).toHaveClass("content", "extra");
    expect(content).toHaveAttribute("data-side", "bottom");
    expect(content.querySelector(".arrow")).toBeNull();
  });

  it("moves focus into the content, closes on Escape and returns focus to the trigger", async () => {
    const user = setup();
    render(<Basic />);
    const trigger = screen.getByRole("button", { name: "Filter" });
    await user.click(trigger);
    const content = screen.getByRole("dialog");
    await waitFor(() =>
      expect(content).toContainElement(document.activeElement as HTMLElement),
    );
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(trigger).toHaveFocus();
  });

  it("closes via PopoverClose and by clicking outside", async () => {
    const user = setup();
    render(
      <>
        <button type="button">Elsewhere</button>
        <Basic />
      </>,
    );
    await user.click(screen.getByRole("button", { name: "Filter" }));
    await user.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());

    await user.click(screen.getByRole("button", { name: "Filter" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Elsewhere" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("toggles closed when the trigger is clicked again and opens via keyboard", async () => {
    const user = setup();
    render(<Basic />);
    const trigger = screen.getByRole("button", { name: "Filter" });
    await user.click(trigger);
    await user.click(trigger);
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    trigger.focus();
    await user.keyboard("{Enter}");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("supports controlled open state", async () => {
    const user = setup();
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <Basic open={false} onOpenChange={onOpenChange} />,
    );
    await user.click(screen.getByRole("button", { name: "Filter" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByRole("dialog")).toBeNull();

    rerender(<Basic open onOpenChange={onOpenChange} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders an arrow when arrow is set and forwards the content ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Popover open>
        <PopoverAnchor>
          <span>anchor</span>
        </PopoverAnchor>
        <PopoverTrigger>T</PopoverTrigger>
        <PopoverContent ref={ref} arrow data-k="v">
          body
        </PopoverContent>
      </Popover>,
    );
    const content = screen.getByRole("dialog");
    expect(ref.current).toBe(content);
    expect(content).toHaveAttribute("data-k", "v");
    expect(content.querySelector("svg")).toHaveClass("arrow");
  });

  it("opens initially with defaultOpen and passes side / align through", () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>T</PopoverTrigger>
        <PopoverContent side="top" align="end" aria-label="Menu">
          body
        </PopoverContent>
      </Popover>,
    );
    const content = screen.getByRole("dialog", { name: "Menu" });
    expect(content).toHaveAttribute("data-side", "top");
    expect(content).toHaveAttribute("data-align", "end");
  });

  it("renders inline without a portal when portal={false}", () => {
    const { container } = render(
      <Popover open>
        <PopoverTrigger asChild>
          <button type="button">T</button>
        </PopoverTrigger>
        <PopoverContent portal={false} aria-label="Inline">
          body
        </PopoverContent>
      </Popover>,
    );
    expect(container).toContainElement(
      screen.getByRole("dialog", { name: "Inline" }),
    );
  });

  it("traps focus in modal mode", async () => {
    const user = setup();
    render(
      <>
        <button type="button">Outside</button>
        <Popover modal defaultOpen>
          <PopoverTrigger>T</PopoverTrigger>
          <PopoverContent aria-label="Modal popover">
            <button type="button">One</button>
            <button type="button">Two</button>
          </PopoverContent>
        </Popover>
      </>,
    );
    const content = screen.getByRole("dialog", { name: "Modal popover" });
    for (let i = 0; i < 3; i += 1) {
      await user.tab();
      expect(content).toContainElement(document.activeElement as HTMLElement);
    }
  });

  it("modal mode hides the page, locks scrolling, and still closes on an outside click", async () => {
    const user = setup();
    render(
      <>
        <main>page</main>
        <Popover modal>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent aria-label="Modal panel">
            <button type="button">Inside</button>
          </PopoverContent>
        </Popover>
      </>,
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    const content = screen.getByRole("dialog", { name: "Modal panel" });
    expect(content).toHaveAttribute("aria-modal", "true");
    expect(
      screen.getByText("page").closest('[aria-hidden="true"]'),
    ).not.toBeNull();
    expect(isScrollLocked()).toBe(true);
    expect(document.body.style.pointerEvents).toBe("none");
    await ready();
    await user.click(screen.getByText("page"));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(screen.getByText("page").closest("[aria-hidden]")).toBeNull();
    expect(isScrollLocked()).toBe(false);
    expect(document.body.style.pointerEvents).toBe("");
  });

  it("closes when focus leaves a non-modal popover", async () => {
    const user = setup();
    render(
      <>
        <Basic />
        <input aria-label="Search" />
      </>,
    );
    await user.click(screen.getByRole("button", { name: "Filter" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    act(() => screen.getByRole("textbox", { name: "Search" }).focus());
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(screen.getByRole("textbox", { name: "Search" })).toHaveFocus();
  });

  it("lets handlers keep it open and cancel the auto focus", async () => {
    const user = setup();
    const onEscapeKeyDown = vi.fn((event: KeyboardEvent) =>
      event.preventDefault(),
    );
    const onPointerDownOutside = vi.fn((event: PointerEvent) =>
      event.preventDefault(),
    );
    const onOpenAutoFocus = vi.fn((event: Event) => event.preventDefault());
    render(
      <>
        <button type="button">Elsewhere</button>
        <Popover>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent
            aria-label="Sticky"
            onEscapeKeyDown={onEscapeKeyDown}
            onPointerDownOutside={onPointerDownOutside}
            onFocusOutside={(event) => event.preventDefault()}
            onOpenAutoFocus={onOpenAutoFocus}
          >
            <button type="button">Inside</button>
          </PopoverContent>
        </Popover>
      </>,
    );
    const trigger = screen.getByRole("button", { name: "Open" });
    await user.click(trigger);
    expect(onOpenAutoFocus).toHaveBeenCalledTimes(1);
    expect(trigger).toHaveFocus();
    await ready();
    await user.keyboard("{Escape}");
    await user.click(screen.getByRole("button", { name: "Elsewhere" }));
    expect(onEscapeKeyDown).toHaveBeenCalledTimes(1);
    expect(onPointerDownOutside).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("dialog", { name: "Sticky" })).toBeInTheDocument();
  });

  it("anchors to PopoverAnchor, sizes after it and positions the arrow", async () => {
    render(
      <Popover open>
        <PopoverAnchor data-testid="anchor">field</PopoverAnchor>
        <PopoverTrigger>T</PopoverTrigger>
        <PopoverContent
          aria-label="Anchored"
          matchAnchorWidth="min"
          side="right"
          arrow
        >
          body
        </PopoverContent>
      </Popover>,
    );
    const content = screen.getByRole("dialog", { name: "Anchored" });
    const positioner = content.parentElement!;
    expect(positioner).toHaveClass("positioner");
    expect(positioner.style.position).toBe("fixed");
    // off-screen until the first position is computed, then placed
    await waitFor(() => expect(positioner.style.transform).toBe(""));
    expect(positioner.style.minWidth).toBe("0px");
    expect(content).toHaveAttribute("data-side", "right");
    expect(content.querySelector(".arrowWrapper")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("keeps a forceMount-ed panel mounted while closed", async () => {
    const user = setup();
    render(
      <Popover>
        <PopoverTrigger>T</PopoverTrigger>
        <PopoverContent forceMount aria-label="Kept">
          body
        </PopoverContent>
      </Popover>,
    );
    const content = screen.getByRole("dialog", { name: "Kept" });
    expect(content).toHaveAttribute("data-state", "closed");
    await user.click(screen.getByRole("button", { name: "T" }));
    expect(content).toHaveAttribute("data-state", "open");
    expect(screen.getByRole("button", { name: "T" })).toHaveAttribute(
      "data-state",
      "open",
    );
  });

  it("requires the Popover root", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<PopoverClose />)).toThrow(/inside <Popover>/);
    vi.restoreAllMocks();
  });
});
