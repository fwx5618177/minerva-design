import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { h } from "vue";
import { Textarea } from ".";
import { FormControl } from "../FormControl";

describe("Textarea", () => {
  it("renders the textarea with classes, hooks and no resize", () => {
    const wrapper = mount(Textarea, {
      attrs: { class: "mine", style: "color: red", rows: 3, "data-part": "x" },
    });
    const textarea = wrapper.get("textarea");
    expect(textarea.classes()).toEqual(
      expect.arrayContaining(["textarea", "outline", "medium", "mine"]),
    );
    expect(textarea.attributes("style")).toContain("resize: none");
    expect(textarea.attributes("style")).toContain("color: red");
    expect(textarea.attributes("rows")).toBe("3");
    expect(textarea.attributes("data-minerva")).toBe("textarea");
    expect(textarea.attributes("data-part")).toBe("root");
  });

  it("v-model: uncontrolled and controlled", async () => {
    const free = mount(Textarea, { props: { defaultValue: "a" } });
    expect(free.get("textarea").element.value).toBe("a");
    await free.get("textarea").setValue("ab");
    expect(free.emitted("update:modelValue")).toEqual([["ab"]]);
    expect(free.get("textarea").element.value).toBe("ab");

    const held = mount(Textarea, { props: { modelValue: "x" } });
    await held.get("textarea").setValue("xy");
    expect(held.emitted("update:modelValue")).toEqual([["xy"]]);
    expect(held.get("textarea").element.value).toBe("x");
  });

  it("sets the states", () => {
    const wrapper = mount(Textarea, {
      props: {
        invalid: true,
        required: true,
        disabled: true,
        readOnly: true,
        size: "large",
        variant: "filled",
      },
    });
    const textarea = wrapper.get("textarea");
    expect(textarea.classes()).toEqual(
      expect.arrayContaining(["invalid", "large", "filled"]),
    );
    expect(textarea.attributes("aria-invalid")).toBe("true");
    for (const key of ["invalid", "required", "disabled", "readonly"]) {
      expect(textarea.attributes(`data-${key}`)).toBe("");
    }
    const ariaInvalid = mount(Textarea, { attrs: { "aria-invalid": "true" } });
    expect(ariaInvalid.get("textarea").classes()).toContain("invalid");
  });

  it("is wired into a FormControl", () => {
    const wrapper = mount(FormControl, {
      props: { id: "bio", required: true, disabled: true },
      slots: { default: () => h(Textarea) },
    });
    const textarea = wrapper.get("textarea");
    expect(textarea.attributes("id")).toBe("bio");
    expect(textarea.attributes("aria-required")).toBe("true");
    expect(textarea.attributes("disabled")).toBeDefined();
    expect(textarea.attributes("data-required")).toBe("");
  });
});
