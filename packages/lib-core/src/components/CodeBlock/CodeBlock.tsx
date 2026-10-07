import { useEffect, useRef, useState, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import useI18n from "../../hooks/useI18n";
import IconButton from "../IconButton";
import { IconCheck, IconCopy, IconX } from "../../internal/icons";
import type { CodeBlockProps } from "./types";
import styles from "./codeBlock.module.scss";

/** How long the "Copied" / "Copy failed" feedback stays visible (ms). */
const COPY_FEEDBACK_MS = 2000;

type CopyStatus = "idle" | "copied" | "failed";

/**
 * CodeBlock: a read-only block of preformatted text (logs, payloads, config).
 * It is a named, keyboard-focusable region so its overflow can be scrolled
 * without a mouse (WCAG 2.1.1, axe scrollable-region-focusable).
 *
 * With `copyable`, the region is wrapped in a positioned <div> holding a copy
 * button (top-right) and a visually hidden polite live region announcing the
 * result. The wrapper then receives className, style and native attributes;
 * the region attributes (`aria-label`, `aria-labelledby`, `aria-describedby`,
 * `tabIndex`) and `ref` stay on the <pre>.
 */
export const CodeBlock = ({
  children,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  wrap = true,
  maxHeight = "24rem",
  tabIndex = 0,
  copyable = false,
  className,
  style,
  ref,
  ...rest
}: CodeBlockProps) => {
  const { t } = useI18n();
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      clearTimeout(timerRef.current);
    };
  }, []);

  const showStatus = (next: CopyStatus) => {
    if (!mountedRef.current) return;
    clearTimeout(timerRef.current);
    setStatus(next);
    timerRef.current = setTimeout(() => setStatus("idle"), COPY_FEEDBACK_MS);
  };

  const copy = async () => {
    const clipboard =
      typeof navigator === "undefined" ? undefined : navigator.clipboard;
    if (typeof clipboard?.writeText !== "function") {
      showStatus("failed");
      return;
    }
    try {
      await clipboard.writeText(children);
      showStatus("copied");
    } catch {
      showStatus("failed");
    }
  };

  const regionProps = {
    ref,
    role: "region",
    tabIndex,
    "aria-label":
      ariaLabel ??
      (ariaLabelledBy !== undefined ? undefined : t("codeBlock.label")),
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    "data-wrap": String(wrap),
  } as const;

  if (!copyable) {
    return (
      <pre
        {...regionProps}
        {...rest}
        className={cn(styles.codeBlock, className)}
        style={{ maxHeight, ...style }}
      >
        <code>{children}</code>
      </pre>
    );
  }

  const statusText =
    status === "copied"
      ? t("codeBlock.copied")
      : status === "failed"
        ? t("codeBlock.copyFailed")
        : "";

  return (
    <div
      {...(rest as HTMLAttributes<HTMLDivElement>)}
      className={cn(styles.root, className)}
      style={{ maxHeight, ...style }}
    >
      <pre {...regionProps} className={cn(styles.codeBlock, styles.copyable)}>
        <code>{children}</code>
      </pre>
      <div className={styles.actions}>
        <IconButton
          type="button"
          label={statusText || t("codeBlock.copy")}
          size="small"
          shape="square"
          color={
            status === "failed"
              ? "danger"
              : status === "copied"
                ? "success"
                : "neutral"
          }
          icon={
            status === "copied" ? (
              <IconCheck size={16} />
            ) : status === "failed" ? (
              <IconX size={16} />
            ) : (
              <IconCopy size={16} />
            )
          }
          onClick={() => {
            void copy();
          }}
        />
      </div>
      <span className={styles.visuallyHidden} aria-live="polite">
        {statusText}
      </span>
    </div>
  );
};

export default CodeBlock;
