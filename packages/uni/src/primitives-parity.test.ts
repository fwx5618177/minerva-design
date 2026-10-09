import { mount } from "@vue/test-utils";
import { h, nextTick } from "vue";
import { expect, it, vi } from "vitest";
import Divider from "./Divider.vue";
import CodeBlock from "./CodeBlock.vue";
import Empty from "./Empty.vue";
import Skeleton from "./Skeleton.vue";
import SkeletonText from "./SkeletonText.vue";
import Textarea from "./Textarea.vue";
import List from "./List.vue";
import ListItem from "./ListItem.vue";
import DescriptionList from "./DescriptionList.vue";
import FormControl from "./FormControl.vue";
import ConfigProvider from "./ConfigProvider.vue";

it("Divider consumes orientation, zero spacing/thickness, length, text alignment and flex stretch", async () => {
  const w = mount(Divider, {
    props: {
      orientation: "horizontal",
      variant: "dashed",
      thickness: 3,
      spacing: 0,
      length: 120,
      textAlign: "left",
      elevation: true,
    },
    slots: { default: "Chapter" },
  });
  expect(w.attributes("role")).toBe("separator");
  expect(w.text()).toBe("Chapter");
  expect(w.attributes("style")).toContain("120px");
  expect(
    (w.find(".mn-divider-line").element as HTMLElement).style.borderTopWidth,
  ).toBe("3px");
  expect(
    (w.find(".mn-divider-line").element as HTMLElement).style.borderTopStyle,
  ).toBe("dashed");
  await w.setProps({ orientation: "vertical", flexItem: true, thickness: 0 });
  expect(w.attributes("aria-orientation")).toBe("vertical");
  expect(w.text()).toBe("");
  expect(w.attributes("style")).toContain("align-self: stretch");
  expect((w.element as HTMLElement).style.borderLeftWidth).toBe("0px");
  expect((w.element as HTMLElement).style.borderLeftStyle).toBe("dashed");
});
it("CodeBlock defaults to non-copyable, wraps safely and caps its scroll region", () => {
  const w = mount(CodeBlock, {
    props: {
      code: '<script>alert("x")</script>',
      maxHeight: 64,
      ariaLabel: "Payload",
    },
  });
  expect(w.find("button").exists()).toBe(false);
  expect(w.find("script").exists()).toBe(false);
  expect(w.text()).toContain('<script>alert("x")</script>');
  expect(w.find('[role="region"]').attributes("aria-label")).toBe("Payload");
  expect(w.find('[role="region"]').attributes("style")).toContain("64px");
  expect(w.find(".mn-code").attributes("style")).toContain("pre-wrap");
});
it("CodeBlock announces native clipboard success/failure and only emits copied on success", async () => {
  const original = uni;
  let fail = false;
  vi.stubGlobal("uni", {
    ...original,
    setClipboardData: vi.fn((options) =>
      fail ? options.fail({ errMsg: "denied" }) : options.success(),
    ),
  });
  try {
    const w = mount(CodeBlock, {
      props: { code: "const x = 1", copyable: true },
    });
    await w.find("button").trigger("click");
    expect(w.emitted("copied")).toEqual([["const x = 1"]]);
    expect(w.find('[aria-live="polite"]').text()).toBe("Copied");
    fail = true;
    await w.find("button").trigger("click");
    expect(w.emitted("copied")).toHaveLength(1);
    expect(w.find('[aria-live="polite"]').text()).toBe("Copy failed");
    w.unmount();
  } finally {
    vi.stubGlobal("uni", original);
  }
});
it("Empty distinguishes omitted/null descriptions, hides null icons and exposes action slots", async () => {
  const w = mount(Empty, {
    props: {
      title: "Nothing here",
      size: "small",
      width: 220,
      height: 120,
      showShadow: true,
      icon: null,
    },
    slots: {
      action: () => h("button", "Create"),
      secondaryAction: () => h("button", "Refresh"),
    },
  });
  expect(w.attributes("role")).toBe("status");
  expect(w.text()).toContain("No Data");
  expect(w.find('[data-part="icon"]').exists()).toBe(false);
  expect(w.findAll("button").map((b) => b.text())).toEqual([
    "Create",
    "Refresh",
  ]);
  expect(w.attributes("style")).toContain("220px");
  await w.setProps({ description: null });
  expect(w.text()).not.toContain("No Data");
});
it("Skeleton distinguishes announced and decorative shapes, paragraph/title/avatar and ready content", async () => {
  const w = mount(Skeleton, {
    props: {
      variant: "card",
      paragraph: true,
      title: true,
      avatar: true,
      avatarSize: 52,
      animation: "false",
      active: true,
    },
    slots: { default: "Ready" },
  });
  expect(w.attributes("role")).toBe("status");
  expect(w.attributes("aria-busy")).toBe("true");
  expect(w.findAll('[data-part="line"]')).toHaveLength(4);
  expect(w.find('[data-part="avatar"]').attributes("style")).toContain("52px");
  expect(w.find('[data-part="title"]').exists()).toBe(true);
  await w.setProps({ loading: false });
  expect(w.text()).toBe("Ready");
  expect(w.find('[aria-busy="true"]').exists()).toBe(false);
  w.unmount();
  const circle = mount(Skeleton, {
    props: {
      decorative: true,
      variant: "circular",
      size: 28,
      width: 100,
      animation: "wave",
    },
  });
  expect(circle.attributes("aria-hidden")).toBe("true");
  expect(circle.attributes("role")).toBeUndefined();
  expect(circle.attributes("style")).toContain("width: 28px");
  expect(circle.attributes("style")).toContain("height: 28px");
});
it("SkeletonText honors token gap, shrinkLast, animation and invalid line counts", async () => {
  const w = mount(SkeletonText, {
    props: { lines: 3, gap: 2, shrinkLast: false, animation: "false" },
  });
  expect(w.attributes("style")).toContain("var(--space-2)");
  expect(w.findAll('[data-part="line"]')).toHaveLength(3);
  expect(w.findAll('[data-part="line"]')[2].attributes("style")).toContain(
    "100%",
  );
  await w.setProps({ shrinkLast: true });
  expect(w.findAll('[data-part="line"]')[2].attributes("style")).toContain(
    "70%",
  );
  await w.setProps({ lines: -2 });
  expect(w.findAll('[data-part="line"]')).toHaveLength(0);
});
it("Textarea inherits invalid/locking but lets explicit false override, while controlled rejection restores native value", async () => {
  const w = mount({
    render: () =>
      h(
        FormControl,
        { invalid: true, disabled: true },
        {
          default: () =>
            h(Textarea, {
              value: "locked",
              disabled: false,
              size: "large",
              variant: "filled",
              ariaLabel: "Notes",
              maxlength: 20,
            }),
        },
      ),
  });
  const input = w.find("textarea");
  expect(input.attributes("aria-invalid")).toBe("true");
  expect(input.attributes("disabled")).toBeUndefined();
  expect(input.classes()).toContain("mn-textarea-large");
  expect(input.classes()).toContain("mn-textarea-filled");
  await input.setValue("rejected");
  await nextTick();
  expect((w.find("textarea").element as HTMLTextAreaElement).value).toBe(
    "locked",
  );
});
it("Textarea supports local default state and emits one raw string change per native event", async () => {
  const w = mount(Textarea, { props: { defaultValue: "old" } });
  await w.find("textarea").setValue("new");
  expect(w.emitted("change")).toEqual([["new"]]);
  expect(w.emitted("update:modelValue")).toEqual([["new"]]);
  expect((w.element as HTMLTextAreaElement).value).toBe("new");
});
it("List composes density, borders, dividers and content/zero values without swallowing action events", async () => {
  const click = vi.fn();
  const w = mount(List, {
    props: { density: "compact", bordered: true, dividers: false },
    slots: {
      default: () => [
        h(
          ListItem,
          { primary: "Project", secondary: 0 },
          {
            icon: () => "*",
            actions: () => h("button", { onClick: click }, "Edit"),
          },
        ),
      ],
    },
  });
  expect(w.attributes("role")).toBe("list");
  expect(w.classes()).toContain("mn-list-compact");
  expect(w.classes()).toContain("mn-list-bordered");
  expect(w.classes()).not.toContain("mn-list-divided");
  expect(w.find('[role="listitem"]').text()).toContain("Project0");
  await w.find("button").trigger("click");
  expect(click).toHaveBeenCalledTimes(1);
});
it("DescriptionList exposes terms/descriptions including zero and applies bordered/striped alternatives", () => {
  const w = mount(DescriptionList, {
    props: {
      items: [
        { key: "count", label: "Items", value: 0 },
        { key: "name", label: "Name", value: "Ada" },
      ],
      bordered: true,
      striped: true,
    },
  });
  expect(w.findAll('[role="term"]').map((n) => n.text())).toEqual([
    "Items",
    "Name",
  ]);
  expect(w.findAll('[role="definition"]')[0].text()).toBe("0");
  expect(w.classes()).toContain("mn-description-bordered");
  expect(w.findAll(".mn-description-stripe")).toHaveLength(1);
});

