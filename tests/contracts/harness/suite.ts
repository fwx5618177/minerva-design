import { it } from "vitest";
import { EXPECTED_DIFFERENCES } from "../expected-differences";
import type { Driver } from "./types";

/**
 * One contract test: `it`, or `it.fails` when the behaviour is a documented
 * expected difference of the driver's platform (expected-differences.ts):
 * the test still runs and must keep failing, so a fixed difference is
 * noticed and removed from the list.
 */
export function contractTest(
  driver: Driver,
  suite: string,
  title: string,
  fn: () => Promise<void>,
) {
  const difference = EXPECTED_DIFFERENCES.find(
    (d) => d.platform === driver.platform && d.test === `${suite} > ${title}`,
  );
  if (difference)
    it.fails(`${title} [expected difference: ${difference.reason}]`, fn);
  else it(title, fn);
}
