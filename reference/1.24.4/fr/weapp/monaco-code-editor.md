# MonacoCodeEditor

Éditeur Monaco étiqueté utilisant un moteur local (jamais de CDN) et suivant le thème de la page. Si le moteur ne se charge pas à temps, il se replie sur une zone de texte modifiable avec un bouton Réessayer. Importez-le depuis minerva-design/monaco ; @monaco-editor/react et monaco-editor sont des dépendances pairs optionnelles. Le Web Component <minerva-code-editor> est publié comme entrée optionnelle minerva-design/web-components/code-editor (hors de l'entrée tout-en-un et du bundle CDN), avec monaco-editor comme dépendance pair optionnelle.

Package: minerva-design@1.24.4

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.4",
  "sourceCommit": "580bc03aa319a78f6f653ee0f9610fe236a93d38",
  "sourceDigest": "sha256:b9a39dcfe8b09a5d0967efee074963c408a37abb72fbe1d4c7a1eda21075df1d",
  "referenceSourceDigest": "sha256:25c00e4ed9c1ea1a2744aa521b6deba862ac402384cb19f4e7d069b72a5172c6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.4/types.json) or getType() from minerva-design/contracts.

## Documentation

## CodeEditor

Support: n/a

React Native-specific extension, outside the shared web component API; use minerva-design/native for this component.

## MonacoCodeEditor

Support: n/a

Browser-only Monaco editor; no native substitute is exported as equivalent. Monaco requires browser DOM/editor workers unavailable in native mini views. JsonField and CodeBlock are separate narrower components. Unsupported on this platform.

## CSS variables

```json
{
  "css:MonacoCodeEditor": {
    "kind": "cssVars",
    "source": "react/src/components/MonacoCodeEditor",
    "vars": [
      {
        "name": "--monaco-code-editor-radius",
        "description": "Corner radius of the editor surface (defaults to --radius-md)"
      },
      {
        "name": "--monaco-code-editor-border-color",
        "description": "Border color of the editor surface"
      },
      {
        "name": "--monaco-code-editor-bg",
        "description": "Background color of the editor surface"
      },
      {
        "name": "--monaco-code-editor-label-gap",
        "description": "Space between the label and the editor"
      },
      {
        "name": "--monaco-code-editor-font-size",
        "description": "Font size of the label, the messages and the plain-text fallback"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
