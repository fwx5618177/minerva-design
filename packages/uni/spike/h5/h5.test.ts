import { mount } from "@vue/test-utils";
import { expect, it } from "vitest";
import { h } from "vue";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../../src";
import OverlayLifecycle from "./OverlayLifecycle.vue";
import { flush, getByRole, queryByRole } from "./dom";

// Port of the former Chromium H5 spec. Modal isolation, sandboxed preview,
// portals and modality switches live in src/h5-completion.test.ts; these
// cover the authored asChild close path and the fixture lifecycle flows.
it("authored asChild popover closes through an authored PopoverClose and restores focus", async () => {
  const w = mount(Popover, {
    attachTo: document.body,
    slots: {
      default: () => [
        h(PopoverTrigger, { asChild: true }, () =>
          h("button", { id: "authored" }, "Authored trigger"),
        ),
        h(PopoverContent, { "aria-label": "Authored panel" }, () =>
          h(PopoverClose, { asChild: true }, () =>
            h("button", { id: "authored-close" }, "Done"),
          ),
        ),
      ],
    },
  });
  expect(document.querySelectorAll("#authored")).toHaveLength(1);
  document.querySelector<HTMLElement>("#authored")!.click();
  await flush();
  expect(getByRole("dialog", "Authored panel")).toBeTruthy();
  expect(document.querySelectorAll("#authored-close")).toHaveLength(1);
  document.querySelector<HTMLElement>("#authored-close")!.click();
  await flush();
  expect(queryByRole("dialog", "Authored panel")).toBeNull();
  expect(document.activeElement?.id).toBe("authored");
  w.unmount();
});

it("lifecycle drawer toggles modality while open and releases isolation when ended", async () => {
  const w = mount(OverlayLifecycle, { attachTo: document.body });
  const outside = document.querySelector<HTMLElement>("#lifecycle-outside")!;
  getByRole("button", "Open lifecycle drawer").click();
  await flush();
  expect(getByRole("dialog")).toBeTruthy();
  expect(outside.closest("[inert]")).toBeNull();

  getByRole("button", "Toggle drawer modality").click();
  await flush();
  expect(outside.closest("[inert]")).not.toBeNull();
  expect(document.body.style.overflow).toBe("hidden");

  getByRole("button", "End drawer lifecycle").click();
  await flush();
  expect(queryByRole("dialog")).toBeNull();
  expect(outside.closest("[inert]")).toBeNull();
  expect(document.body.style.overflow).not.toBe("hidden");
  w.unmount();
});

it("controlled lifecycle popover stays open on outside focus and releases its modal scope when ended", async () => {
  const w = mount(OverlayLifecycle, { attachTo: document.body });
  const outside = document.querySelector<HTMLElement>("#lifecycle-outside")!;
  getByRole("button", "Open lifecycle popover").click();
  await flush();
  expect(document.querySelector("#resizing-panel")).not.toBeNull();

  outside.focus();
  await flush();
  expect(document.querySelector("#resizing-panel")).not.toBeNull();

  getByRole("button", "Toggle popover modality").click();
  await flush();
  expect(outside.closest("[inert]")).not.toBeNull();

  getByRole("button", "Resize content").click();
  await flush();
  expect(
    document.querySelector<HTMLElement>("#resizing-panel")!.style.height,
  ).toBe("220px");

  getByRole("button", "End popover lifecycle").click();
  await flush();
  expect(document.querySelector("#resizing-panel")).toBeNull();
  expect(outside.closest("[inert]")).toBeNull();
  expect(document.body.style.overflow).not.toBe("hidden");
  w.unmount();
});
