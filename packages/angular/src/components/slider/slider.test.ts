import { Component, signal } from "@angular/core";
import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, settle } from "../../testing";
import { MnFormControl, MnFormLabel } from "../form-control";
import { MnSlider, type SliderValue } from ".";

afterEach(() => {
  document.body.innerHTML = "";
});

const thumbs = () =>
  Array.from(document.querySelectorAll<HTMLElement>('[role="slider"]'));
const control = () =>
  document.querySelector<HTMLElement>('[data-part="control"]')!;

function mockTrack(el: HTMLElement) {
  el.getBoundingClientRect = () =>
    ({
      left: 0,
      right: 200,
      top: 0,
      bottom: 20,
      width: 200,
      height: 20,
    }) as DOMRect;
}

describe("MnSlider", () => {
  it("renders role=slider with aria values and steps with the keys", async () => {
    const changes: SliderValue[] = [];
    const ends: SliderValue[] = [];
    @Component({
      imports: [MnSlider],
      template: `<mn-slider
        aria-label="Volume"
        [defaultValue]="50"
        (valueChange)="changes.push($event)"
        (changeEnd)="ends.push($event)"
      />`,
    })
    class Host {
      changes = changes;
      ends = ends;
    }
    const fixture = await render(Host);
    const [thumb] = thumbs();
    expect(thumb.getAttribute("aria-label")).toBe("Volume");
    expect(thumb.getAttribute("aria-valuenow")).toBe("50");
    expect(thumb.getAttribute("aria-orientation")).toBe("horizontal");
    fireEvent.keyDown(thumb, { key: "ArrowRight" });
    await settle(fixture);
    fireEvent.keyDown(thumb, { key: "PageDown" });
    await settle(fixture);
    expect(thumbs()[0].getAttribute("aria-valuenow")).toBe("41");
    expect(changes).toEqual([51, 41]);
    expect(ends).toEqual([51, 41]);
  });

  it("drags: valueChange while moving, changeEnd once on release", async () => {
    const ends = vi.fn();
    @Component({
      imports: [MnSlider],
      template: `<mn-slider
        aria-label="v"
        [(value)]="value"
        (changeEnd)="ends($event)"
      />`,
    })
    class Host {
      value = signal<SliderValue>(0);
      ends = ends;
    }
    const fixture = await render(Host);
    const el = control();
    mockTrack(el);
    fireEvent.pointerDown(el, { button: 0, clientX: 50, pointerId: 1 });
    await settle(fixture);
    expect(
      document
        .querySelector('[data-part="root"]')!
        .hasAttribute("data-dragging"),
    ).toBe(true);
    fireEvent.pointerMove(el, { clientX: 100, pointerId: 1 });
    await settle(fixture);
    expect(ends).not.toHaveBeenCalled();
    fireEvent.pointerUp(el, { pointerId: 1 });
    await settle(fixture);
    expect(ends).toHaveBeenCalledWith(50);
    expect(fixture.componentInstance.value()).toBe(50);
  });

  it("range: thumbs cannot cross; hidden inputs and value label", async () => {
    @Component({
      imports: [MnSlider],
      template: `<mn-slider
        aria-label="Price"
        range
        [defaultValue]="[20, 60]"
        name="price"
        showValue
      />`,
    })
    class Host {}
    const fixture = await render(Host);
    const [start, end] = thumbs();
    expect(start.getAttribute("aria-label")).toBe("Price Minimum");
    expect(end.getAttribute("aria-valuemin")).toBe("20");
    fireEvent.keyDown(start, { key: "End" });
    await settle(fixture);
    expect(thumbs()[0].getAttribute("aria-valuenow")).toBe("60");
    const inputs = document.querySelectorAll<HTMLInputElement>(
      'input[name="price"]',
    );
    expect([...inputs].map((i) => i.value)).toEqual(["60", "60"]);
    expect(document.querySelector('[data-part="value"]')!.textContent).toBe(
      "60 – 60",
    );
  });

  it("marks, disabled and FormControl wiring", async () => {
    @Component({
      imports: [MnSlider, MnFormControl, MnFormLabel],
      template: ` <mn-slider aria-label="m" [step]="null" [marks]="marks" />
        <mn-form-control invalid disabled>
          <mn-form-label>Brightness</mn-form-label>
          <mn-slider />
        </mn-form-control>`,
    })
    class Host {
      marks = [{ value: 0, label: "Low" }, { value: 40 }, { value: 100 }];
    }
    const fixture = await render(Host);
    const [marked, fielded] = thumbs();
    expect(document.querySelectorAll('[data-part="mark"]')).toHaveLength(3);
    fireEvent.keyDown(marked, { key: "ArrowRight" });
    await settle(fixture);
    expect(thumbs()[0].getAttribute("aria-valuenow")).toBe("40");
    expect(fielded.getAttribute("aria-invalid")).toBe("true");
    expect(fielded.getAttribute("aria-disabled")).toBe("true");
    const labelId = fielded.getAttribute("aria-labelledby")!;
    expect(document.getElementById(labelId)!.textContent).toContain(
      "Brightness",
    );
    fireEvent.keyDown(fielded, { key: "ArrowRight" });
    await settle(fixture);
    expect(thumbs()[1].getAttribute("aria-valuenow")).toBe("0");
  });
});
