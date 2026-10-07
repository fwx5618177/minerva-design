// Ported from novel-isr-ui src/components/Drawer/__test__/Drawer.test.tsx
import { createRef, useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTrigger,
} from "./index";

const setup = () => userEvent.setup({ pointerEventsCheck: 0 });

describe("Drawer (all-in-one)", () => {
  it("renders nothing when closed", () => {
    render(
      <Drawer open={false} title="Filters">
        body
      </Drawer>,
    );
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.queryByText("body")).toBeNull();
  });

  it("renders a modal dialog labelled by the title with side/size classes and a hidden description", () => {
    render(
      <Drawer open title="Filters" side="left" size="large">
        <DrawerBody>body</DrawerBody>
      </Drawer>,
    );
    const dialog = screen.getByRole("dialog", { name: "Filters" });
    expect(dialog).toHaveClass(
      "content",
      "left",
      "large",
      "ui-drawer-content",
      "ui-drawer-side-left",
      "ui-drawer-size-lg",
    );
    expect(dialog).toHaveAttribute("data-side", "left");
    expect(dialog).toHaveAttribute("data-size", "large");
    expect(screen.getByText("Filters")).toHaveClass(
      "header",
      "ui-drawer-header",
    );
    const desc = screen.getByText("Drawer content");
    expect(desc).toHaveClass("visuallyHidden", "ui-visually-hidden");
    expect(dialog).toHaveAttribute("aria-describedby", desc.id);
    expect(screen.getByText("body")).toHaveClass("body", "ui-drawer-body");
    expect(document.querySelector(".ui-drawer-overlay")).toHaveClass("overlay");
  });

  it("defaults to right/medium and renders a visible description when provided", () => {
    render(
      <Drawer open title="T" description="Narrow the list">
        x
      </Drawer>,
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveClass("ui-drawer-side-right", "ui-drawer-size-md");
    expect(screen.getByText("Narrow the list")).toHaveClass(
      "description",
      "ui-drawer-description",
    );
    expect(dialog).toHaveAccessibleDescription("Narrow the list");
  });

  it.each([
    ["small", "sm"],
    ["full", "full"],
  ] as const)("maps size %s to the ui-drawer-size-%s hook", (size, hook) => {
    render(<Drawer open title="T" side="top" size={size} />);
    expect(screen.getByRole("dialog")).toHaveClass(
      "top",
      size,
      `ui-drawer-size-${hook}`,
    );
  });

  it("requests closing from the close button, Escape and outside overlay click", async () => {
    const user = setup();
    const onOpenChange = vi.fn();
    render(
      <Drawer open onOpenChange={onOpenChange} title="T">
        x
      </Drawer>,
    );
    const close = screen.getByRole("button", { name: "Close" });
    expect(close).toHaveAttribute("type", "button");
    expect(close).toHaveClass("close", "ui-drawer-close");
    await user.click(close);
    expect(onOpenChange).toHaveBeenNthCalledWith(1, false);
    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledTimes(2);
    await user.click(
      document.querySelector<HTMLElement>(".ui-drawer-overlay")!,
    );
    expect(onOpenChange).toHaveBeenCalledTimes(3);
  });

  it("hides the close button when hideCloseButton is set and accepts a custom close label", () => {
    const { rerender } = render(
      <Drawer open title="T" hideCloseButton>
        x
      </Drawer>,
    );
    expect(screen.queryByRole("button", { name: "Close" })).toBeNull();
    rerender(
      <Drawer open title="T" closeLabel="Dismiss" className="extra">
        x
      </Drawer>,
    );
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toHaveClass("extra");
    rerender(
      <Drawer open title="T" hiddenDescription="Filter panel">
        x
      </Drawer>,
    );
    expect(screen.getByRole("dialog")).toHaveAccessibleDescription(
      "Filter panel",
    );
  });

  it("moves focus into the drawer, unmounts it on Escape and restores the opener", async () => {
    const user = setup();
    function Harness() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Open
          </button>
          <Drawer open={open} onOpenChange={setOpen} title="Settings">
            <DrawerBody>
              <input aria-label="Name" />
            </DrawerBody>
          </Drawer>
        </>
      );
    }
    render(<Harness />);
    const opener = screen.getByRole("button", { name: "Open" });
    await user.click(opener);
    const dialog = screen.getByRole("dialog", { name: "Settings" });
    expect(dialog).toContainElement(document.activeElement as HTMLElement);
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(opener).toHaveFocus());
  });

  it("works uncontrolled with a trigger, defaultOpen and a forwarded ref", async () => {
    const user = setup();
    const ref = createRef<HTMLDivElement>();
    const onOpenChange = vi.fn();
    render(
      <Drawer
        defaultOpen
        ref={ref}
        onOpenChange={onOpenChange}
        title="Panel"
        trigger={<button type="button">Toggle</button>}
      >
        x
      </Drawer>,
    );
    expect(ref.current).toBe(screen.getByRole("dialog", { name: "Panel" }));
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    await user.click(screen.getByRole("button", { name: "Toggle" }));
    expect(screen.getByRole("dialog", { name: "Panel" })).toBeInTheDocument();
  });
});

describe("Drawer composable API", () => {
  it("opens via trigger, closes via DrawerClose, and forwards refs/attrs", async () => {
    const user = setup();
    const contentRef = createRef<HTMLDivElement>();
    const headerRef = createRef<HTMLDivElement>();
    const footerRef = createRef<HTMLDivElement>();
    render(
      <DrawerRoot>
        <DrawerTrigger>Open drawer</DrawerTrigger>
        <DrawerContent
          ref={contentRef}
          side="bottom"
          size="full"
          className="extra"
          overlayClassName="ov"
          closeLabel="Dismiss"
          data-k="v"
        >
          <DrawerHeader ref={headerRef} className="h">
            Panel
          </DrawerHeader>
          <DrawerFooter ref={footerRef} className="f">
            <DrawerClose>Done</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </DrawerRoot>,
    );
    const trigger = screen.getByRole("button", { name: "Open drawer" });
    expect(trigger).toHaveAttribute("type", "button");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Panel" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(contentRef.current).toBe(dialog);
    expect(dialog).toHaveClass(
      "ui-drawer-side-bottom",
      "ui-drawer-size-full",
      "extra",
    );
    expect(dialog).toHaveAttribute("data-k", "v");
    expect(document.querySelector(".ui-drawer-overlay")).toHaveClass("ov");
    expect(headerRef.current).toHaveClass("ui-drawer-header", "h");
    expect(footerRef.current).toHaveClass("ui-drawer-footer", "f");
    expect(screen.getByRole("button", { name: "Dismiss" })).toHaveClass(
      "ui-drawer-close",
    );

    await user.click(screen.getByRole("button", { name: "Done" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(trigger).toHaveFocus();
  });

  it("traps Tab focus inside the open drawer", async () => {
    const user = setup();
    render(
      <>
        <button type="button">Outside</button>
        <DrawerRoot open>
          <DrawerContent>
            <DrawerHeader>Trap</DrawerHeader>
            <button type="button">Inside</button>
          </DrawerContent>
        </DrawerRoot>
      </>,
    );
    const dialog = screen.getByRole("dialog", { name: "Trap" });
    for (let i = 0; i < 4; i += 1) {
      await user.tab();
      expect(dialog).toContainElement(document.activeElement as HTMLElement);
    }
  });
});
