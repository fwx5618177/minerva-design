import { Component, signal } from "@angular/core";
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, settle, user } from "../../testing";
import { MnRating } from "./rating";

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

/** Fill of each star ("full" | "half" | "empty"), in order */
const fills = (root: ParentNode = document) =>
  Array.from(root.querySelectorAll(".star")).map((el) =>
    el.classList.contains("half")
      ? "half"
      : el.classList.contains("empty")
        ? "empty"
        : "full",
  );

const starButton = (index: number): HTMLButtonElement => {
  const el = document.querySelectorAll<HTMLButtonElement>(".starButton")[index];
  if (!el) throw new Error(`star button ${index} not found`);
  return el;
};

const rect = (el: Element, x: number) =>
  vi
    .spyOn(el, "getBoundingClientRect")
    .mockReturnValue(DOMRect.fromRect({ x, y: 0, width: 20, height: 20 }));

describe("MnRating (read-only)", () => {
  it('renders 5 aria-hidden stars labelled "value / max" as an image', async () => {
    @Component({
      imports: [MnRating],
      template: `<mn-rating [value]="8" data-testid="r" />`,
    })
    class Host {}
    await render(Host);
    const r = screen.getByTestId("r");
    expect(r).toHaveAttribute("aria-label", "8.0 / 10");
    expect(r).toHaveAttribute("role", "img");
    expect(r).not.toHaveAttribute("tabindex");
    expect(r).toHaveClass("rating");
    expect(r).not.toHaveClass("interactive");
    expect(r).toHaveAttribute("data-minerva", "rating");
    expect(r).toHaveAttribute("data-part", "root");
    expect(r).toHaveAttribute("data-readonly", "");
    expect(r).toHaveAttribute("data-size", "medium");
    expect(r.querySelector(".stars")).toHaveAttribute("aria-hidden", "true");
    expect(r.querySelectorAll("button")).toHaveLength(0);
    expect(fills()).toEqual(["full", "full", "full", "full", "empty"]);
  });

  it.each([
    [4.4, 10, ["full", "full", "empty", "empty", "empty"]],
    [5.6, 10, ["full", "full", "full", "empty", "empty"]],
    [3, 5, ["full", "full", "full", "empty", "empty"]],
    [0, 10, ["empty", "empty", "empty", "empty", "empty"]],
    [10, 10, ["full", "full", "full", "full", "full"]],
    [3, 0, ["empty", "empty", "empty", "empty", "empty"]],
  ])(
    "value=%s max=%s normalizes to 5 stars",
    async (value: number, max: number, expected: string[]) => {
      @Component({
        imports: [MnRating],
        template: `<mn-rating [value]="value" [max]="max" />`,
      })
      class Host {
        value = value;
        max = max;
      }
      await render(Host);
      expect(fills()).toEqual(expected);
    },
  );

  it("renders a half star for fractions in 0.25..0.75 with the fill item hook", async () => {
    @Component({
      imports: [MnRating],
      template: `<mn-rating [value]="5" />`,
    })
    class Host {}
    await render(Host);
    expect(fills()).toEqual(["full", "full", "half", "empty", "empty"]);
    expect(document.querySelectorAll(".half svg")).toHaveLength(2);
    expect(
      Array.from(document.querySelectorAll('[data-part="star"]')).map((el) =>
        el.getAttribute("data-fill"),
      ),
    ).toEqual(["full", "full", "half", "empty", "empty"]);
    const full = document.querySelector("svg.star")!;
    expect(full).toHaveAttribute("fill", "currentColor");
    expect(full).toHaveAttribute("stroke-width", "1.5");
    expect(document.querySelector("svg.empty")).toHaveAttribute("fill", "none");
  });

  it("shows the value and the formatted rating count", async () => {
    @Component({
      imports: [MnRating],
      template: `<mn-rating [value]="8.64" showValue [ratingCount]="3214" />`,
    })
    class Host {}
    await render(Host);
    expect(document.querySelector(".value strong")).toHaveTextContent("8.6");
    expect(screen.getByText("(3,214)")).toHaveClass("count");
    expect(screen.getByText("(3,214)")).toHaveAttribute("data-part", "count");
  });

  it("shows the value without a count, hides it by default", async () => {
    @Component({
      imports: [MnRating],
      template: `<mn-rating [value]="8" showValue />
        <mn-rating [value]="8" [ratingCount]="3" />`,
    })
    class Host {}
    await render(Host);
    const values = document.querySelectorAll(".value");
    expect(values).toHaveLength(1);
    expect(values[0]).toHaveTextContent("8.0");
    expect(document.querySelector(".count")).toBeNull();
  });

  it("uses a custom aria-label and size", async () => {
    @Component({
      imports: [MnRating],
      template: `<mn-rating
          [value]="4"
          aria-label="Four"
          size="large"
          class="c"
        />
        <mn-rating [value]="4" size="small" data-testid="s" />`,
    })
    class Host {}
    await render(Host);
    const r = screen.getByLabelText("Four");
    expect(r).toHaveClass("large");
    expect(r.querySelector("svg")).toHaveAttribute("width", "20");
    const small = screen.getByTestId("s");
    expect(small).toHaveClass("small");
    expect(small.querySelector("svg")).toHaveAttribute("width", "12");
  });
});

