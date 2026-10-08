import { defineHooks } from "../types";

export default defineHooks({
  description: 'Overlapping avatars with an optional "+N" indicator',
  react: ["AvatarGroup"],
  wc: "minerva-avatar-group",
  parts: {
    root: { description: "The group (role=group)" },
    item: { description: "The wrapper of each visible avatar" },
    count: { description: 'The "+N" indicator of the hidden avatars' },
  },
  states: {},
});
