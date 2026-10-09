import { h } from "vue";
import { vi } from "vitest";
import { AppShell } from "../../components/AppShell";
import type { HookScenario } from "./types";

const navigation = () =>
  h("nav", { "aria-label": "Primary" }, [h("a", { href: "#home" }, "Home")]);

/** Matches the mobile query (restored by the contract test's afterEach) */
const mockMobile = () =>
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query: string) =>
      ({
        matches: true,
        media: query,
        onchange: null,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        addListener: () => undefined,
        removeListener: () => undefined,
        dispatchEvent: () => true,
      }) as unknown as MediaQueryList,
  );

export default [
  {
    name: "desktop",
    render: () =>
      h(AppShell, { brand: "Minerva" }, { navigation, default: () => "Main" }),
  },
  // last: the matchMedia mock lasts until the end of the test
  {
    name: "mobile, drawer open",
    render: () => {
      mockMobile();
      return h(
        AppShell,
        { brand: "Minerva" },
        { navigation, default: () => "Main" },
      );
    },
    async setup({ user, container }) {
      await user.click(
        container.querySelector<HTMLElement>('[data-part="header"] button')!,
      );
    },
  },
] satisfies HookScenario[];
