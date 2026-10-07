import ToastProvider, { useToast } from "./Toast";
import { toast } from "./store";
import type {
  ToastApi,
  ToastOptions,
  ToastPosition,
  ToastProviderProps,
  ToastStatus,
} from "./types";

export { ToastProvider, toast, useToast };
export type {
  ToastApi,
  ToastOptions,
  ToastPosition,
  ToastProviderProps,
  ToastStatus,
};

export default ToastProvider;
