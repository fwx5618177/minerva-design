import { mount } from "@vue/test-utils";
import { it, expect } from "vitest";
import { h } from "vue";
import Alert from "./Alert.vue";
it("Alert applies semantic role, icon, variant/size/banner/color classes and rich slots", () => {
  const w = mount(Alert, {
    props: {
      color: "warning",
      variant: "outline",
      size: "large",
      banner: true,
      elevation: true,
      rounded: false,
    },
    slots: {
      title: "Careful",
      icon: () => h("span", { "data-custom-icon": "" }, "!"),
      action: () => h("button", "Review"),
      default: "Details",
    },
  });
  expect(w.attributes("role")).toBe("alert");
  expect(w.classes()).toEqual(
    expect.arrayContaining([
      "mn-alert-warning",
      "mn-alert-outline",
      "mn-alert-large",
      "mn-alert-banner",
      "mn-alert-elevated",
    ]),
  );
  expect(w.find("[data-custom-icon]").exists()).toBe(true);
  expect(w.text()).toContain("Review");
  expect(mount(Alert, { props: { color: "success" } }).attributes("role")).toBe(
    "status",
  );
  expect(
    mount(Alert, { props: { showIcon: false } })
      .find("[data-alert-icon]")
      .exists(),
  ).toBe(false);
});
it("Alert collapse state respects controlled rejection and localized custom labels", async () => {
  const w = mount(Alert, {
    props: {
      title: "Notice",
      collapsible: true,
      expanded: false,
      expandLabel: "Read details",
      collapseLabel: "Hide details",
    },
    slots: { default: "Body" },
  });
  expect(w.find("[data-alert-content]").attributes("style")).toContain(
    "display: none",
  );
  await w.find('[aria-label="Read details"]').trigger("click");
  expect(w.emitted("expand")).toEqual([[true]]);
  expect(w.find('[aria-label="Read details"]').exists()).toBe(true);
  await w.setProps({ expanded: true });
  expect(
    w.find('[aria-label="Hide details"]').attributes("aria-expanded"),
  ).toBe("true");
});
it("Alert close forwards the event and returns H5 focus to the next control", async () => {
  const target = document.createElement("button");
  target.textContent = "Next";
  document.body.append(target);
  const w = mount(Alert, {
    props: { title: "Saved", closable: true, returnFocus: () => target },
    attachTo: document.body,
  });
  await w.find('[aria-label="Close"]').trigger("click");
  expect(w.emitted("close")?.[0][0]).toBeInstanceOf(Event);
  expect(w.find('[role="status"]').exists()).toBe(false);
  expect(document.activeElement).toBe(target);
  w.unmount();
  target.remove();
});
