# React Native

Native mobile components with shared tokens and behaviour.

Package: minerva-design@1.23.3

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.3",
  "sourceCommit": "701bc5e143b35324946db80bfe8336f93933f86e",
  "sourceDigest": "sha256:96e12a2f39f4691c9ba257d9f8247a4fd810c72b772e3da161b9f71eb1e5795d",
  "referenceSourceDigest": "sha256:35253c549c1c2f3c71b2980b1a393121d92facacf74d97b2ceeaabceaa79878c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.3/types.json) or getType() from minerva-design/contracts.

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
