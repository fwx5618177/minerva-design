export {
  highlightTokenTypes,
  supportedCodeLanguages,
  type CodeLanguage,
  type HighlightToken,
  type HighlightTokenType,
} from "./types";
export {
  codeLanguageLabel,
  highlightCode,
  normalizeCodeLanguage,
  splitHighlightLines,
} from "./highlight";
export { detectCodeLanguage } from "./detect";
export {
  CODE_MARK_COLORS,
  CODE_MARK_DEFAULT_BACKGROUND,
  CODE_MARK_TINT,
  applyCodeMarks,
  clampCodeRange,
  codeMarkBackground,
  resolveCodeMarkBackground,
  splitCodeMarkLines,
  type CodeMark,
  type CodeMarkColor,
  type CodeMarkRun,
} from "./marks";
