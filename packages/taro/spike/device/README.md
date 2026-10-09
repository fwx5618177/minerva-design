# Official taro mini-program compilation fixture

From the repository root:

```sh
npm ci --prefix packages/taro/spike/device
npm run build --prefix packages/taro/spike/device
```

The isolated lockfile pins the official platform compiler. `prepare.cjs` copies current library/core/DOM source into the application source root, excluding tests; it does not substitute component implementations. Generated source and output are ignored. The main entry is compiled with Taro 4.3.0 and its official WeChat platform plugin.

Compilation is a platform build check, not a physical-device result. Open the generated dist project in WeChat DevTools to run it.
