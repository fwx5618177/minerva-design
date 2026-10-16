# Changesets

Run `pnpm changeset` to describe a release-worthy change to `minerva-design`,
the only published package. The internal `@minerva/*` packages are private;
changes to their public behavior still need a changeset for `minerva-design`.
Commit the generated markdown file with the feature PR.

The prepared first stable version, **1.0.0**, is published manually once with
`pnpm release`. Subsequent main pushes are automatically versioned and published by
`.github/workflows/ci.yml` after all checks pass: if no `.changeset/*.md` file is
present, CI infers the version bump (`patch`, `minor`, or `major`) from Conventional
Commit messages since the last release tag. Set the repository variable
`NPM_AUTO_RELEASE=false` only when you need to pause automated publishing. See
[the release guide](../docs/releasing.md) for setup, commands and recovery.
