// Registers <minerva-confirm-dialog>, <minerva-confirm-provider> (and
// <minerva-button>) and exports the imperative confirm() / confirmFor() API.
import { MinervaConfirmDialog } from "../components/confirm/confirm";
import { MinervaConfirmProvider } from "../components/confirm/confirm-provider";
import { defineElement } from "../internal/define";

defineElement(MinervaConfirmDialog);
defineElement(MinervaConfirmProvider);

export * from "../components/confirm/confirm";
export * from "../components/confirm/confirm-provider";
export {
  confirm,
  confirmFor,
  confirmScopeOf,
  type ConfirmFunction,
  type ConfirmOptions,
} from "../components/confirm/confirm-function";
