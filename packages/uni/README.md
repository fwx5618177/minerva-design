# @minerva/uni (private workspace)

uni-app source SFC renderer for Minerva forms, selection, navigation, overlays, layout, data display and editors. See `src/manifest.ts` and the [platform guide](https://fwx5618177.github.io/minerva-design/#/platform-support) for each component's contract and host limits. The published entry is `minerva-design/uni`, assembled under `packages/minerva-design/dist/uni`. SFCs remain source files so the application's official uni-app compiler can transform native elements and platform branches.

H5 supports keyboard navigation, focus trapping/inert background/scroll locking for modal layers, optional popover portals and child composition, browser file input, and sanitized sandboxed HTML previews. `minerva-design/uni/monaco` is an optional H5 entry that mounts a real Monaco editor with an application-supplied local engine and worker configuration. It is separate from the main entry. Native mini-program hosts cannot run Monaco, DOM child cloning, iframe previews or document focus scopes; they use native views, supported picker APIs and rich-text preview where documented. Preserve the host adapters and runtime dependencies specified by each component.

Validation is separated by host:

- Renderer unit/contract tests and real Chromium H5 tests exercise the documented behavior, including the optional Monaco entry. H5 IDs keep Vue's SSR/hydration behavior; the native runtime uses its compatible instance ID path.
- `spike/device` statically registers the library SFCs, excluding the H5-only Monaco component, and compiles them with official uni-app 5.31 Vue 3 for WeChat. CI runs the fixture separately on Node 22. This proves compilation for that target, not physical-device behavior or every uni-app target/API.
- Recorded WeChat DevTools simulator interactions belong to the separate WeApp fixture; they are not a substitute for application-specific uni-app device testing.

```sh
pnpm --filter @minerva/uni typecheck
pnpm exec vitest run --project uni
pnpm run test:browser:mini
pnpm --filter @minerva/uni build
npm ci --prefix packages/uni/spike/device
npm run build --prefix packages/uni/spike/device
```

Build shared core artifacts before the library build, or use the assembled package build. The independent SDK fixture owns a lockfile and copies current library/core/DOM source into its source root, without consuming generated distribution files. Its pinned compiler version is recorded in `spike/device/package.json`. CI does not upload or publish the app or screenshots.

Browser verification owns its fixture server and refuses to reuse an unrelated process on its port. Set `MINERVA_UNI_BROWSER_PORT` to an available port when needed (for example, `MINERVA_UNI_BROWSER_PORT=4293 pnpm run test:browser:mini`).
