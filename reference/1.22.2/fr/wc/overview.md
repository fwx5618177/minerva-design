# Vue d'ensemble

Minerva Design propose des moteurs React, Vue, Angular, Web Components, React Native, Taro, WeChat natif et uni-app partageant contrats et jetons de design.

Package: minerva-design@1.22.2

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

### Qu'est-ce que Minerva ?

Un seul paquet minerva-design expose une entrée par moteur. La matrice des plateformes décrit les API implémentées et leurs équivalents selon l’hôte.

Le Web et les mini-programmes utilisent des variables CSS ; React Native résout les mêmes jetons en styles natifs. Les providers gèrent thèmes, palettes et préréglages.

### Paquets

Composants React 19, ConfigProvider, utilitaires et hooks de thème, avec ESM, CommonJS et déclarations TypeScript. Les autres moteurs utilisent leurs entrées documentées.

Les éléments personnalisés Lit couvrent le catalogue documenté et fonctionnent en HTML ou avec un framework.

### Points forts

#### Thèmes

Modes light, dark et system, palettes et préréglages intégrés, ainsi que thèmes personnalisés via ConfigProvider.

#### Internationalisation

La bibliothèque React fournit ses propres traductions en anglais, chinois, japonais et français avec un petit traducteur intégré : aucune dépendance à une bibliothèque i18n, totalement isolé de la configuration i18n de votre application.

#### Accessibilité

éléments sémantiques, navigation au clavier, anneaux de focus visibles et props aria-label pour les contrôles composés uniquement d'une icône.

#### TypeScript

écrite en TypeScript ; chaque composant exporte le type de ses props et les thèmes sont des tables de jetons typées.

#### Compatible tree-shaking

Importez l’entrée du moteur choisi. Installation et Plateformes décrivent les formats, styles et dépendances optionnelles de chaque hôte.

### Aperçu rapide

Importez la feuille de style une fois, enveloppez votre application dans ConfigProvider et utilisez les composants :

### Parcourir la documentation

Chaque page propose des exemples interactifs avec leur code source et une table d'API générée à partir des types des composants.

```tsx
import { Button, ConfigProvider, HStack, Switch } from "minerva-design";
import "minerva-design/style.css";

export default function App() {
  return (
    <ConfigProvider theme="system">
      <HStack gap={4}>
        <Button color="primary">Save</Button>
        <Switch label="Notifications" defaultChecked />
      </HStack>
    </ConfigProvider>
  );
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
