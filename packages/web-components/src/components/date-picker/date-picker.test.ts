import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import "../../index";
import { $, mount, settle } from "../../../tests/utils";

type Picker = HTMLElement & {
  value: string;
  open: boolean;
  readOnly: boolean;
  disabled: boolean;
  updateComplete: Promise<boolean>;
  formResetCallback(): void;
};
const input = (el: Picker) => $<HTMLInputElement>(el, "input");

describe("date picker", () => {
  it("registers a date input that selects a bounded calendar date and emits one change", async () => {
    expect(customElements.get("minerva-date-picker")).toBeDefined();
    const el = await mount<Picker>(
      '<minerva-date-picker value="2026-10-15" min-date="2026-10-10" max-date="2026-10-20"></minerva-date-picker>',
    );
    const change = vi.fn();
    el.addEventListener("minerva-change", change);
    await userEvent.click(input(el));
    await settle();
    expect(el.open).toBe(true);
    expect($(el, '[data-date="2026-10-09"]')).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    await userEvent.click($(el, '[data-date="2026-10-09"]'));
    expect(change).not.toHaveBeenCalled();
    await userEvent.click($(el, '[data-date="2026-10-16"]'));
    await settle();
    expect(el.value).toBe("2026-10-16");
    expect(change).toHaveBeenCalledTimes(1);
    expect(change.mock.calls[0][0].detail).toEqual({ value: "2026-10-16" });
    expect(el.open).toBe(false);
    expect(el.shadowRoot!.activeElement).toBe(input(el));
  });

  it("rejects invalid drafts, clears, and resets to the attribute value", async () => {
    const el = await mount<Picker>(
      '<minerva-date-picker value="2026-10-15"></minerva-date-picker>',
    );
    input(el).value = "";
    input(el).dispatchEvent(new Event("input", { bubbles: true }));
    await settle();
    input(el).value = "2026-02-30";
    input(el).dispatchEvent(new Event("input", { bubbles: true }));
    input(el).dispatchEvent(new Event("blur"));
    await settle();
    expect(el.value).toBe("");
    expect(input(el).value).toBe("");
    el.formResetCallback();
    await settle();
    expect(el.value).toBe("2026-10-15");
    await userEvent.click($(el, '[part="clear-button"]'));
    await settle();
    expect(el.value).toBe("");
  });

  it("supports calendar keyboard navigation and cancellation of opening", async () => {
    const el = await mount<Picker>(
      '<minerva-date-picker value="2026-10-15"></minerva-date-picker>',
    );
    input(el).focus();
    await userEvent.keyboard("{ArrowDown}");
    await settle();
    expect(el.shadowRoot!.activeElement).toHaveAttribute(
      "data-date",
      "2026-10-15",
    );
    await userEvent.keyboard("{ArrowRight}{Enter}");
    await settle();
    expect(el.value).toBe("2026-10-16");
    const prevent = (event: Event) => event.preventDefault();
    el.addEventListener("minerva-open-change", prevent);
    await userEvent.click(input(el));
    await settle();
    expect(el.open).toBe(false);
  });

  it("clears whitespace drafts and normalizes dates into the displayed month", async () => {
    const el = await mount<Picker>(
      '<minerva-date-picker value="2026-10-15"></minerva-date-picker>',
    );
    input(el).value = "   ";
    input(el).dispatchEvent(new Event("input"));
    input(el).dispatchEvent(new Event("blur"));
    await settle();
    expect(el.value).toBe("");
    await userEvent.click(input(el));
    input(el).value = "2026-2-3";
    input(el).dispatchEvent(new Event("input"));
    input(el).dispatchEvent(new Event("blur"));
    await settle();
    expect(el.value).toBe("2026-02-03");
    expect($(el, ".heading").textContent).toContain("February");
  });

  it.each(["readonly", "disabled"])(
    "blocks input, calendar and clear when %s",
    async (lock) => {
      const el = await mount<Picker>(
        `<minerva-date-picker value="2026-10-15" ${lock}></minerva-date-picker>`,
      );
      await userEvent.click(input(el));
      await settle();
      expect(el.open).toBe(false);
      expect(el.shadowRoot!.querySelector('[part="clear-button"]')).toBeNull();
      expect(el.value).toBe("2026-10-15");
    },
  );
});
