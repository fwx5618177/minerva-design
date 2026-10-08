# Changesets

Run `pnpm changeset` to describe a change to `minerva-design`, the only
published package (the `@minerva/*` workspace packages are private and
ignored, see `config.json`). The generated markdown file is committed with
your PR.

Releases are published manually by a maintainer:

1. `pnpm version-packages` — applies the pending changesets (bumps the
   version, writes `packages/minerva-design/CHANGELOG.md`), then commit and
   push.
2. `pnpm release` — builds `minerva-design` and runs `changeset publish`
   (requires `npm login`), then `git push --follow-tags`.
