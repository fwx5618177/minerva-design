# @minerva/uni (private)

Initial native renderer: **Button, Input, Switch**. Other components remain planned.

Sources live in `src/`; the build writes `packages/minerva-design/dist/uni`. The published package is `minerva-design`, not this private workspace package.

- Button: disabled/loading guards, click event, small/medium/large sizes, solid/outline/ghost variants.
- Input: controlled text value, disabled/readOnly guards, change event.
- Switch: controlled checked value, disabled/readOnly guards, change event.
- Shared mini-program token classes and control styles; no React DOM renderer dependency.

See the [platform guide](https://fwx5618177.github.io/minerva-design/#/platform-support) for imports, event payloads and examples. These controls cover a subset of the web API. Device/compiler validation remains pending.

Run `pnpm --filter @minerva/uni typecheck` and `pnpm vitest run --project uni`. Build the shared core first, then `pnpm --filter @minerva/uni build` (or build the assembled package).
