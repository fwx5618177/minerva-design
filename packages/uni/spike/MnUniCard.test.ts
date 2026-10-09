import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import MnUniCard from "./MnUniCard.vue";

describe("MnUniCard (uni-app)", () => {
  it("renders uni built-ins via shims with slot + classes", () => {
    const w = mount(MnUniCard, {
      props: { title: "Order" },
      slots: { default: "Body text" },
    });
    const root = w.find('[data-uni="view"]');
    expect(root.element.tagName).toBe("DIV");
    expect(root.classes()).toContain("mn-card");
    expect(w.find(".mn-card__title").element.tagName).toBe("SPAN");
    expect(w.find(".mn-card__title").text()).toBe("Order");
    expect(w.find(".mn-card__body").text()).toBe("Body text");
    expect(w.find("button.mn-card__action").exists()).toBe(true);
  });

  it("tap calls uni.showToast and emits confirm", async () => {
    const w = mount(MnUniCard, { props: { title: "Order" } });
    await w.find("button").trigger("click");
    expect(uni.showToast).toHaveBeenCalledTimes(1);
    expect(uni.showToast).toHaveBeenCalledWith({
      title: "Order confirmed",
      icon: "success",
    });
    expect(w.emitted("confirm")).toHaveLength(1);
  });

  it("disabled: no toast, no emit", async () => {
    const w = mount(MnUniCard, { props: { title: "Order", disabled: true } });
    expect(w.find(".mn-card").classes()).toContain("mn-card--disabled");
    expect((w.find("button").element as HTMLButtonElement).disabled).toBe(true);
    await w.find("button").trigger("click");
    expect(uni.showToast).not.toHaveBeenCalled();
    expect(w.emitted("confirm")).toBeUndefined();
  });

  it("per-test override of global stubs works", () => {
    const w = mount(MnUniCard, {
      props: { title: "X" },
      global: {
        stubs: {
          UniTextHost: { template: '<em class="stubbed"><slot /></em>' },
        },
      },
    });
    expect(w.find("em.stubbed").text()).toBe("X");
  });

  it("mock is resettable per test", () => {
    expect(vi.isMockFunction(uni.showToast)).toBe(true);
    expect(uni.showToast).not.toHaveBeenCalled();
  });
});
