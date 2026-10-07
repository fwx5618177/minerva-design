// Build-time minification of the Lit `css` / `html` tagged templates of
// src/ (the lib-core stylesheets are already minified by Vite's CSS
// pipeline; the inline templates kept their source indentation):
// - css`...`: comments removed, whitespace collapsed, spaces around
//   `{ } ; ,` dropped (quoted strings untouched)
// - html`...` / svg`...`: whitespace runs containing a line break become
//   line breaks only (same rendering under `white-space: normal / nowrap /
//   pre-line`). Templates containing <pre>, <code> or <textarea> are left
//   alone, since their whitespace is content.
// Line breaks are kept (one per source line), so line numbers, and with
// them the existing source maps, stay valid. `${...}` expressions are never
// modified: only static template text changes and the output is
// equivalent (tests/meta/minify-templates.test.ts checks it on every
// source file; the unit tests run on the sources).

const TAGS = new Set(["css", "html", "svg"]);
const IDENT = /[\w$]/;

/**
 * Reads a template literal starting at `start` (the opening backtick).
 * Returns its static chunks, the raw expressions between them and the index
 * after the closing backtick.
 */
function readTemplate(code, start) {
  const chunks = [];
  const expressions = [];
  let chunk = "";
  let i = start + 1;
  while (i < code.length) {
    const ch = code[i];
    if (ch === "\\") {
      chunk += code.slice(i, i + 2);
      i += 2;
    } else if (ch === "`") {
      chunks.push(chunk);
      return { chunks, expressions, end: i + 1 };
    } else if (ch === "$" && code[i + 1] === "{") {
      chunks.push(chunk);
      chunk = "";
      const close = skipExpression(code, i + 2);
      expressions.push(code.slice(i + 2, close));
      i = close + 1;
    } else {
      chunk += ch;
      i += 1;
    }
  }
  throw new Error("unterminated template literal");
}

/** Index of the `}` closing an expression that starts at `start`. */
function skipExpression(code, start) {
  let depth = 0;
  let i = start;
  while (i < code.length) {
    const ch = code[i];
    if (ch === "{") depth += 1;
    else if (ch === "}") {
      if (depth === 0) return i;
      depth -= 1;
    } else if (ch === '"' || ch === "'") {
      i = skipString(code, i);
      continue;
    } else if (ch === "`") {
      i = readTemplate(code, i).end;
      continue;
    } else if (ch === "/" && code[i + 1] === "/") {
      i = code.indexOf("\n", i);
      if (i === -1) return code.length;
      continue;
    } else if (ch === "/" && code[i + 1] === "*") {
      i = code.indexOf("*/", i) + 2;
      continue;
    }
    i += 1;
  }
  throw new Error("unterminated template expression");
}

function skipString(code, start) {
  const quote = code[start];
  let i = start + 1;
  while (i < code.length) {
    if (code[i] === "\\") i += 2;
    else if (code[i] === quote) return i + 1;
    else i += 1;
  }
  return i;
}

/** Minifies the static CSS text, leaving quoted strings as they are. */
function minifyCssChunks(chunks) {
  let quote = null;
  return chunks.map((chunk) => {
    let out = "";
    let plain = "";
    const flush = () => {
      out += plain
        .replace(/\s+/g, (space) => lineBreaks(space) || " ")
        .replace(/[ \t]*([{};,])[ \t]*/g, "$1");
      plain = "";
    };
    for (let i = 0; i < chunk.length; i += 1) {
      const ch = chunk[i];
      if (quote) {
        out += ch;
        if (ch === "\\") {
          out += chunk[i + 1] ?? "";
          i += 1;
        } else if (ch === quote) quote = null;
      } else if (ch === "/" && chunk[i + 1] === "*") {
        // comments may contain quotes ("Input's"): drop them first
        const end = chunk.indexOf("*/", i + 2);
        const close = end === -1 ? chunk.length : end + 2;
        plain += lineBreaks(chunk.slice(i, close)) || " ";
        i = close - 1;
      } else if (ch === '"' || ch === "'") {
        flush();
        quote = ch;
        out += ch;
      } else plain += ch;
    }
    flush();
    return out;
  });
}

/** The line breaks of `text` ("" when it has none). */
const lineBreaks = (text) => "\n".repeat(text.split("\n").length - 1);

function minifyHtmlChunks(chunks) {
  return chunks.map((chunk) =>
    chunk.replace(/[ \t]*\n\s*/g, (space) => lineBreaks(space)),
  );
}

/** Minifies the css / html / svg templates of a module's source code. */
export function minifyTemplates(code) {
  let out = "";
  let last = 0;
  let i = 0;
  while (i < code.length) {
    const ch = code[i];
    if (ch === '"' || ch === "'") {
      i = skipString(code, i);
      continue;
    }
    if (ch === "/" && code[i + 1] === "/") {
      const end = code.indexOf("\n", i);
      i = end === -1 ? code.length : end;
      continue;
    }
    if (ch === "/" && code[i + 1] === "*") {
      i = code.indexOf("*/", i) + 2;
      continue;
    }
    if (ch !== "`") {
      i += 1;
      continue;
    }
    let tagStart = i;
    while (tagStart > 0 && IDENT.test(code[tagStart - 1])) tagStart -= 1;
    const tag = code.slice(tagStart, i);
    const before = code[tagStart - 1];
    const template = readTemplate(code, i);
    if (TAGS.has(tag) && before !== ".") {
      const source = template.chunks.join("");
      const keep = tag !== "css" && /<(pre|code|textarea)\b/i.test(source);
      if (!keep) {
        const chunks =
          tag === "css"
            ? minifyCssChunks(template.chunks)
            : minifyHtmlChunks(template.chunks);
        let literal = "`";
        chunks.forEach((chunk, index) => {
          literal += chunk;
          if (index < template.expressions.length) {
            // expressions may contain templates too
            literal += `\${${minifyTemplates(template.expressions[index])}}`;
          }
        });
        literal += "`";
        out += code.slice(last, i) + literal;
        last = template.end;
      }
      i = template.end;
      continue;
    }
    // Other templates: only the templates nested in their expressions
    if (template.expressions.length) {
      let literal = "`";
      template.chunks.forEach((chunk, index) => {
        literal += chunk;
        if (index < template.expressions.length) {
          literal += `\${${minifyTemplates(template.expressions[index])}}`;
        }
      });
      out += code.slice(last, i) + `${literal}\``;
      last = template.end;
    }
    i = template.end;
  }
  return out + code.slice(last);
}

/** Vite plugin: minifies the templates of the package sources (build only). */
export function minifyTemplatesPlugin() {
  return {
    name: "minerva-wc-minify-templates",
    apply: "build",
    enforce: "pre",
    transform(code, id) {
      if (!/[\\/]lib-web-components[\\/]src[\\/].*\.ts$/.test(id)) return null;
      if (id.endsWith(".test.ts")) return null;
      // Line numbers are unchanged: the previous source map stays valid
      return { code: minifyTemplates(code), map: null };
    },
  };
}
