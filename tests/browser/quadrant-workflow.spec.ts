import { expect, test } from "@playwright/test";

for (const theme of ["light", "dark"] as const) {
  test.describe(theme, () => {
    test.beforeEach(async ({ page }) => {
      await page.addInitScript((theme) => {
        localStorage.setItem("minerva-docs-language", "en");
        localStorage.setItem("minerva-docs-theme", theme);
      }, theme);
    });

    test("quadrant task board: live drag with a following card, add / edit / delete in inline panels", async ({
      page,
    }) => {
      await page.goto("#/quadrant-task-board");
      const demo = page.locator("#demo-basic");
      const stage = demo.locator(".minerva-chart-stage");
      await stage.scrollIntoViewIfNeeded();
      const anchor = demo.locator(
        '.minerva-chart-quadrant-point[data-point-index="0"]',
      );
      await expect(anchor).toBeAttached();
      const from = await anchor.evaluate((node) => {
        const rect = node.getBoundingClientRect();
        return { x: rect.x, y: rect.y };
      });
      const plot = (await demo
        .locator(".minerva-chart-overlay")
        .boundingBox())!;
      const to = {
        x: plot.x + plot.width * 0.7,
        y: plot.y + plot.height * 0.7,
      };
      const dot = demo.locator('[data-drag-mark="dot"]');
      await page.mouse.move(from.x, from.y);
      await page.mouse.down();
      try {
        // the engine moves the dot with every pointer move; the info card
        // follows it (no label pill: the card names the task)
        await page.mouse.move(to.x, to.y, { steps: 12 });
        const box = (await dot.boundingBox())!;
        expect(
          Math.hypot(
            box.x + box.width / 2 - to.x,
            box.y + box.height / 2 - to.y,
          ),
        ).toBeLessThan(3);
        await expect(demo.locator('[data-drag-mark="label"]')).toBeHidden();
        const card = demo.locator("[data-point-preview][data-dragging]");
        await expect(card).toBeVisible();
        const before = (await card.boundingBox())!;
        await expect(demo.locator('[data-drag-mark="origin"]')).toBeVisible();
        await expect(demo.locator('[data-drag-mark="target"]')).toBeVisible();
        await page.mouse.move(to.x + 20, to.y - 10);
        const next = (await dot.boundingBox())!;
        expect(next.x - box.x).toBeCloseTo(20, 0);
        // the card follows (it may change sides near an edge: compare the
        // vertical move)
        await expect
          .poll(async () => (await card.boundingBox())!.y - before.y)
          .toBeCloseTo(-10, 0);
        await page.screenshot({
          path: test.info().outputPath("quadrant-live-drag.png"),
        });
      } finally {
        await page.mouse.up();
      }
      // the drop moved the task: its anchor is where it was released
      await expect
        .poll(async () =>
          anchor.evaluate((node) => {
            const rect = node.getBoundingClientRect();
            return { x: Math.round(rect.x), y: Math.round(rect.y) };
          }),
        )
        .not.toEqual({ x: Math.round(from.x), y: Math.round(from.y) });
      await page.mouse.move(to.x + 20, to.y + 35);
      // the dropped task is selected: its card holds the compact actions
      await demo
        .locator("[data-point-preview]")
        .getByRole("button", { name: "Edit task", exact: true })
        .click();
      // inline in the board, next to the task: not a modal
      const dialog = demo.getByRole("dialog", {
        name: "Edit task",
        exact: true,
      });
      await expect(dialog).toHaveAttribute("data-quadrant-task-panel", "edit");
      await dialog
        .getByRole("textbox", { name: "Task name", exact: true })
        .fill("Revised task");
      await dialog.getByRole("button", { name: "Save", exact: true }).click();
      await expect(demo.locator('[data-label="Revised task"]')).toBeAttached();
      await demo
        .getByRole("button", { name: "Delete task", exact: true })
        .click();
      await demo
        .getByRole("alertdialog")
        .getByRole("button", { name: "Cancel", exact: true })
        .click();
      await expect(demo.locator('[data-label="Revised task"]')).toBeAttached();
      await demo
        .getByRole("button", { name: "Delete task", exact: true })
        .click();
      await demo
        .getByRole("alertdialog")
        .getByRole("button", { name: "Delete", exact: true })
        .click();
      await expect(demo.locator('[data-label="Revised task"]')).toHaveCount(0);
      await demo
        .getByRole("button", { name: /^Add task ·/ })
        .first()
        .click();
      const create = demo.getByRole("dialog", {
        name: "Add task",
        exact: true,
      });
      await expect(
        create.getByRole("button", { name: "Save", exact: true }),
      ).toBeDisabled();
      await create
        .getByRole("textbox", { name: "Task name", exact: true })
        .fill("Another task");
      await create.getByRole("radio").nth(3).check();
      await create.getByRole("button", { name: "Save", exact: true }).click();
      await expect(demo.locator('[data-label="Another task"]')).toBeAttached();
    });

    test("quadrant chart: glass info card on the selected task follows a drag", async ({
      page,
    }) => {
      await page.goto("#/quadrant-chart");
      const demo = page.locator("#demo-triage");
      await demo.locator(".minerva-chart-stage").scrollIntoViewIfNeeded();
      const anchor = demo.locator(
        '.minerva-chart-quadrant-point[data-point-index="0"]',
      );
      await expect(anchor).toBeAttached();
      const at = await anchor.evaluate((node) => {
        const rect = node.getBoundingClientRect();
        return { x: rect.x, y: rect.y };
      });
      await page.mouse.click(at.x, at.y);
      await page.mouse.move(at.x + 160, at.y + 220);
      const card = demo.locator("[data-point-preview]");
      await expect(card).toBeVisible();
      const look = await card.evaluate((node) => {
        const style = getComputedStyle(node);
        return {
          background: style.backgroundColor,
          left: style.borderLeftWidth,
          right: style.borderRightWidth,
        };
      });
      // translucent like the chart tooltips, the same border on every side
      expect(look.background).toMatch(/^rgba\(.*, 0\.\d+\)$/);
      expect(look.left).toBe(look.right);
      const plot = (await demo
        .locator(".minerva-chart-overlay")
        .boundingBox())!;
      await page.mouse.move(at.x, at.y);
      await page.mouse.down();
      try {
        await page.mouse.move(
          plot.x + plot.width * 0.3,
          plot.y + plot.height * 0.75,
          { steps: 8 },
        );
        const first = (await card.boundingBox())!;
        await page.mouse.move(
          plot.x + plot.width * 0.3 + 40,
          plot.y + plot.height * 0.75 - 30,
          { steps: 4 },
        );
        await expect
          .poll(async () => {
            const box = (await card.boundingBox())!;
            return (
              Math.abs(box.x - first.x - 40) <= 2 &&
              Math.abs(box.y - first.y + 30) <= 2
            );
          })
          .toBe(true);
      } finally {
        await page.mouse.up();
      }
    });

    test("combo chart hover lifts the bar below the line", async ({ page }) => {
      await page.goto("#/mixed-chart");
      const demo = page.locator("#demo-revenue-growth");
      const stage = demo.locator(".minerva-chart-stage");
      await stage.scrollIntoViewIfNeeded();
      const box = (await stage.boundingBox())!;
      await page.mouse.move(box.x + box.width * 0.66, box.y + box.height * 0.5);
      const bar = demo.locator('[data-hover-mark="bar"]').first();
      await expect(bar).toBeVisible();
      // the layer holding the lifted bar comes before the data canvas
      const order = await bar.evaluate((node) => {
        const stage = node.closest(".minerva-chart-stage")!;
        const layers = [...stage.children];
        const holder = layers.find((layer) => layer.contains(node))!;
        const data = stage.querySelector(".minerva-chart-data");
        return {
          holder: layers.indexOf(holder),
          data: data ? layers.indexOf(data) : -1,
        };
      });
      expect(order.data).toBeGreaterThan(order.holder);
      await page.screenshot({
        path: test.info().outputPath("mixed-hover-line.png"),
      });
    });
  });
}
