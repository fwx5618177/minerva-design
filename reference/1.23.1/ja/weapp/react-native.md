# React Native

共通のトークンと振る舞いを持つモバイル向けネイティブコンポーネント。

Package: minerva-design@1.23.1

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

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
