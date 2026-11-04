# React Native

Composants mobiles natifs avec des jetons et des comportements partagés.

Package: minerva-design@1.20.2

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "8d5d0df3644b1fa1c267b3dd6809b0e7eb1ce75b",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:b329acf9d5eb6cf4b4b42169ce925c67b033f581b616664bf07fc6d664de45f0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

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
