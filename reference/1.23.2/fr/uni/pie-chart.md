# Graphique circulaire / anneau

Les parts d’un tout : camembert, anneau (avec le total au centre) et rose de Nightingale. À utiliser pour quelques catégories (8 au plus, idéalement) quand les proportions comptent plus que les comparaisons exactes. Survolez une part ou utilisez les flèches pour la mettre en évidence, Échap pour effacer ; un clic sur la légende masque une part.

Package: minerva-design@1.23.2

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "6c540b5293a3b5d4cb8d1c38c6d3c462f6e8d1b1",
  "sourceDigest": "sha256:96e12a2f39f4691c9ba257d9f8247a4fd810c72b772e3da161b9f71eb1e5795d",
  "referenceSourceDigest": "sha256:de9407f9acf37f670db2dc646bbdcb8b05067fae0b4c7fd4ec79011e933f6519"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

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

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "DonutChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "animation",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "width",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "required": false
  },
  {
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "rose",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "\"none\" | \"inside\" | \"outside\" | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false
  },
  {
    "name": "data",
    "typeText": "readonly ShapeDatum[]",
    "required": true
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "format",
    "typeText": "((value: number) => string) | undefined",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "innerRadius",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "startAngle",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "padAngle",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "cornerRadius",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "labelContent",
    "typeText": "readonly (\"value\" | \"name\" | \"percent\")[] | undefined",
    "required": false
  },
  {
    "name": "centerValue",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "centerLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false
  },
  {
    "name": "hidden",
    "typeText": "readonly number[] | undefined",
    "required": false
  },
  {
    "name": "texts",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "click",
    "typeText": "[event: ShapeHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "[event: ShapeHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "toggle",
    "typeText": "[event: ShapeToggleEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## PieChart

Support: beta

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "PieChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "animation",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "width",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "required": false
  },
  {
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "rose",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "\"none\" | \"inside\" | \"outside\" | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false
  },
  {
    "name": "data",
    "typeText": "readonly ShapeDatum[]",
    "required": true
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "format",
    "typeText": "((value: number) => string) | undefined",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "innerRadius",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "startAngle",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "padAngle",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "cornerRadius",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "labelContent",
    "typeText": "readonly (\"value\" | \"name\" | \"percent\")[] | undefined",
    "required": false
  },
  {
    "name": "centerValue",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "centerLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false
  },
  {
    "name": "hidden",
    "typeText": "readonly number[] | undefined",
    "required": false
  },
  {
    "name": "texts",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "click",
    "typeText": "[event: ShapeHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "[event: ShapeHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "toggle",
    "typeText": "[event: ShapeToggleEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
