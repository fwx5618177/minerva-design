import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, h, ref } from "vue";
import { Rating, RatingScale } from ".";

const fills = (wrapper: ReturnType<typeof mount>) =>
  wrapper
    .findAll('[data-part="star"]')
    .map((star) => star.attributes("data-fill"));

describe("Rating", () => {
  it("display-only: an img with stars, value and count", () => {
    const wrapper = mount(Rating, {
      props: {
        modelValue: 7,
        showValue: true,
        ratingCount: 1200,
        size: "small",
      },
      attrs: { class: "mine", title: "Score" },
    });
    const root = wrapper.get('[data-minerva="rating"]');
    expect(root.attributes("role")).toBe("img");
    expect(root.attributes("aria-label")).toBe("7.0 / 10");
    expect(root.attributes("title")).toBe("Score");
    expect(root.attributes("data-readonly")).toBe("");
    expect(root.attributes("data-size")).toBe("small");
    expect(root.classes()).toEqual(
      expect.arrayContaining(["rating", "small", "mine"]),
    );
    expect(root.attributes("tabindex")).toBeUndefined();
    expect(fills(wrapper)).toEqual(["full", "full", "full", "half", "empty"]);
    expect(wrapper.get('[data-part="value"]').text()).toBe("7.0 (1,200)");
    expect(wrapper.get('[data-part="count"]').text()).toBe("(1,200)");
    expect(wrapper.find("button").exists()).toBe(false);
    const half = wrapper.get('[data-fill="half"]');
    expect(half.attributes("style")).toContain("12px");
  });

  it("interactive with v-model: a slider", async () => {
    const value = ref(4);
    const onChange = vi.fn();
    const wrapper = mount(
      defineComponent({
        setup: () => () =>
          h(Rating, {
            modelValue: value.value,
            "onUpdate:modelValue": (v: number) => (value.value = v),
            onChange,
          }),
      }),
    );
    const root = wrapper.get('[data-minerva="rating"]');
    expect(root.attributes("role")).toBe("slider");
    expect(root.attributes("tabindex")).toBe("0");
    expect(root.attributes("aria-valuenow")).toBe("4");
    expect(root.attributes("aria-valuemin")).toBe("0");
    expect(root.attributes("aria-valuemax")).toBe("10");
    expect(root.attributes("data-readonly")).toBeUndefined();
    expect(root.classes()).toContain("interactive");
    await root.trigger("keydown", { key: "ArrowRight" });
    expect(value.value).toBe(5);
    expect(onChange).toHaveBeenLastCalledWith(5);
    await root.trigger("keydown", { key: "End" });
    expect(value.value).toBe(10);
    await root.trigger("keydown", { key: "PageDown" });
    expect(value.value).toBe(8);
    await root.trigger("keydown", { key: "Home" });
    expect(value.value).toBe(0);
    await root.trigger("keydown", { key: "a" });
    expect(onChange).toHaveBeenCalledTimes(4);
  });

  it("previews on hover and picks half / full stars", async () => {
    const wrapper = mount(Rating, {
      props: { modelValue: 2, onChange: () => {} } as never,
    });
    const buttons = wrapper.findAll("button");
    expect(buttons).toHaveLength(5);
    await buttons[3].trigger("mouseenter");
    expect(fills(wrapper)).toEqual(["full", "full", "full", "full", "empty"]);
    await wrapper.get('[data-minerva="rating"]').trigger("mouseleave");
    expect(fills(wrapper)).toEqual([
      "full",
      "empty",
      "empty",
      "empty",
      "empty",
    ]);
    vi.spyOn(buttons[2].element, "getBoundingClientRect").mockReturnValue({
      left: 0,
      width: 20,
    } as DOMRect);
    await buttons[2].trigger("click", { clientX: 5 });
    expect(wrapper.emitted("change")!.at(-1)).toEqual([5]);
    await buttons[2].trigger("click", { clientX: 15 });
    expect(wrapper.emitted("change")!.at(-1)).toEqual([6]);
    expect(wrapper.emitted("update:modelValue")).toHaveLength(2);
  });

  it("readOnly forces display mode; a keydown listener can take over", async () => {
    const readOnly = mount(Rating, {
      props: { modelValue: 2, readOnly: true, onChange: () => {} } as never,
    });
    expect(readOnly.get('[data-minerva="rating"]').attributes("role")).toBe(
      "img",
    );
    await readOnly.get('[data-minerva="rating"]').trigger("keydown", {
      key: "ArrowRight",
    });
    expect(readOnly.emitted("change")).toBeUndefined();
    const taken = mount(Rating, {
      props: { modelValue: 2, onChange: () => {} } as never,
      attrs: {
        onKeydown: (e: KeyboardEvent) => e.preventDefault(),
        "aria-label": "Mine",
      },
    });
    const root = taken.get('[data-minerva="rating"]');
    expect(root.attributes("aria-label")).toBe("Mine");
    await root.trigger("keydown", { key: "ArrowRight" });
    expect(taken.emitted("change")).toBeUndefined();
  });

  it("follows the reading direction (RTL ArrowLeft increases)", async () => {
    const wrapper = mount(
      defineComponent({
        setup: () => () =>
          h("div", { dir: "rtl" }, [
            h(Rating, { modelValue: 4, onChange: () => {} }),
          ]),
      }),
      { attachTo: document.body },
    );
    const rating = wrapper.findComponent(Rating);
    await wrapper
      .get('[data-minerva="rating"]')
      .trigger("keydown", { key: "ArrowLeft" });
    expect(rating.emitted("change")).toEqual([[5]]);
  });
});

