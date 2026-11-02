// Contents of the CodeBlock <code>: highlighted tokens and / or numbered
// lines, built as vnodes (never HTML strings: the code is user content). The
// text content stays the source text (line numbers are generated content).
import {
  Fragment,
  h,
  type FunctionalComponent,
  type VNode,
  type VNodeChild,
} from "vue";
import {
  highlightCode,
  splitHighlightLines,
  type HighlightToken,
} from "@minerva/core";
import styles from "@react-styles/components/CodeBlock/codeBlock.module.scss";
import { hooks } from "../../internal/hooks";

const tokens = (list: readonly HighlightToken[]): VNodeChild[] =>
  list.map(({ type, text }) =>
    type ? h("span", { class: styles[`token-${type}`] }, text) : text,
  );

export const CodeContent: FunctionalComponent<{
  text: string;
  /** Highlighted language (undefined: plain text) */
  language?: string;
  lineNumbers?: boolean;
}> = ({ text, language, lineNumbers }) => {
  const list = language
    ? highlightCode(text, language)
    : [{ type: null, text }];
  if (!lineNumbers) return tokens(list);
  const lines = splitHighlightLines(list);
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
        ...tokens(line),
      ]),
      i < lines.length - 1 || trailingBreak ? "\n" : null,
    ]),
  );
};
CodeContent.props = ["text", "language", "lineNumbers"];

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
