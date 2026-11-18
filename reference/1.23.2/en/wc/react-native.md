# React Native

Native mobile components with shared tokens and behaviour.

Package: minerva-design@1.23.2

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "6c540b5293a3b5d4cb8d1c38c6d3c462f6e8d1b1",
  "sourceDigest": "sha256:96e12a2f39f4691c9ba257d9f8247a4fd810c72b772e3da161b9f71eb1e5795d",
  "referenceSourceDigest": "sha256:de9407f9acf37f670db2dc646bbdcb8b05067fae0b4c7fd4ec79011e933f6519"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

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
