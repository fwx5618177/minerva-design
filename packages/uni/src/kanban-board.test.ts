import { h } from "vue";
import { mount } from "@vue/test-utils";
import { expect, it } from "vitest";
import ConfigProvider from "./ConfigProvider.vue";
import KanbanBoard from "./KanbanBoard.vue";
import KanbanColumn from "./KanbanColumn.vue";

it("kanban board renders a labelled region with the sizes in a scroll-x view", () => {
  const w = mount(KanbanBoard, {
    props: { columnWidth: 240, gap: "1rem", maxHeight: 400, fill: true },
    slots: { default: () => h(KanbanColumn, { title: "To do" }) },
  });
  const board = w.find('[role="region"]');
  expect(board.attributes("aria-label")).toBe("Board");
  expect(board.classes()).toContain("mn-fill");
  const style = (board.element as HTMLElement).style;
  expect(style.getPropertyValue("--kanban-column-width")).toBe("240px");
  expect(style.getPropertyValue("--kanban-gap")).toBe("1rem");
  const scroll = w.find(".mn-kanban-board__scroll");
  expect(scroll.attributes("scroll-x")).toBeDefined();
  expect((scroll.element as HTMLElement).style.maxHeight).toBe("400px");
  expect(w.find(".mn-kanban-board__track .mn-kanban-column").exists()).toBe(
    true,
  );
});

it("kanban column is a group named by its title and count with a list of cards", () => {
  const w = mount(KanbanColumn, {
    props: { title: "To do", count: 2, color: "success" },
    slots: {
      default: () => [
        h("view", { role: "listitem" }, "Write spec"),
        h("view", { role: "listitem" }, "Review"),
      ],
      actions: () => h("button", "Add"),
      footer: () => h("button", "Add card"),
    },
  });
  const group = w.find('[role="group"]');
  expect(group.attributes("aria-label")).toBe("To do, 2 items");
  expect(group.classes()).toContain("mn-color-success");
  expect(w.find(".mn-kanban-column__indicator").exists()).toBe(true);
  expect(w.find(".mn-kanban-column__count").attributes("aria-hidden")).toBe(
    "true",
  );
  expect(w.findAll('[role="list"] [role="listitem"]')).toHaveLength(2);
  expect(w.find(".mn-kanban-column__actions").text()).toBe("Add");
  expect(w.find(".mn-kanban-column__footer").text()).toBe("Add card");
  expect(w.find(".mn-kanban-column__empty").exists()).toBe(false);
});

it("kanban column shows the empty content, a custom color and a slotted title", async () => {
  const w = mount(KanbanColumn, { props: { title: "Done" } });
  expect(w.find('[role="list"]').exists()).toBe(false);
  expect(w.find(".mn-kanban-column__empty").text()).toBe("No items");
  await w.setProps({ empty: "Nothing shipped", color: "#7c3aed" });
  expect(w.find(".mn-kanban-column__empty").text()).toBe("Nothing shipped");
  expect(
    (w.find('[role="group"]').element as HTMLElement).style.getPropertyValue(
      "--kanban-column-color",
    ),
  ).toBe("#7c3aed");
  const rich = mount(KanbanColumn, {
    props: { count: 3 },
    slots: { title: () => h("strong", "Blocked") },
  });
  const group = rich.find('[role="group"]');
  expect(group.attributes("aria-label")).toBeUndefined();
  expect(group.attributes("aria-labelledby")).toMatch(/-count$/);
});

it("kanban labels follow the locale", () => {
  const w = mount(ConfigProvider, {
    props: { locale: "zh" },
    slots: {
      default: () =>
        h(KanbanBoard, null, () =>
          h(KanbanColumn, { title: "待办", count: 3 }),
        ),
    },
  });
  expect(w.find('[role="region"]').attributes("aria-label")).toBe("看板");
  expect(w.find('[role="group"]').attributes("aria-label")).toBe("待办，3 项");
  expect(w.find(".mn-kanban-column__empty").text()).toBe("暂无项目");
});
