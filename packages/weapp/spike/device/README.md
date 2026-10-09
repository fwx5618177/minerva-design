# Native WeChat interaction fixture

Build the library (`pnpm --filter @minerva/weapp build`, after the core tokens build), then:

```sh
npm ci --prefix packages/weapp/spike/device
npm run prepare:fixture --prefix packages/weapp/spike/device
npm run verify --prefix packages/weapp/spike/device
```

`verify.cjs` uses the official miniprogram-automator and the installed WeChat CLI. It fails after 45 seconds if the runtime does not answer; a launch alone is not a pass. `WECHAT_CLI` can select another installed CLI. Set `WECHAT_WS_ENDPOINT=ws://127.0.0.1:9420` to reuse a project already opened by `cli auto` (otherwise an occupied automation port is rejected). No upload or publishing occurs.

For native UI verification, open this project in DevTools. Increment changes the count; type a name to check uppercase owner feedback; the disabled switch keeps its event counter at zero; open Select and verify Blocked cannot commit, then choose Beta; open and close the modal; switch the root theme while the nested provider stays dark; activate Reconnect. The controls use built library components.

`evidence/verification.json` records exactly which simulator actions were observed and remaining tool/account limitations. The PNGs are native DevTools screenshots. These results do not claim physical-device validation.
