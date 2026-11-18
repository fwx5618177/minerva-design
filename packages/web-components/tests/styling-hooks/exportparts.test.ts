import { afterEach, expect, it } from "vitest";
import { NON_VISUAL_ELEMENTS } from "@minerva/core/styling-hooks";
import { Coverage, checkWcDom } from "../../../../tests/styling-hooks/contract";
import { customStates } from "../../src/internal/styling-hooks";
import "../../src/elements/pagination";
import { mount, settle } from "../utils";

const coverage = () => {
  const result = new Coverage();
  expect(
    checkWcDom(result, customStates, document, NON_VISUAL_ELEMENTS),
  ).toEqual([]);
  return result.parts.get("pagination")!;
};
afterEach(() => {
  document.body.innerHTML = "";
});

it("covers forwarded Select parts only while their source exists", async () => {
  await mount(
    '<minerva-pagination total="100" show-size-changer></minerva-pagination>',
  );
  expect(coverage().has("size-changer-trigger")).toBe(true);
  expect(coverage().has("size-changer-content")).toBe(false);
  const host = document.querySelector("minerva-pagination")!;
  host.shadowRoot!.querySelector("minerva-select")!.open = true;
  await settle();
  expect(coverage().has("size-changer-content")).toBe(true);
});

it("does not count a declared alias when its source is missing", async () => {
  await mount("<minerva-pagination show-size-changer></minerva-pagination>");
  document
    .querySelector("minerva-pagination")!
    .shadowRoot!.querySelector("minerva-select")!
    .setAttribute("exportparts", "missing:size-changer-trigger");
  expect(coverage().has("size-changer-trigger")).toBe(false);
});

it("requires a complete forwarding chain across nested shadow roots", async () => {
  await mount("<minerva-pagination></minerva-pagination>");
  const root = document.querySelector("minerva-pagination")!.shadowRoot!;
  const outer = document.createElement("div");
  outer.setAttribute("exportparts", "forwarded:size-changer-trigger");
  const middle = document.createElement("div");
  middle.setAttribute("exportparts", "source:forwarded");
  middle.attachShadow({ mode: "open" }).innerHTML =
    '<span part="source"></span>';
  outer.attachShadow({ mode: "open" }).append(middle);
  root.append(outer);
  expect(coverage().has("size-changer-trigger")).toBe(true);
  middle.removeAttribute("exportparts");
  expect(coverage().has("size-changer-trigger")).toBe(false);
});

it("does not combine state and base aliases forwarded from different elements", async () => {
  await mount("<minerva-pagination></minerva-pagination>");
  const forwarding = document.createElement("div");
  forwarding.setAttribute("exportparts", "base:item,marked:item--current");
  const nested = forwarding.attachShadow({ mode: "open" });
  nested.innerHTML = '<span part="base"></span><span part="marked"></span>';
  document.querySelector("minerva-pagination")!.shadowRoot!.append(forwarding);
  expect(
    checkWcDom(new Coverage(), customStates, document, NON_VISUAL_ELEMENTS),
  ).toContain("minerva-pagination::part(item--current): without the item part");
  nested.innerHTML = '<span part="base marked"></span>';
  expect(
    checkWcDom(new Coverage(), customStates, document, NON_VISUAL_ELEMENTS),
  ).toEqual([]);
});
