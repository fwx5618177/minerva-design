// Text editing icons of minerva-design/icons (24×24 grid, 2px stroke).
import type { IconDefinition } from "../types";
import { palette } from "./palette";

/** Bold text */
export const boldIcon: IconDefinition = {
  name: "bold",
  category: "text",
  tags: ["strong", "emphasis", "format", "heavy"],
  paths: ["M7 4h6a4 4 0 0 1 0 8H7z", "M7 12h7a4 4 0 0 1 0 8H7z"],
};

/** Italic text */
export const italicIcon: IconDefinition = {
  name: "italic",
  category: "text",
  tags: ["slant", "emphasis", "format", "oblique"],
  paths: ["M14 4h6", "M4 20h6", "M15 4L9 20"],
};

/** Underlined text */
export const underlineIcon: IconDefinition = {
  name: "underline",
  category: "text",
  tags: ["emphasis", "format", "underscore"],
  paths: ["M6 4v7a6 6 0 0 0 12 0V4", "M4 21h16"],
  colors: [undefined, palette.blue],
};

/** Strikethrough text */
export const strikethroughIcon: IconDefinition = {
  name: "strikethrough",
  category: "text",
  tags: ["cross-out", "deleted", "format", "strike"],
  paths: [
    "M16 7.5C16 5.5 14.2 4 12 4S8 5.5 8 7.5c0 2 1.8 2.8 4 3.5",
    "M12 12.5c2.2.7 4 1.5 4 3.5 0 2-1.8 3.5-4 3.5s-4-1.5-4-3.5",
    "M4 12h16",
  ],
  colors: [undefined, undefined, palette.red],
};

/** Align text to the left */
export const alignLeftIcon: IconDefinition = {
  name: "align-left",
  category: "text",
  tags: ["left", "paragraph", "text-align", "flush"],
  paths: ["M4 6h16", "M4 12h10", "M4 18h14"],
};

/** Align text to the center */
export const alignCenterIcon: IconDefinition = {
  name: "align-center",
  category: "text",
  tags: ["center", "middle", "paragraph", "text-align"],
  paths: ["M4 6h16", "M7 12h10", "M5.5 18h13"],
};

/** Align text to the right */
export const alignRightIcon: IconDefinition = {
  name: "align-right",
  category: "text",
  tags: ["right", "paragraph", "text-align", "flush-end"],
  paths: ["M4 6h16", "M10 12h10", "M6 18h14"],
};

/** Justify text to both edges */
export const alignJustifyIcon: IconDefinition = {
  name: "align-justify",
  category: "text",
  tags: ["justify", "block", "paragraph", "text-align"],
  paths: ["M4 6h16", "M4 12h16", "M4 18h16"],
};

/** Bulleted list */
export const listBulletsIcon: IconDefinition = {
  name: "list-bullets",
  category: "text",
  tags: ["unordered", "bullets", "list", "items"],
  paths: [
    "M9 6h12",
    "M9 12h12",
    "M9 18h12",
    "M3 6a1 1 0 1 0 2 0a1 1 0 1 0-2 0",
    "M3 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0",
    "M3 18a1 1 0 1 0 2 0a1 1 0 1 0-2 0",
  ],
};

/** Numbered list */
export const listOrderedIcon: IconDefinition = {
  name: "list-ordered",
  category: "text",
  tags: ["numbered", "ordered", "list", "steps"],
  paths: [
    "M3.5 5.2L5 4.5v3",
    "M3.5 11.2c0-.9 3.3-.9 3.3 0 0 .6-3.3 1.3-3.3 2.3h3.3",
    "M3.5 16.4h3.2l-1.6 2.2a1.4 1.4 0 1 1-1.4 1.8",
    "M10 6h11",
    "M10 12h11",
    "M10 18h11",
  ],
};

/** Heading text */
export const headingIcon: IconDefinition = {
  name: "heading",
  category: "text",
  tags: ["title", "header", "h1", "format"],
  paths: ["M5 5v14", "M19 5v14", "M5 12h14"],
};

