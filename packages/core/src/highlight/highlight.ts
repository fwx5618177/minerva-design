// A tiny, dependency-free syntax highlighter for read-only code blocks.
//
// `highlightCode(code, language)` splits the source into typed tokens whose
// texts concatenate to the input exactly; renderers turn them into colored
// spans / text nodes (never HTML strings: the code is user content).
//
// Each grammar is a list of rules tried in order at the current position: a
// sticky regular expression with a token type (or a classifier, or one type
// per capture group), or a scanner function for nested constructs (template
// literals, tags, fenced code). Characters no rule matches are plain text.
//
// Cost: rules either succeed or fail within a bounded look-ahead (strings
// and comments run to the end of the line / input instead of failing, so an
// unterminated one is consumed once), keeping the work roughly linear. Input
// longer than 200,000 characters is returned as plain text. Grammars are
// built lazily, on first use of each language.
import { detectCodeLanguage } from "./detect";
import {
  supportedCodeLanguages,
  type CodeLanguage,
  type HighlightToken,
  type HighlightTokenType,
} from "./types";

type T = HighlightTokenType | null;

/** State of one lexing pass, read by the rules. */
interface Ctx {
  code: string;
  /** Start of the current rule attempt */
  start: number;
  /** End of the current regex match (classifiers) */
  end: number;
  /** Last token that is not blank */
  prev?: HighlightToken;
  /** Only blanks since the last line break (or the start) */
  line: boolean;
  /** Innermost open bracket (`{`, `(`, `[`), "" at the top level */
  opener: string;
  /** Highlights embedded code (one level deeper) */
  sub: (code: string, language: CodeLanguage) => void;
}

type Emit = (type: T, text: string) => void;
/** Type of a match (`false`: the rule does not apply). */
type Classify = (text: string, c: Ctx) => T | false;
/** Emits tokens from `c.start`; returns the end (-1: no match). */
type Scanner = (c: Ctx, emit: Emit) => number;
type Rule =
  | Scanner
  | readonly [
      kind: T | readonly T[] | Classify,
      pattern: RegExp,
      when?: (c: Ctx) => boolean,
    ];

const MAX_LENGTH = 200_000;
const MAX_DEPTH = 4;

// Token types used repeatedly (shorter once minified).
const PUNCT = "punctuation";
const FN = "function";
const PROP = "property";
const STR = "string";
const KW = "keyword";
const VAR = "variable";
const NUM = "number";
const CMT = "comment";
const OP = "operator";
const BUILTIN = "builtin";

/** Language aliases, by canonical name (the first of each group). */
const ALIASES =
  "javascript js mjs cjs|typescript ts mts cts|json jsonc json5|css scss less|html htm xml svg vue|bash sh shell zsh console|python py|yaml yml|markdown md|diff patch|plain text txt plaintext";

/**
 * Canonical name of a language or alias (`"ts"` -> `"typescript"`,
 * `"yml"` -> `"yaml"`, `"language-js"` -> `"javascript"`); `"plain"` for
 * unknown or missing languages.
 *
 * `"auto"` stands for the language detected from `code`
 * (`detectCodeLanguage`); without `code` it is `"plain"`. `code` is ignored
 * for any other language.
 */
export function normalizeCodeLanguage(
  language?: string | null,
  code?: string,
): CodeLanguage {
  const name =
    typeof language === "string"
      ? language
          .trim()
          .toLowerCase()
          .replace(/^language-/, "")
      : "";
  if (name === "auto") {
    return typeof code === "string" ? detectCodeLanguage(code) : "plain";
  }
  for (const group of ALIASES.split("|")) {
    const names = group.split(" ");
    if (names.includes(name)) return names[0] as CodeLanguage;
  }
  return (supportedCodeLanguages as readonly string[]).includes(name)
    ? (name as CodeLanguage)
    : "plain";
}

/** Label of a language shown by the code blocks (`"json"` -> `"JSON"`). */
export const codeLanguageLabel = (language: string): string =>
  language.trim().toUpperCase();

