# Production docs browser E2E

These tests launch real Chromium through Playwright and exercise the production
Vite preview. React Native demos use **react-native-web** inside the docs phone
frame; this suite does not run iOS, Android, uni-app or WeChat device runtimes.
The `tests/e2e` and `tests/e2e-native` Vitest suites remain host integration tests.

```sh
pnpm install --frozen-lockfile
pnpm exec playwright install --with-deps chromium
pnpm build
pnpm test:browser
```

The Playwright config starts `@minerva/docs preview` on port 4187 and serves the
built `/minerva-design/` base path. Outside CI, an existing preview at that URL is
reused. Rebuild after source changes: tests deliberately consume production
artifacts rather than starting a development server.

Coverage includes identical counter/input/checkbox scenarios in React, Vue and
React Native Web; theme/palette changes verified through browser-computed control
colors and persistence; homepage Prism token colors, real clipboard copying and
deploy cancellation; and Alert dismissal, reset and browser focus restoration.

Failure screenshots and traces are saved under `test-results/`; the HTML report
is in `playwright-report/`. Open it with `pnpm exec playwright show-report`.

The Button style comparison checks React and Vue background, label color, radius,
height, padding and font size for exact equality under the same dark/tech theme.
React Native Web shares the colors and font size, but its provider defaults to the
core `touch` preset: the medium Button is 44px high with 20px horizontal padding
and 14px corners, versus the web default of 40px, 16px and 6px. Those three native
measurements are asserted against `resolveTokens({ design: { preset: "touch" } })`;
they are intentional default preset differences, not pixel equivalence.
