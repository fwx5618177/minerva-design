# Diagramme d’accords

Flux entre des groupes disposés en cercle : chaque groupe est un arc dimensionné par ses flux, chaque flux un ruban entre deux arcs. Non orienté, un ruban relie une paire de groupes et sa largeur est la somme des flux dans les deux sens (une matrice symétrique compte chaque relation une seule fois), si bien qu’un groupe qui ne fait que recevoir garde son arc ; orienté, chaque sens a son propre ruban, terminé par une flèche. Survolez un groupe pour mettre ses rubans en avant, un ruban pour lire les deux sens ; la légende masque / affiche les groupes et les flèches du clavier parcourent les groupes puis les rubans.

Package: minerva-design@1.21.0

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "cf7fb249651cd06c89d0951ac2c3a3aa74dc835a",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:563c9bec5d90807342a94c02317519b3da937907129bda2d25ea49762fa828fd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

Design

Ingénierie

Produit

Marketing

Messages échangés entre quatre équipes en une semaine

Amérique du Nord

Amérique latine

Europe

Afrique

Asie occidentale

Asie du Sud

Asie de l’Est

Océanie

{{value}} M de personnes

Flux migratoires entre les régions du monde sur cinq ans

app

router

store

ui-kit

api-client

auth

i18n

utils

Imports entre les modules d’une base de code

États-Unis

Chine

Union européenne

Mexique

Canada

Japon

Corée du Sud

Commerce de marchandises entre grandes économies sur un an

Accueil

Recherche

Catégorie

Produit

Panier

Paiement

{{value}} k visites

Survolez une page ou un ruban

{{source}} → {{target}} : {{value}} (dans l’autre sens : {{reverse}})

{{name}} : {{value}} en entrée et en sortie

Navigation entre les pages d’une application de boutique en une journée

États-Unis Est

États-Unis Ouest

Europe centrale

Asie-Pacifique SE

Asie-Pacifique NE

Amérique du Sud

{{value}} Gbit/s

Trafic de réplication entre centres de données

Libellés

Auto

Tangentiels

Radiaux

Aucun

Ordre des groupes

Ordre des données

Du plus grand

Du plus petit

Couleur des rubans

Dégradé

Source

Cible

Neutre

Orienté

Graduations

Autres opérateurs

Année

{{year}}

{{name}} {{value}}

{{name}} a gagné le plus d'abonnés ({{value}} en net). Solde net : {{list}}.

Abonnés changeant d'opérateur mobile en {{year}}

Physique

Chimie

Biologie

Médecine

Informatique

Mathématiques

Économie

Ingénierie

Cliquez sur une faculté pour voir ses collaborations, ou sur un ruban pour voir une paire

{{name}} : {{total}} articles co-écrits, surtout avec {{partners}}

{{name}} ({{value}})

{{a}} et {{b}} : {{value}} articles co-écrits

Effacer

Articles co-écrits par les facultés d'une université sur cinq ans

Café

Lait

Pain

Viennoiseries

Fruits

Céréales

Yaourts

Jus

{{a}} + {{b}}

Achetés ensemble dans {{value}} paniers ({{share}} de tous les paniers)

{{value}} associations avec d'autres catégories

Catégories de produits achetées ensemble dans un même panier sur un mois

Passerelle

Utilisateurs

Commandes

Stocks

Paiements

Notifications

{{value}} appels/s

Total : {{total}}. Le plus chargé : {{from}} → {{to}} ({{value}})

Pause

Reprendre

Appels par seconde entre microservices, en direct

Londres

Paris

Francfort

Istanbul

Dubaï

Singapour

Tokyo

New York

{{value}} M de passagers

Afficher toutes les plateformes

Plateformes de l'Est

Plateformes de l'Ouest

Affichez au moins deux plateformes pour voir les liaisons entre elles

{{shown}} plateformes sur {{total}} affichées : {{routes}} liaisons, {{passengers}} par an

Passagers annuels entre les grandes plateformes aéroportuaires

## ChordChart

Support: beta

