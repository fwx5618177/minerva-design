import {
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type MouseEvent,
} from "react";
import {
  CODE_MARK_COLORS,
  applyCodeMarks,
  codeLanguageLabel,
  codeMarkBackground,
  detectCodeLanguage,
  highlightCode,
  splitCodeMarkLines,
  type CodeMark,
  type CodeMarkRun,
  type HighlightToken,
} from "@minerva/core";
import { clickedCodeMark } from "@minerva/dom";
import { cn } from "../../utils/cn";
import useI18n from "../../hooks/useI18n";
import IconButton from "../IconButton";
import { IconCheck, IconCopy, IconX } from "../../internal/icons";
import type { CodeBlockProps } from "./types";
import { hooks } from "../../internal/stylingHooks";
import styles from "./codeBlock.module.scss";

/** How long the "Copied" / "Copy failed" feedback stays visible (ms). */
const COPY_FEEDBACK_MS = 2000;

type CopyStatus = "idle" | "copied" | "failed";

const renderTokens = (tokens: readonly HighlightToken[]) =>
  tokens.map(({ type, text }, i) =>
    type ? (
      <span key={i} className={styles[`token-${type}`]}>
        {text}
      </span>
    ) : (
      text
    ),
  );

/** A theme color name of a mark (`data-mark-color`), else undefined */
const markScheme = (color: string | undefined) => {
  const value = color?.trim();
  return value && (CODE_MARK_COLORS as readonly string[]).includes(value)
    ? value
    : undefined;
};

const renderRuns = (runs: readonly CodeMarkRun[], clickable: boolean) =>
  runs.map(({ mark, index, tokens }, i) => {
    if (!mark) return <Fragment key={i}>{renderTokens(tokens)}</Fragment>;
    const background = codeMarkBackground(mark.color);
    return (
      <mark
        key={i}
        className={cn(
          styles.mark,
          clickable && styles.markClickable,
          mark.className,
        )}
        data-mark-id={mark.id}
        data-mark-index={index}
        data-mark-color={markScheme(mark.color)}
        title={mark.title}
        style={
          background
            ? ({ "--code-mark-bg": background } as CSSProperties)
            : undefined
        }
        {...hooks("code-block", "code-mark")}
      >
        {renderTokens(tokens)}
      </mark>
    );
  });

/**
 * Contents of the <code>: the text, its highlighted tokens (with a
 * language), its marks and / or its numbered lines. The text content stays
 * the source text exactly (line numbers are generated content).
 */
function codeContent(
  text: string,
  language: string | undefined,
  lineNumbers: boolean,
  marks: readonly CodeMark[] | undefined,
  clickable: boolean,
) {
  const marked = !!marks?.length;
  if (!language && !lineNumbers && !marked) return text;
  const tokens = language
    ? highlightCode(text, language)
    : [{ type: null, text }];
  if (!lineNumbers && !marked) return renderTokens(tokens);
  const runs = applyCodeMarks(tokens, marks);
  if (!lineNumbers) return renderRuns(runs, clickable);
  const lines = splitCodeMarkLines(runs);
  const trailingBreak = text.endsWith("\n");
  return lines.map((line, i) => (
    <Fragment key={i}>
      <span className={styles.line}>
        <span
          className={styles.lineNumber}
          aria-hidden="true"
          data-line={i + 1}
          {...hooks("code-block", "line-number")}
        />
        {renderRuns(line, clickable)}
      </span>
      {i < lines.length - 1 || trailingBreak ? "\n" : null}
    </Fragment>
  ));
}

/**
 * CodeBlock: a read-only block of preformatted text (logs, payloads, config).
 * It is a named, keyboard-focusable region so its overflow can be scrolled
 * without a mouse (WCAG 2.1.1, axe scrollable-region-focusable).
 *
 * With `copyable` (or `showLanguage`), the region is wrapped in a positioned
 * <div> holding a copy button (top-right), a visually hidden polite live
 * region announcing the result and / or the language label. The wrapper then
 * receives className, style and native attributes; the region attributes
 * (`aria-label`, `aria-labelledby`, `aria-describedby`, `tabIndex`) and `ref`
 * stay on the <pre>.
 *
 * With `language`, the syntax is highlighted (`highlightCode` of
 * @minerva/core) into colored <span>s (`--code-token-<type>-color`); the
 * text content and the copied text stay the source text. `language="auto"`
 * detects it from the text (`detectCodeLanguage`, memoized per text): the
 * class, `data-language` and the label then show the detected language.
 *
 * `marks` wraps character ranges in <mark>s over the highlighting
 * (`applyCodeMarks` of @minerva/core: tokens are cut at the mark
 * boundaries; where marks overlap the later one wins).
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
  onCopied,
  language,
  highlight = true,
  showLineNumbers = false,
  showLanguage = false,
  marks,
  onMarkClick,
  className,
  style,
  ref,
  ...rest
}: CodeBlockProps) => {
  const { t } = useI18n();
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const mountedRef = useRef(true);
  const requested = language?.trim() || undefined;
  const auto = requested?.toLowerCase() === "auto";
  const detected = useMemo(
    () => (auto ? detectCodeLanguage(children) : undefined),
    [auto, children],
  );
  const lang = auto ? detected : requested;
  const clickable = !!onMarkClick;
  const content = useMemo(
    () =>
      codeContent(
        children,
        highlight ? lang : undefined,
        showLineNumbers,
        marks,
        clickable,
      ),
    [children, highlight, lang, showLineNumbers, marks, clickable],
  );
  const lineDigits = showLineNumbers
    ? String(String(children).replace(/\n$/, "").split("\n").length).length
    : undefined;

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
    } catch {
      showStatus("failed");
      return;
    }
    showStatus("copied");
    onCopied?.(children);
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

  const markClick = onMarkClick
    ? (event: MouseEvent<HTMLElement>) => {
        const mark = clickedCodeMark(event.target, event.currentTarget, marks);
        if (mark) onMarkClick(mark, event);
      }
    : undefined;

  const codeElement = (
    // Marks are not focusable (no keyboard counterpart): the click is a
    // pointer shortcut, documented on onMarkClick.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <code
      className={lang ? `language-${lang}` : undefined}
      data-language={lang}
      style={
        lineDigits
          ? ({ "--code-line-digits": Math.max(lineDigits, 2) } as CSSProperties)
          : undefined
      }
      onClick={markClick}
      {...hooks("code-block", "code")}
    >
      {content}
    </code>
  );
  const label = showLanguage && lang ? codeLanguageLabel(lang) : "";

  if (!copyable && !label) {
    return (
      <pre
        {...regionProps}
        {...rest}
        className={cn(styles.codeBlock, className)}
        style={{ maxHeight, ...style }}
        {...hooks("code-block", "region")}
      >
        {codeElement}
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
      {...hooks("code-block", "root")}
    >
      <pre
        {...regionProps}
        className={cn(
          styles.codeBlock,
          copyable && styles.copyable,
          label && styles.labeled,
        )}
        {...hooks("code-block", "region")}
      >
        {codeElement}
      </pre>
      <div className={styles.actions}>
        {label ? (
          <span
            className={styles.language}
            aria-hidden="true"
            {...hooks("code-block", "language")}
          >
            {label}
          </span>
        ) : null}
        {copyable ? (
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
        ) : null}
      </div>
      {copyable ? (
        <span className={styles.visuallyHidden} aria-live="polite">
          {statusText}
        </span>
      ) : null}
    </div>
  );
};

export default CodeBlock;
