import { mount, type VueWrapper } from "@vue/test-utils";
import { afterEach, beforeEach, expect, it } from "vitest";
import Overlays from "./Overlays.vue";
import { flush, getByRole, key, queryByRole } from "./dom";

// Port of the former Chromium overlays spec. RTL Menu keyboard scope and the
// AutoComplete edge flip are covered by src/anchored-fields-parity.test.ts.
let w: VueWrapper;
beforeEach(() => {
  w = mount(Overlays, { attachTo: document.body });
});
afterEach(() => w.unmount());

it("Modal uses the extra-large surface and Escape returns focus to its opener", async () => {
  const opener = getByRole("button", "Open measured modal");
  opener.focus();
  opener.click();
  await flush();
  const dialog = getByRole("dialog", "Measured modal");
  expect(dialog.classList).toContain("mn-modal-xlarge");
  expect(dialog.textContent).toContain("Modal body");
  key(dialog, "Escape");
  await flush();
  expect(queryByRole("dialog", "Measured modal")).toBeNull();
  expect(document.activeElement).toBe(opener);
});

it("Rating keyboard steps commit through its owner and hover previews five stars", async () => {
  const rating = getByRole("slider", "Measured rating");
  expect(rating.classList).toContain("mn-rating-large");
  rating.focus();
  key(rating, "PageUp");
  await flush();
  expect(rating.getAttribute("aria-valuenow")).toBe("6");
  const stars = rating.querySelectorAll(".mn-star");
  stars[4].dispatchEvent(new MouseEvent("mouseenter"));
  await flush();
  expect(rating.querySelectorAll(".mn-star.mn-active")).toHaveLength(5);
});

it("AutoComplete keeps input focus, selects its original option and closes", async () => {
  const input = getByRole(
    "combobox",
    "Measured completion",
  ) as HTMLInputElement;
  input.focus();
  await flush();
  const listbox = getByRole("listbox");
  expect(document.activeElement).toBe(input);
  getByRole("option", "Alpha", listbox).click();
  await flush();
  expect(input.value).toBe("Alpha");
  expect(queryByRole("listbox")).toBeNull();
});
