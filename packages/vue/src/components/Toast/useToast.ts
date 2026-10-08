import { useThemeScope } from "../../internal/scope";
import { createToast, toast, toastScopeOf, toastStore } from "./store";
import type { ToastApi } from "./types";

/**
 * Returns the toast API bound to the calling component's scope: toasts shown
 * with it follow the nearest ConfigProvider (rendered into its portal host,
 * so its theme / palette / tokens apply, and labelled in its language). The
 * owning ToastProvider still renders them, with its position, max and
 * labels. Outside any nested scope it returns the `toast` export itself.
 *
 * Call it in `setup`; use `toast()` from code outside components (event
 * buses, API clients...), which uses the ToastProvider's (root) scope.
 */
export const useToast = (): ToastApi => {
  const scope = useThemeScope();
  if (!scope || (!scope.value.scoped && !toastScopeOf(scope.value))) {
    return toast;
  }
  // Read when a toast is shown: the scoped portal host exists once mounted
  return createToast(toastStore, () => toastScopeOf(scope.value));
};
