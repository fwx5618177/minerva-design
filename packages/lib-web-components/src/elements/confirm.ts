// Registers <minerva-confirm-dialog> (and <minerva-button>) and exports the
// imperative confirm() API.
import { MinervaConfirmDialog } from "../components/confirm/confirm";
import { defineElement } from "../internal/define";

defineElement(MinervaConfirmDialog);

export * from "../components/confirm/confirm";
export * from "../components/confirm/confirm-function";
