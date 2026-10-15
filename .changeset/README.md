# Changesets

Run `pnpm changeset` to describe a release-worthy change to `minerva-design`,
the only published package. The internal `@minerva/*` packages are private;
changes to their public behavior still need a changeset for `minerva-design`.
Commit the generated markdown file with the feature PR.

The prepared first stable version, **1.0.0**, is published manually once with
`pnpm release`. Subsequent main releases are automated by `.github/workflows/ci.yml`
after all checks pass, using Changesets for versioning and npm Trusted Publishing
for upload. Do not run `version-packages` manually for normal feature PRs.

Automation is disabled until the repository variable `NPM_AUTO_RELEASE=true`
is configured after the first manual publish and npm Trusted Publisher setup.
No changeset means no new npm version. See [the release guide](../docs/releasing.md)
for setup, commands and recovery.
