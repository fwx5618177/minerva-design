# Calendrier thermique

Des valeurs quotidiennes sur un calendrier, comme les graphiques de contributions : commits, séries d'apprentissage, entraînements, commandes. Chaque jour est une case colorée selon son niveau ; les noms des mois et des jours, les dates de l'infobulle et le premier jour de la semaine suivent la locale. La légende masque / affiche les niveaux ; les flèches se déplacent par jour et par semaine, et l'infobulle indique la date.

Package: minerva-design@1.22.2

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

{{total}} commits sur la dernière année

Commits par jour sur la dernière année

{{date}} : {{value}} commits

Cliquez sur un jour (ou donnez le focus au graphique, déplacez-vous avec les flèches et appuyez sur Entrée) pour le sélectionner

{{value}} min

Série en cours : {{current}} jours · plus longue série : {{longest}} jours

Minutes de pratique d'une langue par jour en 2026

{{date}} : {{value}} de pratique

{{date}} : pas de pratique

Cliquez sur un jour pour voir son temps de pratique

{{value}} km

Distance de course par jour de 2024 à 2026

{{year}} : {{value}}

Premier jour de la semaine

Selon la locale

Commandes en ligne par jour en 2026, par mois

Locale

Déploiements par jour au premier semestre 2026

{{value}} kWh

Forte consommation seulement

Tout afficher

Électricité consommée par jour en 2025

{{days}} jours affichés, {{value}} au total ({{share}} de l'année)

Aucun relevé

{{value}} par rapport à l'objectif de {{goal}}

{{average}} par nuit en moyenne · objectif de {{goal}} atteint {{reached}} nuits sur {{nights}}

Heures de sommeil par nuit de mai à octobre 2026

Année

{{year}} : {{total}} incidents, {{quiet}} jours sans incident

{{value}} incidents

Incidents de production par jour en {{year}}

{{date}} : {{value}} incidents

{{date}} : aucun incident

{{date}} : à venir

Survolez un jour pour voir ses incidents

{{done}} entraînements ({{share}} des jours) · série en cours : {{streak}} jours

Réinitialiser

Fait

Pas fait

Entraînements notés par jour d'août à octobre 2026

{{date}} marqué comme fait

{{date}} marqué comme pas fait

Cliquez sur un jour (ou appuyez sur Entrée dessus) pour noter ou retirer un entraînement

## CalendarHeatmap

Support: beta

Native Angular: MnCalendarHeatmap. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnCalendarHeatmap"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "typeText": "readonly CalendarDatum[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "range",
    "typeText": "number | readonly [CalendarDate, CalendarDate] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "layout",
    "typeText": "\"weeks\" | \"months\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "weekStart",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "colors",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "levels",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "thresholds",
    "typeText": "readonly number[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Contributions sur un an

Sans range, le graphique montre les 53 semaines qui se terminent au dernier jour des données. color fixe la couleur du niveau le plus haut (les niveaux inférieurs sont plus clairs, en thème clair comme sombre) ; onClick renvoie le jour, avec sa date formatée dans name et sa date AAAA-MM-JJ dans date.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCalendarHeatmap, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCalendarHeatmap],
  template: `
@let t = labels[language()];
<mn-calendar-heatmap [data]="days" [range]="2025" [locale]="t.locale" />
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  days = Array.from({ length: 365 }, (_, i) => ({ date: Date.UTC(2025, 0, 1 + i), value: Math.floor((Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1) * (i % 7 < 5 ? 9 : 3)) }));
  labels = {
  "en": {
    "locale": "en-US",
    "unit": "contributions"
  },
  "zh": {
    "locale": "zh-CN",
    "unit": "次贡献"
  },
  "ja": {
    "locale": "ja-JP",
    "unit": "件のコントリビューション"
  },
  "fr": {
    "locale": "fr-FR",
    "unit": "contributions"
  }
};
}

```

## Example: Calendriers mensuels

layout="months" dessine un petit calendrier par mois, dans la grille qui donne les plus grandes cases. weekStart remplace le premier jour de la semaine donné par la locale ; les jours sans commande (fermé le lundi) restent vides.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCalendarHeatmap, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCalendarHeatmap],
  template: `
@let t = labels[language()];
<mn-calendar-heatmap
  [data]="steps"
  [range]="['2026-01-01', '2026-06-30']"
  layout="months"
  [levels]="5"
  [thresholds]="[4000, 6000, 8000, 10000]"
  color="var(--success-color, #16a34a)"
  [locale]="t.locale"
  [height]="420"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  steps = Array.from({ length: 181 }, (_, i) => ({ date: Date.UTC(2026, 0, 1 + i), value: Math.round(3000 + (Math.abs(Math.sin(i * 78.233) * 43758.5453) % 1) * 9000) }));
  labels = {
  "en": {
    "locale": "en-US"
  },
  "zh": {
    "locale": "zh-CN"
  },
  "ja": {
    "locale": "ja-JP"
  },
  "fr": {
    "locale": "fr-FR"
  }
};
}

```
