import { afterEach, describe, expect, it } from "vitest";
import { isInteractiveEventTarget } from "./interactive-target";

const clickOn = (target: Element, container: Element) => {
  let result: boolean | undefined;
  const listener = (event: Event) => {
    result = isInteractiveEventTarget(event, container);
  };
  container.addEventListener("click", listener);
  target.dispatchEvent(
    new MouseEvent("click", { bubbles: true, composed: true }),
  );
  container.removeEventListener("click", listener);
  return result;
};

describe("isInteractiveEventTarget", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("detects interactive descendants, not the container itself", () => {
    document.body.innerHTML = `
      <div id="card" role="button" tabindex="0">
        <p id="text">Prompt <strong id="strong">bold</strong></p>
        <a id="link" href="#x"><span id="inner">link</span></a>
        <button id="button">b</button>
        <div id="widget" role="checkbox"></div>
      </div>`;
    const card = document.getElementById("card")!;
    const on = (id: string) => clickOn(document.getElementById(id)!, card);
    expect(on("card")).toBe(false);
    expect(on("text")).toBe(false);
    expect(on("strong")).toBe(false);
    expect(on("link")).toBe(true);
    expect(on("inner")).toBe(true);
    expect(on("button")).toBe(true);
    expect(on("widget")).toBe(true);
  });

  it("follows a composed path (slotted content of a shadow root)", () => {
    const host = document.createElement("div");
    host.innerHTML = `<button id="slotted" slot="front">b</button><span id="plain" slot="front">t</span>`;
    document.body.append(host);
    const shadow = host.attachShadow({ mode: "open" });
    shadow.innerHTML = `<div id="card" role="button" tabindex="0"><slot name="front"></slot></div>`;
    const card = shadow.getElementById("card")!;
    const slot = shadow.querySelector("slot")!;
    // Browsers route slotted targets through their slot (happy-dom does not).
    const from = (target: Element) => ({
      target,
      composedPath: () => [target, slot, card, shadow, host, document.body],
    });
    expect(
      isInteractiveEventTarget(from(host.querySelector("#slotted")!), card),
    ).toBe(true);
    expect(
      isInteractiveEventTarget(from(host.querySelector("#plain")!), card),
    ).toBe(false);
  });

  it("walks the parents when there is no composed path", () => {
    document.body.innerHTML = `<div id="card"><a id="link" href="#"><b id="b">x</b></a><i id="i">y</i></div>`;
    const card = document.getElementById("card")!;
    const target = (id: string) => ({ target: document.getElementById(id) });
    expect(isInteractiveEventTarget(target("b"), card)).toBe(true);
    expect(isInteractiveEventTarget(target("i"), card)).toBe(false);
  });
});
