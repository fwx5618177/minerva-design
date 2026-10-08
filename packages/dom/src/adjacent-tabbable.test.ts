import { afterEach, describe, expect, it } from "vitest";
import { getAdjacentTabbable } from "./adjacent-tabbable";

afterEach(() => {
  document.body.innerHTML = "";
});

describe("getAdjacentTabbable", () => {
  it("returns the next tabbable after the element, outside it", () => {
    document.body.innerHTML = `
      <button id="before">b</button>
      <div id="el"><button id="inside">i</button></div>
      <span tabindex="-1">skip</span>
      <button id="after">a</button>`;
    const el = document.getElementById("el")!;
    expect(getAdjacentTabbable(el)?.id).toBe("after");
  });

  it("falls back to the closest previous one, then null", () => {
    document.body.innerHTML = `
      <button id="first">1</button><button id="second">2</button>
      <div id="el"><button>i</button></div>`;
    expect(getAdjacentTabbable(document.getElementById("el")!)?.id).toBe(
      "second",
    );
    document.body.innerHTML = `<div id="el"><button>i</button></div>`;
    expect(getAdjacentTabbable(document.getElementById("el")!)).toBeNull();
  });

  it("skips tabbables inside the element's shadow tree", () => {
    document.body.innerHTML = `<div id="el"></div><button id="after">a</button>`;
    const el = document.getElementById("el")!;
    el.attachShadow({ mode: "open" }).innerHTML = `<button>shadow</button>`;
    expect(getAdjacentTabbable(el)?.id).toBe("after");
  });
});
