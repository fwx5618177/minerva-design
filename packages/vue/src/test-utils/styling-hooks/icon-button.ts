import { h } from "vue";
import { IconButton } from "../../components/IconButton";
import type { HookScenario } from "./types";

const Icon = () => h("svg");

export default [
  {
    name: "default",
    render: () => h(IconButton, { label: "Settings" }, Icon),
  },
  {
    name: "toggle pressed, every key",
    render: () =>
      h(
        IconButton,
        {
          label: "Bold",
          pressed: true,
          onPressedChange: () => {},
          size: "small",
          variant: "solid",
          color: "danger",
          shape: "square",
        },
        Icon,
      ),
  },
  {
    name: "toggle not pressed",
    render: () => h(IconButton, { label: "Mute", defaultPressed: false }, Icon),
  },
  {
    name: "loading",
    render: () => h(IconButton, { label: "Saving", loading: true }),
  },
  {
    name: "disabled",
    render: () => h(IconButton, { label: "Delete", disabled: true }, Icon),
  },
] satisfies HookScenario[];
