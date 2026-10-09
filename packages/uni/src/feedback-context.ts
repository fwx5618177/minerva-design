import { inject } from "vue";
import {
  confirm,
  toast,
  type ConfirmOptions,
  type ToastApi,
} from "./feedback-store";
export function useConfirm() {
  return inject<(options: ConfirmOptions) => Promise<boolean>>(
    "minerva:confirm",
    confirm,
  );
}
export function useToast() {
  return inject<ToastApi>("minerva:toast", toast);
}
