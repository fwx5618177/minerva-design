import { mount } from "@vue/test-utils";
import { h } from "vue";
import { expect, it } from "vitest";
import Avatar from "./Avatar.vue";
import Badge from "./Badge.vue";
import Card from "./Card.vue";
import Tag from "./Tag.vue";
import ProgressIndicator from "./ProgressIndicator.vue";
import ThemeToggle from "./ThemeToggle.vue";
import ThemeProvider from "./ThemeProvider.vue";
import ConfigProvider from "./ConfigProvider.vue";

it("Avatar maps named sizes, CJK initials, alt and source-error fallback", async () => {
  const w = mount(Avatar, {
    props: { name: "张伟", size: "large", src: "bad.png", alt: "Profile" },
  });
  expect(w.attributes("style")).toContain("64px");
  expect(w.find("img").attributes("alt")).toBe("Profile");
  await w.find("img").trigger("error");
  expect(w.text()).toBe("张");
  await w.setProps({ src: "good.png", size: 35 });
  expect(w.find("img").exists()).toBe(true);
  expect(w.attributes("style")).toContain("35px");
});
it("Badge plain text is inline, rich children are attached and color/variant/size are explicit", () => {
  const inline = mount(Badge, {
    props: { color: "success", variant: "outline", size: "large" },
    slots: { default: "Ready" },
  });
  expect(inline.find("[data-badge]").text()).toBe("Ready");
  expect(inline.find("[data-badge]").classes()).toContain("mn-badge-outline");
  expect(inline.classes()).not.toContain("mn-badge-attached");
  const attached = mount(Badge, {
    props: { content: 5, position: "bottom-left" },
    slots: { default: () => h("button", "Inbox") },
  });
  expect(attached.classes()).toContain("mn-badge-attached");
  expect(attached.find("[data-badge]").attributes("data-position")).toBe(
    "bottom-left",
  );
});
it("Card uses padding tokens and interactive disabled action guards", async () => {
  const w = mount(Card, {
    props: {
      variant: "elevated",
      padding: "large",
      interactive: true,
      as: "button",
      disabled: true,
    },
    slots: { default: "Project" },
  });
  expect(w.classes()).toContain("mn-card-elevated");
  expect(w.attributes("data-padding")).toBe("large");
  await w.trigger("click");
  expect(w.emitted("click")).toBeUndefined();
  await w.setProps({ disabled: false });
  await w.trigger("click");
  expect(w.emitted("click")).toHaveLength(1);
});
it("Tag separates action/close, loading blocks and hides close, slots and pressed state work", async () => {
  const w = mount(Tag, {
    props: {
      clickable: true,
      closable: true,
      pressed: true,
      color: "danger",
      size: "large",
      closeLabel: "Remove important",
    },
    slots: { default: "Important", icon: "!" },
  });
  await w.find("[data-tag-action]").trigger("click");
  expect(w.emitted("click")).toHaveLength(1);
  await w.find('[aria-label="Remove important"]').trigger("click");
  expect(w.emitted("close")).toHaveLength(1);
  expect(w.emitted("click")).toHaveLength(1);
  expect(w.find("[data-tag-action]").attributes("aria-pressed")).toBe("true");
  await w.setProps({ loading: true });
  expect(w.find('[aria-label="Remove important"]').exists()).toBe(false);
  await w.find("[data-tag-action]").trigger("click");
  expect(w.emitted("click")).toHaveLength(1);
});
it.each(["spinner", "bar", "circle", "wave", "dottedBar"] as const)(
  "Progress %s renders its actual visual primitive and loading semantics",
  (variant) => {
    const w = mount(ProgressIndicator, {
      props: { variant, size: "large", color: "neutral", label: "Saving" },
    });
    expect(w.attributes("role")).toBe("progressbar");
    expect(w.attributes("aria-valuenow")).toBeUndefined();
    expect(w.find(`[data-progress-visual="${variant}"]`).exists()).toBe(true);
    expect(w.text()).toContain("Saving");
  },
);
it("Progress native numeric extension has bounded circle percentage and decorative mode hides semantics", async () => {
  const w = mount(ProgressIndicator, {
    props: { variant: "circle", value: 200, max: 100, showLabel: true },
  });
  expect(w.attributes("aria-valuenow")).toBe("100");
  expect(w.text()).toContain("100%");
  await w.setProps({ decorative: true });
  expect(w.attributes("role")).toBeUndefined();
  expect(w.attributes("aria-hidden")).toBe("true");
});
it("ThemeToggle offers system and localized custom labels, updating the real provider", async () => {
  const w = mount(ThemeProvider, {
    props: { disableStorage: true, defaultTheme: "light", locale: "zh" },
    slots: {
      default: () => h(ThemeToggle, { labels: { system: "跟随设备" } }),
    },
  });
  expect(w.findAll('[role="radio"]')).toHaveLength(3);
  const system = w.findAll("button").find((b) => b.text() === "跟随设备")!;
  await system.trigger("click");
  expect(w.emitted("themeChange")).toEqual([["system"]]);
  expect(system.attributes("aria-checked")).toBe("true");
});
it("ThemeToggle controlled rejection and showSystem=false", async () => {
  const w = mount(ThemeToggle, {
    props: { value: "light", showSystem: false },
  });
  expect(w.findAll("button")).toHaveLength(2);
  await w.findAll("button")[1].trigger("click");
  expect(w.emitted("change")).toEqual([["dark"]]);
  expect(w.findAll("button")[0].attributes("aria-checked")).toBe("true");
});
it("nested ConfigProvider locale updates built-in progress text without affecting outer scope", async () => {
  const w = mount(ConfigProvider, {
    props: { locale: "fr" },
    slots: {
      default: () => [
        h(ProgressIndicator),
        h(ConfigProvider, { locale: "zh" }, () => h(ProgressIndicator)),
      ],
    },
  });
  expect(
    w.findAll('[role="progressbar"]').map((n) => n.attributes("aria-label")),
  ).toEqual(["Chargement", "加载中"]);
  await w.setProps({ locale: "ja" });
  expect(
    w.findAll('[role="progressbar"]')[0].attributes("aria-label"),
  ).not.toBe("Chargement");
});
it("ConfigProvider locale reaches editing controls and respects explicit label overrides", async () => {
  const { default: TagInput } = await import("./TagInput.vue");
  const { default: KeyValueEditor } = await import("./KeyValueEditor.vue");
  const { default: Input } = await import("./Input.vue");
  const { default: Confirm } = await import("./Confirm.vue");
  const w = mount(ConfigProvider, {
    props: { locale: "zh" },
    slots: {
      default: () => [
        h(TagInput),
        h(KeyValueEditor),
        h(Input, { defaultValue: "text", clearable: true }),
        h(Confirm, { open: true, confirmLabel: "Save exact" }),
      ],
    },
  });
  expect(w.findComponent(TagInput).find("button").text()).not.toBe("Add tag");
  expect(w.findComponent(KeyValueEditor).find("button").text()).not.toBe(
    "Add entry",
  );
  expect(
    w
      .findComponent(Input)
      .find('[data-action="clear"]')
      .attributes("aria-label"),
  ).not.toBe("Clear");
  expect(w.findComponent(Confirm).text()).toContain("Save exact");
  expect(w.findComponent(Confirm).text()).not.toContain("Cancel");
  await w.setProps({ locale: "en" });
  expect(w.findComponent(TagInput).find("button").text()).toBe("Add tag");
});
it("ThemeProvider inherits parent locale and live locale reaches Upload and existing JsonField errors", async () => {
  const { default: Upload } = await import("./Upload.vue");
  const { default: JsonField } = await import("./JsonField.vue");
  const w = mount(ConfigProvider, {
    props: { locale: "zh" },
    slots: {
      default: () =>
        h(ThemeProvider, { disableStorage: true }, () => [
          h(Upload),
          h(JsonField),
          h(ProgressIndicator),
        ]),
    },
  });
  expect(w.find('[role="progressbar"]').attributes("aria-label")).toBe(
    "加载中",
  );
  expect(w.findComponent(Upload).text()).not.toContain("Choose files");
  await w.find("textarea").trigger("input", { detail: { value: "{" } });
  const before = w.find(".mn-error").text();
  await w.setProps({ locale: "en" });
  expect(w.find(".mn-error").text()).not.toBe(before);
});
