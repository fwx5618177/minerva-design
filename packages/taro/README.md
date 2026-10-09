# @minerva/taro (private workspace)

Taro renderer for the Minerva component families: forms, selection, navigation, overlays, layout, data display and editors. The component-by-component contract and host limits are recorded in `src/manifest.ts` and the [platform guide](https://fwx5618177.github.io/minerva-design/#/platform-support). This private package is assembled into `minerva-design/taro`; build output lives in `packages/minerva-design/dist/taro`.

H5 implements keyboard navigation, modal focus scopes and outside dismissal, browser file selection/drop, and sanitized HTML previews in sandboxed iframes. The optional `minerva-design/taro/monaco` entry mounts a real Monaco editor using an application-supplied, locally installed engine; the application configures workers. The main entry does not load Monaco. Native mini-programs use their own input, file-picker and view APIs: they cannot host Monaco or browser iframe/document-focus semantics. Upload requires a supported platform picker capability. Consult the manifest for each component's native equivalent.

Validation is separated by host:

- Renderer unit/contract tests and real Chromium H5 tests cover the documented state, keyboard, focus, upload, preview and editor behavior.
- `spike/device` compiles the current main-entry source with official Taro 4.3 and its WeChat platform plugin. CI runs this independently on Node 22; this is SDK compilation, not an emulator or physical-device test.
- The separate WeApp fixture records selected interactions in the WeChat DevTools simulator. Those results do not validate every Taro API, other target platforms or physical devices.

```sh
pnpm --filter @minerva/taro typecheck
pnpm exec vitest run --project taro
pnpm run test:browser:mini
pnpm --filter @minerva/taro build
npm ci --prefix packages/taro/spike/device
npm run build --prefix packages/taro/spike/device
```

Build shared core artifacts before the library build, or use the assembled package build. The independent SDK fixture copies current library/core/DOM source into its source root and owns its dependency lockfile. It does not require generated distribution files. No deployment, upload, device login or publication is part of the compilation job.

Browser verification owns its fixture server and refuses to reuse an unrelated process on its port. Set `MINERVA_TARO_BROWSER_PORT` to an available port when needed (for example, `MINERVA_TARO_BROWSER_PORT=4293 pnpm run test:browser:mini`).
