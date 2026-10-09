import { describe } from "vitest";
import { taroDriver } from "../../../tests/contracts/drivers/taro";
import { buttonSuite } from "../../../tests/contracts/suites/button";
import { toggleSuite } from "../../../tests/contracts/suites/toggle";
import { selectionSuite } from "../../../tests/contracts/suites/selection";

describe("shared cross-renderer behavior on Taro H5", () => {
  buttonSuite(taroDriver);
  toggleSuite(taroDriver);
  selectionSuite(taroDriver);
});
