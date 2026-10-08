// Button: a press emits the click event, unless disabled or loading.
import { afterEach, describe, expect } from "vitest";
import { contractOf } from "../harness/contracts";
import { contractTest } from "../harness/suite";
import { h, type Driver, type Handle } from "../harness/types";

export function buttonSuite(driver: Driver) {
  const SUITE = "Button press";
  const contract = contractOf("Button");
  const click = contract.events.find((e) => e.react === "onClick")!.name;
  let handle: Handle | undefined;
  afterEach(() => handle?.unmount());

  describe(SUITE, () => {
    contractTest(driver, SUITE, "an enabled button emits click", async () => {
      handle = await driver.render(h("Button", {}, "Save"));
      await driver.press(driver.getByRole("button", { name: "Save" }));
      expect(handle.emitted(click, "Button")).toHaveLength(1);
    });

    for (const state of ["disabled", "loading"] as const) {
      contractTest(
        driver,
        SUITE,
        `a ${state} button ignores press`,
        async () => {
          expect(contract.props.map((p) => p.name)).toContain(state);
          handle = await driver.render(h("Button", { [state]: true }, "Save"));
          await driver.press(driver.getByRole("button"));
          expect(handle.emitted(click, "Button")).toHaveLength(0);
        },
      );
    }
  });
}