describe("MnRating (interactive)", () => {
  it("exposes a focusable slider with its value range", async () => {
    @Component({
      imports: [MnRating],
      template: `<mn-rating [value]="6" interactive />`,
    })
    class Host {}
    await render(Host);
    const slider = screen.getByRole("slider", { name: "6.0 / 10" });
    expect(slider).toHaveAttribute("aria-valuenow", "6");
    expect(slider).toHaveAttribute("aria-valuemin", "0");
    expect(slider).toHaveAttribute("aria-valuemax", "10");
    expect(slider).toHaveAttribute("tabindex", "0");
    expect(slider).toHaveClass("interactive");
    expect(slider).not.toHaveAttribute("data-readonly");
  });

  it("readOnly and disabled force display mode", async () => {
    const u = user();
    @Component({
      imports: [MnRating],
      template: `<mn-rating
          [value]="6"
          interactive
          readOnly
          data-testid="r"
          (valueChange)="changed($event)"
        />
        <mn-rating [value]="6" interactive disabled data-testid="d" />`,
    })
    class Host {
      changed = vi.fn();
    }
    const fixture = await render(Host);
    expect(screen.queryByRole("slider")).toBeNull();
    expect(document.querySelectorAll("button")).toHaveLength(0);
    screen.getByTestId("r").focus();
    await u.keyboard("{ArrowRight}");
    expect(fixture.componentInstance.changed).not.toHaveBeenCalled();
    expect(screen.getByTestId("d")).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByTestId("d")).toHaveAttribute("data-readonly", "");
  });

  it("adjusts with arrow keys by max/10 and clamps; Home/End jump to bounds ([(value)])", async () => {
    const u = user();
    @Component({
      imports: [MnRating],
      template: `<mn-rating
        interactive
        [(value)]="value"
        (valueChange)="changed($event)"
      />`,
    })
    class Host {
      value = signal(9.5);
      changed = vi.fn();
    }
    const fixture = await render(Host);
    const changed = fixture.componentInstance.changed;
    await u.tab();
    const slider = screen.getByRole("slider");
    expect(slider).toHaveFocus();
    await u.keyboard("{ArrowRight}");
    expect(changed).toHaveBeenLastCalledWith(10);
    await u.keyboard("{ArrowUp}");
    expect(changed).toHaveBeenCalledTimes(1);
    await u.keyboard("{ArrowLeft}{ArrowDown}");
    expect(changed).toHaveBeenLastCalledWith(8);
    await u.keyboard("{Home}");
    expect(changed).toHaveBeenLastCalledWith(0);
    await u.keyboard("{End}");
    expect(changed).toHaveBeenLastCalledWith(10);
    await settle(fixture);
    expect(fixture.componentInstance.value()).toBe(10);
    expect(slider).toHaveAttribute("aria-valuenow", "10");
    // the bound value drives the rating
    fixture.componentInstance.value.set(3);
    await settle(fixture);
    expect(slider).toHaveAttribute("aria-valuenow", "3");
  });

  it("starts from defaultValue when value is not bound", async () => {
    const u = user();
    @Component({
      imports: [MnRating],
      template: `<mn-rating interactive [defaultValue]="3" [max]="5" />`,
    })
    class Host {}
    await render(Host);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuenow", "3");
    slider.focus();
    await u.keyboard("{ArrowRight}");
    expect(slider).toHaveAttribute("aria-valuenow", "3.5");
  });

  it("ignores unrelated keys", async () => {
    const u = user();
    @Component({
      imports: [MnRating],
      template: `<mn-rating
        [value]="3"
        interactive
        (valueChange)="changed()"
      />`,
    })
    class Host {
      changed = vi.fn();
    }
    const fixture = await render(Host);
    screen.getByRole("slider").focus();
    await u.keyboard("a{Enter}");
    expect(fixture.componentInstance.changed).not.toHaveBeenCalled();
  });

  it("PageUp / PageDown move by one whole star (max / 5) and clamp", async () => {
    const u = user();
    @Component({
      imports: [MnRating],
      template: `<mn-rating
        aria-label="Score"
        interactive
        [(value)]="value"
      />`,
    })
    class Host {
      value = signal(5);
    }
    const fixture = await render(Host);
    const slider = screen.getByRole("slider", { name: "Score" });
    slider.focus();
    const steps: [string, number][] = [
      ["{PageUp}", 7],
      ["{PageUp}", 9],
      ["{PageUp}", 10],
      ["{PageDown}", 8],
      ["{Home}{PageDown}", 0],
    ];
    for (const [keys, expected] of steps) {
      await u.keyboard(keys);
      await settle(fixture);
      expect(fixture.componentInstance.value()).toBe(expected);
    }
  });

  it("RTL: ArrowLeft increases and ArrowRight decreases", async () => {
    const u = user();
    @Component({
      imports: [MnRating],
      template: `<div dir="rtl">
        <mn-rating interactive [(value)]="value" />
      </div>`,
    })
    class Host {
      value = signal(5);
    }
    const fixture = await render(Host);
    screen.getByRole("slider").focus();
    await u.keyboard("{ArrowLeft}");
    expect(fixture.componentInstance.value()).toBe(6);
    await u.keyboard("{ArrowRight}{ArrowRight}");
    expect(fixture.componentInstance.value()).toBe(4);
    await u.keyboard("{ArrowUp}{PageUp}");
    expect(fixture.componentInstance.value()).toBe(7);
  });

  it("renders non-tabbable star buttons; clicking the right / left half of a star", async () => {
    @Component({
      imports: [MnRating],
      template: `<mn-rating interactive [(value)]="value" />
        <mn-rating interactive [max]="5" [(value)]="five" />`,
    })
    class Host {
      value = signal(0);
      five = signal(0);
    }
    const fixture = await render(Host);
    const buttons = document.querySelectorAll(".starButton");
    expect(buttons).toHaveLength(10);
    buttons.forEach((b) => expect(b).toHaveAttribute("tabindex", "-1"));
    const third = starButton(2);
    rect(third, 0);
    await user().pointer({
      keys: "[MouseLeft]",
      target: third,
      coords: { clientX: 15 },
    });
    expect(fixture.componentInstance.value()).toBe(6);
    const fourth = starButton(8);
    rect(fourth, 100);
    fireEvent.click(fourth, { clientX: 105 });
    expect(fixture.componentInstance.five()).toBe(3.5);
  });

  it("previews on hover and restores on mouse leave", async () => {
    const u = user();
    @Component({
      imports: [MnRating],
      template: `<mn-rating [value]="2" interactive />`,
    })
    class Host {}
    const fixture = await render(Host);
    expect(fills()).toEqual(["full", "empty", "empty", "empty", "empty"]);
    await u.hover(starButton(3));
    await settle(fixture);
    expect(fills()).toEqual(["full", "full", "full", "full", "empty"]);
    await u.unhover(screen.getByRole("slider"));
    await settle(fixture);
    expect(fills()).toEqual(["full", "empty", "empty", "empty", "empty"]);
  });

  it("a (keydown) listener goes first; preventDefault() takes over the key", async () => {
    @Component({
      imports: [MnRating],
      template: `<mn-rating
        interactive
        [(value)]="value"
        (keydown)="onKey($event)"
      />`,
    })
    class Host {
      value = signal(4);
      prevent = false;
      onKey = vi.fn((event: KeyboardEvent) => {
        if (this.prevent) event.preventDefault();
      });
    }
    const fixture = await render(Host);
    const host = fixture.componentInstance;
    fireEvent.keyDown(screen.getByRole("slider"), { key: "ArrowRight" });
    expect(host.onKey).toHaveBeenCalledTimes(1);
    expect(host.value()).toBe(5);
    host.prevent = true;
    fireEvent.keyDown(screen.getByRole("slider"), { key: "ArrowRight" });
    expect(host.value()).toBe(5);
  });
});