/** Block quote */
export const quoteIcon: IconDefinition = {
  name: "quote",
  category: "text",
  tags: ["blockquote", "citation", "quotation", "format"],
  paths: [
    "M3 13a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
    "M9 13c0 3-1.5 5-4 6",
    "M13 13a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
    "M19 13c0 3-1.5 5-4 6",
  ],
};

/** Curly braces around code */
export const bracesIcon: IconDefinition = {
  name: "braces",
  category: "text",
  tags: ["code", "curly", "json", "object"],
  paths: [
    "M8 3C6 3 6 4 6 6V10C6 11 5 12 3 12C5 12 6 13 6 14V18C6 19 6 20 8 20",
    "M16 3C18 3 18 4 18 6V10C18 11 19 12 21 12C19 12 18 13 18 14V18C18 19 18 20 16 20",
  ],
};

/** Paragraph mark */
export const pilcrowIcon: IconDefinition = {
  name: "pilcrow",
  category: "text",
  tags: ["paragraph", "section", "symbol", "mark"],
  paths: ["M18 4v16", "M14 20V4", "M14 4h-4a4 4 0 0 0 0 8h4"],
};

/** Increase indentation */
export const indentIcon: IconDefinition = {
  name: "indent",
  category: "text",
  tags: ["increase", "tab", "indentation", "format"],
  paths: ["M10 6h11", "M10 12h11", "M10 18h11", "M4 9.5l2.5 2.5L4 14.5"],
};

/** Decrease indentation */
export const outdentIcon: IconDefinition = {
  name: "outdent",
  category: "text",
  tags: ["decrease", "unindent", "tab", "format"],
  paths: ["M10 6h11", "M10 12h11", "M10 18h11", "M6.5 9.5L4 12l2.5 2.5"],
};

/** Text cursor */
export const textCursorIcon: IconDefinition = {
  name: "text-cursor",
  category: "text",
  tags: ["caret", "insertion", "typing", "edit"],
  paths: ["M9 4h6", "M9 20h6", "M12 4v16"],
};

/** Highlighter marker */
export const highlighterIcon: IconDefinition = {
  name: "highlighter",
  category: "text",
  tags: ["marker", "mark", "emphasis", "highlight"],
  paths: ["M15 4l5 5-9 9-5-5z", "M3 21h18"],
  colors: [palette.yellow, undefined],
};

/** Letter case conversion */
export const letterCaseIcon: IconDefinition = {
  name: "letter-case",
  category: "text",
  tags: ["case", "uppercase", "lowercase", "capitalize"],
  paths: [
    "M2 19L7 6l5 13",
    "M4 14h6",
    "M14 15.5a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
    "M20 9.5v9",
  ],
};

/** Subscript text */
export const subscriptIcon: IconDefinition = {
  name: "subscript",
  category: "text",
  tags: ["sub", "chemistry", "formula", "lower"],
  paths: ["M4 6l7 8", "M11 6l-7 8", "M15 16a2 2 0 0 1 4 0c0 1.5-4 2.5-4 4h4"],
};

/** Superscript text */
export const superscriptIcon: IconDefinition = {
  name: "superscript",
  category: "text",
  tags: ["sup", "exponent", "power", "upper"],
  paths: ["M3 13l6 6", "M9 13l-6 6", "M15 6a2 2 0 0 1 4 0c0 1.5-4 2.5-4 4h4"],
};

/** Spell check */
export const spellCheckIcon: IconDefinition = {
  name: "spell-check",
  category: "text",
  tags: ["spelling", "grammar", "proofread", "typo"],
  paths: [
    "M2 14l3-8.5L8 14",
    "M3.6 11h2.8",
    "M13 11l2.5 2.5L21 8",
    "M3 19c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0",
  ],
  colors: [undefined, undefined, palette.green, palette.red],
};

