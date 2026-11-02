// Syntax highlighting colors of the code blocks: `--code-token-<type>-color`
// for every token type of `highlightCode` (../highlight). GitHub-like
// palettes: the light values are declared with the default theme (every
// palette's light mode), the dark values for `[data-theme=dark]` (every
// palette's dark mode; `resolveTokens({ mode: "dark" })` for React Native and
// the mini-programs). Both keep a contrast of at least 4.5:1 on the code
// block background (`--control-color`) of every palette (tokens test).
import type { HighlightTokenType } from "../highlight/types";
import { ref, type TokenBlock, type TokenValue } from "./expr";

type CodeTokens = Record<`code-token-${HighlightTokenType}-color`, TokenValue>;

const text = ref("text-color");

/** Light mode syntax colors (GitHub light). */
export const codeTokensLight = {
  "code-token-comment-color": "#59636e",
  "code-token-keyword-color": "#b62324",
  "code-token-string-color": "#0a3069",
  "code-token-number-color": "#0550ae",
  "code-token-boolean-color": "#0550ae",
  "code-token-null-color": "#0550ae",
  "code-token-property-color": "#0550ae",
  "code-token-function-color": "#6639ba",
  "code-token-tag-color": "#116329",
  "code-token-attr-name-color": "#0550ae",
  "code-token-attr-value-color": "#0a3069",
  "code-token-punctuation-color": text,
  "code-token-operator-color": "#b62324",
  "code-token-regex-color": "#116329",
  "code-token-variable-color": "#953800",
  "code-token-builtin-color": "#953800",
  "code-token-inserted-color": "#116329",
  "code-token-deleted-color": "#82071e",
  "code-token-heading-color": "#0550ae",
} as const satisfies CodeTokens & TokenBlock;

/** Dark mode syntax colors (GitHub dark). */
export const codeTokensDark = {
  "code-token-comment-color": "#9ea6b0",
  "code-token-keyword-color": "#ff7b72",
  "code-token-string-color": "#a5d6ff",
  "code-token-number-color": "#79c0ff",
  "code-token-boolean-color": "#79c0ff",
  "code-token-null-color": "#79c0ff",
  "code-token-property-color": "#79c0ff",
  "code-token-function-color": "#d2a8ff",
  "code-token-tag-color": "#7ee787",
  "code-token-attr-name-color": "#79c0ff",
  "code-token-attr-value-color": "#a5d6ff",
  "code-token-punctuation-color": text,
  "code-token-operator-color": "#ff7b72",
  "code-token-regex-color": "#7ee787",
  "code-token-variable-color": "#ffa657",
  "code-token-builtin-color": "#ffa657",
  "code-token-inserted-color": "#7ee787",
  "code-token-deleted-color": "#ffa198",
  "code-token-heading-color": "#79c0ff",
} as const satisfies CodeTokens & TokenBlock;
