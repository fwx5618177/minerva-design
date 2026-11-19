# trading-chart

Standalone React 19 recipe, using only public Minerva entries.

Requires Node >=22.13 and pnpm 11. Copy the complete directory, then run:

```sh
pnpm install
pnpm build
pnpm dev
```

The package manifest pins the tested Minerva/framework/tool versions. The entry imports the global stylesheet once. App owns the provider and controlled state. No documentation translation setup or workspace aliases are required.

The deterministic data is included in `src/data.ts`. The chart chooses an available browser backend; build and host tests do not certify GPU rendering.
