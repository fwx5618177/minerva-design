import { mount, type VueWrapper } from "@vue/test-utils";
import { afterEach, beforeEach, expect, it } from "vitest";
import Primitives from "./Primitives.vue";
import { flush, getByRole } from "./dom";

// Port of the former Chromium primitives spec on the Primitives fixture.
// Divider styles, Skeleton parts and the Empty SVG source are covered by
// src/primitives-parity.test.ts; real CSS geometry is not asserted here.
let w: VueWrapper;
beforeEach(() => {
  w = mount(Primitives, { attachTo: document.body });
});
afterEach(() => w.unmount());
const testId = (id: string) => w.find(`[data-testid="${id}"]`);

it("unwrapped code keeps preformatted lines inside its capped region", () => {
  const region = getByRole("region", "Payload");
  expect(region.style.maxHeight).toBe("64px");
  expect(region.querySelector<HTMLElement>(".mn-code")!.style.whiteSpace).toBe(
    "pre",
  );
  expect(region.textContent).toBe("alpha\n".repeat(20));
});

it("skeletons expose their animation axis and the owner swaps in loaded children", async () => {
  const skeleton = testId("skeleton");
  expect(skeleton.find('[data-part="avatar"]').attributes("style")).toContain(
    "52px",
  );
  expect(skeleton.find('[data-part="avatar"]').classes().join(" ")).toContain(
    "mn-skeleton-animation-false",
  );
  const lines = testId("skeleton-text").findAll('[data-part="line"]');
  expect(lines).toHaveLength(3);
  expect(lines.at(-1)!.classes()).toContain("mn-skeleton-animation-wave");
  getByRole("button", "Finish loading").click();
  await flush();
  expect(testId("primitives").text()).toContain("Ready");
  expect(testId("skeleton").exists()).toBe(false);
});

it("Textarea owner rejection keeps focus while local and display primitives render", async () => {
  const locked = getByRole("textbox", "Locked notes") as HTMLTextAreaElement;
  locked.focus();
  locked.value = "rejected";
  locked.dispatchEvent(new Event("input", { bubbles: true }));
  await flush();
  expect(locked.value).toBe("locked");
  expect(document.activeElement).toBe(locked);
  expect(locked.classList).toContain("mn-textarea-large");

  const local = getByRole("textbox", "Local notes") as HTMLTextAreaElement;
  local.value = "New text";
  local.dispatchEvent(new Event("input", { bubbles: true }));
  await flush();
  expect(local.value).toBe("New text");
  expect(local.classList).toContain("mn-textarea-small");

  const list = getByRole("list", undefined, testId("primitives").element);
  expect(list.classList).toContain("mn-list-compact");
  expect(getByRole("listitem", undefined, list).textContent).toContain("0");

  const empty = testId("empty");
  expect(empty.attributes("style")).toContain("width: 220px");
  expect(empty.classes()).toContain("mn-empty-shadow");
  expect(empty.find(".mn-empty-icon").exists()).toBe(false);
  expect(getByRole("button", "Create", empty.element)).toBeTruthy();
  expect(testId("descriptions").find('[role="definition"]').text()).toBe("0");
});