/**
 * Splits highlighted code into lines (tokens without the line breaks). A
 * final line break does not start an extra empty line.
 */
export function splitHighlightLines(
  tokens: readonly HighlightToken[],
): HighlightToken[][] {
  const lines: HighlightToken[][] = [[]];
  for (const { type, text } of tokens) {
    text.split("\n").forEach((part, i) => {
      if (i) lines.push([]);
      if (part) lines[lines.length - 1].push({ type, text: part });
    });
  }
  if (lines.length > 1 && !lines[lines.length - 1].length) lines.pop();
  return lines;
}

/**
 * Splits `code` into highlighted tokens for `language` (any name accepted by
 * `normalizeCodeLanguage`; `"auto"` detects it from the code). The token
 * texts concatenate to `code` exactly.
 * Never throws: unknown languages, very large input (> 200,000 characters)
 * and unexpected failures give a single plain token.
 */
export function highlightCode(
  code: string,
  language?: string | null,
): HighlightToken[] {
  let text = "";
  try {
    text = typeof code === "string" ? code : String(code ?? "");
    if (!text) return [];
    const lang = normalizeCodeLanguage(language, text);
    if (lang !== "plain" && text.length <= MAX_LENGTH) {
      const out: HighlightToken[] = [];
      lex(text, lang, out, 0);
      let length = 0;
      for (const token of out) length += token.text.length;
      if (length === text.length) return out;
    }
  } catch {
    // fall through: plain text
  }
  return text ? [{ type: null, text }] : [];
}

const grammars: Partial<Record<CodeLanguage, readonly Rule[]>> = {};

function lex(
  code: string,
  lang: CodeLanguage,
  out: HighlightToken[],
  depth: number,
): void {
  const stack: string[] = [];
  const c: Ctx = {
    code,
    start: 0,
    end: 0,
    line: true,
    opener: "",
    sub: (inner, language) => lex(inner, language, out, depth + 1),
  };
  const emit: Emit = (type, text) => {
    if (!text) return;
    const last = out[out.length - 1];
    if (last && last.type === type) last.text += text;
    else out.push({ type, text });
    const solid = /\S/.test(text);
    if (solid) {
      c.prev = { type, text };
      if (type === PUNCT && text.length === 1) {
        if ("{([".includes(text)) {
          if (stack.length < 256) stack.push(text);
        } else if ("})]".includes(text)) stack.pop();
        c.opener = stack[stack.length - 1] ?? "";
      }
    }
    const nl = text.lastIndexOf("\n");
    c.line = nl < 0 ? c.line && !solid : !/\S/.test(text.slice(nl + 1));
  };
  const rules =
    depth > MAX_DEPTH || lang === "plain"
      ? undefined
      : (grammars[lang] ??= grammar(lang));
  if (!rules) return emit(null, code);
  let pos = 0;
  scan: while (pos < code.length) {
    c.start = pos;
    for (const rule of rules) {
      let end: number;
      if (typeof rule === "function") {
        end = rule(c, emit);
        if (end <= pos) continue;
      } else {
        const [kind, pattern, when] = rule;
        if (when && !when(c)) continue;
        pattern.lastIndex = pos;
        const m = pattern.exec(code);
        if (!m || !m[0]) continue;
        end = c.end = pos + m[0].length;
        if (Array.isArray(kind)) {
          (kind as readonly T[]).forEach((type, i) =>
            emit(type, m[i + 1] ?? ""),
          );
        } else {
          const type =
            typeof kind === "function" ? (kind as Classify)(m[0], c) : kind;
          if (type === false) continue;
          emit(type as T, m[0]);
        }
      }
      pos = end;
      continue scan;
    }
    emit(null, code[pos]);
    pos++;
  }
}

// ---------------------------------------------------------------- helpers

const words = (list: string) => new Set(list.split(" "));

/** The two characters after the match, past spaces and tabs. */
function after(c: Ctx): string {
  let i = c.end;
  while (c.code[i] === " " || c.code[i] === "\t") i++;
  return c.code.slice(i, i + 2);
}

