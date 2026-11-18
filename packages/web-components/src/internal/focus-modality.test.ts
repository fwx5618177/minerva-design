import { expect, it, vi } from "vitest";
import { MinervaElement } from "./minerva-element";

class FocusHost extends MinervaElement {}
customElements.define("minerva-focus-modality-test", FocusHost);
const width = (doc = document) =>
  doc.documentElement.style.getPropertyValue("--_minerva-focus-ring-width");

it("shares document modality ownership and releases it on the last disconnect", () => {
  const add = vi.spyOn(document, "addEventListener");
  const first = document.createElement("minerva-focus-modality-test");
  const second = document.createElement("minerva-focus-modality-test");
  document.body.append(first, second);
  try {
    expect(width()).toBe("2px");
    expect(
      add.mock.calls.filter(([name]) => name === "pointerdown"),
    ).toHaveLength(1);
    expect(add.mock.calls.filter(([name]) => name === "keydown")).toHaveLength(
      1,
    );
    document.dispatchEvent(new Event("pointerdown"));
    expect(width()).toBe("0px");
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));
    expect(width()).toBe("0px");
    first.remove();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab" }));
    expect(width()).toBe("2px");
    second.remove();
    expect(width()).toBe("");
    document.body.append(first);
    document.dispatchEvent(new Event("pointerdown"));
    expect(width()).toBe("0px");
  } finally {
    first.remove();
    second.remove();
    add.mockRestore();
  }
  expect(width()).toBe("");
});

it("moves modality ownership to the adopted document", () => {
  const host = document.createElement(
    "minerva-focus-modality-test",
  ) as FocusHost;
  const other = document.implementation.createHTMLDocument("");
  document.body.append(host);
  other.adoptNode(host);
  // happy-dom does not dispatch adoption callbacks, so invoke the platform
  // lifecycle explicitly after transferring document ownership.
  host.disconnectedCallback();
  other.body.append(host);
  host.connectedCallback();
  host.adoptedCallback();
  try {
    expect(width()).toBe("");
    other.dispatchEvent(new Event("pointerdown"));
    expect(width(other)).toBe("0px");
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab" }));
    expect(width(other)).toBe("0px");
  } finally {
    host.remove();
    host.disconnectedCallback();
  }
  expect(width(other)).toBe("");
});
