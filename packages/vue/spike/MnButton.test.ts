import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import MnButton from "./MnButton.vue";

describe("MnButton (VTU)", () => {
  it("renders default slot and base/variant classes", () => {
    const w = mount(MnButton, { slots: { default: "Save" } });
    const btn = w.find("button");
    expect(btn.exists()).toBe(true);
    expect(btn.text()).toBe("Save");
    expect(btn.classes()).toEqual(
      expect.arrayContaining(["mn-button", "mn-button--primary"]),
    );
    expect(btn.attributes("disabled")).toBeUndefined();
  });

  it("applies variant prop", () => {
    const w = mount(MnButton, { props: { variant: "ghost" } });
    expect(w.find("button").classes()).toContain("mn-button--ghost");
    expect(w.find("button").classes()).not.toContain("mn-button--primary");
  });

  it("emits press on click", async () => {
    const w = mount(MnButton, { slots: { default: "Go" } });
    await w.find("button").trigger("click");
    expect(w.emitted("press")).toHaveLength(1);
    expect(w.emitted("press")![0][0]).toBeInstanceOf(MouseEvent);
  });

  it("disabled: sets attribute and ignores click", async () => {
    const w = mount(MnButton, { props: { disabled: true } });
    const btn = w.find("button");
    expect(btn.attributes()).toHaveProperty("disabled");
    expect((btn.element as HTMLButtonElement).disabled).toBe(true);
    await btn.trigger("click");
    expect(w.emitted("press")).toBeUndefined();
  });

  it("loading: disables and ignores click", async () => {
    const w = mount(MnButton, { props: { loading: true } });
    const btn = w.find("button");
    expect((btn.element as HTMLButtonElement).disabled).toBe(true);
    expect(btn.attributes("aria-busy")).toBe("true");
    await btn.trigger("click");
    expect(w.emitted("press")).toBeUndefined();
  });

  it("reacts to prop updates", async () => {
    const w = mount(MnButton, { props: { disabled: true } });
    await w.setProps({ disabled: false });
    await w.find("button").trigger("click");
    expect(w.emitted("press")).toHaveLength(1);
  });

  it("renders slot markup", () => {
    const w = mount(MnButton, {
      slots: { default: '<span class="icon">*</span> Go' },
    });
    expect(w.find(".icon").exists()).toBe(true);
    expect(w.html()).toContain("Go");
  });
});
