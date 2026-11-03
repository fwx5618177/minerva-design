import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import ActionsDemo from "../../../apps/docs/src/docs/pages/empty/vue/actions.vue";

describe("Vue Empty creation example", () => {
  it("offers a project creation action and confirms completion", async () => {
    const wrapper = mount(ActionsDemo);
    expect(wrapper.text()).toContain("Create your first project");
    const button = wrapper.find("button");
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe("Create project");
    expect(wrapper.text()).toContain(
      "Start by creating a project to organize your work.",
    );
    await button.trigger("click");
    expect(wrapper.get("output").text()).toBe("Project created");
  });
});
