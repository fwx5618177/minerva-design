import { useMemo } from "react";
import { message } from "./MessageContainer";
import type {
  MessageOptions,
  MessagePromiseResult,
  MessageType,
} from "./types";

const showMessage = (
  type: MessageType,
  props: MessageOptions | string,
): MessagePromiseResult => {
  const config: MessageOptions =
    typeof props === "string" ? { content: props } : props;

  let resolveClosed: () => void = () => undefined;
  const closed = new Promise<void>((resolve) => {
    resolveClosed = resolve;
  });

  const messageId = message[type]({
    ...config,
    onClose: (id: string) => {
      config.onClose?.(id);
      resolveClosed();
    },
  });

  return Object.assign(closed, { messageId });
};

/**
 * Promise-based message API. Each call returns a promise that resolves when
 * the message closes, so messages can be chained:
 * `loading("Saving").then(() => success("Saved"))`.
 */
export const useMessage = () =>
  useMemo(
    () => ({
      info: (props: MessageOptions | string) => showMessage("info", props),
      success: (props: MessageOptions | string) =>
        showMessage("success", props),
      warning: (props: MessageOptions | string) =>
        showMessage("warning", props),
      error: (props: MessageOptions | string) => showMessage("error", props),
      loading: (props: MessageOptions | string) =>
        showMessage("loading", props),
      destroy: message.destroy,
      update: message.update,
    }),
    [],
  );
