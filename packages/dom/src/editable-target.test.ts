import { afterEach, describe, expect, it } from "vitest";
import { isEditableTarget } from "./editable-target";

describe("isEditableTarget", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("detects text fields, selects and contenteditable", () => {
    document.body.innerHTML = `
      <input id="text" /><input id="search" type="search" />
      <input id="checkbox" type="checkbox" /><input id="button" type="button" />
      <textarea id="area"></textarea><select id="select"></select>
      <div id="editable" contenteditable="true"></div><div id="plain"></div>`;
    const is = (id: string) => isEditableTarget(document.getElementById(id));
    expect(is("text")).toBe(true);
    expect(is("search")).toBe(true);
    expect(is("checkbox")).toBe(false);
    expect(is("button")).toBe(false);
    expect(is("area")).toBe(true);
    expect(is("select")).toBe(true);
    expect(is("plain")).toBe(false);
    const editable = document.getElementById("editable")!;
    // happy-dom does not derive isContentEditable from the attribute
    Object.defineProperty(editable, "isContentEditable", { value: true });
    expect(isEditableTarget(editable)).toBe(true);
  });

  it("is false for non-elements and without a DOM", () => {
    expect(isEditableTarget(null)).toBe(false);
    expect(isEditableTarget(window)).toBe(false);
    const original = globalThis.HTMLElement;
    // @ts-expect-error simulate a server environment
    delete globalThis.HTMLElement;
    try {
      expect(isEditableTarget({} as EventTarget)).toBe(false);
    } finally {
      globalThis.HTMLElement = original;
    }
  });
});
