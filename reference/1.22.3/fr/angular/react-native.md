# React Native

Composants mobiles natifs avec des jetons et des comportements partagés.

Package: minerva-design@1.22.3

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "05d8029dbc66b57df26a3da7707f0fa0e4a02bde",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:98c68657ee3e6708d0ba87e44b497d1aba974e208ad5676dbbb9902bc229d648"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Utilisez minerva-design/native avec React Native ou Expo. Conservez la version de React requise par votre SDK Expo. Aucune feuille de style web n’est nécessaire : MinervaProvider convertit les jetons en styles natifs. Un exemple est disponible dans apps/expo-example.

Les interactions sont testées avec React Native Testing Library et react-native-web. Expo Go 57.0.9 a été vérifié sur un simulateur iPhone 17 Pro / iOS 26.1 et un émulateur Pixel 8 / Android 16 API 36 ARM64 : saisie, tri et sélection de tableau, autocomplétion, menus, formatage JSON sans perte, aperçu de document et liste virtuelle de 10 000 lignes. Android couvre aussi la sélection et le retrait de fichiers système ainsi que le copier-coller. Les appareils physiques et les installations de versions autonomes restent non vérifiés.

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
