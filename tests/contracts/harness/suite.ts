import { it } from "vitest";
import type { Driver, OptionalSuite } from "./types";

/**
 * Every contract test must pass. Host differences are asserted explicitly
 * by the suite, rather than converting arbitrary assertion failures into passes.
 */
export function contractTest(
  _driver: Driver,
  _suite: string,
  title: string,
  fn: () => Promise<void>,
) {
  it(title, fn);
}

/**
 * Whether the driver declares `suite` not applicable. If it does, the suite's
 * title is registered as a skipped test that names the platform and the
 * reason, so the gap appears in the report and is not counted as a pass.
 */
export function declaredNotApplicable(
  driver: Driver,
  suite: OptionalSuite,
): boolean {
  const reason = driver.notApplicable?.[suite];
  if (!reason) return false;
  it.skip(`not applicable on ${driver.platform}: ${reason}`, () => {});
  return true;
}
