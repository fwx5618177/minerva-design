import { mount } from "@vue/test-utils";
import { it, expect, vi } from "vitest";
import Rating from "./Rating.vue";
it("Rating is a controlled keyboard slider with RTL half/full steps and cancelable consumer keys", async () => {
  const change = vi.fn();
  const w = mount(Rating, {
    props: { value: 4, max: 10, onChange: change, ariaLabel: "Quality" },
    attrs: { dir: "rtl" },
  });
  expect(w.attributes("role")).toBe("slider");
  expect(w.attributes("aria-label")).toBe("Quality");
  await w.trigger("keydown", { key: "ArrowLeft" });
  expect(change).toHaveBeenLastCalledWith(5);
  await w.trigger("keydown", { key: "PageDown" });
  expect(change).toHaveBeenLastCalledWith(2);
  await w.trigger("keydown", { key: "End" });
  expect(change).toHaveBeenLastCalledWith(10);
  expect(w.attributes("aria-valuenow")).toBe("4");
  await w.setProps({
    onKeydown: (event: KeyboardEvent) => event.preventDefault(),
  });
  await w.trigger("keydown", { key: "Home" });
  expect(change).toHaveBeenCalledTimes(3);
});
it("hover previews without committing; display-only rating has no keyboard stop or interactive buttons", async () => {
  const change = vi.fn();
  const w = mount(Rating, { props: { value: 2, onChange: change } });
  await w.findAll(".mn-star")[3].trigger("mouseenter");
  expect(w.findAll(".mn-star.mn-active")).toHaveLength(4);
  expect(change).not.toHaveBeenCalled();
  await w.trigger("mouseleave");
  expect(w.findAll(".mn-star.mn-active")).toHaveLength(1);
  const display = mount(Rating, { props: { value: 7 } });
  expect(display.attributes("role")).toBe("img");
  expect(display.attributes("tabindex")).toBeUndefined();
  expect(display.find("button").exists()).toBe(false);
});
it("RatingScale without a change consumer stays display-only and named dimensions become sliders when interactive", async () => {
  const { default: RatingScale } = await import("./RatingScale.vue");
  const display = mount(RatingScale, {
    props: { dimensions: [{ key: "quality", label: "Quality", value: 5 }] },
  });
  expect(display.find('[role="slider"]').exists()).toBe(false);
  const live = mount(RatingScale, {
    props: {
      dimensions: [{ key: "quality", label: "Quality", value: 5 }],
      onChange: vi.fn(),
    },
  });
  expect(live.get('[role="slider"]').attributes("aria-label")).toBe("Quality");
});
it("Rating renders the same SVG star path including a clipped half fill instead of font-dependent glyphs", () => {
  const w = mount(Rating, { props: { value: 5 } });
  const images = w.findAll("img");
  expect(images).toHaveLength(5);
  const half = decodeURIComponent(images[2].attributes("src")!);
  expect(half).toContain("M11.525 2.295");
  expect(half).toContain("clipPath");
  expect(half).toContain('width="12"');
});
