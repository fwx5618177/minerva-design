import { describe, expect, it } from "vitest";
import "../../elements/time-picker";
import { formatHasSeconds, resolveTimeFormat } from "@minerva/core";
import { mount, settle } from "../../../tests/utils";

describe("time picker seconds: one source of truth (the format in use)", () => {
  it.each([
    ["HH:mm:ss", true, "HH:mm:ss"],
    ["HH:mm:ss", false, "HH:mm"],
    ["hh:mm:ss a", false, "hh:mm a"],
    ["HH:mm", true, "HH:mm"],
    ["H:m:s", false, "H:m"],
  ])("resolveTimeFormat(%s, showSecond=%s) = %s", (format, show, expected) => {
    expect(resolveTimeFormat(format, show)).toBe(expected);
    expect(formatHasSeconds(expected)).toBe(expected.includes("s"));
  });

  it.each([
    [`format="HH:mm:ss" hide-second`, false, "09:05"],
    [`format="HH:mm"`, false, "09:05"],
    [`format="HH:mm:ss"`, true, "09:05:07"],
  ])("%s: seconds column shown=%s, text %s", async (attrs, column, text) => {
    const el = await mount<HTMLElement & { open: boolean; value: string }>(
      `<minerva-time-picker ${attrs} value="09:05:07" aria-label="t"></minerva-time-picker>`,
    );
    el.open = true;
    await settle();
    const input = el.shadowRoot!.querySelector("input")!;
    expect(input.value).toBe(text);
    const columns = el.shadowRoot!.querySelectorAll("[role=listbox]");
    expect(columns.length).toBe(column ? 3 : 2);
  });
});
