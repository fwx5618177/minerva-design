// Contents of the CodeBlock <code>: highlighted tokens, marks and / or
// numbered lines, built as vnodes (never HTML strings: the code is user
// content). The text content stays the source text (line numbers are
// generated content).
import {
  Fragment,
  h,
  type FunctionalComponent,
  type VNode,
  type VNodeChild,
} from "vue";
import {
  CODE_MARK_COLORS,
  applyCodeMarks,
  codeMarkBackground,
  highlightCode,
  splitCodeMarkLines,
  type CodeMark,
  type CodeMarkRun,
  type HighlightToken,
} from "@minerva/core";
import styles from "@react-styles/components/CodeBlock/codeBlock.module.scss";
import { hooks } from "../../internal/hooks";

const tokens = (list: readonly HighlightToken[]): VNodeChild[] =>
  list.map(({ type, text }) =>
    type ? h("span", { class: styles[`token-${type}`] }, text) : text,
  );

const markScheme = (color: string | undefined) => {
  const value = color?.trim();
  return value && (CODE_MARK_COLORS as readonly string[]).includes(value)
    ? value
    : undefined;
};

const runs = (list: readonly CodeMarkRun[], clickable: boolean): VNodeChild[] =>
  list.map(({ mark, index, tokens: runTokens }) => {
    if (!mark) return tokens(runTokens);
    const background = codeMarkBackground(mark.color);
    return h(
      "mark",
      {
        class: [styles.mark, clickable && styles.markClickable, mark.className],
        "data-mark-id": mark.id,
        "data-mark-index": index,
        "data-mark-color": markScheme(mark.color),
        title: mark.title,
        style: background ? { "--code-mark-bg": background } : undefined,
        ...hooks("code-block", "code-mark"),
      },
      tokens(runTokens),
    );
  });

export const CodeContent: FunctionalComponent<{
  text: string;
  /** Highlighted language (undefined: plain text) */
  language?: string;
  lineNumbers?: boolean;
  /** Character ranges wrapped in <mark>s */
  marks?: readonly CodeMark[];
  /** Marks have a click affordance (a `mark-click` listener) */
  clickable?: boolean;
}> = ({ text, language, lineNumbers, marks, clickable = false }) => {
  const list = language
    ? highlightCode(text, language)
    : [{ type: null, text }];
  const marked = !!marks?.length;
  if (!lineNumbers && !marked) return tokens(list);
  const marksRuns = applyCodeMarks(list, marks);
  if (!lineNumbers) return runs(marksRuns, clickable);
  const lines = splitCodeMarkLines(marksRuns);
  const trailingBreak = text.endsWith("\n");
  return lines.map((line, i) =>
    h(Fragment, { key: i }, [
      h("span", { class: styles.line }, [
        h("span", {
          class: styles.lineNumber,
          "aria-hidden": "true",
          "data-line": i + 1,
          ...hooks("code-block", "line-number"),
        }),
        ...runs(line, clickable),
      ]),
      i < lines.length - 1 || trailingBreak ? "\n" : null,
    ]),
  );
};
CodeContent.props = ["text", "language", "lineNumbers", "marks", "clickable"];

/** Text of slot vnodes (text nodes and nested children). */
export function vnodeText(nodes: readonly VNode[] | undefined): string {
  let text = "";
  for (const node of nodes ?? []) {
    if (typeof node.children === "string") text += node.children;
    else if (Array.isArray(node.children))
      text += vnodeText(node.children as VNode[]);
  }
  return text;
}
