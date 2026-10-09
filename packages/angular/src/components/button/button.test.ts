import { Component, signal } from "@angular/core";
import { render, screen } from "../../testing";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MnButton } from "./button";

describe("MnButton", () => {
  it("renders the native button with the shared classes and hooks", async () => {
    @Component({
      imports: [MnButton],
      template: `<button mnButton class="extra">Save</button>`,
    })
    class Host {}
    await render(Host);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveClass(
      "customButton",
      "primary",
      "variant-solid",
      "medium",
      "extra",
    );
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("data-minerva", "button");
    expect(button).toHaveAttribute("data-state", "inactive");
    expect(button.querySelector('[data-part="label"]')).toHaveTextContent(
      "Save",
    );
  });

  it("maps inputs to classes, states and styles", async () => {
    @Component({
      imports: [MnButton],
      template: `<button
        mnButton
        color="danger"
        variant="outline"
        size="xlarge"
        shape="circle"
        active
        [borderRadius]="12"
        fullWidth
      >
        Go
      </button>`,
    })
    class Host {}
    await render(Host);
    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "danger",
      "variant-outline",
      "xlarge",
      "circle",
      "active",
      "fullWidth",
    );
    expect(button.style.borderRadius).toBe("12px");
    expect(button).toHaveAttribute("data-shape", "circle");
  });

  it("emits click, but not while disabled or loading", async () => {
    const user = userEvent.setup();
    @Component({
      imports: [MnButton],
      template: `<button
        mnButton
        [disabled]="disabled()"
        [loading]="loading()"
        (click)="clicked()"
      >
        Go
      </button>`,
    })
    class Host {
      disabled = signal(false);
      loading = signal(false);
      clicked = vi.fn();
    }
    const fixture = await render(Host);
    const button = screen.getByRole("button");
    await user.click(button);
    expect(fixture.componentInstance.clicked).toHaveBeenCalledTimes(1);
    fixture.componentInstance.loading.set(true);
    await fixture.whenStable();
    expect(button).toHaveAttribute("aria-busy", "true");
    await user.click(button);
    expect(fixture.componentInstance.clicked).toHaveBeenCalledTimes(1);
    fixture.componentInstance.loading.set(false);
    fixture.componentInstance.disabled.set(true);
    await fixture.whenStable();
    expect(button).toBeDisabled();
    await user.click(button);
    expect(fixture.componentInstance.clicked).toHaveBeenCalledTimes(1);
  });

  it("does not submit its form while loading", async () => {
    const user = userEvent.setup();
    @Component({
      imports: [MnButton],
      template: `<form (submit)="submitted($event)">
        <button mnButton type="submit" loading>Send</button>
      </form>`,
    })
    class Host {
      submitted = vi.fn((e: Event) => e.preventDefault());
    }
    const fixture = await render(Host);
    await user.click(screen.getByRole("button"));
    expect(fixture.componentInstance.submitted).not.toHaveBeenCalled();
  });

  it("shows the loading text and template icons", async () => {
    @Component({
      imports: [MnButton],
      template: ` <ng-template #icon
          ><svg data-testid="icon"></svg
        ></ng-template>
        <button mnButton [startIcon]="icon" endIcon="→">Next</button>
        <button mnButton loading loadingText="Saving">Save</button>`,
    })
    class Host {}
    await render(Host);
    expect(
      screen.getByTestId("icon").closest('[data-part="start-icon"]'),
    ).not.toBeNull();
    expect(document.querySelector('[data-part="end-icon"]')).toHaveTextContent(
      "→",
    );
    const loading = screen.getByRole("button", { name: "Saving" });
    expect(loading.querySelector('[data-part="spinner"]')).not.toBeNull();
  });

  it("works on links (disabled links are inert)", async () => {
    const user = userEvent.setup();
    @Component({
      imports: [MnButton],
      template: `<a mnButton href="#x" disabled (click)="clicked()">Docs</a>`,
    })
    class Host {
      clicked = vi.fn();
    }
    const fixture = await render(Host);
    const link = screen.getByRole("link");
    expect(link).not.toHaveAttribute("type");
    expect(link).toHaveAttribute("aria-disabled", "true");
    await user.click(link);
    expect(fixture.componentInstance.clicked).not.toHaveBeenCalled();
  });
});
