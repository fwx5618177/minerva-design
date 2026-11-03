# Entonnoir

Les étapes d’un processus qui perd du volume en chemin (inscriptions, pipeline commercial, paiement), avec le taux de conversion d’une étape à la suivante. Survolez ou utilisez les flèches pour mettre une étape en évidence ; un clic sur la légende la masque.

Package: minerva-design@1.19.3

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:c2b9c6e66069aa1acd454efc20d52cde92c1a1c820c1b3ab5302d01929cb4c39"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Page des tarifs

Inscription commencée

E-mail vérifié

Projet créé

Collègue invité

Passage à l'offre payante

{{users}} utilisateurs

{{share}} des visiteurs

{{users}} perdus depuis « {{stage}} »

Entonnoir d'inscription

Alertes

Tableaux de bord

Intégrations

Rapports

API publique

Ordre de tri

Décroissant

Croissant

Ordre des données

{{users}} utilisateurs par semaine

Utilisateurs actifs hebdomadaires par fonctionnalité

Visites

Fiche produit

Ajout au panier

Commande

Paiement

Commande validée

Étape

Visiteurs

Abandon

{{share}} de la première étape

Tunnel de commande d'une boutique en ligne

Abandon entre les étapes

Candidature

Présélection

Entretien technique

Entretien sur site

Offre

Embauche

{{candidates}} candidats

Durée habituelle de l'étape : {{days}}

Processus de recrutement d'un poste d'ingénieur

{{stage}} : {{candidates}} candidats ({{share}} des candidatures)

{{rate}} des candidats sont embauchés, en {{days}} en moyenne

Ordinateur

Mobile

{{rate}} de conversion

Tunnel de commande : {{device}}

Impressions

Clics

Prospects

Prospects qualifiés

Clients

Tous les canaux

Annonces de recherche

Réseaux sociaux

E-mail

Partenaires

Canal

{{share}} de l’étape précédente

Coût par résultat : {{cost}}

Entonnoir marketing du mois : {{channel}}

Dépenses : {{spend}} · Clients : {{customers}} · Coût d’acquisition : {{cac}} par client

Visites

Ajouts au panier

Paiement

Commandes payées

Entonnoir de paiement mensuel calculé à partir des taux de conversion

{{from}} → {{to}}

Baisser la conversion de {{step}}

Augmenter la conversion de {{step}}

Revenir aux taux actuels

{{orders}} commandes ({{ordersDelta}}) · {{revenue}} de chiffre d’affaires ({{revenueDelta}}) par mois

Visiteurs

Offre consultée

Ajouts au panier

Paiement

Commandes

Entonnoir de la vente flash, mis à jour en direct

Pause

Reprendre

Recommencer

{{time}} · {{orders}} commandes · {{rate}} des visiteurs

La vente est terminée : {{orders}} commandes.

Prospect

Qualifié

Démo

Proposition

Négociation

{{deals}} affaires · {{amount}}

Probabilité de gain : {{share}}

Affaires en cours par étape du pipeline, en montant

{{stage}} : {{deals}} affaires en cours

Prévision pondérée : {{amount}}

Cliquez sur une étape pour lister ses affaires.

## FunnelChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/funnel-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "sort",
    "typeText": "\"descending\" | \"ascending\" | \"none\"",
    "attribute": "sort",
    "required": false
  },
  {
    "name": "shape",
    "typeText": "\"trapezoid\" | \"bar\"",
    "attribute": "shape",
    "required": false
  },
  {
    "name": "hideConversion",
    "typeText": "boolean",
    "attribute": "hide-conversion",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "data",
    "typeText": "readonly ShapeDatum[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<FunnelChartOptions, \"type\">> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-hover",
    "typeText": "CustomEvent",
    "description": "The hovered (or keyboard-focused) mark changed; detail: { index, name, value, share }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-click",
    "typeText": "CustomEvent",
    "description": "A mark was clicked, tapped or activated with Enter; detail: { index, name, value, share }"
  },
  {
    "name": "minerva-toggle",
    "typeText": "CustomEvent",
    "description": "A legend item was clicked (or `toggle()` called); detail: { index, hidden, hiddenIndexes }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Barres triées

Des barres centrées au lieu de trapèzes, avec les étapes triées par valeur.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/funnel-chart/wc/bars.html

```html
<minerva-funnel-chart
  id="hiring"
  shape="bar"
  sort="descending"
  height="300"
></minerva-funnel-chart>

```

### apps/docs/src/docs/pages/funnel-chart/wc/bars.ts

```tsx
// `shape="bar"` draws centered bars, `sort="descending"` orders the stages
// by value.
import type { MinervaFunnelChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: ["Interviews", "Applications", "Offers", "Screenings", "Hires"],
  zh: ["面试", "申请", "录用通知", "筛选", "入职"],
  ja: ["面接", "応募", "内定", "書類選考", "採用"],
  fr: ["Entretiens", "Candidatures", "Offres", "Présélections", "Embauches"],
};

export function setup(root: HTMLElement) {
  const stages =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaFunnelChart>("#hiring")!;
  chart.data = [180, 940, 42, 410, 31].map((value, i) => ({
    name: stages[i],
    value,
  }));
}

```

## Example: Entonnoir de conversion

Des étapes qui se resserrent vers la suivante, chacune avec son taux de conversion depuis l'étape précédente.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/funnel-chart/wc/conversion.html

```html
<minerva-funnel-chart id="signup" height="300"></minerva-funnel-chart>

```

### apps/docs/src/docs/pages/funnel-chart/wc/conversion.ts

```tsx
// Stages narrow to the next one; the labels show the conversion rate from
// the previous stage.
import type { MinervaFunnelChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: ["Visits", "Sign-ups", "Trials", "Purchases"],
  zh: ["访问", "注册", "试用", "购买"],
  ja: ["訪問", "登録", "トライアル", "購入"],
  fr: ["Visites", "Inscriptions", "Essais", "Achats"],
};

export function setup(root: HTMLElement) {
  const stages =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaFunnelChart>("#signup")!;
  chart.data = [12000, 4800, 2100, 860].map((value, i) => ({
    name: stages[i],
    value,
  }));
}

```
