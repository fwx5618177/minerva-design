import { cn } from "../../utils/cn";
import useI18n from "../../hooks/useI18n";
import type { CodeBlockProps } from "./types";
import styles from "./codeBlock.module.scss";

/**
 * CodeBlock: a read-only block of preformatted text (logs, payloads, config).
 * It is a named, keyboard-focusable region so its overflow can be scrolled
 * without a mouse (WCAG 2.1.1, axe scrollable-region-focusable).
 */
export const CodeBlock = ({
  children,
  ariaLabel,
  wrap = true,
  maxHeight = "24rem",
  tabIndex = 0,
  className,
  style,
  ref,
  ...rest
}: CodeBlockProps) => {
  const { t } = useI18n();
  const named =
    rest["aria-label"] !== undefined || rest["aria-labelledby"] !== undefined;
  return (
    <pre
      ref={ref}
      role="region"
      tabIndex={tabIndex}
      aria-label={ariaLabel ?? (named ? undefined : t("codeBlock.label"))}
      data-wrap={String(wrap)}
      {...rest}
      className={cn(styles.codeBlock, "ui-code-block", className)}
      style={{ maxHeight, ...style }}
    >
      <code>{children}</code>
    </pre>
  );
};

export default CodeBlock;
