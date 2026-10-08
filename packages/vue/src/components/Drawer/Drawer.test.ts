import { describe, expect, it } from "vitest";
import { defineComponent, h, ref } from "vue";
import { render, screen, waitFor } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import styles from "@react-styles/components/Drawer/drawer.module.scss";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTrigger,
} from ".";

const setup = () => userEvent.setup({ pointerEventsCheck: 0 });

describe("Drawer (all-in-one)", () => {
  it("renders nothing when closed", () => {
    render(Drawer, {
      props: { open: false, title: "Filters" },
      slots: { default: () => "body" },
    });
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.queryByText("body")).toBeNull();
  });

  it("renders a modal dialog labelled by the title with side/size classes and a hidden description", async () => {
    render(Drawer, {
      props: { open: true, title: "Filters", side: "left", size: "large" },
      slots: { default: () => h(DrawerBody, null, () => "body") },
    });
    const dialog = await screen.findByRole("dialog", { name: "Filters" });
    expect(dialog).toHaveClass(styles.content, styles.left, styles.large);
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("data-side", "left");
    expect(dialog).toHaveAttribute("data-size", "large");
    expect(screen.getByText("Filters")).toHaveClass(styles.header);
    const desc = screen.getByText("Drawer content");
    expect(desc).toHaveClass(styles.visuallyHidden);
    expect(dialog).toHaveAttribute("aria-describedby", desc.id);
    expect(screen.getByText("body")).toHaveClass(styles.body);
    expect(document.querySelector(`.${styles.overlay}`)).not.toBeNull();
  });

  it("defaults to right/medium and renders a visible description when provided", async () => {
    render(Drawer, {
      props: { open: true, title: "T", description: "Narrow the list" },
      slots: { default: () => "x" },
    });
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveClass(styles.right, styles.medium);
    expect(screen.getByText("Narrow the list")).toHaveClass(styles.description);
    expect(dialog).toHaveAccessibleDescription("Narrow the list");
  });

  it("accepts title / description slots", async () => {
    render(Drawer, {
      props: { open: true },
      slots: {
        title: () => h("em", "Slotted title"),
        description: () => "Slotted description",
      },
    });
    const dialog = await screen.findByRole("dialog", { name: "Slotted title" });
    expect(dialog).toHaveAccessibleDescription("Slotted description");
    expect(screen.getByText("Slotted description")).toHaveClass(
      styles.description,
    );
  });

  it.each(["small", "full"] as const)(
    "applies the %s size class",
    async (size) => {
      render(Drawer, { props: { open: true, title: "T", side: "top", size } });
      expect(await screen.findByRole("dialog")).toHaveClass(
        styles.top,
        styles[size],
      );
    },
  );

  it("requests closing from the close button, Escape and outside overlay click", async () => {
    const user = setup();
    const { emitted } = render(Drawer, {
      props: { open: true, title: "T" },
      slots: { default: () => "x" },
    });
    const close = await screen.findByRole("button", { name: "Close" });
    await new Promise((r) => setTimeout(r, 5));
    expect(close).toHaveAttribute("type", "button");
    expect(close).toHaveClass(styles.close);
    await user.click(close);
    expect(emitted("openChange")).toEqual([[false]]);
    expect(emitted("update:open")).toEqual([[false]]);
    await user.keyboard("{Escape}");
    expect(emitted("openChange")).toHaveLength(2);
    await user.click(
      document.querySelector<HTMLElement>(`.${styles.overlay}`)!,
    );
    expect(emitted("openChange")).toHaveLength(3);
  });

  it("hides the close button, accepts a custom close label, class and hidden description", async () => {
    const { rerender } = render(Drawer, {
      props: { open: true, title: "T", hideCloseButton: true },
    });
    await screen.findByRole("dialog");
    expect(screen.queryByRole("button", { name: "Close" })).toBeNull();
    await rerender({
      open: true,
      title: "T",
      hideCloseButton: false,
      closeLabel: "Dismiss",
      hiddenDescription: "Filter panel",
    });
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toHaveAccessibleDescription(
      "Filter panel",
    );
  });

  it("forwards attributes (class) to the panel", async () => {
    render(Drawer, {
      props: { open: true, title: "T" },
      attrs: { class: "extra", "data-k": "v" },
    });
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveClass("extra");
    expect(dialog).toHaveAttribute("data-k", "v");
  });

  it("moves focus into the drawer, unmounts it on Escape and restores the opener (v-model:open)", async () => {
    const user = setup();
    const open = ref(false);
    render(
      defineComponent(() => () => [
        h(
          "button",
          { type: "button", onClick: () => (open.value = true) },
          "Open",
        ),
        h(
          Drawer,
          {
            open: open.value,
            "onUpdate:open": (v: boolean) => (open.value = v),
            title: "Settings",
          },
          () => h(DrawerBody, null, () => h("input", { "aria-label": "Name" })),
        ),
      ]),
    );
    const opener = screen.getByRole("button", { name: "Open" });
    await user.click(opener);
    const dialog = await screen.findByRole("dialog", { name: "Settings" });
    await waitFor(() =>
      expect(dialog).toContainElement(document.activeElement as HTMLElement),
    );
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(open.value).toBe(false);
    await waitFor(() => expect(opener).toHaveFocus());
  });

  it("works uncontrolled with a trigger slot and defaultOpen", async () => {
    const user = setup();
    const { emitted } = render(Drawer, {
      props: { defaultOpen: true, title: "Panel" },
      slots: { trigger: () => h("button", { type: "button" }, "Toggle") },
    });
    await screen.findByRole("dialog", { name: "Panel" });
    await new Promise((r) => setTimeout(r, 5));
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(emitted("openChange")).toEqual([[false]]);
    const toggle = screen.getByRole("button", { name: "Toggle" });
    expect(toggle).toHaveAttribute("aria-haspopup", "dialog");
    await user.click(toggle);
    expect(
      await screen.findByRole("dialog", { name: "Panel" }),
    ).toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });
});

