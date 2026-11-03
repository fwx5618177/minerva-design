# React Native

共通のトークンと振る舞いを持つモバイル向けネイティブコンポーネント。

Package: minerva-design@1.20.0

Renderer: native

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "e5692a82f25163efee65ef771fb64a94e61cb359",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:07db3eb36ff2e4b5bb88e238b04c82819862c70d739534f627e7b6c73c0c6ef1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

React Native または Expo で minerva-design/native を使います。React は Expo SDK が指定するバージョンを維持してください。Web 用 CSS は不要で、MinervaProvider がトークンをネイティブスタイルに変換します。apps/expo-example にサンプルがあります。

React Native Testing Library と react-native-web で操作をテストしています。Expo Go 57.0.9 を iPhone 17 Pro / iOS 26.1 シミュレーターおよび Pixel 8 / Android 16 API 36 ARM64 エミュレーターで検証しました。文字入力、表の並べ替えと選択、入力候補、メニュー、精度を保持する JSON 整形、文書プレビュー、1万行の仮想リストを確認済みです。Android ではシステムのファイル選択・削除とコピー後の貼り付けも確認しました。実機と単独のリリースアプリのインストールは未検証です。

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
