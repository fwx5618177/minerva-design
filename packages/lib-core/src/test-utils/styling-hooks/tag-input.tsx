import { FormControl } from "../../components/FormControl";
import { TagInput } from "../../components/TagInput";
import type { HookScenario } from "./types";

export default [
  {
    name: "tags, open with suggestions, every key",
    element: (
      <TagInput
        aria-label="Tags"
        defaultValue={["react"]}
        options={["vue", "svelte"]}
        size="small"
      />
    ),
    setup: async ({ user, container }) => {
      await user.click(container.querySelector("input")!);
    },
  },
  {
    name: "open, no suggestion left, required",
    element: (
      <FormControl required>
        <TagInput aria-label="Tags" defaultValue={["vue"]} options={["vue"]} />
      </FormControl>
    ),
    setup: async ({ user, container }) => {
      await user.click(container.querySelector("input")!);
    },
  },
  {
    name: "closed, invalid, read-only",
    element: (
      <TagInput aria-label="Tags" defaultValue={["react"]} invalid readOnly />
    ),
  },
  { name: "disabled", element: <TagInput aria-label="Tags" disabled /> },
] satisfies HookScenario[];
