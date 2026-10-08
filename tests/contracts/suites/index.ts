// Every contract suite, run by each driver's test file.
import type { Driver } from "../harness/types";
import { buttonSuite } from "./button";
import { i18nSuite } from "./i18n";
import { overlaySuite } from "./overlays";
import { selectionSuite } from "./selection";
import { toggleSuite } from "./toggle";
import { tokenSuite } from "./tokens";

export const SUITES = [
  buttonSuite,
  toggleSuite,
  selectionSuite,
  overlaySuite,
  i18nSuite,
  tokenSuite,
];

export function runContractSuites(driver: Driver) {
  for (const suite of SUITES) suite(driver);
}
