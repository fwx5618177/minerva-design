import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import {
  MinervaRating,
  MinervaRatingScale,
  type RatingDimension,
} from "./rating";
import "../../elements/rating";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

const slider = (el: MinervaRating) => $(el, ".rating");

async function setup(attrs: string) {
  const el = await mount<MinervaRating>(
    `<minerva-rating interactive aria-label="Score" ${attrs}></minerva-rating>`,
  );
  const onChange = vi.fn();
  el.addEventListener("minerva-change", (e) =>
    onChange((e as CustomEvent).detail.value),
  );
  return { el, onChange };
}

describe("<minerva-rating>", () => {
  it("is display-only by default, like the React Rating without onChange", async () => {
    document.body.innerHTML = `<minerva-rating value="6" aria-label="Score"></minerva-rating>`;
    await settle();
    const el = document.querySelector("minerva-rating")!;
    const base = el.shadowRoot!.querySelector("[part=base]")!;
    expect(base).toHaveAttribute("role", "img");
    el.setAttribute("interactive", "");
    await settle();
    expect(
      el.shadowRoot!.querySelector("[part=base]")!.getAttribute("role"),
    ).toBe("slider");
  });

  it("registers both elements", () => {
    expect(customElements.get("minerva-rating")).toBe(MinervaRating);
    expect(customElements.get("minerva-rating-scale")).toBe(MinervaRatingScale);
  });

  it("draws the score on 5 stars with half stars", async () => {
    const el = await mount<MinervaRating>(
      `<minerva-rating value="7" readonly show-value rating-count="1234"></minerva-rating>`,
    );
    const stars = Array.from(el.shadowRoot!.querySelectorAll(".stars > .star"));
    expect(stars.map((s) => s.classList[1])).toEqual([
      "full",
      "full",
      "full",
      "half",
      "empty",
    ]);
    const root = slider(el);
    expect(root).toHaveAttribute("role", "img");
    expect(root).toHaveAttribute("aria-label", "7.0 / 10");
    expect($(el, ".value strong").textContent).toBe("7.0");
    expect($(el, ".count").textContent).toBe("(1,234)");
    expect(root.classList).not.toContain("interactive");
  });

  it("is an interactive slider by default", async () => {
    const { el } = await setup('value="4" size="large"');
    const root = slider(el);
    expect(root).toHaveAttribute("role", "slider");
    expect(root).toHaveAttribute("tabindex", "0");
    expect(root).toHaveAttribute("aria-valuenow", "4");
    expect(root).toHaveAttribute("aria-valuemax", "10");
    expect(root).toHaveAttribute("aria-label", "Score");
    expect(root.classList).toContain("interactive");
    expect(root.classList).toContain("large");
    expect(el.shadowRoot!.querySelectorAll("button.starButton")).toHaveLength(
      5,
    );
  });

  it("arrows step half a star, PageUp / PageDown a whole star, clamped", async () => {
    const { el, onChange } = await setup('value="5"');
    const onNative = vi.fn();
    el.addEventListener("change", onNative);
    slider(el).focus();
    await userEvent.keyboard("{PageUp}");
    expect(onChange).toHaveBeenLastCalledWith(7);
    await userEvent.keyboard("{PageUp}{PageUp}");
    expect(onChange).toHaveBeenLastCalledWith(10);
    await el.updateComplete;
    expect(slider(el)).toHaveAttribute("aria-valuenow", "10");
    await userEvent.keyboard("{PageDown}");
    expect(onChange).toHaveBeenLastCalledWith(8);
    await userEvent.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenLastCalledWith(9);
    await userEvent.keyboard("{ArrowDown}");
    expect(onChange).toHaveBeenLastCalledWith(8);
    await userEvent.keyboard("{Home}{PageDown}");
    expect(onChange).toHaveBeenLastCalledWith(0);
    await userEvent.keyboard("{End}");
    expect(el.value).toBe(10);
    expect(onNative).toHaveBeenCalled();
  });

  it("5-point scale: PageUp adds one, arrows half", async () => {
    const { el, onChange } = await setup('value="2" max="5"');
    slider(el).focus();
    await userEvent.keyboard("{PageUp}");
    expect(onChange).toHaveBeenLastCalledWith(3);
    await userEvent.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenLastCalledWith(3.5);
    await userEvent.keyboard("{PageDown}");
    expect(onChange).toHaveBeenLastCalledWith(2.5);
  });

  it("RTL: ArrowLeft increases and ArrowRight decreases", async () => {
    document.body.innerHTML = `<div dir="rtl"><minerva-rating interactive aria-label="Score" value="5"></minerva-rating></div>`;
    await settle();
    const el = document.querySelector<MinervaRating>("minerva-rating")!;
    const onChange = vi.fn();
    el.addEventListener("minerva-change", (e) =>
      onChange((e as CustomEvent).detail.value),
    );
    slider(el).focus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(onChange).toHaveBeenLastCalledWith(6);
    await userEvent.keyboard("{ArrowRight}{ArrowRight}");
    expect(onChange).toHaveBeenLastCalledWith(4);
    await userEvent.keyboard("{ArrowUp}{PageUp}");
    expect(onChange).toHaveBeenLastCalledWith(7);
  });

  it("clicking a star picks it; hover previews", async () => {
    const { el, onChange } = await setup('value="0"');
    const buttons =
      el.shadowRoot!.querySelectorAll<HTMLButtonElement>("button.starButton");
    // happy-dom has no layout (zero-width rects): a click counts as the
    // right half of the star, i.e. a full star
    await userEvent.click(buttons[2]);
    expect(onChange).toHaveBeenLastCalledWith(6);
    buttons[4].dispatchEvent(new MouseEvent("mouseenter"));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelectorAll(".stars .star.full")).toHaveLength(
      5,
    );
    slider(el).dispatchEvent(new MouseEvent("mouseleave"));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelectorAll(".stars .star.full")).toHaveLength(
      3,
    );
  });

  it("read-only and disabled ratings ignore the keyboard", async () => {
    const { el, onChange } = await setup('value="5" readonly');
    slider(el).focus();
    await userEvent.keyboard("{ArrowUp}");
    expect(onChange).not.toHaveBeenCalled();
    el.readonly = false;
    el.disabled = true;
    await el.updateComplete;
    expect(slider(el)).toHaveAttribute("role", "img");
    expect(slider(el)).toHaveAttribute("aria-disabled", "true");
  });

  it("participates in forms: FormData, required, reset, disabled", async () => {
    document.body.innerHTML = `<form><minerva-rating interactive name="score" required aria-label="Score"></minerva-rating></form>`;
    await settle();
    const form = document.querySelector("form")!;
    const el = form.querySelector<MinervaRating>("minerva-rating")!;
    expect(new FormData(form).get("score")).toBe("0");
    expect(el.checkValidity()).toBe(false);
    expect(el.validity?.valueMissing).toBe(true);
    expect(el.validationMessage).toBe("Please fill out this field.");
    slider(el).focus();
    await userEvent.keyboard("{End}");
    await el.updateComplete;
    expect(new FormData(form).get("score")).toBe("10");
    expect(form.checkValidity()).toBe(true);
    form.reset();
    await el.updateComplete;
    expect(el.value).toBe(0);
    el.value = 4;
    el.disabled = true;
    await el.updateComplete;
    expect(new FormData(form).get("score")).toBeNull();
    el.formStateRestoreCallback("6");
    await el.updateComplete;
    expect(el.value).toBe(6);
  });

  it("is named by <label for>", async () => {
    const el = await mount<MinervaRating>(
      `<label for="r">Quality</label><minerva-rating interactive id="r"></minerva-rating>`,
      "minerva-rating",
    );
    expect(slider(el)).toHaveAttribute("aria-label", "Quality");
  });

  it("localizes the validation message", async () => {
    document.documentElement.lang = "fr";
    const el = await mount<MinervaRating>(
      `<minerva-rating interactive required aria-label="x"></minerva-rating>`,
    );
    el.requestUpdate();
    await el.updateComplete;
    expect(el.validationMessage).not.toBe("Please fill out this field.");
  });

  it("warns in development when the value is out of range", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await setup('value="12" max="10"');
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("outside"));
  });
});

