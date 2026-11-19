# React Native

Composants mobiles natifs avec des jetons et des comportements partagés.

Package: minerva-design@1.24.3

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.3",
  "sourceCommit": "e8c253c3c4ff080aa45e0b73b5132eaefca86209",
  "sourceDigest": "sha256:b9a39dcfe8b09a5d0967efee074963c408a37abb72fbe1d4c7a1eda21075df1d",
  "referenceSourceDigest": "sha256:db3e755233f56f2ed326cfe2cf1eb7099c6b0bea2a5e432b6c94ae08d637c24c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.3/types.json) or getType() from minerva-design/contracts.

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
