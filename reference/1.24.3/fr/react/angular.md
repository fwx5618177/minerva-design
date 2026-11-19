# Angular

Composants Angular standalone natifs, signals et Angular Forms depuis minerva-design/angular.

Package: minerva-design@1.24.3

Renderer: react

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.3",
  "sourceCommit": "bbcef3f0abff568d08e734ec3e117c8cd10b017e",
  "sourceDigest": "sha256:94a5fd0119213e1760835190bfd5a8871f02c56d20091b654fc378ab0e0e6331",
  "referenceSourceDigest": "sha256:aa4b50ed4e7a53906ab6f39a3da2bbb4024583714e780e0cf99a262437a2babd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.3/types.json) or getType() from minerva-design/contracts.

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
