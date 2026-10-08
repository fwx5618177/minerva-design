import type { WcHookScenario } from "../types";

export default [
  {
    name: "overflowing, with actions",
    html: `<minerva-page-tabs aria-label="Open pages" active-value="a">
      <minerva-page-tab value="a" label="A"></minerva-page-tab>
      <button slot="actions">Menu</button>
    </minerva-page-tabs>`,
    setup: (root) => {
      const strip = root.querySelector("minerva-page-tabs")!;
      const viewport =
        strip.shadowRoot!.querySelector<HTMLElement>("[part=viewport]")!;
      Object.defineProperty(viewport, "scrollWidth", { value: 500 });
      Object.defineProperty(viewport, "clientWidth", { value: 100 });
      viewport.dispatchEvent(new Event("scroll"));
    },
  },
] satisfies WcHookScenario[];
