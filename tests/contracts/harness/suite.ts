import { it } from "vitest";
import type { Driver } from "./types";

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
