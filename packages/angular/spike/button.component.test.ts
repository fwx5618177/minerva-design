import { Component, signal } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { describe, expect, it, vi } from "vitest";
import { MnButtonComponent } from "./button.component";

describe("MnButtonComponent", () => {
  function setup() {
    const fixture = TestBed.createComponent(MnButtonComponent);
    const press = vi.fn();
    fixture.componentInstance.press.subscribe(press);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector(
      "button",
    ) as HTMLButtonElement;
    return { fixture, press, button };
  }

  it("renders a native button with base class", () => {
    const { button } = setup();
    expect(button.className).toContain("mn-button");
    expect(button.disabled).toBe(false);
  });

  it("emits press on click", () => {
    const { button, press } = setup();
    button.click();
    expect(press).toHaveBeenCalledTimes(1);
  });

  it("disabled: sets attribute/class and ignores clicks", async () => {
    const { fixture, button, press } = setup();
    fixture.componentRef.setInput("disabled", true);
    await fixture.whenStable();
    expect(button.disabled).toBe(true);
    expect(button.classList.contains("mn-button--disabled")).toBe(true);
    button.click();
    // also invoke the handler directly: native disabled buttons swallow click events,
    // so this checks the component-level guard too
    fixture.componentInstance.onClick();
    expect(press).not.toHaveBeenCalled();
  });

  it("loading: disables but does not add disabled class", async () => {
    const { fixture, button, press } = setup();
    fixture.componentRef.setInput("loading", true);
    await fixture.whenStable();
    expect(button.disabled).toBe(true);
    expect(button.classList.contains("mn-button--disabled")).toBe(false);
    fixture.componentInstance.onClick();
    expect(press).not.toHaveBeenCalled();
  });

  it("projects content via a host component and binds inputs/outputs in templates", async () => {
    @Component({
      imports: [MnButtonComponent],
      template: `<mn-button [disabled]="off()" (press)="count.set(count() + 1)"
        >Save changes</mn-button
      >`,
    })
    class HostComponent {
      readonly off = signal(false);
      readonly count = signal(0);
    }

    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    const button = fixture.nativeElement.querySelector(
      "button.mn-button",
    ) as HTMLButtonElement;
    expect(button.textContent?.trim()).toBe("Save changes");

    button.click();
    expect(fixture.componentInstance.count()).toBe(1);

    fixture.componentInstance.off.set(true);
    await fixture.whenStable();
    expect(button.disabled).toBe(true);
    button.click();
    expect(fixture.componentInstance.count()).toBe(1);
  });
});
