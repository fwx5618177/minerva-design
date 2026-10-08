import { describe, expect, it } from "vitest";
import {
  commandSearchText,
  formatHotkey,
  matchesHotkey,
  matchesShortcut,
  normalizeSearchText,
  normalizeShortcuts,
  type HotkeyEvent,
  type ShortcutEvent,
} from "./shortcuts";

const key = (k: string, mods: Partial<ShortcutEvent> = {}): ShortcutEvent => ({
  key: k,
  metaKey: false,
  ctrlKey: false,
  shiftKey: false,
  altKey: false,
  ...mods,
});

describe("normalizeShortcuts", () => {
  it("keeps non-empty strings only", () => {
    expect(
      normalizeShortcuts(["mod+k", undefined as unknown as string, "", "  "]),
    ).toEqual(["mod+k"]);
    expect(normalizeShortcuts("ctrl+p")).toEqual(["ctrl+p"]);
    expect(normalizeShortcuts(undefined)).toEqual([]);
    expect(normalizeShortcuts(null)).toEqual([]);
  });
});

describe("matchesShortcut", () => {
  it("never matches non-string or empty shortcuts", () => {
    expect(matchesShortcut(key("k", { metaKey: true }), undefined)).toBe(false);
    expect(matchesShortcut(key("k"), "  ")).toBe(false);
    expect(matchesShortcut(key("k"), 42)).toBe(false);
  });

  it("accepts Cmd or Ctrl for mod", () => {
    expect(matchesShortcut(key("k", { metaKey: true }), "mod+k")).toBe(true);
    expect(matchesShortcut(key("k", { ctrlKey: true }), "mod+k")).toBe(true);
    expect(matchesShortcut(key("k"), "mod+k")).toBe(false);
    expect(matchesShortcut(key("j", { metaKey: true }), "mod+k")).toBe(false);
  });

  it("checks each modifier, case and space insensitive", () => {
    expect(matchesShortcut(key("K", { ctrlKey: true }), "Ctrl + K")).toBe(true);
    expect(matchesShortcut(key("k", { metaKey: true }), "ctrl+k")).toBe(false);
    expect(matchesShortcut(key("k", { ctrlKey: true }), "cmd+k")).toBe(false);
    expect(matchesShortcut(key("k", { metaKey: true }), "meta+k")).toBe(true);
    expect(matchesShortcut(key("p"), "shift+p")).toBe(false);
    expect(matchesShortcut(key("p", { shiftKey: true }), "shift+p")).toBe(true);
    expect(matchesShortcut(key("p"), "option+p")).toBe(false);
    expect(matchesShortcut(key("p", { altKey: true }), "alt+p")).toBe(true);
    expect(matchesShortcut(key("/"), "/")).toBe(true);
  });

  it("tolerates events without a key", () => {
    expect(
      matchesShortcut(
        { ...key("k"), key: undefined as unknown as string },
        "k",
      ),
    ).toBe(false);
  });
});

describe("command search text", () => {
  it("joins the searchable fields and normalizes queries", () => {
    expect(
      commandSearchText({
        title: "Open",
        group: "File",
        description: "Open a file",
        keywords: "load",
      }),
    ).toBe("File Open Open a file load");
    expect(commandSearchText({ title: "Open" })).toBe(" Open  ");
    expect(normalizeSearchText("  MiXed Case ")).toBe("mixed case");
  });
});

describe("matchesHotkey / formatHotkey", () => {
  const event = (init: Partial<HotkeyEvent>): HotkeyEvent => ({
    code: "",
    key: "",
    altKey: false,
    ctrlKey: false,
    metaKey: false,
    shiftKey: false,
    ...init,
  });

  it("matches codes, keys and modifiers; empty never matches", () => {
    expect(matchesHotkey(event({ key: "F8", code: "F8" }), ["F8"])).toBe(true);
    expect(
      matchesHotkey(event({ code: "KeyT", key: "t", altKey: true }), [
        "altKey",
        "KeyT",
      ]),
    ).toBe(true);
    expect(
      matchesHotkey(event({ code: "KeyT", key: "t" }), ["altKey", "KeyT"]),
    ).toBe(false);
    expect(matchesHotkey(event({ key: "t" }), ["t"])).toBe(true);
    expect(matchesHotkey(event({ key: "F8" }), [])).toBe(false);
  });

  it("formats hotkeys for people", () => {
    expect(formatHotkey(["F8"])).toBe("F8");
    expect(formatHotkey(["altKey", "KeyT"])).toBe("Alt+T");
    expect(formatHotkey(["ctrlKey", "shiftKey", "Digit1"])).toBe(
      "Ctrl+Shift+1",
    );
  });
});