describe("MnRating (forms)", () => {
  it("is interactive when bound with ngModel", async () => {
    const u = user();
    @Component({
      imports: [MnRating, FormsModule],
      template: `<mn-rating aria-label="Score" [(ngModel)]="score" />`,
    })
    class Host {
      score = 6;
    }
    const fixture = await render(Host);
    await settle(fixture);
    const slider = screen.getByRole("slider", { name: "Score" });
    expect(slider).toHaveAttribute("aria-valuenow", "6");
    slider.focus();
    await u.keyboard("{ArrowRight}");
    expect(fixture.componentInstance.score).toBe(7);
  });

  it("works with Reactive Forms (value, disabled, invalid after touch)", async () => {
    const u = user();
    @Component({
      imports: [MnRating, ReactiveFormsModule],
      template: `<mn-rating
        aria-label="Score"
        required
        [formControl]="control"
      />`,
    })
    class Host {
      control = new FormControl<number>(0, Validators.min(1));
    }
    const fixture = await render(Host);
    const { control } = fixture.componentInstance;
    const slider = screen.getByRole("slider", { name: "Score" });
    expect(slider).toHaveAttribute("aria-required", "true");
    expect(slider).not.toHaveAttribute("aria-invalid");
    control.markAsTouched();
    await settle(fixture);
    expect(slider).toHaveAttribute("aria-invalid", "true");
    slider.focus();
    await u.keyboard("{End}");
    expect(control.value).toBe(10);
    await settle(fixture);
    expect(slider).not.toHaveAttribute("aria-invalid");
    control.setValue(4);
    await settle(fixture);
    expect(slider).toHaveAttribute("aria-valuenow", "4");
    control.disable();
    await settle(fixture);
    expect(screen.queryByRole("slider")).toBeNull();
    expect(screen.getByRole("img", { name: "Score" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("marks the control touched when focus leaves", async () => {
    @Component({
      imports: [MnRating, ReactiveFormsModule],
      template: `<mn-rating [formControl]="control" />`,
    })
    class Host {
      control = new FormControl(3);
    }
    const fixture = await render(Host);
    const slider = screen.getByRole("slider");
    slider.focus();
    slider.blur();
    expect(fixture.componentInstance.control.touched).toBe(true);
  });

  it("submits the score under name with native forms", async () => {
    @Component({
      imports: [MnRating],
      template: `<form><mn-rating name="score" [value]="7" /></form>`,
    })
    class Host {}
    await render(Host);
    const form = document.querySelector("form")!;
    expect(new FormData(form).get("score")).toBe("7");
  });
});
