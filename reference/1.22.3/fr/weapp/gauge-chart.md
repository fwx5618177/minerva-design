# Jauge

Une seule valeur sur un arc, par rapport à une plage et à des seuils colorés facultatifs : KPI, taux d’utilisation, scores. Quand value change, l’arc (et l’aiguille) s’animent depuis leur position actuelle.

Package: minerva-design@1.22.3

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "29f678e6c83b155a4b25bb6ba161bd1343a30a05",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:0412dc239078e986227cd3204e2571665b3114a1b01c61132429483ed5a82f88"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Processeur

Mémoire

Disque

Utilisation : {{metric}}

Net Promoter Score

Requêtes / s

Requêtes par seconde, mises à jour en direct

Mettre en pause

Reprendre

Vitesse

Compteur de vitesse : {{speed}}

Freiner

Accélérer

Stockage

Appels d'API

Postes

Minutes de build

{{used}} sur {{limit}}

{{quota}} : {{share}} du quota utilisé

Disponibilité, 30 jours

Objectif : {{value}}

Disponibilité sur 30 jours face à l'objectif

Budget d'erreur restant

{{used}} d'indisponibilité sur {{budget}} autorisées

Budget d'erreur restant ce mois-ci

Unité de température

°C

°F

consigne

Pièce : {{value}}

Température de consigne du thermostat

Baisser la consigne

Augmenter la consigne

Chauffe jusqu’à {{target}} (pièce : {{room}})

Refroidit jusqu’à {{target}} (pièce : {{room}})

Maintient {{target}} (pièce : {{room}})

Demandeur

score de crédit

Faible

Passable

Bon

Très bon

Exceptionnel

À {{share}} de l’échelle

Score de crédit de {{name}}

{{name}} : {{score}}. {{advice}}

La plupart des prêteurs refuseront la demande.

Un accord est possible, à un taux plus élevé.

Éligible à la plupart des prêts aux taux standards.

Éligible à des taux meilleurs que la moyenne.

Éligible aux meilleurs taux proposés.

chargée

Autonomie : {{range}}

Charge de la batterie de la voiture

Branchée

Réinitialiser

Charge complète

Débranchée

Charge rapide

Charge lente au-delà de 80 %

80 % dans {{minutes}}

{{value}} tr/min

{{value}} MW

Panneau sombre

Vitesse du rotor

Puissance produite

Température de la nacelle

{{reading}} de l’éolienne : {{value}}

## GaugeChart

Support: beta

Gauge: value arc on a track, min / max, sweep, thickness, colored bands, needle, end / band ticks; animates to new values. Same as PieChart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/gauge-chart/index",
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
    "name": "value",
    "typeText": "number",
    "required": false,
    "default": 0
  },
  {
    "name": "min",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "max",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "sweep",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "thickness",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "bands",
    "typeText": "array",
    "required": false
  },
  {
    "name": "color",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "needle",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "ticks",
    "typeText": "unknown",
    "required": false,
    "default": null
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
