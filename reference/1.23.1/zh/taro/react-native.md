# React Native

共享令牌与交互逻辑的原生移动端组件。

Package: minerva-design@1.23.1

Renderer: taro

Locale: zh

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
