# @minerva/dom (private)

The **DOM** half of Minerva's headless layer, for the web renderers (React
DOM, Web Components, and later Vue, Angular and Taro H5): focus scope,
dismissable layer stack, scroll lock, hide-others, roving focus (DOM binding
of the keyboard navigation / typeahead math of `@minerva/core`), portal host,
anchored positioning (`@floating-ui/dom`), pointer grace, presence (exit
animations), reading direction, adjacent tabbable, editable-target detection,
and the theme's DOM helpers (CSS variables, design attributes, cookies, the
no-flash `THEME_INIT_SCRIPT` and its CSP hash).

It depends on [`@minerva/core`](../core/README.md) (platform-neutral), never
the other way round. React Native and mini-program renderers never import it.

This workspace package is **private**: it is published inside
[`minerva-design`](../minerva-design/README.md), never on its own.

| Built by `pnpm --filter @minerva/dom build` into | Published as                                  |
| ------------------------------------------------ | --------------------------------------------- |
| `packages/minerva-design/dist/dom/index.*`       | internal (imported by the web renderers)      |
| `packages/minerva-design/dist/dom/core-web.*`    | `minerva-design/core` (`@minerva/core` + dom) |

Renderer builds keep `@minerva/dom` external and rewrite its imports to the
one copy in `dist/dom/` (`tools/core-imports.mjs`). Moving a name between
core and dom: run `node tools/codemods/core-dom-imports.mjs packages/*/src`,
which splits `@minerva/core` imports of names now exported here.
