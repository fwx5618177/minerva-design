import type { WcHookScenario } from "../types";

export default [
  {
    name: "single, marks with labels, value, tooltip",
    html: `<minerva-slider aria-label="Volume" value="40" marks='[{"value":0,"label":"0"},{"value":50},{"value":100}]' show-value tooltip name="volume"></minerva-slider>`,
  },
  {
    name: "range, vertical, sizes and colors",
    html: `<minerva-slider aria-label="Price" range value="20,80" size="small"></minerva-slider><minerva-slider aria-label="Level" orientation="vertical" size="large" color="success"></minerva-slider><minerva-slider aria-label="c" color="info"></minerva-slider><minerva-slider aria-label="c" color="warning"></minerva-slider><minerva-slider aria-label="c" color="danger"></minerva-slider>`,
  },
  {
    name: "disabled, read-only, invalid",
    html: `<minerva-slider aria-label="d" disabled></minerva-slider><minerva-slider aria-label="r" readonly></minerva-slider><minerva-slider aria-label="i" invalid></minerva-slider>`,
  },
  {
    name: "dragging",
    html: `<minerva-slider aria-label="Drag" value="10"></minerva-slider>`,
    setup: (root) => {
      const control = root
        .querySelector("minerva-slider")!
        .shadowRoot!.querySelector('[part="control"]')!;
      control.dispatchEvent(
        new PointerEvent("pointerdown", {
          bubbles: true,
          button: 0,
          clientX: 0,
          pointerId: 1,
        }),
      );
    },
  },
] satisfies WcHookScenario[];
