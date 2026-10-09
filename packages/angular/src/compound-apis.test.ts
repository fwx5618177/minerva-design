import { describe, expect, it, vi } from "vitest";
import { MnConfirmProvider } from "./index";
import { render, screen, fireEvent, settle, user } from "./testing";
import {
  ConfirmHost,
  TooltipHost,
  PopoverHost,
  MenuHost,
  TableHost,
  ScopedConfirmHost,
} from "./testing/compound-apis";

describe("native Angular compound APIs", () => {
  it("provides a scoped injectable confirmation service to descendants", async () => {
    const fixture = await render(ScopedConfirmHost);
    await user().click(screen.getByRole("button", { name: "Scoped action" }));
    await settle(fixture);
    expect(
      screen.getByRole("alertdialog", { name: "Scoped confirmation" }),
    ).toBeTruthy();
    fireEvent.keyDown(screen.getByRole("alertdialog"), { key: "Escape" });
    await settle(fixture);
    expect(
      screen.queryByRole("alertdialog", { name: "Scoped confirmation" }),
    ).toBeNull();
  });
  it("queues confirmations, resolves results and settles pending requests on disposal", async () => {
    const fixture = await render(ConfirmHost);
    const provider = fixture.debugElement.children[0]
      .componentInstance as MnConfirmProvider;
    const first = provider.confirm({ title: "Delete first" });
    const second = provider.confirm({ title: "Delete second" });
    await settle(fixture);
    expect(
      screen.getByRole("alertdialog", { name: "Delete first" }),
    ).toBeTruthy();
    await user().click(screen.getByRole("button", { name: "Confirm" }));
    await expect(first).resolves.toBe(true);
    await settle(fixture);
    expect(
      screen.getByRole("alertdialog", { name: "Delete second" }),
    ).toBeTruthy();
    await user().click(screen.getByRole("button", { name: "Cancel" }));
    await expect(second).resolves.toBe(false);
    const pending = provider.confirm({ title: "Pending" });
    fixture.destroy();
    await expect(pending).resolves.toBe(false);
  });
  it("keeps failed async confirmation open for retry and blocks dismissal while saving", async () => {
    const fixture = await render(ConfirmHost);
    const provider = fixture.debugElement.children[0]
      .componentInstance as MnConfirmProvider;
    let reject!: (error: Error) => void;
    let attempts = 0;
    const result = provider.confirm({
      title: "Save",
      onConfirm: () =>
        ++attempts === 1
          ? new Promise<void>((_, no) => {
              reject = no;
            })
          : Promise.resolve(),
    });
    await settle(fixture);
    await user().click(screen.getByRole("button", { name: "Confirm" }));
    fireEvent.keyDown(screen.getByRole("alertdialog"), { key: "Escape" });
    await settle(fixture);
    expect(
      screen.getByRole("button", { name: "Cancel" }).hasAttribute("disabled"),
    ).toBe(true);
    reject(new Error("Save failed"));
    await settle(fixture);
    expect(screen.getByRole("alert").textContent).toContain("Save failed");
    await user().click(screen.getByRole("button", { name: "Confirm" }));
    await expect(result).resolves.toBe(true);
  });
  it("shares tooltip warmup delays and cancels pending work on disposal", async () => {
    const fixture = await render(TooltipHost);
    fireEvent.pointerEnter(
      screen.getByRole("button", { name: "First" }).parentElement!,
    );
    await settle(fixture);
    expect(screen.queryByRole("tooltip")).toBeNull();
    await settle(fixture, 40);
    expect(screen.getByRole("tooltip").textContent).toContain("First hint");
    fireEvent.pointerLeave(
      screen.getByRole("button", { name: "First" }).parentElement!,
    );
    await settle(fixture, 15);
    fireEvent.pointerEnter(
      screen.getByRole("button", { name: "Second" }).parentElement!,
    );
    await settle(fixture);
    expect(screen.getByRole("tooltip").textContent).toContain("Second hint");
    fixture.destroy();
    expect(screen.queryByRole("tooltip")).toBeNull();
  });
  it("supports an external popover anchor and projected close action", async () => {
    const fixture = await render(PopoverHost);
    const anchor = fixture.nativeElement.querySelector(
      '[data-part="anchor"]',
    ) as HTMLElement;
    const measure = vi.spyOn(anchor, "getBoundingClientRect");
    await user().click(screen.getByRole("button", { name: "Details" }));
    await settle(fixture);
    expect(screen.getByRole("dialog", { name: "Details" })).toBeTruthy();
    expect(measure).toHaveBeenCalled();
    await user().click(screen.getByRole("button", { name: "Done" }));
    await settle(fixture);
    expect(fixture.componentInstance.open).toBe(false);
    expect(
      screen
        .getByRole("button", { name: "Details" })
        .getAttribute("aria-expanded"),
    ).toBe("false");
  });
  it("renders named menu groups and controls exclusive radio selection", async () => {
    const fixture = await render(MenuHost);
    await user().click(screen.getByRole("button", { name: "View" }));
    await settle(fixture);
    expect(screen.getByRole("group", { name: "Density" })).toBeTruthy();
    expect(
      screen
        .getByRole("menuitemradio", { name: "Comfortable" })
        .getAttribute("aria-checked"),
    ).toBe("true");
    await user().click(screen.getByRole("menuitemradio", { name: "Compact" }));
    expect(fixture.componentInstance.values).toEqual({ density: "compact" });
    expect(fixture.componentInstance.changed).toEqual({
      group: "density",
      value: "compact",
    });
    await user().click(screen.getByRole("button", { name: "View" }));
    await settle(fixture);
    expect(
      screen
        .getByRole("menuitemradio", { name: "Comfortable" })
        .getAttribute("aria-checked"),
    ).toBe("false");
    expect(
      screen
        .getByRole("menuitemradio", { name: "Compact" })
        .getAttribute("aria-checked"),
    ).toBe("true");
    await user().click(
      screen.getByRole("menuitemradio", { name: "Unavailable" }),
    );
    expect(fixture.componentInstance.values).toEqual({ density: "compact" });
  });
  it("preserves semantic table composition, merged cells, selection and sorting hooks", async () => {
    const fixture = await render(TableHost);
    expect(
      screen
        .getByRole("region", { name: "Inventory" })
        .getAttribute("tabindex"),
    ).toBe("0");
    expect(
      screen
        .getByRole("table", { name: "Inventory" })
        .querySelector("thead>tr>th"),
    ).toBeTruthy();
    expect(screen.getByRole("cell").getAttribute("colspan")).toBe("2");
    expect(
      screen.getByRole("cell").parentElement!.getAttribute("data-selected"),
    ).toBe("");
    await user().click(screen.getByRole("button", { name: "Name" }));
    await settle(fixture);
    expect(
      screen
        .getByRole("columnheader", { name: "Name" })
        .getAttribute("aria-sort"),
    ).toBe("descending");
    await user().click(screen.getByRole("button", { name: "0 selected" }));
    expect(fixture.componentInstance.count).toBe(1);
  });
});
