# Thèmes des Web Components

Design tokens, thèmes, palettes et presets de design avec <minerva-config> ou de simples attributs, portées imbriquées, variables CSS par composant, ::part() et langues.

Package: minerva-design@1.23.0

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### Design tokens

Chaque élément lit les design tokens (couleurs, espacements, rayons, ombres, polices, hauteurs de contrôle) sous forme de propriétés personnalisées CSS, qui sont héritées dans les shadow roots. Chargez tokens.css une fois : il définit le thème clair sur :root et les règles qui changent les tokens selon les attributs ci-dessous. C'est le même fichier que minerva-design/tokens.css, et il est inclus dans minerva-design/style.css : React et Web Components partagent ainsi un seul thème sur une même page.

### Attributs de thème

Les thèmes sont des attributs, lus par tokens.css : data-theme (light ou dark), data-palette, data-density, data-radius, data-shadow et data-font-scale. Sur , ils ne nécessitent aucun script, ce qui les rend aussi faciles à rendre côté serveur :

Sous , ajoutez aussi data-minerva-theme-scope à l'élément qui porte les attributs : les tokens dérivés (nuances de survol, atténuées et de bordure, anneau de focus...) sont calculés là où les couleurs de base sont déclarées, et cet attribut fait recalculer la portée.  s'en charge pour vous.

### <minerva-config>

 est l'équivalent Web Component de ConfigProvider. Il s'affiche en display: contents et écrit les attributs de thème sur lui-même (une portée pour son contenu) ou, avec root, sur . Les portées s'imbriquent, la plus proche l'emporte :

Attribut

Valeurs

Clair, sombre, celui du système d'exploitation, ou le thème github-dark. Non défini : hérité de la portée englobante.

Palette de couleurs, avec une variante claire et une variante sombre.

Preset de design : définit ensemble la densité, les rayons, les ombres et l'échelle typographique (ainsi que sa palette, sauf si palette est défini).

Espacements et hauteurs de contrôle ; remplace le preset.

Échelle des rayons d'angle ; remplace le preset.

Ombres d'élévation ; remplace le preset.

Échelle typographique ; remplace le preset.

Langue des textes intégrés (boutons de fermeture, états vides, messages de validation...) des éléments contenus.

Applique tout à  (toute la page, avec lang) au lieu du sous-arbre de l'élément.

minerva-theme-change est déclenché lorsque le mode clair / sombre résolu change (y compris lorsque le système d'exploitation bascule avec theme="system") ; resolvedMode renvoie le mode courant :

### Mode sombre

theme="system" suit prefers-color-scheme et se met à jour en direct. Pour laisser l'utilisateur choisir, définissez theme sur light, dark ou system depuis votre propre contrôle et conservez son choix. Sans , basculer data-theme="dark" sur  active le thème sombre par défaut ; pour éviter un flash du thème clair, écrivez l'attribut côté serveur ou dans un script en ligne avant le rendu de la page.

### Styler les parties internes avec ::part() et :state()

Les éléments exposent leurs parties internes clés sous forme de parts CSS (root, label, content, overlay, list, item, input, control...) et leurs états sous forme d'états personnalisés (:state(open), :state(disabled), :state(size-small)...) : les mêmes noms que les hooks data-part et data-* des composants React. Ils font partie de l'API publique, contrairement aux noms de classes internes. Chaque page de composant les liste dans sa section « Hooks de style » ; le vocabulaire complet est dans Styles et personnalisation.

### Les surcouches restent dans leur portée

Les fenêtres contextuelles (listes des sélecteurs, popovers, infobulles, menus) et les boîtes de dialogue sont rendues dans la shadow root de l'élément lui-même et affichées dans la top layer grâce à la Popover API, au lieu d'être déplacées à la fin du . Elles restent dans l'arbre DOM là où vous les avez écrites : elles héritent donc des tokens, de la portée de thème, de la langue et de vos variables CSS, et un overflow: hidden ou un z-index sur un ancêtre ne peut ni les rogner ni les recouvrir. Les navigateurs sans Popover API se rabattent sur un positionnement fixe.

### Langues

Les textes intégrés et les messages de validation suivent le  le plus proche, à défaut l'attribut lang le plus proche (en traversant les shadow roots), et à défaut l'anglais. L'anglais, le chinois, le japonais et le français sont pris en charge ; les balises régionales sont ramenées à leur langue (fr-CA utilise le français). Modifier lang ou locale met immédiatement à jour les éléments. Les textes qu'un élément affiche à partir d'attributs (libellés, placeholders, close-label...) sont à traduire par vos soins.

### Étapes suivantes

Thèmes intégrés, l'ensemble des design tokens et thèmes personnalisés.

Les palettes et les presets de design en détail.

```html
<link rel="stylesheet" href="/node_modules/minerva-design/dist/core/tokens.css" />
<!-- or, with a bundler -->
<script type="module">
  import "minerva-design/tokens.css";
</script>
```

```html
<!-- the attributes work on <html> (whole page) without any script -->
<html lang="fr" data-theme="dark" data-palette="cool" data-density="compact" data-radius="large">
```

```html
<minerva-config theme="system" palette="tech" design="editorial" locale="ja" root>
  <!-- root: the attributes go on <html>, for the whole page -->
</minerva-config>

<!-- nested scopes: the closest one wins -->
<minerva-config theme="light">
  <minerva-button>Light</minerva-button>

  <minerva-config theme="dark" palette="graphite" density="compact">
    <minerva-button>Dark, graphite, compact</minerva-button>
  </minerva-config>
</minerva-config>
```

```ts
const config = document.querySelector("minerva-config");
const status = document.querySelector("#theme-status");
config.addEventListener("minerva-theme-change", (event) => {
  // "light" | "dark", e.g. when the OS switches
  status.textContent = `${event.detail.mode} mode`;
});
config.resolvedMode; // the mode currently applied
```

```css
/* the same --<component>-* variables as the React components,
   on the element, any ancestor or :root */
.toolbar minerva-button {
  --button-radius: 999px;
  --button-padding-x: 20px;
}

minerva-input {
  --input-radius: 6px;
}

/* theme tokens for one area: data-minerva-theme-scope recomputes the
   derived tokens (hover, subtle, focus ring...) from the new base colors */
.brand {
  --primary-color: #7c3aed;
}
```

```html
<section class="brand" data-minerva-theme-scope>
  <minerva-button>Violet</minerva-button>
</section>
```

```css
/* ::part() reaches the parts an element exposes, :state() its states
   (both listed in the "Styling hooks" section of each component page) */
minerva-select::part(content) {
  max-height: 240px;
}

minerva-modal:state(open)::part(overlay) {
  backdrop-filter: blur(4px);
}

minerva-tabs:state(variant-pills)::part(list) {
  gap: var(--space-1);
}

minerva-button:state(loading)::part(label) {
  opacity: 0.6;
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
