# Contributing to Minerva

We love your input! We want to make contributing to Minerva as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## We Develop with Github

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## Pull Requests Process

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes (`pnpm test`) and the build works (`pnpm build`).
5. Make sure your code lints, type-checks and is formatted (`pnpm lint`, `pnpm typecheck`, `pnpm format:check`).
6. If your change affects a published package (`@minerva/core`, `@minerva/lib-core`, `@minerva/lib-web-components`), add a changeset with `pnpm changeset`.
7. Issue that pull request!

`.github/workflows/ci.yml` runs the same checks on Node 22 for every pull request (`pnpm lint`, `pnpm typecheck`, `pnpm format:check`, `pnpm test:coverage`, `pnpm build`, `pnpm test:dist`, `pnpm check:package`); run them locally before pushing. `deploy.yml` builds and deploys the docs site.

## Development setup

- Node.js >= 22.12 (see `.nvmrc`) and pnpm 11 (`corepack enable` or `npm i -g pnpm`)
- `pnpm install`, then `pnpm dev` to build the libraries and start the docs site at http://127.0.0.1:3000/minerva/
- Documentation pages live in `packages/sample/src/docs/pages/<page>/` (one file per live demo under `demos/`), their strings in `packages/sample/src/i18n/locales/<lng>/docs/<page>.json` (en, zh, ja, fr — keep all four in sync). API tables are generated from each component's `types.ts`: document props with JSDoc and `@default`, then run `pnpm --filter @minerva/sample gen:api`. `pnpm test` fails if a public export is undocumented, a locale is missing a key, or the generated API file is stale.

## Releasing (maintainers)

Releases are versioned with [Changesets](https://github.com/changesets/changesets) and **published to npm by hand** from a maintainer's machine. There is no publish automation: CI never publishes.

```bash
# 0. Node 22 (.nvmrc), up-to-date main, clean working tree
# 1. Version: apply pending .changeset/*.md (bump versions + write CHANGELOG.md)
pnpm version-packages
pnpm install            # refresh the lockfile (internal dependency ranges may change)

# 2. Review: git diff (versions, changelogs, @minerva/core ranges), then the CI checks
pnpm lint && pnpm typecheck && pnpm format:check && pnpm test:coverage
pnpm build && pnpm test:dist && pnpm check:package
pnpm -r publish --dry-run --no-git-checks   # lists what would be published, uploads nothing
git commit -am "chore: release" && git push

# 3. Log in to npm (account with publish rights on @minerva, 2FA enabled)
npm login --registry https://registry.npmjs.org/
npm whoami --registry https://registry.npmjs.org/

# 4. Publish: builds core + lib-core + lib-web-components, then `changeset publish`
pnpm release            # add `--otp <code>` to pass the 2FA one-time password up front
git push --follow-tags  # push the <package>@<version> tags
```

- `changeset publish` publishes only the packages whose new version is not on npm yet, in dependency order (`@minerva/core` first, then `@minerva/lib-core` and `@minerva/lib-web-components`), and rewrites `workspace:*` to real versions.
- Every published package sets `publishConfig.registry` to `https://registry.npmjs.org/` (a registry mirror in `~/.npmrc` is ignored for publishing) and `access: public`.
- Published files come from `files` in each `package.json`: `dist/` (plus `custom-elements.json` for lib-web-components), `README.md` and `LICENSE`; tests and sources are never included. `@minerva/sample` is private. See the [README](./README.md#releasing-manual-npm-publishing) for the per-package contents.

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using Github's [issue tracker](https://github.com/fwx5618177/minerva/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/fwx5618177/minerva/issues/new/choose).

## Write bug reports with detail, background, and sample code

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can.
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## License

By contributing, you agree that your contributions will be licensed under its MIT License.

## References

This document was adapted from the open-source contribution guidelines for [Facebook's Draft](https://github.com/facebook/draft-js/blob/a9316a723f9e918afde44dea68b5f9f39b7d9b00/CONTRIBUTING.md).
