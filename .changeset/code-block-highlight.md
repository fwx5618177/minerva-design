---
"minerva-design": minor
---

`CodeBlock` syntax highlighting on every renderer (React, Vue, Angular `MnCodeBlock`, Web Components `<minerva-code-block>`, React Native, Taro, uni-app and WeChat). New props: `language` (javascript / js, typescript / ts, jsx, tsx, json, css / scss / less, html / xml / svg / vue, bash / sh / zsh, python / py, yaml / yml, sql, diff, markdown / md; other names render plain text, and without `language` nothing changes), `highlight` (default `true`; `no-highlight` attribute on the web component), `showLineNumbers` (`show-line-numbers`: an aria-hidden gutter, not part of the selected or copied text) and `showLanguage` (`show-language`: a small label such as "JSON"). The copy button still copies the raw text. Tokens are rendered as text spans (`token-<type>` classes, nested `Text` on native), never as HTML.

The core adds a dependency-free tokenizer, `highlightCode(code, language)`, with `normalizeCodeLanguage()`, `splitHighlightLines()`, `codeLanguageLabel()`, `supportedCodeLanguages` and `highlightTokenTypes`. The theme adds `--code-token-<type>-color` tokens (GitHub-like light and dark palettes with at least 4.5:1 contrast on every palette), resolved by `resolveTokens()` for React Native and the mini-programs. The styling hooks add the `line-number` part and make `language` a part on every renderer.

Behavior change: `<minerva-code-block>` and the Taro, uni-app and WeChat code blocks no longer show the language label just because `language` is set; add `show-language` / `showLanguage` to keep it.
