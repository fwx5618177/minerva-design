import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { expect, it } from "vitest";
import Button from "./Button.vue";
it("preserves a locally registered Minerva Button instead of its native adapter", () => {
  const wrapper = mount(
    defineComponent({
      components: { Button },
      template: "<Button loading>Click</Button>",
    }),
  );
  expect(wrapper.get("button").classes()).toContain("mn-button");
  expect((wrapper.get("button").element as HTMLButtonElement).disabled).toBe(
    false,
  );
  expect(wrapper.get("button").attributes("aria-busy")).toBe("true");
  wrapper.unmount();
});

it("preserves a locally registered Minerva Input and its clear action", async () => {
  const { default: Input } = await import("./Input.vue");
  const wrapper = mount(
    defineComponent({
      components: { Input },
      template: '<Input model-value="Ada" clearable/>',
    }),
  );
  expect((wrapper.get("input").element as HTMLInputElement).value).toBe("Ada");
  await wrapper.get('[data-action="clear"]').trigger("click");
  expect(wrapper.getComponent(Input).emitted("change")).toEqual([[""]]);
  wrapper.unmount();
});
