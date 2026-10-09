import { Component, signal } from "@angular/core";
import { describe, expect, it, vi } from "vitest";
import { MnConfig } from "../../config";
import { render, screen, settle, user } from "../../testing";
import {
  MnDrawer,
  MnDrawerBody,
  MnDrawerClose,
  MnDrawerFooter,
  MnDrawerHeader,
  MnDrawerTrigger,
} from "./drawer";

describe("MnDrawer", () => {
  it("renders nothing while closed", async () => {
    @Component({
      imports: [MnDrawer],
      template: `<mn-drawer [open]="false" title="Filters">body</mn-drawer>`,
    })
    class Host {}
    await render(Host);
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.queryByText("body")).toBeNull();
  });

  it("renders a modal dialog labelled by the title with side / size classes and a hidden description", async () => {
    @Component({
      imports: [MnDrawer, MnDrawerBody],
      template: `<mn-drawer
        [open]="true"
        title="Filters"
        side="left"
        size="large"
      >
        <mn-drawer-body>body</mn-drawer-body>
      </mn-drawer>`,
    })
    class Host {}
    const fixture = await render(Host);
    await settle(fixture);
    const dialog = screen.getByRole("dialog", { name: "Filters" });
    expect(dialog).toHaveClass("content", "left", "large");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("data-side", "left");
    expect(dialog).toHaveAttribute("data-size", "large");
    expect(dialog).toHaveAttribute("data-state", "open");
    expect(dialog.parentElement).toBe(document.body);
    expect(screen.getByText("Filters")).toHaveClass("header");
    const desc = screen.getByText("Drawer content");
    expect(desc).toHaveClass("visuallyHidden");
    expect(dialog).toHaveAttribute("aria-describedby", desc.id);
    expect(screen.getByText("body")).toHaveClass("body");
    expect(document.querySelector(".overlay")).toHaveAttribute(
      "data-part",
      "overlay",
    );
  });

  it("defaults to right / medium and renders a visible description", async () => {
    @Component({
      imports: [MnDrawer],
      template: `<mn-drawer
        [open]="true"
        title="T"
        description="Narrow the list"
        >x</mn-drawer
      >`,
    })
    class Host {}
    const fixture = await render(Host);
    await settle(fixture);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveClass("right", "medium");
    expect(screen.getByText("Narrow the list")).toHaveClass("description");
    expect(dialog).toHaveAccessibleDescription("Narrow the list");
  });

  it("requests closing from the close button, Escape and the overlay", async () => {
    const u = user();
    @Component({
      imports: [MnDrawer],
      template: `<mn-drawer
        [(open)]="open"
        title="T"
        (openChange)="changed($event)"
        >x</mn-drawer
      >`,
    })
    class Host {
      open = signal(true);
      changed = vi.fn();
    }
    const fixture = await render(Host);
    await settle(fixture);
    const close = screen.getByRole("button", { name: "Close" });
    expect(close).toHaveAttribute("type", "button");
    expect(close).toHaveClass("close");
    await u.click(close);
    await settle(fixture);
    expect(fixture.componentInstance.changed).toHaveBeenNthCalledWith(1, false);
    expect(screen.queryByRole("dialog")).toBeNull();

    fixture.componentInstance.open.set(true);
    await settle(fixture, 5);
    await u.keyboard("{Escape}");
    await settle(fixture);
    expect(screen.queryByRole("dialog")).toBeNull();

    fixture.componentInstance.open.set(true);
    await settle(fixture, 5);
    await u.click(document.querySelector<HTMLElement>(".overlay")!);
    await settle(fixture);
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(fixture.componentInstance.changed).toHaveBeenCalledTimes(3);
  });

  it("hides the close button, accepts a close label, a panel class and a hidden description", async () => {
    @Component({
      imports: [MnDrawer],
      template: `<mn-drawer
        [open]="true"
        title="T"
        [hideCloseButton]="hide()"
        closeLabel="Dismiss"
        panelClass="extra"
        hiddenDescription="Filter panel"
        >x</mn-drawer
      >`,
    })
    class Host {
      hide = signal(true);
    }
    const fixture = await render(Host);
    await settle(fixture);
    expect(screen.queryByRole("button")).toBeNull();
    fixture.componentInstance.hide.set(false);
    await settle(fixture);
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeTruthy();
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveClass("extra");
    expect(dialog).toHaveAccessibleDescription("Filter panel");
  });

  it("opens from a trigger, traps Tab, closes with mnDrawerClose and returns focus", async () => {
    const u = user();
    @Component({
      imports: [
        MnDrawer,
        MnDrawerTrigger,
        MnDrawerHeader,
        MnDrawerBody,
        MnDrawerFooter,
        MnDrawerClose,
      ],
      template: `<button type="button" [mnDrawerTrigger]="drawer">Open</button>
        <mn-drawer
          #drawer="mnDrawer"
          (afterOpen)="opened()"
          (afterClose)="closed()"
        >
          <mn-drawer-header>Settings</mn-drawer-header>
          <mn-drawer-body><input aria-label="Name" /></mn-drawer-body>
          <mn-drawer-footer
            ><button type="button" mnDrawerClose>Done</button></mn-drawer-footer
          >
        </mn-drawer>`,
    })
    class Host {
      opened = vi.fn();
      closed = vi.fn();
    }
    const fixture = await render(Host);
    const trigger = screen.getByRole("button", { name: "Open" });
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await u.click(trigger);
    await settle(fixture, 5);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(fixture.componentInstance.opened).toHaveBeenCalledTimes(1);
    const dialog = screen.getByRole("dialog", { name: "Settings" });
    expect(trigger).toHaveAttribute("aria-controls", dialog.id);
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveFocus();
    await u.tab();
    expect(screen.getByRole("button", { name: "Done" })).toHaveFocus();
    await u.tab();
    expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();
    await u.tab();
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveFocus();
    await u.tab({ shift: true });
    expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();
    await u.click(screen.getByRole("button", { name: "Done" }));
    await settle(fixture, 5);
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(trigger).toHaveFocus();
    expect(fixture.componentInstance.closed).toHaveBeenCalledTimes(1);
  });

  it("Escape closes and returns focus to the trigger; defaultOpen opens it", async () => {
    const u = user();
    @Component({
      imports: [MnDrawer, MnDrawerTrigger],
      template: `<button type="button" [mnDrawerTrigger]="drawer">Open</button>
        <mn-drawer #drawer="mnDrawer" title="T" [defaultOpen]="true"
          ><input aria-label="Name"
        /></mn-drawer>`,
    })
    class Host {}
    const fixture = await render(Host);
    await settle(fixture, 5);
    expect(screen.getByRole("dialog")).toBeTruthy();
    await u.keyboard("{Escape}");
    await settle(fixture, 5);
    expect(screen.queryByRole("dialog")).toBeNull();
    const trigger = screen.getByRole("button", { name: "Open" });
    await u.click(trigger);
    await settle(fixture, 5);
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveFocus();
    await u.keyboard("{Escape}");
    await settle(fixture, 5);
    expect(trigger).toHaveFocus();
  });

  it("non-modal: no overlay and no aria-modal", async () => {
    @Component({
      imports: [MnDrawer],
      template: `<mn-drawer [open]="true" [modal]="false" title="T"
        >x</mn-drawer
      >`,
    })
    class Host {}
    const fixture = await render(Host);
    await settle(fixture);
    expect(screen.getByRole("dialog")).not.toHaveAttribute("aria-modal");
    expect(document.querySelector(".overlay")).toBeNull();
  });

  it("localizes the built-in texts from <mn-config>", async () => {
    @Component({
      imports: [MnDrawer, MnConfig],
      template: `<mn-config locale="zh"
        ><mn-drawer [open]="true" title="T"
      /></mn-config>`,
    })
    class Host {}
    const fixture = await render(Host);
    await settle(fixture);
    expect(screen.getByRole("button", { name: "关闭" })).toBeTruthy();
  });
});
