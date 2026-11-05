# Introduction

Les idées derrière Minerva, comment lire les pages de composants et les conventions communes à tous les composants.

Package: minerva-design@1.21.0

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### Principes de conception

#### Piloté par les jetons

les couleurs, rayons et ombres proviennent de propriétés personnalisées CSS : chaque composant suit le thème actif, y compris le vôtre.

#### Accessible par défaut

les composants rendent des éléments natifs et sémantiques, prennent en charge le clavier, affichent un anneau de focus visible et exposent aria-label lorsqu'un libellé visible peut manquer.

#### Des API prévisibles

les mêmes noms de props (variant, size, shape, disabled, loading...) ont la même signification d'un composant à l'autre.

#### Petits et composables

les composants font une seule chose et acceptent className et style, ce qui les rend faciles à combiner avec votre propre mise en page et vos styles.

### Lire les pages de composants

Chaque page de composant suit la même structure :

l'instruction d'import exacte du composant. La feuille de style globale n'y est pas répétée : elle est importée une seule fois, dans le point d'entrée de l'application (voir Installation).

des démos interactives couvrant chaque fonctionnalité. Utilisez « Afficher le code » pour voir la source complète ; chaque démo est autonome et peut être copiée telle quelle. Les démos affichent le résultat sur la page avec les composants de Minerva (un toast, une boîte de dialogue ou un résultat en ligne), jamais avec les alertes du navigateur ni la console.

des tables générées à partir des types TypeScript du composant, avec le type, la valeur par défaut et la description de chaque prop.

### Conventions

#### Contrôlé et non contrôlé

Les composants de formulaire peuvent gérer leur propre état (passez defaultChecked / defaultValue, ou rien) ou être contrôlés (passez checked / value avec onChange). Ne passez pas d'un mode à l'autre pendant la vie du composant.

#### className et style

Les composants acceptent className (et généralement style) sur leur élément racine. Ceux qui enveloppent un élément natif, comme Button, transmettent aussi les attributs natifs (type, name, data-*, aria-*...).

#### Noms accessibles

Lorsqu'un contrôle n'a pas de texte visible (bouton icône, bouton de recherche, icône de fermeture...), donnez-lui un nom accessible avec la prop aria-label. Elle est transmise à l’élément interactif.

### Navigateurs pris en charge

Minerva cible les navigateurs modernes à jour : Chrome et Edge 111+, Firefox 113+ et Safari 16.2+. Le thème repose sur les propriétés personnalisées CSS et color-mix() ; Internet Explorer n'est pas pris en charge. Le rendu côté serveur fonctionne : le thème est appliqué côté client une fois React monté.

### Contribuer

Minerva est open source sous licence MIT. Les rapports de bugs, idées et pull requests sont les bienvenus sur GitHub :

```tsx
import { useState } from "react";
import { Switch } from "minerva-design";

// Uncontrolled: the component keeps its own state
<Switch label="Wi-Fi" defaultChecked />;

// Controlled: you own the state and update it in onChange
function Controlled() {
  const [on, setOn] = useState(false);
  return <Switch label="Bluetooth" checked={on} onChange={setOn} />;
}
```

```tsx
import { Button, IconButton } from "minerva-design";
import { IoTrashOutline } from "react-icons/io5";

<Button className="my-button" style={{ minWidth: 120 }} type="submit">
  Save
</Button>;

// icon-only controls need an accessible name
<IconButton icon={<IoTrashOutline />} aria-label="Delete item" />;
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
