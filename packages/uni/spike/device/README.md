# Official uni mini-program compilation fixture

From the repository root:

```sh
npm ci --prefix packages/uni/spike/device
npm run build --prefix packages/uni/spike/device
```

The isolated lockfile pins the official platform compiler. `prepare.cjs` copies current library/core/DOM source into the application source root, excluding tests; it does not substitute component implementations. Generated source and output are ignored. Every current library SFC (except the documented H5-only Monaco entry) is statically registered, so the official uni compiler checks every native component, including internal composition components. Compiler version: 5.31 (vue3).

Compilation is a platform build check, not a physical-device result. Open the generated dist/build/mp-weixin project in WeChat DevTools to run it.