Native Angular: MnChordChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnChordChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "groups",
    "typeText": "readonly (string | ChordGroup)[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "matrix",
    "typeText": "readonly (readonly number[])[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "links",
    "typeText": "readonly ChordLink[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "directed",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "arrows",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "padAngle",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "startAngle",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "sortGroups",
    "typeText": "\"none\" | \"ascending\" | \"descending\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "sortSubgroups",
    "typeText": "\"auto\" | \"none\" | \"ascending\" | \"descending\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "ribbonColor",
    "typeText": "\"neutral\" | \"gradient\" | \"source\" | \"target\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "ribbonOpacity",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "arcWidth",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "ticks",
    "typeText": "number | boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "tickFormat",
    "typeText": "((value: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "labels",
    "typeText": "\"auto\" | \"none\" | \"tangential\" | \"radial\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Messages between teams

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnChordChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnChordChart],
  template: `
<mn-chord-chart [groups]="teams[language()]" [matrix]="matrix" />
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  teams = {
  "en": ["Design", "Engineering", "Product", "Marketing"],
  "zh": ["设计", "研发", "产品", "市场"],
  "ja": ["デザイン", "エンジニアリング", "プロダクト", "マーケティング"],
  "fr": ["Design", "Ingénierie", "Produit", "Marketing"]
};
  matrix = [
  [0, 42, 28, 14],
  [36, 0, 54, 8],
  [30, 48, 0, 22],
  [12, 6, 26, 0]
];
}

```

## Example: Migrations entre régions

L’arc de chaque région additionne les départs et les arrivées ; un ruban est aussi large que les migrations entre deux régions dans les deux sens, et son infobulle les distingue (Valeur, Sens inverse). La diagonale (migrations internes à une région) est dessinée en boucle. groups fixe les couleurs, format l’unité, padAngle élargit les espaces.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, signal, computed } from '@angular/core';
import { MnChordChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnChordChart],
  template: `
<mn-chord-chart
  [groups]="text[language()].regions"
  [links]="links"
  directed
  ribbonColor="source"
  (hover)="hovered.set($event)"
/>
<output aria-live="polite">{{ status() }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  hovered = signal<import('minerva-design/charts/core').ShapeHoverEvent | null>(null);
  text = {
  "en": {
    "regions": ["North", "South", "East", "West", "Center"],
    "hint": "Hover a ribbon to compare both directions",
    "flow": "{source} → {target}: {value}k · back: {reverse}k",
    "group": "{name}: {value}k"
  },
  "zh": {
    "regions": ["北部", "南部", "东部", "西部", "中部"],
    "hint": "悬停在流带上以比较两个方向",
    "flow": "{source} → {target}：{value} 千人 · 反向：{reverse} 千人",
    "group": "{name}：{value} 千人"
  },
  "ja": {
    "regions": ["北部", "南部", "東部", "西部", "中部"],
    "hint": "リボンにカーソルを合わせると両方向を比較できます",
    "flow": "{source} → {target}: {value} 千人 · 逆方向: {reverse} 千人",
    "group": "{name}: {value} 千人"
  },
  "fr": {
    "regions": ["Nord", "Sud", "Est", "Ouest", "Centre"],
    "hint": "Survolez un ruban pour comparer les deux sens",
    "flow": "{source} → {target} : {value} k · retour : {reverse} k",
    "group": "{name} : {value} k"
  }
};
  links = [
  {
    "source": 0,
    "target": 1,
    "value": 32
  },
  {
    "source": 1,
    "target": 0,
    "value": 18
  },
  {
    "source": 0,
    "target": 4,
    "value": 45
  },
  {
    "source": 4,
    "target": 0,
    "value": 22
  },
  {
    "source": 1,
    "target": 4,
    "value": 38
  },
  {
    "source": 4,
    "target": 1,
    "value": 30
  },
  {
    "source": 2,
    "target": 4,
    "value": 51
  },
  {
    "source": 4,
    "target": 2,
    "value": 26
  },
  {
    "source": 3,
    "target": 4,
    "value": 29
  },
  {
    "source": 4,
    "target": 3,
    "value": 35
  },
  {
    "source": 2,
    "target": 3,
    "value": 14
  },
  {
    "source": 3,
    "target": 2,
    "value": 21
  },
  {
    "source": 1,
    "target": 2,
    "value": 12
  },
  {
    "source": 2,
    "target": 1,
    "value": 9
  }
];
  status = computed(() => {
    const t = this.text[this.language()];
    const hovered = this.hovered();
    if (!hovered) return t.hint;
    if (hovered.source === undefined)
      return t.group
        .replace("{name}", hovered.name)
        .replace("{value}", String(hovered.value));
    return t.flow
      .replace("{source}", hovered.source)
      .replace("{target}", hovered.target ?? "")
      .replace("{value}", String(hovered.value))
      .replace("{reverse}", String(hovered.reverseValue ?? 0));
  });
}

```
