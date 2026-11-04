# Angular

Composants Angular standalone natifs, signals et Angular Forms depuis minerva-design/angular.

Package: minerva-design@1.20.5

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

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
