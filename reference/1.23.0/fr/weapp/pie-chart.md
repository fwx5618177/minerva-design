# Graphique circulaire / anneau

Les parts d’un tout : camembert, anneau (avec le total au centre) et rose de Nightingale. À utiliser pour quelques catégories (8 au plus, idéalement) quand les proportions comptent plus que les comparaisons exactes. Survolez une part ou utilisez les flèches pour la mettre en évidence, Échap pour effacer ; un clic sur la légende masque une part.

Package: minerva-design@1.23.0

Renderer: weapp

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

Support: beta

PieChart with a hole (innerRadius 0.62) and centerValue / centerLabel. Same as PieChart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/donut-chart/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": "100%"
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "palette",
    "typeText": "array",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "tooltip",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "hidden",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "animation",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padding",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "locale",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "texts",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "data",
    "typeText": "array",
    "required": false
  },
  {
    "name": "innerRadius",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "startAngle",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padAngle",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "cornerRadius",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "rose",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "labels",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "labelContent",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "centerValue",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "centerLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "NativeShapeHoverEvent",
    "description": "Highlighted mark after a tap (index -1 when cleared)."
  },
  {
    "name": "click",
    "typeText": "NativeShapeHoverEvent",
    "description": "A mark was tapped."
  },
  {
    "name": "toggle",
    "typeText": "{ index: number; hidden: boolean; hiddenIndexes: number[] }",
    "description": "A legend item was tapped (or toggle() called); controlled charts must publish hiddenIndexes through hidden."
  },
  {
    "name": "drill",
    "typeText": "{ path: string[] }",
    "description": "Sunburst: a parent or the center was tapped (or drill() called); controlled charts must publish path through drillPath."
  }
]
```

## PieChart

Support: beta

Pie / rose chart on a <canvas type="2d"> (DOM-free shape engine): slices with gaps and corners, outside / inside labels, legend with tap-to-toggle (hidden for controlled visibility), canvas tooltip, tap highlight with pop-out, entry and update animations, Minerva theme tokens from the nearest provider. Properties are serialized by setData (JSON data only); function options (format, percentFormat, tooltip text) use configure(). Tooltips are canvas text (no renderTooltip node); no keyboard navigation. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/pie-chart/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": "100%"
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "palette",
    "typeText": "array",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "tooltip",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "hidden",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "animation",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padding",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "locale",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "texts",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "data",
    "typeText": "array",
    "required": false
  },
  {
    "name": "innerRadius",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "startAngle",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padAngle",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "cornerRadius",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "rose",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "labels",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "labelContent",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "centerValue",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "centerLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "NativeShapeHoverEvent",
    "description": "Highlighted mark after a tap (index -1 when cleared)."
  },
  {
    "name": "click",
    "typeText": "NativeShapeHoverEvent",
    "description": "A mark was tapped."
  },
  {
    "name": "toggle",
    "typeText": "{ index: number; hidden: boolean; hiddenIndexes: number[] }",
    "description": "A legend item was tapped (or toggle() called); controlled charts must publish hiddenIndexes through hidden."
  },
  {
    "name": "drill",
    "typeText": "{ path: string[] }",
    "description": "Sunburst: a parent or the center was tapped (or drill() called); controlled charts must publish path through drillPath."
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
