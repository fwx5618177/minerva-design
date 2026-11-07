# Jauge

Une seule valeur sur un arc, par rapport à une plage et à des seuils colorés facultatifs : KPI, taux d’utilisation, scores. Quand value change, l’arc (et l’aiguille) s’animent depuis leur position actuelle.

Package: minerva-design@1.22.3

Renderer: wc

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/gauge-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "number",
    "attribute": "value",
    "required": false
  },
  {
    "name": "min",
    "typeText": "number",
    "attribute": "min",
    "required": false
  },
  {
    "name": "max",
    "typeText": "number",
    "attribute": "max",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "attribute": "label",
    "required": false
  },
  {
    "name": "needle",
    "typeText": "boolean",
    "attribute": "needle",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "bands",
    "typeText": "readonly GaugeBand[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<GaugeChartOptions, \"type\">> | undefined",
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

## Example: Plages colorées

Trois plages découpent la piste ; l'arc de valeur prend la couleur de la plage où il se termine.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/gauge-chart/wc/bands.html

```html
<minerva-gauge-chart id="cpu" value="72"></minerva-gauge-chart>

```

### apps/docs/src/docs/pages/gauge-chart/wc/bands.ts

```tsx
// Colored bands split the track; the value arc takes the color of its band.
import type { MinervaGaugeChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: "CPU load",
  zh: "CPU 负载",
  ja: "CPU 負荷",
  fr: "Charge CPU",
};

export function setup(root: HTMLElement) {
  const gauge = root.querySelector<MinervaGaugeChart>("#cpu")!;
  gauge.label =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  gauge.bands = [
    { to: 60, color: "var(--success-color, #16a34a)" },
    { to: 85, color: "var(--warning-color, #f59e0b)" },
    { to: 100, color: "var(--danger-color, #dc2626)" },
  ];
  gauge.options = { format: (value) => `${value}%` };
}

```

## Example: Aiguille et échelle personnalisée

Une aiguille sur une échelle de 0 à 200, avec un balayage plus large et un arc plus fin.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/gauge-chart/wc/needle.html

```html
<minerva-gauge-chart
  id="speed"
  value="128"
  max="200"
  needle
  height="260"
></minerva-gauge-chart>

```

### apps/docs/src/docs/pages/gauge-chart/wc/needle.ts

```tsx
// `needle` adds a pointer to the arc; `min` / `max` set the scale and the
// options a wider sweep and thinner arc.
import type { MinervaGaugeChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: "Speed (km/h)",
  zh: "速度（公里/小时）",
  ja: "速度（km/h）",
  fr: "Vitesse (km/h)",
};

export function setup(root: HTMLElement) {
  const gauge = root.querySelector<MinervaGaugeChart>("#speed")!;
  gauge.label =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  gauge.options = { sweep: 270, thickness: 0.1 };
}

```
