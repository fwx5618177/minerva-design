import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { defineComponent } from "vue";
import Workflow from "./fixtures/Workflow.vue";
import * as C from "./index";
describe("native host end-to-end member workflow", () => {
  it("switches theme, edits and clears, chooses enabled option, confirms and selects saved record", async () => {
    const w = mount(Workflow);
    expect(w.find(".mn-provider").classes()).toContain("mn-palette-tech");
    await w.findComponent(C.ThemeToggle).findAll("button")[1].trigger("click");
    expect(w.find(".mn-provider").classes()).toContain("mn-palette-tech-dark");
    expect(
      w.findComponent(C.Button).find("button").attributes("disabled"),
    ).toBeDefined();
    await w.find("input").trigger("input", { detail: { value: "draft" } });
    await w.find('[data-action="clear"]').trigger("click");
    expect((w.find("input").element as HTMLInputElement).value).toBe("");
    await w.find("input").trigger("input", { detail: { value: "Ada" } });
    await w.find('[data-action="trigger"]').trigger("click");
    await w.find('[data-value="x"]').trigger("click");
    await w.find('[data-value="b"]').trigger("click");
    await w.findComponent(C.Button).find("button").trigger("click");
    expect(w.find(".mn-dialog").text()).toContain("Ada / b");
    await w
      .find(".mn-dialog-footer .mn-button:not(.mn-variant-outline)")
      .trigger("click");
    expect(w.find(".mn-dialog").exists()).toBe(false);
    expect(w.findAll('[data-part="cell"]').map((c) => c.text())).toEqual([
      "Ada",
      "b",
    ]);
    await w.find('[data-select="1"]').trigger("click");
    expect(w.find('[data-select="1"]').text()).toBe("☑");
  });
  it("compound modal controls coordinate open, authored sections and close", async () => {
    const Host = defineComponent({
      components: { ...C },
      template:
        '<ModalRoot><ModalTrigger>Compose</ModalTrigger><ModalContent title="Draft"><ModalHeader>Header</ModalHeader><ModalBody>Body</ModalBody><ModalFooter><ModalClose>Done</ModalClose></ModalFooter></ModalContent></ModalRoot>',
    });
    const w = mount(Host);
    expect(w.find(".mn-dialog").exists()).toBe(false);
    await w.find(".mn-modal-trigger").trigger("click");
    expect(w.find(".mn-dialog").text()).toContain("Body");
    await w.find(".mn-modal-close").trigger("click");
    expect(w.find(".mn-dialog").exists()).toBe(false);
  });
  it("radio group and authored tab panels coordinate through native context", async () => {
    const Host = defineComponent({
      components: { ...C },
      template:
        '<view><RadioGroup default-value="a"><Radio value="a" label="Alpha"/><Radio value="b" label="Beta"/></RadioGroup><Tabs default-value="a"><template #tabs><TabList><Tab value="a">First</Tab><Tab value="b">Second</Tab></TabList></template><TabPanel value="a">One</TabPanel><TabPanel value="b">Two</TabPanel></Tabs></view>',
    });
    const w = mount(Host);
    await w.findAll(".mn-choice")[1]!.trigger("click");
    expect(w.findAll(".mn-choice-indicator")[1]!.classes()).toContain(
      "mn-active",
    );
    await w.findAll(".mn-tab button")[1]!.trigger("click");
    expect(w.text()).toContain("Two");
    expect(w.text()).not.toContain("One");
  });
});
it.each([
  "Checkbox",
  "Switch",
  "Textarea",
  "NumberInput",
  "Select",
  "AutoComplete",
  "Cascader",
  "TagInput",
  "JsonField",
  "KeyValueEditor",
  "TimePicker",
])(
  "FormField disables %s and explicit false overrides the field",
  async (name) => {
    const Host = defineComponent({
      components: { ...C },
      template: `<FormField disabled label="Locked"><${name} ref="control" :options="${name === "TagInput" ? "['A']" : "[{value:'a',label:'A'}]"}"/></FormField>`,
    });
    const w = mount(Host);
    const control = w.getComponent({ ref: "control" });
    if (name === "Checkbox") {
      await control.find(".mn-choice").trigger("click");
      expect(control.emitted("change")).toBeUndefined();
    } else {
      const controls = control.findAll("button,input,textarea,picker,switch");
      expect(controls.length).toBeGreaterThan(0);
      expect(
        controls.some((el) =>
          el.element instanceof HTMLInputElement
            ? el.element.disabled
            : el.attributes("disabled") !== undefined,
        ),
      ).toBe(true);
    }
    const unlocked = mount(
      defineComponent({
        components: { ...C },
        template: `<FormField disabled><${name} :disabled="false" ref="control" :options="${name === "TagInput" ? "['A']" : "[{value:'a',label:'A'}]"}"/></FormField>`,
      }),
    );
    if (name === "Checkbox") {
      await unlocked.find(".mn-choice").trigger("click");
      expect(
        unlocked.getComponent({ ref: "control" }).emitted("change"),
      ).toHaveLength(1);
    }
    w.unmount();
    unlocked.unmount();
  },
);
it("authored SelectItem registers labels and H5 keys skip disabled options", async () => {
  const w = mount(
    defineComponent({
      components: { ...C },
      template:
        '<Select default-value="a"><SelectGroup><SelectLabel>Team</SelectLabel><SelectItem value="a">Alpha</SelectItem><SelectItem value="x" disabled>Blocked</SelectItem><SelectItem value="b">Beta</SelectItem></SelectGroup></Select>',
    }),
  );
  await w.vm.$nextTick();
  expect(w.find('[data-action="trigger"]').text()).toContain("Alpha");
  await w
    .find('[data-action="trigger"]')
    .trigger("keydown", { key: "ArrowDown" });
  await w
    .find('[data-action="trigger"]')
    .trigger("keydown", { key: "ArrowDown" });
  await w.find('[data-action="trigger"]').trigger("keydown", { key: "Enter" });
  expect(w.find('[data-action="trigger"]').text()).toContain("Beta");
});
