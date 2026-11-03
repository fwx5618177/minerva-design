# Graphique circulaire / anneau

Les parts d’un tout : camembert, anneau (avec le total au centre) et rose de Nightingale. À utiliser pour quelques catégories (8 au plus, idéalement) quand les proportions comptent plus que les comparaisons exactes. Survolez une part ou utilisez les flèches pour la mettre en évidence, Échap pour effacer ; un clic sur la légende masque une part.

Package: minerva-design@1.20.1

Renderer: wc

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

Recherche naturelle

Accès direct

Réseaux sociaux

Publicité payante

Sites référents

E-mail

{{sessions}} sessions · {{share}}

Sessions du site par source de trafic, 30 derniers jours

{{source}} : {{sessions}} sessions ({{share}} du trafic)

Cliquez sur une part (ou placez le focus sur le graphique et appuyez sur Entrée) pour choisir une source

Entreprise

Business

Pro

Essentiel

Revenu mensuel

Revenu mensuel récurrent par offre

E-mail

Chat en direct

Formulaire web

Téléphone

Réseaux sociaux

Communauté

Position des libellés

À l'extérieur

À l'intérieur

Aucun

Contenu des libellés

Nom

Valeur

Pourcentage

{{tickets}} tickets · {{share}}

Tickets de support par canal

Précipitations mensuelles moyennes

Autres

Unités livrées

{{units}} unités · {{share}}

Parts de marché des smartphones par fabricant

Logement

Alimentation

Transport

Loisirs

Loyer

Énergie

Assurance

Courses

Restaurants

Transports en commun

Voiture

Voyages

Abonnements

Sport

Budget mensuel par poste

Budget mensuel par catégorie

{{name}} : {{amount}} ({{share}})

Survolez un anneau pour lire une catégorie ou un poste

Asie-Pacifique

Europe

Amérique du Nord

Amérique latine

Mobile

Ordinateur

Tablette

Sessions par appareil : {{region}}

Actions américaines

Actions internationales

Obligations

Immobilier

Matières premières

Liquidités

Classes d’actifs affichées

Tout afficher

sélection

valeur totale

{{share}} du portefeuille

Portefeuille d’investissement par classe d’actifs

{{shown}} classes d’actifs sur {{total}} affichées : {{value}}, soit {{share}} du portefeuille.

Mode sombre

Mode hors ligne

API publique

Plus d’intégrations

Rapports personnalisés

Quelle fonctionnalité développer ensuite ?

votes

{{votes}} votes · {{share}}

Résultats du sondage en direct par réponse

Pause

Reprendre

Réinitialiser

En tête : {{answer}}

Calcul

Bases de données

Stockage

Réseau

Machines virtuelles

Kubernetes

Fonctions serverless

Bases SQL

Bases NoSQL

Cache en mémoire

Stockage objet

Stockage bloc

Sauvegardes

Transfert de données

CDN

Répartiteurs de charge

Facture cloud

Toutes les catégories

Cliquez pour voir ses services

Coûts de la catégorie {{category}} par service

Facture cloud mensuelle par catégorie

{{service}} : {{amount}}, soit {{share}} de {{category}}.

{{category}} : {{amount}}, soit {{share}} de la facture. Cliquez sur un service pour voir sa part.

Facture du mois : {{total}}. Cliquez sur une catégorie pour voir ses services.

Très insatisfait

Insatisfait

Neutre

Satisfait

Très satisfait

T{{n}}

Trimestre

CSAT

{{answers}} réponses · {{share}}

Réponses de satisfaction client au {{quarter}}

CSAT de {{csat}} sur {{respondents}} répondants.

CSAT de {{csat}}, {{delta}} points depuis le {{previous}}, sur {{respondents}} répondants.

## DonutChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/donut-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "innerRadius",
    "typeText": "number",
    "attribute": "inner-radius",
    "required": false
  },
  {
    "name": "rose",
    "typeText": "boolean",
    "attribute": "rose",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "\"outside\" | \"inside\" | \"none\" | undefined",
    "attribute": "labels",
    "required": false
  },
  {
    "name": "centerValue",
    "typeText": "string | undefined",
    "attribute": "center-value",
    "required": false
  },
  {
    "name": "centerLabel",
    "typeText": "string | undefined",
    "attribute": "center-label",
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
    "typeText": "Partial<Omit<PieChartOptions, \"type\">> | undefined",
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

## PieChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/pie-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "innerRadius",
    "typeText": "number",
    "attribute": "inner-radius",
    "required": false
  },
  {
    "name": "rose",
    "typeText": "boolean",
    "attribute": "rose",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "\"outside\" | \"inside\" | \"none\" | undefined",
    "attribute": "labels",
    "required": false
  },
  {
    "name": "centerValue",
    "typeText": "string | undefined",
    "attribute": "center-value",
    "required": false
  },
  {
    "name": "centerLabel",
    "typeText": "string | undefined",
    "attribute": "center-label",
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
    "typeText": "Partial<Omit<PieChartOptions, \"type\">> | undefined",
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

## Example: Anneau avec textes centraux

Le graphique en anneau affiche le total en son centre ; un clic sur une part indique son nom et sa valeur.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/pie-chart/wc/donut.html

```html
<div style="display: grid; gap: 8px">
  <minerva-donut-chart id="plans" height="300"></minerva-donut-chart>
  <output id="plan" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/pie-chart/wc/donut.ts

```tsx
// <minerva-donut-chart>: a pie with a hole and center texts;
// minerva-click reports the clicked slice.
import type {
  MinervaDonutChart,
  ShapeHoverEvent,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    total: "monthly revenue",
    hint: "Click a slice",
    plans: ["Free", "Starter", "Pro", "Enterprise"],
  },
  zh: {
    total: "月收入",
    hint: "点击一个扇区",
    plans: ["免费版", "入门版", "专业版", "企业版"],
  },
  ja: {
    total: "月間売上",
    hint: "スライスをクリックします",
    plans: ["無料", "スターター", "プロ", "エンタープライズ"],
  },
  fr: {
    total: "revenu mensuel",
    hint: "Cliquez sur une part",
    plans: ["Gratuit", "Starter", "Pro", "Entreprise"],
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaDonutChart>("#plans")!;
  const plan = root.querySelector<HTMLOutputElement>("#plan")!;
  chart.data = [2, 18, 46, 34].map((value, i) => ({
    name: text.plans[i],
    value,
  }));
  chart.centerValue = "€100k";
  chart.centerLabel = text.total;
  chart.options = { format: (value) => `€${value}k` };
  plan.textContent = text.hint;
  const onClick = (event: Event) => {
    const slice = (event as CustomEvent<ShapeHoverEvent>).detail;
    plan.textContent = `${slice.name}: €${slice.value}k`;
  };
  chart.addEventListener("minerva-click", onClick);
  return () => chart.removeEventListener("minerva-click", onClick);
}

```

## Example: Sources de trafic

Des parts avec étiquettes extérieures (nom et part) ; un clic sur la légende masque ou affiche la part.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/pie-chart/wc/pie.html

```html
<minerva-pie-chart id="sources" height="300"></minerva-pie-chart>

```

### apps/docs/src/docs/pages/pie-chart/wc/pie.ts

```tsx
// Slices are { name, value }; outside labels show the name and the share,
// legend clicks hide / show a slice.
import type { MinervaPieChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: ["Search", "Direct", "Social", "Email", "Referral"],
  zh: ["搜索", "直接访问", "社交媒体", "邮件", "推荐"],
  ja: ["検索", "ダイレクト", "ソーシャル", "メール", "参照元"],
  fr: ["Recherche", "Direct", "Réseaux sociaux", "E-mail", "Référents"],
};

export function setup(root: HTMLElement) {
  const names =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaPieChart>("#sources")!;
  chart.data = [1048, 735, 580, 484, 300].map((value, i) => ({
    name: names[i],
    value,
  }));
}

```