const atLine = (c: Ctx) => c.line;
const afterBlank = (c: Ctx) => !c.start || /\s/.test(c.code[c.start - 1]);
const isPascal = (word: string) => /^[A-Z]/.test(word) && /[a-z]/.test(word);

/** Index of the `}` closing a `{` opened before `i` (skips strings). */
function closeBrace(s: string, i: number): number {
  for (let depth = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      if (!depth--) return i;
    } else if (ch === '"' || ch === "'" || ch === "`") {
      for (i++; i < s.length && s[i] !== ch; i++) {
        if (s[i] === "\\") i++;
        else if (s[i] === "\n" && ch !== "`") break;
      }
    }
  }
  return s.length;
}

/** Emits `{ <code> }` (`i` is after the `{`); returns the end. */
function embed(c: Ctx, emit: Emit, i: number, lang: CodeLanguage): number {
  const close = closeBrace(c.code, i);
  c.sub(c.code.slice(i, close), lang);
  emit(PUNCT, c.code.slice(close, close + 1));
  return Math.min(close + 1, c.code.length);
}

/** Whether an expression may start after `p` (regex / JSX vs division / `<`). */
const exprStart = (p?: HighlightToken) =>
  !p ||
  p.type === KW ||
  p.type === OP ||
  (p.type === PUNCT && !/[)\]}]/.test(p.text));

/** Numbers of JavaScript (`1n`), Python (`2j`), SQL: hex / binary / octal, `_` separators. */
const number =
  /(?:0[xob][\da-f_]+|(?:\d[\d_]*\.?[\d_]*|\.\d[\d_]*)(?:e[-+]?\d[\d_]*)?)[nj]?/iy;

