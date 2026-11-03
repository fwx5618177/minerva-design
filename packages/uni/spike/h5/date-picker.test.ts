import { mount } from "@vue/test-utils";
import { expect, it } from "vitest";
import { DatePicker } from "../../src";
import { flush, getByRole, queryByRole } from "./dom";

// Port of the former Chromium date-picker spec: the labelled panel, bounded
// days, selection closing the panel and the clear affordance, observed
// through roles on the mounted document.
it("DatePicker opens a labelled bounded panel, selects, closes and clears", async () => {
  const w = mount(DatePicker, {
    attachTo: document.body,
    props: {
      label: "Start date",
      defaultValue: "2026-10-15",
      minDate: "2026-10-10",
      maxDate: "2026-10-20",
    },
  });
  const input = getByRole("textbox", "Start date") as HTMLInputElement;
  input.click();
  await flush();
  const panel = getByRole("dialog", "Start date");
  expect(w.find(".mn-uni-date-picker").attributes("data-state")).toBe("open");
  expect(
    panel.querySelector<HTMLButtonElement>('[data-day="2026-10-09"]')!.disabled,
  ).toBe(true);
  expect(
    panel.querySelector<HTMLButtonElement>('[data-day="2026-10-16"]')!.disabled,
  ).toBe(false);

  panel.querySelector<HTMLElement>('[data-day="2026-10-16"]')!.click();
  await flush();
  expect(input.value).toBe("2026-10-16");
  expect(queryByRole("dialog", "Start date")).toBeNull();
  expect(w.find(".mn-uni-date-picker").attributes("data-state")).toBe("closed");

  getByRole("button", "Clear date").click();
  await flush();
  expect(input.value).toBe("");
  expect(queryByRole("button", "Clear date")).toBeNull();
  w.unmount();
});
