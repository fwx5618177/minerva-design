# React Native

共通のトークンと振る舞いを持つモバイル向けネイティブコンポーネント。

Package: minerva-design@1.23.3

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.3",
  "sourceCommit": "476a289a1ef792c8950058e6bf15f1fe46ce18b0",
  "sourceDigest": "sha256:b7c3468445a6a9337f252a14f73347509078e26d4ed34efcf08034d5d4d49c91",
  "referenceSourceDigest": "sha256:7eba577017a7e4dd3baaf9e50ce53ce6efacf4bb06dac6c879af80bc45a8bca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.3/types.json) or getType() from minerva-design/contracts.

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
