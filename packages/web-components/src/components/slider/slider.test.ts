import { afterEach, describe, expect, it, vi } from "vitest";
import { MinervaSlider } from "./slider";
import "../../elements/slider";
import { customStates } from "../../internal/styling-hooks";
import { mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
});

const thumbs = (el: Element) =>
  Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('[role="slider"]'));
const control = (el: Element) =>
  el.shadowRoot!.querySelector<HTMLElement>('[part="control"]')!;

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

const pointer = (type: string, clientX = 0) =>
  new PointerEvent(type, { bubbles: true, button: 0, clientX, pointerId: 1 });

const key = (target: HTMLElement, k: string) =>
  target.dispatchEvent(
    new KeyboardEvent("keydown", { key: k, bubbles: true, cancelable: true }),
  );

describe("<minerva-slider>", () => {
  it("registers", () => {
    expect(customElements.get("minerva-slider")).toBe(MinervaSlider);
  });

  it("renders role=slider with its aria values", async () => {
    const el = await mount<MinervaSlider>(
      `<minerva-slider aria-label="Volume" value="30"></minerva-slider>`,
    );
    const [thumb] = thumbs(el);
    expect(thumb.getAttribute("aria-label")).toBe("Volume");
    expect(thumb.getAttribute("aria-valuenow")).toBe("30");
    expect(thumb.getAttribute("aria-valuemin")).toBe("0");
    expect(thumb.getAttribute("aria-valuemax")).toBe("100");
    expect(thumb.getAttribute("aria-orientation")).toBe("horizontal");
    expect(customStates(el).has("variant-single")).toBe(true);
  });

  it("steps with the keys: minerva-change and minerva-change-end", async () => {
    const el = await mount<MinervaSlider>(
      `<minerva-slider aria-label="v" value="50"></minerva-slider>`,
    );
    const changes: unknown[] = [];
    const ends: unknown[] = [];
    el.addEventListener("minerva-change", (e) =>
      changes.push((e as CustomEvent).detail.value),
    );
    el.addEventListener("minerva-change-end", (e) =>
      ends.push((e as CustomEvent).detail.value),
    );
    const native = vi.fn();
    el.addEventListener("change", native);
    key(thumbs(el)[0], "ArrowRight");
    await settle();
    key(thumbs(el)[0], "PageUp");
    await settle();
    key(thumbs(el)[0], "Home");
    await settle();
    expect(changes).toEqual([51, 61, 0]);
    expect(ends).toEqual([51, 61, 0]);
    expect(native).toHaveBeenCalledTimes(3);
    expect(thumbs(el)[0].getAttribute("aria-valuenow")).toBe("0");
  });

  it("drags with pointer capture; change-end fires once on release", async () => {
    const el = await mount<MinervaSlider>(
      `<minerva-slider aria-label="v" value="0"></minerva-slider>`,
    );
    const ends = vi.fn();
    el.addEventListener("minerva-change-end", ends);
    const track = control(el);
    mockTrack(track);
    track.dispatchEvent(pointer("pointerdown", 50));
    await settle();
    expect(customStates(el).has("dragging")).toBe(true);
    expect(thumbs(el)[0].getAttribute("part")).toContain("thumb--dragging");
    track.dispatchEvent(pointer("pointermove", 150));
    await settle();
    expect(ends).not.toHaveBeenCalled();
    track.dispatchEvent(pointer("pointerup", 150));
    await settle();
    expect(ends).toHaveBeenCalledTimes(1);
    expect((ends.mock.calls[0][0] as CustomEvent).detail).toEqual({
      value: 75,
    });
    expect(el.value).toBe(75);
    expect(customStates(el).has("dragging")).toBe(false);
  });

  it("range: two thumbs that cannot cross, submitted as two entries", async () => {
    const el = await mount<MinervaSlider>(
      `<form><minerva-slider aria-label="Price" name="price" range value="20,60" show-value></minerva-slider></form>`,
      "minerva-slider",
    );
    const [start, end] = thumbs(el);
    expect(start.getAttribute("aria-label")).toBe("Price Minimum");
    expect(end.getAttribute("aria-valuemin")).toBe("20");
    key(start, "End");
    await settle();
    expect(el.value).toEqual([60, 60]);
    expect(
      el.shadowRoot!.querySelector('[part="value"]')!.textContent,
    ).toContain("60 – 60");
    const data = new FormData(el.closest("form")!);
    expect(data.getAll("price")).toEqual(["60", "60"]);
    el.closest("form")!.reset();
    await settle();
    expect(el.value).toEqual([20, 60]);
  });

  it("marks attribute and marks-only stepping", async () => {
    const el = await mount<MinervaSlider>(
      `<minerva-slider aria-label="v" step="null" marks='[{"value":0,"label":"Low"},{"value":30},{"value":100}]'></minerva-slider>`,
    );
    const marks = el.shadowRoot!.querySelectorAll('[part~="mark"]');
    expect(marks).toHaveLength(3);
    expect(marks[0].getAttribute("part")).toContain("mark--active");
    expect(el.shadowRoot!.textContent).toContain("Low");
    key(thumbs(el)[0], "ArrowRight");
    await settle();
    expect(el.value).toBe(30);
  });

  it("disabled and readonly ignore interaction", async () => {
    const el = await mount<MinervaSlider>(
      `<minerva-slider aria-label="v" value="10" disabled></minerva-slider>`,
    );
    expect(thumbs(el)[0].getAttribute("tabindex")).toBe("-1");
    key(thumbs(el)[0], "ArrowRight");
    el.disabled = false;
    el.readOnly = true;
    await settle();
    expect(thumbs(el)[0].getAttribute("aria-readonly")).toBe("true");
    key(thumbs(el)[0], "ArrowRight");
    const track = control(el);
    mockTrack(track);
    track.dispatchEvent(pointer("pointerdown", 150));
    await settle();
    expect(el.value).toBe(10);
  });

  it("formatValue / getAriaValueText and vertical keys", async () => {
    const el = await mount<MinervaSlider>(
      `<minerva-slider aria-label="v" value="3" max="5" orientation="vertical" tooltip></minerva-slider>`,
    );
    el.formatValue = (v) => `${v}★`;
    await settle();
    expect(thumbs(el)[0].getAttribute("aria-valuetext")).toBe("3★");
    expect(el.shadowRoot!.querySelector('[part="tooltip"]')!.textContent).toBe(
      "3★",
    );
    el.getAriaValueText = (v) => `${v} stars`;
    await settle();
    expect(thumbs(el)[0].getAttribute("aria-valuetext")).toBe("3 stars");
    key(thumbs(el)[0], "ArrowUp");
    await settle();
    expect(el.value).toBe(4);
  });
});
