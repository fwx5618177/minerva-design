// Overlays nested in a focus-trapped Modal: closing the inner overlay
// (Escape / selection) returns focus to its own trigger and keeps the modal
// open; Escape then closes the modal and focus returns to the page trigger.
// Regression: a teleport unmounted from inside the modal used to mutate the
// modal's DOM, so the focus trap pulled focus to the modal itself.
import { describe, expect, it } from "vitest";
import { h, type VNode } from "vue";
import {
  AutoComplete,
  Button,
  Cascader,
  Drawer,
  Menu,
  Modal,
  Select,
  SelectItem,
  TimePicker,
} from "../../src";
import { dialogs, renderApp, settle } from "./utils";

const inModal = (inner: () => VNode) =>
  h(
    Modal,
    { title: "Outer" },
    {
      trigger: () => h(Button, null, () => "Open modal"),
      default: inner,
    },
  );

async function openModal(user: ReturnType<typeof renderApp>["user"]) {
  const trigger = document.querySelector<HTMLElement>("button")!;
  await user.click(trigger);
  await settle(10);
  expect(dialogs()).toHaveLength(1);
  return trigger;
}

async function closeModal(
  user: ReturnType<typeof renderApp>["user"],
  trigger: HTMLElement,
) {
  await user.keyboard("{Escape}");
  await settle(10);
  expect(dialogs()).toHaveLength(0);
  expect(document.activeElement).toBe(trigger);
}

