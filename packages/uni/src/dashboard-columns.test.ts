import { h } from "vue";
import { mount } from "@vue/test-utils";
import { expect, it, vi } from "vitest";
import ConfigProvider from "./ConfigProvider.vue";
import DashboardColumns from "./DashboardColumns.vue";
import DashboardColumn from "./DashboardColumn.vue";
import DashboardCard from "./DashboardCard.vue";

it("DashboardColumns renders a labelled region with the sizes in a scroll-x view", () => {
  const w = mount(DashboardColumns, {
    props: { columnWidth: 240, gap: "1rem", maxHeight: 400, fill: true },
    slots: { default: () => h(DashboardColumn, { title: "To do" }) },
  });
  const board = w.find('[role="region"]');
  expect(board.attributes("aria-label")).toBe("Board");
  expect(board.classes()).toContain("mn-fill");
  const style = (board.element as HTMLElement).style;
  expect(style.getPropertyValue("--dashboard-column-width")).toBe("240px");
  expect(style.getPropertyValue("--dashboard-gap")).toBe("1rem");
  const scroll = w.find(".mn-dashboard-columns__scroll");
  expect(scroll.attributes("scroll-x")).toBeDefined();
  expect((scroll.element as HTMLElement).style.maxHeight).toBe("400px");
  expect(
    w.find(".mn-dashboard-columns__track .mn-dashboard-column").exists(),
  ).toBe(true);
});

