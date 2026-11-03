# React Native

Native mobile components with shared tokens and behaviour.

Package: minerva-design@1.19.3

Renderer: taro

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Use minerva-design/native in React Native or Expo. Keep the React version required by your Expo SDK. No web stylesheet is needed; MinervaProvider resolves tokens to native styles. The workspace includes apps/expo-example.

React Native Testing Library and react-native-web tests cover component interactions. Expo Go 57.0.9 was exercised on an iPhone 17 Pro / iOS 26.1 simulator and a Pixel 8 / Android 16 API 36 ARM64 emulator. Verified flows include text entry, table sorting/selection, autocomplete, menus, lossless JSON formatting, document preview and a 10,000-row virtual list. Android additionally verified system file selection/removal and clipboard copy/paste. Physical devices and standalone release installation remain unverified.

```bash
pnpm add minerva-design\nnpx expo install react-native-safe-area-context react-native-svg
```

```tsx
import { useState } from 'react';
import { Text } from 'react-native';
import { MinervaProvider, Button, Input, Switch } from 'minerva-design/native';

function Form() {
  const [name, setName] = useState('');
  const [saved, setSaved] = useState('');
  const [checked, setChecked] = useState(false);
  return <>
    <Input value={name} onChange={setName} placeholder="Name" />
    <Switch checked={checked} onChange={setChecked} />
    <Button onPress={() => setSaved(name)}>Save</Button>
    <Text>{saved}</Text>
  </>;
}
export default function App() {
  return <MinervaProvider><Form /></MinervaProvider>;
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
