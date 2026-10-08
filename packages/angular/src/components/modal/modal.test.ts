import { Component, signal } from "@angular/core";
import { describe, expect, it, vi } from "vitest";
import { MnConfig } from "../../config";
import { render, screen, settle, user } from "../../testing";
import {
  MnModal,
  MnModalBody,
  MnModalClose,
  MnModalFooter,
  MnModalHeader,
  MnModalTrigger,
} from "./modal";

describe("MnModal", () => {
  it("renders nothing while closed", async () => {
    @Component({
      imports: [MnModal],
      template: `<mn-modal title="Hidden">body</mn-modal>`,
    })
    class Host {}
    await render(Host);
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.queryByText("body")).toBeNull();
  });

  it("renders a portalled modal dialog named by the title", async () => {
    @Component({
      imports: [MnModal, MnModalBody, MnModalFooter],
      template: ` <mn-modal
        [open]="true"
        title="Delete record"
        size="large"
        panelClass="extra"
      >
        <mn-modal-body>The record is removed.</mn-modal-body>
        <mn-modal-footer><button type="button">OK</button></mn-modal-footer>
      </mn-modal>`,
    })
    class Host {}
    const fixture = await render(Host);
    await settle(fixture);
    const dialog = screen.getByRole("dialog", { name: "Delete record" });
    expect(dialog).toHaveClass("content", "large", "extra");
    expect(dialog).toHaveAttribute("data-state", "open");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).not.toHaveAttribute("aria-describedby");
    expect(dialog.parentElement).toBe(document.body);
    expect(screen.getByText("The record is removed.")).toHaveClass("body");
    expect(
      screen.getByRole("button", { name: "OK" }).parentElement,
    ).toHaveClass("footer");
    expect(document.querySelector(".overlay")).toHaveAttribute(
      "data-part",
      "overlay",
    );
  });

  it("describes the dialog and closes from the button, Escape and the overlay", async () => {
    const u = user();
    @Component({
      imports: [MnModal],
      template: `<mn-modal
        [(open)]="open"
        title="T"
        description="Cannot be undone"
        (openChange)="changed($event)"
        >x</mn-modal
      >`,
    })
    class Host {
      open = signal(true);
      changed = vi.fn();
    }
    const fixture = await render(Host);
    await settle(fixture);
    expect(screen.getByRole("dialog")).toHaveAccessibleDescription(
      "Cannot be undone",
    );
    await u.click(screen.getByRole("button", { name: "Close" }));
    await settle(fixture);
    expect(fixture.componentInstance.changed).toHaveBeenLastCalledWith(false);
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

  it("opens from a trigger, moves focus in and returns it to the trigger", async () => {
    const u = user();
    @Component({
      imports: [MnModal, MnModalTrigger, MnModalBody, MnModalClose],
      template: ` <button type="button" [mnModalTrigger]="dialog">
          Open settings
        </button>
        <mn-modal #dialog="mnModal" title="Settings">
          <mn-modal-body
            ><input aria-label="Name" /><button type="button" mnModalClose>
              Done
            </button></mn-modal-body
          >
        </mn-modal>`,
    })
    class Host {}
    const fixture = await render(Host);
    const trigger = screen.getByRole("button", { name: "Open settings" });
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await u.click(trigger);
    await settle(fixture);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveFocus();
    // focus is trapped: Tab loops inside the dialog
    await u.tab();
    await u.tab();
    expect(screen.getByRole("dialog")).toContainElement(
      document.activeElement as HTMLElement,
    );
    await u.click(screen.getByRole("button", { name: "Done" }));
    await settle(fixture, 5);
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(trigger).toHaveFocus();
  });

  it("hides the rest of the page and uses a rich header", async () => {
    @Component({
      imports: [MnModal, MnModalHeader],
      template: `<main>page</main>
        <mn-modal [open]="true" hideCloseButton
          ><mn-modal-header><b>Rich</b> title</mn-modal-header></mn-modal
        >`,
    })
    class Host {}
    const fixture = await render(Host);
    await settle(fixture);
    expect(screen.getByRole("dialog", { name: "Rich title" })).toBeTruthy();
    expect(screen.queryByRole("button")).toBeNull();
    expect(fixture.nativeElement).toHaveAttribute("aria-hidden", "true");
  });

  it("localizes the close label from <mn-config>", async () => {
    @Component({
      imports: [MnModal, MnConfig],
      template: `<mn-config locale="zh"
        ><mn-modal [open]="true" title="T"
      /></mn-config>`,
    })
    class Host {}
    const fixture = await render(Host);
    await settle(fixture);
    expect(screen.getByRole("button", { name: "关闭" })).toBeTruthy();
  });
});
