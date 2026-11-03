# Angular

Composants Angular standalone natifs, signals et Angular Forms depuis minerva-design/angular.

Package: minerva-design@1.20.1

Renderer: native

Locale: fr

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
