import React from "react";
import { createRoot } from "react-dom/client";
import type {
  MessageProps,
  MessageOptions,
  MessageType,
  MessagePlacement,
  MessageInstance,
} from "./types";
import Message from "./Message";
import styles from "./message.module.scss";

// 为每个位置维护独立的消息队列
const messageQueues: Record<MessagePlacement, MessageInstance[]> = {
  top: [],
  topLeft: [],
  topRight: [],
  bottom: [],
  bottomLeft: [],
  bottomRight: [],
};

let messageKey = 0;

// 获取或创建位置容器
const getPlacementContainer = (placement: MessagePlacement) => {
  const containerId = `message-container-${placement}`;
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement("div");
    container.id = containerId;
    container.className = `${styles.messageContainer} ${styles[placement]}`;

    // 预设容器位置，避免二次移动
    if (placement.includes("top")) {
      container.style.top = "20px";
    } else {
      container.style.bottom = "20px";
    }

    if (placement.includes("Left")) {
      container.style.left = "24px";
    } else if (placement.includes("Right")) {
      container.style.right = "24px";
    } else {
      container.style.left = "50%";
      container.style.transform = "translateX(-50%)";
      // 固定宽度以避免抖动
      container.style.width = "384px";
    }

    document.body.appendChild(container);
  }

  return container;
};

const removeMessage = (id: string, placement: MessagePlacement) => {
  const queue = messageQueues[placement];
  const index = queue.findIndex((instance) => instance.id === id);

  if (index > -1) {
    const instance = queue[index];
    instance.root.unmount();
    queue.splice(index, 1);

    // 如果队列为空，移除容器
    if (queue.length === 0) {
      const container = document.getElementById(
        `message-container-${placement}`,
      );
      if (container) {
        document.body.removeChild(container);
      }
    }
  }
};

const addMessage = (props: MessageOptions) => {
  const id = props.id || `message-${messageKey++}`;
  const placement = props.placement || "topRight";
  const container = getPlacementContainer(placement);

  // 创建消息元素
  const messageElement = document.createElement("div");
  messageElement.className = styles.messageWrapper;
  container.appendChild(messageElement);

  const root = createRoot(messageElement);

  // Guard so the user's onClose runs at most once per message, whichever
  // path closes it (timer, close button, destroy).
  let closed = false;
  const messageProps: MessageProps = {
    ...props,
    id,
    placement,
    duration: props.duration ?? 3000,
    onClose: (msgId: string) => {
      if (closed) return;
      closed = true;
      props.onClose?.(msgId);
      removeMessage(msgId, placement);
    },
  };

  // 添加到对应位置的队列
  messageQueues[placement].push({ id, props: messageProps, root });

  // 渲染消息
  root.render(<Message {...messageProps} />);

  return id;
};

const isMessageOptions = (value: unknown): value is MessageOptions =>
  typeof value === "object" &&
  value !== null &&
  !React.isValidElement(value) &&
  "content" in value;

const createMessageMethod =
  (type: MessageType) =>
  (content: React.ReactNode | MessageOptions): string => {
    const props: MessageOptions = isMessageOptions(content)
      ? { ...content, type }
      : { content, type };
    return addMessage(props);
  };

export const message = {
  success: createMessageMethod("success"),
  error: createMessageMethod("error"),
  info: createMessageMethod("info"),
  warning: createMessageMethod("warning"),
  loading: createMessageMethod("loading"),
  destroy: (id?: string) => {
    // Close through each message's stored onClose so user callbacks (and
    // useMessage promises) fire; that handler also removes the message.
    const closeInstance = (
      instance: MessageInstance,
      placement: MessagePlacement,
    ) => {
      if (instance.props.onClose) {
        instance.props.onClose(instance.id);
      } else {
        removeMessage(instance.id, placement);
      }
    };

    (Object.keys(messageQueues) as MessagePlacement[]).forEach((placement) => {
      // Snapshot: closing mutates the queue
      [...messageQueues[placement]]
        .filter((instance) => !id || instance.id === id)
        .forEach((instance) => closeInstance(instance, placement));
    });
  },
  update: (id: string, props: Partial<MessageProps>) => {
    // 在所有位置查找并更新指定消息
    Object.values(messageQueues).forEach((queue) => {
      const instance = queue.find((msg) => msg.id === id);
      if (instance) {
        // The stored onClose already removes the message and calls the
        // original callback; keep it and chain any new callback before it.
        const previousOnClose = instance.props.onClose;
        let closed = false;
        const updatedProps: MessageProps = {
          ...instance.props,
          ...props,
          id,
          onClose: (msgId: string) => {
            if (closed) return;
            closed = true;
            props.onClose?.(msgId);
            previousOnClose?.(msgId);
          },
        };
        instance.props = updatedProps;
        instance.root.render(<Message {...updatedProps} />);
        updatedProps.onUpdate?.(id, updatedProps);
      }
    });
  },
};

export default message;
