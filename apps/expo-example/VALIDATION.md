# Expo host validation

Verified on 2026-10-09 using the workspace example and built `minerva-design/native` entry. These checks execute Expo Go and native platform adapters, in addition to the separate React Native Testing Library and browser suites.

| Host             | Runtime                                                                                                           | Scope                                                                                                                                                                                                                                                         |
| ---------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| iOS simulator    | iPhone 17 Pro, iOS 26.1, Expo Go 57.0.9                                                                           | Input and autocomplete, table sort/selection, cascader, JSON precision, menu/submenu, popover, confirmation, command search, clipboard copy, system document picker opening/cancellation, WebView content/update/navigation rejection, virtual-list selection |
| Android emulator | Pixel 8 profile, Android 16 / API 36 Google APIs ARM64 image revision 7, Android Emulator 37.2.12, Expo Go 57.0.9 | The concrete flows below                                                                                                                                                                                                                                      |

## Android observations

- The app launches through Metro and ADB reverse on the isolated `Minerva_API_36` AVD. No physical Android device was connected.
- DataTable sorts Name descending to Lin, Grace, Ada; selecting Lin checks the native row checkbox and marks the header mixed.
- Typing `Tab` and choosing Table updates AutoComplete. Cascader selects China / Shanghai. Command search `pref` keeps Settings and removes Profile.
- Formatting JSON preserves the exact integer `9007199254740993` while inserting indentation and line breaks.
- CodeBlock copies through `expo-clipboard`; Android's paste action inserts the exact copied import statement into the native Source code input.
- Upload opens Android DocumentsUI. A generated 45-byte `minerva-native-proof.txt` fixture in the emulator's Downloads is selected, appears as Selected in the example, and can be removed.
- After a loading transition, the Select files button retains its correct native accessibility label. This check caught an Android stale `busy` description; Button now supplies an explicit label for textual children, with caller labels taking precedence. The fix passed device revalidation after clearing Metro's cache.
- Menu's unchecked Show grid state survives closing/reopening; More opens the Archive submenu. Popover opens and dismisses through Done. The confirmation dialog opens and dismisses through Archive.
- The native WebView renders Preview loaded, updates to Updated document, and stays on that local content when Blocked external navigation is pressed. The foreground activity remains Expo Go.
- The 10,000-row FlatList exposes 14 visible row controls initially. Selecting Record 0 updates the result; scrolling displays later records and selecting Record 17 updates the result to Selected row 17.
- Android logcat contained no ReactNativeJS error or AndroidRuntime fatal error during these flows.

## Repeating the checks

Build the public package from the workspace root, then start the example:

```sh
pnpm --filter minerva-design build
pnpm --filter @minerva/expo-example start --lan --port 8420
adb -s emulator-5554 reverse tcp:8420 tcp:8420
adb -s emulator-5554 shell am start -a android.intent.action.VIEW -d exp://127.0.0.1:8420 host.exp.exponent
```

Use Advanced components, Document preview and Virtual list from the example home screen. Choose the target emulator explicitly when using ADB. The Android smoke test used the actual software keyboard, with Back to dismiss it before choosing suggestions that were underneath it. Browser-only flows can be repeated with `verify-browser.mjs` against the exported web example.

## Boundaries

These are simulator/emulator checks, not physical-device certification or exhaustive API/visual parity. Android standalone release installation has not been tested. The local iOS standalone build encounters an Expo dependency requiring a newer Swift compiler than Xcode 26.1.1 provides; the recorded iOS checks use the official Expo Go binary. Upload demonstrates local file selection, not a remote upload service. Clipboard paste-back verification and actual file selection/removal were performed on Android; iOS checked clipboard copy and picker opening/cancellation only.

## Final-session recheck (2026-10-09)

After the final library rebuild, the iOS simulator was still displaying a previous Metro resolution error for `dist/native/theme/MinervaProvider.js`. The file exists in the current distribution. Terminating Expo Go and reopening `exp://127.0.0.1:8420` against the current Metro process produced a fresh successful iOS bundle (878 modules). The Advanced components screen rendered, Name sorting showed its ascending indicator, and selecting Ada changed the owner feedback to `Selected a`. Android's current ReactNativeJS/AndroidRuntime error log was empty.

When rebuilding published outputs while a demo is running, finish the build before reconnecting **both** simulator clients. Verify the visible screen and an interaction after the final build; a previous device check does not prove that a later stale error screen has recovered. This recheck does not change the physical-device or standalone-release boundaries above.