describe("<minerva-rating-scale>", () => {
  const dims: RatingDimension[] = [
    { key: "plot", label: "Plot", value: 8, hint: "Story" },
    { key: "acting", label: "Acting", value: 6 },
  ];

  it("renders one labelled rating per dimension and re-emits changes with the key", async () => {
    const el = await mount<MinervaRatingScale>(
      `<minerva-rating-scale interactive max="10"></minerva-rating-scale>`,
    );
    el.dimensions = dims;
    await settle();
    const rows = el.shadowRoot!.querySelectorAll(".scaleRow");
    expect(rows).toHaveLength(2);
    expect(rows[0]).toHaveAttribute("title", "Story");
    expect(rows[0].querySelector(".scaleLabel")!.textContent).toBe("Plot");
    const ratings =
      el.shadowRoot!.querySelectorAll<MinervaRating>("minerva-rating");
    expect(ratings[0].value).toBe(8);
    expect(ratings[0].showValue).toBe(true);
    expect(ratings[0].getAttribute("aria-label")).toBe("Plot 8.0 / 10");

    const onChange = vi.fn();
    document.body.addEventListener("minerva-change", onChange);
    $(ratings[1], ".rating").focus();
    await userEvent.keyboard("{ArrowUp}");
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].detail).toMatchObject({
      key: "acting",
      value: 7,
    });
    expect(el.dimensions[1].value).toBe(7);
    document.body.removeEventListener("minerva-change", onChange);
  });

  it("read-only scale renders display ratings", async () => {
    const el = await mount<MinervaRatingScale>(
      `<minerva-rating-scale readonly hide-value></minerva-rating-scale>`,
    );
    el.dimensions = dims;
    await settle();
    const rating =
      el.shadowRoot!.querySelector<MinervaRating>("minerva-rating")!;
    expect(rating.readonly).toBe(true);
    expect(rating.showValue).toBe(false);
    expect($(rating, ".rating")).toHaveAttribute("role", "img");
  });
});