it("dashboard column is a group named by its title and count with a list of cards", () => {
  const w = mount(DashboardColumn, {
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
  expect(w.find(".mn-dashboard-column__indicator").exists()).toBe(true);
  expect(w.find(".mn-dashboard-column__count").attributes("aria-hidden")).toBe(
    "true",
  );
  expect(w.findAll('[role="list"] [role="listitem"]')).toHaveLength(2);
  expect(w.find(".mn-dashboard-column__actions").text()).toBe("Add");
  expect(w.find(".mn-dashboard-column__footer").text()).toBe("Add card");
  expect(w.find(".mn-dashboard-column__empty").exists()).toBe(false);
});

it("dashboard column shows the empty content, a custom color and a slotted title", async () => {
  const w = mount(DashboardColumn, { props: { title: "Done" } });
  expect(w.find('[role="list"]').exists()).toBe(false);
  expect(w.find(".mn-dashboard-column__empty").text()).toBe("No items");
  await w.setProps({ empty: "Nothing shipped", color: "#7c3aed" });
  expect(w.find(".mn-dashboard-column__empty").text()).toBe("Nothing shipped");
  expect(
    (w.find('[role="group"]').element as HTMLElement).style.getPropertyValue(
      "--dashboard-column-color",
    ),
  ).toBe("#7c3aed");
  const rich = mount(DashboardColumn, {
    props: { count: 3 },
    slots: { title: () => h("strong", "Blocked") },
  });
  const group = rich.find('[role="group"]');
  expect(group.attributes("aria-label")).toBeUndefined();
  expect(group.attributes("aria-labelledby")).toMatch(/-count$/);
});

it("dashboard labels follow the locale", () => {
  const w = mount(ConfigProvider, {
    props: { locale: "zh" },
    slots: {
      default: () =>
        h(DashboardColumns, null, () =>
          h(DashboardColumn, { title: "待办", count: 3 }),
        ),
    },
  });
  expect(w.find('[role="region"]').attributes("aria-label")).toBe("分栏面板");
  expect(w.find('[role="group"]').attributes("aria-label")).toBe("待办，3 项");
  expect(w.find(".mn-dashboard-column__empty").text()).toBe("暂无项目");
});

/** Two 200px columns of 50px cards: "todo" (a, b) and "done" (c) */
function draggableBoard(props: Record<string, unknown> = {}) {
  const w = mount(DashboardColumns, {
    props: { draggable: true, ...props },
    slots: {
      default: () => [
        h(DashboardColumn, { title: "To do", value: "todo" }, () => [
          h(
            DashboardCard,
            { value: "a", label: "Write spec" },
            () => "Write spec",
          ),
          h(DashboardCard, { value: "b" }, () => "Review"),
        ]),
        h(DashboardColumn, { title: "Done", value: "done" }, () => [
          h(DashboardCard, { value: "c" }, () => "Ship"),
        ]),
      ],
    },
    attachTo: document.body,
  });
  const place = (
    element: Element,
    [left, top, width, height]: [number, number, number, number],
  ) => {
    element.getBoundingClientRect = () =>
      ({
        left,
        top,
        width,
        height,
        right: left + width,
        bottom: top + height,
      }) as DOMRect;
  };
  place(w.find('[role="region"]').element, [0, 0, 500, 400]);
  w.findAll("[data-dashboard-column]").forEach((column, i) => {
    place(column.element, [i * 220, 0, 200, 400]);
    column
      .findAll("[data-dashboard-card]")
      .forEach((card, j) =>
        place(card.element, [i * 220, 40 + j * 60, 200, 50]),
      );
  });
  const card = (value: string) => w.find(`[data-dashboard-card="${value}"]`);
  return { w, card };
}

const touch = (x: number, y: number) => ({
  touches: [{ clientX: x, clientY: y }],
  changedTouches: [{ clientX: x, clientY: y }],
});

it("dashboard card is a keyed list item of its column", () => {
  const { w, card } = draggableBoard();
  expect(w.find('[role="group"]').attributes("data-dashboard-column")).toBe(
    "todo",
  );
  expect(card("a").attributes("role")).toBe("listitem");
  expect(card("a").classes()).toContain("mn-draggable");
  w.unmount();
});

it("DashboardColumns emits card-move after a long press and drag", async () => {
  vi.useFakeTimers();
  const { w, card } = draggableBoard();
  await card("a").trigger("touchstart", touch(100, 60));
  vi.advanceTimersByTime(400);
  await w.vm.$nextTick();
  expect(w.find('[role="region"]').classes()).toContain("mn-dragging");
  expect(card("a").classes()).toContain("mn-dragging");
  expect(w.find(".mn-dashboard-columns__ghost").text()).toBe("Write spec");
  await card("a").trigger("touchmove", touch(300, 120));
  expect(w.findAll('[role="group"]')[1]!.classes()).toContain("mn-drop-target");
  expect(w.find(".mn-dashboard-columns__drop-line").exists()).toBe(true);
  await card("a").trigger("touchend", touch(300, 120));
  expect(w.emitted("card-move")).toEqual([
    [
      {
        cardKey: "a",
        fromColumn: "todo",
        fromIndex: 0,
        toColumn: "done",
        toIndex: 1,
      },
    ],
  ]);
  expect(w.find(".mn-dashboard-columns__ghost").exists()).toBe(false);
  vi.useRealTimers();
  w.unmount();
});

it("DashboardColumns does not drag when the finger moves first or canDrop refuses", async () => {
  vi.useFakeTimers();
  const { w, card } = draggableBoard({
    canDrop: (move: { toColumn: string }) => move.toColumn !== "done",
  });
  await card("a").trigger("touchstart", touch(100, 60));
  await card("a").trigger("touchmove", touch(100, 90));
  vi.advanceTimersByTime(400);
  await w.vm.$nextTick();
  expect(w.find('[role="region"]').classes()).not.toContain("mn-dragging");
  await card("a").trigger("touchend", touch(100, 90));
  await card("a").trigger("touchstart", touch(100, 60));
  vi.advanceTimersByTime(400);
  await card("a").trigger("touchmove", touch(300, 120));
  await card("a").trigger("touchend", touch(300, 120));
  expect(w.emitted("card-move")).toBeUndefined();
  vi.useRealTimers();
  w.unmount();
});
