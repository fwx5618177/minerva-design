import { h } from "vue";
import { FormControl } from "../../components/FormControl";
import { TagInput } from "../../components/TagInput";
import type { HookScenario } from "./types";

export default [
  {
    name: "tags, open with suggestions, every key",
    render: () =>
      h(TagInput, {
        "aria-label": "Tags",
        defaultValue: ["react"],
        options: ["vue", "svelte"],
        size: "small",
      }),
    setup: async ({ user, container }) => {
      await user.click(container.querySelector("input")!);
    },
  },
  {
    name: "keyboard: highlighted suggestion",
    render: () =>
      h(TagInput, { "aria-label": "Tags", options: ["vue", "svelte"] }),
    setup: async ({ user, container }) => {
      await user.click(container.querySelector("input")!);
      await user.keyboard("{ArrowDown}");
    },
  },
  {
    name: "open, no suggestion left, required",
    render: () =>
      h(FormControl, { required: true }, () =>
        h(TagInput, {
          "aria-label": "Tags",
          defaultValue: ["vue"],
          options: ["vue"],
        }),
      ),
    setup: async ({ user, container }) => {
      await user.click(container.querySelector("input")!);
    },
  },
  {
    name: "closed, invalid, read-only",
    render: () =>
      h(TagInput, {
        "aria-label": "Tags",
        defaultValue: ["react"],
        invalid: true,
        readOnly: true,
      }),
  },
  {
    name: "disabled",
    render: () => h(TagInput, { "aria-label": "Tags", disabled: true }),
  },
] satisfies HookScenario[];