it("Empty SVG uses the shared illustration and follows provider theme changes", async () => {
  const w = mount(ConfigProvider, {
    props: { mode: "light" },
    slots: { default: () => h(Empty, { useSvg: true, size: "small" }) },
  });
  const image = () => w.get("img.mn-empty-inbox").attributes("src")!;
  expect(image()).toMatch(/^data:image\/svg\+xml,/);
  const light = decodeURIComponent(image());
  expect(light).toContain('viewBox="0 0 64 41"');
  expect(light).toContain("M55 12.76");
  await w.setProps({ mode: "dark" });
  expect(decodeURIComponent(image())).not.toBe(light);
  w.unmount();
});

it("CodeBlock reports exactly the text passed to a pending native clipboard request", async () => {
  const original = uni;
  let done!: (result: unknown) => void;
  vi.stubGlobal("uni", {
    ...original,
    setClipboardData: vi.fn((options) => {
      done = options.success;
    }),
  });
  try {
    const w = mount(CodeBlock, { props: { code: "original", copyable: true } });
    await w.get("button").trigger("click");
    await w.setProps({ code: "changed" });
    done({});
    await nextTick();
    expect(w.emitted("copied")).toEqual([["original"]]);
    w.unmount();
  } finally {
    vi.stubGlobal("uni", original);
  }
});
it("SkeletonText supports fractional spacing tokens", () => {
  const w = mount(SkeletonText, { props: { gap: 0.5 } });
  expect(w.attributes("style")).toContain("var(--space-0-5)");
  w.unmount();
});
it("card paragraph lines retain plain line geometry instead of becoming nested cards", () => {
  const w = mount(Skeleton, { props: { variant: "card", paragraph: true } });
  const lines = w.findAll('[data-part="line"]');
  expect(lines).toHaveLength(4);
  for (const line of lines) {
    expect(line.classes()).not.toContain("mn-skeleton-card");
    expect(line.attributes("style")).toContain("height: 16px");
  }
  w.unmount();
});
