import { describe } from "vitest";
import { uniDriver } from "../../../tests/contracts/drivers/uni";
import { buttonSuite } from "../../../tests/contracts/suites/button";
import { toggleSuite } from "../../../tests/contracts/suites/toggle";
import { selectionSuite } from "../../../tests/contracts/suites/selection";

describe("shared cross-renderer behavior on uni-app host", () => {
  buttonSuite(uniDriver);
  toggleSuite(uniDriver);
  selectionSuite(uniDriver);
});
