// RadioGroup (single selection) and Tabs (value change).
import { afterEach, describe, expect } from "vitest";
import { contractOf, eventWith, initialProps } from "../harness/contracts";
import { contractTest } from "../harness/suite";
import { h, type Driver, type Handle } from "../harness/types";

export function selectionSuite(driver: Driver) {
  let handle: Handle | undefined;
  afterEach(() => handle?.unmount());

  const RADIO = "RadioGroup single selection";
  describe(RADIO, () => {
    const group = contractOf("RadioGroup");
    const change = eventWith(group, "value", driver.platform);

    contractTest(
      driver,
      RADIO,
      "a press selects one radio and emits its value",
      async () => {
        handle = await driver.render(
          h(
            "RadioGroup",
            {
              name: "fruit",
              ...initialProps(group, driver.platform, "value", "a"),
            },
            h("Radio", { value: "a", label: "Apple" }),
            h("Radio", { value: "b", label: "Banana" }),
            h("Radio", { value: "c", label: "Cherry" }),
          ),
        );
        const checked = () =>
          driver
            .queryAllByRole("radio")
            .filter((r) => driver.isChecked(r))
            .map((r) => (r as HTMLInputElement).value);
        expect(checked()).toEqual(["a"]);
        await driver.press(driver.getByRole("radio", { name: "Banana" }));
        expect(checked()).toEqual(["b"]);
        await driver.press(driver.getByRole("radio", { name: "Cherry" }));
        expect(checked()).toEqual(["c"]);
        expect(
          handle.emitted(change.name, "RadioGroup").map((e) => e.detail.value),
        ).toEqual(["b", "c"]);
      },
    );
  });

  const TABS = "Tabs value change";
  describe(TABS, () => {
    const tabs = contractOf("Tabs");
    const change = eventWith(tabs, "value", driver.platform);

    contractTest(
      driver,
      TABS,
      "selecting a tab emits its value and shows its panel",
      async () => {
        handle = await driver.render(
          h(
            "Tabs",
            initialProps(tabs, driver.platform, "value", "a"),
            h(
              "TabList",
              { "aria-label": "Letters" },
              h("Tab", { value: "a" }, "Alpha"),
              h("Tab", { value: "b" }, "Beta"),
            ),
            h("TabPanel", { value: "a" }, "Panel A"),
            h("TabPanel", { value: "b" }, "Panel B"),
          ),
        );
        const selected = () =>
          driver
            .queryAllByRole("tab")
            .filter((t) => t.getAttribute("aria-selected") === "true")
            .map((t) => t.textContent?.trim());
        expect(selected()).toEqual(["Alpha"]);
        expect(driver.queryByText("Panel A")).not.toBeNull();
        expect(driver.queryByText("Panel B")).toBeNull();

        await driver.press(driver.getByRole("tab", { name: "Beta" }));
        expect(
          handle.emitted(change.name, "Tabs").map((e) => e.detail.value),
        ).toEqual(["b"]);
        expect(selected()).toEqual(["Beta"]);
        expect(driver.queryByText("Panel B")).not.toBeNull();
        expect(driver.queryByText("Panel A")).toBeNull();
      },
    );
  });
}