describe("Drawer composable API", () => {
  it("opens via trigger, closes via DrawerClose, and forwards attrs", async () => {
    const user = setup();
    const events: string[] = [];
    render(
      defineComponent(
        () => () =>
          h(DrawerRoot, null, () => [
            h(DrawerTrigger, null, () => "Open drawer"),
            h(
              DrawerContent,
              {
                side: "bottom",
                size: "full",
                class: "extra",
                overlayClass: "ov",
                closeLabel: "Dismiss",
                "data-k": "v",
                onOpenAutoFocus: () => events.push("open"),
                onCloseAutoFocus: () => events.push("close"),
                onEscapeKeyDown: () => events.push("escape"),
                onPointerDownOutside: () => events.push("pointer"),
                onInteractOutside: () => events.push("interact"),
              },
              () => [
                h(DrawerHeader, { class: "h" }, () => "Panel"),
                h(DrawerFooter, { class: "f" }, () =>
                  h(DrawerClose, null, () => "Done"),
                ),
              ],
            ),
          ]),
      ),
    );
    const trigger = screen.getByRole("button", { name: "Open drawer" });
    expect(trigger).toHaveAttribute("type", "button");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    const dialog = await screen.findByRole("dialog", { name: "Panel" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(dialog).toHaveClass(styles.bottom, styles.full, "extra");
    expect(dialog).toHaveAttribute("data-k", "v");
    expect(document.querySelector(`.${styles.overlay}`)).toHaveClass("ov");
    expect(screen.getByText("Panel")).toHaveClass(styles.header, "h");
    expect(dialog.querySelector(`.${styles.footer}`)).toHaveClass("f");
    expect(screen.getByRole("button", { name: "Dismiss" })).toHaveClass(
      styles.close,
    );
    await new Promise((r) => setTimeout(r, 5));
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await user.click(trigger);
    await screen.findByRole("dialog");
    await new Promise((r) => setTimeout(r, 5));
    await user.click(
      document.querySelector<HTMLElement>(`.${styles.overlay}`)!,
    );
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await user.click(trigger);
    await screen.findByRole("dialog");
    await user.click(screen.getByRole("button", { name: "Done" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(events).toEqual(
      expect.arrayContaining([
        "open",
        "close",
        "escape",
        "pointer",
        "interact",
      ]),
    );
  });

  it("DrawerClose / DrawerTrigger with asChild", async () => {
    const user = setup();
    render(
      defineComponent(
        () => () =>
          h(DrawerRoot, { defaultOpen: false }, () => [
            h(DrawerTrigger, { asChild: true }, () =>
              h("a", { href: "#", role: "button" }, "Link trigger"),
            ),
            h(DrawerContent, { hideCloseButton: true }, () => [
              h(DrawerHeader, null, () => "As child"),
              h(DrawerClose, { asChild: true }, () =>
                h("span", { role: "button", tabindex: 0 }, "Close me"),
              ),
            ]),
          ]),
      ),
    );
    await user.click(screen.getByRole("button", { name: "Link trigger" }));
    await screen.findByRole("dialog", { name: "As child" });
    await user.click(screen.getByRole("button", { name: "Close me" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("traps Tab focus inside the open drawer", async () => {
    const user = setup();
    render(
      defineComponent(() => () => [
        h("button", { type: "button" }, "Outside"),
        h(DrawerRoot, { open: true }, () =>
          h(DrawerContent, null, () => [
            h(DrawerHeader, null, () => "Trap"),
            h("button", { type: "button" }, "Inside"),
          ]),
        ),
      ]),
    );
    const dialog = await screen.findByRole("dialog", { name: "Trap" });
    await waitFor(() =>
      expect(dialog).toContainElement(document.activeElement as HTMLElement),
    );
    for (let i = 0; i < 4; i += 1) {
      await user.tab();
      expect(dialog).toContainElement(document.activeElement as HTMLElement);
    }
  });

  it("non-modal drawer: no overlay, no aria-modal", async () => {
    render(
      defineComponent(
        () => () =>
          h(DrawerRoot, { open: true, modal: false }, () =>
            h(DrawerContent, null, () => h(DrawerHeader, null, () => "Side")),
          ),
      ),
    );
    const dialog = await screen.findByRole("dialog", { name: "Side" });
    expect(dialog).not.toHaveAttribute("aria-modal");
    expect(document.querySelector(`.${styles.overlay}`)).toBeNull();
  });

  it("throws when a part is used outside DrawerRoot", () => {
    const err = console.warn;
    console.warn = () => {};
    try {
      expect(() => render(DrawerTrigger)).toThrow(/DrawerTrigger/);
    } finally {
      console.warn = err;
    }
  });
});
