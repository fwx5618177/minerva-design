import { useState } from "react";
import { vi } from "vitest";
import { AppShell } from "../../components/AppShell";
import type { HookScenario } from "./types";

const navigation = () => (
  <nav aria-label="Primary">
    <a href="#home">Home</a>
  </nav>
);

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

const MobileShell = () => {
  useState(mockMobile);
  return (
    <AppShell brand="Minerva" navigation={navigation}>
      Main
    </AppShell>
  );
};

export default [
  {
    name: "desktop",
    element: (
      <AppShell brand="Minerva" navigation={navigation}>
        Main
      </AppShell>
    ),
  },
  // last: the matchMedia mock lasts until the end of the test
  {
    name: "mobile, drawer open",
    element: <MobileShell />,
    async setup({ user, container }) {
      await user.click(
        container.querySelector<HTMLElement>('[data-part="header"] button')!,
      );
    },
  },
] satisfies HookScenario[];
