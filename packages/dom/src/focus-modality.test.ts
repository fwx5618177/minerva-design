import { describe, expect, it } from "vitest";
import { acquireFocusModality } from "./focus-modality";

const WIDTH = "--_minerva-focus-ring-width";
const pointer = (doc: Document) =>
  doc.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
const key = (doc: Document, name: string, extra: KeyboardEventInit = {}) =>
  doc.dispatchEvent(
    new KeyboardEvent("keydown", { key: name, bubbles: true, ...extra }),
  );

describe("shared input modality", () => {
  it.each(["input", "textarea"])(
    "keeps spaces and multiline entry quiet in a pointer-focused %s",
    (tag) => {
      const field = document.createElement(tag);
      document.body.append(field);
      const release = acquireFocusModality(document);
      try {
        pointer(document);
        for (const name of [
          "a",
          " ",
          ...(tag === "textarea" ? ["Enter"] : []),
        ]) {
          field.dispatchEvent(
            new KeyboardEvent("keydown", { key: name, bubbles: true }),
          );
          expect(document.documentElement.style.getPropertyValue(WIDTH)).toBe(
            "0px",
          );
        }
        field.dispatchEvent(
          new KeyboardEvent("keydown", { key: "Tab", bubbles: true }),
        );
        expect(document.documentElement.style.getPropertyValue(WIDTH)).toBe(
          "2px",
        );
      } finally {
        release();
        field.remove();
      }
    },
  );

  it("keeps pointer text entry quiet and restores the indicator for navigation and shortcuts", () => {
    const release = acquireFocusModality(document);
    try {
      expect(document.documentElement.style.getPropertyValue(WIDTH)).toBe(
        "2px",
      );
      pointer(document);
      expect(document.documentElement.style.getPropertyValue(WIDTH)).toBe(
        "0px",
      );
      key(document, "a");
      key(document, "Shift");
      expect(document.documentElement.style.getPropertyValue(WIDTH)).toBe(
        "0px",
      );
      key(document, "Tab");
      expect(document.documentElement.style.getPropertyValue(WIDTH)).toBe(
        "2px",
      );
      pointer(document);
      key(document, "k", { metaKey: true });
      expect(document.documentElement.style.getPropertyValue(WIDTH)).toBe(
        "2px",
      );
    } finally {
      release();
    }
  });

  it("shares ownership and restores prior styles only after the last release", () => {
    const root = document.documentElement;
    root.style.setProperty(WIDTH, "4px", "important");
    root.style.setProperty("--minerva-focus-ring-width", "5px");
    const first = acquireFocusModality(document);
    const second = acquireFocusModality(document);
    pointer(document);
    first();
    first();
    key(document, "ArrowDown");
    expect(root.style.getPropertyValue(WIDTH)).toBe("2px");
    expect(root.style.getPropertyValue("--minerva-focus-ring-width")).toBe(
      "5px",
    );
    second();
    expect(root.style.getPropertyValue(WIDTH)).toBe("4px");
    expect(root.style.getPropertyPriority(WIDTH)).toBe("important");
    pointer(document);
    expect(root.style.getPropertyValue(WIDTH)).toBe("4px");
    root.style.removeProperty(WIDTH);
    root.style.removeProperty("--minerva-focus-ring-width");
  });

  it("handles composed pointer events from shadow roots and isolates documents", () => {
    const frame = document.createElement("iframe");
    document.body.append(frame);
    const other = frame.contentDocument!;
    const host = document.createElement("div");
    document.body.append(host);
    const shadow = host.attachShadow({ mode: "open" });
    const input = document.createElement("input");
    shadow.append(input);
    const release = acquireFocusModality(document);
    const releaseOther = acquireFocusModality(other);
    try {
      input.dispatchEvent(
        new PointerEvent("pointerdown", { bubbles: true, composed: true }),
      );
      expect(document.documentElement.style.getPropertyValue(WIDTH)).toBe(
        "0px",
      );
      expect(other.documentElement.style.getPropertyValue(WIDTH)).toBe("2px");
      pointer(other);
      key(document, "Enter");
      expect(document.documentElement.style.getPropertyValue(WIDTH)).toBe(
        "2px",
      );
      expect(other.documentElement.style.getPropertyValue(WIDTH)).toBe("0px");
    } finally {
      release();
      releaseOther();
      host.remove();
      frame.remove();
    }
  });

  it("does not overwrite a later external style change during cleanup", () => {
    const release = acquireFocusModality(document);
    document.documentElement.style.setProperty(WIDTH, "6px");
    release();
    expect(document.documentElement.style.getPropertyValue(WIDTH)).toBe("6px");
    document.documentElement.style.removeProperty(WIDTH);
  });
});