/** Wrap text onto the next line */
export const textWrapIcon: IconDefinition = {
  name: "text-wrap",
  category: "text",
  tags: ["wrap", "newline", "overflow", "break"],
  paths: ["M3 6h18", "M3 12h15a3 3 0 0 1 0 6H8", "M11 15l-3 3 3 3"],
};

/** Font size */
export const fontSizeIcon: IconDefinition = {
  name: "font-size",
  category: "text",
  tags: ["size", "text", "scale", "type"],
  paths: [
    "M2 20l3.5-9 3.5 9",
    "M4 16h4",
    "M12 20l4.5-13 4.5 13",
    "M14.2 15h4.6",
  ],
};

/** Line height and spacing */
export const lineHeightIcon: IconDefinition = {
  name: "line-height",
  category: "text",
  tags: ["spacing", "leading", "vertical", "text"],
  paths: [
    "M9 6h12",
    "M9 12h12",
    "M9 18h12",
    "M4 4v16",
    "M2.5 6.5L4 4l1.5 2.5",
    "M2.5 17.5L4 20l1.5-2.5",
  ],
};

/** Checklist */
export const listChecksIcon: IconDefinition = {
  name: "list-checks",
  category: "text",
  tags: ["checklist", "todo", "tasks", "done"],
  paths: [
    "M3 6l2 2 4-4",
    "M3 10h4v4H3z",
    "M3 16h4v4H3z",
    "M12 6h9",
    "M12 12h9",
    "M12 18h9",
  ],
  colors: [
    palette.green,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ],
};

/** To-do list: a ticked box and an open box, with lines */
export const listTodoIcon: IconDefinition = {
  name: "list-todo",
  category: "text",
  tags: ["checklist", "todo", "tasks", "progress"],
  paths: [
    "M9 8v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3",
    "M5 6.5l1.5 1.5 4-4.5",
    "M4 14h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Z",
    "M14 5.5h7",
    "M14 9h4",
    "M14 15.5h7",
    "M14 19h4",
  ],
  colors: [
    undefined,
    palette.green,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ],
};

/** Select text */
export const textSelectIcon: IconDefinition = {
  name: "text-select",
  category: "text",
  tags: ["selection", "highlight", "range", "cursor"],
  paths: [
    "M3 8V3h5",
    "M16 3h5v5",
    "M21 16v5h-5",
    "M8 21H3v-5",
    "M8 10h8",
    "M8 14h5",
  ],
};

/** Clear text formatting */
export const clearFormatIcon: IconDefinition = {
  name: "clear-format",
  category: "text",
  tags: ["remove", "reset", "plain", "eraser"],
  paths: ["M3 5h9", "M7.5 5v14", "M15 13l6 6", "M21 13l-6 6"],
};

/** Text truncated with ellipsis */
export const textEllipsisIcon: IconDefinition = {
  name: "text-ellipsis",
  category: "text",
  tags: ["overflow", "truncate", "more", "dots"],
  paths: [
    "M3 6h18",
    "M3 12h9",
    "M15 12h.01",
    "M18 12h.01",
    "M21 12h.01",
    "M3 18h12",
  ],
};

/** Find and replace text */
export const textReplaceIcon: IconDefinition = {
  name: "text-replace",
  category: "text",
  tags: ["find", "swap", "substitute", "edit"],
  paths: ["M4 8h13", "M14 5l3 3-3 3", "M20 16H7", "M10 13l-3 3 3 3"],
};

/** Letter spacing */
export const letterSpacingIcon: IconDefinition = {
  name: "letter-spacing",
  category: "text",
  tags: ["tracking", "kerning", "spacing", "character"],
  paths: [
    "M2 14l3.5-8 3.5 8",
    "M3.4 11.5h4.2",
    "M14 14l3.5-8 3.5 8",
    "M15.4 11.5h4.2",
    "M5 20h14",
    "M8 18l-3 2 3 2",
    "M16 18l3 2-3 2",
  ],
};
