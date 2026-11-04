# Angular

Composants Angular standalone natifs, signals et Angular Forms depuis minerva-design/angular.

Package: minerva-design@1.20.4

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

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