const quoted = /(["'])(?:(?!\1)[^\\\n]|\\[\s\S])*\1?/y;

// ---------------------------------------------------------------- markup

/**
 * Tag at `at` (`<name attrs>`, `</name>`, `<name/>`); emits it and returns
 * `[end, nesting change, lower-case name]`, or undefined (nothing emitted).
 * `lang`: JSX, attribute values in `{}` are expressions.
 */
function head(
  c: Ctx,
  emit: Emit,
  at: number,
  lang?: CodeLanguage,
): [number, number, string] | undefined {
  const s = c.code;
  const open = /(<\/?)([A-Za-z][\w:.-]*|(?=>))/y;
  open.lastIndex = at;
  const m = open.exec(s);
  if (!m) return;
  emit(PUNCT, m[1]);
  emit("tag", m[2]);
  const attr = /\s+|\/?>|"[^"]*"?|'[^']*'?|[={/]|[^\s"'>/={]+/y;
  const name = m[2].toLowerCase();
  let i = at + m[0].length;
  let eq = false;
  while (i < s.length) {
    attr.lastIndex = i;
    const t = attr.exec(s)![0];
    i += t.length;
    if (t[t.length - 1] === ">") {
      emit(PUNCT, t);
      return [i, m[1] !== "<" ? -1 : t === ">" ? 1 : 0, name];
    }
    if (t === "{" && lang) {
      emit(PUNCT, t);
      i = embed(c, emit, i, lang);
      eq = false;
      continue;
    }
    const blank = !/\S/.test(t);
    emit(
      blank
        ? null
        : t === "=" || t === "/"
          ? PUNCT
          : eq || t[0] === '"' || t[0] === "'"
            ? "attr-value"
            : "attr-name",
      t,
    );
    if (!blank) eq = t === "=";
  }
  return [i, 0, name];
}

/**
 * An element at `c.start`. `lang`: JSX, the whole element with its children
 * (text, `{expressions}`, nested elements); else an HTML tag (`<script>` /
 * `<style>` contents are highlighted as JavaScript / CSS).
 */
function tag(c: Ctx, emit: Emit, lang?: CodeLanguage): number {
  const s = c.code;
  const h = head(c, emit, c.start, lang);
  if (!h) return -1;
  let [i, depth] = h;
  const name = h[2];
  if (depth < 1) return i;
  if (lang) {
    const text = /[^<{]+/y;
    while (depth > 0 && i < s.length) {
      text.lastIndex = i;
      const t = text.exec(s);
      if (t) {
        emit(null, t[0]);
        i += t[0].length;
      } else if (s[i] === "{") {
        emit(PUNCT, "{");
        i = embed(c, emit, i + 1, lang);
      } else {
        const n = head(c, emit, i, lang);
        if (n) [i, depth] = [n[0], depth + n[1]];
        else emit(null, s[i++]);
      }
    }
    return i;
  }
  if (name !== "script" && name !== "style") return i;
  const close = new RegExp(`</${name}`, "gi");
  close.lastIndex = i;
  const end = close.exec(s)?.index ?? s.length;
  const attrs = s.slice(c.start, i);
  c.sub(
    s.slice(i, end),
    name === "style"
      ? "css"
      : /\blang=["']?ts/.test(attrs)
        ? "typescript"
        : /\btype=["']?(?:application\/(?:ld\+)?json|importmap)/i.test(attrs)
          ? "json"
          : "javascript",
  );
  return end;
}

// ---------------------------------------------------------------- grammars

function grammar(lang: CodeLanguage): readonly Rule[] {
  switch (lang) {
    case "javascript":
    case "typescript":
    case "jsx":
    case "tsx":
      return js(lang);
    case "json":
      return json();
    case "css":
      return css();
    case "html":
      return html();
    case "bash":
      return bash();
    case "python":
      return python();
    case "yaml":
      return yaml();
    case "sql":
      return sql();
    case "diff":
      return diff();
    default:
      return markdown();
  }
}

function js(lang: CodeLanguage): Rule[] {
  const ts = lang === "typescript" || lang === "tsx";
  const keywords = words(
    "as async await break case catch class const continue debugger default delete do else export extends finally for from function if import in instanceof let new of return static super switch this throw try typeof var void while with yield" +
      (ts
        ? " abstract declare enum implements infer interface is keyof namespace override private protected public readonly satisfies type"
        : ""),
  );
  const globals = words(
    "console document window" +
      (ts ? " any boolean never number object string unknown" : ""),
  );
  const template: Scanner = (c, emit) => {
    const s = c.code;
    let i = c.start;
    if (s[i] !== "`") return -1;
    let from = i++;
    while (i < s.length) {
      if (s[i] === "\\") i += 2;
      else if (s[i] === "`") {
        i++;
        break;
      } else if (s[i] === "$" && s[i + 1] === "{") {
        emit(STR, s.slice(from, i));
        emit(PUNCT, "$");
        emit(PUNCT, "{");
        i = from = embed(c, emit, i + 2, lang);
      } else i++;
    }
    i = Math.min(i, s.length);
    emit(STR, s.slice(from, i));
    return i;
  };
  const rules: Rule[] = [
    [null, /\s+/y],
    [CMT, /\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$)/y],
    template,
    [STR, quoted],
    [
      "regex",
      /\/(?![*/])(?:[^/\\\n[]|\\.|\[(?:[^\]\\\n]|\\.){0,200}\]){1,500}\/[dgimsuvy]*/y,
      (c) => exprStart(c.prev),
    ],
  ];
  if (lang === "jsx" || lang === "tsx") {
    rules.push((c, emit) =>
      c.code[c.start] === "<" &&
      /[A-Za-z>]/.test(c.code[c.start + 1] ?? "") &&
      exprStart(c.prev)
        ? tag(c, emit, lang)
        : -1,
    );
  }
  rules.push(
    [FN, /@[A-Za-z_$][\w$.]*/y],
    [NUM, number],
    [
      (w, c) => {
        const p = c.prev;
        const n = after(c);
        if (p?.text === ".") return n[0] === "(" ? FN : null;
        if (
          w !== "default" &&
          c.opener === "{" &&
          ((n[0] === ":" && n[1] !== ":") || n === "?:") &&
          (!p || p.type === CMT || /^[{,;]$/.test(p.text))
        )
          return PROP;
        if (keywords.has(w)) return KW;
        if (w === "true" || w === "false") return "boolean";
        if (w === "null" || w === "undefined") return "null";
        if (n[0] === "(" || p?.text === FN) return FN;
        return globals.has(w) || isPascal(w) ? BUILTIN : null;
      },
      /[A-Za-z_$\u00a0-\uffff][\w$\u00a0-\uffff]*/y,
    ],
    [OP, /=>|[-+*%=&|^~!<>?]+|\//y],
    [PUNCT, /[{}[\]();,.:#]/y],
  );
  return rules;
}

function json(): Rule[] {
  return [
    [null, /\s+/y],
    [CMT, /\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$)/y],
    [PROP, /(["'])(?:(?!\1)[^\\\n]|\\.)*\1(?=\s*:)/y],
    [STR, quoted],
    [NUM, /[-+]?(?:0x[\da-f]+|(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)/iy],
    [
      (w, c) =>
        after(c)[0] === ":"
          ? PROP
          : w === "true" || w === "false"
            ? "boolean"
            : w === "null"
              ? "null"
              : w === "Infinity" || w === "NaN"
                ? NUM
                : null,
      /[A-Za-z_$][\w$]*/y,
    ],
    [PUNCT, /[{}[\],:]/y],
  ];
}

function css(): Rule[] {
  const inBlock = (c: Ctx) => c.opener === "{";
  return [
    [null, /\s+/y],
    [CMT, /\/\*[\s\S]*?(?:\*\/|$)|\/\/[^\n]*/y],
    [[FN, PUNCT, STR, PUNCT], /(url)(\()([^)\n]*)(\)?)/iy],
    [STR, quoted],
    [KW, /@[\w-]+|!\s*important/iy],
    [VAR, /--[\w-]+|\$[\w-]+/y],
    [NUM, /#[\da-fA-F]{3,8}(?![\w-])/y, inBlock],
    [NUM, /[-+]?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?(?:%|[a-zA-Z]+)?/y],
    ["attr-name", /[.#][\w-]+/y],
    ["attr-name", /::?[\w-]+/y, (c) => !inBlock(c) || c.prev?.text === "&"],
    [
      (_, c) => {
        const n = after(c);
        const p = c.prev;
        if (
          n[0] === ":" &&
          (c.opener === "(" ||
            (inBlock(c) && (!p || p.type === CMT || /^[{;}]$/.test(p.text))))
        )
          return PROP;
        if (n[0] === "(") return FN;
        return inBlock(c) && n[0] !== "{" ? null : "tag";
      },
      /-?[A-Za-z_][\w-]*/y,
    ],
    [PUNCT, /[{}()[\];,:]/y],
    [OP, /[>+~*=|^$&]/y],
  ];
}

function html(): Rule[] {
  return [
    [CMT, /<!--[\s\S]*?(?:-->|$)/y],
    [KW, /<[!?][^>]*>?/y],
    (c, emit) => tag(c, emit),
    [BUILTIN, /&(?:#\d+|#x[\da-f]+|[a-z][\da-z]*);/iy],
    [null, /[^<&]+/y],
  ];
}

function bash(): Rule[] {
  const keywords = words(
    "if then else elif fi for while until do done case esac in function return local export break continue declare readonly",
  );
  const variable = /\$(?:\{[^}\n]*\}?|[A-Za-z_]\w*|[\d@#?$!*-])/y;
  /** Command position: start of a line or after `|`, `&&`, `;`, `(`, `then`... */
  const command = (c: Ctx) => {
    const p = c.prev;
    if (p?.text === "\\") return false;
    return (
      c.line ||
      !p ||
      p.type === OP ||
      /^(?:[({`$]|then|do|else|elif|if|while|until|time|!)$/.test(p.text)
    );
  };
  const double: Scanner = (c, emit) => {
    const s = c.code;
    let i = c.start;
    if (s[i] !== '"') return -1;
    let from = i++;
    for (; i < s.length && s[i] !== '"'; i++) {
      if (s[i] === "\\") i++;
      else if (s[i] === "$") {
        variable.lastIndex = i;
        const m = variable.exec(s);
        if (m) {
          emit(STR, s.slice(from, i));
          emit(VAR, m[0]);
          from = i + m[0].length;
          i = from - 1;
        }
      }
    }
    i = Math.min(i + 1, s.length);
    emit(STR, s.slice(from, i));
    return i;
  };
  return [
    [null, /\s+/y],
    [CMT, /#[^\n]*/y, (c) => !c.start || /[\s;|&(]/.test(c.code[c.start - 1])],
    double,
    [STR, /'[^']*'?/y],
    [VAR, variable],
    [
      VAR,
      /[A-Za-z_]\w*(?=\+?=)/y,
      (c) =>
        command(c) ||
        /^(?:export|local|declare|readonly)$/.test(c.prev?.text ?? ""),
    ],
    [NUM, /\d+(?![\w./~@%+:,=-])/y],
    [
      (w, c) => (command(c) ? (keywords.has(w) ? KW : FN) : null),
      /[\w./~@%+:,-][\w./~@%+:,=-]*/y,
    ],
    [OP, /&&|\|\||;;|[|&;<>!]+/y],
    [PUNCT, /[()[\]{}=$`\\]/y],
  ];
}

function python(): Rule[] {
  const keywords = words(
    "and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield",
  );
  const builtins = words(
    "bool dict float int len list print range set str super tuple type self cls",
  );
  return [
    [null, /\s+/y],
    [CMT, /#[^\n]*/y],
    [STR, /[rRbBuUfF]{0,2}("""|''')[\s\S]*?(?:\1|$)/y],
    [STR, /[rRbBuUfF]{0,2}(["'])(?:(?!\1)[^\\\n]|\\[\s\S])*\1?/y],
    [FN, /@[\w.]+/y, atLine],
    [NUM, number],
    [
      (w, c) => {
        const p = c.prev?.text;
        const n = after(c);
        if (p === ".") return n[0] === "(" ? FN : null;
        if (keywords.has(w)) return KW;
        if (w === "True" || w === "False") return "boolean";
        if (w === "None") return "null";
        if (p === "def") return FN;
        if (p === "class" || builtins.has(w) || isPascal(w)) return BUILTIN;
        return n[0] === "(" ? FN : null;
      },
      /[A-Za-z_\u00a0-\uffff][\w\u00a0-\uffff]*/y,
    ],
    [OP, /:=|->|[-+*/%=<>!&|^~@]+/y],
    [PUNCT, /[()[\]{},;.:]/y],
  ];
}

function yaml(): Rule[] {
  return [
    [null, /\s+/y],
    [CMT, /#[^\n]*/y, afterBlank],
    [PUNCT, /(?:---|\.\.\.)(?=\s|$)/y, atLine],
    [
      PROP,
      /(?:"(?:[^"\\\n]|\\.)*"|'[^'\n]*'|[^\s#:,[\]{}'"!&*|>%@`-][^\n#:]{0,255})(?=:(?:\s|$))/y,
      (c) => c.line || /^[-?{,]$/.test(c.prev?.text ?? ""),
    ],
    [PUNCT, /[-?](?=\s|$)/y],
    [VAR, /[&*][\w-]+/y],
    [KW, /!!?[\w/.-]*/y],
    [OP, /[|>][-+\d]*(?=[ \t]*(?:#|\n|$))/y],
    [STR, /"(?:[^"\\]|\\[\s\S])*"?|'(?:[^']|'')*'?/y],
    [PUNCT, /[:,[\]{}]/y],
    [
      (text) => {
        const v = text.trim();
        return /^(?:true|false|yes|no|on|off)$/i.test(v)
          ? "boolean"
          : /^(?:null|~)$/i.test(v)
            ? "null"
            : /^[-+]?(?:\.inf|\.nan|0x[\da-f]+|0o[0-7]+|(?:\d[\d_]*\.?\d*|\.\d+)(?:e[-+]?\d+)?)$/i.test(
                  v,
                )
              ? NUM
              : STR;
      },
      /[^\s#,[\]{}][^\n#,[\]{}]*/y,
    ],
  ];
}

function sql(): Rule[] {
  const keywords = words(
    "select from where insert into values update set delete create alter drop table index and or not in is like between exists join left right inner outer on as order by group having limit offset union all distinct case when then else end with primary key references default asc desc",
  );
  const types = words(
    "int integer bigint decimal numeric float varchar char text boolean date timestamp json jsonb uuid",
  );
  return [
    [null, /\s+/y],
    [CMT, /--[^\n]*|\/\*[\s\S]*?(?:\*\/|$)/y],
    [STR, /'(?:[^'\\]|''|\\[\s\S])*'?/y],
    [PROP, /"(?:[^"]|"")*"?|`[^`]*`?/y],
    [VAR, /[@$][\w.]+|\?/y],
    [NUM, number],
    [
      (w, c) => {
        const lower = w.toLowerCase();
        if (lower === "true" || lower === "false") return "boolean";
        if (lower === "null") return "null";
        if (keywords.has(lower)) return KW;
        if (types.has(lower)) return BUILTIN;
        return after(c)[0] === "(" ? FN : null;
      },
      /[A-Za-z_][\w$]*/y,
    ],
    [OP, /[-+*/%=<>!|&^~]+/y],
    [PUNCT, /[(),;.[\]]/y],
  ];
}

function diff(): Rule[] {
  // Every rule starts at a line start: the last two consume a line / breaks.
  return [
    [KW, /(?:diff|index|---|\+\+\+)(?=[ \t\n]|$)[^\n]*/y],
    ["heading", /@@[^\n]*/y],
    ["inserted", /[+>][^\n]*/y],
    ["deleted", /[-<][^\n]*/y],
    [null, /[^\n]+|\n+/y],
  ];
}

function markdown(): Rule[] {
  const fence: Scanner = (c, emit) => {
    if (!c.line) return -1;
    const s = c.code;
    const open = /(`{3,}|~{3,})([^\n]*)/y;
    open.lastIndex = c.start;
    const m = open.exec(s);
    if (!m) return -1;
    emit(PUNCT, m[0]);
    const start = c.start + m[0].length;
    const close = new RegExp(
      `\\n[ \\t]{0,3}${m[1][0]}{${m[1].length},}[ \\t]*(?=\\n|$)`,
      "g",
    );
    close.lastIndex = start;
    const e = close.exec(s);
    const end = e ? e.index : s.length;
    c.sub(
      s.slice(start, end),
      normalizeCodeLanguage(m[2].trim().split(/\s/)[0]),
    );
    if (!e) return end;
    const indent = /^\n[ \t]*/.exec(e[0])![0];
    emit(null, indent);
    emit(PUNCT, e[0].slice(indent.length));
    return end + e[0].length;
  };
  return [
    [null, /\s+/y],
    fence,
    ["heading", /#{1,6}(?=\s|$)[^\n]*/y, atLine],
    [
      PUNCT,
      /(?:[-*_][ \t]*){3,}(?=\n|$)|(?:[*+-]|\d{1,9}[.)])(?=[ \t])|>/y,
      atLine,
    ],
    [null, /\\[\s\S]/y],
    [STR, /`[^`\n]*`?/y],
    [
      KW,
      /\*\*[^*\n]+\*\*|__[^_\n]+__|\*[^*\n]+\*|_[^_\n]+_/y,
      (c) => !/\w/.test(c.code[c.start - 1] ?? ""),
    ],
    [[PROP, "attr-value"], /(!?\[[^[\]\n]{0,500}\])(\([^)\n]*\)?)/y],
    ["attr-value", /<(?:https?|mailto):[^>\s]*>?/y],
    [null, /[^\n`*_[!<\\]+/y],
  ];
}
