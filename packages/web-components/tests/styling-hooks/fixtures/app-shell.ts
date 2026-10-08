import { vi } from "vitest";
import type { MinervaAppShell } from "../../../src/components/app-shell/app-shell";
import type { WcHookScenario } from "../types";

const shell = `<minerva-app-shell brand="Minerva">
  <nav slot="navigation" aria-label="Primary"><a href="#home">Home</a></nav>
  Main
</minerva-app-shell>`;

export default [
  { name: "desktop", html: shell },
  // last: the matchMedia mock lasts until the end of the test
  {
    name: "mobile, drawer open",
    html: shell,
    async setup(root) {
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
      const el = root.querySelector<MinervaAppShell>("minerva-app-shell")!;
      // reconnect: the media query is read on connect
      el.remove();
      root.append(el);
      await el.updateComplete;
      el.openNavigation();
    },
  },
] satisfies WcHookScenario[];