describe("RatingScale", () => {
  const dimensions = [
    { key: "plot", label: "Plot", value: 8, hint: "Story" },
    { key: "writing", label: "Writing", value: 6 },
  ];

  it("display-only rows", () => {
    const wrapper = mount(RatingScale, {
      props: { dimensions, size: "large" },
      attrs: { class: "mine" },
    });
    const root = wrapper.get('[data-minerva="rating-scale"]');
    expect(root.classes()).toEqual(expect.arrayContaining(["scale", "mine"]));
    expect(root.attributes("data-readonly")).toBe("");
    expect(root.attributes("data-size")).toBe("large");
    const rows = wrapper.findAll('[data-part="row"]');
    expect(rows).toHaveLength(2);
    expect(rows[0].attributes("title")).toBe("Story");
    expect(rows[0].get('[data-part="label"]').text()).toBe("Plot");
    const ratings = wrapper.findAll(
      '[data-minerva="rating"][data-part="root"]',
    );
    expect(ratings[0].attributes("role")).toBe("img");
    expect(ratings[0].attributes("aria-label")).toBe("Plot 8.0 / 10");
    expect(ratings[1].find('[data-part="value"]').text()).toBe("6.0");
  });

  it("interactive: emits change(key, value)", async () => {
    const wrapper = mount(RatingScale, {
      props: { dimensions, showValue: false, onChange: () => {} } as never,
    });
    expect(
      wrapper.get('[data-minerva="rating-scale"]').attributes("data-readonly"),
    ).toBeUndefined();
    const ratings = wrapper.findAll(
      '[data-minerva="rating"][data-part="root"]',
    );
    expect(ratings[1].attributes("role")).toBe("slider");
    expect(wrapper.find('[data-part="value"]').exists()).toBe(false);
    await ratings[1].trigger("keydown", { key: "ArrowUp" });
    expect(wrapper.emitted("change")).toEqual([["writing", 7]]);
    const readOnly = mount(RatingScale, {
      props: { dimensions, readOnly: true, onChange: () => {} } as never,
    });
    expect(
      readOnly.get('[data-minerva="rating-scale"]').attributes("data-readonly"),
    ).toBe("");
  });
});
