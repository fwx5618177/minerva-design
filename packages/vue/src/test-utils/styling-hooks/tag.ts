import { h } from "vue";
import { Tag } from "../../components/Tag";
import type { HookScenario } from "./types";

export default [
  {
    name: "icon, avatar, closable",
    render: () =>
      h(
        Tag,
        { closable: true },
        {
          default: () => "Label",
          icon: () => h("svg"),
          avatar: () => h("img", { alt: "" }),
        },
      ),
  },
  {
    name: "pressed toggle, every key",
    render: () =>
      h(
        Tag,
        {
          clickable: true,
          pressed: true,
          size: "small",
          variant: "solid",
          color: "danger",
          shape: "circle",
        },
        () => "Filter",
      ),
  },
  {
    name: "unpressed toggle, disabled",
    render: () =>
      h(
        Tag,
        { clickable: true, pressed: false, disabled: true },
        () => "Filter",
      ),
  },
  { name: "loading", render: () => h(Tag, { loading: true }, () => "Saving") },
] satisfies HookScenario[];
