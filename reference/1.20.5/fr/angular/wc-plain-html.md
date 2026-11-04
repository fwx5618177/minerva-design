# HTML simple

Une page complète sans étape de build : le bundle CDN, les design tokens, <minerva-config>, un formulaire validé et des écouteurs d'événements. Des import maps pour les modules par élément.

Package: minerva-design@1.20.5

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

### Une page complète

Deux balises dans le  suffisent : la feuille de style des design tokens et le bundle de modules autonome (tous les éléments, Lit et minerva-design/core). Copiez ce fichier et ouvrez-le dans un navigateur :

tokens.css définit les design tokens (couleurs, espacements, rayons, polices) que les éléments et votre propre CSS peuvent utiliser avec var().

 avec root applique le thème (ici, celui du système d'exploitation), la palette et la langue des textes intégrés à tout le document.

Les contrôles sont associés aux formulaires : name, required, les attributs value / checked, , les boutons type="submit" et type="reset", FormData et la validation du navigateur fonctionnent comme avec les champs natifs. L'événement submit n'est déclenché qu'une fois tous les contrôles valides.

Les événements minerva-* remontent : un seul écouteur sur le formulaire (ou sur document) reçoit donc les changements de tous les contrôles ; event.target est l'élément et event.detail contient la nouvelle valeur.

Définir une propriété depuis un script (modal.open = true) ne déclenche jamais d'événement ; le bouton de fermeture et la touche Échap ferment la modale et déclenchent minerva-open-change.

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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/minerva-design@1.20.5/dist/core/tokens.css" />
    <script type="module" src="https://cdn.jsdelivr.net/npm/minerva-design@1.20.5/dist/web-components/cdn/minerva.js"></script>
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
<script type="importmap">
  {
    "imports": {
      "minerva-design/web-components/": "https://cdn.jsdelivr.net/npm/minerva-design@1.20.5/dist/web-components/elements/",
      "lit": "https://esm.sh/lit@3",
      "lit/": "https://esm.sh/lit@3/",
      "@floating-ui/dom": "https://esm.sh/@floating-ui/dom@1",
      "dompurify": "https://esm.sh/dompurify@3",
      "jsonc-parser": "https://esm.sh/jsonc-parser@3"
    }
  }
</script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/minerva-design@1.20.5/dist/core/tokens.css" />

<script type="module">
  // only these elements (and what they render) are downloaded
  import "minerva-design/web-components/button.js";
  import "minerva-design/web-components/input.js";
</script>
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
