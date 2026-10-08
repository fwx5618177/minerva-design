import ConfirmDialog from "./ConfirmDialog.vue";
import ConfirmProvider from "./ConfirmProvider.vue";
import { confirm, useConfirm } from "./confirm";

export { ConfirmDialog, ConfirmProvider, confirm, useConfirm };
export type {
  ConfirmContent,
  ConfirmDialogProps,
  ConfirmFunction,
  ConfirmOptions,
  ConfirmProviderProps,
} from "./types";
