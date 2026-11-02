// Vocabulary of the code highlighter, kept apart from the tokenizer so the
// theme tokens (../tokens/code.ts) can list the token types without loading
// the grammars.

/**
 * Token types produced by `highlightCode`. Each one has a color token,
 * `--code-token-<type>-color` (light and dark values in `tokens.css`,
 * resolved by `resolveTokens` for React Native and the mini-programs).
 */
export const highlightTokenTypes = [
  "comment",
  "keyword",
  "string",
  "number",
  "boolean",
  "null",
  "property",
  "function",
  "tag",
  "attr-name",
  "attr-value",
  "punctuation",
  "operator",
  "regex",
  "variable",
  "builtin",
  "inserted",
  "deleted",
  "heading",
] as const;

/** Type of a highlighted token (see `highlightTokenTypes`). */
export type HighlightTokenType = (typeof highlightTokenTypes)[number];

/**
 * A run of source text. `type` is `null` for plain text. The texts of the
 * tokens returned by `highlightCode` concatenate to the input exactly.
 */
export interface HighlightToken {
  type: HighlightTokenType | null;
  text: string;
}

/** Canonical names of the languages `highlightCode` understands. */
export const supportedCodeLanguages = [
  "javascript",
  "typescript",
  "jsx",
  "tsx",
  "json",
  "css",
  "html",
  "bash",
  "python",
  "yaml",
  "sql",
  "diff",
  "markdown",
  "plain",
] as const;

/** A canonical language name (see `normalizeCodeLanguage` for the aliases). */
export type CodeLanguage = (typeof supportedCodeLanguages)[number];
