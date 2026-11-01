import { Component, signal } from "@angular/core";
import { afterEach, describe, expect, it } from "vitest";
import { render, settle } from "../../testing";
import { MnProgressIndicator } from ".";

afterEach(() => {
  document.body.innerHTML = "";
});

const root = () => document.querySelector<HTMLElement>("mn-progress")!;

describe("MnProgressIndicator", () => {
  it("stays an indeterminate progressbar without a value", async () => {
    @Component({
      imports: [MnProgressIndicator],
      template: `<mn-progress variant="bar" showValue />`,
    })
    class Host {}
    await render(Host);
    expect(root().getAttribute("role")).toBe("progressbar");
    expect(root().getAttribute("aria-label")).toBe("Loading");
    expect(root().hasAttribute("aria-valuenow")).toBe(false);
    expect(root().querySelector(".value")).toBeNull();
  });

  it("fills a determinate bar and clamps the value", async () => {
    @Component({
      imports: [MnProgressIndicator],
      template: `<mn-progress
        variant="bar"
        color="success"
        showValue
        [value]="value()"
        [max]="max()"
        [format]="format()"
      />`,
    })
    class Host {
      value = signal<number | undefined>(3);
      max = signal(4);
      format = signal<((value: number, max: number) => string) | null>(null);
    }
    const fixture = await render(Host);
    const el = root();
    expect(el.classList).toContain("success");
    expect(el.getAttribute("aria-label")).toBe("Progress");
    expect(el.getAttribute("aria-valuemin")).toBe("0");
    expect(el.getAttribute("aria-valuemax")).toBe("4");
    expect(el.getAttribute("aria-valuenow")).toBe("3");
    expect(el.hasAttribute("aria-valuetext")).toBe(false);
    const fill = el.querySelector<HTMLElement>(".barContainer .bar")!;
    expect(fill.classList).toContain("determinate");
    expect(fill.style.width).toBe("75%");
    expect(el.querySelector(".value")?.textContent).toBe("75%");

    fixture.componentInstance.value.set(500);
    fixture.componentInstance.max.set(0);
    await settle(fixture);
    expect(el.getAttribute("aria-valuemax")).toBe("100");
    expect(el.getAttribute("aria-valuenow")).toBe("100");

    fixture.componentInstance.value.set(-1);
    fixture.componentInstance.format.set((value, max) => `${value}/${max}`);
    await settle(fixture);
    expect(el.getAttribute("aria-valuenow")).toBe("0");
    expect(el.getAttribute("aria-valuetext")).toBe("0/100");
    expect(el.querySelector(".value")?.textContent).toBe("0/100");

    fixture.componentInstance.value.set(undefined);
    await settle(fixture);
    expect(el.hasAttribute("aria-valuenow")).toBe(false);
    expect(el.querySelector(".value")).toBeNull();
  });

  it("draws an arc for a determinate circle and ignores value elsewhere", async () => {
    @Component({
      imports: [MnProgressIndicator],
      template: `<mn-progress [variant]="variant()" value="25" />`,
    })
    class Host {
      variant = signal<"circle" | "spinner">("circle");
    }
    const fixture = await render(Host);
    expect(root().querySelector("svg.ring")).not.toBeNull();
    expect(
      root().querySelector(".ringArc")?.getAttribute("stroke-dasharray"),
    ).toBe("25 100");
    expect(root().getAttribute("aria-valuenow")).toBe("25");

    fixture.componentInstance.variant.set("spinner");
    await settle(fixture);
    expect(root().querySelector("svg.ring")).toBeNull();
    expect(root().hasAttribute("aria-valuenow")).toBe(false);
  });

  it("draws the indicator of every indeterminate variant", async () => {
    type Variant = "spinner" | "circle" | "wave" | "bar" | "dotted-bar";
    @Component({
      imports: [MnProgressIndicator],
      template: `<mn-progress [variant]="variant()" size="large" />`,
    })
    class Host {
      variant = signal<Variant>("spinner");
    }
    const fixture = await render(Host);
    const cases: Array<[Variant, string]> = [
      ["spinner", ".spinner.large > svg path"],
      ["circle", ".circle.large > svg path"],
      ["wave", ".waveContainer.large > svg.wave path"],
      ["bar", "div.barContainer.large > div.bar"],
      ["dotted-bar", "div.dottedBarContainer.large > div.dottedBar"],
    ];
    for (const [variant, selector] of cases) {
      fixture.componentInstance.variant.set(variant);
      await settle(fixture);
      expect(root().querySelector(selector), variant).not.toBeNull();
      expect(root().classList.contains("defaultWidth"), variant).toBe(
        variant === "bar" || variant === "dotted-bar",
      );
    }
  });
});
