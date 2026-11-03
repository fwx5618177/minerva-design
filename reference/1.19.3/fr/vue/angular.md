# Angular

Composants Angular standalone natifs, signals et Angular Forms depuis minerva-design/angular.

Package: minerva-design@1.19.3

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Le paquet Angular natif est disponible. Consultez la matrice pour les composants implémentés et les différences entre plateformes.

Plateformes prises en charge

### Installation

Installez minerva-design et les versions Angular déclarées comme peers. Chargez la feuille de style partagée une fois et configurez thème et langue avec provideMinerva.

### Signals et imports natifs

Importez directement les composants et directives standalone. MnButton enrichit un bouton natif ; MnInput et MnUpload exposent des modèles value typés. CUSTOM_ELEMENTS_SCHEMA est inutile.

### Angular Forms

Les champs et le composant Upload intègrent ControlValueAccessor. Utilisez directement ReactiveFormsModule ou FormsModule, sans directive supplémentaire. Les états disabled et touched et les valeurs sont synchronisés avec le formulaire.

Upload sélectionne et valide les fichiers locaux. L’application gère le transfert réseau : écoutez filesSelected et mettez à jour le statut des UploadItem.

Les onglets Angular des composants présentent actuellement l’intégration Web Components. Cette page contient du code source natif, pas des aperçus Angular interactifs.

Web Components dans Angular

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
