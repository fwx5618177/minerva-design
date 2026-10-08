// Switch / Checkbox: uncontrolled (the component owns its state) and
// controlled (the parent owns it: a press only requests the change).
import { afterEach, describe, expect } from "vitest";
import { contractOf, eventWith, initialProps } from "../harness/contracts";
import { contractTest } from "../harness/suite";
import { h, type Driver, type Handle } from "../harness/types";

const TOGGLES = [
  { component: "Switch", role: "switch" },
  { component: "Checkbox", role: "checkbox" },
] as const;

export function toggleSuite(driver: Driver) {
  let handle: Handle | undefined;
  afterEach(() => handle?.unmount());

  for (const { component, role } of TOGGLES) {
    const SUITE = `${component} controlled vs uncontrolled`;
    const contract = contractOf(component);
    const change = eventWith(contract, "checked", driver.platform);

    describe(SUITE, () => {
      contractTest(
        driver,
        SUITE,
        "uncontrolled: a press toggles and emits",
        async () => {
          handle = await driver.render(
            h(component, {
              label: "Wi-Fi",
              ...initialProps(contract, driver.platform, "checked", false),
            }),
          );
          const control = driver.getByRole(role);
          expect(driver.isChecked(control)).toBe(false);
          await driver.press(control);
          expect(driver.isChecked(driver.getByRole(role))).toBe(true);
          expect(
            handle.emitted(change.name, component).at(-1)?.detail,
          ).toMatchObject({
            checked: true,
          });
        },
      );

      contractTest(
        driver,
        SUITE,
        "controlled: a press only requests the change",
        async () => {
          handle = await driver.render(
            h(component, { label: "Wi-Fi", checked: false }),
          );
          await driver.press(driver.getByRole(role));
          expect(
            handle.emitted(change.name, component).at(-1)?.detail,
          ).toMatchObject({
            checked: true,
          });
          expect(driver.isChecked(driver.getByRole(role))).toBe(false);
        },
      );

      contractTest(
        driver,
        SUITE,
        "controlled: the checked prop drives the state",
        async () => {
          handle = await driver.render(
            h(component, { label: "Wi-Fi", checked: false }),
          );
          await handle.setProps({ checked: true });
          expect(driver.isChecked(driver.getByRole(role))).toBe(true);
          await handle.setProps({ checked: false });
          expect(driver.isChecked(driver.getByRole(role))).toBe(false);
          expect(handle.emitted(change.name, component)).toHaveLength(0);
        },
      );
    });
  }
}
