import { afterEach, describe, expect, it } from "vitest";
import { updateFixedColumnBudget } from "./table-fixed-columns";

afterEach(() => document.body.replaceChildren());

describe("fixed column viewport budget", () => {
  it("does not mark unfixed tables as exceeding a fixed column budget", () => {
    const viewport = document.createElement("div");
    viewport.innerHTML = "<table><tr><td>Ordinary data</td></tr></table>";
    Object.defineProperty(viewport, "clientWidth", { value: 80 });
    updateFixedColumnBudget(viewport);
    expect(viewport.hasAttribute("data-fixed-overflow")).toBe(false);
  });
  it("releases sticky columns before they cover the scrollable reading area", () => {
    const viewport = document.createElement("div");
    viewport.innerHTML =
      '<table><thead><tr><th data-fixed="left"></th><th data-fixed="left"></th><th></th><th data-fixed="right"></th></tr></thead></table>';
    document.body.append(viewport);
    const cells = Array.from(viewport.querySelectorAll("th"));
    [90, 120, 240, 110].forEach((width, index) => {
      cells[index].getBoundingClientRect = () => ({ width }) as DOMRect;
    });
    Object.defineProperty(viewport, "clientWidth", {
      value: 268,
      configurable: true,
    });
    updateFixedColumnBudget(viewport);
    expect(viewport.hasAttribute("data-fixed-overflow")).toBe(true);
    Object.defineProperty(viewport, "clientWidth", {
      value: 390,
      configurable: true,
    });
    updateFixedColumnBudget(viewport);
    expect(viewport.hasAttribute("data-fixed-overflow")).toBe(true);
    Object.defineProperty(viewport, "clientWidth", {
      value: 800,
      configurable: true,
    });
    updateFixedColumnBudget(viewport);
    expect(viewport.hasAttribute("data-fixed-overflow")).toBe(false);
  });
});
