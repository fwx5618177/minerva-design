# HTML simple

Une page complète sans étape de build : le bundle CDN, les design tokens, <minerva-config>, un formulaire validé et des écouteurs d'événements. Des import maps pour les modules par élément.

Package: minerva-design@1.23.1

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "a59b0af81a2f5c6e7f2de29a81878dc4a5af01f1",
  "sourceDigest": "sha256:5b7fa63ef8772ff533e1fc34d0784bfe651eb0b1be71712d0bbef057eec2b4cf",
  "referenceSourceDigest": "sha256:1019806d6e262e50fb4e804e528badf35a408ce0a47ef203c2c5d8930c0fb0f1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### Une page complète

Deux balises dans le  suffisent : la feuille de style des design tokens et le bundle de modules autonome (tous les éléments, Lit et minerva-design/core). Copiez ce fichier et ouvrez-le dans un navigateur :

tokens.css définit les design tokens (couleurs, espacements, rayons, polices) que les éléments et votre propre CSS peuvent utiliser avec var().

 avec root applique le thème (ici, celui du système d'exploitation), la palette et la langue des textes intégrés à tout le document.

Les contrôles sont associés aux formulaires : name, required, les attributs value / checked, , les boutons type="submit" et type="reset", FormData et la validation du navigateur fonctionnent comme avec les champs natifs. L'événement submit n'est déclenché qu'une fois tous les contrôles valides.

Les événements minerva-* remontent : un seul écouteur sur le formulaire (ou sur document) reçoit donc les changements de tous les contrôles ; event.target est l'élément et event.detail contient la nouvelle valeur.

Définir une propriété depuis un script (modal.open = true) ne déclenche jamais d'événement ; le bouton de fermeture et la touche Échap ferment la modale et déclenchent minerva-open-change.

### Graphiques et icônes

Les éléments de graphique et d'icône chargent un moteur (les graphiques de minerva-design/charts/core, le jeu d'icônes) : ils ne font donc pas partie de minerva.js. Chacune de ces entrées optionnelles a son propre fichier autonome dans le même dossier cdn : chart.js (graphiques cartésiens et de formes), trading-chart.js, order-book.js, chart-3d.js, graph.js, quadrant-task-board.js et icon.js. Chargez ceux qu'utilise la page en plus de minerva.js :

Sans bundler ni import map, un script module ne peut pas importer "minerva-design/web-components/chart" : le navigateur ne résout pas les spécificateurs nus et le graphique reste non défini (0 × 0). Chargez plutôt le fichier CDN avec un . Les éléments présents dans deux fichiers ne sont enregistrés qu'une fois, par le premier fichier chargé.

### Modules par élément avec une import map

Le bundle CDN contient tous les éléments. Pour ne télécharger que les éléments utilisés par une page, chargez plutôt les modules par élément du paquet (dist/elements/.js). Ce sont les fichiers qu'utilisent les bundlers, avec des imports nus de leurs dépendances, qu'une import map résout dans le navigateur :

