import ToastProvider, { useToast } from "./Toast";
import { toast } from "./store";
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