describe("overlays nested in a Modal", () => {
  it("Modal in Modal: each Escape closes the topmost and focus goes back to its trigger", async () => {
    const { user } = renderApp(() =>
      inModal(() =>
        h(
          Modal,
          { title: "Inner" },
          { trigger: () => h(Button, null, () => "Open inner") },
        ),
      ),
    );
    const outer = await openModal(user);
    const innerTrigger = Array.from(
      document.querySelectorAll<HTMLElement>("button"),
    ).find((b) => b.textContent === "Open inner")!;
    await user.click(innerTrigger);
    await settle(10);
    expect(dialogs()).toHaveLength(2);
    await user.keyboard("{Escape}");
    await settle(10);
    expect(dialogs()).toHaveLength(1);
    expect(document.activeElement).toBe(innerTrigger);
    await closeModal(user, outer);
  });

  it("Drawer in Modal", async () => {
    const { user } = renderApp(() =>
      inModal(() =>
        h(
          Drawer,
          { title: "Panel" },
          { trigger: () => h(Button, null, () => "Open drawer") },
        ),
      ),
    );
    const outer = await openModal(user);
    const drawerTrigger = Array.from(
      document.querySelectorAll<HTMLElement>("button"),
    ).find((b) => b.textContent === "Open drawer")!;
    await user.click(drawerTrigger);
    await settle(10);
    expect(dialogs()).toHaveLength(2);
    await user.keyboard("{Escape}");
    await settle(10);
    expect(dialogs()).toHaveLength(1);
    expect(document.activeElement).toBe(drawerTrigger);
    await closeModal(user, outer);
  });

  it("Select in Modal: Escape closes the listbox, focus back on the combobox", async () => {
    const { user } = renderApp(() =>
      inModal(() =>
        h(Select, { ariaLabel: "Fruit", placeholder: "Pick" }, () => [
          h(SelectItem, { value: "a" }, () => "Apple"),
          h(SelectItem, { value: "b" }, () => "Banana"),
        ]),
      ),
    );
    const outer = await openModal(user);
    const combobox = document.querySelector<HTMLElement>('[role="combobox"]')!;
    await user.click(combobox);
    await settle(10);
    expect(document.querySelector('[role="listbox"]')).not.toBeNull();
    await user.keyboard("{Escape}");
    await settle(10);
    expect(document.querySelector('[role="listbox"]')).toBeNull();
    expect(dialogs()).toHaveLength(1);
    expect(document.activeElement).toBe(combobox);
    // selecting with the keyboard closes it too
    await user.keyboard("{Enter}");
    await settle(10);
    await user.keyboard("{ArrowDown}{Enter}");
    await settle(10);
    expect(document.querySelector('[role="listbox"]')).toBeNull();
    expect(document.activeElement).toBe(combobox);
    await closeModal(user, outer);
  });

  it("Menu in Modal: Escape returns focus to the menu trigger", async () => {
    const { user } = renderApp(() =>
      inModal(() =>
        h(
          Menu,
          {
            items: [
              { key: "edit", label: "Edit" },
              { key: "delete", label: "Delete" },
            ],
          },
          { trigger: () => h(Button, null, () => "Actions") },
        ),
      ),
    );
    const outer = await openModal(user);
    const menuTrigger = Array.from(
      document.querySelectorAll<HTMLElement>("button"),
    ).find((b) => b.textContent === "Actions")!;
    await user.click(menuTrigger);
    await settle(10);
    expect(document.querySelector('[role="menu"]')).not.toBeNull();
    await user.keyboard("{Escape}");
    await settle(10);
    expect(document.querySelector('[role="menu"]')).toBeNull();
    expect(dialogs()).toHaveLength(1);
    expect(document.activeElement).toBe(menuTrigger);
    await closeModal(user, outer);
  });

  it("AutoComplete in Modal: Escape closes the suggestions, focus stays in the input", async () => {
    const { user } = renderApp(() =>
      inModal(() =>
        h(AutoComplete, {
          "aria-label": "City",
          options: [
            { value: "paris", label: "Paris" },
            { value: "prague", label: "Prague" },
            { value: "porto", label: "Porto" },
          ],
        }),
      ),
    );
    const outer = await openModal(user);
    const input = document.querySelector<HTMLInputElement>(
      '[role="dialog"] [role="combobox"]',
    )!;
    expect(
      input,
      document.querySelector('[role="dialog"]')?.outerHTML,
    ).not.toBeNull();
    await user.click(input);
    await user.type(input, "P");
    await settle(10);
    expect(document.querySelector('[role="listbox"]')).not.toBeNull();
    await user.keyboard("{Escape}");
    await settle(10);
    expect(document.querySelector('[role="listbox"]')).toBeNull();
    expect(dialogs()).toHaveLength(1);
    expect(document.activeElement).toBe(input);
    // like React: the next Escape clears the leftover text, the modal stays
    await user.keyboard("{Escape}");
    await settle(10);
    expect(input.value).toBe("");
    expect(dialogs()).toHaveLength(1);
    await closeModal(user, outer);
  });

  it("Cascader in Modal", async () => {
    const { user } = renderApp(() =>
      inModal(() =>
        h(Cascader, {
          label: "Region",
          name: "region",
          "aria-label": "Region",
          options: [
            {
              value: "fr",
              label: "France",
              children: [{ value: "paris", label: "Paris" }],
            },
          ],
        }),
      ),
    );
    const outer = await openModal(user);
    const trigger = document.querySelector<HTMLElement>(
      '[role="dialog"] [aria-haspopup]',
    )!;
    await user.click(trigger);
    await settle(10);
    expect(
      document.querySelectorAll(
        '[role="dialog"], [role="listbox"], [role="tree"], [role="menu"]',
      ).length,
    ).toBeGreaterThan(1);
    await user.keyboard("{Escape}");
    await settle(10);
    expect(dialogs()).toHaveLength(1);
    expect(document.activeElement).toBe(trigger);
    await closeModal(user, outer);
  });

  it("TimePicker in Modal", async () => {
    const { user } = renderApp(() =>
      inModal(() => h(TimePicker, { "aria-label": "Time" })),
    );
    const outer = await openModal(user);
    const trigger = document.querySelector<HTMLElement>(
      '[role="dialog"] input',
    )!;
    await user.click(trigger);
    await settle(10);
    const panels = document.querySelectorAll(
      '[data-minerva="time-picker"][data-part="content"], [role="listbox"]',
    );
    expect(panels.length).toBeGreaterThan(0);
    await user.keyboard("{Escape}");
    await settle(10);
    expect(dialogs()).toHaveLength(1);
    expect(document.activeElement).toBe(trigger);
    await closeModal(user, outer);
  });
});
