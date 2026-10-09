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
6. If your change affects the published package `minerva-design` (anything under `packages/core`, `packages/react`, `packages/web-components` or `packages/minerva-design`), add a changeset for `minerva-design` with `pnpm changeset`.
7. Issue that pull request!

`.github/workflows/ci.yml` runs the same checks on Node 22 for every pull request (`pnpm lint`, `pnpm typecheck`, `pnpm format:check`, `pnpm test:coverage`, `pnpm build`, `pnpm test:dist`, `pnpm check:package`); run them locally before pushing. Real Chromium docs E2E runs after the production build (`pnpm exec playwright install chromium`, then `pnpm test:browser`). The existing `pnpm test:e2e` runs component workflows in happy-dom/RNTL; it does not certify browser or native-device rendering. `deploy.yml` builds `minerva-design` and the docs site and deploys `apps/docs/dist` to GitHub Pages.

## Development setup

- Node.js >= 22.12 (see `.nvmrc`) and pnpm 11 (`corepack enable` or `npm i -g pnpm`)
- `pnpm install`, then `pnpm dev` to build `minerva-design` and start the docs site at http://127.0.0.1:3000/minerva-design/
- Layout: `packages/core` (`@minerva/core`, platform-neutral: no DOM access, enforced by ESLint and a Node-environment test), `packages/dom` (`@minerva/dom`, the DOM primitives of the web renderers), `packages/react` (`@minerva/react`) and `packages/web-components` (`@minerva/web-components`) are the sources, as private workspace packages; their builds write `packages/minerva-design/dist/{core,dom,react,web-components}`, the one published package (`minerva-design`). `packages/{vue,angular,native,taro,weapp,uni}` contain the platform renderers; their public entries and assets are assembled into the same package. Consult the generated component contracts and renderer manifests for implemented scope and limitations. `apps/docs` (`@minerva/docs`) is the docs site; `tools/` holds the shared build helpers (`css-layer.mjs`, `dual-declarations.mjs`, `core-imports.mjs`, `paths.mjs`) and codemods. React and framework versions per renderer family come from the pnpm catalogs of `pnpm-workspace.yaml` (`catalog:web`, `catalog:native`, `catalog:taro`...).
- User-facing code (docs pages, demos, READMEs) imports `minerva-design` entries only, never `@minerva/*` (checked by `apps/docs/src/docs/userImports.test.ts`). After adding a web component entry, run `pnpm --filter @minerva/web-components manifest` and `pnpm --filter minerva-design sync:package`.
- Documentation pages live in `apps/docs/src/docs/pages/<page>/` (one file per live demo under `demos/`), their strings in `apps/docs/src/i18n/locales/<lng>/docs/<page>.json` (en, zh, ja, fr — keep all four in sync). API tables are generated from each component's `types.ts`: document props with JSDoc and `@default`, then run `pnpm --filter @minerva/docs gen:api`. `pnpm test` fails if a public export is undocumented, a locale is missing a key, or the generated API file is stale.

## Releasing (maintainers)

Releases are versioned with [Changesets](https://github.com/changesets/changesets) and **published to npm by hand** from a maintainer's machine. There is no publish automation: CI never publishes.

```bash
# 0. Node 22 (.nvmrc), up-to-date main, clean working tree
# 1. Version: apply pending .changeset/*.md (bump the version + write CHANGELOG.md)
pnpm version-packages
pnpm install            # refresh the lockfile

# 2. Review: git diff (version, changelog), then the CI checks
pnpm lint && pnpm build && pnpm typecheck && pnpm format:check && pnpm test:coverage
pnpm test:dist && pnpm check:package
(cd packages/minerva-design && npm pack --dry-run)   # lists what would be published, uploads nothing
git add .changeset packages/minerva-design/package.json packages/minerva-design/CHANGELOG.md pnpm-lock.yaml
git commit -m "chore: release" && git push

# 3. Log in to npm (account with publish rights on minerva-design, 2FA enabled)
npm login --registry https://registry.npmjs.org/
npm whoami --registry https://registry.npmjs.org/

# 4. Publish: builds minerva-design, then `changeset publish`
pnpm release            # add `--otp <code>` to pass the 2FA one-time password up front
git push --follow-tags  # push the minerva-design@<version> tag
```

- `changeset publish` publishes `minerva-design` only, when its new version is not on npm yet; the `@minerva/*` workspace packages are private and listed in `ignore` of `.changeset/config.json`.
- The published package sets `publishConfig.registry` to `https://registry.npmjs.org/` (a registry mirror in `~/.npmrc` is ignored for publishing) and `access: public`.
- Published files come from `files` in `packages/minerva-design/package.json`: `dist/` (all public renderer entries and their required assets), `custom-elements.json`, `README.md`, `LICENSE` and `CHANGELOG.md`; tests and the docs site are excluded; the Native source entry is intentionally included. See the [README](./README.md#releasing-manual-npm-publishing) for the contents.

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using Github's [issue tracker](https://github.com/fwx5618177/minerva-design/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/fwx5618177/minerva-design/issues/new/choose).

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
