import type { WcHookScenario } from "../types";

export default [
  {
    name: "default, tooltip shown on focus",
    html: `<minerva-icon-button label="Settings"><svg></svg></minerva-icon-button>`,
    setup: (root) => {
      root.querySelector<HTMLElement>("minerva-icon-button")!.focus();
    },
  },
  {
    name: "toggle pressed, every key",
    html: `<minerva-icon-button label="Bold" toggle pressed size="small" variant="solid" color="danger" shape="square"><svg></svg></minerva-icon-button>`,
  },
  {
    name: "toggle not pressed",
    html: `<minerva-icon-button label="Mute" toggle><svg></svg></minerva-icon-button>`,
  },
  {
    name: "loading",
    html: `<minerva-icon-button label="Saving" loading></minerva-icon-button>`,
  },
  {
    name: "disabled",
    html: `<minerva-icon-button label="Delete" disabled><svg></svg></minerva-icon-button>`,
  },
] satisfies WcHookScenario[];
