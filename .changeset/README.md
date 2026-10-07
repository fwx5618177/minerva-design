# Changesets

Run `pnpm changeset` to describe a change to `@minerva/lib-core` or
`@minerva/lib-web-components`. The generated markdown file is committed with
your PR.

Releases are published manually by a maintainer:

1. `pnpm version-packages` — applies the pending changesets (bumps versions,
   writes `CHANGELOG.md`), then commit and push.
2. `pnpm release` — builds the libraries and runs `changeset publish`
   (requires `npm login`), then `git push --follow-tags`.
