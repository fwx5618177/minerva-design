import { mount } from "@vue/test-utils";
import { h, type Component } from "vue";
import { renderToString } from "vue/server-renderer";
import { describe, expect, it } from "vitest";
import Input from "./Input/Input.vue";
import Textarea from "./Textarea/Textarea.vue";
import NumberInput from "./NumberInput/NumberInput.vue";
import Select from "./Select/Select.vue";
import Cascader from "./Cascader/Cascader.vue";
import Pagination from "./Pagination/Pagination.vue";
import CommandDialog from "./Command/CommandDialog.vue";
import CommandPanel from "./Command/CommandPanel.vue";

const width = () =>
  document.documentElement.style.getPropertyValue(
    "--_minerva-focus-ring-width",
  );
const cases: Array<[string, Component, Record<string, unknown>]> = [
  ["Input", Input, {}],
  ["Textarea", Textarea, {}],
  ["NumberInput", NumberInput, {}],
  ["Select", Select, {}],
  ["Cascader", Cascader, { options: [], label: "Field", name: "field" }],
  ["Pagination", Pagination, { total: 100 }],
  [
    "Command",
    CommandPanel,
    {
      items: [],
      maxResults: 10,
      placeholder: "Search",
      resultsLabel: "Results",
    },
  ],
];

describe("control focus modality lifecycle", () => {
  it.each(cases)(
    "%s registers document events and releases them on unmount",
    (_name, component, props) => {
      const before = width();
      const wrapper = mount(component, { props, attachTo: document.body });
      document.body.dispatchEvent(
        new PointerEvent("pointerdown", { bubbles: true }),
      );
      expect(width()).toBe("0px");
      document.body.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Tab", bubbles: true }),
      );
      expect(width()).toBe("2px");
      wrapper.unmount();
      expect(width()).toBe(before);
      document.body.dispatchEvent(
        new PointerEvent("pointerdown", { bubbles: true }),
      );
      expect(width()).toBe(before);
    },
  );

  it("tracks pointer opening before the first Command panel mounts", async () => {
    const wrapper = mount(CommandDialog, {
      props: { open: false, items: [] },
      attachTo: document.body,
    });
    document.body.dispatchEvent(
      new PointerEvent("pointerdown", { bubbles: true }),
    );
    await wrapper.setProps({ open: true });
    expect(width()).toBe("0px");
    wrapper.unmount();
  });

  it("registers the actual owner document when mounted in another document", () => {
    const doc = document.implementation.createHTMLDocument("Embedded");
    const wrapper = mount(Input, { attachTo: doc.body });
    doc.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
    expect(
      doc.documentElement.style.getPropertyValue("--_minerva-focus-ring-width"),
    ).toBe("0px");
    expect(width()).toBe("");
    wrapper.unmount();
    expect(
      doc.documentElement.style.getPropertyValue("--_minerva-focus-ring-width"),
    ).toBe("");
  });

  it("SSR renders controls without registering document listeners", async () => {
    const before = width();
    await renderToString(h(Input));
    document.body.dispatchEvent(
      new PointerEvent("pointerdown", { bubbles: true }),
    );
    expect(width()).toBe(before);
  });
});
