# React Native

共享令牌与交互逻辑的原生移动端组件。

Package: minerva-design@1.20.1

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "3a9f5cdaae706f14fe6d8c65c5481eba719a66c4",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:6c9ecba0079f25e53cd971e51f2be8604fc3d941c0ed1cfeec03c4a91913ad73"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

在 React Native 或 Expo 中导入 minerva-design/native，React 版本跟随 Expo SDK。无需加载 Web 样式表，MinervaProvider 将令牌解析为原生样式。仓库包含 apps/expo-example 示例应用。

组件交互已通过 React Native Testing Library 与 react-native-web 测试。Expo Go 57.0.9 已在 iPhone 17 Pro / iOS 26.1 模拟器和 Pixel 8 / Android 16 API 36 ARM64 模拟器验收，覆盖文字输入、表格排序与选择、联想输入、菜单、无损 JSON 格式化、文档预览和一万行虚拟列表；Android 还验证了系统文件选择与移除、剪贴板复制后粘贴。真机与独立发行安装包仍未验证。

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
