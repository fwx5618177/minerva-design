import ToastProvider from "./ToastProvider.vue";
import { toast } from "./store";
import { useToast } from "./useToast";
import type {
  ToastAction,
  ToastApi,
  ToastOptions,
  ToastPosition,
  ToastPromiseMessages,
  ToastProviderProps,
} from "./types";

export { ToastProvider, toast, useToast };
export type {
  ToastAction,
  ToastApi,
  ToastOptions,
  ToastPosition,
  ToastPromiseMessages,
  ToastProviderProps,
};

export default ToastProvider;
