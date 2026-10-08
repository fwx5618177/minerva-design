import { matchesShortcut, normalizeShortcuts } from "@minerva/core";
import CommandDialog from "./CommandDialog.vue";

export { CommandDialog, matchesShortcut, normalizeShortcuts };
export type {
  CommandDialogProps,
  CommandItem,
  CommandShortcutEvent,
} from "./types";
