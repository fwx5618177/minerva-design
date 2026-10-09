import { mount } from "@vue/test-utils";
import { expect, it } from "vitest";
import { Input } from "./index";
it("forwards accessible identity and combobox state to the native input", () => {
  const wrapper = mount(Input, {
    attrs: {
      id: "query",
      role: "combobox",
      "aria-label": "Search",
      "aria-labelledby": "label",
      "aria-describedby": "hint",
      "aria-controls": "options",
      "aria-expanded": true,
      "aria-activedescendant": "first",
      "aria-autocomplete": "list",
    },
  });
  const input = wrapper.find("input");
  expect(input.attributes()).toMatchObject({
    id: "query",
    role: "combobox",
    "aria-label": "Search",
    "aria-labelledby": "label",
    "aria-describedby": "hint",
    "aria-controls": "options",
    "aria-expanded": "true",
    "aria-activedescendant": "first",
    "aria-autocomplete": "list",
  });
  expect(wrapper.attributes("role")).toBeUndefined();
  wrapper.unmount();
});
