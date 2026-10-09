// Modal dismissal (Escape, mask click) and the toast queue limit.
import { afterEach, describe, expect } from "vitest";
import { contractOf, eventWith, initialProps } from "../harness/contracts";
import { contractTest } from "../harness/suite";
import { h, type Driver, type Handle } from "../harness/types";

/** Exit animations of overlays and toasts (200ms) */
const EXIT = 300;

export function overlaySuite(driver: Driver) {
  let handle: Handle | undefined;
  afterEach(async () => {
    await handle?.unmount();
    await driver.services.toast.reset();
  });

  const MODAL = "Modal dismissal";
  describe(MODAL, () => {
    const modal = contractOf("Modal");
    const openChange = eventWith(modal, "open", driver.platform);
    const render = async () => {
      handle = await driver.render(
        h(
          "Modal",
          initialProps(modal, driver.platform, "open", true),
          h("p", { "data-testid": "body" }, "Modal body"),
        ),
      );
      expect(driver.getByRole("dialog")).toBeTruthy();
      // dismissable layers ignore the opening pointer for one tick
      await driver.settle(5);
      return handle;
    };
    const expectClosed = async (handle: Handle) => {
      await driver.settle(EXIT);
      expect(
        handle.emitted(openChange.name, "Modal").at(-1)?.detail,
      ).toMatchObject({
        open: false,
      });
      expect(driver.queryByRole("dialog")).toBeNull();
    };

    contractTest(driver, MODAL, "Escape closes it", async () => {
      const handle = await render();
      await driver.keyboard("{Escape}");
      await expectClosed(handle);
    });

    contractTest(driver, MODAL, "a mask click closes it", async () => {
      const handle = await render();
      const overlay = driver.queryPart("overlay");
      expect(overlay).not.toBeNull();
      await driver.press(overlay!);
      await expectClosed(handle);
    });

    contractTest(
      driver,
      MODAL,
      "a click inside the panel keeps it open",
      async () => {
        const handle = await render();
        await driver.press(driver.queryByTestId("body")!);
        await driver.settle(EXIT);
        expect(handle.emitted(openChange.name, "Modal")).toHaveLength(0);
        expect(driver.queryByRole("dialog")).not.toBeNull();
      },
    );
  });

  const TOAST = "Toast queue";
  describe(TOAST, () => {
    contractTest(
      driver,
      TOAST,
      "max caps the visible toasts, oldest closed first",
      async () => {
        expect(contractOf("ToastProvider").props.map((p) => p.name)).toContain(
          "max",
        );
        handle = await driver.render(h("ToastProvider", { max: 2 }));
        for (const title of ["First", "Second", "Third"])
          await driver.services.toast.show(title, { duration: 0 });
        await driver.settle(EXIT);
        const visible = [
          ...driver.queryAllByRole("status"),
          ...driver.queryAllByRole("alert"),
        ].map((el) => el.textContent ?? "");
        expect(visible).toHaveLength(2);
        expect(visible.some((t) => t.includes("First"))).toBe(false);
        expect(visible.some((t) => t.includes("Second"))).toBe(true);
        expect(visible.some((t) => t.includes("Third"))).toBe(true);
      },
    );
  });
}
