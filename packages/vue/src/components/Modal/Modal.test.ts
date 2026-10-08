import { describe, expect, it } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import userEvent from "@testing-library/user-event";
import { defineComponent, h, nextTick, ref } from "vue";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalRoot,
  ModalTrigger,
  ModalClose,
} from ".";
import { Button } from "../Button";

const settle = async () => {
  await flushPromises();
  await new Promise((r) => setTimeout(r, 0));
  await nextTick();
};

describe("Modal", () => {
  it("opens from its trigger, traps focus, closes on Escape and restores focus", async () => {
    const user = userEvent.setup();
    const wrapper = mount(Modal, {
      attachTo: document.body,
      props: { title: "Delete", description: "Sure?" },
      slots: {
        trigger: () => h(Button, null, () => "Open"),
        default: () => h("input", { "aria-label": "Name" }),
      },
    });
    const trigger = wrapper.get("button");
    expect(trigger.attributes("aria-haspopup")).toBe("dialog");
    await user.click(trigger.element);
    await settle();
    const dialog = document.querySelector('[role="dialog"]')!;
    expect(dialog).not.toBeNull();
    expect(dialog.getAttribute("aria-modal")).toBe("true");
    expect(
      document.getElementById(dialog.getAttribute("aria-labelledby")!)
        ?.textContent,
    ).toContain("Delete");
    expect(
      document.getElementById(dialog.getAttribute("aria-describedby")!)
        ?.textContent,
    ).toContain("Sure?");
    expect(dialog.contains(document.activeElement)).toBe(true);
    expect(document.querySelector('[data-part="overlay"]')).not.toBeNull();
    expect(wrapper.emitted("openChange")).toEqual([[true]]);
    await user.keyboard("{Escape}");
    await settle();
    expect(document.querySelector('[role="dialog"]')).toBeNull();
    expect(wrapper.emitted("openChange")).toEqual([[true], [false]]);
    expect(document.activeElement).toBe(trigger.element);
  });

  it("is controlled with v-model:open and closes from the close button", async () => {
    const open = ref(true);
    const Host = defineComponent(
      () => () =>
        h(
          Modal,
          {
            open: open.value,
            "onUpdate:open": (v: boolean) => (open.value = v),
            title: "T",
          },
          () => "Body",
        ),
    );
    mount(Host, { attachTo: document.body });
    await settle();
    const close = document.querySelector<HTMLButtonElement>(
      '[data-part="close-button"]',
    )!;
    expect(close.getAttribute("aria-label")).toBe("Close");
    close.click();
    await settle();
    expect(open.value).toBe(false);
    expect(document.querySelector('[role="dialog"]')).toBeNull();
  });

  it("composes Root / Trigger / Content / Header / Body / Footer / Close", async () => {
    const user = userEvent.setup();
    mount(
      defineComponent(
        () => () =>
          h(ModalRoot, { defaultOpen: false }, () => [
            h(ModalTrigger, null, () => "Open"),
            h(ModalContent, { size: "large", hideCloseButton: true }, () => [
              h(ModalHeader, null, () => "Title"),
              h(ModalBody, null, () => "Body"),
              h(ModalFooter, null, () => h(ModalClose, null, () => "Done")),
            ]),
          ]),
      ),
      { attachTo: document.body },
    );
    await user.click(document.querySelector("button")!);
    await settle();
    const content = document.querySelector('[data-part="content"]')!;
    expect(content.getAttribute("data-size")).toBe("large");
    expect(content.classList).toContain("large");
    expect(document.querySelector('[data-part="close-button"]')).toBeNull();
    await user.click(
      document.querySelector<HTMLElement>('[data-part="footer"] button')!,
    );
    await settle();
    expect(document.querySelector('[role="dialog"]')).toBeNull();
  });
});
