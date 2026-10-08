import { describe, expect, it } from "vitest";
import { hooks } from "./stylingHooks";

describe("hooks", () => {
  it("names the component and the part", () => {
    expect(hooks("button", "label")).toEqual({
      "data-minerva": "button",
      "data-part": "label",
    });
  });

  it("renders the state hooks", () => {
    expect(
      hooks("button", "root", {
        state: "active",
        disabled: true,
        loading: false,
        size: "small",
        color: undefined,
        shape: null,
      }),
    ).toEqual({
      "data-minerva": "button",
      "data-part": "root",
      "data-state": "active",
      "data-disabled": "",
      "data-loading": undefined,
      "data-size": "small",
    });
  });
});
