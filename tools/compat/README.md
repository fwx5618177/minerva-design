# Compatibility shims

`.github/workflows/deploy.yml` (GitHub Pages) predates the repository layout
of `minerva-design` and is kept unchanged. It runs:

```sh
pnpm install
pnpm --filter @minerva/lib-core build
pnpm --filter @minerva/lib-web-components build
pnpm --filter @minerva/sample build
# deploys packages/sample/dist
```

These three private workspace packages keep the old names working. They are
never published and are ignored by Changesets:

| Shim                          | `build` runs                                                                       |
| ----------------------------- | ---------------------------------------------------------------------------------- |
| `@minerva/lib-core`           | `@minerva/core` and `@minerva/react` builds (into `packages/minerva-design/dist/`) |
| `@minerva/lib-web-components` | `@minerva/web-components` build (into `packages/minerva-design/dist/`)             |
| `@minerva/sample`             | `@minerva/docs` build, then copies `apps/docs/dist` to `packages/sample/dist`      |

`packages/sample/` is gitignored: it only holds that copy of the docs build.
Day-to-day commands use the root scripts (`pnpm build`, `pnpm dev`, ...).
