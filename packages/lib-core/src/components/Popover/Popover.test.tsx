import { createRef } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Popover,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "./index";

const setup = () => userEvent.setup({ pointerEventsCheck: 0 });

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
});
