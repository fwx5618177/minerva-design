// Theme, palette and design switching, root and nested scopes: the root
// ConfigProvider owns <html>; a nested one scopes its theme / palette /
// design to its subtree and to its teleported overlays; useTheme switches
// the provider that owns the setting; unmounting restores <html>.
import { describe, expect, it } from "vitest";
import { defineComponent, h, ref } from "vue";
import { Button, ConfigProvider, Modal, useTheme } from "../../src";
import { renderApp, settle } from "./utils";

const html = () => document.documentElement;

const Switcher = defineComponent({
  props: { label: { type: String, required: true } },
  setup(props) {
    const theme = useTheme();
    return () =>
      h("div", { "data-testid": props.label }, [
        h(
          "output",
          null,
          `${theme.theme}/${theme.resolvedTheme}/${theme.palette ?? "none"}`,
        ),
        h(
          Button,
          { onClick: () => theme.setTheme("dark") },
          () => `${props.label} dark`,
        ),
        h(
          Button,
          { onClick: () => theme.setPalette("tech" as never) },
          () => `${props.label} palette`,
        ),
      ]);
  },
});

describe("theme / palette / design switching", () => {
  it("the root provider writes <html>, useTheme switches it, unmount restores it", async () => {
    html().setAttribute("data-theme", "before");
    const { user, wrapper } = renderApp(() =>
      h(ConfigProvider, { theme: "light", density: "compact" }, () =>
        h(Switcher, { label: "root" }),
      ),
    );
    await settle();
    expect(html().dataset.theme).toBe("light");
    expect(html().style.colorScheme).toBe("light");
    expect(html().getAttribute("data-density")).toBe("compact");
    await user.click(document.querySelector("button")!);
    await settle();
    expect(html().dataset.theme).toBe("dark");
    expect(document.querySelector("output")!.textContent).toBe(
      "dark/dark/none",
    );
    const palette = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("palette"),
    )!;
    await user.click(palette);
    await settle();
    expect(html().dataset.palette).toBe("tech");
    wrapper.unmount();
    expect(html().dataset.theme).toBe("before");
    expect(html().hasAttribute("data-palette")).toBe(false);
    expect(html().hasAttribute("data-density")).toBe(false);
    html().removeAttribute("data-theme");
  });

  it("a nested provider scopes its theme and design to its subtree and overlays", async () => {
    const open = ref(false);
    const { user } = renderApp(() =>
      h(ConfigProvider, { theme: "light" }, () => [
        h(Switcher, { label: "outer" }),
        h(ConfigProvider, { theme: "dark", radius: "none" }, () => [
          h(Switcher, { label: "inner" }),
          h(Modal, {
            open: open.value,
            "onUpdate:open": (v: boolean) => (open.value = v),
            title: "Scoped",
          }),
        ]),
      ]),
    );
    await settle();
    const scope = document.querySelector<HTMLElement>(
      "[data-minerva-theme-scope]",
    )!;
    expect(scope.dataset.theme).toBe("dark");
    expect(scope.style.display).toBe("contents");
    expect(scope.getAttribute("data-radius")).toBe("none");
    expect(
      scope.contains(document.querySelector('[data-testid="inner"]')),
    ).toBe(true);
    expect(html().dataset.theme).toBe("light");
    // overlays of the scope are teleported into a host carrying the same scope
    open.value = true;
    await settle(10);
    const dialog = document.querySelector('[role="dialog"]')!;
    const host = dialog.closest<HTMLElement>("[data-minerva-portal-host]")!;
    expect(host).not.toBeNull();
    expect(host.dataset.theme).toBe("dark");
    expect(host.getAttribute("data-radius")).toBe("none");
    open.value = false;
    await settle(10);
    // useTheme inside the nested scope switches the nested provider only
    const innerOutput = document.querySelector('[data-testid="inner"] output')!;
    expect(innerOutput.textContent).toBe("dark/dark/none");
    const outerDark = Array.from(document.querySelectorAll("button")).find(
      (b) => b.textContent === "outer dark",
    )!;
    await user.click(outerDark);
    await settle();
    expect(html().dataset.theme).toBe("dark");
    expect(scope.dataset.theme).toBe("dark");
  });

  it("a nested provider without overrides inherits (no wrapper)", async () => {
    renderApp(() =>
      h(ConfigProvider, { theme: "dark", palette: "tech" as never }, () =>
        h(ConfigProvider, { locale: { language: "fr" } }, () =>
          h(Switcher, { label: "child" }),
        ),
      ),
    );
    await settle();
    expect(document.querySelector("[data-minerva-theme-scope]")).toBeNull();
    expect(
      document.querySelector('[data-testid="child"] output')!.textContent,
    ).toBe("dark/dark/tech");
  });
});
