import userEvent from "@testing-library/user-event";
import type { WcHookScenario } from "../types";

const open = async (root: HTMLElement) => {
  const el = root.querySelector("minerva-tag-input")!;
  el.shadowRoot!.querySelector("input")!.focus();
  await (el as unknown as { updateComplete: Promise<unknown> }).updateComplete;
};

export default [
  {
    name: "tags, open with suggestions, every key",
    html: `<minerva-tag-input aria-label="Tags" value="react" options="vue,svelte" size="small" required></minerva-tag-input>`,
    setup: (root) => open(root),
  },
  {
    name: "keyboard: highlighted suggestion",
    html: `<minerva-tag-input aria-label="Tags" options="vue,svelte"></minerva-tag-input>`,
    setup: async (root) => {
      await open(root);
      await userEvent.setup().keyboard("{ArrowDown}");
    },
  },
  {
    name: "open, no suggestion left",
    html: `<minerva-tag-input aria-label="Tags" value="vue" options="vue"></minerva-tag-input>`,
    setup: open,
  },
  {
    name: "closed, invalid, read-only",
    html: `<minerva-tag-input aria-label="Tags" value="react" invalid readonly></minerva-tag-input>`,
  },
  {
    name: "disabled",
    html: `<minerva-tag-input aria-label="Tags" disabled></minerva-tag-input>`,
  },
] satisfies WcHookScenario[];