Les modules importent lit (y compris lit/decorators.js et lit/directives/*, d'où le préfixe "lit/"), minerva-design/core (qui dépend lui-même de @floating-ui/dom) et, pour l'aperçu HTML et le champ JSON uniquement, dompurify et jsonc-parser. esm.sh résout pour vous les dépendances de ces paquets ; si vous hébergez les fichiers vous-même, mappez aussi @floating-ui/dom, @floating-ui/core et @floating-ui/utils.

En production, utilisez des versions exactes et assurez-vous que chaque module charge la même copie de lit et de minerva-design/core : mélanger le bundle CDN et les modules par élément sur une même page télécharge deux fois le code partagé, et chaque balise conserve la première définition qui l'a enregistrée.

### Étapes suivantes

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Minerva without a build step</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/minerva-design@1.23.1/dist/core/tokens.css" />
    <script type="module" src="https://cdn.jsdelivr.net/npm/minerva-design@1.23.1/dist/web-components/cdn/minerva.js"></script>
    <style>
      body {
        margin: 0;
        font-family: var(--font-family-sans);
        background: var(--background-color);
        color: var(--foreground-color);
      }
      form {
        display: grid;
        gap: var(--space-4);
        max-width: 420px;
        margin: var(--space-8) auto;
      }
      /* hide the tags until the bundle has defined them */
      :not(:defined) {
        visibility: hidden;
      }
    </style>
  </head>
  <body>
    <!-- theme, palette and language of everything inside -->
    <minerva-config theme="system" palette="cool" locale="en" root>
      <form id="signup">
        <label for="email">Email</label>
        <minerva-input id="email" name="email" type="email" required clearable></minerva-input>

        <label for="plan">Plan</label>
        <minerva-select id="plan" name="plan" value="pro" required>
          <minerva-option value="free">Free</minerva-option>
          <minerva-option value="pro">Pro</minerva-option>
          <minerva-option value="team">Team</minerva-option>
        </minerva-select>

        <minerva-checkbox name="terms" required>I accept the terms</minerva-checkbox>
        <minerva-switch name="newsletter" checked>Newsletter</minerva-switch>

        <minerva-button type="submit">Create account</minerva-button>
        <minerva-button type="reset" variant="ghost">Reset</minerva-button>
        <output id="last-change" aria-live="polite"></output>
      </form>

      <minerva-modal id="done" label="Welcome!">
        <p id="summary"></p>
        <minerva-button slot="footer" id="close">Close</minerva-button>
      </minerva-modal>
    </minerva-config>

    <script type="module">
      const form = document.querySelector("#signup");
      const modal = document.querySelector("#done");

      // custom events bubble: one listener on the form sees every control
      form.addEventListener("minerva-change", (event) => {
        document.querySelector("#last-change").textContent =
          `${event.target.name} changed`;
      });

      form.addEventListener("submit", (event) => {
        event.preventDefault(); // runs only when every control is valid
        const data = new FormData(form);
        document.querySelector("#summary").textContent =
          `${data.get("email")} — ${data.get("plan")} plan`;
        modal.open = true;
      });

      document.querySelector("#close").addEventListener("click", () => {
        modal.open = false;
      });
    </script>
  </body>
</html>
```

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/minerva-design@1.23.1/dist/core/tokens.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/minerva-design@1.23.1/dist/web-components/cdn/minerva.js"></script>
<!-- the chart elements and their engine (not part of minerva.js) -->
<script type="module" src="https://cdn.jsdelivr.net/npm/minerva-design@1.23.1/dist/web-components/cdn/chart.js"></script>

<minerva-config theme="system" root>
  <minerva-chart id="sales" height="300"></minerva-chart>
</minerva-config>

<script type="module">
  // the data is the options property (no attribute)
  document.querySelector("#sales").options = {
    series: [
      { name: "Revenue", type: "bar", data: [42, 51, 48, 63, 72, 80] },
      { name: "Target", type: "line", curve: "smooth", data: [45, 50, 55, 60, 65, 70] },
    ],
    xAxis: { type: "category", categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
  };
</script>
```

```html
<script type="importmap">
  {
    "imports": {
      "minerva-design/web-components/": "https://cdn.jsdelivr.net/npm/minerva-design@1.23.1/dist/web-components/elements/",
      "lit": "https://esm.sh/lit@3",
      "lit/": "https://esm.sh/lit@3/",
      "@floating-ui/dom": "https://esm.sh/@floating-ui/dom@1",
      "dompurify": "https://esm.sh/dompurify@3",
      "jsonc-parser": "https://esm.sh/jsonc-parser@3"
    }
  }
</script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/minerva-design@1.23.1/dist/core/tokens.css" />

<script type="module">
  // only these elements (and what they render) are downloaded
  import "minerva-design/web-components/button.js";
  import "minerva-design/web-components/input.js";
</script>
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
