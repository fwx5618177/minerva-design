import { mount } from "@vue/test-utils";
import { h, nextTick } from "vue";
import { it, expect } from "vitest";
import Badge from "./Badge.vue";
import Card from "./Card.vue";
import CardContent from "./CardContent.vue";
import Tag from "./Tag.vue";
import MonthCalendar from "./MonthCalendar.vue";
import Menu from "./Menu.vue";
import Avatar from "./Avatar.vue";
import AvatarGroup from "./AvatarGroup.vue";
it("native presentation state is represented by class bindings instead of unsupported attribute CSS selectors", async () => {
  const badge = mount(Badge, {
    props: { color: "success", position: "bottom-left" },
    slots: { default: () => h("span", "Icon") },
  });
  expect(badge.find("[data-badge]").classes()).toEqual(
    expect.arrayContaining(["mn-tone-success", "mn-position-bottom-left"]),
  );
  await badge.setProps({ color: "danger", position: "top-left" });
  expect(badge.find("[data-badge]").classes()).toEqual(
    expect.arrayContaining(["mn-tone-danger", "mn-position-top-left"]),
  );
  const card = mount(Card, {
    props: { padding: "large" },
    slots: {
      default: () => h(CardContent, { padding: "small" }, () => "Body"),
    },
  });
  expect(card.classes()).toContain("mn-padding-large");
  expect(card.findComponent(CardContent).attributes("style")).toContain(
    "var(--space-3)",
  );
  expect(mount(Tag, { props: { color: "warning" } }).classes()).toContain(
    "mn-tone-warning",
  );
  const calendar = mount(MonthCalendar, {
    props: {
      month: new Date(2026, 9, 1),
      rangeStart: "2026-10-02",
      rangeEnd: "2026-10-04",
    },
  });
  expect(calendar.find('[data-day="2026-10-03"]').classes()).toContain(
    "mn-calendar-in-range",
  );
  const menu = mount(Menu, {
    props: {
      defaultOpen: true,
      side: "left",
      align: "end",
      items: [{ value: "a", label: "A" }],
    },
    slots: { trigger: "Open" },
  });
  expect(menu.find('[role="menu"]').classes()).toEqual(
    expect.arrayContaining(["mn-side-left", "mn-align-end"]),
  );
});
it("AvatarGroup authored children respond to max/count while retaining real Avatar source/fallback content", async () => {
  const w = mount(AvatarGroup, {
    props: { max: 1, count: 2 },
    slots: {
      default: () => [
        h(Avatar, { name: "Ada Lovelace" }),
        h(Avatar, { name: "Grace Hopper" }),
      ],
    },
  });
  expect(w.text()).toContain("AL");
  expect(w.text()).not.toContain("GH");
  expect(w.text()).toContain("+3");
  expect(w.attributes("aria-label")).toContain("3");
  await w.setProps({ max: 2, count: 0 });
  await nextTick();
  expect(w.text()).toContain("GH");
  expect(w.text()).not.toContain("+");
});
